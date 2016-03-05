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
                    self._sendAttributeDataFromCustomShader(name, attribute.type, attribute.value, program, cmd);
                });

            shader.uniforms.forEach((uniform:ShaderData, name:string) => {
                if(uniform.type !== EVariableType.SAMPLER_2D){
                    self._sendUniformDataFromCustomShader(name, uniform.type, uniform.value, program, cmd);
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
        @ensure(function(data:Buffer){
            assert(data && data instanceof Buffer, Log.info.FUNC_SHOULD("attributeData", `be Buffer, but actual is ${data}`));
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

        //todo support STRUCTURES
        @require(function(name:string, type:EVariableType, value:any, program:Program, cmd:QuadCommand){
            assert(type !== EVariableType.SAMPLER_2D && type !== EVariableType.SAMPLER_CUBE, Log.info.FUNC_SHOULD_NOT("type", `be SAMPLER_2D or SAMPLER_CUBE, but actual is ${type}`));

            assert(type !== EVariableType.STRUCTURES, Log.info.FUNC_NOT_SUPPORT("type === STRUCTURES"));


            if (type === wd.EVariableType.STRUCTURE) {
                assert(JudgeUtils.isDirectObject(value), Log.info.FUNC_MUST_BE("value", "object when type === STRUCTURE"));
            }
        })
        private _sendUniformDataFromCustomShader(name:string, type:EVariableType, value:any, program:Program, cmd:QuadCommand){
            if (type === wd.EVariableType.STRUCTURE) {
                for (let fieldName in value) {
                    if(value.hasOwnProperty(fieldName)){
                        let fieldValue:ShaderData = value[fieldName];

                        program.sendStructureData(`${name}.${fieldName}`, fieldValue.type, this._getUniformData(fieldValue.value, cmd));
                    }
                }
            }
            else {
                program.sendUniformData(name, type, this._getUniformData(value, cmd));
            }
        }

        private _sendAttributeDataFromCustomShader(name:string, type:EVariableType, value:any, program:Program, cmd:QuadCommand){
            program.sendAttributeData(name, EVariableType.BUFFER, this._getAttributeData(value, type, cmd));
        }
    }
}

