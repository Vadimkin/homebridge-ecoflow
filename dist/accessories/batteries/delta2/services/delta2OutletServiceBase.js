"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delta2OutletServiceBase = void 0;
const outletServiceBase_1 = require("@ecoflow/services/outletServiceBase");
class Delta2OutletServiceBase extends outletServiceBase_1.OutletServiceBase {
    sendOn(moduleType, operateType, params, revert) {
        const message = {
            id: 0,
            version: '',
            moduleType,
            operateType,
            params,
        };
        return this.ecoFlowAccessory.sendSetCommand(message, revert);
    }
}
exports.Delta2OutletServiceBase = Delta2OutletServiceBase;
//# sourceMappingURL=delta2OutletServiceBase.js.map