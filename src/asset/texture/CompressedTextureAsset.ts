/// <reference path="../../definitions.d.ts"/>
module dy{
    export class CompressedTextureAsset extends TextureAsset{
        public static create(){
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        public mipmaps:dyCb.Collection<ICompressedTextureMipmap>;

        public initWhenCreate(){
            this.generateMipmaps = false;
            /*!
             flipping doesn't work for compressed textures
             */
            this.flipY = false;
        }

        public toTexture():Texture{
            var texture = CompressedTexture.create(this);

            return this.copyTo(texture);
        }
    }
}

