import { MqttMessage, MqttTopicType } from '@ecoflow/apis/interfaces/mqttApiContracts';
import { DeviceInfoConfig } from '@ecoflow/config';
import { Logging } from 'homebridge';
import { Subscription } from 'rxjs';
export declare class MqttDevice {
    config: DeviceInfoConfig;
    readonly log: Logging;
    private readonly quotaSubject;
    private readonly setReplySubject;
    private readonly quota$;
    private readonly setReply$;
    constructor(config: DeviceInfoConfig, log: Logging);
    processReceivedMessage(topicType: MqttTopicType, message: MqttMessage): void;
    subscribeOnMessage<TMessage>(topicType: MqttTopicType, callback: (message: TMessage) => void): Subscription | undefined;
}
