/// <reference path="../../../../definitions.d.ts"/>
module dy{
    export abstract class ShadowMapShaderLib extends ShaderLib{
        public sendShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){
            var stage = Director.getInstance().stage,
                shadowMapData = this.getShadowMapData(material);

            if(!stage.shadowMap.enable){
                return;
            }

            program.sendUniformData("u_shadowBias", VariableType.FLOAT_1, shadowMapData.shadowBias);
            program.sendUniformData("u_shadowDarkness", VariableType.FLOAT_1, shadowMapData.shadowDarkness);

            this.sendShadowMapShaderVariables(program, quadCmd, material);
        }

        protected abstract getShadowMapData(material:LightMaterial):TwoDShadowMapData|CubemapShadowMapData;
        protected abstract sendShadowMapShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial);
        protected abstract addShadowMapUniformVariable();

        protected setShaderDefinition(){
            super.setShaderDefinition();

            this.addUniformVariable([
                "u_shadowBias", "u_shadowDarkness"
            ]);

            this.addShadowMapUniformVariable();

            this._setShadowMapSource();
        }

        private _setShadowMapSource(){
            var stage:Stage = Director.getInstance().stage;

            if(stage.shadowMap.softType === ShadowMapSoftType.PCF){
                this.fsSourceDefineList.addChildren([{
                    name: "SHADOWMAP_TYPE_PCF_SOFT"
                }]);
            }
        }
    }
}

