import { Map } from "immutable";
import { IRenderConfig } from "../../../../worker/both_file/data/render_config";
import { IMaterialConfig } from "../../../../data/material_config_interface";
import { WebGL1BasicSendUniformDataDataMap } from "../../../../webgl1/type/utilsType";
import { IShaderLibGenerator } from "../../../../data/shaderLib_generator_interface";
import { IWebGL2DrawFuncDataMap } from "../../../../webgl2/interface/IDraw";
import { InitShaderDataMap } from "../../../../type/utilsType";
import { BasicRenderCommandBufferForDrawData } from "../../../../utils/worker/render_file/type/dataType";
import { buildRenderCommandUniformData } from "../../../../utils/draw/basic/basicDrawRenderCommandBufferUtils";
import { WebGL2DrawDataMap } from "../../../type/utilsType";
import { drawGameObjects } from "../../../../webgl2/utils/worker/render_file/draw/drawRenderCommandBufferUtils";

export var draw = (gl:any, state:Map<any, any>, render_config:IRenderConfig, material_config:IMaterialConfig, shaderLib_generator:IShaderLibGenerator, DataBufferConfig: any, initMaterialShader:Function, drawFuncDataMap:IWebGL2DrawFuncDataMap, drawDataMap: WebGL2DrawDataMap, sendDataMap:WebGL1BasicSendUniformDataDataMap, initShaderDataMap:InitShaderDataMap, bufferData: BasicRenderCommandBufferForDrawData, {
            vMatrix,
            pMatrix
        }) => {
    var {
            BasicDrawRenderCommandBufferDataFromSystem
        } = drawDataMap,
        {
            mMatrixFloatArrayForSend
        } = BasicDrawRenderCommandBufferDataFromSystem;

    drawGameObjects(gl, state, material_config, shaderLib_generator, DataBufferConfig, 0, "BasicRender", initMaterialShader, drawFuncDataMap, drawDataMap, initShaderDataMap, sendDataMap, buildRenderCommandUniformData(mMatrixFloatArrayForSend, vMatrix, pMatrix), bufferData);

    return state;
};
