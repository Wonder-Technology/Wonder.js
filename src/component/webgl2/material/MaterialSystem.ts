import { Map as MapImmutable } from "immutable";
import { IShaderLibGenerator } from "../../../renderer/data/shaderLib_generator_interface";
import { IMaterialConfig } from "../../../renderer/data/material_config_interface";
import { WebGL2PointLightData } from "../../../renderer/webgl2/light/PointLightData";
import { init as initMaterial } from "../../material/MaterialSystem";

export var init = (state: MapImmutable<any, any>, gl: WebGLRenderingContext, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, initNoMaterialShader: Function, TextureData: any, MaterialData: any, BasicMaterialData: any, LightMaterialData: any, GPUDetectData:any) => {
    initMaterial(state, gl, material_config, shaderLib_generator, initNoMaterialShader, TextureData, MaterialData, BasicMaterialData, LightMaterialData, WebGL2PointLightData, GPUDetectData);
}
