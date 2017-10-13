import { addSendAttributeConfig, addSendUniformConfig, addVaoConfig } from "./glslSender/glslSenderUtils";
import { genereateShaderIndex, initMaterialShader as initMaterialShaderUtils, initNoMaterialShader as initNoMaterialShaderUtils } from "../../../../../utils/shader/shaderUtils";
import { getProgram } from "../../../../../utils/worker/render_file/shader/program/programUtils";
import { initShader, registerProgram } from "../../../../../utils/shader/program/programUtils";
import { getOrCreateBuffer } from "../../../../../utils/buffer/indexBufferUtils";
import { bindVao as bindVaoUtils, createVao, unbindVao } from "../vao/vaoUtils";
import { createAndInitArrayBuffer, createAndInitIndexBuffer } from "../../../../../utils/worker/render_file/shader/shaderUtils";
import { hasExtension } from "../../../../../utils/device/gpuDetectUtils";
import { getExtensionVao } from "../device/gpuDetectUtils";
import { setEmptyLocationMap } from "./location/locationUtils";
import { createMap } from "../../../../../../utils/objectUtils";
export var initNoMaterialShader = function (state, shaderName, materialShaderLibConfig, material_config, shaderLib_generator, initShaderFuncDataMap, initShaderDataMap) {
    initNoMaterialShaderUtils(state, null, materialShaderLibConfig, material_config, shaderLib_generator, _init, initShaderFuncDataMap, initShaderDataMap);
};
export var initMaterialShader = function (state, materialIndex, shaderName, material_config, shaderLib_generator, initShaderFuncDataMap, initShaderDataMap) {
    return initMaterialShaderUtils(state, materialIndex, shaderName, material_config, shaderLib_generator, _init, initShaderFuncDataMap, initShaderDataMap);
};
var _init = function (state, materialIndex, materialShaderLibNameArr, material_config, shaderLib_generator, initShaderFuncDataMap, initShaderDataMap) {
    var ShaderDataFromSystem = initShaderDataMap.ShaderDataFromSystem, DeviceManagerDataFromSystem = initShaderDataMap.DeviceManagerDataFromSystem, ProgramDataFromSystem = initShaderDataMap.ProgramDataFromSystem, LocationDataFromSystem = initShaderDataMap.LocationDataFromSystem, GLSLSenderDataFromSystem = initShaderDataMap.GLSLSenderDataFromSystem, GPUDetectDataFromSystem = initShaderDataMap.GPUDetectDataFromSystem, shaderIndex = genereateShaderIndex(ShaderDataFromSystem), program = getProgram(shaderIndex, ProgramDataFromSystem), shaderLibDataFromSystem = null, gl = null;
    shaderLibDataFromSystem = shaderLib_generator.shaderLibs;
    var _a = initShaderFuncDataMap.buildGLSLSource(materialIndex, materialShaderLibNameArr, shaderLibDataFromSystem, initShaderDataMap), vsSource = _a.vsSource, fsSource = _a.fsSource;
    gl = initShaderFuncDataMap.getGL(DeviceManagerDataFromSystem, state);
    program = gl.createProgram();
    registerProgram(shaderIndex, ProgramDataFromSystem, program);
    initShader(program, vsSource, fsSource, gl);
    setEmptyLocationMap(shaderIndex, LocationDataFromSystem);
    if (hasExtension(getExtensionVao(GPUDetectDataFromSystem))) {
        addVaoConfig(gl, shaderIndex, program, materialShaderLibNameArr, shaderLibDataFromSystem, GLSLSenderDataFromSystem.attributeLocationMap, GLSLSenderDataFromSystem.vaoConfigMap, initShaderFuncDataMap);
    }
    else {
        addSendAttributeConfig(shaderIndex, materialShaderLibNameArr, shaderLibDataFromSystem, GLSLSenderDataFromSystem.sendAttributeConfigMap);
    }
    addSendUniformConfig(shaderIndex, materialShaderLibNameArr, shaderLibDataFromSystem, GLSLSenderDataFromSystem);
    return shaderIndex;
};
export var bindIndexBuffer = function (gl, geometryIndex, getIndicesFunc, ProgramDataFromSystem, GeometryDataFromSystem, IndexBufferDataFromSystem) {
    var buffer = getOrCreateBuffer(gl, geometryIndex, getIndicesFunc, GeometryDataFromSystem, IndexBufferDataFromSystem);
    if (ProgramDataFromSystem.lastBindedIndexBuffer === buffer) {
        return;
    }
    ProgramDataFromSystem.lastBindedIndexBuffer = buffer;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
};
export var bindVao = function (extension, vao, ProgramDataFromSystem) {
    if (ProgramDataFromSystem.lastBindedVao === vao) {
        return;
    }
    ProgramDataFromSystem.lastBindedVao = vao;
    bindVaoUtils(extension, vao);
};
export var createAndInitVao = function (gl, extension, geometryIndex, vaoMap, vboArrayMap, _a, GeometryDataFromSystem) {
    var positionLocation = _a.positionLocation, normalLocation = _a.normalLocation, texCoordLocation = _a.texCoordLocation, getVertices = _a.getVertices, getNormals = _a.getNormals, getTexCoords = _a.getTexCoords, getIndices = _a.getIndices;
    var vao = createVao(extension), buffers = [];
    vaoMap[geometryIndex] = vao;
    bindVaoUtils(extension, vao);
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
    unbindVao(extension);
    vboArrayMap[geometryIndex] = buffers;
    return vao;
};
export var initData = function (ShaderDataFromSystem) {
    ShaderDataFromSystem.index = 0;
    ShaderDataFromSystem.count = 0;
    ShaderDataFromSystem.shaderIndexMap = createMap();
    ShaderDataFromSystem.shaderLibNameMap = createMap();
};
//# sourceMappingURL=shaderUtils.js.map