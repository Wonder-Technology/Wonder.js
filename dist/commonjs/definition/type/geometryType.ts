import { EBufferType } from "../../renderer/enum/EBufferType";
import { EGeometryWorkerDataOperateType } from "../../renderer/enum/EGeometryWorkerDataOperateType";

export type GeometryWorkerInfoList = Array<{
    index: number;
    startIndex: number;
    endIndex: number;
}>

export type GeometryVertexCacheMap = {
    [index: number]: Float32Array
}

export type GeometryNormalsCacheMap = {
    [index: number]: Float32Array
}

export type GeometryIndicesCacheMap = {
    [index: number]: Uint16Array | Uint32Array
}

export type GeometryInfoList = Array<GeometryInfo>

export type GeometryInfo = {
    startIndex: number;
    endIndex: number;
};

export type GetArrayBufferDataFuncMap = {
    getVertices: Function;
    getNormals: Function;
    getTexCoords: Function;
}
