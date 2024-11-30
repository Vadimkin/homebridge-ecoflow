import { PowerStreamMqttSetMessage } from '@ecoflow/accessories/powerstream/interfaces/powerStreamMqttApiContracts';
import { SimulatorTyped } from '@ecoflow/apis/simulations/simulator';
export declare class PowerStreamSimulator extends SimulatorTyped<PowerStreamMqttSetMessage> {
    generateQuota(): object;
    generateSetReplyTyped(message: PowerStreamMqttSetMessage): object;
}
