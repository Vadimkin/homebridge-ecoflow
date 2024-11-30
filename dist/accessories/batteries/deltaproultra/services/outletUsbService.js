"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutletUsbService = void 0;
const deltaProUltraMqttApiContracts_1 = require("@ecoflow/accessories/batteries/deltaproultra/interfaces/deltaProUltraMqttApiContracts");
const deltaProUltraOutletServiceBase_1 = require("@ecoflow/accessories/batteries/deltaproultra/services/deltaProUltraOutletServiceBase");
const batteryHttpApiContracts_1 = require("@ecoflow/accessories/batteries/interfaces/batteryHttpApiContracts");
class OutletUsbService extends deltaProUltraOutletServiceBase_1.DeltaProUltraOutletServiceBase {
    constructor(ecoFlowAccessory) {
        super(ecoFlowAccessory, 'USB', ecoFlowAccessory.config.battery?.additionalCharacteristics);
    }
    setOn(value, revert) {
        return this.sendOn(deltaProUltraMqttApiContracts_1.DeltaProUltraMqttSetCmdCodeType.YJ751_PD_DC_SWITCH_SET, {
            enabled: value ? batteryHttpApiContracts_1.AcEnableType.On : batteryHttpApiContracts_1.AcEnableType.Off,
        }, revert);
    }
}
exports.OutletUsbService = OutletUsbService;
//# sourceMappingURL=outletUsbService.js.map