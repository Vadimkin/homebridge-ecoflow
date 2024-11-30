"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutletInvService = void 0;
const outletServiceBase_1 = require("@ecoflow/services/outletServiceBase");
class OutletInvService extends outletServiceBase_1.OutletServiceBase {
    constructor(ecoFlowAccessory, additionalCharacteristics) {
        super(ecoFlowAccessory, 'INV', additionalCharacteristics);
    }
    setOn() {
        throw new this.platform.api.hap.HapStatusError(-70404 /* this.platform.api.hap.HAPStatus.READ_ONLY_CHARACTERISTIC */);
    }
}
exports.OutletInvService = OutletInvService;
//# sourceMappingURL=outletInvService.js.map