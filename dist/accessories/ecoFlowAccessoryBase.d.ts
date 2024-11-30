import { DeviceInfo } from '@ecoflow/apis/containers/deviceInfo';
import { EcoFlowHttpApiManager } from '@ecoflow/apis/ecoFlowHttpApiManager';
import { EcoFlowMqttApiManager } from '@ecoflow/apis/ecoFlowMqttApiManager';
import { MqttQuotaMessage, MqttSetMessage, MqttSetReplyMessage } from '@ecoflow/apis/interfaces/mqttApiContracts';
import { DeviceConfig } from '@ecoflow/config';
import { EcoFlowHomebridgePlatform } from '@ecoflow/platform';
import { ServiceBase } from '@ecoflow/services/serviceBase';
import { Logging, PlatformAccessory } from 'homebridge';
import { Subscription } from 'rxjs';
export declare abstract class EcoFlowAccessoryBase {
    readonly platform: EcoFlowHomebridgePlatform;
    readonly accessory: PlatformAccessory;
    readonly config: DeviceConfig;
    readonly log: Logging;
    protected readonly httpApiManager: EcoFlowHttpApiManager;
    protected readonly mqttApiManager: EcoFlowMqttApiManager;
    private _services;
    private reconnectMqttTimeoutId;
    private isMqttConnected;
    private subscriptions;
    protected readonly deviceInfo: DeviceInfo;
    readonly setReplies: Record<string, {
        requestMessage: MqttSetMessage;
        revert: () => void;
    }>;
    constructor(platform: EcoFlowHomebridgePlatform, accessory: PlatformAccessory, config: DeviceConfig, log: Logging, httpApiManager: EcoFlowHttpApiManager, mqttApiManager: EcoFlowMqttApiManager);
    get services(): ServiceBase[];
    initialize(): Promise<void>;
    abstract initializeDefaultValues(): Promise<void>;
    cleanupServices(): void;
    destroy(): void;
    sendSetCommand(message: MqttSetMessage, revert: () => void): Promise<void>;
    protected abstract getServices(): ServiceBase[];
    protected subscribeOnParameterUpdates(): Subscription[];
    protected abstract processQuotaMessage(message: MqttQuotaMessage): void;
    protected processSetReplyMessage(message: MqttSetReplyMessage): void;
    private getMqttSetMessageKey;
    private initializeServices;
    private connectMqtt;
    private initMqtt;
}
