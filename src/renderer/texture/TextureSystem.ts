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
import { ImageArrayBufferIndexSizeData } from "../type/messageDataType";
import { getImageData } from "../utils/texture/textureUtils";
import { deleteVal } from "../../utils/objectUtils";

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

// export const initTextures = initTexturesUtils;

export var addNeedInitTextureIndexForWorker = null,
    initTextures = null,
    initTexture = null,
    setSource = null;

var _disposeGLTexture = null,
    _addDisposeDataForWorker = null;

if (isSupportRenderWorkerAndSharedArrayBuffer()) {
    //todo refactor: move to utils?
    initTextures = (gl: WebGLRenderingContext, TextureDataFromSystem: any) => {
        for (let i = 0; i < TextureDataFromSystem.index; i++) {
            initTexture(gl, i, TextureDataFromSystem);
        }
    }

    initTexture = (gl: WebGLRenderingContext, textureIndex, TextureData: any) => {
        addNeedInitTextureIndexForWorker(textureIndex, TextureData);
    }

    addNeedInitTextureIndexForWorker = (textureIndex:number, TextureData:any) => {
        TextureData.needInitedTextureIndexArr.push(textureIndex);
    }

    setSource = (textureIndex: number, source: any, TextureData: any) => {
        TextureData.sourceMap[textureIndex] = source;
        TextureData.needAddedSourceArr.push(source);
    }

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
    initTextures = initTexturesUtils;

    initTexture = initTextureUtils;

    addNeedInitTextureIndexForWorker = () => {
    }

    setSource = (textureIndex: number, source: any, TextureData: any) => {
        TextureData.sourceMap[textureIndex] = source;
    }

    _disposeGLTexture = (gl: WebGLRenderingContext, sourceIndex: number, lastComponentIndex: number, TextureCacheData: any, TextureData: any, GPUDetectData: any) => {
        disposeGLTexture(gl, sourceIndex, lastComponentIndex, TextureCacheData, TextureData, GPUDetectData);
    }

    _addDisposeDataForWorker = (sourceIndex: number, lastComponentIndex: number, TextureData: any) => {
    }
}

export const getDisposedTextureDataMap = (TextureData: any) => {
    return TextureData.disposedTextureDataMap;
}

export const hasDisposedTextureDataMap = (TextureData: any) => {
    return TextureData.disposedTextureDataMap.length > 0;
}

export const clearDisposedTextureDataMap = (TextureData: any) => {
    TextureData.disposedTextureDataMap = [];
}

export const getNeedInitedTextureDataArr = (TextureData: any) => {
    return TextureData.needInitedTextureIndexArr;
}

export const hasNeedInitTextureDataArr = (TextureData: any) => {
    return TextureData.needInitedTextureIndexArr.length > 0;
}

export const clearNeedInitTextureDataArr = (TextureData: any) => {
    TextureData.needInitedTextureIndexArr = [];
}

export const clearNeedAddedSourceArr = (TextureData: any) => {
    TextureData.needAddedSourceArr = [];
}

export const getNeedAddedSourceArr = (TextureData: any) => {
    return TextureData.needAddedSourceArr;
}

export const convertAllSourceMapToImageDataArr = (sourceMap:Array<HTMLImageElement>, DomQuery:any) => {
    var arr: Array<ImageArrayBufferIndexSizeData> = [];

    forEach(sourceMap, (source: HTMLImageElement, index: number) => {
        if (_isSourceNotExist(source)) {
            return;
        }

        let width = source.width,
            height = source.height;

        arr.push(
            {
                arrayBuffer: _getArrayBuffer(getImageData(source, width, height, DomQuery)),
                width: width,
                height: height,
                index: index
            }
        )
    })

    return arr;
}

export const convertNeedInitedSourceMapToImageDataArr = requireCheckFunc((sourceMap:Array<HTMLImageElement>, needInitedTextureDataArr:Array<number>, DomQuery:any) => {
    it("needInitedTextureDataArr should corresponding to sourceMap", () => {
        expect(needInitedTextureDataArr.length).equal(sourceMap.length);
    });
}, (sourceMap:Array<HTMLImageElement>, needInitedTextureDataArr:Array<number>, DomQuery:any) => {
    var arr: Array<ImageArrayBufferIndexSizeData> = [];

    forEach(sourceMap, (source: HTMLImageElement, index: number) => {
        if (_isSourceNotExist(source)) {
            return;
        }

        let width = source.width,
            height = source.height;

        arr.push(
            {
                arrayBuffer: _getArrayBuffer(getImageData(source, width, height, DomQuery)),
                width:width,
                height: height,
                index:needInitedTextureDataArr[index]
            }
        )
    })

    return arr;
})

const _getArrayBuffer = (imageData:ImageData) => imageData.data.buffer as ArrayBuffer;

export const getUniformSamplerNameMap = (TextureData: any) => {
    return TextureData.uniformSamplerNameMap;
}

const _isSourceNotExist =(source: HTMLImageElement) => isNotValidVal(source);

export const initData = (TextureCacheData: any, TextureData: any) => {
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
