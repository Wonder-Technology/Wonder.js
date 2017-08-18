import { Map } from "immutable";
import { WebGL2DrawDataMap, WebGL2LightSendUniformDataDataMap } from "../../../../type/utilsType";
import { IRenderConfig } from "../../../../../worker/both_file/data/render_config";
import { IMaterialConfig } from "../../../../../data/material_config_interface";
import { IShaderLibGenerator } from "../../../../../data/shaderLib_generator_interface";
import { DeferDrawDataMap, InitShaderDataMap } from "../../../../../type/utilsType";
import { IWebGL2DeferDrawFuncDataMap } from "../../../../interface/IDraw";
import {
     LightRenderUniformData
} from "../../../../../type/dataType";
import { buildRenderCommandUniformData } from "../../../../../utils/draw/light/lightDrawRenderCommandBufferUtils";
import { getNewTextureUnitIndex } from "../../../worker/render_file/render/light/defer/gbuffer/gBufferUtils";
import { getNoMaterialShaderIndex } from "../../../worker/render_file/shader/shaderUtils";
import { unbindVao } from "../../../worker/render_file/vao/vaoUtils";
import { drawFullScreenQuad, sendAttributeData } from "../../../render/light/defer/light/deferLightPassUtils";
import { clear } from "../../../../../utils/worker/both_file/device/deviceManagerUtils";
import { bindPointLightUboData } from "../../../worker/render_file/ubo/uboManagerUtils";
import { LightRenderCommandBufferForDrawData } from "../../../../../utils/worker/render_file/type/dataType";
import { drawGameObjects } from "../../../worker/render_file/draw/drawRenderCommandBufferUtils";

export var draw = (gl:any, state:Map<any, any>, render_config:IRenderConfig, material_config:IMaterialConfig, shaderLib_generator:IShaderLibGenerator, DataBufferConfig: any, initMaterialShader:Function, drawFuncDataMap:IWebGL2DeferDrawFuncDataMap, drawDataMap: WebGL2DrawDataMap, deferDrawDataMap:DeferDrawDataMap, sendDataMap:WebGL2LightSendUniformDataDataMap, initShaderDataMap:InitShaderDataMap, bufferData: LightRenderCommandBufferForDrawData, {
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

    _drawGBufferPass(gl, state, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawFuncDataMap, drawDataMap, deferDrawDataMap, initShaderDataMap, sendDataMap, buildRenderCommandUniformData(mMatrixFloatArrayForSend, vMatrix, pMatrix, cameraPosition, normalMatrix), bufferData);
    _drawLightPass(gl, render_config, drawFuncDataMap, drawDataMap, deferDrawDataMap, initShaderDataMap, sendDataMap);
};

var _drawGBufferPass = (gl: any, state: Map<any, any>, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, DataBufferConfig: any, initMaterialShader: Function, drawFuncDataMap:IWebGL2DeferDrawFuncDataMap, drawDataMap: WebGL2DrawDataMap, {
    GBufferDataFromSystem
}, initShaderDataMap: InitShaderDataMap, sendDataMap:WebGL2LightSendUniformDataDataMap, renderCommandUniformData: LightRenderUniformData, bufferData: LightRenderCommandBufferForDrawData) => {
    gl.depthMask(true);

    drawFuncDataMap.bindGBuffer(gl, GBufferDataFromSystem);

    clear(gl, drawDataMap.DeviceManagerDataFromSystem);

    gl.enable(gl.DEPTH_TEST);
    gl.disable(gl.BLEND);


    drawGameObjects(gl, state, material_config, shaderLib_generator, DataBufferConfig, getNewTextureUnitIndex(), "GBuffer", initMaterialShader, drawFuncDataMap, drawDataMap, initShaderDataMap, sendDataMap, renderCommandUniformData, bufferData);
}

var _drawLightPass = (gl:any, render_config:IRenderConfig, {
                          use,
                          unbindGBuffer
                      }, drawDataMap:WebGL2DrawDataMap, {
                          DeferLightPassDataFromSystem
                      }, initShaderDataMap:InitShaderDataMap, sendDataMap:WebGL2LightSendUniformDataDataMap) => {
    var {
            ShaderDataFromSystem
        } = initShaderDataMap,
        {
            ProgramDataFromSystem,
            LocationDataFromSystem,
            GLSLSenderDataFromSystem,
            PointLightDataFromSystem
        } = drawDataMap;

    unbindGBuffer(gl);

    gl.depthMask(false);
    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendEquation(gl.FUNC_ADD);
    gl.blendFunc(gl.ONE, gl.ONE);
    // gl.enable(gl.CULL_FACE);
    // gl.cullFace(gl.FRONT);


    let shaderIndex = getNoMaterialShaderIndex("DeferLightPass", ShaderDataFromSystem),
        program = use(gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem);

    sendAttributeData(gl, DeferLightPassDataFromSystem);

    // gl.enable(gl.SCISSOR_TEST);

    //todo support ambient, direction light

    for (let i = 0, count = PointLightDataFromSystem.count; i < count; i++) {
        //todo add scissor optimize

        // let colorArr3 = getColorArr3(i, PointLightDataFromSystem),
        //     constant = getConstant(i, PointLightDataFromSystem),
        //     linear = getLinear(i, PointLightDataFromSystem),
        //     quadratic = getQuadratic(i, PointLightDataFromSystem),
        //     //todo optimize: cache radius
        //     radius = computeRadius(colorArr3, constant, linear, quadratic);
        //
        // sendFloat3(gl, shaderIndex, program, "u_lightPosition", getPosition(i, drawDataMap), uniformCacheMap, uniformLocationMap);
        // sendFloat3(gl, shaderIndex, program, "u_lightColor", colorArr3, uniformCacheMap, uniformLocationMap);
        // sendFloat1(gl, shaderIndex, program, "u_lightIntensity", getIntensity(i, PointLightDataFromSystem), uniformCacheMap, uniformLocationMap);
        // sendFloat1(gl, shaderIndex, program, "u_lightConstant", constant, uniformCacheMap, uniformLocationMap);
        // sendFloat1(gl, shaderIndex, program, "u_lightLinear", linear, uniformCacheMap, uniformLocationMap);
        // sendFloat1(gl, shaderIndex, program, "u_lightQuadratic", quadratic, uniformCacheMap, uniformLocationMap);
        //
        // sendFloat1(gl, shaderIndex, program, "u_lightRadius", radius, uniformCacheMap, uniformLocationMap);

        bindPointLightUboData(gl, i, sendDataMap.pointLightData, drawDataMap, GLSLSenderDataFromSystem);

        drawFullScreenQuad(gl, DeferLightPassDataFromSystem);
    }

    unbindVao(gl);

    // restore state:
    //// gl.cullFace(gl.BACK);
    // gl.disable(gl.SCISSOR_TEST);
}
