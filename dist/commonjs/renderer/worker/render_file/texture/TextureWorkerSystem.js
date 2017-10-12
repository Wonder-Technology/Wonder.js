"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TextureCacheWorkerSystem_1 = require("./TextureCacheWorkerSystem");
var textureUtils_1 = require("../../../utils/worker/render_file/texture/textureUtils");
var Operator_1 = require("wonder-frp/dist/commonjs/global/Operator");
var bowser_1 = require("bowser");
var arrayUtils_1 = require("../../../../utils/arrayUtils");
var contract_1 = require("../../../../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
exports.bindToUnit = function (gl, unitIndex, textureIndex, TextureCacheWorkerData, TextureWorkerData, GPUDetectWorkerData) {
    textureUtils_1.bindToUnit(gl, unitIndex, textureIndex, TextureCacheWorkerData, TextureWorkerData, GPUDetectWorkerData, TextureCacheWorkerSystem_1.isCached, TextureCacheWorkerSystem_1.addActiveTexture);
};
exports.initTextures = textureUtils_1.initTextures;
exports.initNeedInitTextures = function (gl, needInitedTextureIndexArr, TextureWorkerData) {
    arrayUtils_1.forEach(needInitedTextureIndexArr, function (textureIndex) {
        textureUtils_1.initTexture(gl, textureIndex, TextureWorkerData);
    });
};
exports.needUpdate = textureUtils_1.needUpdate;
exports.update = function (gl, textureIndex, TextureWorkerData) {
    textureUtils_1.update(gl, textureIndex, _setFlipY, TextureWorkerData);
};
var _setFlipY = null;
if (bowser_1.chrome) {
    _setFlipY = function (gl, flipY) {
    };
}
else if (bowser_1.firefox) {
    _setFlipY = function (gl, flipY) {
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
    };
}
exports.disposeSourceAndGLTexture = function (disposeData, gl, TextureCacheWorkerData, TextureWorkerData, GPUDetectWorkerData) {
    for (var _i = 0, _a = disposeData.disposedTextureDataMap; _i < _a.length; _i++) {
        var _b = _a[_i], sourceIndex = _b.sourceIndex, lastComponentIndex = _b.lastComponentIndex;
        textureUtils_1.disposeSourceMap(sourceIndex, lastComponentIndex, TextureWorkerData);
        textureUtils_1.disposeGLTexture(gl, sourceIndex, lastComponentIndex, TextureCacheWorkerData, TextureWorkerData, GPUDetectWorkerData);
    }
};
exports.setIndex = function (index, TextureWorkerData) {
    TextureWorkerData.index = index;
};
exports.setUniformSamplerNameMap = function (uniformSamplerNameMap, TextureWorkerData) {
    TextureWorkerData.uniformSamplerNameMap = uniformSamplerNameMap;
};
exports.addSourceMapByImageDataStream = function (imageArrayBufferIndexSizeDataArr, TextureWorkerData) {
    return _convertImageSrcToImageBitmapStream(imageArrayBufferIndexSizeDataArr, TextureWorkerData);
};
var _addSource = contract_1.ensureFunc(function (sourceMap, imageBitmap, TextureWorkerData) {
    contract_1.it("should not has duplicate one", function () {
        wonder_expect_js_1.expect(arrayUtils_1.hasDuplicateItems(sourceMap)).false;
    });
    contract_1.it("sourceMap.length should equal texture count", function () {
        wonder_expect_js_1.expect(sourceMap.length).equal(TextureWorkerData.index);
    });
}, function (imageBitmap, TextureWorkerData) {
    TextureWorkerData.sourceMap.push(imageBitmap);
    return TextureWorkerData.sourceMap;
});
var _convertImageSrcToImageBitmapStream = function (imageArrayBufferIndexSizeDataArr, TextureWorkerData) {
    return Operator_1.fromArray(imageArrayBufferIndexSizeDataArr)
        .flatMap(function (_a) {
        var arrayBuffer = _a.arrayBuffer, width = _a.width, height = _a.height, index = _a.index;
        return Operator_1.fromPromise(_createImageBitmap(new ImageData(new Uint8ClampedArray(arrayBuffer), width, height), index, TextureWorkerData))
            .do(function (imageBitmap) {
            _addSource(imageBitmap, TextureWorkerData);
        });
    });
};
var _createImageBitmap = null;
if (bowser_1.chrome) {
    _createImageBitmap = function (imageData, index, TextureWorkerData) {
        var flipY = textureUtils_1.getFlipY(index, TextureWorkerData);
        return createImageBitmap(imageData, {
            imageOrientation: flipY === true ? "flipY" : "none"
        });
    };
}
else if (bowser_1.firefox) {
    _createImageBitmap = function (imageData, index, TextureWorkerData) {
        return createImageBitmap(imageData);
    };
}
exports.initData = function (buffer, TextureCacheWorkerData, TextureWorkerData) {
    TextureCacheWorkerSystem_1.initData(TextureCacheWorkerData);
    TextureWorkerData.index = 0;
    TextureWorkerData.glTextures = [];
    TextureWorkerData.sourceMap = [];
    _initBufferWorkerData(buffer, TextureWorkerData);
};
var _initBufferWorkerData = function (buffer, TextureWorkerData) {
    textureUtils_1.createTypeArrays(buffer, textureUtils_1.getBufferCount(), TextureWorkerData);
};
//# sourceMappingURL=TextureWorkerSystem.js.map