/// <reference path="../../../filePath.d.ts"/>
module dy{
    export class CubemapFaceTwoDTexture extends CubemapFaceTexture implements ICubemapFaceTwoDTextureAsset{
        public static create(asset:ImageTextureAsset) {
        	var obj = new this();

            obj.initWhenCreate(asset);

        	return obj;
        }

        public sourceRegion:RectRegion = null;
        public sourceRegionMethod:TextureSourceRegionMethod = null;
        public source:any = null;

        public initWhenCreate(asset:ImageTextureAsset){
            asset.copyToCubemapFaceTexture(this);

            //cube twoD texture only support DRAW_IN_CANVAS
            this.sourceRegionMethod = TextureSourceRegionMethod.DRAW_IN_CANVAS;
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
