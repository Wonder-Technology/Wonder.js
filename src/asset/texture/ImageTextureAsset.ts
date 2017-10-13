import { TextureAsset } from "./TextureAsset";
import { Texture } from "../../renderer/texture/Texture";
import { create } from "../../renderer/texture/TextureSystem";
import { TextureData } from "../../renderer/texture/TextureData";

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

    public toTexture(): Texture {
        var texture = create(TextureData);

        this.cloneTo(texture.index);

        return texture;
    }
}
