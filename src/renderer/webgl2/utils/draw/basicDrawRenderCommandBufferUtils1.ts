import { DrawDataMap, InitShaderDataMap } from "../../../type/utilsType";
import { getMatrix4DataSize } from "../../../../utils/typeArrayUtils";
import { Map } from "immutable";
import { IShaderLibGenerator } from "../../../data/shaderLib_generator";
import { IMaterialConfig } from "../../../data/material_config";
import { IRenderConfig } from "../../../worker/both_file/data/render_config";
import {
    createTypeArraysOnlyOnce, drawGameObjects,
    updateSendMatrixFloat32ArrayData
} from "../../../utils/draw/drawRenderCommandBufferUtils";
import { IWebGL1DrawFuncDataMap } from "../../../webgl1/interface/IDraw";
import { BasicRenderCommandBufferForDrawData } from "../../../type/dataType";
import { WebGL1BasicSendUniformDataDataMap } from "../../../webgl1/type/utilsType";
import { createTypeArrays } from "../../../utils/command_buffer/basicRenderComandBufferUtils";

export var draw = (gl:any, state:Map<any, any>, render_config:IRenderConfig, material_config:IMaterialConfig, shaderLib_generator:IShaderLibGenerator, DataBufferConfig: any, initMaterialShader:Function, drawFuncDataMap:IWebGL1DrawFuncDataMap, drawDataMap: DrawDataMap, sendDataMap:WebGL1BasicSendUniformDataDataMap, initShaderDataMap:InitShaderDataMap, bufferData: BasicRenderCommandBufferForDrawData) => {
    var {
            DeviceManagerDataFromSystem,
            BasicDrawRenderCommandBufferDataFromSystem
        } = drawDataMap,
        mat4Length = getMatrix4DataSize(),
        count = bufferData.count,
        buffer: any = bufferData.buffer,
        vMatrixFloatArrayForSend = BasicDrawRenderCommandBufferDataFromSystem.vMatrixFloatArrayForSend,
        pMatrixFloatArrayForSend = BasicDrawRenderCommandBufferDataFromSystem.pMatrixFloatArrayForSend,
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

    // clearGL(gl, DeviceManagerDataFromSystem);

    //todo refactor: remove null,null
    drawGameObjects(gl, state, material_config, shaderLib_generator, DataBufferConfig, 0, "BasicRender", initMaterialShader, drawFuncDataMap, drawDataMap, initShaderDataMap, sendDataMap, count, vMatrixFloatArrayForSend, pMatrixFloatArrayForSend, null, null, BasicDrawRenderCommandBufferDataFromSystem);

    return state;
};

export var buildDrawFuncDataMap = (bindIndexBuffer: Function, sendAttributeData: Function, sendUniformData: Function, directlySendUniformData: Function, use: Function, hasIndices: Function, getIndicesCount: Function, getIndexType: Function, getIndexTypeSize: Function, getVerticesCount: Function, bindAndUpdate: Function, getMapCount: Function, useShader:Function) => {
    return {
        bindIndexBuffer: bindIndexBuffer,
        sendAttributeData: sendAttributeData,
        sendUniformData: sendUniformData,
        directlySendUniformData: directlySendUniformData,
        use: use,
        hasIndices: hasIndices,
        getIndicesCount: getIndicesCount,
        getIndexType: getIndexType,
        getIndexTypeSize: getIndexTypeSize,
        getVerticesCount: getVerticesCount,
        bindAndUpdate: bindAndUpdate,
        getMapCount: getMapCount,
        useShader: useShader,
    }
}

