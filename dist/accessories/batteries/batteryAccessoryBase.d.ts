import { BatteryAllQuotaData } from '@ecoflow/accessories/batteries/interfaces/httpApiBatteryContracts';
import { EcoFlowAccessoryWithQuotaBase } from '@ecoflow/accessories/ecoFlowAccessoryWithQuotaBase';
import { EcoFlowHttpApiManager } from '@ecoflow/apis/ecoFlowHttpApiManager';
import { EcoFlowMqttApiManager } from '@ecoflow/apis/ecoFlowMqttApiManager';
import { MqttQuotaMessage } from '@ecoflow/apis/interfaces/mqttApiContracts';
import { DeviceConfig } from '@ecoflow/config';
import { EcoFlowHomebridgePlatform } from '@ecoflow/platform';
import { ServiceBase } from '@ecoflow/services/serviceBase';
import { Logging, PlatformAccessory } from 'homebridge';
export declare abstract class BatteryAccessoryBase extends EcoFlowAccessoryWithQuotaBase<BatteryAllQuotaData> {
    private readonly batteryService;
    private readonly outletUsbService;
    private readonly outletAcService;
    private readonly outletCarService;
    constructor(platform: EcoFlowHomebridgePlatform, accessory: PlatformAccessory, config: DeviceConfig, log: Logging, httpApiManager: EcoFlowHttpApiManager, mqttApiManager: EcoFlowMqttApiManager);
    protected getServices(): ServiceBase[];
    protected processQuotaMessage(message: MqttQuotaMessage): void;
    protected initializeQuota(quota: BatteryAllQuotaData | null): BatteryAllQuotaData;
    protected updateInitialValues(initialData: BatteryAllQuotaData): void;
    private updateEmsInitialValues;
    private updateInvInitialValues;
    private updatePdInitialValues;
    private updateEmsValues;
    private updateInvValues;
    private updatePdValues;
}
