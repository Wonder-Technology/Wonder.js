/// <reference path="BufferType.ts"/>
/// <reference path="../Log.ts"/>
/// <reference path="../WebGLContext.ts"/>
module Engine3D{
    export class ElementBuffer{
        public static create(data, type:BufferType):ElementBuffer {
            var obj = new this();

            obj.initWhenCreate(data, type);

            return obj;
        }

        private _buffer = null;
        get buffer() { return this._buffer; }

        private _type:string = null;
        get type() { return this._type; }
        set type(type:string){
            this._type = type;
        }

        private _num:number = null;
        get num() { return this._num; }
        set num(num:number) {
            this._num = num;
        }

        private _typeSize:number = null;
        get typeSize() { return this._typeSize; }

        public initWhenCreate(data, type:BufferType) {
            var gl = WebGLContext.gl;

            if(!data || !this._checkDataType(data, type)){
                return null;
            }

            this._buffer = gl.createBuffer();   // Create a buffer object
            if (!this._buffer) {
                Log.log('Failed to create the this._buffer object');
                return null;
            }
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._buffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

            this._type = gl[type];
            this._num = data.length;
            this._typeSize = this._getInfo(type).size;

            return this._buffer;
        }


        private _checkDataType(data, type:BufferType){
            var info = this._getInfo(type);

            return data instanceof info.typeClass;
        }

        private _getInfo(type:BufferType){
            var info = null;

            switch (type){
                case BufferType.UNSIGNED_BYTE:
                    info = {
                        typeClass: Uint8Array,
                        size: 1
                    };
                    break;
                case BufferType.SHORT:
                    info = {
                        typeClass: Int16Array,
                        size: 2
                    };
                    break;
                case BufferType.UNSIGNED_SHORT:
                    info = {
                        typeClass: Uint16Array,
                        size: 2
                    };
                    break;
                case BufferType.INT:
                    info = {
                        typeClass: Int32Array,
                        size: 4
                    };
                    break;
                case BufferType.UNSIGNED_INT:
                    info = {
                        typeClass: Uint32Array,
                        size: 4
                    };
                    break;
                case BufferType.FLOAT:
                    info = {
                        typeClass: Float32Array,
                        size: 4
                    };
                    break;
                default:
                    throw new Error("无效的类型");
                    break;
            }

            return info;
        }
    }
}
