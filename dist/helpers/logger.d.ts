import { Logging, LogLevel } from 'homebridge';
export declare class Logger {
    private readonly logger;
    private readonly deviceName;
    private constructor();
    static create(logger: Logging, deviceName: string): Logging;
    get prefix(): string;
    info(message: string, ...parameters: any[]): void;
    success(message: string, ...parameters: any[]): void;
    warn(message: string, ...parameters: any[]): void;
    error(message: string, ...parameters: any[]): void;
    debug(message: string, ...parameters: any[]): void;
    log(level: LogLevel, message: string, ...parameters: any[]): void;
    private wrapMessage;
}
