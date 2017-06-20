"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var arrayUtils_1 = require("../../../../utils/arrayUtils");
var renderConfigUtils_1 = require("../../renderConfigUtils");
var contract_1 = require("../../../../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
var objectUtils_1 = require("../../../../utils/objectUtils");
var Log_1 = require("../../../../utils/Log");
exports.getUniformData = function (field, from, getColorArr3, getOpacity, renderCommandUniformData, MaterialDataFromSystem) {
    var data = null;
    switch (from) {
        case "cmd":
            data = renderCommandUniformData[field];
            break;
        case "material":
            data = _getUnifromDataFromMaterial(field, renderCommandUniformData.materialIndex, getColorArr3, getOpacity, MaterialDataFromSystem);
            break;
        default:
            Log_1.Log.error(true, Log_1.Log.info.FUNC_UNKNOW("from:" + from));
            break;
    }
    return data;
};
var _getUnifromDataFromMaterial = function (field, materialIndex, getColorArr3, getOpacity, MaterialDataFromSystem) {
    var data = null;
    switch (field) {
        case "color":
            data = getColorArr3(materialIndex, MaterialDataFromSystem);
            break;
        case "opacity":
            data = getOpacity(materialIndex, MaterialDataFromSystem);
            break;
        default:
            Log_1.Log.error(true, Log_1.Log.info.FUNC_UNKNOW("field:" + field));
            break;
    }
    return data;
};
exports.sendBuffer = function (gl, pos, buffer, geometryIndex, GLSLSenderDataFromSystem, ArrayBufferData) {
    var _a = ArrayBufferData.bufferDataMap[geometryIndex], size = _a.size, type = _a.type, vertexAttribHistory = GLSLSenderDataFromSystem.vertexAttribHistory;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(pos, size, gl[type], false, 0, 0);
    if (vertexAttribHistory[pos] !== true) {
        gl.enableVertexAttribArray(pos);
        vertexAttribHistory[pos] = true;
    }
};
exports.sendMatrix4 = function (gl, name, data, uniformLocationMap, getUniformLocation, isUniformLocationNotExist) {
    _sendUniformData(gl, name, data, uniformLocationMap, getUniformLocation, isUniformLocationNotExist, function (pos, data) {
        gl.uniformMatrix4fv(pos, false, data);
    });
};
exports.sendVector3 = function (gl, shaderIndex, name, data, uniformCacheMap, uniformLocationMap, getUniformLocation, isUniformLocationNotExist) {
    var recordedData = _getUniformCache(shaderIndex, name, uniformCacheMap), x = data[0], y = data[1], z = data[2];
    if (recordedData && recordedData[0] == x && recordedData[1] == y && recordedData[2] == z) {
        return;
    }
    _setUniformCache(shaderIndex, name, data, uniformCacheMap);
    _sendUniformData(gl, name, data, uniformLocationMap, getUniformLocation, isUniformLocationNotExist, function (pos, data) {
        gl.uniform3f(pos, x, y, z);
    });
};
exports.sendFloat1 = contract_1.requireCheckFunc(function (gl, shaderIndex, name, data, uniformCacheMap, uniformLocationMap, getUniformLocation, isUniformLocationNotExist) {
    contract_1.it("data should be number", function () {
        wonder_expect_js_1.expect(data).be.a("number");
    });
}, function (gl, shaderIndex, name, data, uniformCacheMap, uniformLocationMap, getUniformLocation, isUniformLocationNotExist) {
    var recordedData = _getUniformCache(shaderIndex, name, uniformCacheMap);
    if (recordedData === data) {
        return;
    }
    _setUniformCache(shaderIndex, name, data, uniformCacheMap);
    _sendUniformData(gl, name, data, uniformLocationMap, getUniformLocation, isUniformLocationNotExist, function (pos, data) {
        gl.uniform1f(pos, data);
    });
});
var _getUniformCache = function (shaderIndex, name, uniformCacheMap) {
    var cache = uniformCacheMap[shaderIndex];
    if (_isCacheNotExist(cache)) {
        cache = {};
        uniformCacheMap[shaderIndex] = cache;
        return null;
    }
    return cache[name];
};
var _isCacheNotExist = function (cache) { return objectUtils_1.isNotValidMapValue(cache); };
var _setUniformCache = function (shaderIndex, name, data, uniformCacheMap) {
    uniformCacheMap[shaderIndex][name] = data;
};
var _sendUniformData = function (gl, name, data, uniformLocationMap, getUniformLocation, isUniformLocationNotExist, send) {
    var pos = getUniformLocation(name, uniformLocationMap);
    if (isUniformLocationNotExist(pos)) {
        return;
    }
    send(pos, data);
};
exports.addSendAttributeConfig = contract_1.ensureFunc(function (returnVal, shaderIndex, materialShaderLibConfig, shaderLibData, sendAttributeConfigMap) {
    contract_1.it("sendAttributeConfigMap should not has duplicate attribute name", function () {
        wonder_expect_js_1.expect(arrayUtils_1.hasDuplicateItems(sendAttributeConfigMap[shaderIndex])).false;
    });
}, contract_1.requireCheckFunc(function (shaderIndex, materialShaderLibConfig, shaderLibData, sendAttributeConfigMap) {
    contract_1.it("sendAttributeConfigMap[shaderIndex] should not be defined", function () {
        wonder_expect_js_1.expect(sendAttributeConfigMap[shaderIndex]).not.exist;
    });
}, function (shaderIndex, materialShaderLibConfig, shaderLibData, sendAttributeConfigMap) {
    var sendDataArr = [];
    arrayUtils_1.forEach(materialShaderLibConfig, function (shaderLibName) {
        var sendData = shaderLibData[shaderLibName].send;
        if (renderConfigUtils_1.isConfigDataExist(sendData) && renderConfigUtils_1.isConfigDataExist(sendData.attribute)) {
            sendDataArr = sendDataArr.concat(sendData.attribute);
        }
    });
    sendAttributeConfigMap[shaderIndex] = sendDataArr;
}));
exports.addSendUniformConfig = contract_1.ensureFunc(function (returnVal, shaderIndex, materialShaderLibConfig, shaderLibData, sendUniformConfigMap) {
    contract_1.it("sendUniformConfigMap should not has duplicate attribute name", function () {
        wonder_expect_js_1.expect(arrayUtils_1.hasDuplicateItems(sendUniformConfigMap[shaderIndex])).false;
    });
}, contract_1.requireCheckFunc(function (shaderIndex, materialShaderLibConfig, shaderLibData, sendUniformConfigMap) {
    contract_1.it("sendUniformConfigMap[shaderIndex] should not be defined", function () {
        wonder_expect_js_1.expect(sendUniformConfigMap[shaderIndex]).not.exist;
    });
}, function (shaderIndex, materialShaderLibConfig, shaderLibData, sendUniformConfigMap) {
    var sendDataArr = [];
    arrayUtils_1.forEach(materialShaderLibConfig, function (shaderLibName) {
        var sendData = shaderLibData[shaderLibName].send;
        if (renderConfigUtils_1.isConfigDataExist(sendData) && renderConfigUtils_1.isConfigDataExist(sendData.uniform)) {
            sendDataArr = sendDataArr.concat(sendData.uniform);
        }
    });
    sendUniformConfigMap[shaderIndex] = sendDataArr;
}));
exports.initData = function (GLSLSenderDataFromSystem) {
    GLSLSenderDataFromSystem.sendAttributeConfigMap = objectUtils_1.createMap();
    GLSLSenderDataFromSystem.sendUniformConfigMap = objectUtils_1.createMap();
    GLSLSenderDataFromSystem.vertexAttribHistory = [];
    GLSLSenderDataFromSystem.uniformCacheMap = objectUtils_1.createMap();
};
//# sourceMappingURL=glslSenderUtils.js.map