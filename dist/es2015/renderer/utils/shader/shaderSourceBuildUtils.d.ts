import { IMaterialShaderLibGroup, IShaderLibItem } from "../../data/material_config";
import { InitShaderDataMap, InitShaderFuncDataMap } from "../../type/utilsType";
export declare var buildGLSLSource: Function;
export declare var getMaterialShaderLibNameArr: (materialShaderLibConfig: (string | IShaderLibItem)[], materialShaderLibGroup: IMaterialShaderLibGroup, materialIndex: number, initShaderFuncDataMap: InitShaderFuncDataMap, initShaderDataMap: InitShaderDataMap) => string[];
