/// <reference path="../../../../definitions.d.ts"/>
module dy{
    export class SkyboxShaderLib extends ShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "skybox";

        public sendShaderVariables(program:Program, quadCmd:QuadCommand, material:Material){
        }

        public setShaderDefinition(quadCmd:QuadCommand, material:Material){
            super.setShaderDefinition(quadCmd, material);

            this.addUniformVariable(["u_samplerCube0"]);
        }
    }
}

