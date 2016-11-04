export = class BufferWriter {
    public static create(size:number) {
    	var obj = new this();

        obj.initWhenCreate(size);

    	return obj;
    }

    get arraybuffer(){
        return this._dataView.buffer;
    }

    get byteLength(){
        return this._dataView.byteLength;
    }

    get byteOffset(){
        return this._dataView.byteOffset;
    }

    private _offset:number = 0;

    private _dataView:DataView = null;

    public initWhenCreate(size:number){
        this._dataView = new DataView(new ArrayBuffer(size));
    }

    public writeInt8(value:number) {
        var result = this._dataView.setInt8(this._offset, value);

        this._offset ++;

        return result;
    }

    public writeUInt8(value:number) {
        var result = this._dataView.setUint8(this._offset, value);

        this._offset ++;

        return result;
    }

    public writeInt16(value:number) {
        var result = this._dataView.setInt16(this._offset, value, true);

        this._offset += 2;

        return result;
    }

    public writeUInt16(value:number) {
        var result = this._dataView.setUint16(this._offset, value, true);

        this._offset += 2;

        return result;
    }

    public writeInt32(value:number) {
        var result = this._dataView.setInt32(this._offset, value, true);

        this._offset += 4;

        return result;
    }

    public writeUInt32(value:number) {
        var result = this._dataView.setUint32(this._offset, value, true);

        this._offset += 4;

        return result;
    }

    public writeFloat(value:number) {
        var result = this._dataView.setFloat32(this._offset, value, true);

        this._offset += 4;

        return result;
    }

    public seek(pos:number) {
        this._offset = pos;
    }
};

