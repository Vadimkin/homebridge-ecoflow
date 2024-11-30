"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutletCarService = void 0;
const deltaProOutletServiceBase_1 = require("@ecoflow/accessories/batteries/deltapro/services/deltaProOutletServiceBase");
const batteryHttpApiContracts_1 = require("@ecoflow/accessories/batteries/interfaces/batteryHttpApiContracts");
class OutletCarService extends deltaProOutletServiceBase_1.DeltaProOutletServiceBase {
    constructor(ecoFlowAccessory) {
        super(ecoFlowAccessory, 'CAR', ecoFlowAccessory.config.battery?.additionalCharacteristics);
    }
    setOn(value, revert) {
        return this.sendOn({
            cmdSet: 32,
            id: 81,
            enabled: value ? batteryHttpApiContracts_1.EnableType.On : batteryHttpApiContracts_1.EnableType.Off,
        }, revert);
    }
}
exports.OutletCarService = OutletCarService;
//# sourceMappingURL=outletCarService.js.map