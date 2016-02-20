module wd{
    export abstract class LightMapShaderLib extends ShaderLib{
        public sendShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){
            var texCoordBuffer:ArrayBuffer = quadCmd.buffers.getChild(EBufferDataType.TEXCOORD);

            if(!texCoordBuffer){
                return;
            }

            this.sendAttributeData(program, "a_texCoord", texCoordBuffer);
        }

        public setShaderDefinition(quadCmd:QuadCommand, material:Material){
            super.setShaderDefinition(quadCmd, material);

            this.addAttributeVariable(["a_texCoord"]);
        }
    }
}

