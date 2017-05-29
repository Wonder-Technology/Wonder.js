import { Shader } from "./Shader";
import { getGL } from "../../device/DeviceManagerSystem";
import { getOrCreateBuffer as getOrCreateIndexBuffer } from "../buffer/IndexBufferSystem";
import { buildGLSLSource } from "./shaderSourceBuildSystem";
import { setLocationMap } from "./locationSystem";
import { getMaterialShaderLibConfig, getProgram, initShader, isProgramExist, registerProgram, sendUniformData as sendUniformDataProgram, sendAttributeData as sendAttributeDataProgram, use as useProgram } from "./programSystem";
import { addSendAttributeConfig, addSendUniformConfig } from "./glslSenderSystem";
import { generateComponentIndex } from "../../component/ComponentSystem";
import { createMap } from "../../utils/objectUtils";
export var create = function (ShaderData) {
    var shader = new Shader(), index = generateComponentIndex(ShaderData);
    shader.index = index;
    ShaderData.count += 1;
    ShaderData.uniformCacheMap[index] = {};
    return shader;
};
export var init = function (state, materialIndex, shaderIndex, materialClassName, material_config, shaderLib_generator, DeviceManagerData, ShaderData) {
    var materialShaderLibConfig = getMaterialShaderLibConfig(materialClassName, material_config), shaderLibData = shaderLib_generator.shaderLibs, _a = buildGLSLSource(materialIndex, materialShaderLibConfig, shaderLibData), vsSource = _a.vsSource, fsSource = _a.fsSource, program = getProgram(shaderIndex, ShaderData), gl = getGL(DeviceManagerData, state);
    if (!isProgramExist(program)) {
        program = gl.createProgram();
        registerProgram(shaderIndex, ShaderData, program);
    }
    initShader(program, vsSource, fsSource, gl);
    setLocationMap(gl, shaderIndex, program, materialShaderLibConfig, shaderLibData, ShaderData);
    addSendAttributeConfig(shaderIndex, materialShaderLibConfig, shaderLibData, ShaderData.sendAttributeConfigMap);
    addSendUniformConfig(shaderIndex, materialShaderLibConfig, shaderLibData, ShaderData.sendUniformConfigMap);
};
export var sendAttributeData = function (gl, shaderIndex, geometryIndex, ShaderData, GeometryData, ArrayBufferData) {
    sendAttributeDataProgram(gl, shaderIndex, geometryIndex, ShaderData, GeometryData, ArrayBufferData);
};
export var sendUniformData = function (gl, shaderIndex, MaterialData, ShaderData, renderCommand) {
    sendUniformDataProgram(gl, shaderIndex, MaterialData, ShaderData, renderCommand);
};
export var bindIndexBuffer = function (gl, geometryIndex, ShaderData, GeometryData, IndexBufferData) {
    var buffer = getOrCreateIndexBuffer(gl, geometryIndex, GeometryData, IndexBufferData);
    if (ShaderData.lastBindedIndexBuffer === buffer) {
        return;
    }
    ShaderData.lastBindedIndexBuffer = buffer;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
};
export var use = function (gl, shaderIndex, ShaderData) {
    useProgram(gl, shaderIndex, ShaderData);
};
export var dispose = function (gl, shaderIndex, ShaderData) {
};
export var initData = function (ShaderData) {
    ShaderData.index = 0;
    ShaderData.count = 0;
    ShaderData.programMap = createMap();
    ShaderData.attributeLocationMap = createMap();
    ShaderData.uniformLocationMap = createMap();
    ShaderData.sendAttributeConfigMap = createMap();
    ShaderData.sendUniformConfigMap = createMap();
    ShaderData.vertexAttribHistory = [];
    ShaderData.uniformCacheMap = createMap();
    ShaderData.shaderMap = createMap();
    ShaderData.isInitMap = createMap();
};
//# sourceMappingURL=ShaderSystem.js.map