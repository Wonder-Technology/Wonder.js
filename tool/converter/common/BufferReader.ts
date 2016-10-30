// BinaryReader
// Refactored by Vjeux <vjeuxx@gmail.com>
// http://blog.vjeux.com/2010/javascript/javascript-binary-reader.html

// Original
//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/classes/binary-parser [rev. #1]

export = class BufferReader {
    public static create(buffer:Buffer) {
        var obj = new this(buffer);

        return obj;
    }

    constructor(buffer:Buffer) {
        this._buffer = buffer;
    };

    private _buffer:Buffer = null;
    private _offset:number = 0;
    //private _pos:number = 0;

    /* Public */

    public readInt8() {
        var result = this._buffer.readInt8(this._offset, true);

        this._offset ++;

        return result;
    }

    public readUInt8() {
        var result = this._buffer.readUInt8(this._offset, true);

        this._offset ++;

        return result;
    }

    public readInt16() {
        var result = this._buffer.readInt16LE(this._offset, true);

        this._offset += 2;

        return result;
    }

    public readUInt16() {
        var result = this._buffer.readUInt16LE(this._offset, true);

        this._offset += 2;

        return result;
    }

    public readInt32() {
        var result = this._buffer.readInt32LE(this._offset, true);

        this._offset += 4;

        return result;
    }

    public readUInt32() {
        var result = this._buffer.readUInt32LE(this._offset, true);

        this._offset += 4;

        return result;
    }

    public readFloat() {
        var result = this._buffer.readFloatLE(this._offset, true);

        this._offset += 4;

        return result;
    }

    //public readDouble() {
    //    return this._decodeFloat(52, 11);
    //}
    //
    //public readChar() {
    //    return this.readString(1);
    //}

    public readString(length) {
        var stringArr = [];

        for (let j = 0; j < length; j++) {
            stringArr[j] = this.readUInt8();
        }

        return String.fromCharCode.apply(null, stringArr);
    }

    public seek(pos:number) {
        this._offset = pos;

        //this._pos = pos;
        //this._checkSize(0);
    }

    //public getPosition() {
    //    return this._pos;
    //}

    public getSize() {
        return this._buffer.length;
    }
    //
    //
        //
    //private _decodeFloat(precisionBits, exponentBits) {
    //
    //    return this._decodeFloat2(precisionBits, exponentBits);
    //
    //
    //    var length = precisionBits + exponentBits + 1;
    //    var size = length >> 3;
    //    this._checkSize(length);
    //
    //    var bias = Math.pow(2, exponentBits - 1) - 1;
    //    var signal = this._readBits(precisionBits + exponentBits, 1, size);
    //    var exponent = this._readBits(precisionBits, exponentBits, size);
    //    var significand = 0;
    //    var divisor = 2;
    //    var curByte = length + (-precisionBits >> 3) - 1;
    //
    //    do
    //    {
    //        var byteValue = this._readByte(++curByte, size);
    //        var startBit = precisionBits % 8 || 8;
    //        var mask = 1 << startBit;
    //
    //        while (mask >>= 1) {
    //            if (byteValue & mask) {
    //                significand += 1 / divisor;
    //            }
    //            divisor *= 2;
    //        }
    //    } while (precisionBits -= startBit);
    //
    //    this._pos += size;
    //
    //    return exponent == (bias << 1) + 1 ? significand ? NaN : signal ? -Infinity : +Infinity
    //        : (1 + signal * -2) * (exponent || significand ? !exponent ? Math.pow(2, -bias + 1) * significand
    //        : Math.pow(2, exponent - bias) * (1 + significand) : 0);
    //}
    //
        //private _decodeFloat2(precisionBits, exponentBits) {
    //    var length = precisionBits + exponentBits + 1;
    //    var value = this._decodeInt(length);
    //
    //    var sign = (value >> 31) & 0x1;
    //    var allZero = 1;
    //    var mantissa = 0.0;
    //    var exponent = 0.0;
    //
    //    // Mantissa
    //    for (var i = 22; i > -1; i--) {
    //
    //        var test = 1.0 / Math.pow(2, 23 - i);
    //
    //        if ((value >> i & 0x1) == 1) {
    //
    //            mantissa += test;
    //
    //            allZero = 0;
    //        }
    //
    //    }
    //
    //    if (allZero == 0)
    //        mantissa += 1.0;
    //
    //    // Exponent
    //    for (var i = 30; i > 22; i--) {
    //
    //        var test = Math.pow(2, i - 23);
    //
    //        if ((value >> i & 0x1) == 1) {
    //            exponent += test;
    //        }
    //
    //    }
    //
    //    exponent -= 127.0;
    //
    //    //
    //    var total = Math.pow(2.0, exponent) * mantissa;
    //
    //    //
    //    if (sign == 1) {
    //        total *= -1.0;
    //    }
    //
    //    return total;
    //
    //}
    //
    //private _decodeInt(bits, signed?) {
    //    var x = this._readBits(0, bits, bits / 8), max = Math.pow(2, bits);
    //    var result = signed && x >= max / 2 ? x - max : x;
    //
    //    this._pos += bits / 8;
    //    return result;
    //}
    //
        //private _shl(a, b) {
    //    for (++b; --b; a = ((a %= 0x7fffffff + 1) & 0x40000000) == 0x40000000 ? a * 2 : (a - 0x40000000) * 2 + 0x7fffffff + 1);
    //    return a;
    //}
    //
    //private _readByte(i, size) {
    //    return this._buffer.charCodeAt(this._pos + size - i - 1) & 0xff;
    //}
    //
    //private _readBits(start, length, size) {
    //    var offsetLeft = (start + length) % 8;
    //    var offsetRight = start % 8;
    //    var curByte = size - (start >> 3) - 1;
    //    var lastByte = size + (-(start + length) >> 3);
    //    var diff = curByte - lastByte;
    //
    //    var sum = (this._readByte(curByte, size) >> offsetRight) & ((1 << (diff ? 8 - offsetRight : length)) - 1);
    //
    //    if (diff && offsetLeft) {
    //        sum += (this._readByte(lastByte++, size) & ((1 << offsetLeft) - 1)) << (diff-- << 3) - offsetRight;
    //    }
    //
    //    while (diff) {
    //        sum += this._shl(this._readByte(lastByte++, size), (diff-- << 3) - offsetRight);
    //    }
    //
    //    return sum;
    //}
    //
    //private _checkSize(neededBits) {
    //    if (!(this._pos + Math.ceil(neededBits / 8) < this._buffer.length)) {
    //        throw new Error("Index out of bound");
    //    }
    //}
};

