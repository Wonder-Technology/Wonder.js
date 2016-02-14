module wd{
    export class ArrayBuffer extends Buffer{
        public static create():ArrayBuffer;
        public static create(data:any, size:number, type:EBufferType, usage?:EBufferUsage):ArrayBuffer;

        public static create(...args):ArrayBuffer {
            var obj = new this();

            obj.initWhenCreate.apply(obj, args);

            return obj;
        }

        public size:number = null;
        public data:any = null;

        private _type:EBufferType = null;


        public initWhenCreate();
        public initWhenCreate(data:any, size:number, type:EBufferType, usage?:EBufferUsage);

        public initWhenCreate(...args) {
            var gl = DeviceManager.getInstance().gl;


            this.buffer = gl.createBuffer();
            if (!this.buffer) {
                Log.log('Failed to create the this.buffer object');
                return null;
            }

            if(args.length === 0){
                return;
            }
            else{
                let data:any = args[0],
                    size:number = args[1],
                    type:EBufferType = args[2],
                    usage:EBufferUsage = args[3] || EBufferUsage.STATIC_DRAW;

                if(!data){
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
        }

        @require(function(data:any, size:number = this.size, type:EBufferType = this._type){
            assert(this.buffer, Log.info.FUNC_MUST("create gl buffer"));
        })
        public resetData(data:any, size:number = this.size, type:EBufferType = this._type){
            var gl = DeviceManager.getInstance().gl;

            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
            gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW);

            this.size = size;
            this.type = gl[type];
            this._type = type;
            this.count = data.length / size;
            this.data = data;

            return this;
        }
    }
}

