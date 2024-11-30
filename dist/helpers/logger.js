"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
class Logger {
    logger;
    deviceName;
    constructor(logger, deviceName) {
        this.logger = logger;
        this.deviceName = deviceName;
    }
    static create(logger, deviceName) {
        return new Logger(logger, deviceName);
    }
    get prefix() {
        return this.logger.prefix;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    info(message, ...parameters) {
        this.logger.info(this.wrapMessage(message), ...parameters);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    success(message, ...parameters) {
        this.logger.success(this.wrapMessage(message), ...parameters);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    warn(message, ...parameters) {
        this.logger.warn(this.wrapMessage(message), ...parameters);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error(message, ...parameters) {
        this.logger.error(this.wrapMessage(message), ...parameters);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    debug(message, ...parameters) {
        this.logger.debug(this.wrapMessage(message), ...parameters);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    log(level, message, ...parameters) {
        this.logger.log(level, this.wrapMessage(message), ...parameters);
    }
    wrapMessage(message) {
        return `[${this.deviceName}] ${message}`;
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map