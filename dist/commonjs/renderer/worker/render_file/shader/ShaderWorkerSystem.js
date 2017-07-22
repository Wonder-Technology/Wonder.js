"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shaderUtils_1 = require("../../../utils/shader/shaderUtils");
var GeometryWorkerSystem_1 = require("../geometry/GeometryWorkerSystem");
var LocationWorkerSystem_1 = require("./location/LocationWorkerSystem");
var GLSLSenderWorkerSystem_1 = require("./glslSender/GLSLSenderWorkerSystem");
var shaderSourceBuildWorkerSystem_1 = require("./shaderSourceBuildWorkerSystem");
var DeviceManagerWorkerSystem_1 = require("../../both_file/device/DeviceManagerWorkerSystem");
var AmbientLightWorkerSystem_1 = require("../light/AmbientLightWorkerSystem");
var DirectionLightWorkerSystem_1 = require("../light/DirectionLightWorkerSystem");
var PointLightWorkerSystem_1 = require("../light/PointLightWorkerSystem");
var MapManagerWorkerSystem_1 = require("../texture/MapManagerWorkerSystem");
var objectUtils_1 = require("../../../../utils/objectUtils");
var lightMaterialUtils_1 = require("../../../utils/material/lightMaterialUtils");
exports.init = function (state, materialIndex, materialClassName, material_config, shaderLib_generator, initShaderDataMap) {
    return shaderUtils_1.init(state, materialIndex, materialClassName, material_config, shaderLib_generator, _buildInitShaderFuncDataMap(), initShaderDataMap);
};
var _buildInitShaderFuncDataMap = function () {
    return {
        buildGLSLSource: shaderSourceBuildWorkerSystem_1.buildGLSLSource,
        getGL: DeviceManagerWorkerSystem_1.getGL,
        getMapCount: MapManagerWorkerSystem_1.getMapCount,
        hasSpecularMap: lightMaterialUtils_1.hasSpecularMap,
        hasDiffuseMap: lightMaterialUtils_1.hasDiffuseMap
    };
};
exports.sendAttributeData = function (gl, shaderIndex, program, geometryIndex, ProgramWorkerData, LocationWorkerData, GLSLSenderWorkerData, GeometryWorkerData, ArrayBufferWorkerData) { return shaderUtils_1.sendAttributeData(gl, shaderIndex, program, geometryIndex, {
    getVertices: GeometryWorkerSystem_1.getVertices,
    getNormals: GeometryWorkerSystem_1.getNormals,
    getTexCoords: GeometryWorkerSystem_1.getTexCoords
}, LocationWorkerSystem_1.getAttribLocation, LocationWorkerSystem_1.isAttributeLocationNotExist, GLSLSenderWorkerSystem_1.sendBuffer, ProgramWorkerData, LocationWorkerData, GLSLSenderWorkerData, GeometryWorkerData, ArrayBufferWorkerData); };
exports.sendUniformData = function (gl, shaderIndex, program, mapCount, drawDataMap, renderCommandUniformData) {
    shaderUtils_1.sendUniformData(gl, shaderIndex, program, mapCount, _buildSendUniformDataDataMap(drawDataMap), drawDataMap, renderCommandUniformData);
};
var _buildSendUniformDataDataMap = function (drawDataMap) {
    return {
        glslSenderData: {
            getUniformData: GLSLSenderWorkerSystem_1.getUniformData,
            sendMatrix3: GLSLSenderWorkerSystem_1.sendMatrix3,
            sendMatrix4: GLSLSenderWorkerSystem_1.sendMatrix4,
            sendVector3: GLSLSenderWorkerSystem_1.sendVector3,
            sendInt: GLSLSenderWorkerSystem_1.sendInt,
            sendFloat1: GLSLSenderWorkerSystem_1.sendFloat1,
            sendFloat3: GLSLSenderWorkerSystem_1.sendFloat3,
            GLSLSenderDataFromSystem: drawDataMap.GLSLSenderDataFromSystem
        },
        ambientLightData: {
            getColorArr3: AmbientLightWorkerSystem_1.getColorArr3,
            AmbientLightDataFromSystem: drawDataMap.AmbientLightDataFromSystem
        },
        directionLightData: {
            getPosition: function (index) {
                return exports.getDirectionLightPosition(index, drawDataMap);
            },
            getColorArr3: DirectionLightWorkerSystem_1.getColorArr3,
            getIntensity: DirectionLightWorkerSystem_1.getIntensity,
            DirectionLightDataFromSystem: drawDataMap.DirectionLightDataFromSystem
        },
        pointLightData: {
            getPosition: function (index) {
                return exports.getPointLightPosition(index, drawDataMap);
            },
            getColorArr3: PointLightWorkerSystem_1.getColorArr3,
            getIntensity: PointLightWorkerSystem_1.getIntensity,
            getConstant: PointLightWorkerSystem_1.getConstant,
            getLinear: PointLightWorkerSystem_1.getLinear,
            getQuadratic: PointLightWorkerSystem_1.getQuadratic,
            getRange: PointLightWorkerSystem_1.getRange,
            PointLightDataFromSystem: drawDataMap.PointLightDataFromSystem
        }
    };
};
exports.bindIndexBuffer = function (gl, geometryIndex, ProgramWorkerData, GeometryWorkerData, IndexBufferWorkerData) {
    shaderUtils_1.bindIndexBuffer(gl, geometryIndex, GeometryWorkerSystem_1.getIndices, ProgramWorkerData, GeometryWorkerData, IndexBufferWorkerData);
};
exports.use = shaderUtils_1.use;
exports.getDirectionLightPosition = function (index, drawDataMap) {
    return _getLightPosition(index, drawDataMap.DirectionLightDataFromSystem);
};
exports.getPointLightPosition = function (index, drawDataMap) {
    return _getLightPosition(index, drawDataMap.PointLightDataFromSystem);
};
var _getLightPosition = function (index, LightDataFromSystem) {
    return LightDataFromSystem.positionArr[index];
};
exports.initData = function (ShaderWorkerData) {
    ShaderWorkerData.index = 0;
    ShaderWorkerData.count = 0;
    ShaderWorkerData.shaderLibWholeNameMap = objectUtils_1.createMap();
};
//# sourceMappingURL=ShaderWorkerSystem.js.map