/// <reference path="../../definitions.d.ts"/>
module dy.render{
    export class Shader{
        public static create(shaderDefinition?:IShaderDefinition) {
        	var obj = new this();

            if(shaderDefinition){
                obj.read(shaderDefinition);
            }

        	return obj;
        }

        public vsSource:string = null;
        public fsSource:string = null;
        public attributes:dyCb.Hash<IShaderData> = dyCb.Hash.create<IShaderData>();
        public uniforms:dyCb.Hash<IShaderData> = dyCb.Hash.create<IShaderData>();

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
                if(val.value instanceof ArrayBuffer
                || val.value === VariableCategory.ENGINE){
                    return;
                }

                dyCb.Log.error(!JudgeUtils.isArray(val.value), dyCb.Log.info.FUNC_MUST_BE("shader->attributes->value", "array"));

                val.value = self._convertToArrayBuffer(val.type, val.value);
            });
        }

        public read(def:IShaderDefinition){
            this.attributes = def.attributes;
            this.uniforms = def.uniforms;

            this.vsSource = this._insertAttribute(def.vsSource);
            this.fsSource = def.fsSource;
        }

        private _insertAttribute(vsSource:string){
            var result = "";

            this.attributes.forEach((val:IShaderData, key:string) => {
                if(!val){
                    return;
                }

                //todo use typescript template to refactor
                result += "attribute " + VariableTable.getVariableType(val.type) + " " + key + ";\n";
            });

            return result + vsSource;
        }

        private _convertToArrayBuffer(type:VariableType, value:Array<any>) {
            //todo get BufferType from val.type?
            return ArrayBuffer.create(new Float32Array(value), this._getBufferNum(type), render.BufferType.FLOAT);
        }

        private _getBufferNum(type:VariableType){
            var num = null;

            switch (type){
                case VariableType.FLOAT_1:
                case VariableType.NUMBER_1:
                    num = 1;
                    break;
                case VariableType.FLOAT_3:
                    num = 3;
                    break;
                case VariableType.FLOAT_4:
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
        type:VariableType;
        value:any;
    }
}
