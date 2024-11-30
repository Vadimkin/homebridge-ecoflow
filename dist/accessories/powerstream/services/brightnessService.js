"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrightnessService = void 0;
const mqttApiPowerStreamContracts_1 = require("@ecoflow/accessories/powerstream/interfaces/mqttApiPowerStreamContracts");
const lightBulbServiceBase_1 = require("@ecoflow/services/lightBulbServiceBase");
class BrightnessService extends lightBulbServiceBase_1.LightBulbServiceBase {
    constructor(ecoFlowAccessory, maxBrightness) {
        super(ecoFlowAccessory, maxBrightness, 'Brightness');
    }
    processOnSetOn(state) {
        this.setBrightness(state ? 100 : 0);
        return Promise.resolve();
    }
    processOnSetBrightness(value, revert) {
        const message = {
            id: 0,
            version: '',
            cmdCode: mqttApiPowerStreamContracts_1.MqttPowerStreamSetCmdCodeType.WN511_SET_BRIGHTNESS_PACK,
            params: {
                brightness: Math.round(value),
            },
        };
        return this.ecoFlowAccessory.sendSetCommand(message, revert);
    }
}
exports.BrightnessService = BrightnessService;
//# sourceMappingURL=brightnessService.js.map