import { DrawDataMap, InitShaderDataMap } from "../../type/utilsType";
import curry from "wonder-lodash/curry";
import { RenderCommandBufferForDrawData } from "../../type/dataType";
import { getGL } from "../../device/DeviceManagerSystem";
import { Map } from "immutable";
import { draw as frontDraw } from "./draw/FrontRenderDrawRenderCommandBufferSystem";
import { IShaderLibGenerator } from "../../data/shaderLib_generator";
import { IMaterialConfig } from "../../data/material_config";

// export var init = (gl:any, GBufferData:any, DeferLightPassData:any, ShaderData:any, ProgramData, LocationData, GLSLSenderData) => {
// }

export var draw = curry((state: Map<any, any>, material_config:IMaterialConfig, shaderLib_generator:IShaderLibGenerator, DataBufferConfig: any, initMaterialShader:Function, drawDataMap: DrawDataMap, initShaderDataMap:InitShaderDataMap, bufferData: RenderCommandBufferForDrawData) => {
    frontDraw(getGL(drawDataMap.DeviceManagerDataFromSystem, state), state, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawDataMap, initShaderDataMap, bufferData);

})
