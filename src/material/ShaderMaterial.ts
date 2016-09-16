module wd{
    export class ShaderMaterial extends Material{
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        public shader:CustomShader;

        @cloneAttributeAsBasicType()
        public definitionData:ShaderDefinitionData = null;

        @ensure(function(){
            it("should only has CustomShaderLib and EndShaderLib, not has other shader libs", () => {
                expect(this.shader.getLibs().getCount() === 2 && this.shader.hasLib(CustomShaderLib)).true;
            });
        })
        public init(){
            this.shader.read(this.definitionData);

            this.shader.getSampler2DUniformsAfterRead().forEach((uniform:ShaderData, name:string) => {
                this.mapManager.addMap(<TwoDTexture>LoaderManager.getInstance().get(uniform.textureId), {
                    samplerVariableName: name
                });
            });

            this.shader.addLib(CustomShaderLib.create());
            this.shader.addLib(EndShaderLib.create());

            super.init();
        }

        public getTextureForRenderSort():Texture{
            return null;
        }

        public read(definitionDataId:string){
            this.definitionData = LoaderManager.getInstance().get(definitionDataId);
        }

        protected createShader(){
            return CustomShader.create();
        }
    }

    export type ShaderDefinitionData = {
        attributes:ShaderData;
        uniforms:ShaderData;

        vsSourceId:string;
        fsSourceId:string;
    }
}

