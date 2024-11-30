"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MqttDevice = void 0;
const mqttApiContracts_1 = require("@ecoflow/apis/interfaces/mqttApiContracts");
const rxjs_1 = require("rxjs");
class MqttDevice {
    config;
    log;
    quotaSubject = new rxjs_1.Subject();
    setReplySubject = new rxjs_1.Subject();
    quota$ = this.quotaSubject.asObservable();
    setReply$ = this.setReplySubject.asObservable();
    constructor(config, log) {
        this.config = config;
        this.log = log;
    }
    processReceivedMessage(topicType, message) {
        this.log.debug(`Received message: ${JSON.stringify(message, null, 2)}`);
        switch (topicType) {
            case mqttApiContracts_1.MqttTopicType.Quota:
                this.quotaSubject.next(message);
                break;
            case mqttApiContracts_1.MqttTopicType.SetReply:
                this.setReplySubject.next(message);
                break;
            default:
                this.log.warn('Received message for unsupported topic:', topicType);
        }
    }
    subscribeOnMessage(topicType, callback) {
        switch (topicType) {
            case mqttApiContracts_1.MqttTopicType.Quota:
                return this.quota$.subscribe(message => callback(message));
            case mqttApiContracts_1.MqttTopicType.SetReply:
                return this.setReply$.subscribe(message => callback(message));
            default:
                this.log.warn('Topic is not supported for subscription:', topicType);
                return undefined;
        }
    }
}
exports.MqttDevice = MqttDevice;
//# sourceMappingURL=mqttDevice.js.map