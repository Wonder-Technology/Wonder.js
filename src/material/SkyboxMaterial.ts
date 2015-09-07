/// <reference path="../definitions.d.ts"/>
module dy{
    export class SkyboxMaterial extends Material{
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        public shader:render.Shader = render.Shader.create(render.SkyboxShaderLib.getInstance().createShaderDefinition({}));

        public initWhenCreate(){
            this.cullMode = CullMode.FRONT;
        }

        //todo duplicate
        public updateShader(quadCmd:render.QuadCommand){
            this.textureManager.sendData(this.program);

            this.program.setUniformDataFromShader();
            this.program.setAttributeDataFromShader();
        }
    }
}

