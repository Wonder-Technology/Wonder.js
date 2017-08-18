import { Map } from "immutable";
import {
    detectCapabilty, detectExtension as detectExtensionSystem, getExtension
} from "../../../../../utils/device/gpuDetectUtils";

export var detect = (getGL: Function, DeviceManagerDataFromSystem: any, GPUDetectDataFromSystem:any, state: Map<any, any>,) => {
    var gl = getGL(DeviceManagerDataFromSystem, state);

    _detectExtension(state, gl, GPUDetectDataFromSystem);
    _detectCapabilty(state, gl, GPUDetectDataFromSystem);

    return state;
}

var _detectExtension = (state: Map<any, any>, gl:any, GPUDetectDataFromSystem:any) => {
    detectExtensionSystem(state, gl, GPUDetectDataFromSystem);

    GPUDetectDataFromSystem.extensionColorBufferFloat = getExtension("EXT_color_buffer_float", state, gl);
}

var _detectCapabilty = (state: Map<any, any>, gl: any, GPUDetectDataFromSystem:any) => {
    detectCapabilty(state, gl, GPUDetectDataFromSystem);

    GPUDetectDataFromSystem.maxUniformBufferBindings = gl.getParameter(gl.MAX_UNIFORM_BUFFER_BINDINGS);
}

export var getMaxUniformBufferBindings = (GPUDetectDataFromSystem:any) => GPUDetectDataFromSystem.maxUniformBufferBindings;

export var hasExtensionColorBufferFloat = (GPUDetectDataFromSystem:any) => !!GPUDetectDataFromSystem.extensionColorBufferFloat;
