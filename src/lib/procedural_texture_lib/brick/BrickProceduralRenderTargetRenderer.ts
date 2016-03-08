module wd {
    export class BrickProceduralRenderTargetRenderer extends ProceduralRenderTargetRenderer{
        public static create(texture:BrickProceduralTexture) {
            var obj = new this(texture);

            obj.initWhenCreate();

            return obj;
        }

        protected texture:BrickProceduralTexture;

        protected createShader(){
            var shader = CommonProceduralShader.create();

            shader.addLib(BrickProceduralShaderLib.create(this.texture));

            return shader;
        }
    }
}

