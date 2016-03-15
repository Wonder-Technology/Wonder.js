module wd{
    export class NoInstanceShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "noInstance";

        public sendShaderVariables(program:Program, quadCmd:QuadCommand, material:EngineMaterial){
                this.sendUniformData(program, "u_mMatrix", quadCmd.mMatrix);

        }

        public setShaderDefinition(quadCmd:QuadCommand, material:EngineMaterial){
            super.setShaderDefinition(quadCmd, material);

            this.addUniformVariable(["u_mMatrix"]);
        }
    }
}

