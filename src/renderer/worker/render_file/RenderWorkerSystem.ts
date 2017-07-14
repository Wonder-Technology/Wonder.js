import { EWorkerOperateType } from "../both_file/EWorkerOperateType";
import { Log } from "../../../utils/Log";
import {
    clear, draw
} from "./draw/DrawRenderCommandBufferWorkerSystem";
import { render_config } from "../../data/render_config";
import { DrawRenderCommandBufferWorkerData } from "./draw/DrawRenderCommandBufferWorkerData";
import { ERenderWorkerState } from "../both_file/ERenderWorkerState";
import {
    initData as initGeometryWorkerData, resetPointCacheDatas, setPointCacheDatas,
    updatePointCacheDatas
} from "./geometry/GeometryWorkerSystem";
import { GeometryWorkerData } from "./geometry/GeometryWorkerData";
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
import { buildDrawDataMap } from "../../utils/draw/drawRenderCommandBufferUtils";
import { initGL } from "./initGL";
import { setState } from "./state/StateSytem";
import { StateData } from "./state/StateData";
import { disposeGeometryBuffers } from "../both_file/buffer/BufferSystem";
import { disposeBuffer as disposeArrayBuffer } from "./buffer/ArrayBufferWorkerSystem";
import { disposeBuffer as disposeIndexBuffer } from "./buffer/IndexBufferWorkerSystem";
import { initData as initProgramWorkerData } from "./shader/program/ProgramWorkerSystem";
import { initData as initLocationWorkerData } from "./shader/location/LocationWorkerSystem";
import { initData as initGLSLSenderWorkerData } from "./shader/glslSender/GLSLSenderWorkerSystem";
import { initData as initArrayBufferData } from "./buffer/ArrayBufferWorkerSystem";
import { initData as initIndexBufferData } from "./buffer/IndexBufferWorkerSystem";
import { initData as initDrawRenderCommandBufferForDrawData } from "./draw/DrawRenderCommandBufferWorkerSystem";
import { BasicMaterialWorkerData } from "./material/BasicMaterialWorkerData";
import { LightMaterialWorkerData } from "./material/LightMaterialWorkerData";
import { initState } from "../../utils/state/stateUtils";
import { getGL, setSide } from "../both_file/device/DeviceManagerWorkerSystem";
import { setCount as setAmbientLightCount } from "./light/AmbientLightWorkerSystem";
import { AmbientLightWorkerData } from "./light/AmbientLightWorkerData";
import {
    setCount as setDirectionLightCount,
    setLightGLSLDataStructureMemberNameArr, setPositionArr
} from "./light/DirectionLightWorkerSystem";
import { DirectionLightWorkerData } from "./light/DirectionLightWorkerData";
import {
    GeometryInitWorkerData, GeometryResetWorkerData,
    GeometryUpdateWorkerData, LightDrawWorkerData, LightInitWorkerData
} from "../../type/messageDataType";
import { PointLightWorkerData } from "./light/PointLightWorkerData";
import { initData as initLightData } from "./light/LightWorkerSystem";

export var onerrorHandler = (msg: string, fileName: string, lineno: number) => {
    Log.error(true, `message:${msg}\nfileName:${fileName}\nlineno:${lineno}`)
}

