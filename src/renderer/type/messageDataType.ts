import { EWorkerOperateType } from "../worker/both_file/EWorkerOperateType";
import { ContextConfigOptionsData, DirectionLightGLSLDataStructure } from "./dataType";
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
        count:number;
    };
    directionLightData:{
        buffer: SharedArrayBuffer;
        count:number;
        directionLightGLSLDataStructureMemberNameArr:Array<DirectionLightGLSLDataStructure>;
    };
    pointLightData:{
        buffer: SharedArrayBuffer;
        count:number;
    }
}

export type LightDrawWorkerData = {
    directionLightData:{
        positionArr:Array<Vector3>;
    };
}
