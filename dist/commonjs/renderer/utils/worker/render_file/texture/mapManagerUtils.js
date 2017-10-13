"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var textureUtils_1 = require("./textureUtils");
var bufferUtils_1 = require("../material/bufferUtils");
var contract_1 = require("../../../../../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
exports.getTextureIndexDataSize = function () { return 1; };
exports.getTextureCountDataSize = function () { return 1; };
exports.bindAndUpdate = contract_1.requireCheckFunc(function (gl, mapCount, startTextureIndex, definedStartTextureUnitIndex, TextureCacheDataFromSystem, TextureDataFromSystem, MapManagerDataFromSystem, GPUDetectDataFromSystem, bindToUnit, needUpdate, update) {
    contract_1.it("mapCount should >= 0", function () {
        wonder_expect_js_1.expect(mapCount).gte(0);
    });
    contract_1.it("startTextureIndex should >= 0", function () {
        wonder_expect_js_1.expect(startTextureIndex).gte(0);
    });
    contract_1.it("definedStartTextureUnitIndex should >= 0", function () {
        wonder_expect_js_1.expect(definedStartTextureUnitIndex).gte(0);
    });
}, function (gl, mapCount, startTextureIndex, definedStartTextureUnitIndex, TextureCacheDataFromSystem, TextureDataFromSystem, MapManagerDataFromSystem, GPUDetectDataFromSystem, bindToUnit, needUpdate, update) {
    var textureIndices = MapManagerDataFromSystem.textureIndices;
    for (var i = startTextureIndex, count = mapCount + startTextureIndex; i < count; i++) {
        var textureIndex = textureIndices[i], unitIndex = _getUnitIndex(i, startTextureIndex, definedStartTextureUnitIndex);
        bindToUnit(gl, unitIndex, textureIndex, TextureCacheDataFromSystem, TextureDataFromSystem, GPUDetectDataFromSystem);
        if (needUpdate(textureIndex, TextureDataFromSystem)) {
            update(gl, textureIndex, TextureDataFromSystem);
        }
    }
});
exports.sendData = function (gl, mapCount, startTextureIndex, definedStartTextureUnitIndex, shaderIndex, program, glslSenderData, uniformLocationMap, uniformCacheMap, directlySendUniformData, TextureData, MapManagerData) {
    var textureIndices = MapManagerData.textureIndices;
    for (var i = startTextureIndex, count = mapCount + startTextureIndex; i < count; i++) {
        var textureIndex = textureIndices[i], unitIndex = _getUnitIndex(i, startTextureIndex, definedStartTextureUnitIndex);
        textureUtils_1.sendData(gl, mapCount, shaderIndex, textureIndex, unitIndex, program, glslSenderData, uniformLocationMap, uniformCacheMap, directlySendUniformData, TextureData);
    }
};
var _getUnitIndex = function (index, startTextureIndex, definedStartTextureUnitIndex) { return index - startTextureIndex + definedStartTextureUnitIndex; };
exports.getMapCount = function (materialIndex, MapManagerDataFromSystem) {
    return MapManagerDataFromSystem.textureCounts[materialIndex];
};
exports.getMaterialTextures = function (materialIndex, MapManagerDataFromSystem) {
    return MapManagerDataFromSystem.materialTextureList[materialIndex];
};
exports.getBufferCount = function () { return bufferUtils_1.getBufferTotalCount() * exports.getMaxTextureCount(); };
exports.getMaxTextureCount = function () { return 16; };
exports.createTypeArrays = function (buffer, count, MapManagerDataFromSystem) {
    var offset = 0;
    MapManagerDataFromSystem.textureIndices = new Uint32Array(buffer, offset, count * exports.getTextureIndexDataSize());
    offset += count * Uint32Array.BYTES_PER_ELEMENT * exports.getTextureIndexDataSize();
    MapManagerDataFromSystem.textureCounts = new Uint8Array(buffer, offset, count * exports.getTextureCountDataSize());
    offset += count * Uint8Array.BYTES_PER_ELEMENT * exports.getTextureCountDataSize();
    return offset;
};
exports.getStartTextureIndex = contract_1.ensureFunc(function (textureIndex) {
    contract_1.it("startTextureIndex should >= 0", function () {
        wonder_expect_js_1.expect(textureIndex).gte(0);
    });
}, function (materialIndex) {
    return exports.getMaxTextureCount() * materialIndex;
});
//# sourceMappingURL=mapManagerUtils.js.map