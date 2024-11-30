import { EcoFlowAccessoryBase } from '@ecoflow/accessories/ecoFlowAccessoryBase';
import { FanServiceBase } from '@ecoflow/services/fanServiceBase';
export declare class PowerDemandService extends FanServiceBase {
    constructor(ecoFlowAccessory: EcoFlowAccessoryBase, maxPowerDemand: number);
    protected processOnSetOn(state: boolean): Promise<void>;
    protected processOnSetRotationSpeed(value: number, revert: () => void): Promise<void>;
}
