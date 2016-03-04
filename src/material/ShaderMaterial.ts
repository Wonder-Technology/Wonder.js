module wd{
    export class ShaderMaterial extends Material{
        public static create() {
            var obj = new this();

            return obj;
        }

        public shader:CustomShader;

        @ensure(function(){
            //todo check lib count === 1;
        })
        public init(){
            this.shader.addLib(CustomShaderLib.create());

            super.init();
        }

        public read(definitionDataId:string){
            this.shader.read(LoaderManager.getInstance().get(definitionDataId));

            this.shader.getSampler2DUniformsAfterRead().forEach((uniform:ShaderData, name:string) => {
                this.addMap(<TwoDTexture>LoaderManager.getInstance().get(uniform.textureId), {
                    samplerVariableName: name
                });
            });
        }

        protected createShader(){
            return CustomShader.create();
        }
    }
}

