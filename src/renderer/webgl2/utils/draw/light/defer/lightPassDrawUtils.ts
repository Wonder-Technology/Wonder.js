import { Map } from "immutable";
import { IRenderConfig } from "../../../../../worker/both_file/data/render_config";
import { InitShaderDataMap } from "../../../../../type/utilsType";
import { getNoMaterialShaderIndex } from "../../../worker/render_file/shader/shaderUtils";
import { unbindVao } from "../../../worker/render_file/vao/vaoUtils";
import {
    drawFullScreenQuad, getScissorRegionArrayCache,
    sendAttributeData, setScissorRegionArrayCache
} from "../../../render/light/defer/light/deferLightPassUtils";
import {
    getViewport, setBlend, setBlendEquation, setBlendFunc, setDepthTest,
    setDepthWrite, setScissorTest
} from "../../../../../utils/worker/both_file/device/deviceManagerUtils";
import { bindDirectionLightUboData, bindPointLightUboData, bindAmbientLightUboData } from "../../../worker/render_file/ubo/uboManagerUtils";
import {
    IWebGL2DrawDataMap, IWebGL2LightSendUniformDataDataMap, IWebGL2SendUniformDataAmbientLightDataMap,
    IWebGL2SendUniformDataDirectionLightDataMap
} from "../../../worker/render_file/interface/IUtils";
import { Vector4 } from "../../../../../../math/Vector4";
import { Vector2 } from "../../../../../../math/Vector2";
import { IWebGL2SendUniformDataPointLightDataMap } from "../../../worker/render_file/interface/IUtils";
import { EBlendEquation } from "../../../../../enum/EBlendEquation";
import { EBlendFunc } from "../../../../../enum/EBlendFunc";

export var drawLightPass = (gl:any, render_config:IRenderConfig, {
    use,
    unbindGBuffer
}, drawDataMap:IWebGL2DrawDataMap, {
                                DeferAmbientLightPassDataFromSystem,
                                DeferDirectionLightPassDataFromSystem,
                                DeferPointLightPassDataFromSystem
                            }, initShaderDataMap:InitShaderDataMap, sendDataMap:IWebGL2LightSendUniformDataDataMap, vMatrix:Float32Array, pMatrix:Float32Array, state:Map<any, any>) => {
    var {
            ShaderDataFromSystem
        } = initShaderDataMap,
        {
            DeviceManagerDataFromSystem,

            AmbientLightDataFromSystem,
            DirectionLightDataFromSystem,
            PointLightDataFromSystem,

            ProgramDataFromSystem,
            LocationDataFromSystem,
            GLSLSenderDataFromSystem
        } = drawDataMap,
        ambientLightCount = AmbientLightDataFromSystem.count,
        directionLightCount = DirectionLightDataFromSystem.count,
        pointLightCount = PointLightDataFromSystem.count;

    unbindGBuffer(gl);

    setDepthWrite(gl, false, DeviceManagerDataFromSystem);
    setDepthTest(gl, false, DeviceManagerDataFromSystem);
    setBlend(gl, true, DeviceManagerDataFromSystem);
    setBlendEquation(gl, EBlendEquation.ADD, DeviceManagerDataFromSystem);
    setBlendFunc(gl, EBlendFunc.ONE, EBlendFunc.ONE, DeviceManagerDataFromSystem);

    if(_hasLight(ambientLightCount)){
        _drawAmbientLightPass(gl, use, drawDataMap,sendDataMap.ambientLightData, ambientLightCount, DeferAmbientLightPassDataFromSystem, ShaderDataFromSystem, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem);
    }

    if(_hasLight(directionLightCount)){
        _drawDirectionLightPass(gl, use, drawDataMap,sendDataMap.directionLightData, directionLightCount, DeferDirectionLightPassDataFromSystem, ShaderDataFromSystem, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem);
    }

    if(_hasLight(pointLightCount)){
        _drawPointLightPass(gl, state, use, drawDataMap,sendDataMap.pointLightData, pointLightCount, vMatrix, pMatrix, DeferPointLightPassDataFromSystem, ShaderDataFromSystem, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem);
    }

    unbindVao(gl);

    _restoreState(gl, DeviceManagerDataFromSystem);
}

