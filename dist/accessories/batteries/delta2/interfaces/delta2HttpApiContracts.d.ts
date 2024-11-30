import { AcEnableType, AcOutFrequencyType, AcXBoostType, EnableType } from '@ecoflow/accessories/batteries/interfaces/batteryHttpApiContracts';
export interface BmsStatus {
    f32ShowSoc?: number;
}
export interface StatusAc {
    cfgAcEnabled?: AcEnableType;
    cfgAcXboost?: AcXBoostType;
    cfgAcOutFreq?: AcOutFrequencyType;
    cfgAcOutVol?: number;
}
export interface InvStatusAc extends StatusAc {
    outputWatts?: number;
}
export interface InvStatus extends InvStatusAc {
    inputWatts?: number;
}
export interface PdStatusCar {
    carState?: EnableType;
    carWatts?: number;
}
export interface PdStatusUsb {
    dcOutState?: EnableType;
    usb1Watts?: number;
    usb2Watts?: number;
    qcUsb1Watts?: number;
    qcUsb2Watts?: number;
    typec1Watts?: number;
    typec2Watts?: number;
}
export interface PdStatus extends PdStatusUsb, PdStatusCar {
}
export interface Delta2AllQuotaData {
    bms_bmsStatus: BmsStatus;
    inv: InvStatus;
    pd: PdStatus;
    mppt: MpptStatus;
}
export interface MpptStatus extends StatusAc {
}
