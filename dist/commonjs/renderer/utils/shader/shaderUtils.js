"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var programUtils_1 = require("./program/programUtils");
var glslSenderUtils_1 = require("./glslSender/glslSenderUtils");
var indexBufferUtils_1 = require("../buffer/indexBufferUtils");
var shaderSourceBuildUtils_1 = require("./shaderSourceBuildUtils");
var locationUtils_1 = require("./location/locationUtils");
var objectUtils_1 = require("../../../utils/objectUtils");
exports.init = function (state, materialIndex, materialClassName, material_config, shaderLib_generator, initShaderFuncDataMap, initShaderDataMap) {
    var ShaderDataFromSystem = initShaderDataMap.ShaderDataFromSystem, DeviceManagerDataFromSystem = initShaderDataMap.DeviceManagerDataFromSystem, ProgramDataFromSystem = initShaderDataMap.ProgramDataFromSystem, LocationDataFromSystem = initShaderDataMap.LocationDataFromSystem, GLSLSenderDataFromSystem = initShaderDataMap.GLSLSenderDataFromSystem, materialShaderLibConfig = programUtils_1.getMaterialShaderLibConfig(materialClassName, material_config), materialShaderLibNameArr = shaderSourceBuildUtils_1.getMaterialShaderLibNameArr(materialShaderLibConfig, material_config.shaderLibGroups, materialIndex, initShaderFuncDataMap, initShaderDataMap), shaderIndex = _genereateShaderIndex(materialShaderLibNameArr, ShaderDataFromSystem), program = programUtils_1.getProgram(shaderIndex, ProgramDataFromSystem), shaderLibDataFromSystem = null, gl = null;
    if (programUtils_1.isProgramExist(program)) {
        return shaderIndex;
    }
    shaderLibDataFromSystem = shaderLib_generator.shaderLibs;
    var _a = initShaderFuncDataMap.buildGLSLSource(materialIndex, materialShaderLibNameArr, shaderLibDataFromSystem, initShaderDataMap), vsSource = _a.vsSource, fsSource = _a.fsSource;
    gl = initShaderFuncDataMap.getGL(DeviceManagerDataFromSystem, state);
    program = gl.createProgram();
    programUtils_1.registerProgram(shaderIndex, ProgramDataFromSystem, program);
    programUtils_1.initShader(program, vsSource, fsSource, gl);
    locationUtils_1.setEmptyLocationMap(shaderIndex, LocationDataFromSystem);
    glslSenderUtils_1.addSendAttributeConfig(shaderIndex, materialShaderLibNameArr, shaderLibDataFromSystem, GLSLSenderDataFromSystem.sendAttributeConfigMap);
    glslSenderUtils_1.addSendUniformConfig(shaderIndex, materialShaderLibNameArr, shaderLibDataFromSystem, GLSLSenderDataFromSystem);
    return shaderIndex;
};
var _genereateShaderIndex = function (materialShaderLibNameArr, ShaderDataFromSystem) {
    var shaderLibWholeName = materialShaderLibNameArr.join(''), index = ShaderDataFromSystem.shaderLibWholeNameMap[shaderLibWholeName];
    if (objectUtils_1.isValidMapValue(index)) {
        return index;
    }
    index = ShaderDataFromSystem.index;
    ShaderDataFromSystem.index += 1;
    ShaderDataFromSystem.shaderLibWholeNameMap[shaderLibWholeName] = index;
    return index;
};
exports.sendAttributeData = function (gl, shaderIndex, program, geometryIndex, getArrayBufferDataFuncMap, getAttribLocation, isAttributeLocationNotExist, sendBuffer, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem, GeometryWorkerDataFromSystem, ArrayBufferDataFromSystem) {
    programUtils_1.sendAttributeData(gl, shaderIndex, program, geometryIndex, getArrayBufferDataFuncMap, getAttribLocation, isAttributeLocationNotExist, sendBuffer, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem, GeometryWorkerDataFromSystem, ArrayBufferDataFromSystem);
};
exports.sendUniformData = function (gl, shaderIndex, program, mapCount, sendDataMap, drawDataMap, renderCommandUniformData) {
    programUtils_1.sendUniformData(gl, shaderIndex, program, mapCount, sendDataMap, drawDataMap, renderCommandUniformData);
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
    return programUtils_1.use(gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem);
};
//# sourceMappingURL=shaderUtils.js.map