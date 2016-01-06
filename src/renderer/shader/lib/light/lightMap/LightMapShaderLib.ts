module wd{
    export abstract class LightMapShaderLib extends ShaderLib{
        public sendShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){
            if (quadCmd.buffers.hasChild(BufferDataType.TEXCOORD)) {
                this.sendAttributeData(program, "a_texCoord", <ArrayBuffer>quadCmd.buffers.getChild(BufferDataType.TEXCOORD));
            }
        }

        public setShaderDefinition(quadCmd:QuadCommand, material:Material){
            super.setShaderDefinition(quadCmd, material);

            this.addAttributeVariable(["a_texCoord"]);
        }
    }
}

