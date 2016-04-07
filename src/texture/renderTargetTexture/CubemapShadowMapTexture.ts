module wd {
    export class CubemapShadowMapTexture extends CubemapRenderTargetTexture implements IShadowMapTexture{
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        @require(function(unit:number){
            assert(JudgeUtils.isNumber(this.variableData.samplerData), Log.info.FUNC_MUST_BE("shadowMapTexture->variableData.samplerData", "samplerIndex"));
        })
        public getSamplerName(unit:number){
            return `u_cubemapShadowMapSampler[${this.variableData.samplerData}]`;
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

