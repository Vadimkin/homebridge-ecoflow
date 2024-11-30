"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MqttClientContainer = void 0;
const mqttDevice_1 = require("@ecoflow/apis/containers/mqttDevice");
class MqttClientContainer {
    certificateData;
    _client = null;
    devicesCache = {};
    constructor(certificateData) {
        this.certificateData = certificateData;
    }
    get client() {
        return this._client;
    }
    set client(new_client) {
        if (this._client === null) {
            this._client = new_client;
        }
    }
    isConnected() {
        return !!this.client;
    }
    getDevices(serialNumber) {
        if (serialNumber && serialNumber in this.devicesCache) {
            return this.devicesCache[serialNumber];
        }
        return [];
    }
    addDevice(config, log) {
        if (!(config.serialNumber in this.devicesCache)) {
            this.devicesCache[config.serialNumber] = [];
        }
        this.devicesCache[config.serialNumber].push(new mqttDevice_1.MqttDevice(config, log));
    }
    getAllDevices() {
        const allDevices = [];
        for (const serialNumber in this.devicesCache) {
            const devices = this.devicesCache[serialNumber];
            allDevices.push(...devices);
        }
        return allDevices;
    }
}
exports.MqttClientContainer = MqttClientContainer;
//# sourceMappingURL=mqttClientContainer.js.map