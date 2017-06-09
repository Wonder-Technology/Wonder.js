import { EWorkerOperateType } from "./EWorkerOperateType";
import { error, info } from "../../utils/Log";
// import { ensureFunc, it } from "../../definition/typescript/decorator/contract";
// import { expect } from "wonder-expect.js";
import { DomQuery } from "wonder-commonlib/dist/es2015/utils/DomQuery";
import { setGL, setPixelRatioAndCanvas, setScreen, setViewportOfGL } from "../../device/DeviceManagerSystem";
import { chain, compose, map } from "../../utils/functionalUtils";
import { DeviceManagerData } from "../../device/DeviceManagerData";
import curry from "wonder-lodash/curry";
import { detect } from "../../device/GPUDetectorSystem";
import { IO } from "wonder-fantasy-land/dist/es2015/types/IO";
import { material_config } from "../data/material_config";
import { shaderLib_generator } from "../data/shaderLib_generator";
import { ShaderData } from "../shader/ShaderData";
import { MaterialData, ShaderMap } from "../../component/material/MaterialData";
import { clear, draw, initData as initDrawRenderCommandWorkerData } from "../draw/DrawRenderCommandWorkerSystem";
import { ArrayBufferData } from "../buffer/ArrayBufferData";
import { IndexBufferData } from "../buffer/IndexBufferData";
import { render_config } from "../data/render_config";
import { LocationData } from "../shader/location/LocationData";
import { ProgramData } from "../shader/program/ProgramData";
import { GLSLSenderData } from "../shader/glslSender/GLSLSenderData";
import { initData as initProgramData } from "../shader/program/ProgramSystem";
import { initData as initLocationData } from "../shader/location/LocationSystem";
import { initData as initGLSLSenderData } from "../shader/glslSender/GLSLSenderSystem";
import { initData as initArrayBufferData } from "../buffer/ArrayBufferSystem";
import { initData as initIndexBufferData } from "../buffer/IndexBufferSystem";
import { DrawRenderCommandWorkerData } from "../draw/DrawRenderCommandWorkerData";
import { ERenderWorkerState } from "./ERenderWorkerState";
import {
    initData as initGeometryWorkerData, resetPointCacheDatas, setPointCacheDatas,
    updatePointCacheDatas
} from "./geometry/GeometryWorkerSystem";
import { GeometryWorkerData } from "./geometry/GeometryWorkerData";
import {
    GeometryInitWorkerData, GeometryResetWorkerData,
    GeometryUpdateWorkerData
} from "../../definition/type/geometryType";
import { DataBufferConfig } from "../../config/DataBufferConfig";
import { EGeometryWorkerDataOperateType } from "../enum/EGeometryWorkerDataOperateType";
import {
    initData as initMaterialWorkerData, initMaterials,
    initNewInitedMaterials
} from "./material/MaterialWorkerSystem";
import { MaterialInitWorkerData, MaterialWorkerData } from "./material/MaterialWorkerData";

onerror = (msg:string, fileName:string, lineno:number) => {
    // error(true, msg,fileName,lineno);

    //todo refactor
    console.error(`message:${msg}\nfileName:${fileName}\nlineno:${lineno}`);
}

onmessage = (e) => {
    var data = e.data,
        operateType = data.operateType;

    switch (operateType){
        case EWorkerOperateType.INIT_GL:
            //todo setPixelRatioAndCanvas;setScreen
            // chain(setPixelRatioAndCanvas(configState.get("useDevicePixelRatio"))),
            // chain(setScreen(DeviceManagerData)),
            compose(
                map(detect),
                // chain(setPixelRatioAndCanvas(configState.get("useDevicePixelRatio"))),
                // chain(setPixelRatioAndCanvas(false)),
                // chain(setScreen(DeviceManagerData)),
                _createGL
            )(data.canvas, data.options, DeviceManagerData).run()




            var canvas = data.canvas;

                //todo refactor
            setViewportOfGL(0, 0, canvas.width, canvas.height, DeviceManagerData, null).run();
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
            clear(null, render_config, DeviceManagerData);

            let geometryData = data.geometryData,
                materialData = data.materialData;

            //todo unit test
            if(geometryData !== null){
                if(_needUpdateGeometryWorkerData(geometryData)){
                    updatePointCacheDatas(geometryData.verticesInfoList, geometryData.indicesInfoList, GeometryWorkerData);
                }
                else if(_needResetGeometryWorkerData(geometryData)){
                    resetPointCacheDatas(geometryData.verticesInfoList, geometryData.indicesInfoList, GeometryWorkerData);
                }
            }

            if(materialData !== null){
                initNewInitedMaterials(materialData.workerInitList);
            }

            draw(null, render_config, DeviceManagerData, MaterialData, ShaderData, ProgramData, LocationData, GLSLSenderData, GeometryWorkerData, ArrayBufferData, IndexBufferData, DrawRenderCommandWorkerData, data.renderCommandBufferData);
            break;
        default:
            error(true, info.FUNC_UNKOWN(`operateType:${operateType}`));
            break;
    }
};

var _needUpdateGeometryWorkerData = (geometryData:GeometryUpdateWorkerData) => {
    return geometryData.type === EGeometryWorkerDataOperateType.ADD;
}

var _needResetGeometryWorkerData = (geometryData:GeometryResetWorkerData) => {
    return geometryData.type === EGeometryWorkerDataOperateType.RESET;
}

var _initMaterials = (materialData:MaterialInitWorkerData, DataBufferConfig:any, MaterialWorkerData:any) => {
    initMaterialWorkerData(materialData, DataBufferConfig, MaterialWorkerData);

    initMaterials(materialData.materialCount);
}

var _initGeometrys = (geometryData:GeometryInitWorkerData, DataBufferConfig:any, GeometryWorkerData:any) => {
    initGeometryWorkerData(geometryData.buffer, geometryData.indexType, geometryData.indexTypeSize, DataBufferConfig, GeometryWorkerData);

    setPointCacheDatas(geometryData.verticesInfoList, geometryData.indicesInfoList, GeometryWorkerData);
}

var _createGL = curry((canvas:HTMLCanvasElement, options:ContextConfigOptionsData, DeviceManagerData: any) => {
    return IO.of(() => {
        var gl = _getContext(canvas, options);

        if (!gl) {
            DomQuery.create("<p class='not-support-webgl'></p>").prependTo("body").text("Your device doesn't support WebGL");
        }

        //todo setCanvas; setContextConfig
        //     return compose(setCanvas(dom), setContextConfig(contextConfig), setGL(gl, DeviceManagerData))(state);
        return compose(
            setGL(gl, DeviceManagerData)
        )(null);
    });
})

var _getContext = (canvas: HTMLCanvasElement, options:ContextConfigOptionsData): WebGLRenderingContext => {
    // var options: ContextConfigOptionsData = contextConfig.get("options").toObject();

    return (canvas.getContext("webgl", options) || canvas.getContext("experimental-webgl", options)) as WebGLRenderingContext;
}


//todo extract from MainSystem to file
type ContextConfigOptionsData = {
    alpha: boolean;
    depth: boolean;
    stencil: boolean;
    antialias: boolean;
    premultipliedAlpha: boolean;
    preserveDrawingBuffer: boolean;
}

//todo if not support worker, init data elsewhere
initProgramData(ProgramData);

initLocationData(LocationData);

initGLSLSenderData(GLSLSenderData);

initArrayBufferData(ArrayBufferData);

initIndexBufferData(IndexBufferData);

initDrawRenderCommandWorkerData(DrawRenderCommandWorkerData);
