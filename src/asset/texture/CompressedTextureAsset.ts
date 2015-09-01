/// <reference path="../../definitions.d.ts"/>
module dy{
    export class CompressedTextureAsset extends TextureAsset{
        public static create() {
            var obj = new this();

            return obj;
        }

        public width:number = null;
        public height:number = null;
        public mipmaps:dyCb.Collection<ICompressedTextureMipmap> = dyCb.Collection.create<ICompressedTextureMipmap>();
        public minFilter:TextureFilterMode = TextureFilterMode.LINEAR_MIPMAP_LINEAR;

        public toTexture():Texture{
            var texture = CompressedTexture.create();

            texture.width = this.width;
            texture.height = this.height;
            texture.mipmaps = this.mipmaps;
            texture.minFilter = this.minFilter;
            texture.format = this.format;

            return texture;
        }
    }
}

