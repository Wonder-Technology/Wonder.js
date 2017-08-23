import { Map } from "immutable";
import { InitShaderDataMap } from "../../../../type/utilsType";
import { IMaterialConfig, IShaderLibItem } from "../../../../data/material_config_interface";
import { IWebGL2ShaderLibContentGenerator } from "../../both_file/data/shaderLib_generator";
export declare var initNoMaterialShader: (state: Map<any, any>, shaderName: string, materialShaderLibConfig: (string | IShaderLibItem)[], material_config: IMaterialConfig, shaderLib_generator: IWebGL2ShaderLibContentGenerator, initShaderDataMap: InitShaderDataMap) => void;
export declare var initMaterialShader: (state: Map<any, any>, materialIndex: number, shaderName: string, material_config: IMaterialConfig, shaderLib_generator: IWebGL2ShaderLibContentGenerator, initShaderDataMap: InitShaderDataMap) => number;
export declare var initData: (ShaderDataFromSystem: any) => void;
