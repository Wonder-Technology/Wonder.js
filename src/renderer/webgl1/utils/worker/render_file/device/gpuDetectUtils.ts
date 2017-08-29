import { Map } from "immutable";
import { detectCapabilty, detectExtension as detectExtensionSystem } from "../../../../../utils/device/gpuDetectUtils";

export var detect = (getGL: Function, DeviceManagerDataFromSystem: any, GPUDetectDataFromSystem: any, state: Map<any, any>, ) => {
    var gl = getGL(DeviceManagerDataFromSystem, state);

    _detectExtension(state, gl, GPUDetectDataFromSystem);
    detectCapabilty(state, gl, GPUDetectDataFromSystem);

    return state;
}

var _detectExtension = (state: Map<any, any>, gl: any, GPUDetectDataFromSystem: any) => {
    detectExtensionSystem(state, gl, GPUDetectDataFromSystem);
}

export var getExtensionVao = (GPUDetectDataFromSystem: any) => GPUDetectDataFromSystem.extensionVao;

export var initData = (GPUDetectDataFromSystem: any) => {
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
}
