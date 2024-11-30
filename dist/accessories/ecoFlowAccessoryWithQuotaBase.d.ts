import { EcoFlowAccessoryBase } from '@ecoflow/accessories/ecoFlowAccessoryBase';
import { EcoFlowHttpApiManager } from '@ecoflow/apis/ecoFlowHttpApiManager';
import { EcoFlowMqttApiManager } from '@ecoflow/apis/ecoFlowMqttApiManager';
import { DeviceConfig } from '@ecoflow/config';
import { EcoFlowHomebridgePlatform } from '@ecoflow/platform';
import { Logging, PlatformAccessory } from 'homebridge';
export declare abstract class EcoFlowAccessoryWithQuotaBase<TAllQuotaData> extends EcoFlowAccessoryBase {
    private _quota;
    constructor(platform: EcoFlowHomebridgePlatform, accessory: PlatformAccessory, config: DeviceConfig, log: Logging, httpApiManager: EcoFlowHttpApiManager, mqttApiManager: EcoFlowMqttApiManager);
    initializeDefaultValues(shouldUpdateInitialValues?: boolean): Promise<void>;
    get quota(): TAllQuotaData;
    protected abstract updateInitialValues(quota: TAllQuotaData): void;
    protected abstract initializeQuota(quota: TAllQuotaData | null): TAllQuotaData;
    protected sum(...values: (number | undefined)[]): number;
}
