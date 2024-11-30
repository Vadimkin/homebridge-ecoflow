import { DeltaProUltraMqttSetMessage, DeltaProUltraMqttSetMessageParams, DeltaProUltraMqttSetMessageWithParams } from '@ecoflow/accessories/batteries/deltaproultra/interfaces/deltaProUltraMqttApiContracts';
import { SimulatorTyped } from '@ecoflow/apis/simulations/simulator';
export declare class DeltaProUltraSimulator extends SimulatorTyped<DeltaProUltraMqttSetMessageWithParams<DeltaProUltraMqttSetMessageParams>> {
    generateQuota(): object;
    generateSetReplyTyped(message: DeltaProUltraMqttSetMessage): object;
}
