import { BasicMaterial } from "./BasicMaterial";
import {
    create as createMaterial, setAlphaTest, setColor, setOpacity,
    setShaderIndex
} from "./MaterialSystem";
import { create as createShader } from "../../renderer/shader/ShaderSystem";
import { DataBufferConfig } from "../../config/DataBufferConfig";
import { createSharedArrayBufferOrArrayBuffer } from "../../utils/arrayBufferUtils";
import {
    getAlphaTestDataSize, getColorDataSize,
    getOpacityDataSize, createTypeArrays
} from "../../renderer/utils/material/basicMaterialUtils";
import { deleteBySwapAndReset, deleteOneItemBySwapAndReset } from "../../utils/typeArrayUtils";
import { Color } from "../../structure/Color";

export var create = (ShaderData: any, MaterialData: any) => {
    var material = new BasicMaterial(),
        materialClassName = "BasicMaterial";

    material = createMaterial(material, materialClassName, MaterialData);

    setShaderIndex(material.index, createShader(materialClassName, MaterialData, ShaderData), MaterialData);

    return material;
}

export var disposeComponent = (sourceIndex:number, lastComponentIndex:number, BasicMaterialData:any) => {
    var colorDataSize = getColorDataSize(),
        opacityDataSize = getOpacityDataSize(),
        alphaTestDataSize = getAlphaTestDataSize();

    deleteBySwapAndReset(sourceIndex * colorDataSize, lastComponentIndex * colorDataSize, BasicMaterialData.colors, colorDataSize, BasicMaterialData.defaultColorArr);

    deleteOneItemBySwapAndReset(sourceIndex * opacityDataSize, lastComponentIndex * opacityDataSize, BasicMaterialData.opacities, BasicMaterialData.defaultOpacity);
    deleteOneItemBySwapAndReset(sourceIndex * alphaTestDataSize, lastComponentIndex * alphaTestDataSize, BasicMaterialData.alphaTests, BasicMaterialData.defaultAlphaTest);
}

export var initData = (MaterialData: any, BasicMaterialData: any) => {
    var buffer: any = null,
        count = DataBufferConfig.basicMaterialDataBufferCount,
        size = Uint32Array.BYTES_PER_ELEMENT + Float32Array.BYTES_PER_ELEMENT * (getColorDataSize() + getOpacityDataSize() + getAlphaTestDataSize())

    buffer = createSharedArrayBufferOrArrayBuffer(count * size);

    createTypeArrays(buffer, count, BasicMaterialData);

    BasicMaterialData.buffer = buffer;

    BasicMaterialData.defaultColorArr = _createDefaultColor().toVector3().toArray();
    BasicMaterialData.defaultOpacity = 1;
    BasicMaterialData.defaultAlphaTest = -1;

    _setDefaultTypeArrData(count, BasicMaterialData);
}

var _setDefaultTypeArrData = (count: number, BasicMaterialData: any) => {
    var color = _createDefaultColor(),
        opacity = BasicMaterialData.defaultOpacity,
        alphaTest = BasicMaterialData.defaultAlphaTest;

    for (let i = 0; i < count; i++) {
        setColor(i, color, BasicMaterialData);
        setOpacity(i, opacity, BasicMaterialData);
        setAlphaTest(i, alphaTest, BasicMaterialData);
    }
}

var _createDefaultColor = () => {
    var color = Color.create();

    return color.setColorByNum("#ffffff");
}

