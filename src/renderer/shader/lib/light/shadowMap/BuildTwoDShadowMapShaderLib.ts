/// <reference path="../../../../../definitions.d.ts"/>
module dy{
    export class BuildTwoDShadowMapShaderLib extends BuildShadowMapShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }


        public type:string = "buildTwoDShadowMap";

        public sendShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){
            program.sendUniformData("u_vpMatrixFromLight", VariableType.FLOAT_MAT4, material.buildTwoDShadowMapData.vpMatrixFromLight);
        }

        protected setShaderDefinition(quadCmd:QuadCommand, material:Material){
            super.setShaderDefinition(quadCmd, material);

            this.addUniformVariable([
                "u_vpMatrixFromLight"
            ]);
        }
    }
}

