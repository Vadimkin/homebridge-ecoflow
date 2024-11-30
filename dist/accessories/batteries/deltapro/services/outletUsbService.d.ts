import { DeltaProOutletServiceBase } from '@ecoflow/accessories/batteries/deltapro/services/deltaProOutletServiceBase';
import { EcoFlowAccessoryBase } from '@ecoflow/accessories/ecoFlowAccessoryBase';
export declare class OutletUsbService extends DeltaProOutletServiceBase {
    constructor(ecoFlowAccessory: EcoFlowAccessoryBase);
    protected setOn(): Promise<void>;
}
