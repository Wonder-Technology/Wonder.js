module wd{
    export class ElementBuffer extends Buffer{
        public static create():ElementBuffer;
        public static create(data, type:EBufferType, usage?:EBufferUsage):ElementBuffer;

        public static create(...args):ElementBuffer {
            var obj = new this();

            obj.initWhenCreate.apply(obj, args);

            return obj;
        }

        private _typeSize:number = null;
        get typeSize() { return this._typeSize; }

        public data:any = null;

        private _type:EBufferType = null;


        public initWhenCreate();
        public initWhenCreate(data:any, type:EBufferType, usage?:EBufferUsage);

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
                    type:EBufferType = args[1],
                    usage:EBufferUsage = args[2] || EBufferUsage.STATIC_DRAW;

                if(!data || !this._checkDataType(data, type)){
                    return null;
                }

                this._bindBuffer(gl);

                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl[usage]);

                //gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

                this.type = gl[type];
                this._type = type;
                this.count = data.length;
                this.data = data;
                this._typeSize = this._getInfo(type).size;

                return this.buffer;
            }
        }

        @require(function(data:any, type:EBufferType = this._type){
            assert(this.buffer, Log.info.FUNC_MUST("create gl buffer"));
        })
        public resetData(data:any, type:EBufferType = this._type){
            var gl = DeviceManager.getInstance().gl;

            this._bindBuffer(gl);

            BufferTable.lastBindedElementBuffer = this;

            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.DYNAMIC_DRAW);

            this.type = gl[type];
            this._type = type;
            this.data = data;
            this.count = data.length;
            this._typeSize = this._getInfo(type).size;

            return this;
        }

        private _checkDataType(data, type:EBufferType){
            var info = this._getInfo(type);

            return data instanceof info.typeClass;
        }

        private _bindBuffer(gl:any){
            if(!JudgeUtils.isEqual(this, BufferTable.lastBindedElementBuffer)){
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffer);
            }
        }

        private _getInfo(type:EBufferType):{typeClass:any,size:number}{
            var info = null;

            switch (type){
                case EBufferType.UNSIGNED_BYTE:
                    info = {
                        typeClass: Uint8Array,
                        size: 1
                    };
                    break;
                case EBufferType.SHORT:
                    info = {
                        typeClass: Int16Array,
                        size: 2
                    };
                    break;
                case EBufferType.UNSIGNED_SHORT:
                    info = {
                        typeClass: Uint16Array,
                        size: 2
                    };
                    break;
                case EBufferType.INT:
                    info = {
                        typeClass: Int32Array,
                        size: 4
                    };
                    break;
                case EBufferType.UNSIGNED_INT:
                    info = {
                        typeClass: Uint32Array,
                        size: 4
                    };
                    break;
                case EBufferType.FLOAT:
                    info = {
                        typeClass: Float32Array,
                        size: 4
                    };
                    break;
                default:
                    Log.error(true, Log.info.FUNC_INVALID("EBufferType"));
                    break;
            }

            return info;
        }
    }
}
