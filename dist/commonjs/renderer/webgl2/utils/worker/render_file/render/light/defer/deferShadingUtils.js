"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gBufferUtils_1 = require("./gbuffer/gBufferUtils");
var deferLightPassUtils_1 = require("./light/deferLightPassUtils");
var shaderUtils_1 = require("../../../../../../../utils/worker/render_file/shader/shaderUtils");
var shaderUtils_2 = require("../../../shader/shaderUtils");
var deferDrawRenderCommandBufferUtils_1 = require("../../../../../draw/light/defer/deferDrawRenderCommandBufferUtils");
exports.init = function (gl, DataBufferConfig, GBufferDataFromSystem, DeferAmbientLightPassDataFromSystem, DeferDirectionLightPassDataFromSystem, DeferPointLightPassDataFromSystem, ShaderDataFromSystem, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem) {
    gBufferUtils_1.init(gl, GBufferDataFromSystem);
    gBufferUtils_1.bindGBufferTargets(gl, GBufferDataFromSystem);
    _initDeferLightPass(gl, "DeferAmbientLightPass", ShaderDataFromSystem, GLSLSenderDataFromSystem, ProgramDataFromSystem, LocationDataFromSystem, DeferAmbientLightPassDataFromSystem);
    _initDeferLightPass(gl, "DeferDirectionLightPass", ShaderDataFromSystem, GLSLSenderDataFromSystem, ProgramDataFromSystem, LocationDataFromSystem, DeferDirectionLightPassDataFromSystem);
    _initDeferLightPass(gl, "DeferPointLightPass", ShaderDataFromSystem, GLSLSenderDataFromSystem, ProgramDataFromSystem, LocationDataFromSystem, DeferPointLightPassDataFromSystem);
};
var _initDeferLightPass = function (gl, shaderName, ShaderDataFromSystem, GLSLSenderDataFromSystem, ProgramDataFromSystem, LocationDataFromSystem, DeferLightPassDataFromSystem) {
    var program = null, shaderIndex = null;
    shaderIndex = shaderUtils_2.getNoMaterialShaderIndex(shaderName, ShaderDataFromSystem);
    deferLightPassUtils_1.init(gl, shaderIndex, GLSLSenderDataFromSystem, DeferLightPassDataFromSystem);
    program = shaderUtils_1.use(gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem);
    gBufferUtils_1.sendGBufferTargetData(gl, program);
};
exports.render = function (gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawFuncDataMap, drawDataMap, deferDrawDataMap, sendDataMap, initShaderDataMap, bufferData, cameraData) {
    deferDrawRenderCommandBufferUtils_1.draw(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawFuncDataMap, drawDataMap, deferDrawDataMap, sendDataMap, initShaderDataMap, bufferData, cameraData);
};
exports.buildSendUniformDataDataMap = function (sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3, getAmbientLightColorArr3, isAmbientLightColorDirty, cleanAmbientLightColorDirty, getDirectionLightPosition, getDirectionLightColorArr3, getDirectionLightIntensity, isDirectionLightPositionDirty, isDirectionLightColorDirty, isDirectionLightIntensityDirty, cleanDirectionLightPositionDirty, cleanDirectionLightColorDirty, cleanDirectionLightIntensityDirty, getPointLightPosition, getPointLightColorArr3, getConstant, getPointLightIntensity, getLinear, getQuadratic, getRange, computeRadius, isPositionDirty, isColorDirty, isIntensityDirty, isAttenuationDirty, cleanPositionDirty, cleanColorDirty, cleanIntensityDirty, cleanAttenuationDirty, drawDataMap) {
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
            computeRadius: computeRadius,
            isPositionDirty: isPositionDirty,
            isColorDirty: isColorDirty,
            isIntensityDirty: isIntensityDirty,
            isAttenuationDirty: isAttenuationDirty,
            cleanPositionDirty: cleanPositionDirty,
            cleanColorDirty: cleanColorDirty,
            cleanIntensityDirty: cleanIntensityDirty,
            cleanAttenuationDirty: cleanAttenuationDirty,
            PointLightDataFromSystem: drawDataMap.PointLightDataFromSystem
        }
    };
};
//# sourceMappingURL=deferShadingUtils.js.map