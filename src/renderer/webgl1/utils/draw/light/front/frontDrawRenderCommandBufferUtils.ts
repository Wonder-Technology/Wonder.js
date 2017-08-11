import { LightRenderCommandBufferForDrawData } from "../../../../../type/dataType";
import { DrawDataMap, InitShaderDataMap } from "../../../../../type/utilsType";
import { getMatrix3DataSize, getMatrix4DataSize, getVector3DataSize } from "../../../../../../utils/typeArrayUtils";
import { Map } from "immutable";
import { IShaderLibGenerator } from "../../../../../data/shaderLib_generator";
import { IMaterialConfig } from "../../../../../data/material_config";
import { clear as clearGL } from "../../../../../utils/device/deviceManagerUtils";
import { IRenderConfig } from "../../../../../worker/both_file/data/render_config";
import {
    createTypeArraysOnlyOnce, drawGameObjects,
    updateSendMatrixFloat32ArrayData
} from "../../../../../utils/draw/drawRenderCommandBufferUtils";
import { IWebGL1DrawFuncDataMap } from "../../../../interface/IDraw";
import { createTypeArrays } from "../../../../../utils/command_buffer/lightRenderComandBufferUtils";
import { WebGL1LightSendUniformDataDataMap } from "../../../../type/utilsType";

export var draw = (gl:any, state:Map<any, any>, render_config:IRenderConfig, material_config:IMaterialConfig, shaderLib_generator:IShaderLibGenerator, DataBufferConfig: any, initMaterialShader:Function, drawFuncDataMap:IWebGL1DrawFuncDataMap, drawDataMap: DrawDataMap, sendDataMap:WebGL1LightSendUniformDataDataMap, initShaderDataMap:InitShaderDataMap, bufferData: LightRenderCommandBufferForDrawData) => {
    var {
            DeviceManagerDataFromSystem,
            LightDrawRenderCommandBufferDataFromSystem
        } = drawDataMap,
        mat3Length = getMatrix3DataSize(),
        mat4Length = getMatrix4DataSize(),
        cameraPositionLength = getVector3DataSize(),
        count = bufferData.count,
        buffer: any = bufferData.buffer,
        vMatrixFloatArrayForSend = LightDrawRenderCommandBufferDataFromSystem.vMatrixFloatArrayForSend,
        pMatrixFloatArrayForSend = LightDrawRenderCommandBufferDataFromSystem.pMatrixFloatArrayForSend,
        cameraPositionForSend = LightDrawRenderCommandBufferDataFromSystem.cameraPositionForSend,
        normalMatrixFloatArrayForSend = LightDrawRenderCommandBufferDataFromSystem.normalMatrixFloatArrayForSend,
        //todo directly use RenderCommandBufferDataFromSystem data(in no worker)?
        //todo createTypeArrays use lightDrawxxxUtils->createTypeArrays?
        {
            vMatrices,
            pMatrices,
            cameraPositions,
            normalMatrices
        } = createTypeArraysOnlyOnce(buffer, DataBufferConfig, createTypeArrays, LightDrawRenderCommandBufferDataFromSystem);

    updateSendMatrixFloat32ArrayData(vMatrices, 0, mat4Length, vMatrixFloatArrayForSend);
    updateSendMatrixFloat32ArrayData(pMatrices, 0, mat4Length, pMatrixFloatArrayForSend);
    updateSendMatrixFloat32ArrayData(normalMatrices, 0, mat3Length, normalMatrixFloatArrayForSend);
    updateSendMatrixFloat32ArrayData(cameraPositions, 0, cameraPositionLength, cameraPositionForSend);

    drawGameObjects(gl, state, material_config, shaderLib_generator, DataBufferConfig, 0, "FrontRenderLight", initMaterialShader, drawFuncDataMap, drawDataMap, initShaderDataMap, sendDataMap, count, vMatrixFloatArrayForSend, pMatrixFloatArrayForSend, cameraPositionForSend, normalMatrixFloatArrayForSend, LightDrawRenderCommandBufferDataFromSystem);

    return state;
};
