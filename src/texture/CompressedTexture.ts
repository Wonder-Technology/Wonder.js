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

        public mipmaps:dyCb.Collection<ICompressedTextureMipmap>;

        public copy(){
            return this.copyHelper(CompressedTexture.create());
        }

        protected allocateSourceToTexture(isSourcePowerOfTwo:boolean) {
            var gl = Director.getInstance().gl,
                compressedCmd = DrawCompressedTextureCommand.create();

            compressedCmd.glTarget = gl.TEXTURE_2D;
            compressedCmd.type = this.type;
            compressedCmd.format = this.format;
            compressedCmd.mipmaps = this.mipmaps;
            compressedCmd.sourceRegion = this.sourceRegion;
            compressedCmd.sourceRegionMethod = this.sourceRegionMethod;

            compressedCmd.execute();
        }

        protected isCheckMaxSize(){
            return false;
        }
    }

    export interface ICompressedTextureMipmap{
        data:any;
        width:number;
        height:number;
    }
}

