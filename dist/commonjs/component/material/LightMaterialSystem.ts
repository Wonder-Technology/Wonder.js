import { LightMaterial } from "./LightMaterial";
import {
    addComponent as addMaterialComponent,
    create as createMaterial, createDefaultColor, disposeComponent as disposeMaterialComponent,
    initMaterial as initMaterialBase,
    setColorData
} from "./MaterialSystem";
import {
    getColorDataSize
} from "../../renderer/utils/worker/render_file/material/materialUtils";
import { deleteBySwapAndReset, deleteOneItemBySwapAndReset, setTypeArrayValue } from "../../utils/typeArrayUtils";
import { Color } from "../../structure/Color";
import { EShading } from "./EShading";
import { ELightModel } from "./ELightModel";
import {
    computeLightBufferIndex,
    createTypeArrays as createTypeArraysUtils, getClassName,
    getEmissionColorArr3 as getEmissionColorArr3Utils,
    getLightModel as getLightModelUtils, getLightModelDataSize, getMapSize, getNotHasMapValue,
    getShading as getShadingUtils,
    getShadingDataSize,
    getShininess as getShininessUtils, getShininessDataSize,
    getSpecularColorArr3 as getSpecularColorArr3Utils, hasDiffuseMap as hasDiffuseMapUtils,
    hasSpecularMap as hasSpecularMapUtils, markHasMap, markNotHasMap,
} from "../../renderer/utils/worker/render_file/material/lightMaterialUtils";
import { Material } from "./Material";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import { MaterialData } from "./MaterialData";
import { Map } from "immutable";
import { initData as initSpecifyMaterialData } from "./SpecifyMaterialSystem";
import { getLightMaterialBufferCount } from "../../renderer/utils/worker/render_file/material/bufferUtils";
import { ensureFunc, it } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { generateComponentIndex } from "../ComponentSystem";
import { LightMaterialData } from "./LightMaterialData";
import { getColor3Data } from "../utils/operateBufferDataUtils";
import { MapManagerData } from "../../renderer/texture/MapManagerData";
import { Texture } from "../../renderer/texture/Texture";
import { getMapCount, initMapManager, setMap } from "../../renderer/texture/MapManagerSystem";
import { getLightMaterialBufferStartIndex } from "../../renderer/utils/material/bufferUtils";
import { getGL } from "../../renderer/device/DeviceManagerSystem";
import { TextureData } from "../../renderer/texture/TextureData";
import { DeviceManagerData } from "../../renderer/device/DeviceManagerData";

export const create = ensureFunc((component: Material) => {
    it("index should <= max count", () => {
        expect(component.index).lte(getLightMaterialBufferStartIndex() + getLightMaterialBufferCount());
    });
}, (ShaderData: any, MaterialData: any, LightMaterialData: any) => {
    var material = new LightMaterial(),
        index = generateComponentIndex(LightMaterialData);

    material.index = index;

    material = createMaterial(index, material, ShaderData, MaterialData);

    return material;
})

export const getSpecularColor = (index: number, LightMaterialData: any) => {
    return getColor3Data(computeLightBufferIndex(index), LightMaterialData.specularColors);
}

export const getSpecularColorArr3 = (index: number, LightMaterialData: any) => {
    return getSpecularColorArr3Utils(computeLightBufferIndex(index), LightMaterialData);
}

export const setSpecularColor = (index: number, color: Color, LightMaterialData: any) => {
    setColorData(computeLightBufferIndex(index), color, LightMaterialData.specularColors);
}

export const setDiffuseMap = (index: number, map: Texture, MapManagerData: any, TextureData: any) => {
    setMap(index, map, "u_diffuseMapSampler", MapManagerData, TextureData);

    markHasMap(index, LightMaterialData.hasDiffuseMaps);
}

export const setSpecularMap = (index: number, map: Texture, MapManagerData: any, TextureData: any) => {
    setMap(index, map, "u_specularMapSampler", MapManagerData, TextureData);

    markHasMap(index, LightMaterialData.hasSpecularMaps);
}

//todo add normal map, light map...

export const getEmissionColor = (index: number, LightMaterialData: any) => {
    return getColor3Data(computeLightBufferIndex(index), LightMaterialData.emissionColors);
}

export const getEmissionColorArr3 = (index: number, LightMaterialData: any) => {
    return getEmissionColorArr3Utils(computeLightBufferIndex(index), LightMaterialData);
}

export const setEmissionColor = (index: number, color: Color, LightMaterialData: any) => {
    setColorData(computeLightBufferIndex(index), color, LightMaterialData.emissionColors);
}

export const getShininess = (index: number, LightMaterialDataFromSystem: any) => {
    return getShininessUtils(computeLightBufferIndex(index), LightMaterialDataFromSystem);
}

export const setShininess = (index: number, shininess: number, LightMaterialData: any) => {
    setTypeArrayValue(LightMaterialData.shininess, computeLightBufferIndex(index), shininess);
}

export const getShading = (index: number, LightMaterialDataFromSystem: any) => {
    return getShadingUtils(computeLightBufferIndex(index), LightMaterialDataFromSystem);
}

export const setShading = (index: number, shading: EShading, LightMaterialData: any) => {
    setTypeArrayValue(LightMaterialData.shadings, computeLightBufferIndex(index), shading);
}

export const getLightModel = (index: number, LightMaterialDataFromSystem: any) => {
    return getLightModelUtils(computeLightBufferIndex(index), LightMaterialDataFromSystem);
}

