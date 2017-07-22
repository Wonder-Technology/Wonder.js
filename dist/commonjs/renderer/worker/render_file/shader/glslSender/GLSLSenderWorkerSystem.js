"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var glslSenderUtils_1 = require("../../../../utils/shader/glslSender/glslSenderUtils");
var MaterialWorkerSystem_1 = require("../../material/MaterialWorkerSystem");
var LightMaterialWorkerSystem_1 = require("../../material/LightMaterialWorkerSystem");
var LocationWorkerSystem_1 = require("../location/LocationWorkerSystem");
exports.getUniformData = function (field, from, renderCommandUniformData, MaterialWorkerData, BasicMaterialWorkerData, LightMaterialWorkerData) {
    return glslSenderUtils_1.getUniformData(field, from, renderCommandUniformData, {
        getColorArr3: MaterialWorkerSystem_1.getColorArr3,
        getOpacity: MaterialWorkerSystem_1.getOpacity,
        MaterialDataFromSystem: MaterialWorkerData
    }, {
        BasicMaterialDataFromSystem: BasicMaterialWorkerData
    }, {
        getEmissionColorArr3: LightMaterialWorkerSystem_1.getEmissionColorArr3,
        getSpecularColorArr3: LightMaterialWorkerSystem_1.getSpecularColorArr3,
        getLightModel: LightMaterialWorkerSystem_1.getLightModel,
        getShininess: LightMaterialWorkerSystem_1.getShininess,
        LightMaterialDataFromSystem: LightMaterialWorkerData
    });
};
exports.sendBuffer = glslSenderUtils_1.sendBuffer;
exports.sendMatrix3 = function (gl, program, name, data, uniformLocationMap) {
    glslSenderUtils_1.sendMatrix3(gl, program, name, data, uniformLocationMap, LocationWorkerSystem_1.getUniformLocation, LocationWorkerSystem_1.isUniformLocationNotExist);
};
exports.sendMatrix4 = function (gl, program, name, data, uniformLocationMap) {
    glslSenderUtils_1.sendMatrix4(gl, program, name, data, uniformLocationMap, LocationWorkerSystem_1.getUniformLocation, LocationWorkerSystem_1.isUniformLocationNotExist);
};
exports.sendVector3 = function (gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap) {
    glslSenderUtils_1.sendVector3(gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap, LocationWorkerSystem_1.getUniformLocation, LocationWorkerSystem_1.isUniformLocationNotExist);
};
exports.sendInt = function (gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap) {
    glslSenderUtils_1.sendInt(gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap, LocationWorkerSystem_1.getUniformLocation, LocationWorkerSystem_1.isUniformLocationNotExist);
};
exports.sendFloat1 = function (gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap) {
    glslSenderUtils_1.sendFloat1(gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap, LocationWorkerSystem_1.getUniformLocation, LocationWorkerSystem_1.isUniformLocationNotExist);
};
exports.sendFloat3 = function (gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap) {
    glslSenderUtils_1.sendFloat3(gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap, LocationWorkerSystem_1.getUniformLocation, LocationWorkerSystem_1.isUniformLocationNotExist);
};
exports.initData = glslSenderUtils_1.initData;
//# sourceMappingURL=GLSLSenderWorkerSystem.js.map