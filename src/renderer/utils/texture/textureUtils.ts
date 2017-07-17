import { getSingleSizeData } from "../common/operateBufferDataUtils";
import { ETextureWrapMode } from "../../enum/ETextureWrapMode";
import { ETextureFilterMode } from "../../enum/ETextureFilterMode";
import { ETextureFormat } from "../../enum/ETextureFormat";
import { ETextureType } from "../../enum/ETextureType";
export var getBufferDataSize = () => 1;

export var createTypeArrays = (buffer: any, count: number, TextureDataFromSystem: any) => {
    var offset = 0;

    TextureDataFromSystem.widths = new Float32Array(buffer, offset, count * getBufferDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * getBufferDataSize();

    TextureDataFromSystem.heights = new Float32Array(buffer, offset, count * getBufferDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * getBufferDataSize();

    TextureDataFromSystem.isNeedUpdates = new Uint8Array(buffer, offset, count * getBufferDataSize());
    offset += count * Uint8Array.BYTES_PER_ELEMENT * getBufferDataSize();

    return offset;
}

export var getWidth = (textureIndex: number, TextureDataFromSystem: any) => {
    return getSingleSizeData(textureIndex, TextureDataFromSystem.widths);
}

export var getHeight = (textureIndex: number, TextureDataFromSystem: any) => {
    return getSingleSizeData(textureIndex, TextureDataFromSystem.heights);
}

export var getWrapS = (textureIndex:number, TextureData:any) => {
    //todo finish: judge type array value, return enum value

    return ETextureWrapMode.CLAMP_TO_EDGE;
}

export var getWrapT = (textureIndex:number, TextureData:any) => {
    //todo finish

    return ETextureWrapMode.CLAMP_TO_EDGE;
}

export var getMagFilter = (textureIndex:number, TextureData:any) => {
    //todo finish

    return ETextureFilterMode.LINEAR;
}

export var getMinFilter = (textureIndex:number, TextureData:any) => {
    //todo finish

    return ETextureFilterMode.LINEAR_MIPMAP_LINEAR;
}

export var getFormat = (textureIndex:number, TextureData:any) => {
    //todo finish

    return ETextureFormat.RGBA;
}

export var getType = (textureIndex:number, TextureData:any) => {
    //todo finish

    return ETextureType.UNSIGNED_BYTE;
}

export var getFlipY = (textureIndex:number, TextureData:any) => {
    //todo finish

    return true;
}

export var getIsNeedUpdate = (textureIndex: number, TextureDataFromSystem: any) => {
    return getSingleSizeData(textureIndex, TextureDataFromSystem.isNeedUpdates);
}
