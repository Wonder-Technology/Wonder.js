module wd{
    export class CommonEnvMapShaderLib extends EnvMapShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "common_envMap";

        public sendShaderVariables(program:Program, quadCmd:QuadCommand, material:EngineMaterial) {
            RenderTargerRendererShaderLibUtils.judgeAndSendIsRenderListEmptyVariable(program, EShaderGLSLData.DYNAMIC_CUBEMAP);
        }

        public setShaderDefinition(quadCmd:QuadCommand, material:EngineMaterial){
            super.setShaderDefinition(quadCmd, material);

            this.addUniformVariable([
                "u_isRenderListEmpty"
            ]);
        }
    }
}


