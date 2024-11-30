"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeltaProSimulator = void 0;
const batteryHttpApiContracts_1 = require("@ecoflow/accessories/batteries/interfaces/batteryHttpApiContracts");
const simulator_1 = require("@ecoflow/apis/simulations/simulator");
class DeltaProSimulator extends simulator_1.SimulatorTyped {
    generateQuota() {
        const quota = {
            data: {
                bmsMaster: {
                    f32ShowSoc: this.getRandomNumber(0, 100),
                },
                inv: {
                    cfgAcEnabled: this.getRandomBoolean() ? batteryHttpApiContracts_1.AcEnableType.On : batteryHttpApiContracts_1.AcEnableType.Off,
                    cfgAcOutFreq: batteryHttpApiContracts_1.AcOutFrequencyType['50 Hz'],
                    cfgAcOutVoltage: 220000,
                    cfgAcXboost: this.getRandomBoolean() ? batteryHttpApiContracts_1.AcXBoostType.On : batteryHttpApiContracts_1.AcXBoostType.Off,
                    inputWatts: this.getRandomNumber(0, 1000),
                    outputWatts: this.getRandomNumber(0, 1000),
                },
                pd: {
                    carState: this.getRandomBoolean() ? batteryHttpApiContracts_1.EnableType.On : batteryHttpApiContracts_1.EnableType.Off,
                    carWatts: this.getRandomNumber(0, 1000),
                    dcOutState: this.getRandomBoolean() ? batteryHttpApiContracts_1.EnableType.On : batteryHttpApiContracts_1.EnableType.Off,
                    typec1Watts: this.getRandomNumber(0, 100),
                    typec2Watts: this.getRandomNumber(0, 100),
                },
            },
        };
        return quota;
    }
    generateSetReplyTyped(message) {
        const reply = {
            id: message.id,
            version: message.version,
            operateType: message.operateType,
            data: {
                cmdSet: message.params.cmdSet,
                id: message.params.id,
                ack: false,
            },
        };
        return reply;
    }
}
exports.DeltaProSimulator = DeltaProSimulator;
//# sourceMappingURL=deltaProSimulator.js.map