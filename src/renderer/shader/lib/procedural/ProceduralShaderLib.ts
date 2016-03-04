module wd{
    export abstract class ProceduralShaderLib extends ShaderLib{
        public abstract sendShaderVariables(program: Program, cmd:ProceduralCommand);

        @virtual
        public setShaderDefinition(cmd:ProceduralCommand){
            super.setShaderDefinition(cmd, null);
        }
    }
}

