"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delta2MaxAccessory = void 0;
const delta2AccessoryBase_1 = require("@ecoflow/accessories/batteries/delta2/delta2AccessoryBase");
const delta2MqttApiContracts_1 = require("@ecoflow/accessories/batteries/delta2/interfaces/delta2MqttApiContracts");
class Delta2MaxAccessory extends delta2AccessoryBase_1.Delta2AccessoryBase {
    constructor(platform, accessory, config, log, httpApiManager, mqttApiManager) {
        super(platform, accessory, config, log, httpApiManager, mqttApiManager, {
            setAcModuleType: delta2MqttApiContracts_1.Delta2MqttSetModuleType.INV,
        });
    }
}
exports.Delta2MaxAccessory = Delta2MaxAccessory;
//# sourceMappingURL=delta2MaxAccessory.js.map