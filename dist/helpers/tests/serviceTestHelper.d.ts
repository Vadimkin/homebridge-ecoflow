import { CharacteristicValue, Nullable, Service } from 'homebridge';
export interface MockCharacteristic {
    UUID: string;
    value: Nullable<CharacteristicValue>;
}
export declare function getActualCharacteristics(service: Service): MockCharacteristic[];
