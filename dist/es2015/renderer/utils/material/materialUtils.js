import { ensureFunc, it } from "../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
export var getMaterialClassNameFromTable = function (shaderIndex, materialClassNameTable) {
    return materialClassNameTable[shaderIndex];
};
export var getShaderIndexFromTable = ensureFunc(function (index) {
    it("shader index should be defined in materialClassNameTable", function () {
        expect(index).gte(0);
    });
}, function (materialClassName, shaderIndexTable) {
    return shaderIndexTable[materialClassName];
});
export var getOpacity = function (materialIndex, MaterialDataFromSystem) {
    var size = getOpacityDataSize(), index = materialIndex * size;
    return MaterialDataFromSystem.opacities[index];
};
export var getAlphaTest = function (materialIndex, MaterialDataFromSystem) {
    var size = getAlphaTestDataSize(), index = materialIndex * size;
    return MaterialDataFromSystem.alphaTests[index];
};
export var getColorArr3 = function (materialIndex, MaterialMaterialDataFromSystem) {
    var colors = MaterialMaterialDataFromSystem.colors, size = getColorDataSize(), index = materialIndex * size;
    return [colors[index], colors[index + 1], colors[index + 2]];
};
export var isTestAlpha = function (alphaTest) {
    return alphaTest >= 0;
};
export var getColorDataSize = function () { return 3; };
export var getOpacityDataSize = function () { return 1; };
export var getAlphaTestDataSize = function () { return 1; };
export var createTypeArrays = function (buffer, count, MaterialDataFromSystem) {
    MaterialDataFromSystem.shaderIndices = new Uint32Array(buffer, 0, count);
    MaterialDataFromSystem.colors = new Float32Array(buffer, count * Uint32Array.BYTES_PER_ELEMENT, count * getColorDataSize());
    MaterialDataFromSystem.opacities = new Float32Array(buffer, count * (Uint32Array.BYTES_PER_ELEMENT + Float32Array.BYTES_PER_ELEMENT * getColorDataSize()), count * getOpacityDataSize());
    MaterialDataFromSystem.alphaTests = new Float32Array(buffer, count * (Uint32Array.BYTES_PER_ELEMENT + Float32Array.BYTES_PER_ELEMENT * (getColorDataSize() + getOpacityDataSize())), count * getAlphaTestDataSize());
};
//# sourceMappingURL=materialUtils.js.map