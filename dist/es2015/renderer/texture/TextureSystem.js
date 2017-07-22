import { addActiveTexture, initData as initTextureCacheData, isCached } from "./TextureCacheSystem";
import { ensureFunc, it } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { forEach, isNotValidVal } from "../../utils/arrayUtils";
import { Texture } from "./Texture";
import { deleteComponentBySwapArray, generateComponentIndex } from "../../component/ComponentSystem";
import { createSharedArrayBufferOrArrayBuffer } from "../../utils/arrayBufferUtils";
import { createTypeArrays, getWidth as getWidthUtils, getHeight as getHeightUtils, getBufferDataSize, getIsNeedUpdate as getIsNeedUpdateUtils, getBufferCount, bindToUnit as bindToUnitUtils, initTextures as initTexturesUtils, needUpdate as needUpdateUtils, update as updateUtils, disposeGLTexture, disposeSourceMap, getSource as getSourceUtils } from "../utils/texture/textureUtils";
import { computeBufferLength, deleteOneItemBySwapAndReset, setTypeArrayValue } from "../../utils/typeArrayUtils";
import { isSupportRenderWorkerAndSharedArrayBuffer } from "../../device/WorkerDetectSystem";
export var create = ensureFunc(function (component) {
    it("index should <= max count", function () {
        expect(component.index).lt(getBufferCount());
    });
}, function (TextureData) {
    var texture = new Texture(), index = generateComponentIndex(TextureData);
    texture.index = index;
    TextureData.textureMap[index] = texture;
    return texture;
});
export var getSource = getSourceUtils;
export var setSource = function (textureIndex, source, TextureData) {
    TextureData.sourceMap[textureIndex] = source;
};
export var getWidth = getWidthUtils;
export var setWidth = function (textureIndex, value, TextureData) {
    setTypeArrayValue(TextureData.widths, textureIndex, value);
};
export var getHeight = getHeightUtils;
export var setHeight = function (textureIndex, value, TextureData) {
    setTypeArrayValue(TextureData.heights, textureIndex, value);
};
export var getIsNeedUpdate = getIsNeedUpdateUtils;
export var setIsNeedUpdate = function (textureIndex, value, TextureData) {
    setTypeArrayValue(TextureData.isNeedUpdates, textureIndex, value);
};
export var setUniformSamplerName = function (index, name, TextureData) {
    TextureData.uniformSamplerNameMap[index] = name;
};
export var bindToUnit = function (gl, unitIndex, textureIndex, TextureCacheData, TextureData) {
    bindToUnitUtils(gl, unitIndex, textureIndex, TextureCacheData, TextureData, isCached, addActiveTexture);
};
export var initTextures = initTexturesUtils;
export var needUpdate = needUpdateUtils;
export var update = function (gl, textureIndex, TextureData) {
    updateUtils(gl, textureIndex, _setFlipY, TextureData);
};
var _setFlipY = function (gl, flipY) {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
};
export var dispose = function (gl, texture, TextureCacheData, TextureData) {
    var bufferDataSize = getBufferDataSize(), sourceIndex = texture.index, lastComponentIndex = null;
    TextureData.index -= 1;
    lastComponentIndex = TextureData.index;
    deleteOneItemBySwapAndReset(sourceIndex * bufferDataSize, lastComponentIndex * bufferDataSize, TextureData.widths, TextureData.defaultWidth);
    deleteOneItemBySwapAndReset(sourceIndex * bufferDataSize, lastComponentIndex * bufferDataSize, TextureData.heights, TextureData.defaultHeight);
    deleteOneItemBySwapAndReset(sourceIndex * bufferDataSize, lastComponentIndex * bufferDataSize, TextureData.isNeedUpdates, TextureData.defaultIsNeedUpdate);
    disposeSourceMap(sourceIndex, lastComponentIndex, TextureData);
    deleteComponentBySwapArray(sourceIndex, lastComponentIndex, TextureData.textureMap);
    _disposeGLTexture(gl, sourceIndex, lastComponentIndex, TextureCacheData, TextureData);
    _addDisposeDataForWorker(sourceIndex, lastComponentIndex, TextureData);
};
var _disposeGLTexture = null, _addDisposeDataForWorker = null;
if (isSupportRenderWorkerAndSharedArrayBuffer()) {
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
        disposeGLTexture(gl, sourceIndex, lastComponentIndex, TextureCacheData, TextureData);
    };
    _addDisposeDataForWorker = function (sourceIndex, lastComponentIndex, TextureData) {
    };
}
export var hasDisposedTextureDataMap = function (TextureData) {
    return TextureData.disposedTextureDataMap.length > 0;
};
export var clearDisposedTextureDataMap = function (TextureData) {
    TextureData.disposedTextureDataMap = [];
};
export var convertSourceMapToSrcIndexArr = function (TextureData) {
    var arr = [];
    forEach(TextureData.sourceMap, function (source, index) {
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
export var getUniformSamplerNameMap = function (TextureData) {
    return TextureData.uniformSamplerNameMap;
};
var _isSourceNotExist = function (source) { return isNotValidVal(source); };
export var initData = function (TextureCacheData, TextureData) {
    initTextureCacheData(TextureCacheData);
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
    var buffer = null, count = getBufferCount(), size = Float32Array.BYTES_PER_ELEMENT * (getBufferDataSize() * 2) + Uint8Array.BYTES_PER_ELEMENT * (getBufferDataSize()), offset = null;
    buffer = createSharedArrayBufferOrArrayBuffer(computeBufferLength(count, size));
    offset = createTypeArrays(buffer, count, TextureData);
    _setDefaultTypeArrData(count, TextureData);
    TextureData.buffer = buffer;
};
var _setDefaultTypeArrData = function (count, TextureData) {
    var width = TextureData.defaultWidth, height = TextureData.defaultHeight, isNeedUpdate = TextureData.defaultIsNeedUpdate;
    for (var i = 0; i < count; i++) {
        setWidth(i, width, TextureData);
        setHeight(i, height, TextureData);
        setIsNeedUpdate(i, isNeedUpdate, TextureData);
    }
};
//# sourceMappingURL=TextureSystem.js.map