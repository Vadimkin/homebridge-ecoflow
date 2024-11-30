"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MachineIdProvider = void 0;
const node_machine_id_1 = require("node-machine-id");
const uuid_1 = require("uuid");
class MachineIdProvider {
    async getMachineId(log) {
        try {
            const id = await (0, node_machine_id_1.machineId)();
            return id;
        }
        catch (error) {
            log.warn('Can not get Machine ID. Using UUID instead', error);
            return (0, uuid_1.v4)();
        }
    }
}
exports.MachineIdProvider = MachineIdProvider;
//# sourceMappingURL=machineIdProvider.js.map