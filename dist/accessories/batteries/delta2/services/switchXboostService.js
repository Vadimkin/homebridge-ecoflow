"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwitchXboostService = void 0;
const delta2MqttApiContracts_1 = require("@ecoflow/accessories/batteries/delta2/interfaces/delta2MqttApiContracts");
const batteryHttpApiContracts_1 = require("@ecoflow/accessories/batteries/interfaces/batteryHttpApiContracts");
const switchXboostServiceBase_1 = require("@ecoflow/services/switchXboostServiceBase");
class SwitchXboostService extends switchXboostServiceBase_1.SwitchXboostServiceBase {
    setAcModuleType;
    constructor(ecoFlowAccessory, setAcModuleType) {
        super(ecoFlowAccessory);
        this.setAcModuleType = setAcModuleType;
    }
    setOn(value, revert) {
        return this.sendOn(this.setAcModuleType, delta2MqttApiContracts_1.Delta2MqttSetOperationType.AcOutCfg, {
            out_voltage: batteryHttpApiContracts_1.AcOutVoltageIgnore,
            out_freq: batteryHttpApiContracts_1.AcOutFrequencyType.Ignore,
            xboost: value ? batteryHttpApiContracts_1.AcXBoostType.On : batteryHttpApiContracts_1.AcXBoostType.Off,
            enabled: batteryHttpApiContracts_1.AcEnableType.Ignore,
        }, revert);
    }
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
exports.SwitchXboostService = SwitchXboostService;
//# sourceMappingURL=switchXboostService.js.map