import { Delta2MqttSetMessageParams, Delta2MqttSetModuleType, Delta2MqttSetOperationType } from '@ecoflow/accessories/batteries/delta2/interfaces/delta2MqttApiContracts';
import { OutletServiceBase } from '@ecoflow/services/outletServiceBase';
export declare abstract class Delta2OutletServiceBase extends OutletServiceBase {
    protected sendOn<TParams extends Delta2MqttSetMessageParams>(moduleType: Delta2MqttSetModuleType, operateType: Delta2MqttSetOperationType, params: TParams, revert: () => void): Promise<void>;
}
