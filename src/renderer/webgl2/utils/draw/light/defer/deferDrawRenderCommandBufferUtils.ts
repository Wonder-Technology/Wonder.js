import { Map } from "immutable";
import { IRenderConfig } from "../../../../../worker/both_file/data/render_config";
import { IMaterialConfig } from "../../../../../data/material_config_interface";
import { IShaderLibGenerator } from "../../../../../data/shaderLib_generator_interface";
import { DeferDrawDataMap, InitShaderDataMap } from "../../../../../type/utilsType";
import { IWebGL2DeferDrawFuncDataMap } from "../../../../interface/Idraw";
import {
     LightRenderUniformData
} from "../../../../../type/dataType";
import { buildRenderCommandUniformData } from "../../../../../utils/draw/light/lightDrawRenderCommandBufferUtils";
import { getNewTextureUnitIndex } from "../../../worker/render_file/render/light/defer/gbuffer/gBufferUtils";
import { getNoMaterialShaderIndex } from "../../../worker/render_file/shader/shaderUtils";
import { unbindVao } from "../../../worker/render_file/vao/vaoUtils";
import {
    drawFullScreenQuad, getScissorRegionArrayCache,
    sendAttributeData, setScissorRegionArrayCache
} from "../../../render/light/defer/light/deferLightPassUtils";
import { clear, getViewport } from "../../../../../utils/worker/both_file/device/deviceManagerUtils";
import { bindPointLightUboData } from "../../../worker/render_file/ubo/uboManagerUtils";
import { LightRenderCommandBufferForDrawData } from "../../../../../utils/worker/render_file/type/dataType";
import { drawGameObjects } from "../../../worker/render_file/draw/drawRenderCommandBufferUtils";
import { IWebGL2DrawDataMap, IWebGL2LightSendUniformDataDataMap } from "../../../worker/render_file/interface/IUtils";
import { Vector4 } from "../../../../../../math/Vector4";
import { Vector2 } from "../../../../../../math/Vector2";

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

    _drawGBufferPass(gl, state, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawFuncDataMap, drawDataMap, deferDrawDataMap, initShaderDataMap, sendDataMap, buildRenderCommandUniformData(mMatrixFloatArrayForSend, vMatrix, pMatrix, cameraPosition, normalMatrix), bufferData);
    _drawLightPass(gl, render_config, drawFuncDataMap, drawDataMap, deferDrawDataMap, initShaderDataMap, sendDataMap, vMatrix, pMatrix, state);
};

