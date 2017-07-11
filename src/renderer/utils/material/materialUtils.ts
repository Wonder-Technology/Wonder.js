import { ensureFunc, it } from "../../../definition/typescript/decorator/contract";
import { MaterialClassNameTable, ShaderIndexTable } from "../../../definition/type/materialType";
import { expect } from "wonder-expect.js";

export var getMaterialClassNameFromTable = (shaderIndex: number, materialClassNameTable: MaterialClassNameTable) => {
    return materialClassNameTable[shaderIndex]
}

export var getShaderIndexFromTable = ensureFunc((index: number) => {
    it("shader index should be defined in materialClassNameTable", () => {
        expect(index).gte(0);
    })
}, (materialClassName: string, shaderIndexTable: ShaderIndexTable) => {
    return shaderIndexTable[materialClassName];
})

export var getOpacity = (materialIndex: number, MaterialDataFromSystem: any) => {
    return getSingleSizeData(materialIndex, MaterialDataFromSystem.opacities);
}

export var getAlphaTest = (materialIndex: number, MaterialDataFromSystem: any) => {
    return getSingleSizeData(materialIndex, MaterialDataFromSystem.alphaTests);
}

export var getSingleSizeData = (materialIndex: number, datas:Uint8Array|Float32Array) => {
    return datas[materialIndex];
}


export var getColorArr3 = (materialIndex: number, MaterialDataFromSystem: any) => {
    var colors = MaterialDataFromSystem.colors,
        size = getColorDataSize(),
        index = materialIndex * size;

    return [colors[index], colors[index + 1], colors[index + 2]];
}

export var getColorArr3Data = (materialIndex: number, colors:Float32Array) => {
    var size = getColorDataSize(),
        index = materialIndex * size;

    return [colors[index], colors[index + 1], colors[index + 2]];
}

export var isTestAlpha = (alphaTest: number) => {
    return alphaTest >= 0;
}

export var getShaderIndexDataSize = () => 1;

export var getColorDataSize = () => 3;

export var getOpacityDataSize = () => 1;

export var getAlphaTestDataSize = () => 1;

export var createTypeArrays = (buffer: any, count: number, MaterialDataFromSystem: any) => {
    var offset = 0;

    MaterialDataFromSystem.shaderIndices = new Uint32Array(buffer, offset, count * getShaderIndexDataSize());
    offset += count * Uint32Array.BYTES_PER_ELEMENT * getShaderIndexDataSize();

    MaterialDataFromSystem.colors = new Float32Array(buffer, offset, count * getColorDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * getColorDataSize();

    MaterialDataFromSystem.opacities = new Float32Array(buffer, offset, count * getOpacityDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * getOpacityDataSize();

    MaterialDataFromSystem.alphaTests = new Float32Array(buffer, offset, count * getAlphaTestDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * getAlphaTestDataSize();

    return offset;
}
