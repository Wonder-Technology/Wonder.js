"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bufferUtils_1 = require("../material/bufferUtils");
var textureUtils_1 = require("./textureUtils");
exports.getTextureIndexDataSize = function () { return 1; };
exports.getTextureCountDataSize = function () { return 1; };
exports.bindAndUpdate = function (gl, mapCount, TextureCacheDataFromSystem, TextureDataFromSystem, MapManagerDataFromSystem, bindToUnit, needUpdate, update) {
    var textureIndices = MapManagerDataFromSystem.textureIndices;
    for (var i = 0; i < mapCount; i++) {
        var textureIndex = textureIndices[i];
        bindToUnit(gl, i, textureIndex, TextureCacheDataFromSystem, TextureDataFromSystem);
        if (needUpdate(textureIndex, TextureDataFromSystem)) {
            update(gl, textureIndex, TextureDataFromSystem);
        }
    }
};
exports.sendData = function (gl, mapCount, shaderIndex, program, glslSenderData, uniformLocationMap, uniformCacheMap, directlySendUniformData, TextureData, MapManagerData) {
    var textureIndices = MapManagerData.textureIndices;
    for (var i = 0; i < mapCount; i++) {
        var textureIndex = textureIndices[i];
        textureUtils_1.sendData(gl, mapCount, shaderIndex, textureIndex, i, program, glslSenderData, uniformLocationMap, uniformCacheMap, directlySendUniformData, TextureData);
    }
};
exports.getMapCount = function (materialIndex, MapManagerDataFromSystem) {
    return MapManagerDataFromSystem.textureCounts[materialIndex];
};
exports.getBufferCount = function () { return bufferUtils_1.getBufferTotalCount() * exports.getMaxTextureCount(); };
exports.getMaxTextureCount = function () { return 16; };
exports.createTypeArrays = function (buffer, count, MapManagerDataFromSystem) {
    var offset = 0;
    MapManagerDataFromSystem.textureIndices = new Float32Array(buffer, offset, count * exports.getTextureIndexDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * exports.getTextureIndexDataSize();
    MapManagerDataFromSystem.textureCounts = new Uint8Array(buffer, offset, count * exports.getTextureCountDataSize());
    offset += count * Uint8Array.BYTES_PER_ELEMENT * exports.getTextureCountDataSize();
    return offset;
};
//# sourceMappingURL=mapManagerUtils.js.map