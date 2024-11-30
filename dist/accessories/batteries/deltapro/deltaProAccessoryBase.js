"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeltaProAccessoryBase = void 0;
const outletAcService_1 = require("@ecoflow/accessories/batteries/deltapro/services/outletAcService");
const outletCarService_1 = require("@ecoflow/accessories/batteries/deltapro/services/outletCarService");
const outletUsbService_1 = require("@ecoflow/accessories/batteries/deltapro/services/outletUsbService");
const switchXboostService_1 = require("@ecoflow/accessories/batteries/deltapro/services/switchXboostService");
const batteryHttpApiContracts_1 = require("@ecoflow/accessories/batteries/interfaces/batteryHttpApiContracts");
const ecoFlowAccessoryWithQuotaBase_1 = require("@ecoflow/accessories/ecoFlowAccessoryWithQuotaBase");
const batteryStatusService_1 = require("@ecoflow/services/batteryStatusService");
class DeltaProAccessoryBase extends ecoFlowAccessoryWithQuotaBase_1.EcoFlowAccessoryWithQuotaBase {
    batteryStatusService;
    outletUsbService;
    outletAcService;
    outletCarService;
    switchXboostService;
    constructor(platform, accessory, config, log, httpApiManager, mqttApiManager) {
        super(platform, accessory, config, log, httpApiManager, mqttApiManager);
        this.batteryStatusService = new batteryStatusService_1.BatteryStatusService(this);
        this.outletUsbService = new outletUsbService_1.OutletUsbService(this);
        this.outletAcService = new outletAcService_1.OutletAcService(this);
        this.outletCarService = new outletCarService_1.OutletCarService(this);
        this.switchXboostService = new switchXboostService_1.SwitchXboostService(this);
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
        const data = message.data;
        if (data.bmsMaster !== undefined && Object.keys(data.bmsMaster).length > 0) {
            Object.assign(this.quota.bmsMaster, data.bmsMaster);
            this.updateBmsValues(data.bmsMaster);
        }
        if (data.inv !== undefined && Object.keys(data.inv).length > 0) {
            Object.assign(this.quota.inv, data.inv);
            this.updateInvValues(data.inv);
        }
        if (data.pd !== undefined && Object.keys(data.pd).length > 0) {
            Object.assign(this.quota.pd, data.pd);
            this.updatePdValues(data.pd);
        }
    }
    initializeQuota(quota) {
        const result = quota ?? {};
        if (!result.bmsMaster) {
            result.bmsMaster = {};
        }
        if (!result.inv) {
            result.inv = {};
        }
        if (!result.pd) {
            result.pd = {};
        }
        return result;
    }
    updateInitialValues(data) {
        const message = {
            data,
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
        if (params.cfgAcEnabled !== undefined && params.cfgAcEnabled !== batteryHttpApiContracts_1.AcEnableType.Ignore) {
            this.outletAcService.updateState(params.cfgAcEnabled === batteryHttpApiContracts_1.AcEnableType.On);
        }
        if (params.cfgAcXboost !== undefined && params.cfgAcXboost !== batteryHttpApiContracts_1.AcXBoostType.Ignore) {
            this.switchXboostService.updateState(params.cfgAcXboost === batteryHttpApiContracts_1.AcXBoostType.On);
        }
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
}
exports.DeltaProAccessoryBase = DeltaProAccessoryBase;
//# sourceMappingURL=deltaProAccessoryBase.js.map