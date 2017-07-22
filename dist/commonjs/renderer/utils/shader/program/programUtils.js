"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var contract_1 = require("../../../../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
var EVariableType_1 = require("../../../enum/EVariableType");
var arrayBufferUtils_1 = require("../../buffer/arrayBufferUtils");
var objectUtils_1 = require("../../../../utils/objectUtils");
var arrayUtils_1 = require("../../../../utils/arrayUtils");
var Log_1 = require("../../../../utils/Log");
var mapManagerUtils_1 = require("../../texture/mapManagerUtils");
exports.use = contract_1.requireCheckFunc(function (gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem) {
    contract_1.it("program should exist", function () {
        wonder_expect_js_1.expect(exports.getProgram(shaderIndex, ProgramDataFromSystem)).exist;
    });
}, function (gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem) {
    var program = exports.getProgram(shaderIndex, ProgramDataFromSystem);
    if (ProgramDataFromSystem.lastUsedProgram === program) {
        return program;
    }
    ProgramDataFromSystem.lastUsedProgram = program;
    gl.useProgram(program);
    exports.disableVertexAttribArray(gl, GLSLSenderDataFromSystem);
    ProgramDataFromSystem.lastBindedArrayBuffer = null;
    ProgramDataFromSystem.lastBindedIndexBuffer = null;
    return program;
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
    var materialData = material_config.materials[materialClassName];
    contract_1.it("materialClassName should be defined", function () {
        wonder_expect_js_1.expect(materialData).exist;
    });
    contract_1.it("shaderLib should be array", function () {
        wonder_expect_js_1.expect(materialData.shader.shaderLib).be.a("array");
    });
}, function (materialClassName, material_config) {
    return material_config.materials[materialClassName].shader.shaderLib;
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
exports.sendAttributeData = function (gl, shaderIndex, program, geometryIndex, getArrayBufferDataFuncMap, getAttribLocation, isAttributeLocationNotExist, sendBuffer, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem, GeometryDataFromSystem, ArrayBufferDataFromSystem) {
    var sendDataArr = GLSLSenderDataFromSystem.sendAttributeConfigMap[shaderIndex], attributeLocationMap = LocationDataFromSystem.attributeLocationMap[shaderIndex], lastBindedArrayBuffer = ProgramDataFromSystem.lastBindedArrayBuffer;
    for (var _i = 0, sendDataArr_1 = sendDataArr; _i < sendDataArr_1.length; _i++) {
        var sendData_1 = sendDataArr_1[_i];
        var bufferName = sendData_1.buffer, buffer = _getOrCreateArrayBuffer(gl, geometryIndex, bufferName, getArrayBufferDataFuncMap, GeometryDataFromSystem, ArrayBufferDataFromSystem), pos = null;
        if (lastBindedArrayBuffer === buffer) {
            continue;
        }
        pos = getAttribLocation(gl, program, sendData_1.name, attributeLocationMap);
        if (isAttributeLocationNotExist(pos)) {
            continue;
        }
        lastBindedArrayBuffer = buffer;
        sendBuffer(gl, sendData_1.type, pos, buffer, geometryIndex, GLSLSenderDataFromSystem, ArrayBufferDataFromSystem);
    }
    ProgramDataFromSystem.lastBindedArrayBuffer = lastBindedArrayBuffer;
};
var _getOrCreateArrayBuffer = function (gl, geometryIndex, bufferName, _a, GeometryDataFromSystem, ArrayBufferDataFromSystem) {
    var getVertices = _a.getVertices, getNormals = _a.getNormals, getTexCoords = _a.getTexCoords;
    var buffer = null;
    switch (bufferName) {
        case "vertex":
            buffer = arrayBufferUtils_1.getOrCreateBuffer(gl, geometryIndex, ArrayBufferDataFromSystem.vertexBuffer, getVertices, GeometryDataFromSystem, ArrayBufferDataFromSystem);
            break;
        case "normal":
            buffer = arrayBufferUtils_1.getOrCreateBuffer(gl, geometryIndex, ArrayBufferDataFromSystem.normalBuffers, getNormals, GeometryDataFromSystem, ArrayBufferDataFromSystem);
            break;
        case "texCoord":
            buffer = arrayBufferUtils_1.getOrCreateBuffer(gl, geometryIndex, ArrayBufferDataFromSystem.texCoordBuffers, getTexCoords, GeometryDataFromSystem, ArrayBufferDataFromSystem);
            break;
        default:
            Log_1.Log.error(true, Log_1.Log.info.FUNC_INVALID("name:" + name));
            break;
    }
    return buffer;
};
exports.sendUniformData = function (gl, shaderIndex, program, mapCount, sendDataMap, drawDataMap, renderCommandUniformData) {
    var uniformLocationMap = drawDataMap.LocationDataFromSystem.uniformLocationMap[shaderIndex], uniformCacheMap = drawDataMap.GLSLSenderDataFromSystem.uniformCacheMap;
    _sendUniformData(gl, shaderIndex, program, sendDataMap.glslSenderData, drawDataMap, uniformLocationMap, uniformCacheMap, renderCommandUniformData);
    _sendUniformFuncData(gl, shaderIndex, program, sendDataMap, drawDataMap, uniformLocationMap, uniformCacheMap);
    mapManagerUtils_1.sendData(gl, mapCount, shaderIndex, program, sendDataMap.glslSenderData, uniformLocationMap, uniformCacheMap, exports.directlySendUniformData, drawDataMap.TextureDataFromSystem, drawDataMap.MapManagerDataFromSystem);
};
var _sendUniformData = function (gl, shaderIndex, program, glslSenderData, _a, uniformLocationMap, uniformCacheMap, renderCommandUniformData) {
    var MaterialDataFromSystem = _a.MaterialDataFromSystem, BasicMaterialDataFromSystem = _a.BasicMaterialDataFromSystem, LightMaterialDataFromSystem = _a.LightMaterialDataFromSystem;
    var sendUniformDataArr = glslSenderData.GLSLSenderDataFromSystem.sendUniformConfigMap[shaderIndex];
    for (var i = 0, len = sendUniformDataArr.length; i < len; i++) {
        var sendData_2 = sendUniformDataArr[i], name_1 = sendData_2.name, field = sendData_2.field, type = sendData_2.type, from = sendData_2.from || "cmd", data = glslSenderData.getUniformData(field, from, renderCommandUniformData, MaterialDataFromSystem, BasicMaterialDataFromSystem, LightMaterialDataFromSystem);
        exports.directlySendUniformData(gl, name_1, shaderIndex, program, type, data, glslSenderData, uniformLocationMap, uniformCacheMap);
    }
};
exports.directlySendUniformData = function (gl, name, shaderIndex, program, type, data, _a, uniformLocationMap, uniformCacheMap) {
    var sendMatrix3 = _a.sendMatrix3, sendMatrix4 = _a.sendMatrix4, sendVector3 = _a.sendVector3, sendInt = _a.sendInt, sendFloat1 = _a.sendFloat1, sendFloat3 = _a.sendFloat3;
    switch (type) {
        case EVariableType_1.EVariableType.MAT3:
            sendMatrix3(gl, program, name, data, uniformLocationMap);
            break;
        case EVariableType_1.EVariableType.MAT4:
            sendMatrix4(gl, program, name, data, uniformLocationMap);
            break;
        case EVariableType_1.EVariableType.VEC3:
            sendVector3(gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap);
            break;
        case EVariableType_1.EVariableType.INT:
        case EVariableType_1.EVariableType.SAMPLER_2D:
            sendInt(gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap);
            break;
        case EVariableType_1.EVariableType.FLOAT:
            sendFloat1(gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap);
            break;
        case EVariableType_1.EVariableType.FLOAT3:
            sendFloat3(gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap);
            break;
        default:
            Log_1.Log.error(true, Log_1.Log.info.FUNC_INVALID("EVariableType:", type));
            break;
    }
};
var _sendUniformFuncData = function (gl, shaderIndex, program, sendDataMap, drawDataMap, uniformLocationMap, uniformCacheMap) {
    var sendUniformFuncDataArr = drawDataMap.GLSLSenderDataFromSystem.sendUniformFuncConfigMap[shaderIndex];
    for (var i = 0, len = sendUniformFuncDataArr.length; i < len; i++) {
        var sendFunc = sendUniformFuncDataArr[i];
        sendFunc(gl, shaderIndex, program, sendDataMap, uniformLocationMap, uniformCacheMap);
    }
};
exports.initData = function (ProgramDataFromSystem) {
    ProgramDataFromSystem.programMap = objectUtils_1.createMap();
};
//# sourceMappingURL=programUtils.js.map