module wd{
    export class TotalShadowMapShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }


        public type:string = "totalShadowMap";

        public sendShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){
        }

        public setShaderDefinition(quadCmd:QuadCommand, material:EngineMaterial){
            var fs:GLSLChunk = null;

            super.setShaderDefinition(quadCmd, material);

            if(GPUDetector.getInstance().extensionDepthTexture) {
                fs = this.getFsChunk("totalShadowMap_depthMap");
            }
            else{
                fs = this.getFsChunk("totalShadowMap_unpackDepth");
            }

            this.fsSourceFuncDeclare += fs.funcDeclare;
            this.fsSourceDefine += fs.funcDefine;
        }
    }
}