export var onmessageHandler = (e) => {
    var data = e.data,
        operateType = data.operateType;

    switch (operateType) {
        case EWorkerOperateType.INIT_GL:
            _initData();

            let state = initGL(data).run();

            setState(state, StateData);

            initState(state, getGL, setSide, DeviceManagerWorkerData);
            break;
        case EWorkerOperateType.INIT_MATERIAL_GEOMETRY_LIGHT:
            if(data.lightData !== null){
                _initLights(data.lightData, AmbientLightWorkerData, DirectionLightWorkerData, PointLightWorkerData);
            }

            if(data.materialData !== null) {
                _initMaterials(data.materialData, MaterialWorkerData, BasicMaterialWorkerData, LightMaterialWorkerData);
            }

            if(data.geometryData !== null) {
                _initGeometrys(data.geometryData, DataBufferConfig, GeometryWorkerData);
            }

            // self.postMessage({
            //     state: ERenderWorkerState.INIT_COMPLETE
            // });
            break;
        case EWorkerOperateType.DRAW:
            clear(null, render_config, DeviceManagerWorkerData);

            let geometryData = data.geometryData,
                disposeData = data.disposeData,
                materialData = data.materialData,
                lightData = data.lightData;

            //todo fix geometry,material,dispose?

            if (geometryData !== null) {
                if (_needUpdateGeometryWorkerData(geometryData)) {
                    updatePointCacheDatas(geometryData.verticesInfoList, geometryData.normalsInfoList, geometryData.indicesInfoList, GeometryWorkerData);
                }
                else if (_needResetGeometryWorkerData(geometryData)) {
                    resetPointCacheDatas(geometryData.verticesInfoList, geometryData.normalsInfoList, geometryData.indicesInfoList, GeometryWorkerData);
                }
            }

            if (materialData !== null) {
                initNewInitedMaterials(materialData.workerInitList);
            }

            if (disposeData !== null) {
                disposeGeometryBuffers(disposeData.disposedGeometryIndexArray, ArrayBufferWorkerData, IndexBufferWorkerData, disposeArrayBuffer, disposeIndexBuffer);
            }

            if(lightData !== null){
                _setLightDrawData(lightData, DirectionLightWorkerData);
            }

            draw(null, DataBufferConfig, buildDrawDataMap(DeviceManagerWorkerData, MaterialWorkerData, BasicMaterialWorkerData, LightMaterialWorkerData, AmbientLightWorkerData, DirectionLightWorkerData, ProgramWorkerData, LocationWorkerData, GLSLSenderWorkerData, GeometryWorkerData, ArrayBufferWorkerData, IndexBufferWorkerData, DrawRenderCommandBufferWorkerData), data.renderCommandBufferData);

            self.postMessage({
                state: ERenderWorkerState.DRAW_COMPLETE
            });
            break;
        default:
            Log.error(true, Log.info.FUNC_UNKNOW(`operateType:${operateType}`));
            break;
    }
};

var _initData = () => {
    initProgramWorkerData(ProgramWorkerData);

    initLocationWorkerData(LocationWorkerData);

    initGLSLSenderWorkerData(GLSLSenderWorkerData);

    initArrayBufferData(ArrayBufferWorkerData);

    initIndexBufferData(IndexBufferWorkerData);

    initDrawRenderCommandBufferForDrawData(DrawRenderCommandBufferWorkerData);
}

var _needUpdateGeometryWorkerData = (geometryData: GeometryUpdateWorkerData) => {
    return geometryData.type === EGeometryWorkerDataOperateType.ADD;
}

var _needResetGeometryWorkerData = (geometryData: GeometryResetWorkerData) => {
    return geometryData.type === EGeometryWorkerDataOperateType.RESET;
}

var _initMaterials = (materialData: MaterialInitWorkerData, MaterialWorkerData: any, BasicMaterialWorkerData: any, LightMaterialWorkerData: any) => {
    initMaterialWorkerData(materialData, MaterialWorkerData, BasicMaterialWorkerData, LightMaterialWorkerData);

    initMaterials(materialData.basicMaterialData, materialData.lightMaterialData);
}

var _initGeometrys = (geometryData: GeometryInitWorkerData, DataBufferConfig: any, GeometryWorkerData: any) => {
    initGeometryWorkerData(geometryData.buffer, geometryData.indexType, geometryData.indexTypeSize, DataBufferConfig, GeometryWorkerData);

    setPointCacheDatas(geometryData.verticesInfoList, geometryData.normalsInfoList, geometryData.indicesInfoList, GeometryWorkerData);
}

var _initLights = (lightData:LightInitWorkerData, AmbientLightWorkerData:any, DirectionLightWorkerData:any, PointLightWorkerData:any) => {
    initLightData(lightData, AmbientLightWorkerData, DirectionLightWorkerData, PointLightWorkerData);
}

var _setLightDrawData = (lightData:LightDrawWorkerData, DirectionLightWorkerData:any) => {
    var directionLightData = lightData.directionLightData;

    setPositionArr(directionLightData.positionArr, DirectionLightWorkerData);
}
