/// <reference path="../definitions.d.ts"/>
module dy{
    export class ArrayBuffer extends Buffer{
        public static create(data, num, type:BufferType):ArrayBuffer {
            var obj = new this();

            obj.initWhenCreate(data, num, type);

            return obj;
        }

        public count:number = null;
        public data:any = null;

        public initWhenCreate(data, num, type:BufferType) {
            var gl = Director.getInstance().gl;

            if(!data){
                return null;
            }

            this.buffer = gl.createBuffer();   // Create a buffer object
            if (!this.buffer) {
                dyCb.Log.log('Failed to create the this.buffer object');
                return null;
            }
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
            gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

            gl.bindBuffer(gl.ARRAY_BUFFER, null);

            this.num = num;
            this.type = gl[type];
            this.count = data.length / num;

            this.data = data;

            return this.buffer;
        }
    }
}

