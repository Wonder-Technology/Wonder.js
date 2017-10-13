import { Map as MapImmutable } from "immutable";
import { IShaderLibGenerator } from "../../../renderer/data/shaderLib_generator_interface";
import { IMaterialConfig } from "../../../renderer/data/material_config_interface";
export declare const init: (state: MapImmutable<any, any>, gl: WebGLRenderingContext, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, initNoMaterialShader: Function, TextureData: any, MaterialData: any, BasicMaterialData: any, LightMaterialData: any, GPUDetectData: any, GLSLSenderData: any, ProgramData: any, VaoData: any, LocationData: any, ShaderData: any) => void;
