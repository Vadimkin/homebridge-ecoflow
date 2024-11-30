import { EcoFlowAccessoryBase } from '@ecoflow/accessories/ecoFlowAccessoryBase';
import { ServiceBase } from '@ecoflow/services/serviceBase';
import { Characteristic } from 'homebridge';
export declare abstract class FanServiceBase extends ServiceBase {
    protected readonly ecoFlowAccessory: EcoFlowAccessoryBase;
    private readonly maxRotationSpeed;
    private currentRotationSpeed;
    private rotationSpeedCharacteristic;
    constructor(ecoFlowAccessory: EcoFlowAccessoryBase, maxRotationSpeed: number, serviceSubType: string);
    protected addCharacteristics(): Characteristic[];
    updateState(state: boolean): void;
    updateRotationSpeed(value: number): void;
    protected setRotationSpeed(value: number): void;
    protected abstract processOnSetOn(value: boolean, revert: () => void): Promise<void>;
    protected abstract processOnSetRotationSpeed(value: number, revert: () => void): Promise<void>;
}
