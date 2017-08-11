import { DrawDataMap, InitShaderDataMap } from "../../../../type/utilsType";
import { getMatrix3DataSize, getMatrix4DataSize, getVector3DataSize } from "../../../../../utils/typeArrayUtils";
import { Map } from "immutable";
import { IShaderLibGenerator } from "../../../../data/shaderLib_generator";
import { IMaterialConfig } from "../../../../data/material_config";
// import { clear as clearGL } from "../../../../utils/device/deviceManagerUtils";
import { IRenderConfig } from "../../../../worker/both_file/data/render_config";
import {
    createTypeArraysOnlyOnce, drawGameObjects,
    updateSendMatrixFloat32ArrayData
} from "../../../../utils/draw/drawRenderCommandBufferUtils";
import { IWebGL1DrawFuncDataMap } from "../../../interface/IDraw";
import { BasicRenderCommandBufferForDrawData } from "../../../../type/dataType";
import { WebGL1BasicSendUniformDataDataMap } from "../../../type/utilsType";
import { createTypeArrays } from "../../../../utils/command_buffer/basicRenderComandBufferUtils";

export var draw = (gl:any, state:Map<any, any>, render_config:IRenderConfig, material_config:IMaterialConfig, shaderLib_generator:IShaderLibGenerator, DataBufferConfig: any, initMaterialShader:Function, drawFuncDataMap:IWebGL1DrawFuncDataMap, drawDataMap: DrawDataMap, sendDataMap:WebGL1BasicSendUniformDataDataMap, initShaderDataMap:InitShaderDataMap, bufferData: BasicRenderCommandBufferForDrawData) => {
    var {
            DeviceManagerDataFromSystem,
            BasicDrawRenderCommandBufferDataFromSystem
        } = drawDataMap,
        // mat3Length = getMatrix3DataSize(),
        mat4Length = getMatrix4DataSize(),
        // cameraPositionLength = getVector3DataSize(),
        count = bufferData.count,
        buffer: any = bufferData.buffer,
        vMatrixFloatArrayForSend = BasicDrawRenderCommandBufferDataFromSystem.vMatrixFloatArrayForSend,
        pMatrixFloatArrayForSend = BasicDrawRenderCommandBufferDataFromSystem.pMatrixFloatArrayForSend,
        // cameraPositionForSend = BasicDrawRenderCommandBufferDataFromSystem.cameraPositionForSend,
        // normalMatrixFloatArrayForSend = BasicDrawRenderCommandBufferDataFromSystem.normalMatrixFloatArrayForSend,
        //todo directly use RenderCommandBufferDataFromSystem data(in no worker)?
        //todo createTypeArrays use basicDrawxxxUtils->createTypeArrays?
        {
            vMatrices,
            pMatrices
            // cameraPositions,
            // normalMatrices
        } = createTypeArraysOnlyOnce(buffer, DataBufferConfig, createTypeArrays, BasicDrawRenderCommandBufferDataFromSystem);

    updateSendMatrixFloat32ArrayData(vMatrices, 0, mat4Length, vMatrixFloatArrayForSend);
    updateSendMatrixFloat32ArrayData(pMatrices, 0, mat4Length, pMatrixFloatArrayForSend);
    // updateSendMatrixFloat32ArrayData(normalMatrices, 0, mat3Length, normalMatrixFloatArrayForSend);
    // updateSendMatrixFloat32ArrayData(cameraPositions, 0, cameraPositionLength, cameraPositionForSend);

    // clearGL(gl, DeviceManagerDataFromSystem);

    //todo refactor: remove null,null
    drawGameObjects(gl, state, material_config, shaderLib_generator, DataBufferConfig, 0, "BasicRender", initMaterialShader, drawFuncDataMap, drawDataMap, initShaderDataMap, sendDataMap, count, vMatrixFloatArrayForSend, pMatrixFloatArrayForSend, null, null, BasicDrawRenderCommandBufferDataFromSystem);

    return state;
};
