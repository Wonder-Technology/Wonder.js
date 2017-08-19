import { getNormals, getTexCoords, getVertices } from "../../../render_file/geometry/GeometryWorkerSystem";
import { getAttribLocation, isAttributeLocationNotExist } from "../../../../webgl1/utils/worker/render_file/shader/location/locationUtils";
import { sendBuffer } from "../../../render_file/shader/glslSender/GLSLSenderWorkerSystem";
import { Map } from "immutable";
import { IMaterialConfig } from "../../../../data/material_config_interface";
import { IRenderConfig } from "../../../both_file/data/render_config";
import { IShaderLibGenerator } from "../../../../data/shaderLib_generator_interface";
import { DeferDrawDataMap, DrawDataMap, InitShaderDataMap } from "../../../../type/utilsType";
import { render as basicRender } from "./basic/BasicRenderWorkerSystem";
import { render as deferRender } from "./light/defer/DeferShadingWorkerSystem";
import {
    init as initUtils,
    render as renderUtils,
    sendAttributeData as sendAttributeDataUtils
} from "../../../../webgl2/utils/worker/render_file/render/renderUtils";
import { RenderCommandBufferForDrawData } from "../../../../utils/worker/render_file/type/dataType";

export var init = initUtils;

export var render = (gl:any, state: Map<any, any>, render_config: IRenderConfig, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, DataBufferConfig: any, initMaterialShader: Function, drawDataMap: DrawDataMap, deferDrawDataMap:DeferDrawDataMap, initShaderDataMap: InitShaderDataMap, renderCommandBufferForDrawData: RenderCommandBufferForDrawData) => {
    // var {
    //         DeviceManagerDataFromSystem
    //     } = drawDataMap;
    //
    // clear(gl, DeviceManagerDataFromSystem);
    //
    // if(basicData.count > 0){
    //     basicRender(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawDataMap, initShaderDataMap, basicData, cameraData);
    // }
    //
    // if(lightData.count > 0){
    //     deferRender(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawDataMap, deferDrawDataMap, initShaderDataMap, lightData, cameraData);
    // }

    renderUtils(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, basicRender, deferRender, drawDataMap, deferDrawDataMap, initShaderDataMap, renderCommandBufferForDrawData);
}

export var sendAttributeData = (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, geometryIndex: number, ProgramWorkerData: any, LocationWorkerData: any, GLSLSenderWorkerData: any, GeometryWorkerData: any, ArrayBufferWorkerData: any, VaoWorkerData:any) => sendAttributeDataUtils(gl, shaderIndex, geometryIndex, ProgramWorkerData, GLSLSenderWorkerData, GeometryWorkerData, VaoWorkerData);


