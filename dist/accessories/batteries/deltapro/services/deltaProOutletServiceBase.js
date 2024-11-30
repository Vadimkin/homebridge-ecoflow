"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeltaProOutletServiceBase = void 0;
const outletServiceBase_1 = require("@ecoflow/services/outletServiceBase");
class DeltaProOutletServiceBase extends outletServiceBase_1.OutletServiceBase {
    sendOn(params, revert) {
        const message = {
            id: 0,
            version: '',
            operateType: 'TCP',
            params,
        };
        return this.ecoFlowAccessory.sendSetCommand(message, revert);
    }
}
exports.DeltaProOutletServiceBase = DeltaProOutletServiceBase;
//# sourceMappingURL=deltaProOutletServiceBase.js.map