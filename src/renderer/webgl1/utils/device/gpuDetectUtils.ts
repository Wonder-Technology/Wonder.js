import { Map } from "immutable";
import { detectCapabilty, detectExtension as detectExtensionSystem } from "../../../utils/device/gpuDetectUtils";

export var detect = (getGL: Function, DeviceManagerDataFromSystem: any, GPUDetectDataFromSystem:any, state: Map<any, any>,) => {
    var gl = getGL(DeviceManagerDataFromSystem, state);

    _detectExtension(state, gl, GPUDetectDataFromSystem);
    detectCapabilty(state, gl, GPUDetectDataFromSystem);

    return state;
}

var _detectExtension = (state: Map<any, any>, gl:any, GPUDetectDataFromSystem:any) => {
    detectExtensionSystem(state, gl, GPUDetectDataFromSystem);
}

