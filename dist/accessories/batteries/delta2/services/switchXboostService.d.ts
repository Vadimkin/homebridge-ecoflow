import { Delta2AllQuotaData } from '@ecoflow/accessories/batteries/delta2/interfaces/delta2HttpApiContracts';
import { Delta2MqttSetModuleType } from '@ecoflow/accessories/batteries/delta2/interfaces/delta2MqttApiContracts';
import { EcoFlowAccessoryWithQuotaBase } from '@ecoflow/accessories/ecoFlowAccessoryWithQuotaBase';
import { SwitchXboostServiceBase } from '@ecoflow/services/switchXboostServiceBase';
export declare class SwitchXboostService extends SwitchXboostServiceBase {
    private readonly setAcModuleType;
    constructor(ecoFlowAccessory: EcoFlowAccessoryWithQuotaBase<Delta2AllQuotaData>, setAcModuleType: Delta2MqttSetModuleType);
    protected setOn(value: boolean, revert: () => void): Promise<void>;
    private sendOn;
}
