"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var contract_1 = require("../../../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
exports.getMaterialClassNameFromTable = function (shaderIndex, materialClassNameTable) {
    return materialClassNameTable[shaderIndex];
};
exports.getShaderIndexFromTable = contract_1.ensureFunc(function (index) {
    contract_1.it("shader index should be defined in materialClassNameTable", function () {
        wonder_expect_js_1.expect(index).gte(0);
    });
}, function (materialClassName, shaderIndexTable) {
    return shaderIndexTable[materialClassName];
});
exports.getOpacity = function (materialIndex, MaterialDataFromSystem) {
    var size = exports.getOpacityDataSize(), index = materialIndex * size;
    return MaterialDataFromSystem.opacities[index];
};
exports.getAlphaTest = function (materialIndex, MaterialDataFromSystem) {
    var size = exports.getAlphaTestDataSize(), index = materialIndex * size;
    return MaterialDataFromSystem.alphaTests[index];
};
exports.getColorArr3 = function (materialIndex, MaterialMaterialDataFromSystem) {
    var colors = MaterialMaterialDataFromSystem.colors, size = exports.getColorDataSize(), index = materialIndex * size;
    return [colors[index], colors[index + 1], colors[index + 2]];
};
exports.isTestAlpha = function (alphaTest) {
    return alphaTest >= 0;
};
exports.getColorDataSize = function () { return 3; };
exports.getOpacityDataSize = function () { return 1; };
exports.getAlphaTestDataSize = function () { return 1; };
exports.createTypeArrays = function (buffer, count, MaterialDataFromSystem) {
    MaterialDataFromSystem.shaderIndices = new Uint32Array(buffer, 0, count);
    MaterialDataFromSystem.colors = new Float32Array(buffer, count * Uint32Array.BYTES_PER_ELEMENT, count * exports.getColorDataSize());
    MaterialDataFromSystem.opacities = new Float32Array(buffer, count * (Uint32Array.BYTES_PER_ELEMENT + Float32Array.BYTES_PER_ELEMENT * exports.getColorDataSize()), count * exports.getOpacityDataSize());
    MaterialDataFromSystem.alphaTests = new Float32Array(buffer, count * (Uint32Array.BYTES_PER_ELEMENT + Float32Array.BYTES_PER_ELEMENT * (exports.getColorDataSize() + exports.getOpacityDataSize())), count * exports.getAlphaTestDataSize());
};
//# sourceMappingURL=materialUtils.js.map