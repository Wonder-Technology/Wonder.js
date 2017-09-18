import { TextureAsset } from "./TextureAsset";

export class ImageTextureAsset extends TextureAsset {
    public static create(source: HTMLImageElement | HTMLCanvasElement) {
        var obj = new this(source);

        return obj;
    }

    constructor(source: HTMLImageElement | HTMLCanvasElement) {
        super();

        this.source = source;
    }

    // public mipmaps: wdCb.Collection<HTMLCanvasElement | HTMLImageElement | HTMLVideoElement>;

    // public toTexture(): ImageTexture {
    //     return ImageTexture.create(this);
    // }
}
