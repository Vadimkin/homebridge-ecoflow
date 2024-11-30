"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delta2MqttSetModuleType = exports.Delta2MqttSetOperationType = exports.Delta2MqttMessageType = void 0;
var Delta2MqttMessageType;
(function (Delta2MqttMessageType) {
    Delta2MqttMessageType["PD"] = "pdStatus";
    Delta2MqttMessageType["MPPT"] = "mpptStatus";
    Delta2MqttMessageType["INV"] = "invStatus";
    Delta2MqttMessageType["BMS"] = "bmsStatus";
})(Delta2MqttMessageType || (exports.Delta2MqttMessageType = Delta2MqttMessageType = {}));
var Delta2MqttSetOperationType;
(function (Delta2MqttSetOperationType) {
    Delta2MqttSetOperationType["MpptCar"] = "mpptCar";
    Delta2MqttSetOperationType["DcOutCfg"] = "dcOutCfg";
    Delta2MqttSetOperationType["AcOutCfg"] = "acOutCfg";
})(Delta2MqttSetOperationType || (exports.Delta2MqttSetOperationType = Delta2MqttSetOperationType = {}));
var Delta2MqttSetModuleType;
(function (Delta2MqttSetModuleType) {
    Delta2MqttSetModuleType[Delta2MqttSetModuleType["PD"] = 1] = "PD";
    Delta2MqttSetModuleType[Delta2MqttSetModuleType["BMS"] = 2] = "BMS";
    Delta2MqttSetModuleType[Delta2MqttSetModuleType["INV"] = 3] = "INV";
    Delta2MqttSetModuleType[Delta2MqttSetModuleType["MPPT"] = 5] = "MPPT";
})(Delta2MqttSetModuleType || (exports.Delta2MqttSetModuleType = Delta2MqttSetModuleType = {}));
//# sourceMappingURL=delta2MqttApiContracts.js.map