"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutletCarService = void 0;
const batteryHttpApiContracts_1 = require("@ecoflow/accessories/batteries/interfaces/batteryHttpApiContracts");
const delta2MqttApiContracts_1 = require("@ecoflow/accessories/batteries/delta2/interfaces/delta2MqttApiContracts");
const delta2OutletServiceBase_1 = require("@ecoflow/accessories/batteries/delta2/services/delta2OutletServiceBase");
class OutletCarService extends delta2OutletServiceBase_1.Delta2OutletServiceBase {
    constructor(ecoFlowAccessory) {
        super(ecoFlowAccessory, 'CAR', ecoFlowAccessory.config.battery?.additionalCharacteristics);
    }
    setOn(value, revert) {
        return this.sendOn(delta2MqttApiContracts_1.Delta2MqttSetModuleType.MPPT, delta2MqttApiContracts_1.Delta2MqttSetOperationType.MpptCar, { enabled: value ? batteryHttpApiContracts_1.EnableType.On : batteryHttpApiContracts_1.EnableType.Off }, revert);
    }
}
exports.OutletCarService = OutletCarService;
//# sourceMappingURL=outletCarService.js.map