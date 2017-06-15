import { EWorkerOperateType } from "../both_file/EWorkerOperateType";
import { error, info } from "../../../utils/Log";
// import { ensureFunc, it } from "../../definition/typescript/decorator/contract";
// import { expect } from "wonder-expect.js";
import { DomQuery } from "wonder-commonlib/dist/es2015/utils/DomQuery";
import { getGL, setGL, setPixelRatioAndCanvas, setScreen, setViewportOfGL } from "../both_file/device/DeviceManagerWorkerSystem";
import { chain, compose, map } from "../../../utils/functionalUtils";
import curry from "wonder-lodash/curry";
import { detect } from "../../device/GPUDetectorSystem";
import { IO } from "wonder-fantasy-land/dist/es2015/types/IO";
import { material_config } from "../../data/material_config";
import { shaderLib_generator } from "../../data/shaderLib_generator";
import {
    clear, draw,
    initData as initDrawRenderCommandWorkerData
} from "./draw/DrawRenderCommandWorkerSystem";
import { render_config } from "../../data/render_config";
import { initData as initProgramWorkerData } from "./shader/program/ProgramWorkerSystem";
import { initData as initLocationWorkerData } from "./shader/location/LocationWorkerSystem";
import { initData as initGLSLSenderWorkerData } from "./shader/glslSender/GLSLSenderWorkerSystem";
import { initData as initArrayBufferData } from "./buffer/ArrayBufferWorkerSystem";
import { initData as initIndexBufferData } from "./buffer/IndexBufferWorkerSystem";
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

onerror = (msg: string, fileName: string, lineno: number) => {
    // error(true, msg,fileName,lineno);

    //todo refactor
    console.error(`message:${msg}\nfileName:${fileName}\nlineno:${lineno}`);
}

onmessage = (e) => {
    var data = e.data,
        operateType = data.operateType;

    switch (operateType) {
        case EWorkerOperateType.INIT_GL:
            //todo setPixelRatioAndCanvas;setScreen
            // chain(setPixelRatioAndCanvas(configState.get("useDevicePixelRatio"))),
            // chain(setScreen(DeviceManagerWorkerData)),
            compose(
                map(detect(getGL, DeviceManagerWorkerData)),
                // chain(setPixelRatioAndCanvas(configState.get("useDevicePixelRatio"))),
                // chain(setPixelRatioAndCanvas(false)),
                // chain(setScreen(DeviceManagerWorkerData)),
                _createGL
            )(data.canvas, data.options, DeviceManagerWorkerData).run()




            var canvas = data.canvas;

            var state = createState();

            //todo refactor
            setViewportOfGL(0, 0, canvas.width, canvas.height, DeviceManagerWorkerData, state).run();
            break;
        case EWorkerOperateType.INIT_MATERIAL_GEOMETRY:
            // initMaterial(null, data.materialCount);

            // initMaterialWorkerData(geometryData.buffer, geometryData.indexType, geometryData.indexTypeSize, DataBufferConfig, GeometryWorkerData);
            _initMaterials(data.materialData, DataBufferConfig, MaterialWorkerData);

            _initGeometrys(data.geometryData, DataBufferConfig, GeometryWorkerData);

            self.postMessage({
                state: ERenderWorkerState.INIT_COMPLETE
            });
            break;
        case EWorkerOperateType.DRAW:
            clear(null, render_config, DeviceManagerWorkerData);

            let geometryData = data.geometryData,
                materialData = data.materialData;

            //todo unit test
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

            draw(null, DataBufferConfig, buildDrawDataMap(DeviceManagerWorkerData, MaterialWorkerData, ProgramWorkerData, LocationWorkerData, GLSLSenderWorkerData, GeometryWorkerData, ArrayBufferWorkerData, IndexBufferWorkerData, DrawRenderCommandWorkerData), data.renderCommandBufferData);
            break;
        default:
            error(true, info.FUNC_UNKOWN(`operateType:${operateType}`));
            break;
    }
};

var _needUpdateGeometryWorkerData = (geometryData: GeometryUpdateWorkerData) => {
    return geometryData.type === EGeometryWorkerDataOperateType.ADD;
}

var _needResetGeometryWorkerData = (geometryData: GeometryResetWorkerData) => {
    return geometryData.type === EGeometryWorkerDataOperateType.RESET;
}

var _initMaterials = (materialData: MaterialInitWorkerData, DataBufferConfig: any, MaterialWorkerData: any) => {
    initMaterialWorkerData(materialData, DataBufferConfig, MaterialWorkerData);

    initMaterials(materialData.materialCount);
}

var _initGeometrys = (geometryData: GeometryInitWorkerData, DataBufferConfig: any, GeometryWorkerData: any) => {
    initGeometryWorkerData(geometryData.buffer, geometryData.indexType, geometryData.indexTypeSize, DataBufferConfig, GeometryWorkerData);

    setPointCacheDatas(geometryData.verticesInfoList, geometryData.indicesInfoList, GeometryWorkerData);
}

var _createGL = curry((canvas: HTMLCanvasElement, options: ContextConfigOptionsData, DeviceManagerWorkerData: any) => {
    return IO.of(() => {
        var gl = _getContext(canvas, options);

        if (!gl) {
            DomQuery.create("<p class='not-support-webgl'></p>").prependTo("body").text("Your device doesn't support WebGL");
        }

        //todo setCanvas; setContextConfig
        //     return compose(setCanvas(dom), setContextConfig(contextConfig), setGL(gl, DeviceManagerWorkerData))(state);
        return compose(
            setGL(gl, DeviceManagerWorkerData)
        )(null);
    });
})

var _getContext = (canvas: HTMLCanvasElement, options: ContextConfigOptionsData): WebGLRenderingContext => {
    return (canvas.getContext("webgl", options) || canvas.getContext("experimental-webgl", options)) as WebGLRenderingContext;
}

//todo do when init to accelerate
initProgramWorkerData(ProgramWorkerData);

initLocationWorkerData(LocationWorkerData);

initGLSLSenderWorkerData(GLSLSenderWorkerData);

initArrayBufferData(ArrayBufferWorkerData);

initIndexBufferData(IndexBufferWorkerData);

initDrawRenderCommandWorkerData(DrawRenderCommandWorkerData);
