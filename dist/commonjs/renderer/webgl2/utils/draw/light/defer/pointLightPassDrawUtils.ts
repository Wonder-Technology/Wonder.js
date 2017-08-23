import {
    IWebGL2DrawDataMap,
    IWebGL2SendUniformDataPointLightDataMap
} from "../../../worker/render_file/interface/IUtils";
import { Map } from "immutable";
import { getViewport, setScissorTest } from "../../../../../utils/worker/both_file/device/deviceManagerUtils";
import {
    drawFullScreenQuad,
    getScissorRegionArrayCache, sendAttributeData,
    setScissorRegionArrayCache
} from "../../../render/light/defer/light/deferLightPassUtils";
import { getNoMaterialShaderIndex } from "../../../worker/render_file/shader/shaderUtils";
import { bindPointLightUboData } from "../../../worker/render_file/ubo/uboManagerUtils";
import { Vector4 } from "../../../../../../math/Vector4";
import { Vector2 } from "../../../../../../math/Vector2";

export var drawPointLightPass = (gl: any, state: Map<any, any>, use: Function, drawDataMap: IWebGL2DrawDataMap, pointLightData: IWebGL2SendUniformDataPointLightDataMap, pointLightCount: number, vMatrix: Float32Array, pMatrix: Float32Array, DeferPointLightPassDataFromSystem: any, ShaderDataFromSystem, ProgramDataFromSystem: any, LocationDataFromSystem: any, GLSLSenderDataFromSystem: any) => {
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
        shaderIndex: number = null,
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
        position: Float32Array = null,
        colorArr3: Array<number> = null,
        intensity: number = null,
        constant: number = null,
        linear: number = null,
        quadratic: number = null,
        radius: number = null,
        sc: Array<number> | number = null,
        isScDirtyFlag: boolean = null;

    _setState(gl, DeviceManagerDataFromSystem);

    sendAttributeData(gl, ProgramDataFromSystem, DeferPointLightPassDataFromSystem);

    shaderIndex = getNoMaterialShaderIndex("DeferPointLightPass", ShaderDataFromSystem);

    use(gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem);

    for (let i = 0; i < pointLightCount; i++) {
        let isIntensityDirtyFlag = isIntensityDirty(i, PointLightDataFromSystem),
            isPositionDirtyFlag = isPositionDirty(i, PointLightDataFromSystem),
            isColorDirtyFlag = isColorDirty(i, PointLightDataFromSystem),
            isAttenuationDirtyFlag = isAttenuationDirty(i, PointLightDataFromSystem);

        if (!isPositionDirtyFlag && !isColorDirtyFlag && !isAttenuationDirtyFlag) {
            isScDirtyFlag = false;
        }
        else {
            isScDirtyFlag = true;
        }

        if (!isScDirtyFlag) {
            sc = getScissorRegionArrayCache(i, DeferPointLightPassDataFromSystem);
        }
        else {
            position = getPosition(i, PointLightDataFromSystem);
            colorArr3 = getColorArr3(i, PointLightDataFromSystem);
            constant = getConstant(i, PointLightDataFromSystem);
            linear = getLinear(i, PointLightDataFromSystem);
            quadratic = getQuadratic(i, PointLightDataFromSystem);
            radius = computeRadius(colorArr3, constant, linear, quadratic);

            sc = _getScissorForLight(vMatrix, pMatrix, position, radius, width, height);

            setScissorRegionArrayCache(i, DeferPointLightPassDataFromSystem, sc);
        }

        if (sc === _getNotInScreenVal()) {
            continue;
        }
        else if (sc === _getFullScreenVal()) {
            gl.scissor(x, y, width, height);
        }
        else {
            gl.scissor(sc[0], sc[1], sc[2], sc[3]);
        }

        if (isIntensityDirtyFlag) {
            intensity = getIntensity(i, PointLightDataFromSystem);
        }

        bindPointLightUboData(gl, i, pointLightData, _buildPointLightValueDataMap(position, colorArr3, intensity, constant, linear, quadratic, radius, isIntensityDirtyFlag, isScDirtyFlag), drawDataMap, GLSLSenderDataFromSystem);

        drawFullScreenQuad(gl, DeferPointLightPassDataFromSystem);
    }

    _restoreState(gl, DeviceManagerDataFromSystem);
}

