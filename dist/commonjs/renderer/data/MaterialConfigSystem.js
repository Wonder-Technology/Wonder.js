"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wonder_expect_js_1 = require("wonder-expect.js");
var contract_1 = require("../../definition/typescript/decorator/contract");
exports.getMaterialShaderLibConfig = contract_1.ensureFunc(function (shaderLibConfig, shaderName, material_config) {
    contract_1.it("shaderLib config should be array", function () {
        wonder_expect_js_1.expect(shaderLibConfig).exist;
        wonder_expect_js_1.expect(shaderLibConfig).be.a("array");
    });
}, contract_1.requireCheckFunc(function (shaderName, material_config) {
}, function (shaderName, material_config) {
    return material_config.shaders.materialShaders[shaderName];
}));
//# sourceMappingURL=MaterialConfigSystem.js.map