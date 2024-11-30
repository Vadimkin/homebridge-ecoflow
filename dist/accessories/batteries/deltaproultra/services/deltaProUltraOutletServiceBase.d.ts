import { DeltaProUltraMqttSetCmdCodeType, DeltaProUltraMqttSetMessageParams } from '@ecoflow/accessories/batteries/deltaproultra/interfaces/deltaProUltraMqttApiContracts';
import { OutletServiceBase } from '@ecoflow/services/outletServiceBase';
export declare abstract class DeltaProUltraOutletServiceBase extends OutletServiceBase {
    protected sendOn<TParams extends DeltaProUltraMqttSetMessageParams>(cmdCode: DeltaProUltraMqttSetCmdCodeType, params: TParams, revert: () => void): Promise<void>;
}
