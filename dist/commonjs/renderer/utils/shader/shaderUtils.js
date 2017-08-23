"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JudgeUtils_1 = require("../../../utils/JudgeUtils");
var shaderSourceBuildUtils_1 = require("./shaderSourceBuildUtils");
var MaterialConfigSystem_1 = require("../../data/MaterialConfigSystem");
exports.initMaterialShader = function (state, materialIndex, shaderName, material_config, shaderLib_generator, init, initShaderFuncDataMap, initShaderDataMap) {
    var ShaderDataFromSystem = initShaderDataMap.ShaderDataFromSystem, materialShaderLibNameArr = null, shaderIndex = null, key = ShaderDataFromSystem.shaderLibNameMap[materialIndex];
    if (!key) {
        materialShaderLibNameArr = shaderSourceBuildUtils_1.getMaterialShaderLibNameArr(MaterialConfigSystem_1.getMaterialShaderLibConfig(shaderName, material_config), material_config.shaderLibGroups, materialIndex, initShaderFuncDataMap, initShaderDataMap);
        key = _buildShaderIndexMapKey(materialShaderLibNameArr);
        ShaderDataFromSystem.shaderLibNameMap[materialIndex] = key;
    }
    shaderIndex = ShaderDataFromSystem.shaderIndexMap[key];
    if (_isShaderIndexExist(shaderIndex)) {
        return shaderIndex;
    }
    if (!materialShaderLibNameArr) {
        materialShaderLibNameArr = shaderSourceBuildUtils_1.getMaterialShaderLibNameArr(MaterialConfigSystem_1.getMaterialShaderLibConfig(shaderName, material_config), material_config.shaderLibGroups, materialIndex, initShaderFuncDataMap, initShaderDataMap);
    }
    shaderIndex = init(state, materialIndex, materialShaderLibNameArr, material_config, shaderLib_generator, initShaderFuncDataMap, initShaderDataMap);
    ShaderDataFromSystem.shaderIndexMap[key] = shaderIndex;
    return shaderIndex;
};
exports.initNoMaterialShader = function (state, shaderName, materialShaderLibConfig, material_config, shaderLib_generator, init, initShaderFuncDataMap, initShaderDataMap) {
    var ShaderDataFromSystem = initShaderDataMap.ShaderDataFromSystem, materialShaderLibNameArr = null, shaderIndex = null, key = ShaderDataFromSystem.shaderIndexByShaderNameMap[shaderName];
    if (!key) {
        materialShaderLibNameArr = shaderSourceBuildUtils_1.getMaterialShaderLibNameArr(materialShaderLibConfig, material_config.shaderLibGroups, null, initShaderFuncDataMap, initShaderDataMap);
        key = _buildShaderIndexMapKey(materialShaderLibNameArr);
        ShaderDataFromSystem.shaderIndexByShaderNameMap[shaderName] = key;
    }
    shaderIndex = ShaderDataFromSystem.shaderIndexMap[key];
    if (_isShaderIndexExist(shaderIndex)) {
        return shaderIndex;
    }
    if (!materialShaderLibNameArr) {
        materialShaderLibNameArr = shaderSourceBuildUtils_1.getMaterialShaderLibNameArr(materialShaderLibConfig, material_config.shaderLibGroups, null, initShaderFuncDataMap, initShaderDataMap);
    }
    shaderIndex = init(state, null, materialShaderLibNameArr, material_config, shaderLib_generator, initShaderFuncDataMap, initShaderDataMap);
    ShaderDataFromSystem.shaderIndexMap[key] = shaderIndex;
    return shaderIndex;
};
var _buildShaderIndexMapKey = function (materialShaderLibNameArr) { return materialShaderLibNameArr.join(""); };
var _isShaderIndexExist = function (shaderIndex) { return JudgeUtils_1.isNotUndefined(shaderIndex); };
exports.genereateShaderIndex = function (ShaderDataFromSystem) {
    var index = ShaderDataFromSystem.index;
    ShaderDataFromSystem.index += 1;
    return index;
};
//# sourceMappingURL=shaderUtils.js.map