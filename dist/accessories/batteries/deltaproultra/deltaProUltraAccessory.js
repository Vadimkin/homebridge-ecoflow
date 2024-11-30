"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeltaProUltraAccessory = void 0;
const deltaProUltraMqttApiContracts_1 = require("@ecoflow/accessories/batteries/deltaproultra/interfaces/deltaProUltraMqttApiContracts");
const outletAcService_1 = require("@ecoflow/accessories/batteries/deltaproultra/services/outletAcService");
const outletUsbService_1 = require("@ecoflow/accessories/batteries/deltaproultra/services/outletUsbService");
const switchXboostService_1 = require("@ecoflow/accessories/batteries/deltaproultra/services/switchXboostService");
const ecoFlowAccessoryWithQuotaBase_1 = require("@ecoflow/accessories/ecoFlowAccessoryWithQuotaBase");
const batteryStatusService_1 = require("@ecoflow/services/batteryStatusService");
class DeltaProUltraAccessory extends ecoFlowAccessoryWithQuotaBase_1.EcoFlowAccessoryWithQuotaBase {
    batteryStatusService;
    outletUsbService;
    outletAcService;
    switchXboostService;
    constructor(platform, accessory, config, log, httpApiManager, mqttApiManager) {
        super(platform, accessory, config, log, httpApiManager, mqttApiManager);
        this.batteryStatusService = new batteryStatusService_1.BatteryStatusService(this);
        this.outletUsbService = new outletUsbService_1.OutletUsbService(this);
        this.outletAcService = new outletAcService_1.OutletAcService(this);
        this.switchXboostService = new switchXboostService_1.SwitchXboostService(this);
    }
    getServices() {
        return [this.batteryStatusService, this.outletUsbService, this.outletAcService, this.switchXboostService];
    }
    processQuotaMessage(message) {
        const accessoryMessage = message;
        if (accessoryMessage.addr === deltaProUltraMqttApiContracts_1.DeltaProUltraMqttMessageAddrType.PD) {
            const pdStatus = message.param;
            Object.assign(this.quota.hs_yj751_pd_appshow_addr, pdStatus);
            this.updatePdValues(pdStatus);
        }
        else if (accessoryMessage.addr === deltaProUltraMqttApiContracts_1.DeltaProUltraMqttMessageAddrType.PD_SET) {
            const pdSetStatus = message.param;
            Object.assign(this.quota.hs_yj751_pd_app_set_info_addr, pdSetStatus);
            // this.updatePdSetValues(pdSetStatus);
        }
    }
    initializeQuota(quota) {
        const result = quota ?? {};
        if (!result.hs_yj751_pd_appshow_addr) {
            result.hs_yj751_pd_appshow_addr = {};
        }
        if (!result.hs_yj751_pd_app_set_info_addr) {
            result.hs_yj751_pd_app_set_info_addr = {};
        }
        return result;
    }
    updateInitialValues(initialData) {
        this.updatePdStatusInitialValues(initialData.hs_yj751_pd_appshow_addr);
        this.updatePdSetStatusInitialValues(initialData.hs_yj751_pd_app_set_info_addr);
    }
    updatePdStatusInitialValues(params) {
        const message = {
            param: params,
            addr: deltaProUltraMqttApiContracts_1.DeltaProUltraMqttMessageAddrType.PD,
        };
        this.processQuotaMessage(message);
    }
    updatePdSetStatusInitialValues(params) {
        const message = {
            param: params,
            addr: deltaProUltraMqttApiContracts_1.DeltaProUltraMqttMessageAddrType.PD_SET,
        };
        this.processQuotaMessage(message);
    }
    updatePdValues(params) {
        this.updateBatteryLevelValues(params);
        this.updateChargingStateValues(params);
        this.updatePdAcValues(params);
        this.updatePdUsbValues(params);
    }
    // private updatePdSetValues(params: PdSetStatus): void {
    //   if (params.acXboost !== undefined && params.acXboost !== AcXBoostType.Ignore) {
    //     this.switchXboostService.updateState(params.acXboost === AcXBoostType.On);
    //   }
    // }
    updateBatteryLevelValues(params) {
        if (params.soc !== undefined) {
            this.batteryStatusService.updateBatteryLevel(params.soc);
            this.outletAcService.updateBatteryLevel(params.soc);
            this.outletUsbService.updateBatteryLevel(params.soc);
        }
    }
    updateChargingStateValues(params) {
        if (params.wattsInSum !== undefined) {
            const isCharging = params.wattsInSum > 0 && (params.wattsOutSum === undefined || params.wattsInSum !== params.wattsOutSum);
            this.batteryStatusService.updateChargingState(isCharging);
            this.outletAcService.updateInputConsumption(params.wattsInSum);
            this.outletUsbService.updateInputConsumption(params.wattsInSum);
        }
    }
    updatePdAcValues(params) {
        // if (params.acOutState !== undefined) {
        //   this.outletAcService.updateState(params.acOutState === EnableType.On);
        // }
        if (params.outAcL11Pwr !== undefined ||
            params.outAcL12Pwr !== undefined ||
            params.outAcL21Pwr !== undefined ||
            params.outAcL22Pwr !== undefined ||
            params.outAcTtPwr !== undefined ||
            params.outAcL14Pwr !== undefined ||
            params.outAc5p8Pwr !== undefined) {
            const usbWatts = this.sum(params.outAcL11Pwr, params.outAcL12Pwr, params.outAcL21Pwr, params.outAcL22Pwr, params.outAcTtPwr, params.outAcL14Pwr, params.outAc5p8Pwr);
            this.outletAcService.updateOutputConsumption(usbWatts);
        }
    }
    updatePdUsbValues(params) {
        // if (params.dcOutState !== undefined) {
        //   this.outletUsbService.updateState(params.dcOutState === EnableType.On);
        // }
        if (params.outUsb1Pwr !== undefined ||
            params.outUsb2Pwr !== undefined ||
            params.outTypec1Pwr !== undefined ||
            params.outTypec2Pwr !== undefined) {
            const usbWatts = this.sum(params.outUsb1Pwr, params.outUsb2Pwr, params.outTypec1Pwr, params.outTypec2Pwr);
            this.outletUsbService.updateOutputConsumption(usbWatts);
        }
    }
}
exports.DeltaProUltraAccessory = DeltaProUltraAccessory;
//# sourceMappingURL=deltaProUltraAccessory.js.map