"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockMqttClient = void 0;
const mqtt_1 = require("mqtt");
class MockMqttClient extends mqtt_1.MqttClient {
    deviceInfo;
    emitQuotaTimeoutId = null;
    subscriptionTopics = [];
    simulator;
    constructor(deviceInfo, options) {
        super(undefined, options);
        this.deviceInfo = deviceInfo;
        this.deviceInfo.log.warn('Simulating MQTT');
        this.simulator = deviceInfo.config.simulator ? new deviceInfo.config.simulator() : null;
    }
    connect() {
        this.connected = true;
        return this;
    }
    async endAsync() {
        if (this.emitQuotaTimeoutId !== null) {
            clearTimeout(this.emitQuotaTimeoutId);
            this.emitQuotaTimeoutId = null;
        }
    }
    async subscribeAsync(topic) {
        this.subscriptionTopics.push(topic);
        if (topic.endsWith('quota')) {
            this.emitQuotaTimeoutId = setInterval(() => {
                this.emitQuota();
            }, this.deviceInfo.config.simulateQuotaTimeoutMs ?? 10000);
        }
        return [];
    }
    async publishAsync(topic, message) {
        if (this.simulator && topic.endsWith('set')) {
            const replyTopic = `${topic}_reply`;
            if (this.subscriptionTopics.includes(replyTopic)) {
                const responseMessage = this.simulator.generateSetReply(message);
                this.emitMessage(replyTopic, responseMessage);
            }
        }
        return undefined;
    }
    emitQuota() {
        if (this.simulator) {
            this.subscriptionTopics
                .filter(topic => topic.endsWith('quota'))
                .forEach(topic => {
                this.emitMessage(topic, this.simulator.generateQuota());
            });
        }
    }
    emitMessage(topic, message) {
        this.emit('message', topic, Buffer.from(JSON.stringify(message)), undefined);
    }
}
exports.MockMqttClient = MockMqttClient;
//# sourceMappingURL=mockMqttClient.js.map