import { Map } from "immutable";
export declare class GPUDetector {
    static getInstance(): any;
    private constructor();
    maxTextureUnit: number;
    maxTextureSize: number;
    maxCubemapTextureSize: number;
    maxAnisotropy: number;
    maxBoneCount: number;
    extensionCompressedTextureS3TC: any;
    extensionTextureFilterAnisotropic: any;
    extensionInstancedArrays: any;
    extensionUintIndices: boolean;
    extensionDepthTexture: boolean;
    extensionVAO: any;
    extensionStandardDerivatives: boolean;
    precision: number;
    private _isDetected;
    detect(state: Map<any, any>, getGL: Function, DeviceManagerDataFromSystem: any): Map<any, any>;
    private _detectExtension(state, gl);
    private _detectCapabilty(state, gl);
    private _getExtension(name, state, gl);
    private _getMaxBoneCount(state, gl);
    private _getMaxAnisotropy(state, gl);
    private _detectPrecision(state, gl);
}
export declare enum EGPUPrecision {
    HIGHP = 0,
    MEDIUMP = 1,
    LOWP = 2,
}