var _hasLight = (count:number) => count > 0;

var _drawAmbientLightPass = (gl:any, use:Function, drawDataMap:IWebGL2DrawDataMap, ambientLightData:IWebGL2SendUniformDataAmbientLightDataMap, ambientLightCount:number, DeferAmbientLightPassDataFromSystem:any, ShaderDataFromSystem, ProgramDataFromSystem:any, LocationDataFromSystem:any, GLSLSenderDataFromSystem:any) => {
    var shaderIndex:number = null;

    sendAttributeData(gl, ProgramDataFromSystem, DeferAmbientLightPassDataFromSystem);

    shaderIndex = getNoMaterialShaderIndex("DeferAmbientLightPass", ShaderDataFromSystem);

    use(gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem);

    let {
        getColorArr3,

        isColorDirty,

        AmbientLightDataFromSystem
    } = ambientLightData;

    for (let i = 0; i < ambientLightCount; i++) {
        let colorArr3:Array<number> = null,
            isColorDirtyFlag = isColorDirty(i, AmbientLightDataFromSystem);

        if(isColorDirtyFlag){
            colorArr3 = getColorArr3(i, AmbientLightDataFromSystem);
        }

        bindAmbientLightUboData(gl, i, ambientLightData, _buildAmbientLightValueDataMap(colorArr3, isColorDirtyFlag), drawDataMap, GLSLSenderDataFromSystem);

        drawFullScreenQuad(gl, DeferAmbientLightPassDataFromSystem);
    }
}

var _buildAmbientLightValueDataMap = (colorArr3: Array<number>, isColorDirty:boolean) => {
    return {
        colorArr3:colorArr3,

        isColorDirty: isColorDirty
    }
}

var _drawDirectionLightPass = (gl:any, use:Function, drawDataMap:IWebGL2DrawDataMap, directionLightData:IWebGL2SendUniformDataDirectionLightDataMap, directionLightCount:number, DeferDirectionLightPassDataFromSystem:any, ShaderDataFromSystem, ProgramDataFromSystem:any, LocationDataFromSystem:any, GLSLSenderDataFromSystem:any) => {
    var shaderIndex:number = null;

    sendAttributeData(gl, ProgramDataFromSystem, DeferDirectionLightPassDataFromSystem);

    shaderIndex = getNoMaterialShaderIndex("DeferDirectionLightPass", ShaderDataFromSystem);

    use(gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem);

    let {
        getPosition,

        getColorArr3,
        getIntensity,

        isPositionDirty,
        isColorDirty,
        isIntensityDirty,

        DirectionLightDataFromSystem
    } = directionLightData;

    for (let i = 0; i < directionLightCount; i++) {
        let position:Float32Array = null,
            colorArr3:Array<number> = null,
            intensity:number = null,
            isIntensityDirtyFlag = isIntensityDirty(i, DirectionLightDataFromSystem),
            isPositionDirtyFlag = isPositionDirty(i, DirectionLightDataFromSystem),
            isColorDirtyFlag = isColorDirty(i, DirectionLightDataFromSystem);

        if(isPositionDirtyFlag){
            position = getPosition(i, DirectionLightDataFromSystem);
        }

        if(isColorDirtyFlag){
            colorArr3 = getColorArr3(i, DirectionLightDataFromSystem);
        }

        if(isIntensityDirtyFlag){
            intensity = getIntensity(i, DirectionLightDataFromSystem);
        }

        bindDirectionLightUboData(gl, i, directionLightData, _buildDirectionLightValueDataMap(position, colorArr3, intensity, isPositionDirtyFlag, isColorDirtyFlag,  isIntensityDirtyFlag), drawDataMap, GLSLSenderDataFromSystem);

        drawFullScreenQuad(gl, DeferDirectionLightPassDataFromSystem);
    }
}

