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
             can't generate mipmaps for compressed textures
             mips must be embedded in files

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
                this.mipmaps.forEach((mipmap:IMipmap, index:number) => {
                    gl.compressedTexImage2D(gl.TEXTURE_2D, index, format, mipmap.width, mipmap.height, 0, mipmap.data);
                });

            }
            else{
                this.mipmaps.forEach((mipmap:IMipmap, index:number) => {
                    gl.texImage2D(gl.TEXTURE_2D, index, gl[self.format], mipmap.width, mipmap.height, 0, gl[self.format], gl[self.type], mipmap.data);
                });
            }
        }

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
}

