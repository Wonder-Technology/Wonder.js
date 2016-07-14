module wd{
    export class CommonEnvMapShaderLib extends EnvMapShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "common_envMap";

        public sendShaderVariables(program:Program, cmd:QuadCommand, material:EngineMaterial) {
            RenderTargerRendererShaderLibUtils.judgeAndSendIsRenderListEmptyVariable(program, EShaderGLSLData.DYNAMIC_CUBEMAP);
        }

        public setShaderDefinition(cmd:QuadCommand, material:EngineMaterial){
            super.setShaderDefinition(cmd, material);

            this.addUniformVariable([
                "u_isRenderListEmpty"
            ]);
        }
    }
}


