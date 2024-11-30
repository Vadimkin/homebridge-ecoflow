"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwitchXboostService = void 0;
const batteryHttpApiContracts_1 = require("@ecoflow/accessories/batteries/interfaces/batteryHttpApiContracts");
const switchXboostServiceBase_1 = require("@ecoflow/services/switchXboostServiceBase");
class SwitchXboostService extends switchXboostServiceBase_1.SwitchXboostServiceBase {
    ecoFlowAccessory;
    constructor(ecoFlowAccessory) {
        super(ecoFlowAccessory);
        this.ecoFlowAccessory = ecoFlowAccessory;
    }
    setOn(value, revert) {
        return this.sendOn({
            cmdSet: 32,
            id: 66,
            xboost: value ? batteryHttpApiContracts_1.AcXBoostType.On : batteryHttpApiContracts_1.AcXBoostType.Off,
            enabled: batteryHttpApiContracts_1.AcEnableType.Ignore,
        }, revert);
    }
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
exports.SwitchXboostService = SwitchXboostService;
//# sourceMappingURL=switchXboostService.js.map