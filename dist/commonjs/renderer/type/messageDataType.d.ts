import { EWorkerOperateType } from "../worker/both_file/EWorkerOperateType";
import { ContextConfigOptionsData, DirectionLightGLSLDataStructure, DisposedTextureDataMap, PointLightGLSLDataStructure } from "./dataType";
import { EBufferType } from "../enum/EBufferType";
import { GeometryInfoList, GeometryWorkerInfoList } from "../../definition/type/geometryType";
import { EGeometryWorkerDataOperateType } from "../enum/EGeometryWorkerDataOperateType";
export declare type MessageInitGLData = {
    operateType: EWorkerOperateType;
    canvas: HTMLCanvasElement;
    options: ContextConfigOptionsData;
    viewportData: ViewportData;
};
export declare type ScreenData = {
    x: number;
    y: number;
    width: number;
    height: number;
};
export declare type ViewportData = {
    x: number;
    y: number;
    width: number;
    height: number;
};
export declare type GeometryInitWorkerData = {
    buffer: SharedArrayBuffer;
    indexType: EBufferType;
    indexTypeSize: number;
    verticesInfoList: GeometryInfoList;
    normalsInfoList: GeometryInfoList;
    texCoordsInfoList: GeometryInfoList;
    indicesInfoList: GeometryInfoList;
};
export declare type GeometryUpdateWorkerData = {
    buffer: SharedArrayBuffer;
    type: EGeometryWorkerDataOperateType;
    verticesInfoList: GeometryWorkerInfoList;
    normalsInfoList: GeometryWorkerInfoList;
    texCoordsInfoList: GeometryWorkerInfoList;
    indicesInfoList: GeometryWorkerInfoList;
};
export declare type GeometryResetWorkerData = {
    buffer: SharedArrayBuffer;
    type: EGeometryWorkerDataOperateType;
    verticesInfoList: GeometryInfoList;
    normalsInfoList: GeometryInfoList;
    texCoordsInfoList: GeometryInfoList;
    indicesInfoList: GeometryInfoList;
};
export declare type LightInitWorkerData = {
    ambientLightData: {
        buffer: SharedArrayBuffer;
        bufferCount: number;
        lightCount: number;
    };
    directionLightData: {
        buffer: SharedArrayBuffer;
        bufferCount: number;
        lightCount: number;
        directionLightGLSLDataStructureMemberNameArr: Array<DirectionLightGLSLDataStructure>;
    };
    pointLightData: {
        buffer: SharedArrayBuffer;
        bufferCount: number;
        lightCount: number;
        pointLightGLSLDataStructureMemberNameArr: Array<PointLightGLSLDataStructure>;
    };
};
export declare type LightDrawWorkerData = {
    directionLightData: {
        positionArr: Array<Float32Array>;
    };
    pointLightData: {
        positionArr: Array<Float32Array>;
    };
};
export declare type TextureInitWorkerData = {
    mapManagerBuffer: SharedArrayBuffer;
    textureBuffer: SharedArrayBuffer;
    index: number;
    imageSrcIndexArr: Array<ImageSrcIndexData>;
    uniformSamplerNameMap: Array<string>;
};
export declare type ImageSrcIndexData = {
    src: string;
    index: number;
};
export declare type TextureUpdateWorkerData = {};
export declare type TextureDisposeWorkerData = {
    disposedTextureDataMap: DisposedTextureDataMap;
};
