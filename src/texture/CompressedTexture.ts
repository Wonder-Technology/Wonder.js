/// <reference path="../definitions.d.ts"/>
module dy{
    export class CompressedTexture extends Texture {
        public static create() {
            var obj = new this();

            return obj;
        }

        constructor() {
            super();

            /*!
             no need to generate mipmaps for compressed textures, mips will be embedded in files

             flipping doesn't work for compressed textures
             */
            this.generateMipmaps = false;
            this.flipY = false;
        }

        public copy(){
            return this.copyHelper(CompressedTexture.create());
        }

        protected allocateSourceToTexture(isSourcePowerOfTwo:boolean) {
            var gl = Director.getInstance().gl,
                self = this,
                format = this._getCompressedFormat();

            dyCb.Log.error(format === null, dyCb.Log.info.FUNC_NOT_SUPPORT(this.format));

            if (this.format !== TextureFormat.RGBA) {
                this.mipmaps.forEach((mipmap:ICompressedTextureMipmap, index:number) => {
                    gl.compressedTexImage2D(gl.TEXTURE_2D, index, format, mipmap.width, mipmap.height, 0, self.getDrawTarget(mipmap.data));
                });
            }
            else{
                this.mipmaps.forEach((mipmap:ICompressedTextureMipmap, index:number) => {
                    gl.texImage2D(gl.TEXTURE_2D, index, gl[self.format], mipmap.width, mipmap.height, 0, gl[self.format], gl[self.type], self.getDrawTarget(mipmap.data));
                });
            }
        }

        protected getDrawTarget(source:any=this.source){
            /*!
            because canvas->drawImage can't draw the compressed texture's data
             */
            dyCb.Log.error(this.sourceRegionMethod === TextureSourceRegionMethod.DRAW_IN_CANVAS, "compressed texture not support TextureSourceRegionMethod.DRAW_IN_CANVAS");

            return super.getDrawTarget(source);
        }

        protected isCheckMaxSize(){
            return false;
        }

        //todo move to load compressed texture, add to CompressedTextureAsset
        //todo support pvr
        private _getCompressedFormat(){
            var extension = GPUDetector.getInstance().extensionCompressedTextureS3TC,
                format = null;

            if(this.format === TextureFormat.RGBA){
                return this.format;
            }

            if(!extension){
                return null;
            }

            switch (this.format){
                case TextureFormat.RGB_S3TC_DXT1:
                    format = extension.COMPRESSED_RGB_S3TC_DXT1_EXT;
                    break;
                case TextureFormat.RGBA_S3TC_DXT1:
                    format = extension.COMPRESSED_RGBA_S3TC_DXT1_EXT;
                    break;
                case TextureFormat.RGBA_S3TC_DXT3:
                    format = extension.COMPRESSED_RGBA_S3TC_DXT3_EXT;
                    break;
                case TextureFormat.RGBA_S3TC_DXT5:
                    format = extension.COMPRESSED_RGBA_S3TC_DXT5_EXT;
                    break;
            }

            return format;
        }
    }

    export interface ICompressedTextureMipmap{
        data:any;
        width:number;
        height:number;
    }
}

