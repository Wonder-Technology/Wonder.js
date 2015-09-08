/// <reference path="../definitions.d.ts"/>
module dy{
    export class BasicMaterial extends Material{
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        public initWhenCreate(){
            this.shader = render.Shader.create(render.BasicShaderLib.getInstance().createShaderDefinition({}));
        }

        protected sendSpecificShaderVariables(quadCmd:render.QuadCommand){
            if(quadCmd.buffers.hasChild("colorBuffer")){
                /*!
                 this cause warn:"PERFORMANCE WARNING: Attribute 0 is disabled. This has signficant performance penalty" here?
                 because a_color'pos is 0, and it should be array data(like Float32Array)
                 refer to: https://www.khronos.org/webgl/wiki/WebGL_and_OpenGL_Differences#Vertex_Attribute_0
                 */


                this.program.setAttributeData("a_color", render.VariableType.BUFFER, <render.ArrayBuffer>quadCmd.buffers.getChild("colorBuffer"));
            }
        }
    }
}

