export interface EmsStatus {
    f32LcdShowSoc?: number;
}
export interface InvStatusAc {
    outputWatts?: number;
    cfgAcEnabled?: boolean;
    cfgAcXboost?: boolean;
    cfgAcOutFreq?: number;
    cfgAcOutVol?: number;
}
export interface InvStatus extends InvStatusAc {
    inputWatts?: number;
}
export interface PdStatusCar {
    carState?: boolean;
    carWatts?: number;
}
export interface PdStatusUsb {
    dcOutState?: boolean;
    usb1Watts?: number;
    usb2Watts?: number;
    qcUsb1Watts?: number;
    qcUsb2Watts?: number;
    typec1Watts?: number;
    typec2Watts?: number;
}
export interface PdStatus extends PdStatusUsb, PdStatusCar {
}
export interface BatteryAllQuotaData {
    bms_emsStatus: EmsStatus;
    inv: InvStatus;
    pd: PdStatus;
}
