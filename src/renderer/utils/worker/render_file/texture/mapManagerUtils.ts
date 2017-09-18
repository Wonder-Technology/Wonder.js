import { SendUniformDataGLSLSenderDataMap } from "../../../../type/utilsType";
import { UniformCacheMap, UniformLocationMap } from "../../../../type/dataType";
import { sendData as sendTextureData } from "./textureUtils";
import { getBufferTotalCount } from "../material/bufferUtils";

//todo support multi textures

// export const addMapList = (materialIndex: number, mapList: Array<Texture>, MapManagerDataFromSystem:any) => {
//     for(let map of mapList){
//         addMap(materialIndex, map, MapManagerDataFromSystem);
//     }
// }

export const getTextureIndexDataSize = () => 1;

export const getTextureCountDataSize = () => 1;

export const bindAndUpdate = (gl: WebGLRenderingContext, mapCount: number, startIndex: number, TextureCacheDataFromSystem: any, TextureDataFromSystem: any, MapManagerDataFromSystem: any, GPUDetectDataFromSystem: any, bindToUnit: Function, needUpdate: Function, update: Function) => {
    // var count = getMapCount(materialIndex, MapManagerDataFromSystem),
    var textureIndices = MapManagerDataFromSystem.textureIndices;

    for (let i = 0; i < mapCount; i++) {
        let textureIndex = textureIndices[i];

        bindToUnit(gl, i + startIndex, textureIndex, TextureCacheDataFromSystem, TextureDataFromSystem, GPUDetectDataFromSystem);

        if (needUpdate(textureIndex, TextureDataFromSystem)) {
            update(gl, textureIndex, TextureDataFromSystem);
        }
    }
}

export const sendData = (gl: WebGLRenderingContext, mapCount: number, startIndex: number, shaderIndex: number, program: WebGLProgram, glslSenderData: SendUniformDataGLSLSenderDataMap, uniformLocationMap: UniformLocationMap, uniformCacheMap: UniformCacheMap, directlySendUniformData: Function, TextureData: any, MapManagerData: any) => {
    var textureIndices = MapManagerData.textureIndices;

    for (let i = 0; i < mapCount; i++) {
        let textureIndex = textureIndices[i];

        sendTextureData(gl, mapCount, shaderIndex, textureIndex, i + startIndex, program, glslSenderData, uniformLocationMap, uniformCacheMap, directlySendUniformData, TextureData);
    }
}

export const getMapCount = (materialIndex: number, MapManagerDataFromSystem: any) => {
    return MapManagerDataFromSystem.textureCounts[materialIndex];
}

// export const initData = (TextureCacheDataFromSystem:any, TextureDataFromSystem:any, MapManagerDataFromSystem:any) => {
//     initTextureDataFromSystem(TextureCacheDataFromSystem, TextureDataFromSystem);
//
//     // MapManagerDataFromSystem.textureMap = [];
// }

export const getBufferCount = () => getBufferTotalCount() * getMaxTextureCount();

/*!
 //todo should be GPUDetector.getInstance().maxTextureUnit!
 but in render worker version:
 because MapManagerSystem->initData use it, so render worker should send maxTextureUnit to main worker and then Main should MapManagerSystem->initData!
 */
export const getMaxTextureCount = () => 16;

export const createTypeArrays = (buffer: any, count: number, MapManagerDataFromSystem: any) => {
    var offset = 0;

    MapManagerDataFromSystem.textureIndices = new Uint32Array(buffer, offset, count * getTextureIndexDataSize());
    offset += count * Uint32Array.BYTES_PER_ELEMENT * getTextureIndexDataSize();

    MapManagerDataFromSystem.textureCounts = new Uint8Array(buffer, offset, count * getTextureCountDataSize());
    offset += count * Uint8Array.BYTES_PER_ELEMENT * getTextureCountDataSize();

    return offset;
}

