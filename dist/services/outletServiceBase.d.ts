import { EcoFlowAccessoryBase } from '@ecoflow/accessories/ecoFlowAccessoryBase';
import { AdditionalBatteryCharacteristicType as CharacteristicType } from '@ecoflow/config';
import { ServiceBase } from '@ecoflow/services/serviceBase';
import { Characteristic } from 'homebridge';
export declare abstract class OutletServiceBase extends ServiceBase {
    private readonly additionalCharacteristics?;
    constructor(ecoFlowAccessory: EcoFlowAccessoryBase, serviceSubType: string, additionalCharacteristics?: CharacteristicType[] | undefined);
    updateState(state: boolean): void;
    updateOutputConsumption(watt: number): void;
    updateInputConsumption(watt: number): void;
    updateBatteryLevel(batteryLevel: number): void;
    protected addCharacteristics(): Characteristic[];
    protected abstract setOn(value: boolean, revert: () => void): Promise<void>;
    private tryAddCustomCharacteristic;
    private updateCustomCharacteristic;
}
