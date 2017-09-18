import { TextureInitWorkerData } from "../../../type/messageDataType";
import {
    bindAndUpdate as bindAndUpdateUtils, createTypeArrays, getBufferCount,
    getMapCount as getMapCountUtils
} from "../../../utils/worker/render_file/texture/mapManagerUtils";
import { bindToUnit, initData as initTextureData, initTextures, needUpdate, update } from "./TextureWorkerSystem";

//todo fix

export const initMapManagers = (gl: WebGLRenderingContext, TextureWorkerData: any) => {
    initTextures(gl, TextureWorkerData);
}

export const getMapCount = (materialIndex: number, MapManagerWorkerData: any) => {
    var textureCounts = MapManagerWorkerData.textureCounts;

    if (textureCounts === null) {
        return 0;
    }

    return textureCounts[materialIndex];
}

//todo support multi textures

// export const addMapList = (materialIndex: number, mapList: Array<Texture>, MapManagerData:any) => {
//     for(let map of mapList){
//         addMap(materialIndex, map, MapManagerData);
//     }
// }

export const bindAndUpdate = (gl: WebGLRenderingContext, mapCount: number, startIndex: number, TextureCacheWorkerData: any, TextureWorkerData: any, MapManagerWorkerData: any, GPUDetectWorkerData: any) => {
    bindAndUpdateUtils(gl, mapCount, startIndex, TextureCacheWorkerData, TextureWorkerData, MapManagerWorkerData, GPUDetectWorkerData, bindToUnit, needUpdate, update);
}

// export const dispose = disposeUtils;

export const initData = (textureData: TextureInitWorkerData, TextureCacheWorkerData: any, TextureWorkerData: any, MapManagerWorkerData: any) => {
    initTextureData(textureData.textureBuffer, TextureCacheWorkerData, TextureWorkerData);

    _initBufferData(textureData.mapManagerBuffer, MapManagerWorkerData);
}

const _initBufferData =(buffer: any, MapManagerWorkerData: any) => {
    createTypeArrays(buffer, getBufferCount(), MapManagerWorkerData);
}

