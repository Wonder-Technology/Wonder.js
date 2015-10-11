/// <reference path="../../../../definitions.d.ts"/>
module dy{
    export abstract class ShadowMapShaderLib extends ShaderLib{
        public sendShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){
            //var stage = Director.getInstance().stage,
            //    //shadowMapData = this.getShadowMapData(material);
            //
            //if(!stage.shadowMap.enable){
            //    return;
            //}
            //
            //program.sendUniformData("u_shadowBias", VariableType.FLOAT_1, shadowMapData.shadowBias);
            //program.sendUniformData("u_shadowDarkness", VariableType.FLOAT_1, shadowMapData.shadowDarkness);

            this.sendShadowMapShaderVariables(program, quadCmd, material);
        }

        //protected abstract getShadowMapData(material:LightMaterial):TwoDShadowMapData|CubemapShadowMapData;
        protected abstract sendShadowMapShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial);
        protected abstract addShadowMapUniformVariable();

        protected setShaderDefinition(){
            super.setShaderDefinition();

            //this.addUniformVariable([
            //    "u_shadowBias", "u_shadowDarkness"
            //]);

            this.addShadowMapUniformVariable();

            this._setShadowMapSource();
        }

        private _setShadowMapSource(){
            var stage:Stage = Director.getInstance().stage;

            //this.setFsSource(this.getFsChunk("shadowMap_fragment.glsl"));
            //this.setFsSource(this.getFsChunk(), "+");

            if(stage.shadowMap.softType === ShadowMapSoftType.PCF){
                this.fsSourceDefineList.addChildren([{
                    name: "SHADOWMAP_TYPE_PCF_SOFT"
                }]);
            }

            //todo refactor
            var stage:Stage = Director.getInstance().stage,
                shadowMapData = stage.cubemapShadowMaps,
                count = shadowMapData.getCount();

            this._addDefine(this.fsSourceDefineList, count);
        }

        private _addDefine(list, cubemap_shadowMap_count){
            list.addChildren([
                {
                    //todo rename
                    name: "SHADOWMAP_COUNT",
                    value: cubemap_shadowMap_count
                }]);
        }
    }
}

