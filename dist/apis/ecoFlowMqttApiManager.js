"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EcoFlowMqttApiManager = void 0;
const mqttClientContainer_1 = require("@ecoflow/apis/containers/mqttClientContainer");
const mqttApiContracts_1 = require("@ecoflow/apis/interfaces/mqttApiContracts");
const mockMqttClient_1 = require("@ecoflow/apis/simulations/mockMqttClient");
const mqtt_1 = __importDefault(require("mqtt"));
class EcoFlowMqttApiManager {
    httpApiManager;
    machineIdProvider;
    mqttClientContainers = {};
    constructor(httpApiManager, machineIdProvider) {
        this.httpApiManager = httpApiManager;
        this.machineIdProvider = machineIdProvider;
    }
    async destroy() {
        for (const connectionKey in this.mqttClientContainers) {
            const mqttClientContainer = this.mqttClientContainers[connectionKey];
            await mqttClientContainer.client?.unsubscribeAsync('#');
            const devices = mqttClientContainer.getAllDevices();
            devices.forEach(device => device.log.debug('Unsubscribed from all topics'));
            await mqttClientContainer.client?.endAsync();
            devices.forEach(device => device.log.debug('Disconnected from EcoFlow MQTT Service'));
        }
    }
    subscribeOnQuotaTopic(deviceInfo) {
        return this.subscribeOnTopic(deviceInfo, mqttApiContracts_1.MqttTopicType.Quota);
    }
    subscribeOnSetReplyTopic(deviceInfo) {
        return this.subscribeOnTopic(deviceInfo, mqttApiContracts_1.MqttTopicType.SetReply);
    }
    subscribeOnQuotaMessage(deviceInfo, callback) {
        return this.subscribeOnMessage(deviceInfo, mqttApiContracts_1.MqttTopicType.Quota, callback);
    }
    subscribeOnSetReplyMessage(deviceInfo, callback) {
        return this.subscribeOnMessage(deviceInfo, mqttApiContracts_1.MqttTopicType.SetReply, callback);
    }
    async sendSetCommand(deviceInfo, message) {
        const client = await this.connect(deviceInfo);
        if (client?.isConnected() && client.client) {
            const topic = `/open/${client.certificateData.certificateAccount}/${deviceInfo.config.serialNumber}/set`;
            try {
                await client.client.publishAsync(topic, JSON.stringify(message));
                deviceInfo.log.debug(`Published to topic '${topic}':`, message);
            }
            catch (err) {
                deviceInfo.log.error(`Publishing to topic '${topic}' of message '${JSON.stringify(message)}' was failed:`, err);
            }
        }
    }
    async connect(deviceInfo) {
        const mqttClientContainer = await this.acquireCertificate(deviceInfo);
        if (mqttClientContainer && !mqttClientContainer.client) {
            const machineId = await this.machineIdProvider.getMachineId(deviceInfo.log);
            const clientId = `HOMEBRIDGE_${machineId.toUpperCase()}_${mqttClientContainer.certificateData.certificateAccount}`;
            try {
                const certificateData = mqttClientContainer.certificateData;
                const client = await this.connectMqttClient(`${certificateData.protocol}://${certificateData.url}:${certificateData.port}`, {
                    username: `${certificateData.certificateAccount}`,
                    password: `${certificateData.certificatePassword}`,
                    clientId,
                    protocolVersion: 5,
                }, deviceInfo);
                deviceInfo.log.info('Connected to EcoFlow MQTT Service');
                mqttClientContainer.client = client;
                client.on('message', (topic, message) => {
                    const mqttMessage = JSON.parse(message.toString());
                    this.processReceivedMessage(mqttClientContainer, topic, mqttMessage);
                });
            }
            catch (err) {
                deviceInfo.log.error('Connection to EcoFlow MQTT Service was failed', err);
            }
        }
        mqttClientContainer?.addDevice(deviceInfo.config, deviceInfo.log);
        return mqttClientContainer;
    }
    async connectMqttClient(brokerUrl, options, deviceInfo) {
        if (deviceInfo.config.simulate === true) {
            return new mockMqttClient_1.MockMqttClient(deviceInfo, options);
        }
        return await mqtt_1.default.connectAsync(brokerUrl, options);
    }
    async subscribeOnTopic(deviceInfo, topicType) {
        const client = await this.connect(deviceInfo);
        if (client?.isConnected() && client.client) {
            const topic = `/open/${client.certificateData.certificateAccount}/${deviceInfo.config.serialNumber}/${topicType}`;
            try {
                await client.client.subscribeAsync(topic);
                deviceInfo.log.debug('Subscribed to topic:', topic);
                return true;
            }
            catch (err) {
                deviceInfo.log.error(`Subscribing to topic '${topic}' was failed:`, err);
            }
        }
        return false;
    }
    subscribeOnMessage(deviceInfo, topicType, callback) {
        return this.getMqttClientContainer(deviceInfo)
            ?.getDevices(deviceInfo.config.serialNumber)
            .find(device => device.config.name === deviceInfo.config.name)
            ?.subscribeOnMessage(topicType, callback);
    }
    processReceivedMessage(container, topic, message) {
        const { serialNumber, topicType } = this.parseTopic(topic);
        const devices = container.getDevices(serialNumber);
        devices.forEach(device => device.processReceivedMessage(topicType, message));
    }
    async acquireCertificate(deviceInfo) {
        let mqttClientContainer = this.getMqttClientContainer(deviceInfo);
        if (mqttClientContainer) {
            return mqttClientContainer;
        }
        let certificateData = null;
        if (deviceInfo.config.simulate === true) {
            certificateData = {
                certificateAccount: deviceInfo.config.accessKey,
                certificatePassword: deviceInfo.config.secretKey,
                port: '8883',
                protocol: 'mqtts',
                url: 'fake',
            };
        }
        else {
            certificateData = await this.httpApiManager.acquireCertificate(deviceInfo);
        }
        if (certificateData) {
            mqttClientContainer = new mqttClientContainer_1.MqttClientContainer(certificateData);
            this.mqttClientContainers[deviceInfo.connectionKey] = mqttClientContainer;
            return mqttClientContainer;
        }
        return null;
    }
    getMqttClientContainer(deviceInfo) {
        if (deviceInfo.connectionKey in this.mqttClientContainers) {
            return this.mqttClientContainers[deviceInfo.connectionKey];
        }
        return null;
    }
    parseTopic(topic) {
        const parts = topic.split('/');
        const topicType = parts.pop();
        const serialNumber = parts.pop();
        return { serialNumber, topicType };
    }
}
exports.EcoFlowMqttApiManager = EcoFlowMqttApiManager;
//# sourceMappingURL=ecoFlowMqttApiManager.js.map