export const setLightModel = (index: number, lightModel: ELightModel, LightMaterialData: any) => {
    setTypeArrayValue(LightMaterialData.lightModels, computeLightBufferIndex(index), lightModel);
}

export const hasDiffuseMap = (index: number, LightMaterialData: any) => {
    return hasDiffuseMapUtils(computeLightBufferIndex(index), LightMaterialData);
}

export const hasSpecularMap = (index: number, LightMaterialData: any) => {
    return hasSpecularMapUtils(computeLightBufferIndex(index), LightMaterialData);
}

export const initMaterialWithoutInitMap = (index: number, state: Map<any, any>) => {
    initMaterialBase(index, state, getClassName(), MaterialData);
}

export const initMaterial = (index: number, state: Map<any, any>) => {
    initMaterialBase(index, state, getClassName(), MaterialData);

    initMapManager(getGL(DeviceManagerData, state), index, MapManagerData, TextureData);
}

export const addComponent = (component: Material, gameObject: GameObject) => {
    addMaterialComponent(component, gameObject, MaterialData);
}

export const disposeComponent = (component: Material) => {
    var sourceIndex = component.index,
        lightMaterialSourceIndex = computeLightBufferIndex(sourceIndex),
        lastComponentIndex: number = null,
        lightMaterialLastComponentIndex: number = null,
        colorDataSize = getColorDataSize(),
        shininessDataSize = getShininessDataSize(),
        shadingDataSize = getShadingDataSize(),
        lightModelDataSize = getLightModelDataSize(),
        mapSize = getMapSize();

    LightMaterialData.index -= 1;

    lastComponentIndex = LightMaterialData.index;

    lightMaterialLastComponentIndex = computeLightBufferIndex(lastComponentIndex);

    disposeMaterialComponent(sourceIndex, lastComponentIndex, MapManagerData, MaterialData);

    deleteBySwapAndReset(lightMaterialSourceIndex * colorDataSize, lightMaterialLastComponentIndex * colorDataSize, LightMaterialData.specularColors, colorDataSize, MaterialData.defaultColorArr);
    deleteBySwapAndReset(lightMaterialSourceIndex * colorDataSize, lightMaterialLastComponentIndex * colorDataSize, LightMaterialData.emissionColors, colorDataSize, LightMaterialData.emptyColorArr);

    deleteOneItemBySwapAndReset(lightMaterialSourceIndex * shadingDataSize, lightMaterialLastComponentIndex * shadingDataSize, LightMaterialData.shadings, LightMaterialData.defaultShading);
    deleteOneItemBySwapAndReset(lightMaterialSourceIndex * shininessDataSize, lightMaterialLastComponentIndex * shininessDataSize, LightMaterialData.shininess, LightMaterialData.defaultShininess);
    deleteOneItemBySwapAndReset(lightMaterialSourceIndex * lightModelDataSize, lightMaterialLastComponentIndex * lightModelDataSize, LightMaterialData.lightModels, LightMaterialData.defaultLightModel);
    deleteOneItemBySwapAndReset(lightMaterialSourceIndex * mapSize, lightMaterialLastComponentIndex * mapSize, LightMaterialData.hasDiffuseMaps, LightMaterialData.defaultHasMap);
    deleteOneItemBySwapAndReset(lightMaterialSourceIndex * mapSize, lightMaterialLastComponentIndex * mapSize, LightMaterialData.hasSpecularMaps, LightMaterialData.defaultHasMap);
}

export const initData = (LightMaterialData: any) => {
    initSpecifyMaterialData(getLightMaterialBufferStartIndex(), LightMaterialData);

    LightMaterialData.emptyColor = _createEmptyColor();
    LightMaterialData.emptyColorArr = LightMaterialData.emptyColor.toVector3().toArray();
}

export const createTypeArrays = (buffer: any, offset: number, count: number, LightMaterialData: any) => {
    var returnedOffset = createTypeArraysUtils(buffer, offset, count, LightMaterialData);

    _setLightMaterialDefaultTypeArrData(count, LightMaterialData);

    return returnedOffset;
}

export const setDefaultData = (LightMaterialData: any) => {
    LightMaterialData.defaultShininess = 32;
    LightMaterialData.defaultShading = 0;
    LightMaterialData.defaultLightModel = ELightModel.PHONG;
    LightMaterialData.defaultHasMap = getNotHasMapValue();
}

const _setLightMaterialDefaultTypeArrData =(count: number, LightMaterialData: any) => {
    var startIndex = getLightMaterialBufferStartIndex(),
        color = createDefaultColor(),
        emptyColor = LightMaterialData.emptyColor,
        shading = LightMaterialData.defaultShading,
        lightModel = LightMaterialData.defaultLightModel,
        shininess = LightMaterialData.defaultShininess,
        hasMap = LightMaterialData.defaultHasMap;

    count += startIndex;

    for (let i = startIndex; i < count; i++) {
        setSpecularColor(i, color, LightMaterialData);
        setEmissionColor(i, emptyColor, LightMaterialData);
        setShininess(i, shininess, LightMaterialData);
        setShading(i, shading, LightMaterialData);
        setLightModel(i, lightModel, LightMaterialData);
        markNotHasMap(i, LightMaterialData.hasDiffuseMaps);
        markNotHasMap(i, LightMaterialData.hasSpecularMaps);
    }
}

const _createEmptyColor =() => {
    var color = Color.create("rgb(0,0,0)");

    return color;
}

