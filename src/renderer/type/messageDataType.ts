import { EWorkerOperateType } from "../worker/both_file/EWorkerOperateType";
import { ContextConfigOptionsData, DirectionLightGLSLDataStructure, PointLightGLSLDataStructure } from "./dataType";
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
    indicesInfoList: GeometryInfoList;
}

export type GeometryUpdateWorkerData = {
    buffer: SharedArrayBuffer;
    type: EGeometryWorkerDataOperateType;
    verticesInfoList: GeometryWorkerInfoList;
    normalsInfoList: GeometryWorkerInfoList;
    indicesInfoList: GeometryWorkerInfoList;
}

export type GeometryResetWorkerData = {
    buffer: SharedArrayBuffer;
    type: EGeometryWorkerDataOperateType;
    verticesInfoList: GeometryInfoList;
    normalsInfoList: GeometryInfoList;
    indicesInfoList: GeometryInfoList;
}

export type LightInitWorkerData = {
    ambientLightData: {
        buffer: SharedArrayBuffer;
        bufferCount:number;
        lightCount:number;
    };
    directionLightData:{
        buffer: SharedArrayBuffer;
        bufferCount:number;
        lightCount:number;
        directionLightGLSLDataStructureMemberNameArr:Array<DirectionLightGLSLDataStructure>;
    };
    pointLightData:{
        buffer: SharedArrayBuffer;
        bufferCount:number;
        lightCount:number;
        pointLightGLSLDataStructureMemberNameArr:Array<PointLightGLSLDataStructure>;
    }
}

export type LightDrawWorkerData = {
    directionLightData:{
        positionArr:Array<Float32Array>;
    };
    pointLightData:{
        positionArr:Array<Float32Array>;
    };
}
