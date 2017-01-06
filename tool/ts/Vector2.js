"use strict";
module.exports = (function () {
    function Vector2() {
        this.values = new Float32Array(2);
        if (arguments.length > 0) {
            this.values[0] = arguments[0];
            this.values[1] = arguments[1];
        }
    }
    Vector2.create = function () {
        var m = null;
        if (arguments.length === 0) {
            m = new this();
        }
        else {
            m = new this(arguments[0], arguments[1]);
        }
        return m;
    };
    Object.defineProperty(Vector2.prototype, "x", {
        get: function () {
            return this.values[0];
        },
        set: function (x) {
            this.values[0] = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "y", {
        get: function () {
            return this.values[1];
        },
        set: function (y) {
            this.values[1] = y;
        },
        enumerable: true,
        configurable: true
    });
    Vector2.prototype.set = function (x, y) {
        this.x = x;
        this.y = y;
    };
    Vector2.prototype.clone = function () {
        return Vector2.create(this.x, this.y);
    };
    return Vector2;
}());
