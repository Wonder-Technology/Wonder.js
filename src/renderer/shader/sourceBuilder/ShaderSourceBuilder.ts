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
                    data.value = BufferUtils.convertArrayToArrayBuffer(data.type, data.value);
                });
        }
    }

    export type SourceDefine = {
        name:string;
        value:any;
    }
}
