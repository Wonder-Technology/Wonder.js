import { addActiveTexture, initData as initTextureCacheData, isCached } from "./TextureCacheSystem";
import { ensureFunc, it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { forEach, isNotValidVal } from "../../utils/arrayUtils";
import { Texture } from "./Texture";
import { deleteComponentBySwapArray, generateComponentIndex } from "../../component/ComponentSystem";
import { createSharedArrayBufferOrArrayBuffer } from "../../utils/arrayBufferUtils";
import { createTypeArrays, getWidth as getWidthUtils, getHeight as getHeightUtils, getBufferDataSize, markNeedUpdate as markNeedUpdateUtils, getIsNeedUpdate as getIsNeedUpdateUtils, getBufferCount, bindToUnit as bindToUnitUtils, initTexture as initTextureUtils, initTextures as initTexturesUtils, needUpdate as needUpdateUtils, update as updateUtils, disposeGLTexture, disposeSourceMap, getSource as getSourceUtils } from "../utils/worker/render_file/texture/textureUtils";
import { computeBufferLength, deleteOneItemBySwapAndReset, setTypeArrayValue } from "../../utils/typeArrayUtils";
import { isSupportRenderWorkerAndSharedArrayBuffer } from "../../device/WorkerDetectSystem";
import { getImageData } from "../utils/texture/textureUtils";
export var create = ensureFunc(function (component) {
    it("index should <= max count", function () {
        expect(component.index).lte(getBufferCount());
    });
}, function (TextureData) {
    var texture = new Texture(), index = generateComponentIndex(TextureData);
    texture.index = index;
    TextureData.textureMap[index] = texture;
    return texture;
});
export var getSource = getSourceUtils;
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
export var markNeedUpdate = markNeedUpdateUtils;
export var setUniformSamplerName = function (index, name, TextureData) {
    TextureData.uniformSamplerNameMap[index] = name;
};
export var bindToUnit = function (gl, unitIndex, textureIndex, TextureCacheData, TextureData, GPUDetectData) {
    bindToUnitUtils(gl, unitIndex, textureIndex, TextureCacheData, TextureData, GPUDetectData, isCached, addActiveTexture);
};
export var needUpdate = needUpdateUtils;
export var update = function (gl, textureIndex, TextureData) {
    updateUtils(gl, textureIndex, _setFlipY, TextureData);
};
var _setFlipY = function (gl, flipY) {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
};
export var dispose = function (gl, texture, TextureCacheData, TextureData, GPUDetectData) {
    var bufferDataSize = getBufferDataSize(), sourceIndex = texture.index, lastComponentIndex = null;
    TextureData.index -= 1;
    lastComponentIndex = TextureData.index;
    deleteOneItemBySwapAndReset(sourceIndex * bufferDataSize, lastComponentIndex * bufferDataSize, TextureData.widths, TextureData.defaultWidth);
    deleteOneItemBySwapAndReset(sourceIndex * bufferDataSize, lastComponentIndex * bufferDataSize, TextureData.heights, TextureData.defaultHeight);
    deleteOneItemBySwapAndReset(sourceIndex * bufferDataSize, lastComponentIndex * bufferDataSize, TextureData.isNeedUpdates, TextureData.defaultIsNeedUpdate);
    disposeSourceMap(sourceIndex, lastComponentIndex, TextureData);
    deleteComponentBySwapArray(sourceIndex, lastComponentIndex, TextureData.textureMap);
    _disposeGLTexture(gl, sourceIndex, lastComponentIndex, TextureCacheData, TextureData, GPUDetectData);
    _addDisposeDataForWorker(sourceIndex, lastComponentIndex, TextureData);
};
export var addNeedInitTextureIndexForWorker = null, initTextures = null, initTexture = null, setSource = null;
var _disposeGLTexture = null, _addDisposeDataForWorker = null;
if (isSupportRenderWorkerAndSharedArrayBuffer()) {
    initTextures = function (gl, TextureDataFromSystem) {
        for (var i = 0; i < TextureDataFromSystem.index; i++) {
            initTexture(gl, i, TextureDataFromSystem);
        }
    };
    initTexture = function (gl, textureIndex, TextureData) {
        addNeedInitTextureIndexForWorker(textureIndex, TextureData);
    };
    addNeedInitTextureIndexForWorker = function (textureIndex, TextureData) {
        TextureData.needInitedTextureIndexArr.push(textureIndex);
    };
    setSource = function (textureIndex, source, TextureData) {
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
    initTextures = initTexturesUtils;
    initTexture = initTextureUtils;
    addNeedInitTextureIndexForWorker = function () {
    };
    setSource = function (textureIndex, source, TextureData) {
        TextureData.sourceMap[textureIndex] = source;
    };
    _disposeGLTexture = function (gl, sourceIndex, lastComponentIndex, TextureCacheData, TextureData, GPUDetectData) {
        disposeGLTexture(gl, sourceIndex, lastComponentIndex, TextureCacheData, TextureData, GPUDetectData);
    };
    _addDisposeDataForWorker = function (sourceIndex, lastComponentIndex, TextureData) {
    };
}
export var getDisposedTextureDataMap = function (TextureData) {
    return TextureData.disposedTextureDataMap;
};
export var hasDisposedTextureDataMap = function (TextureData) {
    return TextureData.disposedTextureDataMap.length > 0;
};
export var clearDisposedTextureDataMap = function (TextureData) {
    TextureData.disposedTextureDataMap = [];
};
export var getNeedInitedTextureDataArr = function (TextureData) {
    return TextureData.needInitedTextureIndexArr;
};
export var hasNeedInitTextureDataArr = function (TextureData) {
    return TextureData.needInitedTextureIndexArr.length > 0;
};
export var clearNeedInitTextureDataArr = function (TextureData) {
    TextureData.needInitedTextureIndexArr = [];
};
export var clearNeedAddedSourceArr = function (TextureData) {
    TextureData.needAddedSourceArr = [];
};
export var getNeedAddedSourceArr = function (TextureData) {
    return TextureData.needAddedSourceArr;
};
export var convertAllSourceMapToImageDataArr = function (sourceMap, DomQuery) {
    var arr = [];
    forEach(sourceMap, function (source, index) {
        if (_isSourceNotExist(source)) {
            return;
        }
        var width = source.width, height = source.height;
        arr.push({
            arrayBuffer: _getArrayBuffer(getImageData(source, width, height, DomQuery)),
            width: width,
            height: height,
            index: index
        });
    });
    return arr;
};
export var convertNeedInitedSourceMapToImageDataArr = requireCheckFunc(function (sourceMap, needInitedTextureDataArr, DomQuery) {
    it("needInitedTextureDataArr should corresponding to sourceMap", function () {
        expect(needInitedTextureDataArr.length).equal(sourceMap.length);
    });
}, function (sourceMap, needInitedTextureDataArr, DomQuery) {
    var arr = [];
    forEach(sourceMap, function (source, index) {
        if (_isSourceNotExist(source)) {
            return;
        }
        var width = source.width, height = source.height;
        arr.push({
            arrayBuffer: _getArrayBuffer(getImageData(source, width, height, DomQuery)),
            width: width,
            height: height,
            index: needInitedTextureDataArr[index]
        });
    });
    return arr;
});
var _getArrayBuffer = function (imageData) { return imageData.data.buffer; };
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