import { DeltaProAllQuotaData } from '@ecoflow/accessories/batteries/deltapro/interfaces/deltaProHttpApiContracts';
import { DeltaProOutletServiceBase } from '@ecoflow/accessories/batteries/deltapro/services/deltaProOutletServiceBase';
import { EcoFlowAccessoryWithQuotaBase } from '@ecoflow/accessories/ecoFlowAccessoryWithQuotaBase';
export declare class OutletAcService extends DeltaProOutletServiceBase {
    constructor(ecoFlowAccessory: EcoFlowAccessoryWithQuotaBase<DeltaProAllQuotaData>);
    protected setOn(value: boolean, revert: () => void): Promise<void>;
}
