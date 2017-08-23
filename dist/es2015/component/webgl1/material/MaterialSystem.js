import { WebGL1PointLightData } from "../../../renderer/webgl1/light/PointLightData";
import { init as initMaterial } from "../../material/MaterialSystem";
import { WebGL1DirectionLightData } from "../../../renderer/webgl1/light/DirectionLightData";
import { AmbientLightData } from "../../light/AmbientLightData";
export var init = function (state, gl, material_config, shaderLib_generator, initNoMaterialShader, TextureData, MaterialData, BasicMaterialData, LightMaterialData, GPUDetectData, GLSLSenderData, ProgramData, VaoData, LocationData, ShaderData) {
    initMaterial(state, gl, material_config, shaderLib_generator, initNoMaterialShader, TextureData, MaterialData, BasicMaterialData, LightMaterialData, AmbientLightData, WebGL1DirectionLightData, WebGL1PointLightData, GPUDetectData, GLSLSenderData, ProgramData, VaoData, LocationData, ShaderData);
};
//# sourceMappingURL=MaterialSystem.js.map