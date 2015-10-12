/// <reference path="../../definitions.d.ts"/>
module dy {
    export class CubemapShadowMapTexture extends CubemapRenderTargetTexture implements IShadowMapTexture{
        public static create() {
            var obj = new this();

            return obj;
        }

        public sendData(program:Program, index:number) {
            dyCb.Log.error(!JudgeUtils.isNumber(this.variableData.samplerData), dyCb.Log.info.FUNC_MUST_BE("shadowMapTexture->variableData.samplerData", "samplerIndex"));

            program.sendUniformData(`u_cubemapShadowMapSampler[${this.variableData.samplerData}]`, VariableType.SAMPLER_CUBE, index);

            return this;
        }

        /*!
        And again, as for two-dimensional shadow maps, it's possible to configure cube texture in such a way that single sampling from shadow cube map will return a result of a comparison for four texels. That is, sampling function will return following shadow factor values: 0.0, 0.25, 0.5, 0.75, 1.0. Set minifying and magnifying filters of the texture to GL_LINEAR to enable such sampling.

         //
         //protected setTextureParameters(textureType, isSourcePowerOfTwo){
         //    super.setTextureParameters(textureType, isSourcePowerOfTwo);
         //
         //    ShadowMapTextureUtils.setTextureParameters(textureType);
         //}
        */

    }
}

