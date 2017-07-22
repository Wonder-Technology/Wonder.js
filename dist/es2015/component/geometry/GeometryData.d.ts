import { EBufferType } from "../../renderer/enum/EBufferType";
import { ComponentGameObjectMap } from "../ComponentData";
import { ComponentMap } from "../ComponentSystem";
import { GeometryIndicesCacheMap, GeometryInfoList, GeometryNormalsCacheMap, GeometryVertexCacheMap, GeometryWorkerInfoList } from "../../definition/type/geometryType";
export declare class GeometryData {
    static index: number;
    static count: number;
    static disposeCount: number;
    static maxDisposeIndex: number;
    static isReallocate: boolean;
    static buffer: SharedArrayBuffer;
    static verticesOffset: number;
    static normalsOffset: number;
    static texCoordsOffset: number;
    static indicesOffset: number;
    static verticesInfoList: GeometryInfoList;
    static normalsInfoList: GeometryInfoList;
    static texCoordsInfoList: GeometryInfoList;
    static indicesInfoList: GeometryInfoList;
    static isInit: boolean;
    static verticesWorkerInfoList: GeometryWorkerInfoList;
    static normalsWorkerInfoList: GeometryWorkerInfoList;
    static texCoordsWorkerInfoList: GeometryWorkerInfoList;
    static indicesWorkerInfoList: GeometryWorkerInfoList;
    static disposedGeometryIndexArray: Array<number>;
    static vertices: Float32Array;
    static normals: Float32Array;
    static texCoords: Float32Array;
    static indices: Uint16Array | Uint32Array;
    static verticesCacheMap: GeometryVertexCacheMap;
    static normalsCacheMap: GeometryNormalsCacheMap;
    static texCoordsCacheMap: GeometryNormalsCacheMap;
    static indicesCacheMap: GeometryIndicesCacheMap;
    static indexType: EBufferType;
    static indexTypeSize: number;
    static configDataMap: object;
    static computeDataFuncMap: GeometryComputeDataFuncMap;
    static gameObjectMap: ComponentGameObjectMap;
    static geometryMap: ComponentMap;
}
export declare type GeometryComputeDataFuncMap = {
    [index: number]: (index: number, GeometryData: any) => GeometryComputeData;
};
export declare type GeometryComputeData = {
    vertices: Float32Array;
    normals: Float32Array;
    texCoords: Float32Array;
    indices: Uint16Array | Uint32Array;
};
