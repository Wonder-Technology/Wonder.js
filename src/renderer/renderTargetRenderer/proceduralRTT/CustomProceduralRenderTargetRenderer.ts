module wd {
    export class CustomProceduralRenderTargetRenderer extends ProceduralRenderTargetRenderer{
        public static create(texture:CustomProceduralTexture) {
            var obj = new this(texture);

            obj.initWhenCreate();

            return obj;
        }

        protected texture:CustomProceduralTexture;

        protected createShader(){
            var shader = CustomProceduralShader.create(this.texture);

            shader.addLib(CustomProceduralShaderLib.create(this.texture));

            return shader;
        }
    }
}

