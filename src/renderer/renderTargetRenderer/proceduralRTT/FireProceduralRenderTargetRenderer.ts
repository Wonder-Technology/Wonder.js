module wd {
    export class FireProceduralRenderTargetRenderer extends ProceduralRenderTargetRenderer{
        public static create(texture:FireProceduralTexture) {
            var obj = new this(texture);

            obj.initWhenCreate();

            return obj;
        }

        protected texture:FireProceduralTexture;

        public needRender():boolean{
            return true;
        }

        protected createShader(){
            var shader = CommonProceduralShader.create();

            shader.addLib(FireProceduralShaderLib.create(this.texture));

            return shader;
        }
    }
}

