/// <reference path="../../definitions.d.ts"/>
module dy{
    export class CommonTextureAsset extends TextureAsset{
        public static create(source:HTMLImageElement) {
        	var obj = new this(source);

        	return obj;
        }

        constructor(source:HTMLImageElement){
            super();

            this.source = source;
        }

        public mipmaps:dyCb.Collection<HTMLCanvasElement|HTMLImageElement|HTMLVideoElement>;

        public toTexture():Texture{
            var texture = TwoDTexture.create(this);

            return this.copyTo(texture);
        }
    }
}
