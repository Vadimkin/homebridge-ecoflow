"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutletAcService = void 0;
const deltaProOutletServiceBase_1 = require("@ecoflow/accessories/batteries/deltapro/services/deltaProOutletServiceBase");
const batteryHttpApiContracts_1 = require("@ecoflow/accessories/batteries/interfaces/batteryHttpApiContracts");
class OutletAcService extends deltaProOutletServiceBase_1.DeltaProOutletServiceBase {
    constructor(ecoFlowAccessory) {
        super(ecoFlowAccessory, 'AC', ecoFlowAccessory.config.battery?.additionalCharacteristics);
    }
    setOn(value, revert) {
        return this.sendOn({
            cmdSet: 32,
            id: 66,
            xboost: batteryHttpApiContracts_1.AcXBoostType.Ignore,
            enabled: value ? batteryHttpApiContracts_1.AcEnableType.On : batteryHttpApiContracts_1.AcEnableType.Off,
        }, revert);
    }
}
exports.OutletAcService = OutletAcService;
//# sourceMappingURL=outletAcService.js.map