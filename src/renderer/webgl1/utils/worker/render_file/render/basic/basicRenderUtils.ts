import {
    InitShaderDataMap
} from "../../../../../../type/utilsType";
import { Map } from "immutable";
import { IShaderLibGenerator } from "../../../../../../data/shaderLib_generator_interface";
import { IMaterialConfig } from "../../../../../../data/material_config_interface";
import { IRenderConfig } from "../../../../../../worker/both_file/data/render_config";
import { IWebGL1DrawFuncDataMap } from "../../../../../interface/IDraw";
import { draw as drawBasic } from "../../../../draw/basic/basicDrawRenderCommandBufferUtils";
import {
    BasicRenderCommandBufferForDrawData,
    CameraRenderCommandBufferForDrawData
} from "../../../../../../utils/worker/render_file/type/dataType";
import { IWebGL1BasicSendUniformDataDataMap, IWebGL1DrawDataMap } from "../../interface/IUtils";

export var render = (gl: any, state: Map<any, any>, render_config: IRenderConfig, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, DataBufferConfig: any, initMaterialShader: Function, drawFuncDataMap: IWebGL1DrawFuncDataMap, drawDataMap: IWebGL1DrawDataMap, sendDataMap: IWebGL1BasicSendUniformDataDataMap, initShaderDataMap: InitShaderDataMap, bufferData: BasicRenderCommandBufferForDrawData, cameraData: CameraRenderCommandBufferForDrawData) => {
    drawBasic(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawFuncDataMap, drawDataMap, sendDataMap, initShaderDataMap, bufferData, cameraData);
}
