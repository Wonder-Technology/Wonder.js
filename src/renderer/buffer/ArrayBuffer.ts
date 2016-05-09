module wd{
    export class ArrayBuffer extends Buffer{
        //public static create():ArrayBuffer;
        //public static create(data:Float32Array, size:number, type:EBufferType, usage?:EBufferUsage):ArrayBuffer;

        public static create(data:Array<number>, size:number, type:EBufferType = EBufferType.FLOAT, usage:EBufferUsage = EBufferUsage.STATIC_DRAW):ArrayBuffer {
            var obj = new this();

            //obj.initWhenCreate.apply(obj, args);
            obj.initWhenCreate(data, size, type, usage);

            return obj;
        }

        public size:number = null;
        public data:Float32Array = null;


        //public initWhenCreate();
        //public initWhenCreate(data:Float32Array, size:number, type:EBufferType, usage?:EBufferUsage);

        public initWhenCreate(data:Array<number>, size:number, type:EBufferType, usage:EBufferUsage) {
            var gl = DeviceManager.getInstance().gl,
                typedData:Float32Array = null;

            this.buffer = gl.createBuffer();

            if (!this.buffer) {
                Log.warn('Failed to create the this.buffer object');
                return null;
            }

            //if(args.length === 0){
            //    return;
            //}
            //else{
            //    let data:Float32Array = args[0],
            //        size:number = args[1],
            //        type:EBufferType = args[2],
            //        usage:EBufferUsage = args[3] || EBufferUsage.STATIC_DRAW;

                if(!data){
                    return null;
                }

            typedData = this._convertToTypedArray(data, type);


                gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);

                gl.bufferData(gl.ARRAY_BUFFER, typedData, gl[usage]);

            //todo test
            BufferTable.resetBindedArrayBuffer();

            this._saveData(typedData, size, type, usage);

                return this.buffer;
            //}
        }

        @require(function(data:Array<number>, size:number = this.size, type:EBufferType = this.type, offset:number = 0){
            assert(this.buffer, Log.info.FUNC_MUST("create gl buffer"));
        })
        public resetData(data:Array<number>, size:number = this.size, type:EBufferType = this.type, offset:number = 0){
            var gl = DeviceManager.getInstance().gl,
            typedData:Float32Array = this._convertToTypedArray(data, type);

            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);

            this.resetBufferData("ARRAY_BUFFER", typedData, offset);

            BufferTable.resetBindedArrayBuffer();

            this._saveData(typedData, size, type, EBufferUsage.DYNAMIC_DRAW);

            return this;
        }

        private _convertToTypedArray(data:Array<number>, type:EBufferType){
            return new Float32Array(data);
        }

        private _saveData(data:Float32Array, size:number, type:EBufferType, usage:EBufferUsage){
            this.size = size;
            this.type = type;
            this.count = data.length / size;
            this.usage = usage;

            this.data = data;
        }
    }
}

