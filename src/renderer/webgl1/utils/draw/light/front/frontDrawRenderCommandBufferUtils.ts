import { LightRenderCommandBufferForDrawData } from "../../../../../type/dataType";
import { DrawDataMap, InitShaderDataMap } from "../../../../../type/utilsType";
import { getMatrix3DataSize, getMatrix4DataSize, getVector3DataSize } from "../../../../../../utils/typeArrayUtils";
import { Map } from "immutable";
import { IShaderLibGenerator } from "../../../../../data/shaderLib_generator_interface";
import { IMaterialConfig } from "../../../../../data/material_config_interface";
import { IRenderConfig } from "../../../../../worker/both_file/data/render_config";
import {
    drawGameObjects,
    updateSendMatrixFloat32ArrayData
} from "../../../../../utils/draw/drawRenderCommandBufferUtils";
import { IWebGL1DrawFuncDataMap } from "../../../../interface/IDraw";
import { WebGL1LightSendUniformDataDataMap } from "../../../../type/utilsType";
import { buildRenderCommandUniformData } from "../../../../../utils/draw/light/lightDrawRenderCommandBufferUtils";

export var draw = (gl:any, state:Map<any, any>, render_config:IRenderConfig, material_config:IMaterialConfig, shaderLib_generator:IShaderLibGenerator, DataBufferConfig: any, initMaterialShader:Function, drawFuncDataMap:IWebGL1DrawFuncDataMap, drawDataMap: DrawDataMap, sendDataMap:WebGL1LightSendUniformDataDataMap, initShaderDataMap:InitShaderDataMap, bufferData: LightRenderCommandBufferForDrawData) => {
    var {
            LightDrawRenderCommandBufferDataFromSystem
        } = drawDataMap,
        {
            vMatrices,
            pMatrices,
            cameraPositions,
            normalMatrices
        } = bufferData.renderCommandBufferData,
        mat3Length = getMatrix3DataSize(),
        mat4Length = getMatrix4DataSize(),
        cameraPositionLength = getVector3DataSize(),
        {
            mMatrixFloatArrayForSend,
            vMatrixFloatArrayForSend,
            pMatrixFloatArrayForSend,
            cameraPositionForSend,
            normalMatrixFloatArrayForSend
        } = LightDrawRenderCommandBufferDataFromSystem;

    updateSendMatrixFloat32ArrayData(vMatrices, 0, mat4Length, vMatrixFloatArrayForSend);
    updateSendMatrixFloat32ArrayData(pMatrices, 0, mat4Length, pMatrixFloatArrayForSend);
    updateSendMatrixFloat32ArrayData(normalMatrices, 0, mat3Length, normalMatrixFloatArrayForSend);
    updateSendMatrixFloat32ArrayData(cameraPositions, 0, cameraPositionLength, cameraPositionForSend);

    drawGameObjects(gl, state, material_config, shaderLib_generator, DataBufferConfig, 0, "FrontRenderLight", initMaterialShader, drawFuncDataMap, drawDataMap, initShaderDataMap, sendDataMap, buildRenderCommandUniformData(mMatrixFloatArrayForSend, vMatrixFloatArrayForSend, pMatrixFloatArrayForSend, cameraPositionForSend, normalMatrices), bufferData);

    return state;
};
