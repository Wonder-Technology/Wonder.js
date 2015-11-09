/// <reference path="../../../../definitions.d.ts"/>
module dy{
    export class SkyboxShaderLib extends ShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }


        public type:string = "skybox";

        public sendShaderVariables(program:Program, quadCmd:QuadCommand, material:Material){
                if (quadCmd.buffers.hasChild(BufferDataType.NORMAL)) {
                    program.sendAttributeData("a_normal", VariableType.BUFFER, <ArrayBuffer>quadCmd.buffers.getChild(BufferDataType.NORMAL));
                }
        }

        public setShaderDefinition(quadCmd:QuadCommand, material:Material){
            super.setShaderDefinition(quadCmd, material);

            this.addAttributeVariable(["a_normal"]);

            this.addUniformVariable(["u_samplerCube0"]);
        }
    }
}

