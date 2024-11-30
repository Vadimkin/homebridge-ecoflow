"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PowerDemandService = void 0;
const powerStreamMqttApiContracts_1 = require("@ecoflow/accessories/powerstream/interfaces/powerStreamMqttApiContracts");
const fanServiceBase_1 = require("@ecoflow/services/fanServiceBase");
class PowerDemandService extends fanServiceBase_1.FanServiceBase {
    constructor(ecoFlowAccessory, maxPowerDemand) {
        super(ecoFlowAccessory, maxPowerDemand, 'Power Demand');
    }
    processOnSetOn(state) {
        this.setRotationSpeed(state ? 100 : 0);
        return Promise.resolve();
    }
    processOnSetRotationSpeed(value, revert) {
        const message = {
            id: 0,
            version: '',
            cmdCode: powerStreamMqttApiContracts_1.PowerStreamMqttSetCmdCodeType.WN511_SET_PERMANENT_WATTS_PACK,
            params: {
                permanentWatts: value,
            },
        };
        return this.ecoFlowAccessory.sendSetCommand(message, revert);
    }
}
exports.PowerDemandService = PowerDemandService;
//# sourceMappingURL=powerDemandService.js.map