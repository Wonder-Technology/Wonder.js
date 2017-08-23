import { expect } from "wonder-expect.js";
import { ensureFunc, it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
export var getMaterialShaderLibConfig = ensureFunc(function (shaderLibConfig, shaderName, material_config) {
    it("shaderLib config should be array", function () {
        expect(shaderLibConfig).exist;
        expect(shaderLibConfig).be.a("array");
    });
}, requireCheckFunc(function (shaderName, material_config) {
}, function (shaderName, material_config) {
    return material_config.shaders.materialShaders[shaderName];
}));
//# sourceMappingURL=MaterialConfigSystem.js.map