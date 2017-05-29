"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ShaderSystem_1 = require("../../renderer/shader/ShaderSystem");
var material_config_1 = require("../../renderer/data/material_config");
var shaderLib_generator_1 = require("../../renderer/data/shaderLib_generator");
var contract_1 = require("../../definition/typescript/decorator/contract");
var Color_1 = require("../../structure/Color");
var wonder_expect_js_1 = require("wonder-expect.js");
var ComponentSystem_1 = require("../ComponentSystem");
var objectUtils_1 = require("../../utils/objectUtils");
var contractUtils_1 = require("../utils/contractUtils");
var MaterialData_1 = require("./MaterialData");
var ShaderData_1 = require("../../renderer/shader/ShaderData");
var DeviceManagerData_1 = require("../../device/DeviceManagerData");
exports.addAddComponentHandle = function (_class) {
    ComponentSystem_1.addAddComponentHandle(_class, exports.addComponent);
};
exports.addDisposeHandle = function (_class) {
    ComponentSystem_1.addDisposeHandle(_class, exports.disposeComponent);
};
exports.addInitHandle = function (_class) {
    ComponentSystem_1.addInitHandle(_class, exports.initMaterial);
};
exports.create = contract_1.requireCheckFunc(function (material, className, MaterialData) {
    contract_1.it("MaterialData.index should >= 0", function () {
        wonder_expect_js_1.expect(MaterialData.index).gte(0);
    });
    contract_1.it("MaterialData.count should >= 0", function () {
        wonder_expect_js_1.expect(MaterialData.count).gte(0);
    });
}, function (material, className, MaterialData) {
    var index = ComponentSystem_1.generateComponentIndex(MaterialData);
    material.index = index;
    MaterialData.count += 1;
    _setMaterialClassName(index, className, MaterialData);
    exports.setColor(index, _createDefaultColor(), MaterialData);
    exports.setOpacity(index, 1, MaterialData);
    MaterialData.materialMap[index] = material;
    return material;
});
var _createDefaultColor = function () {
    var color = Color_1.Color.create();
    return color.setColorByNum("#ffffff");
};
exports.init = contract_1.requireCheckFunc(function (state, material_config, shaderLib_generator, DeviceManagerData, ShaderData, MaterialData) {
}, function (state, material_config, shaderLib_generator, DeviceManagerData, ShaderData, MaterialData) {
    for (var i = 0, count = MaterialData.count; i < count; i++) {
        exports.initMaterial(i, state);
    }
});
exports.initMaterial = function (index, state) {
    var shader = exports.getShader(index, MaterialData_1.MaterialData), isInitMap = ShaderData_1.ShaderData.isInitMap, shaderIndex = shader.index;
    if (isInitMap[shaderIndex] === true) {
        return;
    }
    isInitMap[shaderIndex] = true;
    ShaderSystem_1.init(state, index, shaderIndex, _getMaterialClassName(index, MaterialData_1.MaterialData), material_config_1.material_config, shaderLib_generator_1.shaderLib_generator, DeviceManagerData_1.DeviceManagerData, ShaderData_1.ShaderData);
};
var _getMaterialClassName = function (materialIndex, MaterialData) {
    return MaterialData.materialClassNameMap[materialIndex];
};
var _setMaterialClassName = function (materialIndex, className, MaterialData) {
    MaterialData.materialClassNameMap[materialIndex] = className;
};
exports.getShader = function (materialIndex, MaterialData) {
    return MaterialData.shaderMap[materialIndex];
};
exports.setShader = function (materialIndex, shader, MaterialData) {
    MaterialData.shaderMap[materialIndex] = shader;
};
exports.getColor = function (materialIndex, MaterialData) {
    return MaterialData.colorMap[materialIndex];
};
exports.setColor = function (materialIndex, color, MaterialData) {
    MaterialData.colorMap[materialIndex] = color;
};
exports.getOpacity = function (materialIndex, MaterialData) {
    return MaterialData.opacityMap[materialIndex];
};
exports.setOpacity = function (materialIndex, opacity, MaterialData) {
    MaterialData.opacityMap[materialIndex] = opacity;
};
exports.getAlphaTest = function (materialIndex, MaterialData) {
    return MaterialData.alphaTestMap[materialIndex];
};
exports.setAlphaTest = function (materialIndex, alphaTest, MaterialData) {
    MaterialData.alphaTestMap[materialIndex] = alphaTest;
};
exports.isPropertyExist = function (propertyVal) {
    return objectUtils_1.isValidMapValue(propertyVal);
};
exports.addComponent = function (component, gameObject) {
    ComponentSystem_1.addComponentToGameObjectMap(MaterialData_1.MaterialData.gameObjectMap, component.index, gameObject);
};
exports.disposeComponent = contract_1.ensureFunc(function (returnVal, component) {
    contractUtils_1.checkIndexShouldEqualCount(MaterialData_1.MaterialData);
}, function (component) {
    var sourceIndex = component.index, lastComponentIndex = null;
    MaterialData_1.MaterialData.count -= 1;
    MaterialData_1.MaterialData.index -= 1;
    lastComponentIndex = MaterialData_1.MaterialData.count;
    objectUtils_1.deleteBySwap(sourceIndex, lastComponentIndex, MaterialData_1.MaterialData.shaderMap);
    objectUtils_1.deleteBySwap(sourceIndex, lastComponentIndex, MaterialData_1.MaterialData.materialClassNameMap);
    objectUtils_1.deleteBySwap(sourceIndex, lastComponentIndex, MaterialData_1.MaterialData.colorMap);
    objectUtils_1.deleteBySwap(sourceIndex, lastComponentIndex, MaterialData_1.MaterialData.opacityMap);
    objectUtils_1.deleteBySwap(sourceIndex, lastComponentIndex, MaterialData_1.MaterialData.alphaTestMap);
    objectUtils_1.deleteBySwap(sourceIndex, lastComponentIndex, MaterialData_1.MaterialData.gameObjectMap);
    ComponentSystem_1.deleteComponentBySwap(sourceIndex, lastComponentIndex, MaterialData_1.MaterialData.materialMap);
});
exports.getGameObject = function (index, Data) {
    return ComponentSystem_1.getComponentGameObject(Data.gameObjectMap, index);
};
exports.initData = function (MaterialData) {
    MaterialData.shaderMap = objectUtils_1.createMap();
    MaterialData.materialClassNameMap = objectUtils_1.createMap();
    MaterialData.colorMap = objectUtils_1.createMap();
    MaterialData.opacityMap = objectUtils_1.createMap();
    MaterialData.alphaTestMap = objectUtils_1.createMap();
    MaterialData.materialMap = objectUtils_1.createMap();
    MaterialData.gameObjectMap = objectUtils_1.createMap();
    MaterialData.index = 0;
    MaterialData.count = 0;
};
//# sourceMappingURL=MaterialSystem.js.map