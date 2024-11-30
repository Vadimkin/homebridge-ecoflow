"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatterySimulator = void 0;
const mqttApiBatteryContracts_1 = require("@ecoflow/accessories/batteries/interfaces/mqttApiBatteryContracts");
const simulator_1 = require("@ecoflow/apis/simulations/simulator");
class BatterySimulator extends simulator_1.SimulatorTyped {
    generateQuota() {
        const quotaType = this.getRandomNumber(0, 100);
        if (quotaType >= 0 && quotaType < 33) {
            const quotaBmsStatus = {
                typeCode: mqttApiBatteryContracts_1.MqttBatteryMessageType.EMS,
                params: {
                    f32LcdShowSoc: this.getRandomNumber(0, 100),
                },
            };
            return quotaBmsStatus;
        }
        else if (quotaType >= 33 && quotaType < 66) {
            const quotaInvStatus = {
                typeCode: mqttApiBatteryContracts_1.MqttBatteryMessageType.INV,
                params: {
                    cfgAcEnabled: this.getRandomBoolean(),
                    cfgAcOutFreq: 50,
                    cfgAcOutVol: 220000,
                    cfgAcXboost: this.getRandomBoolean(),
                    inputWatts: this.getRandomNumber(0, 1000),
                    outputWatts: this.getRandomNumber(0, 1000),
                },
            };
            return quotaInvStatus;
        }
        else {
            const quotaPdStatus = {
                typeCode: mqttApiBatteryContracts_1.MqttBatteryMessageType.PD,
                params: {
                    carState: this.getRandomBoolean(),
                    carWatts: this.getRandomNumber(0, 1000),
                    dcOutState: this.getRandomBoolean(),
                    typec1Watts: this.getRandomNumber(0, 100),
                    typec2Watts: this.getRandomNumber(0, 100),
                },
            };
            return quotaPdStatus;
        }
    }
    generateSetReplyTyped(message) {
        const reply = {
            id: message.id,
            version: message.version,
            moduleType: message.moduleType,
            operateType: message.operateType,
            data: {
                ack: false,
            },
        };
        return reply;
    }
}
exports.BatterySimulator = BatterySimulator;
//# sourceMappingURL=batterySimulator.js.map