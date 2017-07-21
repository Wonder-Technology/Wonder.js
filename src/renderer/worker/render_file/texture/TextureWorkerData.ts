export class TextureWorkerData{
    public static index:number = null;

    public static glTextures:Array<WebGLTexture> = null;

    public static sourceMap:Array<ImageBitmap> = null;

    public static uniformSamplerNameMap:Array<string> = null;

    public static widths: Float32Array = null;
    public static heights: Float32Array = null;
    public static isNeedUpdates: Uint8Array = null;
}

