import { ensureFunc, it } from "../../../definition/typescript/decorator/contract";
import { MaterialClassNameTable, ShaderIndexTable } from "../../../definition/type/materialType";
import { expect } from "wonder-expect.js";

export var getMaterialClassNameFromTable = (shaderIndex:number, materialClassNameTable:MaterialClassNameTable) => {
    return materialClassNameTable[shaderIndex]
}

export var getShaderIndexFromTable = ensureFunc((index:number) => {
    it("shader index should be defined in materialClassNameTable", () => {
        expect(index).gte(0);
    })
}, (materialClassName:string, shaderIndexTable:ShaderIndexTable) => {
    return shaderIndexTable[materialClassName];
})

export var getOpacity = (materialIndex: number, MaterialDataFromSystem: any) => {
    var size = getOpacityMaterialDataFromSystemSize(),
        index = materialIndex * size;

    return MaterialDataFromSystem.opacities[index];
}

export var getAlphaTest = (materialIndex: number, MaterialDataFromSystem: any) => {
    var size = getAlphaTestMaterialDataFromSystemSize(),
        index = materialIndex * size;

    return MaterialDataFromSystem.alphaTests[index];
}

export var getColorMaterialDataFromSystemSize = () => 3;

export var getOpacityMaterialDataFromSystemSize = () => 1;

export var getAlphaTestMaterialDataFromSystemSize = () => 1;

export var createBufferViews = (buffer:any, count:number, MaterialDataFromSystem:any) => {
    MaterialDataFromSystem.shaderIndices = new Uint32Array(buffer, 0, count);
    MaterialDataFromSystem.colors = new Float32Array(buffer, count * Uint32Array.BYTES_PER_ELEMENT, count * getColorMaterialDataFromSystemSize());
    MaterialDataFromSystem.opacities = new Float32Array(buffer, count * (Uint32Array.BYTES_PER_ELEMENT + Float32Array.BYTES_PER_ELEMENT * getColorMaterialDataFromSystemSize()), count * getOpacityMaterialDataFromSystemSize());
    MaterialDataFromSystem.alphaTests = new Float32Array(buffer, count * (Uint32Array.BYTES_PER_ELEMENT + Float32Array.BYTES_PER_ELEMENT * (getColorMaterialDataFromSystemSize() + getOpacityMaterialDataFromSystemSize())), count * getAlphaTestMaterialDataFromSystemSize());
}

