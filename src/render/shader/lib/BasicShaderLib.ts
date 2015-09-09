/// <reference path="../../../definitions.d.ts"/>
module dy.render{
    export class BasicShaderLib extends ShaderLib{
        private static _instance:BasicShaderLib = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
                this._instance.initWhenCreate();
            }
            return this._instance;
        }

        public sendShaderVariables(program: Program, quadCmd:render.QuadCommand, material:Material){
            if(quadCmd.buffers.hasChild("colorBuffer")){
                /*!
                 this cause warn:"PERFORMANCE WARNING: Attribute 0 is disabled. This has signficant performance penalty" here?
                 because a_color'pos is 0, and it should be array data(like Float32Array)
                 refer to: https://www.khronos.org/webgl/wiki/WebGL_and_OpenGL_Differences#Vertex_Attribute_0
                 */


                program.sendAttributeData("a_color", render.VariableType.BUFFER, <render.ArrayBuffer>quadCmd.buffers.getChild("colorBuffer"));
            }
        }

        protected setShaderDefinition(){
            this.addAttributeVariable(["a_color"]);

            this.vsSourceHead = ShaderChunk.basic_head_vertex;
            this.vsSourceBody = ShaderSnippet.setPos_mvp + ShaderChunk.basic_body_vertex;
            this.fsSourceHead = ShaderChunk.basic_head_fragment;
            this.fsSourceBody = ShaderChunk.basic_body_fragment;
        }
    }
}

