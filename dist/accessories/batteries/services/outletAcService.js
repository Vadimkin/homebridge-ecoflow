"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutletAcService = void 0;
const mqttApiBatteryContracts_1 = require("@ecoflow/accessories/batteries/interfaces/mqttApiBatteryContracts");
const outletBatteryServiceBase_1 = require("@ecoflow/accessories/batteries/services/outletBatteryServiceBase");
class OutletAcService extends outletBatteryServiceBase_1.OutletBatteryServiceBase {
    ecoFlowAccessory;
    constructor(ecoFlowAccessory) {
        super(ecoFlowAccessory, 'AC', ecoFlowAccessory.config.battery?.additionalCharacteristics);
        this.ecoFlowAccessory = ecoFlowAccessory;
    }
    setOn(value, revert) {
        return this.sendOn(3, mqttApiBatteryContracts_1.MqttBatterySetOperationType.AcOutCfg, {
            out_voltage: this.ecoFlowAccessory.quota.inv.cfgAcOutVol !== undefined
                ? this.ecoFlowAccessory.quota.inv.cfgAcOutVol
                : 220000,
            out_freq: this.ecoFlowAccessory.quota.inv.cfgAcOutFreq !== undefined ? this.ecoFlowAccessory.quota.inv.cfgAcOutFreq : 1,
            xboost: Number(this.ecoFlowAccessory.quota.inv.cfgAcXboost !== undefined ? this.ecoFlowAccessory.quota.inv.cfgAcXboost : true),
            enabled: Number(value),
        }, revert);
    }
}
exports.OutletAcService = OutletAcService;
//# sourceMappingURL=outletAcService.js.map