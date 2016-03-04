module wd{
    export class CustomShaderLib extends ShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public shader:CustomShader;

        public sendShaderVariables(program: Program, cmd:QuadCommand, material:ShaderMaterial){
            var self = this,
                shader:CustomShader = this.shader;

                shader.attributes.forEach((attribute:ShaderData, name:string) => {
                    self.sendAttributeData(program, name, this._getAttributeData(attribute.value, attribute.type, cmd));
                });

            shader.uniforms.forEach((uniform:ShaderData, name:string) => {
                if(uniform.type !== EVariableType.SAMPLER_2D){
                    program.sendUniformData(name, uniform.type, this._getUniformData(uniform.value, cmd));
                }
            })
        }

        @require(function(data:any, type:EVariableType, cmd:QuadCommand){
            switch (data) {
                case "POSITION":
                case "COLOR":
                    assert(type === EVariableType.FLOAT_3, Log.info.FUNC_SHOULD("type", "be EVariableType.FLOAT_3"));
                    break;
                case "TEXCOORD":
                    assert(type === EVariableType.FLOAT_2, Log.info.FUNC_SHOULD("type", "be EVariableType.FLOAT_2"));
                    break;
            }
        })
        private _getAttributeData(data:any, type:EVariableType, cmd:QuadCommand){
            switch (data){
                case "POSITION":
                    return <ArrayBuffer>cmd.buffers.getChild(EBufferDataType.VERTICE);
                case "TEXCOORD":
                    return <ArrayBuffer>cmd.buffers.getChild(EBufferDataType.TEXCOORD);
                case "COLOR":
                    return <ArrayBuffer>cmd.buffers.getChild(EBufferDataType.TEXCOORD);

                //todo support more

                default:
                    return data;
            }
        }

        private _getUniformData(data:any, cmd:QuadCommand){
            switch (data){
                case "MODEL_VIEW_PROJECTION":
                    return cmd.mvpMatrix;

                //todo support more

                default:
                    return data;
            }
        }
    }
}