var _setState = (gl: any, DeviceManagerDataFromSystem: any) => {
    setScissorTest(gl, true, DeviceManagerDataFromSystem);

}

var _restoreState = (gl: any, DeviceManagerDataFromSystem: any) => {
    setScissorTest(gl, false, DeviceManagerDataFromSystem);
}

var _getFullScreenVal = () => 1;

var _getNotInScreenVal = () => 2;

var _getBoxMinPointInScreenCoordinate = (lightPosition: Vector4, vMatrix: Float32Array, pMatrix: Float32Array, radius: number) => {
    lightPosition.applyMatrix4(vMatrix, true);
    lightPosition.x -= radius;
    lightPosition.y -= radius;
    lightPosition.z += radius;
    lightPosition.applyMatrix4(pMatrix, true);
    lightPosition.divideScalar(lightPosition.w);

    return lightPosition;
}

var _getBoxMaxPointInScreenCoordinate = (lightPosition: Vector4, vMatrix: Float32Array, pMatrix: Float32Array, radius: number) => {
    lightPosition.applyMatrix4(vMatrix, true);
    lightPosition.x += radius;
    lightPosition.y += radius;
    lightPosition.z += radius;
    lightPosition.applyMatrix4(pMatrix, true);
    lightPosition.divideScalar(lightPosition.w);

    return lightPosition;
}

var _getScissorForLight = (vMatrix: Float32Array, pMatrix: Float32Array, position: Float32Array, radius: number, width: number, height: number) => {
    var a = Vector4.create(position[0], position[1], position[2], 1),
        b = Vector4.create(position[0], position[1], position[2], 1),
        minpt: Vector2 = null,
        maxpt: Vector2 = null,
        ret: Array<number> = [];
    //todo optimize: use tiled-defer shading

    a = _getBoxMinPointInScreenCoordinate(a, vMatrix, pMatrix, radius);
    b = _getBoxMaxPointInScreenCoordinate(b, vMatrix, pMatrix, radius);

    if (a.x > 1 && a.y > 1 && b.x < -1 && b.y < -1) {
        return _getFullScreenVal();
    }

    minpt = Vector2.create(a.x, a.y);
    maxpt = Vector2.create(b.x, b.y);

    minpt.addScalar(1.0);
    minpt.multiplyScalar(0.5);

    maxpt.addScalar(1.0);
    maxpt.multiplyScalar(0.5);

    let x = minpt.x,
        y = minpt.y,
        ptWidth = maxpt.x - x,
        ptHeight = maxpt.y - y;

    if (ptWidth < 0 || ptHeight < 0 || (x + ptWidth) < 0 || (y + ptHeight) < 0) {
        return _getNotInScreenVal();

    }

    ret[0] = Math.round(width * x);
    ret[1] = Math.round(height * y);
    ret[2] = Math.round(width * ptWidth);
    ret[3] = Math.round(height * ptHeight);

    return ret;
};

var _buildPointLightValueDataMap = (position: Float32Array, colorArr3: Array<number>, intensity: number, constant: number, linear: number, quadratic: number, radius: number, isIntensityDirty: boolean, isOtherValueDirty: boolean) => {
    return {
        position: position,
        colorArr3: colorArr3,
        intensity: intensity,
        constant: constant,
        linear: linear,
        quadratic: quadratic,
        radius: radius,

        isIntensityDirty: isIntensityDirty,
        isOtherValueDirty: isOtherValueDirty
    }
}
