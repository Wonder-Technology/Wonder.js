import { TextureInitWorkerData } from "../../../type/messageDataType";
import {
    bindAndUpdate as bindAndUpdateUtils, createTypeArrays, getBufferCount,
    getMapCount as getMapCountUtils
} from "../../../utils/texture/mapManagerUtils";
import { bindToUnit, initData as initTextureData, initTextures, needUpdate, update } from "./TextureWorkerSystem";

export var initMapManagers = (gl: WebGLRenderingContext, TextureWorkerData: any) => {
    initTextures(gl, TextureWorkerData);
}

export var getMapCount = (materialIndex: number, MapManagerWorkerData: any) => {
    var textureCounts = MapManagerWorkerData.textureCounts;

    if (textureCounts === null) {
        return 0;
    }

    return textureCounts[materialIndex];
}

//todo support multi textures

// export var addMapList = (materialIndex: number, mapList: Array<Texture>, MapManagerData:any) => {
//     for(let map of mapList){
//         addMap(materialIndex, map, MapManagerData);
//     }
// }

export var bindAndUpdate = (gl: WebGLRenderingContext, mapCount: number, startIndex:number, TextureCacheWorkerData: any, TextureWorkerData: any, MapManagerWorkerData: any) => {
    bindAndUpdateUtils(gl, mapCount, startIndex, TextureCacheWorkerData, TextureWorkerData, MapManagerWorkerData, bindToUnit, needUpdate, update);
}

// export var dispose = disposeUtils;

export var initData = (textureData: TextureInitWorkerData, TextureCacheWorkerData: any, TextureWorkerData: any, MapManagerWorkerData: any) => {
    initTextureData(textureData.textureBuffer, TextureCacheWorkerData, TextureWorkerData);

    _initBufferData(textureData.mapManagerBuffer, MapManagerWorkerData);
}

var _initBufferData = (buffer: any, MapManagerWorkerData: any) => {
    createTypeArrays(buffer, getBufferCount(), MapManagerWorkerData);
}

