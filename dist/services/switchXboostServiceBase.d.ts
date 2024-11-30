import { EcoFlowAccessoryBase } from '@ecoflow/accessories/ecoFlowAccessoryBase';
import { ServiceBase } from '@ecoflow/services/serviceBase';
import { Characteristic } from 'homebridge';
export declare abstract class SwitchXboostServiceBase extends ServiceBase {
    constructor(ecoFlowAccessory: EcoFlowAccessoryBase);
    updateState(state: boolean): void;
    protected addCharacteristics(): Characteristic[];
    protected abstract setOn(value: boolean, revert: () => void): Promise<void>;
}
