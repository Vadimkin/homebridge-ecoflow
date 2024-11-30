"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delta2AccessoryBase = void 0;
const delta2MqttApiContracts_1 = require("@ecoflow/accessories/batteries/delta2/interfaces/delta2MqttApiContracts");
const outletAcService_1 = require("@ecoflow/accessories/batteries/delta2/services/outletAcService");
const outletCarService_1 = require("@ecoflow/accessories/batteries/delta2/services/outletCarService");
const outletUsbService_1 = require("@ecoflow/accessories/batteries/delta2/services/outletUsbService");
const switchXboostService_1 = require("@ecoflow/accessories/batteries/delta2/services/switchXboostService");
const batteryHttpApiContracts_1 = require("@ecoflow/accessories/batteries/interfaces/batteryHttpApiContracts");
const ecoFlowAccessoryWithQuotaBase_1 = require("@ecoflow/accessories/ecoFlowAccessoryWithQuotaBase");
const batteryStatusService_1 = require("@ecoflow/services/batteryStatusService");
class Delta2AccessoryBase extends ecoFlowAccessoryWithQuotaBase_1.EcoFlowAccessoryWithQuotaBase {
    batteryStatusService;
    outletUsbService;
    outletAcService;
    outletCarService;
    switchXboostService;
    constructor(platform, accessory, config, log, httpApiManager, mqttApiManager, configuration) {
        super(platform, accessory, config, log, httpApiManager, mqttApiManager);
        this.batteryStatusService = new batteryStatusService_1.BatteryStatusService(this);
        this.outletUsbService = new outletUsbService_1.OutletUsbService(this);
        this.outletAcService = new outletAcService_1.OutletAcService(this, configuration.setAcModuleType);
        this.outletCarService = new outletCarService_1.OutletCarService(this);
        this.switchXboostService = new switchXboostService_1.SwitchXboostService(this, configuration.setAcModuleType);
    }
    getServices() {
        return [
            this.batteryStatusService,
            this.outletUsbService,
            this.outletAcService,
            this.outletCarService,
            this.switchXboostService,
        ];
    }
    processQuotaMessage(message) {
        const batteryMessage = message;
        if (batteryMessage.typeCode === delta2MqttApiContracts_1.Delta2MqttMessageType.BMS) {
            const bmsStatus = message.params;
            Object.assign(this.quota.bms_bmsStatus, bmsStatus);
            this.updateBmsValues(bmsStatus);
        }
        else if (batteryMessage.typeCode === delta2MqttApiContracts_1.Delta2MqttMessageType.INV) {
            const invStatus = message.params;
            Object.assign(this.quota.inv, invStatus);
            this.updateInvValues(invStatus);
        }
        else if (batteryMessage.typeCode === delta2MqttApiContracts_1.Delta2MqttMessageType.PD) {
            const pdStatus = message.params;
            Object.assign(this.quota.pd, pdStatus);
            this.updatePdValues(pdStatus);
        }
        else if (batteryMessage.typeCode === delta2MqttApiContracts_1.Delta2MqttMessageType.MPPT) {
            const mpptStatus = message.params;
            Object.assign(this.quota.mppt, mpptStatus);
            this.updateMpptValues(mpptStatus);
        }
    }
    initializeQuota(quota) {
        const result = quota ?? {};
        if (!result.bms_bmsStatus) {
            result.bms_bmsStatus = {};
        }
        if (!result.inv) {
            result.inv = {};
        }
        if (!result.pd) {
            result.pd = {};
        }
        if (!result.mppt) {
            result.mppt = {};
        }
        return result;
    }
    updateInitialValues(initialData) {
        this.updateBmsInitialValues(initialData.bms_bmsStatus);
        this.updateInvInitialValues(initialData.inv);
        this.updatePdInitialValues(initialData.pd);
        this.updateMpptInitialValues(initialData.mppt);
    }
    updateBmsInitialValues(params) {
        const message = {
            typeCode: delta2MqttApiContracts_1.Delta2MqttMessageType.BMS,
            params,
        };
        this.processQuotaMessage(message);
    }
    updateInvInitialValues(params) {
        const message = {
            typeCode: delta2MqttApiContracts_1.Delta2MqttMessageType.INV,
            params,
        };
        this.processQuotaMessage(message);
    }
    updatePdInitialValues(params) {
        const message = {
            typeCode: delta2MqttApiContracts_1.Delta2MqttMessageType.PD,
            params,
        };
        this.processQuotaMessage(message);
    }
    updateMpptInitialValues(params) {
        const message = {
            typeCode: delta2MqttApiContracts_1.Delta2MqttMessageType.MPPT,
            params,
        };
        this.processQuotaMessage(message);
    }
    updateBmsValues(params) {
        if (params.f32ShowSoc !== undefined) {
            this.batteryStatusService.updateBatteryLevel(params.f32ShowSoc);
            this.outletAcService.updateBatteryLevel(params.f32ShowSoc);
            this.outletUsbService.updateBatteryLevel(params.f32ShowSoc);
            this.outletCarService.updateBatteryLevel(params.f32ShowSoc);
        }
    }
    updateInvValues(params) {
        if (params.inputWatts !== undefined) {
            const isCharging = params.inputWatts > 0 && (params.outputWatts === undefined || params.inputWatts !== params.outputWatts);
            this.batteryStatusService.updateChargingState(isCharging);
            this.outletAcService.updateInputConsumption(params.inputWatts);
            this.outletUsbService.updateInputConsumption(params.inputWatts);
            this.outletCarService.updateInputConsumption(params.inputWatts);
        }
        if (params.outputWatts !== undefined) {
            this.outletAcService.updateOutputConsumption(params.outputWatts);
        }
        this.updateAcValues(params);
    }
    updatePdValues(params) {
        if (params.carState !== undefined) {
            this.outletCarService.updateState(params.carState === batteryHttpApiContracts_1.EnableType.On);
        }
        if (params.carWatts !== undefined) {
            this.outletCarService.updateOutputConsumption(params.carWatts);
        }
        if (params.dcOutState !== undefined) {
            this.outletUsbService.updateState(params.dcOutState === batteryHttpApiContracts_1.EnableType.On);
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
    updateMpptValues(params) {
        this.updateAcValues(params);
    }
    updateAcValues(params) {
        if (params.cfgAcEnabled !== undefined && params.cfgAcEnabled !== batteryHttpApiContracts_1.AcEnableType.Ignore) {
            this.outletAcService.updateState(params.cfgAcEnabled === batteryHttpApiContracts_1.AcEnableType.On);
        }
        if (params.cfgAcXboost !== undefined && params.cfgAcXboost !== batteryHttpApiContracts_1.AcXBoostType.Ignore) {
            this.switchXboostService.updateState(params.cfgAcXboost === batteryHttpApiContracts_1.AcXBoostType.On);
        }
    }
}
exports.Delta2AccessoryBase = Delta2AccessoryBase;
//# sourceMappingURL=delta2AccessoryBase.js.map