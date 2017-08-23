"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var frontDrawRenderCommandBufferUtils_1 = require("../../../../../draw/light/front/frontDrawRenderCommandBufferUtils");
exports.render = function (gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawFuncDataMap, drawDataMap, sendDataMap, initShaderDataMap, bufferData, cameraData) {
    frontDrawRenderCommandBufferUtils_1.draw(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawFuncDataMap, drawDataMap, sendDataMap, initShaderDataMap, bufferData, cameraData);
};
exports.buildSendUniformDataDataMap = function (sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3, getAmbientLightColorArr3, isAmbientLightColorDirty, cleanAmbientLightColorDirty, getDirectionLightPosition, getDirectionLightColorArr3, getDirectionLightIntensity, isDirectionLightPositionDirty, isDirectionLightColorDirty, isDirectionLightIntensityDirty, cleanDirectionLightPositionDirty, cleanDirectionLightColorDirty, cleanDirectionLightIntensityDirty, getPointLightPosition, getPointLightColorArr3, getConstant, getPointLightIntensity, getLinear, getQuadratic, getRange, isPointLightPositionDirty, isPointLightColorDirty, isPointLightIntensityDirty, isPointLightAttenuationDirty, cleanPointLightPositionDirty, cleanPointLightColorDirty, cleanPointLightIntensityDirty, cleanPointLightAttenuationDirty, drawDataMap) {
    return {
        glslSenderData: {
            sendMatrix3: sendMatrix3,
            sendMatrix4: sendMatrix4,
            sendVector3: sendVector3,
            sendInt: sendInt,
            sendFloat1: sendFloat1,
            sendFloat3: sendFloat3,
            GLSLSenderDataFromSystem: drawDataMap.GLSLSenderDataFromSystem
        },
        ambientLightData: {
            getColorArr3: getAmbientLightColorArr3,
            isColorDirty: isAmbientLightColorDirty,
            cleanColorDirty: cleanAmbientLightColorDirty,
            AmbientLightDataFromSystem: drawDataMap.AmbientLightDataFromSystem
        },
        directionLightData: {
            getPosition: getDirectionLightPosition,
            getColorArr3: getDirectionLightColorArr3,
            getIntensity: getDirectionLightIntensity,
            isPositionDirty: isDirectionLightPositionDirty,
            isColorDirty: isDirectionLightColorDirty,
            isIntensityDirty: isDirectionLightIntensityDirty,
            cleanPositionDirty: cleanDirectionLightPositionDirty,
            cleanColorDirty: cleanDirectionLightColorDirty,
            cleanIntensityDirty: cleanDirectionLightIntensityDirty,
            DirectionLightDataFromSystem: drawDataMap.DirectionLightDataFromSystem
        },
        pointLightData: {
            getPosition: getPointLightPosition,
            getColorArr3: getPointLightColorArr3,
            getIntensity: getPointLightIntensity,
            getConstant: getConstant,
            getLinear: getLinear,
            getQuadratic: getQuadratic,
            getRange: getRange,
            isPositionDirty: isPointLightPositionDirty,
            isColorDirty: isPointLightColorDirty,
            isIntensityDirty: isPointLightIntensityDirty,
            isAttenuationDirty: isPointLightAttenuationDirty,
            cleanPositionDirty: cleanPointLightPositionDirty,
            cleanColorDirty: cleanPointLightColorDirty,
            cleanIntensityDirty: cleanPointLightIntensityDirty,
            cleanAttenuationDirty: cleanPointLightAttenuationDirty,
            PointLightDataFromSystem: drawDataMap.PointLightDataFromSystem
        }
    };
};
//# sourceMappingURL=frontRenderUtils.js.map