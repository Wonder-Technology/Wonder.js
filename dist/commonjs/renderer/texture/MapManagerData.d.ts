import { MaterialTextureList, TextureOffsetMap } from "../type/dataType";
export declare class MapManagerData {
    static buffer: SharedArrayBuffer;
    static textureIndices: Uint32Array;
    static textureCounts: Uint8Array;
    static materialTextureList: MaterialTextureList;
    static textureOffsetMap: TextureOffsetMap;
}
