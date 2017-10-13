import { detectCapabilty, detectExtension as detectExtensionSystem } from "../../../../../utils/device/gpuDetectUtils";
export var detect = function (getGL, DeviceManagerDataFromSystem, GPUDetectDataFromSystem, state) {
    var gl = getGL(DeviceManagerDataFromSystem, state);
    _detectExtension(state, gl, GPUDetectDataFromSystem);
    detectCapabilty(state, gl, GPUDetectDataFromSystem);
    return state;
};
var _detectExtension = function (state, gl, GPUDetectDataFromSystem) {
    detectExtensionSystem(state, gl, GPUDetectDataFromSystem);
};
export var getExtensionVao = function (GPUDetectDataFromSystem) { return GPUDetectDataFromSystem.extensionVao; };
export var initData = function (GPUDetectDataFromSystem) {
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