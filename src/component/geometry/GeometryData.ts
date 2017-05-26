import { EDrawMode } from "../../renderer/enum/EDrawMode";
import { EBufferType } from "../../renderer/enum/EBufferType";
import { ComponentGameObjectMap } from "../ComponentData";

export class GeometryData{
    public static index:number = null;
    public static count:number = null;

    public static verticesMap:GeometryVerticesMap = null;
    public static indicesMap:GeometryIndicesMap = null;

    public static indexType:EBufferType = null;
    public static indexTypeSize:number = null;

    public static configDataMap:object = null;

    public static computeDataFuncMap:GeometryComputeDataFuncMap = null;

    public static gameObjectMap:ComponentGameObjectMap = null;
}

export type GeometryVerticesMap = Array<Float32Array>

export type GeometryIndicesMap = Array<Uint16Array> | Array<Uint32Array>

export type GeometryComputeDataFuncMap = {
    [index:number]: (index:number, GeometryData:any) => GeometryComputeData
}

export type GeometryComputeData = {
    vertices: Array<number>;
    indices: Array<number>;
}
