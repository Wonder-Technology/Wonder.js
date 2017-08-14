import { DrawDataMap, InitShaderDataMap } from "../../../../../type/utilsType";
import { Map } from "immutable";
import { IShaderLibGenerator } from "../../../../../data/shaderLib_generator";
import { IMaterialConfig } from "../../../../../data/material_config";
import { IRenderConfig } from "../../../../../worker/both_file/data/render_config";
import { draw as frontDraw } from "../../../draw/light/front/frontDrawRenderCommandBufferUtils";
import { IWebGL1DrawFuncDataMap } from "../../../../interface/IDraw";
import { WebGL1LightSendUniformDataDataMap } from "../../../../type/utilsType";
import { LightRenderCommandBufferForDrawData } from "../../../../../type/dataType";

export var render = (gl:any, state: Map<any, any>, render_config:IRenderConfig, material_config:IMaterialConfig, shaderLib_generator:IShaderLibGenerator, DataBufferConfig: any, initMaterialShader:Function, drawFuncDataMap:IWebGL1DrawFuncDataMap, drawDataMap: DrawDataMap, sendDataMap:WebGL1LightSendUniformDataDataMap, initShaderDataMap:InitShaderDataMap, bufferData: LightRenderCommandBufferForDrawData) => {
    frontDraw(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawFuncDataMap, drawDataMap, sendDataMap, initShaderDataMap, bufferData);
}
