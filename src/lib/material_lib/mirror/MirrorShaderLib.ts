module wd{
    export class MirrorShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "mirror";

        public sendShaderVariables(program: Program, cmd:QuadCommand, material:Material){
            RenderTargerRendererShaderLibUtils.judgeAndSendIsRenderListEmptyVariable(program, EShaderGLSLData.MIRROR);
        }

        public setShaderDefinition(cmd:QuadCommand, material:MirrorMaterial){
            super.setShaderDefinition(cmd, material);

            this.addUniformVariable([
                "u_isRenderListEmpty",
                VariableNameTable.getVariableName("reflectionMap")
            ]);
        }
    }
}

