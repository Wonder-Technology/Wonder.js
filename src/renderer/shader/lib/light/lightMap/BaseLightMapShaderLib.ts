module wd{
    export abstract class BaseLightMapShaderLib extends EngineShaderLib{
        public sendShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){
            var texCoordBuffer:ArrayBuffer = quadCmd.buffers.getChild(EBufferDataType.TEXCOORD);

            if(!texCoordBuffer){
                return;
            }

            this.sendAttributeData(program, "a_texCoord", texCoordBuffer);

            this.sendBaseLightMapShaderVariables(program, quadCmd, material);
        }

        public setShaderDefinition(quadCmd:QuadCommand, material:EngineMaterial){
            super.setShaderDefinition(quadCmd, material);

            this.addAttributeVariable(["a_texCoord"]);
        }

        @virtual
        protected sendBaseLightMapShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){
        }
    }
}

