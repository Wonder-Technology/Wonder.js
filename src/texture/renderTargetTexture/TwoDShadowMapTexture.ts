/// <reference path="../../definitions.d.ts"/>
module dy {
    export class TwoDShadowMapTexture extends TwoDRenderTargetTexture{
        public static create() {
            var obj = new this();

            return obj;
        }

        protected setTextureParameters(textureType, isSourcePowerOfTwo){
            super.setTextureParameters(textureType, isSourcePowerOfTwo);

            ShadowMapTextureUtils.setTextureParameters(textureType);
        }
    }
}

