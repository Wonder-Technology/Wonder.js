/// <reference path="../../../../../definitions.d.ts"/>
module dy{
    export abstract class LightMapShaderLib extends ShaderLib{
        public sendShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){
            if (quadCmd.buffers.hasChild("texCoordBuffer")) {
                program.sendAttributeData("a_texCoord", VariableType.BUFFER, <ArrayBuffer>quadCmd.buffers.getChild("texCoordBuffer"));
            }
        }

        protected setShaderDefinition(quadCmd:QuadCommand, material:Material){
            super.setShaderDefinition(quadCmd, material);

            this.addAttributeVariable(["a_texCoord"]);
        }
    }
}

