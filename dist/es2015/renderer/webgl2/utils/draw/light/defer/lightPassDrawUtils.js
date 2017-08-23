import { getNoMaterialShaderIndex } from "../../../worker/render_file/shader/shaderUtils";
import { unbindVao } from "../../../worker/render_file/vao/vaoUtils";
import { drawFullScreenQuad, sendAttributeData } from "../../../render/light/defer/light/deferLightPassUtils";
import { setBlend, setBlendEquation, setBlendFunc, setDepthTest, setDepthWrite } from "../../../../../utils/worker/both_file/device/deviceManagerUtils";
import { bindDirectionLightUboData, bindAmbientLightUboData } from "../../../worker/render_file/ubo/uboManagerUtils";
import { EBlendEquation } from "../../../../../enum/EBlendEquation";
import { EBlendFunc } from "../../../../../enum/EBlendFunc";
import { drawPointLightPass } from "./pointLightPassDrawUtils";
export var drawLightPass = function (gl, render_config, _a, drawDataMap, _b, initShaderDataMap, sendDataMap, vMatrix, pMatrix, state) {
    var use = _a.use, unbindGBuffer = _a.unbindGBuffer;
    var DeferAmbientLightPassDataFromSystem = _b.DeferAmbientLightPassDataFromSystem, DeferDirectionLightPassDataFromSystem = _b.DeferDirectionLightPassDataFromSystem, DeferPointLightPassDataFromSystem = _b.DeferPointLightPassDataFromSystem;
    var ShaderDataFromSystem = initShaderDataMap.ShaderDataFromSystem, DeviceManagerDataFromSystem = drawDataMap.DeviceManagerDataFromSystem, AmbientLightDataFromSystem = drawDataMap.AmbientLightDataFromSystem, DirectionLightDataFromSystem = drawDataMap.DirectionLightDataFromSystem, PointLightDataFromSystem = drawDataMap.PointLightDataFromSystem, ProgramDataFromSystem = drawDataMap.ProgramDataFromSystem, LocationDataFromSystem = drawDataMap.LocationDataFromSystem, GLSLSenderDataFromSystem = drawDataMap.GLSLSenderDataFromSystem, ambientLightCount = AmbientLightDataFromSystem.count, directionLightCount = DirectionLightDataFromSystem.count, pointLightCount = PointLightDataFromSystem.count;
    unbindGBuffer(gl);
    setDepthWrite(gl, false, DeviceManagerDataFromSystem);
    setDepthTest(gl, false, DeviceManagerDataFromSystem);
    setBlend(gl, true, DeviceManagerDataFromSystem);
    setBlendEquation(gl, EBlendEquation.ADD, DeviceManagerDataFromSystem);
    setBlendFunc(gl, EBlendFunc.ONE, EBlendFunc.ONE, DeviceManagerDataFromSystem);
    if (_hasLight(ambientLightCount)) {
        _drawAmbientLightPass(gl, use, drawDataMap, sendDataMap.ambientLightData, ambientLightCount, DeferAmbientLightPassDataFromSystem, ShaderDataFromSystem, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem);
    }
    if (_hasLight(directionLightCount)) {
        _drawDirectionLightPass(gl, use, drawDataMap, sendDataMap.directionLightData, directionLightCount, DeferDirectionLightPassDataFromSystem, ShaderDataFromSystem, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem);
    }
    if (_hasLight(pointLightCount)) {
        drawPointLightPass(gl, state, use, drawDataMap, sendDataMap.pointLightData, pointLightCount, vMatrix, pMatrix, DeferPointLightPassDataFromSystem, ShaderDataFromSystem, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem);
    }
    unbindVao(gl);
};
var _hasLight = function (count) { return count > 0; };
var _drawAmbientLightPass = function (gl, use, drawDataMap, ambientLightData, ambientLightCount, DeferAmbientLightPassDataFromSystem, ShaderDataFromSystem, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem) {
    var shaderIndex = null;
    sendAttributeData(gl, ProgramDataFromSystem, DeferAmbientLightPassDataFromSystem);
    shaderIndex = getNoMaterialShaderIndex("DeferAmbientLightPass", ShaderDataFromSystem);
    use(gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem);
    var getColorArr3 = ambientLightData.getColorArr3, isColorDirty = ambientLightData.isColorDirty, AmbientLightDataFromSystem = ambientLightData.AmbientLightDataFromSystem;
    for (var i = 0; i < ambientLightCount; i++) {
        var colorArr3 = null, isColorDirtyFlag = isColorDirty(i, AmbientLightDataFromSystem);
        if (isColorDirtyFlag) {
            colorArr3 = getColorArr3(i, AmbientLightDataFromSystem);
        }
        bindAmbientLightUboData(gl, i, ambientLightData, _buildAmbientLightValueDataMap(colorArr3, isColorDirtyFlag), drawDataMap, GLSLSenderDataFromSystem);
        drawFullScreenQuad(gl, DeferAmbientLightPassDataFromSystem);
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
    sendAttributeData(gl, ProgramDataFromSystem, DeferDirectionLightPassDataFromSystem);
    shaderIndex = getNoMaterialShaderIndex("DeferDirectionLightPass", ShaderDataFromSystem);
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
        bindDirectionLightUboData(gl, i, directionLightData, _buildDirectionLightValueDataMap(position, colorArr3, intensity, isPositionDirtyFlag, isColorDirtyFlag, isIntensityDirtyFlag), drawDataMap, GLSLSenderDataFromSystem);
        drawFullScreenQuad(gl, DeferDirectionLightPassDataFromSystem);
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