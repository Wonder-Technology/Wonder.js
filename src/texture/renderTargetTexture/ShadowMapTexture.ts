/// <reference path="../../definitions.d.ts"/>
module dy {
    export class ShadowMapTexture extends TwoDRenderTargetTexture {
        public static create() {
            var obj = new this();

            return obj;
        }

        protected setTextureParameters(textureType, isSourcePowerOfTwo){
            var gl = DeviceManager.getInstance().gl;

            super.setTextureParameters(textureType, isSourcePowerOfTwo);

            //todo is pcf

            gl.texParameteri(textureType, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(textureType, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        }
    }
}

