"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwitchXboostServiceBase = void 0;
const serviceBase_1 = require("@ecoflow/services/serviceBase");
class SwitchXboostServiceBase extends serviceBase_1.ServiceBase {
    constructor(ecoFlowAccessory) {
        super(ecoFlowAccessory.platform.Service.Switch, ecoFlowAccessory, 'X-Boost');
    }
    updateState(state) {
        this.updateCharacteristic(this.platform.Characteristic.On, 'State', state);
    }
    addCharacteristics() {
        const onCharacteristic = this.addCharacteristic(this.platform.Characteristic.On);
        onCharacteristic.onSet((value) => {
            const newValue = value;
            this.setOn(newValue, () => this.updateState(!newValue));
        });
        this.service.setCharacteristic(this.platform.Characteristic.Name, this.serviceName);
        return [onCharacteristic];
    }
}
exports.SwitchXboostServiceBase = SwitchXboostServiceBase;
//# sourceMappingURL=switchXboostServiceBase.js.map