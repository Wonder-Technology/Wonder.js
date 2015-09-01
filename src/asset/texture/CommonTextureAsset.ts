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

        public source:HTMLImageElement = null;

        public toTexture():Texture{
            var texture = TwoDTexture.create(this.source);

            texture.format = this.format;

            return texture;
        }
    }
}
