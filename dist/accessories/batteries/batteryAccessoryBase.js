"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatteryAccessoryBase = void 0;
const mqttApiBatteryContracts_1 = require("@ecoflow/accessories/batteries/interfaces/mqttApiBatteryContracts");
const outletAcService_1 = require("@ecoflow/accessories/batteries/services/outletAcService");
const outletCarService_1 = require("@ecoflow/accessories/batteries/services/outletCarService");
const outletUsbService_1 = require("@ecoflow/accessories/batteries/services/outletUsbService");
const ecoFlowAccessoryWithQuotaBase_1 = require("@ecoflow/accessories/ecoFlowAccessoryWithQuotaBase");
const batteryStatusService_1 = require("@ecoflow/services/batteryStatusService");
class BatteryAccessoryBase extends ecoFlowAccessoryWithQuotaBase_1.EcoFlowAccessoryWithQuotaBase {
    batteryService;
    outletUsbService;
    outletAcService;
    outletCarService;
    constructor(platform, accessory, config, log, httpApiManager, mqttApiManager) {
        super(platform, accessory, config, log, httpApiManager, mqttApiManager);
        this.batteryService = new batteryStatusService_1.BatteryStatusService(this);
        this.outletUsbService = new outletUsbService_1.OutletUsbService(this);
        this.outletAcService = new outletAcService_1.OutletAcService(this);
        this.outletCarService = new outletCarService_1.OutletCarService(this);
    }
    getServices() {
        return [this.batteryService, this.outletUsbService, this.outletAcService, this.outletCarService];
    }
    processQuotaMessage(message) {
        const batteryMessage = message;
        if (batteryMessage.typeCode === mqttApiBatteryContracts_1.MqttBatteryMessageType.EMS) {
            const emsStatus = message.params;
            Object.assign(this.quota.bms_emsStatus, emsStatus);
            this.updateEmsValues(emsStatus);
        }
        else if (batteryMessage.typeCode === mqttApiBatteryContracts_1.MqttBatteryMessageType.INV) {
            const invStatus = message.params;
            Object.assign(this.quota.inv, invStatus);
            this.updateInvValues(invStatus);
        }
        else if (batteryMessage.typeCode === mqttApiBatteryContracts_1.MqttBatteryMessageType.PD) {
            const pdStatus = message.params;
            Object.assign(this.quota.pd, pdStatus);
            this.updatePdValues(pdStatus);
        }
    }
    initializeQuota(quota) {
        const result = quota ?? {};
        if (!result.bms_emsStatus) {
            result.bms_emsStatus = {};
        }
        if (!result.inv) {
            result.inv = {};
        }
        if (!result.pd) {
            result.pd = {};
        }
        return result;
    }
    updateInitialValues(initialData) {
        this.updateEmsInitialValues(initialData.bms_emsStatus);
        this.updateInvInitialValues(initialData.inv);
        this.updatePdInitialValues(initialData.pd);
    }
    updateEmsInitialValues(params) {
        const message = {
            typeCode: mqttApiBatteryContracts_1.MqttBatteryMessageType.EMS,
            params,
        };
        this.processQuotaMessage(message);
    }
    updateInvInitialValues(params) {
        const message = {
            typeCode: mqttApiBatteryContracts_1.MqttBatteryMessageType.INV,
            params,
        };
        this.processQuotaMessage(message);
    }
    updatePdInitialValues(params) {
        const message = {
            typeCode: mqttApiBatteryContracts_1.MqttBatteryMessageType.PD,
            params,
        };
        this.processQuotaMessage(message);
    }
    updateEmsValues(params) {
        if (params.f32LcdShowSoc !== undefined) {
            this.batteryService.updateBatteryLevel(params.f32LcdShowSoc);
            this.outletAcService.updateBatteryLevel(params.f32LcdShowSoc);
            this.outletUsbService.updateBatteryLevel(params.f32LcdShowSoc);
            this.outletCarService.updateBatteryLevel(params.f32LcdShowSoc);
        }
    }
    updateInvValues(params) {
        if (params.inputWatts !== undefined) {
            this.batteryService.updateChargingState(params.inputWatts > 0);
            this.outletAcService.updateInputConsumption(params.inputWatts);
            this.outletUsbService.updateInputConsumption(params.inputWatts);
            this.outletCarService.updateInputConsumption(params.inputWatts);
        }
        if (params.cfgAcEnabled !== undefined) {
            this.outletAcService.updateState(params.cfgAcEnabled);
        }
        if (params.outputWatts !== undefined) {
            this.outletAcService.updateOutputConsumption(params.outputWatts);
        }
    }
    updatePdValues(params) {
        if (params.carState !== undefined) {
            this.outletCarService.updateState(params.carState);
        }
        if (params.carWatts !== undefined) {
            this.outletCarService.updateOutputConsumption(params.carWatts);
        }
        if (params.dcOutState !== undefined) {
            this.outletUsbService.updateState(params.dcOutState);
        }
        if (params.usb1Watts !== undefined ||
            params.usb2Watts !== undefined ||
            params.qcUsb1Watts !== undefined ||
            params.qcUsb2Watts !== undefined ||
            params.typec1Watts !== undefined ||
            params.typec2Watts !== undefined) {
            const usbWatts = this.sum(params.usb1Watts, params.usb2Watts, params.qcUsb1Watts, params.qcUsb2Watts, params.typec1Watts, params.typec2Watts);
            this.outletUsbService.updateOutputConsumption(usbWatts);
        }
    }
}
exports.BatteryAccessoryBase = BatteryAccessoryBase;
//# sourceMappingURL=batteryAccessoryBase.js.map