import { DeltaProUltraAllQuotaData } from '@ecoflow/accessories/batteries/deltaproultra/interfaces/deltaProUltraHttpApiContracts';
import { DeltaProUltraOutletServiceBase } from '@ecoflow/accessories/batteries/deltaproultra/services/deltaProUltraOutletServiceBase';
import { EcoFlowAccessoryWithQuotaBase } from '@ecoflow/accessories/ecoFlowAccessoryWithQuotaBase';
export declare class OutletUsbService extends DeltaProUltraOutletServiceBase {
    constructor(ecoFlowAccessory: EcoFlowAccessoryWithQuotaBase<DeltaProUltraAllQuotaData>);
    protected setOn(value: boolean, revert: () => void): Promise<void>;
}
