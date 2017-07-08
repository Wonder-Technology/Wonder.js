import { LightMaterial } from "./LightMaterial";
import {
    create as createMaterial, createDefaultColor, disposeSpecifyMaterialData, getColorData,
    getSpecifyMateiralBufferSize,
    setColorData,
    setShaderIndex, setSpecifyMaterialDefaultData, setSpecifyMaterialDefaultTypeArrData, setTypeArrayValue
} from "./MaterialSystem";
import { create as createShader } from "../../renderer/shader/ShaderSystem";
import { DataBufferConfig } from "../../config/DataBufferConfig";
import { createSharedArrayBufferOrArrayBuffer } from "../../utils/arrayBufferUtils";
import {
    createSpecifyMaterialTypeArrays, getColorDataSize
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

export var create = (ShaderData: any, MaterialData: any) => {
    var material = new LightMaterial(),
        materialClassName = "LightMaterial";

    material = createMaterial(material, MaterialData);

    setShaderIndex(material.index, createShader(materialClassName, MaterialData, ShaderData), MaterialData);

    return material;
}

export var getSpecularColor = (materialIndex: number, LightMaterialData: any) => {
    return getColorData(materialIndex, LightMaterialData.specularColors);
}

export var getSpecularColorArr3 = getSpecularColorArr3Utils;

export var setSpecularColor = (materialIndex: number, color: Color, LightMaterialData: any) => {
    setColorData(materialIndex, color, LightMaterialData.specularColors);
}

export var getEmissionColor = (materialIndex: number, LightMaterialData: any) => {
    return getColorData(materialIndex, LightMaterialData.emissionColors);
}

export var getEmissionColorArr3 = getEmissionColorArr3Utils;

export var setEmissionColor = (materialIndex: number, color: Color, LightMaterialData: any) => {
    setColorData(materialIndex, color, LightMaterialData.emissionColors);
}

export var getShininess = getShininessUtils;

export var setShininess = (materialIndex: number, shininess:number, LightMaterialData: any) => {
    setTypeArrayValue(LightMaterialData.shininess, materialIndex, shininess);
}

export var getShading = getShadingUtils;

export var setShading = (materialIndex: number, shading:EShading, LightMaterialData: any) => {
    setTypeArrayValue(LightMaterialData.shadings, materialIndex, shading);
}

export var getLightModel = getLightModelUtils;

export var setLightModel = (materialIndex: number, lightModel:ELightModel, LightMaterialData: any) => {
    setTypeArrayValue(LightMaterialData.lightModels, materialIndex, lightModel);
}

export var disposeComponent = (sourceIndex:number, lastComponentIndex:number, LightMaterialData:any) => {
    var colorDataSize = getColorDataSize(),
        shadingDataSize = _getShadingDataSize(),
        lightModelDataSize = _getLightModelDataSize();

    disposeSpecifyMaterialData(sourceIndex, lastComponentIndex, LightMaterialData);


    deleteBySwapAndReset(sourceIndex * colorDataSize, lastComponentIndex * colorDataSize, LightMaterialData.specularColors, colorDataSize, LightMaterialData.defaultColorArr);

    //todo unit test
    deleteOneItemBySwapAndReset(sourceIndex * shadingDataSize, lastComponentIndex * shadingDataSize, LightMaterialData.shadings, LightMaterialData.defaultShading);
    deleteOneItemBySwapAndReset(sourceIndex * lightModelDataSize, lastComponentIndex * lightModelDataSize, LightMaterialData.lightModels, LightMaterialData.defaultLightModel);
}

export var initData = (LightMaterialData: any) => {
    var buffer: any = null,
        count = DataBufferConfig.lightMaterialDataBufferCount,
        size = getSpecifyMateiralBufferSize() + Uint8Array.BYTES_PER_ELEMENT * (_getShadingDataSize() + _getLightModelDataSize()) + Float32Array.BYTES_PER_ELEMENT * (getColorDataSize() * 2 + _getShininessDataSize()),
        offset:number = null;

    buffer = createSharedArrayBufferOrArrayBuffer(count * size);

    offset = createSpecifyMaterialTypeArrays(buffer, count, LightMaterialData);

    _createLightMaterialTypeArrays(buffer, offset, count, LightMaterialData);

    LightMaterialData.buffer = buffer;

    _setLightMaterialDefaultData(LightMaterialData);
    _setLightMaterialDefaultTypeArrData(count, LightMaterialData);
}

var _createLightMaterialTypeArrays = (buffer: any, offset:number, count: number, LightMaterialData: any) => {
    LightMaterialData.specularColors = new Float32Array(buffer, offset, count * getColorDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * getColorDataSize();

    LightMaterialData.emissionColors = new Float32Array(buffer, offset, count * getColorDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * getColorDataSize();

    LightMaterialData.shininess = new Float32Array(buffer, offset, count * _getShininessDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * _getShininessDataSize();

    LightMaterialData.shadings = new Uint8Array(buffer, offset, count * _getShadingDataSize());
    offset += count * Uint8Array.BYTES_PER_ELEMENT * _getShadingDataSize();

    LightMaterialData.lightModels = new Uint8Array(buffer, offset, count * _getLightModelDataSize());
}

var _setLightMaterialDefaultData = (LightMaterialData:any) => {
    setSpecifyMaterialDefaultData(LightMaterialData);
    LightMaterialData.defaultShininess = 32;
    LightMaterialData.defaultShading = 0;
    LightMaterialData.defaultLightModel = ELightModel.PHONG;
}

var _setLightMaterialDefaultTypeArrData = (count:number, LightMaterialData:any) => {
    var color = createDefaultColor(),
        emptyColor = _createEmptyColor(),
        shading = LightMaterialData.defaultShading,
        lightModel = LightMaterialData.defaultLightModel;

    for (let i = 0; i < count; i++) {
        setSpecularColor(i, color, LightMaterialData);
        setEmissionColor(i, emptyColor, LightMaterialData);
        setShading(i, shading, LightMaterialData);
        setLightModel(i, lightModel, LightMaterialData);
    }

    setSpecifyMaterialDefaultTypeArrData(count, LightMaterialData);
}

var _createEmptyColor = () => {
    var color = Color.create("rgb(0,0,0)");

    return color;
}

var _getShadingDataSize = () => 1;

var _getLightModelDataSize = () => 1;

var _getShininessDataSize = () => 1;
