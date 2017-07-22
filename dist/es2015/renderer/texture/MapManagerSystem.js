import { it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { bindAndUpdate as bindAndUpdateUtils, createTypeArrays, getBufferCount, getMapCount as getMapCountUtils, getMaxTextureCount } from "../utils/texture/mapManagerUtils";
import { bindToUnit, initData as initTextureData, initTextures, needUpdate, setUniformSamplerName, update } from "./TextureSystem";
import { createSharedArrayBufferOrArrayBuffer } from "../../utils/arrayBufferUtils";
import { computeBufferLength, deleteSingleValueBySwapAndReset } from "../../utils/typeArrayUtils";
export var initMapManagers = function (gl, TextureData) {
    initTextures(gl, TextureData);
};
export var getMapIndex = function (materialIndex, MapManagerData) {
    return MapManagerData.textureIndices[materialIndex];
};
export var addMap = requireCheckFunc(function (materialIndex, map, count, uniformSamplerName, MapManagerData, TextureData) {
    it("map count shouldn't exceed max count", function () {
        expect(count + 1).lte(getMaxTextureCount());
    });
}, function (materialIndex, map, count, uniformSamplerName, MapManagerData, TextureData) {
    var textureIndex = map.index;
    MapManagerData.textureIndices[materialIndex + count] = textureIndex;
    MapManagerData.textureCounts[materialIndex] = count + 1;
    setUniformSamplerName(textureIndex, uniformSamplerName, TextureData);
});
export var getMapCount = getMapCountUtils;
export var bindAndUpdate = function (gl, mapCount, TextureCacheData, TextureData, MapManagerData) {
    bindAndUpdateUtils(gl, mapCount, TextureCacheData, TextureData, MapManagerData, bindToUnit, needUpdate, update);
};
export var dispose = function (materialSourceIndex, materialLastComponentIndex, MapManagerData) {
    deleteSingleValueBySwapAndReset(materialSourceIndex, materialLastComponentIndex, MapManagerData.textureCounts, 0);
};
export var initData = function (TextureCacheData, TextureData, MapManagerData) {
    initTextureData(TextureCacheData, TextureData);
    _initBufferData(MapManagerData);
};
var _initBufferData = function (MapManagerData) {
    var buffer = null, count = getBufferCount(), size = Float32Array.BYTES_PER_ELEMENT + Uint8Array.BYTES_PER_ELEMENT, offset = null;
    buffer = createSharedArrayBufferOrArrayBuffer(computeBufferLength(count, size));
    offset = createTypeArrays(buffer, count, MapManagerData);
    _setDefaultTypeArrData(count, MapManagerData);
    MapManagerData.buffer = buffer;
};
var _setDefaultTypeArrData = function (count, MapManagerData) {
};
//# sourceMappingURL=MapManagerSystem.js.map