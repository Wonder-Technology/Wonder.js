import { getSingleSizeData } from "../../../common/operateBufferDataUtils";
import { ETextureWrapMode } from "../../../../enum/ETextureWrapMode";
import { ETextureFilterMode } from "../../../../enum/ETextureFilterMode";
import { ETextureFormat } from "../../../../enum/ETextureFormat";
import { ETextureType } from "../../../../enum/ETextureType";
import { deleteBySwap, isValidVal } from "../../../../../utils/arrayUtils";
import { DataBufferConfig } from "../../../../../config/DataBufferConfig";
import { setTypeArrayValue } from "../../../../../utils/typeArrayUtils";
import { ensureFunc, it, requireCheckFunc } from "../../../../../definition/typescript/decorator/contract";
import { ETextureTarget } from "../../../../enum/ETextureTarget";
import { expect } from "wonder-expect.js";
import { clearAllBindTextureUnitCache } from "./textureCacheUtils";
import { DomQuery } from "wonder-commonlib/dist/es2015/utils/DomQuery";
import { UniformCacheMap, UniformLocationMap } from "../../../../type/dataType";
import { SendUniformDataGLSLSenderDataMap } from "../../../../type/utilsType";
import { EVariableType } from "../../../../enum/EVariableType";
import { getMaxTextureUnit } from "../../../device/gpuDetectUtils";

export const getBufferDataSize = () => 1;

