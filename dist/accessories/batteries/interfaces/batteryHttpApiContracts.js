"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcOutVoltageIgnore = exports.AcOutFrequencyType = exports.AcXBoostType = exports.AcEnableType = exports.EnableType = void 0;
var EnableType;
(function (EnableType) {
    EnableType[EnableType["Off"] = 0] = "Off";
    EnableType[EnableType["On"] = 1] = "On";
})(EnableType || (exports.EnableType = EnableType = {}));
var AcEnableType;
(function (AcEnableType) {
    AcEnableType[AcEnableType["Off"] = 0] = "Off";
    AcEnableType[AcEnableType["On"] = 1] = "On";
    AcEnableType[AcEnableType["Ignore"] = 255] = "Ignore";
})(AcEnableType || (exports.AcEnableType = AcEnableType = {}));
var AcXBoostType;
(function (AcXBoostType) {
    AcXBoostType[AcXBoostType["Off"] = 0] = "Off";
    AcXBoostType[AcXBoostType["On"] = 1] = "On";
    AcXBoostType[AcXBoostType["Ignore"] = 255] = "Ignore";
})(AcXBoostType || (exports.AcXBoostType = AcXBoostType = {}));
var AcOutFrequencyType;
(function (AcOutFrequencyType) {
    AcOutFrequencyType[AcOutFrequencyType["50 Hz"] = 1] = "50 Hz";
    AcOutFrequencyType[AcOutFrequencyType["60 Hz"] = 2] = "60 Hz";
    AcOutFrequencyType[AcOutFrequencyType["Ignore"] = 255] = "Ignore";
})(AcOutFrequencyType || (exports.AcOutFrequencyType = AcOutFrequencyType = {}));
exports.AcOutVoltageIgnore = 0xffffffff;
//# sourceMappingURL=batteryHttpApiContracts.js.map