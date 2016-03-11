module wd{
    export class WaterRefractionMapShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "water_refraction";

        public sendShaderVariables(program: Program, cmd:QuadCommand, material:WaterMaterial){
            program.sendStructureData("u_levelData.refractionLevel", EVariableType.FLOAT_1, material.refractionLevel);
        }

        public setShaderDefinition(quadCmd:QuadCommand, material:WaterMaterial){
            super.setShaderDefinition(quadCmd, material);

            this.addUniformVariable([
                VariableNameTable.getVariableName("refractionMap"),
                "u_levelData"
            ]);
        }
    }
}

