"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutletUsbService = void 0;
const deltaProOutletServiceBase_1 = require("@ecoflow/accessories/batteries/deltapro/services/deltaProOutletServiceBase");
class OutletUsbService extends deltaProOutletServiceBase_1.DeltaProOutletServiceBase {
    constructor(ecoFlowAccessory) {
        super(ecoFlowAccessory, 'USB', ecoFlowAccessory.config.battery?.additionalCharacteristics);
    }
    setOn() {
        throw new this.platform.api.hap.HapStatusError(-70404 /* this.platform.api.hap.HAPStatus.READ_ONLY_CHARACTERISTIC */);
    }
}
exports.OutletUsbService = OutletUsbService;
//# sourceMappingURL=outletUsbService.js.map