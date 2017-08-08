import { EWorkerOperateType } from "../worker/both_file/EWorkerOperateType";
import {
    ContextConfigOptionsData, DisposedTextureDataMap,
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

export type TextureInitWorkerData = {
    mapManagerBuffer: SharedArrayBuffer;
    textureBuffer: SharedArrayBuffer;
    index: number;
    imageSrcIndexArr: Array<ImageSrcIndexData>;
    uniformSamplerNameMap: Array<string>;
}

export type ImageSrcIndexData = {
    src: string;
    index: number;
}

export type TextureUpdateWorkerData = {
}

export type TextureDisposeWorkerData = {
    disposedTextureDataMap: DisposedTextureDataMap;
}
