import { Delta2AllQuotaData } from '@ecoflow/accessories/batteries/delta2/interfaces/delta2HttpApiContracts';
import { Delta2MqttSetModuleType } from '@ecoflow/accessories/batteries/delta2/interfaces/delta2MqttApiContracts';
import { Delta2OutletServiceBase } from '@ecoflow/accessories/batteries/delta2/services/delta2OutletServiceBase';
import { EcoFlowAccessoryWithQuotaBase } from '@ecoflow/accessories/ecoFlowAccessoryWithQuotaBase';
export declare class OutletAcService extends Delta2OutletServiceBase {
    private readonly setModuleType;
    constructor(ecoFlowAccessory: EcoFlowAccessoryWithQuotaBase<Delta2AllQuotaData>, setModuleType: Delta2MqttSetModuleType);
    protected setOn(value: boolean, revert: () => void): Promise<void>;
}
