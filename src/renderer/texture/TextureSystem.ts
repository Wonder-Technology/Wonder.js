import {
    addActiveTexture, clearAllBindTextureUnitCache, initData as initTextureCacheData,
    isCached
} from "./TextureCacheSystem";
import { ETextureTarget } from "../enum/ETextureTarget";
import { ensureFunc, it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { deleteBySwap, isValidVal } from "../../utils/arrayUtils";
import { ETextureFilterMode } from "../enum/ETextureFilterMode";
import { Texture } from "./Texture";
import { deleteComponentBySwapArray, generateComponentIndex } from "../../component/ComponentSystem";
import { DataBufferConfig } from "../../config/DataBufferConfig";
import { createSharedArrayBufferOrArrayBuffer } from "../../utils/arrayBufferUtils";
import {
    createTypeArrays, getWidth as getWidthUtils, getHeight as getHeightUtils,
    getWrapS as getWrapSUtils,
    getWrapT as getWrapTUtils,
    getMagFilter as getMagFilterUtils,
    getMinFilter as getMinFilterUtils,
    getFormat as getFormatUtils,
    getType as getTypeUtils,
    getFlipY as getFlipYUtils, getBufferDataSize, getIsNeedUpdate as getIsNeedUpdateUtils
} from "../utils/texture/textureUtils";
import { deleteOneItemBySwapAndReset, setTypeArrayValue } from "../../utils/typeArrayUtils";
import { GPUDetector } from "../device/GPUDetector";
import { ETextureWrapMode } from "../enum/ETextureWrapMode";
import { ETextureFormat } from "../enum/ETextureFormat";
import { ETextureType } from "../enum/ETextureType";

export var create = ensureFunc((component: Texture) => {
    it("index should <= max count", () => {
        expect(component.index).lt(_getBufferCount());
    });
}, (TextureData:any) => {
    var texture = new Texture(),
        index = generateComponentIndex(TextureData);

    texture.index = index;

    TextureData.textureMap[index] = texture;

    return texture;
})

export var getSource = (textureIndex:number, TextureData:any) => {
    return TextureData.sourceMap[textureIndex];
}

export var setSource = (textureIndex:number, source:any, TextureData:any) => {
    TextureData.sourceMap[textureIndex] = source;
}

export var getWidth = getWidthUtils;

export var setWidth = (textureIndex:number, value:any, TextureData:any) => {
    setTypeArrayValue(TextureData.widths, textureIndex, value);
}

export var getHeight = getHeightUtils;

export var setHeight = (textureIndex:number, value:any, TextureData:any) => {
    setTypeArrayValue(TextureData.heights, textureIndex, value);
}

export var getIsNeedUpdate = getIsNeedUpdateUtils;

export var setIsNeedUpdate = (textureIndex:number, value:number, TextureData:any) => {
    setTypeArrayValue(TextureData.isNeedUpdates, textureIndex, value);
}

//todo add set methods

export var getWrapS = getWrapSUtils;

export var getWrapT = getWrapTUtils;

export var getMagFilter = getMagFilterUtils;

export var getMinFilter = getMinFilterUtils;

export var getFormat = getFormatUtils;

export var getType = getTypeUtils;

export var getFlipY = getFlipYUtils;

export var bindToUnit = (gl:WebGLRenderingContext, unitIndex: number, textureIndex:number, TextureCacheData:any, TextureData:any) => {
    var target = ETextureTarget.TEXTURE_2D;

    if(isCached(unitIndex, textureIndex, TextureCacheData)){
        return;
    }

    addActiveTexture(unitIndex, textureIndex, TextureCacheData);

    gl.activeTexture(gl[`TEXTURE${unitIndex}`]);
    gl.bindTexture(gl[target], _getWebglTexture(textureIndex, TextureData));

    return this;
}

var _getWebglTexture = (textureIndex:number, TextureData:any) => {
    return TextureData.glTextures[textureIndex];
}

export var initTextures = (gl:WebGLRenderingContext, TextureData:any) => {
    for(let i = 0; i < TextureData.index; i++){
        initTexture(gl, i, TextureData);
    }
}

export var initTexture = (gl:WebGLRenderingContext, textureIndex:number, TextureData:any) => {
    _createWebglTexture(gl, textureIndex, TextureData);
}

var _createWebglTexture = (gl:WebGLRenderingContext, textureIndex:number, TextureData:any) => {
    var glTexture = _getWebglTexture(textureIndex, TextureData);

    if(_isGLTextureExist(glTexture)){
        return;
    }

    TextureData.glTextures[textureIndex] = gl.createTexture();
}

var _isGLTextureExist = (glTexture:WebGLTexture) => isValidVal(glTexture);

export var needUpdate = (textureIndex:number, TextureData:any) => {
    return getIsNeedUpdate(textureIndex, TextureData) === 0;
}

export var markNeedUpdate = (textureIndex, value:boolean, TextureData) => {
    if(value === false){
        setIsNeedUpdate(textureIndex, 1, TextureData);
    }
    else{
        setIsNeedUpdate(textureIndex, 0, TextureData);
    }
}

export var update = requireCheckFunc((gl:WebGLRenderingContext, textureIndex: number, TextureData:any) => {
    it("texture should exist", () => {
        expect(_isTextureExist(textureIndex, TextureData)).true;
    });
}, (gl:WebGLRenderingContext, textureIndex: number, TextureData:any) => {
    var width = getWidth(textureIndex, TextureData),
        height = getHeight(textureIndex, TextureData),
        wrapS = getWrapS(textureIndex, TextureData),
        wrapT = getWrapT(textureIndex, TextureData),
        magFilter = getMagFilter(textureIndex, TextureData),
        minFilter = getMinFilter(textureIndex, TextureData),
        format = getFormat(textureIndex, TextureData),
        type = getType(textureIndex, TextureData),
        flipY = getFlipY(textureIndex, TextureData),
        source = TextureData.sourceMap[textureIndex],
        target = ETextureTarget.TEXTURE_2D,
        isSourcePowerOfTwo = _isSourcePowerOfTwo(width, height);

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);

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

    markNeedUpdate(textureIndex, false, TextureData);

    return this;
})

