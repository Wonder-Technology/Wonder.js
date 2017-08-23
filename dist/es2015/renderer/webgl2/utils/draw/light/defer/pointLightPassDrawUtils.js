import { getViewport, setScissorTest } from "../../../../../utils/worker/both_file/device/deviceManagerUtils";
import { drawFullScreenQuad, getScissorRegionArrayCache, sendAttributeData, setScissorRegionArrayCache } from "../../../render/light/defer/light/deferLightPassUtils";
import { getNoMaterialShaderIndex } from "../../../worker/render_file/shader/shaderUtils";
import { bindPointLightUboData } from "../../../worker/render_file/ubo/uboManagerUtils";
import { Vector4 } from "../../../../../../math/Vector4";
import { Vector2 } from "../../../../../../math/Vector2";
export var drawPointLightPass = function (gl, state, use, drawDataMap, pointLightData, pointLightCount, vMatrix, pMatrix, DeferPointLightPassDataFromSystem, ShaderDataFromSystem, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem) {
    var _a = getViewport(state), x = _a.x, y = _a.y, width = _a.width, height = _a.height, DeviceManagerDataFromSystem = drawDataMap.DeviceManagerDataFromSystem, PointLightDataFromSystem = drawDataMap.PointLightDataFromSystem, shaderIndex = null, getPosition = pointLightData.getPosition, getColorArr3 = pointLightData.getColorArr3, getIntensity = pointLightData.getIntensity, getConstant = pointLightData.getConstant, getLinear = pointLightData.getLinear, getQuadratic = pointLightData.getQuadratic, computeRadius = pointLightData.computeRadius, isPositionDirty = pointLightData.isPositionDirty, isColorDirty = pointLightData.isColorDirty, isIntensityDirty = pointLightData.isIntensityDirty, isAttenuationDirty = pointLightData.isAttenuationDirty, PointLightDataFromSystem = pointLightData.PointLightDataFromSystem, position = null, colorArr3 = null, intensity = null, constant = null, linear = null, quadratic = null, radius = null, sc = null, isScDirtyFlag = null;
    _setState(gl, DeviceManagerDataFromSystem);
    sendAttributeData(gl, ProgramDataFromSystem, DeferPointLightPassDataFromSystem);
    shaderIndex = getNoMaterialShaderIndex("DeferPointLightPass", ShaderDataFromSystem);
    use(gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem);
    for (var i = 0; i < pointLightCount; i++) {
        var isIntensityDirtyFlag = isIntensityDirty(i, PointLightDataFromSystem), isPositionDirtyFlag = isPositionDirty(i, PointLightDataFromSystem), isColorDirtyFlag = isColorDirty(i, PointLightDataFromSystem), isAttenuationDirtyFlag = isAttenuationDirty(i, PointLightDataFromSystem);
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
};
var _setState = function (gl, DeviceManagerDataFromSystem) {
    setScissorTest(gl, true, DeviceManagerDataFromSystem);
};
var _restoreState = function (gl, DeviceManagerDataFromSystem) {
    setScissorTest(gl, false, DeviceManagerDataFromSystem);
};
var _getFullScreenVal = function () { return 1; };
var _getNotInScreenVal = function () { return 2; };
var _getBoxMinPointInScreenCoordinate = function (lightPosition, vMatrix, pMatrix, radius) {
    lightPosition.applyMatrix4(vMatrix, true);
    lightPosition.x -= radius;
    lightPosition.y -= radius;
    lightPosition.z += radius;
    lightPosition.applyMatrix4(pMatrix, true);
    lightPosition.divideScalar(lightPosition.w);
    return lightPosition;
};
var _getBoxMaxPointInScreenCoordinate = function (lightPosition, vMatrix, pMatrix, radius) {
    lightPosition.applyMatrix4(vMatrix, true);
    lightPosition.x += radius;
    lightPosition.y += radius;
    lightPosition.z += radius;
    lightPosition.applyMatrix4(pMatrix, true);
    lightPosition.divideScalar(lightPosition.w);
    return lightPosition;
};
var _getScissorForLight = function (vMatrix, pMatrix, position, radius, width, height) {
    var a = Vector4.create(position[0], position[1], position[2], 1), b = Vector4.create(position[0], position[1], position[2], 1), minpt = null, maxpt = null, ret = [];
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
    var x = minpt.x, y = minpt.y, ptWidth = maxpt.x - x, ptHeight = maxpt.y - y;
    if (ptWidth < 0 || ptHeight < 0 || (x + ptWidth) < 0 || (y + ptHeight) < 0) {
        return _getNotInScreenVal();
    }
    ret[0] = Math.round(width * x);
    ret[1] = Math.round(height * y);
    ret[2] = Math.round(width * ptWidth);
    ret[3] = Math.round(height * ptHeight);
    return ret;
};
var _buildPointLightValueDataMap = function (position, colorArr3, intensity, constant, linear, quadratic, radius, isIntensityDirty, isOtherValueDirty) {
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
    };
};
//# sourceMappingURL=pointLightPassDrawUtils.js.map