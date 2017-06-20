import { MaterialClassNameTable, ShaderIndexTable } from "../../../../definition/type/materialType";
export declare class MaterialWorkerData {
    static shaderIndices: Uint32Array;
    static materialClassNameTable: MaterialClassNameTable;
    static shaderIndexTable: ShaderIndexTable;
    static colors: Float32Array;
    static opacities: Float32Array;
    static alphaTests: Float32Array;
}
export declare type MaterialInitWorkerData = {
    buffer: SharedArrayBuffer;
    materialCount: number;
    materialClassNameTable: MaterialClassNameTable;
    shaderIndexTable: ShaderIndexTable;
};
export declare type MaterialUpdateWorkerData = {
    buffer: SharedArrayBuffer;
    workerInitList: Array<number>;
};
