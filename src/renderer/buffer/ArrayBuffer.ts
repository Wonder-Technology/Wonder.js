/// <reference path="../../filePath.d.ts"/>
module wd{
    export class ArrayBuffer extends Buffer{
        public static create(data:any, size:number, type:BufferType, usage:BufferUsage = BufferUsage.STATIC_DRAW):ArrayBuffer {
            var obj = new this();

            obj.initWhenCreate(data, size, type, usage);

            return obj;
        }

        public size:number = null;
        public data:any = null;

        private _type:BufferType = null;

        public initWhenCreate(data:any, size:number, type:BufferType, usage:BufferUsage) {
            var gl = DeviceManager.getInstance().gl;

            if(!data){
                return null;
            }

            this.buffer = gl.createBuffer();
            if (!this.buffer) {
                Log.log('Failed to create the this.buffer object');
                return null;
            }
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
            gl.bufferData(gl.ARRAY_BUFFER, data, gl[usage]);

            gl.bindBuffer(gl.ARRAY_BUFFER, null);

            this.size = size;
            this.type = gl[type];
            this._type = type;
            this.count = data.length / size;

            this.data = data;

            return this.buffer;
        }

        @require(function(data:any, size:number = this.size, type:BufferType = this._type){
            assert(this.buffer, Log.info.FUNC_MUST("create gl buffer"));
        })
        public resetData(data:any, size:number = this.size, type:BufferType = this._type){
            var gl = DeviceManager.getInstance().gl;

            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
            gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW);

            this.size = size;
            this.type = gl[type];
            this.count = data.length / size;
            this.data = data;

            return this;
        }
    }
}

