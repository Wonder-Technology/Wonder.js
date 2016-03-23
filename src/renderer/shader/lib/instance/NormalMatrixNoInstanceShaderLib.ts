module wd{
    export class NormalMatrixNoInstanceShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "normalMatrix_noInstance";

        public sendShaderVariables(program:Program, cmd:SingleDrawCommand, material:EngineMaterial){
            this.sendUniformData(program, "u_normalMatrix", cmd.normalMatrix);
        }

        public setShaderDefinition(cmd:SingleDrawCommand, material:EngineMaterial){
            super.setShaderDefinition(cmd, material);

            this.addUniformVariable(["u_normalMatrix"]);
        }
    }
}

