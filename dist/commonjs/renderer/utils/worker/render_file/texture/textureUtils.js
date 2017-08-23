"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var operateBufferDataUtils_1 = require("../../../common/operateBufferDataUtils");
var ETextureWrapMode_1 = require("../../../../enum/ETextureWrapMode");
var ETextureFilterMode_1 = require("../../../../enum/ETextureFilterMode");
var ETextureFormat_1 = require("../../../../enum/ETextureFormat");
var ETextureType_1 = require("../../../../enum/ETextureType");
var arrayUtils_1 = require("../../../../../utils/arrayUtils");
var DataBufferConfig_1 = require("../../../../../config/DataBufferConfig");
var typeArrayUtils_1 = require("../../../../../utils/typeArrayUtils");
var contract_1 = require("../../../../../definition/typescript/decorator/contract");
var ETextureTarget_1 = require("../../../../enum/ETextureTarget");
var wonder_expect_js_1 = require("wonder-expect.js");
var textureCacheUtils_1 = require("./textureCacheUtils");
var EVariableType_1 = require("../../../../enum/EVariableType");
var gpuDetectUtils_1 = require("../../../device/gpuDetectUtils");
exports.getBufferDataSize = function () { return 1; };
exports.createTypeArrays = function (buffer, count, TextureDataFromSystem) {
    var offset = 0;
    TextureDataFromSystem.widths = new Float32Array(buffer, offset, count * exports.getBufferDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * exports.getBufferDataSize();
    TextureDataFromSystem.heights = new Float32Array(buffer, offset, count * exports.getBufferDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * exports.getBufferDataSize();
    TextureDataFromSystem.isNeedUpdates = new Uint8Array(buffer, offset, count * exports.getBufferDataSize());
    offset += count * Uint8Array.BYTES_PER_ELEMENT * exports.getBufferDataSize();
    return offset;
};
exports.getSource = function (textureIndex, TextureDataFromSystem) {
    return TextureDataFromSystem.sourceMap[textureIndex];
};
exports.getWidth = function (textureIndex, TextureDataFromSystem) {
    var width = operateBufferDataUtils_1.getSingleSizeData(textureIndex, TextureDataFromSystem.widths);
    if (width === 0) {
        var source = exports.getSource(textureIndex, TextureDataFromSystem);
        if (_isSourceValueExist(source)) {
            return source.width;
        }
    }
    return width;
};
exports.getHeight = function (textureIndex, TextureDataFromSystem) {
    var height = operateBufferDataUtils_1.getSingleSizeData(textureIndex, TextureDataFromSystem.heights);
    if (height === 0) {
        var source = exports.getSource(textureIndex, TextureDataFromSystem);
        if (_isSourceValueExist(source)) {
            return source.height;
        }
    }
    return height;
};
exports.getWrapS = function (textureIndex, TextureData) {
    return ETextureWrapMode_1.ETextureWrapMode.CLAMP_TO_EDGE;
};
exports.getWrapT = function (textureIndex, TextureData) {
    return ETextureWrapMode_1.ETextureWrapMode.CLAMP_TO_EDGE;
};
exports.getMagFilter = function (textureIndex, TextureData) {
    return ETextureFilterMode_1.ETextureFilterMode.LINEAR;
};
exports.getMinFilter = function (textureIndex, TextureData) {
    return ETextureFilterMode_1.ETextureFilterMode.NEAREST;
};
exports.getFormat = function (textureIndex, TextureData) {
    return ETextureFormat_1.ETextureFormat.RGBA;
};
exports.getType = function (textureIndex, TextureData) {
    return ETextureType_1.ETextureType.UNSIGNED_BYTE;
};
exports.getFlipY = function (textureIndex, TextureData) {
    return true;
};
exports.getIsNeedUpdate = function (textureIndex, TextureDataFromSystem) {
    return operateBufferDataUtils_1.getSingleSizeData(textureIndex, TextureDataFromSystem.isNeedUpdates);
};
exports.setIsNeedUpdate = function (textureIndex, value, TextureDataFromSystem) {
    typeArrayUtils_1.setTypeArrayValue(TextureDataFromSystem.isNeedUpdates, textureIndex, value);
};
exports.initTextures = function (gl, TextureDataFromSystem) {
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
var _isGLTextureExist = function (glTexture) { return arrayUtils_1.isValidVal(glTexture); };
var _isSourceExist = function (textureIndex, TextureDataFromSystem) { return _isSourceValueExist(TextureDataFromSystem.sourceMap[textureIndex]); };
var _isSourceValueExist = function (source) { return arrayUtils_1.isValidVal(source); };
var _getWebglTexture = function (textureIndex, TextureData) {
    return TextureData.glTextures[textureIndex];
};
exports.getBufferCount = function () { return DataBufferConfig_1.DataBufferConfig.textureDataBufferCount; };
exports.needUpdate = function (textureIndex, TextureDataFromSystem) {
    return exports.getIsNeedUpdate(textureIndex, TextureDataFromSystem) === 0;
};
exports.markNeedUpdate = function (textureIndex, value, TextureDataFromSystem) {
    if (value === false) {
        exports.setIsNeedUpdate(textureIndex, 1, TextureDataFromSystem);
    }
    else {
        exports.setIsNeedUpdate(textureIndex, 0, TextureDataFromSystem);
    }
};
exports.update = contract_1.requireCheckFunc(function (gl, textureIndex, setFlipY, TextureDataFromSystem) {
    contract_1.it("texture source should exist", function () {
        wonder_expect_js_1.expect(_isSourceExist(textureIndex, TextureDataFromSystem)).true;
    });
}, function (gl, textureIndex, setFlipY, TextureDataFromSystem) {
    var width = exports.getWidth(textureIndex, TextureDataFromSystem), height = exports.getHeight(textureIndex, TextureDataFromSystem), wrapS = exports.getWrapS(textureIndex, TextureDataFromSystem), wrapT = exports.getWrapT(textureIndex, TextureDataFromSystem), magFilter = exports.getMagFilter(textureIndex, TextureDataFromSystem), minFilter = exports.getMinFilter(textureIndex, TextureDataFromSystem), format = exports.getFormat(textureIndex, TextureDataFromSystem), type = exports.getType(textureIndex, TextureDataFromSystem), flipY = exports.getFlipY(textureIndex, TextureDataFromSystem), source = TextureDataFromSystem.sourceMap[textureIndex], target = ETextureTarget_1.ETextureTarget.TEXTURE_2D, isSourcePowerOfTwo = _isSourcePowerOfTwo(width, height);
    setFlipY(gl, flipY);
    _setTextureParameters(gl, gl[target], isSourcePowerOfTwo, wrapS, wrapT, magFilter, minFilter);
    _allocateSourceToTexture(gl, source, format, type);
    exports.markNeedUpdate(textureIndex, false, TextureDataFromSystem);
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
    if (filter === ETextureFilterMode_1.ETextureFilterMode.NEAREST || filter === ETextureFilterMode_1.ETextureFilterMode.NEAREST_MIPMAP_MEAREST || filter === ETextureFilterMode_1.ETextureFilterMode.NEAREST_MIPMAP_LINEAR) {
        return ETextureFilterMode_1.ETextureFilterMode.NEAREST;
    }
    return ETextureFilterMode_1.ETextureFilterMode.LINEAR;
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
exports.bindToUnit = function (gl, unitIndex, textureIndex, TextureCacheDataFromSystem, TextureDataFromSystem, GPUDetectDataFromSystem, isCached, addActiveTexture) {
    var target = ETextureTarget_1.ETextureTarget.TEXTURE_2D;
    if (isCached(unitIndex, textureIndex, TextureCacheDataFromSystem, GPUDetectDataFromSystem)) {
        return;
    }
    addActiveTexture(unitIndex, textureIndex, TextureCacheDataFromSystem, GPUDetectDataFromSystem);
    gl.activeTexture(gl["TEXTURE" + unitIndex]);
    gl.bindTexture(gl[target], _getWebglTexture(textureIndex, TextureDataFromSystem));
};
exports.sendData = function (gl, mapCount, shaderIndex, textureIndex, unitIndex, program, glslSenderData, uniformLocationMap, uniformCacheMap, directlySendUniformData, TextureDataFromSystem) {
    directlySendUniformData(gl, _getUniformSamplerName(textureIndex, TextureDataFromSystem), shaderIndex, program, _getSamplerType(_getTarget()), unitIndex, glslSenderData, uniformLocationMap, uniformCacheMap);
};
var _getSamplerType = function (target) {
    var type = null;
    switch (target) {
        case ETextureTarget_1.ETextureTarget.TEXTURE_2D:
            type = EVariableType_1.EVariableType.SAMPLER_2D;
            break;
        default:
            break;
    }
    return type;
};
var _getTarget = function () {
    return ETextureTarget_1.ETextureTarget.TEXTURE_2D;
};
var _getUniformSamplerName = function (index, TextureDataFromSystem) {
    return TextureDataFromSystem.uniformSamplerNameMap[index];
};
exports.disposeSourceMap = function (sourceIndex, lastComponentIndex, TextureDataFromSystem) {
    arrayUtils_1.deleteBySwap(sourceIndex, lastComponentIndex, TextureDataFromSystem.sourceMap);
};
exports.disposeGLTexture = function (gl, sourceIndex, lastComponentIndex, TextureCacheDataFromSystem, TextureDataFromSystem, GPUDetectDataFromSystem) {
    var glTexture = _getWebglTexture(sourceIndex, TextureDataFromSystem);
    gl.deleteTexture(glTexture);
    _unBindAllUnit(gl, TextureCacheDataFromSystem, GPUDetectDataFromSystem);
    arrayUtils_1.deleteBySwap(sourceIndex, lastComponentIndex, TextureDataFromSystem.glTextures);
};
var _unBindAllUnit = function (gl, TextureCacheDataFromSystem, GPUDetectData) {
    var maxTextureUnit = gpuDetectUtils_1.getMaxTextureUnit(GPUDetectData);
    for (var channel = 0; channel < maxTextureUnit; channel++) {
        gl.activeTexture(gl["TEXTURE" + channel]);
        gl.bindTexture(gl.TEXTURE_2D, null);
    }
    textureCacheUtils_1.clearAllBindTextureUnitCache(TextureCacheDataFromSystem);
};
var _getWebglTexture = function (textureIndex, TextureDataFromSystem) {
    return TextureDataFromSystem.glTextures[textureIndex];
};
//# sourceMappingURL=textureUtils.js.map