var _setTextureParameters =(gl:WebGLRenderingContext, textureType:any, isSourcePowerOfTwo:boolean, wrapS:ETextureWrapMode, wrapT:ETextureWrapMode, magFilter:ETextureFilterMode, minFilter:ETextureFilterMode) => {
    if (isSourcePowerOfTwo){
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

var _filterFallback =(filter:ETextureFilterMode) => {
    if (filter === ETextureFilterMode.NEAREST || filter === ETextureFilterMode.NEAREST_MIPMAP_MEAREST || filter === ETextureFilterMode.NEAREST_MIPMAP_LINEAR) {
        return ETextureFilterMode.NEAREST;
    }

    return ETextureFilterMode.LINEAR;
}

var _allocateSourceToTexture = (gl:WebGLRenderingContext, source:any, format:ETextureFormat, type:ETextureType) => {
    _drawNoMipmapTwoDTexture(gl, source, format, type);
}

var _drawNoMipmapTwoDTexture = (gl:WebGLRenderingContext, source:any, format:ETextureFormat, type:ETextureType) => {
    _drawTexture(gl, gl.TEXTURE_2D, 0, source, format, type);
}

var _drawTexture = (gl:WebGLRenderingContext, glTarget:any, index:number, source:any, format:ETextureFormat, type:ETextureType) => {
    gl.texImage2D(glTarget, index, gl[format], gl[format], gl[type], source);
}

var _isSourcePowerOfTwo = (width:number, height:number) => {
    return _isPowerOfTwo(width) && _isPowerOfTwo(height);
}

var _isPowerOfTwo = (value:number) => {
    return (value & (value - 1)) === 0 && value !== 0;
}

// var _needClampMaxSize = (source:HTMLImageElement, width:number, height:number) => {
//     if(_isSourceNotExist(source)){
//         return false;
//     }
//
//     let maxSize = GPUDetector.getInstance().maxTextureSize;
//
//     return width > maxSize || height > maxSize;
// }

// var _isSourceExist = (source:HTMLImageElement) => isValidVal(source);

var _isTextureExist = (textureIndex: number, TextureData:any) => {
    return isValidVal(TextureData.glTextures[textureIndex]);
}

export var dispose = (gl:WebGLRenderingContext, texture:Texture, TextureCacheData:any, TextureData:any) => {
    var bufferDataSize = getBufferDataSize(),
        sourceIndex = texture.index,
        lastComponentIndex: number = null;

    TextureData.index -= 1;

    lastComponentIndex = TextureData.index;

    deleteOneItemBySwapAndReset(sourceIndex * bufferDataSize, lastComponentIndex * bufferDataSize, TextureData.widths, TextureData.defaultWidth);
    deleteOneItemBySwapAndReset(sourceIndex * bufferDataSize, lastComponentIndex * bufferDataSize, TextureData.heights, TextureData.defaultHeight);
    deleteOneItemBySwapAndReset(sourceIndex * bufferDataSize, lastComponentIndex * bufferDataSize, TextureData.isNeedUpdates, TextureData.defaultIsNeedUpdate);

    deleteBySwap(sourceIndex, lastComponentIndex, TextureData.sourceMap);

    deleteComponentBySwapArray(sourceIndex, lastComponentIndex, TextureData.textureMap);

    _disposeGLTexture(gl, sourceIndex, lastComponentIndex, TextureCacheData, TextureData);
}

var _disposeGLTexture = (gl:WebGLRenderingContext, sourceIndex:number, lastComponentIndex:number, TextureCacheData:any, TextureData:any) => {
    var glTexture = _getWebglTexture(sourceIndex, TextureData);

    gl.deleteTexture(glTexture);
    // delete glTexture;

    _unBindAllUnit(gl, TextureCacheData);

    deleteBySwap(sourceIndex, lastComponentIndex, TextureData.glTextures);
}

var _unBindAllUnit = (gl:WebGLRenderingContext, TextureCacheData:any) => {
    var maxTextureUnit = GPUDetector.getInstance().maxTextureUnit;

    for (let channel = 0; channel < maxTextureUnit; channel++) {
        gl.activeTexture(gl[`TEXTURE${channel}`]);
        gl.bindTexture(gl.TEXTURE_2D, null);
        // gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
    }

    clearAllBindTextureUnitCache(TextureCacheData);
}

export var initData = (TextureCacheData:any, TextureData:any) => {
    initTextureCacheData(TextureCacheData);

    TextureData.index = 0;

    TextureData.glTextures = [];
    TextureData.sourceMap = [];

    TextureData.textureMap = [];

    _setDefaultData(TextureData);

    _initBufferData(TextureData);
}

var _setDefaultData = (TextureData: any) => {
    TextureData.defaultWidth = 0;
    TextureData.defaultHeight = 0;
    TextureData.defaultIsNeedUpdate = 0;
}

var _initBufferData = (TextureData: any) => {
    var buffer: any = null,
        count = _getBufferCount(),
        size = Float32Array.BYTES_PER_ELEMENT * (getBufferDataSize() * 2) + Uint8Array.BYTES_PER_ELEMENT * (getBufferDataSize()) ,
        offset: number = null;

    buffer = createSharedArrayBufferOrArrayBuffer(count * size);

    offset = createTypeArrays(buffer, count, TextureData);

    _setDefaultTypeArrData(count, TextureData);

    TextureData.buffer = buffer;
}

var _getBufferCount = () => DataBufferConfig.textureDataBufferCount;

var _setDefaultTypeArrData = (count: number, TextureData: any) => {
    var width = TextureData.defaultWidth,
        height = TextureData.defaultHeight,
        isNeedUpdate = TextureData.defaultIsNeedUpdate;

    for (let i = 0; i < count; i++) {
        setWidth(i, width, TextureData);
        setHeight(i, height, TextureData);
        setIsNeedUpdate(i, isNeedUpdate, TextureData);

        //todo set more data
    }
}
