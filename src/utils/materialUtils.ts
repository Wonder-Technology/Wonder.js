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

export var getColorDataSize = () => 3;

export var createBufferViews = (buffer:any, count:number, Data:any) => {
    Data.shaderIndices = new Uint32Array(buffer, 0, count);
    Data.colors = new Float32Array(buffer, count * Uint32Array.BYTES_PER_ELEMENT, count * getColorDataSize());
}

