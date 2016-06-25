module wd{
    export class CompressedTexture extends TwoDTexture {
        public static create(asset:CompressedTextureAsset) {
            var obj = new this(asset);

            obj.initWhenCreate();

            return obj;
        }

        @ensureGetter(function(sourceRegionMethod:ETextureSourceRegionMethod){
            var self = this;

            it("compressed texture not support ETextureSourceRegionMethod.DRAW_IN_CANVAS, will use ETextureSourceRegionMethod.CHANGE_TEXCOORDS_IN_GLSL instead", function () {
                expect(self.p_sourceRegionMethod).not.to.equal(ETextureSourceRegionMethod.DRAW_IN_CANVAS);
            expect(sourceRegionMethod).to.equal(ETextureSourceRegionMethod.CHANGE_TEXCOORDS_IN_GLSL);
            });
        })
        get sourceRegionMethod(){
            return ETextureSourceRegionMethod.CHANGE_TEXCOORDS_IN_GLSL;
        }
        set sourceRegionMethod(sourceRegionMethod:ETextureSourceRegionMethod){
            this.p_sourceRegionMethod = sourceRegionMethod;
        }

        protected allocateSourceToTexture(isSourcePowerOfTwo:boolean) {
            var gl = DeviceManager.getInstance().gl,
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

        protected needClampMaxSize(){
            return false;
        }
    }

    export type CompressedTextureMipmap = {
        data:any;
        width:number;
        height:number;
    }
}

