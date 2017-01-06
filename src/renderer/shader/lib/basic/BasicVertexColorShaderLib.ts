module wd{
    export class BasicVertexColorShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "basic_vertexColor";

        public sendShaderVariables(program: Program, cmd:QuadCommand, material:BasicMaterial){
            var colorBuffer:ArrayBuffer = cmd.buffers.getChild(EBufferDataType.COLOR);

            if(!!colorBuffer) {
                /*!
                 this cause warn:"PERFORMANCE WARNING: Attribute 0 is disabled. This has signficant performance penalty" here?
                 because a_color'pos is 0, and it should be array data(like Float32Array)
                 refer to: https://www.khronos.org/webgl/wiki/WebGL_and_OpenGL_Differences#Vertex_Attribute_0
                 */
                this.sendAttributeBuffer(program, "a_color", colorBuffer);
            }
        }

        public setShaderDefinition(cmd:QuadCommand, material:BasicMaterial){
            super.setShaderDefinition(cmd, material);

            this.addAttributeVariable(["a_color"]);
        }
    }
}
