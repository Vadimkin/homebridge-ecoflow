import { DeviceInfo } from '@ecoflow/apis/containers/deviceInfo';
import { AcquireCertificateData, CmdResponse, HttpMethod } from '@ecoflow/apis/interfaces/httpApiContracts';
export declare class EcoFlowHttpApiManager {
    getQuotas<TData>(quotas: string[], deviceInfo: DeviceInfo): Promise<TData | null>;
    getAllQuotas<TData>(deviceInfo: DeviceInfo): Promise<TData | null>;
    acquireCertificate(deviceInfo: DeviceInfo): Promise<AcquireCertificateData | null>;
    protected execute<TResponse extends CmdResponse>(deviceInfo: DeviceInfo, relativeUrl: string, method: HttpMethod, queryParameters?: object | null): Promise<TResponse>;
    private getNonce;
    private composeSignMessage;
    private createHmacSha256;
    private stringifyOptions;
    private convertData;
}
