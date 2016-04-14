module wd{
    export class WaterReflectionMapShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "water_reflection";

        public sendShaderVariables(program: Program, cmd:QuadCommand, material:WaterMaterial){
            RenderTargerRendererShaderLibUtils.judgeAndSendIsRenderListEmptyVariable(program, EShaderGLSLData.MIRROR, "u_isReflectionRenderListEmpty");

            program.sendStructureData("u_levelData.reflectionLevel", EVariableType.FLOAT_1, material.reflectionLevel);
        }

        public setShaderDefinition(quadCmd:QuadCommand, material:WaterMaterial){
            super.setShaderDefinition(quadCmd, material);

            this.addUniformVariable([
                "u_levelData",
                "u_isReflectionRenderListEmpty",
                VariableNameTable.getVariableName("reflectionMap")
            ]);
        }
    }
}

