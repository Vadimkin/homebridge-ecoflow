import { API, Characteristic, DynamicPlatformPlugin, HAP, Logging, PlatformAccessory, PlatformConfig, Service } from 'homebridge';
import { CustomCharacteristics } from '@ecoflow/characteristics/customCharacteristic';
/**
 * HomebridgePlatform
 * This class is the main constructor for your plugin, this is where you should
 * parse the user config and discover/register accessories with Homebridge.
 */
export type EcoFlowCharacteristic = typeof Characteristic & typeof CustomCharacteristics;
export declare class EcoFlowHomebridgePlatform implements DynamicPlatformPlugin {
    private readonly commonLog;
    readonly config: PlatformConfig;
    readonly api: API;
    private readonly ecoFlowConfig;
    readonly Service: typeof Service;
    readonly Characteristic: EcoFlowCharacteristic;
    readonly accessories: PlatformAccessory[];
    private readonly httpApiManager;
    private readonly mqttApiManager;
    constructor(commonLog: Logging, config: PlatformConfig, api: API);
    static InitCustomCharacteristics(hap: HAP): void;
    /**
     * This function is invoked when homebridge restores cached accessories from disk at startup.
     * It should be used to set up event handlers for characteristics and update respective values.
     */
    configureAccessory(accessory: PlatformAccessory): void;
    private validateDeviceConfig;
    private registerDevices;
    private addNewDevice;
    private cleanupDevices;
    private initialize;
    private createAccessory;
}
