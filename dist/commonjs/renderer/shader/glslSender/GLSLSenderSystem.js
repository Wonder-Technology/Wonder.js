"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var glslSenderUtils_1 = require("../../utils/worker/render_file/shader/glslSender/glslSenderUtils");
var LocationSystem_1 = require("../location/LocationSystem");
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
//# sourceMappingURL=GLSLSenderSystem.js.map