module wd {
    export class MarbleProceduralRenderTargetRenderer extends ProceduralRenderTargetRenderer{
        public static create(texture:MarbleProceduralTexture) {
            var obj = new this(texture);

            obj.initWhenCreate();

            return obj;
        }

        public texture:MarbleProceduralTexture;

        protected createShader(){
            var shader = CommonProceduralShader.create();

            shader.addLib(MarbleProceduralShaderLib.create(this.texture));

            return shader;
        }
    }
}

