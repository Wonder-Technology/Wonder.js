module Engine3D{
    declare var gl:any;

    export class ArrayBuffer{
        constructor(){}

        private _buffer = null;
        private _num:number = null;
        private _type:string = null;

        get buffer() { return this._buffer; }
        //set buffer(buffer) {
        //    this._buffer = buffer
        //}

        get num() { return this._num; }
        set num(num:number) {
            this._num = num;
        }

        get type() { return this._type; }
        set type(type:string) {
            this._type = type;
        }
        initWhenCreate(data, num, type) {
            if(!data){
                return null;
            }

            this._buffer = gl.createBuffer();   // Create a buffer object
            if (!this._buffer) {
                console.log('Failed to create the this._buffer object');
                return null;
            }
            // Write date into the this._buffer object
            gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer);
            gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

            // Unbind the buffer object
            gl.bindBuffer(gl.ARRAY_BUFFER, null);

            // Keep the information necessary to assign to the attribute variable later
            this._num = num;
            this._type = type;

            return this._buffer;
        }
        public static create(data, num, type):ArrayBuffer {
            var obj = new ArrayBuffer();

            obj.initWhenCreate(data, num, type);

            return obj;
        }
    }

    export class ElementBuffer{
        constructor(){}

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
        //set typeSize(typeSize:number) {
        //    this._typeSize = typeSize;
        //}

        initWhenCreate(data, type) {
            if(!data){
                return null;
            }

            this._checkDataType(data, type);

            this._buffer = gl.createBuffer();   // Create a buffer object
            if (!this._buffer) {
                console.log('Failed to create the this._buffer object');
                return null;
            }
            // Write date into the this._buffer object
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._buffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);

            // Unbind the buffer object
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

            this._type = type;
            this._num = data.length;
            this._typeSize = this._getInfo(type).size;

            return this._buffer;
        }


        private _checkDataType(data, type){
            var info = this._getInfo(type);

            return data instanceof info.typeClass;
        }

        private _getInfo(type){
            var info = null;

            switch (type){
                case gl.UNSIGNED_BYTE:
                    info = {
                        typeClass: Uint8Array,
                        size: 1
                    };
                    break;
                case gl.SHORT:
                    info = {
                        typeClass: Int16Array,
                        size: 2
                    };
                    break;
                case gl.UNSIGNED_SHORT:
                    info = {
                        typeClass: Uint16Array,
                        size: 2
                    };
                    break;
                case gl.INT:
                    info = {
                        typeClass: Int32Array,
                        size: 4
                    };
                    break;
                case gl.UNSIGNED_INT:
                    info = {
                        typeClass: Uint32Array,
                        size: 4
                    };
                    break;
                case gl.FLOAT:
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

        public static create(data, type):ElementBuffer {
            var obj = new ElementBuffer();

            obj.initWhenCreate(data, type);

            return obj;
        }
    }
}

