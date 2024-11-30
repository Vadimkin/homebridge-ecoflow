import { DeltaProUltraAllQuotaData } from '@ecoflow/accessories/batteries/deltaproultra/interfaces/deltaProUltraHttpApiContracts';
import { EcoFlowAccessoryWithQuotaBase } from '@ecoflow/accessories/ecoFlowAccessoryWithQuotaBase';
import { EcoFlowHttpApiManager } from '@ecoflow/apis/ecoFlowHttpApiManager';
import { EcoFlowMqttApiManager } from '@ecoflow/apis/ecoFlowMqttApiManager';
import { MqttQuotaMessage } from '@ecoflow/apis/interfaces/mqttApiContracts';
import { DeviceConfig } from '@ecoflow/config';
import { EcoFlowHomebridgePlatform } from '@ecoflow/platform';
import { ServiceBase } from '@ecoflow/services/serviceBase';
import { Logging, PlatformAccessory } from 'homebridge';
export declare class DeltaProUltraAccessory extends EcoFlowAccessoryWithQuotaBase<DeltaProUltraAllQuotaData> {
    private readonly batteryStatusService;
    private readonly outletUsbService;
    private readonly outletAcService;
    private readonly switchXboostService;
    constructor(platform: EcoFlowHomebridgePlatform, accessory: PlatformAccessory, config: DeviceConfig, log: Logging, httpApiManager: EcoFlowHttpApiManager, mqttApiManager: EcoFlowMqttApiManager);
    protected getServices(): ServiceBase[];
    protected processQuotaMessage(message: MqttQuotaMessage): void;
    protected initializeQuota(quota: DeltaProUltraAllQuotaData | null): DeltaProUltraAllQuotaData;
    protected updateInitialValues(initialData: DeltaProUltraAllQuotaData): void;
    private updatePdStatusInitialValues;
    private updatePdSetStatusInitialValues;
    private updatePdValues;
    private updateBatteryLevelValues;
    private updateChargingStateValues;
    private updatePdAcValues;
    private updatePdUsbValues;
}
