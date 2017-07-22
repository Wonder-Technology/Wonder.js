"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TextureCacheSystem_1 = require("./TextureCacheSystem");
var contract_1 = require("../../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
var arrayUtils_1 = require("../../utils/arrayUtils");
var Texture_1 = require("./Texture");
var ComponentSystem_1 = require("../../component/ComponentSystem");
var arrayBufferUtils_1 = require("../../utils/arrayBufferUtils");
var textureUtils_1 = require("../utils/texture/textureUtils");
var typeArrayUtils_1 = require("../../utils/typeArrayUtils");
var WorkerDetectSystem_1 = require("../../device/WorkerDetectSystem");
exports.create = contract_1.ensureFunc(function (component) {
    contract_1.it("index should <= max count", function () {
        wonder_expect_js_1.expect(component.index).lt(textureUtils_1.getBufferCount());
    });
}, function (TextureData) {
    var texture = new Texture_1.Texture(), index = ComponentSystem_1.generateComponentIndex(TextureData);
    texture.index = index;
    TextureData.textureMap[index] = texture;
    return texture;
});
exports.getSource = textureUtils_1.getSource;
exports.setSource = function (textureIndex, source, TextureData) {
    TextureData.sourceMap[textureIndex] = source;
};
exports.getWidth = textureUtils_1.getWidth;
exports.setWidth = function (textureIndex, value, TextureData) {
    typeArrayUtils_1.setTypeArrayValue(TextureData.widths, textureIndex, value);
};
exports.getHeight = textureUtils_1.getHeight;
exports.setHeight = function (textureIndex, value, TextureData) {
    typeArrayUtils_1.setTypeArrayValue(TextureData.heights, textureIndex, value);
};
exports.getIsNeedUpdate = textureUtils_1.getIsNeedUpdate;
exports.setIsNeedUpdate = function (textureIndex, value, TextureData) {
    typeArrayUtils_1.setTypeArrayValue(TextureData.isNeedUpdates, textureIndex, value);
};
exports.setUniformSamplerName = function (index, name, TextureData) {
    TextureData.uniformSamplerNameMap[index] = name;
};
exports.bindToUnit = function (gl, unitIndex, textureIndex, TextureCacheData, TextureData) {
    textureUtils_1.bindToUnit(gl, unitIndex, textureIndex, TextureCacheData, TextureData, TextureCacheSystem_1.isCached, TextureCacheSystem_1.addActiveTexture);
};
exports.initTextures = textureUtils_1.initTextures;
exports.needUpdate = textureUtils_1.needUpdate;
exports.update = function (gl, textureIndex, TextureData) {
    textureUtils_1.update(gl, textureIndex, _setFlipY, TextureData);
};
var _setFlipY = function (gl, flipY) {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
};
exports.dispose = function (gl, texture, TextureCacheData, TextureData) {
    var bufferDataSize = textureUtils_1.getBufferDataSize(), sourceIndex = texture.index, lastComponentIndex = null;
    TextureData.index -= 1;
    lastComponentIndex = TextureData.index;
    typeArrayUtils_1.deleteOneItemBySwapAndReset(sourceIndex * bufferDataSize, lastComponentIndex * bufferDataSize, TextureData.widths, TextureData.defaultWidth);
    typeArrayUtils_1.deleteOneItemBySwapAndReset(sourceIndex * bufferDataSize, lastComponentIndex * bufferDataSize, TextureData.heights, TextureData.defaultHeight);
    typeArrayUtils_1.deleteOneItemBySwapAndReset(sourceIndex * bufferDataSize, lastComponentIndex * bufferDataSize, TextureData.isNeedUpdates, TextureData.defaultIsNeedUpdate);
    textureUtils_1.disposeSourceMap(sourceIndex, lastComponentIndex, TextureData);
    ComponentSystem_1.deleteComponentBySwapArray(sourceIndex, lastComponentIndex, TextureData.textureMap);
    _disposeGLTexture(gl, sourceIndex, lastComponentIndex, TextureCacheData, TextureData);
    _addDisposeDataForWorker(sourceIndex, lastComponentIndex, TextureData);
};
var _disposeGLTexture = null, _addDisposeDataForWorker = null;
if (WorkerDetectSystem_1.isSupportRenderWorkerAndSharedArrayBuffer()) {
    _disposeGLTexture = function (gl, sourceIndex, lastComponentIndex, TextureCacheData, TextureData) {
    };
    _addDisposeDataForWorker = function (sourceIndex, lastComponentIndex, TextureData) {
        TextureData.disposedTextureDataMap.push(_buildDisposedTextureData(sourceIndex, lastComponentIndex));
    };
    var _buildDisposedTextureData = function (sourceIndex, lastComponentIndex) {
        return {
            sourceIndex: sourceIndex,
            lastComponentIndex: lastComponentIndex
        };
    };
}
else {
    _disposeGLTexture = function (gl, sourceIndex, lastComponentIndex, TextureCacheData, TextureData) {
        textureUtils_1.disposeGLTexture(gl, sourceIndex, lastComponentIndex, TextureCacheData, TextureData);
    };
    _addDisposeDataForWorker = function (sourceIndex, lastComponentIndex, TextureData) {
    };
}
exports.hasDisposedTextureDataMap = function (TextureData) {
    return TextureData.disposedTextureDataMap.length > 0;
};
exports.clearDisposedTextureDataMap = function (TextureData) {
    TextureData.disposedTextureDataMap = [];
};
exports.convertSourceMapToSrcIndexArr = function (TextureData) {
    var arr = [];
    arrayUtils_1.forEach(TextureData.sourceMap, function (source, index) {
        if (_isSourceNotExist(source)) {
            return;
        }
        arr.push({
            src: source.src,
            index: index
        });
    });
    return arr;
};
exports.getUniformSamplerNameMap = function (TextureData) {
    return TextureData.uniformSamplerNameMap;
};
var _isSourceNotExist = function (source) { return arrayUtils_1.isNotValidVal(source); };
exports.initData = function (TextureCacheData, TextureData) {
    TextureCacheSystem_1.initData(TextureCacheData);
    TextureData.index = 0;
    TextureData.glTextures = [];
    TextureData.sourceMap = [];
    TextureData.textureMap = [];
    TextureData.uniformSamplerNameMap = [];
    TextureData.disposedTextureDataMap = [];
    _setDefaultData(TextureData);
    _initBufferData(TextureData);
};
var _setDefaultData = function (TextureData) {
    TextureData.defaultWidth = 0;
    TextureData.defaultHeight = 0;
    TextureData.defaultIsNeedUpdate = 0;
};
var _initBufferData = function (TextureData) {
    var buffer = null, count = textureUtils_1.getBufferCount(), size = Float32Array.BYTES_PER_ELEMENT * (textureUtils_1.getBufferDataSize() * 2) + Uint8Array.BYTES_PER_ELEMENT * (textureUtils_1.getBufferDataSize()), offset = null;
    buffer = arrayBufferUtils_1.createSharedArrayBufferOrArrayBuffer(typeArrayUtils_1.computeBufferLength(count, size));
    offset = textureUtils_1.createTypeArrays(buffer, count, TextureData);
    _setDefaultTypeArrData(count, TextureData);
    TextureData.buffer = buffer;
};
var _setDefaultTypeArrData = function (count, TextureData) {
    var width = TextureData.defaultWidth, height = TextureData.defaultHeight, isNeedUpdate = TextureData.defaultIsNeedUpdate;
    for (var i = 0; i < count; i++) {
        exports.setWidth(i, width, TextureData);
        exports.setHeight(i, height, TextureData);
        exports.setIsNeedUpdate(i, isNeedUpdate, TextureData);
    }
};
//# sourceMappingURL=TextureSystem.js.map