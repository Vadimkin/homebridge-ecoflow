import { EcoFlowAccessoryBase } from '@ecoflow/accessories/ecoFlowAccessoryBase';
import { ServiceBase } from '@ecoflow/services/serviceBase';
import { Characteristic } from 'homebridge';
export declare abstract class LightBulbServiceBase extends ServiceBase {
    protected readonly ecoFlowAccessory: EcoFlowAccessoryBase;
    private readonly maxBrightness;
    private currentBrightness;
    private brightnessCharacteristic;
    constructor(ecoFlowAccessory: EcoFlowAccessoryBase, maxBrightness: number, serviceSubType: string);
    protected addCharacteristics(): Characteristic[];
    updateState(state: boolean): void;
    updateBrightness(value: number): void;
    protected setBrightness(value: number): void;
    protected abstract processOnSetOn(value: boolean, revert: () => void): Promise<void>;
    protected abstract processOnSetBrightness(value: number, revert: () => void): Promise<void>;
}
