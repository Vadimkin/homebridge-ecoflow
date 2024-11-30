"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutletBatteryServiceBase = void 0;
const outletServiceBase_1 = require("@ecoflow/services/outletServiceBase");
class OutletBatteryServiceBase extends outletServiceBase_1.OutletServiceBase {
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
exports.OutletBatteryServiceBase = OutletBatteryServiceBase;
//# sourceMappingURL=outletBatteryServiceBase.js.map