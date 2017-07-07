import { EBufferType } from "../../renderer/enum/EBufferType";
import { EGeometryWorkerDataOperateType } from "../../renderer/enum/EGeometryWorkerDataOperateType";

export type GeometryWorkerInfoList = Array<{
    index: number;
    startIndex: number;
    endIndex: number;
}>

export type GeometryVerticesCacheMap = {
    [index: number]: Float32Array
}

export type GeometryNormalsCacheMap = {
    [index: number]: Float32Array
}

export type GeometryIndicesCacheMap = {
    [index: number]: Uint16Array | Uint32Array
}

export type GeometryInitWorkerData = {
    buffer: SharedArrayBuffer;
    indexType: EBufferType;
    indexTypeSize: number;
    verticesInfoList: GeometryInfoList;
    indicesInfoList: GeometryInfoList;
}

export type GeometryUpdateWorkerData = {
    buffer: SharedArrayBuffer;
    type: EGeometryWorkerDataOperateType;
    verticesInfoList: GeometryWorkerInfoList;
    indicesInfoList: GeometryWorkerInfoList;
}

export type GeometryResetWorkerData = {
    buffer: SharedArrayBuffer;
    type: EGeometryWorkerDataOperateType;
    verticesInfoList: GeometryInfoList;
    indicesInfoList: GeometryInfoList;
}

export type GeometryInfoList = Array<GeometryInfo>

export type GeometryInfo = {
    startIndex: number;
    endIndex: number;
};

export type GetArrayBufferDataFuncMap = {
    getVertices:Function;
    getNormals:Function;
}
