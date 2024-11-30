"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutletServiceBase = void 0;
const config_1 = require("@ecoflow/config");
const serviceBase_1 = require("@ecoflow/services/serviceBase");
class OutletServiceBase extends serviceBase_1.ServiceBase {
    additionalCharacteristics;
    constructor(ecoFlowAccessory, serviceSubType, additionalCharacteristics) {
        super(ecoFlowAccessory.platform.Service.Outlet, ecoFlowAccessory, serviceSubType);
        this.additionalCharacteristics = additionalCharacteristics;
    }
    updateState(state) {
        this.updateCharacteristic(this.platform.Characteristic.On, 'State', state);
    }
    updateOutputConsumption(watt) {
        this.updateCharacteristic(this.platform.Characteristic.OutletInUse, 'InUse', watt > 0);
        this.updateCustomCharacteristic(this.platform.Characteristic.PowerConsumption.OutputConsumptionWatts, 'Output Consumption, W', watt, config_1.AdditionalBatteryCharacteristicType.OutputConsumptionInWatts);
    }
    updateInputConsumption(watt) {
        this.updateCustomCharacteristic(this.platform.Characteristic.PowerConsumption.InputConsumptionWatts, 'Input Consumption, W', watt, config_1.AdditionalBatteryCharacteristicType.InputConsumptionInWatts);
    }
    updateBatteryLevel(batteryLevel) {
        this.updateCustomCharacteristic(this.platform.Characteristic.BatteryLevel, 'Battery Level, %', batteryLevel, config_1.AdditionalBatteryCharacteristicType.BatteryLevel);
    }
    addCharacteristics() {
        const onCharacteristic = this.addCharacteristic(this.platform.Characteristic.On);
        onCharacteristic.onSet((value) => {
            const newValue = value;
            this.setOn(newValue, () => this.updateState(!newValue));
        });
        const characteristics = [
            this.addCharacteristic(this.platform.Characteristic.OutletInUse),
            onCharacteristic,
            this.tryAddCustomCharacteristic(this.platform.Characteristic.PowerConsumption.InputConsumptionWatts, config_1.AdditionalBatteryCharacteristicType.InputConsumptionInWatts),
            this.tryAddCustomCharacteristic(this.platform.Characteristic.PowerConsumption.OutputConsumptionWatts, config_1.AdditionalBatteryCharacteristicType.OutputConsumptionInWatts),
            this.tryAddCustomCharacteristic(this.platform.Characteristic.BatteryLevel, config_1.AdditionalBatteryCharacteristicType.BatteryLevel),
        ];
        this.service.setCharacteristic(this.platform.Characteristic.Name, this.serviceName);
        return characteristics.filter(characteristic => characteristic !== null);
    }
    tryAddCustomCharacteristic(characteristic, characteristicType) {
        if (this.additionalCharacteristics?.includes(characteristicType)) {
            return this.addCharacteristic(characteristic);
        }
        return null;
    }
    updateCustomCharacteristic(characteristic, name, value, characteristicType) {
        if (this.additionalCharacteristics?.includes(characteristicType)) {
            this.updateCharacteristic(characteristic, name, value);
        }
    }
}
exports.OutletServiceBase = OutletServiceBase;
//# sourceMappingURL=outletServiceBase.js.map