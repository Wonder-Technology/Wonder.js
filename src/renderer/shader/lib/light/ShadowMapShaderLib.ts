/// <reference path="../../../../definitions.d.ts"/>
module dy{
    export class ShadowMapShaderLib extends ShaderLib{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
                this._instance.initWhenCreate();
            }
            return this._instance;
        }

        public type:string = "shadowMap";

        public sendShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){
            program.sendUniformData("u_mvpMatrixFromLight", VariableType.FLOAT_MAT4, material.shadowMapData.mvpMatrixFromLight);
            program.sendUniformData("u_shadowBias", VariableType.FLOAT_1, material.shadowMapData.shadowBias);
            program.sendUniformData("u_shadowDarkness", VariableType.FLOAT_1, material.shadowMapData.shadowDarkness);
        }

        protected setShaderDefinition(){
            super.setShaderDefinition();

            this.addUniformVariable([
                VariableNameTable.getVariableName("shadowMap"),
                "u_shadowBias", "u_shadowDarkness", "u_mvpMatrixFromLight"
            ]);
        }
    }
}

