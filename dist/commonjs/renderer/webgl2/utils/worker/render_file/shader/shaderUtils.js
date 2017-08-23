"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var glslSenderUtils_1 = require("./glslSender/glslSenderUtils");
var shaderUtils_1 = require("../../../../../utils/shader/shaderUtils");
var programUtils_1 = require("../../../../../utils/worker/render_file/shader/program/programUtils");
var programUtils_2 = require("../../../../../utils/shader/program/programUtils");
var uboManagerUtils_1 = require("../ubo/uboManagerUtils");
var vaoUtils_1 = require("../vao/vaoUtils");
var shaderUtils_2 = require("../../../../../utils/worker/render_file/shader/shaderUtils");
var locationUtils_1 = require("./location/locationUtils");
var objectUtils_1 = require("../../../../../../utils/objectUtils");
exports.getNoMaterialShaderIndex = function (shaderName, ShaderDataFromSystem) {
    return ShaderDataFromSystem.shaderIndexByShaderNameMap[shaderName];
};
exports.initNoMaterialShader = function (state, shaderName, materialShaderLibConfig, material_config, shaderLib_generator, initShaderFuncDataMap, initShaderDataMap) {
    var shaderIndex = shaderUtils_1.initNoMaterialShader(state, shaderName, materialShaderLibConfig, material_config, shaderLib_generator, _init, initShaderFuncDataMap, initShaderDataMap);
    initShaderDataMap.ShaderDataFromSystem.shaderIndexByShaderNameMap[shaderName] = shaderIndex;
    return shaderIndex;
};
exports.initMaterialShader = function (state, materialIndex, shaderName, material_config, shaderLib_generator, initShaderFuncDataMap, initShaderDataMap) {
    return shaderUtils_1.initMaterialShader(state, materialIndex, shaderName, material_config, shaderLib_generator, _init, initShaderFuncDataMap, initShaderDataMap);
};
var _init = function (state, materialIndex, materialShaderLibNameArr, material_config, shaderLib_generator, initShaderFuncDataMap, initShaderDataMap) {
    var ShaderDataFromSystem = initShaderDataMap.ShaderDataFromSystem, DeviceManagerDataFromSystem = initShaderDataMap.DeviceManagerDataFromSystem, ProgramDataFromSystem = initShaderDataMap.ProgramDataFromSystem, LocationDataFromSystem = initShaderDataMap.LocationDataFromSystem, GLSLSenderDataFromSystem = initShaderDataMap.GLSLSenderDataFromSystem, GPUDetectDataFromSystem = initShaderDataMap.GPUDetectDataFromSystem, buildGLSLSource = initShaderFuncDataMap.buildGLSLSource, getGL = initShaderFuncDataMap.getGL, shaderIndex = shaderUtils_1.genereateShaderIndex(ShaderDataFromSystem), program = programUtils_1.getProgram(shaderIndex, ProgramDataFromSystem), shaderLibDataFromSystem = null, gl = null;
    shaderLibDataFromSystem = shaderLib_generator.shaderLibs;
    var _a = buildGLSLSource(materialIndex, materialShaderLibNameArr, shaderLibDataFromSystem, initShaderDataMap), vsSource = _a.vsSource, fsSource = _a.fsSource;
    gl = getGL(DeviceManagerDataFromSystem, state);
    program = gl.createProgram();
    programUtils_2.registerProgram(shaderIndex, ProgramDataFromSystem, program);
    programUtils_2.initShader(program, vsSource, fsSource, gl);
    locationUtils_1.setEmptyLocationMap(shaderIndex, LocationDataFromSystem);
    glslSenderUtils_1.addVaoConfig(shaderIndex, materialShaderLibNameArr, shaderLibDataFromSystem, GLSLSenderDataFromSystem.vaoConfigMap, initShaderFuncDataMap);
    glslSenderUtils_1.addSendUniformConfig(shaderIndex, materialShaderLibNameArr, shaderLibDataFromSystem, GLSLSenderDataFromSystem);
    uboManagerUtils_1.handleUboConfig(gl, shaderIndex, program, materialShaderLibNameArr, shaderLibDataFromSystem, initShaderDataMap, GLSLSenderDataFromSystem, GPUDetectDataFromSystem);
    return shaderIndex;
};
exports.bindVao = function (gl, vao, ProgramDataFromSystem) {
    if (ProgramDataFromSystem.lastBindedVao === vao) {
        return;
    }
    ProgramDataFromSystem.lastBindedVao = vao;
    vaoUtils_1.bindVao(gl, vao);
};
exports.createAndInitVao = function (gl, geometryIndex, vaoMap, vboArrayMap, _a, GeometryDataFromSystem) {
    var positionLocation = _a.positionLocation, normalLocation = _a.normalLocation, texCoordLocation = _a.texCoordLocation, getVertices = _a.getVertices, getNormals = _a.getNormals, getTexCoords = _a.getTexCoords, getIndices = _a.getIndices;
    var vao = vaoUtils_1.createVao(gl), buffers = [];
    vaoMap[geometryIndex] = vao;
    vaoUtils_1.bindVao(gl, vao);
    if (!!getVertices) {
        buffers.push(shaderUtils_2.createAndInitArrayBuffer(gl, getVertices(geometryIndex, GeometryDataFromSystem), positionLocation, 3));
    }
    if (!!getNormals) {
        buffers.push(shaderUtils_2.createAndInitArrayBuffer(gl, getNormals(geometryIndex, GeometryDataFromSystem), normalLocation, 3));
    }
    if (!!getTexCoords) {
        buffers.push(shaderUtils_2.createAndInitArrayBuffer(gl, getTexCoords(geometryIndex, GeometryDataFromSystem), texCoordLocation, 2));
    }
    buffers.push(shaderUtils_2.createAndInitIndexBuffer(gl, getIndices(geometryIndex, GeometryDataFromSystem)));
    vaoUtils_1.unbindVao(gl);
    vboArrayMap[geometryIndex] = buffers;
    return vao;
};
exports.initData = function (ShaderDataFromSystem) {
    ShaderDataFromSystem.index = 0;
    ShaderDataFromSystem.count = 0;
    ShaderDataFromSystem.shaderIndexMap = objectUtils_1.createMap();
    ShaderDataFromSystem.shaderIndexByShaderNameMap = objectUtils_1.createMap();
    ShaderDataFromSystem.shaderLibNameMap = objectUtils_1.createMap();
};
//# sourceMappingURL=shaderUtils.js.map