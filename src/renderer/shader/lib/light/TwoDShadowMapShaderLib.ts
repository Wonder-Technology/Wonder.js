/// <reference path="../../../../definitions.d.ts"/>
module dy{
    export class TwoDShadowMapShaderLib extends ShadowMapShaderLib{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
                this._instance.initWhenCreate();
            }
            return this._instance;
        }

        public type:string = "twoDShadowMap";

        protected getShadowMapData(material:LightMaterial):TwoDShadowMapData{
            return material.twoDShadowMapData;
        }

        protected sendShadowMapShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){
            program.sendUniformData("u_vpMatrixFromLight", VariableType.FLOAT_MAT4, material.twoDShadowMapData.vpMatrixFromLight);
            program.sendUniformData("u_shadowMapSize", VariableType.FLOAT_2, material.twoDShadowMapData.shadowMapSize);
        }

        protected addShadowMapUniformVariable(){
            this.addUniformVariable([
                VariableNameTable.getVariableName("twoDShadowMap"),
                "u_shadowMapSize", "u_vpMatrixFromLight"
            ]);
        }
    }
}

