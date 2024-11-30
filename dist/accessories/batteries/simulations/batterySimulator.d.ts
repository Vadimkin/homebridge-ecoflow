import { MqttBatterySetMessage } from '@ecoflow/accessories/batteries/interfaces/mqttApiBatteryContracts';
import { SimulatorTyped } from '@ecoflow/apis/simulations/simulator';
export declare class BatterySimulator extends SimulatorTyped<MqttBatterySetMessage> {
    generateQuota(): object;
    generateSetReplyTyped(message: MqttBatterySetMessage): object;
}
