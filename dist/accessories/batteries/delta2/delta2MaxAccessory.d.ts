import { Delta2AccessoryBase } from '@ecoflow/accessories/batteries/delta2/delta2AccessoryBase';
import { EcoFlowHttpApiManager } from '@ecoflow/apis/ecoFlowHttpApiManager';
import { EcoFlowMqttApiManager } from '@ecoflow/apis/ecoFlowMqttApiManager';
import { DeviceConfig } from '@ecoflow/config';
import { EcoFlowHomebridgePlatform } from '@ecoflow/platform';
import { Logging, PlatformAccessory } from 'homebridge';
export declare class Delta2MaxAccessory extends Delta2AccessoryBase {
    constructor(platform: EcoFlowHomebridgePlatform, accessory: PlatformAccessory, config: DeviceConfig, log: Logging, httpApiManager: EcoFlowHttpApiManager, mqttApiManager: EcoFlowMqttApiManager);
}
