import { Map } from "immutable";
import { isNotUndefined } from "../../../utils/JudgeUtils";
import { IWebGL2ShaderLibContentGenerator } from "../../worker/webgl2/both_file/data/shaderLib_generator";
import { IWebGL1ShaderLibContentGenerator } from "../../worker/webgl1/both_file/data/shaderLib_generator";
import { IMaterialConfig, IShaderLibItem, MaterialShaderLibConfig } from "../../data/material_config";
import { InitShaderDataMap, InitShaderFuncDataMap } from "../../type/utilsType";

export var initShader = (state: Map<any, any>, materialIndex:number | null, shaderName:string, materialShaderLibConfig:MaterialShaderLibConfig, material_config: IMaterialConfig, shaderLib_generator: IWebGL1ShaderLibContentGenerator | IWebGL2ShaderLibContentGenerator, init:Function, initShaderFuncDataMap: InitShaderFuncDataMap, initShaderDataMap: InitShaderDataMap) => {
    var {
            ShaderDataFromSystem,
        } = initShaderDataMap,
        key = buildShaderIndexByMaterialIndexAndShaderNameMapKey(materialIndex, shaderName),
        shaderIndex = getShaderIndexByMaterialIndexAndShaderName(key, ShaderDataFromSystem);

    if(_isShaderIndexExist(shaderIndex)){
        return shaderIndex;
    }

    shaderIndex = init(state, materialIndex, materialShaderLibConfig, material_config, shaderLib_generator, initShaderFuncDataMap, initShaderDataMap);

    _setShaderIndexByMaterialIndexAndShaderNameMap(key, shaderIndex, ShaderDataFromSystem);

    return shaderIndex;
}

var _setShaderIndexByMaterialIndexAndShaderNameMap = (key:string, shaderIndex:number, ShaderDataFromSystem:any) => {
    ShaderDataFromSystem.shaderIndexByMaterialIndexAndShaderNameMap[key] = shaderIndex;
}

export var getShaderIndexByMaterialIndexAndShaderName = (key:string, ShaderDataFromSystem:any) => {
    return ShaderDataFromSystem.shaderIndexByMaterialIndexAndShaderNameMap[key];
}

export var buildShaderIndexByMaterialIndexAndShaderNameMapKey = (materialIndex:number|null, shaderName:string) => {
    if(materialIndex === null){
        return shaderName;
    }

    return `${materialIndex}${shaderName}`;
}

var _isShaderIndexExist = (shaderIndex:number) => isNotUndefined(shaderIndex);

export var genereateShaderIndex = (ShaderDataFromSystem: any) => {
    var index = ShaderDataFromSystem.index;

    ShaderDataFromSystem.index += 1;

    return index;
}
