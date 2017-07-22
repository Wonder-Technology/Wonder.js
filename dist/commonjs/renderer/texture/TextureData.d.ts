import { Texture } from "./Texture";
import { DisposedTextureDataMap } from "../type/dataType";
export declare class TextureData {
    static index: number;
    static glTextures: Array<WebGLTexture>;
    static sourceMap: Array<HTMLImageElement>;
    static textureMap: Array<Texture>;
    static uniformSamplerNameMap: Array<string>;
    static buffer: SharedArrayBuffer;
    static widths: Float32Array;
    static heights: Float32Array;
    static isNeedUpdates: Uint8Array;
    static defaultWidth: number;
    static defaultHeight: number;
    static defaultIsNeedUpdate: number;
    static disposedTextureDataMap: DisposedTextureDataMap;
}
