import { DeltaProOutletServiceBase } from '@ecoflow/accessories/batteries/deltapro/services/deltaProOutletServiceBase';
import { EcoFlowAccessoryBase } from '@ecoflow/accessories/ecoFlowAccessoryBase';
export declare class OutletCarService extends DeltaProOutletServiceBase {
    constructor(ecoFlowAccessory: EcoFlowAccessoryBase);
    protected setOn(value: boolean, revert: () => void): Promise<void>;
}
