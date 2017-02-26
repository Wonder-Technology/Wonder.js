export declare class GPUDetector {
    static getInstance(): any;
    private constructor();
    readonly gl: any;
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
    detect(): void;
    private _detectExtension();
    private _detectCapabilty();
    private _getExtension(name);
    private _getMaxBoneCount();
    private _getMaxAnisotropy();
    private _detectPrecision();
}
export declare enum EGPUPrecision {
    HIGHP = 0,
    MEDIUMP = 1,
    LOWP = 2,
}
