module wd{
    export class ModelMatrixBatchInstanceShaderLib extends ModelMatrixInstanceShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "modelMatrix_batch_instance";

        public sendShaderVariables(program:Program, cmd:InstanceCommand, material:EngineMaterial){
        }

        public setShaderDefinition(cmd:InstanceCommand, material:EngineMaterial){
            super.setShaderDefinition(cmd, material);

            this.addUniformVariable(["u_mMatrix"]);
        }
    }
}

