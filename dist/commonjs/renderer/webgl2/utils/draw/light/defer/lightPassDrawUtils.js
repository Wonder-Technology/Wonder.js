"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shaderUtils_1 = require("../../../worker/render_file/shader/shaderUtils");
var vaoUtils_1 = require("../../../worker/render_file/vao/vaoUtils");
var deferLightPassUtils_1 = require("../../../render/light/defer/light/deferLightPassUtils");
var deviceManagerUtils_1 = require("../../../../../utils/worker/both_file/device/deviceManagerUtils");
var uboManagerUtils_1 = require("../../../worker/render_file/ubo/uboManagerUtils");
var EBlendEquation_1 = require("../../../../../enum/EBlendEquation");
var EBlendFunc_1 = require("../../../../../enum/EBlendFunc");
var pointLightPassDrawUtils_1 = require("./pointLightPassDrawUtils");
exports.drawLightPass = function (gl, render_config, _a, drawDataMap, _b, initShaderDataMap, sendDataMap, vMatrix, pMatrix, state) {
    var use = _a.use, unbindGBuffer = _a.unbindGBuffer;
    var DeferAmbientLightPassDataFromSystem = _b.DeferAmbientLightPassDataFromSystem, DeferDirectionLightPassDataFromSystem = _b.DeferDirectionLightPassDataFromSystem, DeferPointLightPassDataFromSystem = _b.DeferPointLightPassDataFromSystem;
    var ShaderDataFromSystem = initShaderDataMap.ShaderDataFromSystem, DeviceManagerDataFromSystem = drawDataMap.DeviceManagerDataFromSystem, AmbientLightDataFromSystem = drawDataMap.AmbientLightDataFromSystem, DirectionLightDataFromSystem = drawDataMap.DirectionLightDataFromSystem, PointLightDataFromSystem = drawDataMap.PointLightDataFromSystem, ProgramDataFromSystem = drawDataMap.ProgramDataFromSystem, LocationDataFromSystem = drawDataMap.LocationDataFromSystem, GLSLSenderDataFromSystem = drawDataMap.GLSLSenderDataFromSystem, ambientLightCount = AmbientLightDataFromSystem.count, directionLightCount = DirectionLightDataFromSystem.count, pointLightCount = PointLightDataFromSystem.count;
    unbindGBuffer(gl);
    deviceManagerUtils_1.setDepthWrite(gl, false, DeviceManagerDataFromSystem);
    deviceManagerUtils_1.setDepthTest(gl, false, DeviceManagerDataFromSystem);
    deviceManagerUtils_1.setBlend(gl, true, DeviceManagerDataFromSystem);
    deviceManagerUtils_1.setBlendEquation(gl, EBlendEquation_1.EBlendEquation.ADD, DeviceManagerDataFromSystem);
    deviceManagerUtils_1.setBlendFunc(gl, EBlendFunc_1.EBlendFunc.ONE, EBlendFunc_1.EBlendFunc.ONE, DeviceManagerDataFromSystem);
    if (_hasLight(ambientLightCount)) {
        _drawAmbientLightPass(gl, use, drawDataMap, sendDataMap.ambientLightData, ambientLightCount, DeferAmbientLightPassDataFromSystem, ShaderDataFromSystem, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem);
    }
    if (_hasLight(directionLightCount)) {
        _drawDirectionLightPass(gl, use, drawDataMap, sendDataMap.directionLightData, directionLightCount, DeferDirectionLightPassDataFromSystem, ShaderDataFromSystem, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem);
    }
    if (_hasLight(pointLightCount)) {
        pointLightPassDrawUtils_1.drawPointLightPass(gl, state, use, drawDataMap, sendDataMap.pointLightData, pointLightCount, vMatrix, pMatrix, DeferPointLightPassDataFromSystem, ShaderDataFromSystem, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem);
    }
    vaoUtils_1.unbindVao(gl);
};
var _hasLight = function (count) { return count > 0; };
var _drawAmbientLightPass = function (gl, use, drawDataMap, ambientLightData, ambientLightCount, DeferAmbientLightPassDataFromSystem, ShaderDataFromSystem, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem) {
    var shaderIndex = null;
    deferLightPassUtils_1.sendAttributeData(gl, ProgramDataFromSystem, DeferAmbientLightPassDataFromSystem);
    shaderIndex = shaderUtils_1.getNoMaterialShaderIndex("DeferAmbientLightPass", ShaderDataFromSystem);
    use(gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem);
    var getColorArr3 = ambientLightData.getColorArr3, isColorDirty = ambientLightData.isColorDirty, AmbientLightDataFromSystem = ambientLightData.AmbientLightDataFromSystem;
    for (var i = 0; i < ambientLightCount; i++) {
        var colorArr3 = null, isColorDirtyFlag = isColorDirty(i, AmbientLightDataFromSystem);
        if (isColorDirtyFlag) {
            colorArr3 = getColorArr3(i, AmbientLightDataFromSystem);
        }
        uboManagerUtils_1.bindAmbientLightUboData(gl, i, ambientLightData, _buildAmbientLightValueDataMap(colorArr3, isColorDirtyFlag), drawDataMap, GLSLSenderDataFromSystem);
        deferLightPassUtils_1.drawFullScreenQuad(gl, DeferAmbientLightPassDataFromSystem);
    }
};
var _buildAmbientLightValueDataMap = function (colorArr3, isColorDirty) {
    return {
        colorArr3: colorArr3,
        isColorDirty: isColorDirty
    };
};
var _drawDirectionLightPass = function (gl, use, drawDataMap, directionLightData, directionLightCount, DeferDirectionLightPassDataFromSystem, ShaderDataFromSystem, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem) {
    var shaderIndex = null;
    deferLightPassUtils_1.sendAttributeData(gl, ProgramDataFromSystem, DeferDirectionLightPassDataFromSystem);
    shaderIndex = shaderUtils_1.getNoMaterialShaderIndex("DeferDirectionLightPass", ShaderDataFromSystem);
    use(gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem);
    var getPosition = directionLightData.getPosition, getColorArr3 = directionLightData.getColorArr3, getIntensity = directionLightData.getIntensity, isPositionDirty = directionLightData.isPositionDirty, isColorDirty = directionLightData.isColorDirty, isIntensityDirty = directionLightData.isIntensityDirty, DirectionLightDataFromSystem = directionLightData.DirectionLightDataFromSystem;
    for (var i = 0; i < directionLightCount; i++) {
        var position = null, colorArr3 = null, intensity = null, isIntensityDirtyFlag = isIntensityDirty(i, DirectionLightDataFromSystem), isPositionDirtyFlag = isPositionDirty(i, DirectionLightDataFromSystem), isColorDirtyFlag = isColorDirty(i, DirectionLightDataFromSystem);
        if (isPositionDirtyFlag) {
            position = getPosition(i, DirectionLightDataFromSystem);
        }
        if (isColorDirtyFlag) {
            colorArr3 = getColorArr3(i, DirectionLightDataFromSystem);
        }
        if (isIntensityDirtyFlag) {
            intensity = getIntensity(i, DirectionLightDataFromSystem);
        }
        uboManagerUtils_1.bindDirectionLightUboData(gl, i, directionLightData, _buildDirectionLightValueDataMap(position, colorArr3, intensity, isPositionDirtyFlag, isColorDirtyFlag, isIntensityDirtyFlag), drawDataMap, GLSLSenderDataFromSystem);
        deferLightPassUtils_1.drawFullScreenQuad(gl, DeferDirectionLightPassDataFromSystem);
    }
};
var _buildDirectionLightValueDataMap = function (position, colorArr3, intensity, isPositionDirty, isColorDirty, isIntensityDirty) {
    return {
        position: position,
        colorArr3: colorArr3,
        intensity: intensity,
        isPositionDirty: isPositionDirty,
        isColorDirty: isColorDirty,
        isIntensityDirty: isIntensityDirty
    };
};
//# sourceMappingURL=lightPassDrawUtils.js.map