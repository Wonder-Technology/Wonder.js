import { Map } from "immutable";
import { IRenderConfig } from "../../../../../worker/both_file/data/render_config";
import { InitShaderDataMap } from "../../../../../type/utilsType";
import { getNoMaterialShaderIndex } from "../../../worker/render_file/shader/shaderUtils";
import { unbindVao } from "../../../worker/render_file/vao/vaoUtils";
import {
    drawFullScreenQuad, getScissorRegionArrayCache,
    sendAttributeData, setScissorRegionArrayCache
} from "../../../render/light/defer/light/deferLightPassUtils";
import { getViewport } from "../../../../../utils/worker/both_file/device/deviceManagerUtils";
import { bindDirectionLightUboData, bindPointLightUboData } from "../../../worker/render_file/ubo/uboManagerUtils";
import { IWebGL2DrawDataMap, IWebGL2LightSendUniformDataDataMap } from "../../../worker/render_file/interface/IUtils";
import { Vector4 } from "../../../../../../math/Vector4";
import { Vector2 } from "../../../../../../math/Vector2";
import { IWebGL2SendUniformDataPointLightDataMap } from "../../../worker/render_file/interface/IUtils";

export var drawLightPass = (gl:any, render_config:IRenderConfig, {
    use,
    unbindGBuffer
}, drawDataMap:IWebGL2DrawDataMap, {
                                DeferDirectionLightPassDataFromSystem,
    DeferPointLightPassDataFromSystem
                            }, initShaderDataMap:InitShaderDataMap, sendDataMap:IWebGL2LightSendUniformDataDataMap, vMatrix:Float32Array, pMatrix:Float32Array, state:Map<any, any>) => {
    var {
            ShaderDataFromSystem
        } = initShaderDataMap,
        {
            ProgramDataFromSystem,
            LocationDataFromSystem,
            GLSLSenderDataFromSystem,
            DirectionLightDataFromSystem,
            PointLightDataFromSystem
        } = drawDataMap,
        directionLightData = sendDataMap.directionLightData,
        shaderIndex:number = null;

    unbindGBuffer(gl);


    gl.depthMask(false);
    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendEquation(gl.FUNC_ADD);
    gl.blendFunc(gl.ONE, gl.ONE);





    //todo refactor: extract direction light, point light draw


    sendAttributeData(gl, DeferDirectionLightPassDataFromSystem);


    shaderIndex = getNoMaterialShaderIndex("DeferDirectionLightPass", ShaderDataFromSystem);

    use(gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem);


    for (let i = 0, count = DirectionLightDataFromSystem.count; i < count; i++) {
        let {
                GLSLSenderDataFromSystem
            } = drawDataMap,
            {
                getPosition,

                getColorArr3,
                getIntensity,

                isPositionDirty,
                isColorDirty,
                isIntensityDirty,

                DirectionLightDataFromSystem
            } = directionLightData,
            position:Float32Array = null,
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


    _setState(gl);

    let {
        x,
        y,
        width,
        height
    } = getViewport(state),
        pointLightData = sendDataMap.pointLightData;

    sendAttributeData(gl, DeferPointLightPassDataFromSystem);

    shaderIndex = getNoMaterialShaderIndex("DeferPointLightPass", ShaderDataFromSystem);

    use(gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem);

    //todo support ambient light

    for (let i = 0, count = PointLightDataFromSystem.count; i < count; i++) {
        _draw(gl, i, drawDataMap, pointLightData, x, y, width, height, vMatrix, pMatrix, DeferPointLightPassDataFromSystem);
    }

    unbindVao(gl);

    _restoreState(gl);
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





var _setState = (gl:any) => {
    gl.enable(gl.SCISSOR_TEST);

}

var _restoreState = (gl:any) => {
    gl.disable(gl.SCISSOR_TEST);
}

var _draw = (gl:any, i:number, drawDataMap:IWebGL2DrawDataMap, pointLightData:IWebGL2SendUniformDataPointLightDataMap, x:number, y:number, width:number, height:number, vMatrix:Float32Array, pMatrix:Float32Array, DeferLightPassDataFromSystem:any) => {
    var {
            GLSLSenderDataFromSystem
        } = drawDataMap,
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
        isScDirtyFlag:boolean = null,
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
