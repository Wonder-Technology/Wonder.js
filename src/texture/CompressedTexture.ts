/// <reference path="../definitions.d.ts"/>
module dy{
    export class CompressedTexture extends Texture {
        public static create() {
            var obj = new this();

            return obj;
        }

        constructor() {
            super();

            this.generateMipmaps = false;
            /*!
             flipping doesn't work for compressed textures
             */
            this.flipY = false;
        }

        get sourceRegionMethod(){
            dyCb.Log.assert(this.p_sourceRegionMethod === TextureSourceRegionMethod.DRAW_IN_CANVAS, "compressed texture not support TextureSourceRegionMethod.DRAW_IN_CANVAS, will use TextureSourceRegionMethod.CHANGE_TEXCOORDS_IN_GLSL instead");

            return TextureSourceRegionMethod.CHANGE_TEXCOORDS_IN_GLSL;
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
            compressedCmd.texture = this;

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

