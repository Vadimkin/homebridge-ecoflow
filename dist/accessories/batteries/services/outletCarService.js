"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutletCarService = void 0;
const mqttApiBatteryContracts_1 = require("@ecoflow/accessories/batteries/interfaces/mqttApiBatteryContracts");
const outletBatteryServiceBase_1 = require("@ecoflow/accessories/batteries/services/outletBatteryServiceBase");
class OutletCarService extends outletBatteryServiceBase_1.OutletBatteryServiceBase {
    constructor(ecoFlowAccessory) {
        super(ecoFlowAccessory, 'CAR', ecoFlowAccessory.config.battery?.additionalCharacteristics);
    }
    setOn(value, revert) {
        return this.sendOn(5, mqttApiBatteryContracts_1.MqttBatterySetOperationType.MpptCar, {
            enabled: Number(value),
        }, revert);
    }
}
exports.OutletCarService = OutletCarService;
//# sourceMappingURL=outletCarService.js.map