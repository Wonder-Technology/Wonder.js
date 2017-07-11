import { LightMaterial } from "./LightMaterial";
import {
    addComponent as addMaterialComponent,
    create as createMaterial, createDefaultColor, disposeComponent as disposeMaterialComponent, getColorData,
    initMaterial as initMaterialMaterial,
    setColorData,
    setTypeArrayValue
} from "./MaterialSystem";
import {
    getColorDataSize
} from "../../renderer/utils/material/materialUtils";
import { deleteBySwapAndReset, deleteOneItemBySwapAndReset } from "../../utils/typeArrayUtils";
import { Color } from "../../structure/Color";
import { EShading } from "./EShading";
import { ELightModel } from "./ELightModel";
import {
    getEmissionColorArr3 as getEmissionColorArr3Utils,
    getLightModel as getLightModelUtils, getShading as getShadingUtils,
    getShininess as getShininessUtils,
    getSpecularColorArr3 as getSpecularColorArr3Utils
} from "../../renderer/utils/material/lightMaterialUtils";
import { Material } from "./Material";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import { MaterialData } from "./MaterialData";
import { Map } from "immutable";
import { initData as initSpecifyMaterialData } from "./SpecifyMaterialSystem";
import { getBufferTotalCount, getLightMaterialBufferCount, getLightMaterialBufferStartIndex } from "./bufferUtils";
import { ensureFunc, it } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { generateComponentIndex } from "../ComponentSystem";
import { LightMaterialData } from "./LightMaterialData";

export var create = ensureFunc((component:Material) => {
    it("index should <= max count", () => {
        expect(component.index).lte(getLightMaterialBufferStartIndex() + getLightMaterialBufferCount());
    });
}, (ShaderData: any, MaterialData:any, LightMaterialData: any) => {
    var material = new LightMaterial(),
        materialClassName = "LightMaterial",
        index = generateComponentIndex(LightMaterialData);

    material.index = index;

    material = createMaterial(index, materialClassName, material, ShaderData, MaterialData);

    return material;
})

export var getSpecularColor = (index: number, LightMaterialData: any) => {
    return getColorData(_computeLightBufferIndex(index), LightMaterialData.specularColors);
}

export var getSpecularColorArr3 = (index: number, LightMaterialData: any) => {
    return getSpecularColorArr3Utils(_computeLightBufferIndex(index), LightMaterialData);
}

export var setSpecularColor = (index: number, color: Color, LightMaterialData: any) => {
    setColorData(_computeLightBufferIndex(index), color, LightMaterialData.specularColors);
}

export var getEmissionColor = (index: number, LightMaterialData: any) => {
    return getColorData(_computeLightBufferIndex(index), LightMaterialData.emissionColors);
}

export var getEmissionColorArr3 = (index: number, LightMaterialData: any) => {
    return getEmissionColorArr3Utils(_computeLightBufferIndex(index), LightMaterialData);
}

export var setEmissionColor = (index: number, color: Color, LightMaterialData: any) => {
    setColorData(_computeLightBufferIndex(index), color, LightMaterialData.emissionColors);
}

export var getShininess = (index: number, LightMaterialDataFromSystem: any) => {
    return getShininessUtils(_computeLightBufferIndex(index), LightMaterialDataFromSystem);
}

export var setShininess = (index: number, shininess:number, LightMaterialData: any) => {
    setTypeArrayValue(LightMaterialData.shininess, _computeLightBufferIndex(index), shininess);
}

export var getShading = (index: number, LightMaterialDataFromSystem: any) => {
    return getShadingUtils(_computeLightBufferIndex(index), LightMaterialDataFromSystem);
}

export var setShading = (index: number, shading:EShading, LightMaterialData: any) => {
    setTypeArrayValue(LightMaterialData.shadings, _computeLightBufferIndex(index), shading);
}

export var getLightModel = (index: number, LightMaterialDataFromSystem: any) => {
    return getLightModelUtils(_computeLightBufferIndex(index), LightMaterialDataFromSystem);
}

export var setLightModel = (index: number, lightModel:ELightModel, LightMaterialData: any) => {
    setTypeArrayValue(LightMaterialData.lightModels, _computeLightBufferIndex(index), lightModel);
}

var _computeLightBufferIndex = (index:number) => index - getLightMaterialBufferStartIndex();

export var initMaterial = (index: number, state: Map<any, any>) => {
    initMaterialMaterial(index, state, MaterialData);
}

