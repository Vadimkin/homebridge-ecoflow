import { MqttBatterySetOperationType } from '@ecoflow/accessories/batteries/interfaces/mqttApiBatteryContracts';
import { OutletServiceBase } from '@ecoflow/services/outletServiceBase';
export declare abstract class OutletBatteryServiceBase extends OutletServiceBase {
    protected sendOn<TParams>(moduleType: number, operateType: MqttBatterySetOperationType, params: TParams, revert: () => void): Promise<void>;
}
