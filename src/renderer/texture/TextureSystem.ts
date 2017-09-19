import {
    addActiveTexture, clearAllBindTextureUnitCache, initData as initTextureCacheData,
    isCached
} from "./TextureCacheSystem";
import { ensureFunc, it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { forEach, isNotValidVal } from "../../utils/arrayUtils";
import { Texture } from "./Texture";
import { deleteComponentBySwapArray, generateComponentIndex } from "../../component/ComponentSystem";
import { createSharedArrayBufferOrArrayBuffer } from "../../utils/arrayBufferUtils";
import {
    createTypeArrays, getWidth as getWidthUtils, getHeight as getHeightUtils,
    // getWrapS as getWrapSUtils,
    // getWrapT as getWrapTUtils,
    // getMagFilter as getMagFilterUtils,
    // getMinFilter as getMinFilterUtils,
    // getFormat as getFormatUtils,
    // getType as getTypeUtils,
    // getFlipY as getFlipYUtils,
    getBufferDataSize,
    markNeedUpdate as markNeedUpdateUtils,
    getIsNeedUpdate as getIsNeedUpdateUtils, getBufferCount,
    bindToUnit as bindToUnitUtils, initTexture as initTextureUtils, initTextures as initTexturesUtils, needUpdate as needUpdateUtils,
    update as updateUtils, disposeGLTexture, disposeSourceMap, getSource as getSourceUtils
} from "../utils/worker/render_file/texture/textureUtils";
import { computeBufferLength, deleteOneItemBySwapAndReset, setTypeArrayValue } from "../../utils/typeArrayUtils";
import { isSupportRenderWorkerAndSharedArrayBuffer } from "../../device/WorkerDetectSystem";
import { ImageSrcIndexData } from "../type/messageDataType";

export const create = ensureFunc((component: Texture) => {
    it("index should <= max count", () => {
        expect(component.index).lte(getBufferCount());
    });
}, (TextureData: any) => {
    var texture = new Texture(),
        index = generateComponentIndex(TextureData);

    texture.index = index;

    TextureData.textureMap[index] = texture;

    return texture;
})

export const getSource = getSourceUtils;

export const setSource = (textureIndex: number, source: any, TextureData: any) => {
    TextureData.sourceMap[textureIndex] = source;
}

export const getWidth = getWidthUtils;

export const setWidth = (textureIndex: number, value: any, TextureData: any) => {
    setTypeArrayValue(TextureData.widths, textureIndex, value);
}

export const getHeight = getHeightUtils;

export const setHeight = (textureIndex: number, value: any, TextureData: any) => {
    setTypeArrayValue(TextureData.heights, textureIndex, value);
}

export const getIsNeedUpdate = getIsNeedUpdateUtils;

export const setIsNeedUpdate = (textureIndex: number, value: number, TextureData: any) => {
    setTypeArrayValue(TextureData.isNeedUpdates, textureIndex, value);
}

export const markNeedUpdate = markNeedUpdateUtils;

//
// //todo add set methods
//
// export const getWrapS = getWrapSUtils;
//
// export const getWrapT = getWrapTUtils;
//
// export const getMagFilter = getMagFilterUtils;
//
// export const getMinFilter = getMinFilterUtils;
//
// export const getFormat = getFormatUtils;
//
// export const getType = getTypeUtils;
//
// export const getFlipY = getFlipYUtils;

export const setUniformSamplerName = (index: number, name: string, TextureData: any) => {
    TextureData.uniformSamplerNameMap[index] = name;
}

export const bindToUnit = (gl: WebGLRenderingContext, unitIndex: number, textureIndex: number, TextureCacheData: any, TextureData: any, GPUDetectData: any) => {
    bindToUnitUtils(gl, unitIndex, textureIndex, TextureCacheData, TextureData, GPUDetectData, isCached, addActiveTexture);
}
//
// const _getWebglTexture =(textureIndex:number, TextureData:any) => {
//     return TextureData.glTextures[textureIndex];
// }

export const initTextures = initTexturesUtils;

//todo fix worker
export const initTexture = initTextureUtils;

// export const initTexture = initTexture
//
// const _createWebglTexture =(gl:WebGLRenderingContext, textureIndex:number, TextureData:any) => {
//     var glTexture = _getWebglTexture(textureIndex, TextureData);
//
//     if(_isGLTextureExist(glTexture)){
//         return;
//     }
//
//     TextureData.glTextures[textureIndex] = gl.createTexture();
// }
//
// const _isGLTextureExist =(glTexture:WebGLTexture) => isValidVal(glTexture);

export const needUpdate = needUpdateUtils;

export const update = (gl: WebGLRenderingContext, textureIndex: number, TextureData: any) => {
    updateUtils(gl, textureIndex, _setFlipY, TextureData);
}

const _setFlipY =(gl: WebGLRenderingContext, flipY: boolean) => {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
}

export const dispose = (gl: WebGLRenderingContext, texture: Texture, TextureCacheData: any, TextureData: any, GPUDetectData: any) => {
    var bufferDataSize = getBufferDataSize(),
        sourceIndex = texture.index,
        lastComponentIndex: number = null;

    TextureData.index -= 1;

    lastComponentIndex = TextureData.index;

    deleteOneItemBySwapAndReset(sourceIndex * bufferDataSize, lastComponentIndex * bufferDataSize, TextureData.widths, TextureData.defaultWidth);
    deleteOneItemBySwapAndReset(sourceIndex * bufferDataSize, lastComponentIndex * bufferDataSize, TextureData.heights, TextureData.defaultHeight);
    deleteOneItemBySwapAndReset(sourceIndex * bufferDataSize, lastComponentIndex * bufferDataSize, TextureData.isNeedUpdates, TextureData.defaultIsNeedUpdate);

    disposeSourceMap(sourceIndex, lastComponentIndex, TextureData)

    deleteComponentBySwapArray(sourceIndex, lastComponentIndex, TextureData.textureMap);

    _disposeGLTexture(gl, sourceIndex, lastComponentIndex, TextureCacheData, TextureData, GPUDetectData);

    _addDisposeDataForWorker(sourceIndex, lastComponentIndex, TextureData);
}

var _disposeGLTexture =null,
    _addDisposeDataForWorker = null;

if (isSupportRenderWorkerAndSharedArrayBuffer()) {
    _disposeGLTexture = (...args) => {
    }

    _addDisposeDataForWorker = (sourceIndex: number, lastComponentIndex: number, TextureData: any) => {
        TextureData.disposedTextureDataMap.push(_buildDisposedTextureData(sourceIndex, lastComponentIndex));
    }

    const _buildDisposedTextureData =(sourceIndex: number, lastComponentIndex: number) => {
        return {
            sourceIndex: sourceIndex,
            lastComponentIndex: lastComponentIndex
        }
    }
}
else {
    _disposeGLTexture = (gl: WebGLRenderingContext, sourceIndex: number, lastComponentIndex: number, TextureCacheData: any, TextureData: any, GPUDetectData: any) => {
        disposeGLTexture(gl, sourceIndex, lastComponentIndex, TextureCacheData, TextureData, GPUDetectData);
    }

    _addDisposeDataForWorker = (sourceIndex: number, lastComponentIndex: number, TextureData: any) => {
    }
}

export const hasDisposedTextureDataMap = (TextureData: any) => {
    return TextureData.disposedTextureDataMap.length > 0;
}

export const clearDisposedTextureDataMap = (TextureData: any) => {
    TextureData.disposedTextureDataMap = [];
}

export const convertSourceMapToSrcIndexArr = (TextureData: any) => {
    var arr: Array<ImageSrcIndexData> = [];

    forEach(TextureData.sourceMap, (source: HTMLImageElement, index: number) => {
        if (_isSourceNotExist(source)) {
            return;
        }

        arr.push({
            src: source.src,
            index: index
        })
    })

    return arr;
}

export const getUniformSamplerNameMap = (TextureData: any) => {
    return TextureData.uniformSamplerNameMap;
}

const _isSourceNotExist =(source: HTMLImageElement) => isNotValidVal(source);

// export const convertSourceMapToImageDataArr = (sourceMap:Array<HTMLImageElement>) => {
//     var imageDataArr = [],
//         canvas = getCanvas(getState(DirectorData)),
//         canvasWidth = getCanvasWidth(canvas),
//         canvasHeight = getCanvasHeight(canvas);
//
//     for(let source of sourceMap){
//         imageDataArr.push(drawPartOfTextureByCanvas(source, canvasWidth, canvasHeight, 0, 0).getImageData(0, 0, canvasWidth, canvasHeight));
//     }
//
//     var a = createImageBitmap(imageDataArr[0]).then((data) => {
//         console.log(data)
//     })
//
//     return imageDataArr;
// }

export const initData = (TextureCacheData: any, TextureData: any) => {
    initTextureCacheData(TextureCacheData);

    TextureData.index = 0;

    TextureData.glTextures = [];
    TextureData.sourceMap = [];

    TextureData.textureMap = [];

    TextureData.uniformSamplerNameMap = [];

    TextureData.disposedTextureDataMap = [];

    _setDefaultData(TextureData);

    _initBufferData(TextureData);
}

const _setDefaultData =(TextureData: any) => {
    TextureData.defaultWidth = 0;
    TextureData.defaultHeight = 0;
    TextureData.defaultIsNeedUpdate = 0;
}

const _initBufferData =(TextureData: any) => {
    var buffer: any = null,
        count = getBufferCount(),
        size = Float32Array.BYTES_PER_ELEMENT * (getBufferDataSize() * 2) + Uint8Array.BYTES_PER_ELEMENT * (getBufferDataSize()),
        offset: number = null;

    buffer = createSharedArrayBufferOrArrayBuffer(computeBufferLength(count, size));

    offset = createTypeArrays(buffer, count, TextureData);

    _setDefaultTypeArrData(count, TextureData);

    TextureData.buffer = buffer;
}

const _setDefaultTypeArrData =(count: number, TextureData: any) => {
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
