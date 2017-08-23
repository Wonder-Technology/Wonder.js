"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wonder_expect_js_1 = require("wonder-expect.js");
var contract_1 = require("../../../../../definition/typescript/decorator/contract");
var gpuDetectUtils_1 = require("../../../device/gpuDetectUtils");
exports.isCached = function (unitIndex, textureIndex, TextureCacheDataFromSystem, GPUDetectDataFromSystem) {
    return _getActiveTexture(unitIndex, TextureCacheDataFromSystem, GPUDetectDataFromSystem) === textureIndex;
};
var _getActiveTexture = contract_1.requireCheckFunc(function (unitIndex, TextureCacheDataFromSystem, GPUDetectDataFromSystem) {
    _checkUnit(unitIndex, GPUDetectDataFromSystem);
}, function (unitIndex, TextureCacheDataFromSystem, GPUDetectDataFromSystem) {
    return TextureCacheDataFromSystem.bindTextureUnitCache[unitIndex];
});
exports.addActiveTexture = contract_1.requireCheckFunc(function (unitIndex, textureIndex, TextureCacheDataFromSystem, GPUDetectDataFromSystem) {
    _checkUnit(unitIndex, GPUDetectDataFromSystem);
}, function (unitIndex, textureIndex, TextureCacheDataFromSystem, GPUDetectDataFromSystem) {
    TextureCacheDataFromSystem.bindTextureUnitCache[unitIndex] = textureIndex;
});
var _checkUnit = function (unitIndex, GPUDetectDataFromSystem) {
    var maxTextureUnit = gpuDetectUtils_1.getMaxTextureUnit(GPUDetectDataFromSystem);
    contract_1.it("texture unitIndex should >= 0, but actual is " + unitIndex, function () {
        wonder_expect_js_1.expect(unitIndex).gte(0);
    });
    contract_1.it("trying to cache " + unitIndex + " texture unitIndexs, but GPU only supports " + maxTextureUnit + " unitIndexs", function () {
        wonder_expect_js_1.expect(unitIndex).lt(maxTextureUnit);
    });
};
exports.clearAllBindTextureUnitCache = function (TextureCacheDataFromSystem) {
    TextureCacheDataFromSystem.bindTextureUnitCache = [];
};
exports.initData = function (TextureCacheDataFromSystem) {
    TextureCacheDataFromSystem.bindTextureUnitCache = [];
};
//# sourceMappingURL=textureCacheUtils.js.map