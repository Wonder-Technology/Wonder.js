import { addSendUniformConfig, addVaoConfig } from "./glslSender/glslSenderUtils";
import { genereateShaderIndex, initMaterialShader as initMaterialShaderUtils, initNoMaterialShader as initNoMaterialShaderUtils } from "../../../../../utils/shader/shaderUtils";
import { getProgram } from "../../../../../utils/worker/render_file/shader/program/programUtils";
import { initShader, registerProgram } from "../../../../../utils/shader/program/programUtils";
import { handleUboConfig } from "../ubo/uboManagerUtils";
import { bindVao as bindVaoUtils, createVao, unbindVao } from "../vao/vaoUtils";
import { createAndInitArrayBuffer, createAndInitIndexBuffer } from "../../../../../utils/worker/render_file/shader/shaderUtils";
import { setEmptyLocationMap } from "./location/locationUtils";
import { createMap } from "../../../../../../utils/objectUtils";
export var getNoMaterialShaderIndex = function (shaderName, ShaderDataFromSystem) {
    return ShaderDataFromSystem.shaderIndexByShaderNameMap[shaderName];
};
export var initNoMaterialShader = function (state, shaderName, materialShaderLibConfig, material_config, shaderLib_generator, initShaderFuncDataMap, initShaderDataMap) {
    var shaderIndex = initNoMaterialShaderUtils(state, shaderName, materialShaderLibConfig, material_config, shaderLib_generator, _init, initShaderFuncDataMap, initShaderDataMap);
    initShaderDataMap.ShaderDataFromSystem.shaderIndexByShaderNameMap[shaderName] = shaderIndex;
    return shaderIndex;
};
export var initMaterialShader = function (state, materialIndex, shaderName, material_config, shaderLib_generator, initShaderFuncDataMap, initShaderDataMap) {
    return initMaterialShaderUtils(state, materialIndex, shaderName, material_config, shaderLib_generator, _init, initShaderFuncDataMap, initShaderDataMap);
};
var _init = function (state, materialIndex, materialShaderLibNameArr, material_config, shaderLib_generator, initShaderFuncDataMap, initShaderDataMap) {
    var ShaderDataFromSystem = initShaderDataMap.ShaderDataFromSystem, DeviceManagerDataFromSystem = initShaderDataMap.DeviceManagerDataFromSystem, ProgramDataFromSystem = initShaderDataMap.ProgramDataFromSystem, LocationDataFromSystem = initShaderDataMap.LocationDataFromSystem, GLSLSenderDataFromSystem = initShaderDataMap.GLSLSenderDataFromSystem, GPUDetectDataFromSystem = initShaderDataMap.GPUDetectDataFromSystem, buildGLSLSource = initShaderFuncDataMap.buildGLSLSource, getGL = initShaderFuncDataMap.getGL, shaderIndex = genereateShaderIndex(ShaderDataFromSystem), program = getProgram(shaderIndex, ProgramDataFromSystem), shaderLibDataFromSystem = null, gl = null;
    shaderLibDataFromSystem = shaderLib_generator.shaderLibs;
    var _a = buildGLSLSource(materialIndex, materialShaderLibNameArr, shaderLibDataFromSystem, initShaderDataMap), vsSource = _a.vsSource, fsSource = _a.fsSource;
    gl = getGL(DeviceManagerDataFromSystem, state);
    program = gl.createProgram();
    registerProgram(shaderIndex, ProgramDataFromSystem, program);
    initShader(program, vsSource, fsSource, gl);
    setEmptyLocationMap(shaderIndex, LocationDataFromSystem);
    addVaoConfig(shaderIndex, materialShaderLibNameArr, shaderLibDataFromSystem, GLSLSenderDataFromSystem.vaoConfigMap, initShaderFuncDataMap);
    addSendUniformConfig(shaderIndex, materialShaderLibNameArr, shaderLibDataFromSystem, GLSLSenderDataFromSystem);
    handleUboConfig(gl, shaderIndex, program, materialShaderLibNameArr, shaderLibDataFromSystem, initShaderDataMap, GLSLSenderDataFromSystem, GPUDetectDataFromSystem);
    return shaderIndex;
};
export var bindVao = function (gl, vao, ProgramDataFromSystem) {
    if (ProgramDataFromSystem.lastBindedVao === vao) {
        return;
    }
    ProgramDataFromSystem.lastBindedVao = vao;
    bindVaoUtils(gl, vao);
};
export var createAndInitVao = function (gl, geometryIndex, vaoMap, vboArrayMap, _a, GeometryDataFromSystem) {
    var positionLocation = _a.positionLocation, normalLocation = _a.normalLocation, texCoordLocation = _a.texCoordLocation, getVertices = _a.getVertices, getNormals = _a.getNormals, getTexCoords = _a.getTexCoords, getIndices = _a.getIndices;
    var vao = createVao(gl), buffers = [];
    vaoMap[geometryIndex] = vao;
    bindVaoUtils(gl, vao);
    if (!!getVertices) {
        buffers.push(createAndInitArrayBuffer(gl, getVertices(geometryIndex, GeometryDataFromSystem), positionLocation, 3));
    }
    if (!!getNormals) {
        buffers.push(createAndInitArrayBuffer(gl, getNormals(geometryIndex, GeometryDataFromSystem), normalLocation, 3));
    }
    if (!!getTexCoords) {
        buffers.push(createAndInitArrayBuffer(gl, getTexCoords(geometryIndex, GeometryDataFromSystem), texCoordLocation, 2));
    }
    buffers.push(createAndInitIndexBuffer(gl, getIndices(geometryIndex, GeometryDataFromSystem)));
    unbindVao(gl);
    vboArrayMap[geometryIndex] = buffers;
    return vao;
};
export var initData = function (ShaderDataFromSystem) {
    ShaderDataFromSystem.index = 0;
    ShaderDataFromSystem.count = 0;
    ShaderDataFromSystem.shaderIndexMap = createMap();
    ShaderDataFromSystem.shaderIndexByShaderNameMap = createMap();
    ShaderDataFromSystem.shaderLibNameMap = createMap();
};
//# sourceMappingURL=shaderUtils.js.map