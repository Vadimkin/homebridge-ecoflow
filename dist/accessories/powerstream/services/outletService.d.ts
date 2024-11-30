import { EcoFlowAccessoryWithQuotaBase } from '@ecoflow/accessories/ecoFlowAccessoryWithQuotaBase';
import { PowerStreamAllQuotaData } from '@ecoflow/accessories/powerstream/interfaces/powerStreamHttpApiContracts';
import { AdditionalBatteryCharacteristicType as CharacteristicType } from '@ecoflow/config';
import { OutletServiceBase } from '@ecoflow/services/outletServiceBase';
export declare class OutletService extends OutletServiceBase {
    constructor(ecoFlowAccessory: EcoFlowAccessoryWithQuotaBase<PowerStreamAllQuotaData>, serviceSubType: string, additionalCharacteristics?: CharacteristicType[]);
    protected setOn(): Promise<void>;
}
