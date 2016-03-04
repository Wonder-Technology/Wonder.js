module wd{
    export class MirrorForBasicShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }


        public type:string = "mirror_forBasic";

        public sendShaderVariables(program:Program, quadCmd:QuadCommand, material:EngineMaterial){
        }

        public setShaderDefinition(quadCmd:QuadCommand, material:EngineMaterial){
            super.setShaderDefinition(quadCmd, material);

            this.addUniformVariable([
                VariableNameTable.getVariableName("mirrorReflectionMap")
            ]);
        }
    }
}

