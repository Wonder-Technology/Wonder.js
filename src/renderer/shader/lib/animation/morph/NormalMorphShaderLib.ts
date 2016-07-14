module wd{
    export class NormalMorphShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "normal_morph";

        public sendShaderVariables(program:Program, cmd:QuadCommand, material:EngineMaterial){
            var morphNormalData = cmd.buffers.getChild(EBufferDataType.NORMAL);

            if(!morphNormalData){
                return;
            }

            this.sendAttributeBuffer(program, "a_currentFrameNormal", morphNormalData[0]);
            this.sendAttributeBuffer(program, "a_nextFrameNormal", morphNormalData[1]);
        }

        public setShaderDefinition(cmd:QuadCommand, material:EngineMaterial){
            super.setShaderDefinition(cmd, material);

            this.addAttributeVariable(["a_currentFrameNormal", "a_nextFrameNormal"]);
        }
    }
}

