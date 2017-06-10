import { ensureFunc, it } from "../definition/typescript/decorator/contract";
import { ShaderIndexTable } from "../definition/type/materialType";
import { expect } from "wonder-expect.js";

export var getShaderIndexFromTable = ensureFunc((index:number) => {
    it("shader index should be defined in materialClassNameTable", () => {
        expect(index).gte(0);
    })
}, (materialClassName:string, shaderIndexTable:ShaderIndexTable) => {
    return shaderIndexTable[materialClassName];
})

export var getOpacity = (materialIndex: number, Data: any) => {
    var size = getOpacityDataSize(),
        index = materialIndex * size;

    return Data.opacities[index];
}

export var getAlphaTest = (materialIndex: number, Data: any) => {
    var size = getAlphaTestDataSize(),
        index = materialIndex * size;

    return Data.alphaTests[index];
}

export var getColorDataSize = () => 3;

export var getOpacityDataSize = () => 1;

export var getAlphaTestDataSize = () => 1;

export var createBufferViews = (buffer:any, count:number, Data:any) => {
    Data.shaderIndices = new Uint32Array(buffer, 0, count);
    Data.colors = new Float32Array(buffer, count * Uint32Array.BYTES_PER_ELEMENT, count * getColorDataSize());
    Data.opacities = new Float32Array(buffer, count * (Uint32Array.BYTES_PER_ELEMENT + Float32Array.BYTES_PER_ELEMENT * getColorDataSize()), count * getOpacityDataSize());
    Data.alphaTests = new Float32Array(buffer, count * (Uint32Array.BYTES_PER_ELEMENT + Float32Array.BYTES_PER_ELEMENT * (getColorDataSize() + getOpacityDataSize())), count * getAlphaTestDataSize());
}

