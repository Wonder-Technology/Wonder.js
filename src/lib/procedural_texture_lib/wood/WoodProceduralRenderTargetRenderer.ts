module wd {
    export class WoodProceduralRenderTargetRenderer extends ProceduralRenderTargetRenderer{
        public static create(texture:WoodProceduralTexture) {
            var obj = new this(texture);

            obj.initWhenCreate();

            return obj;
        }

        public texture:WoodProceduralTexture;

        protected createShader(){
            var shader = CommonProceduralShader.create();

            shader.addLib(WoodProceduralShaderLib.create(this.texture));

            return shader;
        }
    }
}