export var addComponent = (component: Material, gameObject: GameObject) => {
    addMaterialComponent(component, gameObject, MaterialData);
}

export var disposeComponent = (component: Material) => {
    var sourceIndex = component.index,
        lightMaterialSourceIndex = _computeLightBufferIndex(sourceIndex),
        lastComponentIndex: number = null,
        lightMaterialLastComponentIndex:number = null,
        colorDataSize = getColorDataSize(),
        shininessDataSize = getShininessDataSize(),
        shadingDataSize = getShadingDataSize(),
        lightModelDataSize = getLightModelDataSize();

    LightMaterialData.index -= 1;

    lastComponentIndex = LightMaterialData.index;

    lightMaterialLastComponentIndex = _computeLightBufferIndex(lastComponentIndex);

    disposeMaterialComponent(sourceIndex, lastComponentIndex, MaterialData);

    deleteBySwapAndReset(lightMaterialSourceIndex * colorDataSize, lightMaterialLastComponentIndex * colorDataSize, LightMaterialData.specularColors, colorDataSize, MaterialData.defaultColorArr);
    deleteBySwapAndReset(lightMaterialSourceIndex * colorDataSize, lightMaterialLastComponentIndex * colorDataSize, LightMaterialData.emissionColors, colorDataSize, LightMaterialData.emptyColorArr);

    deleteOneItemBySwapAndReset(lightMaterialSourceIndex * shadingDataSize, lightMaterialLastComponentIndex * shadingDataSize, LightMaterialData.shadings, LightMaterialData.defaultShading);
    deleteOneItemBySwapAndReset(lightMaterialSourceIndex * shininessDataSize, lightMaterialLastComponentIndex * shininessDataSize, LightMaterialData.shininess, LightMaterialData.defaultShininess);
    deleteOneItemBySwapAndReset(lightMaterialSourceIndex * lightModelDataSize, lightMaterialLastComponentIndex * lightModelDataSize, LightMaterialData.lightModels, LightMaterialData.defaultLightModel);
}

export var initData = (LightMaterialData: any) => {
    initSpecifyMaterialData(getLightMaterialBufferStartIndex(), LightMaterialData);

    LightMaterialData.emptyColor = _createEmptyColor();
    LightMaterialData.emptyColorArr = LightMaterialData.emptyColor.toVector3().toArray();
}

export var createTypeArrays = (buffer: any, offset:number, count: number, LightMaterialData: any) => {
    LightMaterialData.specularColors = new Float32Array(buffer, offset, count * getColorDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * getColorDataSize();

    LightMaterialData.emissionColors = new Float32Array(buffer, offset, count * getColorDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * getColorDataSize();

    LightMaterialData.shininess = new Float32Array(buffer, offset, count * getShininessDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * getShininessDataSize();

    LightMaterialData.shadings = new Uint8Array(buffer, offset, count * getShadingDataSize());
    offset += count * Uint8Array.BYTES_PER_ELEMENT * getShadingDataSize();

    LightMaterialData.lightModels = new Uint8Array(buffer, offset, count * getLightModelDataSize());
    offset += count * Uint8Array.BYTES_PER_ELEMENT * getLightModelDataSize();

    _setLightMaterialDefaultTypeArrData(count, LightMaterialData);

    return offset;
}

export var setDefaultData = (LightMaterialData:any) => {
    LightMaterialData.defaultShininess = 32;
    LightMaterialData.defaultShading = 0;
    LightMaterialData.defaultLightModel = ELightModel.PHONG;
}

var _setLightMaterialDefaultTypeArrData = (count:number, LightMaterialData:any) => {
    var startIndex = getLightMaterialBufferStartIndex(),
        color = createDefaultColor(),
        emptyColor = LightMaterialData.emptyColor,
        shading = LightMaterialData.defaultShading,
        lightModel = LightMaterialData.defaultLightModel,
        shininess = LightMaterialData.defaultShininess;

    count += startIndex;

    for (let i = startIndex; i < count; i++) {
        setSpecularColor(i, color, LightMaterialData);
        setEmissionColor(i, emptyColor, LightMaterialData);
        setShininess(i, shininess, LightMaterialData);
        setShading(i, shading, LightMaterialData);
        setLightModel(i, lightModel, LightMaterialData);
    }
}

var _createEmptyColor = () => {
    var color = Color.create("rgb(0,0,0)");

    return color;
}

export var getShadingDataSize = () => 1;

export var getLightModelDataSize = () => 1;

export var getShininessDataSize = () => 1;
