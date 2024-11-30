import { MqttDevice } from '@ecoflow/apis/containers/mqttDevice';
import { AcquireCertificateData } from '@ecoflow/apis/interfaces/httpApiContracts';
import { DeviceInfoConfig, SerialNumber } from '@ecoflow/config';
import { Logging } from 'homebridge';
import mqtt from 'mqtt';
export declare class MqttClientContainer {
    readonly certificateData: AcquireCertificateData;
    private _client;
    private readonly devicesCache;
    constructor(certificateData: AcquireCertificateData);
    get client(): mqtt.MqttClient | null;
    set client(new_client: mqtt.MqttClient);
    isConnected(): boolean;
    getDevices(serialNumber?: SerialNumber): MqttDevice[];
    addDevice(config: DeviceInfoConfig, log: Logging): void;
    getAllDevices(): MqttDevice[];
}
