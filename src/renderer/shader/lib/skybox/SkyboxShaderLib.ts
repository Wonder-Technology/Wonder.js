module wd{
    export class SkyboxShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "skybox";

        public sendShaderVariables(program:Program, quadCmd:QuadCommand, material:EngineMaterial){
        }

        public setShaderDefinition(quadCmd:QuadCommand, material:EngineMaterial){
            super.setShaderDefinition(quadCmd, material);

            this.addUniformVariable(["u_samplerCube0"]);
        }
    }
}

