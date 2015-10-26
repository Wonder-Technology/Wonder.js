/// <reference path="../../../../../definitions.d.ts"/>
module dy{
    export abstract class LightMapShaderLib extends ShaderLib{
        public sendShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){
            if (quadCmd.buffers.hasChild("texCoordBuffer")) {
                this.sendAttributeData(program, "a_texCoord", <ArrayBuffer>quadCmd.buffers.getChild("texCoordBuffer"));
            }
        }

        public setShaderDefinition(quadCmd:QuadCommand, material:Material){
            super.setShaderDefinition(quadCmd, material);

            this.addAttributeVariable(["a_texCoord"]);
        }
    }
}

