import { EDrawMode } from "../../renderer/enum/EDrawMode";
import { EBufferType } from "../../renderer/enum/EBufferType";
import { ComponentGameObjectMap } from "../ComponentData";

export class GeometryData{
    public static index:number = null;
    public static count:number = null;

    public static verticesMap:GeometryVerticesMap = null;
    public static indicesMap:GeometryIndicesMap = null;
    // public static vertices:Float32Array = null;
    //todo can specify whether to use 16 or 32 in render config file
    // public static indices:Uint16Array | Uint32Array = null;

    public static indexType:EBufferType = null;
    public static indexTypeSize:number = null;

    // public static verticesBuffer: ArrayBuffer = null;
    // public static indicesBuffer: ArrayBuffer = null;
    // public static buffer: ArrayBuffer = null;

    // public static verticesIndexMap:GeometryVerticesIndexMap = null;
    // public static verticesCountMap:object = null;

    // public static indicesIndexMap:GeometryIndicesIndexMap = null;
    // public static indicesCountMap:object = null;

    public static configDataMap:object = null;

    public static computeDataFuncMap:GeometryComputeDataFuncMap = null;

    public static gameObjectMap:ComponentGameObjectMap = null;

    public static drawModeMap:DrawModeMap = null;
}

export type GeometryVerticesMap = Array<Float32Array>

export type GeometryIndicesMap = Array<Uint16Array> | Array<Uint32Array>

// export type GeometryVerticesIndexMap = {
//     [index:number]: number
// }
//
// export type GeometryIndicesIndexMap = {
//     [index:number]: number
// }

export type GeometryComputeDataFuncMap = {
    [index:number]: (index:number, GeometryData:any) => GeometryComputeData
}

export type GeometryComputeData = {
    vertices: Array<number>;
    indices: Array<number>;
}

export type DrawModeMap = {
    [index:number]: EDrawMode
}
