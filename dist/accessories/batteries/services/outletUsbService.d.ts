import { OutletBatteryServiceBase } from '@ecoflow/accessories/batteries/services/outletBatteryServiceBase';
import { EcoFlowAccessoryBase } from '@ecoflow/accessories/ecoFlowAccessoryBase';
export declare class OutletUsbService extends OutletBatteryServiceBase {
    constructor(ecoFlowAccessory: EcoFlowAccessoryBase);
    protected setOn(value: boolean, revert: () => void): Promise<void>;
}
