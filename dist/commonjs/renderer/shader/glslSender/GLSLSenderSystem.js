"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var glslSenderUtils_1 = require("../../utils/shader/glslSender/glslSenderUtils");
var MaterialSystem_1 = require("../../../component/material/MaterialSystem");
var LocationSystem_1 = require("../location/LocationSystem");
var LightMaterialSystem_1 = require("../../../component/material/LightMaterialSystem");
exports.getUniformData = function (field, from, renderCommandUniformData, MaterialData, BasicMaterialData, LightMaterialData) {
    return glslSenderUtils_1.getUniformData(field, from, renderCommandUniformData, {
        getColorArr3: MaterialSystem_1.getColorArr3,
        getOpacity: MaterialSystem_1.getOpacity,
        MaterialDataFromSystem: MaterialData
    }, {
        BasicMaterialDataFromSystem: BasicMaterialData
    }, {
        getEmissionColorArr3: LightMaterialSystem_1.getEmissionColorArr3,
        getSpecularColorArr3: LightMaterialSystem_1.getSpecularColorArr3,
        getLightModel: LightMaterialSystem_1.getLightModel,
        getShininess: LightMaterialSystem_1.getShininess,
        LightMaterialDataFromSystem: LightMaterialData
    });
};
exports.sendBuffer = glslSenderUtils_1.sendBuffer;
exports.sendMatrix3 = function (gl, program, name, data, uniformLocationMap) {
    glslSenderUtils_1.sendMatrix3(gl, program, name, data, uniformLocationMap, LocationSystem_1.getUniformLocation, LocationSystem_1.isUniformLocationNotExist);
};
exports.sendMatrix4 = function (gl, program, name, data, uniformLocationMap) {
    glslSenderUtils_1.sendMatrix4(gl, program, name, data, uniformLocationMap, LocationSystem_1.getUniformLocation, LocationSystem_1.isUniformLocationNotExist);
};
exports.sendVector3 = function (gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap) {
    glslSenderUtils_1.sendVector3(gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap, LocationSystem_1.getUniformLocation, LocationSystem_1.isUniformLocationNotExist);
};
exports.sendInt = function (gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap) {
    glslSenderUtils_1.sendInt(gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap, LocationSystem_1.getUniformLocation, LocationSystem_1.isUniformLocationNotExist);
};
exports.sendFloat1 = function (gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap) {
    glslSenderUtils_1.sendFloat1(gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap, LocationSystem_1.getUniformLocation, LocationSystem_1.isUniformLocationNotExist);
};
exports.sendFloat3 = function (gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap) {
    glslSenderUtils_1.sendFloat3(gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap, LocationSystem_1.getUniformLocation, LocationSystem_1.isUniformLocationNotExist);
};
exports.initData = glslSenderUtils_1.initData;
//# sourceMappingURL=GLSLSenderSystem.js.map