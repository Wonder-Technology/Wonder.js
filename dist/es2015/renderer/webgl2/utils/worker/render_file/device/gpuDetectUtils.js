import { detectCapabilty, detectExtension as detectExtensionSystem, getExtension } from "../../../../../utils/device/gpuDetectUtils";
export var detect = function (getGL, DeviceManagerDataFromSystem, GPUDetectDataFromSystem, state) {
    var gl = getGL(DeviceManagerDataFromSystem, state);
    _detectExtension(state, gl, GPUDetectDataFromSystem);
    _detectCapabilty(state, gl, GPUDetectDataFromSystem);
    return state;
};
var _detectExtension = function (state, gl, GPUDetectDataFromSystem) {
    detectExtensionSystem(state, gl, GPUDetectDataFromSystem);
    GPUDetectDataFromSystem.extensionColorBufferFloat = getExtension("EXT_color_buffer_float", state, gl);
};
var _detectCapabilty = function (state, gl, GPUDetectDataFromSystem) {
    detectCapabilty(state, gl, GPUDetectDataFromSystem);
    GPUDetectDataFromSystem.maxUniformBufferBindings = gl.getParameter(gl.MAX_UNIFORM_BUFFER_BINDINGS);
};
export var getMaxUniformBufferBindings = function (GPUDetectDataFromSystem) { return GPUDetectDataFromSystem.maxUniformBufferBindings; };
export var hasExtensionColorBufferFloat = function (GPUDetectDataFromSystem) { return !!GPUDetectDataFromSystem.extensionColorBufferFloat; };
//# sourceMappingURL=gpuDetectUtils.js.map