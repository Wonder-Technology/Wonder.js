// import { BoxGeometry } from "./BoxGeometry";

export class BoxGeometryData{
    //todo add normals,texCoords ...

    public static vertices:Float32Array = null;
    //todo can specify whether to use 16 or 32 in render config file
    public static indices:Uint16Array | Uint32Array = null;

    // public static verticesBuffer: ArrayBuffer = null;
    // public static indicesBuffer: ArrayBuffer = null;
    public static buffer: ArrayBuffer = null;

    public static index:number = null;
    public static count:number = null;

    public static configDataMap:BoxGeometryConfigDataMap = null;

    // public static geometryMap:BoxGeometryMap = null;
    public static verticesIndexMap:BoxGeometryVerticesIndexMap = null;
    public static indicesIndexMap:BoxGeometryIndicesIndexMap = null;
}

// export type BoxGeometryMap = {
//     [index:number]: BoxGeometry
// }
//
// export type BoxGeometryMap = {
//     [index:number]: BoxGeometry
// }

export type BoxGeometryVerticesIndexMap = {
    [index:number]: number
}

export type BoxGeometryIndicesIndexMap = {
    [index:number]: number
}

export type BoxGeometryConfigDataMap = {
    [index:number]: BoxGeometryConfigData
}

export type BoxGeometryConfigData = {
    width:number;
    height:number;
    depth:number;
    widthSegments:number;
    heightSegments:number;
    depthSegments:number;
}