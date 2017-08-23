import { Map } from "immutable";
import { IRenderConfig } from "../../../../../worker/both_file/data/render_config";
import { IMaterialConfig } from "../../../../../data/material_config_interface";
import { IShaderLibGenerator } from "../../../../../data/shaderLib_generator_interface";
import { InitShaderDataMap } from "../../../../../type/utilsType";
import { IWebGL2DeferDrawFuncDataMap } from "../../../../interface/Idraw";
import { buildRenderCommandUniformData } from "../../../../../utils/draw/light/lightDrawRenderCommandBufferUtils";
import { LightRenderCommandBufferForDrawData } from "../../../../../utils/worker/render_file/type/dataType";
import { IWebGL2DrawDataMap, IWebGL2LightSendUniformDataDataMap } from "../../../worker/render_file/interface/IUtils";
import { drawLightPass } from "./lightPassDrawUtils";
import { drawGBufferPass } from "./gBufferPassDrawUtils";
import { DeferDrawDataMap } from "../../../worker/render_file/type/utilsType";

export var draw = (gl:any, state:Map<any, any>, render_config:IRenderConfig, material_config:IMaterialConfig, shaderLib_generator:IShaderLibGenerator, DataBufferConfig: any, initMaterialShader:Function, drawFuncDataMap:IWebGL2DeferDrawFuncDataMap, drawDataMap: IWebGL2DrawDataMap, deferDrawDataMap:DeferDrawDataMap, sendDataMap:IWebGL2LightSendUniformDataDataMap, initShaderDataMap:InitShaderDataMap, bufferData: LightRenderCommandBufferForDrawData, {
    vMatrix,
    pMatrix,
    cameraPosition,
    normalMatrix
}) => {
    var {
            LightDrawRenderCommandBufferDataFromSystem
        } = drawDataMap,
        {
            mMatrixFloatArrayForSend
        } = LightDrawRenderCommandBufferDataFromSystem;

    drawGBufferPass(gl, state, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawFuncDataMap, drawDataMap, deferDrawDataMap, initShaderDataMap, sendDataMap, buildRenderCommandUniformData(mMatrixFloatArrayForSend, vMatrix, pMatrix, cameraPosition, normalMatrix), bufferData);
    drawLightPass(gl, render_config, drawFuncDataMap, drawDataMap, deferDrawDataMap, initShaderDataMap, sendDataMap, vMatrix, pMatrix, state);
};

