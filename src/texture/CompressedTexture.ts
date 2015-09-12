/// <reference path="../definitions.d.ts"/>
module dy{
    export class CompressedTexture extends Texture {
        public static create(asset:CompressedTextureAsset) {
            var obj = new this();

            obj.initWhenCreate(asset);

            return obj;
        }

        get sourceRegionMethod(){
            dyCb.Log.assert(this.p_sourceRegionMethod === TextureSourceRegionMethod.DRAW_IN_CANVAS, "compressed texture not support TextureSourceRegionMethod.DRAW_IN_CANVAS, will use TextureSourceRegionMethod.CHANGE_TEXCOORDS_IN_GLSL instead");

            return TextureSourceRegionMethod.CHANGE_TEXCOORDS_IN_GLSL;
        }

        public initWhenCreate(asset:CompressedTextureAsset){
            asset.copyTo(this);
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

            if(this.mipmaps.getCount() > 1){
                this.generateMipmaps = false;
            }
        }

        protected isCheckMaxSize(){
            return false;
        }
    }

    export type CompressedTextureMipmap = {
        data:any;
        width:number;
        height:number;
    }
}

