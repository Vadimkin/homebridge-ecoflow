import { DeviceAccessConfig } from '@ecoflow/config';
import { Logging } from 'homebridge';
export type ConnectionKey = string;
export type AccessKey = string;
export declare class DeviceInfo {
    readonly config: DeviceAccessConfig;
    readonly log: Logging;
    private readonly _connectionKey;
    private readonly _accessKey;
    constructor(config: DeviceAccessConfig, log: Logging);
    get connectionKey(): ConnectionKey;
    get accessKey(): AccessKey;
}
