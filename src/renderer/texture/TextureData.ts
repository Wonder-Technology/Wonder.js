import { Texture } from "./Texture";
import { DisposedTextureDataMap } from "../type/dataType";

export class TextureData {
    public static index: number = null;

    public static glTextures: Array<WebGLTexture> = null;

    public static sourceMap: Array<HTMLImageElement> = null;
    public static textureMap: Array<Texture> = null;

    public static uniformSamplerNameMap: Array<string> = null;

    public static buffer: SharedArrayBuffer = null;

    public static widths: Float32Array = null;
    public static heights: Float32Array = null;
    public static isNeedUpdates: Uint8Array = null;
    //todo add more: wrapS, ....

    public static defaultWidth: number = null;
    public static defaultHeight: number = null;
    public static defaultIsNeedUpdate: number = null;

    public static disposedTextureDataMap: DisposedTextureDataMap = null;
}

