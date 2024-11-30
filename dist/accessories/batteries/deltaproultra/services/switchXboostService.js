"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwitchXboostService = void 0;
const deltaProUltraHttpApiContracts_1 = require("@ecoflow/accessories/batteries/deltaproultra/interfaces/deltaProUltraHttpApiContracts");
const deltaProUltraMqttApiContracts_1 = require("@ecoflow/accessories/batteries/deltaproultra/interfaces/deltaProUltraMqttApiContracts");
const batteryHttpApiContracts_1 = require("@ecoflow/accessories/batteries/interfaces/batteryHttpApiContracts");
const switchXboostServiceBase_1 = require("@ecoflow/services/switchXboostServiceBase");
class SwitchXboostService extends switchXboostServiceBase_1.SwitchXboostServiceBase {
    ecoFlowAccessory;
    constructor(ecoFlowAccessory) {
        super(ecoFlowAccessory);
        this.ecoFlowAccessory = ecoFlowAccessory;
    }
    setOn(value, revert) {
        return this.sendOn(deltaProUltraMqttApiContracts_1.DeltaProUltraMqttSetCmdCodeType.YJ751_PD_AC_DSG_SET, {
            xboost: value ? batteryHttpApiContracts_1.AcXBoostType.On : batteryHttpApiContracts_1.AcXBoostType.Off,
            outFreq: deltaProUltraHttpApiContracts_1.AcOutFrequencyType.None,
        }, revert);
    }
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
exports.SwitchXboostService = SwitchXboostService;
//# sourceMappingURL=switchXboostService.js.map