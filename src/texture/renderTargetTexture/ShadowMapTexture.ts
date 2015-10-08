/// <reference path="../../definitions.d.ts"/>
module dy {
    export class ShadowMapTexture extends TwoDRenderTargetTexture {
        public static create() {
            var obj = new this();

            return obj;
        }

        protected setTextureParameters(textureType, isSourcePowerOfTwo){
            var gl = DeviceManager.getInstance().gl,
                stage:Stage = Director.getInstance().stage;

            super.setTextureParameters(textureType, isSourcePowerOfTwo);

            if(stage.shadowMap.softType === ShadowMapSoftType.PCF) {
                gl.texParameteri(textureType, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
                gl.texParameteri(textureType, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            }
        }
    }
}

