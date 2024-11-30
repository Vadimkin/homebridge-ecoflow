import { DeltaProMqttSetMessageParams, DeltaProMqttSetMessageWithParams } from '@ecoflow/accessories/batteries/deltapro/interfaces/deltaProMqttApiContracts';
import { SimulatorTyped } from '@ecoflow/apis/simulations/simulator';
export declare class DeltaProSimulator extends SimulatorTyped<DeltaProMqttSetMessageWithParams<DeltaProMqttSetMessageParams>> {
    generateQuota(): object;
    generateSetReplyTyped(message: DeltaProMqttSetMessageWithParams<DeltaProMqttSetMessageParams>): object;
}
