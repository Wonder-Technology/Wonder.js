"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gpuDetectUtils_1 = require("../../../../../utils/device/gpuDetectUtils");
exports.detect = function (getGL, DeviceManagerDataFromSystem, GPUDetectDataFromSystem, state) {
    var gl = getGL(DeviceManagerDataFromSystem, state);
    _detectExtension(state, gl, GPUDetectDataFromSystem);
    gpuDetectUtils_1.detectCapabilty(state, gl, GPUDetectDataFromSystem);
    return state;
};
var _detectExtension = function (state, gl, GPUDetectDataFromSystem) {
    gpuDetectUtils_1.detectExtension(state, gl, GPUDetectDataFromSystem);
};
exports.getExtensionVao = function (GPUDetectDataFromSystem) { return GPUDetectDataFromSystem.extensionVao; };
//# sourceMappingURL=gpuDetectUtils.js.map