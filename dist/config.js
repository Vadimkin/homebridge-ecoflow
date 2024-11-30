"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PowerStreamConsumptionType = exports.AdditionalBatteryCharacteristicType = exports.LocationType = exports.DeviceModel = void 0;
var DeviceModel;
(function (DeviceModel) {
    DeviceModel["Delta2Max"] = "Delta 2 Max";
    DeviceModel["Delta2"] = "Delta 2";
    // DeltaPro = 'Delta Pro',
    // DeltaProUltra = 'Delta Pro Ultra',
    DeviceModel["PowerStream"] = "PowerStream";
})(DeviceModel || (exports.DeviceModel = DeviceModel = {}));
var LocationType;
(function (LocationType) {
    LocationType["EU"] = "EU";
    LocationType["US"] = "US";
})(LocationType || (exports.LocationType = LocationType = {}));
var AdditionalBatteryCharacteristicType;
(function (AdditionalBatteryCharacteristicType) {
    AdditionalBatteryCharacteristicType["BatteryLevel"] = "Battery Level, %";
    AdditionalBatteryCharacteristicType["InputConsumptionInWatts"] = "Input Consumption, W";
    AdditionalBatteryCharacteristicType["OutputConsumptionInWatts"] = "Output Consumption, W";
})(AdditionalBatteryCharacteristicType || (exports.AdditionalBatteryCharacteristicType = AdditionalBatteryCharacteristicType = {}));
var PowerStreamConsumptionType;
(function (PowerStreamConsumptionType) {
    PowerStreamConsumptionType[PowerStreamConsumptionType["W600"] = 600] = "W600";
    PowerStreamConsumptionType[PowerStreamConsumptionType["W800"] = 800] = "W800";
})(PowerStreamConsumptionType || (exports.PowerStreamConsumptionType = PowerStreamConsumptionType = {}));
//# sourceMappingURL=config.js.map