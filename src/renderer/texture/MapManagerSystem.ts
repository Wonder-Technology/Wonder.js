import { it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { Texture } from "./Texture";
import {
    bindAndUpdate as bindAndUpdateUtils,
    createTypeArrays, getBufferCount, getMapCount as getMapCountUtils, getMaxTextureCount
} from "../utils/texture/mapManagerUtils";
import {
    bindToUnit, initData as initTextureData, initTextures, needUpdate, setUniformSamplerName,
    update
} from "./TextureSystem";
import { createSharedArrayBufferOrArrayBuffer } from "../../utils/arrayBufferUtils";
import { computeBufferLength, deleteSingleValueBySwapAndReset } from "../../utils/typeArrayUtils";

// export var create = (MapManagerData:any) => {
//     var mapManager = new MapManager(),
//         index = generateComponentIndex(MapManagerData);
//
//     mapManager.index = index;
//
//     return mapManager;
// }

export var initMapManagers = (gl:WebGLRenderingContext, TextureData:any) => {
    initTextures(gl, TextureData);
}

export var getMapIndex = (materialIndex: number, MapManagerData:any) => {
    return MapManagerData.textureIndices[materialIndex];
}

export var addMap = requireCheckFunc((materialIndex: number, map: Texture, count:number, uniformSamplerName:string, MapManagerData:any, TextureData:any) => {
    it("map count shouldn't exceed max count", () => {
        expect(count + 1).lte(getMaxTextureCount());
    });
}, (materialIndex: number, map: Texture, count:number, uniformSamplerName:string, MapManagerData:any, TextureData:any) => {
    var textureIndex = map.index;

    MapManagerData.textureIndices[materialIndex + count] = textureIndex;

    MapManagerData.textureCounts[materialIndex] = count + 1;

    setUniformSamplerName(textureIndex, uniformSamplerName, TextureData);
})

export var getMapCount = getMapCountUtils;

//todo support multi textures

// export var addMapList = (materialIndex: number, mapList: Array<Texture>, MapManagerData:any) => {
//     for(let map of mapList){
//         addMap(materialIndex, map, MapManagerData);
//     }
// }

export var bindAndUpdate = (gl:WebGLRenderingContext, mapCount:number, TextureCacheData:any, TextureData:any, MapManagerData:any) => {
    bindAndUpdateUtils(gl, mapCount, TextureCacheData, TextureData, MapManagerData, bindToUnit, needUpdate, update);
}

/*!
 not dispose texture when dispose map manager(dispose material)!
 because different materials may use same texture, if dispose one material's texture which is shared, then will affect other materials!

 so need user mannually dispose texture one by one!
 */
export var dispose = (materialSourceIndex: number, materialLastComponentIndex:number, MapManagerData:any) => {
    deleteSingleValueBySwapAndReset(materialSourceIndex, materialLastComponentIndex, MapManagerData.textureCounts, 0);
}

export var initData = (TextureCacheData:any, TextureData:any, MapManagerData:any) => {
    initTextureData(TextureCacheData, TextureData);

    _initBufferData(MapManagerData);
}

var _initBufferData = (MapManagerData: any) => {
    var buffer: any = null,
        count = getBufferCount(),
        size = Float32Array.BYTES_PER_ELEMENT + Uint8Array.BYTES_PER_ELEMENT,
        offset: number = null;

    buffer = createSharedArrayBufferOrArrayBuffer(computeBufferLength(count, size));

    offset = createTypeArrays(buffer, count, MapManagerData);

    _setDefaultTypeArrData(count, MapManagerData);

    MapManagerData.buffer = buffer;
}

var _setDefaultTypeArrData = (count:number, MapManagerData:any) => {
}
