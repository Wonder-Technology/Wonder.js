import { forEach, hasDuplicateItems } from "../../../../utils/arrayUtils";
import { isConfigDataExist } from "../../renderConfigUtils";
import { ensureFunc, it, requireCheckFunc } from "../../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { createMap, isNotValidMapValue } from "../../../../utils/objectUtils";
import { Log } from "../../../../utils/Log";
import { EBufferType } from "../../../enum/EBufferType";
export var getUniformData = function (field, from, renderCommandUniformData, materialData, basicMaterialData, lightMaterialData) {
    var data = null;
    switch (from) {
        case "cmd":
            data = renderCommandUniformData[field];
            break;
        case "basicMaterial":
            data = _getUnifromDataFromBasicMaterial(field, renderCommandUniformData.materialIndex, materialData, basicMaterialData);
            break;
        case "lightMaterial":
            data = _getUnifromDataFromLightMaterial(field, renderCommandUniformData.materialIndex, materialData, lightMaterialData);
            break;
        default:
            Log.error(true, Log.info.FUNC_UNKNOW("from:" + from));
            break;
    }
    return data;
};
var _getUnifromDataFromBasicMaterial = function (field, index, _a, _b) {
    var getColorArr3 = _a.getColorArr3, getOpacity = _a.getOpacity, MaterialDataFromSystem = _a.MaterialDataFromSystem;
    var BasicMaterialDataFromSystem = _b.BasicMaterialDataFromSystem;
    var data = null;
    switch (field) {
        case "color":
            data = getColorArr3(index, MaterialDataFromSystem);
            break;
        case "opacity":
            data = getOpacity(index, MaterialDataFromSystem);
            break;
        default:
            Log.error(true, Log.info.FUNC_UNKNOW("field:" + field));
            break;
    }
    return data;
};
var _getUnifromDataFromLightMaterial = function (field, index, _a, _b) {
    var getColorArr3 = _a.getColorArr3, getOpacity = _a.getOpacity, MaterialDataFromSystem = _a.MaterialDataFromSystem;
    var getEmissionColorArr3 = _b.getEmissionColorArr3, getSpecularColorArr3 = _b.getSpecularColorArr3, getShininess = _b.getShininess, getLightModel = _b.getLightModel, LightMaterialDataFromSystem = _b.LightMaterialDataFromSystem;
    var data = null;
    switch (field) {
        case "color":
            data = getColorArr3(index, MaterialDataFromSystem);
            break;
        case "emissionColor":
            data = getEmissionColorArr3(index, LightMaterialDataFromSystem);
            break;
        case "opacity":
            data = getOpacity(index, MaterialDataFromSystem);
            break;
        case "specularColor":
            data = getSpecularColorArr3(index, LightMaterialDataFromSystem);
            break;
        case "shininess":
            data = getShininess(index, LightMaterialDataFromSystem);
            break;
        case "lightModel":
            data = getLightModel(index, LightMaterialDataFromSystem);
            break;
        default:
            Log.error(true, Log.info.FUNC_UNKNOW("field:" + field));
            break;
    }
    return data;
};
export var sendBuffer = function (gl, type, pos, buffer, geometryIndex, GLSLSenderDataFromSystem, ArrayBufferData) {
    var vertexAttribHistory = GLSLSenderDataFromSystem.vertexAttribHistory;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(pos, _getBufferSizeByType(type), gl[EBufferType.FLOAT], false, 0, 0);
    if (vertexAttribHistory[pos] !== true) {
        gl.enableVertexAttribArray(pos);
        vertexAttribHistory[pos] = true;
    }
};
var _getBufferSizeByType = function (type) {
    var size = null;
    switch (type) {
        case "vec2":
            size = 2;
            break;
        case "vec3":
            size = 3;
            break;
        default:
            Log.error(true, Log.info.FUNC_INVALID("type:" + type));
            break;
    }
    return size;
};
export var sendMatrix3 = function (gl, program, name, data, uniformLocationMap, getUniformLocation, isUniformLocationNotExist) {
    _sendUniformData(gl, program, name, data, uniformLocationMap, getUniformLocation, isUniformLocationNotExist, function (pos, data) {
        gl.uniformMatrix3fv(pos, false, data);
    });
};
export var sendMatrix4 = function (gl, program, name, data, uniformLocationMap, getUniformLocation, isUniformLocationNotExist) {
    _sendUniformData(gl, program, name, data, uniformLocationMap, getUniformLocation, isUniformLocationNotExist, function (pos, data) {
        gl.uniformMatrix4fv(pos, false, data);
    });
};
export var sendVector3 = function (gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap, getUniformLocation, isUniformLocationNotExist) {
    var recordedData = _getUniformCache(shaderIndex, name, uniformCacheMap), x = data.x, y = data.y, z = data.z;
    if (recordedData && recordedData.x == x && recordedData.y == y && recordedData.z == z) {
        return;
    }
    _setUniformCache(shaderIndex, name, data, uniformCacheMap);
    _sendUniformData(gl, program, name, data, uniformLocationMap, getUniformLocation, isUniformLocationNotExist, function (pos, data) {
        gl.uniform3f(pos, x, y, z);
    });
};
export var sendInt = requireCheckFunc(function (gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap, getUniformLocation, isUniformLocationNotExist, glFunc) {
    it("data should be number", function () {
        expect(data).be.a("number");
    });
}, function (gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap, getUniformLocation, isUniformLocationNotExist, glFunc) {
    var recordedData = _getUniformCache(shaderIndex, name, uniformCacheMap);
    if (recordedData === data) {
        return;
    }
    _setUniformCache(shaderIndex, name, data, uniformCacheMap);
    _sendUniformData(gl, program, name, data, uniformLocationMap, getUniformLocation, isUniformLocationNotExist, function (pos, data) {
        gl.uniform1i(pos, data);
    });
});
export var sendFloat1 = requireCheckFunc(function (gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap, getUniformLocation, isUniformLocationNotExist, glFunc) {
    it("data should be number", function () {
        expect(data).be.a("number");
    });
}, function (gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap, getUniformLocation, isUniformLocationNotExist, glFunc) {
    var recordedData = _getUniformCache(shaderIndex, name, uniformCacheMap);
    if (recordedData === data) {
        return;
    }
    _setUniformCache(shaderIndex, name, data, uniformCacheMap);
    _sendUniformData(gl, program, name, data, uniformLocationMap, getUniformLocation, isUniformLocationNotExist, function (pos, data) {
        gl.uniform1f(pos, data);
    });
});
export var sendFloat3 = function (gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap, getUniformLocation, isUniformLocationNotExist) {
    var recordedData = _getUniformCache(shaderIndex, name, uniformCacheMap), x = data[0], y = data[1], z = data[2];
    if (recordedData && recordedData[0] == x && recordedData[1] == y && recordedData[2] == z) {
        return;
    }
    _setUniformCache(shaderIndex, name, data, uniformCacheMap);
    _sendUniformData(gl, program, name, data, uniformLocationMap, getUniformLocation, isUniformLocationNotExist, function (pos, data) {
        gl.uniform3f(pos, x, y, z);
    });
};
var _getUniformCache = function (shaderIndex, name, uniformCacheMap) {
    var cache = uniformCacheMap[shaderIndex];
    if (_isCacheNotExist(cache)) {
        cache = {};
        uniformCacheMap[shaderIndex] = cache;
        return null;
    }
    return cache[name];
};
var _isCacheNotExist = function (cache) { return isNotValidMapValue(cache); };
var _setUniformCache = function (shaderIndex, name, data, uniformCacheMap) {
    uniformCacheMap[shaderIndex][name] = data;
};
var _sendUniformData = function (gl, program, name, data, uniformLocationMap, getUniformLocation, isUniformLocationNotExist, send) {
    var pos = getUniformLocation(gl, program, name, uniformLocationMap);
    if (isUniformLocationNotExist(pos)) {
        return;
    }
    send(pos, data);
};
export var addSendAttributeConfig = ensureFunc(function (returnVal, shaderIndex, materialShaderLibNameArr, shaderLibData, sendAttributeConfigMap) {
    it("sendAttributeConfigMap should not has duplicate attribute name", function () {
        expect(hasDuplicateItems(sendAttributeConfigMap[shaderIndex])).false;
    });
}, requireCheckFunc(function (shaderIndex, materialShaderLibNameArr, shaderLibData, sendAttributeConfigMap) {
    it("sendAttributeConfigMap[shaderIndex] should not be defined", function () {
        expect(sendAttributeConfigMap[shaderIndex]).not.exist;
    });
}, function (shaderIndex, materialShaderLibNameArr, shaderLibData, sendAttributeConfigMap) {
    var sendDataArr = [];
    forEach(materialShaderLibNameArr, function (shaderLibName) {
        var sendData = shaderLibData[shaderLibName].send;
        if (isConfigDataExist(sendData) && isConfigDataExist(sendData.attribute)) {
            sendDataArr = sendDataArr.concat(sendData.attribute);
        }
    });
    sendAttributeConfigMap[shaderIndex] = sendDataArr;
}));
export var addSendUniformConfig = ensureFunc(function (returnVal, shaderIndex, materialShaderLibNameArr, shaderLibData, GLSLSenderDataFromSystem) {
    it("sendUniformConfigMap should not has duplicate attribute name", function () {
        expect(hasDuplicateItems(GLSLSenderDataFromSystem.sendUniformConfigMap[shaderIndex])).false;
    });
}, requireCheckFunc(function (shaderIndex, materialShaderLibNameArr, shaderLibData, GLSLSenderDataFromSystem) {
    it("sendUniformConfigMap[shaderIndex] should not be defined", function () {
        expect(GLSLSenderDataFromSystem.sendUniformConfigMap[shaderIndex]).not.exist;
    });
}, function (shaderIndex, materialShaderLibNameArr, shaderLibData, GLSLSenderDataFromSystem) {
    var sendUniformDataArr = [], sendUniformFuncDataArr = [];
    forEach(materialShaderLibNameArr, function (shaderLibName) {
        var sendData = shaderLibData[shaderLibName].send;
        if (isConfigDataExist(sendData)) {
            if (isConfigDataExist(sendData.uniform)) {
                sendUniformDataArr = sendUniformDataArr.concat(sendData.uniform);
            }
            if (isConfigDataExist(sendData.uniformFunc)) {
                sendUniformFuncDataArr = sendUniformFuncDataArr.concat(sendData.uniformFunc);
            }
        }
    });
    GLSLSenderDataFromSystem.sendUniformConfigMap[shaderIndex] = sendUniformDataArr;
    GLSLSenderDataFromSystem.sendUniformFuncConfigMap[shaderIndex] = sendUniformFuncDataArr;
}));
export var initData = function (GLSLSenderDataFromSystem) {
    GLSLSenderDataFromSystem.sendAttributeConfigMap = createMap();
    GLSLSenderDataFromSystem.sendUniformConfigMap = createMap();
    GLSLSenderDataFromSystem.sendUniformFuncConfigMap = createMap();
    GLSLSenderDataFromSystem.vertexAttribHistory = [];
    GLSLSenderDataFromSystem.uniformCacheMap = createMap();
};
//# sourceMappingURL=glslSenderUtils.js.map