var _buildDirectionLightValueDataMap = (position: Float32Array, colorArr3: Array<number>, intensity: number, isPositionDirty:boolean, isColorDirty:boolean, isIntensityDirty:boolean) => {
    return {
        position: position,
        colorArr3:colorArr3,
        intensity:intensity,

        isPositionDirty: isPositionDirty,
        isColorDirty: isColorDirty,
        isIntensityDirty: isIntensityDirty
    }
}

var _drawPointLightPass = (gl:any, state:Map<any, any>, use:Function, drawDataMap:IWebGL2DrawDataMap, pointLightData:IWebGL2SendUniformDataPointLightDataMap, pointLightCount:number, vMatrix:Float32Array, pMatrix:Float32Array, DeferPointLightPassDataFromSystem:any, ShaderDataFromSystem, ProgramDataFromSystem:any, LocationDataFromSystem:any, GLSLSenderDataFromSystem:any) => {
    var {
            x,
            y,
            width,
            height
        } = getViewport(state),
        {
            DeviceManagerDataFromSystem,
            PointLightDataFromSystem
        } = drawDataMap,
        shaderIndex:number = null,
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
            isAttenuationDirty,

            PointLightDataFromSystem
        } = pointLightData,
        position:Float32Array = null,
        colorArr3:Array<number> = null,
        intensity:number = null,
        constant:number = null,
        linear:number = null,
        quadratic:number = null,
        radius:number = null,
        sc:Array<number> = null,
        isScDirtyFlag:boolean = null;

    _setState(gl, DeviceManagerDataFromSystem);

    sendAttributeData(gl, ProgramDataFromSystem, DeferPointLightPassDataFromSystem);

    shaderIndex = getNoMaterialShaderIndex("DeferPointLightPass", ShaderDataFromSystem);

    use(gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem);

    for (let i = 0; i < pointLightCount; i++) {
        let isIntensityDirtyFlag = isIntensityDirty(i, PointLightDataFromSystem),
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
            sc = getScissorRegionArrayCache(i, DeferPointLightPassDataFromSystem);
        }
        else{
            position = getPosition(i, PointLightDataFromSystem);
            colorArr3 = getColorArr3(i, PointLightDataFromSystem);
            constant = getConstant(i, PointLightDataFromSystem);
            linear = getLinear(i, PointLightDataFromSystem);
            quadratic = getQuadratic(i, PointLightDataFromSystem);
            radius = computeRadius(colorArr3, constant, linear, quadratic);

            sc = _getScissorForLight(vMatrix, pMatrix, position, radius, width, height);

            setScissorRegionArrayCache(i, DeferPointLightPassDataFromSystem, sc);
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

        drawFullScreenQuad(gl, DeferPointLightPassDataFromSystem);
    }
}

var _setState = (gl:any, DeviceManagerDataFromSystem:any) => {
    setScissorTest(gl, true, DeviceManagerDataFromSystem);

}

var _restoreState = (gl:any, DeviceManagerDataFromSystem:any) => {
    setScissorTest(gl, false, DeviceManagerDataFromSystem);
}

var _getScissorForLight = (vMatrix:Float32Array, pMatrix:Float32Array, position:Float32Array, radius:number, width:number, height:number) => {
    var a = Vector4.create(position[0], position[1], position[2], 1),
        b = Vector4.create(position[0], position[1], position[2], 1),
        minpt:Vector2 = null,
        maxpt:Vector2 = null,
        ret:Array<number> = [];
    //todo optimize: use tiled-defer shading

    // front bottom-left corner of sphere's bounding cube
    a.applyMatrix4(vMatrix, true);
    a.x -= radius;
    a.y -= radius;
    a.z += radius;
    a.applyMatrix4(pMatrix, true);
    a.divideScalar(a.w);

    // front bottom-left corner of sphere's bounding cube
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
