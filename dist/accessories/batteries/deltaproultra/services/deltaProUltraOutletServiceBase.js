"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeltaProUltraOutletServiceBase = void 0;
const outletServiceBase_1 = require("@ecoflow/services/outletServiceBase");
class DeltaProUltraOutletServiceBase extends outletServiceBase_1.OutletServiceBase {
    sendOn(cmdCode, params, revert) {
        const message = {
            id: 0,
            version: '',
            cmdCode,
            params,
        };
        return this.ecoFlowAccessory.sendSetCommand(message, revert);
    }
}
exports.DeltaProUltraOutletServiceBase = DeltaProUltraOutletServiceBase;
//# sourceMappingURL=deltaProUltraOutletServiceBase.js.map