/// <reference path="../definitions.d.ts"/>
module dy{
    export class ElementBuffer extends Buffer{
        public static create(data, type:BufferType):ElementBuffer {
            var obj = new this();

            obj.initWhenCreate(data, type);

            return obj;
        }

        private _typeSize:number = null;
        get typeSize() { return this._typeSize; }

        public initWhenCreate(data, type:BufferType) {
            var gl = Director.getInstance().gl;

            if(!data || !this._checkDataType(data, type)){
                return null;
            }

            this.buffer = gl.createBuffer();   // Create a buffer object
            if (!this.buffer) {
                dyCb.Log.log('Failed to create the this.buffer object');
                return null;
            }
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

            this.type = gl[type];
            this.num = data.length;
            this._typeSize = this._getInfo(type).size;

            return this.buffer;
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
                    dyCb.Log.error(true, dyCb.Log.info.FUNC_INVALID("BufferType"));
                    break;
            }

            return info;
        }
    }
}
