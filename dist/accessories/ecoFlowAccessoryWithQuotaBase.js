"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EcoFlowAccessoryWithQuotaBase = void 0;
const ecoFlowAccessoryBase_1 = require("@ecoflow/accessories/ecoFlowAccessoryBase");
class EcoFlowAccessoryWithQuotaBase extends ecoFlowAccessoryBase_1.EcoFlowAccessoryBase {
    _quota = null;
    constructor(platform, accessory, config, log, httpApiManager, mqttApiManager) {
        super(platform, accessory, config, log, httpApiManager, mqttApiManager);
    }
    async initializeDefaultValues(shouldUpdateInitialValues = true) {
        if (!this._quota) {
            this._quota = await this.httpApiManager.getAllQuotas(this.deviceInfo);
        }
        const quotaReceived = !!this._quota;
        this._quota = this.initializeQuota(this._quota);
        if (!quotaReceived) {
            this.log.warn('Quotas were not received');
        }
        if (quotaReceived && shouldUpdateInitialValues) {
            this.updateInitialValues(this.quota);
        }
    }
    get quota() {
        if (!this._quota) {
            this._quota = this.initializeQuota(this._quota);
        }
        return this._quota;
    }
    sum(...values) {
        return values.filter(value => value !== undefined).reduce((sum, value) => sum + value, 0);
    }
}
exports.EcoFlowAccessoryWithQuotaBase = EcoFlowAccessoryWithQuotaBase;
//# sourceMappingURL=ecoFlowAccessoryWithQuotaBase.js.map