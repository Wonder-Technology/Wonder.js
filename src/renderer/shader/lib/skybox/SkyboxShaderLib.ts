module wd{
    export class SkyboxShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "skybox";

        public sendShaderVariables(program:Program, cmd:QuadCommand, material:EngineMaterial){
        }

        public setShaderDefinition(cmd:QuadCommand, material:EngineMaterial){
            super.setShaderDefinition(cmd, material);

            this.addUniformVariable(["u_samplerCube0"]);
        }
    }
}

