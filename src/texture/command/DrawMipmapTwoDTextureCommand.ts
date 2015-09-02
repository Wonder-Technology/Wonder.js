/// <reference path="../../definitions.d.ts"/>
module dy{
    export class DrawMipmapTwoDTextureCommand extends DrawTwoDTextureCommand{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        public mipmaps:dyCb.Collection<HTMLCanvasElement|HTMLImageElement|HTMLVideoElement> = null;

        public execute(){
            var self = this;

            this.mipmaps.forEach((mipmap:HTMLImageElement|HTMLCanvasElement|HTMLVideoElement, index:number) => {
                self.drawTexture(index, mipmap);
            });
        }
    }
}

