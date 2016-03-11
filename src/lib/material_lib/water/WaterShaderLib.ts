module wd{
    export class WaterShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "water";

        public sendShaderVariables(program: Program, cmd:QuadCommand, material:WaterMaterial){
            program.sendStructureData("u_waveData.length", EVariableType.FLOAT_1, material.wave.length);
            program.sendStructureData("u_waveData.height", EVariableType.FLOAT_1, material.wave.height);

            program.sendUniformData("u_windMatrix", EVariableType.FLOAT_MAT4, material.wind.matrix);
        }

        public setShaderDefinition(quadCmd:QuadCommand, material:WaterMaterial){
            super.setShaderDefinition(quadCmd, material);

            this.addUniformVariable([
                "u_waveData",
                "u_windMatrix"
            ]);
        }
    }
}

