"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PowerStreamSimulator = void 0;
const batteryHttpApiContracts_1 = require("@ecoflow/accessories/batteries/interfaces/batteryHttpApiContracts");
const powerStreamMqttApiContracts_1 = require("@ecoflow/accessories/powerstream/interfaces/powerStreamMqttApiContracts");
const simulator_1 = require("@ecoflow/apis/simulations/simulator");
class PowerStreamSimulator extends simulator_1.SimulatorTyped {
    generateQuota() {
        const quota = {
            cmdFunc: powerStreamMqttApiContracts_1.PowerStreamMqttMessageFuncType.Func20,
            cmdId: powerStreamMqttApiContracts_1.PowerStreamMqttMessageType.Heartbeat,
            param: {
                pv1InputWatts: this.getRandomNumber(1, 3000),
                pv2InputWatts: this.getRandomNumber(1, 3000),
                batInputWatts: this.getRandomNumber(-6000, 6000),
                batSoc: this.getRandomNumber(0, 100),
                invOutputWatts: this.getRandomNumber(-6000, 6000),
                invOnOff: this.getRandomBoolean() ? batteryHttpApiContracts_1.EnableType.On : batteryHttpApiContracts_1.EnableType.Off,
                supplyPriority: Math.floor(this.getRandomNumber(0, 1)),
                permanentWatts: this.getRandomNumber(0, 6000),
                upperLimit: Math.floor(this.getRandomNumber(1, 30)),
                lowerLimit: Math.floor(this.getRandomNumber(70, 100)),
                invBrightness: Math.floor(this.getRandomNumber(0, 1023)),
            },
        };
        return quota;
    }
    generateSetReplyTyped(message) {
        const reply = {
            id: message.id,
            version: message.version,
            data: {
                ack: false,
            },
        };
        return reply;
    }
}
exports.PowerStreamSimulator = PowerStreamSimulator;
//# sourceMappingURL=powerStreamSimulator.js.map