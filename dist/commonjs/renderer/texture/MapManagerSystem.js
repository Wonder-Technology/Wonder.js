"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var contract_1 = require("../../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
var mapManagerUtils_1 = require("../utils/worker/render_file/texture/mapManagerUtils");
var TextureSystem_1 = require("./TextureSystem");
var arrayBufferUtils_1 = require("../../utils/arrayBufferUtils");
var typeArrayUtils_1 = require("../../utils/typeArrayUtils");
var objectUtils_1 = require("../../utils/objectUtils");
var arrayUtils_1 = require("../../utils/arrayUtils");
var mapUtils_1 = require("../../utils/mapUtils");
exports.initMapManagers = function (gl, TextureData) {
    TextureSystem_1.initTextures(gl, TextureData);
};
exports.initMapManager = function (gl, materialIndex, MapManagerData, TextureData) {
    arrayUtils_1.forEach(mapManagerUtils_1.getMaterialTextures(materialIndex, MapManagerData), function (textureIndex) {
        TextureSystem_1.initTexture(gl, textureIndex, TextureData);
    });
};
exports.setMap = contract_1.ensureFunc(function (returnVal, materialIndex, map, uniformSamplerName, MapManagerData, TextureData) {
    contract_1.it("map count shouldn't exceed max count", function () {
        wonder_expect_js_1.expect(exports.getMapCount(materialIndex, MapManagerData)).lte(mapManagerUtils_1.getMaxTextureCount());
    });
}, function (materialIndex, map, uniformSamplerName, MapManagerData, TextureData) {
    var textureIndex = map.index, textureOffsetMap = MapManagerData.textureOffsetMap, textureIndices = MapManagerData.textureIndices, textureCounts = MapManagerData.textureCounts, count = exports.getMapCount(materialIndex, MapManagerData), offset = _getTextureOffset(materialIndex, uniformSamplerName, textureOffsetMap);
    if (_isSetMapBefore(offset)) {
        offset = count;
        _setTextureOffset(materialIndex, uniformSamplerName, offset, textureOffsetMap);
        textureCounts[materialIndex] = count + 1;
        _addTextureToMaterialTextureList(materialIndex, textureIndex, MapManagerData);
        TextureSystem_1.setUniformSamplerName(textureIndex, uniformSamplerName, TextureData);
    }
    else {
        var oldMapIndex = _getMap(materialIndex, offset, textureIndices);
        _setTextureOffset(materialIndex, uniformSamplerName, offset, textureOffsetMap);
        _replaceTextureInMaterialTextureList(materialIndex, oldMapIndex, textureIndex, MapManagerData);
        TextureSystem_1.setUniformSamplerName(textureIndex, uniformSamplerName, TextureData);
    }
    _setMapInTextureIndices(materialIndex, offset, textureIndex, textureIndices);
});
var _setMapInTextureIndices = function (materialIndex, offset, textureIndex, textureIndices) {
    textureIndices[mapManagerUtils_1.getStartTextureIndex(materialIndex) + offset] = textureIndex;
};
var _getTextureOffset = function (materialIndex, uniformSamplerName, textureOffsetMap) {
    var map = textureOffsetMap[materialIndex];
    if (mapUtils_1.isNotExist(map)) {
        return void 0;
    }
    return map[uniformSamplerName];
};
var _setTextureOffset = contract_1.requireCheckFunc(function (materialIndex, uniformSamplerName, offset, textureOffsetMap) {
    contract_1.it("offset should >= 0", function () {
        wonder_expect_js_1.expect(offset).gte(0);
    });
}, function (materialIndex, uniformSamplerName, offset, textureOffsetMap) {
    var map = textureOffsetMap[materialIndex];
    if (mapUtils_1.isNotExist(map)) {
        var m = {};
        m[uniformSamplerName] = offset;
        textureOffsetMap[materialIndex] = m;
        return;
    }
    map[uniformSamplerName] = offset;
});
var _isSetMapBefore = function (offset) { return mapUtils_1.isNotExist(offset); };
var _getMap = function (materialIndex, offset, textureIndices) {
    return textureIndices[mapManagerUtils_1.getStartTextureIndex(materialIndex) + offset];
};
var _replaceTextureInMaterialTextureList = contract_1.requireCheckFunc(function (materialIndex, oldTextureIndex, newTextureIndex, MapManagerData) {
    contract_1.it("MapManagerData.materialTextureList[materialIndex] should be array", function () {
        wonder_expect_js_1.expect(MapManagerData.materialTextureList[materialIndex]).exist;
        wonder_expect_js_1.expect(MapManagerData.materialTextureList[materialIndex]).be.a("array");
    });
}, function (materialIndex, oldTextureIndex, newTextureIndex, MapManagerData) {
    arrayUtils_1.replaceItem(MapManagerData.materialTextureList[materialIndex], oldTextureIndex, newTextureIndex);
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
exports.getMaterialTextureList = function (MapManagerData) { return MapManagerData.materialTextureList; };
exports.getMapCount = mapManagerUtils_1.getMapCount;
exports.bindAndUpdate = function (gl, mapCount, startTextureIndex, definedStartTextureUnitIndex, TextureCacheData, TextureData, MapManagerData, GPUDetectData) {
    mapManagerUtils_1.bindAndUpdate(gl, mapCount, startTextureIndex, definedStartTextureUnitIndex, TextureCacheData, TextureData, MapManagerData, GPUDetectData, TextureSystem_1.bindToUnit, TextureSystem_1.needUpdate, TextureSystem_1.update);
};
exports.dispose = function (materialSourceIndex, materialLastComponentIndex, MapManagerData) {
    typeArrayUtils_1.deleteSingleValueBySwapAndReset(materialSourceIndex, materialLastComponentIndex, MapManagerData.textureCounts, 0);
    objectUtils_1.deleteBySwap(materialSourceIndex, materialLastComponentIndex, MapManagerData.materialTextureList);
    objectUtils_1.deleteBySwap(materialSourceIndex, materialLastComponentIndex, MapManagerData.textureOffsetMap);
};
exports.initData = function (TextureCacheData, TextureData, MapManagerData) {
    TextureSystem_1.initData(TextureCacheData, TextureData);
    _initBufferData(MapManagerData);
    MapManagerData.materialTextureList = [];
    MapManagerData.textureOffsetMap = objectUtils_1.createMap();
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