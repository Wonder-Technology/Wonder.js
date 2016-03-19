module wd{
    export class InstanceShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "instance";

        public sendShaderVariables(program:Program, quadCmd:QuadCommand, material:EngineMaterial){
        }

        public setShaderDefinition(quadCmd:QuadCommand, material:EngineMaterial){
            super.setShaderDefinition(quadCmd, material);

            this.addAttributeVariable(["a_mVec4_0", "a_mVec4_1","a_mVec4_2","a_mVec4_3"]);
        }
    }
}

