module wd{
    export class WaterFresnelShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "water_fresnel";

        public sendShaderVariables(program: Program, cmd:QuadCommand, material:WaterMaterial){
            program.sendStructureData("u_levelData.fresnelLevel", EVariableType.FLOAT_1, material.fresnelLevel);
            program.sendStructureData("u_levelData.refractionLevel", EVariableType.FLOAT_1, material.refractionLevel);
            program.sendStructureData("u_levelData.reflectionLevel", EVariableType.FLOAT_1, material.reflectionLevel);
        }

        public setShaderDefinition(quadCmd:QuadCommand, material:WaterMaterial){
            super.setShaderDefinition(quadCmd, material);

            this.addUniformVariable([
                VariableNameTable.getVariableName("reflectionMap"),
                VariableNameTable.getVariableName("refractionMap"),
                "u_levelData"
            ]);
        }
    }
}

