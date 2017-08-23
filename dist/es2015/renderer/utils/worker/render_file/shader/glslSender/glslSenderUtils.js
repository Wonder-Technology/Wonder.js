import { it, requireCheckFunc } from "../../../../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { createMap, isNotValidMapValue } from "../../../../../../utils/objectUtils";
import { Log } from "../../../../../../utils/Log";
import { EBufferType } from "../../../../../enum/EBufferType";
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
export var initData = function (GLSLSenderDataFromSystem) {
    GLSLSenderDataFromSystem.vaoConfigMap = createMap();
    GLSLSenderDataFromSystem.sendUniformConfigMap = createMap();
    GLSLSenderDataFromSystem.sendUniformFuncConfigMap = createMap();
    GLSLSenderDataFromSystem.vertexAttribHistory = [];
    GLSLSenderDataFromSystem.uniformCacheMap = createMap();
};
export var setVaoConfigData = requireCheckFunc(function (data, name, value) {
    it("shouldn't exist duplicate data", function () {
        expect(data[name]).not.exist;
    });
}, function (data, name, value) {
    data[name] = value;
});
//# sourceMappingURL=glslSenderUtils.js.map