module wd{
    export class VerticeMorphShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "vertice_morph";

        @require(function(program:Program, cmd:QuadCommand, material:EngineMaterial){
            assert(cmd.target.hasComponent(MorphAnimation), Log.info.FUNC_SHOULD("entityObject", "has MorphAnimation component"));
        })
        public sendShaderVariables(program:Program, cmd:QuadCommand, material:EngineMaterial){
            var morphVerticeData = cmd.buffers.getChild(EBufferDataType.VERTICE);

            if(!morphVerticeData){
                return;
            }

            this.sendAttributeBuffer(program, "a_currentFramePosition", morphVerticeData[0]);
            this.sendAttributeBuffer(program, "a_nextFramePosition", morphVerticeData[1]);
        }

        public setShaderDefinition(cmd:QuadCommand, material:EngineMaterial){
            super.setShaderDefinition(cmd, material);

            this.addAttributeVariable(["a_currentFramePosition", "a_nextFramePosition"]);
        }
    }
}

