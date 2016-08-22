// BinaryReader
// Refactored by Vjeux <vjeuxx@gmail.com>
// http://blog.vjeux.com/2010/javascript/javascript-binary-reader.html
module.exports = (function () {
    function BufferReader(buffer) {
        this._buffer = null;
        this._offset = 0;
        this._buffer = buffer;
    }
    ;
    //private _pos:number = 0;
    /* Public */
    BufferReader.prototype.readInt8 = function () {
        var result = this._buffer.readInt8(this._offset, true);
        this._offset++;
        return result;
    };
    BufferReader.prototype.readUInt8 = function () {
        var result = this._buffer.readUInt8(this._offset, true);
        this._offset++;
        return result;
    };
    BufferReader.prototype.readInt16 = function () {
        var result = this._buffer.readInt16LE(this._offset, true);
        this._offset += 2;
        return result;
    };
    BufferReader.prototype.readUInt16 = function () {
        var result = this._buffer.readUInt16LE(this._offset, true);
        this._offset += 2;
        return result;
    };
    BufferReader.prototype.readInt32 = function () {
        var result = this._buffer.readInt32LE(this._offset, true);
        this._offset += 4;
        return result;
    };
    BufferReader.prototype.readUInt32 = function () {
        var result = this._buffer.readUInt32LE(this._offset, true);
        this._offset += 4;
        return result;
    };
    BufferReader.prototype.readFloat = function () {
        var result = this._buffer.readFloatLE(this._offset, true);
        this._offset += 4;
        return result;
    };
    //public readDouble() {
    //    return this._decodeFloat(52, 11);
    //}
    //
    //public readChar() {
    //    return this.readString(1);
    //}
    BufferReader.prototype.readString = function (length) {
        var stringArr = [];
        for (var j = 0; j < length; j++) {
            stringArr[j] = this.readUInt8();
        }
        return String.fromCharCode.apply(null, stringArr);
    };
    BufferReader.prototype.seek = function (pos) {
        this._offset = pos;
        //this._pos = pos;
        //this._checkSize(0);
    };
    //public getPosition() {
    //    return this._pos;
    //}
    BufferReader.prototype.getSize = function () {
        return this._buffer.length;
    };
    return BufferReader;
})();
