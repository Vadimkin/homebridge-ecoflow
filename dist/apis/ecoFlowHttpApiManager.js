"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EcoFlowHttpApiManager = void 0;
const httpApiContracts_1 = require("@ecoflow/apis/interfaces/httpApiContracts");
const config_1 = require("@ecoflow/config");
const crypto = __importStar(require("crypto"));
const ApiUrlUs = 'https://api-a.ecoflow.com';
const ApiUrlEu = 'https://api-e.ecoflow.com';
const QuotaPath = '/iot-open/sign/device/quota';
const QuotaAllPath = '/iot-open/sign/device/quota/all';
const CertificatePath = '/iot-open/sign/certification';
class EcoFlowHttpApiManager {
    async getQuotas(quotas, deviceInfo) {
        deviceInfo.log.debug('Get quotas:', quotas);
        const requestCmd = {
            sn: deviceInfo.config.serialNumber,
            params: {
                quotas,
            },
        };
        const response = await this.execute(deviceInfo, QuotaPath, httpApiContracts_1.HttpMethod.Post, requestCmd);
        if (!response.failed) {
            const data = this.convertData(response.data);
            deviceInfo.log.debug(`Received quotas: ${JSON.stringify(data, null, 2)}`);
            return data;
        }
        return null;
    }
    async getAllQuotas(deviceInfo) {
        deviceInfo.log.debug('Get all quotas');
        const requestCmd = {
            sn: deviceInfo.config.serialNumber,
        };
        const response = await this.execute(deviceInfo, QuotaAllPath, httpApiContracts_1.HttpMethod.Get, requestCmd);
        if (!response.failed) {
            const data = this.convertData(response.data);
            deviceInfo.log.debug(`Received all quotas: ${JSON.stringify(data, null, 2)}`);
            return data;
        }
        return null;
    }
    async acquireCertificate(deviceInfo) {
        deviceInfo.log.debug('Acquire certificate for MQTT connection');
        const response = await this.execute(deviceInfo, CertificatePath, httpApiContracts_1.HttpMethod.Get);
        if (!response.failed) {
            return response.data;
        }
        return null;
    }
    async execute(deviceInfo, relativeUrl, method, queryParameters = null) {
        const apiUrl = deviceInfo.config.location === config_1.LocationType.US ? ApiUrlUs : ApiUrlEu;
        const url = new URL(relativeUrl, apiUrl);
        const accessKey = deviceInfo.config.accessKey;
        const nonce = this.getNonce();
        const timestamp = Date.now();
        const queryParams = this.composeSignMessage(queryParameters);
        const params = queryParams ? `${queryParams}&` : '';
        const message = `${params}accessKey=${accessKey}&nonce=${nonce}&timestamp=${timestamp}`;
        const requestUrl = queryParams ? `${url}?${queryParams}` : url.toString();
        const headers = {
            accessKey,
            nonce,
            timestamp: timestamp.toString(),
            sign: this.createHmacSha256(deviceInfo.config.secretKey, message),
        };
        const options = { method };
        options.headers = new Headers(headers);
        try {
            const response = await fetch(requestUrl, options);
            const result = (await response.json());
            if (result.code !== '0') {
                throw Error(`Request to "${requestUrl}" with options: "${this.stringifyOptions(options)}" is failed
[${response.status}]: ${response.statusText}; result: ${JSON.stringify(result)}`);
            }
            return result;
        }
        catch (e) {
            deviceInfo.log.error('Request is failed:', e);
            return {
                code: '500',
                message: e?.message,
                failed: true,
            };
        }
    }
    getNonce() {
        const min = 0;
        const max = 999999;
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        return randomNumber.toString().padStart(6, '0');
    }
    composeSignMessage(obj, prefix = '') {
        if (!obj) {
            return '';
        }
        const queryParts = [];
        Object.keys(obj)
            .sort()
            .forEach(key => {
            const value = obj[key];
            const encodedKey = prefix ? `${prefix}.${key}` : key;
            if (Array.isArray(value)) {
                value.forEach((item, index) => {
                    queryParts.push(`${encodedKey}[${index}]=${item}`);
                });
            }
            else if (typeof value === 'object' && value !== null) {
                // Recursively handle nested objects
                queryParts.push(this.composeSignMessage(value, encodedKey));
            }
            else {
                // Handle primitive values
                queryParts.push(`${encodedKey}=${value}`);
            }
        });
        return queryParts.join('&');
    }
    createHmacSha256(key, message) {
        return crypto.createHmac('sha256', key).update(message).digest('hex');
    }
    stringifyOptions(options) {
        const headersObject = {};
        options.headers.forEach((value, key) => {
            headersObject[key] = value;
        });
        const newOptions = {
            ...options,
            headers: headersObject,
        };
        return JSON.stringify(newOptions);
    }
    convertData(data) {
        const result = {};
        Object.keys(data).forEach(key => {
            const keys = key.split('.');
            let current = result;
            keys.forEach((k, index) => {
                if (index === keys.length - 1) {
                    current[k] = data[key];
                }
                else {
                    current[k] = current[k] || {};
                    current = current[k];
                }
            });
        });
        return result;
    }
}
exports.EcoFlowHttpApiManager = EcoFlowHttpApiManager;
//# sourceMappingURL=ecoFlowHttpApiManager.js.map