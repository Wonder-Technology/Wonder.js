"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PointLightData_1 = require("../../../renderer/webgl1/light/PointLightData");
var MaterialSystem_1 = require("../../material/MaterialSystem");
var DirectionLightData_1 = require("../../../renderer/webgl1/light/DirectionLightData");
var AmbientLightData_1 = require("../../light/AmbientLightData");
exports.init = function (state, gl, material_config, shaderLib_generator, initNoMaterialShader, TextureData, MaterialData, BasicMaterialData, LightMaterialData, GPUDetectData, GLSLSenderData, ProgramData, VaoData, LocationData, ShaderData) {
    MaterialSystem_1.init(state, gl, material_config, shaderLib_generator, initNoMaterialShader, TextureData, MaterialData, BasicMaterialData, LightMaterialData, AmbientLightData_1.AmbientLightData, DirectionLightData_1.WebGL1DirectionLightData, PointLightData_1.WebGL1PointLightData, GPUDetectData, GLSLSenderData, ProgramData, VaoData, LocationData, ShaderData);
};
//# sourceMappingURL=MaterialSystem.js.map