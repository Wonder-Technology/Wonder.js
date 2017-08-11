// import { MaterialClassNameTable, ShaderIndexTable } from "../../../../definition/type/materialType";

export class MaterialWorkerData {
    public static shaderIndices: Uint32Array = null;

    public static colors: Float32Array = null;
    public static opacities: Float32Array = null;
    public static alphaTests: Float32Array = null;
}

export type MaterialInitWorkerData = {
    buffer: SharedArrayBuffer;
    basicMaterialData: BasicMaterialInitWorkerData;
    lightMaterialData: LightMaterialInitWorkerData;
}

export type BasicMaterialInitWorkerData = {
    startIndex: number;
    index: number;
}

export type LightMaterialInitWorkerData = {
    startIndex: number;
    index: number;
}

export type MaterialUpdateWorkerData = {
    buffer: SharedArrayBuffer;
    workerInitList: Array<number>;
}
