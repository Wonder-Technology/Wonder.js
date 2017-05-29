import { ensureFunc, it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { getAttribLocation, isAttributeLocationNotExist } from "./locationSystem";
import { EVariableType } from "../enum/EVariableType";
import { Log } from "../../utils/Log";
import { getOrCreateBuffer as getOrCreateArrayBuffer } from "../buffer/ArrayBufferSystem";
import { isValidMapValue } from "../../utils/objectUtils";
import { getUniformData, sendBuffer, sendFloat1, sendMatrix4, sendVector3 } from "./glslSenderSystem";
import { forEach } from "../../utils/arrayUtils";
export var use = requireCheckFunc(function (gl, shaderIndex, ShaderData) {
    it("program should exist", function () {
        expect(getProgram(shaderIndex, ShaderData)).exist;
    });
}, function (gl, shaderIndex, ShaderData) {
    var program = getProgram(shaderIndex, ShaderData);
    if (ShaderData.lastUsedProgram === program) {
        return;
    }
    ShaderData.lastUsedProgram = program;
    gl.useProgram(program);
    disableVertexAttribArray(gl, ShaderData);
    ShaderData.lastBindedArrayBuffer = null;
    ShaderData.lastBindedIndexBuffer = null;
});
export var disableVertexAttribArray = requireCheckFunc(function (gl, ShaderData) {
    it("vertexAttribHistory should has not hole", function () {
        forEach(ShaderData.vertexAttribHistory, function (isEnable) {
            expect(isEnable).exist;
            expect(isEnable).be.a("boolean");
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
export var getMaterialShaderLibConfig = requireCheckFunc(function (materialClassName, material_config) {
    var materialData = material_config[materialClassName];
    it("materialClassName should be defined", function () {
        expect(materialData).exist;
    });
    it("shaderLib should be array", function () {
        expect(materialData.shader.shaderLib).be.a("array");
    });
}, function (materialClassName, material_config) {
    return material_config[materialClassName].shader.shaderLib;
});
export var registerProgram = function (shaderIndex, ShaderData, program) {
    ShaderData.programMap[shaderIndex] = program;
};
export var getProgram = ensureFunc(function (program) {
}, function (shaderIndex, ShaderData) {
    return ShaderData.programMap[shaderIndex];
});
export var isProgramExist = function (program) { return isValidMapValue(program); };
export var initShader = function (program, vsSource, fsSource, gl) {
    var vs = _compileShader(gl, vsSource, gl.createShader(gl.VERTEX_SHADER)), fs = _compileShader(gl, fsSource, gl.createShader(gl.FRAGMENT_SHADER));
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.bindAttribLocation(program, 0, "a_position");
    _linkProgram(gl, program);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
};
var _linkProgram = ensureFunc(function (returnVal, gl, program) {
    it("link program error:" + gl.getProgramInfoLog(program), function () {
        expect(gl.getProgramParameter(program, gl.LINK_STATUS)).true;
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
        Log.log(gl.getShaderInfoLog(shader));
        Log.log("source:\n", glslSource);
    }
};
export var sendAttributeData = function (gl, shaderIndex, geometryIndex, ShaderData, GeometryData, ArrayBufferData) {
    var sendDataArr = ShaderData.sendAttributeConfigMap[shaderIndex], attributeLocationMap = ShaderData.attributeLocationMap[shaderIndex], lastBindedArrayBuffer = ShaderData.lastBindedArrayBuffer;
    for (var _i = 0, sendDataArr_1 = sendDataArr; _i < sendDataArr_1.length; _i++) {
        var sendData = sendDataArr_1[_i];
        var buffer = getOrCreateArrayBuffer(gl, geometryIndex, sendData.buffer, GeometryData, ArrayBufferData), pos = getAttribLocation(sendData.name, attributeLocationMap);
        if (isAttributeLocationNotExist(pos)) {
            return;
        }
        if (lastBindedArrayBuffer === buffer) {
            return;
        }
        lastBindedArrayBuffer = buffer;
        sendBuffer(gl, pos, buffer, geometryIndex, ShaderData, ArrayBufferData);
    }
    ShaderData.lastBindedArrayBuffer = lastBindedArrayBuffer;
};
export var sendUniformData = function (gl, shaderIndex, MaterialData, ShaderData, renderCommand) {
    var sendDataArr = ShaderData.sendUniformConfigMap[shaderIndex], uniformLocationMap = ShaderData.uniformLocationMap[shaderIndex], uniformCacheMap = ShaderData.uniformCacheMap;
    for (var _i = 0, sendDataArr_2 = sendDataArr; _i < sendDataArr_2.length; _i++) {
        var sendData = sendDataArr_2[_i];
        var name_1 = sendData.name, field = sendData.field, type = sendData.type, from = sendData.from || "cmd", data = getUniformData(field, from, renderCommand, MaterialData);
        switch (type) {
            case EVariableType.MAT4:
                sendMatrix4(gl, name_1, data, uniformLocationMap);
                break;
            case EVariableType.VEC3:
                sendVector3(gl, shaderIndex, name_1, data, uniformCacheMap, uniformLocationMap);
                break;
            case EVariableType.FLOAT:
                sendFloat1(gl, shaderIndex, name_1, data, uniformCacheMap, uniformLocationMap);
                break;
            default:
                Log.error(true, Log.info.FUNC_INVALID("EVariableType:", type));
                break;
        }
    }
};
//# sourceMappingURL=programSystem.js.map