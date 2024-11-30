"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PowerStreamMqttSetCmdCodeType = exports.PowerStreamMqttMessageFuncType = exports.PowerStreamMqttMessageType = void 0;
var PowerStreamMqttMessageType;
(function (PowerStreamMqttMessageType) {
    PowerStreamMqttMessageType[PowerStreamMqttMessageType["Heartbeat"] = 1] = "Heartbeat";
    PowerStreamMqttMessageType[PowerStreamMqttMessageType["Task"] = 134] = "Task";
})(PowerStreamMqttMessageType || (exports.PowerStreamMqttMessageType = PowerStreamMqttMessageType = {}));
var PowerStreamMqttMessageFuncType;
(function (PowerStreamMqttMessageFuncType) {
    PowerStreamMqttMessageFuncType[PowerStreamMqttMessageFuncType["Func20"] = 20] = "Func20";
})(PowerStreamMqttMessageFuncType || (exports.PowerStreamMqttMessageFuncType = PowerStreamMqttMessageFuncType = {}));
var PowerStreamMqttSetCmdCodeType;
(function (PowerStreamMqttSetCmdCodeType) {
    PowerStreamMqttSetCmdCodeType["WN511_SET_SUPPLY_PRIORITY_PACK"] = "WN511_SET_SUPPLY_PRIORITY_PACK";
    PowerStreamMqttSetCmdCodeType["WN511_SET_PERMANENT_WATTS_PACK"] = "WN511_SET_PERMANENT_WATTS_PACK";
    PowerStreamMqttSetCmdCodeType["WN511_SET_BAT_LOWER_PACK"] = "WN511_SET_BAT_LOWER_PACK";
    PowerStreamMqttSetCmdCodeType["WN511_SET_BAT_UPPER_PACK"] = "WN511_SET_BAT_UPPER_PACK";
    PowerStreamMqttSetCmdCodeType["WN511_SET_BRIGHTNESS_PACK"] = "WN511_SET_BRIGHTNESS_PACK";
})(PowerStreamMqttSetCmdCodeType || (exports.PowerStreamMqttSetCmdCodeType = PowerStreamMqttSetCmdCodeType = {}));
//# sourceMappingURL=powerStreamMqttApiContracts.js.map