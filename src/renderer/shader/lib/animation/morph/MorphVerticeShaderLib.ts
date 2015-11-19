/// <reference path="../../../../../definitions.d.ts"/>
module dy{
    export class MorphVerticeShaderLib extends ShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "morphVertice";

        @In(function(program:Program, quadCmd:QuadCommand, material:Material){
            assert(!!quadCmd.animation, Log.info.FUNC_SHOULD("gameObject", "add MorphAnimation component"));
        })
        public sendShaderVariables(program:Program, quadCmd:QuadCommand, material:Material){
            var anim = <MorphAnimation>(quadCmd.animation);

            if (quadCmd.buffers.hasChild(BufferDataType.VERTICE)) {
                let morphVerticeData = quadCmd.buffers.getChild(BufferDataType.VERTICE);


                this.sendAttributeData(program, "a_currentFramePosition", morphVerticeData[0]);
                this.sendAttributeData(program, "a_nextFramePosition", morphVerticeData[1]);
            }

            this.sendUniformData(program, "u_interpolation", anim.interpolation);
        }

        public setShaderDefinition(quadCmd:QuadCommand, material:Material){
            super.setShaderDefinition(quadCmd, material);

            this.addAttributeVariable(["a_currentFramePosition", "a_nextFramePosition"]);
            this.addUniformVariable(["u_interpolation"]);
        }
    }
}

