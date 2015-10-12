/// <reference path="../../definitions.d.ts"/>
module dy {
    export class TwoDShadowMapTexture extends TwoDRenderTargetTexture implements IShadowMapTexture{
        public static create() {
            var obj = new this();

            return obj;
        }

        public sendData(program:Program, index:number) {
            dyCb.Log.error(!JudgeUtils.isNumber(this.variableData.samplerData), dyCb.Log.info.FUNC_MUST_BE("shadowMapTexture->variableData.samplerData", "samplerIndex"));

            program.sendUniformData(`u_twoDShadowMapSampler[${this.variableData.samplerData}]`, VariableType.SAMPLER_2D, index);

            return this;
        }

        protected setTextureParameters(textureType, isSourcePowerOfTwo){
            super.setTextureParameters(textureType, isSourcePowerOfTwo);

            ShadowMapTextureUtils.setTextureParameters(textureType);
        }
    }
}

