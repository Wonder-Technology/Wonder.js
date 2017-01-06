module wd {
    export class RoadProceduralRenderTargetRenderer extends ProceduralRenderTargetRenderer{
        public static create(texture:RoadProceduralTexture) {
            var obj = new this(texture);

            obj.initWhenCreate();

            return obj;
        }

        public texture:RoadProceduralTexture;

        protected createShader(){
            var shader = CommonProceduralShader.create();

            shader.addLib(RoadProceduralShaderLib.create(this.texture));

            return shader;
        }
    }
}

