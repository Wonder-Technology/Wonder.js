module wd{
    export class MorphNormalShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "morphNormal";

        public sendShaderVariables(program:Program, quadCmd:QuadCommand, material:EngineMaterial){
            var morphNormalData = quadCmd.buffers.getChild(EBufferDataType.NORMAL);

            if(!morphNormalData){
                return;
            }

            this.sendAttributeData(program, "a_currentFrameNormal", morphNormalData[0]);
            this.sendAttributeData(program, "a_nextFrameNormal", morphNormalData[1]);
        }

        public setShaderDefinition(quadCmd:QuadCommand, material:EngineMaterial){
            super.setShaderDefinition(quadCmd, material);

            this.addAttributeVariable(["a_currentFrameNormal", "a_nextFrameNormal"]);
        }
    }
}

