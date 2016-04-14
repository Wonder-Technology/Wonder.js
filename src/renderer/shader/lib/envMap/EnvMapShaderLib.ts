module wd{
    export abstract class EnvMapShaderLib extends EngineShaderLib{
        public sendShaderVariables(program:Program, quadCmd:QuadCommand, material:EngineMaterial) {
            RenderTargerRendererShaderLibUtils.judgeAndSendIsRenderListEmptyVariable(program, EShaderGLSLData.DYNAMIC_CUBEMAP);
        }

        public setShaderDefinition(quadCmd:QuadCommand, material:EngineMaterial){
            super.setShaderDefinition(quadCmd, material);

            this.addUniformVariable([
                "u_isRenderListEmpty","u_samplerCube0"
            ]);

            this.vsSourceBody = this.getVsChunk().body;
        }
    }
}

