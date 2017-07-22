import { ensureFunc, it, requireCheckFunc } from "../../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { EVariableType } from "../../../enum/EVariableType";
import { getOrCreateBuffer as getOrCreateArrayBuffer } from "../../buffer/arrayBufferUtils";
import { createMap, isValidMapValue } from "../../../../utils/objectUtils";
import { forEach } from "../../../../utils/arrayUtils";
import { Log } from "../../../../utils/Log";
import { sendData } from "../../texture/mapManagerUtils";
export var use = requireCheckFunc(function (gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem) {
    it("program should exist", function () {
        expect(getProgram(shaderIndex, ProgramDataFromSystem)).exist;
    });
}, function (gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem) {
    var program = getProgram(shaderIndex, ProgramDataFromSystem);
    if (ProgramDataFromSystem.lastUsedProgram === program) {
        return program;
    }
    ProgramDataFromSystem.lastUsedProgram = program;
    gl.useProgram(program);
    disableVertexAttribArray(gl, GLSLSenderDataFromSystem);
    ProgramDataFromSystem.lastBindedArrayBuffer = null;
    ProgramDataFromSystem.lastBindedIndexBuffer = null;
    return program;
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
    var materialData = material_config.materials[materialClassName];
    it("materialClassName should be defined", function () {
        expect(materialData).exist;
    });
    it("shaderLib should be array", function () {
        expect(materialData.shader.shaderLib).be.a("array");
    });
}, function (materialClassName, material_config) {
    return material_config.materials[materialClassName].shader.shaderLib;
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
export var sendAttributeData = function (gl, shaderIndex, program, geometryIndex, getArrayBufferDataFuncMap, getAttribLocation, isAttributeLocationNotExist, sendBuffer, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem, GeometryDataFromSystem, ArrayBufferDataFromSystem) {
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
            buffer = getOrCreateArrayBuffer(gl, geometryIndex, ArrayBufferDataFromSystem.vertexBuffer, getVertices, GeometryDataFromSystem, ArrayBufferDataFromSystem);
            break;
        case "normal":
            buffer = getOrCreateArrayBuffer(gl, geometryIndex, ArrayBufferDataFromSystem.normalBuffers, getNormals, GeometryDataFromSystem, ArrayBufferDataFromSystem);
            break;
        case "texCoord":
            buffer = getOrCreateArrayBuffer(gl, geometryIndex, ArrayBufferDataFromSystem.texCoordBuffers, getTexCoords, GeometryDataFromSystem, ArrayBufferDataFromSystem);
            break;
        default:
            Log.error(true, Log.info.FUNC_INVALID("name:" + name));
            break;
    }
    return buffer;
};
export var sendUniformData = function (gl, shaderIndex, program, mapCount, sendDataMap, drawDataMap, renderCommandUniformData) {
    var uniformLocationMap = drawDataMap.LocationDataFromSystem.uniformLocationMap[shaderIndex], uniformCacheMap = drawDataMap.GLSLSenderDataFromSystem.uniformCacheMap;
    _sendUniformData(gl, shaderIndex, program, sendDataMap.glslSenderData, drawDataMap, uniformLocationMap, uniformCacheMap, renderCommandUniformData);
    _sendUniformFuncData(gl, shaderIndex, program, sendDataMap, drawDataMap, uniformLocationMap, uniformCacheMap);
    sendData(gl, mapCount, shaderIndex, program, sendDataMap.glslSenderData, uniformLocationMap, uniformCacheMap, directlySendUniformData, drawDataMap.TextureDataFromSystem, drawDataMap.MapManagerDataFromSystem);
};
var _sendUniformData = function (gl, shaderIndex, program, glslSenderData, _a, uniformLocationMap, uniformCacheMap, renderCommandUniformData) {
    var MaterialDataFromSystem = _a.MaterialDataFromSystem, BasicMaterialDataFromSystem = _a.BasicMaterialDataFromSystem, LightMaterialDataFromSystem = _a.LightMaterialDataFromSystem;
    var sendUniformDataArr = glslSenderData.GLSLSenderDataFromSystem.sendUniformConfigMap[shaderIndex];
    for (var i = 0, len = sendUniformDataArr.length; i < len; i++) {
        var sendData_2 = sendUniformDataArr[i], name_1 = sendData_2.name, field = sendData_2.field, type = sendData_2.type, from = sendData_2.from || "cmd", data = glslSenderData.getUniformData(field, from, renderCommandUniformData, MaterialDataFromSystem, BasicMaterialDataFromSystem, LightMaterialDataFromSystem);
        directlySendUniformData(gl, name_1, shaderIndex, program, type, data, glslSenderData, uniformLocationMap, uniformCacheMap);
    }
};
export var directlySendUniformData = function (gl, name, shaderIndex, program, type, data, _a, uniformLocationMap, uniformCacheMap) {
    var sendMatrix3 = _a.sendMatrix3, sendMatrix4 = _a.sendMatrix4, sendVector3 = _a.sendVector3, sendInt = _a.sendInt, sendFloat1 = _a.sendFloat1, sendFloat3 = _a.sendFloat3;
    switch (type) {
        case EVariableType.MAT3:
            sendMatrix3(gl, program, name, data, uniformLocationMap);
            break;
        case EVariableType.MAT4:
            sendMatrix4(gl, program, name, data, uniformLocationMap);
            break;
        case EVariableType.VEC3:
            sendVector3(gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap);
            break;
        case EVariableType.INT:
        case EVariableType.SAMPLER_2D:
            sendInt(gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap);
            break;
        case EVariableType.FLOAT:
            sendFloat1(gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap);
            break;
        case EVariableType.FLOAT3:
            sendFloat3(gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap);
            break;
        default:
            Log.error(true, Log.info.FUNC_INVALID("EVariableType:", type));
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
export var initData = function (ProgramDataFromSystem) {
    ProgramDataFromSystem.programMap = createMap();
};
//# sourceMappingURL=programUtils.js.map