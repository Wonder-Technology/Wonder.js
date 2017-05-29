import { init as initShader } from "../../renderer/shader/ShaderSystem";
import { material_config } from "../../renderer/data/material_config";
import { shaderLib_generator } from "../../renderer/data/shaderLib_generator";
import { ensureFunc, it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { Color } from "../../structure/Color";
import { expect } from "wonder-expect.js";
import { addAddComponentHandle as addAddComponentHandleToMap, addComponentToGameObjectMap, addDisposeHandle as addDisposeHandleToMap, addInitHandle as addInitHandleToMap, deleteComponentBySwap, generateComponentIndex, getComponentGameObject } from "../ComponentSystem";
import { createMap, deleteBySwap, isValidMapValue } from "../../utils/objectUtils";
import { checkIndexShouldEqualCount } from "../utils/contractUtils";
import { MaterialData } from "./MaterialData";
import { ShaderData } from "../../renderer/shader/ShaderData";
import { DeviceManagerData } from "../../device/DeviceManagerData";
export var addAddComponentHandle = function (_class) {
    addAddComponentHandleToMap(_class, addComponent);
};
export var addDisposeHandle = function (_class) {
    addDisposeHandleToMap(_class, disposeComponent);
};
export var addInitHandle = function (_class) {
    addInitHandleToMap(_class, initMaterial);
};
export var create = requireCheckFunc(function (material, className, MaterialData) {
    it("MaterialData.index should >= 0", function () {
        expect(MaterialData.index).gte(0);
    });
    it("MaterialData.count should >= 0", function () {
        expect(MaterialData.count).gte(0);
    });
}, function (material, className, MaterialData) {
    var index = generateComponentIndex(MaterialData);
    material.index = index;
    MaterialData.count += 1;
    _setMaterialClassName(index, className, MaterialData);
    setColor(index, _createDefaultColor(), MaterialData);
    setOpacity(index, 1, MaterialData);
    MaterialData.materialMap[index] = material;
    return material;
});
var _createDefaultColor = function () {
    var color = Color.create();
    return color.setColorByNum("#ffffff");
};
export var init = requireCheckFunc(function (state, material_config, shaderLib_generator, DeviceManagerData, ShaderData, MaterialData) {
}, function (state, material_config, shaderLib_generator, DeviceManagerData, ShaderData, MaterialData) {
    for (var i = 0, count = MaterialData.count; i < count; i++) {
        initMaterial(i, state);
    }
});
export var initMaterial = function (index, state) {
    var shader = getShader(index, MaterialData), isInitMap = ShaderData.isInitMap, shaderIndex = shader.index;
    if (isInitMap[shaderIndex] === true) {
        return;
    }
    isInitMap[shaderIndex] = true;
    initShader(state, index, shaderIndex, _getMaterialClassName(index, MaterialData), material_config, shaderLib_generator, DeviceManagerData, ShaderData);
};
var _getMaterialClassName = function (materialIndex, MaterialData) {
    return MaterialData.materialClassNameMap[materialIndex];
};
var _setMaterialClassName = function (materialIndex, className, MaterialData) {
    MaterialData.materialClassNameMap[materialIndex] = className;
};
export var getShader = function (materialIndex, MaterialData) {
    return MaterialData.shaderMap[materialIndex];
};
export var setShader = function (materialIndex, shader, MaterialData) {
    MaterialData.shaderMap[materialIndex] = shader;
};
export var getColor = function (materialIndex, MaterialData) {
    return MaterialData.colorMap[materialIndex];
};
export var setColor = function (materialIndex, color, MaterialData) {
    MaterialData.colorMap[materialIndex] = color;
};
export var getOpacity = function (materialIndex, MaterialData) {
    return MaterialData.opacityMap[materialIndex];
};
export var setOpacity = function (materialIndex, opacity, MaterialData) {
    MaterialData.opacityMap[materialIndex] = opacity;
};
export var getAlphaTest = function (materialIndex, MaterialData) {
    return MaterialData.alphaTestMap[materialIndex];
};
export var setAlphaTest = function (materialIndex, alphaTest, MaterialData) {
    MaterialData.alphaTestMap[materialIndex] = alphaTest;
};
export var isPropertyExist = function (propertyVal) {
    return isValidMapValue(propertyVal);
};
export var addComponent = function (component, gameObject) {
    addComponentToGameObjectMap(MaterialData.gameObjectMap, component.index, gameObject);
};
export var disposeComponent = ensureFunc(function (returnVal, component) {
    checkIndexShouldEqualCount(MaterialData);
}, function (component) {
    var sourceIndex = component.index, lastComponentIndex = null;
    MaterialData.count -= 1;
    MaterialData.index -= 1;
    lastComponentIndex = MaterialData.count;
    deleteBySwap(sourceIndex, lastComponentIndex, MaterialData.shaderMap);
    deleteBySwap(sourceIndex, lastComponentIndex, MaterialData.materialClassNameMap);
    deleteBySwap(sourceIndex, lastComponentIndex, MaterialData.colorMap);
    deleteBySwap(sourceIndex, lastComponentIndex, MaterialData.opacityMap);
    deleteBySwap(sourceIndex, lastComponentIndex, MaterialData.alphaTestMap);
    deleteBySwap(sourceIndex, lastComponentIndex, MaterialData.gameObjectMap);
    deleteComponentBySwap(sourceIndex, lastComponentIndex, MaterialData.materialMap);
});
export var getGameObject = function (index, Data) {
    return getComponentGameObject(Data.gameObjectMap, index);
};
export var initData = function (MaterialData) {
    MaterialData.shaderMap = createMap();
    MaterialData.materialClassNameMap = createMap();
    MaterialData.colorMap = createMap();
    MaterialData.opacityMap = createMap();
    MaterialData.alphaTestMap = createMap();
    MaterialData.materialMap = createMap();
    MaterialData.gameObjectMap = createMap();
    MaterialData.index = 0;
    MaterialData.count = 0;
};
//# sourceMappingURL=MaterialSystem.js.map