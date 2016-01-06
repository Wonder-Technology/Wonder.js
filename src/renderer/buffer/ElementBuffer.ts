module wd{
    export class ElementBuffer extends Buffer{
        public static create():ElementBuffer;
        public static create(data, type:BufferType, usage?:BufferUsage):ElementBuffer;

        public static create(...args):ElementBuffer {
            var obj = new this();

            obj.initWhenCreate.apply(obj, args);

            return obj;
        }

        private _typeSize:number = null;
        get typeSize() { return this._typeSize; }

        public data:any = null;

        private _type:BufferType = null;


        public initWhenCreate();
        public initWhenCreate(data:any, type:BufferType, usage?:BufferUsage);

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
                    type:BufferType = args[1],
                    usage:BufferUsage = args[2] || BufferUsage.STATIC_DRAW;

                if(!data || !this._checkDataType(data, type)){
                    return null;
                }

                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffer);
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl[usage]);

                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

                this.type = gl[type];
                this._type = type;
                this.count = data.length;
                this.data = data;
                this._typeSize = this._getInfo(type).size;

                return this.buffer;
            }
        }

        @require(function(data:any, type:BufferType = this._type){
            assert(this.buffer, Log.info.FUNC_MUST("create gl buffer"));
        })
        public resetData(data:any, type:BufferType = this._type){
            var gl = DeviceManager.getInstance().gl;

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.DYNAMIC_DRAW);

            this.type = gl[type];
            this._type = type;
            this.data = data;
            this.count = data.length;
            this._typeSize = this._getInfo(type).size;

            return this;
        }

        private _checkDataType(data, type:BufferType){
            var info = this._getInfo(type);

            return data instanceof info.typeClass;
        }

        private _getInfo(type:BufferType):{typeClass:any,size:number}{
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
                    Log.error(true, Log.info.FUNC_INVALID("BufferType"));
                    break;
            }

            return info;
        }
    }
}
