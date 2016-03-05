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

        public build(){
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
