"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutletAcService = void 0;
const deltaProUltraOutletServiceBase_1 = require("@ecoflow/accessories/batteries/deltaproultra/services/deltaProUltraOutletServiceBase");
class OutletAcService extends deltaProUltraOutletServiceBase_1.DeltaProUltraOutletServiceBase {
    constructor(ecoFlowAccessory) {
        super(ecoFlowAccessory, 'AC', ecoFlowAccessory.config.battery?.additionalCharacteristics);
    }
    setOn() {
        throw new this.platform.api.hap.HapStatusError(-70404 /* this.platform.api.hap.HAPStatus.READ_ONLY_CHARACTERISTIC */);
    }
}
exports.OutletAcService = OutletAcService;
//# sourceMappingURL=outletAcService.js.map