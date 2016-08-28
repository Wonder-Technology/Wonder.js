module wd{
    export class TerrainMixShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "terrainMix";

        public sendShaderVariables(program: Program, cmd:QuadCommand, material:TerrainMaterial){
            var mapData:TerrainMixData = material.mix.mapData;

            //todo test:only send repeat region, not send source region

            this.sendUniformData(program, "u_diffuse1RepeatRegion", mapData.diffuseMap1.repeatRegion);
            this.sendUniformData(program, "u_diffuse2RepeatRegion", mapData.diffuseMap2.repeatRegion);
            this.sendUniformData(program, "u_diffuse3RepeatRegion", mapData.diffuseMap3.repeatRegion);
        }

        public setShaderDefinition(cmd:QuadCommand, material:TerrainMaterial){
            super.setShaderDefinition(cmd, material);

            this.addUniformVariable(
                [
                VariableNameTable.getVariableName("mixMap"),
                    VariableNameTable.getVariableName("diffuseMap1"),
                    VariableNameTable.getVariableName("diffuseMap2"),
                    VariableNameTable.getVariableName("diffuseMap3"),

                    "u_diffuse1RepeatRegion",
                    "u_diffuse2RepeatRegion",
                    "u_diffuse3RepeatRegion"
                ]
            );
        }
    }
}

