"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceBase = void 0;
class ServiceBase {
    serviceType;
    ecoFlowAccessory;
    serviceSubType;
    log;
    platform;
    characteristics = [];
    _service = null;
    constructor(serviceType, ecoFlowAccessory, serviceSubType) {
        this.serviceType = serviceType;
        this.ecoFlowAccessory = ecoFlowAccessory;
        this.serviceSubType = serviceSubType;
        this.log = ecoFlowAccessory.log;
        this.platform = ecoFlowAccessory.platform;
    }
    initialize() {
        this._service = this.createService();
        this.characteristics = this.addCharacteristics();
        this.characteristics.push(this.addCharacteristic(this.platform.Characteristic.Name));
    }
    cleanupCharacteristics() {
        this.service.characteristics
            .filter(characteristic => !this.characteristics.includes(characteristic))
            .forEach(characteristic => {
            this.log.warn(`[${this.service.displayName}] Removing obsolete characteristic:`, characteristic.displayName);
            this.service.removeCharacteristic(characteristic);
        });
    }
    // Getter for service
    get service() {
        if (!this._service) {
            this.log.error('Service is not initialized:', this.constructor.name);
            throw new Error(`Service is not initialized: ${this.constructor.name}`);
        }
        return this._service;
    }
    get serviceName() {
        return `${this.ecoFlowAccessory.config.name} ${this.serviceSubType}`;
    }
    createService() {
        return this.serviceSubType
            ? this.getOrAddServiceById(this.serviceType, this.serviceName, this.serviceSubType)
            : this.getOrAddService(this.serviceType, this.ecoFlowAccessory.config.name);
    }
    addCharacteristic(characteristic) {
        return this.service.getCharacteristic(characteristic);
    }
    getOrAddService(service, displayName) {
        const result = this.ecoFlowAccessory.accessory.getService(service) ||
            this.ecoFlowAccessory.accessory.addService(service, displayName, service.UUID);
        result.displayName = displayName ?? result.displayName;
        return result;
    }
    getOrAddServiceById(service, serviceName, serviceSubType) {
        const result = this.ecoFlowAccessory.accessory.getServiceById(service, serviceSubType) ||
            this.ecoFlowAccessory.accessory.addService(service, serviceName, serviceSubType);
        return result;
    }
    updateCharacteristic(characteristic, name, value) {
        const newName = this.serviceSubType !== undefined ? `${this.serviceSubType} ${name}` : name;
        this.log.debug(`${newName} ->`, value);
        this.service.getCharacteristic(characteristic).updateValue(value);
    }
    covertPercentsToValue(percents, maxValue) {
        return (percents * maxValue) / 100;
    }
    covertValueToPercents(value, maxValue) {
        return (value * 100) / maxValue;
    }
}
exports.ServiceBase = ServiceBase;
//# sourceMappingURL=serviceBase.js.map