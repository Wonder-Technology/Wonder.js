import { Map as MapImmutable } from "immutable";
import { IShaderLibGenerator } from "../../../renderer/data/shaderLib_generator_interface";
import { IMaterialConfig } from "../../../renderer/data/material_config_interface";
import { WebGL1PointLightData } from "../../../renderer/webgl1/light/PointLightData";
import { init as initMaterial } from "../../material/MaterialSystem";

export var init = (state: MapImmutable<any, any>, gl: WebGLRenderingContext, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, initNoMaterialShader: Function, TextureData: any, MaterialData: any, BasicMaterialData: any, LightMaterialData: any, GPUDetectData:any, GLSLSenderData:any, ProgramData:any, VaoData:any, LocationData:any) => {
    initMaterial(state, gl, material_config, shaderLib_generator, initNoMaterialShader, TextureData, MaterialData, BasicMaterialData, LightMaterialData, WebGL1PointLightData, GPUDetectData, GLSLSenderData, ProgramData, VaoData, LocationData);
}
