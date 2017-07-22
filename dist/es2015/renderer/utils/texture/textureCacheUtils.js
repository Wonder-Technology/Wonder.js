import { expect } from "wonder-expect.js";
import { GPUDetector } from "../../device/GPUDetector";
import { it, requireCheckFunc } from "../../../definition/typescript/decorator/contract";
export var isCached = function (unitIndex, textureIndex, TextureCacheDataFromSystem) {
    return _getActiveTexture(unitIndex, TextureCacheDataFromSystem) === textureIndex;
};
var _getActiveTexture = requireCheckFunc(function (unitIndex, TextureCacheDataFromSystem) {
    _checkUnit(unitIndex);
}, function (unitIndex, TextureCacheDataFromSystem) {
    return TextureCacheDataFromSystem.bindTextureUnitCache[unitIndex];
});
export var addActiveTexture = requireCheckFunc(function (unitIndex, textureIndex, TextureCacheDataFromSystem) {
    _checkUnit(unitIndex);
}, function (unitIndex, textureIndex, TextureCacheDataFromSystem) {
    TextureCacheDataFromSystem.bindTextureUnitCache[unitIndex] = textureIndex;
});
var _checkUnit = function (unitIndex) {
    var maxTextureUnit = GPUDetector.getInstance().maxTextureUnit;
    it("texture unitIndex should >= 0, but actual is " + unitIndex, function () {
        expect(unitIndex).gte(0);
    });
    it("trying to cache " + unitIndex + " texture unitIndexs, but GPU only supports " + maxTextureUnit + " unitIndexs", function () {
        expect(unitIndex).lt(maxTextureUnit);
    });
};
export var clearAllBindTextureUnitCache = function (TextureCacheDataFromSystem) {
    TextureCacheDataFromSystem.bindTextureUnitCache = [];
};
export var initData = function (TextureCacheDataFromSystem) {
    TextureCacheDataFromSystem.bindTextureUnitCache = [];
};
//# sourceMappingURL=textureCacheUtils.js.map