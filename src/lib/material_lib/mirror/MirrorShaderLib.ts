module wd{
    export class MirrorShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "mirror";

        public sendShaderVariables(program: Program, cmd:QuadCommand, material:MirrorMaterial){
        }

        public setShaderDefinition(quadCmd:QuadCommand, material:MirrorMaterial){
            super.setShaderDefinition(quadCmd, material);

            this.addUniformVariable([
                VariableNameTable.getVariableName("reflectionMap")
            ]);
        }
    }
}

