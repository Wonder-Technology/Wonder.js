module wd{
    export class BufferUtils{
        @require(function(type:EVariableType, value:Array<any>){
            it(`value:${value} should be array`, () => {
                expect(JudgeUtils.isArrayExactly(value)).true;
            });
        })
        public static convertArrayToArrayBuffer(type:EVariableType, value:Array<any>) {
            var size = this._getBufferSize(type);

            return ArrayBuffer.create(value, size, EBufferType.FLOAT);
        }

        private static _getBufferSize(type:EVariableType){
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
}
