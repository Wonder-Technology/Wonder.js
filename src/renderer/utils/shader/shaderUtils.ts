import { Map } from "immutable";
import { isNotUndefined } from "../../../utils/JudgeUtils";
import { IWebGL2ShaderLibContentGenerator } from "../../worker/webgl2/both_file/data/shaderLib_generator";
import { IWebGL1ShaderLibContentGenerator } from "../../worker/webgl1/both_file/data/shaderLib_generator";
import { IMaterialConfig, IShaderLibItem, MaterialShaderLibConfig } from "../../data/material_config_interface";
import { InitShaderDataMap } from "../../type/utilsType";
import { WebGL1InitShaderFuncDataMap } from "../../webgl1/type/utilsType";
import { IWebGL2InitShaderFuncDataMap } from "../../webgl2/utils/worker/render_file/interface/IUtils";
import { getMaterialShaderLibNameArr } from "./shaderSourceBuildUtils";
import { getMaterialShaderLibConfig } from "../../data/MaterialConfigSystem";

export const initMaterialShader = (state: Map<any, any>, materialIndex: number | null, shaderName: string, material_config: IMaterialConfig, shaderLib_generator: IWebGL1ShaderLibContentGenerator | IWebGL2ShaderLibContentGenerator, init: Function, initShaderFuncDataMap: WebGL1InitShaderFuncDataMap | IWebGL2InitShaderFuncDataMap, initShaderDataMap: InitShaderDataMap) => {
    var {
            ShaderDataFromSystem,
        } = initShaderDataMap,
        materialShaderLibNameArr = null,
        shaderIndex: number = null,
        key = ShaderDataFromSystem.shaderLibNameMap[materialIndex];

    if (!key) {
        materialShaderLibNameArr = getMaterialShaderLibNameArr(getMaterialShaderLibConfig(shaderName, material_config), material_config.shaderLibGroups, materialIndex, initShaderFuncDataMap, initShaderDataMap);

        key = _buildShaderIndexMapKey(materialShaderLibNameArr);

        ShaderDataFromSystem.shaderLibNameMap[materialIndex] = key;
    }

    shaderIndex = ShaderDataFromSystem.shaderIndexMap[key];

    if (_isShaderIndexExist(shaderIndex)) {
        return shaderIndex;
    }

    if (!materialShaderLibNameArr) {
        materialShaderLibNameArr = getMaterialShaderLibNameArr(getMaterialShaderLibConfig(shaderName, material_config), material_config.shaderLibGroups, materialIndex, initShaderFuncDataMap, initShaderDataMap);
    }

    shaderIndex = init(state, materialIndex, materialShaderLibNameArr, material_config, shaderLib_generator, initShaderFuncDataMap, initShaderDataMap);

    ShaderDataFromSystem.shaderIndexMap[key] = shaderIndex;

    return shaderIndex;
}

export const initNoMaterialShader = (state: Map<any, any>, shaderName: string, materialShaderLibConfig: MaterialShaderLibConfig, material_config: IMaterialConfig, shaderLib_generator: IWebGL1ShaderLibContentGenerator | IWebGL2ShaderLibContentGenerator, init: Function, initShaderFuncDataMap: WebGL1InitShaderFuncDataMap | IWebGL2InitShaderFuncDataMap, initShaderDataMap: InitShaderDataMap) => {
    var {
            ShaderDataFromSystem,
        } = initShaderDataMap,
        materialShaderLibNameArr = null,
        shaderIndex: number = null,
        key = ShaderDataFromSystem.shaderIndexByShaderNameMap[shaderName];

    if (!key) {
        materialShaderLibNameArr = getMaterialShaderLibNameArr(materialShaderLibConfig, material_config.shaderLibGroups, null, initShaderFuncDataMap, initShaderDataMap);

        key = _buildShaderIndexMapKey(materialShaderLibNameArr);

        ShaderDataFromSystem.shaderIndexByShaderNameMap[shaderName] = key;
    }

    shaderIndex = ShaderDataFromSystem.shaderIndexMap[key];

    if (_isShaderIndexExist(shaderIndex)) {
        return shaderIndex;
    }

    if (!materialShaderLibNameArr) {
        materialShaderLibNameArr = getMaterialShaderLibNameArr(materialShaderLibConfig, material_config.shaderLibGroups, null, initShaderFuncDataMap, initShaderDataMap);
    }

    shaderIndex = init(state, null, materialShaderLibNameArr, material_config, shaderLib_generator, initShaderFuncDataMap, initShaderDataMap);

    ShaderDataFromSystem.shaderIndexMap[key] = shaderIndex;

    return shaderIndex;
}

const _buildShaderIndexMapKey = (materialShaderLibNameArr: Array<string>) => materialShaderLibNameArr.join("");

const _isShaderIndexExist = (shaderIndex: number) => isNotUndefined(shaderIndex);

export const genereateShaderIndex = (ShaderDataFromSystem: any) => {
    var index = ShaderDataFromSystem.index;

    ShaderDataFromSystem.index += 1;

    return index;
}
