"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LightMaterial_1 = require("./LightMaterial");
var MaterialSystem_1 = require("./MaterialSystem");
var materialUtils_1 = require("../../renderer/utils/worker/render_file/material/materialUtils");
var typeArrayUtils_1 = require("../../utils/typeArrayUtils");
var Color_1 = require("../../structure/Color");
var ELightModel_1 = require("./ELightModel");
var lightMaterialUtils_1 = require("../../renderer/utils/worker/render_file/material/lightMaterialUtils");
var MaterialData_1 = require("./MaterialData");
var SpecifyMaterialSystem_1 = require("./SpecifyMaterialSystem");
var bufferUtils_1 = require("../../renderer/utils/worker/render_file/material/bufferUtils");
var contract_1 = require("../../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
var ComponentSystem_1 = require("../ComponentSystem");
var LightMaterialData_1 = require("./LightMaterialData");
var operateBufferDataUtils_1 = require("../utils/operateBufferDataUtils");
var MapManagerData_1 = require("../../renderer/texture/MapManagerData");
var MapManagerSystem_1 = require("../../renderer/texture/MapManagerSystem");
var bufferUtils_2 = require("../../renderer/utils/material/bufferUtils");
var DeviceManagerSystem_1 = require("../../renderer/device/DeviceManagerSystem");
var TextureData_1 = require("../../renderer/texture/TextureData");
var DeviceManagerData_1 = require("../../renderer/device/DeviceManagerData");
exports.create = contract_1.ensureFunc(function (component) {
    contract_1.it("index should <= max count", function () {
        wonder_expect_js_1.expect(component.index).lte(bufferUtils_2.getLightMaterialBufferStartIndex() + bufferUtils_1.getLightMaterialBufferCount());
    });
}, function (ShaderData, MaterialData, LightMaterialData) {
    var material = new LightMaterial_1.LightMaterial(), index = ComponentSystem_1.generateComponentIndex(LightMaterialData);
    material.index = index;
    material = MaterialSystem_1.create(index, material, ShaderData, MaterialData);
    return material;
});
exports.getSpecularColor = function (index, LightMaterialData) {
    return operateBufferDataUtils_1.getColor3Data(lightMaterialUtils_1.computeLightBufferIndex(index), LightMaterialData.specularColors);
};
exports.getSpecularColorArr3 = function (index, LightMaterialData) {
    return lightMaterialUtils_1.getSpecularColorArr3(lightMaterialUtils_1.computeLightBufferIndex(index), LightMaterialData);
};
exports.setSpecularColor = function (index, color, LightMaterialData) {
    MaterialSystem_1.setColorData(lightMaterialUtils_1.computeLightBufferIndex(index), color, LightMaterialData.specularColors);
};
exports.setDiffuseMap = function (index, map, MapManagerData, TextureData) {
    MapManagerSystem_1.setMap(index, map, "u_diffuseMapSampler", MapManagerData, TextureData);
    lightMaterialUtils_1.markHasMap(index, LightMaterialData_1.LightMaterialData.hasDiffuseMaps);
};
exports.setSpecularMap = function (index, map, MapManagerData, TextureData) {
    MapManagerSystem_1.setMap(index, map, "u_specularMapSampler", MapManagerData, TextureData);
    lightMaterialUtils_1.markHasMap(index, LightMaterialData_1.LightMaterialData.hasSpecularMaps);
};
exports.getEmissionColor = function (index, LightMaterialData) {
    return operateBufferDataUtils_1.getColor3Data(lightMaterialUtils_1.computeLightBufferIndex(index), LightMaterialData.emissionColors);
};
exports.getEmissionColorArr3 = function (index, LightMaterialData) {
    return lightMaterialUtils_1.getEmissionColorArr3(lightMaterialUtils_1.computeLightBufferIndex(index), LightMaterialData);
};
exports.setEmissionColor = function (index, color, LightMaterialData) {
    MaterialSystem_1.setColorData(lightMaterialUtils_1.computeLightBufferIndex(index), color, LightMaterialData.emissionColors);
};
exports.getShininess = function (index, LightMaterialDataFromSystem) {
    return lightMaterialUtils_1.getShininess(lightMaterialUtils_1.computeLightBufferIndex(index), LightMaterialDataFromSystem);
};
exports.setShininess = function (index, shininess, LightMaterialData) {
    typeArrayUtils_1.setTypeArrayValue(LightMaterialData.shininess, lightMaterialUtils_1.computeLightBufferIndex(index), shininess);
};
exports.getShading = function (index, LightMaterialDataFromSystem) {
    return lightMaterialUtils_1.getShading(lightMaterialUtils_1.computeLightBufferIndex(index), LightMaterialDataFromSystem);
};
exports.setShading = function (index, shading, LightMaterialData) {
    typeArrayUtils_1.setTypeArrayValue(LightMaterialData.shadings, lightMaterialUtils_1.computeLightBufferIndex(index), shading);
};
exports.getLightModel = function (index, LightMaterialDataFromSystem) {
    return lightMaterialUtils_1.getLightModel(lightMaterialUtils_1.computeLightBufferIndex(index), LightMaterialDataFromSystem);
};
exports.setLightModel = function (index, lightModel, LightMaterialData) {
    typeArrayUtils_1.setTypeArrayValue(LightMaterialData.lightModels, lightMaterialUtils_1.computeLightBufferIndex(index), lightModel);
};
exports.hasDiffuseMap = function (index, LightMaterialData) {
    return lightMaterialUtils_1.hasDiffuseMap(lightMaterialUtils_1.computeLightBufferIndex(index), LightMaterialData);
};
exports.hasSpecularMap = function (index, LightMaterialData) {
    return lightMaterialUtils_1.hasSpecularMap(lightMaterialUtils_1.computeLightBufferIndex(index), LightMaterialData);
};
exports.initMaterialWithoutInitMap = function (index, state) {
    MaterialSystem_1.initMaterial(index, state, lightMaterialUtils_1.getClassName(), MaterialData_1.MaterialData);
};
exports.initMaterial = function (index, state) {
    MaterialSystem_1.initMaterial(index, state, lightMaterialUtils_1.getClassName(), MaterialData_1.MaterialData);
    MapManagerSystem_1.initMapManager(DeviceManagerSystem_1.getGL(DeviceManagerData_1.DeviceManagerData, state), index, MapManagerData_1.MapManagerData, TextureData_1.TextureData);
};
exports.addComponent = function (component, gameObject) {
    MaterialSystem_1.addComponent(component, gameObject, MaterialData_1.MaterialData);
};
exports.disposeComponent = function (component) {
    var sourceIndex = component.index, lightMaterialSourceIndex = lightMaterialUtils_1.computeLightBufferIndex(sourceIndex), lastComponentIndex = null, lightMaterialLastComponentIndex = null, colorDataSize = materialUtils_1.getColorDataSize(), shininessDataSize = lightMaterialUtils_1.getShininessDataSize(), shadingDataSize = lightMaterialUtils_1.getShadingDataSize(), lightModelDataSize = lightMaterialUtils_1.getLightModelDataSize(), mapSize = lightMaterialUtils_1.getMapSize();
    LightMaterialData_1.LightMaterialData.index -= 1;
    lastComponentIndex = LightMaterialData_1.LightMaterialData.index;
    lightMaterialLastComponentIndex = lightMaterialUtils_1.computeLightBufferIndex(lastComponentIndex);
    MaterialSystem_1.disposeComponent(sourceIndex, lastComponentIndex, MapManagerData_1.MapManagerData, MaterialData_1.MaterialData);
    typeArrayUtils_1.deleteBySwapAndReset(lightMaterialSourceIndex * colorDataSize, lightMaterialLastComponentIndex * colorDataSize, LightMaterialData_1.LightMaterialData.specularColors, colorDataSize, MaterialData_1.MaterialData.defaultColorArr);
    typeArrayUtils_1.deleteBySwapAndReset(lightMaterialSourceIndex * colorDataSize, lightMaterialLastComponentIndex * colorDataSize, LightMaterialData_1.LightMaterialData.emissionColors, colorDataSize, LightMaterialData_1.LightMaterialData.emptyColorArr);
    typeArrayUtils_1.deleteOneItemBySwapAndReset(lightMaterialSourceIndex * shadingDataSize, lightMaterialLastComponentIndex * shadingDataSize, LightMaterialData_1.LightMaterialData.shadings, LightMaterialData_1.LightMaterialData.defaultShading);
    typeArrayUtils_1.deleteOneItemBySwapAndReset(lightMaterialSourceIndex * shininessDataSize, lightMaterialLastComponentIndex * shininessDataSize, LightMaterialData_1.LightMaterialData.shininess, LightMaterialData_1.LightMaterialData.defaultShininess);
    typeArrayUtils_1.deleteOneItemBySwapAndReset(lightMaterialSourceIndex * lightModelDataSize, lightMaterialLastComponentIndex * lightModelDataSize, LightMaterialData_1.LightMaterialData.lightModels, LightMaterialData_1.LightMaterialData.defaultLightModel);
    typeArrayUtils_1.deleteOneItemBySwapAndReset(lightMaterialSourceIndex * mapSize, lightMaterialLastComponentIndex * mapSize, LightMaterialData_1.LightMaterialData.hasDiffuseMaps, LightMaterialData_1.LightMaterialData.defaultHasMap);
    typeArrayUtils_1.deleteOneItemBySwapAndReset(lightMaterialSourceIndex * mapSize, lightMaterialLastComponentIndex * mapSize, LightMaterialData_1.LightMaterialData.hasSpecularMaps, LightMaterialData_1.LightMaterialData.defaultHasMap);
};
exports.initData = function (LightMaterialData) {
    SpecifyMaterialSystem_1.initData(bufferUtils_2.getLightMaterialBufferStartIndex(), LightMaterialData);
    LightMaterialData.emptyColor = _createEmptyColor();
    LightMaterialData.emptyColorArr = LightMaterialData.emptyColor.toVector3().toArray();
};
exports.createTypeArrays = function (buffer, offset, count, LightMaterialData) {
    var returnedOffset = lightMaterialUtils_1.createTypeArrays(buffer, offset, count, LightMaterialData);
    _setLightMaterialDefaultTypeArrData(count, LightMaterialData);
    return returnedOffset;
};
exports.setDefaultData = function (LightMaterialData) {
    LightMaterialData.defaultShininess = 32;
    LightMaterialData.defaultShading = 0;
    LightMaterialData.defaultLightModel = ELightModel_1.ELightModel.PHONG;
    LightMaterialData.defaultHasMap = lightMaterialUtils_1.getNotHasMapValue();
};
var _setLightMaterialDefaultTypeArrData = function (count, LightMaterialData) {
    var startIndex = bufferUtils_2.getLightMaterialBufferStartIndex(), color = MaterialSystem_1.createDefaultColor(), emptyColor = LightMaterialData.emptyColor, shading = LightMaterialData.defaultShading, lightModel = LightMaterialData.defaultLightModel, shininess = LightMaterialData.defaultShininess, hasMap = LightMaterialData.defaultHasMap;
    count += startIndex;
    for (var i = startIndex; i < count; i++) {
        exports.setSpecularColor(i, color, LightMaterialData);
        exports.setEmissionColor(i, emptyColor, LightMaterialData);
        exports.setShininess(i, shininess, LightMaterialData);
        exports.setShading(i, shading, LightMaterialData);
        exports.setLightModel(i, lightModel, LightMaterialData);
        lightMaterialUtils_1.markNotHasMap(i, LightMaterialData.hasDiffuseMaps);
        lightMaterialUtils_1.markNotHasMap(i, LightMaterialData.hasSpecularMaps);
    }
};
var _createEmptyColor = function () {
    var color = Color_1.Color.create("rgb(0,0,0)");
    return color;
};
//# sourceMappingURL=LightMaterialSystem.js.map