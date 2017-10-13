import { Map as MapImmutable } from "immutable";
import { IShaderLibGenerator } from "../../../renderer/data/shaderLib_generator_interface";
import { IMaterialConfig } from "../../../renderer/data/material_config_interface";
import { WebGL1PointLightData } from "../../../renderer/webgl1/light/PointLightData";
import { init as initMaterial } from "../../material/AllMaterialSystem";
import { WebGL1DirectionLightData } from "../../../renderer/webgl1/light/DirectionLightData";
import { AmbientLightData } from "../../light/AmbientLightData";

export const init = (state: MapImmutable<any, any>, gl: WebGLRenderingContext, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, initNoMaterialShader: Function, TextureData: any, MaterialData: any, BasicMaterialData: any, LightMaterialData: any, GPUDetectData: any, GLSLSenderData: any, ProgramData: any, VaoData: any, LocationData: any, ShaderData: any) => {
    initMaterial(state, gl, material_config, shaderLib_generator, initNoMaterialShader, TextureData, MaterialData, BasicMaterialData, LightMaterialData, AmbientLightData, WebGL1DirectionLightData, WebGL1PointLightData, GPUDetectData, GLSLSenderData, ProgramData, VaoData, LocationData, ShaderData);
}
