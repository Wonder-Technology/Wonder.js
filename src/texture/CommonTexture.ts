/// <reference path="../definitions.d.ts"/>
module dy{
    export abstract class CommonTexture extends BasicTexture{
        public initWhenCreate(asset:TwoDTextureAsset){
            asset.copyTo(this);
        }

        protected allocateSourceToTexture(isSourcePowerOfTwo:boolean) {
            var mipmapCmd:DrawMipmapTwoDTextureCommand = null,
                noMipmapCmd:DrawNoMipmapTwoDTextureCommand = null,
                gl = DeviceManager.getInstance().gl;

            if(isSourcePowerOfTwo && this.mipmaps.getCount() > 0) {
                mipmapCmd = DrawMipmapTwoDTextureCommand.create();
                mipmapCmd.mipmaps = this.mipmaps;
                mipmapCmd.format = this.format;
                mipmapCmd.type = this.type;
                mipmapCmd.sourceRegion = this.sourceRegion;
                mipmapCmd.sourceRegionMethod = this.sourceRegionMethod;
                mipmapCmd.glTarget = gl.TEXTURE_2D;

                mipmapCmd.execute();

                this.generateMipmaps = false;
            }
            else {
                noMipmapCmd = DrawNoMipmapTwoDTextureCommand.create();
                noMipmapCmd.source = this.source;
                noMipmapCmd.format = this.format;
                noMipmapCmd.type = this.type;
                noMipmapCmd.sourceRegion = this.sourceRegion;
                noMipmapCmd.sourceRegionMethod = this.sourceRegionMethod;
                noMipmapCmd.glTarget = gl.TEXTURE_2D;

                noMipmapCmd.execute();
            }
        }
    }
}

