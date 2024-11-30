import { DeviceInfo } from '@ecoflow/apis/containers/deviceInfo';
import { EcoFlowHttpApiManager } from '@ecoflow/apis/ecoFlowHttpApiManager';
import { MqttSetMessage } from '@ecoflow/apis/interfaces/mqttApiContracts';
import { MachineIdProvider } from '@ecoflow/helpers/machineIdProvider';
import { Subscription } from 'rxjs';
export declare class EcoFlowMqttApiManager {
    private readonly httpApiManager;
    private readonly machineIdProvider;
    private readonly mqttClientContainers;
    constructor(httpApiManager: EcoFlowHttpApiManager, machineIdProvider: MachineIdProvider);
    destroy(): Promise<void>;
    subscribeOnQuotaTopic(deviceInfo: DeviceInfo): Promise<boolean>;
    subscribeOnSetReplyTopic(deviceInfo: DeviceInfo): Promise<boolean>;
    subscribeOnQuotaMessage<TMessage>(deviceInfo: DeviceInfo, callback: (message: TMessage) => void): Subscription | undefined;
    subscribeOnSetReplyMessage<TMessage>(deviceInfo: DeviceInfo, callback: (message: TMessage) => void): Subscription | undefined;
    sendSetCommand(deviceInfo: DeviceInfo, message: MqttSetMessage): Promise<void>;
    private connect;
    private connectMqttClient;
    private subscribeOnTopic;
    private subscribeOnMessage;
    private processReceivedMessage;
    private acquireCertificate;
    private getMqttClientContainer;
    private parseTopic;
}
