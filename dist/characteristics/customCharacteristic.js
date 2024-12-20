"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomCharacteristics = exports.PowerConsumption = exports.OutputConsumptionWattFactory = exports.InputConsumptionWattFactory = void 0;
const InputConsumptionWattFactory = (hap) => {
    return class InputConsumptionWatt extends hap.Characteristic {
        static UUID = '13172B0A-D346-4730-9732-32EF5B6EF8B7';
        constructor() {
            super('Input Consumption', InputConsumptionWatt.UUID, {
                description: 'Input Consumption, W',
                format: "float" /* hap.Formats.FLOAT */,
                perms: ["ev" /* hap.Perms.NOTIFY */, "pr" /* hap.Perms.PAIRED_READ */],
                minValue: 0,
                minStep: 1,
                unit: "celsius" /* hap.Units.CELSIUS */, // To allow setting numeric value for conditions in ShortCuts
            });
            this.value = this.getDefaultValue();
        }
    };
};
exports.InputConsumptionWattFactory = InputConsumptionWattFactory;
const OutputConsumptionWattFactory = (hap) => {
    return class OutputConsumptionWatt extends hap.Characteristic {
        // Eve characteristic
        static UUID = 'E863F10D-079E-48FF-8F27-9C2605A29F52';
        constructor() {
            super('Output Consumption', OutputConsumptionWatt.UUID, {
                description: 'Output Consumption, W',
                format: "float" /* hap.Formats.FLOAT */,
                perms: ["ev" /* hap.Perms.NOTIFY */, "pr" /* hap.Perms.PAIRED_READ */],
                unit: "celsius" /* hap.Units.CELSIUS */, // To allow setting numeric value for conditions in ShortCuts
                minValue: 0,
                minStep: 1,
            });
            this.value = this.getDefaultValue();
        }
    };
};
exports.OutputConsumptionWattFactory = OutputConsumptionWattFactory;
// https://gist.github.com/simont77/3f4d4330fa55b83f8ca96388d9004e7d
// export const PowerConsumptionVoltFactory = (hap: HAP): WithUUID<{ new (): Characteristic }> => {
//   return class PowerConsumptionVolt extends hap.Characteristic {
//     public static readonly UUID: string = 'E863F10A-079E-48FF-8F27-9C2605A29F52';
//     constructor() {
//       super('Voltage', PowerConsumptionVolt.UUID, {
//         description: '"Voltage, V" in Eve App',
//         format: Formats.FLOAT,
//         perms: [Perms.NOTIFY, Perms.PAIRED_READ],
//         minValue: 0,
//         maxValue: 300,
//       });
//       this.value = this.getDefaultValue();
//     }
//   };
// };
// export const PowerConsumptionAmpereFactory = (hap: HAP): WithUUID<{ new (): Characteristic }> => {
//   return class PowerConsumptionAmpere extends hap.Characteristic {
//     public static readonly UUID: string = 'E863F126-079E-48FF-8F27-9C2605A29F52';
//     constructor() {
//       super('Current', PowerConsumptionAmpere.UUID, {
//         description: '"Current, A" in Eve App',
//         format: Formats.FLOAT,
//         perms: [Perms.NOTIFY, Perms.PAIRED_READ],
//         minValue: 0,
//         maxValue: 100,
//       });
//       this.value = this.getDefaultValue();
//     }
//   };
// };
// export const PowerConsumptionKilowattHourFactory = (hap: HAP): WithUUID<{ new (): Characteristic }> => {
//   return class PowerConsumptionKilowattHour extends hap.Characteristic {
//     public static readonly UUID: string = 'E863F10C-079E-48FF-8F27-9C2605A29F52';
//     constructor() {
//       super('Total Consumption', PowerConsumptionKilowattHour.UUID, {
//         description: '"Total Consumption, kW/h" in Eve App',
//         format: Formats.FLOAT,
//         perms: [Perms.NOTIFY, Perms.PAIRED_READ],
//         minValue: 0,
//         maxValue: 50,
//       });
//       this.value = this.getDefaultValue();
//     }
//   };
// };
class PowerConsumption {
    static InputConsumptionWatts;
    static OutputConsumptionWatts;
}
exports.PowerConsumption = PowerConsumption;
class CustomCharacteristics {
    static PowerConsumption = PowerConsumption;
}
exports.CustomCharacteristics = CustomCharacteristics;
//# sourceMappingURL=customCharacteristic.js.map