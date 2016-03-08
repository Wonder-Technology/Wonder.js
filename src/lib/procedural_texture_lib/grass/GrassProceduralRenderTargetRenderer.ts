module wd {
    export class GrassProceduralRenderTargetRenderer extends ProceduralRenderTargetRenderer{
        public static create(texture:GrassProceduralTexture) {
            var obj = new this(texture);

            obj.initWhenCreate();

            return obj;
        }

        protected texture:GrassProceduralTexture;

        protected createShader(){
            var shader = CommonProceduralShader.create();

            shader.addLib(GrassProceduralShaderLib.create(this.texture));

            return shader;
        }
    }
}

