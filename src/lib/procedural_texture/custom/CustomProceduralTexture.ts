module wd {
    export class CustomProceduralTexture extends ProceduralTexture {
        public static create() {
        	var obj = new this();

            obj.initWhenCreate();

        	return obj;
        }

        @cloneAttributeAsCustomType(function(source:CustomProceduralTexture, target:CustomProceduralTexture, memberName:string){
            source[memberName].getMapList().forEach((map:BasicTexture|ProceduralTexture) => {
                target[memberName].addMap(map.clone());
            });
        })
        public mapManager:MapManager = MapManager.create();
        @cloneAttributeAsCloneable()
        public uniformMap:wdCb.Hash<ShaderData> = wdCb.Hash.create<ShaderData>();
        @cloneAttributeAsBasicType()
        public fsSource:string = null;

        public init(){
            super.init();

            Director.getInstance().scene.addProceduralRenderTargetRenderer(CustomProceduralRenderTargetRenderer.create(this));

            this.mapManager.init();

            return this;
        }

        //todo support SAMPLER_CUBE type
        @require(function(shaderConfigId:string){
            var shaderConfig:CustomProceduralTextureShaderDefinitionData = LoaderManager.getInstance().get(shaderConfigId),
                uniforms:Object = shaderConfig.uniforms;

            for (let name in uniforms) {
                if (uniforms.hasOwnProperty(name)) {
                    let uniform:ShaderData = uniforms[name];

                    assert(uniform.type !== EVariableType.SAMPLER_CUBE, Log.info.FUNC_NOT_SUPPORT("uniforms", "EVariableType.SAMPLER_CUBE type"));
                }
            }
        })
        @ensure(function(){
            assert(this.fsSource !== null, Log.info.FUNC_SHOULD("read fragment glsl source"));
        })
        public read(shaderConfigId:string){
            var shaderConfig:CustomProceduralTextureShaderDefinitionData = LoaderManager.getInstance().get(shaderConfigId),
                uniforms:Object = shaderConfig.uniforms;

            this.fsSource =  LoaderManager.getInstance().get(shaderConfig.fsSourceId);

            this.renderRate = shaderConfig.renderRate || 0;

            for (let name in uniforms){
                if(uniforms.hasOwnProperty(name)){
                    let uniform:ShaderData = uniforms[name];

                    if(uniform.type === EVariableType.SAMPLER_2D){
                        this.mapManager.addMap(<TextureAsset>LoaderManager.getInstance().get(uniform.textureId), {
                            samplerVariableName: name
                        });
                    }
                    else{
                        this.uniformMap.addChild(name, uniform);
                    }
                }
            }
        }
    }

    export type CustomProceduralTextureShaderDefinitionData = {
        uniforms:wdCb.Hash<ShaderData>;
        fsSourceId:string;
        renderRate:number;
    }
}

