/// <reference path="../../../../definitions.d.ts"/>
module dy{
    export class BuildCubemapShadowMapShaderLib extends BuildShadowMapShaderLib{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
                this._instance.initWhenCreate();
            }
            return this._instance;
        }

        public type:string = "buildCubemapShadowMap";

        public sendShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){
            program.sendUniformData("u_lightPos", VariableType.FLOAT_3, material.buildCubemapShadowMapData.lightPos);
            program.sendUniformData("u_farPlane", VariableType.FLOAT_1, material.buildCubemapShadowMapData.farPlane);
        }

        protected setShaderDefinition(){
            super.setShaderDefinition();

            this.addUniformVariable([
                "u_lightPos", "u_farPlane"
            ]);
        }
    }
}

