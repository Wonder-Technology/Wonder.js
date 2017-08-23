"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ESide_1 = require("../../../../enum/ESide");
exports.initState = function (state, getGL, setSide, DeviceManagerDataFromSystem) {
    var gl = getGL(DeviceManagerDataFromSystem, state);
    setSide(gl, ESide_1.ESide.FRONT, DeviceManagerDataFromSystem);
};
//# sourceMappingURL=stateUtils.js.map