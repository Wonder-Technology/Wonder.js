import { sendData as sendTextureData } from "./textureUtils";
import { getBufferTotalCount } from "../material/bufferUtils";
import { ensureFunc, it, requireCheckFunc } from "../../../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
export var getTextureIndexDataSize = function () { return 1; };
export var getTextureCountDataSize = function () { return 1; };
export var bindAndUpdate = requireCheckFunc(function (gl, mapCount, startTextureIndex, definedStartTextureUnitIndex, TextureCacheDataFromSystem, TextureDataFromSystem, MapManagerDataFromSystem, GPUDetectDataFromSystem, bindToUnit, needUpdate, update) {
    it("mapCount should >= 0", function () {
        expect(mapCount).gte(0);
    });
    it("startTextureIndex should >= 0", function () {
        expect(startTextureIndex).gte(0);
    });
    it("definedStartTextureUnitIndex should >= 0", function () {
        expect(definedStartTextureUnitIndex).gte(0);
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
export var sendData = function (gl, mapCount, startTextureIndex, definedStartTextureUnitIndex, shaderIndex, program, glslSenderData, uniformLocationMap, uniformCacheMap, directlySendUniformData, TextureData, MapManagerData) {
    var textureIndices = MapManagerData.textureIndices;
    for (var i = startTextureIndex, count = mapCount + startTextureIndex; i < count; i++) {
        var textureIndex = textureIndices[i], unitIndex = _getUnitIndex(i, startTextureIndex, definedStartTextureUnitIndex);
        sendTextureData(gl, mapCount, shaderIndex, textureIndex, unitIndex, program, glslSenderData, uniformLocationMap, uniformCacheMap, directlySendUniformData, TextureData);
    }
};
var _getUnitIndex = function (index, startTextureIndex, definedStartTextureUnitIndex) { return index - startTextureIndex + definedStartTextureUnitIndex; };
export var getMapCount = function (materialIndex, MapManagerDataFromSystem) {
    return MapManagerDataFromSystem.textureCounts[materialIndex];
};
export var getMaterialTextures = function (materialIndex, MapManagerDataFromSystem) {
    return MapManagerDataFromSystem.materialTextureList[materialIndex];
};
export var getBufferCount = function () { return getBufferTotalCount() * getMaxTextureCount(); };
export var getMaxTextureCount = function () { return 16; };
export var createTypeArrays = function (buffer, count, MapManagerDataFromSystem) {
    var offset = 0;
    MapManagerDataFromSystem.textureIndices = new Uint32Array(buffer, offset, count * getTextureIndexDataSize());
    offset += count * Uint32Array.BYTES_PER_ELEMENT * getTextureIndexDataSize();
    MapManagerDataFromSystem.textureCounts = new Uint8Array(buffer, offset, count * getTextureCountDataSize());
    offset += count * Uint8Array.BYTES_PER_ELEMENT * getTextureCountDataSize();
    return offset;
};
export var getStartTextureIndex = ensureFunc(function (textureIndex) {
    it("startTextureIndex should >= 0", function () {
        expect(textureIndex).gte(0);
    });
}, function (materialIndex) {
    return getMaxTextureCount() * materialIndex;
});
//# sourceMappingURL=mapManagerUtils.js.map