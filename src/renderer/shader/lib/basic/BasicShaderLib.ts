/// <reference path="../../../../definitions.d.ts"/>
module dy{
    export class BasicShaderLib extends ShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }


        public type:string = "basic";

        public sendShaderVariables(program: Program, quadCmd:QuadCommand, material:Material){
            if(quadCmd.buffers.hasChild("colorBuffer")){
                /*!
                 this cause warn:"PERFORMANCE WARNING: Attribute 0 is disabled. This has signficant performance penalty" here?
                 because a_color'pos is 0, and it should be array data(like Float32Array)
                 refer to: https://www.khronos.org/webgl/wiki/WebGL_and_OpenGL_Differences#Vertex_Attribute_0
                 */


                program.sendAttributeData("a_color", VariableType.BUFFER, <ArrayBuffer>quadCmd.buffers.getChild("colorBuffer"));
            }
        }

        protected setShaderDefinition(){
            super.setShaderDefinition();

            this.addAttributeVariable(["a_color"]);

            this.vsSourceBody = ShaderSnippet.setPos_mvp + ShaderChunk.basic_vertex.body;
        }
    }
}

