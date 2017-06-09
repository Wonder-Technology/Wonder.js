import { MaterialClassNameTable, ShaderIndexTable } from "../../../definition/type/materialType";

export class MaterialWorkerData{
    public static shaderIndices: Uint32Array = null;

    public static materialClassNameTable: MaterialClassNameTable = null;
    public static shaderIndexTable: ShaderIndexTable = null;
}

export type MaterialInitWorkerData = {
    buffer: SharedArrayBuffer;
    materialCount:number;
    materialClassNameTable:MaterialClassNameTable;
    shaderIndexTable:ShaderIndexTable;
}

export type MaterialUpdateWorkerData = {
    buffer: SharedArrayBuffer;
    workerInitList:Array<number>;
}
