import { EWorkerOperateType } from "../worker/both_file/EWorkerOperateType";
import { ContextConfigOptionsData, DisposedTextureDataMap, MaterialTextureList } from "./dataType";
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
export declare type LightDrawWorkerData = {
    directionLightData: {
        positionArr: Array<Float32Array>;
    };
    pointLightData: {
        positionArr: Array<Float32Array>;
    };
};
export declare type TextureDrawWorkerData = {
    index: number;
    needAddedImageDataArr: Array<ImageArrayBufferIndexSizeData>;
    uniformSamplerNameMap: Array<string>;
    materialTextureList: MaterialTextureList;
};
export declare type TextureInitWorkerData = {
    mapManagerBuffer: SharedArrayBuffer;
    textureBuffer: SharedArrayBuffer;
    index: number;
    needAddedImageDataArr: Array<ImageArrayBufferIndexSizeData>;
    uniformSamplerNameMap: Array<string>;
};
export declare type ImageArrayBufferIndexSizeData = {
    arrayBuffer: ArrayBuffer;
    width: number;
    height: number;
    index: number;
};
export declare type TextureDisposeWorkerData = {
    disposedTextureDataMap: DisposedTextureDataMap;
};
