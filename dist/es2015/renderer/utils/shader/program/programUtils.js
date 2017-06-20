import { ensureFunc, it, requireCheckFunc } from "../../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { EVariableType } from "../../../enum/EVariableType";
import { getOrCreateBuffer as getOrCreateArrayBuffer } from "../../buffer/arrayBufferUtils";
import { createMap, isValidMapValue } from "../../../../utils/objectUtils";
import { forEach } from "../../../../utils/arrayUtils";
import { Log } from "../../../../utils/Log";
export var use = requireCheckFunc(function (gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem) {
    it("program should exist", function () {
        expect(getProgram(shaderIndex, ProgramDataFromSystem)).exist;
    });
}, function (gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem) {
    var program = getProgram(shaderIndex, ProgramDataFromSystem);
    if (ProgramDataFromSystem.lastUsedProgram === program) {
        return;
    }
    ProgramDataFromSystem.lastUsedProgram = program;
    gl.useProgram(program);
    disableVertexAttribArray(gl, GLSLSenderDataFromSystem);
    ProgramDataFromSystem.lastBindedArrayBuffer = null;
    ProgramDataFromSystem.lastBindedIndexBuffer = null;
});
export var disableVertexAttribArray = requireCheckFunc(function (gl, GLSLSenderDataFromSystem) {
    it("vertexAttribHistory should has not hole", function () {
        forEach(GLSLSenderDataFromSystem.vertexAttribHistory, function (isEnable) {
            expect(isEnable).exist;
            expect(isEnable).be.a("boolean");
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
export var registerProgram = function (shaderIndex, ProgramDataFromSystem, program) {
    ProgramDataFromSystem.programMap[shaderIndex] = program;
};
export var getProgram = ensureFunc(function (program) {
}, function (shaderIndex, ProgramDataFromSystem) {
    return ProgramDataFromSystem.programMap[shaderIndex];
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
export var sendAttributeData = function (gl, shaderIndex, geometryIndex, getVertices, getAttribLocation, isAttributeLocationNotExist, sendBuffer, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem, GeometryWorkerData, ArrayBufferData) {
    var sendDataArr = GLSLSenderDataFromSystem.sendAttributeConfigMap[shaderIndex], attributeLocationMap = LocationDataFromSystem.attributeLocationMap[shaderIndex], lastBindedArrayBuffer = ProgramDataFromSystem.lastBindedArrayBuffer;
    for (var _i = 0, sendDataArr_1 = sendDataArr; _i < sendDataArr_1.length; _i++) {
        var sendData = sendDataArr_1[_i];
        var buffer = getOrCreateArrayBuffer(gl, geometryIndex, sendData.buffer, getVertices, GeometryWorkerData, ArrayBufferData), pos = getAttribLocation(sendData.name, attributeLocationMap);
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
export var sendUniformData = function (gl, shaderIndex, _a, MaterialWorkerData, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem, renderCommandUniformData) {
    var getUniformData = _a.getUniformData, sendMatrix4 = _a.sendMatrix4, sendVector3 = _a.sendVector3, sendFloat1 = _a.sendFloat1;
    var sendDataArr = GLSLSenderDataFromSystem.sendUniformConfigMap[shaderIndex], uniformLocationMap = LocationDataFromSystem.uniformLocationMap[shaderIndex], uniformCacheMap = GLSLSenderDataFromSystem.uniformCacheMap;
    for (var i = 0, len = sendDataArr.length; i < len; i++) {
        var sendData = sendDataArr[i], name_1 = sendData.name, field = sendData.field, type = sendData.type, from = sendData.from || "cmd", data = getUniformData(field, from, renderCommandUniformData, MaterialWorkerData);
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
export var initData = function (ProgramDataFromSystem) {
    ProgramDataFromSystem.programMap = createMap();
};
//# sourceMappingURL=programUtils.js.map