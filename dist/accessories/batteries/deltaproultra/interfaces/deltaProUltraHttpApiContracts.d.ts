export interface PdSetStatus {
    acOutFreq?: AcOutFrequencyType;
}
export declare enum AcOutFrequencyType {
    None = 0,
    '50 Hz' = 50,
    '60 Hz' = 60
}
export interface PdStatusUsb {
    outUsb1Pwr?: number;
    outUsb2Pwr?: number;
    outTypec1Pwr?: number;
    outTypec2Pwr?: number;
}
export interface PdStatusBackupAc {
    outAcL11Pwr?: number;
    outAcL12Pwr?: number;
}
export interface PdStatusOnlineAc {
    outAcL21Pwr?: number;
    outAcL22Pwr?: number;
}
export interface PdStatusTt30Ac {
    outAcTtPwr?: number;
}
export interface PdStatusL14Ac {
    outAcL14Pwr?: number;
}
export interface PdStatusInOutAc {
    inAc5p8Pwr?: number;
    outAc5p8Pwr?: number;
}
export interface PdStatusAc extends PdStatusBackupAc, PdStatusOnlineAc, PdStatusTt30Ac, PdStatusL14Ac, PdStatusInOutAc {
}
export interface PdStatusSoc {
    soc?: number;
}
export interface PdStatusWatts {
    wattsInSum?: number;
    wattsOutSum?: number;
}
export interface PdStatus extends PdStatusSoc, PdStatusWatts, PdStatusAc, PdStatusUsb {
}
export interface DeltaProUltraAllQuotaData {
    hs_yj751_pd_appshow_addr: PdStatus;
    hs_yj751_pd_app_set_info_addr: PdSetStatus;
}
