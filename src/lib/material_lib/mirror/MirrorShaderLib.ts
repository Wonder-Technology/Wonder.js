module wd{
    export class MirrorShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "mirror";

        public sendShaderVariables(program: Program, cmd:QuadCommand, material:Material){
            var glslData = null;

            glslData = Director.getInstance().scene.glslData.getChild(<any>EShaderGLSLData.MIRROR);

            if(!glslData){
                return;
            }

            if(glslData.isRenderListEmpty){
                program.sendUniformData("u_isRenderListEmpty", EVariableType.NUMBER_1, 1);
            }
        }

        public setShaderDefinition(quadCmd:QuadCommand, material:MirrorMaterial){
            super.setShaderDefinition(quadCmd, material);

            this.addUniformVariable([
                "u_isRenderListEmpty",
                VariableNameTable.getVariableName("reflectionMap")
            ]);
        }
    }
}

