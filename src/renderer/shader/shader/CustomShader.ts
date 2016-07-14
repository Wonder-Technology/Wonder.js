module wd{
    export class CustomShader extends Shader{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        protected sourceBuilder:CustomShaderSourceBuilder;
        protected libs:wdCb.Collection<CustomShaderLib>;


        public update(cmd:QuadCommand, material:ShaderMaterial){
            var program = null;

            this.judgeRefreshShader(cmd, material);

            program = this.program;

            program.use();

            this.libs.forEach((lib:CustomShaderLib) => {
                lib.sendShaderVariables(program, cmd, material);
            });

            this.mapManager.bindAndUpdate();
            this.mapManager.sendData(program);
        }

        public read(definitionData:ShaderDefinitionData){
            this.sourceBuilder.clearShaderDefinition();

            this.sourceBuilder.read(definitionData);

            this.libDirty = true;
        }

        public getSampler2DUniformsAfterRead(){
            return this.sourceBuilder.uniforms.filter((uniform:ShaderData, name:string) => {
                return uniform.type === EVariableType.SAMPLER_2D;
            });
        }

        protected buildDefinitionData(cmd:RenderCommand, material:Material){
            this.sourceBuilder.build();

            this.attributes = this.sourceBuilder.attributes;
            this.uniforms = this.sourceBuilder.uniforms;
            this.vsSource = this.sourceBuilder.vsSource;
            this.fsSource = this.sourceBuilder.fsSource;

        }

        protected createShaderSourceBuilder():ShaderSourceBuilder{
            return CustomShaderSourceBuilder.create();
        }
    }

    export type ShaderDefinitionData = {
        attributes:wdCb.Hash<ShaderData>;
        uniforms:wdCb.Hash<ShaderData>;

        vsSourceId:string;
        fsSourceId:string;
    }
}
