import { Map } from "immutable";
import { bindGBufferTargets, init as initGBuffer, sendGBufferTargetData  } from "./gbuffer/gBufferUtils";
import { init as initDeferLightPass } from "./light/deferLightPassUtils";
import { use } from "../../../../../../../utils/worker/render_file/shader/shaderUtils";
import { IMaterialConfig } from "../../../../../../../data/material_config_interface";
import { IShaderLibGenerator } from "../../../../../../../data/shaderLib_generator_interface";
import { DeferDrawDataMap, DrawDataMap, InitShaderDataMap } from "../../../../../../../type/utilsType";
import { LightRenderCommandBufferForDrawData } from "../../../../../../../type/dataType";
import { IRenderConfig } from "../../../../../../../worker/both_file/data/render_config";
import { getNoMaterialShaderIndex } from "../../../shader/shaderUtils";
import { IWebGL2DeferDrawFuncDataMap } from "../../../../../../interface/IDraw";
import { WebGL2LightSendUniformDataDataMap } from "../../../../../../type/utilsType";
import { draw as deferDraw } from "../../../../../draw/light/defer/deferDrawRenderCommandBufferUtils";

export var init = (gl:any, DataBufferConfig:any, GBufferDataFromSystem:any, DeferLightPassDataFromSystem:any, ShaderDataFromSystem:any, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem) => {
    _resetLightDataBufferCount(DataBufferConfig);

    initGBuffer(gl, GBufferDataFromSystem);
    initDeferLightPass(gl, DeferLightPassDataFromSystem);

    //todo optimize: when switch to defer shading, bind and send gbuffer textures

    bindGBufferTargets(gl, GBufferDataFromSystem);

    let shaderIndex = getNoMaterialShaderIndex("DeferLightPass", ShaderDataFromSystem);

    let program = use(gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem);

    sendGBufferTargetData(gl, program);
}

var _resetLightDataBufferCount = (DataBufferConfig:any) => {
    //todo fix direction, ambient

    DataBufferConfig.pointLightDataBufferCount = 1000;
}

export var render = (gl:any, state: Map<any, any>, render_config:IRenderConfig, material_config:IMaterialConfig, shaderLib_generator:IShaderLibGenerator, DataBufferConfig: any, initMaterialShader:Function, drawFuncDataMap:IWebGL2DeferDrawFuncDataMap, drawDataMap: DrawDataMap, deferDrawDataMap:DeferDrawDataMap, sendDataMap:WebGL2LightSendUniformDataDataMap, initShaderDataMap:InitShaderDataMap, bufferData: LightRenderCommandBufferForDrawData) => {
    deferDraw(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawFuncDataMap, drawDataMap, deferDrawDataMap, sendDataMap, initShaderDataMap, bufferData);
}
