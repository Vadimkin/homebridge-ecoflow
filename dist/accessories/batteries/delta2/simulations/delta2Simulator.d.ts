import { Delta2MqttSetMessage } from '@ecoflow/accessories/batteries/delta2/interfaces/delta2MqttApiContracts';
import { SimulatorTyped } from '@ecoflow/apis/simulations/simulator';
export declare class Delta2Simulator extends SimulatorTyped<Delta2MqttSetMessage> {
    generateQuota(): object;
    generateSetReplyTyped(message: Delta2MqttSetMessage): object;
}
