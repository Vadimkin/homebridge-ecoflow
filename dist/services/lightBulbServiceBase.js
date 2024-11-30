"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LightBulbServiceBase = void 0;
const serviceBase_1 = require("@ecoflow/services/serviceBase");
class LightBulbServiceBase extends serviceBase_1.ServiceBase {
    ecoFlowAccessory;
    maxBrightness;
    currentBrightness = 0;
    brightnessCharacteristic = null;
    constructor(ecoFlowAccessory, maxBrightness, serviceSubType) {
        super(ecoFlowAccessory.platform.Service.Lightbulb, ecoFlowAccessory, serviceSubType);
        this.ecoFlowAccessory = ecoFlowAccessory;
        this.maxBrightness = maxBrightness;
    }
    addCharacteristics() {
        const onCharacteristic = this.addCharacteristic(this.platform.Characteristic.On);
        onCharacteristic.onSet(value => {
            const newValue = value;
            this.processOnSetOn(newValue, () => this.updateState(!newValue));
        });
        this.brightnessCharacteristic = this.addCharacteristic(this.platform.Characteristic.Brightness);
        this.brightnessCharacteristic.onSet(percents => {
            const prevBrightness = this.currentBrightness;
            this.currentBrightness = this.covertPercentsToValue(percents, this.maxBrightness);
            this.processOnSetBrightness(this.currentBrightness, () => this.updateBrightness(prevBrightness));
        });
        return [onCharacteristic, this.brightnessCharacteristic];
    }
    updateState(state) {
        this.updateCharacteristic(this.platform.Characteristic.On, 'State', state);
    }
    updateBrightness(value) {
        const percents = this.covertValueToPercents(value, this.maxBrightness);
        this.updateCharacteristic(this.platform.Characteristic.Brightness, 'Brightness', percents);
        this.currentBrightness = value;
    }
    setBrightness(value) {
        this.brightnessCharacteristic?.setValue(value);
    }
}
exports.LightBulbServiceBase = LightBulbServiceBase;
//# sourceMappingURL=lightBulbServiceBase.js.map