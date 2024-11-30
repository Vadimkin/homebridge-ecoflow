"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delta2Simulator = void 0;
const delta2MqttApiContracts_1 = require("@ecoflow/accessories/batteries/delta2/interfaces/delta2MqttApiContracts");
const batteryHttpApiContracts_1 = require("@ecoflow/accessories/batteries/interfaces/batteryHttpApiContracts");
const simulator_1 = require("@ecoflow/apis/simulations/simulator");
class Delta2Simulator extends simulator_1.SimulatorTyped {
    generateQuota() {
        const quotaType = this.getRandomNumber(0, 100);
        if (quotaType >= 0 && quotaType < 25) {
            const quotaBmsStatus = {
                typeCode: delta2MqttApiContracts_1.Delta2MqttMessageType.BMS,
                params: {
                    f32ShowSoc: this.getRandomNumber(0, 100),
                },
            };
            return quotaBmsStatus;
        }
        else if (quotaType >= 25 && quotaType < 50) {
            const quotaInvStatus = {
                typeCode: delta2MqttApiContracts_1.Delta2MqttMessageType.INV,
                params: {
                    cfgAcEnabled: this.getRandomBoolean() ? batteryHttpApiContracts_1.AcEnableType.On : batteryHttpApiContracts_1.AcEnableType.Off,
                    cfgAcOutFreq: batteryHttpApiContracts_1.AcOutFrequencyType['50 Hz'],
                    cfgAcOutVol: 220000,
                    cfgAcXboost: this.getRandomBoolean() ? batteryHttpApiContracts_1.AcXBoostType.On : batteryHttpApiContracts_1.AcXBoostType.Off,
                    inputWatts: this.getRandomNumber(0, 1000),
                    outputWatts: this.getRandomNumber(0, 1000),
                },
            };
            return quotaInvStatus;
        }
        else if (quotaType >= 50 && quotaType < 75) {
            const quotaPdStatus = {
                typeCode: delta2MqttApiContracts_1.Delta2MqttMessageType.PD,
                params: {
                    carState: this.getRandomBoolean() ? batteryHttpApiContracts_1.EnableType.On : batteryHttpApiContracts_1.EnableType.Off,
                    carWatts: this.getRandomNumber(0, 1000),
                    dcOutState: this.getRandomBoolean() ? batteryHttpApiContracts_1.EnableType.On : batteryHttpApiContracts_1.EnableType.Off,
                    typec1Watts: this.getRandomNumber(0, 100),
                    typec2Watts: this.getRandomNumber(0, 100),
                },
            };
            return quotaPdStatus;
        }
        else {
            const quotaMpptStatus = {
                typeCode: delta2MqttApiContracts_1.Delta2MqttMessageType.MPPT,
                params: {
                    cfgAcEnabled: this.getRandomBoolean() ? batteryHttpApiContracts_1.AcEnableType.On : batteryHttpApiContracts_1.AcEnableType.Off,
                    cfgAcOutVol: 220000,
                    cfgAcXboost: this.getRandomBoolean() ? batteryHttpApiContracts_1.AcXBoostType.On : batteryHttpApiContracts_1.AcXBoostType.Off,
                },
            };
            return quotaMpptStatus;
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
exports.Delta2Simulator = Delta2Simulator;
//# sourceMappingURL=delta2Simulator.js.map