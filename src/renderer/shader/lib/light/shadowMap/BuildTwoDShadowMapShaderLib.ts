/// <reference path="../../../../../definitions.d.ts"/>
module dy{
    export class BuildTwoDShadowMapShaderLib extends BuildShadowMapShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }


        public type:string = "buildTwoDShadowMap";

        public sendShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){
            this.sendUniformData(program, "u_vpMatrixFromLight", material.buildTwoDShadowMapData.vpMatrixFromLight);
        }

        protected setShaderDefinition(quadCmd:QuadCommand, material:Material){
            super.setShaderDefinition(quadCmd, material);

            this.addUniformVariable([
                "u_vpMatrixFromLight"
            ]);
        }
    }
}

