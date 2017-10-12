import {
    addActiveTexture, initData as initTextureCacheData, isCached
} from "./TextureCacheWorkerSystem";
import {
    createTypeArrays, getBufferCount,
    initTextures as initTexturesUtils, needUpdate as needUpdateUtils, update as updateUtils,
    bindToUnit as bindToUnitUtils, disposeSourceMap, disposeGLTexture, getFlipY, initTexture
} from "../../../utils/worker/render_file/texture/textureUtils";
import { ImageArrayBufferIndexSizeData, TextureDisposeWorkerData } from "../../../type/messageDataType";
import { fromArray, fromPromise } from "wonder-frp/dist/commonjs/global/Operator";
import { firefox, chrome } from "bowser";
import { forEach, hasDuplicateItems } from "../../../../utils/arrayUtils";
import { ensureFunc, it } from "../../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";

export const bindToUnit = (gl: WebGLRenderingContext, unitIndex: number, textureIndex: number, TextureCacheWorkerData: any, TextureWorkerData: any, GPUDetectWorkerData: any) => {
    bindToUnitUtils(gl, unitIndex, textureIndex, TextureCacheWorkerData, TextureWorkerData, GPUDetectWorkerData, isCached, addActiveTexture);
}

export const initTextures = initTexturesUtils;

export const initNeedInitTextures = (gl:WebGLRenderingContext, needInitedTextureIndexArr:Array<number>, TextureWorkerData:any) => {
    forEach(needInitedTextureIndexArr, (textureIndex:number) => {
        initTexture(gl, textureIndex, TextureWorkerData);
    });
}

export const needUpdate = needUpdateUtils;

export const update = (gl: WebGLRenderingContext, textureIndex: number, TextureWorkerData: any) => {
    updateUtils(gl, textureIndex, _setFlipY, TextureWorkerData);
}

var _setFlipY =null;

if (chrome) {
    _setFlipY = (gl: WebGLRenderingContext, flipY: boolean) => {
        /*!
         not worker in render worker! set it when createImageBitmap
         //gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
         */
    }
}
else if (firefox) {
    _setFlipY = (gl: WebGLRenderingContext, flipY: boolean) => {
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
    }
}

export const disposeSourceAndGLTexture = (disposeData: TextureDisposeWorkerData, gl: WebGLRenderingContext, TextureCacheWorkerData: any, TextureWorkerData: any, GPUDetectWorkerData: any) => {
    for (let {
        sourceIndex,
        lastComponentIndex
    } of disposeData.disposedTextureDataMap) {
        disposeSourceMap(sourceIndex, lastComponentIndex, TextureWorkerData);
        disposeGLTexture(gl, sourceIndex, lastComponentIndex, TextureCacheWorkerData, TextureWorkerData, GPUDetectWorkerData);
    }
}

export const setIndex = (index: number, TextureWorkerData: any) => {
    TextureWorkerData.index = index;
}

export const setUniformSamplerNameMap = (uniformSamplerNameMap: Array<string>, TextureWorkerData: any) => {
    TextureWorkerData.uniformSamplerNameMap = uniformSamplerNameMap;
}

export const addSourceMapByImageDataStream = (imageArrayBufferIndexSizeDataArr: Array<ImageArrayBufferIndexSizeData>, TextureWorkerData: any) => {
    return _convertImageSrcToImageBitmapStream(imageArrayBufferIndexSizeDataArr, TextureWorkerData)
    /*!
    .do here not be triggered! but it's triggered if be moved to 100 line number! why? wonder-frp bug?
    */
        // .do((imageBitmap: ImageBitmap) => {
            // _addSource(imageBitmap, TextureWorkerData);
        // });
}

const _addSource = ensureFunc((sourceMap:Array<ImageBitmap>, imageBitmap:ImageBitmap, TextureWorkerData:any) => {
    it("should not has duplicate one", () => {
        expect(hasDuplicateItems(sourceMap)).false;
    });
    it("sourceMap.length should equal texture count", () => {
        expect(sourceMap.length).equal(TextureWorkerData.index);
    });
}, (imageBitmap:ImageBitmap, TextureWorkerData:any) => {
    TextureWorkerData.sourceMap.push(imageBitmap);

    return TextureWorkerData.sourceMap;
})

const _convertImageSrcToImageBitmapStream =(imageArrayBufferIndexSizeDataArr: Array<ImageArrayBufferIndexSizeData>, TextureWorkerData: any) => {
    return fromArray(imageArrayBufferIndexSizeDataArr)
        .flatMap(({ arrayBuffer, width, height, index }) => {
            return fromPromise(_createImageBitmap(new ImageData(new Uint8ClampedArray(arrayBuffer), width, height), index, TextureWorkerData))
                .do((imageBitmap: ImageBitmap) => {
                    _addSource(imageBitmap, TextureWorkerData);
                });
        });
}

var _createImageBitmap = null;

if (chrome) {
    _createImageBitmap = (imageData:ImageData, index:number, TextureWorkerData:any) => {
        var flipY = getFlipY(index, TextureWorkerData);

        return createImageBitmap(imageData, {
            imageOrientation: flipY === true ? "flipY" : "none"
        });
    }
}
else if (firefox) {
    _createImageBitmap = (imageData:ImageData, index:number, TextureWorkerData:any) => {
        /*!
        firefox not support options
         */
        return createImageBitmap(imageData);
    }
}

export const initData = (buffer: any, TextureCacheWorkerData: any, TextureWorkerData: any) => {
    initTextureCacheData(TextureCacheWorkerData);

    TextureWorkerData.index = 0;

    TextureWorkerData.glTextures = [];

    TextureWorkerData.sourceMap = [];

    _initBufferWorkerData(buffer, TextureWorkerData);
}

const _initBufferWorkerData =(buffer: any, TextureWorkerData: any) => {
    createTypeArrays(buffer, getBufferCount(), TextureWorkerData);
}

