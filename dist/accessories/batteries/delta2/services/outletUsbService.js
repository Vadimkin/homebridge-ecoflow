"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutletUsbService = void 0;
const delta2MqttApiContracts_1 = require("@ecoflow/accessories/batteries/delta2/interfaces/delta2MqttApiContracts");
const delta2OutletServiceBase_1 = require("@ecoflow/accessories/batteries/delta2/services/delta2OutletServiceBase");
const batteryHttpApiContracts_1 = require("@ecoflow/accessories/batteries/interfaces/batteryHttpApiContracts");
class OutletUsbService extends delta2OutletServiceBase_1.Delta2OutletServiceBase {
    constructor(ecoFlowAccessory) {
        super(ecoFlowAccessory, 'USB', ecoFlowAccessory.config.battery?.additionalCharacteristics);
    }
    setOn(value, revert) {
        return this.sendOn(delta2MqttApiContracts_1.Delta2MqttSetModuleType.PD, delta2MqttApiContracts_1.Delta2MqttSetOperationType.DcOutCfg, { enabled: value ? batteryHttpApiContracts_1.EnableType.On : batteryHttpApiContracts_1.EnableType.Off }, revert);
    }
}
exports.OutletUsbService = OutletUsbService;
//# sourceMappingURL=outletUsbService.js.map