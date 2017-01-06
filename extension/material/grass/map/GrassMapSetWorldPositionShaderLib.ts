module wd{
    export class GrassMapSetWorldPositionShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "grass_map_setWorldPosition";

        public sendShaderVariables(program: Program, cmd:QuadCommand, material:GrassMapMaterial){
            program.sendStructureData("u_windData.direction", EVariableType.VECTOR_2, material.wind.direction);
            program.sendStructureData("u_windData.time", EVariableType.FLOAT_1, material.wind.time);
            program.sendStructureData("u_windData.strength", EVariableType.FLOAT_1, material.wind.strength);
        }

        public setShaderDefinition(cmd:QuadCommand, material:GrassMapMaterial){
            super.setShaderDefinition(cmd, material);

            this.addUniformVariable([
                "u_windData"
            ]);
        }
    }
}

