module wd{
    export class NormalMorphShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "normal_morph";

        public sendShaderVariables(program:Program, quadCmd:QuadCommand, material:EngineMaterial){
            var morphNormalData = quadCmd.buffers.getChild(EBufferDataType.NORMAL);

            if(!morphNormalData){
                return;
            }

            this.sendAttributeBuffer(program, "a_currentFrameNormal", morphNormalData[0]);
            this.sendAttributeBuffer(program, "a_nextFrameNormal", morphNormalData[1]);
        }

        public setShaderDefinition(quadCmd:QuadCommand, material:EngineMaterial){
            super.setShaderDefinition(quadCmd, material);

            this.addAttributeVariable(["a_currentFrameNormal", "a_nextFrameNormal"]);
        }
    }
}

