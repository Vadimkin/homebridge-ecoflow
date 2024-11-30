import { AcEnableType, AcOutFrequencyType, AcXBoostType, EnableType } from '@ecoflow/accessories/batteries/interfaces/batteryHttpApiContracts';
export interface BmsMasterStatus {
    f32ShowSoc?: number;
}
export interface InvStatusAc {
    outputWatts?: number;
    cfgAcEnabled?: AcEnableType;
    cfgAcXboost?: AcXBoostType;
    cfgAcOutFreq?: AcOutFrequencyType;
    cfgAcOutVoltage?: number;
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
export interface DeltaProAllQuotaData {
    bmsMaster: BmsMasterStatus;
    inv: InvStatus;
    pd: PdStatus;
}
