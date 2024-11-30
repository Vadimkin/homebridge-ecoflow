"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MqttBatterySetOperationType = exports.MqttBatteryMessageType = void 0;
var MqttBatteryMessageType;
(function (MqttBatteryMessageType) {
    MqttBatteryMessageType["PD"] = "pdStatus";
    MqttBatteryMessageType["MPPT"] = "mpptStatus";
    MqttBatteryMessageType["INV"] = "invStatus";
    MqttBatteryMessageType["BMS"] = "bmsStatus";
    MqttBatteryMessageType["EMS"] = "emsStatus";
})(MqttBatteryMessageType || (exports.MqttBatteryMessageType = MqttBatteryMessageType = {}));
var MqttBatterySetOperationType;
(function (MqttBatterySetOperationType) {
    MqttBatterySetOperationType["MpptCar"] = "mpptCar";
    MqttBatterySetOperationType["DcOutCfg"] = "dcOutCfg";
    MqttBatterySetOperationType["AcOutCfg"] = "acOutCfg";
})(MqttBatterySetOperationType || (exports.MqttBatterySetOperationType = MqttBatterySetOperationType = {}));
//# sourceMappingURL=mqttApiBatteryContracts.js.map