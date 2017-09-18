import { InitShaderDataMap } from "../../../../type/utilsType";
import { Map } from "immutable";
import { IShaderLibGenerator } from "../../../../data/shaderLib_generator_interface";
import { IMaterialConfig } from "../../../../data/material_config_interface";
import { IRenderConfig } from "../../../../worker/both_file/data/render_config";
import { IWebGL1DrawFuncDataMap } from "../../../interface/IDraw";
import { BasicRenderCommandBufferForDrawData } from "../../../../utils/worker/render_file/type/dataType";
import { buildRenderCommandUniformData } from "../../../../utils/draw/basic/basicDrawRenderCommandBufferUtils";
import { drawGameObjects } from "../../worker/render_file/draw/drawRenderCommandBufferUtils";
import { IWebGL1BasicSendUniformDataDataMap, IWebGL1DrawDataMap } from "../../worker/render_file/interface/IUtils";

export const draw = (gl: any, state: Map<any, any>, render_config: IRenderConfig, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, DataBufferConfig: any, initMaterialShader: Function, drawFuncDataMap: IWebGL1DrawFuncDataMap, drawDataMap: IWebGL1DrawDataMap, sendDataMap: IWebGL1BasicSendUniformDataDataMap, initShaderDataMap: InitShaderDataMap, bufferData: BasicRenderCommandBufferForDrawData, {
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
