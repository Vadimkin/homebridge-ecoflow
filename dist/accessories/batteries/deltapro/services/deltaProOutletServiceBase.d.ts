import { DeltaProMqttSetMessageParams } from '@ecoflow/accessories/batteries/deltapro/interfaces/deltaProMqttApiContracts';
import { OutletServiceBase } from '@ecoflow/services/outletServiceBase';
export declare abstract class DeltaProOutletServiceBase extends OutletServiceBase {
    protected sendOn<TParams extends DeltaProMqttSetMessageParams>(params: TParams, revert: () => void): Promise<void>;
}
