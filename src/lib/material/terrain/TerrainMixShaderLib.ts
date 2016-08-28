module wd{
    export class TerrainMixShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "terrainMix";

        //public sendShaderVariables(program: Program, cmd:QuadCommand, material:TerrainMaterial){
        //    //material.mix.mapData.forEach((mapData:TerrainMixData, index:number) => {
        //    //    program.sendStructureData(`u_mixHeightDatas[${index}].minHeight`, EVariableType.FLOAT_1, mapData.minHeight);
        //    //    program.sendStructureData(`u_mixHeightDatas[${index}].maxHeight`, EVariableType.FLOAT_1, mapData.maxHeight);
        //    //});
        //}

        public setShaderDefinition(cmd:QuadCommand, material:TerrainMaterial){
            super.setShaderDefinition(cmd, material);

            this.addUniformVariable(
                [
                VariableNameTable.getVariableName("mixMap"),
                    VariableNameTable.getVariableName("diffuseMap1"),
                    VariableNameTable.getVariableName("diffuseMap2"),
                    VariableNameTable.getVariableName("diffuseMap3"),
                ]
            );
        }
    }
}

