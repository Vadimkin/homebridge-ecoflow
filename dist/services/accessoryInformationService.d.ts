import { EcoFlowAccessoryBase } from '@ecoflow/accessories/ecoFlowAccessoryBase';
import { ServiceBase } from '@ecoflow/services/serviceBase';
import { Characteristic } from 'homebridge';
export declare class AccessoryInformationService extends ServiceBase {
    protected readonly ecoFlowAccessory: EcoFlowAccessoryBase;
    constructor(ecoFlowAccessory: EcoFlowAccessoryBase);
    protected addCharacteristics(): Characteristic[];
    private getVersion;
}
