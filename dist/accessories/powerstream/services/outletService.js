"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutletService = void 0;
const outletServiceBase_1 = require("@ecoflow/services/outletServiceBase");
class OutletService extends outletServiceBase_1.OutletServiceBase {
    constructor(ecoFlowAccessory, serviceSubType, additionalCharacteristics) {
        super(ecoFlowAccessory, serviceSubType, additionalCharacteristics);
    }
    setOn() {
        throw new this.platform.api.hap.HapStatusError(-70404 /* this.platform.api.hap.HAPStatus.READ_ONLY_CHARACTERISTIC */);
    }
}
exports.OutletService = OutletService;
//# sourceMappingURL=outletService.js.map