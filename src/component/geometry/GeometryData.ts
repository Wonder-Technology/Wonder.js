import { EDrawMode } from "../../renderer/enum/EDrawMode";
import { EBufferType } from "../../renderer/enum/EBufferType";
import { ComponentGameObjectMap } from "../ComponentData";
import { ComponentMap } from "../ComponentSystem";
import {
    GeometryIndicesCacheMap, GeometryInfoList, GeometryNormalsCacheMap, GeometryVerticesCacheMap,
    GeometryWorkerInfoList
} from "../../definition/type/geometryType";

export class GeometryData {
    public static index: number = null;
    public static count: number = null;

    public static disposeCount: number = null;

    public static maxDisposeIndex: number = null;
    public static isReallocate: boolean = null;

    public static buffer: SharedArrayBuffer = null;

    public static verticesOffset: number = null;
    public static normalsOffset: number = null;
    public static texCoordsOffset: number = null;
    public static indicesOffset: number = null;

    public static verticesInfoList: GeometryInfoList = null;
    public static normalsInfoList: GeometryInfoList = null;
    public static texCoordsInfoList: GeometryInfoList = null;
    public static indicesInfoList: GeometryInfoList = null;

    public static isInit: boolean = null;

    public static verticesWorkerInfoList: GeometryWorkerInfoList = null;
    public static normalsWorkerInfoList: GeometryWorkerInfoList = null;
    public static texCoordsWorkerInfoList: GeometryWorkerInfoList = null;
    public static indicesWorkerInfoList: GeometryWorkerInfoList = null;

    public static disposedGeometryIndexArray: Array<number> = null;

    public static vertices: Float32Array = null;
    public static normals: Float32Array = null;
    public static texCoords: Float32Array = null;
    public static indices: Uint16Array | Uint32Array = null;

    public static verticesCacheMap: GeometryVerticesCacheMap = null;
    public static normalsCacheMap: GeometryNormalsCacheMap = null;
    public static texCoordsCacheMap: GeometryNormalsCacheMap = null;
    public static indicesCacheMap: GeometryIndicesCacheMap = null;

    public static indexType: EBufferType = null;
    public static indexTypeSize: number = null;

    public static configDataMap: object = null;

    public static computeDataFuncMap: GeometryComputeDataFuncMap = null;

    public static gameObjectMap: ComponentGameObjectMap = null;

    public static geometryMap: ComponentMap = null;
}

export type GeometryComputeDataFuncMap = {
    [index: number]: (index: number, GeometryData: any) => GeometryComputeData
}

export type GeometryComputeData = {
    vertices: Float32Array;
    normals: Float32Array;
    texCoords: Float32Array;
    indices: Uint16Array | Uint32Array;
}
