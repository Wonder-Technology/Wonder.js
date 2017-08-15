import { IMaterialConfig, MaterialShaderLibConfig } from "./material_config_interface";
import { expect } from "wonder-expect.js";
import { ensureFunc, it, requireCheckFunc } from "../../definition/typescript/decorator/contract";

export var getMaterialShaderLibConfig = ensureFunc((shaderLibConfig:MaterialShaderLibConfig, shaderName: string, material_config: IMaterialConfig) => {
    it("shaderLib config should be array", () => {
        expect(shaderLibConfig).exist;
        expect(shaderLibConfig).be.a("array");
    });
}, requireCheckFunc((shaderName: string, material_config: IMaterialConfig) => {
    // var materialData = material_config.materials[materialClassName];
    //
    // it("materialClassName should be defined", () => {
    //     expect(materialData).exist;
    // })
}, (shaderName: string, material_config: IMaterialConfig) => {
    return material_config.shaders.materialShaders[shaderName];
}))


