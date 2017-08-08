import { draw as frontDraw } from "../../../../../webgl1/utils/front/draw/frontRenderDrawRenderCommandBufferUtils";
import { Map } from "immutable";
import { IRenderConfig } from "../../../../both_file/data/render_config";
import { IMaterialConfig } from "../../../../../data/material_config";
import { IShaderLibGenerator } from "../../../../../data/shaderLib_generator";
import { DrawDataMap, InitShaderDataMap } from "../../../../../type/utilsType";
import { RenderCommandBufferForDrawData } from "../../../../../type/dataType";

export var draw = (gl: any, state: Map<any, any>, render_config: IRenderConfig, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, DataBufferConfig: any, initMaterialShader: Function, drawDataMap: DrawDataMap, initShaderDataMap: InitShaderDataMap, bufferData: RenderCommandBufferForDrawData) => {
    frontDraw(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawDataMap, initShaderDataMap, bufferData);
};

