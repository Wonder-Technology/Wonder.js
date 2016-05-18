module wd {
    export class TwoDShadowMapTexture extends TwoDRenderTargetTexture implements IShadowMapTexture{
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        @require(function(unit:number){
            assert(JudgeUtils.isNumber(this.variableData.samplerData), Log.info.FUNC_MUST_BE("shadowMapTexture->variableData.samplerData", "samplerIndex"));
        })
        public getSamplerName(unit:number){
            return `u_twoDShadowMapSampler[${this.variableData.samplerData}]`;
        }

        protected setTextureParameters(textureType, isSourcePowerOfTwo){
            super.setTextureParameters(textureType, isSourcePowerOfTwo);

            ShadowMapTextureUtils.setTextureParameters(textureType);
        }

        protected texImageEmpty(){
            if(GPUDetector.getInstance().extensionDepthTexture) {
                let gl = DeviceManager.getInstance().gl;

                /*!
                 note:WebGL2 supports FloatType instead of UNSIGNED_SHORT for the depth texture
                 */
                gl.texImage2D(gl[this.target], 0, gl.DEPTH_COMPONENT, this.width, this.height, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_SHORT, null);

                return;
            }

            super.texImageEmpty();
        }
    }
}

