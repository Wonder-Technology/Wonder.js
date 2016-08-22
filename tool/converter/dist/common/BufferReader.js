"use strict";
module.exports = (function () {
    function BufferReader(buffer) {
        this._buffer = null;
        this._offset = 0;
        this._buffer = buffer;
    }
    ;
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
    BufferReader.prototype.readString = function (length) {
        var stringArr = [];
        for (var j = 0; j < length; j++) {
            stringArr[j] = this.readUInt8();
        }
        return String.fromCharCode.apply(null, stringArr);
    };
    BufferReader.prototype.seek = function (pos) {
        this._offset = pos;
    };
    BufferReader.prototype.getSize = function () {
        return this._buffer.length;
    };
    return BufferReader;
})();
