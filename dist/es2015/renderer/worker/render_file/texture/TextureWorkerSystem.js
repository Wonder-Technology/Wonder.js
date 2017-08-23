import { addActiveTexture, initData as initTextureCacheData, isCached } from "./TextureCacheWorkerSystem";
import { createTypeArrays, getBufferCount, initTextures as initTexturesUtils, needUpdate as needUpdateUtils, update as updateUtils, bindToUnit as bindToUnitUtils, disposeSourceMap, disposeGLTexture, getFlipY } from "../../../utils/worker/render_file/texture/textureUtils";
import { fromArray, fromPromise } from "wonder-frp/dist/es2015/global/Operator";
import { firefox, chrome } from "bowser";
export var bindToUnit = function (gl, unitIndex, textureIndex, TextureCacheWorkerData, TextureWorkerData, GPUDetectWorkerData) {
    bindToUnitUtils(gl, unitIndex, textureIndex, TextureCacheWorkerData, TextureWorkerData, GPUDetectWorkerData, isCached, addActiveTexture);
};
export var initTextures = initTexturesUtils;
export var needUpdate = needUpdateUtils;
export var update = function (gl, textureIndex, TextureWorkerData) {
    updateUtils(gl, textureIndex, _setFlipY, TextureWorkerData);
};
var _setFlipY = null;
if (chrome) {
    _setFlipY = function (gl, flipY) {
    };
}
else if (firefox) {
    _setFlipY = function (gl, flipY) {
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
    };
}
export var disposeSourceAndGLTexture = function (disposeData, gl, TextureCacheWorkerData, TextureWorkerData, GPUDetectWorkerData) {
    for (var _i = 0, _a = disposeData.disposedTextureDataMap; _i < _a.length; _i++) {
        var _b = _a[_i], sourceIndex = _b.sourceIndex, lastComponentIndex = _b.lastComponentIndex;
        disposeSourceMap(sourceIndex, lastComponentIndex, TextureWorkerData);
        disposeGLTexture(gl, sourceIndex, lastComponentIndex, TextureCacheWorkerData, TextureWorkerData, GPUDetectWorkerData);
    }
};
export var setIndex = function (index, TextureWorkerData) {
    TextureWorkerData.index = index;
};
export var setUniformSamplerNameMap = function (uniformSamplerNameMap, TextureWorkerData) {
    TextureWorkerData.uniformSamplerNameMap = uniformSamplerNameMap;
};
export var setSourceMapByImageSrcArrStream = function (imageSrcIndexArr, TextureWorkerData) {
    return _convertImageSrcToImageBitmapStream(imageSrcIndexArr, TextureWorkerData)
        .do(function (imageBitmap) {
        TextureWorkerData.sourceMap.push(imageBitmap);
    });
};
var _convertImageSrcToImageBitmapStream = function (imageSrcIndexArr, TextureWorkerData) {
    return fromArray(imageSrcIndexArr).flatMap(function (_a) {
        var src = _a.src, index = _a.index;
        return fromPromise(fetch(src))
            .flatMap(function (response) {
            return fromPromise(response.blob());
        })
            .flatMap(function (blob) {
            var flipY = getFlipY(index, TextureWorkerData);
            return fromPromise(_createImageBitmap(blob, {
                imageOrientation: flipY === true ? "flipY" : "none"
            }));
        });
    });
};
var _createImageBitmap = null;
if (chrome) {
    _createImageBitmap = function (blob, options) {
        return createImageBitmap(blob, options);
    };
}
else if (firefox) {
    _createImageBitmap = function (blob, options) {
        return createImageBitmap(blob);
    };
}
export var initData = function (buffer, TextureCacheWorkerData, TextureWorkerData) {
    initTextureCacheData(TextureCacheWorkerData);
    TextureWorkerData.index = 0;
    TextureWorkerData.glTextures = [];
    TextureWorkerData.sourceMap = [];
    _initBufferWorkerData(buffer, TextureWorkerData);
};
var _initBufferWorkerData = function (buffer, TextureWorkerData) {
    createTypeArrays(buffer, getBufferCount(), TextureWorkerData);
};
//# sourceMappingURL=TextureWorkerSystem.js.map