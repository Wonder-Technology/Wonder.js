/// <reference path="../../../filePath.d.ts"/>
module dy{
    export class CubemapFaceTwoDTexture extends CubemapFaceTexture implements ICubemapFaceTwoDTextureAsset{
        public static create(asset:ImageTextureAsset) {
        	var obj = new this();

            obj.initWhenCreate(asset);

        	return obj;
        }

        @requireSetter(function(sourceRegionMethod:TextureSourceRegionMethod){
            assert(sourceRegionMethod === TextureSourceRegionMethod.DRAW_IN_CANVAS, Log.info.FUNC_SUPPORT("cubemap twoD face texture->sourceRegionMethod only", "DRAW_IN_CANVAS"));
        })
        get sourceRegionMethod(){
            return TextureSourceRegionMethod.DRAW_IN_CANVAS;
        }
        set sourceRegionMethod(sourceRegionMethod:TextureSourceRegionMethod){
            var a = sourceRegionMethod;
        }

        public sourceRegion:RectRegion = null;
        public source:any = null;

        public initWhenCreate(asset:ImageTextureAsset){
            asset.copyToCubemapFaceTexture(this);
        }

        public isSourcePowerOfTwo():boolean{
            return BasicTextureUtils.isSourcePowerOfTwo(this.sourceRegion, this.sourceRegionMethod, this.width, this.height);
        }

        public needClampMaxSize(){
            if(!this.source){
                return false;
            }

            return BasicTextureUtils.needClampMaxSize(GPUDetector.getInstance().maxCubemapTextureSize, this.source.width, this.source.height);
        }

        public clampToMaxSize(){
            var maxSize = GPUDetector.getInstance().maxCubemapTextureSize;

            this.source = BasicTextureUtils.clampToMaxSize(this.source, maxSize);
        }

        //todo support manual mipmap
        public draw(index:number){
            var noMipmapCmd = DrawNoMipmapTwoDTextureCommand.create(),
            gl = DeviceManager.getInstance().gl;

            noMipmapCmd.source = this.source;
            noMipmapCmd.sourceRegion = this.sourceRegion;
            noMipmapCmd.sourceRegionMethod = this.sourceRegionMethod;
            noMipmapCmd.glTarget = gl.TEXTURE_CUBE_MAP_POSITIVE_X + index;
            noMipmapCmd.format = this.format;
            noMipmapCmd.type = this.type;

            noMipmapCmd.execute();
        }
    }
}
