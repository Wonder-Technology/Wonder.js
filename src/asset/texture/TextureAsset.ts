/// <reference path="../../definitions.d.ts"/>
module dy{
    export class TextureAsset{
        public format:TextureFormat = TextureFormat.RGBA;

        public toTexture():Texture{
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }
    }
}

