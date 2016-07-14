module wd{
    export class BuildTwoDShadowMapShaderLib extends BuildShadowMapShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }


        public type:string = "buildTwoDShadowMap";

        public sendShaderVariables(program: Program, cmd:QuadCommand, material:LightMaterial){
            program.sendMatrix4("u_vpMatrixFromLight", cmd.vMatrix.applyMatrix(cmd.pMatrix, true));
        }

        public setShaderDefinition(cmd:QuadCommand, material:EngineMaterial){
            var fs:GLSLChunk = null;

            super.setShaderDefinition(cmd, material);

            this.addUniformVariable([
                "u_vpMatrixFromLight"
            ]);

            if(GPUDetector.getInstance().extensionDepthTexture) {
                fs = this.getFsChunk("buildTwoDShadowMap_depthMap");
            }
            else{
                fs = this.getFsChunk("buildTwoDShadowMap_packDepth");
            }

            this.fsSourceBody = fs.body;
        }
    }
}

