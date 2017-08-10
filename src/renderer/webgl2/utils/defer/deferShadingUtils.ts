import { Map } from "immutable";
import {  bindGBufferTargets, init as initGBuffer, sendGBufferTargetData  } from "./gbuffer/gBufferUtils";
import { init as initDeferLightPass } from "./light/deferLightPassUtils";
import { use } from "../../../utils/shader/shaderUtils";
import { draw as deferDraw } from "./draw/deferDrawRenderCommandBufferUtils";
import { IMaterialConfig } from "../../../data/material_config";
import { IShaderLibGenerator } from "../../../data/shaderLib_generator";
import { DeferDrawDataMap, DrawDataMap, InitShaderDataMap } from "../../../type/utilsType";
import { RenderCommandBufferForDrawData } from "../../../type/dataType";
import { IRenderConfig } from "../../../worker/both_file/data/render_config";
import { WebGL2SendUniformDataDataMap } from "../../type/utilsType";
import { getNoMaterialShaderIndex } from "../shaderUtils";
import { IWebGL2DrawFuncDataMap } from "../../interface/IDraw";

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

export var draw = (gl:any, state: Map<any, any>, render_config:IRenderConfig, material_config:IMaterialConfig, shaderLib_generator:IShaderLibGenerator, DataBufferConfig: any, initMaterialShader:Function, drawFuncDataMap:IWebGL2DrawFuncDataMap, drawDataMap: DrawDataMap, deferDrawDataMap:DeferDrawDataMap, sendDataMap:WebGL2SendUniformDataDataMap, initShaderDataMap:InitShaderDataMap, bufferData: RenderCommandBufferForDrawData) => {
    deferDraw(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawFuncDataMap, drawDataMap, deferDrawDataMap, sendDataMap, initShaderDataMap, bufferData);
}
