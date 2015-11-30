/// <reference path="../../filePath.d.ts"/>
module wd {
    export class TwoDShadowMapTexture extends TwoDRenderTargetTexture implements IShadowMapTexture{
        public static create() {
            var obj = new this();

            return obj;
        }

        public getSamplerName(unit:number){
            Log.error(!JudgeUtils.isNumber(this.variableData.samplerData), Log.info.FUNC_MUST_BE("shadowMapTexture->variableData.samplerData", "samplerIndex"));

            return `u_twoDShadowMapSampler[${this.variableData.samplerData}]`;
        }

        protected setTextureParameters(textureType, isSourcePowerOfTwo){
            super.setTextureParameters(textureType, isSourcePowerOfTwo);

            ShadowMapTextureUtils.setTextureParameters(textureType);
        }
    }
}

