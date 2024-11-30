import { DeltaProAllQuotaData } from '@ecoflow/accessories/batteries/deltapro/interfaces/deltaProHttpApiContracts';
import { EcoFlowAccessoryWithQuotaBase } from '@ecoflow/accessories/ecoFlowAccessoryWithQuotaBase';
import { SwitchXboostServiceBase } from '@ecoflow/services/switchXboostServiceBase';
export declare class SwitchXboostService extends SwitchXboostServiceBase {
    protected readonly ecoFlowAccessory: EcoFlowAccessoryWithQuotaBase<DeltaProAllQuotaData>;
    constructor(ecoFlowAccessory: EcoFlowAccessoryWithQuotaBase<DeltaProAllQuotaData>);
    protected setOn(value: boolean, revert: () => void): Promise<void>;
    private sendOn;
}
