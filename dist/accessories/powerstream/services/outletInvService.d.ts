import { EcoFlowAccessoryBase } from '@ecoflow/accessories/ecoFlowAccessoryBase';
import { AdditionalBatteryCharacteristicType as CharacteristicType } from '@ecoflow/config';
import { OutletServiceBase } from '@ecoflow/services/outletServiceBase';
export declare class OutletInvService extends OutletServiceBase {
    constructor(ecoFlowAccessory: EcoFlowAccessoryBase, additionalCharacteristics?: CharacteristicType[]);
    protected setOn(): Promise<void>;
}
