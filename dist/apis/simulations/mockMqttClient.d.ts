import { DeviceInfo } from '@ecoflow/apis/containers/deviceInfo';
import { IClientOptions, ISubscriptionGrant, MqttClient, Packet } from 'mqtt';
export declare class MockMqttClient extends MqttClient {
    private readonly deviceInfo;
    private emitQuotaTimeoutId;
    private readonly subscriptionTopics;
    private readonly simulator;
    constructor(deviceInfo: DeviceInfo, options: IClientOptions);
    connect(): this;
    endAsync(): Promise<void>;
    subscribeAsync(topic: string): Promise<ISubscriptionGrant[]>;
    publishAsync(topic: string, message: string): Promise<Packet | undefined>;
    private emitQuota;
    private emitMessage;
}
