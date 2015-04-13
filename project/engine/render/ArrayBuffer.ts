/// <reference path="BufferType.ts"/>
/// <reference path="WebGLContext.ts"/>
module Engine3D{
    export class ArrayBuffer{
        public static create(data, num, type:BufferType):ArrayBuffer {
            var obj = new this();

            obj.initWhenCreate(data, num, type);

            return obj;
        }

        private _buffer = null;
        get buffer() { return this._buffer; }

        private _num:number = null;
        get num() { return this._num; }
        set num(num:number) {
            this._num = num;
        }

        private _type:string = null;
        get type() { return this._type; }
        set type(type:string) {
            this._type = type;
        }

        public initWhenCreate(data, num, type:BufferType) {
            var gl = WebGLContext.gl;

            if(!data){
                return null;
            }

            this._buffer = gl.createBuffer();   // Create a buffer object
            if (!this._buffer) {
                Log.log('Failed to create the this._buffer object');
                return null;
            }
            gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer);
            gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

            gl.bindBuffer(gl.ARRAY_BUFFER, null);

            this._num = num;
            this._type = gl[type];

            return this._buffer;
        }
    }
}

