import { expect } from "wonder-expect.js";
import { it, requireCheckFunc } from "../../../../../definition/typescript/decorator/contract";
import { getMaxTextureUnit } from "../../../device/gpuDetectUtils";
export var isCached = function (unitIndex, textureIndex, TextureCacheDataFromSystem, GPUDetectDataFromSystem) {
    return _getActiveTexture(unitIndex, TextureCacheDataFromSystem, GPUDetectDataFromSystem) === textureIndex;
};
var _getActiveTexture = requireCheckFunc(function (unitIndex, TextureCacheDataFromSystem, GPUDetectDataFromSystem) {
    _checkUnit(unitIndex, GPUDetectDataFromSystem);
}, function (unitIndex, TextureCacheDataFromSystem, GPUDetectDataFromSystem) {
    return TextureCacheDataFromSystem.bindTextureUnitCache[unitIndex];
});
export var addActiveTexture = requireCheckFunc(function (unitIndex, textureIndex, TextureCacheDataFromSystem, GPUDetectDataFromSystem) {
    _checkUnit(unitIndex, GPUDetectDataFromSystem);
}, function (unitIndex, textureIndex, TextureCacheDataFromSystem, GPUDetectDataFromSystem) {
    TextureCacheDataFromSystem.bindTextureUnitCache[unitIndex] = textureIndex;
});
var _checkUnit = function (unitIndex, GPUDetectDataFromSystem) {
    var maxTextureUnit = getMaxTextureUnit(GPUDetectDataFromSystem);
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