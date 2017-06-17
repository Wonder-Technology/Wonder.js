import { EWorkerOperateType } from "../both_file/EWorkerOperateType";
import { Log } from "../../../utils/Log";
import { ensureFunc, it } from "../../definition/typescript/decorator/contract";
import { DomQuery } from "wonder-commonlib/dist/es2015/utils/DomQuery";
import { getGL, setGL, setPixelRatioAndCanvas, setScreen, setViewportOfGL } from "../both_file/device/DeviceManagerWorkerSystem";
import { chain, compose, map } from "../../../utils/functionalUtils";
import curry from "wonder-lodash/curry";
import { detect } from "../../device/GPUDetectorSystem";
import { IO } from "wonder-fantasy-land/dist/es2015/types/IO";
import {
    clear, draw
} from "./draw/DrawRenderCommandWorkerSystem";
import { render_config } from "../../data/render_config";
import { DrawRenderCommandWorkerData } from "./draw/DrawRenderCommandWorkerData";
import { ERenderWorkerState } from "../both_file/ERenderWorkerState";
import {
    initData as initGeometryWorkerData, resetPointCacheDatas, setPointCacheDatas,
    updatePointCacheDatas
} from "./geometry/GeometryWorkerSystem";
import { GeometryWorkerData } from "./geometry/GeometryWorkerData";
import {
    GeometryInitWorkerData, GeometryResetWorkerData,
    GeometryUpdateWorkerData
} from "../../../definition/type/geometryType";
import { DataBufferConfig } from "../../../config/DataBufferConfig";
import { EGeometryWorkerDataOperateType } from "../../enum/EGeometryWorkerDataOperateType";
import {
    initData as initMaterialWorkerData, initMaterials,
    initNewInitedMaterials
} from "./material/MaterialWorkerSystem";
import { MaterialInitWorkerData, MaterialWorkerData } from "./material/MaterialWorkerData";
import { DeviceManagerWorkerData } from "../both_file/device/DeviceManagerWorkerData";
import { ProgramWorkerData } from "./shader/program/ProgramWorkerData";
import { LocationWorkerData } from "./shader/location/LocationWorkerData";
import { GLSLSenderWorkerData } from "./shader/glslSender/GLSLSenderWorkerData";
import { IndexBufferWorkerData } from "./buffer/IndexBufferWorkerData";
import { ArrayBufferWorkerData } from "./buffer/ArrayBufferWorkerData";
import { ContextConfigOptionsData } from "../../type/dataType";
import { buildDrawDataMap } from "../../utils/draw/drawRenderCommandUtils";
import { createState } from "../../../utils/stateUtils";
import { initGL } from "./initGL";
import { setState } from "./state/StateSytem";
import { StateData } from "./state/StateData";
import { disposeBuffer as disposeArrayBuffer } from "./buffer/ArrayBufferWorkerSystem";
import { disposeBuffer as disposeIndexBuffer } from "./buffer/IndexBufferWorkerSystem";

export var onerrorHandler = (msg: string, fileName: string, lineno: number) => {
    // error(true, msg,fileName,lineno);

    //todo refactor
    console.error(`message:${msg}\nfileName:${fileName}\nlineno:${lineno}`);
}

export var onmessageHandler = (e) => {
    var data = e.data,
        operateType = data.operateType;

    switch (operateType) {
        case EWorkerOperateType.INIT_GL:
            setState(initGL(data).run(), StateData);
            break;
        case EWorkerOperateType.INIT_MATERIAL_GEOMETRY:
            if(data.materialData !== null){
                _initMaterials(data.materialData, DataBufferConfig, MaterialWorkerData);
            }

            if(data.geometryData !== null) {
                _initGeometrys(data.geometryData, DataBufferConfig, GeometryWorkerData);
            }

            self.postMessage({
                state: ERenderWorkerState.INIT_COMPLETE
            });
            break;
        case EWorkerOperateType.DRAW:
            clear(null, render_config, DeviceManagerWorkerData);

            let geometryData = data.geometryData,
                disposeData = data.disposeData,
                materialData = data.materialData;

            if (geometryData !== null) {
                if (_needUpdateGeometryWorkerData(geometryData)) {
                    updatePointCacheDatas(geometryData.verticesInfoList, geometryData.indicesInfoList, GeometryWorkerData);
                }
                else if (_needResetGeometryWorkerData(geometryData)) {
                    resetPointCacheDatas(geometryData.verticesInfoList, geometryData.indicesInfoList, GeometryWorkerData);
                }
            }

            if (materialData !== null) {
                initNewInitedMaterials(materialData.workerInitList);
            }

            if(disposeData !== null){
                _disposeBuffers(disposeData.disposedGeometryIndexArray, ArrayBufferWorkerData, IndexBufferWorkerData);
            }

            draw(null, DataBufferConfig, buildDrawDataMap(DeviceManagerWorkerData, MaterialWorkerData, ProgramWorkerData, LocationWorkerData, GLSLSenderWorkerData, GeometryWorkerData, ArrayBufferWorkerData, IndexBufferWorkerData, DrawRenderCommandWorkerData), data.renderCommandBufferData);
            break;
        default:
            Log.error(true, Log.info.FUNC_UNKOWN(`operateType:${operateType}`));
            break;
    }
};

var _needUpdateGeometryWorkerData = (geometryData: GeometryUpdateWorkerData) => {
    return geometryData.type === EGeometryWorkerDataOperateType.ADD;
}

var _needResetGeometryWorkerData = (geometryData: GeometryResetWorkerData) => {
    return geometryData.type === EGeometryWorkerDataOperateType.RESET;
}

//todo refactor
var _disposeBuffers = (disposedIndexArray: Array<number>, ArrayBufferWorkerData: any, IndexBufferWorkerData: any) => {
    for (let index of disposedIndexArray) {
        disposeArrayBuffer(index, ArrayBufferWorkerData);
        disposeIndexBuffer(index, IndexBufferWorkerData);
    }
}

var _initMaterials = (materialData: MaterialInitWorkerData, DataBufferConfig: any, MaterialWorkerData: any) => {
    initMaterialWorkerData(materialData, DataBufferConfig, MaterialWorkerData);

    initMaterials(materialData.materialCount);
}

var _initGeometrys = (geometryData: GeometryInitWorkerData, DataBufferConfig: any, GeometryWorkerData: any) => {
    initGeometryWorkerData(geometryData.buffer, geometryData.indexType, geometryData.indexTypeSize, DataBufferConfig, GeometryWorkerData);

    setPointCacheDatas(geometryData.verticesInfoList, geometryData.indicesInfoList, GeometryWorkerData);
}

