"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MqttPowerStreamSetCmdCodeType = exports.MqttPowerStreamMessageFuncType = exports.MqttPowerStreamMessageType = void 0;
var MqttPowerStreamMessageType;
(function (MqttPowerStreamMessageType) {
    MqttPowerStreamMessageType[MqttPowerStreamMessageType["Heartbeat"] = 1] = "Heartbeat";
    MqttPowerStreamMessageType[MqttPowerStreamMessageType["Task"] = 134] = "Task";
})(MqttPowerStreamMessageType || (exports.MqttPowerStreamMessageType = MqttPowerStreamMessageType = {}));
var MqttPowerStreamMessageFuncType;
(function (MqttPowerStreamMessageFuncType) {
    MqttPowerStreamMessageFuncType[MqttPowerStreamMessageFuncType["Func20"] = 20] = "Func20";
})(MqttPowerStreamMessageFuncType || (exports.MqttPowerStreamMessageFuncType = MqttPowerStreamMessageFuncType = {}));
var MqttPowerStreamSetCmdCodeType;
(function (MqttPowerStreamSetCmdCodeType) {
    MqttPowerStreamSetCmdCodeType["WN511_SET_SUPPLY_PRIORITY_PACK"] = "WN511_SET_SUPPLY_PRIORITY_PACK";
    MqttPowerStreamSetCmdCodeType["WN511_SET_PERMANENT_WATTS_PACK"] = "WN511_SET_PERMANENT_WATTS_PACK";
    MqttPowerStreamSetCmdCodeType["WN511_SET_BAT_LOWER_PACK"] = "WN511_SET_BAT_LOWER_PACK";
    MqttPowerStreamSetCmdCodeType["WN511_SET_BAT_UPPER_PACK"] = "WN511_SET_BAT_UPPER_PACK";
    MqttPowerStreamSetCmdCodeType["WN511_SET_BRIGHTNESS_PACK"] = "WN511_SET_BRIGHTNESS_PACK";
})(MqttPowerStreamSetCmdCodeType || (exports.MqttPowerStreamSetCmdCodeType = MqttPowerStreamSetCmdCodeType = {}));
//# sourceMappingURL=mqttApiPowerStreamContracts.js.map