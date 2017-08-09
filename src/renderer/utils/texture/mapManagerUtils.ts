import { expect } from "wonder-expect.js";
// import { isNotValidVal } from "../../utils/arrayUtils";
import { ensureFunc, it, requireCheckFunc } from "../../../definition/typescript/decorator/contract";
import { getBufferTotalCount } from "../material/bufferUtils";
import { UniformCacheMap, UniformLocationMap } from "../../type/dataType";
import { sendData as sendTextureData } from "./textureUtils";
import { SendUniformDataGLSLSenderDataMap } from "../../type/utilsType";
// import { initTextures } from "./textureUtils";
// import { Texture } from "../../texture/Texture";

// export var create = (MapManagerDataFromSystem:any) => {
//     var mapManager = new MapManager(),
//         index = generateComponentIndex(MapManagerDataFromSystem);
//
//     mapManager.index = index;
//
//     return mapManager;
// }

// export var initMapManagers = (gl:WebGLRenderingContext, TextureDataFromSystem:any) => {
//     initTextures(gl, TextureDataFromSystem);
// }

// export var getMap = requireCheckFunc((materialIndex: number, MapManagerDataFromSystem:any) => {
//     it("map list should exist", () => {
//         expect(getMapList(materialIndex, MapManagerDataFromSystem)).exist;
//     })
// }, (materialIndex: number, MapManagerDataFromSystem:any) => {
//     return getMapList(materialIndex, MapManagerDataFromSystem)[0];
// })
//
// export var addMap = (materialIndex: number, map: Texture, MapManagerDataFromSystem:any) => {
//     var textureArr = MapManagerDataFromSystem.textureMap[materialIndex];
//
//     if(isNotValidVal(textureArr)){
//         textureArr = [map];
//
//         MapManagerDataFromSystem.textureMap[materialIndex] = textureArr;
//     }
//     else{
//         textureArr.push(map);
//     }
// }
//
// export var getMapList = ensureFunc((mapList:Array<Texture>, materialIndex: number, MapManagerDataFromSystem:any) => {
//     it("only support max texture count <= 1", () => {
//         if(_isMapListNotExist(mapList)){
//             return;
//         }
//
//         expect(mapList.length).lte(1);
//     });
// }, (materialIndex: number, MapManagerDataFromSystem:any) => {
//     return MapManagerDataFromSystem.textureMap[materialIndex];
// })
//
// export var getMapCount = (materialIndex: number, MapManagerDataFromSystem:any) => {
//     var mapList = getMapList(materialIndex, MapManagerDataFromSystem);
//
//     if(_isMapListNotExist(mapList)){
//         return 0;
//     }
//
//     return mapList.length;
// }
//
// var _isMapListNotExist = (mapList:Array<Texture>) => isNotValidVal(mapList);

//todo support multi textures

// export var addMapList = (materialIndex: number, mapList: Array<Texture>, MapManagerDataFromSystem:any) => {
//     for(let map of mapList){
//         addMap(materialIndex, map, MapManagerDataFromSystem);
//     }
// }

export var getTextureIndexDataSize = () => 1;

export var getTextureCountDataSize = () => 1;

export var bindAndUpdate = (gl: WebGLRenderingContext, mapCount: number, startIndex:number, TextureCacheDataFromSystem: any, TextureDataFromSystem: any, MapManagerDataFromSystem: any, bindToUnit: Function, needUpdate: Function, update: Function) => {
    // var count = getMapCount(materialIndex, MapManagerDataFromSystem),
    var textureIndices = MapManagerDataFromSystem.textureIndices;

    for (let i = 0; i < mapCount; i++) {
        let textureIndex = textureIndices[i];

        bindToUnit(gl, i + startIndex, textureIndex, TextureCacheDataFromSystem, TextureDataFromSystem);

        if (needUpdate(textureIndex, TextureDataFromSystem)) {
            update(gl, textureIndex, TextureDataFromSystem);
        }
    }
}

export var sendData = (gl: WebGLRenderingContext, mapCount: number, startIndex:number, shaderIndex: number, program: WebGLProgram, glslSenderData: SendUniformDataGLSLSenderDataMap, uniformLocationMap: UniformLocationMap, uniformCacheMap: UniformCacheMap, directlySendUniformData: Function, TextureData: any, MapManagerData: any) => {
    var textureIndices = MapManagerData.textureIndices;

    for (let i = 0; i < mapCount; i++) {
        let textureIndex = textureIndices[i];

        sendTextureData(gl, mapCount, shaderIndex, textureIndex, i + startIndex, program, glslSenderData, uniformLocationMap, uniformCacheMap, directlySendUniformData, TextureData);
    }
}

export var getMapCount = (materialIndex: number, MapManagerDataFromSystem: any) => {
    return MapManagerDataFromSystem.textureCounts[materialIndex];
}

// export var initData = (TextureCacheDataFromSystem:any, TextureDataFromSystem:any, MapManagerDataFromSystem:any) => {
//     initTextureDataFromSystem(TextureCacheDataFromSystem, TextureDataFromSystem);
//
//     // MapManagerDataFromSystem.textureMap = [];
// }

export var getBufferCount = () => getBufferTotalCount() * getMaxTextureCount();

/*!
 //todo should be GPUDetector.getInstance().maxTextureUnit!
 but in render worker version:
 because MapManagerSystem->initData use it, so render worker should send maxTextureUnit to main worker and then Main should MapManagerSystem->initData!
 */
export var getMaxTextureCount = () => 16;

export var createTypeArrays = (buffer: any, count: number, MapManagerDataFromSystem: any) => {
    var offset = 0;

    MapManagerDataFromSystem.textureIndices = new Uint32Array(buffer, offset, count * getTextureIndexDataSize());
    offset += count * Uint32Array.BYTES_PER_ELEMENT * getTextureIndexDataSize();

    MapManagerDataFromSystem.textureCounts = new Uint8Array(buffer, offset, count * getTextureCountDataSize());
    offset += count * Uint8Array.BYTES_PER_ELEMENT * getTextureCountDataSize();

    return offset;
}

