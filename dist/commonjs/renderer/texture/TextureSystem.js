"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TextureCacheSystem_1 = require("./TextureCacheSystem");
var contract_1 = require("../../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
var arrayUtils_1 = require("../../utils/arrayUtils");
var Texture_1 = require("./Texture");
var ComponentSystem_1 = require("../../component/ComponentSystem");
var arrayBufferUtils_1 = require("../../utils/arrayBufferUtils");
var textureUtils_1 = require("../utils/worker/render_file/texture/textureUtils");
var typeArrayUtils_1 = require("../../utils/typeArrayUtils");
var WorkerDetectSystem_1 = require("../../device/WorkerDetectSystem");
var textureUtils_2 = require("../utils/texture/textureUtils");
exports.create = contract_1.ensureFunc(function (component) {
    contract_1.it("index should <= max count", function () {
        wonder_expect_js_1.expect(component.index).lte(textureUtils_1.getBufferCount());
    });
}, function (TextureData) {
    var texture = new Texture_1.Texture(), index = ComponentSystem_1.generateComponentIndex(TextureData);
    texture.index = index;
    TextureData.textureMap[index] = texture;
    return texture;
});
exports.getSource = textureUtils_1.getSource;
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
exports.markNeedUpdate = textureUtils_1.markNeedUpdate;
exports.setUniformSamplerName = function (index, name, TextureData) {
    TextureData.uniformSamplerNameMap[index] = name;
};
exports.bindToUnit = function (gl, unitIndex, textureIndex, TextureCacheData, TextureData, GPUDetectData) {
    textureUtils_1.bindToUnit(gl, unitIndex, textureIndex, TextureCacheData, TextureData, GPUDetectData, TextureCacheSystem_1.isCached, TextureCacheSystem_1.addActiveTexture);
};
exports.needUpdate = textureUtils_1.needUpdate;
exports.update = function (gl, textureIndex, TextureData) {
    textureUtils_1.update(gl, textureIndex, _setFlipY, TextureData);
};
var _setFlipY = function (gl, flipY) {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
};
exports.dispose = function (gl, texture, TextureCacheData, TextureData, GPUDetectData) {
    var bufferDataSize = textureUtils_1.getBufferDataSize(), sourceIndex = texture.index, lastComponentIndex = null;
    TextureData.index -= 1;
    lastComponentIndex = TextureData.index;
    typeArrayUtils_1.deleteOneItemBySwapAndReset(sourceIndex * bufferDataSize, lastComponentIndex * bufferDataSize, TextureData.widths, TextureData.defaultWidth);
    typeArrayUtils_1.deleteOneItemBySwapAndReset(sourceIndex * bufferDataSize, lastComponentIndex * bufferDataSize, TextureData.heights, TextureData.defaultHeight);
    typeArrayUtils_1.deleteOneItemBySwapAndReset(sourceIndex * bufferDataSize, lastComponentIndex * bufferDataSize, TextureData.isNeedUpdates, TextureData.defaultIsNeedUpdate);
    textureUtils_1.disposeSourceMap(sourceIndex, lastComponentIndex, TextureData);
    ComponentSystem_1.deleteComponentBySwapArray(sourceIndex, lastComponentIndex, TextureData.textureMap);
    _disposeGLTexture(gl, sourceIndex, lastComponentIndex, TextureCacheData, TextureData, GPUDetectData);
    _addDisposeDataForWorker(sourceIndex, lastComponentIndex, TextureData);
};
exports.addNeedInitTextureIndexForWorker = null, exports.initTextures = null, exports.initTexture = null, exports.setSource = null;
var _disposeGLTexture = null, _addDisposeDataForWorker = null;
if (WorkerDetectSystem_1.isSupportRenderWorkerAndSharedArrayBuffer()) {
    exports.initTextures = function (gl, TextureDataFromSystem) {
        for (var i = 0; i < TextureDataFromSystem.index; i++) {
            exports.initTexture(gl, i, TextureDataFromSystem);
        }
    };
    exports.initTexture = function (gl, textureIndex, TextureData) {
        exports.addNeedInitTextureIndexForWorker(textureIndex, TextureData);
    };
    exports.addNeedInitTextureIndexForWorker = function (textureIndex, TextureData) {
        TextureData.needInitedTextureIndexArr.push(textureIndex);
    };
    exports.setSource = function (textureIndex, source, TextureData) {
        TextureData.sourceMap[textureIndex] = source;
        TextureData.needAddedSourceArr.push(source);
    };
    _disposeGLTexture = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    _addDisposeDataForWorker = function (sourceIndex, lastComponentIndex, TextureData) {
        TextureData.disposedTextureDataMap.push(_buildDisposedTextureData_1(sourceIndex, lastComponentIndex));
    };
    var _buildDisposedTextureData_1 = function (sourceIndex, lastComponentIndex) {
        return {
            sourceIndex: sourceIndex,
            lastComponentIndex: lastComponentIndex
        };
    };
}
else {
    exports.initTextures = textureUtils_1.initTextures;
    exports.initTexture = textureUtils_1.initTexture;
    exports.addNeedInitTextureIndexForWorker = function () {
    };
    exports.setSource = function (textureIndex, source, TextureData) {
        TextureData.sourceMap[textureIndex] = source;
    };
    _disposeGLTexture = function (gl, sourceIndex, lastComponentIndex, TextureCacheData, TextureData, GPUDetectData) {
        textureUtils_1.disposeGLTexture(gl, sourceIndex, lastComponentIndex, TextureCacheData, TextureData, GPUDetectData);
    };
    _addDisposeDataForWorker = function (sourceIndex, lastComponentIndex, TextureData) {
    };
}
exports.getDisposedTextureDataMap = function (TextureData) {
    return TextureData.disposedTextureDataMap;
};
exports.hasDisposedTextureDataMap = function (TextureData) {
    return TextureData.disposedTextureDataMap.length > 0;
};
exports.clearDisposedTextureDataMap = function (TextureData) {
    TextureData.disposedTextureDataMap = [];
};
exports.getNeedInitedTextureDataArr = function (TextureData) {
    return TextureData.needInitedTextureIndexArr;
};
exports.hasNeedInitTextureDataArr = function (TextureData) {
    return TextureData.needInitedTextureIndexArr.length > 0;
};
exports.clearNeedInitTextureDataArr = function (TextureData) {
    TextureData.needInitedTextureIndexArr = [];
};
exports.clearNeedAddedSourceArr = function (TextureData) {
    TextureData.needAddedSourceArr = [];
};
exports.getNeedAddedSourceArr = function (TextureData) {
    return TextureData.needAddedSourceArr;
};
exports.convertAllSourceMapToImageDataArr = function (sourceMap, DomQuery) {
    var arr = [];
    arrayUtils_1.forEach(sourceMap, function (source, index) {
        if (_isSourceNotExist(source)) {
            return;
        }
        var width = source.width, height = source.height;
        arr.push({
            arrayBuffer: _getArrayBuffer(textureUtils_2.getImageData(source, width, height, DomQuery)),
            width: width,
            height: height,
            index: index
        });
    });
    return arr;
};
exports.convertNeedInitedSourceMapToImageDataArr = contract_1.requireCheckFunc(function (sourceMap, needInitedTextureDataArr, DomQuery) {
    contract_1.it("needInitedTextureDataArr should corresponding to sourceMap", function () {
        wonder_expect_js_1.expect(needInitedTextureDataArr.length).equal(sourceMap.length);
    });
}, function (sourceMap, needInitedTextureDataArr, DomQuery) {
    var arr = [];
    arrayUtils_1.forEach(sourceMap, function (source, index) {
        if (_isSourceNotExist(source)) {
            return;
        }
        var width = source.width, height = source.height;
        arr.push({
            arrayBuffer: _getArrayBuffer(textureUtils_2.getImageData(source, width, height, DomQuery)),
            width: width,
            height: height,
            index: needInitedTextureDataArr[index]
        });
    });
    return arr;
});
var _getArrayBuffer = function (imageData) { return imageData.data.buffer; };
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
    TextureData.needInitedTextureIndexArr = [];
    TextureData.needAddedSourceArr = [];
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