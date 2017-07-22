import { bindIndexBuffer as bindIndexBufferUtils, init as initUtils, sendAttributeData as sendAttributeDataUtils, sendUniformData as sendUniformDataUtils, use as useUtils } from "../../../utils/shader/shaderUtils";
import { getIndices, getNormals, getTexCoords, getVertices } from "../geometry/GeometryWorkerSystem";
import { getAttribLocation, isAttributeLocationNotExist } from "./location/LocationWorkerSystem";
import { getUniformData, sendBuffer, sendFloat1, sendFloat3, sendInt, sendMatrix3, sendMatrix4, sendVector3 } from "./glslSender/GLSLSenderWorkerSystem";
import { buildGLSLSource } from "./shaderSourceBuildWorkerSystem";
import { getGL } from "../../both_file/device/DeviceManagerWorkerSystem";
import { getColorArr3 as getAmbientLightColorArr3 } from "../light/AmbientLightWorkerSystem";
import { getColorArr3 as getDirectionLightColorArr3, getIntensity as getDirectionLightIntensity } from "../light/DirectionLightWorkerSystem";
import { getColorArr3 as getPointLightColorArr3, getIntensity as getPointLightIntensity, getConstant as getPointLightConstant, getLinear as getPointLightLinear, getQuadratic as getPointLightQuadratic, getRange as getPointLightRange, } from "../light/PointLightWorkerSystem";
import { getMapCount } from "../texture/MapManagerWorkerSystem";
import { createMap } from "../../../../utils/objectUtils";
import { hasDiffuseMap, hasSpecularMap } from "../../../utils/material/lightMaterialUtils";
export var init = function (state, materialIndex, materialClassName, material_config, shaderLib_generator, initShaderDataMap) {
    return initUtils(state, materialIndex, materialClassName, material_config, shaderLib_generator, _buildInitShaderFuncDataMap(), initShaderDataMap);
};
var _buildInitShaderFuncDataMap = function () {
    return {
        buildGLSLSource: buildGLSLSource,
        getGL: getGL,
        getMapCount: getMapCount,
        hasSpecularMap: hasSpecularMap,
        hasDiffuseMap: hasDiffuseMap
    };
};
export var sendAttributeData = function (gl, shaderIndex, program, geometryIndex, ProgramWorkerData, LocationWorkerData, GLSLSenderWorkerData, GeometryWorkerData, ArrayBufferWorkerData) { return sendAttributeDataUtils(gl, shaderIndex, program, geometryIndex, {
    getVertices: getVertices,
    getNormals: getNormals,
    getTexCoords: getTexCoords
}, getAttribLocation, isAttributeLocationNotExist, sendBuffer, ProgramWorkerData, LocationWorkerData, GLSLSenderWorkerData, GeometryWorkerData, ArrayBufferWorkerData); };
export var sendUniformData = function (gl, shaderIndex, program, mapCount, drawDataMap, renderCommandUniformData) {
    sendUniformDataUtils(gl, shaderIndex, program, mapCount, _buildSendUniformDataDataMap(drawDataMap), drawDataMap, renderCommandUniformData);
};
var _buildSendUniformDataDataMap = function (drawDataMap) {
    return {
        glslSenderData: {
            getUniformData: getUniformData,
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
            AmbientLightDataFromSystem: drawDataMap.AmbientLightDataFromSystem
        },
        directionLightData: {
            getPosition: function (index) {
                return getDirectionLightPosition(index, drawDataMap);
            },
            getColorArr3: getDirectionLightColorArr3,
            getIntensity: getDirectionLightIntensity,
            DirectionLightDataFromSystem: drawDataMap.DirectionLightDataFromSystem
        },
        pointLightData: {
            getPosition: function (index) {
                return getPointLightPosition(index, drawDataMap);
            },
            getColorArr3: getPointLightColorArr3,
            getIntensity: getPointLightIntensity,
            getConstant: getPointLightConstant,
            getLinear: getPointLightLinear,
            getQuadratic: getPointLightQuadratic,
            getRange: getPointLightRange,
            PointLightDataFromSystem: drawDataMap.PointLightDataFromSystem
        }
    };
};
export var bindIndexBuffer = function (gl, geometryIndex, ProgramWorkerData, GeometryWorkerData, IndexBufferWorkerData) {
    bindIndexBufferUtils(gl, geometryIndex, getIndices, ProgramWorkerData, GeometryWorkerData, IndexBufferWorkerData);
};
export var use = useUtils;
export var getDirectionLightPosition = function (index, drawDataMap) {
    return _getLightPosition(index, drawDataMap.DirectionLightDataFromSystem);
};
export var getPointLightPosition = function (index, drawDataMap) {
    return _getLightPosition(index, drawDataMap.PointLightDataFromSystem);
};
var _getLightPosition = function (index, LightDataFromSystem) {
    return LightDataFromSystem.positionArr[index];
};
export var initData = function (ShaderWorkerData) {
    ShaderWorkerData.index = 0;
    ShaderWorkerData.count = 0;
    ShaderWorkerData.shaderLibWholeNameMap = createMap();
};
//# sourceMappingURL=ShaderWorkerSystem.js.map