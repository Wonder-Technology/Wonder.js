module wd{
    export class BuildTwoDShadowMapShaderLib extends BuildShadowMapShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }


        public type:string = "buildTwoDShadowMap";

        public sendShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){
            //this.sendUniformData(program, "u_vpMatrixFromLight", material.glslData.getChild(<any>EShaderGLSLData.BUILD_TWOD_SHADOWMAP).vpMatrixFromLight);
            this.sendUniformData(program, "u_vpMatrixFromLight", quadCmd.vMatrix.applyMatrix(quadCmd.pMatrix, true));
        }

        public setShaderDefinition(quadCmd:QuadCommand, material:EngineMaterial){
            super.setShaderDefinition(quadCmd, material);

            this.addUniformVariable([
                "u_vpMatrixFromLight"
            ]);
        }
    }
}

