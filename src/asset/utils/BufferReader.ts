module wd{
    declare var ArrayBuffer:any;

    export class BufferReader{
        public static create(arraybuffer:any, byteOffset:number, byteLength:number) {
            var obj = new this();

            obj.initWhenCreate(arraybuffer, byteOffset, byteLength);

            return obj;
        }

        get arraybuffer(){
            return <any>this._dataView.buffer;
        }

        get byteLength(){
            return this._dataView.byteLength;
        }

        get byteOffset(){
            return this._dataView.byteOffset;
        }

        private _dataView:DataView = null;
        private _offset:number = 0;

        public initWhenCreate(arraybuffer:any, byteOffset:number, byteLength:number){
            this._dataView = new DataView(arraybuffer, byteOffset, byteLength);
        }

        public readInt8() {
            var result = this._dataView.getInt8(this._offset);

            this._offset ++;

            return result;
        }

        public readUInt8() {
            var result = this._dataView.getUint8(this._offset);

            this._offset ++;

            return result;
        }

        public readInt16() {
            var result = this._dataView.getInt16(this._offset, true);

            this._offset += 2;

            return result;
        }

        public readUInt16() {
            var result = this._dataView.getUint16(this._offset, true);

            this._offset += 2;

            return result;
        }

        public readInt32() {
            var result = this._dataView.getInt32(this._offset, true);

            this._offset += 4;

            return result;
        }

        public readUInt32() {
            var result = this._dataView.getUint32(this._offset, true);

            this._offset += 4;

            return result;
        }

        public readFloat() {
            var result = this._dataView.getFloat32(this._offset, true);

            this._offset += 4;

            return result;
        }

        public seek(pos:number) {
            this._offset = pos;
        }
    }
}
