import { EWorkerOperateType } from "../worker/both_file/EWorkerOperateType";
import { ContextConfigOptionsData } from "./dataType";
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

export type LightDrawWorkerData = {
    ambientLightData: {
        count:number;
    };
    directionLightData:{
        count:number;
        positionArr:Array<Vector3>;
    }
}
