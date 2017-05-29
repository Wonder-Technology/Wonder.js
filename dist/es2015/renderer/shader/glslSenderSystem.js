import { forEach, hasDuplicateItems } from "../../utils/arrayUtils";
import { getColor, getOpacity } from "../../component/material/MaterialSystem";
import { isConfigDataExist } from "../utils/renderConfigUtils";
import { error } from "../../utils/Log";
import { getUniformLocation, isUniformLocationNotExist } from "./locationSystem";
import { ensureFunc, it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
export var getUniformData = function (field, from, renderCommand, MaterialData) {
    var data = null;
    switch (from) {
        case "cmd":
            data = renderCommand[field];
            break;
        case "material":
            data = _getUnifromDataFromMaterial(field, renderCommand.materialIndex, MaterialData);
            break;
        default:
            error(true, "unknow from:" + from);
            break;
    }
    return data;
};
var _getUnifromDataFromMaterial = function (field, materialIndex, MaterialData) {
    var data = null;
    switch (field) {
        case "color":
            data = getColor(materialIndex, MaterialData).toVector3();
            break;
        case "opacity":
            data = getOpacity(materialIndex, MaterialData);
            break;
        default:
            error(true, "unknow field:" + field);
            break;
    }
    return data;
};
export var sendBuffer = function (gl, pos, buffer, geometryIndex, ShaderData, ArrayBufferData) {
    var _a = ArrayBufferData.bufferDataMap[geometryIndex], size = _a.size, type = _a.type, vertexAttribHistory = ShaderData.vertexAttribHistory;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(pos, size, gl[type], false, 0, 0);
    if (vertexAttribHistory[pos] !== true) {
        gl.enableVertexAttribArray(pos);
        vertexAttribHistory[pos] = true;
    }
};
export var sendMatrix4 = function (gl, name, data, uniformLocationMap) {
    _sendUniformData(gl, name, data, uniformLocationMap, function (pos, data) {
        gl.uniformMatrix4fv(pos, false, data);
    });
};
export var sendVector3 = function (gl, shaderIndex, name, data, uniformCacheMap, uniformLocationMap) {
    var recordedData = getUniformCache(shaderIndex, name, uniformCacheMap);
    if (recordedData && recordedData.x == data.x && recordedData.y == data.y && recordedData.z == data.z) {
        return;
    }
    _setUniformCache(shaderIndex, name, data, uniformCacheMap);
    _sendUniformData(gl, name, data, uniformLocationMap, function (pos, data) {
        gl.uniform3f(pos, data.x, data.y, data.z);
    });
};
export var sendFloat1 = requireCheckFunc(function (gl, shaderIndex, name, data, uniformCacheMap, uniformLocationMap) {
    it("data should be number", function () {
        expect(data).be.a("number");
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
    var pos = getUniformLocation(name, uniformLocationMap);
    if (isUniformLocationNotExist(pos)) {
        return;
    }
    sendFunc(pos, data);
};
export var addSendAttributeConfig = ensureFunc(function (returnVal, shaderIndex, materialShaderLibConfig, shaderLibData, sendAttributeConfigMap) {
    it("sendAttributeConfigMap should not has duplicate attribute name", function () {
        expect(hasDuplicateItems(sendAttributeConfigMap[shaderIndex])).false;
    });
}, requireCheckFunc(function (shaderIndex, materialShaderLibConfig, shaderLibData, sendAttributeConfigMap) {
    it("sendAttributeConfigMap[shaderIndex] should not be defined", function () {
        expect(sendAttributeConfigMap[shaderIndex]).not.exist;
    });
}, function (shaderIndex, materialShaderLibConfig, shaderLibData, sendAttributeConfigMap) {
    var sendDataArr = [];
    forEach(materialShaderLibConfig, function (shaderLibName) {
        var sendData = shaderLibData[shaderLibName].send;
        if (isConfigDataExist(sendData) && isConfigDataExist(sendData.attribute)) {
            sendDataArr = sendDataArr.concat(sendData.attribute);
        }
    });
    sendAttributeConfigMap[shaderIndex] = sendDataArr;
}));
export var addSendUniformConfig = ensureFunc(function (returnVal, shaderIndex, materialShaderLibConfig, shaderLibData, sendUniformConfigMap) {
    it("sendUniformConfigMap should not has duplicate attribute name", function () {
        expect(hasDuplicateItems(sendUniformConfigMap[shaderIndex])).false;
    });
}, requireCheckFunc(function (shaderIndex, materialShaderLibConfig, shaderLibData, sendUniformConfigMap) {
    it("sendUniformConfigMap[shaderIndex] should not be defined", function () {
        expect(sendUniformConfigMap[shaderIndex]).not.exist;
    });
}, function (shaderIndex, materialShaderLibConfig, shaderLibData, sendUniformConfigMap) {
    var sendDataArr = [];
    forEach(materialShaderLibConfig, function (shaderLibName) {
        var sendData = shaderLibData[shaderLibName].send;
        if (isConfigDataExist(sendData) && isConfigDataExist(sendData.uniform)) {
            sendDataArr = sendDataArr.concat(sendData.uniform);
        }
    });
    sendUniformConfigMap[shaderIndex] = sendDataArr;
}));
//# sourceMappingURL=glslSenderSystem.js.map