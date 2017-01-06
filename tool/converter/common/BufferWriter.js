"use strict";
module.exports = (function () {
    function BufferWriter() {
        this._offset = 0;
        this._dataView = null;
    }
    BufferWriter.create = function (size) {
        var obj = new this();
        obj.initWhenCreate(size);
        return obj;
    };
    Object.defineProperty(BufferWriter.prototype, "arraybuffer", {
        get: function () {
            return this._dataView.buffer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BufferWriter.prototype, "byteLength", {
        get: function () {
            return this._dataView.byteLength;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BufferWriter.prototype, "byteOffset", {
        get: function () {
            return this._dataView.byteOffset;
        },
        enumerable: true,
        configurable: true
    });
    BufferWriter.prototype.initWhenCreate = function (size) {
        this._dataView = new DataView(new ArrayBuffer(size));
    };
    BufferWriter.prototype.writeInt8 = function (value) {
        var result = this._dataView.setInt8(this._offset, value);
        this._offset++;
        return result;
    };
    BufferWriter.prototype.writeUInt8 = function (value) {
        var result = this._dataView.setUint8(this._offset, value);
        this._offset++;
        return result;
    };
    BufferWriter.prototype.writeInt16 = function (value) {
        var result = this._dataView.setInt16(this._offset, value, true);
        this._offset += 2;
        return result;
    };
    BufferWriter.prototype.writeUInt16 = function (value) {
        var result = this._dataView.setUint16(this._offset, value, true);
        this._offset += 2;
        return result;
    };
    BufferWriter.prototype.writeInt32 = function (value) {
        var result = this._dataView.setInt32(this._offset, value, true);
        this._offset += 4;
        return result;
    };
    BufferWriter.prototype.writeUInt32 = function (value) {
        var result = this._dataView.setUint32(this._offset, value, true);
        this._offset += 4;
        return result;
    };
    BufferWriter.prototype.writeFloat = function (value) {
        var result = this._dataView.setFloat32(this._offset, value, true);
        this._offset += 4;
        return result;
    };
    BufferWriter.prototype.seek = function (pos) {
        this._offset = pos;
    };
    return BufferWriter;
}());
