module wd{
    export class InstanceShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "instance";

        public sendShaderVariables(program:Program, quadCmd:QuadCommand, material:EngineMaterial){
            //todo send?
        }

        public setShaderDefinition(quadCmd:QuadCommand, material:EngineMaterial){
            super.setShaderDefinition(quadCmd, material);

            this.addUniformVariable(["u_mVec4_0", "u_mVec4_1","u_mVec4_2","u_mVec4_3"]);
        }
    }
}

