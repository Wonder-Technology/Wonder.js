/// <reference path="../../../../definitions.d.ts"/>
module dy{
    export class TwoDShadowMapShaderLib extends ShaderLib{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
                this._instance.initWhenCreate();
            }
            return this._instance;
        }

        public type:string = "twoDShadowMap";

        public sendShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){
            var stage = Director.getInstance().stage;

            if(!stage.shadowMap.enable){
                return;
            }

            program.sendUniformData("u_vpMatrixFromLight", VariableType.FLOAT_MAT4, material.shadowMapData.vpMatrixFromLight);
            program.sendUniformData("u_shadowBias", VariableType.FLOAT_1, material.shadowMapData.shadowBias);
            program.sendUniformData("u_shadowDarkness", VariableType.FLOAT_1, material.shadowMapData.shadowDarkness);
            program.sendUniformData("u_shadowMapSize", VariableType.FLOAT_2, material.shadowMapData.shadowMapSize);
        }

        protected setShaderDefinition(){
            super.setShaderDefinition();

            this.addUniformVariable([
                VariableNameTable.getVariableName("twoDShadowMap"),
                "u_shadowBias", "u_shadowDarkness", "u_shadowMapSize", "u_vpMatrixFromLight"
            ]);

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

