import { Map } from "immutable";
import { getMatrix3DataSize, getMatrix4DataSize, getVector3DataSize } from "../../../../../../utils/typeArrayUtils";
import { IMaterialConfig } from "../../../../../data/material_config";
import { IShaderLibGenerator } from "../../../../../data/shaderLib_generator";
import { IRenderConfig } from "../../../../../worker/both_file/data/render_config";
import { DeferDrawDataMap, DrawDataMap, InitShaderDataMap } from "../../../../../type/utilsType";
import { drawFullScreenQuad, sendAttributeData as sendDeferLightPassAttributeData } from "../../../render/light/defer/light/deferLightPassUtils";
import { getNoMaterialShaderIndex } from "../../../shaderUtils";
import { unbindVAO } from "../../../vao/vaoUtils";
import {
    drawGameObjects,
    updateSendMatrixFloat32ArrayData
} from "../../../../../utils/draw/drawRenderCommandBufferUtils";
import { getNewTextureUnitIndex } from "../../../render/light/defer/gbuffer/gBufferUtils";
import { LightRenderCommandBufferForDrawData, LightRenderUniformData } from "../../../../../type/dataType";
import { IWebGL2DeferDrawFuncDataMap } from "../../../../interface/IDraw";
import { WebGL2LightSendUniformDataDataMap } from "../../../../type/utilsType";
import { buildRenderCommandUniformData } from "../../../../../utils/draw/light/lightDrawRenderCommandBufferUtils";

export var buildDrawDataMap = (GBufferDataFromSystem:any, DeferLightPassDataFromSystem:any) => {
    return {
        GBufferDataFromSystem: GBufferDataFromSystem,
        DeferLightPassDataFromSystem: DeferLightPassDataFromSystem
    }
}

export var draw = (gl:any, state:Map<any, any>, render_config:IRenderConfig, material_config:IMaterialConfig, shaderLib_generator:IShaderLibGenerator, DataBufferConfig: any, initMaterialShader:Function, drawFuncDataMap:IWebGL2DeferDrawFuncDataMap, drawDataMap: DrawDataMap, deferDrawDataMap:DeferDrawDataMap, sendDataMap:WebGL2LightSendUniformDataDataMap, initShaderDataMap:InitShaderDataMap, bufferData: LightRenderCommandBufferForDrawData) => {
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

    _drawGBufferPass(gl, state, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawFuncDataMap, drawDataMap, deferDrawDataMap, initShaderDataMap, sendDataMap, buildRenderCommandUniformData(mMatrixFloatArrayForSend, vMatrixFloatArrayForSend, pMatrixFloatArrayForSend, cameraPositionForSend, normalMatrices), bufferData);
    _drawLightPass(gl, render_config, drawFuncDataMap, drawDataMap, deferDrawDataMap, initShaderDataMap, sendDataMap, vMatrixFloatArrayForSend, pMatrixFloatArrayForSend, cameraPositionForSend);
};

var _drawGBufferPass = (gl: any, state: Map<any, any>, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, DataBufferConfig: any, initMaterialShader: Function, drawFuncDataMap:IWebGL2DeferDrawFuncDataMap, drawDataMap: DrawDataMap, {
    GBufferDataFromSystem
}, initShaderDataMap: InitShaderDataMap, sendDataMap:WebGL2LightSendUniformDataDataMap, renderCommandUniformData: LightRenderUniformData, bufferData: LightRenderCommandBufferForDrawData) => {
    gl.depthMask(true);

    drawFuncDataMap.bindGBuffer(gl, GBufferDataFromSystem);

    //todo refactor
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.enable(gl.DEPTH_TEST);
    gl.disable(gl.BLEND);


    drawGameObjects(gl, state, material_config, shaderLib_generator, DataBufferConfig, getNewTextureUnitIndex(), "GBuffer", initMaterialShader, drawFuncDataMap, drawDataMap, initShaderDataMap, sendDataMap, renderCommandUniformData, bufferData);
}

