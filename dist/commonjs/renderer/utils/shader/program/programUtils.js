"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var contract_1 = require("../../../../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
var EVariableType_1 = require("../../../enum/EVariableType");
var arrayBufferUtils_1 = require("../../buffer/arrayBufferUtils");
var objectUtils_1 = require("../../../../utils/objectUtils");
var arrayUtils_1 = require("../../../../utils/arrayUtils");
var Log_1 = require("../../../../utils/Log");
exports.use = contract_1.requireCheckFunc(function (gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem) {
    contract_1.it("program should exist", function () {
        wonder_expect_js_1.expect(exports.getProgram(shaderIndex, ProgramDataFromSystem)).exist;
    });
}, function (gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem) {
    var program = exports.getProgram(shaderIndex, ProgramDataFromSystem);
    if (ProgramDataFromSystem.lastUsedProgram === program) {
        return;
    }
    ProgramDataFromSystem.lastUsedProgram = program;
    gl.useProgram(program);
    exports.disableVertexAttribArray(gl, GLSLSenderDataFromSystem);
    ProgramDataFromSystem.lastBindedArrayBuffer = null;
    ProgramDataFromSystem.lastBindedIndexBuffer = null;
});
exports.disableVertexAttribArray = contract_1.requireCheckFunc(function (gl, GLSLSenderDataFromSystem) {
    contract_1.it("vertexAttribHistory should has not hole", function () {
        arrayUtils_1.forEach(GLSLSenderDataFromSystem.vertexAttribHistory, function (isEnable) {
            wonder_expect_js_1.expect(isEnable).exist;
            wonder_expect_js_1.expect(isEnable).be.a("boolean");
        });
    });
}, function (gl, GLSLSenderDataFromSystem) {
    var vertexAttribHistory = GLSLSenderDataFromSystem.vertexAttribHistory;
    for (var i = 0, len = vertexAttribHistory.length; i < len; i++) {
        var isEnable = vertexAttribHistory[i];
        if (isEnable === false || i > gl.VERTEX_ATTRIB_ARRAY_ENABLED) {
            continue;
        }
        gl.disableVertexAttribArray(i);
    }
    GLSLSenderDataFromSystem.vertexAttribHistory = [];
});
exports.getMaterialShaderLibConfig = contract_1.requireCheckFunc(function (materialClassName, material_config) {
    var materialData = material_config[materialClassName];
    contract_1.it("materialClassName should be defined", function () {
        wonder_expect_js_1.expect(materialData).exist;
    });
    contract_1.it("shaderLib should be array", function () {
        wonder_expect_js_1.expect(materialData.shader.shaderLib).be.a("array");
    });
}, function (materialClassName, material_config) {
    return material_config[materialClassName].shader.shaderLib;
});
exports.registerProgram = function (shaderIndex, ProgramDataFromSystem, program) {
    ProgramDataFromSystem.programMap[shaderIndex] = program;
};
exports.getProgram = contract_1.ensureFunc(function (program) {
}, function (shaderIndex, ProgramDataFromSystem) {
    return ProgramDataFromSystem.programMap[shaderIndex];
});
exports.isProgramExist = function (program) { return objectUtils_1.isValidMapValue(program); };
exports.initShader = function (program, vsSource, fsSource, gl) {
    var vs = _compileShader(gl, vsSource, gl.createShader(gl.VERTEX_SHADER)), fs = _compileShader(gl, fsSource, gl.createShader(gl.FRAGMENT_SHADER));
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.bindAttribLocation(program, 0, "a_position");
    _linkProgram(gl, program);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
};
var _linkProgram = contract_1.ensureFunc(function (returnVal, gl, program) {
    contract_1.it("link program error:" + gl.getProgramInfoLog(program), function () {
        wonder_expect_js_1.expect(gl.getProgramParameter(program, gl.LINK_STATUS)).true;
    });
}, function (gl, program) {
    gl.linkProgram(program);
});
var _compileShader = function (gl, glslSource, shader) {
    gl.shaderSource(shader, glslSource);
    gl.compileShader(shader);
    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        return shader;
    }
    else {
        Log_1.Log.log(gl.getShaderInfoLog(shader));
        Log_1.Log.log("source:\n", glslSource);
    }
};
exports.sendAttributeData = function (gl, shaderIndex, geometryIndex, getVertices, getAttribLocation, isAttributeLocationNotExist, sendBuffer, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem, GeometryWorkerData, ArrayBufferData) {
    var sendDataArr = GLSLSenderDataFromSystem.sendAttributeConfigMap[shaderIndex], attributeLocationMap = LocationDataFromSystem.attributeLocationMap[shaderIndex], lastBindedArrayBuffer = ProgramDataFromSystem.lastBindedArrayBuffer;
    for (var _i = 0, sendDataArr_1 = sendDataArr; _i < sendDataArr_1.length; _i++) {
        var sendData = sendDataArr_1[_i];
        var buffer = arrayBufferUtils_1.getOrCreateBuffer(gl, geometryIndex, sendData.buffer, getVertices, GeometryWorkerData, ArrayBufferData), pos = getAttribLocation(sendData.name, attributeLocationMap);
        if (isAttributeLocationNotExist(pos)) {
            return;
        }
        if (lastBindedArrayBuffer === buffer) {
            return;
        }
        lastBindedArrayBuffer = buffer;
        sendBuffer(gl, pos, buffer, geometryIndex, GLSLSenderDataFromSystem, ArrayBufferData);
    }
    ProgramDataFromSystem.lastBindedArrayBuffer = lastBindedArrayBuffer;
};
exports.sendUniformData = function (gl, shaderIndex, _a, MaterialWorkerData, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem, renderCommandUniformData) {
    var getUniformData = _a.getUniformData, sendMatrix4 = _a.sendMatrix4, sendVector3 = _a.sendVector3, sendFloat1 = _a.sendFloat1;
    var sendDataArr = GLSLSenderDataFromSystem.sendUniformConfigMap[shaderIndex], uniformLocationMap = LocationDataFromSystem.uniformLocationMap[shaderIndex], uniformCacheMap = GLSLSenderDataFromSystem.uniformCacheMap;
    for (var i = 0, len = sendDataArr.length; i < len; i++) {
        var sendData = sendDataArr[i], name_1 = sendData.name, field = sendData.field, type = sendData.type, from = sendData.from || "cmd", data = getUniformData(field, from, renderCommandUniformData, MaterialWorkerData);
        switch (type) {
            case EVariableType_1.EVariableType.MAT4:
                sendMatrix4(gl, name_1, data, uniformLocationMap);
                break;
            case EVariableType_1.EVariableType.VEC3:
                sendVector3(gl, shaderIndex, name_1, data, uniformCacheMap, uniformLocationMap);
                break;
            case EVariableType_1.EVariableType.FLOAT:
                sendFloat1(gl, shaderIndex, name_1, data, uniformCacheMap, uniformLocationMap);
                break;
            default:
                Log_1.Log.error(true, Log_1.Log.info.FUNC_INVALID("EVariableType:", type));
                break;
        }
    }
};
exports.initData = function (ProgramDataFromSystem) {
    ProgramDataFromSystem.programMap = objectUtils_1.createMap();
};
//# sourceMappingURL=programUtils.js.map