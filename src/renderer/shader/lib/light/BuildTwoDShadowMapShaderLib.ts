/// <reference path="../../../../definitions.d.ts"/>
module dy{
    export class BuildTwoDShadowMapShaderLib extends BuildShadowMapShaderLib{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
                this._instance.initWhenCreate();
            }
            return this._instance;
        }

        public type:string = "buildTwoDShadowMap";

        public sendShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){
            program.sendUniformData("u_vpMatrixFromLight", VariableType.FLOAT_MAT4, material.twoDShadowMapData.vpMatrixFromLight);
        }

        protected setShaderDefinition(){
            super.setShaderDefinition();

            this.addUniformVariable([
                "u_vpMatrixFromLight"
            ]);
        }
    }
}

