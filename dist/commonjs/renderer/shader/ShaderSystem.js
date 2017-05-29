"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Shader_1 = require("./Shader");
var DeviceManagerSystem_1 = require("../../device/DeviceManagerSystem");
var IndexBufferSystem_1 = require("../buffer/IndexBufferSystem");
var shaderSourceBuildSystem_1 = require("./shaderSourceBuildSystem");
var locationSystem_1 = require("./locationSystem");
var programSystem_1 = require("./programSystem");
var glslSenderSystem_1 = require("./glslSenderSystem");
var ComponentSystem_1 = require("../../component/ComponentSystem");
var objectUtils_1 = require("../../utils/objectUtils");
exports.create = function (ShaderData) {
    var shader = new Shader_1.Shader(), index = ComponentSystem_1.generateComponentIndex(ShaderData);
    shader.index = index;
    ShaderData.count += 1;
    ShaderData.uniformCacheMap[index] = {};
    return shader;
};
exports.init = function (state, materialIndex, shaderIndex, materialClassName, material_config, shaderLib_generator, DeviceManagerData, ShaderData) {
    var materialShaderLibConfig = programSystem_1.getMaterialShaderLibConfig(materialClassName, material_config), shaderLibData = shaderLib_generator.shaderLibs, _a = shaderSourceBuildSystem_1.buildGLSLSource(materialIndex, materialShaderLibConfig, shaderLibData), vsSource = _a.vsSource, fsSource = _a.fsSource, program = programSystem_1.getProgram(shaderIndex, ShaderData), gl = DeviceManagerSystem_1.getGL(DeviceManagerData, state);
    if (!programSystem_1.isProgramExist(program)) {
        program = gl.createProgram();
        programSystem_1.registerProgram(shaderIndex, ShaderData, program);
    }
    programSystem_1.initShader(program, vsSource, fsSource, gl);
    locationSystem_1.setLocationMap(gl, shaderIndex, program, materialShaderLibConfig, shaderLibData, ShaderData);
    glslSenderSystem_1.addSendAttributeConfig(shaderIndex, materialShaderLibConfig, shaderLibData, ShaderData.sendAttributeConfigMap);
    glslSenderSystem_1.addSendUniformConfig(shaderIndex, materialShaderLibConfig, shaderLibData, ShaderData.sendUniformConfigMap);
};
exports.sendAttributeData = function (gl, shaderIndex, geometryIndex, ShaderData, GeometryData, ArrayBufferData) {
    programSystem_1.sendAttributeData(gl, shaderIndex, geometryIndex, ShaderData, GeometryData, ArrayBufferData);
};
exports.sendUniformData = function (gl, shaderIndex, MaterialData, ShaderData, renderCommand) {
    programSystem_1.sendUniformData(gl, shaderIndex, MaterialData, ShaderData, renderCommand);
};
exports.bindIndexBuffer = function (gl, geometryIndex, ShaderData, GeometryData, IndexBufferData) {
    var buffer = IndexBufferSystem_1.getOrCreateBuffer(gl, geometryIndex, GeometryData, IndexBufferData);
    if (ShaderData.lastBindedIndexBuffer === buffer) {
        return;
    }
    ShaderData.lastBindedIndexBuffer = buffer;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
};
exports.use = function (gl, shaderIndex, ShaderData) {
    programSystem_1.use(gl, shaderIndex, ShaderData);
};
exports.dispose = function (gl, shaderIndex, ShaderData) {
};
exports.initData = function (ShaderData) {
    ShaderData.index = 0;
    ShaderData.count = 0;
    ShaderData.programMap = objectUtils_1.createMap();
    ShaderData.attributeLocationMap = objectUtils_1.createMap();
    ShaderData.uniformLocationMap = objectUtils_1.createMap();
    ShaderData.sendAttributeConfigMap = objectUtils_1.createMap();
    ShaderData.sendUniformConfigMap = objectUtils_1.createMap();
    ShaderData.vertexAttribHistory = [];
    ShaderData.uniformCacheMap = objectUtils_1.createMap();
    ShaderData.shaderMap = objectUtils_1.createMap();
    ShaderData.isInitMap = objectUtils_1.createMap();
};
//# sourceMappingURL=ShaderSystem.js.map