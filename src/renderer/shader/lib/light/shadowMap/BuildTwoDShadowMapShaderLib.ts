module wd{
    export class BuildTwoDShadowMapShaderLib extends BuildShadowMapShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }


        public type:string = "buildTwoDShadowMap";

        public sendShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){
            program.sendMatrix4("u_vpMatrixFromLight", quadCmd.vMatrix.applyMatrix(quadCmd.pMatrix, true));
        }

        public setShaderDefinition(quadCmd:QuadCommand, material:EngineMaterial){
            super.setShaderDefinition(quadCmd, material);

            this.addUniformVariable([
                "u_vpMatrixFromLight"
            ]);
        }
    }
}

