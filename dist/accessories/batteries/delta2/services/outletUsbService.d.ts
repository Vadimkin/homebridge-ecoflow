import { Delta2OutletServiceBase } from '@ecoflow/accessories/batteries/delta2/services/delta2OutletServiceBase';
import { EcoFlowAccessoryBase } from '@ecoflow/accessories/ecoFlowAccessoryBase';
export declare class OutletUsbService extends Delta2OutletServiceBase {
    constructor(ecoFlowAccessory: EcoFlowAccessoryBase);
    protected setOn(value: boolean, revert: () => void): Promise<void>;
}
