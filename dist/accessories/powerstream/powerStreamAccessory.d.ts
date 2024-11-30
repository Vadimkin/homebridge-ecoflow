import { EcoFlowAccessoryWithQuotaBase } from '@ecoflow/accessories/ecoFlowAccessoryWithQuotaBase';
import { PowerStreamAllQuotaData } from '@ecoflow/accessories/powerstream/interfaces/powerStreamHttpApiContracts';
import { EcoFlowHttpApiManager } from '@ecoflow/apis/ecoFlowHttpApiManager';
import { EcoFlowMqttApiManager } from '@ecoflow/apis/ecoFlowMqttApiManager';
import { MqttQuotaMessage } from '@ecoflow/apis/interfaces/mqttApiContracts';
import { DeviceConfig } from '@ecoflow/config';
import { EcoFlowHomebridgePlatform } from '@ecoflow/platform';
import { ServiceBase } from '@ecoflow/services/serviceBase';
import { Logging, PlatformAccessory } from 'homebridge';
export declare class PowerStreamAccessory extends EcoFlowAccessoryWithQuotaBase<PowerStreamAllQuotaData> {
    private readonly inverterOutletService;
    private readonly solarOutletService;
    private readonly batteryOutletService;
    private readonly inverterBrightnessService;
    private readonly inverterPowerDemandService;
    constructor(platform: EcoFlowHomebridgePlatform, accessory: PlatformAccessory, config: DeviceConfig, log: Logging, httpApiManager: EcoFlowHttpApiManager, mqttApiManager: EcoFlowMqttApiManager);
    protected getServices(): ServiceBase[];
    protected processQuotaMessage(message: MqttQuotaMessage): void;
    protected initializeQuota(quota: PowerStreamAllQuotaData | null): PowerStreamAllQuotaData;
    protected updateInitialValues(initialData: PowerStreamAllQuotaData): void;
    private updateHeartbeatInitialValues;
    private updateHeartbeatValues;
    private updateSolarValues;
    private updateBatteryValues;
    private updateInverterValues;
}
