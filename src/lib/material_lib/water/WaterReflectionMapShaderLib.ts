module wd{
    export class WaterReflectionMapShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "water_reflection";

        public sendShaderVariables(program: Program, cmd:QuadCommand, material:WaterMaterial){
            program.sendStructureData("u_levelData.reflectionLevel", EVariableType.FLOAT_1, material.reflectionLevel);
        }

        public setShaderDefinition(quadCmd:QuadCommand, material:WaterMaterial){
            super.setShaderDefinition(quadCmd, material);

            this.addUniformVariable([
                VariableNameTable.getVariableName("reflectionMap"),
                "u_levelData"
            ]);
        }
    }
}

