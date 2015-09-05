/// <reference path="../definitions.d.ts"/>
module dy.render{
    export class Shader{
        public static create(vsSource:string, fsSource:string) {
        	var obj = new this(vsSource, fsSource);

        	return obj;
        }

        public vsSource:string = null;
        public fsSource:string = null;
        public attributes:dyCb.Hash<IShaderData> = dyCb.Hash.create<IShaderData>();
        public uniforms:dyCb.Hash<IShaderData> = dyCb.Hash.create<IShaderData>();

        constructor(vsSource:string, fsSource:string){
        	this.vsSource = vsSource;
        	this.fsSource = fsSource;
        }

        public createVsShader(){
            var gl = Director.getInstance().gl;

            return this._initShader(gl.createShader(gl.VERTEX_SHADER), this.vsSource);
        }

        public createFsShader(){
            var gl = Director.getInstance().gl;

            return this._initShader(gl.createShader(gl.FRAGMENT_SHADER), this.fsSource);
        }

        public isEqual(other:Shader){
            return this.vsSource === other.vsSource
            && this.fsSource === other.fsSource;
        }

        public init(){
            var self = this;

            this.attributes.forEach((val:IShaderData, key:string) => {
                if(val.value instanceof ArrayBuffer){
                    return;
                }

                dyCb.Log.error(!JudgeUtils.isArray(val.value), dyCb.Log.info.FUNC_MUST_BE("shader->attributes->value", "array"));

                val.value = self._convertToArrayBuffer(val.type, val.value);
            });
        }

        private _convertToArrayBuffer(type:ShaderDataType, value:Array<any>) {
            //todo get BufferType from val.type?
            return ArrayBuffer.create(new Float32Array(value), this._getBufferNum(type), render.BufferType.FLOAT);
        }

        private _getBufferNum(type:ShaderDataType){
            var num = null;

            switch (type){
                case ShaderDataType.FLOAT_1:
                case ShaderDataType.NUMBER_1:
                    num = 1;
                    break;
                case ShaderDataType.FLOAT_3:
                    num = 3;
                    break;
                case ShaderDataType.FLOAT_4:
                    num = 4;
                    break;
                default:
                    dyCb.Log.error(true, dyCb.Log.info.FUNC_UNEXPECT(type));
                    break;
            }

            return num;
        }

        private _initShader(shader, source){
            var gl = Director.getInstance().gl;

            gl.shaderSource(shader, source);
            gl.compileShader(shader);

            if(gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
                return shader;
            }
            else{
                //todo error?
                dyCb.Log.log(gl.getShaderInfoLog(shader));
            }
        }
    }

    export interface IShaderData{
        type:ShaderDataType;
        value:any;
    }
}
