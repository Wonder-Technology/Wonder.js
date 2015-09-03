/// <reference path="../definitions.d.ts"/>
module dy{
    export class TwoDTexture extends Texture{
        public static create(source:any=Texture.defaultTexture){
            var obj = new this(source);

            return obj;
        }

        public mipmaps:dyCb.Collection<HTMLCanvasElement|HTMLImageElement|HTMLVideoElement>;

        public copy(){
            return this.copyHelper(TwoDTexture.create());
        }

        protected allocateSourceToTexture(isSourcePowerOfTwo:boolean) {
            var mipmapCmd:DrawMipmapTwoDTextureCommand = null,
                noMipmapCmd:DrawNoMipmapTwoDTextureCommand = null,
                gl = Director.getInstance().gl;

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
