module wd{
    export abstract class ShaderSourceBuilder{
        public attributes:wdCb.Hash<ShaderData> = wdCb.Hash.create<ShaderData>();
        public uniforms:wdCb.Hash<ShaderData> = wdCb.Hash.create<ShaderData>();
        public vsSource:string = null;
        public fsSource:string = null;

        public abstract build(...args):void;

        public abstract clearShaderDefinition():void;

        public dispose(){
            this.clearShaderDefinition();
        }

        @require(function(){
            this.attributes.forEach((data:ShaderData) => {
                assert(!JudgeUtils.isFloatArray(data.value), Log.info.FUNC_SHOULD_NOT("attribute->value", "be Float array"));
            });
        })
        protected convertAttributesData(){
            var self = this;

            this.attributes
                .filter((data:ShaderData) => {
                    return data.value !== EVariableCategory.ENGINE && JudgeUtils.isArrayExactly(data.value);
                })
                .forEach((data:ShaderData, key:string) => {
                    data.value = self._convertArrayToArrayBuffer(data.type, data.value);
                });
        }

        @require(function(type:EVariableType, value:Array<any>){
            assert(JudgeUtils.isArrayExactly(value), Log.info.FUNC_SHOULD(`value:${value}`, "be array"));
        })
        private _convertArrayToArrayBuffer(type:EVariableType, value:Array<any>) {
            var size = this._getBufferSize(type);

            return ArrayBuffer.create(value, size, EBufferType.FLOAT);
        }

        private _getBufferSize(type:EVariableType){
            var size = null;

            switch (type){
                case EVariableType.FLOAT_1:
                case EVariableType.NUMBER_1:
                    size = 1;
                    break;
                case EVariableType.FLOAT_2:
                    size = 2;
                    break;
                case EVariableType.FLOAT_3:
                    size = 3;
                    break;
                case EVariableType.FLOAT_4:
                    size = 4;
                    break;
                default:
                    Log.error(true, Log.info.FUNC_UNEXPECT("EVariableType", type));
                    break;
            }

            return size;
        }
    }

    export type SourceDefine = {
        name:string;
        value:any;
    }
}
