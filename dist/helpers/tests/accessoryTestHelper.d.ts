import { EcoFlowAccessoryBase } from '@ecoflow/accessories/ecoFlowAccessoryBase';
export interface MockService {
    Name: string;
}
export declare function getActualServices(accessory: EcoFlowAccessoryBase): MockService[];
