import { addActiveTexture, initData as initTextureCacheData, isCached } from "./TextureCacheWorkerSystem";
import { createTypeArrays, getBufferCount, initTextures as initTexturesUtils, needUpdate as needUpdateUtils, update as updateUtils, bindToUnit as bindToUnitUtils, disposeSourceMap, disposeGLTexture, getFlipY, initTexture } from "../../../utils/worker/render_file/texture/textureUtils";
import { fromArray, fromPromise } from "wonder-frp/dist/es2015/global/Operator";
import { firefox, chrome } from "bowser";
import { forEach, hasDuplicateItems } from "../../../../utils/arrayUtils";
import { ensureFunc, it } from "../../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
export var bindToUnit = function (gl, unitIndex, textureIndex, TextureCacheWorkerData, TextureWorkerData, GPUDetectWorkerData) {
    bindToUnitUtils(gl, unitIndex, textureIndex, TextureCacheWorkerData, TextureWorkerData, GPUDetectWorkerData, isCached, addActiveTexture);
};
export var initTextures = initTexturesUtils;
export var initNeedInitTextures = function (gl, needInitedTextureIndexArr, TextureWorkerData) {
    forEach(needInitedTextureIndexArr, function (textureIndex) {
        initTexture(gl, textureIndex, TextureWorkerData);
    });
};
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
export var addSourceMapByImageDataStream = function (imageArrayBufferIndexSizeDataArr, TextureWorkerData) {
    return _convertImageSrcToImageBitmapStream(imageArrayBufferIndexSizeDataArr, TextureWorkerData);
};
var _addSource = ensureFunc(function (sourceMap, imageBitmap, TextureWorkerData) {
    it("should not has duplicate one", function () {
        expect(hasDuplicateItems(sourceMap)).false;
    });
    it("sourceMap.length should equal texture count", function () {
        expect(sourceMap.length).equal(TextureWorkerData.index);
    });
}, function (imageBitmap, TextureWorkerData) {
    TextureWorkerData.sourceMap.push(imageBitmap);
    return TextureWorkerData.sourceMap;
});
var _convertImageSrcToImageBitmapStream = function (imageArrayBufferIndexSizeDataArr, TextureWorkerData) {
    return fromArray(imageArrayBufferIndexSizeDataArr)
        .flatMap(function (_a) {
        var arrayBuffer = _a.arrayBuffer, width = _a.width, height = _a.height, index = _a.index;
        return fromPromise(_createImageBitmap(new ImageData(new Uint8ClampedArray(arrayBuffer), width, height), index, TextureWorkerData))
            .do(function (imageBitmap) {
            _addSource(imageBitmap, TextureWorkerData);
        });
    });
};
var _createImageBitmap = null;
if (chrome) {
    _createImageBitmap = function (imageData, index, TextureWorkerData) {
        var flipY = getFlipY(index, TextureWorkerData);
        return createImageBitmap(imageData, {
            imageOrientation: flipY === true ? "flipY" : "none"
        });
    };
}
else if (firefox) {
    _createImageBitmap = function (imageData, index, TextureWorkerData) {
        return createImageBitmap(imageData);
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