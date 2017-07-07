import { BasicMaterial } from "./BasicMaterial";
import {
    create as createMaterial, disposeSpecifyMaterialData, getSpecifyMateiralBufferSize, setAlphaTest, setColor,
    setOpacity,
    setShaderIndex, setSpecifyMaterialDefaultData, setSpecifyMaterialDefaultTypeArrData
} from "./MaterialSystem";
import { create as createShader } from "../../renderer/shader/ShaderSystem";
import { DataBufferConfig } from "../../config/DataBufferConfig";
import { createSharedArrayBufferOrArrayBuffer } from "../../utils/arrayBufferUtils";
import { Color } from "../../structure/Color";
import {
    createSpecifyMaterialTypeArrays,
    getAlphaTestDataSize, getColorDataSize,
    getOpacityDataSize
} from "../../renderer/utils/material/materialUtils";

export var create = (ShaderData: any, MaterialData: any) => {
    var material = new BasicMaterial(),
        materialClassName = "BasicMaterial";

    material = createMaterial(material, materialClassName, MaterialData);

    setShaderIndex(material.index, createShader(materialClassName, MaterialData, ShaderData), MaterialData);

    return material;
}

export var disposeComponent = (sourceIndex:number, lastComponentIndex:number, BasicMaterialData:any) => {
    disposeSpecifyMaterialData(sourceIndex, lastComponentIndex, BasicMaterialData);
}

export var initData = (BasicMaterialData: any) => {
    var buffer: any = null,
        count = DataBufferConfig.basicMaterialDataBufferCount,
        size = getSpecifyMateiralBufferSize();

    buffer = createSharedArrayBufferOrArrayBuffer(count * size);

    createSpecifyMaterialTypeArrays(buffer, count, BasicMaterialData)

    BasicMaterialData.buffer = buffer;

    setSpecifyMaterialDefaultData(BasicMaterialData);

    setSpecifyMaterialDefaultTypeArrData(count, BasicMaterialData);
}

