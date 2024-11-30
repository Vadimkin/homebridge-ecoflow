"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EcoFlowAccessoryBase = void 0;
const deviceInfo_1 = require("@ecoflow/apis/containers/deviceInfo");
const accessoryInformationService_1 = require("@ecoflow/services/accessoryInformationService");
class EcoFlowAccessoryBase {
    platform;
    accessory;
    config;
    log;
    httpApiManager;
    mqttApiManager;
    _services = [];
    reconnectMqttTimeoutId = null;
    isMqttConnected = false;
    subscriptions = [];
    deviceInfo;
    setReplies = {};
    constructor(platform, accessory, config, log, httpApiManager, mqttApiManager) {
        this.platform = platform;
        this.accessory = accessory;
        this.config = config;
        this.log = log;
        this.httpApiManager = httpApiManager;
        this.mqttApiManager = mqttApiManager;
        this.deviceInfo = new deviceInfo_1.DeviceInfo(config, log);
    }
    // Getter for services
    get services() {
        return this._services;
    }
    async initialize() {
        this._services = this.getServices();
        this._services.push(new accessoryInformationService_1.AccessoryInformationService(this));
        this.initializeServices();
        await this.connectMqtt();
    }
    cleanupServices() {
        const services = this.services.map(service => service.service);
        this.accessory.services
            .filter(service => !services.includes(service))
            .forEach(service => {
            this.log.warn('Removing obsolete service from accessory:', service.displayName === undefined || service.displayName === '' ? service.name : service.displayName);
            this.accessory.removeService(service);
        });
        this.services
            .filter(service => this.accessory.services.includes(service.service))
            .forEach(service => service.cleanupCharacteristics());
    }
    destroy() {
        if (this.reconnectMqttTimeoutId !== null) {
            clearTimeout(this.reconnectMqttTimeoutId);
            this.reconnectMqttTimeoutId = null;
        }
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
    async sendSetCommand(message, revert) {
        message.id = Math.floor(Math.random() * 1000000);
        message.version = '1.0';
        this.setReplies[this.getMqttSetMessageKey(message)] = { requestMessage: message, revert };
        await this.mqttApiManager.sendSetCommand(this.deviceInfo, message);
    }
    subscribeOnParameterUpdates() {
        const subscriptions = [
            this.mqttApiManager.subscribeOnQuotaMessage(this.deviceInfo, this.processQuotaMessage.bind(this)),
            this.mqttApiManager.subscribeOnSetReplyMessage(this.deviceInfo, this.processSetReplyMessage.bind(this)),
        ];
        return subscriptions.filter(subscription => !!subscription);
    }
    processSetReplyMessage(message) {
        const messageKey = this.getMqttSetMessageKey(message);
        const command = this.setReplies[messageKey];
        if (!command) {
            this.log.debug('Received "SetReply" response was not sent by accessory. Ignore it:', message);
            return;
        }
        this.log.debug('Received "SetReply" response:', message);
        delete this.setReplies[messageKey];
        if ((message.data.ack === undefined && message.data.result === undefined) ||
            (message.data.ack !== undefined && message.data.ack !== false) ||
            (message.data.result !== undefined && message.data.result !== false)) {
            this.log.warn('Failed to set a value. Reverts value back for:', command.requestMessage.id);
            command.revert();
        }
        else {
            this.log.debug('Setting of a value was successful for:', command.requestMessage.id);
        }
    }
    getMqttSetMessageKey(message) {
        return message.id.toString();
    }
    initializeServices() {
        this.services.forEach(service => {
            service.initialize();
        });
    }
    async connectMqtt() {
        await this.initMqtt();
        this.reconnectMqttTimeoutId = setInterval(async () => {
            // Check MQTT is connected every minute
            if (!this.isMqttConnected) {
                await this.initMqtt();
            }
        }, this.config.reconnectMqttTimeoutMs ?? 60000);
    }
    async initMqtt() {
        this.isMqttConnected =
            (await this.mqttApiManager.subscribeOnQuotaTopic(this.deviceInfo)) &&
                (await this.mqttApiManager.subscribeOnSetReplyTopic(this.deviceInfo));
        if (this.isMqttConnected) {
            this.subscriptions = this.subscribeOnParameterUpdates();
        }
    }
}
exports.EcoFlowAccessoryBase = EcoFlowAccessoryBase;
//# sourceMappingURL=ecoFlowAccessoryBase.js.map