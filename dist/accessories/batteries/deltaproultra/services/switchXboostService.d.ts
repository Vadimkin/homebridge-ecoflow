import { DeltaProUltraAllQuotaData } from '@ecoflow/accessories/batteries/deltaproultra/interfaces/deltaProUltraHttpApiContracts';
import { EcoFlowAccessoryWithQuotaBase } from '@ecoflow/accessories/ecoFlowAccessoryWithQuotaBase';
import { SwitchXboostServiceBase } from '@ecoflow/services/switchXboostServiceBase';
export declare class SwitchXboostService extends SwitchXboostServiceBase {
    protected readonly ecoFlowAccessory: EcoFlowAccessoryWithQuotaBase<DeltaProUltraAllQuotaData>;
    constructor(ecoFlowAccessory: EcoFlowAccessoryWithQuotaBase<DeltaProUltraAllQuotaData>);
    protected setOn(value: boolean, revert: () => void): Promise<void>;
    private sendOn;
}
