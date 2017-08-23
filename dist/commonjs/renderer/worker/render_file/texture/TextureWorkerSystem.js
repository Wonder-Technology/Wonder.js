"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TextureCacheWorkerSystem_1 = require("./TextureCacheWorkerSystem");
var textureUtils_1 = require("../../../utils/worker/render_file/texture/textureUtils");
var Operator_1 = require("wonder-frp/dist/commonjs/global/Operator");
var bowser_1 = require("bowser");
exports.bindToUnit = function (gl, unitIndex, textureIndex, TextureCacheWorkerData, TextureWorkerData, GPUDetectWorkerData) {
    textureUtils_1.bindToUnit(gl, unitIndex, textureIndex, TextureCacheWorkerData, TextureWorkerData, GPUDetectWorkerData, TextureCacheWorkerSystem_1.isCached, TextureCacheWorkerSystem_1.addActiveTexture);
};
exports.initTextures = textureUtils_1.initTextures;
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
exports.setSourceMapByImageSrcArrStream = function (imageSrcIndexArr, TextureWorkerData) {
    return _convertImageSrcToImageBitmapStream(imageSrcIndexArr, TextureWorkerData)
        .do(function (imageBitmap) {
        TextureWorkerData.sourceMap.push(imageBitmap);
    });
};
var _convertImageSrcToImageBitmapStream = function (imageSrcIndexArr, TextureWorkerData) {
    return Operator_1.fromArray(imageSrcIndexArr).flatMap(function (_a) {
        var src = _a.src, index = _a.index;
        return Operator_1.fromPromise(fetch(src))
            .flatMap(function (response) {
            return Operator_1.fromPromise(response.blob());
        })
            .flatMap(function (blob) {
            var flipY = textureUtils_1.getFlipY(index, TextureWorkerData);
            return Operator_1.fromPromise(_createImageBitmap(blob, {
                imageOrientation: flipY === true ? "flipY" : "none"
            }));
        });
    });
};
var _createImageBitmap = null;
if (bowser_1.chrome) {
    _createImageBitmap = function (blob, options) {
        return createImageBitmap(blob, options);
    };
}
else if (bowser_1.firefox) {
    _createImageBitmap = function (blob, options) {
        return createImageBitmap(blob);
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