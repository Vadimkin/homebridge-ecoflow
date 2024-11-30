"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PowerStreamAccessory = void 0;
const batteryHttpApiContracts_1 = require("@ecoflow/accessories/batteries/interfaces/batteryHttpApiContracts");
const ecoFlowAccessoryWithQuotaBase_1 = require("@ecoflow/accessories/ecoFlowAccessoryWithQuotaBase");
const powerStreamMqttApiContracts_1 = require("@ecoflow/accessories/powerstream/interfaces/powerStreamMqttApiContracts");
const brightnessService_1 = require("@ecoflow/accessories/powerstream/services/brightnessService");
const outletInvService_1 = require("@ecoflow/accessories/powerstream/services/outletInvService");
const outletService_1 = require("@ecoflow/accessories/powerstream/services/outletService");
const powerDemandService_1 = require("@ecoflow/accessories/powerstream/services/powerDemandService");
const config_1 = require("@ecoflow/config");
class PowerStreamAccessory extends ecoFlowAccessoryWithQuotaBase_1.EcoFlowAccessoryWithQuotaBase {
    inverterOutletService;
    solarOutletService;
    batteryOutletService;
    inverterBrightnessService;
    inverterPowerDemandService;
    constructor(platform, accessory, config, log, httpApiManager, mqttApiManager) {
        super(platform, accessory, config, log, httpApiManager, mqttApiManager);
        this.inverterOutletService = new outletInvService_1.OutletInvService(this, config.powerStream?.inverterAdditionalCharacteristics);
        this.solarOutletService = new outletService_1.OutletService(this, 'PV', config.powerStream?.pvAdditionalCharacteristics);
        this.batteryOutletService = new outletService_1.OutletService(this, 'BAT', config.powerStream?.batteryAdditionalCharacteristics);
        this.inverterBrightnessService = new brightnessService_1.BrightnessService(this, 1023);
        this.inverterPowerDemandService = new powerDemandService_1.PowerDemandService(this, (config.powerStream?.type ?? config_1.PowerStreamConsumptionType.W600) * 10);
    }
    getServices() {
        return [
            this.inverterOutletService,
            this.solarOutletService,
            this.batteryOutletService,
            this.inverterBrightnessService,
            this.inverterPowerDemandService,
        ];
    }
    processQuotaMessage(message) {
        const powerStreamMessage = message;
        if (powerStreamMessage.cmdFunc === powerStreamMqttApiContracts_1.PowerStreamMqttMessageFuncType.Func20 &&
            powerStreamMessage.cmdId === powerStreamMqttApiContracts_1.PowerStreamMqttMessageType.Heartbeat) {
            const heartbeat = message.param;
            Object.assign(this.quota['20_1'], heartbeat);
            this.updateHeartbeatValues(heartbeat);
        }
    }
    initializeQuota(quota) {
        const result = quota ?? {};
        if (!result['20_1']) {
            result['20_1'] = {};
        }
        return result;
    }
    updateInitialValues(initialData) {
        this.updateHeartbeatInitialValues(initialData['20_1']);
    }
    updateHeartbeatInitialValues(params) {
        const message = {
            cmdFunc: powerStreamMqttApiContracts_1.PowerStreamMqttMessageFuncType.Func20,
            cmdId: powerStreamMqttApiContracts_1.PowerStreamMqttMessageType.Heartbeat,
            param: params,
        };
        this.processQuotaMessage(message);
    }
    updateHeartbeatValues(params) {
        this.updateSolarValues(params);
        this.updateBatteryValues(params);
        this.updateInverterValues(params);
    }
    updateSolarValues(params) {
        if (params.pv1InputWatts !== undefined || params.pv2InputWatts !== undefined) {
            const pvWatts = this.sum(params.pv1InputWatts, params.pv2InputWatts) * 0.1;
            this.solarOutletService.updateState(pvWatts > 0);
            this.solarOutletService.updateOutputConsumption(pvWatts);
        }
    }
    updateBatteryValues(params) {
        if (params.batInputWatts !== undefined) {
            const batInputWatts = params.batInputWatts * 0.1;
            if (batInputWatts >= 0) {
                this.batteryOutletService.updateState(batInputWatts > 0);
                this.batteryOutletService.updateOutputConsumption(batInputWatts);
            }
            if (batInputWatts <= 0) {
                const watts = Math.abs(batInputWatts);
                this.batteryOutletService.updateInputConsumption(watts);
            }
        }
        if (params.batSoc !== undefined) {
            this.batteryOutletService.updateBatteryLevel(params.batSoc);
        }
    }
    updateInverterValues(params) {
        if (params.invOutputWatts !== undefined) {
            const invOutputWatts = params.invOutputWatts * 0.1;
            if (invOutputWatts >= 0) {
                this.inverterOutletService.updateOutputConsumption(invOutputWatts);
            }
            if (invOutputWatts <= 0) {
                this.inverterOutletService.updateInputConsumption(Math.abs(invOutputWatts));
            }
        }
        if (params.invOnOff !== undefined) {
            this.inverterOutletService.updateState(params.invOnOff === batteryHttpApiContracts_1.EnableType.On);
        }
        if (params.invBrightness !== undefined) {
            this.inverterBrightnessService.updateState(params.invBrightness > 0);
            this.inverterBrightnessService.updateBrightness(params.invBrightness);
        }
        if (params.permanentWatts !== undefined) {
            this.inverterPowerDemandService.updateState(params.permanentWatts > 0);
            this.inverterPowerDemandService.updateRotationSpeed(params.permanentWatts);
        }
    }
}
exports.PowerStreamAccessory = PowerStreamAccessory;
//# sourceMappingURL=powerStreamAccessory.js.map