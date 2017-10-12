import { ensureFunc, it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { bindAndUpdate as bindAndUpdateUtils, createTypeArrays, getBufferCount, getMapCount as getMapCountUtils, getMaterialTextures, getMaxTextureCount, getStartTextureIndex } from "../utils/worker/render_file/texture/mapManagerUtils";
import { bindToUnit, initData as initTextureData, initTexture, initTextures, needUpdate, setUniformSamplerName, update } from "./TextureSystem";
import { createSharedArrayBufferOrArrayBuffer } from "../../utils/arrayBufferUtils";
import { computeBufferLength, deleteSingleValueBySwapAndReset } from "../../utils/typeArrayUtils";
import { createMap, deleteBySwap } from "../../utils/objectUtils";
import { forEach, replaceItem } from "../../utils/arrayUtils";
import { isNotExist } from "../../utils/mapUtils";
export var initMapManagers = function (gl, TextureData) {
    initTextures(gl, TextureData);
};
export var initMapManager = function (gl, materialIndex, MapManagerData, TextureData) {
    forEach(getMaterialTextures(materialIndex, MapManagerData), function (textureIndex) {
        initTexture(gl, textureIndex, TextureData);
    });
};
export var setMap = ensureFunc(function (returnVal, materialIndex, map, uniformSamplerName, MapManagerData, TextureData) {
    it("map count shouldn't exceed max count", function () {
        expect(getMapCount(materialIndex, MapManagerData)).lte(getMaxTextureCount());
    });
}, function (materialIndex, map, uniformSamplerName, MapManagerData, TextureData) {
    var textureIndex = map.index, textureOffsetMap = MapManagerData.textureOffsetMap, textureIndices = MapManagerData.textureIndices, textureCounts = MapManagerData.textureCounts, count = getMapCount(materialIndex, MapManagerData), offset = _getTextureOffset(materialIndex, uniformSamplerName, textureOffsetMap);
    if (_isSetMapBefore(offset)) {
        offset = count;
        _setTextureOffset(materialIndex, uniformSamplerName, offset, textureOffsetMap);
        textureCounts[materialIndex] = count + 1;
        _addTextureToMaterialTextureList(materialIndex, textureIndex, MapManagerData);
        setUniformSamplerName(textureIndex, uniformSamplerName, TextureData);
    }
    else {
        var oldMapIndex = _getMap(materialIndex, offset, textureIndices);
        _setTextureOffset(materialIndex, uniformSamplerName, offset, textureOffsetMap);
        _replaceTextureInMaterialTextureList(materialIndex, oldMapIndex, textureIndex, MapManagerData);
        setUniformSamplerName(textureIndex, uniformSamplerName, TextureData);
    }
    _setMapInTextureIndices(materialIndex, offset, textureIndex, textureIndices);
});
var _setMapInTextureIndices = function (materialIndex, offset, textureIndex, textureIndices) {
    textureIndices[getStartTextureIndex(materialIndex) + offset] = textureIndex;
};
var _getTextureOffset = function (materialIndex, uniformSamplerName, textureOffsetMap) {
    var map = textureOffsetMap[materialIndex];
    if (isNotExist(map)) {
        return void 0;
    }
    return map[uniformSamplerName];
};
var _setTextureOffset = requireCheckFunc(function (materialIndex, uniformSamplerName, offset, textureOffsetMap) {
    it("offset should >= 0", function () {
        expect(offset).gte(0);
    });
}, function (materialIndex, uniformSamplerName, offset, textureOffsetMap) {
    var map = textureOffsetMap[materialIndex];
    if (isNotExist(map)) {
        var m = {};
        m[uniformSamplerName] = offset;
        textureOffsetMap[materialIndex] = m;
        return;
    }
    map[uniformSamplerName] = offset;
});
var _isSetMapBefore = function (offset) { return isNotExist(offset); };
var _getMap = function (materialIndex, offset, textureIndices) {
    return textureIndices[getStartTextureIndex(materialIndex) + offset];
};
var _replaceTextureInMaterialTextureList = requireCheckFunc(function (materialIndex, oldTextureIndex, newTextureIndex, MapManagerData) {
    it("MapManagerData.materialTextureList[materialIndex] should be array", function () {
        expect(MapManagerData.materialTextureList[materialIndex]).exist;
        expect(MapManagerData.materialTextureList[materialIndex]).be.a("array");
    });
}, function (materialIndex, oldTextureIndex, newTextureIndex, MapManagerData) {
    replaceItem(MapManagerData.materialTextureList[materialIndex], oldTextureIndex, newTextureIndex);
});
var _addTextureToMaterialTextureList = function (materialIndex, textureIndex, MapManagerData) {
    var map = MapManagerData.materialTextureList[materialIndex];
    if (map === void 0) {
        map = [textureIndex];
        MapManagerData.materialTextureList[materialIndex] = map;
        return;
    }
    map.push(textureIndex);
};
export var getMaterialTextureList = function (MapManagerData) { return MapManagerData.materialTextureList; };
export var getMapCount = getMapCountUtils;
export var bindAndUpdate = function (gl, mapCount, startTextureIndex, definedStartTextureUnitIndex, TextureCacheData, TextureData, MapManagerData, GPUDetectData) {
    bindAndUpdateUtils(gl, mapCount, startTextureIndex, definedStartTextureUnitIndex, TextureCacheData, TextureData, MapManagerData, GPUDetectData, bindToUnit, needUpdate, update);
};
export var dispose = function (materialSourceIndex, materialLastComponentIndex, MapManagerData) {
    deleteSingleValueBySwapAndReset(materialSourceIndex, materialLastComponentIndex, MapManagerData.textureCounts, 0);
    deleteBySwap(materialSourceIndex, materialLastComponentIndex, MapManagerData.materialTextureList);
    deleteBySwap(materialSourceIndex, materialLastComponentIndex, MapManagerData.textureOffsetMap);
};
export var initData = function (TextureCacheData, TextureData, MapManagerData) {
    initTextureData(TextureCacheData, TextureData);
    _initBufferData(MapManagerData);
    MapManagerData.materialTextureList = [];
    MapManagerData.textureOffsetMap = createMap();
};
var _initBufferData = function (MapManagerData) {
    var buffer = null, count = getBufferCount(), size = Uint32Array.BYTES_PER_ELEMENT + Uint8Array.BYTES_PER_ELEMENT, offset = null;
    buffer = createSharedArrayBufferOrArrayBuffer(computeBufferLength(count, size));
    offset = createTypeArrays(buffer, count, MapManagerData);
    _setDefaultTypeArrData(count, MapManagerData);
    MapManagerData.buffer = buffer;
};
var _setDefaultTypeArrData = function (count, MapManagerData) {
};
//# sourceMappingURL=MapManagerSystem.js.map