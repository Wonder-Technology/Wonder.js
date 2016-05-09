module wd{
    export class ShaderMaterial extends Material{
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        public shader:CustomShader;

        @ensure(function(){
            assert(this.shader.getLibs().getCount() === 2 && this.shader.hasLib(CustomShaderLib), Log.info.FUNC_SHOULD("only has CustomShaderLib and EndShaderLib, not has other shader libs"));
        })
        public init(){
            this.shader.addLib(CustomShaderLib.create());
            this.shader.addLib(EndShaderLib.create());

            super.init();
        }

        public getTextureForRenderSort():Texture{
            return null;
        }

        public read(definitionDataId:string){
            this.shader.read(LoaderManager.getInstance().get(definitionDataId));

            this.shader.getSampler2DUniformsAfterRead().forEach((uniform:ShaderData, name:string) => {
                this.mapManager.addMap(<TwoDTexture>LoaderManager.getInstance().get(uniform.textureId), {
                    samplerVariableName: name
                });
            });
        }

        protected createShader(){
            return CustomShader.create();
        }
    }
}

