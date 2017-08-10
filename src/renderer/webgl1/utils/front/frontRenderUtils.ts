import { DrawDataMap, InitShaderDataMap } from "../../../type/utilsType";
import { RenderCommandBufferForDrawData } from "../../../type/dataType";
import { Map } from "immutable";
import { IShaderLibGenerator } from "../../../data/shaderLib_generator";
import { IMaterialConfig } from "../../../data/material_config";
import { IRenderConfig } from "../../../worker/both_file/data/render_config";
import { draw as frontDraw } from "./draw/frontRenderDrawRenderCommandBufferUtils";
import { WebGL1SendUniformDataDataMap } from "../../type/utilsType";
import { IWebGL1DrawFuncDataMap } from "../../interface/IDraw";

export var draw = (gl:any, state: Map<any, any>, render_config:IRenderConfig, material_config:IMaterialConfig, shaderLib_generator:IShaderLibGenerator, DataBufferConfig: any, initMaterialShader:Function, drawFuncDataMap:IWebGL1DrawFuncDataMap, drawDataMap: DrawDataMap, sendDataMap:WebGL1SendUniformDataDataMap, initShaderDataMap:InitShaderDataMap, bufferData: RenderCommandBufferForDrawData) => {
    frontDraw(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawFuncDataMap, drawDataMap, sendDataMap, initShaderDataMap, bufferData);
}

