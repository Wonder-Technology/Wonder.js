module wd{
    export class TerrainMixMapShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "terrain_mix";

        public sendShaderVariables(program: Program, cmd:QuadCommand, material:TerrainMaterial){
            var mapData:TerrainMixData = material.mix.mapData;

            this.sendUniformData(program, "u_diffuseMap1RepeatRegion", mapData.diffuseMap1.repeatRegion);
            this.sendUniformData(program, "u_diffuseMap2RepeatRegion", mapData.diffuseMap2.repeatRegion);
            this.sendUniformData(program, "u_diffuseMap3RepeatRegion", mapData.diffuseMap3.repeatRegion);
        }

        public setShaderDefinition(cmd:QuadCommand, material:TerrainMaterial){
            super.setShaderDefinition(cmd, material);

            this.addUniformVariable(
                [
                    VariableNameTable.getVariableName("mixMap"),
                    VariableNameTable.getVariableName("diffuseMap1"),
                    VariableNameTable.getVariableName("diffuseMap2"),
                    VariableNameTable.getVariableName("diffuseMap3"),

                    "u_diffuseMap1RepeatRegion",
                    "u_diffuseMap2RepeatRegion",
                    "u_diffuseMap3RepeatRegion"
                ]
            );
        }
    }
}

