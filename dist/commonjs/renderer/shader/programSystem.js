"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var contract_1 = require("../../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
var locationSystem_1 = require("./locationSystem");
var EVariableType_1 = require("../enum/EVariableType");
var Log_1 = require("../../utils/Log");
var ArrayBufferSystem_1 = require("../buffer/ArrayBufferSystem");
var objectUtils_1 = require("../../utils/objectUtils");
var glslSenderSystem_1 = require("./glslSenderSystem");
var arrayUtils_1 = require("../../utils/arrayUtils");
exports.use = contract_1.requireCheckFunc(function (gl, shaderIndex, ShaderData) {
    contract_1.it("program should exist", function () {
        wonder_expect_js_1.expect(exports.getProgram(shaderIndex, ShaderData)).exist;
    });
}, function (gl, shaderIndex, ShaderData) {
    var program = exports.getProgram(shaderIndex, ShaderData);
    if (ShaderData.lastUsedProgram === program) {
        return;
    }
    ShaderData.lastUsedProgram = program;
    gl.useProgram(program);
    exports.disableVertexAttribArray(gl, ShaderData);
    ShaderData.lastBindedArrayBuffer = null;
    ShaderData.lastBindedIndexBuffer = null;
});
exports.disableVertexAttribArray = contract_1.requireCheckFunc(function (gl, ShaderData) {
    contract_1.it("vertexAttribHistory should has not hole", function () {
        arrayUtils_1.forEach(ShaderData.vertexAttribHistory, function (isEnable) {
            wonder_expect_js_1.expect(isEnable).exist;
            wonder_expect_js_1.expect(isEnable).be.a("boolean");
        });
    });
}, function (gl, ShaderData) {
    var vertexAttribHistory = ShaderData.vertexAttribHistory;
    for (var i = 0, len = vertexAttribHistory.length; i < len; i++) {
        var isEnable = vertexAttribHistory[i];
        if (isEnable === false || i > gl.VERTEX_ATTRIB_ARRAY_ENABLED) {
            continue;
        }
        gl.disableVertexAttribArray(i);
    }
    ShaderData.vertexAttribHistory = [];
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
exports.registerProgram = function (shaderIndex, ShaderData, program) {
    ShaderData.programMap[shaderIndex] = program;
};
exports.getProgram = contract_1.ensureFunc(function (program) {
}, function (shaderIndex, ShaderData) {
    return ShaderData.programMap[shaderIndex];
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
exports.sendAttributeData = function (gl, shaderIndex, geometryIndex, ShaderData, GeometryData, ArrayBufferData) {
    var sendDataArr = ShaderData.sendAttributeConfigMap[shaderIndex], attributeLocationMap = ShaderData.attributeLocationMap[shaderIndex], lastBindedArrayBuffer = ShaderData.lastBindedArrayBuffer;
    for (var _i = 0, sendDataArr_1 = sendDataArr; _i < sendDataArr_1.length; _i++) {
        var sendData = sendDataArr_1[_i];
        var buffer = ArrayBufferSystem_1.getOrCreateBuffer(gl, geometryIndex, sendData.buffer, GeometryData, ArrayBufferData), pos = locationSystem_1.getAttribLocation(sendData.name, attributeLocationMap);
        if (locationSystem_1.isAttributeLocationNotExist(pos)) {
            return;
        }
        if (lastBindedArrayBuffer === buffer) {
            return;
        }
        lastBindedArrayBuffer = buffer;
        glslSenderSystem_1.sendBuffer(gl, pos, buffer, geometryIndex, ShaderData, ArrayBufferData);
    }
    ShaderData.lastBindedArrayBuffer = lastBindedArrayBuffer;
};
exports.sendUniformData = function (gl, shaderIndex, MaterialData, ShaderData, renderCommand) {
    var sendDataArr = ShaderData.sendUniformConfigMap[shaderIndex], uniformLocationMap = ShaderData.uniformLocationMap[shaderIndex], uniformCacheMap = ShaderData.uniformCacheMap;
    for (var _i = 0, sendDataArr_2 = sendDataArr; _i < sendDataArr_2.length; _i++) {
        var sendData = sendDataArr_2[_i];
        var name_1 = sendData.name, field = sendData.field, type = sendData.type, from = sendData.from || "cmd", data = glslSenderSystem_1.getUniformData(field, from, renderCommand, MaterialData);
        switch (type) {
            case EVariableType_1.EVariableType.MAT4:
                glslSenderSystem_1.sendMatrix4(gl, name_1, data, uniformLocationMap);
                break;
            case EVariableType_1.EVariableType.VEC3:
                glslSenderSystem_1.sendVector3(gl, shaderIndex, name_1, data, uniformCacheMap, uniformLocationMap);
                break;
            case EVariableType_1.EVariableType.FLOAT:
                glslSenderSystem_1.sendFloat1(gl, shaderIndex, name_1, data, uniformCacheMap, uniformLocationMap);
                break;
            default:
                Log_1.Log.error(true, Log_1.Log.info.FUNC_INVALID("EVariableType:", type));
                break;
        }
    }
};
//# sourceMappingURL=programSystem.js.map