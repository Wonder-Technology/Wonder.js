import { DisposedTextureDataMap } from "../type/dataType";
import { ITexture } from "../interface/ITexture";
export declare class TextureData {
    static index: number;
    static glTextures: Array<WebGLTexture>;
    static sourceMap: Array<HTMLImageElement>;
    static textureMap: Array<ITexture>;
    static uniformSamplerNameMap: Array<string>;
    static buffer: SharedArrayBuffer;
    static widths: Float32Array;
    static heights: Float32Array;
    static isNeedUpdates: Uint8Array;
    static defaultWidth: number;
    static defaultHeight: number;
    static defaultIsNeedUpdate: number;
    static disposedTextureDataMap: DisposedTextureDataMap;
    static needInitedTextureIndexArr: Array<number>;
    static needAddedSourceArr: Array<HTMLImageElement>;
}
