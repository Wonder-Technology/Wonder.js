import { getSingleSizeData } from "../../../common/operateBufferDataUtils";
import { ETextureWrapMode } from "../../../../enum/ETextureWrapMode";
import { ETextureFilterMode } from "../../../../enum/ETextureFilterMode";
import { ETextureFormat } from "../../../../enum/ETextureFormat";
import { ETextureType } from "../../../../enum/ETextureType";
import { deleteBySwap, isValidVal } from "../../../../../utils/arrayUtils";
import { DataBufferConfig } from "../../../../../config/DataBufferConfig";
import { setTypeArrayValue } from "../../../../../utils/typeArrayUtils";
import { it, requireCheckFunc } from "../../../../../definition/typescript/decorator/contract";
import { ETextureTarget } from "../../../../enum/ETextureTarget";
import { expect } from "wonder-expect.js";
import { clearAllBindTextureUnitCache } from "./textureCacheUtils";
import { EVariableType } from "../../../../enum/EVariableType";
import { getMaxTextureUnit } from "../../../device/gpuDetectUtils";
export var getBufferDataSize = function () { return 1; };
export var createTypeArrays = function (buffer, count, TextureDataFromSystem) {
    var offset = 0;
    TextureDataFromSystem.widths = new Float32Array(buffer, offset, count * getBufferDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * getBufferDataSize();
    TextureDataFromSystem.heights = new Float32Array(buffer, offset, count * getBufferDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * getBufferDataSize();
    TextureDataFromSystem.isNeedUpdates = new Uint8Array(buffer, offset, count * getBufferDataSize());
    offset += count * Uint8Array.BYTES_PER_ELEMENT * getBufferDataSize();
    return offset;
};
export var getSource = function (textureIndex, TextureDataFromSystem) {
    return TextureDataFromSystem.sourceMap[textureIndex];
};
export var getWidth = function (textureIndex, TextureDataFromSystem) {
    var width = getSingleSizeData(textureIndex, TextureDataFromSystem.widths);
    if (width === 0) {
        var source = getSource(textureIndex, TextureDataFromSystem);
        if (_isSourceValueExist(source)) {
            return source.width;
        }
    }
    return width;
};
export var getHeight = function (textureIndex, TextureDataFromSystem) {
    var height = getSingleSizeData(textureIndex, TextureDataFromSystem.heights);
    if (height === 0) {
        var source = getSource(textureIndex, TextureDataFromSystem);
        if (_isSourceValueExist(source)) {
            return source.height;
        }
    }
    return height;
};
export var getWrapS = function (textureIndex, TextureData) {
    return ETextureWrapMode.CLAMP_TO_EDGE;
};
export var getWrapT = function (textureIndex, TextureData) {
    return ETextureWrapMode.CLAMP_TO_EDGE;
};
export var getMagFilter = function (textureIndex, TextureData) {
    return ETextureFilterMode.LINEAR;
};
export var getMinFilter = function (textureIndex, TextureData) {
    return ETextureFilterMode.NEAREST;
};
export var getFormat = function (textureIndex, TextureData) {
    return ETextureFormat.RGBA;
};
export var getType = function (textureIndex, TextureData) {
    return ETextureType.UNSIGNED_BYTE;
};
export var getFlipY = function (textureIndex, TextureData) {
    return true;
};
export var getIsNeedUpdate = function (textureIndex, TextureDataFromSystem) {
    return getSingleSizeData(textureIndex, TextureDataFromSystem.isNeedUpdates);
};
export var setIsNeedUpdate = function (textureIndex, value, TextureDataFromSystem) {
    setTypeArrayValue(TextureDataFromSystem.isNeedUpdates, textureIndex, value);
};
export var initTextures = function (gl, TextureDataFromSystem) {
    for (var i = 0; i < TextureDataFromSystem.index; i++) {
        _initTexture(gl, i, TextureDataFromSystem);
    }
};
var _initTexture = function (gl, textureIndex, TextureDataFromSystem) {
    _createWebglTexture(gl, textureIndex, TextureDataFromSystem);
};
var _createWebglTexture = function (gl, textureIndex, TextureDataFromSystem) {
    var glTexture = _getWebglTexture(textureIndex, TextureDataFromSystem);
    if (_isGLTextureExist(glTexture)) {
        return;
    }
    TextureDataFromSystem.glTextures[textureIndex] = gl.createTexture();
};
var _isGLTextureExist = function (glTexture) { return isValidVal(glTexture); };
var _isSourceExist = function (textureIndex, TextureDataFromSystem) { return _isSourceValueExist(TextureDataFromSystem.sourceMap[textureIndex]); };
var _isSourceValueExist = function (source) { return isValidVal(source); };
var _getWebglTexture = function (textureIndex, TextureData) {
    return TextureData.glTextures[textureIndex];
};
export var getBufferCount = function () { return DataBufferConfig.textureDataBufferCount; };
export var needUpdate = function (textureIndex, TextureDataFromSystem) {
    return getIsNeedUpdate(textureIndex, TextureDataFromSystem) === 0;
};
export var markNeedUpdate = function (textureIndex, value, TextureDataFromSystem) {
    if (value === false) {
        setIsNeedUpdate(textureIndex, 1, TextureDataFromSystem);
    }
    else {
        setIsNeedUpdate(textureIndex, 0, TextureDataFromSystem);
    }
};
export var update = requireCheckFunc(function (gl, textureIndex, setFlipY, TextureDataFromSystem) {
    it("texture source should exist", function () {
        expect(_isSourceExist(textureIndex, TextureDataFromSystem)).true;
    });
}, function (gl, textureIndex, setFlipY, TextureDataFromSystem) {
    var width = getWidth(textureIndex, TextureDataFromSystem), height = getHeight(textureIndex, TextureDataFromSystem), wrapS = getWrapS(textureIndex, TextureDataFromSystem), wrapT = getWrapT(textureIndex, TextureDataFromSystem), magFilter = getMagFilter(textureIndex, TextureDataFromSystem), minFilter = getMinFilter(textureIndex, TextureDataFromSystem), format = getFormat(textureIndex, TextureDataFromSystem), type = getType(textureIndex, TextureDataFromSystem), flipY = getFlipY(textureIndex, TextureDataFromSystem), source = TextureDataFromSystem.sourceMap[textureIndex], target = ETextureTarget.TEXTURE_2D, isSourcePowerOfTwo = _isSourcePowerOfTwo(width, height);
    setFlipY(gl, flipY);
    _setTextureParameters(gl, gl[target], isSourcePowerOfTwo, wrapS, wrapT, magFilter, minFilter);
    _allocateSourceToTexture(gl, source, format, type);
    markNeedUpdate(textureIndex, false, TextureDataFromSystem);
});
var _setTextureParameters = function (gl, textureType, isSourcePowerOfTwo, wrapS, wrapT, magFilter, minFilter) {
    if (isSourcePowerOfTwo) {
        gl.texParameteri(textureType, gl.TEXTURE_WRAP_S, gl[wrapS]);
        gl.texParameteri(textureType, gl.TEXTURE_WRAP_T, gl[wrapT]);
        gl.texParameteri(textureType, gl.TEXTURE_MAG_FILTER, gl[magFilter]);
        gl.texParameteri(textureType, gl.TEXTURE_MIN_FILTER, gl[minFilter]);
    }
    else {
        gl.texParameteri(textureType, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(textureType, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(textureType, gl.TEXTURE_MAG_FILTER, gl[_filterFallback(magFilter)]);
        gl.texParameteri(textureType, gl.TEXTURE_MIN_FILTER, gl[_filterFallback(minFilter)]);
    }
};
var _filterFallback = function (filter) {
    if (filter === ETextureFilterMode.NEAREST || filter === ETextureFilterMode.NEAREST_MIPMAP_MEAREST || filter === ETextureFilterMode.NEAREST_MIPMAP_LINEAR) {
        return ETextureFilterMode.NEAREST;
    }
    return ETextureFilterMode.LINEAR;
};
var _allocateSourceToTexture = function (gl, source, format, type) {
    _drawNoMipmapTwoDTexture(gl, source, format, type);
};
var _drawNoMipmapTwoDTexture = function (gl, source, format, type) {
    _drawTexture(gl, gl.TEXTURE_2D, 0, source, format, type);
};
var _drawTexture = function (gl, glTarget, index, source, format, type) {
    gl.texImage2D(glTarget, index, gl[format], gl[format], gl[type], source);
};
var _isSourcePowerOfTwo = function (width, height) {
    return _isPowerOfTwo(width) && _isPowerOfTwo(height);
};
var _isPowerOfTwo = function (value) {
    return (value & (value - 1)) === 0 && value !== 0;
};
export var bindToUnit = function (gl, unitIndex, textureIndex, TextureCacheDataFromSystem, TextureDataFromSystem, GPUDetectDataFromSystem, isCached, addActiveTexture) {
    var target = ETextureTarget.TEXTURE_2D;
    if (isCached(unitIndex, textureIndex, TextureCacheDataFromSystem, GPUDetectDataFromSystem)) {
        return;
    }
    addActiveTexture(unitIndex, textureIndex, TextureCacheDataFromSystem, GPUDetectDataFromSystem);
    gl.activeTexture(gl["TEXTURE" + unitIndex]);
    gl.bindTexture(gl[target], _getWebglTexture(textureIndex, TextureDataFromSystem));
};
export var sendData = function (gl, mapCount, shaderIndex, textureIndex, unitIndex, program, glslSenderData, uniformLocationMap, uniformCacheMap, directlySendUniformData, TextureDataFromSystem) {
    directlySendUniformData(gl, _getUniformSamplerName(textureIndex, TextureDataFromSystem), shaderIndex, program, _getSamplerType(_getTarget()), unitIndex, glslSenderData, uniformLocationMap, uniformCacheMap);
};
var _getSamplerType = function (target) {
    var type = null;
    switch (target) {
        case ETextureTarget.TEXTURE_2D:
            type = EVariableType.SAMPLER_2D;
            break;
        default:
            break;
    }
    return type;
};
var _getTarget = function () {
    return ETextureTarget.TEXTURE_2D;
};
var _getUniformSamplerName = function (index, TextureDataFromSystem) {
    return TextureDataFromSystem.uniformSamplerNameMap[index];
};
export var disposeSourceMap = function (sourceIndex, lastComponentIndex, TextureDataFromSystem) {
    deleteBySwap(sourceIndex, lastComponentIndex, TextureDataFromSystem.sourceMap);
};
export var disposeGLTexture = function (gl, sourceIndex, lastComponentIndex, TextureCacheDataFromSystem, TextureDataFromSystem, GPUDetectDataFromSystem) {
    var glTexture = _getWebglTexture(sourceIndex, TextureDataFromSystem);
    gl.deleteTexture(glTexture);
    _unBindAllUnit(gl, TextureCacheDataFromSystem, GPUDetectDataFromSystem);
    deleteBySwap(sourceIndex, lastComponentIndex, TextureDataFromSystem.glTextures);
};
var _unBindAllUnit = function (gl, TextureCacheDataFromSystem, GPUDetectData) {
    var maxTextureUnit = getMaxTextureUnit(GPUDetectData);
    for (var channel = 0; channel < maxTextureUnit; channel++) {
        gl.activeTexture(gl["TEXTURE" + channel]);
        gl.bindTexture(gl.TEXTURE_2D, null);
    }
    clearAllBindTextureUnitCache(TextureCacheDataFromSystem);
};
var _getWebglTexture = function (textureIndex, TextureDataFromSystem) {
    return TextureDataFromSystem.glTextures[textureIndex];
};
//# sourceMappingURL=textureUtils.js.map