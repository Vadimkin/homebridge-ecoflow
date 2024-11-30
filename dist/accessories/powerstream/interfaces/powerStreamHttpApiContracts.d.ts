import { EnableType } from '@ecoflow/accessories/batteries/interfaces/batteryHttpApiContracts';
export declare enum SupplyPriorityType {
    Supply = 0,
    Storage = 1
}
export interface Heartbeat {
    pv1InputWatts?: number;
    pv2InputWatts?: number;
    batInputWatts?: number;
    batSoc?: number;
    invOutputWatts?: number;
    invOnOff?: EnableType;
    invBrightness?: number;
    supplyPriority?: SupplyPriorityType;
    permanentWatts?: number;
    upperLimit?: number;
    lowerLimit?: number;
}
export interface PowerStreamAllQuotaData {
    '20_1': Heartbeat;
}
