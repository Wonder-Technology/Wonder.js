module wd{
    export abstract class ProceduralShaderLib extends EngineShaderLib{
        public shader:ProceduralShader;

        @virtual
        public sendShaderVariables(program: Program, cmd:ProceduralCommand){
        }

        @virtual
        public setShaderDefinition(cmd:ProceduralCommand){
            super.setShaderDefinition(cmd, null);
        }
    }
}

