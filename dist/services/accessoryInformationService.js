"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessoryInformationService = void 0;
const serviceBase_1 = require("@ecoflow/services/serviceBase");
const fs_1 = require("fs");
const path_1 = require("path");
const packageJsonPath = (0, path_1.join)(__dirname, '../../package.json');
class AccessoryInformationService extends serviceBase_1.ServiceBase {
    ecoFlowAccessory;
    constructor(ecoFlowAccessory) {
        super(ecoFlowAccessory.platform.Service.AccessoryInformation, ecoFlowAccessory);
        this.ecoFlowAccessory = ecoFlowAccessory;
    }
    addCharacteristics() {
        const characteristics = [
            this.addCharacteristic(this.platform.Characteristic.Manufacturer),
            this.addCharacteristic(this.platform.Characteristic.Model),
            this.addCharacteristic(this.platform.Characteristic.SerialNumber),
            this.addCharacteristic(this.platform.Characteristic.FirmwareRevision),
            this.addCharacteristic(this.platform.Characteristic.Identify),
        ];
        this.service
            .setCharacteristic(this.platform.Characteristic.Manufacturer, 'EcoFlow')
            .setCharacteristic(this.platform.Characteristic.Model, this.ecoFlowAccessory.config.model)
            .setCharacteristic(this.platform.Characteristic.SerialNumber, this.ecoFlowAccessory.config.serialNumber)
            .setCharacteristic(this.platform.Characteristic.FirmwareRevision, this.getVersion());
        return characteristics;
    }
    getVersion() {
        const packageJson = JSON.parse((0, fs_1.readFileSync)(packageJsonPath, 'utf-8'));
        return packageJson?.version;
    }
}
exports.AccessoryInformationService = AccessoryInformationService;
//# sourceMappingURL=accessoryInformationService.js.map