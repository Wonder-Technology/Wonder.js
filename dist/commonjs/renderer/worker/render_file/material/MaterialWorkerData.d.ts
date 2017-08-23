export declare class MaterialWorkerData {
    static shaderIndices: Uint32Array;
    static colors: Float32Array;
    static opacities: Float32Array;
    static alphaTests: Float32Array;
}
export declare type MaterialInitWorkerData = {
    buffer: SharedArrayBuffer;
    basicMaterialData: BasicMaterialInitWorkerData;
    lightMaterialData: LightMaterialInitWorkerData;
};
export declare type BasicMaterialInitWorkerData = {
    startIndex: number;
    index: number;
};
export declare type LightMaterialInitWorkerData = {
    startIndex: number;
    index: number;
};
export declare type MaterialUpdateWorkerData = {
    buffer: SharedArrayBuffer;
    workerInitList: Array<number>;
};
