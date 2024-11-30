"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceInfo = void 0;
class DeviceInfo {
    config;
    log;
    _connectionKey;
    _accessKey;
    constructor(config, log) {
        this.config = config;
        this.log = log;
        this._connectionKey = `${config.accessKey}_${config.secretKey}`;
        this._accessKey = config.accessKey;
    }
    get connectionKey() {
        return this._connectionKey;
    }
    get accessKey() {
        return this._accessKey;
    }
}
exports.DeviceInfo = DeviceInfo;
//# sourceMappingURL=deviceInfo.js.map