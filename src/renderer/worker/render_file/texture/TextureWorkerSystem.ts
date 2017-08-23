import {
    addActiveTexture, initData as initTextureCacheData, isCached
} from "./TextureCacheWorkerSystem";
import {
    createTypeArrays, getBufferCount,
    initTextures as initTexturesUtils, needUpdate as needUpdateUtils, update as updateUtils,
    bindToUnit as bindToUnitUtils, disposeSourceMap, disposeGLTexture, getFlipY
} from "../../../utils/worker/render_file/texture/textureUtils";
import { ImageSrcIndexData, TextureDisposeWorkerData } from "../../../type/messageDataType";
import { fromArray, fromPromise } from "wonder-frp/dist/es2015/global/Operator";
import { firefox, chrome } from "bowser";

export var bindToUnit = (gl: WebGLRenderingContext, unitIndex: number, textureIndex: number, TextureCacheWorkerData: any, TextureWorkerData: any, GPUDetectWorkerData: any) => {
    bindToUnitUtils(gl, unitIndex, textureIndex, TextureCacheWorkerData, TextureWorkerData, GPUDetectWorkerData, isCached, addActiveTexture);
}

export var initTextures = initTexturesUtils;

export var needUpdate = needUpdateUtils;

export var update = (gl: WebGLRenderingContext, textureIndex: number, TextureWorkerData: any) => {
    updateUtils(gl, textureIndex, _setFlipY, TextureWorkerData);
}
var _setFlipY = null;

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

export var disposeSourceAndGLTexture = (disposeData: TextureDisposeWorkerData, gl: WebGLRenderingContext, TextureCacheWorkerData: any, TextureWorkerData: any, GPUDetectWorkerData: any) => {
    for (let {
        sourceIndex,
        lastComponentIndex
    } of disposeData.disposedTextureDataMap) {
        disposeSourceMap(sourceIndex, lastComponentIndex, TextureWorkerData);
        disposeGLTexture(gl, sourceIndex, lastComponentIndex, TextureCacheWorkerData, TextureWorkerData, GPUDetectWorkerData);
    }
}

export var setIndex = (index: number, TextureWorkerData: any) => {
    TextureWorkerData.index = index;
}

export var setUniformSamplerNameMap = (uniformSamplerNameMap: Array<string>, TextureWorkerData: any) => {
    TextureWorkerData.uniformSamplerNameMap = uniformSamplerNameMap;
}

export var setSourceMapByImageSrcArrStream = (imageSrcIndexArr: Array<ImageSrcIndexData>, TextureWorkerData: any) => {
    return _convertImageSrcToImageBitmapStream(imageSrcIndexArr, TextureWorkerData)
        .do((imageBitmap: ImageBitmap) => {
            TextureWorkerData.sourceMap.push(imageBitmap)
        });
}

var _convertImageSrcToImageBitmapStream = (imageSrcIndexArr: Array<ImageSrcIndexData>, TextureWorkerData: any) => {
    return fromArray(imageSrcIndexArr).flatMap(({ src, index }) => {
        return fromPromise(fetch(src))
            .flatMap((response: any) => {
                return fromPromise(response.blob());
            })
            .flatMap((blob: Blob) => {
                var flipY = getFlipY(index, TextureWorkerData);

                return fromPromise(_createImageBitmap(blob, {
                    imageOrientation: flipY === true ? "flipY" : "none"
                }));
            });
    });
}

var _createImageBitmap = null;

if (chrome) {
    _createImageBitmap = (blob: Blob, options: any) => {
        return createImageBitmap(blob, options);
    }
}
else if (firefox) {
    _createImageBitmap = (blob: Blob, options: any) => {
        /*!
        firefox not support options
         */
        return createImageBitmap(blob);
    }
}

export var initData = (buffer: any, TextureCacheWorkerData: any, TextureWorkerData: any) => {
    initTextureCacheData(TextureCacheWorkerData);

    TextureWorkerData.index = 0;

    TextureWorkerData.glTextures = [];

    TextureWorkerData.sourceMap = [];

    _initBufferWorkerData(buffer, TextureWorkerData);
}

var _initBufferWorkerData = (buffer: any, TextureWorkerData: any) => {
    createTypeArrays(buffer, getBufferCount(), TextureWorkerData);
}

