"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var arrayUtils_1 = require("../../utils/arrayUtils");
var MaterialSystem_1 = require("../../component/material/MaterialSystem");
var renderConfigUtils_1 = require("../utils/renderConfigUtils");
var Log_1 = require("../../utils/Log");
var locationSystem_1 = require("./locationSystem");
var contract_1 = require("../../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
exports.getUniformData = function (field, from, renderCommand, MaterialData) {
    var data = null;
    switch (from) {
        case "cmd":
            data = renderCommand[field];
            break;
        case "material":
            data = _getUnifromDataFromMaterial(field, renderCommand.materialIndex, MaterialData);
            break;
        default:
            Log_1.error(true, "unknow from:" + from);
            break;
    }
    return data;
};
var _getUnifromDataFromMaterial = function (field, materialIndex, MaterialData) {
    var data = null;
    switch (field) {
        case "color":
            data = MaterialSystem_1.getColor(materialIndex, MaterialData).toVector3();
            break;
        case "opacity":
            data = MaterialSystem_1.getOpacity(materialIndex, MaterialData);
            break;
        default:
            Log_1.error(true, "unknow field:" + field);
            break;
    }
    return data;
};
exports.sendBuffer = function (gl, pos, buffer, geometryIndex, ShaderData, ArrayBufferData) {
    var _a = ArrayBufferData.bufferDataMap[geometryIndex], size = _a.size, type = _a.type, vertexAttribHistory = ShaderData.vertexAttribHistory;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(pos, size, gl[type], false, 0, 0);
    if (vertexAttribHistory[pos] !== true) {
        gl.enableVertexAttribArray(pos);
        vertexAttribHistory[pos] = true;
    }
};
exports.sendMatrix4 = function (gl, name, data, uniformLocationMap) {
    _sendUniformData(gl, name, data, uniformLocationMap, function (pos, data) {
        gl.uniformMatrix4fv(pos, false, data);
    });
};
exports.sendVector3 = function (gl, shaderIndex, name, data, uniformCacheMap, uniformLocationMap) {
    var recordedData = getUniformCache(shaderIndex, name, uniformCacheMap);
    if (recordedData && recordedData.x == data.x && recordedData.y == data.y && recordedData.z == data.z) {
        return;
    }
    _setUniformCache(shaderIndex, name, data, uniformCacheMap);
    _sendUniformData(gl, name, data, uniformLocationMap, function (pos, data) {
        gl.uniform3f(pos, data.x, data.y, data.z);
    });
};
exports.sendFloat1 = contract_1.requireCheckFunc(function (gl, shaderIndex, name, data, uniformCacheMap, uniformLocationMap) {
    contract_1.it("data should be number", function () {
        wonder_expect_js_1.expect(data).be.a("number");
    });
}, function (gl, shaderIndex, name, data, uniformCacheMap, uniformLocationMap) {
    var recordedData = getUniformCache(shaderIndex, name, uniformCacheMap);
    if (recordedData === data) {
        return;
    }
    _setUniformCache(shaderIndex, name, data, uniformCacheMap);
    _sendUniformData(gl, name, data, uniformLocationMap, function (pos, data) {
        gl.uniform1f(pos, data);
    });
});
var getUniformCache = function (shaderIndex, name, uniformCacheMap) {
    return uniformCacheMap[shaderIndex][name];
};
var _setUniformCache = function (shaderIndex, name, data, uniformCacheMap) {
    uniformCacheMap[shaderIndex][name] = data;
};
var _sendUniformData = function (gl, name, data, uniformLocationMap, sendFunc) {
    var pos = locationSystem_1.getUniformLocation(name, uniformLocationMap);
    if (locationSystem_1.isUniformLocationNotExist(pos)) {
        return;
    }
    sendFunc(pos, data);
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
//# sourceMappingURL=glslSenderSystem.js.map