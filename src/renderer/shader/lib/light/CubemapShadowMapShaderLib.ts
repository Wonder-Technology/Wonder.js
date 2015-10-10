/// <reference path="../../../../definitions.d.ts"/>
module dy{
    export class CubemapShadowMapShaderLib extends ShaderLib{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
                this._instance.initWhenCreate();
            }
            return this._instance;
        }

        public type:string = "cubemapShadowMap";

        public sendShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){
            var stage = Director.getInstance().stage;

            //todo refactor?
            if(!stage.shadowMap.enable){
                return;
            }

            program.sendUniformData("u_shadowBias", VariableType.FLOAT_1, material.cubemapShadowMapData.shadowBias);
            program.sendUniformData("u_shadowDarkness", VariableType.FLOAT_1, material.cubemapShadowMapData.shadowDarkness);
            program.sendUniformData("u_lightPos", VariableType.FLOAT_3, material.cubemapShadowMapData.lightPos);
            program.sendUniformData("u_farPlane", VariableType.FLOAT_1, material.cubemapShadowMapData.farPlane);
        }

        protected setShaderDefinition(){
            super.setShaderDefinition();

            this.addUniformVariable([
                VariableNameTable.getVariableName("cubemapShadowMap"),
                "u_shadowBias", "u_shadowDarkness", "u_lightPos", "u_farPlane"
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

