module wd{
    export class WaterRefractionMapShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "water_refraction";

        public sendShaderVariables(program: Program, cmd:QuadCommand, material:WaterMaterial){
            RenderTargerRendererShaderLibUtils.judgeAndSendIsRenderListEmptyVariable(program, EShaderGLSLData.REFRACTION, "u_isRefractionRenderListEmpty");

            program.sendStructureData("u_levelData.refractionLevel", EVariableType.FLOAT_1, material.refractionLevel);
        }

        public setShaderDefinition(cmd:QuadCommand, material:WaterMaterial){
            super.setShaderDefinition(cmd, material);

            this.addUniformVariable([
                "u_levelData",
                "u_isRefractionRenderListEmpty",
                VariableNameTable.getVariableName("refractionMap")
            ]);
        }
    }
}

