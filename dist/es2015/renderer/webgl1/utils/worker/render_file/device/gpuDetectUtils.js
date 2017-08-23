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
//# sourceMappingURL=gpuDetectUtils.js.map