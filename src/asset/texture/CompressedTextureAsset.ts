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
            return CompressedTexture.create(this);
        }

        public toCubeFaceTexture():CubeFaceCompressedTexture{
            return CubeFaceCompressedTexture.create(this);
        }

        public copyToCubeFaceTexture(cubeFaceTexture:ICubeFaceCompressedTextureAsset){
            cubeFaceTexture.type = this.type;
            cubeFaceTexture.format = this.format;
            cubeFaceTexture.width = this.width;
            cubeFaceTexture.height = this.height;
            cubeFaceTexture.mipmaps = this.mipmaps;
            cubeFaceTexture.minFilter = this.minFilter;
        }
    }
}

