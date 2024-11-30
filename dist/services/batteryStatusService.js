"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatteryStatusService = void 0;
const serviceBase_1 = require("@ecoflow/services/serviceBase");
class BatteryStatusService extends serviceBase_1.ServiceBase {
    ecoFlowAccessory;
    constructor(ecoFlowAccessory, serviceSubType) {
        super(ecoFlowAccessory.platform.Service.Battery, ecoFlowAccessory, serviceSubType);
        this.ecoFlowAccessory = ecoFlowAccessory;
    }
    addCharacteristics() {
        return [
            this.addCharacteristic(this.platform.Characteristic.StatusLowBattery),
            this.addCharacteristic(this.platform.Characteristic.BatteryLevel),
            this.addCharacteristic(this.platform.Characteristic.ChargingState),
        ];
    }
    updateBatteryLevel(batteryLevel) {
        this.updateCharacteristic(this.platform.Characteristic.BatteryLevel, 'BatteryLevel', batteryLevel);
        this.updateStatusLowBattery(batteryLevel);
    }
    updateChargingState(isCharging) {
        this.updateCharacteristic(this.platform.Characteristic.ChargingState, 'ChargingState', isCharging);
    }
    updateStatusLowBattery(batteryLevel) {
        const statusLowBattery = batteryLevel < 20
            ? this.platform.Characteristic.StatusLowBattery.BATTERY_LEVEL_LOW
            : this.platform.Characteristic.StatusLowBattery.BATTERY_LEVEL_NORMAL;
        this.updateCharacteristic(this.platform.Characteristic.StatusLowBattery, 'StatusLowBattery', statusLowBattery);
    }
}
exports.BatteryStatusService = BatteryStatusService;
//# sourceMappingURL=batteryStatusService.js.map