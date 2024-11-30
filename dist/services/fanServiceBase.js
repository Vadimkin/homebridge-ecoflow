"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FanServiceBase = void 0;
const serviceBase_1 = require("@ecoflow/services/serviceBase");
class FanServiceBase extends serviceBase_1.ServiceBase {
    ecoFlowAccessory;
    maxRotationSpeed;
    currentRotationSpeed = 0;
    rotationSpeedCharacteristic = null;
    constructor(ecoFlowAccessory, maxRotationSpeed, serviceSubType) {
        super(ecoFlowAccessory.platform.Service.Fan, ecoFlowAccessory, serviceSubType);
        this.ecoFlowAccessory = ecoFlowAccessory;
        this.maxRotationSpeed = maxRotationSpeed;
    }
    addCharacteristics() {
        const onCharacteristic = this.addCharacteristic(this.platform.Characteristic.On);
        onCharacteristic.onSet(value => {
            const newValue = value;
            this.processOnSetOn(newValue, () => this.updateState(!newValue));
        });
        this.rotationSpeedCharacteristic = this.addCharacteristic(this.platform.Characteristic.RotationSpeed);
        this.rotationSpeedCharacteristic.onSet(percents => {
            const prevRotationSpeed = this.currentRotationSpeed;
            this.currentRotationSpeed = this.covertPercentsToValue(percents, this.maxRotationSpeed);
            this.processOnSetRotationSpeed(this.currentRotationSpeed, () => this.updateRotationSpeed(prevRotationSpeed));
        });
        return [onCharacteristic, this.rotationSpeedCharacteristic];
    }
    updateState(state) {
        this.updateCharacteristic(this.platform.Characteristic.On, 'State', state);
    }
    updateRotationSpeed(value) {
        const percents = this.covertValueToPercents(value, this.maxRotationSpeed);
        this.updateCharacteristic(this.platform.Characteristic.RotationSpeed, 'RotationSpeed', percents);
        this.currentRotationSpeed = value;
    }
    setRotationSpeed(value) {
        this.rotationSpeedCharacteristic?.setValue(value);
    }
}
exports.FanServiceBase = FanServiceBase;
//# sourceMappingURL=fanServiceBase.js.map