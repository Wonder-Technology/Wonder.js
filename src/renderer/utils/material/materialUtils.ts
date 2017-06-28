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

export var getOpacity = (materialIndex: number, SpecifyMaterialDataFromSystem: any) => {
    var size = getOpacityDataSize(),
        index = materialIndex * size;

    return SpecifyMaterialDataFromSystem.opacities[index];
}

export var getAlphaTest = (materialIndex: number, SpecifyMaterialDataFromSystem: any) => {
    var size = getAlphaTestDataSize(),
        index = materialIndex * size;

    return SpecifyMaterialDataFromSystem.alphaTests[index];
}

export var getColorArr3 = (materialIndex: number, SpecifyMaterialDataFromSystem: any) => {
    var colors = SpecifyMaterialDataFromSystem.colors,
        size = getColorDataSize(),
        index = materialIndex * size;

    return [colors[index], colors[index + 1], colors[index + 2]];
}

export var isTestAlpha = (alphaTest: number) => {
    return alphaTest >= 0;
}

//todo refactor
export var getColorDataSize = () => 3;

export var getOpacityDataSize = () => 1;

export var getAlphaTestDataSize = () => 1;

export var createTypeArrays = (buffer: any, count: number, MaterialDataFromSystem: any) => {
    MaterialDataFromSystem.shaderIndices = new Uint32Array(buffer, 0, count);
    // MaterialDataFromSystem.colors = new Float32Array(buffer, count * Uint32Array.BYTES_PER_ELEMENT, count * getColorDataSize());
    // MaterialDataFromSystem.opacities = new Float32Array(buffer, count * (Uint32Array.BYTES_PER_ELEMENT + Float32Array.BYTES_PER_ELEMENT * getColorDataSize()), count * getOpacityDataSize());
    // MaterialDataFromSystem.alphaTests = new Float32Array(buffer, count * (Uint32Array.BYTES_PER_ELEMENT + Float32Array.BYTES_PER_ELEMENT * (getColorDataSize() + getOpacityDataSize())), count * getAlphaTestDataSize());
}

