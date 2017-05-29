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
    detect(state: Map<any, any>): Map<any, any>;
    private _detectExtension(state);
    private _detectCapabilty(state);
    private _getExtension(name, state);
    private _getMaxBoneCount(state);
    private _getMaxAnisotropy(state);
    private _detectPrecision(state);
}
export declare enum EGPUPrecision {
    HIGHP = 0,
    MEDIUMP = 1,
    LOWP = 2,
}
