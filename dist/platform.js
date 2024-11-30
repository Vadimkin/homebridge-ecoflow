"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EcoFlowHomebridgePlatform = void 0;
const delta2Accessory_1 = require("@ecoflow/accessories/batteries/delta2/delta2Accessory");
const delta2MaxAccessory_1 = require("@ecoflow/accessories/batteries/delta2/delta2MaxAccessory");
const delta2Simulator_1 = require("@ecoflow/accessories/batteries/delta2/simulations/delta2Simulator");
const powerStreamAccessory_1 = require("@ecoflow/accessories/powerstream/powerStreamAccessory");
const powerStreamSimulator_1 = require("@ecoflow/accessories/powerstream/simulations/powerStreamSimulator");
const ecoFlowHttpApiManager_1 = require("@ecoflow/apis/ecoFlowHttpApiManager");
const ecoFlowMqttApiManager_1 = require("@ecoflow/apis/ecoFlowMqttApiManager");
const customCharacteristic_1 = require("@ecoflow/characteristics/customCharacteristic");
const config_1 = require("@ecoflow/config");
const logger_1 = require("@ecoflow/helpers/logger");
const machineIdProvider_1 = require("@ecoflow/helpers/machineIdProvider");
const settings_1 = require("@ecoflow/settings");
class EcoFlowHomebridgePlatform {
    commonLog;
    config;
    api;
    ecoFlowConfig;
    Service;
    Characteristic;
    // this is used to track restored cached accessories
    accessories = [];
    httpApiManager = new ecoFlowHttpApiManager_1.EcoFlowHttpApiManager();
    mqttApiManager = new ecoFlowMqttApiManager_1.EcoFlowMqttApiManager(this.httpApiManager, new machineIdProvider_1.MachineIdProvider());
    constructor(commonLog, config, api) {
        this.commonLog = commonLog;
        this.config = config;
        this.api = api;
        EcoFlowHomebridgePlatform.InitCustomCharacteristics(api.hap);
        this.ecoFlowConfig = this.config;
        this.Service = api.hap.Service;
        this.Characteristic = {
            ...api.hap.Characteristic,
            ...customCharacteristic_1.CustomCharacteristics,
        };
        this.commonLog.debug('Finished initializing platform:', this.config.platform);
        // Homebridge 1.8.0 introduced a `log.success` method that can be used to log success messages
        // For users that are on a version prior to 1.8.0, we need a 'polyfill' for this method
        if (!this.commonLog.success) {
            this.commonLog.success = commonLog.info;
        }
        // When this event is fired it means Homebridge has restored all cached accessories from disk.
        // Dynamic Platform plugins should only register new accessories after this event was fired,
        // in order to ensure they weren't added to homebridge already. This event can also be used
        // to start discovery of new accessories.
        this.api.on('didFinishLaunching', () => {
            this.registerDevices();
        });
    }
    static InitCustomCharacteristics(hap) {
        customCharacteristic_1.CustomCharacteristics.PowerConsumption.InputConsumptionWatts = (0, customCharacteristic_1.InputConsumptionWattFactory)(hap);
        customCharacteristic_1.CustomCharacteristics.PowerConsumption.OutputConsumptionWatts = (0, customCharacteristic_1.OutputConsumptionWattFactory)(hap);
    }
    /**
     * This function is invoked when homebridge restores cached accessories from disk at startup.
     * It should be used to set up event handlers for characteristics and update respective values.
     */
    configureAccessory(accessory) {
        this.commonLog.info('Loading accessory from cache:', accessory.displayName);
        // add the restored accessory to the accessories cache, so we can track if it has already been registered
        this.accessories.push(accessory);
    }
    validateDeviceConfig(config) {
        if (config.disabled === true) {
            return 'Device is disabled';
        }
        if (config.name === undefined) {
            return "Device's 'name' must be configured";
        }
        if (config.serialNumber === undefined) {
            return "Device's 'serialNumber' must be configured";
        }
        if (config.accessKey === undefined) {
            return "Device's 'accessKey' must be configured";
        }
        if (config.secretKey === undefined) {
            return "Device's 'secretKey' must be configured";
        }
        return undefined;
    }
    registerDevices() {
        const logs = {};
        const configuredAccessories = [];
        const configuredEcoFlowAccessories = [];
        if (!this.ecoFlowConfig.devices) {
            this.commonLog.warn('Devices are not configured');
            return;
        }
        for (const config of this.ecoFlowConfig.devices) {
            const log = logger_1.Logger.create(this.commonLog, config.name);
            const validationMessage = this.validateDeviceConfig(config);
            if (validationMessage !== undefined) {
                log.warn(`${validationMessage}. Ignoring the device`);
                continue;
            }
            const existingAccessory = configuredAccessories.find(accessory => accessory.context.deviceConfig.serialNumber === config.serialNumber);
            if (existingAccessory) {
                log.warn(`Device with the same SN (${config.serialNumber}) already exists. Ignoring the device`);
                continue;
            }
            // generate a unique id for the accessory this should be generated from
            // something globally unique, but constant, for example, the device serial
            // number or MAC address
            const uuid = this.api.hap.uuid.generate(config.serialNumber);
            // see if an accessory with the same uuid has already been registered and restored from
            // the cached devices we stored in the `configureAccessory` method above
            let accessory = this.accessories.find(accessory => accessory.UUID === uuid);
            let ecoFlowAccessory = null;
            if (accessory) {
                log.info('Restoring existing accessory from cache');
                ecoFlowAccessory = this.createAccessory(accessory, config, log);
            }
            else {
                ({ accessory, ecoFlowAccessory } = this.addNewDevice(log, config, uuid));
            }
            configuredAccessories.push(accessory);
            if (ecoFlowAccessory) {
                configuredEcoFlowAccessories.push(ecoFlowAccessory);
            }
            logs[accessory.displayName] = log;
        }
        this.cleanupDevices(configuredAccessories, configuredEcoFlowAccessories, logs);
    }
    addNewDevice(log, config, uuid) {
        log.info('Adding new accessory');
        const accessory = new this.api.platformAccessory(config.name, uuid);
        accessory.context.deviceConfig = config;
        const ecoFlowAccessory = this.createAccessory(accessory, config, log);
        if (ecoFlowAccessory) {
            this.api.registerPlatformAccessories(settings_1.PLUGIN_NAME, settings_1.PLATFORM_NAME, [accessory]);
        }
        return { accessory, ecoFlowAccessory };
    }
    cleanupDevices(configuredAccessories, configuredEcoFlowAccessories, logs) {
        const removedAccessories = [];
        this.accessories
            .filter(accessory => !configuredAccessories.includes(accessory))
            .forEach(accessory => {
            this.commonLog.info('Removing obsolete accessory:', accessory.displayName);
            this.api.unregisterPlatformAccessories(settings_1.PLUGIN_NAME, settings_1.PLATFORM_NAME, [accessory]);
            removedAccessories.push(accessory);
        });
        const ecoFlowAccessories = configuredEcoFlowAccessories.filter(ecoFlowAccessory => !removedAccessories.includes(ecoFlowAccessory.accessory));
        this.initialize(ecoFlowAccessories, logs);
    }
    async initialize(accessories, logs) {
        for (const accessory of accessories) {
            logs[accessory.accessory.displayName].info('Initializing accessory');
            await accessory.initialize();
            if (accessory.config.simulate !== true) {
                await accessory.initializeDefaultValues();
            }
            await accessory.cleanupServices();
        }
    }
    createAccessory(accessory, config, log) {
        let EcoFlowAccessoryType = null;
        let EcoFlowAccessorySimulatorType = undefined;
        switch (config.model) {
            case config_1.DeviceModel.Delta2Max:
                EcoFlowAccessoryType = delta2MaxAccessory_1.Delta2MaxAccessory;
                EcoFlowAccessorySimulatorType = delta2Simulator_1.Delta2Simulator;
                break;
            case config_1.DeviceModel.Delta2:
                EcoFlowAccessoryType = delta2Accessory_1.Delta2Accessory;
                EcoFlowAccessorySimulatorType = delta2Simulator_1.Delta2Simulator;
                break;
            // case DeviceModel.DeltaPro:
            //  EcoFlowAccessoryType = DeltaProAccessory;
            //  EcoFlowAccessorySimulatorType = DeltaProSimulator;
            //  break;
            // case DeviceModel.DeltaProUltra:
            //   EcoFlowAccessoryType = DeltaProUltraAccessory;
            //   EcoFlowAccessorySimulatorType = DeltaProUltraSimulator;
            //   break;
            case config_1.DeviceModel.PowerStream:
                EcoFlowAccessoryType = powerStreamAccessory_1.PowerStreamAccessory;
                EcoFlowAccessorySimulatorType = powerStreamSimulator_1.PowerStreamSimulator;
                break;
            default:
                log.warn(`"${config.model}" is not supported. Ignoring the device`);
        }
        config.simulator = EcoFlowAccessorySimulatorType;
        return EcoFlowAccessoryType === null
            ? null
            : new EcoFlowAccessoryType(this, accessory, config, log, this.httpApiManager, this.mqttApiManager);
    }
}
exports.EcoFlowHomebridgePlatform = EcoFlowHomebridgePlatform;
//# sourceMappingURL=platform.js.map