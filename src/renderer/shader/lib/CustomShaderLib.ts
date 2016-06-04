module wd{
    export class CustomShaderLib extends ShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public shader:CustomShader;

        public sendShaderVariables(program: Program, cmd:QuadCommand, material:ShaderMaterial){
            var shader:CustomShader = this.shader;

                shader.attributes.forEach((attribute:ShaderData, name:string) => {
                    CustomShaderLibUtils.sendAttributeBufferWithSemantic(name, attribute.type, attribute.value, program, cmd);
                });

            shader.uniforms.forEach((uniform:ShaderData, name:string) => {
                if(uniform.type !== EVariableType.SAMPLER_2D){
                    CustomShaderLibUtils.sendUniformDataWithSemantic(name, uniform.type, uniform.value, program, cmd);
                }
            })
        }
    }
}

