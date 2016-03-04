module wd{
    export class CustomShaderSourceBuilder extends ShaderSourceBuilder{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        public read(definitionData:ShaderDefinitionData){
            if(definitionData.attributes){
                this.attributes = wdCb.Hash.create<ShaderData>(definitionData.attributes);
            }

            if(definitionData.uniforms){
                this.uniforms = wdCb.Hash.create<ShaderData>(definitionData.uniforms);
            }

            this.vsSource = LoaderManager.getInstance().get(definitionData.vsSourceId);
            this.fsSource = LoaderManager.getInstance().get(definitionData.fsSourceId);
        }

        @require(function(libs:wdCb.Collection<ShaderLib>){
            assert(this.vsSource !== null, Log.info.FUNC_MUST_DEFINE("vsSource"));
            assert(this.fsSource !== null, Log.info.FUNC_MUST_DEFINE("fsSource"));
        })
        public build(libs:wdCb.Collection<ShaderLib>){
            this.convertAttributesData();
        }

        public clearShaderDefinition(){
            this.attributes.removeAllChildren();
            this.uniforms.removeAllChildren();
            this.vsSource = null;
            this.fsSource = null;
        }
    }
}
