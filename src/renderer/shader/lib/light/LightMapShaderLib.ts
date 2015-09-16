/// <reference path="../../../../definitions.d.ts"/>
module dy{
    export class LightMapShaderLib extends ShaderLib{
        public sendShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){
            if (quadCmd.buffers.hasChild("texCoordsBuffer")) {
                program.sendAttributeData("a_texCoord", VariableType.BUFFER, <ArrayBuffer>quadCmd.buffers.getChild("texCoordsBuffer"));
            }
        }

        protected setShaderDefinition(){
            this.addAttributeVariable(["a_texCoord"]);
        }
    }
}

