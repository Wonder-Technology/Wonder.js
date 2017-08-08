import { bindGBufferTargets, init as initGBuffer, sendGBufferTargetData } from "./gbuffer/GBufferSystem";
import { draw as deferDraw } from "./draw/DeferDrawRenderCommandBufferSystem";
import { DeferDrawDataMap, DrawDataMap, InitShaderDataMap } from "../../type/utilsType";
import curry from "wonder-lodash/curry";
import { RenderCommandBufferForDrawData } from "../../type/dataType";
import { getGL } from "../../device/DeviceManagerSystem";
import { init as initDeferLightPass } from "./light/DeferLightPassSystem";
import { Map } from "immutable";
import { getNoMaterialShaderIndex, use } from "../../shader/ShaderSystem";
import { IShaderLibGenerator } from "../../data/shaderLib_generator";
import { IMaterialConfig } from "../../data/material_config";
import { IRenderConfig } from "../../worker/both_file/data/render_config";

export var init = (gl:any, GBufferData:any, DeferLightPassData:any, ShaderData:any, ProgramData, LocationData, GLSLSenderData) => {
    initGBuffer(gl, GBufferData);
    initDeferLightPass(gl, DeferLightPassData);

    //todo optimize: when switch to defer shading, bind and send gbuffer textures

    bindGBufferTargets(gl, GBufferData);

    let shaderIndex = getNoMaterialShaderIndex("DeferLightPass", ShaderData);

    let program = use(gl, shaderIndex, ProgramData, LocationData, GLSLSenderData);

    sendGBufferTargetData(gl, program);
}

export var draw = curry((state: Map<any, any>, render_config:IRenderConfig, material_config:IMaterialConfig, shaderLib_generator:IShaderLibGenerator, DataBufferConfig: any, initMaterialShader:Function, drawDataMap: DrawDataMap, deferDrawDataMap:DeferDrawDataMap, initShaderDataMap:InitShaderDataMap, bufferData: RenderCommandBufferForDrawData) => {
    deferDraw(getGL(drawDataMap.DeviceManagerDataFromSystem, state), state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawDataMap, deferDrawDataMap, initShaderDataMap, bufferData);
})
