import { WebGL2PointLightData } from "../../../renderer/webgl2/light/PointLightData";
import { init as initMaterial } from "../../material/MaterialSystem";
import { WebGL2DirectionLightData } from "../../../renderer/webgl2/light/DirectionLightData";
import { AmbientLightData } from "../../light/AmbientLightData";
export var init = function (state, gl, material_config, shaderLib_generator, initNoMaterialShader, TextureData, MaterialData, BasicMaterialData, LightMaterialData, GPUDetectData, GLSLSenderData, ProgramData, VaoData, LocationData, ShaderData) {
    initMaterial(state, gl, material_config, shaderLib_generator, initNoMaterialShader, TextureData, MaterialData, BasicMaterialData, LightMaterialData, AmbientLightData, WebGL2DirectionLightData, WebGL2PointLightData, GPUDetectData, GLSLSenderData, ProgramData, VaoData, LocationData, ShaderData);
};
//# sourceMappingURL=MaterialSystem.js.map