var _drawGBufferPass = (gl: any, state: Map<any, any>, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, DataBufferConfig: any, initMaterialShader: Function, drawFuncDataMap:IWebGL2DeferDrawFuncDataMap, drawDataMap: IWebGL2DrawDataMap, {
    GBufferDataFromSystem
}, initShaderDataMap: InitShaderDataMap, sendDataMap:IWebGL2LightSendUniformDataDataMap, renderCommandUniformData: LightRenderUniformData, bufferData: LightRenderCommandBufferForDrawData) => {
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
                      }, drawDataMap:IWebGL2DrawDataMap, {
                          DeferLightPassDataFromSystem
                      }, initShaderDataMap:InitShaderDataMap, sendDataMap:IWebGL2LightSendUniformDataDataMap, vMatrix:Float32Array, pMatrix:Float32Array, state:Map<any, any>) => {
    //todo refactor
    var {
            ShaderDataFromSystem
        } = initShaderDataMap,
        {
            ProgramDataFromSystem,
            LocationDataFromSystem,
            GLSLSenderDataFromSystem,
            PointLightDataFromSystem
        } = drawDataMap,
        pointLightData = sendDataMap.pointLightData,
        {
            getPosition,

            getColorArr3,
            getIntensity,
            getConstant,
            getLinear,
            getQuadratic,
            computeRadius,

            isPositionDirty,
            isColorDirty,
            isIntensityDirty,
            isAttenuationDirty
        } = pointLightData;

    unbindGBuffer(gl);

    gl.depthMask(false);
    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendEquation(gl.FUNC_ADD);
    gl.blendFunc(gl.ONE, gl.ONE);

    gl.enable(gl.SCISSOR_TEST);

    let shaderIndex = getNoMaterialShaderIndex("DeferLightPass", ShaderDataFromSystem),
        program = use(gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem),
        {
            x,
            y,
            width,
            height
        } = getViewport(state);

    sendAttributeData(gl, DeferLightPassDataFromSystem);

    //todo support ambient, direction light

    for (let i = 0, count = PointLightDataFromSystem.count; i < count; i++) {
        let position:Float32Array = null,
            colorArr3:Array<number> = null,
            intensity:number = null,
            constant:number = null,
            linear:number = null,
            quadratic:number = null,
            radius:number = null,
            sc:Array<number> = null;

        let isScDirtyFlag:boolean = null,
            isIntensityDirtyFlag = isIntensityDirty(i, PointLightDataFromSystem),
            isPositionDirtyFlag = isPositionDirty(i, PointLightDataFromSystem),
            isColorDirtyFlag = isColorDirty(i, PointLightDataFromSystem),
            isAttenuationDirtyFlag = isAttenuationDirty(i, PointLightDataFromSystem);

        if(!isPositionDirtyFlag && !isColorDirtyFlag && !isAttenuationDirtyFlag){
            isScDirtyFlag = false;
        }
        else{
            isScDirtyFlag = true;
        }

        if(!isScDirtyFlag){
            sc = getScissorRegionArrayCache(i, DeferLightPassDataFromSystem);
        }
        else{
            position = getPosition(i, PointLightDataFromSystem);
            colorArr3 = getColorArr3(i, PointLightDataFromSystem);
            constant = getConstant(i, PointLightDataFromSystem);
            linear = getLinear(i, PointLightDataFromSystem);
            quadratic = getQuadratic(i, PointLightDataFromSystem);
            radius = computeRadius(colorArr3, constant, linear, quadratic);

            sc = _getScissorForLight(vMatrix, pMatrix, position, radius, width, height);

            setScissorRegionArrayCache(i, DeferLightPassDataFromSystem, sc);
        }

        if (sc !== null) {
            gl.scissor(sc[0], sc[1], sc[2], sc[3]);
        }
        else{
            gl.scissor(x, y, width, height);
        }

        if(isIntensityDirtyFlag){
            intensity = getIntensity(i, PointLightDataFromSystem);
        }

        bindPointLightUboData(gl, i, pointLightData, _buildPointLightValueDataMap(position, colorArr3, intensity, constant, linear, quadratic, radius, isIntensityDirtyFlag, isScDirtyFlag), drawDataMap, GLSLSenderDataFromSystem);

        drawFullScreenQuad(gl, DeferLightPassDataFromSystem);
    }

    unbindVao(gl);

    gl.disable(gl.SCISSOR_TEST);
}

var _getScissorForLight = (vMatrix:Float32Array, pMatrix:Float32Array, position:Float32Array, radius:number, width:number, height:number) => {
    var a = Vector4.create(position[0], position[1], position[2], 1),
        b = Vector4.create(position[0], position[1], position[2], 1),
        minpt:Vector2 = null,
        maxpt:Vector2 = null,
        ret:Array<number> = [];
    //todo optimize: use tiled-defer shading

    // front bottom-left corner of sphere's bounding cube
    // a.set(position[0], position[1], position[2], 1);

    // a.w = 1;
    a.applyMatrix4(vMatrix, true);
    a.x -= radius;
    a.y -= radius;
    a.z += radius;
    a.applyMatrix4(pMatrix, true);
    a.divideScalar(a.w);

    // front bottom-left corner of sphere's bounding cube
    // b.set(position[0], position[1], position[2], 1);
    // b.w = 1;
    b.applyMatrix4(vMatrix, true);
    b.x += radius;
    b.y += radius;
    b.z += radius;
    b.applyMatrix4(pMatrix, true);
    b.divideScalar(b.w);

    minpt = Vector2.create(Math.max(-1, a.x), Math.max(-1, a.y));
    maxpt = Vector2.create(Math.min( 1, b.x), Math.min( 1, b.y));

    if (maxpt.x < -1 || 1 < minpt.x ||
        maxpt.y < -1 || 1 < minpt.y) {
        return null;
    }

    minpt.addScalar(1.0);
    minpt.multiplyScalar(0.5);

    maxpt.addScalar(1.0);
    maxpt.multiplyScalar(0.5);

    ret[0] = Math.round(width * minpt.x);
    ret[1] = Math.round(height * minpt.y);
    ret[2] = Math.round(width * (maxpt.x - minpt.x));
    ret[3] = Math.round(height * (maxpt.y - minpt.y));

    return ret;
};

var _buildPointLightValueDataMap = (position: Float32Array, colorArr3: Array<number>, intensity: number, constant: number, linear: number, quadratic: number, radius: number, isIntensityDirty:boolean, isOtherValueDirty:boolean) => {
    return {
        position: position,
        colorArr3:colorArr3,
        intensity:intensity,
        constant:constant,
        linear:linear,
        quadratic:quadratic,
        radius:radius,

        isIntensityDirty: isIntensityDirty,
        isOtherValueDirty: isOtherValueDirty
    }
}

// var _isValueDirty = (value:any) => value !== null;
