var TransformData = (function () {
    function TransformData() {
        this.positions = null;
        this.length = null;
        this._buffer = null;
    }
    TransformData.of = function () {
        var obj = new this();
        obj.initWhenCreate();
        return obj;
    };
    TransformData.prototype.initWhenCreate = function () {
        var buffer = this._buffer, count = COUNT;
        this.length = Float32Array.BYTES_PER_ELEMENT * 1;
        this._buffer = new ArrayBuffer(count * this.length);
        this.positions = new Float32Array(buffer, 0, count);
    };
    return TransformData;
}());
export { TransformData };
var COUNT = 10;
//# sourceMappingURL=TransformData.js.map