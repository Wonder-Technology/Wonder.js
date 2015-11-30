/// <reference path="../../../filePath.d.ts"/>
module wd{
    export class DrawMipmapTwoDTextureCommand extends DrawTwoDTextureCommand{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        public mipmaps:wdCb.Collection<HTMLCanvasElement|HTMLImageElement|HTMLVideoElement> = null;

        public execute(){
            var self = this;

            this.mipmaps.forEach((mipmap:HTMLImageElement|HTMLCanvasElement|HTMLVideoElement, index:number) => {
                self.drawTexture(index, mipmap);
            });
        }
    }
}

