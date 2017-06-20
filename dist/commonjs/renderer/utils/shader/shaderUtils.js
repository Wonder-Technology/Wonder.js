"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var locationUtils_1 = require("./location/locationUtils");
var programUtils_1 = require("./program/programUtils");
var glslSenderUtils_1 = require("./glslSender/glslSenderUtils");
var indexBufferUtils_1 = require("../buffer/indexBufferUtils");
exports.init = function (state, materialIndex, shaderIndex, materialClassName, material_config, shaderLib_generator, buildGLSLSource, getGL, DeviceManagerDataFromSystem, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem, MaterialDataFromSystem) {
    var program = programUtils_1.getProgram(shaderIndex, ProgramDataFromSystem);
    if (programUtils_1.isProgramExist(program)) {
        return;
    }
    var materialShaderLibConfig = programUtils_1.getMaterialShaderLibConfig(materialClassName, material_config), shaderLibDataFromSystem = shaderLib_generator.shaderLibs, _a = buildGLSLSource(materialIndex, materialShaderLibConfig, shaderLibDataFromSystem, MaterialDataFromSystem), vsSource = _a.vsSource, fsSource = _a.fsSource, gl = getGL(DeviceManagerDataFromSystem, state);
    program = gl.createProgram();
    programUtils_1.registerProgram(shaderIndex, ProgramDataFromSystem, program);
    programUtils_1.initShader(program, vsSource, fsSource, gl);
    locationUtils_1.setLocationMap(gl, shaderIndex, program, materialShaderLibConfig, shaderLibDataFromSystem, LocationDataFromSystem);
    glslSenderUtils_1.addSendAttributeConfig(shaderIndex, materialShaderLibConfig, shaderLibDataFromSystem, GLSLSenderDataFromSystem.sendAttributeConfigMap);
    glslSenderUtils_1.addSendUniformConfig(shaderIndex, materialShaderLibConfig, shaderLibDataFromSystem, GLSLSenderDataFromSystem.sendUniformConfigMap);
};
exports.sendAttributeData = function (gl, shaderIndex, geometryIndex, getVertivesFunc, getAttribLocation, isAttributeLocationNotExist, sendBuffer, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem, GeometryWorkerDataFromSystem, ArrayBufferDataFromSystem) {
    programUtils_1.sendAttributeData(gl, shaderIndex, geometryIndex, getVertivesFunc, getAttribLocation, isAttributeLocationNotExist, sendBuffer, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem, GeometryWorkerDataFromSystem, ArrayBufferDataFromSystem);
};
exports.sendUniformData = function (gl, shaderIndex, funcDataMap, MaterialDataFromSystem, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem, renderCommandUniformData) {
    programUtils_1.sendUniformData(gl, shaderIndex, funcDataMap, MaterialDataFromSystem, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem, renderCommandUniformData);
};
exports.bindIndexBuffer = function (gl, geometryIndex, getIndicesFunc, ProgramDataFromSystem, GeometryWorkerDataFromSystem, IndexBufferDataFromSystem) {
    var buffer = indexBufferUtils_1.getOrCreateBuffer(gl, geometryIndex, getIndicesFunc, GeometryWorkerDataFromSystem, IndexBufferDataFromSystem);
    if (ProgramDataFromSystem.lastBindedIndexBuffer === buffer) {
        return;
    }
    ProgramDataFromSystem.lastBindedIndexBuffer = buffer;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
};
exports.use = function (gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem) {
    programUtils_1.use(gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem);
};
//# sourceMappingURL=shaderUtils.js.map