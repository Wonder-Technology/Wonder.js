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

