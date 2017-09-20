import { EWorkerOperateType } from "../worker/both_file/EWorkerOperateType";
import {
    ContextConfigOptionsData, DisposedTextureDataMap, MaterialTextureList,
} from "./dataType";
import { Vector3 } from "../../math/Vector3";
import { EBufferType } from "../enum/EBufferType";
import { GeometryInfoList, GeometryWorkerInfoList } from "../../definition/type/geometryType";
import { EGeometryWorkerDataOperateType } from "../enum/EGeometryWorkerDataOperateType";

export type MessageInitGLData = {
    operateType: EWorkerOperateType;
    canvas: HTMLCanvasElement;
    options: ContextConfigOptionsData;
    viewportData: ViewportData;
}

export type ScreenData = {
    x: number;
    y: number;
    width: number;
    height: number;
}

export type ViewportData = {
    x: number;
    y: number;
    width: number;
    height: number;
}

export type GeometryInitWorkerData = {
    buffer: SharedArrayBuffer;
    indexType: EBufferType;
    indexTypeSize: number;
    verticesInfoList: GeometryInfoList;
    normalsInfoList: GeometryInfoList;
    texCoordsInfoList: GeometryInfoList;
    indicesInfoList: GeometryInfoList;
}

export type GeometryUpdateWorkerData = {
    buffer: SharedArrayBuffer;
    type: EGeometryWorkerDataOperateType;
    verticesInfoList: GeometryWorkerInfoList;
    normalsInfoList: GeometryWorkerInfoList;
    texCoordsInfoList: GeometryWorkerInfoList;
    indicesInfoList: GeometryWorkerInfoList;
}

export type GeometryResetWorkerData = {
    buffer: SharedArrayBuffer;
    type: EGeometryWorkerDataOperateType;
    verticesInfoList: GeometryInfoList;
    normalsInfoList: GeometryInfoList;
    texCoordsInfoList: GeometryInfoList;
    indicesInfoList: GeometryInfoList;
}

export type LightDrawWorkerData = {
    directionLightData: {
        positionArr: Array<Float32Array>;
    };
    pointLightData: {
        positionArr: Array<Float32Array>;
    };
}

export type TextureDrawWorkerData = {
    index: number;
    needAddedImageDataArr: Array<ImageArrayBufferIndexSizeData>;
    uniformSamplerNameMap: Array<string>;
    materialTextureList: MaterialTextureList;
}

export type TextureInitWorkerData = {
    mapManagerBuffer: SharedArrayBuffer;
    textureBuffer: SharedArrayBuffer;
    index: number;
    needAddedImageDataArr: Array<ImageArrayBufferIndexSizeData>;
    uniformSamplerNameMap: Array<string>;
}

export type ImageArrayBufferIndexSizeData = {
    arrayBuffer: ArrayBuffer;
    width: number;
    height: number;
    index: number;
}

export type TextureDisposeWorkerData = {
    disposedTextureDataMap: DisposedTextureDataMap;
}
