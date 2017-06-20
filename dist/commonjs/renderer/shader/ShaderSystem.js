"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Shader_1 = require("./Shader");
var objectUtils_1 = require("../../utils/objectUtils");
var MaterialSystem_1 = require("../../component/material/MaterialSystem");
var WorkerDetectSystem_1 = require("../../device/WorkerDetectSystem");
var shaderUtils_1 = require("../utils/shader/shaderUtils");
var GeometrySystem_1 = require("../../component/geometry/GeometrySystem");
var LocationSystem_1 = require("./location/LocationSystem");
var GLSLSenderSystem_1 = require("./glslSender/GLSLSenderSystem");
var shaderSourceBuildSystem_1 = require("./shaderSourceBuildSystem");
var DeviceManagerSystem_1 = require("../device/DeviceManagerSystem");
exports.create = function (materialClassName, MaterialData, ShaderData) {
    var index = MaterialSystem_1.getShaderIndexFromTable(materialClassName, MaterialData.shaderIndexTable), shader = ShaderData.shaderMap[index];
    if (_isShaderExist(shader)) {
        return shader;
    }
    shader = new Shader_1.Shader();
    shader.index = index;
    ShaderData.count += 1;
    return shader;
};
var _isShaderExist = function (shader) { return objectUtils_1.isValidMapValue(shader); };
exports.init = null;
exports.sendAttributeData = null;
exports.sendUniformData = null;
exports.bindIndexBuffer = null;
exports.use = null;
if (!WorkerDetectSystem_1.isSupportRenderWorkerAndSharedArrayBuffer()) {
    exports.init = function (state, materialIndex, shaderIndex, materialClassName, material_config, shaderLib_generator, DeviceManagerData, ProgramData, LocationData, GLSLSenderData, MaterialData) {
        shaderUtils_1.init(state, materialIndex, shaderIndex, materialClassName, material_config, shaderLib_generator, shaderSourceBuildSystem_1.buildGLSLSource, DeviceManagerSystem_1.getGL, DeviceManagerData, ProgramData, LocationData, GLSLSenderData, MaterialData);
    };
    exports.sendAttributeData = function (gl, shaderIndex, geometryIndex, ProgramData, LocationData, GLSLSenderData, GeometryData, ArrayBufferData) { return shaderUtils_1.sendAttributeData(gl, shaderIndex, geometryIndex, GeometrySystem_1.getVertices, LocationSystem_1.getAttribLocation, LocationSystem_1.isAttributeLocationNotExist, GLSLSenderSystem_1.sendBuffer, ProgramData, LocationData, GLSLSenderData, GeometryData, ArrayBufferData); };
    exports.sendUniformData = function (gl, shaderIndex, MaterialData, ProgramData, LocationData, GLSLSenderData, renderCommandUniformData) {
        shaderUtils_1.sendUniformData(gl, shaderIndex, {
            getUniformData: GLSLSenderSystem_1.getUniformData,
            sendMatrix4: GLSLSenderSystem_1.sendMatrix4,
            sendVector3: GLSLSenderSystem_1.sendVector3,
            sendFloat1: GLSLSenderSystem_1.sendFloat1
        }, MaterialData, ProgramData, LocationData, GLSLSenderData, renderCommandUniformData);
    };
    exports.bindIndexBuffer = function (gl, geometryIndex, ProgramData, GeometryData, IndexBufferData) {
        shaderUtils_1.bindIndexBuffer(gl, geometryIndex, GeometrySystem_1.getIndices, ProgramData, GeometryData, IndexBufferData);
    };
    exports.use = shaderUtils_1.use;
}
exports.initData = function (ShaderData) {
    ShaderData.index = 0;
    ShaderData.count = 0;
    ShaderData.shaderMap = objectUtils_1.createMap();
};
//# sourceMappingURL=ShaderSystem.js.map