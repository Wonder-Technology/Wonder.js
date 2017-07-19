import "wonder-frp/dist/es2015/stream/MapStream";
import "wonder-frp/dist/es2015/stream/DoStream";
import {
    addActiveTexture, initData as initTextureCacheData, isCached
} from "./TextureCacheWorkerSystem";
import {
    createTypeArrays, getBufferCount,
    initTextures as initTexturesUtils, needUpdate as needUpdateUtils, update as updateUtils,
    bindToUnit as bindToUnitUtils, disposeSourceMap, disposeGLTexture
} from "../../../utils/texture/textureUtils";
import { TextureDisposeWorkerData } from "../../../type/messageDataType";
import { fromArray, fromPromise } from "wonder-frp/dist/es2015/global/Operator";

// export var setSourceMap = (sourceMap:Array<HTMLImageElement>, TextureWorkerData:any) => {
//     TextureWorkerData.sourceMap = sourceMap;
// }

export var bindToUnit = (gl:WebGLRenderingContext, unitIndex: number, textureIndex:number, TextureCacheWorkerData:any, TextureWorkerData:any) => {
    bindToUnitUtils(gl, unitIndex, textureIndex, TextureCacheWorkerData, TextureWorkerData, isCached, addActiveTexture);
}

export var initTextures = initTexturesUtils;

export var needUpdate = needUpdateUtils;

export var update = updateUtils;

//todo test
export var disposeSourceAndGLTexture = (disposeData:TextureDisposeWorkerData, gl:WebGLRenderingContext, TextureCacheWorkerData:any, TextureWorkerData:any) => {
    for (let {
        sourceIndex,
        lastComponentIndex
    } of disposeData.disposedTextureDataMap) {
        disposeSourceMap(sourceIndex, lastComponentIndex, TextureWorkerData);
        disposeGLTexture(gl, sourceIndex, lastComponentIndex, TextureCacheWorkerData, TextureWorkerData);
    }
}

export var setIndex = (index:number, TextureWorkerData:any) => {
    TextureWorkerData.index = index;
}

export var setSourceMapByImageSrcArrStream = (imageSrcArr:Array<string>, TextureWorkerData:any) => {
    return _convertImageSrcToImageBitmapStream(imageSrcArr)
        .do((imageBitmap:ImageBitmap) => {
            TextureWorkerData.sourceMap.push(imageBitmap)
        });
}

var _convertImageSrcToImageBitmapStream = (imageSrcArr:Array<string>) => {
    // return fromArray([imageDataArr]).flatMap(_convertImageDataArrToImageBitmap);

    return fromArray(imageSrcArr).flatMap((src:string) => {
        return fromPromise(fetch(src))
            .flatMap((response:any) => {
                return fromPromise(response.blob());
            })
            .flatMap((blob:Blob) => {
                return fromPromise(createImageBitmap(blob))
            });
    });
}

// export var convertImageDataArrToSourceMapStream = (imageDataArr:Array<any>) => {
//     // return fromArray([imageDataArr]).flatMap(_convertImageDataArrToImageBitmap);
// }

// var _convertImageDataArrToImageBitmap = (imageData:any) => {
//     return fromPromise(createImageBitmap(imageData));
// }

export var initData = (buffer:any, TextureCacheWorkerData:any, TextureWorkerData:any) => {
    initTextureCacheData(TextureCacheWorkerData);

    TextureWorkerData.glTextures = [];

    TextureWorkerData.sourceMap = [];

    _initBufferWorkerData(buffer, TextureWorkerData);
}

var _initBufferWorkerData = (buffer:any, TextureWorkerData: any) => {
    createTypeArrays(buffer, getBufferCount(), TextureWorkerData);
}

