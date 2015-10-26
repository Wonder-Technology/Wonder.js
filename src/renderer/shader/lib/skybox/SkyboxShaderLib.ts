/// <reference path="../../../../definitions.d.ts"/>
module dy{
    export class SkyboxShaderLib extends ShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }


        public type:string = "skybox";

        public sendShaderVariables(program:Program, quadCmd:QuadCommand, material:Material){
                if (quadCmd.buffers.hasChild("normalBuffer")) {
                    program.sendAttributeData("a_normal", VariableType.BUFFER, <ArrayBuffer>quadCmd.buffers.getChild("normalBuffer"));
                }
        }

        protected setShaderDefinition(){
            super.setShaderDefinition();

            this.addAttributeVariable(["a_normal"]);

            this.addUniformVariable(["u_samplerCube0"]);
        }
    }
}

