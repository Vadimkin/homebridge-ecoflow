export interface Heartbeat {
    pv1InputWatts?: number;
    pv2InputWatts?: number;
    batInputWatts?: number;
    batSoc?: number;
    invOutputWatts?: number;
    invOnOff?: boolean;
    invBrightness?: number;
    supplyPriority?: number;
    permanentWatts?: number;
    upperLimit?: number;
    lowerLimit?: number;
}
export interface PowerStreamAllQuotaData {
    '20_1': Heartbeat;
}
