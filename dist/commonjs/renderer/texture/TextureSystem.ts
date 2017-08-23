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
    getBufferDataSize, getIsNeedUpdate as getIsNeedUpdateUtils, getBufferCount,
    bindToUnit as bindToUnitUtils, initTextures as initTexturesUtils, needUpdate as needUpdateUtils,
    update as updateUtils, disposeGLTexture, disposeSourceMap, getSource as getSourceUtils
} from "../utils/worker/render_file/texture/textureUtils";
import { computeBufferLength, deleteOneItemBySwapAndReset, setTypeArrayValue } from "../../utils/typeArrayUtils";
import { isSupportRenderWorkerAndSharedArrayBuffer } from "../../device/WorkerDetectSystem";
import { ImageSrcIndexData } from "../type/messageDataType";

export var create = ensureFunc((component: Texture) => {
    it("index should <= max count", () => {
        expect(component.index).lt(getBufferCount());
    });
}, (TextureData: any) => {
    var texture = new Texture(),
        index = generateComponentIndex(TextureData);

    texture.index = index;

    TextureData.textureMap[index] = texture;

    return texture;
})

export var getSource = getSourceUtils;

export var setSource = (textureIndex: number, source: any, TextureData: any) => {
    TextureData.sourceMap[textureIndex] = source;
}

export var getWidth = getWidthUtils;

export var setWidth = (textureIndex: number, value: any, TextureData: any) => {
    setTypeArrayValue(TextureData.widths, textureIndex, value);
}

export var getHeight = getHeightUtils;

export var setHeight = (textureIndex: number, value: any, TextureData: any) => {
    setTypeArrayValue(TextureData.heights, textureIndex, value);
}

export var getIsNeedUpdate = getIsNeedUpdateUtils;

export var setIsNeedUpdate = (textureIndex: number, value: number, TextureData: any) => {
    setTypeArrayValue(TextureData.isNeedUpdates, textureIndex, value);
}
//
// //todo add set methods
//
// export var getWrapS = getWrapSUtils;
//
// export var getWrapT = getWrapTUtils;
//
// export var getMagFilter = getMagFilterUtils;
//
// export var getMinFilter = getMinFilterUtils;
//
// export var getFormat = getFormatUtils;
//
// export var getType = getTypeUtils;
//
// export var getFlipY = getFlipYUtils;

export var setUniformSamplerName = (index: number, name: string, TextureData: any) => {
    TextureData.uniformSamplerNameMap[index] = name;
}

export var bindToUnit = (gl: WebGLRenderingContext, unitIndex: number, textureIndex: number, TextureCacheData: any, TextureData: any, GPUDetectData:any) => {
    bindToUnitUtils(gl, unitIndex, textureIndex, TextureCacheData, TextureData, GPUDetectData, isCached, addActiveTexture);
}
//
// var _getWebglTexture = (textureIndex:number, TextureData:any) => {
//     return TextureData.glTextures[textureIndex];
// }

export var initTextures = initTexturesUtils;

// export var initTexture = initTexture
//
// var _createWebglTexture = (gl:WebGLRenderingContext, textureIndex:number, TextureData:any) => {
//     var glTexture = _getWebglTexture(textureIndex, TextureData);
//
//     if(_isGLTextureExist(glTexture)){
//         return;
//     }
//
//     TextureData.glTextures[textureIndex] = gl.createTexture();
// }
//
// var _isGLTextureExist = (glTexture:WebGLTexture) => isValidVal(glTexture);

export var needUpdate = needUpdateUtils;

export var update = (gl: WebGLRenderingContext, textureIndex: number, TextureData: any) => {
    updateUtils(gl, textureIndex, _setFlipY, TextureData);
}

var _setFlipY = (gl: WebGLRenderingContext, flipY: boolean) => {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
}

export var dispose = (gl: WebGLRenderingContext, texture: Texture, TextureCacheData: any, TextureData: any, GPUDetectData:any) => {
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

var _disposeGLTexture = null,
    _addDisposeDataForWorker = null;

if (isSupportRenderWorkerAndSharedArrayBuffer()) {
    _disposeGLTexture = (...args) => {
    }

    _addDisposeDataForWorker = (sourceIndex: number, lastComponentIndex: number, TextureData: any) => {
        TextureData.disposedTextureDataMap.push(_buildDisposedTextureData(sourceIndex, lastComponentIndex));
    }

    var _buildDisposedTextureData = (sourceIndex: number, lastComponentIndex: number) => {
        return {
            sourceIndex: sourceIndex,
            lastComponentIndex: lastComponentIndex
        }
    }
}
else {
    _disposeGLTexture = (gl: WebGLRenderingContext, sourceIndex: number, lastComponentIndex: number, TextureCacheData: any, TextureData: any, GPUDetectData:any) => {
        disposeGLTexture(gl, sourceIndex, lastComponentIndex, TextureCacheData, TextureData, GPUDetectData);
    }

    _addDisposeDataForWorker = (sourceIndex: number, lastComponentIndex: number, TextureData: any) => {
    }
}

export var hasDisposedTextureDataMap = (TextureData: any) => {
    return TextureData.disposedTextureDataMap.length > 0;
}

export var clearDisposedTextureDataMap = (TextureData: any) => {
    TextureData.disposedTextureDataMap = [];
}

export var convertSourceMapToSrcIndexArr = (TextureData: any) => {
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

export var getUniformSamplerNameMap = (TextureData: any) => {
    return TextureData.uniformSamplerNameMap;
}

var _isSourceNotExist = (source: HTMLImageElement) => isNotValidVal(source);

// export var convertSourceMapToImageDataArr = (sourceMap:Array<HTMLImageElement>) => {
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

export var initData = (TextureCacheData: any, TextureData: any) => {
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

var _setDefaultData = (TextureData: any) => {
    TextureData.defaultWidth = 0;
    TextureData.defaultHeight = 0;
    TextureData.defaultIsNeedUpdate = 0;
}

var _initBufferData = (TextureData: any) => {
    var buffer: any = null,
        count = getBufferCount(),
        size = Float32Array.BYTES_PER_ELEMENT * (getBufferDataSize() * 2) + Uint8Array.BYTES_PER_ELEMENT * (getBufferDataSize()),
        offset: number = null;

    buffer = createSharedArrayBufferOrArrayBuffer(computeBufferLength(count, size));

    offset = createTypeArrays(buffer, count, TextureData);

    _setDefaultTypeArrData(count, TextureData);

    TextureData.buffer = buffer;
}

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
