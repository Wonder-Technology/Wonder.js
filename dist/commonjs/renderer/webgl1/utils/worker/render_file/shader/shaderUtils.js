"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var glslSenderUtils_1 = require("./glslSender/glslSenderUtils");
var shaderUtils_1 = require("../../../../../utils/shader/shaderUtils");
var programUtils_1 = require("../../../../../utils/worker/render_file/shader/program/programUtils");
var programUtils_2 = require("../../../../../utils/shader/program/programUtils");
var indexBufferUtils_1 = require("../../../../../utils/buffer/indexBufferUtils");
var vaoUtils_1 = require("../vao/vaoUtils");
var shaderUtils_2 = require("../../../../../utils/worker/render_file/shader/shaderUtils");
var gpuDetectUtils_1 = require("../../../../../utils/device/gpuDetectUtils");
var gpuDetectUtils_2 = require("../device/gpuDetectUtils");
var locationUtils_1 = require("./location/locationUtils");
var objectUtils_1 = require("../../../../../../utils/objectUtils");
exports.initNoMaterialShader = function (state, shaderName, materialShaderLibConfig, material_config, shaderLib_generator, initShaderFuncDataMap, initShaderDataMap) {
    shaderUtils_1.initNoMaterialShader(state, null, materialShaderLibConfig, material_config, shaderLib_generator, _init, initShaderFuncDataMap, initShaderDataMap);
};
exports.initMaterialShader = function (state, materialIndex, shaderName, material_config, shaderLib_generator, initShaderFuncDataMap, initShaderDataMap) {
    return shaderUtils_1.initMaterialShader(state, materialIndex, shaderName, material_config, shaderLib_generator, _init, initShaderFuncDataMap, initShaderDataMap);
};
var _init = function (state, materialIndex, materialShaderLibNameArr, material_config, shaderLib_generator, initShaderFuncDataMap, initShaderDataMap) {
    var ShaderDataFromSystem = initShaderDataMap.ShaderDataFromSystem, DeviceManagerDataFromSystem = initShaderDataMap.DeviceManagerDataFromSystem, ProgramDataFromSystem = initShaderDataMap.ProgramDataFromSystem, LocationDataFromSystem = initShaderDataMap.LocationDataFromSystem, GLSLSenderDataFromSystem = initShaderDataMap.GLSLSenderDataFromSystem, GPUDetectDataFromSystem = initShaderDataMap.GPUDetectDataFromSystem, shaderIndex = shaderUtils_1.genereateShaderIndex(ShaderDataFromSystem), program = programUtils_1.getProgram(shaderIndex, ProgramDataFromSystem), shaderLibDataFromSystem = null, gl = null;
    shaderLibDataFromSystem = shaderLib_generator.shaderLibs;
    var _a = initShaderFuncDataMap.buildGLSLSource(materialIndex, materialShaderLibNameArr, shaderLibDataFromSystem, initShaderDataMap), vsSource = _a.vsSource, fsSource = _a.fsSource;
    gl = initShaderFuncDataMap.getGL(DeviceManagerDataFromSystem, state);
    program = gl.createProgram();
    programUtils_2.registerProgram(shaderIndex, ProgramDataFromSystem, program);
    programUtils_2.initShader(program, vsSource, fsSource, gl);
    locationUtils_1.setEmptyLocationMap(shaderIndex, LocationDataFromSystem);
    if (gpuDetectUtils_1.hasExtension(gpuDetectUtils_2.getExtensionVao(GPUDetectDataFromSystem))) {
        glslSenderUtils_1.addVaoConfig(gl, shaderIndex, program, materialShaderLibNameArr, shaderLibDataFromSystem, GLSLSenderDataFromSystem.attributeLocationMap, GLSLSenderDataFromSystem.vaoConfigMap, initShaderFuncDataMap);
    }
    else {
        glslSenderUtils_1.addSendAttributeConfig(shaderIndex, materialShaderLibNameArr, shaderLibDataFromSystem, GLSLSenderDataFromSystem.sendAttributeConfigMap);
    }
    glslSenderUtils_1.addSendUniformConfig(shaderIndex, materialShaderLibNameArr, shaderLibDataFromSystem, GLSLSenderDataFromSystem);
    return shaderIndex;
};
exports.bindIndexBuffer = function (gl, geometryIndex, getIndicesFunc, ProgramDataFromSystem, GeometryDataFromSystem, IndexBufferDataFromSystem) {
    var buffer = indexBufferUtils_1.getOrCreateBuffer(gl, geometryIndex, getIndicesFunc, GeometryDataFromSystem, IndexBufferDataFromSystem);
    if (ProgramDataFromSystem.lastBindedIndexBuffer === buffer) {
        return;
    }
    ProgramDataFromSystem.lastBindedIndexBuffer = buffer;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
};
exports.bindVao = function (extension, vao, ProgramDataFromSystem) {
    if (ProgramDataFromSystem.lastBindedVao === vao) {
        return;
    }
    ProgramDataFromSystem.lastBindedVao = vao;
    vaoUtils_1.bindVao(extension, vao);
};
exports.createAndInitVao = function (gl, extension, geometryIndex, vaoMap, vboArrayMap, _a, GeometryDataFromSystem) {
    var positionLocation = _a.positionLocation, normalLocation = _a.normalLocation, texCoordLocation = _a.texCoordLocation, getVertices = _a.getVertices, getNormals = _a.getNormals, getTexCoords = _a.getTexCoords, getIndices = _a.getIndices;
    var vao = vaoUtils_1.createVao(extension), buffers = [];
    vaoMap[geometryIndex] = vao;
    vaoUtils_1.bindVao(extension, vao);
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
    vaoUtils_1.unbindVao(extension);
    vboArrayMap[geometryIndex] = buffers;
    return vao;
};
exports.initData = function (ShaderDataFromSystem) {
    ShaderDataFromSystem.index = 0;
    ShaderDataFromSystem.count = 0;
    ShaderDataFromSystem.shaderIndexMap = objectUtils_1.createMap();
    ShaderDataFromSystem.shaderLibNameMap = objectUtils_1.createMap();
};
//# sourceMappingURL=shaderUtils.js.map