import { sendData as sendTextureData } from "./textureUtils";
import { getBufferTotalCount } from "../material/bufferUtils";
export var getTextureIndexDataSize = function () { return 1; };
export var getTextureCountDataSize = function () { return 1; };
export var bindAndUpdate = function (gl, mapCount, startIndex, TextureCacheDataFromSystem, TextureDataFromSystem, MapManagerDataFromSystem, GPUDetectDataFromSystem, bindToUnit, needUpdate, update) {
    var textureIndices = MapManagerDataFromSystem.textureIndices;
    for (var i = 0; i < mapCount; i++) {
        var textureIndex = textureIndices[i];
        bindToUnit(gl, i + startIndex, textureIndex, TextureCacheDataFromSystem, TextureDataFromSystem, GPUDetectDataFromSystem);
        if (needUpdate(textureIndex, TextureDataFromSystem)) {
            update(gl, textureIndex, TextureDataFromSystem);
        }
    }
};
export var sendData = function (gl, mapCount, startIndex, shaderIndex, program, glslSenderData, uniformLocationMap, uniformCacheMap, directlySendUniformData, TextureData, MapManagerData) {
    var textureIndices = MapManagerData.textureIndices;
    for (var i = 0; i < mapCount; i++) {
        var textureIndex = textureIndices[i];
        sendTextureData(gl, mapCount, shaderIndex, textureIndex, i + startIndex, program, glslSenderData, uniformLocationMap, uniformCacheMap, directlySendUniformData, TextureData);
    }
};
export var getMapCount = function (materialIndex, MapManagerDataFromSystem) {
    return MapManagerDataFromSystem.textureCounts[materialIndex];
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
//# sourceMappingURL=mapManagerUtils.js.map