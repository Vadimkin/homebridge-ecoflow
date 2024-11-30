import { BatteryAllQuotaData } from '@ecoflow/accessories/batteries/interfaces/httpApiBatteryContracts';
import { OutletBatteryServiceBase } from '@ecoflow/accessories/batteries/services/outletBatteryServiceBase';
import { EcoFlowAccessoryWithQuotaBase } from '@ecoflow/accessories/ecoFlowAccessoryWithQuotaBase';
export declare class OutletAcService extends OutletBatteryServiceBase {
    protected readonly ecoFlowAccessory: EcoFlowAccessoryWithQuotaBase<BatteryAllQuotaData>;
    constructor(ecoFlowAccessory: EcoFlowAccessoryWithQuotaBase<BatteryAllQuotaData>);
    protected setOn(value: boolean, revert: () => void): Promise<void>;
}
