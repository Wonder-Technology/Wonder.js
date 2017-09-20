import { SendUniformDataGLSLSenderDataMap } from "../../../../type/utilsType";
import { UniformCacheMap, UniformLocationMap } from "../../../../type/dataType";
import { sendData as sendTextureData } from "./textureUtils";
import { getBufferTotalCount } from "../material/bufferUtils";
import { ensureFunc, it, requireCheckFunc } from "../../../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { forEach } from "../../../../../utils/arrayUtils";

//todo support multi textures

// export const addMapList = (materialIndex: number, mapList: Array<Texture>, MapManagerDataFromSystem:any) => {
//     for(let map of mapList){
//         addMap(materialIndex, map, MapManagerDataFromSystem);
//     }
// }

export const getTextureIndexDataSize = () => 1;

export const getTextureCountDataSize = () => 1;

export const bindAndUpdate = requireCheckFunc((gl: WebGLRenderingContext, mapCount: number, startTextureIndex: number, definedStartTextureUnitIndex:number, TextureCacheDataFromSystem: any, TextureDataFromSystem: any, MapManagerDataFromSystem: any, GPUDetectDataFromSystem: any, bindToUnit: Function, needUpdate: Function, update: Function) => {
    it("mapCount should >= 0", () => {
        expect(mapCount).gte(0);
    });
    it("startTextureIndex should >= 0", () => {
        expect(startTextureIndex).gte(0);
    });
    it("definedStartTextureUnitIndex should >= 0", () => {
        expect(definedStartTextureUnitIndex).gte(0);
    });
}, (gl: WebGLRenderingContext, mapCount: number, startTextureIndex: number, definedStartTextureUnitIndex:number, TextureCacheDataFromSystem: any, TextureDataFromSystem: any, MapManagerDataFromSystem: any, GPUDetectDataFromSystem: any, bindToUnit: Function, needUpdate: Function, update: Function) => {
    var textureIndices = MapManagerDataFromSystem.textureIndices;

    for (let i = startTextureIndex, count = mapCount + startTextureIndex; i < count; i++) {
        let textureIndex = textureIndices[i],
            unitIndex = _getUnitIndex(i, startTextureIndex, definedStartTextureUnitIndex);

        bindToUnit(gl, unitIndex, textureIndex, TextureCacheDataFromSystem, TextureDataFromSystem, GPUDetectDataFromSystem);

        if (needUpdate(textureIndex, TextureDataFromSystem)) {
            update(gl, textureIndex, TextureDataFromSystem);
        }
    }
})

export const sendData = (gl: WebGLRenderingContext, mapCount: number, startTextureIndex: number, definedStartTextureUnitIndex:number, shaderIndex: number, program: WebGLProgram, glslSenderData: SendUniformDataGLSLSenderDataMap, uniformLocationMap: UniformLocationMap, uniformCacheMap: UniformCacheMap, directlySendUniformData: Function, TextureData: any, MapManagerData: any) => {
    var textureIndices = MapManagerData.textureIndices;

    for (let i = startTextureIndex, count = mapCount + startTextureIndex; i < count; i++) {
        let textureIndex = textureIndices[i],
            unitIndex = _getUnitIndex(i, startTextureIndex, definedStartTextureUnitIndex);

        sendTextureData(gl, mapCount, shaderIndex, textureIndex, unitIndex, program, glslSenderData, uniformLocationMap, uniformCacheMap, directlySendUniformData, TextureData);
    }
}

const _getUnitIndex = (index:number, startTextureIndex:number, definedStartTextureUnitIndex:number) => index - startTextureIndex + definedStartTextureUnitIndex;

export const getMapCount = (materialIndex: number, MapManagerDataFromSystem: any) => {
    return MapManagerDataFromSystem.textureCounts[materialIndex];
}

// export const initData = (TextureCacheDataFromSystem:any, TextureDataFromSystem:any, MapManagerDataFromSystem:any) => {
//     initTextureDataFromSystem(TextureCacheDataFromSystem, TextureDataFromSystem);
//
//     // MapManagerDataFromSystem.textureMap = [];
// }
//
// export const initMapManager = (gl: WebGLRenderingContext, materialIndex:number, initTexture:Function, MapManagerDataFromSystem: any, TextureDataFromSystem: any) => {
//     forEach(_getMaterialTextures(materialIndex, MapManagerDataFromSystem), (textureIndex:number) => {
//         initTexture(gl, textureIndex, TextureDataFromSystem);
//     });
// }

export const getMaterialTextures = (materialIndex:number, MapManagerDataFromSystem:any) => {
    return MapManagerDataFromSystem.materialTextureList[materialIndex];
}

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

export const getStartTextureIndex = ensureFunc((textureIndex) => {
    it("startTextureIndex should >= 0", () => {
        expect(textureIndex).gte(0);
    });
}, (materialIndex: number) => {
    return getMaxTextureCount() * materialIndex;
})

