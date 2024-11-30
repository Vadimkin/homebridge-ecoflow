import { EcoFlowAccessoryBase } from '@ecoflow/accessories/ecoFlowAccessoryBase';
import { ServiceBase } from '@ecoflow/services/serviceBase';
import { Characteristic } from 'homebridge';
export declare class BatteryStatusService extends ServiceBase {
    protected readonly ecoFlowAccessory: EcoFlowAccessoryBase;
    constructor(ecoFlowAccessory: EcoFlowAccessoryBase, serviceSubType?: string);
    protected addCharacteristics(): Characteristic[];
    updateBatteryLevel(batteryLevel: number): void;
    updateChargingState(isCharging: boolean): void;
    private updateStatusLowBattery;
}
