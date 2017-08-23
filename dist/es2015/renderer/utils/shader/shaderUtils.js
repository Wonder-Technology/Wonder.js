import { isNotUndefined } from "../../../utils/JudgeUtils";
import { getMaterialShaderLibNameArr } from "./shaderSourceBuildUtils";
import { getMaterialShaderLibConfig } from "../../data/MaterialConfigSystem";
export var initMaterialShader = function (state, materialIndex, shaderName, material_config, shaderLib_generator, init, initShaderFuncDataMap, initShaderDataMap) {
    var ShaderDataFromSystem = initShaderDataMap.ShaderDataFromSystem, materialShaderLibNameArr = null, shaderIndex = null, key = ShaderDataFromSystem.shaderLibNameMap[materialIndex];
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
};
export var initNoMaterialShader = function (state, shaderName, materialShaderLibConfig, material_config, shaderLib_generator, init, initShaderFuncDataMap, initShaderDataMap) {
    var ShaderDataFromSystem = initShaderDataMap.ShaderDataFromSystem, materialShaderLibNameArr = null, shaderIndex = null, key = ShaderDataFromSystem.shaderIndexByShaderNameMap[shaderName];
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
};
var _buildShaderIndexMapKey = function (materialShaderLibNameArr) { return materialShaderLibNameArr.join(""); };
var _isShaderIndexExist = function (shaderIndex) { return isNotUndefined(shaderIndex); };
export var genereateShaderIndex = function (ShaderDataFromSystem) {
    var index = ShaderDataFromSystem.index;
    ShaderDataFromSystem.index += 1;
    return index;
};
//# sourceMappingURL=shaderUtils.js.map