"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delta2Accessory = void 0;
const delta2AccessoryBase_1 = require("@ecoflow/accessories/batteries/delta2/delta2AccessoryBase");
const delta2MqttApiContracts_1 = require("@ecoflow/accessories/batteries/delta2/interfaces/delta2MqttApiContracts");
class Delta2Accessory extends delta2AccessoryBase_1.Delta2AccessoryBase {
    constructor(platform, accessory, config, log, httpApiManager, mqttApiManager) {
        super(platform, accessory, config, log, httpApiManager, mqttApiManager, {
            setAcModuleType: delta2MqttApiContracts_1.Delta2MqttSetModuleType.MPPT,
        });
    }
}
exports.Delta2Accessory = Delta2Accessory;
//# sourceMappingURL=delta2Accessory.js.map