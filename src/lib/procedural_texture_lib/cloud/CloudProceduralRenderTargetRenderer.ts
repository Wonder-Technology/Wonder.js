module wd {
    export class CloudProceduralRenderTargetRenderer extends ProceduralRenderTargetRenderer{
        public static create(texture:CloudProceduralTexture) {
            var obj = new this(texture);

            obj.initWhenCreate();

            return obj;
        }

        protected texture:CloudProceduralTexture;

        protected createShader(){
            var shader = CommonProceduralShader.create();

            shader.addLib(CloudProceduralShaderLib.create(this.texture));

            return shader;
        }
    }
}

