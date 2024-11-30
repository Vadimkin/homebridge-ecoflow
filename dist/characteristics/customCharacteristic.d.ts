import { Characteristic, HAP, WithUUID } from 'homebridge';
export declare const InputConsumptionWattFactory: (hap: HAP) => WithUUID<{
    new (): Characteristic;
}>;
export declare const OutputConsumptionWattFactory: (hap: HAP) => WithUUID<{
    new (): Characteristic;
}>;
export declare class PowerConsumption {
    static InputConsumptionWatts: WithUUID<{
        new (): Characteristic;
    }>;
    static OutputConsumptionWatts: WithUUID<{
        new (): Characteristic;
    }>;
}
export declare class CustomCharacteristics {
    static readonly PowerConsumption: typeof PowerConsumption;
}
