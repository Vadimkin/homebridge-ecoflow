import { EcoFlowAccessoryBase } from '@ecoflow/accessories/ecoFlowAccessoryBase';
import { LightBulbServiceBase } from '@ecoflow/services/lightBulbServiceBase';
export declare class BrightnessService extends LightBulbServiceBase {
    constructor(ecoFlowAccessory: EcoFlowAccessoryBase, maxBrightness: number);
    protected processOnSetOn(state: boolean): Promise<void>;
    protected processOnSetBrightness(value: number, revert: () => void): Promise<void>;
}
