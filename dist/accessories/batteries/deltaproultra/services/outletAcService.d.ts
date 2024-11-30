import { DeltaProUltraAllQuotaData } from '@ecoflow/accessories/batteries/deltaproultra/interfaces/deltaProUltraHttpApiContracts';
import { DeltaProUltraOutletServiceBase } from '@ecoflow/accessories/batteries/deltaproultra/services/deltaProUltraOutletServiceBase';
import { EcoFlowAccessoryWithQuotaBase } from '@ecoflow/accessories/ecoFlowAccessoryWithQuotaBase';
export declare class OutletAcService extends DeltaProUltraOutletServiceBase {
    constructor(ecoFlowAccessory: EcoFlowAccessoryWithQuotaBase<DeltaProUltraAllQuotaData>);
    protected setOn(): Promise<void>;
}
