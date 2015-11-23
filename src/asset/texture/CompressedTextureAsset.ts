/// <reference path="../../filePath.d.ts"/>
module dy{
    export class CompressedTextureAsset extends TextureAsset{
        public static create(){
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        public mipmaps:dyCb.Collection<CompressedTextureMipmap>;

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

        public toCubemapFaceTexture():CubemapFaceCompressedTexture{
            return CubemapFaceCompressedTexture.create(this);
        }

        public copyToCubemapFaceTexture(cubemapFaceTexture:ICubemapFaceCompressedTextureAsset){
            cubemapFaceTexture.type = this.type;
            cubemapFaceTexture.format = this.format;
            cubemapFaceTexture.width = this.width;
            cubemapFaceTexture.height = this.height;
            cubemapFaceTexture.mipmaps = this.mipmaps;
            cubemapFaceTexture.minFilter = this.minFilter;
        }
    }
}