var _drawLightPass = (gl:any, render_config:IRenderConfig, {
                          use,
                          unbindGBuffer
                      }, drawDataMap:DrawDataMap, {
                          DeferLightPassDataFromSystem
                      }, initShaderDataMap:InitShaderDataMap, sendDataMap:WebGL2LightSendUniformDataDataMap,
                      vMatrixFloatArrayForSend, pMatrixFloatArrayForSend, cameraPositionForSend) => {
    var {
            ShaderDataFromSystem
        } = initShaderDataMap,
        {
            ProgramDataFromSystem,
            LocationDataFromSystem,
            GLSLSenderDataFromSystem
        } = drawDataMap,
        {
            sendInt,
            sendFloat3,
            sendFloat1
        } = sendDataMap.glslSenderData,
        {
            getColorArr3,
            getIntensity,
            getConstant,
            getLinear,
            getQuadratic,
            getRange,
            getPosition,
            computeRadius,

            PointLightDataFromSystem
        } = sendDataMap.pointLightData;

    unbindGBuffer(gl);

    // gl.clear(gl.COLOR_BUFFER_BIT);

    gl.depthMask(false);
    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendEquation(gl.FUNC_ADD);
    gl.blendFunc(gl.ONE, gl.ONE);
    // gl.enable(gl.CULL_FACE);
    // gl.cullFace(gl.FRONT);


    let shaderIndex = getNoMaterialShaderIndex("DeferLightPass", ShaderDataFromSystem),
        program = use(gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem);


    sendDeferLightPassAttributeData(gl, DeferLightPassDataFromSystem);


    // gl.enable(gl.SCISSOR_TEST);

    //todo support ambient, direction light

    let uniformLocationMap = LocationDataFromSystem.uniformLocationMap[shaderIndex],
        uniformCacheMap = GLSLSenderDataFromSystem.uniformCacheMap;

    sendInt(gl, shaderIndex, program, "u_lightModel", render_config.defer.lightModel, uniformCacheMap, uniformLocationMap);

    sendFloat3(gl, shaderIndex, program, "u_cameraPos", cameraPositionForSend, uniformCacheMap, uniformLocationMap);

    for (let i = 0, count = PointLightDataFromSystem.count; i < count; i++) {
        //todo move to ubo

        //todo add scissor optimize

        let colorArr3 = getColorArr3(i, PointLightDataFromSystem),
            constant = getConstant(i, PointLightDataFromSystem),
            linear = getLinear(i, PointLightDataFromSystem),
            quadratic = getQuadratic(i, PointLightDataFromSystem),
            //todo replace range with radius
            radius = computeRadius(colorArr3, constant, linear, quadratic);

        sendFloat3(gl, shaderIndex, program, "u_lightPosition", getPosition(i, drawDataMap), uniformCacheMap, uniformLocationMap);
        sendFloat3(gl, shaderIndex, program, "u_lightColor", colorArr3, uniformCacheMap, uniformLocationMap);
        sendFloat1(gl, shaderIndex, program, "u_lightIntensity", getIntensity(i, PointLightDataFromSystem), uniformCacheMap, uniformLocationMap);
        sendFloat1(gl, shaderIndex, program, "u_lightConstant", constant, uniformCacheMap, uniformLocationMap);
        sendFloat1(gl, shaderIndex, program, "u_lightLinear", linear, uniformCacheMap, uniformLocationMap);
        sendFloat1(gl, shaderIndex, program, "u_lightQuadratic", quadratic, uniformCacheMap, uniformLocationMap);
        sendFloat1(gl, shaderIndex, program, "u_lightRange", getRange(i, PointLightDataFromSystem), uniformCacheMap, uniformLocationMap);


        sendFloat1(gl, shaderIndex, program, "u_lightRadius", radius, uniformCacheMap, uniformLocationMap);

        drawFullScreenQuad(gl, DeferLightPassDataFromSystem);
    }

    unbindVAO(gl);

    // restore state:
    //// gl.cullFace(gl.BACK);
    // gl.disable(gl.SCISSOR_TEST);
}

export var buildDrawFuncDataMap = (bindIndexBuffer: Function, sendAttributeData: Function, sendUniformData: Function, directlySendUniformData: Function, use: Function, hasIndices: Function, getIndicesCount: Function, getIndexType: Function, getIndexTypeSize: Function, getVerticesCount: Function, bindAndUpdate: Function, getMapCount: Function, useShader:Function, bindGBuffer:Function, unbindGBuffer:Function, getNewTextureUnitIndex:Function) => {
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
        bindGBuffer: bindGBuffer,
        unbindGBuffer: unbindGBuffer,
        getNewTextureUnitIndex: getNewTextureUnitIndex
    }
}
