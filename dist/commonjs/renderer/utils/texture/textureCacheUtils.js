"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wonder_expect_js_1 = require("wonder-expect.js");
var GPUDetector_1 = require("../../device/GPUDetector");
var contract_1 = require("../../../definition/typescript/decorator/contract");
exports.isCached = function (unitIndex, textureIndex, TextureCacheDataFromSystem) {
    return _getActiveTexture(unitIndex, TextureCacheDataFromSystem) === textureIndex;
};
var _getActiveTexture = contract_1.requireCheckFunc(function (unitIndex, TextureCacheDataFromSystem) {
    _checkUnit(unitIndex);
}, function (unitIndex, TextureCacheDataFromSystem) {
    return TextureCacheDataFromSystem.bindTextureUnitCache[unitIndex];
});
exports.addActiveTexture = contract_1.requireCheckFunc(function (unitIndex, textureIndex, TextureCacheDataFromSystem) {
    _checkUnit(unitIndex);
}, function (unitIndex, textureIndex, TextureCacheDataFromSystem) {
    TextureCacheDataFromSystem.bindTextureUnitCache[unitIndex] = textureIndex;
});
var _checkUnit = function (unitIndex) {
    var maxTextureUnit = GPUDetector_1.GPUDetector.getInstance().maxTextureUnit;
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