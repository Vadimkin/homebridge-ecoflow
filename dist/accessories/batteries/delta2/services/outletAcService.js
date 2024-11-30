"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutletAcService = void 0;
const delta2MqttApiContracts_1 = require("@ecoflow/accessories/batteries/delta2/interfaces/delta2MqttApiContracts");
const delta2OutletServiceBase_1 = require("@ecoflow/accessories/batteries/delta2/services/delta2OutletServiceBase");
const batteryHttpApiContracts_1 = require("@ecoflow/accessories/batteries/interfaces/batteryHttpApiContracts");
class OutletAcService extends delta2OutletServiceBase_1.Delta2OutletServiceBase {
    setModuleType;
    constructor(ecoFlowAccessory, setModuleType) {
        super(ecoFlowAccessory, 'AC', ecoFlowAccessory.config.battery?.additionalCharacteristics);
        this.setModuleType = setModuleType;
    }
    setOn(value, revert) {
        return this.sendOn(this.setModuleType, delta2MqttApiContracts_1.Delta2MqttSetOperationType.AcOutCfg, {
            out_voltage: batteryHttpApiContracts_1.AcOutVoltageIgnore,
            out_freq: batteryHttpApiContracts_1.AcOutFrequencyType.Ignore,
            xboost: batteryHttpApiContracts_1.AcXBoostType.Ignore,
            enabled: value ? batteryHttpApiContracts_1.AcEnableType.On : batteryHttpApiContracts_1.AcEnableType.Off,
        }, revert);
    }
}
exports.OutletAcService = OutletAcService;
//# sourceMappingURL=outletAcService.js.map