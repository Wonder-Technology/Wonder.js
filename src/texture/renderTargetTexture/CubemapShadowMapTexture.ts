/// <reference path="../../definitions.d.ts"/>
module dy {
    export class CubemapShadowMapTexture extends CubemapRenderTargetTexture {
        public static create() {
            var obj = new this();

            return obj;
        }

        public sendData(program:Program, index:number) {
            dyCb.Log.error(!JudgeUtils.isNumber(this.variableData.samplerData), dyCb.Log.info.FUNC_MUST_BE("shadowMapTexture->variableData.samplerData", "samplerIndex"));

            program.sendUniformData(`u_cubemapShadowMapSampler[${this.variableData.samplerData}]`, VariableType.SAMPLER_CUBE, index);

            return this;
        }

        protected setTextureParameters(textureType, isSourcePowerOfTwo){
            super.setTextureParameters(textureType, isSourcePowerOfTwo);

            ShadowMapTextureUtils.setTextureParameters(textureType);
        }
    }
}

