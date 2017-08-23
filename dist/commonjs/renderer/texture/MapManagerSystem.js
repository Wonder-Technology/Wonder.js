"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var contract_1 = require("../../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
var mapManagerUtils_1 = require("../utils/worker/render_file/texture/mapManagerUtils");
var TextureSystem_1 = require("./TextureSystem");
var arrayBufferUtils_1 = require("../../utils/arrayBufferUtils");
var typeArrayUtils_1 = require("../../utils/typeArrayUtils");
exports.initMapManagers = function (gl, TextureData) {
    TextureSystem_1.initTextures(gl, TextureData);
};
exports.addMap = contract_1.requireCheckFunc(function (materialIndex, map, count, uniformSamplerName, MapManagerData, TextureData) {
    contract_1.it("map count shouldn't exceed max count", function () {
        wonder_expect_js_1.expect(count + 1).lte(mapManagerUtils_1.getMaxTextureCount());
    });
}, function (materialIndex, map, count, uniformSamplerName, MapManagerData, TextureData) {
    var textureIndex = map.index;
    MapManagerData.textureIndices[materialIndex + count] = textureIndex;
    MapManagerData.textureCounts[materialIndex] = count + 1;
    TextureSystem_1.setUniformSamplerName(textureIndex, uniformSamplerName, TextureData);
});
exports.getMapCount = mapManagerUtils_1.getMapCount;
exports.bindAndUpdate = function (gl, mapCount, startIndex, TextureCacheData, TextureData, MapManagerData, GPUDetectData) {
    mapManagerUtils_1.bindAndUpdate(gl, mapCount, startIndex, TextureCacheData, TextureData, MapManagerData, GPUDetectData, TextureSystem_1.bindToUnit, TextureSystem_1.needUpdate, TextureSystem_1.update);
};
exports.dispose = function (materialSourceIndex, materialLastComponentIndex, MapManagerData) {
    typeArrayUtils_1.deleteSingleValueBySwapAndReset(materialSourceIndex, materialLastComponentIndex, MapManagerData.textureCounts, 0);
};
exports.initData = function (TextureCacheData, TextureData, MapManagerData) {
    TextureSystem_1.initData(TextureCacheData, TextureData);
    _initBufferData(MapManagerData);
};
var _initBufferData = function (MapManagerData) {
    var buffer = null, count = mapManagerUtils_1.getBufferCount(), size = Uint32Array.BYTES_PER_ELEMENT + Uint8Array.BYTES_PER_ELEMENT, offset = null;
    buffer = arrayBufferUtils_1.createSharedArrayBufferOrArrayBuffer(typeArrayUtils_1.computeBufferLength(count, size));
    offset = mapManagerUtils_1.createTypeArrays(buffer, count, MapManagerData);
    _setDefaultTypeArrData(count, MapManagerData);
    MapManagerData.buffer = buffer;
};
var _setDefaultTypeArrData = function (count, MapManagerData) {
};
//# sourceMappingURL=MapManagerSystem.js.map