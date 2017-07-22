"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WorkerDetectSystem_1 = require("../../device/WorkerDetectSystem");
var shaderUtils_1 = require("../utils/shader/shaderUtils");
var GeometrySystem_1 = require("../../component/geometry/GeometrySystem");
var LocationSystem_1 = require("./location/LocationSystem");
var GLSLSenderSystem_1 = require("./glslSender/GLSLSenderSystem");
var shaderSourceBuildSystem_1 = require("./shaderSourceBuildSystem");
var DeviceManagerSystem_1 = require("../device/DeviceManagerSystem");
var ThreeDTransformData_1 = require("../../component/transform/ThreeDTransformData");
var GameObjectData_1 = require("../../core/entityObject/gameObject/GameObjectData");
var AmbientLightSystem_1 = require("../../component/light/AmbientLightSystem");
var DirectionLightSystem_1 = require("../../component/light/DirectionLightSystem");
var PointLightSystem_1 = require("../../component/light/PointLightSystem");
var MapManagerSystem_1 = require("../texture/MapManagerSystem");
var objectUtils_1 = require("../../utils/objectUtils");
var lightMaterialUtils_1 = require("../utils/material/lightMaterialUtils");
exports.create = function (ShaderData) {
    ShaderData.count += 1;
};
exports.init = null;
exports.sendAttributeData = null;
exports.sendUniformData = null;
exports.bindIndexBuffer = null;
exports.use = null;
if (!WorkerDetectSystem_1.isSupportRenderWorkerAndSharedArrayBuffer()) {
    exports.init = function (state, materialIndex, materialClassName, material_config, shaderLib_generator, initShaderDataMap) {
        return shaderUtils_1.init(state, materialIndex, materialClassName, material_config, shaderLib_generator, _buildInitShaderFuncDataMap(), initShaderDataMap);
    };
    var _buildInitShaderFuncDataMap = function () {
        return {
            buildGLSLSource: shaderSourceBuildSystem_1.buildGLSLSource,
            getGL: DeviceManagerSystem_1.getGL,
            getMapCount: MapManagerSystem_1.getMapCount,
            hasSpecularMap: lightMaterialUtils_1.hasSpecularMap,
            hasDiffuseMap: lightMaterialUtils_1.hasDiffuseMap
        };
    };
    exports.sendAttributeData = function (gl, shaderIndex, program, geometryIndex, ProgramData, LocationData, GLSLSenderData, GeometryData, ArrayBufferData) { return shaderUtils_1.sendAttributeData(gl, shaderIndex, program, geometryIndex, {
        getVertices: GeometrySystem_1.getVertices,
        getNormals: GeometrySystem_1.getNormals,
        getTexCoords: GeometrySystem_1.getTexCoords
    }, LocationSystem_1.getAttribLocation, LocationSystem_1.isAttributeLocationNotExist, GLSLSenderSystem_1.sendBuffer, ProgramData, LocationData, GLSLSenderData, GeometryData, ArrayBufferData); };
    exports.sendUniformData = function (gl, shaderIndex, program, mapCount, drawDataMap, renderCommandUniformData) {
        shaderUtils_1.sendUniformData(gl, shaderIndex, program, mapCount, _buildSendUniformDataDataMap(drawDataMap), drawDataMap, renderCommandUniformData);
    };
    var _buildSendUniformDataDataMap = function (drawDataMap) {
        return {
            glslSenderData: {
                getUniformData: GLSLSenderSystem_1.getUniformData,
                sendMatrix3: GLSLSenderSystem_1.sendMatrix3,
                sendMatrix4: GLSLSenderSystem_1.sendMatrix4,
                sendVector3: GLSLSenderSystem_1.sendVector3,
                sendInt: GLSLSenderSystem_1.sendInt,
                sendFloat1: GLSLSenderSystem_1.sendFloat1,
                sendFloat3: GLSLSenderSystem_1.sendFloat3,
                GLSLSenderDataFromSystem: drawDataMap.GLSLSenderDataFromSystem
            },
            ambientLightData: {
                getColorArr3: AmbientLightSystem_1.getColorArr3,
                AmbientLightDataFromSystem: drawDataMap.AmbientLightDataFromSystem
            },
            directionLightData: {
                getPosition: function (index) {
                    return DirectionLightSystem_1.getPosition(index, ThreeDTransformData_1.ThreeDTransformData, GameObjectData_1.GameObjectData, drawDataMap.DirectionLightDataFromSystem).values;
                },
                getColorArr3: DirectionLightSystem_1.getColorArr3,
                getIntensity: DirectionLightSystem_1.getIntensity,
                DirectionLightDataFromSystem: drawDataMap.DirectionLightDataFromSystem
            },
            pointLightData: {
                getPosition: function (index) {
                    return PointLightSystem_1.getPosition(index, ThreeDTransformData_1.ThreeDTransformData, GameObjectData_1.GameObjectData, drawDataMap.PointLightDataFromSystem).values;
                },
                getColorArr3: PointLightSystem_1.getColorArr3,
                getIntensity: PointLightSystem_1.getIntensity,
                getConstant: PointLightSystem_1.getConstant,
                getLinear: PointLightSystem_1.getLinear,
                getQuadratic: PointLightSystem_1.getQuadratic,
                getRange: PointLightSystem_1.getRange,
                PointLightDataFromSystem: drawDataMap.PointLightDataFromSystem
            }
        };
    };
    exports.bindIndexBuffer = function (gl, geometryIndex, ProgramData, GeometryData, IndexBufferData) {
        shaderUtils_1.bindIndexBuffer(gl, geometryIndex, GeometrySystem_1.getIndices, ProgramData, GeometryData, IndexBufferData);
    };
    exports.use = shaderUtils_1.use;
}
exports.initData = function (ShaderData) {
    ShaderData.index = 0;
    ShaderData.count = 0;
    ShaderData.shaderLibWholeNameMap = objectUtils_1.createMap();
};
//# sourceMappingURL=ShaderSystem.js.map