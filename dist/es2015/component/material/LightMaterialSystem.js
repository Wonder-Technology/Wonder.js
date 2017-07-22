import { LightMaterial } from "./LightMaterial";
import { addComponent as addMaterialComponent, create as createMaterial, createDefaultColor, disposeComponent as disposeMaterialComponent, initMaterial as initMaterialMaterial, setColorData } from "./MaterialSystem";
import { getColorDataSize } from "../../renderer/utils/material/materialUtils";
import { deleteBySwapAndReset, deleteOneItemBySwapAndReset, setTypeArrayValue } from "../../utils/typeArrayUtils";
import { Color } from "../../structure/Color";
import { ELightModel } from "./ELightModel";
import { computeLightBufferIndex, createTypeArrays as createTypeArraysUtils, getClassName, getEmissionColorArr3 as getEmissionColorArr3Utils, getLightModel as getLightModelUtils, getLightModelDataSize, getShading as getShadingUtils, getShadingDataSize, getShininess as getShininessUtils, getShininessDataSize, getSpecularColorArr3 as getSpecularColorArr3Utils } from "../../renderer/utils/material/lightMaterialUtils";
import { MaterialData } from "./MaterialData";
import { initData as initSpecifyMaterialData } from "./SpecifyMaterialSystem";
import { getLightMaterialBufferCount, getLightMaterialBufferStartIndex } from "../../renderer/utils/material/bufferUtils";
import { ensureFunc, it } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { generateComponentIndex } from "../ComponentSystem";
import { LightMaterialData } from "./LightMaterialData";
import { getColor3Data } from "../utils/operateBufferDataUtils";
import { MapManagerData } from "../../renderer/texture/MapManagerData";
import { addMap, getMapCount } from "../../renderer/texture/MapManagerSystem";
export var create = ensureFunc(function (component) {
    it("index should <= max count", function () {
        expect(component.index).lt(getLightMaterialBufferStartIndex() + getLightMaterialBufferCount());
    });
}, function (ShaderData, MaterialData, LightMaterialData) {
    var material = new LightMaterial(), index = generateComponentIndex(LightMaterialData);
    material.index = index;
    material = createMaterial(index, material, ShaderData, MaterialData);
    return material;
});
export var getSpecularColor = function (index, LightMaterialData) {
    return getColor3Data(computeLightBufferIndex(index), LightMaterialData.specularColors);
};
export var getSpecularColorArr3 = function (index, LightMaterialData) {
    return getSpecularColorArr3Utils(computeLightBufferIndex(index), LightMaterialData);
};
export var setSpecularColor = function (index, color, LightMaterialData) {
    setColorData(computeLightBufferIndex(index), color, LightMaterialData.specularColors);
};
export var getDiffuseMapIndex = function (LightMaterialData) {
    return LightMaterialData.diffuseMapIndex;
};
export var setDiffuseMap = function (index, map, MapManagerData, TextureData) {
    var count = getMapCount(index, MapManagerData);
    addMap(index, map, count, "u_diffuseMapSampler", MapManagerData, TextureData);
    LightMaterialData.diffuseMapIndex = map.index;
};
export var getSpecularMapIndex = function (LightMaterialData) {
    return LightMaterialData.specularMapIndex;
};
export var setSpecularMap = function (index, map, MapManagerData, TextureData) {
    var count = getMapCount(index, MapManagerData);
    addMap(index, map, count, "u_specularMapSampler", MapManagerData, TextureData);
    LightMaterialData.specularMapIndex = map.index;
};
export var getEmissionColor = function (index, LightMaterialData) {
    return getColor3Data(computeLightBufferIndex(index), LightMaterialData.emissionColors);
};
export var getEmissionColorArr3 = function (index, LightMaterialData) {
    return getEmissionColorArr3Utils(computeLightBufferIndex(index), LightMaterialData);
};
export var setEmissionColor = function (index, color, LightMaterialData) {
    setColorData(computeLightBufferIndex(index), color, LightMaterialData.emissionColors);
};
export var getShininess = function (index, LightMaterialDataFromSystem) {
    return getShininessUtils(computeLightBufferIndex(index), LightMaterialDataFromSystem);
};
export var setShininess = function (index, shininess, LightMaterialData) {
    setTypeArrayValue(LightMaterialData.shininess, computeLightBufferIndex(index), shininess);
};
export var getShading = function (index, LightMaterialDataFromSystem) {
    return getShadingUtils(computeLightBufferIndex(index), LightMaterialDataFromSystem);
};
export var setShading = function (index, shading, LightMaterialData) {
    setTypeArrayValue(LightMaterialData.shadings, computeLightBufferIndex(index), shading);
};
export var getLightModel = function (index, LightMaterialDataFromSystem) {
    return getLightModelUtils(computeLightBufferIndex(index), LightMaterialDataFromSystem);
};
export var setLightModel = function (index, lightModel, LightMaterialData) {
    setTypeArrayValue(LightMaterialData.lightModels, computeLightBufferIndex(index), lightModel);
};
export var initMaterial = function (index, state) {
    initMaterialMaterial(index, state, getClassName(), MaterialData);
};
export var addComponent = function (component, gameObject) {
    addMaterialComponent(component, gameObject, MaterialData);
};
export var disposeComponent = function (component) {
    var sourceIndex = component.index, lightMaterialSourceIndex = computeLightBufferIndex(sourceIndex), lastComponentIndex = null, lightMaterialLastComponentIndex = null, colorDataSize = getColorDataSize(), shininessDataSize = getShininessDataSize(), shadingDataSize = getShadingDataSize(), lightModelDataSize = getLightModelDataSize();
    LightMaterialData.index -= 1;
    lastComponentIndex = LightMaterialData.index;
    lightMaterialLastComponentIndex = computeLightBufferIndex(lastComponentIndex);
    disposeMaterialComponent(sourceIndex, lastComponentIndex, MapManagerData, MaterialData);
    deleteBySwapAndReset(lightMaterialSourceIndex * colorDataSize, lightMaterialLastComponentIndex * colorDataSize, LightMaterialData.specularColors, colorDataSize, MaterialData.defaultColorArr);
    deleteBySwapAndReset(lightMaterialSourceIndex * colorDataSize, lightMaterialLastComponentIndex * colorDataSize, LightMaterialData.emissionColors, colorDataSize, LightMaterialData.emptyColorArr);
    deleteOneItemBySwapAndReset(lightMaterialSourceIndex * shadingDataSize, lightMaterialLastComponentIndex * shadingDataSize, LightMaterialData.shadings, LightMaterialData.defaultShading);
    deleteOneItemBySwapAndReset(lightMaterialSourceIndex * shininessDataSize, lightMaterialLastComponentIndex * shininessDataSize, LightMaterialData.shininess, LightMaterialData.defaultShininess);
    deleteOneItemBySwapAndReset(lightMaterialSourceIndex * lightModelDataSize, lightMaterialLastComponentIndex * lightModelDataSize, LightMaterialData.lightModels, LightMaterialData.defaultLightModel);
};
export var initData = function (LightMaterialData) {
    initSpecifyMaterialData(getLightMaterialBufferStartIndex(), LightMaterialData);
    LightMaterialData.diffuseMapIndex = null;
    LightMaterialData.specularMapIndex = null;
    LightMaterialData.emptyColor = _createEmptyColor();
    LightMaterialData.emptyColorArr = LightMaterialData.emptyColor.toVector3().toArray();
};
export var createTypeArrays = function (buffer, offset, count, LightMaterialData) {
    var returnedOffset = createTypeArraysUtils(buffer, offset, count, LightMaterialData);
    _setLightMaterialDefaultTypeArrData(count, LightMaterialData);
    return returnedOffset;
};
export var setDefaultData = function (LightMaterialData) {
    LightMaterialData.defaultShininess = 32;
    LightMaterialData.defaultShading = 0;
    LightMaterialData.defaultLightModel = ELightModel.PHONG;
};
var _setLightMaterialDefaultTypeArrData = function (count, LightMaterialData) {
    var startIndex = getLightMaterialBufferStartIndex(), color = createDefaultColor(), emptyColor = LightMaterialData.emptyColor, shading = LightMaterialData.defaultShading, lightModel = LightMaterialData.defaultLightModel, shininess = LightMaterialData.defaultShininess;
    count += startIndex;
    for (var i = startIndex; i < count; i++) {
        setSpecularColor(i, color, LightMaterialData);
        setEmissionColor(i, emptyColor, LightMaterialData);
        setShininess(i, shininess, LightMaterialData);
        setShading(i, shading, LightMaterialData);
        setLightModel(i, lightModel, LightMaterialData);
    }
};
var _createEmptyColor = function () {
    var color = Color.create("rgb(0,0,0)");
    return color;
};
//# sourceMappingURL=LightMaterialSystem.js.map