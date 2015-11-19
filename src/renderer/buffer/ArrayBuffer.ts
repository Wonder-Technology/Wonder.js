/// <reference path="../../definitions.d.ts"/>
module dy{
    export class ArrayBuffer extends Buffer{
        public static create(data:any, num:number, type:BufferType, usage:BufferUsage = BufferUsage.STATIC_DRAW):ArrayBuffer {
            var obj = new this();

            obj.initWhenCreate(data, num, type, usage);

            return obj;
        }

        public count:number = null;
        public data:any = null;

        private _type:BufferType = null;

        public initWhenCreate(data:any, num:number, type:BufferType, usage:BufferUsage) {
            var gl = DeviceManager.getInstance().gl;

            if(!data){
                return null;
            }

            this.buffer = gl.createBuffer();   // Create a buffer object
            if (!this.buffer) {
                Log.log('Failed to create the this.buffer object');
                return null;
            }
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
            gl.bufferData(gl.ARRAY_BUFFER, data, gl[usage]);

            gl.bindBuffer(gl.ARRAY_BUFFER, null);

            this.num = num;
            this.type = gl[type];
            this._type = type;
            this.count = data.length / num;

            this.data = data;

            return this.buffer;
        }

        @In(function(data:any, num:number = this.num, type:BufferType = this._type){
            assert(this.buffer, Log.info.FUNC_MUST("create gl buffer"));
        })
        public resetData(data:any, num:number = this.num, type:BufferType = this._type){
            var gl = DeviceManager.getInstance().gl;

            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
            gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW);

            this.num = num;
            this.type = gl[type];
            this.count = data.length / num;
            this.data = data;

            return this;
        }
    }
}

