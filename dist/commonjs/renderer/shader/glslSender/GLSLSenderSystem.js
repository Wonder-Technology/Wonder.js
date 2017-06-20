"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var glslSenderUtils_1 = require("../../utils/shader/glslSender/glslSenderUtils");
var MaterialSystem_1 = require("../../../component/material/MaterialSystem");
var LocationSystem_1 = require("../location/LocationSystem");
exports.getUniformData = function (field, from, renderCommandUniformData, MaterialData) {
    return glslSenderUtils_1.getUniformData(field, from, MaterialSystem_1.getColorArr3, MaterialSystem_1.getOpacity, renderCommandUniformData, MaterialData);
};
exports.sendBuffer = glslSenderUtils_1.sendBuffer;
exports.sendMatrix4 = function (gl, name, data, uniformLocationMap) {
    glslSenderUtils_1.sendMatrix4(gl, name, data, uniformLocationMap, LocationSystem_1.getUniformLocation, LocationSystem_1.isUniformLocationNotExist);
};
exports.sendVector3 = function (gl, shaderIndex, name, data, uniformCacheMap, uniformLocationMap) {
    glslSenderUtils_1.sendVector3(gl, shaderIndex, name, data, uniformCacheMap, uniformLocationMap, LocationSystem_1.getUniformLocation, LocationSystem_1.isUniformLocationNotExist);
};
exports.sendFloat1 = function (gl, shaderIndex, name, data, uniformCacheMap, uniformLocationMap) {
    glslSenderUtils_1.sendFloat1(gl, shaderIndex, name, data, uniformCacheMap, uniformLocationMap, LocationSystem_1.getUniformLocation, LocationSystem_1.isUniformLocationNotExist);
};
exports.addSendAttributeConfig = glslSenderUtils_1.addSendAttributeConfig;
exports.addSendUniformConfig = glslSenderUtils_1.addSendUniformConfig;
exports.initData = glslSenderUtils_1.initData;
//# sourceMappingURL=GLSLSenderSystem.js.map