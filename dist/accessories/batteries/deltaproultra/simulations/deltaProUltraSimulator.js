"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeltaProUltraSimulator = void 0;
const deltaProUltraHttpApiContracts_1 = require("@ecoflow/accessories/batteries/deltaproultra/interfaces/deltaProUltraHttpApiContracts");
const deltaProUltraMqttApiContracts_1 = require("@ecoflow/accessories/batteries/deltaproultra/interfaces/deltaProUltraMqttApiContracts");
const simulator_1 = require("@ecoflow/apis/simulations/simulator");
class DeltaProUltraSimulator extends simulator_1.SimulatorTyped {
    generateQuota() {
        const quotaType = this.getRandomNumber(0, 100);
        if (quotaType >= 0 && quotaType < 50) {
            const quotaPdStatus = {
                addr: deltaProUltraMqttApiContracts_1.DeltaProUltraMqttMessageAddrType.PD,
                param: {
                    soc: this.getRandomNumber(0, 100),
                    //acEnabled: this.getRandomBoolean() ? EnableType.On : EnableType.Off,
                    wattsInSum: this.getRandomNumber(0, 1000),
                    wattsOutSum: this.getRandomNumber(0, 1000),
                    // dcOutState: this.getRandomBoolean() ? EnableType.On : EnableType.Off,
                    outAcL11Pwr: this.getRandomNumber(0, 1000),
                    outAcTtPwr: this.getRandomNumber(0, 1000),
                    outUsb1Pwr: this.getRandomNumber(0, 100),
                    outTypec1Pwr: this.getRandomNumber(0, 100),
                },
            };
            return quotaPdStatus;
        }
        else {
            const quotaPdSetStatus = {
                addr: deltaProUltraMqttApiContracts_1.DeltaProUltraMqttMessageAddrType.PD_SET,
                param: {
                    acOutFreq: deltaProUltraHttpApiContracts_1.AcOutFrequencyType['50 Hz'],
                    // acXboost: this.getRandomBoolean() ? AcXBoostType.On : AcXBoostType.Off,
                },
            };
            return quotaPdSetStatus;
        }
    }
    generateSetReplyTyped(message) {
        const reply = {
            id: message.id,
            version: message.version,
            data: {
                result: false,
            },
        };
        return reply;
    }
}
exports.DeltaProUltraSimulator = DeltaProUltraSimulator;
//# sourceMappingURL=deltaProUltraSimulator.js.map