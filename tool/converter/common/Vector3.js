module.exports = (function () {
    function Vector3() {
        this.values = new Float32Array(3);
        if (arguments.length > 0) {
            this.values[0] = arguments[0];
            this.values[1] = arguments[1];
            this.values[2] = arguments[2];
        }
    }
    Vector3.create = function () {
        var m = null;
        if (arguments.length === 0) {
            m = new this();
        }
        else {
            m = new this(arguments[0], arguments[1], arguments[2]);
        }
        return m;
    };
    Object.defineProperty(Vector3.prototype, "x", {
        get: function () {
            return this.values[0];
        },
        set: function (x) {
            this.values[0] = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3.prototype, "y", {
        get: function () {
            return this.values[1];
        },
        set: function (y) {
            this.values[1] = y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3.prototype, "z", {
        get: function () {
            return this.values[2];
        },
        set: function (z) {
            this.values[2] = z;
        },
        enumerable: true,
        configurable: true
    });
    Vector3.prototype.normalize = function () {
        var v = this.values;
        var d = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
        if (d === 0) {
            v[0] = 0;
            v[1] = 0;
            v[2] = 0;
            return this;
        }
        v[0] = v[0] / d;
        v[1] = v[1] / d;
        v[2] = v[2] / d;
        // for jasmine test:
        // -0.isEqual(0);//not pass, so here change -0 to 0
        if (v[0] === -0) {
            v[0] = 0;
        }
        if (v[1] === -0) {
            v[1] = 0;
        }
        if (v[2] === -0) {
            v[2] = 0;
        }
        return this;
    };
    Vector3.prototype.isZero = function () {
        var v = this.values;
        return v[0] === 0 && v[1] === 0 && v[2] === 0;
    };
    Vector3.prototype.scale = function (scalar) {
        var v = this.values;
        v[0] *= scalar;
        v[1] *= scalar;
        v[2] *= scalar;
        return this;
    };
    Vector3.prototype.set = function (x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    };
    Vector3.prototype.sub = function (v) {
        this.values[0] = this.values[0] - v.values[0];
        this.values[1] = this.values[1] - v.values[1];
        this.values[2] = this.values[2] - v.values[2];
        return this;
    };
    Vector3.prototype.sub2 = function (v1, v2) {
        this.values[0] = v1.values[0] - v2.values[0];
        this.values[1] = v1.values[1] - v2.values[1];
        this.values[2] = v1.values[2] - v2.values[2];
        return this;
    };
    Vector3.prototype.add = function (v) {
        this.values[0] = this.values[0] + v.values[0];
        this.values[1] = this.values[1] + v.values[1];
        this.values[2] = this.values[2] + v.values[2];
        return this;
    };
    Vector3.prototype.add2 = function (v1, v2) {
        this.values[0] = v1.values[0] + v2.values[0];
        this.values[1] = v1.values[1] + v2.values[1];
        this.values[2] = v1.values[2] + v2.values[2];
        return this;
    };
    Vector3.prototype.reverse = function () {
        this.values[0] = -this.values[0];
        this.values[1] = -this.values[1];
        this.values[2] = -this.values[2];
        return this;
    };
    Vector3.prototype.copy = function () {
        var result = Vector3.create(), i = 0, len = this.values.length;
        for (i = 0; i < len; i++) {
            result.values[i] = this.values[i];
        }
        return result;
    };
    //public toVector4():Vector4 {
    //    return Vector4.create(this.values[0], this.values[1], this.values[2], 1.0);
    //}
    Vector3.prototype.length = function () {
        var v = this.values;
        return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
    };
    /**
     * @function
     * @name pc.Vec3#cross
     * @description Returns the result of a cross product operation performed on the two specified 3-dimensional vectors.
     * @param {pc.Vec3} lhs The first 3-dimensional vector operand of the cross product.
     * @param {pc.Vec3} rhs The second 3-dimensional vector operand of the cross product.
     * @returns {pc.Vec3} Self for chaining.
     * @example
     * var back = new pc.Vec3().cross(pc.Vec3.RIGHT, pc.Vec3.UP);
     *
     * // Should print the Z axis (i.e. [0, 0, 1])
     * console.log("The result of the cross product is: " + back.toString());
     */
    Vector3.prototype.cross = function (lhs, rhs) {
        var a, b, r, ax, ay, az, bx, by, bz;
        a = lhs.values;
        b = rhs.values;
        r = this.values;
        ax = a[0];
        ay = a[1];
        az = a[2];
        bx = b[0];
        by = b[1];
        bz = b[2];
        r[0] = ay * bz - by * az;
        r[1] = az * bx - bz * ax;
        r[2] = ax * by - bx * ay;
        return this;
    };
    /**
     * @function
     * @name pc.Vec3#lerp
     * @description Returns the result of a linear interpolation between two specified 3-dimensional vectors.
     * @param {pc.Vec3} lhs The 3-dimensional to interpolate from.
     * @param {pc.Vec3} rhs The 3-dimensional to interpolate to.
     * @param {Number} alpha The value controlling the point of interpolation. Between 0 and 1, the linear interpolant
     * will occur on a straight line between lhs and rhs. Outside of this range, the linear interpolant will occur on
     * a ray extrapolated from this line.
     * @returns {pc.Vec3} Self for chaining.
     * @example
     * var a = new pc.Vec3(0, 0, 0);
     * var b = new pc.Vec3(10, 10, 10);
     * var r = new pc.Vec3();
     *
     * r.lerp(a, b, 0);   // r is equal to a
     * r.lerp(a, b, 0.5); // r is 5, 5, 5
     * r.lerp(a, b, 1);   // r is equal to b
     */
    Vector3.prototype.lerp = function (lhs, rhs, alpha) {
        var a = lhs.values, b = rhs.values, r = this.values;
        r[0] = a[0] + alpha * (b[0] - a[0]);
        r[1] = a[1] + alpha * (b[1] - a[1]);
        r[2] = a[2] + alpha * (b[2] - a[2]);
        return this;
    };
    /**
     * @function
     * @name pc.Vec3#dot
     * @description Returns the result of a dot product operation performed on the two specified 3-dimensional vectors.
     * @param {pc.Vec3} rhs The second 3-dimensional vector operand of the dot product.
     * @returns {Number} The result of the dot product operation.
     * @example
     * var v1 = new pc.Vec3(5, 10, 20);
     * var v2 = new pc.Vec3(10, 20, 40);
     * var v1dotv2 = v1.dot(v2);
     * console.log("The result of the dot product is: " + v1dotv2);
     */
    Vector3.prototype.dot = function (rhs) {
        var a = this.values, b = rhs.values;
        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    };
    Vector3.up = Vector3.create(0, 1, 0);
    Vector3.forward = Vector3.create(0, 0, 1);
    Vector3.right = Vector3.create(1, 0, 0);
    return Vector3;
})();
