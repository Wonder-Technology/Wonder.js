import { bindGBufferTargets, init as initGBuffer, sendGBufferTargetData } from "./gbuffer/gBufferUtils";
import { init as initDeferLightPass } from "./light/deferLightPassUtils";
import { use } from "../../../../../../../utils/worker/render_file/shader/shaderUtils";
import { getNoMaterialShaderIndex } from "../../../shader/shaderUtils";
import { draw as deferDraw } from "../../../../../draw/light/defer/deferDrawRenderCommandBufferUtils";
export var init = function (gl, DataBufferConfig, GBufferDataFromSystem, DeferAmbientLightPassDataFromSystem, DeferDirectionLightPassDataFromSystem, DeferPointLightPassDataFromSystem, ShaderDataFromSystem, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem) {
    initGBuffer(gl, GBufferDataFromSystem);
    bindGBufferTargets(gl, GBufferDataFromSystem);
    _initDeferLightPass(gl, "DeferAmbientLightPass", ShaderDataFromSystem, GLSLSenderDataFromSystem, ProgramDataFromSystem, LocationDataFromSystem, DeferAmbientLightPassDataFromSystem);
    _initDeferLightPass(gl, "DeferDirectionLightPass", ShaderDataFromSystem, GLSLSenderDataFromSystem, ProgramDataFromSystem, LocationDataFromSystem, DeferDirectionLightPassDataFromSystem);
    _initDeferLightPass(gl, "DeferPointLightPass", ShaderDataFromSystem, GLSLSenderDataFromSystem, ProgramDataFromSystem, LocationDataFromSystem, DeferPointLightPassDataFromSystem);
};
var _initDeferLightPass = function (gl, shaderName, ShaderDataFromSystem, GLSLSenderDataFromSystem, ProgramDataFromSystem, LocationDataFromSystem, DeferLightPassDataFromSystem) {
    var program = null, shaderIndex = null;
    shaderIndex = getNoMaterialShaderIndex(shaderName, ShaderDataFromSystem);
    initDeferLightPass(gl, shaderIndex, GLSLSenderDataFromSystem, DeferLightPassDataFromSystem);
    program = use(gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem);
    sendGBufferTargetData(gl, program);
};
export var render = function (gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawFuncDataMap, drawDataMap, deferDrawDataMap, sendDataMap, initShaderDataMap, bufferData, cameraData) {
    deferDraw(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawFuncDataMap, drawDataMap, deferDrawDataMap, sendDataMap, initShaderDataMap, bufferData, cameraData);
};
export var buildSendUniformDataDataMap = function (sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3, getAmbientLightColorArr3, isAmbientLightColorDirty, cleanAmbientLightColorDirty, getDirectionLightPosition, getDirectionLightColorArr3, getDirectionLightIntensity, isDirectionLightPositionDirty, isDirectionLightColorDirty, isDirectionLightIntensityDirty, cleanDirectionLightPositionDirty, cleanDirectionLightColorDirty, cleanDirectionLightIntensityDirty, getPointLightPosition, getPointLightColorArr3, getConstant, getPointLightIntensity, getLinear, getQuadratic, getRange, computeRadius, isPositionDirty, isColorDirty, isIntensityDirty, isAttenuationDirty, cleanPositionDirty, cleanColorDirty, cleanIntensityDirty, cleanAttenuationDirty, drawDataMap) {
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