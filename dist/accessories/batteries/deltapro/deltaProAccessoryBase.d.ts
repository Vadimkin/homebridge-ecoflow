import { DeltaProAllQuotaData } from '@ecoflow/accessories/batteries/deltapro/interfaces/deltaProHttpApiContracts';
import { EcoFlowAccessoryWithQuotaBase } from '@ecoflow/accessories/ecoFlowAccessoryWithQuotaBase';
import { EcoFlowHttpApiManager } from '@ecoflow/apis/ecoFlowHttpApiManager';
import { EcoFlowMqttApiManager } from '@ecoflow/apis/ecoFlowMqttApiManager';
import { MqttQuotaMessage } from '@ecoflow/apis/interfaces/mqttApiContracts';
import { DeviceConfig } from '@ecoflow/config';
import { EcoFlowHomebridgePlatform } from '@ecoflow/platform';
import { ServiceBase } from '@ecoflow/services/serviceBase';
import { Logging, PlatformAccessory } from 'homebridge';
export declare abstract class DeltaProAccessoryBase extends EcoFlowAccessoryWithQuotaBase<DeltaProAllQuotaData> {
    private readonly batteryStatusService;
    private readonly outletUsbService;
    private readonly outletAcService;
    private readonly outletCarService;
    private readonly switchXboostService;
    constructor(platform: EcoFlowHomebridgePlatform, accessory: PlatformAccessory, config: DeviceConfig, log: Logging, httpApiManager: EcoFlowHttpApiManager, mqttApiManager: EcoFlowMqttApiManager);
    protected getServices(): ServiceBase[];
    protected processQuotaMessage(message: MqttQuotaMessage): void;
    protected initializeQuota(quota: DeltaProAllQuotaData | null): DeltaProAllQuotaData;
    protected updateInitialValues(data: DeltaProAllQuotaData): void;
    private updateBmsValues;
    private updateInvValues;
    private updatePdValues;
}
