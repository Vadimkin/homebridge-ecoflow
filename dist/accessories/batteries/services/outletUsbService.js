"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutletUsbService = void 0;
const mqttApiBatteryContracts_1 = require("@ecoflow/accessories/batteries/interfaces/mqttApiBatteryContracts");
const outletBatteryServiceBase_1 = require("@ecoflow/accessories/batteries/services/outletBatteryServiceBase");
class OutletUsbService extends outletBatteryServiceBase_1.OutletBatteryServiceBase {
    constructor(ecoFlowAccessory) {
        super(ecoFlowAccessory, 'USB', ecoFlowAccessory.config.battery?.additionalCharacteristics);
    }
    setOn(value, revert) {
        return this.sendOn(1, mqttApiBatteryContracts_1.MqttBatterySetOperationType.DcOutCfg, { enabled: Number(value) }, revert);
    }
}
exports.OutletUsbService = OutletUsbService;
//# sourceMappingURL=outletUsbService.js.map