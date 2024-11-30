import { EcoFlowAccessoryBase } from '@ecoflow/accessories/ecoFlowAccessoryBase';
import { EcoFlowHomebridgePlatform } from '@ecoflow/platform';
import { Characteristic, CharacteristicValue, Logging, Service, WithUUID } from 'homebridge';
export declare abstract class ServiceBase {
    private readonly serviceType;
    protected readonly ecoFlowAccessory: EcoFlowAccessoryBase;
    protected readonly serviceSubType?: string | undefined;
    protected readonly log: Logging;
    protected readonly platform: EcoFlowHomebridgePlatform;
    protected characteristics: Characteristic[];
    private _service;
    constructor(serviceType: WithUUID<typeof Service>, ecoFlowAccessory: EcoFlowAccessoryBase, serviceSubType?: string | undefined);
    initialize(): void;
    cleanupCharacteristics(): void;
    get service(): Service;
    protected get serviceName(): string;
    protected createService(): Service;
    protected abstract addCharacteristics(): Characteristic[];
    protected addCharacteristic(characteristic: WithUUID<{
        new (): Characteristic;
    }>): Characteristic;
    protected getOrAddService(service: WithUUID<typeof Service>, displayName?: string): Service;
    protected getOrAddServiceById(service: WithUUID<typeof Service>, serviceName: string, serviceSubType: string): Service;
    protected updateCharacteristic(characteristic: WithUUID<{
        new (): Characteristic;
    }>, name: string, value: CharacteristicValue): void;
    protected covertPercentsToValue(percents: number, maxValue: number): number;
    protected covertValueToPercents(value: number, maxValue: number): number;
}
