/// <reference path="../definitions.d.ts"/>
module dy{
    export class SkyboxMaterial extends Material{
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        public initWhenCreate(){
            this.cullMode = CullMode.FRONT;
            //this.shader = render.Shader.create(render.SkyboxShaderLib.getInstance().createShaderDefinition({}));
        }
        //
        //protected sendSpecificShaderVariables(quadCmd:render.QuadCommand){
        //    if (quadCmd.buffers.hasChild("normalBuffer")) {
        //        this.program.setAttributeData("a_normal", render.VariableType.BUFFER, <render.ArrayBuffer>quadCmd.buffers.getChild("normalBuffer"));
        //    }
        //}
    }
}

