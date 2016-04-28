module wd{
    export class ModelMatrixNoInstanceShaderLib extends NoInstanceShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "modelMatrix_noInstance";

        public sendShaderVariables(program:Program, cmd:SingleDrawCommand, material:EngineMaterial){
            this.sendUniformData(program, "u_mMatrix", cmd.mMatrix);
        }

        public setShaderDefinition(cmd:SingleDrawCommand, material:EngineMaterial){
            super.setShaderDefinition(cmd, material);

            this.addUniformVariable(["u_mMatrix"]);
        }
    }
}

