"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('module-alias/register');
const platform_1 = require("@ecoflow/platform");
const settings_1 = require("@ecoflow/settings");
/**
 * This method registers the platform with Homebridge
 */
exports.default = (api) => {
    api.registerPlatform(settings_1.PLATFORM_NAME, platform_1.EcoFlowHomebridgePlatform);
};
//# sourceMappingURL=index.js.map