"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gpuDetectUtils_1 = require("../../../../../utils/device/gpuDetectUtils");
exports.detect = function (getGL, DeviceManagerDataFromSystem, GPUDetectDataFromSystem, state) {
    var gl = getGL(DeviceManagerDataFromSystem, state);
    _detectExtension(state, gl, GPUDetectDataFromSystem);
    _detectCapabilty(state, gl, GPUDetectDataFromSystem);
    return state;
};
var _detectExtension = function (state, gl, GPUDetectDataFromSystem) {
    gpuDetectUtils_1.detectExtension(state, gl, GPUDetectDataFromSystem);
    GPUDetectDataFromSystem.extensionColorBufferFloat = gpuDetectUtils_1.getExtension("EXT_color_buffer_float", state, gl);
};
var _detectCapabilty = function (state, gl, GPUDetectDataFromSystem) {
    gpuDetectUtils_1.detectCapabilty(state, gl, GPUDetectDataFromSystem);
    GPUDetectDataFromSystem.maxUniformBufferBindings = gl.getParameter(gl.MAX_UNIFORM_BUFFER_BINDINGS);
};
exports.getMaxUniformBufferBindings = function (GPUDetectDataFromSystem) { return GPUDetectDataFromSystem.maxUniformBufferBindings; };
exports.hasExtensionColorBufferFloat = function (GPUDetectDataFromSystem) { return !!GPUDetectDataFromSystem.extensionColorBufferFloat; };
exports.initData = function (GPUDetectDataFromSystem) {
    GPUDetectDataFromSystem.maxTextureUnit = null;
    GPUDetectDataFromSystem.maxTextureSize = null;
    GPUDetectDataFromSystem.maxCubemapTextureSize = null;
    GPUDetectDataFromSystem.maxAnisotropy = null;
    GPUDetectDataFromSystem.maxBoneCount = null;
    GPUDetectDataFromSystem.maxUniformBufferBindings = null;
    GPUDetectDataFromSystem.extensionCompressedTextureS3TC = null;
    GPUDetectDataFromSystem.extensionTextureFilterAnisotropic = null;
    GPUDetectDataFromSystem.extensionInstancedArrays = null;
    GPUDetectDataFromSystem.extensionUintIndices = null;
    GPUDetectDataFromSystem.extensionDepthTexture = null;
    GPUDetectDataFromSystem.extensionVao = null;
    GPUDetectDataFromSystem.extensionStandardDerivatives = null;
    GPUDetectDataFromSystem.extensionColorBufferFloat = null;
    GPUDetectDataFromSystem.precision = null;
};
//# sourceMappingURL=gpuDetectUtils.js.map