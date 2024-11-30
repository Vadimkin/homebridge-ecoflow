import { MqttSetMessage } from '@ecoflow/apis/interfaces/mqttApiContracts';
export declare abstract class Simulator {
    abstract generateQuota(): object;
    abstract generateSetReply(message: string): object;
    protected getRandomNumber(min: number, max: number): number;
    protected getRandomBoolean(): boolean;
}
export declare abstract class SimulatorTyped<TSetMessage extends MqttSetMessage> extends Simulator {
    generateSetReply(message: string): object;
    abstract generateSetReplyTyped(message: TSetMessage): object;
    protected getRandomNumber(min: number, max: number): number;
    protected getRandomBoolean(): boolean;
}
