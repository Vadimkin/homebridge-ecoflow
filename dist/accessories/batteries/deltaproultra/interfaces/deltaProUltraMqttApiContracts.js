"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeltaProUltraMqttSetCmdCodeType = exports.DeltaProUltraMqttMessageAddrType = void 0;
var DeltaProUltraMqttMessageAddrType;
(function (DeltaProUltraMqttMessageAddrType) {
    DeltaProUltraMqttMessageAddrType["PD"] = "hs_yj751_pd_appshow_addr";
    DeltaProUltraMqttMessageAddrType["PD_SET"] = "hs_yj751_pd_app_set_info_addr";
})(DeltaProUltraMqttMessageAddrType || (exports.DeltaProUltraMqttMessageAddrType = DeltaProUltraMqttMessageAddrType = {}));
var DeltaProUltraMqttSetCmdCodeType;
(function (DeltaProUltraMqttSetCmdCodeType) {
    // YJ751_PD_AC_SWITCH_SET = 'YJ751_PD_AC_SWITCH_SET', // TBD: verify that it exists in API
    DeltaProUltraMqttSetCmdCodeType["YJ751_PD_DC_SWITCH_SET"] = "YJ751_PD_DC_SWITCH_SET";
    DeltaProUltraMqttSetCmdCodeType["YJ751_PD_AC_DSG_SET"] = "YJ751_PD_AC_DSG_SET";
})(DeltaProUltraMqttSetCmdCodeType || (exports.DeltaProUltraMqttSetCmdCodeType = DeltaProUltraMqttSetCmdCodeType = {}));
//# sourceMappingURL=deltaProUltraMqttApiContracts.js.map