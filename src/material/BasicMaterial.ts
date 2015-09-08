/// <reference path="../definitions.d.ts"/>
module dy{
    export class BasicMaterial extends Material{
        public static create() {
            var obj = new this();

            return obj;
        }

        public shader:render.Shader = render.Shader.create(render.BasicShaderLib.getInstance().createShaderDefinition({}));

        public updateShader(quadCmd:render.QuadCommand){
            super.updateShader(quadCmd);

            this.textureManager.sendData(this.program);

            this.program.setUniformDataFromShader();
            this.program.setAttributeDataFromShader();
        }
    }
}

