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
    }
}

