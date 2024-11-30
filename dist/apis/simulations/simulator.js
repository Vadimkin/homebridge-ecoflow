"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimulatorTyped = exports.Simulator = void 0;
class Simulator {
    getRandomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }
    getRandomBoolean() {
        return Math.random() < 0.5;
    }
}
exports.Simulator = Simulator;
class SimulatorTyped extends Simulator {
    generateSetReply(message) {
        const msgObj = JSON.parse(message);
        return this.generateSetReplyTyped(msgObj);
    }
    getRandomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }
    getRandomBoolean() {
        return Math.random() < 0.5;
    }
}
exports.SimulatorTyped = SimulatorTyped;
//# sourceMappingURL=simulator.js.map