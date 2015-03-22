var Engine3D;
(function (Engine3D) {
    var ArrayBuffer = (function () {
        function ArrayBuffer() {
            this._buffer = null;
            this._num = null;
            this._type = null;
        }
        Object.defineProperty(ArrayBuffer.prototype, "buffer", {
            get: function () {
                return this._buffer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ArrayBuffer.prototype, "num", {
            //set buffer(buffer) {
            //    this._buffer = buffer
            //}
            get: function () {
                return this._num;
            },
            set: function (num) {
                this._num = num;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ArrayBuffer.prototype, "type", {
            get: function () {
                return this._type;
            },
            set: function (type) {
                this._type = type;
            },
            enumerable: true,
            configurable: true
        });
        ArrayBuffer.prototype.initWhenCreate = function (data, num, type) {
            if (!data) {
                return null;
            }
            this._buffer = gl.createBuffer(); // Create a buffer object
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
        };
        ArrayBuffer.create = function (data, num, type) {
            var obj = new ArrayBuffer();
            obj.initWhenCreate(data, num, type);
            return obj;
        };
        return ArrayBuffer;
    })();
    Engine3D.ArrayBuffer = ArrayBuffer;
    var ElementBuffer = (function () {
        function ElementBuffer() {
            this._buffer = null;
            this._type = null;
            this._num = null;
        }
        Object.defineProperty(ElementBuffer.prototype, "buffer", {
            get: function () {
                return this._buffer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ElementBuffer.prototype, "type", {
            get: function () {
                return this._type;
            },
            set: function (type) {
                this._type = type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ElementBuffer.prototype, "num", {
            get: function () {
                return this._num;
            },
            set: function (num) {
                this._num = num;
            },
            enumerable: true,
            configurable: true
        });
        ElementBuffer.prototype.initWhenCreate = function (data, type) {
            if (!data) {
                return null;
            }
            this._buffer = gl.createBuffer(); // Create a buffer object
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
            return this._buffer;
        };
        ElementBuffer.create = function (data, type) {
            var obj = new ElementBuffer();
            obj.initWhenCreate(data, type);
            return obj;
        };
        return ElementBuffer;
    })();
    Engine3D.ElementBuffer = ElementBuffer;
})(Engine3D || (Engine3D = {}));
//# sourceMappingURL=Buffer.js.map