export const createTypeArrays = (buffer: any, count: number, TextureDataFromSystem: any) => {
    var offset = 0;

    TextureDataFromSystem.widths = new Float32Array(buffer, offset, count * getBufferDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * getBufferDataSize();

    TextureDataFromSystem.heights = new Float32Array(buffer, offset, count * getBufferDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * getBufferDataSize();

    TextureDataFromSystem.isNeedUpdates = new Uint8Array(buffer, offset, count * getBufferDataSize());
    offset += count * Uint8Array.BYTES_PER_ELEMENT * getBufferDataSize();

    return offset;
}

export const getSource = (textureIndex: number, TextureDataFromSystem: any) => {
    return TextureDataFromSystem.sourceMap[textureIndex];
}

export const getWidth = (textureIndex: number, TextureDataFromSystem: any) => {
    var width = getSingleSizeData(textureIndex, TextureDataFromSystem.widths);

    if (width === 0) {
        let source = getSource(textureIndex, TextureDataFromSystem);

        if (_isSourceValueExist(source)) {
            return source.width;
        }
    }

    return width;
}

export const getHeight = (textureIndex: number, TextureDataFromSystem: any) => {
    var height = getSingleSizeData(textureIndex, TextureDataFromSystem.heights);

    if (height === 0) {
        let source = getSource(textureIndex, TextureDataFromSystem);

        if (_isSourceValueExist(source)) {
            return source.height;
        }
    }

    return height;
}

export const getWrapS = (textureIndex: number, TextureData: any) => {
    //todo finish: judge type array value, return enum value

    return ETextureWrapMode.CLAMP_TO_EDGE;
}

export const getWrapT = (textureIndex: number, TextureData: any) => {
    //todo finish

    return ETextureWrapMode.CLAMP_TO_EDGE;
}

export const getMagFilter = (textureIndex: number, TextureData: any) => {
    //todo finish

    return ETextureFilterMode.LINEAR;
}

export const getMinFilter = (textureIndex: number, TextureData: any) => {
    //todo finish

    return ETextureFilterMode.NEAREST;
}

export const getFormat = (textureIndex: number, TextureData: any) => {
    //todo finish

    return ETextureFormat.RGBA;
}

export const getType = (textureIndex: number, TextureData: any) => {
    //todo finish

    return ETextureType.UNSIGNED_BYTE;
}

export const getFlipY = (textureIndex: number, TextureData: any) => {
    //todo finish

    return true;
}

export const getIsNeedUpdate = (textureIndex: number, TextureDataFromSystem: any) => {
    return getSingleSizeData(textureIndex, TextureDataFromSystem.isNeedUpdates);
}

export const setIsNeedUpdate = (textureIndex: number, value: number, TextureDataFromSystem: any) => {
    setTypeArrayValue(TextureDataFromSystem.isNeedUpdates, textureIndex, value);
}


export const initTextures = (gl: WebGLRenderingContext, TextureDataFromSystem: any) => {
    for (let i = 0; i < TextureDataFromSystem.index; i++) {
        _initTexture(gl, i, TextureDataFromSystem);
    }
}

const _initTexture =(gl: WebGLRenderingContext, textureIndex: number, TextureDataFromSystem: any) => {
    _createWebglTexture(gl, textureIndex, TextureDataFromSystem);
}

const _createWebglTexture =(gl: WebGLRenderingContext, textureIndex: number, TextureDataFromSystem: any) => {
    var glTexture = _getWebglTexture(textureIndex, TextureDataFromSystem);

    if (_isGLTextureExist(glTexture)) {
        return;
    }

    TextureDataFromSystem.glTextures[textureIndex] = gl.createTexture();
}

const _isGLTextureExist =(glTexture: WebGLTexture) => isValidVal(glTexture);

const _isSourceExist =(textureIndex: number, TextureDataFromSystem: any) => _isSourceValueExist(TextureDataFromSystem.sourceMap[textureIndex]);

const _isSourceValueExist =(source: any) => isValidVal(source);

export const getBufferCount = () => DataBufferConfig.textureDataBufferCount;

export const needUpdate = (textureIndex: number, TextureDataFromSystem: any) => {
    return getIsNeedUpdate(textureIndex, TextureDataFromSystem) === 0;
}

export const markNeedUpdate = (textureIndex, value: boolean, TextureDataFromSystem) => {
    if (value === false) {
        setIsNeedUpdate(textureIndex, 1, TextureDataFromSystem);
    }
    else {
        setIsNeedUpdate(textureIndex, 0, TextureDataFromSystem);
    }
}

export const update = requireCheckFunc((gl: WebGLRenderingContext, textureIndex: number, setFlipY: Function, TextureDataFromSystem: any) => {
    it("texture source should exist", () => {
        expect(_isSourceExist(textureIndex, TextureDataFromSystem)).true;
    });
}, (gl: WebGLRenderingContext, textureIndex: number, setFlipY: Function, TextureDataFromSystem: any) => {
    var width = getWidth(textureIndex, TextureDataFromSystem),
        height = getHeight(textureIndex, TextureDataFromSystem),
        wrapS = getWrapS(textureIndex, TextureDataFromSystem),
        wrapT = getWrapT(textureIndex, TextureDataFromSystem),
        magFilter = getMagFilter(textureIndex, TextureDataFromSystem),
        minFilter = getMinFilter(textureIndex, TextureDataFromSystem),
        format = getFormat(textureIndex, TextureDataFromSystem),
        type = getType(textureIndex, TextureDataFromSystem),
        flipY = getFlipY(textureIndex, TextureDataFromSystem),
        source = TextureDataFromSystem.sourceMap[textureIndex],
        target = ETextureTarget.TEXTURE_2D,
        isSourcePowerOfTwo = _isSourcePowerOfTwo(width, height);

    setFlipY(gl, flipY);

    //todo handle _needClampMaxSize
    // if(_needClampMaxSize(source, width, height)){
    //     this.clampToMaxSize();
    //
    //     isSourcePowerOfTwo = this.isSourcePowerOfTwo();
    //
    //     if(!isSourcePowerOfTwo){
    //         Log.warn("texture size is not power of two after clampToMaxSize()");
    //     }
    // }

    _setTextureParameters(gl, gl[target], isSourcePowerOfTwo, wrapS, wrapT, magFilter, minFilter);

    _allocateSourceToTexture(gl, source, format, type);

    // if (this.generateMipmaps && isSourcePowerOfTwo) {
    //     gl.generateMipmap(gl[this.target]);
    // }

    markNeedUpdate(textureIndex, false, TextureDataFromSystem);
})

const _setTextureParameters =(gl: WebGLRenderingContext, textureType: any, isSourcePowerOfTwo: boolean, wrapS: ETextureWrapMode, wrapT: ETextureWrapMode, magFilter: ETextureFilterMode, minFilter: ETextureFilterMode) => {
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
}

const _filterFallback =(filter: ETextureFilterMode) => {
    if (filter === ETextureFilterMode.NEAREST || filter === ETextureFilterMode.NEAREST_MIPMAP_MEAREST || filter === ETextureFilterMode.NEAREST_MIPMAP_LINEAR) {
        return ETextureFilterMode.NEAREST;
    }

    return ETextureFilterMode.LINEAR;
}

const _allocateSourceToTexture =(gl: WebGLRenderingContext, source: any, format: ETextureFormat, type: ETextureType) => {
    _drawNoMipmapTwoDTexture(gl, source, format, type);
}

const _drawNoMipmapTwoDTexture =(gl: WebGLRenderingContext, source: any, format: ETextureFormat, type: ETextureType) => {
    _drawTexture(gl, gl.TEXTURE_2D, 0, source, format, type);
}

const _drawTexture =(gl: WebGLRenderingContext, glTarget: any, index: number, source: any, format: ETextureFormat, type: ETextureType) => {
    gl.texImage2D(glTarget, index, gl[format], gl[format], gl[type], source);
}

const _isSourcePowerOfTwo =(width: number, height: number) => {
    return _isPowerOfTwo(width) && _isPowerOfTwo(height);
}

const _isPowerOfTwo =(value: number) => {
    return (value & (value - 1)) === 0 && value !== 0;
}

// const _needClampMaxSize =(source:HTMLImageElement, width:number, height:number) => {
//     if(_isSourceNotExist(source)){
//         return false;
//     }
//
//     let maxSize = GPUDetector.getInstance().maxTextureSize;
//
//     return width > maxSize || height > maxSize;
// }

// const _isGLTextureExist =(textureIndex: number, TextureDataFromSystem:any) => {
//     return isValidVal(TextureDataFromSystem.glTextures[textureIndex]);
// }

export const bindToUnit = (gl: WebGLRenderingContext, unitIndex: number, textureIndex: number, TextureCacheDataFromSystem: any, TextureDataFromSystem: any, GPUDetectDataFromSystem: any, isCached: Function, addActiveTexture: Function) => {
    var target = ETextureTarget.TEXTURE_2D;

    if (isCached(unitIndex, textureIndex, TextureCacheDataFromSystem, GPUDetectDataFromSystem)) {
        return;
    }

    addActiveTexture(unitIndex, textureIndex, TextureCacheDataFromSystem, GPUDetectDataFromSystem);

    gl.activeTexture(gl[`TEXTURE${unitIndex}`]);
    gl.bindTexture(gl[target], _getWebglTexture(textureIndex, TextureDataFromSystem));
}

export const sendData = (gl: WebGLRenderingContext, mapCount: number, shaderIndex: number, textureIndex: number, unitIndex: number, program: WebGLProgram, glslSenderData: SendUniformDataGLSLSenderDataMap, uniformLocationMap: UniformLocationMap, uniformCacheMap: UniformCacheMap, directlySendUniformData: Function, TextureDataFromSystem: any) => {
    directlySendUniformData(gl, _getUniformSamplerName(textureIndex, TextureDataFromSystem), shaderIndex, program, _getSamplerType(_getTarget()), unitIndex, glslSenderData, uniformLocationMap, uniformCacheMap);
}

const _getSamplerType =(target: ETextureTarget) => {
    var type = null;

    switch (target) {
        case ETextureTarget.TEXTURE_2D:
            type = EVariableType.SAMPLER_2D;
            break;
        // case ETextureTarget.TEXTURE_CUBE_MAP:
        //     type = EVariableType.SAMPLER_CUBE;
        //     break;
        default:
            break;
    }

    return type;
}

const _getTarget =() => {
    return ETextureTarget.TEXTURE_2D;
}

const _getUniformSamplerName =(index: number, TextureDataFromSystem: any) => {
    return TextureDataFromSystem.uniformSamplerNameMap[index];
}

export const disposeSourceMap = (sourceIndex: number, lastComponentIndex: number, TextureDataFromSystem: any) => {
    deleteBySwap(sourceIndex, lastComponentIndex, TextureDataFromSystem.sourceMap);
}

export const disposeGLTexture = (gl: WebGLRenderingContext, sourceIndex: number, lastComponentIndex: number, TextureCacheDataFromSystem: any, TextureDataFromSystem: any, GPUDetectDataFromSystem: any) => {
    var glTexture = _getWebglTexture(sourceIndex, TextureDataFromSystem);

    gl.deleteTexture(glTexture);
    // delete glTexture;

    _unBindAllUnit(gl, TextureCacheDataFromSystem, GPUDetectDataFromSystem);

    deleteBySwap(sourceIndex, lastComponentIndex, TextureDataFromSystem.glTextures);
}

const _unBindAllUnit =(gl: WebGLRenderingContext, TextureCacheDataFromSystem: any, GPUDetectData: any) => {
    var maxTextureUnit = getMaxTextureUnit(GPUDetectData);

    for (let channel = 0; channel < maxTextureUnit; channel++) {
        gl.activeTexture(gl[`TEXTURE${channel}`]);
        gl.bindTexture(gl.TEXTURE_2D, null);
        // gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
    }

    clearAllBindTextureUnitCache(TextureCacheDataFromSystem);
}

const _getWebglTexture =(textureIndex: number, TextureDataFromSystem: any) => {
    return TextureDataFromSystem.glTextures[textureIndex];
}
