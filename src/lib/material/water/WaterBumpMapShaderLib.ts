module wd{
    export class WaterBumpMapShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "water_bump";

        public sendShaderVariables(program: Program, cmd:QuadCommand, material:WaterMaterial){
            this.sendUniformData(program, "u_windMatrix", material.wind.matrix);
        }

        public setShaderDefinition(cmd:QuadCommand, material:WaterMaterial){
            super.setShaderDefinition(cmd, material);

            this.addUniformVariable([
                VariableNameTable.getVariableName("bumpMap"),
                "u_windMatrix"
            ]);
        }
    }
}

