module wd{
    export class CustomShaderLibUtils{
        //todo support STRUCTURES
        @require(function(name:string, type:EVariableType, value:any, program:Program){
            assert(type !== EVariableType.SAMPLER_2D && type !== EVariableType.SAMPLER_CUBE, Log.info.FUNC_SHOULD_NOT("type", `be SAMPLER_2D or SAMPLER_CUBE, but actual is ${type}`));

            assert(type !== EVariableType.STRUCTURES, Log.info.FUNC_NOT_SUPPORT("type === STRUCTURES"));


            if (type === wd.EVariableType.STRUCTURE) {
                assert(JudgeUtils.isDirectObject(value), Log.info.FUNC_MUST_BE("value", "object when type === STRUCTURE"));
            }
        })
        public static sendUniformData(name:string, type:EVariableType, value:any, program:Program){
            if (type === wd.EVariableType.STRUCTURE) {
                this._sendStructureData(name, value, program);
            }
            else {
                program.sendUniformData(name, type, value);
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
        public static sendUniformDataWithSemantic(name:string, type:EVariableType, value:any, program:Program, cmd:QuadCommand){
            if (type === wd.EVariableType.STRUCTURE) {
                this._sendStructureDataWithSemantic(name, value, program, cmd);
            }
            else {
                program.sendUniformData(name, type, this._getUniformData(value, cmd));
            }
        }

        public static sendAttributeBufferWithSemantic(name:string, type:EVariableType, value:any, program:Program, cmd:QuadCommand){
            program.sendAttributeBuffer(name, this._getAttributeType(type), this._getAttributeData(value, type, cmd));
        }

        private static _sendStructureData(name:string, data:Object, program:Program){
            for (let fieldName in data) {
                if(data.hasOwnProperty(fieldName)){
                    let fieldValue:ShaderData = data[fieldName];

                    program.sendStructureData(`${name}.${fieldName}`, fieldValue.type, fieldValue.value);
                }
            }
        }

        private static _sendStructureDataWithSemantic(name:string, data:Object, program:Program, cmd:QuadCommand){
            for (let fieldName in data) {
                if(data.hasOwnProperty(fieldName)){
                    let fieldValue:ShaderData = data[fieldName];

                    program.sendStructureData(`${name}.${fieldName}`, fieldValue.type, this._getUniformData(fieldValue.value, cmd));
                }
            }
        }

        @require(function(data:any, type:EVariableType, cmd:QuadCommand){
            assert(data !== "INDICE", Log.info.FUNC_NOT_SUPPORT("semantic:INDICE"));

            switch (data) {
                case "POSITION":
                case "COLOR":
                case "NORMAL":
                case "TANGENT":
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
        private static _getAttributeData(data:any, type:EVariableType, cmd:QuadCommand){
            switch (data){
                case EVariableSemantic.POSITION:
                    return <ArrayBuffer>cmd.buffers.getChild(EBufferDataType.VERTICE);
                case EVariableSemantic.TEXCOORD:
                    return <ArrayBuffer>cmd.buffers.getChild(EBufferDataType.TEXCOORD);
                case EVariableSemantic.COLOR:
                    return <ArrayBuffer>cmd.buffers.getChild(EBufferDataType.COLOR);
                case EVariableSemantic.NORMAL:
                    return <ArrayBuffer>cmd.buffers.getChild(EBufferDataType.NORMAL);
                case EVariableSemantic.TANGENT:
                    return <ArrayBuffer>cmd.buffers.getChild(EBufferDataType.TANGENT);
                default:
                    return data;
            }
        }

        private static _getAttributeType(type:EVariableType){
            return EVariableType.BUFFER;
        }

        //todo modify
        private static _getUniformData(data:any, cmd:any){
            switch (data){
                case EVariableSemantic.MODEL:
                    return cmd.mMatrix;
                case EVariableSemantic.VIEW:
                    return cmd.vMatrix;
                case EVariableSemantic.PROJECTION:
                    return cmd.pMatrix;
                case EVariableSemantic.MODEL_VIEW_PROJECTION:
                    return cmd.mvpMatrix;
                case EVariableSemantic.MODEL_INVERSE:
                    return cmd.mMatrix.clone().invert();
                case EVariableSemantic.VIEW_INVERSE:
                    return cmd.vMatrix.clone().invert();
                case EVariableSemantic.PROJECTION_INVERSE:
                    return cmd.pMatrix.clone().invert();
                case EVariableSemantic.MODEL_VIEW_INVERSE:
                    return cmd.mMatrix.applyMatrix(cmd.vMatrix, true).invert();
                case EVariableSemantic.MODEL_VIEW_PROJECTION_INVERSE:
                    return cmd.mMatrix.applyMatrix(cmd.vMatrix, true).applyMatrix(cmd.pMatrix, false).invert();
                case EVariableSemantic.MODEL_INVERSE_TRANSPOSE:
                    return cmd.normalMatrix;
                case EVariableSemantic.MODEL_VIEW_INVERSE_TRANSPOSE:
                    return cmd.mMatrix.applyMatrix(cmd.vMatrix, true).invertTo3x3().transpose();
                case EVariableSemantic.VIEWPORT:
                    return DeviceManager.getInstance().getViewport();

                //todo support local

                default:
                    return data;
            }
        }
    }
}
