var dy;
(function (dy) {
    var Point = (function () {
        function Point(x, y) {
            if (x === void 0) { x = null; }
            if (y === void 0) { y = null; }
            this.x = null;
            this.y = null;
            this.x = x;
            this.y = y;
        }
        Point.create = function (x, y) {
            var obj = new this(x, y);
            return obj;
        };
        return Point;
    })();
    dy.Point = Point;
})(dy || (dy = {}));

var dy;
(function (dy) {
    var Position = (function () {
        function Position(x, y, z) {
            this.x = null;
            this.y = null;
            this.z = null;
            this.x = x;
            this.y = y;
            this.z = z;
        }
        Position.create = function (x, y, z) {
            var obj = new this(x, y, z);
            return obj;
        };
        return Position;
    })();
    dy.Position = Position;
})(dy || (dy = {}));

/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var ViewWebGL = (function () {
        function ViewWebGL(dom) {
            this._dom = null;
            this._dom = dom;
        }
        ViewWebGL.create = function (view) {
            var obj = new this(view);
            return obj;
        };
        Object.defineProperty(ViewWebGL.prototype, "offset", {
            get: function () {
                var view = this._dom, offset = { x: view.offsetLeft, y: view.offsetTop };
                while (view = view.offsetParent) {
                    offset.x += view.offsetLeft;
                    offset.y += view.offsetTop;
                }
                return offset;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ViewWebGL.prototype, "dom", {
            get: function () {
                return this._dom;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ViewWebGL.prototype, "width", {
            //private _width:number = null;
            get: function () {
                return this._dom.width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ViewWebGL.prototype, "height", {
            get: function () {
                return this._dom.height;
            },
            enumerable: true,
            configurable: true
        });
        ViewWebGL.prototype.getContext = function () {
            return this._dom.getContext("webgl") || this._dom.getContext("experimental-webgl");
        };
        return ViewWebGL;
    })();
    dy.ViewWebGL = ViewWebGL;
})(dy || (dy = {}));

/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var Vector3 = (function () {
        function Vector3() {
            this._values = new Float32Array(3);
            if (arguments.length > 0) {
                this._values[0] = arguments[0];
                this._values[1] = arguments[1];
                this._values[2] = arguments[2];
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
        Object.defineProperty(Vector3.prototype, "values", {
            get: function () { return this._values; },
            set: function (values) {
                this._values = values;
            },
            enumerable: true,
            configurable: true
        });
        Vector3.prototype.normalize = function () {
            var v = this._values;
            var d = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
            if (d === 0) {
                return Vector3.create(0, 0, 0);
            }
            v[0] = v[0] / d;
            v[1] = v[1] / d;
            v[2] = v[2] / d;
            return this;
        };
        Vector3.prototype.sub = function (v) {
            return Vector3.create(this._values[0] - v.values[0], this._values[1] - v.values[1], this._values[2] - v.values[2]);
        };
        Vector3.prototype.reverse = function () {
            this._values[0] = -this._values[0];
            this._values[1] = -this._values[1];
            this._values[2] = -this._values[2];
            return this;
        };
        Vector3.prototype.copy = function () {
            var result = Vector3.create(), i = 0, len = this._values.length;
            for (i = 0; i < len; i++) {
                result.values[i] = this._values[i];
            }
            return result;
        };
        Vector3.prototype.toVec4 = function () {
            return dy.Vector4.create(this._values[0], this._values[1], this._values[2], 1.0);
        };
        return Vector3;
    })();
    dy.Vector3 = Vector3;
})(dy || (dy = {}));

/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var Vector4 = (function () {
        function Vector4() {
            this._values = new Float32Array(4);
            if (arguments.length > 0) {
                this._values[0] = arguments[0];
                this._values[1] = arguments[1];
                this._values[2] = arguments[2];
                this._values[3] = arguments[3];
            }
        }
        Vector4.create = function () {
            var m = null;
            if (arguments.length === 0) {
                m = new this();
            }
            else {
                m = new this(arguments[0], arguments[1], arguments[2], arguments[3]);
            }
            return m;
        };
        Object.defineProperty(Vector4.prototype, "values", {
            get: function () { return this._values; },
            set: function (values) {
                this._values = values;
            },
            enumerable: true,
            configurable: true
        });
        Vector4.prototype.normalize = function () {
            var v = this._values;
            var d = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2] + v[3] * v[3]);
            if (d === 0) {
                return Vector4.create(0, 0, 0, 0);
            }
            v[0] = v[0] / d;
            v[1] = v[1] / d;
            v[2] = v[2] / d;
            v[3] = v[3] / d;
            return this;
        };
        Vector4.prototype.toVec3 = function () {
            return dy.Vector3.create(this._values[0], this._values[1], this._values[2]);
        };
        return Vector4;
    })();
    dy.Vector4 = Vector4;
})(dy || (dy = {}));

/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    /*!
     注意：矩阵元素是按列主序存储在数组中的。
     */
    var Matrix = (function () {
        function Matrix() {
            this._values = null;
            this._matrixArr = null;
            if (arguments.length === 1) {
                this._values = arguments[0];
            }
            else {
                this._values = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
            }
            this._matrixArr = [];
        }
        Matrix.create = function () {
            var m = null;
            if (arguments.length === 0) {
                m = new this();
            }
            else {
                m = new this(arguments[0]);
            }
            return m;
        };
        Object.defineProperty(Matrix.prototype, "values", {
            get: function () { return this._values; },
            set: function (values) {
                this._values = values;
            },
            enumerable: true,
            configurable: true
        });
        Matrix.prototype.push = function () {
            this._matrixArr.push(this._values);
        };
        Matrix.prototype.pop = function () {
            this._values = this._matrixArr.pop();
        };
        Matrix.prototype.setIdentity = function () {
            var e = this._values;
            e[0] = 1;
            e[4] = 0;
            e[8] = 0;
            e[12] = 0;
            e[1] = 0;
            e[5] = 1;
            e[9] = 0;
            e[13] = 0;
            e[2] = 0;
            e[6] = 0;
            e[10] = 1;
            e[14] = 0;
            e[3] = 0;
            e[7] = 0;
            e[11] = 0;
            e[15] = 1;
            return this;
        };
        /**
         * Calculate the inverse matrix of specified matrix, and set to this.
         * @param other The source matrix
         * @return this
         */
        Matrix.prototype.setInverseOf = function (other) {
            var i, s, d, inv, det;
            s = other.values;
            inv = new Float32Array(16);
            d = this._values;
            inv[0] = s[5] * s[10] * s[15] - s[5] * s[11] * s[14] - s[9] * s[6] * s[15]
                + s[9] * s[7] * s[14] + s[13] * s[6] * s[11] - s[13] * s[7] * s[10];
            inv[4] = -s[4] * s[10] * s[15] + s[4] * s[11] * s[14] + s[8] * s[6] * s[15]
                - s[8] * s[7] * s[14] - s[12] * s[6] * s[11] + s[12] * s[7] * s[10];
            inv[8] = s[4] * s[9] * s[15] - s[4] * s[11] * s[13] - s[8] * s[5] * s[15]
                + s[8] * s[7] * s[13] + s[12] * s[5] * s[11] - s[12] * s[7] * s[9];
            inv[12] = -s[4] * s[9] * s[14] + s[4] * s[10] * s[13] + s[8] * s[5] * s[14]
                - s[8] * s[6] * s[13] - s[12] * s[5] * s[10] + s[12] * s[6] * s[9];
            inv[1] = -s[1] * s[10] * s[15] + s[1] * s[11] * s[14] + s[9] * s[2] * s[15]
                - s[9] * s[3] * s[14] - s[13] * s[2] * s[11] + s[13] * s[3] * s[10];
            inv[5] = s[0] * s[10] * s[15] - s[0] * s[11] * s[14] - s[8] * s[2] * s[15]
                + s[8] * s[3] * s[14] + s[12] * s[2] * s[11] - s[12] * s[3] * s[10];
            inv[9] = -s[0] * s[9] * s[15] + s[0] * s[11] * s[13] + s[8] * s[1] * s[15]
                - s[8] * s[3] * s[13] - s[12] * s[1] * s[11] + s[12] * s[3] * s[9];
            inv[13] = s[0] * s[9] * s[14] - s[0] * s[10] * s[13] - s[8] * s[1] * s[14]
                + s[8] * s[2] * s[13] + s[12] * s[1] * s[10] - s[12] * s[2] * s[9];
            inv[2] = s[1] * s[6] * s[15] - s[1] * s[7] * s[14] - s[5] * s[2] * s[15]
                + s[5] * s[3] * s[14] + s[13] * s[2] * s[7] - s[13] * s[3] * s[6];
            inv[6] = -s[0] * s[6] * s[15] + s[0] * s[7] * s[14] + s[4] * s[2] * s[15]
                - s[4] * s[3] * s[14] - s[12] * s[2] * s[7] + s[12] * s[3] * s[6];
            inv[10] = s[0] * s[5] * s[15] - s[0] * s[7] * s[13] - s[4] * s[1] * s[15]
                + s[4] * s[3] * s[13] + s[12] * s[1] * s[7] - s[12] * s[3] * s[5];
            inv[14] = -s[0] * s[5] * s[14] + s[0] * s[6] * s[13] + s[4] * s[1] * s[14]
                - s[4] * s[2] * s[13] - s[12] * s[1] * s[6] + s[12] * s[2] * s[5];
            inv[3] = -s[1] * s[6] * s[11] + s[1] * s[7] * s[10] + s[5] * s[2] * s[11]
                - s[5] * s[3] * s[10] - s[9] * s[2] * s[7] + s[9] * s[3] * s[6];
            inv[7] = s[0] * s[6] * s[11] - s[0] * s[7] * s[10] - s[4] * s[2] * s[11]
                + s[4] * s[3] * s[10] + s[8] * s[2] * s[7] - s[8] * s[3] * s[6];
            inv[11] = -s[0] * s[5] * s[11] + s[0] * s[7] * s[9] + s[4] * s[1] * s[11]
                - s[4] * s[3] * s[9] - s[8] * s[1] * s[7] + s[8] * s[3] * s[5];
            inv[15] = s[0] * s[5] * s[10] - s[0] * s[6] * s[9] - s[4] * s[1] * s[10]
                + s[4] * s[2] * s[9] + s[8] * s[1] * s[6] - s[8] * s[2] * s[5];
            det = s[0] * inv[0] + s[1] * inv[4] + s[2] * inv[8] + s[3] * inv[12];
            if (det === 0) {
                return this;
            }
            det = 1 / det;
            for (i = 0; i < 16; i++) {
                d[i] = inv[i] * det;
            }
            return this;
        };
        /**
         * Calculate the inverse matrix of specified matrix, and set to this.
         * @param other The source matrix
         * @return this
         */
        Matrix.prototype.inverseOf = function () {
            return this.setInverseOf(this);
        };
        /**
         * Transpose the matrix.
         * @return this
         */
        Matrix.prototype.transpose = function () {
            var e, t;
            e = this._values;
            t = e[1];
            e[1] = e[4];
            e[4] = t;
            t = e[2];
            e[2] = e[8];
            e[8] = t;
            t = e[3];
            e[3] = e[12];
            e[12] = t;
            t = e[6];
            e[6] = e[9];
            e[9] = t;
            t = e[7];
            e[7] = e[13];
            e[13] = t;
            t = e[11];
            e[11] = e[14];
            e[14] = t;
            return this;
        };
        /**
         * Set the matrix for translation.
         * @param x The X value of a translation.
         * @param y The Y value of a translation.
         * @param z The Z value of a translation.
         * @return this
         */
        Matrix.prototype.setTranslate = function (x, y, z) {
            var e = this._values;
            e[0] = 1;
            e[4] = 0;
            e[8] = 0;
            e[12] = x;
            e[1] = 0;
            e[5] = 1;
            e[9] = 0;
            e[13] = y;
            e[2] = 0;
            e[6] = 0;
            e[10] = 1;
            e[14] = z;
            e[3] = 0;
            e[7] = 0;
            e[11] = 0;
            e[15] = 1;
            return this;
        };
        /**
         * Multiply the matrix for translation from the right.
         * @param x The X value of a translation.
         * @param y The Y value of a translation.
         * @param z The Z value of a translation.
         * @return this
         */
        Matrix.prototype.translate = function (x, y, z) {
            this.applyMatrix(Matrix.create().setTranslate(x, y, z));
            return this;
        };
        /**
         * Set the matrix for rotation.
         * The vector of rotation axis may not be normalized.
         * @param angle The angle of rotation (degrees)
         * @param x The X coordinate of vector of rotation axis.
         * @param y The Y coordinate of vector of rotation axis.
         * @param z The Z coordinate of vector of rotation axis.
         * @return this
         */
        Matrix.prototype.setRotate = function (angle, x, y, z) {
            var e, s, c, len, rlen, nc, xy, yz, zx, xs, ys, zs;
            var angle = Math.PI * angle / 180;
            e = this._values;
            s = Math.sin(angle);
            c = Math.cos(angle);
            if (0 !== x && 0 === y && 0 === z) {
                // Rotation around X axis
                if (x < 0) {
                    s = -s;
                }
                e[0] = 1;
                e[4] = 0;
                e[8] = 0;
                e[12] = 0;
                e[1] = 0;
                e[5] = c;
                e[9] = -s;
                e[13] = 0;
                e[2] = 0;
                e[6] = s;
                e[10] = c;
                e[14] = 0;
                e[3] = 0;
                e[7] = 0;
                e[11] = 0;
                e[15] = 1;
            }
            else if (0 === x && 0 !== y && 0 === z) {
                // Rotation around Y axis
                if (y < 0) {
                    s = -s;
                }
                e[0] = c;
                e[4] = 0;
                e[8] = s;
                e[12] = 0;
                e[1] = 0;
                e[5] = 1;
                e[9] = 0;
                e[13] = 0;
                e[2] = -s;
                e[6] = 0;
                e[10] = c;
                e[14] = 0;
                e[3] = 0;
                e[7] = 0;
                e[11] = 0;
                e[15] = 1;
            }
            else if (0 === x && 0 === y && 0 !== z) {
                // Rotation around Z axis
                if (z < 0) {
                    s = -s;
                }
                e[0] = c;
                e[4] = -s;
                e[8] = 0;
                e[12] = 0;
                e[1] = s;
                e[5] = c;
                e[9] = 0;
                e[13] = 0;
                e[2] = 0;
                e[6] = 0;
                e[10] = 1;
                e[14] = 0;
                e[3] = 0;
                e[7] = 0;
                e[11] = 0;
                e[15] = 1;
            }
            else {
                // Rotation around another axis
                len = Math.sqrt(x * x + y * y + z * z);
                if (len !== 1) {
                    //转换为单位向量
                    rlen = 1 / len;
                    x *= rlen;
                    y *= rlen;
                    z *= rlen;
                }
                nc = 1 - c;
                xy = x * y;
                yz = y * z;
                zx = z * x;
                xs = x * s;
                ys = y * s;
                zs = z * s;
                e[0] = x * x * nc + c;
                e[1] = xy * nc + zs;
                e[2] = zx * nc - ys;
                e[3] = 0;
                e[4] = xy * nc - zs;
                e[5] = y * y * nc + c;
                e[6] = yz * nc + xs;
                e[7] = 0;
                e[8] = zx * nc + ys;
                e[9] = yz * nc - xs;
                e[10] = z * z * nc + c;
                e[11] = 0;
                e[12] = 0;
                e[13] = 0;
                e[14] = 0;
                e[15] = 1;
            }
            return this;
        };
        /**
         * Multiply the matrix for rotation from the right.
         * The vector of rotation axis may not be normalized.
         * @param angle The angle of rotation (degrees)
         * @param x The X coordinate of vector of rotation axis.
         * @param y The Y coordinate of vector of rotation axis.
         * @param z The Z coordinate of vector of rotation axis.
         * @return this
         */
        Matrix.prototype.rotate = function (angle, x, y, z) {
            this.applyMatrix(Matrix.create().setRotate(angle, x, y, z));
            return this;
        };
        /**
         * Set the matrix for scaling.
         * @param x The scale factor along the X axis
         * @param y The scale factor along the Y axis
         * @param z The scale factor along the Z axis
         * @return this
         */
        Matrix.prototype.setScale = function (x, y, z) {
            var e = this._values;
            e[0] = x;
            e[4] = 0;
            e[8] = 0;
            e[12] = 0;
            e[1] = 0;
            e[5] = y;
            e[9] = 0;
            e[13] = 0;
            e[2] = 0;
            e[6] = 0;
            e[10] = z;
            e[14] = 0;
            e[3] = 0;
            e[7] = 0;
            e[11] = 0;
            e[15] = 1;
            return this;
        };
        /**
         * Multiply the matrix for scaling from the right.
         * @param x The scale factor along the X axis
         * @param y The scale factor along the Y axis
         * @param z The scale factor along the Z axis
         * @return this
         */
        Matrix.prototype.scale = function (x, y, z) {
            this.applyMatrix(Matrix.create().setScale(x, y, z));
            return this;
        };
        Matrix.prototype.setLookAt = function (eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ) {
            var e, fx, fy, fz, rlf, sx, sy, sz, rls, ux, uy, uz;
            fx = centerX - eyeX;
            fy = centerY - eyeY;
            fz = centerZ - eyeZ;
            // Normalize f.
            rlf = 1 / Math.sqrt(fx * fx + fy * fy + fz * fz);
            fx *= rlf;
            fy *= rlf;
            fz *= rlf;
            // Calculate cross product of f and up.
            sx = fy * upZ - fz * upY;
            sy = fz * upX - fx * upZ;
            sz = fx * upY - fy * upX;
            // Normalize s.
            rls = 1 / Math.sqrt(sx * sx + sy * sy + sz * sz);
            sx *= rls;
            sy *= rls;
            sz *= rls;
            // Calculate cross product of s and f.
            ux = sy * fz - sz * fy;
            uy = sz * fx - sx * fz;
            uz = sx * fy - sy * fx;
            // Set to this.
            e = this._values;
            e[0] = sx;
            e[1] = ux;
            e[2] = -fx;
            e[3] = 0;
            e[4] = sy;
            e[5] = uy;
            e[6] = -fy;
            e[7] = 0;
            e[8] = sz;
            e[9] = uz;
            e[10] = -fz;
            e[11] = 0;
            e[12] = 0;
            e[13] = 0;
            e[14] = 0;
            e[15] = 1;
            //Translate.
            //this.translate(-eyeX, -eyeY, -eyeZ);
            this.values = this.multiply(Matrix.create().setTranslate(-eyeX, -eyeY, -eyeZ)).values;
            return this;
        };
        /**
         * Multiply the viewing matrix from the right.
         * @param eyeX, eyeY, eyeZ The position of the eye point.
         * @param centerX, centerY, centerZ The position of the reference point.
         * @param upX, upY, upZ The direction of the up vector.
         * @return this
         */
        Matrix.prototype.lookAt = function (eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ) {
            this.applyMatrix(Matrix.create().setLookAt(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ));
            return this;
        };
        Matrix.prototype.setOrtho = function (near, far) {
            var e = this._values;
            e[0] = 1;
            e[1] = 0;
            e[2] = 0;
            e[3] = 0;
            e[4] = 0;
            e[5] = 1;
            e[6] = 0;
            e[7] = 0;
            e[8] = 0;
            e[9] = 0;
            e[10] = 2 / (near - far);
            e[11] = 0;
            e[12] = 0;
            e[13] = 0;
            e[14] = (near + far) / (near - far);
            e[15] = 1;
            return this;
        };
        Matrix.prototype.ortho = function (n, f) {
            this.applyMatrix(Matrix.create().setOrtho(n, f));
            return this;
        };
        /**
         * Set the perspective projection matrix by fovy and aspect.
         * @param fovy The angle between the upper and lower sides of the frustum.
         * @param aspect The aspect ratio of the frustum. (width/height)
         * @param near The distances to the nearer depth clipping plane. This value must be plus value.
         * @param far The distances to the farther depth clipping plane. This value must be plus value.
         * @return this
         */
        Matrix.prototype.setPerspective = function (fovy, aspect, near, far) {
            var e, rd, s, ct, log = dyCb.Log, info = log.info;
            log.error(near === far || aspect === 0, info.FUNC_MUST_NOT_BE("frustum", "null"));
            log.error(near <= 0, info.FUNC_MUST("near", "> 0"));
            log.error(far <= 0, info.FUNC_MUST("far", "> 0"));
            var fovy = Math.PI * fovy / 180 / 2;
            s = Math.sin(fovy);
            if (s === 0) {
                log.error(s === 0, info.FUNC_MUST_NOT_BE("frustum", "null"));
            }
            rd = 1 / (far - near);
            ct = Math.cos(fovy) / s;
            e = this._values;
            e[0] = ct / aspect;
            e[1] = 0;
            e[2] = 0;
            e[3] = 0;
            e[4] = 0;
            e[5] = ct;
            e[6] = 0;
            e[7] = 0;
            e[8] = 0;
            e[9] = 0;
            e[10] = -(far + near) * rd;
            e[11] = -1;
            e[12] = 0;
            e[13] = 0;
            e[14] = -2 * near * far * rd;
            e[15] = 0;
            return this;
        };
        Matrix.prototype.perspective = function (fovy, aspect, near, far) {
            this.applyMatrix(Matrix.create().setPerspective(fovy, aspect, near, far));
            return this;
        };
        Matrix.prototype.applyMatrix = function (other) {
            var a = this, b = other;
            //this._values = MathUtils.multiply(a, b);
            //b*a，而不是a*b
            //这是因为在webgl中，向量是右乘的，
            //此处希望坐标向量先进行this._values的变换，然后进行other.values的变换，因此要b*a，从而在右乘向量时为b*a*vec
            this._values = b.multiply(a).values;
            return this;
        };
        Matrix.prototype.multiply = function (matrix2) {
            var mat1 = this._values, mat2 = matrix2.values;
            var a = mat1[0], b = mat1[1], c = mat1[2], d = mat1[3], e = mat1[4], f = mat1[5], g = mat1[6], h = mat1[7], i = mat1[8], j = mat1[9], k = mat1[10], l = mat1[11], m = mat1[12], n = mat1[13], o = mat1[14], p = mat1[15], A = mat2[0], B = mat2[1], C = mat2[2], D = mat2[3], E = mat2[4], F = mat2[5], G = mat2[6], H = mat2[7], I = mat2[8], J = mat2[9], K = mat2[10], L = mat2[11], M = mat2[12], N = mat2[13], O = mat2[14], P = mat2[15];
            var dest = new Float32Array(16);
            dest[0] = A * a + B * e + C * i + D * m;
            dest[1] = A * b + B * f + C * j + D * n;
            dest[2] = A * c + B * g + C * k + D * o;
            dest[3] = A * d + B * h + C * l + D * p;
            dest[4] = E * a + F * e + G * i + H * m;
            dest[5] = E * b + F * f + G * j + H * n;
            dest[6] = E * c + F * g + G * k + H * o;
            dest[7] = E * d + F * h + G * l + H * p;
            dest[8] = I * a + J * e + K * i + L * m;
            dest[9] = I * b + J * f + K * j + L * n;
            dest[10] = I * c + J * g + K * k + L * o;
            dest[11] = I * d + J * h + K * l + L * p;
            dest[12] = M * a + N * e + O * i + P * m;
            dest[13] = M * b + N * f + O * j + P * n;
            dest[14] = M * c + N * g + O * k + P * o;
            dest[15] = M * d + N * h + O * l + P * p;
            return Matrix.create(dest);
        };
        Matrix.prototype.multiplyVector4 = function (vector) {
            var mat1 = this._values, vec4 = vector.values;
            var result = [];
            result[0] = vec4[0] * mat1[0] + vec4[1] * mat1[4] + vec4[2] * mat1[8] + vec4[3] * mat1[12];
            result[1] = vec4[0] * mat1[1] + vec4[1] * mat1[5] + vec4[2] * mat1[9] + vec4[3] * mat1[13];
            result[2] = vec4[0] * mat1[2] + vec4[1] * mat1[6] + vec4[2] * mat1[10] + vec4[3] * mat1[14];
            result[3] = vec4[0] * mat1[3] + vec4[1] * mat1[7] + vec4[2] * mat1[11] + vec4[3] * mat1[15];
            return dy.Vector4.create(result[0], result[1], result[2], result[3]);
        };
        Matrix.prototype.copy = function () {
            var result = Matrix.create(), i = 0, len = this._values.length;
            for (i = 0; i < len; i++) {
                result.values[i] = this._values[i];
            }
            return result;
        };
        return Matrix;
    })();
    dy.Matrix = Matrix;
})(dy || (dy = {}));

/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var Action = (function () {
        function Action(matrix) {
            this._isFinish = false;
            this.matrix = null;
            this.matrix = matrix;
        }
        Object.defineProperty(Action.prototype, "isFinish", {
            get: function () {
                return this._isFinish;
            },
            set: function (isFinish) {
                this._isFinish = isFinish;
            },
            enumerable: true,
            configurable: true
        });
        Action.prototype.update = function () {
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        };
        Action.prototype.finish = function () {
            this._isFinish = true;
        };
        return Action;
    })();
    dy.Action = Action;
})(dy || (dy = {}));

/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var ActionManager = (function () {
        function ActionManager() {
            this._children = dyCb.Collection.create();
        }
        ActionManager.create = function () {
            var obj = new this();
            return obj;
        };
        ActionManager.prototype.addChild = function (action) {
            if (this.hasChild(action)) {
                return;
            }
            this._children.addChild(action);
        };
        ActionManager.prototype.hasChild = function (action) {
            return this._children.hasChild(action);
        };
        ActionManager.prototype.update = function () {
            var self = this, removeQueue = [];
            //time = null;
            this._children.forEach(function (child) {
                //修复“如果遍历的动作删除了动作序列中某个动作，则在后面的遍历中会报错”的bug
                if (!child) {
                    return;
                }
                if (child.isFinish) {
                    removeQueue.push(child);
                    return;
                }
                //if (child.isStop()) {
                //    return;
                //}
                //child.update(time);
                child.update();
            });
            removeQueue.forEach(function (child) {
                self._children.removeChild(child);
            });
        };
        return ActionManager;
    })();
    dy.ActionManager = ActionManager;
})(dy || (dy = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var Rotate = (function (_super) {
        __extends(Rotate, _super);
        function Rotate(matrix, axisData) {
            _super.call(this, matrix);
            this._speed = null;
            this._axis = null;
            this._point = null;
            this._angle = 0;
            this._speed = axisData.speed;
            if (axisData.axis.length === 2) {
                this._axis = axisData.axis[1].sub(axisData.axis[0]);
                this._point = axisData.axis[0];
            }
            else if (axisData.axis.length === 1) {
                this._axis = axisData.axis[0];
                this._point = dy.Vector3.create(0, 0, 0);
            }
            else {
                dyCb.Log.error(true, "axis's length should be 1 or 2");
            }
        }
        Rotate.create = function (matrix, actionData) {
            var obj = new this(matrix, actionData);
            return obj;
        };
        Rotate.prototype.update = function () {
            var movePoint = null, backPoint = null;
            this._angle = this._speed;
            if (this._isNotRotateAroundOriginPoint()) {
                movePoint = this._point.copy().reverse().values;
                backPoint = this._point.values;
                this.matrix.translate(movePoint[0], movePoint[1], movePoint[2]);
                this.matrix.rotate(this._angle, this._axis.values[0], this._axis.values[1], this._axis.values[2]);
                this.matrix.translate(backPoint[0], backPoint[1], backPoint[2]);
            }
            else {
                this.matrix.rotate(this._angle, this._axis.values[0], this._axis.values[1], this._axis.values[2]);
            }
        };
        Rotate.prototype._isNotRotateAroundOriginPoint = function () {
            return this._point.values[0] !== 0
                || this._point.values[1] !== 0
                || this._point.values[2] !== 0;
        };
        return Rotate;
    })(dy.Action);
    dy.Rotate = Rotate;
})(dy || (dy = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var Scale = (function (_super) {
        __extends(Scale, _super);
        function Scale(matrix, data) {
            _super.call(this, matrix);
            this._x = 0;
            this._y = 0;
            this._z = 0;
            this._x = data.x;
            this._y = data.y;
            this._z = data.z;
        }
        Scale.create = function (matrix, data) {
            var obj = new this(matrix, data);
            return obj;
        };
        Scale.prototype.update = function () {
            this.matrix.scale(this._x, this._y, this._z);
            this.finish();
        };
        return Scale;
    })(dy.Action);
    dy.Scale = Scale;
})(dy || (dy = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var Translate = (function (_super) {
        __extends(Translate, _super);
        function Translate(matrix, posData) {
            _super.call(this, matrix);
            this._x = 0;
            this._y = 0;
            this._z = 0;
            this._x = posData.x;
            this._y = posData.y;
            this._z = posData.z;
        }
        Translate.create = function (matrix, posData) {
            var obj = new this(matrix, posData);
            return obj;
        };
        Translate.prototype.update = function () {
            this.matrix.translate(this._x, this._y, this._z);
            this.finish();
        };
        return Translate;
    })(dy.Action);
    dy.Translate = Translate;
})(dy || (dy = {}));

//reference to three.js->Color.js
var dy;
(function (dy) {
    var Color = (function () {
        function Color() {
            this._r = null;
            this._g = null;
            this._b = null;
        }
        Color.create = function (colorVal) {
            var obj = new this();
            obj.initWhenCreate(colorVal);
            return obj;
        };
        Object.defineProperty(Color.prototype, "r", {
            get: function () {
                return this._r;
            },
            set: function (r) {
                this._r = r;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color.prototype, "g", {
            get: function () {
                return this._g;
            },
            set: function (g) {
                this._g = g;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color.prototype, "b", {
            get: function () {
                return this._b;
            },
            set: function (b) {
                this._b = b;
            },
            enumerable: true,
            configurable: true
        });
        Color.prototype.initWhenCreate = function (colorVal) {
            this._setColor(colorVal);
        };
        Color.prototype._setColor = function (colorVal) {
            //
            //// rgb(255,0,0)
            ////
            ////将我们平常习惯的颜色值表达形式rgb(255,0,0)-数值型，转换成THREE.JS认识的形式0.0-1.0，
            ////这里将取值范围从0-255换算成0.0-1.0.
            //
            //if ( /^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.test( style ) ) {	//用正则表达式检查当前传递的颜色值表达样式是否为数值型rgb(255,0,0)
            //
            //    var color = /^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.exec( style );	//将字符串中的数值赋值给color，color是一个数组。
            //
            //    this.r = Math.min( 255, parseInt( color[ 1 ], 10 ) ) / 255;		//将数组中的第2个元素转换成10进制int类型整数，判断是否小于255，然后除以255，得出小数，复制给Color.r
            //    this.g = Math.min( 255, parseInt( color[ 2 ], 10 ) ) / 255;		//将数组中的第3个元素转换成10进制int类型整数，判断是否小于255，然后除以255，得出小数，复制给Color.g
            //    this.b = Math.min( 255, parseInt( color[ 3 ], 10 ) ) / 255;		//将数组中的第4个元素转换成10进制int类型整数，判断是否小于255，然后除以255，得出小数，复制给Color.b
            //
            //    return this; //返回颜色对象。
            //
            //}
            //
            //// rgb(100%,0%,0%)
            ////将我们平常习惯的颜色值表达形式rgb(100%,0%,0%)-百分比型，转换成THREE.JS认识的形式0.0-1.0，
            ////这里将取值范围从0%-100%换算成0.0-1.0.
            //
            //if ( /^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.test( style ) ) {	//用正则表达式检查当前传递的颜色值表达样式是否为百分比型rgb(100%,0%,0%)
            //
            //    var color = /^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.exec( style );	//将字符串中的数值赋值给color，color是一个数组。
            //
            //    this.r = Math.min( 100, parseInt( color[ 1 ], 10 ) ) / 100;		//将数组中的第2个元素转换成10进制int类型整数，判断是否小于100，然后除以100，得出小数，复制给Color.r
            //    this.g = Math.min( 100, parseInt( color[ 2 ], 10 ) ) / 100;		//将数组中的第3个元素转换成10进制int类型整数，判断是否小于100，然后除以100，得出小数，复制给Color.g
            //    this.b = Math.min( 100, parseInt( color[ 3 ], 10 ) ) / 100;		//将数组中的第4个元素转换成10进制int类型整数，判断是否小于100，然后除以100，得出小数，复制给Color.b
            //
            //    return this; //返回颜色对象。
            //
            //}
            // #ff0000
            //将我们平常习惯的颜色值表达形式#ff0000-6位16进制型，转换成THREE.JS认识的形式0.0-1.0，
            //这里将取值范围从00-ff换算成0.0-1.0.
            if (/^\#([0-9a-f]{6})$/i.test(colorVal)) {
                var color = /^\#([0-9a-f]{6})$/i.exec(colorVal); //将字符串中的数值赋值给color，color是一个数组。
                this._setHex(parseInt(color[1], 16)); //将数组中的第2个元素转换成16进制int类型整数.调用setHex 方法，将16进制数值赋值给Color.r,Color.g,Color.b
                return this; //返回颜色对象。
            }
            //
            //// #f00
            ////将我们平常习惯的颜色值表达形式#f00-3位16进制型，转换成THREE.JS认识的形式0.0-1.0，
            ////这里将取值范围从0-f换算成0.0-1.0.
            //
            //if ( /^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.test( style ) ) {	//用正则表达式检查当前传递的颜色值表达样式是否为3位16进制型 #f00
            //
            //    var color = /^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec( style );	//将字符串中的数值赋值给color，color是一个数组。
            //
            //    this.setHex( parseInt( color[ 1 ] + color[ 1 ] + color[ 2 ] + color[ 2 ] + color[ 3 ] + color[ 3 ], 16 ) );	//将数组中的第2，3,4个元素*2，转换成16进制int类型整数.调用setHex 方法，将16进制数值赋值给Color.r,Color.g,Color.b
            //
            //    return this; //返回颜色对象。
            //
            //}
            //
            //// red
            ////将我们平常习惯的颜色值表达形式red颜色名，转换成THREE.JS认识的形式0.0-1.0，
            ////这里将颜色名换算成0.0-1.0.
            //
            //if ( /^(\w+)$/i.test( style ) ) {	//用正则表达式检查当前传递的颜色值表达样式是否为颜色名，即参数style中是否只是字符串没有数字。
            //
            //    this.setHex( THREE.ColorKeywords[ style ] );	//将字符串作为THREE.ColorKeywords对象的属性名，取出与该属性名相对应的16进制的属性值.调用setHex 方法，将16进制的属性值赋值给Color.r,Color.g,Color.b
            //
            //    return this;	//返回颜色对象。
            //
            //}
        };
        /*setHex方法
         ///setHex方法用于设置16进制颜色值给当前实例
         ///更多关于hex颜色的内容参考维基百科,http://zh.wikipedia.org/wiki/%E7%BD%91%E9%A1%B5%E9%A2%9C%E8%89%B2
         */
        ///<summary>setHex</summary>
        ///<param name ="hex" type="number(16进制颜色值0xffddff）">16进制数值0xffddff</param>
        ///<returns type="Color">返回颜色对象</returns>
        Color.prototype._setHex = function (hex) {
            hex = Math.floor(hex);
            this._r = (hex >> 16 & 255) / 255; //将左边两位16进制数值变换成rgb颜色值对应的red，并赋值给属性Color.r。
            this._g = (hex >> 8 & 255) / 255; //将中间两位16进制数值变换成rgb颜色值对应的green，并赋值给属性Color.g。
            this._b = (hex & 255) / 255; //将右边两位16进制数值变换成rgb颜色值对应的blue，并赋值给属性Color.b。
            return this; //返回颜色对象
        };
        return Color;
    })();
    dy.Color = Color;
})(dy || (dy = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var JudgeUtils = (function (_super) {
        __extends(JudgeUtils, _super);
        function JudgeUtils() {
            _super.apply(this, arguments);
        }
        JudgeUtils.isView = function (obj) {
            return !!obj && obj.offset && obj.width && obj.height && this.isFunction(obj.getContext);
        };
        JudgeUtils.isEqual = function (target1, target2) {
            return target1.uid === target2.uid;
        };
        return JudgeUtils;
    })(dyCb.JudgeUtils);
    dy.JudgeUtils = JudgeUtils;
})(dy || (dy = {}));

var dy;
(function (dy) {
    (function (ShaderType) {
        ShaderType[ShaderType["VS"] = 0] = "VS";
        ShaderType[ShaderType["FS"] = 1] = "FS";
    })(dy.ShaderType || (dy.ShaderType = {}));
    var ShaderType = dy.ShaderType;
})(dy || (dy = {}));

/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var Shader = (function () {
        function Shader() {
        }
        Shader.createShader = function (source, type) {
            var shader = null, gl = dy.Director.getInstance().gl;
            switch (type) {
                case dy.ShaderType.VS:
                    shader = gl.createShader(gl.VERTEX_SHADER);
                    break;
                case dy.ShaderType.FS:
                    shader = gl.createShader(gl.FRAGMENT_SHADER);
                    break;
                default:
                    return;
            }
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                return shader;
            }
            else {
                dyCb.Log.log(gl.getShaderInfoLog(shader));
            }
        };
        return Shader;
    })();
    dy.Shader = Shader;
})(dy || (dy = {}));

var dy;
(function (dy) {
    (function (BufferType) {
        BufferType[BufferType["UNSIGNED_BYTE"] = "UNSIGNED_BYTE"] = "UNSIGNED_BYTE";
        BufferType[BufferType["SHORT"] = "SHORT"] = "SHORT";
        BufferType[BufferType["UNSIGNED_SHORT"] = "UNSIGNED_SHORT"] = "UNSIGNED_SHORT";
        BufferType[BufferType["INT"] = "INT"] = "INT";
        BufferType[BufferType["UNSIGNED_INT"] = "UNSIGNED_INT"] = "UNSIGNED_INT";
        BufferType[BufferType["FLOAT"] = "FLOAT"] = "FLOAT";
    })(dy.BufferType || (dy.BufferType = {}));
    var BufferType = dy.BufferType;
})(dy || (dy = {}));

var dy;
(function (dy) {
    (function (AttributeDataType) {
        AttributeDataType[AttributeDataType["FLOAT_4"] = 0] = "FLOAT_4";
        AttributeDataType[AttributeDataType["BUFFER"] = 1] = "BUFFER";
    })(dy.AttributeDataType || (dy.AttributeDataType = {}));
    var AttributeDataType = dy.AttributeDataType;
})(dy || (dy = {}));

var dy;
(function (dy) {
    (function (DrawMode) {
        DrawMode[DrawMode["TRIANGLES"] = "TRIANGLES"] = "TRIANGLES";
    })(dy.DrawMode || (dy.DrawMode = {}));
    var DrawMode = dy.DrawMode;
})(dy || (dy = {}));

/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var ElementBuffer = (function () {
        function ElementBuffer() {
            this._buffer = null;
            this._type = null;
            this._num = null;
            this._typeSize = null;
        }
        ElementBuffer.create = function (data, type) {
            var obj = new this();
            obj.initWhenCreate(data, type);
            return obj;
        };
        Object.defineProperty(ElementBuffer.prototype, "buffer", {
            get: function () { return this._buffer; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ElementBuffer.prototype, "type", {
            get: function () { return this._type; },
            set: function (type) {
                this._type = type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ElementBuffer.prototype, "num", {
            get: function () { return this._num; },
            set: function (num) {
                this._num = num;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ElementBuffer.prototype, "typeSize", {
            get: function () { return this._typeSize; },
            enumerable: true,
            configurable: true
        });
        ElementBuffer.prototype.initWhenCreate = function (data, type) {
            var gl = dy.Director.getInstance().gl;
            if (!data || !this._checkDataType(data, type)) {
                return null;
            }
            this._buffer = gl.createBuffer(); // Create a buffer object
            if (!this._buffer) {
                dyCb.Log.log('Failed to create the this._buffer object');
                return null;
            }
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._buffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
            this._type = gl[type];
            this._num = data.length;
            this._typeSize = this._getInfo(type).size;
            return this._buffer;
        };
        ElementBuffer.prototype._checkDataType = function (data, type) {
            var info = this._getInfo(type);
            return data instanceof info.typeClass;
        };
        ElementBuffer.prototype._getInfo = function (type) {
            var info = null;
            switch (type) {
                case dy.BufferType.UNSIGNED_BYTE:
                    info = {
                        typeClass: Uint8Array,
                        size: 1
                    };
                    break;
                case dy.BufferType.SHORT:
                    info = {
                        typeClass: Int16Array,
                        size: 2
                    };
                    break;
                case dy.BufferType.UNSIGNED_SHORT:
                    info = {
                        typeClass: Uint16Array,
                        size: 2
                    };
                    break;
                case dy.BufferType.INT:
                    info = {
                        typeClass: Int32Array,
                        size: 4
                    };
                    break;
                case dy.BufferType.UNSIGNED_INT:
                    info = {
                        typeClass: Uint32Array,
                        size: 4
                    };
                    break;
                case dy.BufferType.FLOAT:
                    info = {
                        typeClass: Float32Array,
                        size: 4
                    };
                    break;
                default:
                    dyCb.Log.error(true, dyCb.Log.info.FUNC_INVALID("BufferType"));
                    break;
            }
            return info;
        };
        return ElementBuffer;
    })();
    dy.ElementBuffer = ElementBuffer;
})(dy || (dy = {}));

/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var ArrayBuffer = (function () {
        function ArrayBuffer() {
            this._buffer = null;
            this._num = null;
            this._type = null;
            this._count = null;
        }
        ArrayBuffer.create = function (data, num, type) {
            var obj = new this();
            obj.initWhenCreate(data, num, type);
            return obj;
        };
        Object.defineProperty(ArrayBuffer.prototype, "buffer", {
            get: function () { return this._buffer; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ArrayBuffer.prototype, "num", {
            get: function () { return this._num; },
            set: function (num) {
                this._num = num;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ArrayBuffer.prototype, "type", {
            get: function () { return this._type; },
            set: function (type) {
                this._type = type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ArrayBuffer.prototype, "count", {
            get: function () {
                return this._count;
            },
            set: function (count) {
                this._count = count;
            },
            enumerable: true,
            configurable: true
        });
        ArrayBuffer.prototype.initWhenCreate = function (data, num, type) {
            var gl = dy.Director.getInstance().gl;
            if (!data) {
                return null;
            }
            this._buffer = gl.createBuffer(); // Create a buffer object
            if (!this._buffer) {
                dyCb.Log.log('Failed to create the this._buffer object');
                return null;
            }
            gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer);
            gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
            gl.bindBuffer(gl.ARRAY_BUFFER, null);
            this._num = num;
            this._type = gl[type];
            this._count = data.length / num;
            return this._buffer;
        };
        return ArrayBuffer;
    })();
    dy.ArrayBuffer = ArrayBuffer;
})(dy || (dy = {}));

var dy;
(function (dy) {
    (function (UniformDataType) {
        UniformDataType[UniformDataType["FLOAT_MAT4"] = 0] = "FLOAT_MAT4";
    })(dy.UniformDataType || (dy.UniformDataType = {}));
    var UniformDataType = dy.UniformDataType;
})(dy || (dy = {}));

/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var Program = (function () {
        function Program() {
            this._program = dy.Director.getInstance().gl.createProgram();
        }
        Program.create = function (vsSource, fsSource) {
            var obj = new this();
            obj.initWhenCreate(vsSource, fsSource);
            return obj;
        };
        Program.prototype.use = function () {
            dy.Director.getInstance().gl.useProgram(this._program);
        };
        Program.prototype.setUniformData = function (name, type, data) {
            var gl = dy.Director.getInstance().gl, pos = gl.getUniformLocation(this._program, name);
            switch (type) {
                case dy.UniformDataType.FLOAT_MAT4:
                    gl.uniformMatrix4fv(pos, false, data.values);
                    break;
                default:
                    dyCb.Log.error(true, dyCb.Log.info.FUNC_INVALID("UniformDataType"));
                    break;
            }
        };
        Program.prototype.setAttributeData = function (name, type, data) {
            var gl = dy.Director.getInstance().gl, pos = gl.getAttribLocation(this._program, name);
            switch (type) {
                case dy.AttributeDataType.FLOAT_4:
                    var dataArr = data;
                    gl.vertexAttrib4f(pos, dataArr[0], dataArr[1], dataArr[2], dataArr[3]);
                    break;
                case dy.AttributeDataType.BUFFER:
                    var buffer = data;
                    gl.bindBuffer(gl.ARRAY_BUFFER, buffer.buffer);
                    gl.vertexAttribPointer(pos, buffer.num, buffer.type, false, 0, 0);
                    gl.enableVertexAttribArray(pos);
                    break;
                default:
                    dyCb.Log.error(true, dyCb.Log.info.FUNC_INVALID("AttributeDataType"));
                    break;
            }
        };
        Program.prototype.initWhenCreate = function (vsSource, fsSource) {
            var gl = dy.Director.getInstance().gl, vs = null, fs = null;
            vs = dy.Shader.createShader(vsSource, dy.ShaderType.VS);
            fs = dy.Shader.createShader(fsSource, dy.ShaderType.FS);
            // 向程序对象里分配着色器
            gl.attachShader(this._program, vs);
            gl.attachShader(this._program, fs);
            /*!
            if bower warn:"Attribute 0 is disabled. This has significant performance penalty",
            then do this before linkProgram:
             gl.bindAttribLocation( this._program, 0, "a_position");



             can reference here:
             http://stackoverflow.com/questions/20305231/webgl-warning-attribute-0-is-disabled-this-has-significant-performance-penalt?answertab=votes#tab-top


             OpenGL requires attribute zero to be enabled otherwise it will not render anything.
             On the other hand OpenGL ES 2.0 on which WebGL is based does not. So, to emulate OpenGL ES 2.0 on top of OpenGL if you don't enable attribute 0 the browser has to make a buffer for you large enough for the number of vertices you've requested to be drawn, fill it with the correct value (see gl.vertexAttrib),
              attach it to attribute zero, and enable it.

             It does all this behind the scenes but it's important for you to know that it takes time to create and fill that buffer. There are optimizations the browser can make but in the general case,
             if you were to assume you were running on OpenGL ES 2.0 and used attribute zero as a constant like you are supposed to be able to do, without the warning you'd have no idea of the work the browser is doing on your behalf to emulate that feature of OpenGL ES 2.0 that is different from OpenGL.

             In your particular case the warning doesn't have much meaning. It looks like you are only drawing a single point. But it would not be easy for the browser to figure that out so it just warns you anytime you draw and attribute 0 is not enabled.


             https://github.com/mrdoob/three.js/issues/3896
             */
            // 将着色器连接
            gl.linkProgram(this._program);
            // 判断着色器的连接是否成功
            if (gl.getProgramParameter(this._program, gl.LINK_STATUS)) {
                // 返回程序对象
                return this._program;
            }
            else {
                // 如果失败，弹出错误信息
                alert(gl.getProgramInfoLog(this._program));
                return null;
            }
        };
        return Program;
    })();
    dy.Program = Program;
})(dy || (dy = {}));

/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var QuadCommand = (function () {
        function QuadCommand() {
            this._buffers = dyCb.Hash.create();
            this._color = null;
            this._drawMode = dy.DrawMode.TRIANGLES;
        }
        QuadCommand.create = function () {
            var obj = new this();
            return obj;
        };
        Object.defineProperty(QuadCommand.prototype, "buffers", {
            get: function () {
                return this._buffers;
            },
            set: function (buffers) {
                var i = null;
                for (i in buffers) {
                    if (buffers.hasOwnProperty(i)) {
                        this._buffers.addChild(i, buffers[i]);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(QuadCommand.prototype, "color", {
            get: function () {
                return this._color;
            },
            set: function (color) {
                this._color = color;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(QuadCommand.prototype, "drawMode", {
            get: function () {
                return this._drawMode;
            },
            set: function (drawMode) {
                this._drawMode = drawMode;
            },
            enumerable: true,
            configurable: true
        });
        QuadCommand.prototype.execute = function (scene) {
            this._sendData(scene.program);
            this._draw();
        };
        QuadCommand.prototype.init = function () {
            //this._initBuffer();
        };
        //private _initBuffer(){
        //    this._buffers.addChild("vertexBuffer",
        //        this._bufferData.vertices? ArrayBuffer.create(this._bufferData.vertices, 3, BufferType.FLOAT) : null
        //    );
        //    this._buffers.addChild("texCoordBuffer",
        //        this._bufferData.texCoords? ArrayBuffer.create(this._bufferData.texCoords, 2, BufferType.FLOAT) : null
        //    );
        //    this._buffers.addChild("normalBuffer",
        //        this._bufferData.normals? ArrayBuffer.create(this._bufferData.normals, 3, BufferType.FLOAT) : null
        //    );
        //    this._buffers.addChild("indexBuffer",
        //        this._bufferData.indices? ElementBuffer.create(this._bufferData.indices, BufferType.UNSIGNED_SHORT) : null
        //    );
        //    this._buffers.addChild("colorBuffer",
        //        this._bufferData.colors? ArrayBuffer.create(this._bufferData.colors, 3, BufferType.FLOAT) : null
        //    );
        //}
        QuadCommand.prototype._sendData = function (program) {
            if (this._buffers.hasChild("vertexBuffer")) {
                program.setAttributeData("a_position", dy.AttributeDataType.BUFFER, this._buffers.getChild("vertexBuffer"));
            }
            else {
                dyCb.Log.error(true, dyCb.Log.info.FUNC_MUST("has vertexBuffer"));
            }
            //if(this.color){
            /*!
            this cause warn:"PERFORMANCE WARNING: Attribute 0 is disabled. This has signficant performance penalty" here?
            because a_color'pos is 0, and it should be array data(like Float32Array)
            refer to: https://www.khronos.org/webgl/wiki/WebGL_and_OpenGL_Differences#Vertex_Attribute_0
            */
            program.setAttributeData("a_color", dy.AttributeDataType.BUFFER, this._buffers.getChild("colorBuffer"));
            //}
        };
        QuadCommand.prototype._draw = function () {
            var totalNum = 0, startOffset = 0, vertexBuffer = this._buffers.getChild("vertexBuffer"), gl = dy.Director.getInstance().gl;
            if (this._buffers.hasChild("indexBuffer")) {
                var indexBuffer = this._buffers.getChild("indexBuffer");
                totalNum = indexBuffer.num;
                gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer.buffer);
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer.buffer);
                gl.drawElements(gl[this._drawMode], totalNum, indexBuffer.type, indexBuffer.typeSize * startOffset);
            }
            else {
                totalNum = vertexBuffer.num;
                gl.drawArrays(gl[this._drawMode], startOffset, totalNum);
            }
        };
        return QuadCommand;
    })();
    dy.QuadCommand = QuadCommand;
})(dy || (dy = {}));

/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var WebGLRenderer = (function () {
        function WebGLRenderer() {
            this._commandQueue = dyCb.Collection.create();
            this._clearColor = dy.Color.create("#000000");
            this._clearAlpha = 1.0;
        }
        WebGLRenderer.create = function () {
            var obj = new this();
            return obj;
        };
        WebGLRenderer.prototype.createQuadCommand = function () {
            return dy.QuadCommand.create();
        };
        WebGLRenderer.prototype.addCommand = function (command) {
            if (this._commandQueue.hasChild(command)) {
                return;
            }
            command.init();
            this._commandQueue.addChild(command);
        };
        WebGLRenderer.prototype.render = function (scene) {
            this._commandQueue.forEach(function (command) {
                command.execute(scene);
            });
            this._clearCommand();
        };
        WebGLRenderer.prototype.init = function () {
            dy.Director.getInstance().gl.clearColor(this._clearColor.r, this._clearColor.g, this._clearColor.b, this._clearAlpha);
        };
        WebGLRenderer.prototype.setClearColor = function (color, alpha) {
            if (alpha === void 0) { alpha = 1.0; }
            this._clearColor = color;
            this._clearAlpha = alpha;
            dy.Director.getInstance().gl.clearColor(this._clearColor.r, this._clearColor.g, this._clearColor.g, this._clearAlpha);
        };
        WebGLRenderer.prototype._clearCommand = function () {
            this._commandQueue.removeAllChildren();
        };
        return WebGLRenderer;
    })();
    dy.WebGLRenderer = WebGLRenderer;
})(dy || (dy = {}));

/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var MeshMaterial = (function () {
        function MeshMaterial(params) {
            this._color = null;
            this._color = dy.Color.create(params.color || "0xffffff");
        }
        MeshMaterial.create = function (params) {
            var obj = new this(params);
            return obj;
        };
        Object.defineProperty(MeshMaterial.prototype, "color", {
            get: function () {
                return this._color;
            },
            set: function (color) {
                this._color = color;
            },
            enumerable: true,
            configurable: true
        });
        return MeshMaterial;
    })();
    dy.MeshMaterial = MeshMaterial;
})(dy || (dy = {}));

/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var GLSLLoader = (function () {
        function GLSLLoader() {
            this._container = dyCb.Hash.create();
        }
        GLSLLoader.getInstance = function () {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        };
        GLSLLoader.prototype.load = function (url, id) {
            var self = this;
            if (this._container.getChild(id)) {
                console.log("has");
                return dyRt.createStream(function (observer) {
                    observer.next(null);
                    observer.completed();
                }).do(function () {
                    dy.LoaderManager.getInstance().onResLoaded();
                });
            }
            return dyRt.fromPromise(this._loadText(url)).do(function (data) {
                dy.LoaderManager.getInstance().onResLoaded();
                self._container.addChild(id, data);
            }, function (err) {
                dy.LoaderManager.getInstance().onResError(url, err);
            }, null);
        };
        GLSLLoader.prototype.getGLSL = function (id) {
            return this._container.getChild(id);
        };
        GLSLLoader.prototype._loadText = function (url) {
            return new RSVP.Promise(function (resolve, reject) {
                dyCb.AjaxUtils.ajax({
                    type: "get",
                    //async: true,
                    url: url,
                    contentType: "text/plain; charset=utf-8",
                    dataType: "text",
                    //cache: false,
                    success: function (data) {
                        resolve(data);
                    },
                    error: function (XMLHttpRequest, errorThrown) {
                        reject("url:" + url + "\nreadyState:" + XMLHttpRequest.readyState + "\nstatus:" + XMLHttpRequest.status
                            + "\nmessage:" + errorThrown.message
                            + "\nresponseText:" + XMLHttpRequest.responseText);
                    }
                });
            });
        };
        GLSLLoader._instance = null;
        return GLSLLoader;
    })();
    dy.GLSLLoader = GLSLLoader;
})(dy || (dy = {}));

/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var LoaderManager = (function () {
        function LoaderManager() {
            this._resCount = 0;
            this._currentLoadedCount = 0;
        }
        LoaderManager.getInstance = function () {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        };
        LoaderManager.prototype.load = function (resourcesArr) {
            var self = this;
            return dyRt.fromArray(resourcesArr).flatMap(function (res) {
                self._resCount++;
                return dy.GLSLLoader.getInstance().load(res.url, res.id);
            });
        };
        LoaderManager.prototype.reset = function () {
            this._resCount = 0;
            this._currentLoadedCount = 0;
        };
        LoaderManager.prototype.onResLoaded = function () {
            this._currentLoadedCount += 1;
        };
        LoaderManager.prototype.onResError = function (path, err) {
            dyCb.Log.log("加载" + path + "资源失败");
            if (err) {
                dyCb.Log.log(err);
            }
        };
        LoaderManager._instance = null;
        return LoaderManager;
    })();
    dy.LoaderManager = LoaderManager;
})(dy || (dy = {}));

/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var Geometry = (function () {
        function Geometry(material) {
            this._vertices = null;
            this._indices = null;
            this._colors = null;
            this.material = null;
            this.material = material;
        }
        Object.defineProperty(Geometry.prototype, "vertices", {
            get: function () {
                return this._vertices;
            },
            set: function (vertices) {
                this._vertices = vertices;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Geometry.prototype, "indices", {
            get: function () {
                return this._indices;
            },
            set: function (indices) {
                this._indices = indices;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Geometry.prototype, "colors", {
            get: function () {
                return this._colors;
            },
            set: function (colors) {
                this._colors = colors;
            },
            enumerable: true,
            configurable: true
        });
        Geometry.prototype.initWhenCreate = function () {
            this._vertices = this.computeVerticesBuffer();
            this._indices = this.computeIndicesBuffer();
            //this._normals = this._computeNormals();
            //this._texCoords = this._computeTexCoords();
            this._colors = this._computeColorsBuffer(this.material);
        };
        Geometry.prototype.computeVerticesBuffer = function () {
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        };
        Geometry.prototype.computeIndicesBuffer = function () {
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        };
        Geometry.prototype._computeColorsBuffer = function (material) {
            var arr = [], color = material.color, i = 0, len = this._vertices.count;
            for (i = 0; i < len; i++) {
                arr.push(color.r, color.g, color.b, 1.0);
            }
            return dy.ArrayBuffer.create(new Float32Array(arr), 4, dy.BufferType.FLOAT);
        };
        return Geometry;
    })();
    dy.Geometry = Geometry;
})(dy || (dy = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var BoxGeometry = (function (_super) {
        __extends(BoxGeometry, _super);
        function BoxGeometry(width, height, depth, material) {
            _super.call(this, material);
            this._width = null;
            this._height = null;
            this._depth = null;
            this._width = width;
            this._height = height;
            this._depth = depth;
        }
        BoxGeometry.create = function (width, height, depth, material) {
            var geom = new this(width, height, depth, material);
            geom.initWhenCreate();
            return geom;
        };
        BoxGeometry.prototype.computeVerticesBuffer = function () {
            var width = this._width, height = this._height, depth = this._depth, left = -width / 2, right = width / 2, up = height / 2, down = -height / 2, front = depth / 2, back = -depth / 2;
            return dy.ArrayBuffer.create(new Float32Array([
                right, up, front, left, up, front, left, down, front, right, down, front,
                right, up, front, right, down, front, right, down, back, right, up, back,
                right, up, front, right, up, back, left, up, back, left, up, front,
                left, up, front, left, up, back, left, down, back, left, down, front,
                left, down, back, right, down, back, right, down, front, left, down, front,
                right, down, back, left, down, back, left, up, back, right, up, back // v4-v7-v6-v5 back
            ]), 3, dy.BufferType.FLOAT);
        };
        BoxGeometry.prototype.computeIndicesBuffer = function () {
            return dy.ElementBuffer.create(new Uint16Array([
                0, 1, 2, 0, 2, 3,
                4, 5, 6, 4, 6, 7,
                8, 9, 10, 8, 10, 11,
                12, 13, 14, 12, 14, 15,
                16, 17, 18, 16, 18, 19,
                20, 21, 22, 20, 22, 23 // back
            ]), dy.BufferType.UNSIGNED_SHORT);
        };
        return BoxGeometry;
    })(dy.Geometry);
    dy.BoxGeometry = BoxGeometry;
})(dy || (dy = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var RectGeometry = (function (_super) {
        __extends(RectGeometry, _super);
        function RectGeometry(width, height, material) {
            _super.call(this, material);
            this._width = null;
            this._height = null;
            this._width = width;
            this._height = height;
        }
        RectGeometry.create = function (width, height, material) {
            var geom = new this(width, height, material);
            geom.initWhenCreate();
            return geom;
        };
        RectGeometry.prototype.computeVerticesBuffer = function () {
            var width = this._width, height = this._height, left = -width / 2, right = width / 2, up = height / 2, down = -height / 2;
            return dy.ArrayBuffer.create(new Float32Array([
                right, up, 0,
                left, up, 0,
                left, down, 0,
                right, down, 0
            ]), 3, dy.BufferType.FLOAT);
        };
        RectGeometry.prototype.computeIndicesBuffer = function () {
            return dy.ElementBuffer.create(new Uint16Array([
                0, 1, 2, 0, 2, 3
            ]), dy.BufferType.UNSIGNED_SHORT);
        };
        return RectGeometry;
    })(dy.Geometry);
    dy.RectGeometry = RectGeometry;
})(dy || (dy = {}));

var dy;
(function (dy) {
    (function (SphereDrawMode) {
        SphereDrawMode[SphereDrawMode["LATITUDELONGTITUDE"] = 0] = "LATITUDELONGTITUDE";
        SphereDrawMode[SphereDrawMode["DECOMPOSITION"] = 1] = "DECOMPOSITION";
    })(dy.SphereDrawMode || (dy.SphereDrawMode = {}));
    var SphereDrawMode = dy.SphereDrawMode;
})(dy || (dy = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var SphereGeometry = (function (_super) {
        __extends(SphereGeometry, _super);
        function SphereGeometry(radius, drawMode, segments, material) {
            _super.call(this, material);
            this._radius = null;
            this._drawMode = null;
            this._segments = null;
            this._data = null;
            this._radius = radius;
            this._drawMode = drawMode;
            this._segments = segments;
        }
        SphereGeometry.create = function (radius, drawMode, segments, material) {
            var geom = new this(radius, drawMode, segments, material);
            geom.initWhenCreate();
            return geom;
        };
        SphereGeometry.prototype.initWhenCreate = function () {
            this._data = this._computeData(this._radius, this._drawMode, this._segments);
            _super.prototype.initWhenCreate.call(this);
        };
        SphereGeometry.prototype.computeVerticesBuffer = function () {
            return this._data.vertices;
        };
        SphereGeometry.prototype.computeIndicesBuffer = function () {
            return this._data.indices;
        };
        SphereGeometry.prototype._computeData = function (radius, drawMode, segments) {
            var data = null;
            if (drawMode === dy.SphereDrawMode.LATITUDELONGTITUDE) {
                data = GetDataByLatitudeLongtitude.create(radius, segments).getData();
            }
            else if (drawMode === dy.SphereDrawMode.DECOMPOSITION) {
                data = GetDataByDecomposition.create(radius, segments).getData();
            }
            return data;
        };
        return SphereGeometry;
    })(dy.Geometry);
    dy.SphereGeometry = SphereGeometry;
    var GetDataByLatitudeLongtitude = (function () {
        function GetDataByLatitudeLongtitude(radius, bands) {
            this._vertices = [];
            this._indices = [];
            this._radius = null;
            this._latitudeBands = null;
            this._longitudeBands = null;
            this._radius = radius;
            this._latitudeBands = bands;
            this._longitudeBands = bands;
        }
        GetDataByLatitudeLongtitude.create = function (radius, bands) {
            var geom = new this(radius, bands);
            return geom;
        };
        Object.defineProperty(GetDataByLatitudeLongtitude.prototype, "vertices", {
            get: function () {
                return this._vertices;
            },
            set: function (vertices) {
                this._vertices = vertices;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GetDataByLatitudeLongtitude.prototype, "indices", {
            get: function () {
                return this._indices;
            },
            set: function (indices) {
                this._indices = indices;
            },
            enumerable: true,
            configurable: true
        });
        GetDataByLatitudeLongtitude.prototype.getData = function () {
            //维度
            for (var latNumber = 0; latNumber <= this._latitudeBands; latNumber++) {
                var theta = latNumber * Math.PI / this._latitudeBands;
                var sinTheta = Math.sin(theta);
                var cosTheta = Math.cos(theta);
                //经度
                for (var longNumber = 0; longNumber <= this._longitudeBands; longNumber++) {
                    var phi = longNumber * 2 * Math.PI / this._longitudeBands;
                    var sinPhi = Math.sin(phi);
                    var cosPhi = Math.cos(phi);
                    //var x = this._radius * cosPhi * sinTheta + pointX;
                    //var y = this._radius *cosTheta + pointY;
                    //var z = this._radius *sinPhi * sinTheta + pointZ;
                    var x = this._radius * cosPhi * sinTheta;
                    var y = this._radius * cosTheta;
                    var z = this._radius * sinPhi * sinTheta;
                    var u = 1 - (longNumber / this._longitudeBands);
                    var v = 1 - (latNumber / this._latitudeBands);
                    //normals.push(x);
                    //normals.push(y);
                    //normals.push(z);
                    //texCoords.push(u);
                    //texCoords.push(v);
                    this._vertices.push(x);
                    this._vertices.push(y);
                    this._vertices.push(z);
                }
            }
            //this._一圈有经度点longitudeBands个
            for (var latNumber = 0; latNumber < this._latitudeBands; latNumber++) {
                for (var longNumber = 0; longNumber < this._longitudeBands; longNumber++) {
                    var first = latNumber * (this._longitudeBands + 1) + longNumber;
                    var second = first + this._longitudeBands + 1;
                    this._indices.push(first);
                    this._indices.push(second);
                    this._indices.push(first + 1);
                    this._indices.push(second);
                    this._indices.push(second + 1);
                    this._indices.push(first + 1);
                }
            }
            return {
                vertices: dy.ArrayBuffer.create(new Float32Array(this._vertices), 3, dy.BufferType.FLOAT),
                indices: dy.ElementBuffer.create(new Uint16Array(this._indices), dy.BufferType.UNSIGNED_SHORT)
            };
        };
        return GetDataByLatitudeLongtitude;
    })();
    var GetDataByDecomposition = (function () {
        function GetDataByDecomposition(radius, count) {
            this._vertices = [];
            this._indices = [];
            this._vLen = null;
            this._radius = null;
            this._count = null;
            this._radius = radius;
            this._count = count;
        }
        GetDataByDecomposition.create = function (radius, count) {
            var geom = new this(radius, count);
            return geom;
        };
        Object.defineProperty(GetDataByDecomposition.prototype, "vertices", {
            get: function () {
                return this._vertices;
            },
            set: function (vertices) {
                this._vertices = vertices;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GetDataByDecomposition.prototype, "indices", {
            get: function () {
                return this._indices;
            },
            set: function (indices) {
                this._indices = indices;
            },
            enumerable: true,
            configurable: true
        });
        //todo add texCoords
        GetDataByDecomposition.prototype.getData = function () {
            var originVertices = [
                [this._radius, 0, 0],
                [-this._radius, 0, 0],
                [0, this._radius, 0],
                [0, -this._radius, 0],
                [0, 0, this._radius],
                [0, 0, -this._radius]
            ];
            var originIndices = [
                //[2,4,0],[2,0,5],[2,5,1],[2,1,4],   [3,0,4],[3,5,0],[3,1,5],[3,4,1]
                //[2,4,0]
                [2, 4, 0], [2, 0, 5], [2, 5, 1], [2, 1, 4],
                [3, 0, 4], [3, 5, 0], [3, 1, 5], [3, 4, 1]
            ];
            this._vLen = originVertices.length;
            var j = 0;
            var len = originVertices.length;
            for (j = 0; j < len; j++) {
                this._vertices = this._vertices.concat(originVertices[j]);
            }
            var j = 0, len = originIndices.length; //8面体
            for (j = 0; j < len; j++) {
                //for (i = 0; i < this._count; i++){
                //this._vertices = this._vertices.concat(originVertices[originIndices[j][0]],
                //    originVertices[originIndices[j][1]],
                //    originVertices[originIndices[j][2]]);
                this._subDivide(originVertices[originIndices[j][0]], originVertices[originIndices[j][1]], originVertices[originIndices[j][2]], originIndices[j], this._count, this._radius);
            }
            return {
                vertices: dy.ArrayBuffer.create(new Float32Array(this._vertices), 3, dy.BufferType.FLOAT),
                indices: dy.ElementBuffer.create(new Uint16Array(this._indices), dy.BufferType.UNSIGNED_SHORT)
            };
        };
        GetDataByDecomposition.prototype._subDivide = function (v1, v2, v3, ind, count, radius) {
            if (count <= 0) {
                this._indices = this._indices.concat(ind);
                return;
            }
            //
            var i = 0;
            var v12 = [], v23 = [], v31 = [];
            //求向量中心点
            for (i = 0; i < 3; i++) {
                v12[i] = (v1[i] + v2[i]) / 2; //求取等分的中点坐标
                v23[i] = (v2[i] + v3[i]) / 2;
                v31[i] = (v3[i] + v1[i]) / 2;
            }
            //模长扩展
            this._normalize(v12, radius);
            this._normalize(v23, radius);
            this._normalize(v31, radius);
            this._vertices = this._vertices.concat(v12, v23, v31);
            var iV1 = ind[0], iV2 = ind[1], iV3 = ind[2], iV12 = this._vLen, iV23 = this._vLen + 1, iV31 = this._vLen + 2;
            var in1 = [
                iV1, iV12, iV31
            ];
            var in2 = [
                iV31, iV12, iV23
            ];
            var in3 = [
                iV12, iV2, iV23
            ];
            var in4 = [
                iV31, iV23, iV3
            ];
            this._vLen = this._vLen + 3;
            //继续切分三角形
            this._subDivide(v1, v12, v31, in1, count - 1, radius); //对所产生的4个新的三角面再进行等分
            this._subDivide(v31, v12, v23, in2, count - 1, radius);
            this._subDivide(v12, v2, v23, in3, count - 1, radius);
            this._subDivide(v31, v23, v3, in4, count - 1, radius);
        };
        GetDataByDecomposition.prototype._normalize = function (v, radius) {
            var d = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
            if (d === 0) {
                return [0, 0, 0];
            }
            v[0] = radius * v[0] / d;
            v[1] = radius * v[1] / d;
            v[2] = radius * v[2] / d;
            return v;
        };
        return GetDataByDecomposition;
    })();
})(dy || (dy = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var TriangleGeometry = (function (_super) {
        __extends(TriangleGeometry, _super);
        function TriangleGeometry(width, height, material) {
            _super.call(this, material);
            this._width = null;
            this._height = null;
            this._width = width;
            this._height = height;
        }
        TriangleGeometry.create = function (width, height, material) {
            var geom = new this(width, height, material);
            geom.initWhenCreate();
            return geom;
        };
        TriangleGeometry.prototype.computeVerticesBuffer = function () {
            var width = this._width, height = this._height, left = -width / 2, right = width / 2, up = height / 2, down = -height / 2;
            return dy.ArrayBuffer.create(new Float32Array([
                0.0, up, 0,
                left, down, 0,
                right, down, 0
            ]), 3, dy.BufferType.FLOAT);
        };
        TriangleGeometry.prototype.computeIndicesBuffer = function () {
            return dy.ElementBuffer.create(new Uint8Array([
                0, 1, 2
            ]), dy.BufferType.UNSIGNED_BYTE);
        };
        return TriangleGeometry;
    })(dy.Geometry);
    dy.TriangleGeometry = TriangleGeometry;
})(dy || (dy = {}));

/// <reference path="../../definitions.d.ts"/>
var dy;
(function (dy) {
    var EventListenerMap = (function () {
        function EventListenerMap() {
            this._listenerMap = dyCb.Hash.create();
        }
        EventListenerMap.create = function () {
            var obj = new this();
            return obj;
        };
        EventListenerMap.prototype.appendChild = function (eventName, data) {
            this._listenerMap.appendChild(
            //String(data.target.uid) + "_" + eventName,
            this._buildKey(data.target, eventName), data);
        };
        EventListenerMap.prototype.getChild = function (args) {
            var self = this;
            //
            //return this._listenerMap.filter((list:dyCb.Collection, key:string) => {
            //    return key === self._buildKey(target, eventName);
            //});
            //
            if (arguments.length === 1 && dy.JudgeUtils.isString(arguments[0])) {
                var eventName = arguments[0];
                return this._listenerMap.getChild(eventName);
            }
            else if (arguments.length === 1) {
                var target = arguments[0];
                return this._listenerMap.filter(function (list, key) {
                    return self.isTarget(key, target, list);
                });
            }
            else if (arguments.length === 2) {
                var target = arguments[0], eventName = arguments[1];
                return this._listenerMap.getChild(this._buildKey(target, eventName));
            }
        };
        EventListenerMap.prototype.hasChild = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            if (arguments.length === 1 && dy.JudgeUtils.isFunction(arguments[0])) {
                return this._listenerMap.hasChild(arguments[0]);
            }
            else if (arguments.length === 2) {
                var target = arguments[0], eventName = arguments[1];
                return this._listenerMap.hasChild(this._buildKey(target, eventName));
            }
        };
        EventListenerMap.prototype.filter = function (func) {
            return this._listenerMap.filter(func);
        };
        EventListenerMap.prototype.forEach = function (func) {
            return this._listenerMap.forEach(func);
        };
        EventListenerMap.prototype.removeChild = function (args) {
            var self = this;
            if (arguments.length === 1 && dy.JudgeUtils.isString(arguments[0])) {
                var eventName = arguments[0];
                this._listenerMap.removeChild(eventName);
            }
            else if (arguments.length === 2 && dy.JudgeUtils.isFunction(arguments[1])) {
                var eventName = arguments[0], handler = arguments[1], list = null;
                list = this._listenerMap.getChild(eventName);
                list.removeChild(function (val) {
                    return val.handler === handler;
                });
                if (list.getCount() === 0) {
                    this._listenerMap.removeChild(eventName);
                }
            }
            else if (arguments.length === 2 && dy.JudgeUtils.isNumber(arguments[0])) {
                var uid = arguments[0], eventName = arguments[1];
                this._listenerMap.removeChild(this._buildKey(uid, eventName));
            }
            else if (arguments.length === 1) {
                var target = arguments[0];
                this._listenerMap.removeChild(function (list, key) {
                    return self.isTarget(key, target, list);
                });
            }
            else if (arguments.length === 2) {
                var target = arguments[0], eventName = arguments[1];
                this._listenerMap.removeChild(this._buildKey(target, eventName));
            }
            else if (arguments.length === 3) {
                var target = arguments[0], eventName = arguments[1], handler = arguments[2];
                this._listenerMap.map(function (list, key) {
                    list.removeChild(function (val) {
                        return val.handler === handler;
                    });
                    if (list.getCount() === 0) {
                        return dyCb.$REMOVE;
                    }
                    return [key, list];
                });
            }
        };
        EventListenerMap.prototype.getEventOffDataList = function (target, eventName) {
            var result = dyCb.Collection.create(), self = this;
            if (arguments.length === 1) {
                this.getChild(target)
                    .forEach(function (list, key) {
                    if (list && list.getCount() > 0) {
                        result.addChild({
                            eventName: self.getEventNameFromKey(key),
                            wrapHandler: list.getChild(0).wrapHandler
                        });
                    }
                });
                return result;
            }
            else if (arguments.length === 2) {
                var list = this.getChild(target, eventName);
                if (list && list.getCount() > 0) {
                    result.addChild({
                        eventName: eventName,
                        wrapHandler: list.getChild(0).wrapHandler
                    });
                }
                return result;
            }
        };
        EventListenerMap.prototype.getEventNameFromKey = function (key) {
            return key.indexOf("_") > -1 ? key.split("_")[1] : key;
        };
        EventListenerMap.prototype.getUidFromKey = function (key) {
            return key.indexOf("_") > -1 ? Number(key.split("_")[0]) : null;
        };
        EventListenerMap.prototype.isTarget = function (key, target, list) {
            return key.indexOf(String(target.uid)) > -1 && list !== undefined;
        };
        EventListenerMap.prototype._buildKey = function (args) {
            if (dy.JudgeUtils.isNumber(arguments[0])) {
                var uid = arguments[0], eventName = arguments[1];
                return this._buildKeyWithUid(uid, eventName);
            }
            else {
                var target = arguments[0], eventName = arguments[1];
                return target ? this._buildKeyWithUid(target.uid, eventName) : eventName;
            }
        };
        EventListenerMap.prototype._buildKeyWithUid = function (uid, eventName) {
            return String(uid) + "_" + eventName;
        };
        return EventListenerMap;
    })();
    dy.EventListenerMap = EventListenerMap;
})(dy || (dy = {}));

var dy;
(function (dy) {
    (function (EventType) {
        EventType[EventType["MOUSE"] = 0] = "MOUSE";
        EventType[EventType["KEYBOARD"] = 1] = "KEYBOARD";
        EventType[EventType["CUSTOM"] = 2] = "CUSTOM";
    })(dy.EventType || (dy.EventType = {}));
    var EventType = dy.EventType;
})(dy || (dy = {}));

var dy;
(function (dy) {
    (function (EventName) {
        EventName[EventName["CLICK"] = "click"] = "CLICK";
        EventName[EventName["MOUSEOVER"] = "mouseover"] = "MOUSEOVER";
        EventName[EventName["MOUSEUP"] = "mouseup"] = "MOUSEUP";
        EventName[EventName["MOUSEOUT"] = "mouseout"] = "MOUSEOUT";
        EventName[EventName["MOUSEMOVE"] = "mousemove"] = "MOUSEMOVE";
        EventName[EventName["MOUSEDOWN"] = "mousedown"] = "MOUSEDOWN";
        EventName[EventName["KEYDOWN"] = "keydown"] = "KEYDOWN";
        EventName[EventName["KEYUP"] = "keyup"] = "KEYUP";
        EventName[EventName["KEYPRESS"] = "keypress"] = "KEYPRESS";
    })(dy.EventName || (dy.EventName = {}));
    var EventName = dy.EventName;
})(dy || (dy = {}));

var dy;
(function (dy) {
    (function (EventPhase) {
        EventPhase[EventPhase["BROADCAST"] = 0] = "BROADCAST";
        EventPhase[EventPhase["EMIT"] = 1] = "EMIT";
    })(dy.EventPhase || (dy.EventPhase = {}));
    var EventPhase = dy.EventPhase;
})(dy || (dy = {}));

/// <reference path="../../definitions.d.ts"/>
//todo complete it(add more event type)
var dy;
(function (dy) {
    var _table = dyCb.Hash.create();
    //todo not declare "<any>"!
    _table.addChild(dy.EventName.CLICK, dy.EventType.MOUSE);
    _table.addChild(dy.EventName.MOUSEOVER, dy.EventType.MOUSE);
    _table.addChild(dy.EventName.MOUSEOUT, dy.EventType.MOUSE);
    _table.addChild(dy.EventName.MOUSEMOVE, dy.EventType.MOUSE);
    _table.addChild(dy.EventName.MOUSEDOWN, dy.EventType.MOUSE);
    _table.addChild(dy.EventName.MOUSEUP, dy.EventType.MOUSE);
    _table.addChild(dy.EventName.KEYDOWN, dy.EventType.KEYBOARD);
    _table.addChild(dy.EventName.KEYPRESS, dy.EventType.KEYBOARD);
    _table.addChild(dy.EventName.KEYUP, dy.EventType.KEYBOARD);
    var EventTable = (function () {
        function EventTable() {
        }
        //getEventType should put here,
        //it should not put in Event class, it's better to extract EventTable class to put in
        EventTable.getEventType = function (eventName) {
            var result = _table.getChild(eventName);
            if (result === void 0) {
                result = dy.EventType.CUSTOM;
            }
            return result;
        };
        return EventTable;
    })();
    dy.EventTable = EventTable;
})(dy || (dy = {}));

/// <reference path="../../definitions.d.ts"/>
//rich domain model
//event info:
//control info(stop bubble...)
//system data(system event, as clientX...)
//event context(target, currentTarget...)
//user data(custom event)
//event type
var dy;
(function (dy) {
    var Event = (function () {
        function Event(eventName) {
            //abstact attri
            this.type = null;
            //get type(){
            //    dyCb.Log.error(this._type === null, dyCb.Log.info.ABSTRACT_ATTRIBUTE);
            //
            //    return this._type;
            //}
            this._name = null;
            //target is the actual target that received the event.
            this._target = null;
            //currentTarget is always the object listening for the event
            this._currentTarget = null;
            this._isStopPropagation = false;
            this._phase = null;
            this._name = eventName;
        }
        Object.defineProperty(Event.prototype, "name", {
            get: function () {
                return this._name;
            },
            set: function (name) {
                this._name = name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Event.prototype, "target", {
            get: function () {
                //dyCb.Log.error(!this._target, dyCb.Log.info.FUNC_MUST_DEFINE("target"));
                return this._target;
                //return this._target;
                //return this._event.srcElement || this._event.target;
            },
            set: function (target) {
                this._target = target;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Event.prototype, "currentTarget", {
            get: function () {
                return this._currentTarget;
            },
            set: function (currentTarget) {
                this._currentTarget = currentTarget;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Event.prototype, "isStopPropagation", {
            get: function () {
                return this._isStopPropagation;
            },
            set: function (isStopPropagation) {
                this._isStopPropagation = isStopPropagation;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Event.prototype, "phase", {
            get: function () {
                return this._phase;
            },
            set: function (phase) {
                this._phase = phase;
            },
            enumerable: true,
            configurable: true
        });
        Event.prototype.copy = function () {
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        };
        Event.prototype.stopPropagation = function () {
            this._isStopPropagation = true;
        };
        Event.prototype.copyMember = function (destination, source, memberArr) {
            memberArr.forEach(function (member) {
                destination[member] = source[member];
            });
            return destination;
        };
        return Event;
    })();
    dy.Event = Event;
})(dy || (dy = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../definitions.d.ts"/>
var dy;
(function (dy) {
    var MouseEvent = (function (_super) {
        __extends(MouseEvent, _super);
        function MouseEvent(event, eventName) {
            _super.call(this, eventName);
            this.type = dy.EventType.MOUSE;
            this._event = null;
            this._location = null;
            this._locationInView = null;
            this._button = null;
            this._event = event;
        }
        //public static CLICK:string = "click";
        //public static MOUSEOVER:string = "mouseover";
        //public static MOUSEOUT:string = "mouseout";
        //public static MOUSEMOVE:string = "mousemove";
        //public static create(eventName:EventName) {
        //    var obj = new this(eventName);
        //
        //    return obj;
        //}
        MouseEvent.create = function (event, eventName) {
            var obj = new this(event, eventName);
            return obj;
        };
        Object.defineProperty(MouseEvent.prototype, "event", {
            get: function () {
                return this._event;
            },
            set: function (event) {
                this._event = event || window.event;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MouseEvent.prototype, "location", {
            //Get cursor location(related to document)
            get: function () {
                var point = null, e = this.event;
                if (this._location) {
                    return this._location;
                }
                point = dy.Point.create();
                if (bowser.msie) {
                    point.x = e.clientX + document.body.scrollLeft || document.documentElement.scrollLeft;
                    point.y = e.clientY + document.body.scrollTop || document.documentElement.scrollTop;
                }
                else {
                    point.x = e.pageX;
                    point.y = e.pageY;
                }
                return point;
            },
            set: function (point) {
                this._location = point;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MouseEvent.prototype, "locationInView", {
            //Returns the current cursor location in screen coordinates(related to canvas)
            get: function () {
                //return this._locationInView;
                var point = null, viewOffset = null;
                if (this._locationInView) {
                    return this._locationInView;
                }
                point = this.location;
                //canvasOffset = this._getCanvasOffset(this.event.currentTarget);
                viewOffset = dy.Director.getInstance().getView().offset;
                return dy.Point.create(point.x - viewOffset.x, point.y - viewOffset.y);
            },
            set: function (locationInView) {
                this._locationInView = locationInView;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MouseEvent.prototype, "button", {
            get: function () {
                var e = this.event, mouseButton = null;
                if (this._button) {
                    return this._button;
                }
                if (bowser.msie) {
                    switch (e.button) {
                        case 1:
                            mouseButton = dy.MouseButton.LEFT;
                            break;
                        case 4:
                            mouseButton = dy.MouseButton.RIGHT;
                            break;
                        case 2:
                            mouseButton = dy.MouseButton.CENTER;
                            break;
                        default:
                            dyCb.Log.error(true, dyCb.Log.info.FUNC_NOT_SUPPORT("multi mouse button"));
                            //mouseButton = e.button;
                            break;
                    }
                }
                else {
                    switch (e.button) {
                        case 0:
                            mouseButton = dy.MouseButton.LEFT;
                            break;
                        case 1:
                            mouseButton = dy.MouseButton.RIGHT;
                            break;
                        case 2:
                            mouseButton = dy.MouseButton.CENTER;
                            break;
                        default:
                            dyCb.Log.error(true, dyCb.Log.info.FUNC_NOT_SUPPORT("multi mouse button"));
                            //mouseButton = e.button;
                            break;
                    }
                }
                return mouseButton;
            },
            set: function (button) {
                this._button = button;
            },
            enumerable: true,
            configurable: true
        });
        MouseEvent.prototype.copy = function () {
            var eventObj = MouseEvent.create(this._event, this.name);
            return this.copyMember(eventObj, this, ["target", "currentTarget", "isStopPropagation", "phase"]);
        };
        return MouseEvent;
    })(dy.Event);
    dy.MouseEvent = MouseEvent;
})(dy || (dy = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../definitions.d.ts"/>
var dy;
(function (dy) {
    var SPECIAL_KEY_MAP = {
        8: "backspace",
        9: "tab",
        10: "return",
        13: "return",
        16: "shift",
        17: "ctrl",
        18: "alt",
        19: "pause",
        20: "capslock",
        27: "esc",
        32: "space",
        33: "pageup",
        34: "pagedown",
        35: "end",
        36: "home",
        37: "left",
        38: "up",
        39: "right",
        40: "down",
        45: "insert",
        46: "del",
        59: ";",
        61: "=",
        65: "a",
        66: "b",
        67: "c",
        68: "d",
        69: "e",
        70: "f",
        71: "g",
        72: "h",
        73: "i",
        74: "j",
        75: "k",
        76: "l",
        77: "m",
        78: "n",
        79: "o",
        80: "p",
        81: "q",
        82: "r",
        83: "s",
        84: "t",
        85: "u",
        86: "v",
        87: "w",
        88: "x",
        89: "y",
        90: "z",
        96: "0",
        97: "1",
        98: "2",
        99: "3",
        100: "4",
        101: "5",
        102: "6",
        103: "7",
        104: "8",
        105: "9",
        106: "*",
        107: "+",
        109: "-",
        110: ".",
        111: "/",
        112: "f1",
        113: "f2",
        114: "f3",
        115: "f4",
        116: "f5",
        117: "f6",
        118: "f7",
        119: "f8",
        120: "f9",
        121: "f10",
        122: "f11",
        123: "f12",
        144: "numlock",
        145: "scroll",
        173: "-",
        186: ";",
        187: "=",
        188: ",",
        189: "-",
        190: ".",
        191: "/",
        192: "`",
        219: "[",
        220: "\\",
        221: "]",
        222: "'"
    }, SHIFT_KEY_MAP = {
        "`": "~",
        "1": "!",
        "2": "@",
        "3": "#",
        "4": "$",
        "5": "%",
        "6": "^",
        "7": "&",
        "8": "*",
        "9": "(",
        "0": ")",
        "-": "_",
        "=": "+",
        ";": ": ",
        "'": "\"",
        ",": "<",
        ".": ">",
        "/": "?",
        "\\": "|"
    };
    var KeyboardEvent = (function (_super) {
        __extends(KeyboardEvent, _super);
        function KeyboardEvent(event, eventName) {
            _super.call(this, eventName);
            this.type = dy.EventType.KEYBOARD;
            this._event = null;
            this._event = event;
        }
        KeyboardEvent.create = function (event, eventName) {
            var obj = new this(event, eventName);
            return obj;
        };
        Object.defineProperty(KeyboardEvent.prototype, "event", {
            get: function () {
                return this._event;
            },
            set: function (event) {
                this._event = event || window.event;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KeyboardEvent.prototype, "ctrlKey", {
            get: function () {
                return this._event.ctrlKey;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KeyboardEvent.prototype, "altKey", {
            get: function () {
                return this._event.altKey;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KeyboardEvent.prototype, "shiftKey", {
            get: function () {
                return this._event.shiftKey;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KeyboardEvent.prototype, "metaKey", {
            get: function () {
                //return this._event.metaKey && !this.ctrlKey;
                return this._event.metaKey;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KeyboardEvent.prototype, "keyCode", {
            get: function () {
                return this._event.keyCode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KeyboardEvent.prototype, "key", {
            get: function () {
                var key = SPECIAL_KEY_MAP[this.keyCode], char = null;
                if (!key) {
                    char = String.fromCharCode(this.keyCode).toLowerCase();
                    if (this.shiftKey) {
                        return SHIFT_KEY_MAP[char];
                    }
                    return char;
                }
                return key;
            },
            enumerable: true,
            configurable: true
        });
        KeyboardEvent.prototype.copy = function () {
            var eventObj = KeyboardEvent.create(this._event, this.name);
            return this.copyMember(eventObj, this, ["altKey", "shiftKey", "ctrlKey", "metaKey", "keyCode", "key"]);
        };
        return KeyboardEvent;
    })(dy.Event);
    dy.KeyboardEvent = KeyboardEvent;
})(dy || (dy = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../definitions.d.ts"/>
var dy;
(function (dy) {
    var CustomEvent = (function (_super) {
        __extends(CustomEvent, _super);
        function CustomEvent() {
            _super.apply(this, arguments);
            this.type = dy.EventType.CUSTOM;
            this._userData = null;
        }
        CustomEvent.create = function (eventName) {
            var obj = new this(eventName);
            return obj;
        };
        Object.defineProperty(CustomEvent.prototype, "userData", {
            get: function () {
                return this._userData;
            },
            set: function (userData) {
                this._userData = userData;
            },
            enumerable: true,
            configurable: true
        });
        CustomEvent.prototype.copyPublicAttri = function (destination, source) {
            var property = null;
            //destination = {};
            dyCb.ExtendUtils.extend(destination, function (item, property) {
                return property.slice(0, 1) !== "_"
                    && !dy.JudgeUtils.isFunction(item);
            });
            return destination;
        };
        CustomEvent.prototype.copy = function () {
            var eventObj = CustomEvent.create(this.name);
            return this.copyMember(eventObj, this, ["target", "currentTarget", "isStopPropagation", "phase"]);
        };
        return CustomEvent;
    })(dy.Event);
    dy.CustomEvent = CustomEvent;
})(dy || (dy = {}));

var dy;
(function (dy) {
    (function (MouseButton) {
        MouseButton[MouseButton["LEFT"] = 0] = "LEFT";
        MouseButton[MouseButton["RIGHT"] = 1] = "RIGHT";
        MouseButton[MouseButton["CENTER"] = 2] = "CENTER";
    })(dy.MouseButton || (dy.MouseButton = {}));
    var MouseButton = dy.MouseButton;
})(dy || (dy = {}));

/// <reference path="../../definitions.d.ts"/>
var dy;
(function (dy) {
    var EventListener = (function () {
        function EventListener(option) {
            this._eventType = null;
            this._priority = null;
            this._handlerDataList = dyCb.Collection.create();
            this._eventType = option.eventType;
            this._priority = option.priority || 1;
        }
        EventListener.create = function (option) {
            var obj = new this(option);
            obj.initWhenCreate(option);
            return obj;
        };
        Object.defineProperty(EventListener.prototype, "eventType", {
            get: function () {
                return this._eventType;
            },
            set: function (eventType) {
                this._eventType = eventType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EventListener.prototype, "priority", {
            get: function () {
                return this._priority;
            },
            set: function (priority) {
                this._priority = priority;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EventListener.prototype, "handlerDataList", {
            get: function () {
                return this._handlerDataList;
            },
            set: function (handlerDataList) {
                this._handlerDataList = handlerDataList;
            },
            enumerable: true,
            configurable: true
        });
        EventListener.prototype.initWhenCreate = function (option) {
            this._setHandlerDataList(option);
        };
        EventListener.prototype._setHandlerDataList = function (option) {
            var i = null, REGEX_HANDER = /on\w+/;
            for (i in option) {
                if (option.hasOwnProperty(i)) {
                    if (REGEX_HANDER.test(i)) {
                        this._handlerDataList.addChild({
                            eventName: this._parseEventName(i),
                            handler: option[i]
                        });
                    }
                }
            }
        };
        EventListener.prototype._parseEventName = function (handlerName) {
            return handlerName.slice(2).toLowerCase();
        };
        return EventListener;
    })();
    dy.EventListener = EventListener;
})(dy || (dy = {}));

/// <reference path="../../definitions.d.ts"/>
var dy;
(function (dy) {
    var EventHandler = (function () {
        function EventHandler() {
        }
        EventHandler.prototype.on = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        };
        EventHandler.prototype.off = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        };
        EventHandler.prototype.trigger = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        };
        return EventHandler;
    })();
    dy.EventHandler = EventHandler;
})(dy || (dy = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../definitions.d.ts"/>
var dy;
(function (dy) {
    var DomEventHandler = (function (_super) {
        __extends(DomEventHandler, _super);
        function DomEventHandler() {
            _super.apply(this, arguments);
        }
        DomEventHandler.prototype.off = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var self = this, dom = this.getDom(), eventRegister = dy.EventRegister.getInstance(), eventOffDataList = null;
            eventOffDataList = eventRegister.remove.apply(eventRegister, Array.prototype.slice.call(arguments, 0));
            if (eventOffDataList) {
                eventOffDataList.forEach(function (eventOffData) {
                    self._unBind(dom, eventOffData.eventName, eventOffData.wrapHandler);
                });
            }
        };
        DomEventHandler.prototype.getDom = function () {
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        };
        DomEventHandler.prototype.buildWrapHandler = function (target, eventName) {
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        };
        DomEventHandler.prototype.handler = function (target, eventName, handler, priority) {
            var wrapHandler = null;
            if (!dy.EventRegister.getInstance().isBinded(target, eventName)) {
                wrapHandler = this._bind(this.getDom(), eventName, target);
            }
            else {
                wrapHandler = dy.EventRegister.getInstance().getWrapHandler(target, eventName);
            }
            dy.EventRegister.getInstance().register(target, eventName, handler, wrapHandler, priority);
        };
        DomEventHandler.prototype._bind = function (dom, eventName, target) {
            var wrapHandler = null;
            wrapHandler = this.buildWrapHandler(target, eventName);
            dyCb.EventUtils.addEvent(dom, eventName, wrapHandler);
            return wrapHandler;
        };
        DomEventHandler.prototype._unBind = function (dom, eventName, handler) {
            dyCb.EventUtils.removeEvent(dom, eventName, handler);
        };
        return DomEventHandler;
    })(dy.EventHandler);
    dy.DomEventHandler = DomEventHandler;
})(dy || (dy = {}));

/// <reference path="../../definitions.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
//responsiblity:handle logic with specify event category
//judge is under point
//wrap event object
var dy;
(function (dy) {
    var MouseEventHandler = (function (_super) {
        __extends(MouseEventHandler, _super);
        function MouseEventHandler() {
            _super.apply(this, arguments);
        }
        MouseEventHandler.getInstance = function () {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        };
        MouseEventHandler.prototype.on = function (target, eventName, handler, priority) {
            dyCb.Log.error(!(target instanceof dy.GameObject), dyCb.Log.info.FUNC_MUST_BE("target", "GameObject"));
            this.handler(target, eventName, handler, priority);
        };
        MouseEventHandler.prototype.trigger = function (target, event, notSetTarget) {
            var eventName = event.name, eventType = event.type, registerDataList = null, isStopPropagation = false, self = this;
            if (!(target instanceof dy.GameObject)) {
                dyCb.Log.log("target is not GameObject, can't trigger event");
                return;
            }
            if (!notSetTarget) {
                event.target = target;
            }
            registerDataList = dy.EventRegister.getInstance().getEventRegisterDataList(target, eventName);
            if (registerDataList === null || registerDataList.getCount() === 0) {
                return;
            }
            registerDataList.forEach(function (registerData) {
                var eventCopy = event.copy();
                registerData.handler(eventCopy);
                if (eventCopy.isStopPropagation) {
                    isStopPropagation = true;
                }
            });
            return isStopPropagation;
        };
        MouseEventHandler.prototype.getDom = function () {
            return dy.Director.getInstance().getView().dom;
        };
        MouseEventHandler.prototype.buildWrapHandler = function (target, eventName) {
            var self = this, context = window;
            return dyCb.EventUtils.bindEvent(context, function (event) {
                var eventObject = self._createEventObject(event, eventName, target), topTarget = dy.Director.getInstance().getTopUnderPoint(eventObject.locationInView);
                dy.EventManager.emit(topTarget, eventObject);
            });
        };
        MouseEventHandler.prototype._isTrigger = function (result) {
            return result && result.getCount() > 0;
        };
        MouseEventHandler.prototype._createEventObject = function (event, eventName, currentTarget) {
            var obj = dy.MouseEvent.create(event ? event : window.event, eventName);
            obj.currentTarget = currentTarget;
            return obj;
        };
        MouseEventHandler._instance = null;
        return MouseEventHandler;
    })(dy.DomEventHandler);
    dy.MouseEventHandler = MouseEventHandler;
})(dy || (dy = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../definitions.d.ts"/>
var dy;
(function (dy) {
    //todo bind on GameObject which has the focus
    var KeyboardEventHandler = (function (_super) {
        __extends(KeyboardEventHandler, _super);
        function KeyboardEventHandler() {
            _super.apply(this, arguments);
        }
        KeyboardEventHandler.getInstance = function () {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        };
        KeyboardEventHandler.prototype.on = function (eventName, handler, priority) {
            this.handler(null, eventName, handler, priority);
        };
        KeyboardEventHandler.prototype.trigger = function (event) {
            var eventName = event.name, eventType = event.type, registerDataList = null, self = this;
            registerDataList = dy.EventRegister.getInstance().getEventRegisterDataList(eventName);
            if (registerDataList === null || registerDataList.getCount() === 0) {
                return;
            }
            registerDataList.forEach(function (registerData) {
                var eventCopy = event.copy();
                registerData.handler(eventCopy);
            });
            return true;
        };
        KeyboardEventHandler.prototype.getDom = function () {
            return document;
        };
        KeyboardEventHandler.prototype.buildWrapHandler = function (target, eventName) {
            var self = this, context = window;
            return dyCb.EventUtils.bindEvent(context, function (event) {
                dy.EventManager.trigger(self._createEventObject(event, eventName));
            });
        };
        KeyboardEventHandler.prototype._isTrigger = function (result) {
            return result && result.getCount() > 0;
        };
        KeyboardEventHandler.prototype._createEventObject = function (event, eventName) {
            var obj = dy.KeyboardEvent.create(event ? event : window.event, eventName);
            return obj;
        };
        KeyboardEventHandler._instance = null;
        return KeyboardEventHandler;
    })(dy.DomEventHandler);
    dy.KeyboardEventHandler = KeyboardEventHandler;
})(dy || (dy = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../definitions.d.ts"/>
var dy;
(function (dy) {
    var CustomEventHandler = (function (_super) {
        __extends(CustomEventHandler, _super);
        function CustomEventHandler() {
            _super.apply(this, arguments);
        }
        CustomEventHandler.getInstance = function () {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        };
        CustomEventHandler.prototype.on = function (args) {
            if (arguments.length === 3) {
                var eventName = arguments[0], handler = arguments[1], priority = arguments[2];
                dy.EventRegister.getInstance().register(null, eventName, handler, null, priority);
            }
            else if (arguments.length === 4) {
                var target = arguments[0], eventName = arguments[1], handler = arguments[2], priority = arguments[3];
                dy.EventRegister.getInstance().register(target, eventName, handler, null, priority);
            }
        };
        CustomEventHandler.prototype.off = function (args) {
            var eventRegister = dy.EventRegister.getInstance();
            eventRegister.remove.apply(eventRegister, Array.prototype.slice.call(arguments, 0));
        };
        CustomEventHandler.prototype.trigger = function (args) {
            var event = null;
            if (arguments.length === 1 || arguments.length === 2) {
                var userData = null;
                if (arguments.length === 1) {
                    event = arguments[0];
                }
                else {
                    event = arguments[0];
                    userData = arguments[1];
                }
                return this._triggerEventHandler(event, userData);
            }
            else if (arguments.length === 3 || arguments.length === 4) {
                var target = null, userData = null, notSetTarget = null;
                if (arguments.length === 3) {
                    target = arguments[0];
                    event = arguments[1];
                    notSetTarget = arguments[2];
                }
                else {
                    target = arguments[0];
                    event = arguments[1];
                    userData = arguments[2];
                    notSetTarget = arguments[3];
                }
                return this._triggerTargetAndEventHandler(target, event, userData, notSetTarget);
            }
        };
        CustomEventHandler.prototype._triggerEventHandler = function (event, userData) {
            var listenerDataList = null, isStopPropagation = false, self = this;
            listenerDataList = dy.EventRegister.getInstance().getEventRegisterDataList(event.name);
            if (listenerDataList === null || listenerDataList.getCount() === 0) {
                return false;
            }
            listenerDataList.forEach(function (listenerData) {
                var eventCopy = event.copy();
                eventCopy.currentTarget = listenerData.target;
                eventCopy.target = listenerData.target;
                self._setUserData(eventCopy, userData);
                listenerData.handler(eventCopy);
                //if(eventCopy.isStopPropagation){
                //    isStopPropagation = true;
                //}
            });
            //return isStopPropagation;
            return true;
        };
        CustomEventHandler.prototype._triggerTargetAndEventHandler = function (target, event, userData, notSetTarget) {
            var listenerDataList = null, isStopPropagation = false, self = this;
            if (!notSetTarget) {
                event.target = target;
            }
            listenerDataList = dy.EventRegister.getInstance().getEventRegisterDataList(target, event.name);
            if (listenerDataList === null || listenerDataList.getCount() === 0) {
                return false;
            }
            listenerDataList.forEach(function (listenerData) {
                var eventCopy = event.copy();
                eventCopy.currentTarget = listenerData.target;
                self._setUserData(eventCopy, userData);
                listenerData.handler(eventCopy);
                if (eventCopy.isStopPropagation) {
                    isStopPropagation = true;
                }
            });
            return isStopPropagation;
        };
        CustomEventHandler.prototype._setUserData = function (event, userData) {
            if (userData) {
                event.userData = userData;
            }
        };
        CustomEventHandler._instance = null;
        return CustomEventHandler;
    })(dy.EventHandler);
    dy.CustomEventHandler = CustomEventHandler;
})(dy || (dy = {}));

/// <reference path="../../definitions.d.ts"/>
var dy;
(function (dy) {
    var EventDispatcher = (function () {
        //private _eventBinder: EventBinder = null;
        //private _eventRegister:EventRegister = null;
        function EventDispatcher() {
            //this._eventBinder = binder;
            //EventRegister.getInstance() = register;
        }
        EventDispatcher.create = function () {
            var obj = new this();
            return obj;
        };
        EventDispatcher.prototype.trigger = function (args) {
            if (arguments.length === 1) {
                var event_1 = arguments[0], eventType = event_1.type;
                //dyCb.Log.error(eventType !== EventType.CUSTOM, dyCb.Log.info.FUNC_MUST_BE("event type", "CUSTOM"));
                return dy.FactoryEventHandler.createEventHandler(eventType)
                    .trigger(event_1);
            }
            else if (arguments.length === 2 && !(arguments[1] instanceof dy.Event)) {
                var event_2 = arguments[0], userData = arguments[1], eventType = event_2.type;
                dyCb.Log.error(eventType !== dy.EventType.CUSTOM, dyCb.Log.info.FUNC_MUST_BE("event type", "CUSTOM"));
                return dy.FactoryEventHandler.createEventHandler(eventType)
                    .trigger(event_2, userData);
            }
            else if (arguments.length === 2 || (arguments.length === 3 && dy.JudgeUtils.isBoolean(arguments[2]))) {
                var target = arguments[0], event_3 = arguments[1], notSetTarget = arguments[2] === void 0 ? false : arguments[2], eventType = event_3.type;
                return dy.FactoryEventHandler.createEventHandler(eventType)
                    .trigger(target, event_3, notSetTarget);
            }
            else if (arguments.length === 3 || arguments.length === 4) {
                var target = arguments[0], event_4 = arguments[1], userData = arguments[2], notSetTarget = arguments[3] === void 0 ? false : arguments[3], eventType = event_4.type;
                dyCb.Log.error(eventType !== dy.EventType.CUSTOM, dyCb.Log.info.FUNC_MUST_BE("event type", "CUSTOM"));
                return dy.FactoryEventHandler.createEventHandler(eventType)
                    .trigger(target, event_4, userData, notSetTarget);
            }
        };
        /**
         * transfer event up
         * @param target
         * @param eventObject
         */
        EventDispatcher.prototype.emit = function (target, eventObject, userData) {
            var isStopPropagation = false;
            eventObject.phase = dy.EventPhase.EMIT;
            eventObject.target = target;
            do {
                isStopPropagation = this._triggerWithUserData(target, eventObject.copy(), userData, true);
                if (isStopPropagation) {
                    break;
                }
                target = this._getParent(target);
            } while (target);
        };
        /**
         * transfer event down
         * @param target
         * @param eventObject
         */
        EventDispatcher.prototype.broadcast = function (target, eventObject, userData) {
            var self = this;
            eventObject.phase = dy.EventPhase.BROADCAST;
            eventObject.target = target;
            this._triggerWithUserData(target, eventObject.copy(), userData, true);
            function iterator(obj) {
                var children = obj.getChilren();
                if (children.getCount() === 0) {
                    return;
                }
                children.forEach(function (child) {
                    self._triggerWithUserData(child, eventObject.copy(), userData, true);
                    iterator(child);
                });
            }
            iterator(target);
        };
        EventDispatcher.prototype._getParent = function (target) {
            var parent = target.bubbleParent;
            return parent ? parent : target.parent;
        };
        EventDispatcher.prototype._triggerWithUserData = function (target, event, userData, notSetTarget) {
            return userData ? this.trigger(target, event.copy(), userData, notSetTarget)
                : this.trigger(target, event, notSetTarget);
        };
        return EventDispatcher;
    })();
    dy.EventDispatcher = EventDispatcher;
})(dy || (dy = {}));

/// <reference path="../../definitions.d.ts"/>
var dy;
(function (dy) {
    var EventRegister = (function () {
        function EventRegister() {
            this._listenerMap = dy.EventListenerMap.create();
        }
        EventRegister.getInstance = function () {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        };
        EventRegister.prototype.register = function (target, eventName, handler, wrapHandler, priority) {
            //var isBindEventOnView = false,
            var data = {
                target: target,
                handler: handler,
                wrapHandler: wrapHandler,
                priority: priority
            };
            //eventName = <string>eventName;
            ////priority set in listener, not in this(binder)!
            //if(priority){
            //    listener.setPriority(priority);
            //}
            //if (this.isBindEventOnView(eventName)){
            //    isBindEventOnView = true;
            //    //this._listenerMap.appendChild(this._buildKey(target.uid, eventName), handler);
            //}
            //else {
            //    isBindEventOnView = false;
            //    //this._listenerMap.addChild(eventName, data);
            //}
            this._listenerMap.appendChild(eventName, data);
            //this._listenerList.addChild(listener.eventType,  {
            //    target:target,
            //    listener:listener
            //});
            //return isBindEventOnView;
        };
        EventRegister.prototype.remove = function (args) {
            var target = arguments[0];
            if (arguments.length === 1 && dy.JudgeUtils.isString(arguments[0])) {
                var eventName = arguments[0];
                this._listenerMap.removeChild(eventName);
                return null;
            }
            else if (arguments.length === 2 && dy.JudgeUtils.isFunction(arguments[1])) {
                var eventName = arguments[0], handler = arguments[1];
                this._listenerMap.removeChild(eventName, handler);
                return null;
            }
            else if (arguments.length === 2 && dy.JudgeUtils.isNumber(arguments[0])) {
                var uid = arguments[0], eventName = arguments[1];
                this._listenerMap.removeChild(uid, eventName);
                return null;
            }
            else if (arguments.length === 1) {
                var dataList = null;
                dataList = this._listenerMap.getEventOffDataList(target);
                this._listenerMap.removeChild(target);
                this._handleAfterAllEventHandlerRemoved(target);
                return dataList;
            }
            else if (arguments.length === 2 || arguments.length === 3) {
                var eventName = arguments[1];
                this._listenerMap.removeChild.apply(this._listenerMap, Array.prototype.slice.call(arguments, 0));
                if (this._isAllEventHandlerRemoved(target)) {
                    this._handleAfterAllEventHandlerRemoved(target);
                    return this._listenerMap.getEventOffDataList(target, eventName);
                }
                return null;
            }
        };
        EventRegister.prototype.getEventRegisterDataList = function (args) {
            var result = this._listenerMap.getChild.apply(this._listenerMap, Array.prototype.slice.call(arguments, 0)), self = this;
            if (!result) {
                return null;
            }
            return result.sort(function (dataA, dataB) {
                return dataB.priority - dataA.priority;
            });
        };
        EventRegister.prototype.setBubbleParent = function (target, parent) {
            target.bubbleParent = parent;
        };
        EventRegister.prototype.isBinded = function (target, eventName) {
            return this._listenerMap.hasChild(target, eventName);
        };
        EventRegister.prototype.filter = function (func) {
            return this._listenerMap.filter(func);
        };
        EventRegister.prototype.forEach = function (func) {
            return this._listenerMap.forEach(func);
        };
        EventRegister.prototype.getChild = function (target, eventName) {
            return this._listenerMap.getChild.apply(this._listenerMap, Array.prototype.slice.call(arguments, 0));
        };
        EventRegister.prototype.getEventNameFromKey = function (key) {
            return this._listenerMap.getEventNameFromKey(key);
        };
        EventRegister.prototype.getUidFromKey = function (key) {
            return this._listenerMap.getUidFromKey(key);
        };
        EventRegister.prototype.getWrapHandler = function (target, eventName) {
            var list = this.getChild(target, eventName);
            if (list && list.getCount() > 0) {
                return list.getChild(0).wrapHandler;
            }
        };
        EventRegister.prototype.isTarget = function (key, target, list) {
            return this._listenerMap.isTarget(key, target, list);
        };
        //public copy(){
        //
        //}
        //private _isContain(parentTarget:GameObject, childTarget:GameObject){
        //    var parent = null;
        //
        //    parent = childTarget.parent;
        //
        //    while(parent){
        //        if(JudgeUtils.isEqual(parent, parentTarget)){
        //            return true;
        //        }
        //
        //        parent = childTarget.parent;
        //    }
        //
        //    return false;
        //}
        //private _removeFromMap(target:GameObject, eventName:EventName) {
        //}
        EventRegister.prototype._isAllEventHandlerRemoved = function (target) {
            return !this._listenerMap.hasChild(function (list, key) {
                return key.indexOf(String(target.uid)) > -1 && list !== undefined;
            });
        };
        EventRegister.prototype._handleAfterAllEventHandlerRemoved = function (target) {
            this.setBubbleParent(target, null);
        };
        EventRegister._instance = null;
        return EventRegister;
    })();
    dy.EventRegister = EventRegister;
})(dy || (dy = {}));

/// <reference path="../../definitions.d.ts"/>
var dy;
(function (dy) {
    //responsibilty:on, off event(manage list)
    var EventBinder = (function () {
        //private _listenerList:EventListener = EventListener.create();
        //private _eventRegister:EventRegister = null;
        function EventBinder() {
            //EventRegister.getInstance() = eventRegister;
        }
        EventBinder.create = function () {
            var obj = new this();
            return obj;
        };
        EventBinder.prototype.on = function (args) {
            if (arguments.length === 1) {
                var listener = !(arguments[0] instanceof dy.EventListener) ? dy.EventListener.create(arguments[0]) : arguments[0];
                listener.handlerDataList.forEach(function (handlerData) {
                    dy.FactoryEventHandler.createEventHandler(listener.eventType)
                        .on(handlerData.eventName, handlerData.handler, listener.priority);
                });
            }
            else if (arguments.length === 2) {
                var target = arguments[0], listener = !(arguments[1] instanceof dy.EventListener) ? dy.EventListener.create(arguments[1]) : arguments[1];
                listener.handlerDataList.forEach(function (handlerData) {
                    dy.FactoryEventHandler.createEventHandler(listener.eventType)
                        .on(target, handlerData.eventName, handlerData.handler, listener.priority);
                });
            }
            else if (arguments.length === 3) {
                var eventName = arguments[0], handler = arguments[1], priority = arguments[2];
                dy.FactoryEventHandler.createEventHandler(dy.EventTable.getEventType(eventName))
                    .on(eventName, handler, priority);
            }
            else if (arguments.length === 4) {
                var target = arguments[0], eventName = arguments[1], handler = arguments[2], priority = arguments[3];
                dy.FactoryEventHandler.createEventHandler(dy.EventTable.getEventType(eventName))
                    .on(target, eventName, handler, priority);
            }
        };
        EventBinder.prototype.off = function () {
            var eventRegister = dy.EventRegister.getInstance(), eventOffDataList = null, argArr = Array.prototype.slice.call(arguments, 0);
            if (arguments.length === 0) {
                eventRegister.forEach(function (list, key) {
                    var eventName = eventRegister.getEventNameFromKey(key), targetUid = eventRegister.getUidFromKey(key);
                    if (!targetUid) {
                        dy.FactoryEventHandler.createEventHandler(dy.EventTable.getEventType(eventName))
                            .off(eventName);
                        return;
                    }
                    dy.FactoryEventHandler.createEventHandler(dy.EventTable.getEventType(eventName))
                        .off(targetUid, eventName);
                });
            }
            else if (arguments.length === 1 && dy.JudgeUtils.isString(arguments[0])) {
                var eventName = arguments[0];
                dy.FactoryEventHandler.createEventHandler(dy.EventTable.getEventType(eventName))
                    .off(eventName);
            }
            else if (arguments.length === 2 && dy.JudgeUtils.isFunction(arguments[1])) {
                var eventName = arguments[0], handler = arguments[1];
                dy.FactoryEventHandler.createEventHandler(dy.EventTable.getEventType(eventName))
                    .off(eventName, handler);
            }
            else if (arguments.length === 1) {
                var target = arguments[0];
                eventRegister.forEach(function (list, key) {
                    var eventName = eventRegister.getEventNameFromKey(key);
                    if (eventRegister.isTarget(key, target, list)) {
                        dy.FactoryEventHandler.createEventHandler(dy.EventTable.getEventType(eventName))
                            .off(target, eventName);
                    }
                });
            }
            else if (arguments.length === 2) {
                var target = arguments[0], eventName = arguments[1];
                dy.FactoryEventHandler.createEventHandler(dy.EventTable.getEventType(eventName))
                    .off(target, eventName);
            }
            else if (arguments.length === 3) {
                var target = arguments[0], eventName = arguments[1], handler = arguments[2];
                dy.FactoryEventHandler.createEventHandler(dy.EventTable.getEventType(eventName))
                    .off(target, eventName, handler);
            }
        };
        return EventBinder;
    })();
    dy.EventBinder = EventBinder;
})(dy || (dy = {}));

/// <reference path="../../definitions.d.ts"/>
var dy;
(function (dy) {
    var FactoryEventHandler = (function () {
        function FactoryEventHandler() {
        }
        FactoryEventHandler.createEventHandler = function (eventType) {
            var handler = null;
            switch (eventType) {
                case dy.EventType.MOUSE:
                    handler = dy.MouseEventHandler.getInstance();
                    break;
                case dy.EventType.KEYBOARD:
                    handler = dy.KeyboardEventHandler.getInstance();
                    break;
                case dy.EventType.CUSTOM:
                    handler = dy.CustomEventHandler.getInstance();
                    break;
                //todo more type
                default:
                    dyCb.Log.error(true, dyCb.Log.info.FUNC_INVALID("eventType"));
                    break;
            }
            return handler;
        };
        return FactoryEventHandler;
    })();
    dy.FactoryEventHandler = FactoryEventHandler;
})(dy || (dy = {}));

/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    //    /*!
    //     it is designed as singleton, not static class, because it need maintain state(_instance attri).
    //
    //
    //     1>什么时候使用静态类代替singleton :
    //     这里有几个很好的静态类比singleton更好的应用场景. 最基本的例子就是在Java中的java.lang.Math类的实现方式, Math类就是用过静态方法来实现的,而不是单例来实现的.
    //     总结 :
    //     如果你的singleton不提维持任何状态, 仅仅是提供全局的访问 , 这个时候就适合用静态类 , 这样速度也更快, 因为static bind在编译期间(compile during) . 记住不经意维持子类的状态 , 尤其是在并发的情况下, 多个线程并发修改,这容易导致不容易发现的race condition 关于race condition .
    //
    //     静态类适用于一些工具类 , 其他的如单个访问资源就可以用singleton.
    //     2>静态类和singleton之间的区别 :
    //     ① static类有更好的访问效率(Static class provides better performance than Singleton pattern, because static methods are bonded on compile time)
    //     ③ singleton比static class更容易测试. 那个容易模拟(mock), 哪个就容易测试. singleton很容易用JUnit测试, 因为你能够传递mock对象, 当singleton需要的时候(作为方法参数或者构造函数参数),
    //     ④ 如果你的需求是维护(maintain)状态, 那么singleton比static class更好 , 如果使用static class会出现一些问题.
    //     ⑤ singleton支持延迟加载 , 而static class 则不支持这样的特性 , 在重量级的对象, 延迟加载就显得非常重要.
    //     ⑥ 在一些依赖注入(Dependency injection framework)的框架 , 它能够很好的管理singleton对象 . 例如Spring.
    //
    //     3>singleton相对于静态类的一些高级特点 :
    //     singleton 对于static class 主要的优点是更加面向对象 . 对于singleton你可以使用继承(Inheritance)和多态(polymorphism)来继承一个基类, 实现一个接口, 提供不同功能 的实现. 例如 , Java中java.lang.Runtime ,该类就是一个singleton的, 调用getRuntime(),基于不同的JVM ,返回不同的实现对象, 针对一个一个JVM,确保只有一个Runtime对象 , 如果使用static class就不能很好的来实现这样的功能了 .
    //     欢迎转载 转载请注明出处 : http://blog.csdn.net/johnny901114/article/details/11969015
    //     */
    //
    ////singleton class
    //static class
    var EventManager = (function () {
        function EventManager() {
        }
        EventManager.on = function (args) {
            if (arguments.length === 1) {
                var listener = arguments[0];
                this._eventBinder.on(listener);
            }
            else if (arguments.length === 2 && dy.JudgeUtils.isString(arguments[0]) && dy.JudgeUtils.isFunction(arguments[1])) {
                var eventName = arguments[0], handler = arguments[1], priority = 1;
                this._eventBinder.on(eventName, handler, priority);
            }
            else if (arguments.length === 2) {
                var target = arguments[0], listener = arguments[1];
                this._eventBinder.on(target, listener);
            }
            else if (arguments.length === 3 && dy.JudgeUtils.isString(arguments[0]) && dy.JudgeUtils.isFunction(arguments[1]) && dy.JudgeUtils.isNumber(arguments[2])) {
                var eventName = arguments[0], handler = arguments[1], priority = arguments[2];
                this._eventBinder.on(eventName, handler, priority);
            }
            else if (arguments.length === 3 || arguments.length === 4) {
                var target = arguments[0], eventName = arguments[1], handler = arguments[2], priority = arguments[3] === undefined ? 1 : arguments[3];
                this._eventBinder.on(target, eventName, handler, priority);
            }
        };
        EventManager.off = function () {
            this._eventBinder.off.apply(this._eventBinder, Array.prototype.slice.call(arguments, 0));
        };
        EventManager.trigger = function (args) {
            this._eventDispatcher.trigger.apply(this._eventDispatcher, Array.prototype.slice.call(arguments, 0));
        };
        EventManager.broadcast = function (target, event, userData) {
            this._eventDispatcher.broadcast.apply(this._eventDispatcher, Array.prototype.slice.call(arguments, 0));
        };
        EventManager.emit = function (target, event, userData) {
            this._eventDispatcher.emit.apply(this._eventDispatcher, Array.prototype.slice.call(arguments, 0));
        };
        EventManager.fromEvent = function (args) {
            var addHandler = null, removeHandler = null;
            if (arguments.length === 1) {
                var eventName = arguments[0];
                addHandler = function (handler) {
                    EventManager.on(eventName, handler);
                };
                removeHandler = function (handler) {
                    EventManager.off(eventName, handler);
                };
            }
            else if (arguments.length === 2 && dy.JudgeUtils.isNumber(arguments[1])) {
                var eventName = arguments[0], priority = arguments[1];
                addHandler = function (handler) {
                    EventManager.on(eventName, handler, priority);
                };
                removeHandler = function (handler) {
                    EventManager.off(eventName, handler);
                };
            }
            else if (arguments.length === 2) {
                var target = arguments[0], eventName = arguments[1];
                addHandler = function (handler) {
                    EventManager.on(target, eventName, handler);
                };
                removeHandler = function (handler) {
                    EventManager.off(target, eventName, handler);
                };
            }
            else if (arguments.length === 3) {
                var target = arguments[0], eventName = arguments[1], priority = arguments[2];
                addHandler = function (handler) {
                    EventManager.on(target, eventName, handler, priority);
                };
                removeHandler = function (handler) {
                    EventManager.off(target, eventName, handler);
                };
            }
            return dyRt.fromEventPattern(addHandler, removeHandler);
        };
        EventManager.setBubbleParent = function (target, parent) {
            dy.EventRegister.getInstance().setBubbleParent(target, parent);
            //this._eventDispatcher.setBubbleParent(target, parent);
        };
        //private static static _instance:EventManager = null;
        //
        //public static static getInstance() {
        //    if (this._instance === null) {
        //        this._instance = new this();
        //        //this._instance.initWhenCreate();
        //    }
        //    return this._instance;
        //}
        EventManager._eventBinder = dy.EventBinder.create();
        EventManager._eventDispatcher = dy.EventDispatcher.create();
        return EventManager;
    })();
    dy.EventManager = EventManager;
})(dy || (dy = {}));

/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var GameObject = (function () {
        function GameObject() {
            this._uid = null;
            //todo add mesh,scene position 研究threejs->dynamic，看如何表示position
            this._position = null;
            this._parent = null;
            this._bubbleParent = null;
            this._children = dyCb.Collection.create();
            this._uid = GameObject._count;
            GameObject._count += 1;
        }
        Object.defineProperty(GameObject.prototype, "uid", {
            get: function () {
                return this._uid;
            },
            set: function (uid) {
                this._uid = uid;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "position", {
            get: function () {
                return this._position;
            },
            set: function (position) {
                this._position = position;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "parent", {
            get: function () {
                return this._parent;
            },
            set: function (parent) {
                this._parent = parent;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "bubbleParent", {
            get: function () {
                return this._bubbleParent;
            },
            set: function (bubbleParent) {
                this._bubbleParent = bubbleParent;
            },
            enumerable: true,
            configurable: true
        });
        GameObject.prototype.init = function () {
            dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        };
        /*!
         virtual
         */
        GameObject.prototype.dispose = function () {
            this.parent = null;
            dy.EventManager.off(this);
        };
        /*!
         hook method
         */
        GameObject.prototype.onEnter = function () {
        };
        GameObject.prototype.onStartLoop = function () {
        };
        GameObject.prototype.onEndLoop = function () {
        };
        GameObject.prototype.onExit = function () {
        };
        GameObject.prototype.hasChild = function (child) {
            return this._children.hasChild(child);
        };
        //public addChild(child:GameObject, sort:boolean=true):boolean {
        GameObject.prototype.addChild = function (child) {
            //need user judge it!
            //if(this._children.hasChild(child)) {
            //    return false;
            //}
            if (child.parent) {
                //will remove bind event,remove from parent ...
                child.removeMe();
            }
            child.parent = this;
            //child.dispatchEvent(new CoreEvent('beforeadd', false, {
            //    parent: this
            //}));
            this._children.addChild(child);
            //if(sort) {
            /*!
            sort when add child/children, not when get children.
            because each loop will get children(to render), so if using the latter, each loop should sort!
             */
            this.sort();
            //}
            //child._parent = this;
            //child.setBubbleParent(this);
            //child._transform.dirty = true;
            //child.dispatchEvent(new CoreEvent('add', false));
            //this.dispatchEvent(new CoreEvent('childadd', false, {
            //    child: child
            //}));
            child.init();
            child.onEnter();
            return this;
        };
        GameObject.prototype.getChilren = function () {
            return this._children;
        };
        GameObject.prototype.sort = function () {
            this._children.sort(this._ascendZ);
            return this;
        };
        GameObject.prototype.forEach = function (func) {
            this._children.forEach(func);
            return this;
        };
        GameObject.prototype.removeChild = function (child) {
            child.onExit();
            this._children.removeChild(child);
            //var idx = this._children.indexOf(child);
            //if(idx !== -1) {
            //    child.dispatchEvent(new CoreEvent('beforeremove', false));
            //    this._children.splice(idx, 1);
            child.dispose();
            //child.setBubbleParent(null);
            //    child.dispatchEvent(new CoreEvent('remove', false, {
            //        parent: this
            //    }));
            //    this.dispatchEvent(new CoreEvent('childremove', false, {
            //        child: child
            //    }));
            //    return true;
            //}
            //return false;
            return this;
        };
        /**
         * remove this game object from parent.
         * @returns {boolean}
         */
        GameObject.prototype.removeMe = function () {
            var parent = this._parent;
            parent && parent.removeChild(this);
            return this;
        };
        GameObject.prototype.getTopUnderPoint = function (point) {
            //var found, localP, child;
            //var childrenArr;
            //if(!this._active || !this._visible) return null;
            //if(this._interactiveRect) {
            //    localP = this.transform.globalToLocal(x, y);
            //    if(!this._interactiveRect.containsXY(localP.x, localP.y)) {
            //        return null;
            //    }
            //}
            //childrenArr = this._children;
            //if(childrenArr.length > 0) {
            //    for(var i=childrenArr.length-1; i>=0; i--) {
            //        child = childrenArr[i];
            //        found = child.getUnderPoint(x, y, touchable);
            //        if(found) {
            //            return found;
            //        }
            //    }
            //}
            //
            //if(!touchable || this._touchable) {
            //    if(!localP) {
            //        localP = this.transform.globalToLocal(x, y);
            //    }
            //    if(this.testHit(localP.x, localP.y)) {
            //        return this;
            //    }
            //}
            //return null;
            var result = null, i = null, children = null, len = this._children.getCount();
            children = this._children;
            if (len > 0) {
                for (i = len - 1; i >= 0; i--) {
                    var child = children.getChild(i);
                    result = child.getTopUnderPoint(point);
                    if (result) {
                        return result;
                    }
                }
            }
            if (this.isHit(point)) {
                return this;
            }
            return null;
        };
        GameObject.prototype.isHit = function (locationInView) {
            //todo extract collider?
            //var collider:Collider = this._collider;
            //return collider && collider.collideXY(localX, localY);
            //var RANGE = 10;
            //
            //return Math.abs(this._position.x - locationInView.x) < RANGE
            //&& Math.abs(this._position.y - locationInView.y) < RANGE;
            //todo complete this after adding position
            if (locationInView) {
                return true;
            }
            else {
                return false;
            }
        };
        GameObject.prototype._ascendZ = function (a, b) {
            return function (a, b) {
                return a.position.z - b.position.z;
            };
        };
        GameObject._count = 1;
        return GameObject;
    })();
    dy.GameObject = GameObject;
})(dy || (dy = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var Mesh = (function (_super) {
        __extends(Mesh, _super);
        function Mesh(gemo) {
            _super.call(this);
            this._matrix = dy.Matrix.create();
            this._gemo = null;
            this._actionManager = dy.ActionManager.create();
            this._gemo = gemo;
        }
        //todo push,pop matrix, so need change pos, rotate angle, scale instead of changing matrix!
        //when need push,pop matrix?
        //todo use component architecture, delete Mesh, make Geometry,Material to be component
        //todo be Material(add baseClass Material)
        Mesh.create = function (gemo) {
            var obj = new this(gemo);
            return obj;
        };
        Object.defineProperty(Mesh.prototype, "matrix", {
            get: function () {
                return this._matrix;
            },
            set: function (matrix) {
                this._matrix = matrix;
            },
            enumerable: true,
            configurable: true
        });
        Mesh.prototype.runAction = function (action) {
            this._actionManager.addChild(action);
        };
        Mesh.prototype.update = function () {
            this._actionManager.update();
        };
        Mesh.prototype.draw = function () {
            this._addDrawCommand();
        };
        Mesh.prototype.init = function () {
            this.position = dy.Position.create(0, 0, 0);
        };
        Mesh.prototype._addDrawCommand = function () {
            var renderer = dy.Director.getInstance().renderer, quadCmd = renderer.createQuadCommand();
            quadCmd.buffers = {
                vertexBuffer: this._gemo.vertices,
                //texCoords: this._gemo.texCoords,
                //normals: this._gemo.normals,
                indexBuffer: this._gemo.indices,
                colorBuffer: this._gemo.colors
            };
            //quadCmd.bufferData = ;
            //quadCmd.color = this._material.color;
            renderer.addCommand(quadCmd);
        };
        return Mesh;
    })(dy.GameObject);
    dy.Mesh = Mesh;
})(dy || (dy = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var Scene = (function (_super) {
        __extends(Scene, _super);
        function Scene(camera) {
            _super.call(this);
            //private _meshes:dyCb.Collection = dyCb.Collection.create();
            this._camera = null;
            this._program = null;
            this._camera = camera;
        }
        Scene.create = function (camera, vsSource, fsSource) {
            var obj = new this(camera);
            obj.initWhenCreate(vsSource, fsSource);
            return obj;
        };
        Object.defineProperty(Scene.prototype, "camera", {
            get: function () {
                return this._camera;
            },
            set: function (camera) {
                this._camera = camera;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scene.prototype, "program", {
            get: function () {
                return this._program;
            },
            set: function (program) {
                this._program = program;
            },
            enumerable: true,
            configurable: true
        });
        Scene.prototype.initWhenCreate = function (vsSource, fsSource) {
            this._program = dy.Program.create(vsSource, fsSource);
        };
        //public add(meshesArr:Mesh[]) {
        //    this._meshes.addChildren(meshesArr);
        //}
        Scene.prototype.run = function () {
            var self = this;
            this._camera.pushMatrix();
            this._camera.onStartLoop();
            this._camera.run();
            this._program.use();
            this.forEach(function (mesh) {
                self._setData(mesh);
                mesh.update();
                mesh.draw();
            });
            this._camera.onEndLoop();
            this._camera.popMatrix();
        };
        Scene.prototype.init = function () {
            this.position = dy.Position.create(0, 0, 0);
        };
        Scene.prototype._setData = function (mesh) {
            this._program.setUniformData("u_mvpMatrix", dy.UniformDataType.FLOAT_MAT4, this._computeMvpMatrix(mesh));
        };
        Scene.prototype._computeMvpMatrix = function (mesh) {
            return mesh.matrix.copy().applyMatrix(this._camera.computeVpMatrix());
        };
        return Scene;
    })(dy.GameObject);
    dy.Scene = Scene;
})(dy || (dy = {}));

/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var Director = (function () {
        function Director() {
            //todo :Renderer
            this._renderer = null;
            this._view = null;
            this._gl = null;
            this._scene = null;
            this._gameLoop = null;
        }
        Director.getInstance = function () {
            if (this._instance === null) {
                this._instance = new this();
                this._instance.initWhenCreate();
            }
            return this._instance;
        };
        Object.defineProperty(Director.prototype, "renderer", {
            get: function () {
                return this._renderer;
            },
            set: function (renderer) {
                this._renderer = renderer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Director.prototype, "view", {
            get: function () {
                return this._view;
            },
            set: function (view) {
                this._view = view;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Director.prototype, "gl", {
            get: function () {
                return this._gl;
            },
            set: function (gl) {
                this._gl = gl;
            },
            enumerable: true,
            configurable: true
        });
        Director.prototype.initWhenCreate = function () {
            //todo detect to decide using which renderer
            this._renderer = dy.WebGLRenderer.create();
        };
        Director.prototype.runWithScene = function (scene) {
            scene.init();
            scene.onEnter();
            this._scene = scene;
            //todo not put here?
            this._renderer.init();
            this._startLoop();
        };
        Director.prototype.getView = function () {
            return this._view;
        };
        Director.prototype.getTopUnderPoint = function (point) {
            if (!this._scene) {
                return null;
            }
            return this._scene.getTopUnderPoint(point);
        };
        Director.prototype.createGL = function (canvasId) {
            this._view = dy.ViewWebGL.create(dyCb.DomQuery.create(canvasId).get(0));
            this._gl = this._view.getContext();
        };
        Director.prototype._startLoop = function () {
            var self = this;
            this._gameLoop = dyRt.intervalRequest()
                .subscribe(function (time) {
                self._loopBody(time);
            });
        };
        //todo add tick mechanism
        Director.prototype._loopBody = function (time) {
            this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
            this._scene.onStartLoop();
            this._scene.run();
            this._renderer.render(this._scene);
            this._scene.onEndLoop();
        };
        Director._instance = null;
        return Director;
    })();
    dy.Director = Director;
})(dy || (dy = {}));

/// <reference path="definitions.d.ts"/>
var dy;
(function (dy) {
    //todo can set perspectiveParams, add updateProjectMatrix method
    //todo optimize to reduce compute
    var Camera = (function () {
        function Camera(lookAtParams, perspectiveParams) {
            this._pMatrix = null;
            this._vMatrix = null;
            this._moveSpeed = 0.05;
            this._rotateStepX = 0.1;
            this._rotateStepY = 0.1;
            this._zoomSpeed = 10;
            this._eyeX = null;
            this._eyeY = null;
            this._eyeZ = null;
            this._upX = null;
            this._upY = null;
            this._upZ = null;
            this._centerX = null;
            this._centerY = null;
            this._centerZ = null;
            this._zoomAngle = null;
            this._aspect = null;
            this._near = null;
            this._far = null;
            this._moveX = null;
            this._moveY = null;
            this._moveZ = null;
            this._rotateAngleX = null;
            this._rotateAngleY = null;
            this._zoomInAngle = null;
            this._zoomOutAngle = null;
            this._eyeX = lookAtParams.eyeX;
            this._eyeY = lookAtParams.eyeY;
            this._eyeZ = lookAtParams.eyeZ;
            this._upX = lookAtParams.upX;
            this._upY = lookAtParams.upY;
            this._upZ = lookAtParams.upZ;
            this._centerX = lookAtParams.centerX;
            this._centerY = lookAtParams.centerY;
            this._centerZ = lookAtParams.centerZ;
            this._zoomAngle = perspectiveParams.angle;
            this._aspect = perspectiveParams.aspect;
            this._near = perspectiveParams.near;
            this._far = perspectiveParams.far;
            this._moveX = 0;
            this._moveY = 0;
            this._moveZ = 0;
            this._rotateAngleX = 0;
            this._rotateAngleY = 0;
            this._zoomInAngle = 0;
            this._zoomOutAngle = 0;
            this._pMatrix = dy.Matrix.create();
            this._vMatrix = dy.Matrix.create();
        }
        Camera.create = function (lookAtParams, perspectiveParams) {
            var obj = new this(lookAtParams, perspectiveParams);
            obj.initWhenCreate();
            return obj;
        };
        Object.defineProperty(Camera.prototype, "pMatrix", {
            get: function () {
                return this._pMatrix;
            },
            set: function (pMatrix) {
                this._pMatrix = pMatrix;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera.prototype, "vMatrix", {
            get: function () {
                return this._vMatrix;
            },
            set: function (vMatrix) {
                this._vMatrix = vMatrix;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera.prototype, "moveSpeed", {
            get: function () {
                return this._moveSpeed;
            },
            set: function (moveSpeed) {
                this._moveSpeed = moveSpeed;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera.prototype, "rotateStepX", {
            get: function () {
                return this._rotateStepX;
            },
            set: function (_rotateStepX) {
                this._rotateStepX = _rotateStepX;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera.prototype, "rotateStepY", {
            get: function () {
                return this._rotateStepY;
            },
            set: function (rotateStepY) {
                this._rotateStepY = rotateStepY;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera.prototype, "zoomSpeed", {
            get: function () {
                return this._zoomSpeed;
            },
            set: function (zoomSpeed) {
                this._zoomSpeed = zoomSpeed;
            },
            enumerable: true,
            configurable: true
        });
        Camera.prototype.initWhenCreate = function () {
            this._vMatrix.setLookAt(this._eyeX, this._eyeY, this._eyeZ, this._centerX, this._centerY, this._centerZ, this._upX, this._upY, this._upZ);
            this._pMatrix.setPerspective(this._zoomAngle, this._aspect, this._near, this._far);
        };
        Camera.prototype.computeVpMatrix = function () {
            var matrix = dy.Matrix.create();
            matrix.applyMatrix(this._vMatrix);
            matrix.applyMatrix(this._pMatrix);
            return matrix;
        };
        Camera.prototype.moveLeft = function () {
            this._computeMoveDistance(dy.Vector4.create(-this._moveSpeed, 0, 0, 1));
            //绕x轴旋转时，投影xy平面为垂直方向，而Left和Right移动投影到xy平面为水平方向，因此绕x轴旋转不会影响Left和Right移动
            //this._moveX = this._moveX + cos(this._rotateAngleY * PI / 180) * this._moveSpeed;
            //this._moveZ = this._moveZ + sin(this._rotateAngleY* PI / 180) *this._moveSpeed;
        };
        Camera.prototype.moveRight = function () {
            this._computeMoveDistance(dy.Vector4.create(this._moveSpeed, 0, 0, 1));
            //this._moveX = this._moveX - cos(this._rotateAngleY * PI / 180) * this._moveSpeed;
            //this._moveZ = this._moveZ - sin(this._rotateAngleY* PI / 180) *this._moveSpeed;
        };
        Camera.prototype.moveBack = function () {
            this._computeMoveDistance(dy.Vector4.create(0, 0, this._moveSpeed, 1));
            //this._moveY = this._moveY - sin(this._rotateAngleX * PI / 180) * this._moveSpeed;
            //this._moveZ = this._moveZ + cos(this._rotateAngleX* PI / 180) *this._moveSpeed;
            //this._moveX = this._moveX + sin(this._rotateAngleY * PI / 180) * this._moveSpeed;
            //this._moveZ = this._moveZ - cos(this._rotateAngleY* PI / 180) *this._moveSpeed;
        };
        Camera.prototype.moveFront = function () {
            this._computeMoveDistance(dy.Vector4.create(0, 0, -this._moveSpeed, 1));
            //this._moveY = this._moveY + sin(this._rotateAngleX * PI / 180) * this._moveSpeed;
            //this._moveZ = this._moveZ - cos(this._rotateAngleX* PI / 180) *this._moveSpeed;
            //this._moveX = this._moveX - sin(this._rotateAngleY * PI / 180) * this._moveSpeed;
            //this._moveZ = this._moveZ + cos(this._rotateAngleY* PI / 180) *this._moveSpeed;
        };
        //todo 用欧拉角或四元数来表示方向
        Camera.prototype.rotate = function () {
            this._rotateAngleY = this._rotateAngleY + this._rotateStepY;
            ;
            this._rotateAngleX = Math.max(Math.min(this._rotateAngleX + this._rotateStepX, 90.0), -90.0);
        };
        Camera.prototype.zoomIn = function () {
            this._zoomAngle = Math.min(this._zoomAngle + this._zoomSpeed, 179);
        };
        Camera.prototype.zoomOut = function () {
            this._zoomAngle = Math.max(this._zoomAngle - this._zoomSpeed, 1);
        };
        Camera.prototype.run = function () {
            /*!
             需要对视图坐标系进行变换，先进行旋转变换R，再进行平移变换T，即M=T*R
             因此相当于对视图坐标进行M的逆变换，即M-1=R-1 * T-1，即X'=(R-1 * T-1) * X（X为视图坐标，X'为变换后的坐标）

             而此处是对视图坐标进行变换，因此要进行M的逆变换。

             注意：旋转角rotateAngle和移动距离都是针对视图坐标系的！
             */
            this._vMatrix.translate(-this._moveX, -this._moveY, -this._moveZ);
            this._vMatrix.rotate(-this._rotateAngleY, 0.0, 1.0, 0.0);
            this._vMatrix.rotate(-this._rotateAngleX, 1.0, 0.0, 0.0);
            //var vec4 = MatrixTool.multiplyVector4(this._vMatrix.values, [this._eyeX, this._eyeY, this._eyeZ, 1]);
            //this._eyeX = vec4[0];
            //this._eyeY = vec4[1];
            //this._eyeZ = vec4[2];
            //this._vMatrix.translate(this._moveX, this._moveY, this._moveZ);
            this._pMatrix.setPerspective(this._zoomAngle, this._aspect, this._near, this._far);
        };
        Camera.prototype.pushMatrix = function () {
            this._vMatrix.push();
            this._pMatrix.push();
        };
        Camera.prototype.popMatrix = function () {
            this._vMatrix.pop();
            this._pMatrix.pop();
        };
        /*!
         hook method
         */
        Camera.prototype.onStartLoop = function () {
        };
        Camera.prototype.onEndLoop = function () {
        };
        Camera.prototype._computeMoveDistance = function (speedVec4) {
            /*!
             此处移动距离是针对视图坐标系的（先旋转，然后平移），因此需要计算视图坐标系旋转后移动的距离。
             */
            var matrix = dy.Matrix.create();
            matrix.setRotate(this._rotateAngleX, 1.0, 0.0, 0.0);
            matrix.rotate(this._rotateAngleY, 0.0, 1.0, 0.0);
            var result = matrix.multiplyVector4(speedVec4).values;
            this._moveX += result[0];
            this._moveY += result[1];
            this._moveZ += result[2];
        };
        return Camera;
    })();
    dy.Camera = Camera;
})(dy || (dy = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0cnVjdHVyZS9Qb2ludC50cyIsInN0cnVjdHVyZS9Qb3NpdGlvbi50cyIsInN0cnVjdHVyZS9WaWV3LnRzIiwibWF0aC9WZWN0b3IzLnRzIiwibWF0aC9WZWN0b3I0LnRzIiwibWF0aC9NYXRyaXgudHMiLCJhY3Rpb24vQWN0aW9uLnRzIiwiYWN0aW9uL0FjdGlvbk1hbmFnZXIudHMiLCJhY3Rpb24vUm90YXRlLnRzIiwiYWN0aW9uL1NjYWxlLnRzIiwiYWN0aW9uL1RyYW5zbGF0ZS50cyIsInV0aWxzL0NvbG9yLnRzIiwidXRpbHMvSnVkZ2VVdGlscy50cyIsInJlbmRlci9TaGFkZXJUeXBlLnRzIiwicmVuZGVyL1NoYWRlci50cyIsInJlbmRlci9CdWZmZXJUeXBlLnRzIiwicmVuZGVyL0F0dHJpYnV0ZURhdGFUeXBlLnRzIiwicmVuZGVyL0RyYXdNb2RlLnRzIiwicmVuZGVyL0VsZW1lbnRCdWZmZXIudHMiLCJyZW5kZXIvQXJyYXlCdWZmZXIudHMiLCJyZW5kZXIvVW5pZm9ybURhdGFUeXBlLnRzIiwicmVuZGVyL1Byb2dyYW0udHMiLCJyZW5kZXIvUXVhZENvbW1hbmQudHMiLCJyZW5kZXIvV2ViR0xSZW5kZXJlci50cyIsIm1hdGVyaWFsL01lc2hNYXRlcmlhbC50cyIsImxvYWRlci9HTFNMTG9hZGVyLnRzIiwibG9hZGVyL0xvYWRlck1hbmFnZXIudHMiLCJnZW9tZXRyeS9HZW9tZXRyeS50cyIsImdlb21ldHJ5L0JveEdlb21ldHJ5LnRzIiwiZ2VvbWV0cnkvUmVjdEdlb21ldHJ5LnRzIiwiZ2VvbWV0cnkvU3BoZXJlRHJhd01vZGUudHMiLCJnZW9tZXRyeS9TcGhlcmVHZW9tZXRyeS50cyIsImdlb21ldHJ5L1RyaWFuZ2xlR2VvbWV0cnkudHMiLCJldmVudC9zdHJ1Y3R1cmUvRXZlbnRMaXN0ZW5lck1hcC50cyIsImV2ZW50L29iamVjdC9FdmVudFR5cGUudHMiLCJldmVudC9vYmplY3QvRXZlbnROYW1lLnRzIiwiZXZlbnQvb2JqZWN0L0V2ZW50UGhhc2UudHMiLCJldmVudC9vYmplY3QvRXZlbnRUYWJsZS50cyIsImV2ZW50L29iamVjdC9FdmVudC50cyIsImV2ZW50L29iamVjdC9Nb3VzZUV2ZW50LnRzIiwiZXZlbnQvb2JqZWN0L0tleWJvYXJkRXZlbnQudHMiLCJldmVudC9vYmplY3QvQ3VzdG9tRXZlbnQudHMiLCJldmVudC9vYmplY3QvTW91c2VCdXR0b24udHMiLCJldmVudC9saXN0ZW5lci9FdmVudExpc3RlbmVyLnRzIiwiZXZlbnQvaGFuZGxlci9FdmVudEhhbmRsZXIudHMiLCJldmVudC9oYW5kbGVyL0RvbUV2ZW50SGFuZGxlci50cyIsImV2ZW50L2hhbmRsZXIvTW91c2VFdmVudEhhbmRsZXIudHMiLCJldmVudC9oYW5kbGVyL0tleWJvYXJkRXZlbnRIYW5kbGVyLnRzIiwiZXZlbnQvaGFuZGxlci9DdXN0b21FdmVudEhhbmRsZXIudHMiLCJldmVudC9kaXNwYXRjaGVyL0V2ZW50RGlzcGF0Y2hlci50cyIsImV2ZW50L2JpbmRlci9FdmVudFJlZ2lzdGVyLnRzIiwiZXZlbnQvYmluZGVyL0V2ZW50QmluZGVyLnRzIiwiZXZlbnQvZmFjdG9yeS9GYWN0b3J5RXZlbnRIYW5kbGVyLnRzIiwiZXZlbnQvRXZlbnRNYW5hZ2VyLnRzIiwiY29yZS9HYW1lT2JqZWN0LnRzIiwiY29yZS9NZXNoLnRzIiwiY29yZS9TY2VuZS50cyIsImNvcmUvRGlyZWN0b3IudHMiLCJDYW1lcmEudHMiXSwibmFtZXMiOlsiZHkiLCJkeS5Qb2ludCIsImR5LlBvaW50LmNvbnN0cnVjdG9yIiwiZHkuUG9pbnQuY3JlYXRlIiwiZHkuUG9zaXRpb24iLCJkeS5Qb3NpdGlvbi5jb25zdHJ1Y3RvciIsImR5LlBvc2l0aW9uLmNyZWF0ZSIsImR5LlZpZXdXZWJHTCIsImR5LlZpZXdXZWJHTC5jb25zdHJ1Y3RvciIsImR5LlZpZXdXZWJHTC5jcmVhdGUiLCJkeS5WaWV3V2ViR0wub2Zmc2V0IiwiZHkuVmlld1dlYkdMLmRvbSIsImR5LlZpZXdXZWJHTC53aWR0aCIsImR5LlZpZXdXZWJHTC5oZWlnaHQiLCJkeS5WaWV3V2ViR0wuZ2V0Q29udGV4dCIsImR5LlZlY3RvcjMiLCJkeS5WZWN0b3IzLmNvbnN0cnVjdG9yIiwiZHkuVmVjdG9yMy5jcmVhdGUiLCJkeS5WZWN0b3IzLnZhbHVlcyIsImR5LlZlY3RvcjMubm9ybWFsaXplIiwiZHkuVmVjdG9yMy5zdWIiLCJkeS5WZWN0b3IzLnJldmVyc2UiLCJkeS5WZWN0b3IzLmNvcHkiLCJkeS5WZWN0b3IzLnRvVmVjNCIsImR5LlZlY3RvcjQiLCJkeS5WZWN0b3I0LmNvbnN0cnVjdG9yIiwiZHkuVmVjdG9yNC5jcmVhdGUiLCJkeS5WZWN0b3I0LnZhbHVlcyIsImR5LlZlY3RvcjQubm9ybWFsaXplIiwiZHkuVmVjdG9yNC50b1ZlYzMiLCJkeS5NYXRyaXgiLCJkeS5NYXRyaXguY29uc3RydWN0b3IiLCJkeS5NYXRyaXguY3JlYXRlIiwiZHkuTWF0cml4LnZhbHVlcyIsImR5Lk1hdHJpeC5wdXNoIiwiZHkuTWF0cml4LnBvcCIsImR5Lk1hdHJpeC5zZXRJZGVudGl0eSIsImR5Lk1hdHJpeC5zZXRJbnZlcnNlT2YiLCJkeS5NYXRyaXguaW52ZXJzZU9mIiwiZHkuTWF0cml4LnRyYW5zcG9zZSIsImR5Lk1hdHJpeC5zZXRUcmFuc2xhdGUiLCJkeS5NYXRyaXgudHJhbnNsYXRlIiwiZHkuTWF0cml4LnNldFJvdGF0ZSIsImR5Lk1hdHJpeC5yb3RhdGUiLCJkeS5NYXRyaXguc2V0U2NhbGUiLCJkeS5NYXRyaXguc2NhbGUiLCJkeS5NYXRyaXguc2V0TG9va0F0IiwiZHkuTWF0cml4Lmxvb2tBdCIsImR5Lk1hdHJpeC5zZXRPcnRobyIsImR5Lk1hdHJpeC5vcnRobyIsImR5Lk1hdHJpeC5zZXRQZXJzcGVjdGl2ZSIsImR5Lk1hdHJpeC5wZXJzcGVjdGl2ZSIsImR5Lk1hdHJpeC5hcHBseU1hdHJpeCIsImR5Lk1hdHJpeC5tdWx0aXBseSIsImR5Lk1hdHJpeC5tdWx0aXBseVZlY3RvcjQiLCJkeS5NYXRyaXguY29weSIsImR5LkFjdGlvbiIsImR5LkFjdGlvbi5jb25zdHJ1Y3RvciIsImR5LkFjdGlvbi5pc0ZpbmlzaCIsImR5LkFjdGlvbi51cGRhdGUiLCJkeS5BY3Rpb24uZmluaXNoIiwiZHkuQWN0aW9uTWFuYWdlciIsImR5LkFjdGlvbk1hbmFnZXIuY29uc3RydWN0b3IiLCJkeS5BY3Rpb25NYW5hZ2VyLmNyZWF0ZSIsImR5LkFjdGlvbk1hbmFnZXIuYWRkQ2hpbGQiLCJkeS5BY3Rpb25NYW5hZ2VyLmhhc0NoaWxkIiwiZHkuQWN0aW9uTWFuYWdlci51cGRhdGUiLCJkeS5Sb3RhdGUiLCJkeS5Sb3RhdGUuY29uc3RydWN0b3IiLCJkeS5Sb3RhdGUuY3JlYXRlIiwiZHkuUm90YXRlLnVwZGF0ZSIsImR5LlJvdGF0ZS5faXNOb3RSb3RhdGVBcm91bmRPcmlnaW5Qb2ludCIsImR5LlNjYWxlIiwiZHkuU2NhbGUuY29uc3RydWN0b3IiLCJkeS5TY2FsZS5jcmVhdGUiLCJkeS5TY2FsZS51cGRhdGUiLCJkeS5UcmFuc2xhdGUiLCJkeS5UcmFuc2xhdGUuY29uc3RydWN0b3IiLCJkeS5UcmFuc2xhdGUuY3JlYXRlIiwiZHkuVHJhbnNsYXRlLnVwZGF0ZSIsImR5LkNvbG9yIiwiZHkuQ29sb3IuY29uc3RydWN0b3IiLCJkeS5Db2xvci5jcmVhdGUiLCJkeS5Db2xvci5yIiwiZHkuQ29sb3IuZyIsImR5LkNvbG9yLmIiLCJkeS5Db2xvci5pbml0V2hlbkNyZWF0ZSIsImR5LkNvbG9yLl9zZXRDb2xvciIsImR5LkNvbG9yLl9zZXRIZXgiLCJkeS5KdWRnZVV0aWxzIiwiZHkuSnVkZ2VVdGlscy5jb25zdHJ1Y3RvciIsImR5Lkp1ZGdlVXRpbHMuaXNWaWV3IiwiZHkuSnVkZ2VVdGlscy5pc0VxdWFsIiwiZHkuU2hhZGVyVHlwZSIsImR5LlNoYWRlciIsImR5LlNoYWRlci5jb25zdHJ1Y3RvciIsImR5LlNoYWRlci5jcmVhdGVTaGFkZXIiLCJkeS5CdWZmZXJUeXBlIiwiZHkuQXR0cmlidXRlRGF0YVR5cGUiLCJkeS5EcmF3TW9kZSIsImR5LkVsZW1lbnRCdWZmZXIiLCJkeS5FbGVtZW50QnVmZmVyLmNvbnN0cnVjdG9yIiwiZHkuRWxlbWVudEJ1ZmZlci5jcmVhdGUiLCJkeS5FbGVtZW50QnVmZmVyLmJ1ZmZlciIsImR5LkVsZW1lbnRCdWZmZXIudHlwZSIsImR5LkVsZW1lbnRCdWZmZXIubnVtIiwiZHkuRWxlbWVudEJ1ZmZlci50eXBlU2l6ZSIsImR5LkVsZW1lbnRCdWZmZXIuaW5pdFdoZW5DcmVhdGUiLCJkeS5FbGVtZW50QnVmZmVyLl9jaGVja0RhdGFUeXBlIiwiZHkuRWxlbWVudEJ1ZmZlci5fZ2V0SW5mbyIsImR5LkFycmF5QnVmZmVyIiwiZHkuQXJyYXlCdWZmZXIuY29uc3RydWN0b3IiLCJkeS5BcnJheUJ1ZmZlci5jcmVhdGUiLCJkeS5BcnJheUJ1ZmZlci5idWZmZXIiLCJkeS5BcnJheUJ1ZmZlci5udW0iLCJkeS5BcnJheUJ1ZmZlci50eXBlIiwiZHkuQXJyYXlCdWZmZXIuY291bnQiLCJkeS5BcnJheUJ1ZmZlci5pbml0V2hlbkNyZWF0ZSIsImR5LlVuaWZvcm1EYXRhVHlwZSIsImR5LlByb2dyYW0iLCJkeS5Qcm9ncmFtLmNvbnN0cnVjdG9yIiwiZHkuUHJvZ3JhbS5jcmVhdGUiLCJkeS5Qcm9ncmFtLnVzZSIsImR5LlByb2dyYW0uc2V0VW5pZm9ybURhdGEiLCJkeS5Qcm9ncmFtLnNldEF0dHJpYnV0ZURhdGEiLCJkeS5Qcm9ncmFtLmluaXRXaGVuQ3JlYXRlIiwiZHkuUXVhZENvbW1hbmQiLCJkeS5RdWFkQ29tbWFuZC5jb25zdHJ1Y3RvciIsImR5LlF1YWRDb21tYW5kLmNyZWF0ZSIsImR5LlF1YWRDb21tYW5kLmJ1ZmZlcnMiLCJkeS5RdWFkQ29tbWFuZC5jb2xvciIsImR5LlF1YWRDb21tYW5kLmRyYXdNb2RlIiwiZHkuUXVhZENvbW1hbmQuZXhlY3V0ZSIsImR5LlF1YWRDb21tYW5kLmluaXQiLCJkeS5RdWFkQ29tbWFuZC5fc2VuZERhdGEiLCJkeS5RdWFkQ29tbWFuZC5fZHJhdyIsImR5LldlYkdMUmVuZGVyZXIiLCJkeS5XZWJHTFJlbmRlcmVyLmNvbnN0cnVjdG9yIiwiZHkuV2ViR0xSZW5kZXJlci5jcmVhdGUiLCJkeS5XZWJHTFJlbmRlcmVyLmNyZWF0ZVF1YWRDb21tYW5kIiwiZHkuV2ViR0xSZW5kZXJlci5hZGRDb21tYW5kIiwiZHkuV2ViR0xSZW5kZXJlci5yZW5kZXIiLCJkeS5XZWJHTFJlbmRlcmVyLmluaXQiLCJkeS5XZWJHTFJlbmRlcmVyLnNldENsZWFyQ29sb3IiLCJkeS5XZWJHTFJlbmRlcmVyLl9jbGVhckNvbW1hbmQiLCJkeS5NZXNoTWF0ZXJpYWwiLCJkeS5NZXNoTWF0ZXJpYWwuY29uc3RydWN0b3IiLCJkeS5NZXNoTWF0ZXJpYWwuY3JlYXRlIiwiZHkuTWVzaE1hdGVyaWFsLmNvbG9yIiwiZHkuR0xTTExvYWRlciIsImR5LkdMU0xMb2FkZXIuY29uc3RydWN0b3IiLCJkeS5HTFNMTG9hZGVyLmdldEluc3RhbmNlIiwiZHkuR0xTTExvYWRlci5sb2FkIiwiZHkuR0xTTExvYWRlci5nZXRHTFNMIiwiZHkuR0xTTExvYWRlci5fbG9hZFRleHQiLCJkeS5Mb2FkZXJNYW5hZ2VyIiwiZHkuTG9hZGVyTWFuYWdlci5jb25zdHJ1Y3RvciIsImR5LkxvYWRlck1hbmFnZXIuZ2V0SW5zdGFuY2UiLCJkeS5Mb2FkZXJNYW5hZ2VyLmxvYWQiLCJkeS5Mb2FkZXJNYW5hZ2VyLnJlc2V0IiwiZHkuTG9hZGVyTWFuYWdlci5vblJlc0xvYWRlZCIsImR5LkxvYWRlck1hbmFnZXIub25SZXNFcnJvciIsImR5Lkdlb21ldHJ5IiwiZHkuR2VvbWV0cnkuY29uc3RydWN0b3IiLCJkeS5HZW9tZXRyeS52ZXJ0aWNlcyIsImR5Lkdlb21ldHJ5LmluZGljZXMiLCJkeS5HZW9tZXRyeS5jb2xvcnMiLCJkeS5HZW9tZXRyeS5pbml0V2hlbkNyZWF0ZSIsImR5Lkdlb21ldHJ5LmNvbXB1dGVWZXJ0aWNlc0J1ZmZlciIsImR5Lkdlb21ldHJ5LmNvbXB1dGVJbmRpY2VzQnVmZmVyIiwiZHkuR2VvbWV0cnkuX2NvbXB1dGVDb2xvcnNCdWZmZXIiLCJkeS5Cb3hHZW9tZXRyeSIsImR5LkJveEdlb21ldHJ5LmNvbnN0cnVjdG9yIiwiZHkuQm94R2VvbWV0cnkuY3JlYXRlIiwiZHkuQm94R2VvbWV0cnkuY29tcHV0ZVZlcnRpY2VzQnVmZmVyIiwiZHkuQm94R2VvbWV0cnkuY29tcHV0ZUluZGljZXNCdWZmZXIiLCJkeS5SZWN0R2VvbWV0cnkiLCJkeS5SZWN0R2VvbWV0cnkuY29uc3RydWN0b3IiLCJkeS5SZWN0R2VvbWV0cnkuY3JlYXRlIiwiZHkuUmVjdEdlb21ldHJ5LmNvbXB1dGVWZXJ0aWNlc0J1ZmZlciIsImR5LlJlY3RHZW9tZXRyeS5jb21wdXRlSW5kaWNlc0J1ZmZlciIsImR5LlNwaGVyZURyYXdNb2RlIiwiZHkuU3BoZXJlR2VvbWV0cnkiLCJkeS5TcGhlcmVHZW9tZXRyeS5jb25zdHJ1Y3RvciIsImR5LlNwaGVyZUdlb21ldHJ5LmNyZWF0ZSIsImR5LlNwaGVyZUdlb21ldHJ5LmluaXRXaGVuQ3JlYXRlIiwiZHkuU3BoZXJlR2VvbWV0cnkuY29tcHV0ZVZlcnRpY2VzQnVmZmVyIiwiZHkuU3BoZXJlR2VvbWV0cnkuY29tcHV0ZUluZGljZXNCdWZmZXIiLCJkeS5TcGhlcmVHZW9tZXRyeS5fY29tcHV0ZURhdGEiLCJkeS5HZXREYXRhQnlMYXRpdHVkZUxvbmd0aXR1ZGUiLCJkeS5HZXREYXRhQnlMYXRpdHVkZUxvbmd0aXR1ZGUuY29uc3RydWN0b3IiLCJkeS5HZXREYXRhQnlMYXRpdHVkZUxvbmd0aXR1ZGUuY3JlYXRlIiwiZHkuR2V0RGF0YUJ5TGF0aXR1ZGVMb25ndGl0dWRlLnZlcnRpY2VzIiwiZHkuR2V0RGF0YUJ5TGF0aXR1ZGVMb25ndGl0dWRlLmluZGljZXMiLCJkeS5HZXREYXRhQnlMYXRpdHVkZUxvbmd0aXR1ZGUuZ2V0RGF0YSIsImR5LkdldERhdGFCeURlY29tcG9zaXRpb24iLCJkeS5HZXREYXRhQnlEZWNvbXBvc2l0aW9uLmNvbnN0cnVjdG9yIiwiZHkuR2V0RGF0YUJ5RGVjb21wb3NpdGlvbi5jcmVhdGUiLCJkeS5HZXREYXRhQnlEZWNvbXBvc2l0aW9uLnZlcnRpY2VzIiwiZHkuR2V0RGF0YUJ5RGVjb21wb3NpdGlvbi5pbmRpY2VzIiwiZHkuR2V0RGF0YUJ5RGVjb21wb3NpdGlvbi5nZXREYXRhIiwiZHkuR2V0RGF0YUJ5RGVjb21wb3NpdGlvbi5fc3ViRGl2aWRlIiwiZHkuR2V0RGF0YUJ5RGVjb21wb3NpdGlvbi5fbm9ybWFsaXplIiwiZHkuVHJpYW5nbGVHZW9tZXRyeSIsImR5LlRyaWFuZ2xlR2VvbWV0cnkuY29uc3RydWN0b3IiLCJkeS5UcmlhbmdsZUdlb21ldHJ5LmNyZWF0ZSIsImR5LlRyaWFuZ2xlR2VvbWV0cnkuY29tcHV0ZVZlcnRpY2VzQnVmZmVyIiwiZHkuVHJpYW5nbGVHZW9tZXRyeS5jb21wdXRlSW5kaWNlc0J1ZmZlciIsImR5LkV2ZW50TGlzdGVuZXJNYXAiLCJkeS5FdmVudExpc3RlbmVyTWFwLmNvbnN0cnVjdG9yIiwiZHkuRXZlbnRMaXN0ZW5lck1hcC5jcmVhdGUiLCJkeS5FdmVudExpc3RlbmVyTWFwLmFwcGVuZENoaWxkIiwiZHkuRXZlbnRMaXN0ZW5lck1hcC5nZXRDaGlsZCIsImR5LkV2ZW50TGlzdGVuZXJNYXAuaGFzQ2hpbGQiLCJkeS5FdmVudExpc3RlbmVyTWFwLmZpbHRlciIsImR5LkV2ZW50TGlzdGVuZXJNYXAuZm9yRWFjaCIsImR5LkV2ZW50TGlzdGVuZXJNYXAucmVtb3ZlQ2hpbGQiLCJkeS5FdmVudExpc3RlbmVyTWFwLmdldEV2ZW50T2ZmRGF0YUxpc3QiLCJkeS5FdmVudExpc3RlbmVyTWFwLmdldEV2ZW50TmFtZUZyb21LZXkiLCJkeS5FdmVudExpc3RlbmVyTWFwLmdldFVpZEZyb21LZXkiLCJkeS5FdmVudExpc3RlbmVyTWFwLmlzVGFyZ2V0IiwiZHkuRXZlbnRMaXN0ZW5lck1hcC5fYnVpbGRLZXkiLCJkeS5FdmVudExpc3RlbmVyTWFwLl9idWlsZEtleVdpdGhVaWQiLCJkeS5FdmVudFR5cGUiLCJkeS5FdmVudE5hbWUiLCJkeS5FdmVudFBoYXNlIiwiZHkuRXZlbnRUYWJsZSIsImR5LkV2ZW50VGFibGUuY29uc3RydWN0b3IiLCJkeS5FdmVudFRhYmxlLmdldEV2ZW50VHlwZSIsImR5LkV2ZW50IiwiZHkuRXZlbnQuY29uc3RydWN0b3IiLCJkeS5FdmVudC5uYW1lIiwiZHkuRXZlbnQudGFyZ2V0IiwiZHkuRXZlbnQuY3VycmVudFRhcmdldCIsImR5LkV2ZW50LmlzU3RvcFByb3BhZ2F0aW9uIiwiZHkuRXZlbnQucGhhc2UiLCJkeS5FdmVudC5jb3B5IiwiZHkuRXZlbnQuc3RvcFByb3BhZ2F0aW9uIiwiZHkuRXZlbnQuY29weU1lbWJlciIsImR5Lk1vdXNlRXZlbnQiLCJkeS5Nb3VzZUV2ZW50LmNvbnN0cnVjdG9yIiwiZHkuTW91c2VFdmVudC5jcmVhdGUiLCJkeS5Nb3VzZUV2ZW50LmV2ZW50IiwiZHkuTW91c2VFdmVudC5sb2NhdGlvbiIsImR5Lk1vdXNlRXZlbnQubG9jYXRpb25JblZpZXciLCJkeS5Nb3VzZUV2ZW50LmJ1dHRvbiIsImR5Lk1vdXNlRXZlbnQuY29weSIsImR5LktleWJvYXJkRXZlbnQiLCJkeS5LZXlib2FyZEV2ZW50LmNvbnN0cnVjdG9yIiwiZHkuS2V5Ym9hcmRFdmVudC5jcmVhdGUiLCJkeS5LZXlib2FyZEV2ZW50LmV2ZW50IiwiZHkuS2V5Ym9hcmRFdmVudC5jdHJsS2V5IiwiZHkuS2V5Ym9hcmRFdmVudC5hbHRLZXkiLCJkeS5LZXlib2FyZEV2ZW50LnNoaWZ0S2V5IiwiZHkuS2V5Ym9hcmRFdmVudC5tZXRhS2V5IiwiZHkuS2V5Ym9hcmRFdmVudC5rZXlDb2RlIiwiZHkuS2V5Ym9hcmRFdmVudC5rZXkiLCJkeS5LZXlib2FyZEV2ZW50LmNvcHkiLCJkeS5DdXN0b21FdmVudCIsImR5LkN1c3RvbUV2ZW50LmNvbnN0cnVjdG9yIiwiZHkuQ3VzdG9tRXZlbnQuY3JlYXRlIiwiZHkuQ3VzdG9tRXZlbnQudXNlckRhdGEiLCJkeS5DdXN0b21FdmVudC5jb3B5UHVibGljQXR0cmkiLCJkeS5DdXN0b21FdmVudC5jb3B5IiwiZHkuTW91c2VCdXR0b24iLCJkeS5FdmVudExpc3RlbmVyIiwiZHkuRXZlbnRMaXN0ZW5lci5jb25zdHJ1Y3RvciIsImR5LkV2ZW50TGlzdGVuZXIuY3JlYXRlIiwiZHkuRXZlbnRMaXN0ZW5lci5ldmVudFR5cGUiLCJkeS5FdmVudExpc3RlbmVyLnByaW9yaXR5IiwiZHkuRXZlbnRMaXN0ZW5lci5oYW5kbGVyRGF0YUxpc3QiLCJkeS5FdmVudExpc3RlbmVyLmluaXRXaGVuQ3JlYXRlIiwiZHkuRXZlbnRMaXN0ZW5lci5fc2V0SGFuZGxlckRhdGFMaXN0IiwiZHkuRXZlbnRMaXN0ZW5lci5fcGFyc2VFdmVudE5hbWUiLCJkeS5FdmVudEhhbmRsZXIiLCJkeS5FdmVudEhhbmRsZXIuY29uc3RydWN0b3IiLCJkeS5FdmVudEhhbmRsZXIub24iLCJkeS5FdmVudEhhbmRsZXIub2ZmIiwiZHkuRXZlbnRIYW5kbGVyLnRyaWdnZXIiLCJkeS5Eb21FdmVudEhhbmRsZXIiLCJkeS5Eb21FdmVudEhhbmRsZXIuY29uc3RydWN0b3IiLCJkeS5Eb21FdmVudEhhbmRsZXIub2ZmIiwiZHkuRG9tRXZlbnRIYW5kbGVyLmdldERvbSIsImR5LkRvbUV2ZW50SGFuZGxlci5idWlsZFdyYXBIYW5kbGVyIiwiZHkuRG9tRXZlbnRIYW5kbGVyLmhhbmRsZXIiLCJkeS5Eb21FdmVudEhhbmRsZXIuX2JpbmQiLCJkeS5Eb21FdmVudEhhbmRsZXIuX3VuQmluZCIsImR5Lk1vdXNlRXZlbnRIYW5kbGVyIiwiZHkuTW91c2VFdmVudEhhbmRsZXIuY29uc3RydWN0b3IiLCJkeS5Nb3VzZUV2ZW50SGFuZGxlci5nZXRJbnN0YW5jZSIsImR5Lk1vdXNlRXZlbnRIYW5kbGVyLm9uIiwiZHkuTW91c2VFdmVudEhhbmRsZXIudHJpZ2dlciIsImR5Lk1vdXNlRXZlbnRIYW5kbGVyLmdldERvbSIsImR5Lk1vdXNlRXZlbnRIYW5kbGVyLmJ1aWxkV3JhcEhhbmRsZXIiLCJkeS5Nb3VzZUV2ZW50SGFuZGxlci5faXNUcmlnZ2VyIiwiZHkuTW91c2VFdmVudEhhbmRsZXIuX2NyZWF0ZUV2ZW50T2JqZWN0IiwiZHkuS2V5Ym9hcmRFdmVudEhhbmRsZXIiLCJkeS5LZXlib2FyZEV2ZW50SGFuZGxlci5jb25zdHJ1Y3RvciIsImR5LktleWJvYXJkRXZlbnRIYW5kbGVyLmdldEluc3RhbmNlIiwiZHkuS2V5Ym9hcmRFdmVudEhhbmRsZXIub24iLCJkeS5LZXlib2FyZEV2ZW50SGFuZGxlci50cmlnZ2VyIiwiZHkuS2V5Ym9hcmRFdmVudEhhbmRsZXIuZ2V0RG9tIiwiZHkuS2V5Ym9hcmRFdmVudEhhbmRsZXIuYnVpbGRXcmFwSGFuZGxlciIsImR5LktleWJvYXJkRXZlbnRIYW5kbGVyLl9pc1RyaWdnZXIiLCJkeS5LZXlib2FyZEV2ZW50SGFuZGxlci5fY3JlYXRlRXZlbnRPYmplY3QiLCJkeS5DdXN0b21FdmVudEhhbmRsZXIiLCJkeS5DdXN0b21FdmVudEhhbmRsZXIuY29uc3RydWN0b3IiLCJkeS5DdXN0b21FdmVudEhhbmRsZXIuZ2V0SW5zdGFuY2UiLCJkeS5DdXN0b21FdmVudEhhbmRsZXIub24iLCJkeS5DdXN0b21FdmVudEhhbmRsZXIub2ZmIiwiZHkuQ3VzdG9tRXZlbnRIYW5kbGVyLnRyaWdnZXIiLCJkeS5DdXN0b21FdmVudEhhbmRsZXIuX3RyaWdnZXJFdmVudEhhbmRsZXIiLCJkeS5DdXN0b21FdmVudEhhbmRsZXIuX3RyaWdnZXJUYXJnZXRBbmRFdmVudEhhbmRsZXIiLCJkeS5DdXN0b21FdmVudEhhbmRsZXIuX3NldFVzZXJEYXRhIiwiZHkuRXZlbnREaXNwYXRjaGVyIiwiZHkuRXZlbnREaXNwYXRjaGVyLmNvbnN0cnVjdG9yIiwiZHkuRXZlbnREaXNwYXRjaGVyLmNyZWF0ZSIsImR5LkV2ZW50RGlzcGF0Y2hlci50cmlnZ2VyIiwiZHkuRXZlbnREaXNwYXRjaGVyLmVtaXQiLCJkeS5FdmVudERpc3BhdGNoZXIuYnJvYWRjYXN0IiwiZHkuRXZlbnREaXNwYXRjaGVyLmJyb2FkY2FzdC5pdGVyYXRvciIsImR5LkV2ZW50RGlzcGF0Y2hlci5fZ2V0UGFyZW50IiwiZHkuRXZlbnREaXNwYXRjaGVyLl90cmlnZ2VyV2l0aFVzZXJEYXRhIiwiZHkuRXZlbnRSZWdpc3RlciIsImR5LkV2ZW50UmVnaXN0ZXIuY29uc3RydWN0b3IiLCJkeS5FdmVudFJlZ2lzdGVyLmdldEluc3RhbmNlIiwiZHkuRXZlbnRSZWdpc3Rlci5yZWdpc3RlciIsImR5LkV2ZW50UmVnaXN0ZXIucmVtb3ZlIiwiZHkuRXZlbnRSZWdpc3Rlci5nZXRFdmVudFJlZ2lzdGVyRGF0YUxpc3QiLCJkeS5FdmVudFJlZ2lzdGVyLnNldEJ1YmJsZVBhcmVudCIsImR5LkV2ZW50UmVnaXN0ZXIuaXNCaW5kZWQiLCJkeS5FdmVudFJlZ2lzdGVyLmZpbHRlciIsImR5LkV2ZW50UmVnaXN0ZXIuZm9yRWFjaCIsImR5LkV2ZW50UmVnaXN0ZXIuZ2V0Q2hpbGQiLCJkeS5FdmVudFJlZ2lzdGVyLmdldEV2ZW50TmFtZUZyb21LZXkiLCJkeS5FdmVudFJlZ2lzdGVyLmdldFVpZEZyb21LZXkiLCJkeS5FdmVudFJlZ2lzdGVyLmdldFdyYXBIYW5kbGVyIiwiZHkuRXZlbnRSZWdpc3Rlci5pc1RhcmdldCIsImR5LkV2ZW50UmVnaXN0ZXIuX2lzQWxsRXZlbnRIYW5kbGVyUmVtb3ZlZCIsImR5LkV2ZW50UmVnaXN0ZXIuX2hhbmRsZUFmdGVyQWxsRXZlbnRIYW5kbGVyUmVtb3ZlZCIsImR5LkV2ZW50QmluZGVyIiwiZHkuRXZlbnRCaW5kZXIuY29uc3RydWN0b3IiLCJkeS5FdmVudEJpbmRlci5jcmVhdGUiLCJkeS5FdmVudEJpbmRlci5vbiIsImR5LkV2ZW50QmluZGVyLm9mZiIsImR5LkZhY3RvcnlFdmVudEhhbmRsZXIiLCJkeS5GYWN0b3J5RXZlbnRIYW5kbGVyLmNvbnN0cnVjdG9yIiwiZHkuRmFjdG9yeUV2ZW50SGFuZGxlci5jcmVhdGVFdmVudEhhbmRsZXIiLCJkeS5FdmVudE1hbmFnZXIiLCJkeS5FdmVudE1hbmFnZXIuY29uc3RydWN0b3IiLCJkeS5FdmVudE1hbmFnZXIub24iLCJkeS5FdmVudE1hbmFnZXIub2ZmIiwiZHkuRXZlbnRNYW5hZ2VyLnRyaWdnZXIiLCJkeS5FdmVudE1hbmFnZXIuYnJvYWRjYXN0IiwiZHkuRXZlbnRNYW5hZ2VyLmVtaXQiLCJkeS5FdmVudE1hbmFnZXIuZnJvbUV2ZW50IiwiZHkuRXZlbnRNYW5hZ2VyLnNldEJ1YmJsZVBhcmVudCIsImR5LkdhbWVPYmplY3QiLCJkeS5HYW1lT2JqZWN0LmNvbnN0cnVjdG9yIiwiZHkuR2FtZU9iamVjdC51aWQiLCJkeS5HYW1lT2JqZWN0LnBvc2l0aW9uIiwiZHkuR2FtZU9iamVjdC5wYXJlbnQiLCJkeS5HYW1lT2JqZWN0LmJ1YmJsZVBhcmVudCIsImR5LkdhbWVPYmplY3QuaW5pdCIsImR5LkdhbWVPYmplY3QuZGlzcG9zZSIsImR5LkdhbWVPYmplY3Qub25FbnRlciIsImR5LkdhbWVPYmplY3Qub25TdGFydExvb3AiLCJkeS5HYW1lT2JqZWN0Lm9uRW5kTG9vcCIsImR5LkdhbWVPYmplY3Qub25FeGl0IiwiZHkuR2FtZU9iamVjdC5oYXNDaGlsZCIsImR5LkdhbWVPYmplY3QuYWRkQ2hpbGQiLCJkeS5HYW1lT2JqZWN0LmdldENoaWxyZW4iLCJkeS5HYW1lT2JqZWN0LnNvcnQiLCJkeS5HYW1lT2JqZWN0LmZvckVhY2giLCJkeS5HYW1lT2JqZWN0LnJlbW92ZUNoaWxkIiwiZHkuR2FtZU9iamVjdC5yZW1vdmVNZSIsImR5LkdhbWVPYmplY3QuZ2V0VG9wVW5kZXJQb2ludCIsImR5LkdhbWVPYmplY3QuaXNIaXQiLCJkeS5HYW1lT2JqZWN0Ll9hc2NlbmRaIiwiZHkuTWVzaCIsImR5Lk1lc2guY29uc3RydWN0b3IiLCJkeS5NZXNoLmNyZWF0ZSIsImR5Lk1lc2gubWF0cml4IiwiZHkuTWVzaC5ydW5BY3Rpb24iLCJkeS5NZXNoLnVwZGF0ZSIsImR5Lk1lc2guZHJhdyIsImR5Lk1lc2guaW5pdCIsImR5Lk1lc2guX2FkZERyYXdDb21tYW5kIiwiZHkuU2NlbmUiLCJkeS5TY2VuZS5jb25zdHJ1Y3RvciIsImR5LlNjZW5lLmNyZWF0ZSIsImR5LlNjZW5lLmNhbWVyYSIsImR5LlNjZW5lLnByb2dyYW0iLCJkeS5TY2VuZS5pbml0V2hlbkNyZWF0ZSIsImR5LlNjZW5lLnJ1biIsImR5LlNjZW5lLmluaXQiLCJkeS5TY2VuZS5fc2V0RGF0YSIsImR5LlNjZW5lLl9jb21wdXRlTXZwTWF0cml4IiwiZHkuRGlyZWN0b3IiLCJkeS5EaXJlY3Rvci5jb25zdHJ1Y3RvciIsImR5LkRpcmVjdG9yLmdldEluc3RhbmNlIiwiZHkuRGlyZWN0b3IucmVuZGVyZXIiLCJkeS5EaXJlY3Rvci52aWV3IiwiZHkuRGlyZWN0b3IuZ2wiLCJkeS5EaXJlY3Rvci5pbml0V2hlbkNyZWF0ZSIsImR5LkRpcmVjdG9yLnJ1bldpdGhTY2VuZSIsImR5LkRpcmVjdG9yLmdldFZpZXciLCJkeS5EaXJlY3Rvci5nZXRUb3BVbmRlclBvaW50IiwiZHkuRGlyZWN0b3IuY3JlYXRlR0wiLCJkeS5EaXJlY3Rvci5fc3RhcnRMb29wIiwiZHkuRGlyZWN0b3IuX2xvb3BCb2R5IiwiZHkuQ2FtZXJhIiwiZHkuQ2FtZXJhLmNvbnN0cnVjdG9yIiwiZHkuQ2FtZXJhLmNyZWF0ZSIsImR5LkNhbWVyYS5wTWF0cml4IiwiZHkuQ2FtZXJhLnZNYXRyaXgiLCJkeS5DYW1lcmEubW92ZVNwZWVkIiwiZHkuQ2FtZXJhLnJvdGF0ZVN0ZXBYIiwiZHkuQ2FtZXJhLnJvdGF0ZVN0ZXBZIiwiZHkuQ2FtZXJhLnpvb21TcGVlZCIsImR5LkNhbWVyYS5pbml0V2hlbkNyZWF0ZSIsImR5LkNhbWVyYS5jb21wdXRlVnBNYXRyaXgiLCJkeS5DYW1lcmEubW92ZUxlZnQiLCJkeS5DYW1lcmEubW92ZVJpZ2h0IiwiZHkuQ2FtZXJhLm1vdmVCYWNrIiwiZHkuQ2FtZXJhLm1vdmVGcm9udCIsImR5LkNhbWVyYS5yb3RhdGUiLCJkeS5DYW1lcmEuem9vbUluIiwiZHkuQ2FtZXJhLnpvb21PdXQiLCJkeS5DYW1lcmEucnVuIiwiZHkuQ2FtZXJhLnB1c2hNYXRyaXgiLCJkeS5DYW1lcmEucG9wTWF0cml4IiwiZHkuQ2FtZXJhLm9uU3RhcnRMb29wIiwiZHkuQ2FtZXJhLm9uRW5kTG9vcCIsImR5LkNhbWVyYS5fY29tcHV0ZU1vdmVEaXN0YW5jZSJdLCJtYXBwaW5ncyI6IkFBQUEsSUFBTyxFQUFFLENBZ0JSO0FBaEJELFdBQU8sRUFBRSxFQUFDLENBQUM7SUFDUEE7UUFJSUMsZUFBWUEsQ0FBZUEsRUFBRUEsQ0FBZUE7WUFBaENDLGlCQUFlQSxHQUFmQSxRQUFlQTtZQUFFQSxpQkFBZUEsR0FBZkEsUUFBZUE7WUFIckNBLE1BQUNBLEdBQVVBLElBQUlBLENBQUNBO1lBQ2hCQSxNQUFDQSxHQUFVQSxJQUFJQSxDQUFDQTtZQUduQkEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDWEEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7UUFDZkEsQ0FBQ0E7UUFFYUQsWUFBTUEsR0FBcEJBLFVBQXFCQSxDQUFTQSxFQUFFQSxDQUFTQTtZQUNyQ0UsSUFBSUEsR0FBR0EsR0FBR0EsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFFekJBLE1BQU1BLENBQUNBLEdBQUdBLENBQUNBO1FBQ2ZBLENBQUNBO1FBQ0xGLFlBQUNBO0lBQURBLENBZEFELEFBY0NDLElBQUFEO0lBZFlBLFFBQUtBLFFBY2pCQSxDQUFBQTtBQUNMQSxDQUFDQSxFQWhCTSxFQUFFLEtBQUYsRUFBRSxRQWdCUjs7QUNoQkQsSUFBTyxFQUFFLENBa0JSO0FBbEJELFdBQU8sRUFBRSxFQUFDLENBQUM7SUFDUEE7UUFLSUksa0JBQVlBLENBQVFBLEVBQUVBLENBQVFBLEVBQUVBLENBQVFBO1lBSmpDQyxNQUFDQSxHQUFVQSxJQUFJQSxDQUFDQTtZQUNoQkEsTUFBQ0EsR0FBVUEsSUFBSUEsQ0FBQ0E7WUFDaEJBLE1BQUNBLEdBQVVBLElBQUlBLENBQUNBO1lBR25CQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxD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WUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFFbkNBLEVBQUVBLENBQUFBLENBQUNBLFNBQVNBLENBQUNBLE1BQU1BLEdBQUdBLENBQUNBLENBQUNBLENBQUFBLENBQUNBO2dCQUNyQkEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQy9CQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDL0JBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEdBQUVBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ2xDQSxDQUFDQTtRQUNMQSxDQUFDQTtRQTdCYUQsY0FBTUEsR0FBcEJBO1lBQ0lFLElBQUlBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBO1lBRWJBLEVBQUVBLENBQUFBLENBQUNBLFNBQVNBLENBQUNBLE1BQU1BLEtBQUtBLENBQUNBLENBQUNBLENBQUFBLENBQUNBO2dCQUN2QkEsQ0FBQ0EsR0FBR0EsSUFBSUEsSUFBSUEsRUFBRUEsQ0FBQ0E7WUFDbkJBLENBQUNBO1lBQ0RBLElBQUlBLENBQUFBLENBQUNBO2dCQUNEQSxDQUFDQSxHQUFHQSxJQUFJQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUMzREEsQ0FBQ0E7WUFFREEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDYkEsQ0FBQ0E7UUFHREYsc0JBQUlBLDJCQUFNQTtpQkFBVkEsY0FBNEJHLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBO2lCQUNsREgsVUFBV0EsTUFBb0JBO2dCQUMzQkcsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsTUFB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LENBQUNBLENBQUNBLENBQUNBLEdBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBO2tCQUNqRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7WUFDMURBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUlBLENBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBO2tCQUNqRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7WUFDMURBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQU1BLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBO2tCQUNqRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDekRBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBO2tCQUNqRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFFekRBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUlBLENBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBO2tCQUNqRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7WUFDMURBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQU1BLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBO2tCQUNqRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7WUFDMURBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUlBLENBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBO2tCQUNqRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDekRBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBO2tCQUNqRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFFekRBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQU1BLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBO2tCQUMvREEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDdkRBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUlBLENBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBO2tCQUMvREEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDdkRBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBO2tCQUMvREEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDdkRBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBO2tCQUMvREEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFFdkRBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUlBLENBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBO2tCQUM3REEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDckRBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQU1BLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBO2tCQUM3REEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDckRBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBO2tCQUM3REEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDckRBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBO2tCQUM3REEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFFckRBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBO1lBQzdEQSxFQUFFQSxDQUFDQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDWkEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7WUFDaEJBLENBQUNBO1lBRURBLEdBQUdBLEdBQUdBLENBQUNBLEdBQUdBLEdBQUdBLENBQUNBO1lBQ2RBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLEVBQUVBLEVBQUVBLENBQUNBLEVBQUVBLEVBQUVBLENBQUNBO2dCQUN0QkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0E7WUFDeEJBLENBQUNBO1lBRURBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO1FBQ2hCQSxDQUFDQTtRQUVEUDs7OztXQUlHQTtRQUNJQSwwQkFBU0EsR0FBaEJBO1lBQ0lRLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1FBQ25DQSxDQUFDQTtRQUVEUjs7O1dBR0dBO1FBQ0lBLDBCQUFTQSxHQUFoQkE7WUFDSVMsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7WUFFVEEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7WUFFakJBLENBQUNBLEdBQUdBLENBQUNBLENBQUVBLENBQUNBLENBQUNBLENBQUNBO1lBQUVBLENBQUNBLENBQUVBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUVBLENBQUNBLENBQUNBLENBQUNBO1lBQUVBLENBQUNBLENBQUVBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ3RDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUFFQSxDQUFDQSxDQUFFQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUFFQSxDQUFDQSxDQUFFQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUN0Q0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFBRUEsQ0FBQ0EsQ0FBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7WUFBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDdENBLENBQUNBLEdBQUdBLENBQUNBLENBQUVBLENBQUNBLENBQUNBLENBQUNBO1lBQUVBLENBQUNBLENBQUVBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUVBLENBQUNBLENBQUNBLENBQUNBO1lBQUVBLENBQUNBLENBQUVBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ3RDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUFFQSxDQUFDQSxDQUFFQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTtZQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUN0Q0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7WUFBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7WUFBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFFdENBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO1FBQ2hCQSxDQUFDQTtRQUVEVDs7Ozs7O1dBTUdBO1FBQ0lBLDZCQUFZQSxHQUFuQkEsVUFBcUJBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBO1lBQ3hCVSxJQUFJQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQTtZQUNyQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsQ0FBQ0EsQ0FBQ0E7WUFBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDNUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUlBLENBQUNBLENBQUNBO1lBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQzVDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUM1Q0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDNUNBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO1FBQ2hCQSxDQUFDQTtRQUVEVjs7Ozs7O1dBTUdBO1FBQ0lBLDBCQUFTQSxHQUFoQkEsVUFBa0JBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBO1lBQ3JCVyxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxNQUFNQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUV4REEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7UUFDaEJBLENBQUNBO1FBRURYOzs7Ozs7OztXQVFHQTtRQUNJQSwwQkFBU0EsR0FBaEJBLFVBQWtCQSxLQUFhQSxFQUFFQSxDQUFTQSxFQUFFQSxDQUFTQSxFQUFFQSxDQUFRQTtZQUMzRFksSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBQ0E7WUFFbkRBLElBQUlBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLEtBQUtBLEdBQUdBLEdBQUdBLENBQUNBO1lBQ2xDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQTtZQUVqQkEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7WUFDcEJBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO1lBRXBCQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDaENBLHlCQUF5QkE7Z0JBQ3pCQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDUkEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ1hBLENBQUNBO2dCQUNEQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQUVBLENBQUNBLENBQUVBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDNUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFBRUEsQ0FBQ0EsQ0FBRUEsQ0FBQ0EsQ0FBQ0EsR0FBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUM1Q0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzVDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUNoREEsQ0FBQ0E7WUFBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3ZDQSx5QkFBeUJBO2dCQUN6QkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ1JBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO2dCQUNYQSxDQUFDQTtnQkFDREEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUFFQSxDQUFDQSxDQUFFQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzVDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQUVBLENBQUNBLENBQUVBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDNUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUVBLENBQUNBLENBQUNBLENBQUNBO2dCQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUM1Q0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDaERBLENBQUNBO1lBQUNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUN2Q0EseUJBQXlCQTtnQkFDekJBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO29CQUNSQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDWEEsQ0FBQ0E7Z0JBQ0RBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFBRUEsQ0FBQ0EsQ0FBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUM1Q0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUFFQSxDQUFDQSxDQUFFQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzVDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDNUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ2hEQSxDQUFDQTtZQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtnQkFDSkEsK0JBQStCQTtnQkFDL0JBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLEdBQUdBLENBQUNBLEdBQUNBLENBQUNBLEdBQUdBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUNqQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ1pBLFNBQVNBO29CQUNUQSxJQUFJQSxHQUFHQSxDQUFDQSxHQUFHQSxHQUFHQSxDQUFDQTtvQkFDZkEsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0E7b0JBQ1ZBLENBQUNBLElBQUlBLElBQUlBLENBQUNBO29CQUNWQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQTtnQkFDZEEsQ0FBQ0E7Z0JBRURBLEVBQUVBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUNYQSxFQUFFQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDWEEsRUFBRUEsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ1hBLEVBQUVBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUNYQSxFQUFFQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDWEEsRUFBRUEsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ1hBLEVBQUVBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUVYQSxDQUFDQSxDQUFFQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFDQSxDQUFDQSxHQUFDQSxFQUFFQSxHQUFJQSxDQUFDQSxDQUFDQTtnQkFDcEJBLENBQUNBLENBQUVBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUVBLEVBQUVBLEdBQUdBLEVBQUVBLENBQUNBO2dCQUNwQkEsQ0FBQ0EsQ0FBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBRUEsRUFBRUEsR0FBR0EsRUFBRUEsQ0FBQ0E7Z0JBQ3BCQSxDQUFDQSxDQUFFQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFFVkEsQ0FBQ0EsQ0FBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBRUEsRUFBRUEsR0FBR0EsRUFBRUEsQ0FBQ0E7Z0JBQ3BCQSxDQUFDQSxDQUFFQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFDQSxDQUFDQSxHQUFDQSxFQUFFQSxHQUFJQSxDQUFDQSxDQUFDQTtnQkFDcEJBLENBQUNBLENBQUVBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUVBLEVBQUVBLEdBQUdBLEVBQUVBLENBQUNBO2dCQUNwQkEsQ0FBQ0EsQ0FBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBRVZBLENBQUNBLENBQUVBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUVBLEVBQUVBLEdBQUdBLEVBQUVBLENBQUNBO2dCQUNwQkEsQ0FBQ0EsQ0FBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBRUEsRUFBRUEsR0FBR0EsRUFBRUEsQ0FBQ0E7Z0JBQ3BCQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFDQSxDQUFDQSxHQUFDQSxFQUFFQSxHQUFJQSxDQUFDQSxDQUFDQTtnQkFDcEJBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUVWQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDVkEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ1ZBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUNWQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUNkQSxDQUFDQTtZQUVEQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtRQUNoQkEsQ0FBQ0E7UUFFRFo7Ozs7Ozs7O1dBUUdBO1FBQ0lBLHVCQUFNQSxHQUFiQSxVQUFlQSxLQUFLQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQTtZQUN6QmEsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFFNURBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO1FBQ2hCQSxDQUFDQTtRQUVEYjs7Ozs7O1dBTUdBO1FBQ0lBLHlCQUFRQSxHQUFmQSxVQUFpQkEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7WUFDcEJjLElBQUlBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBO1lBQ3JCQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFJQSxDQUFDQSxDQUFDQTtZQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUM1Q0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsQ0FBQ0EsQ0FBQ0E7WUFBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDNUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQzVDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUM1Q0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7UUFDaEJBLENBQUNBO1FBRURkOzs7Ozs7V0FNR0E7UUFDSUEsc0JBQUtBLEdBQVpBLFVBQWNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBO1lBQ2pCZSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxNQUFNQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUVwREEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7UUFDaEJBLENBQUNBO1FBRU1mLDBCQUFTQSxHQUFoQkEsVUFBa0JBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLE9BQU9BLEVBQUVBLE9BQU9BLEVBQUVBLE9BQU9BLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBO1lBQ3hFZ0IsSUFBSUEsQ0FBQ0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsR0FBR0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsR0FBR0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBQ0E7WUFFcERBLEVBQUVBLEdBQUdBLE9BQU9BLEdBQUdBLElBQUlBLENBQUNBO1lBQ3BCQSxFQUFFQSxHQUFHQSxPQUFPQSxHQUFHQSxJQUFJQSxDQUFDQTtZQUNwQkEsRUFBRUEsR0FBR0EsT0FBT0EsR0FBR0EsSUFBSUEsQ0FBQ0E7WUFFcEJBLGVBQWVBO1lBQ2ZBLEdBQUdBLEdBQUdBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLEVBQUVBLEdBQUNBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUNBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUNBLEVBQUVBLENBQUNBLENBQUNBO1lBQzNDQSxFQUFFQSxJQUFJQSxHQUFHQSxDQUFDQTtZQUNWQSxFQUFFQSxJQUFJQSxHQUFHQSxDQUFDQTtZQUNWQSxFQUFFQSxJQUFJQSxHQUFHQSxDQUFDQTtZQUVWQSx1Q0FBdUNBO1lBQ3ZDQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxHQUFHQSxHQUFHQSxFQUFFQSxHQUFHQSxHQUFHQSxDQUFDQTtZQUN6QkEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsR0FBR0EsR0FBR0EsRUFBRUEsR0FBR0EsR0FBR0EsQ0FBQ0E7WUFDekJBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEdBQUdBLEdBQUdBLEVBQUVBLEdBQUdBLEdBQUdBLENBQUNBO1lBRXpCQSxlQUFlQTtZQUNmQSxHQUFHQSxHQUFHQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFDQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFDQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTtZQUMzQ0EsRUFBRUEsSUFBSUEsR0FBR0EsQ0FBQ0E7WUFDVkEsRUFBRUEsSUFBSUEsR0FBR0EsQ0FBQ0E7WUFDVkEsRUFBRUEsSUFBSUEsR0FBR0EsQ0FBQ0E7WUFFVkEsc0NBQXNDQTtZQUN0Q0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsQ0FBQ0E7WUFDdkJBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLENBQUNBO1lBQ3ZCQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxDQUFDQTtZQUV2QkEsZUFBZUE7WUFDZkEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7WUFDakJBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO1lBQ1ZBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO1lBQ1ZBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBO1lBQ1hBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBRVRBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO1lBQ1ZBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO1lBQ1ZBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBO1lBQ1hBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBRVRBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO1lBQ1ZBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO1lBQ1ZBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBO1lBQ1pBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBRVZBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ1ZBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ1ZBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ1ZBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBRVZBLFlBQVlBO1lBQ1pBLHNDQUFzQ0E7WUFDdENBLElBQUlBLENBQUNBLE1BQU1BLEdBQUdBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLE1BQU1BLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLE1BQU1BLENBQUNBO1lBRXRGQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtRQUNoQkEsQ0FBQ0E7UUFFRGhCOzs7Ozs7V0FNR0E7UUFDSUEsdUJBQU1BLEdBQWJBLFVBQWVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLE9BQU9BLEVBQUVBLE9BQU9BLEVBQUVBLE9BQU9BLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBO1lBQ3JFaUIsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsT0FBT0EsRUFBRUEsT0FBT0EsRUFBRUEsT0FBT0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFFeEdBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO1FBQ2hCQSxDQUFDQTtRQUdNakIseUJBQVFBLEdBQWZBLFVBQWlCQSxJQUFJQSxFQUFFQSxHQUFHQTtZQUN0QmtCLElBQUlBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBO1lBRXJCQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUNUQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUNUQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUNUQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUNUQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUNUQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUNUQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUNUQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUNUQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUNUQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUNUQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxJQUFJQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUN6QkEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDVkEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDVkEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDVkEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsR0FBR0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDcENBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBRVZBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO1FBQ2hCQSxDQUFDQTtRQUVNbEIsc0JBQUtBLEdBQVpBLFVBQWNBLENBQUNBLEVBQUVBLENBQUNBO1lBQ2RtQixJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxNQUFNQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUVqREEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7UUFDaEJBLENBQUNBO1FBRURuQjs7Ozs7OztXQU9HQTtRQUNJQSwrQkFBY0EsR0FBckJBLFVBQXVCQSxJQUFZQSxFQUFFQSxNQUFNQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQTtZQUNsRG9CLElBQUlBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBLEVBQUVBLEVBQUVBLEVBQ1pBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLEdBQUdBLEVBQ2RBLElBQUlBLEdBQUdBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBO1lBRXBCQSxHQUFHQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxLQUFLQSxHQUFHQSxJQUFJQSxNQUFNQSxLQUFLQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLENBQUNBLFNBQVNBLEVBQUVBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBO1lBQ2xGQSxHQUFHQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxNQUFNQSxFQUFFQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNwREEsR0FBR0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsRUFBRUEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsS0FBS0EsRUFBRUEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFFbERBLElBQUlBLElBQUlBLEdBQUdBLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLElBQUlBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBO1lBQ3BDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUNuQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ1ZBLEdBQUdBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBLEVBQUVBLElBQUlBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsU0FBU0EsRUFBRUEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDakVBLENBQUNBO1lBRURBLEVBQUVBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBO1lBQ3RCQSxFQUFFQSxHQUFHQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUV4QkEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7WUFFakJBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUlBLEVBQUVBLEdBQUdBLE1BQU1BLENBQUNBO1lBQ3BCQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFJQSxDQUFDQSxDQUFDQTtZQUNWQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFJQSxDQUFDQSxDQUFDQTtZQUNWQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFJQSxDQUFDQSxDQUFDQTtZQUVWQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFJQSxDQUFDQSxDQUFDQTtZQUNWQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFJQSxFQUFFQSxDQUFDQTtZQUNYQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFJQSxDQUFDQSxDQUFDQTtZQUNWQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFJQSxDQUFDQSxDQUFDQTtZQUVWQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFJQSxDQUFDQSxDQUFDQTtZQUNWQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFJQSxDQUFDQSxDQUFDQTtZQUNWQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxHQUFHQSxJQUFJQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTtZQUMzQkEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFFWEEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDVkEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDVkEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsR0FBR0EsR0FBR0EsR0FBR0EsRUFBRUEsQ0FBQ0E7WUFDN0JBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBRVZBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO1FBQ2hCQSxDQUFDQTtRQUVNcEIsNEJBQVdBLEdBQWxCQSxVQUFvQkEsSUFBSUEsRUFBRUEsTUFBTUEsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0E7WUFDdkNxQixJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxNQUFNQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQSxjQUFjQSxDQUFDQSxJQUFJQSxFQUFFQSxNQUFNQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUUxRUEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7UUFDaEJBLENBQUNBO1FBRU1yQiw0QkFBV0EsR0FBbEJBLFVBQW9CQSxLQUFZQTtZQUM1QnNCLElBQUlBLENBQUNBLEdBQUdBLElBQUlBLEVBQ1JBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBO1lBRWRBLDBDQUEwQ0E7WUFDdENBLFlBQVlBO1lBQ1pBLHFCQUFxQkE7WUFDckJBLHdFQUF3RUE7WUFDeEVBLElBQUlBLENBQUNBLE9BQU9BLEdBQUdBLENBQUNBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLE1BQU1BLENBQUNBO1lBRXhDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtRQUNoQkEsQ0FBQ0E7UUFFTXRCLHlCQUFRQSxHQUFmQSxVQUFnQkEsT0FBY0E7WUFDMUJ1QixJQUFJQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQSxPQUFPQSxFQUNuQkEsSUFBSUEsR0FBR0EsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0E7WUFDMUJBLElBQUlBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEVBQ2xEQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUNsREEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFDcERBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLEVBQ3REQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUNsREEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFDbERBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLEVBQ3BEQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTtZQUMzREEsSUFBSUEsSUFBSUEsR0FBR0EsSUFBSUEsWUFBWUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7WUFFaENBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ3hDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUN4Q0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDeENBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ3hDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUN4Q0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDeENBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ3hDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUN4Q0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDeENBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ3hDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUN6Q0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDekNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ3pDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUN6Q0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDekNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBRXpDQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtRQUMvQkEsQ0FBQ0E7UUFFTXZCLGdDQUFlQSxHQUF0QkEsVUFBdUJBLE1BQWNBO1lBQ2pDd0IsSUFBSUEsSUFBSUEsR0FBR0EsSUFBSUEsQ0FBQ0EsT0FBT0EsRUFDbkJBLElBQUlBLEdBQUdBLE1BQU1BLENBQUNBLE1BQU1BLENBQUNBO1lBQ3pCQSxJQUFJQSxNQUFNQSxHQUFHQSxFQUFFQSxDQUFDQTtZQUVoQkEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7WUFDM0ZBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBO1lBQzNGQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTtZQUM1RkEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFB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QUFNQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUMxQ0EsQ0FBQ0E7WUFDREEsSUFBSUEsQ0FBQUEsQ0FBQ0E7Z0JBQ0RBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLEVBQUVBLGdDQUFnQ0EsQ0FBQ0EsQ0FBQ0E7WUFDM0RBLENBQUNBO1FBQ0xBLENBQUNBO1FBMUJhRCxhQUFNQSxHQUFwQkEsVUFBcUJBLE1BQU1BLEVBQUVBLFVBQVVBO1lBQ25DRSxJQUFJQSxHQUFHQSxHQUFHQSxJQUFJQSxJQUFJQSxDQUFDQSxNQUFNQSxFQUFFQSxVQUFVQSxDQUFDQSxDQUFDQTtZQUV2Q0EsTUFBTUEsQ0FBQ0EsR0FBR0EsQ0FBQ0E7UUFDZkEsQ0FBQ0E7UUF3Qk1GLHVCQUFNQSxHQUFiQTtZQUNJRyxJQUFJQSxTQUFTQSxHQUFHQSxJQUFJQSxFQUNoQkEsU0FBU0EsR0FBR0EsSUFBSUEsQ0FBQ0E7WUFFckJBLElBQUlBLENBQUNBLE1BQU1BLEdBQUdBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBO1lBRTFCQSxFQUFFQSxDQUFBQSxDQUFDQSxJQUFJQSxDQUFDQSw2QkFBNkJBLEVBQUVBLENBQUNBLENBQUFBLENBQUNBO2dCQUNyQ0EsU0FBU0EsR0FBR0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsT0FBT0EsRUFBRUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7Z0JBQ2hEQSxTQUFTQSxHQUFHQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQTtnQkFFL0JBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLFNBQVNBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUNoRUEsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsRUFBRUEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2xHQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxTQUFTQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNwRUEsQ0FBQ0E7WUFDREEsSUFBSUEsQ0FBQUEsQ0FBQ0E7Z0JBQ0RBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLEVBQUVBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ3RHQSxDQUFDQTtRQUNMQSxDQUFDQTtRQUVPSCw4Q0FBNkJBLEdBQXJDQTtZQUNJSSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQTttQkFDM0JBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBO21CQUMzQkEsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7UUFDdkNBLENBQUNBO1FBQ0xKLGFBQUNBO0lBQURBLENBckRBbkUsQUFx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QUVBLElBQUlBLEVBQUdBLElBQUlBLEVBQUVBLEVBQUVBLEVBQUVBLElBQUlBLEVBQUdBLElBQUlBLEVBQUVBLEVBQUVBLEVBQUVBLEtBQUtBO2dCQUNyRUEsSUFBSUEsRUFBRUEsRUFBRUEsRUFBRUEsS0FBS0EsRUFBR0EsSUFBSUEsRUFBRUEsRUFBRUEsRUFBRUEsSUFBSUEsRUFBR0EsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBR0EsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsS0FBS0E7Z0JBQ3ZFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFHQSxLQUFLQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFHQSxLQUFLQSxFQUFFQSxJQUFJQSxFQUFFQSxLQUFLQSxFQUFHQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxLQUFLQTtnQkFDN0VBLEtBQUtBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUdBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUdBLElBQUlBLEVBQUVBLEVBQUVBLEVBQUVBLElBQUlBLEVBQUdBLEtBQUtBLEVBQUVBLEVBQUVBLEVBQUVBLElBQUlBLENBQUFBLG1CQUFtQkE7YUFDN0ZBLENBQUNBLEVBQ0ZBLENBQUNBLEVBQUVBLGFBQVVBLENBQUNBLEtBQUtBLENBQUNBLENBQUFBO1FBQzVCQSxDQUFDQTtRQUVTSCwwQ0FBb0JBLEdBQTlCQTtZQUNJSSxNQUFNQSxDQUFDQSxnQkFBYUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsV0FBV0EsQ0FBQ0E7Z0JBQ3hDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQTtnQkFDbEJBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEVBQUlBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBO2dCQUNsQkEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBQ0EsRUFBRUEsRUFBSUEsQ0FBQ0EsRUFBQ0EsRUFBRUEs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QUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUVBLFdBQVdBO2dCQUN0Q0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3pCQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQTtZQUM3QkEsQ0FBQ0E7WUFFREEsTUFBTUE7WUFDTkEsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsR0FBR0EsRUFBRUEsTUFBTUEsQ0FBQ0EsQ0FBQ0E7WUFDN0JBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLEdBQUdBLEVBQUVBLE1BQU1BLENBQUNBLENBQUNBO1lBQzdCQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxHQUFHQSxFQUFFQSxNQUFNQSxDQUFDQSxDQUFDQTtZQUU3QkEsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFFdERBLElBQUlBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEVBQ1pBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEVBQ1pBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEVBQ1pBLElBQUlBLEdBQUVBLElBQUlBLENBQUNBLEtBQUtBLEVBQ2hCQSxJQUFJQSxHQUFFQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxDQUFDQSxFQUNwQkEsSUFBSUEsR0FBRUEsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFFekJBLElBQUlBLEdBQUdBLEdBQUVBO2dCQUNMQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQTthQUNsQkEsQ0FBQ0E7WUFDRkEsSUFBSUEsR0FBR0EsR0FBRUE7Z0JBQ0xBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBO2FBQ25CQSxDQUFDQTtZQUNGQSxJQUFJQSxHQUFHQSxHQUFFQTtnQkFDTEEsSUFBSUEsRUFBRUEsR0FBR0EsRUFBRUEsSUFBSUE7YUFDbEJBLENBQUNBO1lBQ0ZBLElBQUlBLEdBQUdBLEdBQUVBO2dCQUNMQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQTthQUNsQkEsQ0FBQ0E7WUFFRkEsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBRUEsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFJM0JBLFNBQVNBO1lBQ1RBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLEVBQUVBLEVBQUNBLEdBQUdBLEVBQUNBLEdBQUdBLEVBQUNBLEdBQUdBLEVBQUVBLEtBQUtBLEdBQUNBLENBQUNBLEVBQUVBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLG1CQUFtQkE7WUFDckVBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLEdBQUdBLEVBQUNBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEtBQUtBLEdBQUNBLENBQUNBLEVBQUVBLE1BQU1BLENBQUNBLENBQUNBO1lBQ3BEQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxHQUFHQSxFQUFFQSxFQUFFQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxLQUFLQSxHQUFDQSxDQUFDQSxFQUFFQSxNQUFNQSxDQUFDQSxDQUFDQTtZQUNwREEsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsRUFBRUEsRUFBRUEsR0FBR0EsRUFBRUEsS0FBS0EsR0FBQ0EsQ0FBQ0EsRUFBRUEsTUFBTUEsQ0FBQ0EsQ0FBQ0E7UUFDeERBLENBQUNBO1FBRU9OLDJDQUFVQSxHQUFsQkEsVUFBbUJBLENBQVVBLEVBQUVBLE1BQWFBO1lBQ3hDTyxJQUFJQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUNiQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUMxQ0EsQ0FBQ0E7WUFFRkEsRUFBRUEsQ0FBQUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQUEsQ0FBQ0E7Z0JBQ1JBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO1lBQ3JCQSxDQUFDQTtZQUVEQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxNQUFNQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUN6QkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsTUFBTUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDekJBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLE1BQU1BLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBRXpCQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNiQSxDQUFDQTtRQUNMUCw2QkFBQ0E7SUFBREEsQ0E5SkFuTSxBQThKQ21NLElBQUFuTTtBQUNMQSxDQUFDQSxFQXBUTSxFQUFFLEtBQUYsRUFBRSxRQW9UUjs7Ozs7Ozs7QUNyVEQsMkNBQTJDO0FBQzNDLElBQU8sRUFBRSxDQTBDUjtBQTFDRCxXQUFPLEVBQUUsRUFBQSxDQUFDO0lBQ05BO1FBQXNDMk0sb0NBQVFBO1FBWTFDQSwwQkFBWUEsS0FBWUEsRUFBRUEsTUFBYUEsRUFBRUEsUUFBcUJBO1lBQzFEQyxrQkFBTUEsUUFBUUEsQ0FBQ0EsQ0FBQ0E7WUFKWkEsV0FBTUEsR0FBVUEsSUFBSUEsQ0FBQ0E7WUFDckJBLFlBQU9BLEdBQVVBLElBQUlBLENBQUNBO1lBSzFCQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxLQUFLQSxDQUFDQTtZQUNwQkEsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsTUFBTUEsQ0FBQ0E7UUFDMUJBLENBQUNBO1FBaEJhRCx1QkFBTUEsR0FBcEJBLFVBQXFCQSxLQUFZQSxFQUFFQSxNQUFhQSxFQUFFQSxRQUFxQkE7WUFDbkVFLElBQUlBLElBQUlBLEdBQUdBLElBQUlBLElBQUlBLENBQUNBLEtBQUtBLEVBQUVBLE1BQU1BLEVBQUVBLFFBQVFBLENBQUNBLENBQUNBO1lBRTdDQSxJQUFJQSxDQUFDQSxjQUFjQSxFQUFFQSxDQUFDQTtZQUV0QkEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7UUFDaEJBLENBQUNBO1FBWVNGLGdEQUFxQkEsR0FBL0JBO1lBQ0lHLElBQUlBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLE1BQU1BLEVBQ25CQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQSxPQUFPQSxFQUNyQkEsSUFBSUEsR0FBR0EsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsRUFDakJBLEtBQUtBLEdBQUdBLEtBQUtBLEdBQUdBLENBQUNBLEVBQ2pCQSxFQUFFQSxHQUFHQSxNQUFNQSxHQUFHQSxDQUFDQSxFQUNmQSxJQUFJQSxHQUFHQSxDQUFDQSxNQUFNQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUV2QkEsTUFBTUEsQ0FBQ0EsY0FBV0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsWUFBWUEsQ0FBQ0E7Z0JBQ25DQSxHQUFHQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQTtnQkFDVkEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsQ0FBQ0E7Z0JBQ2JBLEtBQUtBLEVBQUVBLElBQUlBLEVBQUVBLENBQUNBO2FBQ2pCQSxDQUFDQSxFQUNGQSxDQUFDQSxFQUFFQSxhQUFVQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFBQTtRQUM1QkEsQ0FBQ0E7UUFFU0gsK0NBQW9CQSxHQUE5QkE7WUFDSUksTUFBTUEsQ0FBQ0EsZ0JBQWFBLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLFVBQVVBLENBQUNBO2dCQUN2Q0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7YUFDVkEsQ0FBQ0EsRUFBRUEsYUFBVUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsQ0FBQUE7UUFDakNBLENBQUNBO1FBQ0xKLHVCQUFDQTtJQUFEQSxDQXhDQTNNLEFBd0NDMk0sRUF4Q3FDM00sV0FBUUEsRUF3QzdDQTtJQXhDWUEsbUJBQWdCQSxtQkF3QzVCQSxDQUFBQTtBQUNMQSxDQUFDQSxFQTFDTSxFQUFFLEtBQUYsRUFBRSxRQTBDUjs7QUMzQ0QsOENBQThDO0FBQzlDLElBQU8sRUFBRSxDQW1OUjtBQW5ORCxXQUFPLEVBQUUsRUFBQSxDQUFDO0lBTU5BO1FBQUFnTjtZQU9ZQyxpQkFBWUEsR0FBYUEsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0E7UUFxTXhEQSxDQUFDQTtRQTNNaUJELHVCQUFNQSxHQUFwQkE7WUFDQ0UsSUFBSUEsR0FBR0EsR0FBR0EsSUFBSUEsSUFBSUEsRUFBRUEsQ0FBQ0E7WUFFckJBLE1BQU1BLENBQUNBLEdBQUdBLENBQUNBO1FBQ1pBLENBQUNBO1FBSU1GLHNDQUFXQSxHQUFsQkEsVUFBbUJBLFNBQW1CQSxFQUFFQSxJQUF1QkE7WUFDM0RHLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLFdBQVdBO1lBQ3pCQSw0Q0FBNENBO1lBQzVDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxFQUFFQSxTQUFTQSxDQUFDQSxFQUN0Q0EsSUFBSUEsQ0FDUEEsQ0FBQ0E7UUFDTkEsQ0FBQ0E7UUFNTUgsbUNBQVFBLEdBQWZBLFVBQWdCQSxJQUFJQTtZQUNoQkksSUFBSUEsSUFBSUEsR0FBR0EsSUFBSUEsQ0FBQ0E7WUFDaEJBLEVBQUVBO1lBQ0ZBLHlFQUF5RUE7WUFDekVBLHVEQUF1REE7WUFDdkRBLEtBQUtBO1lBQ0xBLEVBQUVBO1lBQ0ZBLEVBQUVBLENBQUFBLENBQUNBLFNBQVNBLENBQUNBLE1BQU1BLEtBQUtBLENBQUNBLElBQUlBLGFBQVVBLENBQUNBLFFBQVFBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUFBLENBQUNBO2dCQUM1REEsSUFBSUEsU0FBU0EsR0FBR0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBRTdCQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxRQUFRQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQTtZQUNqREEsQ0FBQ0E7WUFDREEsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsTUFBTUEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQUEsQ0FBQ0E7Z0JBQzVCQSxJQUFJQSxNQUFNQSxHQUFHQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFFMUJBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLE1BQU1BLENBQUNBLFVBQUNBLElBQW9CQSxFQUFFQSxHQUFVQTtvQkFDN0RBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLEdBQUdBLEVBQUVBLE1BQU1BLEVBQUVBLElBQUlBLENBQUNBLENBQUNBO2dCQUM1Q0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDUEEsQ0FBQ0E7WUFDREEsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsTUFBTUEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQUEsQ0FBQ0E7Z0JBQzVCQSxJQUFJQSxNQUFNQSxHQUFHQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUNyQkEsU0FBU0EsR0FBR0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBRTdCQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxRQUFR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Q0EsSUFBSUEsQ0FBQ0EsUUFBUUEsRUFBRUEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQUEsQ0FBQ0E7b0JBQ3RCQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxXQUFXQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQTtnQkFDN0NBLENBQUNBO1lBQ0xBLENBQUNBO1lBQ0RBLElBQUlBLENBQUNBLEVBQUVBLENBQUFBLENBQUNBLFNBQVNBLENBQUNBLE1BQU1BLEtBQUtBLENBQUNBLElBQUlBLGFBQVVBLENBQUNBLFFBQVFBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUFBLENBQUNBO2dCQUNqRUEsSUFBSUEsR0FBR0EsR0FBR0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFDbEJBLFNBQVNBLEdBQUdBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUU3QkEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsR0FBR0EsRUFBRUEsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDbEVBLENBQUNBO1lBQ0RBLElBQUlBLENBQUNBLEVBQUVBLENBQUFBLENBQUNBLFNBQVNBLENBQUNBLE1BQU1BLEtBQUtBLENBQUNBLENBQUNBLENBQUFBLENBQUNBO2dCQUM1QkEsSUFBSUEsTUFBTUEsR0FBR0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBRTFCQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxXQUFXQSxDQUFDQSxVQUFDQSxJQUFvQkEsRUFBRUEsR0FBVUE7b0JBQzNEQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxHQUFHQSxFQUFFQSxNQUFNQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQTtnQkFDNUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ1BBLENBQUNBO1lBQ0RBLElBQUlBLENBQUNBLEVBQUVBLENBQUFBLENBQUNBLFNBQVNBLENBQUNBLE1BQU1BLEtBQUtBLENB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UUFDUEEsRUFBRUEsRUFBRUEsR0FBR0E7UUFDUEEsRUFBRUEsRUFBRUEsR0FBR0E7UUFDUEEsRUFBRUEsRUFBRUEsR0FBR0E7UUFDUEEsRUFBRUEsRUFBRUEsR0FBR0E7UUFDUEEsRUFBRUEsRUFBRUEsR0FBR0E7UUFDUEEsRUFBRUEsRUFBRUEsR0FBR0E7UUFDUEEsRUFBRUEsRUFBRUEsR0FBR0E7UUFDUEEsRUFBRUEsRUFBRUEsR0FBR0E7UUFDUEEsRUFBRUEsRUFBRUEsR0FBR0E7UUFDUEEsRUFBRUEsRUFBRUEsR0FBR0E7UUFDUEEsRUFBRUEsRUFBRUEsR0FBR0E7UUFDUEEsRUFBRUEsRUFBRUEsR0FBR0E7UUFDUEEsRUFBRUEsRUFBRUEsR0FBR0E7UUFDUEEsRUFBRUEsRUFBRUEsR0FBR0E7UUFDUEEsRUFBRUEsRUFBRUEsR0FBR0E7UUFDUEEsRUFBRUEsRUFBRUEsR0FBR0E7UUFDUEEsRUFBRUEsRUFBRUEsR0FBR0E7UUFDUEEsRUFBRUEsRUFBRUEsR0FBR0E7UUFDUEEsRUFBRUEsRUFBRUEsR0FBR0E7UUFDUEEsRUFBRUEsRUFBRUEsR0FBR0E7UUFDUEEsRUFBRUEsRUFBRUEsR0FBR0E7UUFDUEEsRUFBRUEsRUFBRUEsR0FBR0E7UUFDUEEsRUFBRUEsRUFBRUEsR0FBR0E7UUFDUEEsRUFBRUEsRUFBRUEsR0FBR0E7UUFDUEEsRUFBRUEsRUFBRUEsR0FBR0E7UUFDUEEsRUFBRUEsRUFBRUEsR0FBR0E7UUFDUEEsRUFBRUEsRUFBRUEsR0FBR0E7UUFDUEEsRUFBRUEsRUFBRUEsR0FBR0E7UUFDUEEsRUFBRUEsRUFBRUEsR0FBR0E7UUFDUEEsRUFBRUEsRUFBRUEsR0FBR0E7UUFDUEEsRUFBRUEsRUFBRUEsR0FBR0E7UUFDUEEsR0FBR0EsRUFBRUEsR0FBR0E7UUFDUkEsR0FBR0EsRUFBRUEsR0FBR0E7UUFDUkEsR0FBR0EsRUFBRUEsR0FBR0E7UUFDUkEsR0FBR0EsRUFBRUEsR0FBR0E7UUFDUkEsR0FBR0EsRUFBRUEsR0FBR0E7UUFDUkEsR0FBR0EsRUFBRUEsR0FBR0E7UUFDUkEsR0FBR0EsRUFBRUEsR0FBR0E7UUFDUkEsR0FBR0EsRUFBRUEsR0FBR0E7UUFDUkEsR0FBR0EsRUFBRUEsR0FBR0E7UUFDUkEsR0FBR0EsRUFBRUEsR0FBR0E7UUFDUkEsR0FBR0EsRUFBRUEsR0FBR0E7UUFDUkEsR0FBR0EsRUFBRUEsSUFBSUE7UUFDVEEsR0FBR0EsRUFBRUEsSUFBSUE7UUFDVEEsR0FBR0EsRUFBRUEsSUFBSUE7UUFDVEEsR0FBR0EsRUFBRUEsSUFBSUE7UUFDVEEsR0FBR0EsRUFBRUEsSUFBSUE7UUFDVEEsR0FBR0EsRUFBRUEsSUFBSUE7UUFDVEEsR0FBR0EsRUFBRUEsSUFBSUE7UUFDVEEsR0FBR0EsRUFBRUEsSUFBSUE7UUFDVEEsR0FBR0EsRUFBRUEsSUFBSUE7UUFDVEEsR0FBR0EsRUFBRUEsS0FBS0E7UUFDVkEsR0FBR0EsRUFBRUEsS0FBS0E7UUFDVkEsR0FBR0EsRUFBRUEsS0FBS0E7UUFDVkEsR0FBR0EsRUFBRUEsU0FBU0E7UUFDZEEsR0FBR0EsRUFBRUEsUUFBUUE7UUFDYkEsR0FBR0EsRUFBRUEsR0FBR0E7UUFDUkEsR0FBR0EsRUFBRUEsR0FBR0E7UUFDUkEsR0FBR0EsRUFBRUEsR0FBR0E7UUFDUkEsR0FBR0EsRUFBRUEsR0FBR0E7UUFDUkEsR0FBR0EsRUFBRUEsR0FBR0E7UUFDUkEsR0FBR0EsRUFBRUEsR0FBR0E7UUFDUkEsR0FBR0EsRUFBRUEsR0FBR0E7UUFDUkEsR0FBR0EsRUFBRUEsR0FBR0E7UUFDUkEsR0FBR0EsRUFBRUEsR0FBR0E7UUFDUkEsR0FBR0EsRUFBRUEsSUFBSUE7UUFDVEEsR0FBR0EsRUFBRUEsR0FBR0E7UUFDUkEsR0FBR0EsRUFBRUEsR0FBR0E7S0FDWEEsRUFDREEsYUFBYUEsR0FBR0E7UUFDWkEsR0FBR0EsRUFBRUEsR0FBR0E7UUFDUkEsR0FBR0EsRUFBRUEsR0FBR0E7UUFDUkEsR0FBR0EsRUFBRUEsR0FBR0E7UUFDUkEsR0FBR0EsRUFBRUEsR0FBR0E7UUFDUkEsR0FBR0EsRUFBRUEsR0FBR0E7UUFDUkEsR0FBR0EsRUFBRUEsR0FBR0E7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LENBQUNBLFNBQVNBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUFBLENBQUNBO2dCQUM5RkEsSUFBSUEsTUFBTUEsR0FBR0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFDckJBLE9BQUtBLEdBQUdBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLEVBQ3BCQSxZQUFZQSxHQUFHQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxLQUFLQSxLQUFLQSxDQUFDQSxHQUFHQSxLQUFLQSxHQUFHQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUM3REEsU0FBU0EsR0FBR0EsT0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0E7Z0JBRTNCQSxNQUFNQSxDQUFDQSxzQkFBbUJBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsU0FBU0EsQ0FBQ0E7cUJBQ25EQSxPQUFPQSxDQUFDQSxNQUFNQSxFQUFFQSxPQUFLQSxFQUFFQSxZQUFZQSxDQUFDQSxDQUFDQTtZQUM5Q0EsQ0FBQ0E7WUFDREEsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsTUFBTUEsS0FBS0EsQ0FBQ0EsSUFBSUEsU0FBU0EsQ0FBQ0EsTUFBTUEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQUEsQ0FBQ0E7Z0JBQ3REQSxJQUFJQSxNQUFNQSxHQUFHQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUNyQkEsT0FBS0EsR0FBR0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFDcEJBLFFBQVFBLEdBQUdBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLEVBQ3ZCQSxZQUFZQSxHQUFHQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxLQUFLQSxLQUFLQSxDQUFDQSxHQUFHQSxLQUFLQSxHQUFHQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUM3REEsU0FBU0EsR0FBR0EsT0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0E7Z0JBRTNCQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxLQUFLQSxDQUFDQSxTQUFTQSxL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LENBQUNBO2dCQUU1QkEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7WUFDbkNBLENBQUNBO1lBQ0RBLElBQUlBLENBQUNBLEVBQUVBLENBQUFBLENBQUNBLFNBQVNBLENBQUNBLE1BQU1BLEtBQUtBLENBQUNBLElBQUlBLGFBQVVBLENBQUNBLFFBQVFBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLElBQUlBLGFBQVVBLENBQUNBLFVBQVVBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUFBLENBQUNBO2dCQUN4R0EsSUFBSUEsU0FBU0EsR0FBR0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFDeEJBLE9BQU9BLEdBQUdBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLEVBQ3RCQSxRQUFRQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFFakJBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLEVBQUVBLENBQUNBLFNBQVNBLEVBQUVBLE9BQU9BLEVBQUVBLFFBQVFBLENBQUNBLENBQUNBO1lBQ3ZEQSxDQUFDQTtZQUNEQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFBQSxDQUFDQSxTQUFTQSxDQUFDQSxNQUFNQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFBQSxDQUFDQTtnQkFDNUJBLElBQUlBLE1BQU1BLEdBQUdBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLEVBQ3JCQSxRQUFRQSxHQUFHQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFFNUJBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLEVBQUVBLENBQUNBLE1BQU1BLEVBQUVBLFFBQVFBLENBQUNBLENBQUNBO1lBQzNDQSxDQUFDQTtZQUNEQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFBQSxDQUFDQSxTQUFTQSxDQUFDQSxNQUFNQSxLQUFLQSxDQUFDQSxJQUFJQSxhQUFVQSxDQUFDQSxRQUFRQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxhQUFVQSxDQUFDQSxVQUFVQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxhQUFVQSxDQUFDQSxRQUFRQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFBQSxDQUFDQTtnQkFDN0lBLElBQUlBLFNBQVNBLEdBQUdBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLEVBQ3hCQSxPQUFPQSxHQUFHQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUN0QkEsUUFBUUEsR0FBR0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBRTVCQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxFQUFFQSxDQUFDQSxTQUFTQSxFQUFFQSxPQUFPQSxFQUFFQSxRQUFRQSxDQUFDQSxDQUFDQTtZQUN2REEsQ0FBQ0E7WUFDREEsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsTUFBTUEsS0FBS0EsQ0FBQ0EsSUFBSUEsU0FBU0EsQ0FBQ0EsTUFBTUEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQUEsQ0FBQ0E7Z0JBQ3REQSxJQUFJQSxNQUFNQSxHQUFHQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUNyQkEsU0FBU0EsR0FBR0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFDeEJBLE9BQU9BLEdBQUdBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLEVBQ3RCQSxRQUFRQSxHQUFHQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxLQUFLQSxTQUFTQSxHQUFFQSxDQUFDQSxHQUFFQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFFM0RBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLEVBQUVBLENBQUNBLE1BQU1BLEVBQUVBLFNBQVNBLEVBQUVBLE9BQU9BLEVBQUVBLFFBQVFBLENBQUNBLENBQUNBO1lBQy9EQSxDQUFDQTtRQUNMQSxDQUFDQTtRQVNhRixnQkFBR0EsR0FBakJBO1lBQ0lHLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLEdBQUdBLENBQUNBLEtBQUtBLENBQ3ZCQSxJQUFJQSxDQUFDQSxZQUFZQSxFQUNqQkEsS0FBS0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FDM0NBLENBQUNBO1FBQ05BLENBQUNBO1FBT2FILG9CQUFPQSxHQUFyQkEsVUFBc0JBLElBQUlBO1lBQ3RCSSxJQUFJQSxDQUFDQSxnQkFBZ0JBLENBQUNBLE9BQU9BLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLGdCQUFnQkEsRUFBRUEsS0FBS0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDekdBLENBQUNBO1FBRWFKLHNCQUFTQSxHQUF2QkEsVUFBd0JBLE1BQWlCQSxFQUFFQSxLQUFXQSxFQUFFQSxRQUFhQTtZQUNqRUssSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxTQUFTQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLEVBQUVBLEtBQUtBLENBQUNBLFNBQVNBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLFNBQVNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1FBQzNHQSxDQUFDQTtRQUVhTCxpQkFBSUEsR0FBbEJBLFVBQW1CQSxNQUFpQkEsRUFBRUEsS0FBV0EsRUFBRUEsUUFBYUE7WUFDNURNLElBQUlBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxFQUFFQSxLQUFLQSxDQUFDQSxTQUFTQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUN0R0EsQ0FBQ0E7UUFPYU4sc0JBQVNBLEdBQXZCQSxVQUF3QkEsSUFBSUE7WUFDeEJPLElBQUlBLFVBQVVBLEdBQUdBLElBQUlBLEVBQ2pCQSxhQUFhQSxHQUFHQSxJQUFJQSxDQUFDQTtZQUV6QkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsTUFBTUEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3pCQSxJQUFJQSxTQUFTQSxHQUFHQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFFN0JBLFVBQVVBLEdBQUdBLFVBQVVBLE9BQU9BO29CQUMxQixZQUFZLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDeEMsQ0FBQyxDQUFDQTtnQkFDRkEsYUFBYUEsR0FBR0EsVUFBVUEsT0FBT0E7b0JBQzdCLFlBQVksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUN6QyxDQUFDLENBQUNBO1lBQ05BLENBQUNBO1lBQ0RBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLFNBQVNBLENBQUNBLE1BQU1BLEtBQUtBLENBQUNBLElBQUlBLGFBQVVBLENBQUNBLFFBQVFBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUNuRUEsSUFBSUEsU0FBU0EsR0FBR0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFDeEJBLFFBQVFBLEdBQUdBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUU1QkEsVUFBVUEsR0FBR0EsVUFBVUEsT0FBT0E7b0JBQzFCLFlBQVksQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDbEQsQ0FBQyxDQUFDQTtnQkFDRkEsYUFBYUEsR0FBR0EsVUFBVUEsT0FBT0E7b0JBQzdCLFlBQVksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUN6QyxDQUFDLENBQUNBO1lBQ05BLENBQUNBO1lBQ0RBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLFNBQVNBLENBQUNBLE1BQU1BLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUM5QkEsSUFBSUEsTUFBTUEsR0FBR0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFDckJBLFNBQVNBLEdBQUdBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUU3QkEsVUFBVUEsR0FBR0EsVUFBVUEsT0FBT0E7b0JBQzFCLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDaEQsQ0FBQyxDQUFDQTtnQkFDRkEsYUFBYUEsR0FBR0EsVUFBVUEsT0FBT0E7b0JBQzdCLFlBQVksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDakQsQ0FBQyxDQUFDQTtZQUNOQSxDQUFDQTtZQUNEQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxTQUFTQSxDQUFDQSxNQUFNQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDOUJBLElBQUlBLE1BQU1BLEdBQUdBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLEVBQ3JCQSxTQUFTQSxHQUFHQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUN4QkEsUUFBUUEsR0FBR0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBRTVCQSxVQUFVQSxHQUFHQSxVQUFVQSxPQUFPQTtvQkFDMUIsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDMUQsQ0FBQyxDQUFDQTtnQkFDRkEsYUFBYUEsR0FBR0EsVUFBVUEsT0FBT0E7b0JBQzdCLFlBQVksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDakQsQ0FBQyxDQUFDQTtZQUNOQSxDQUFDQTtZQUVEQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLENBQUNBLFVBQVVBLEVBQUVBLGFBQWFBLENBQUNBLENBQUNBO1FBQzVEQSxDQUFDQTtRQUVhUCw0QkFBZUEsR0FBN0JBLFVBQThCQSxNQUFpQkEsRUFBRUEsTUFBVUE7WUFDdkRRLGdCQUFhQSxDQUFDQSxXQUFXQSxFQUFFQSxDQUFDQSxlQUFlQSxDQUFDQSxNQUFNQSxFQUFFQSxNQUFNQSxDQUFDQSxDQUFDQTtZQUM1REEsd0RBQXdEQTtRQUM1REEsQ0FBQ0E7UUFuSkRSLHNEQUFzREE7UUFDdERBLEVBQUVBO1FBQ0ZBLHNDQUFzQ0E7UUFDdENBLG9DQUFvQ0E7UUFDcENBLHNDQUFzQ0E7UUFDdENBLDRDQUE0Q0E7UUFDNUNBLE9BQU9BO1FBQ1BBLDRCQUE0QkE7UUFDNUJBLEdBQUdBO1FBRVlBLHlCQUFZQSxHQUFlQSxjQUFXQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQTtRQUNoREEsNkJBQWdCQSxHQUFtQkEsa0JBQWVBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBO1FBK0kvRUEsbUJBQUNBO0lBQURBLENBM0pBNVYsQUEySkM0VixJQUFBNVY7SUEzSllBLGVBQVlBLGVBMkp4QkEsQ0FBQUE7QUFDTEEsQ0FBQ0EsRUF2TE0sRUFBRSxLQUFGLEVBQUUsUUF1TFI7O0FDeExELDJDQUEyQztBQUMzQyxJQUFPLEVBQUUsQ0FrUVI7QUFsUUQsV0FBTyxFQUFFLEVBQUMsQ0FBQztJQUNQQTtRQXlDSXFXO1lBdENRQyxTQUFJQSxHQUFVQSxJQUFJQSxDQUFDQTtZQVMzQkEsK0RBQStEQTtZQUN2REEsY0FBU0EsR0FBWUEsSUFBSUEsQ0FBQ0E7WUFTMUJBLFlBQU9BLEdBQWNBLElBQUlBLENBQUNBO1lBUzFCQSxrQkFBYUEsR0FBY0EsSUFBSUEsQ0FBQ0E7WUFRaENBLGNBQVNBLEdBQW1CQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQTtZQUd6REEsSUFBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsVUFBVUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7WUFDOUJBLFVBQVVBLENBQUNBLE1BQU1BLElBQUlBLENBQUNBLENBQUNBO1FBQzNCQSxDQUFDQTtRQXhDREQsc0JBQUlBLDJCQUFHQTtpQkFBUEE7Z0JBQ0lFLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBO1lBQ3JCQSxDQUFDQTtpQkFFREYsVUFBUUEsR0FBVUE7Z0JBQ2RFLElBQUlBLENBQUNBLElBQUlBLEdBQUdBLEdBQUdBLENBQUNBO1lBQ3BCQSxDQUFDQTs7O1dBSkFGO1FBUURBLHNCQUFJQSxnQ0FBUUE7aUJBQVpBO2dCQUNJRyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQTtZQUMxQkEsQ0FBQ0E7aUJBRURILFVBQWFBLFFBQWlCQTtnQkFDMUJHLElBQUlBLENBQUNBLFNBQVNBLEdBQUdBLFFBQVFBLENBQUNBO1lBQzlCQSxDQUFDQTs7O1dBSkFIO1FBT0RBLHNCQUFJQSw4QkFBTUE7aUJBQVZBO2dCQUNJSSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQTtZQUN4QkEsQ0FBQ0E7aUJBRURKLFVBQVdBLE1BQWlCQTtnQkFDeEJJLElBQUlBLENBQUNBLE9BQU9BLEdBQUdBLE1BQU1BLENBQUNBO1lBQzFCQSxDQUFDQTs7O1dBSkFKO1FBT0RBLHNCQUFJQSxvQ0FBWUE7aUJBQWhCQTtnQkFDSUssTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0E7WUFDOUJBLENBQUNBO2lCQUNETCxVQUFpQkEsWUFBdUJBO2dCQUNwQ0ssSUFBSUEsQ0FBQ0EsYUFBYUEsR0FBR0EsWUFBWUEsQ0FBQ0E7WUFDdENBLENBQUNBOzs7V0FIQUw7UUFZTUEseUJBQUlBLEdBQVhBO1lBQ0lNLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLEVBQUVBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBLGVBQWVBLENBQUNBLENBQUNBO1FBQ3hEQSxDQUFDQTtRQUVETjs7V0FFR0E7UUFDSUEsNEJBQU9BLEdBQWRBO1lBQ0lPLElBQUlBLENBQUNBLE1BQU1BLEdBQUdBLElBQUlBLENBQUNBO1lBQ25CQSxlQUFZQSxDQUFDQSxHQUFHQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtRQUMzQkEsQ0FBQ0E7UUFFRFA7O1dBRUdBO1FBQ0lBLDRCQUFPQSxHQUFkQTtRQUNBUSxDQUFDQTtRQUVNUixnQ0FBV0EsR0FBbEJBO1FBQ0FTLENBQUNBO1FBRU1ULDhCQUFTQSxHQUFoQkE7UUFDQVUsQ0FBQ0E7UUFFTVYsMkJBQU1BLEdBQWJBO1FBQ0FXLENBQUNBO1FBRU1YLDZCQUFRQSxHQUFmQSxVQUFnQkEsS0FBZ0JBO1lBQzVCWSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxRQUFRQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtRQUMxQ0EsQ0FBQ0E7UUFFRFosZ0VBQWdFQTtRQUN6REEsNkJBQVFBLEdBQWZBLFVBQWdCQSxLQUFnQkE7WUFDNUJhLHFCQUFxQkE7WUFDckJBLHNDQUFzQ0E7WUFDdENBLG1CQUFtQkE7WUFDbkJBLEdBQUdBO1lBRUhBLEVBQUVBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBO2dCQUNmQSwrQ0FBK0NBO2dCQUMvQ0EsS0FBS0EsQ0FBQ0EsUUFBUUEsRUFBRUEsQ0FBQ0E7WUFDckJBLENBQUNBO1lBRURBLEtBQUtBLENBQUNBLE1BQU1BLEdBQUdBLElBQUlBLENBQUNBO1lBR3BCQSx5REFBeURBO1lBQ3pEQSxrQkFBa0JBO1lBQ2xCQSxNQUFNQTtZQUdOQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxRQUFRQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtZQUUvQkEsWUFBWUE7WUFHWkE7OztlQUdHQTtZQUNDQSxJQUFJQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQTtZQUNoQkEsR0FBR0E7WUFDSEEsdUJBQXVCQTtZQUN2QkEsOEJBQThCQTtZQUM5QkEsZ0NBQWdDQTtZQUNoQ0EsbURBQW1EQTtZQUNuREEsdURBQXVEQTtZQUN2REEsa0JBQWtCQTtZQUNsQkEsTUFBTUE7WUFHTkEsS0FBS0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0E7WUFDYkEsS0FBS0EsQ0FBQ0EsT0FBT0EsRUFBRUEsQ0FBQ0E7WUFFaEJBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO1FBQ2hCQSxDQUFDQTtRQUVNYiwrQkFBVUEsR0FBakJBO1lBQ0ljLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBO1FBQzFCQSxDQUFDQTtRQUVNZCx5QkFBSUEsR0FBWEE7WUFDSWUsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7WUFFbkNBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO1FBQ2hCQSxDQUFDQTtRQUVNZiw0QkFBT0EsR0FBZEEsVUFBZUEsSUFBYUE7WUFDeEJnQixJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUU3QkEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7UUFDaEJBLENBQUNBO1FBRU1oQixnQ0FBV0EsR0FBbEJBLFVBQW1CQSxLQUFnQkE7WUFDL0JpQixLQUFLQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQTtZQUVmQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxXQUFXQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtZQUNsQ0EsMENBQTBDQTtZQUMxQ0Esa0JBQWtCQTtZQUNsQkEsZ0VBQWdFQTtZQUNoRUEsb0NBQW9DQTtZQUNwQ0EsS0FBS0EsQ0FBQ0EsT0FBT0EsRUFBRUEsQ0FBQ0E7WUFDaEJBLDhCQUE4QkE7WUFDOUJBLDBEQUEwREE7WUFDMURBLHNCQUFzQkE7WUFDdEJBLFVBQVVBO1lBQ1ZBLDhEQUE4REE7WUFDOURBLHNCQUFzQkE7WUFDdEJBLFVBQVVBO1lBQ1ZBLGtCQUFrQkE7WUFDbEJBLEdBQUdBO1lBQ0hBLGVBQWVBO1lBR2ZBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO1FBQ2hCQSxDQUFDQTtRQUVEakI7OztXQUdHQTtRQUNJQSw2QkFBUUEsR0FBZkE7WUFDSWtCLElBQUlBLE1BQU1BLEdBQUdBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBO1lBRTFCQSxNQUFNQSxJQUFJQSxNQUFNQSxDQUFDQSxXQUFXQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUVuQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7UUFDaEJBLENBQUNBO1FBRU1sQixxQ0FBZ0JBLEdBQXZCQSxVQUF3QkEsS0FBV0E7WUFDL0JtQiwyQkFBMkJBO1lBQzNCQSxrQkFBa0JBO1lBQ2xCQSxrREFBa0RBO1lBQ2xEQSw2QkFBNkJBO1lBQzdCQSxrREFBa0RBO1lBQ2xEQSxpRUFBaUVBO1lBQ2pFQSxzQkFBc0JBO1lBQ3RCQSxPQUFPQTtZQUNQQSxHQUFHQTtZQUNIQSwrQkFBK0JBO1lBQy9CQSw4QkFBOEJBO1lBQzlCQSxrREFBa0RBO1lBQ2xEQSxpQ0FBaUNBO1lBQ2pDQSx1REFBdURBO1lBQ3ZEQSxxQkFBcUJBO1lBQ3JCQSwyQkFBMkJBO1lBQzNCQSxXQUFXQTtZQUNYQSxPQUFPQTtZQUNQQSxHQUFHQTtZQUNIQSxFQUFFQTtZQUNGQSxxQ0FBcUNBO1lBQ3JDQSxtQkFBbUJBO1lBQ25CQSxzREFBc0RBO1lBQ3REQSxPQUFPQTtZQUNQQSw0Q0FBNENBO1lBQzVDQSxzQkFBc0JBO1lBQ3RCQSxPQUFPQTtZQUNQQSxHQUFHQTtZQUNIQSxjQUFjQTtZQUVkQSxJQUFJQSxNQUFNQSxHQUFHQSxJQUFJQSxFQUNiQSxDQUFDQSxHQUFHQSxJQUFJQSxFQUNSQSxRQUFRQSxHQUFtQkEsSUFBSUEsRUFDL0JBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLFFBQVFBLEVBQUVBLENBQUNBO1lBRXBDQSxRQUFRQSxHQUFHQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQTtZQUMxQkEsRUFBRUEsQ0FBQUEsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ1RBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLEVBQUVBLENBQUNBO29CQUM1QkEsSUFBSUEsS0FBS0EsR0FBR0EsUUFBUUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBRWpDQSxNQUFNQSxHQUFHQSxLQUFLQSxDQUFDQSxnQkFBZ0JBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO29CQUN2Q0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQ1RBLE1BQU1BLENBQUNBLE1BQU1BLENBQUNBO29CQUNsQkEsQ0FBQ0E7Z0JBQ0xBLENBQUNBO1lBQ0xBLENBQUNBO1lBRURBLEVBQUVBLENBQUFBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUNuQkEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7WUFDaEJBLENBQUNBO1lBRURBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO1FBQ2hCQSxDQUFDQTtRQUVNbkIsMEJBQUtBLEdBQVpBLFVBQWFBLGNBQW9CQTtZQUM3Qm9CLHdCQUF3QkE7WUFDeEJBLHlDQUF5Q0E7WUFDekNBLHdEQUF3REE7WUFHeERBLGlCQUFpQkE7WUFDakJBLEVBQUVBO1lBQ0ZBLDhEQUE4REE7WUFDOURBLDJEQUEyREE7WUFHM0RBLDBDQUEwQ0E7WUFDMUNBLEVBQUVBLENBQUFBLENBQUNBLGNBQWNBLENBQUNBLENBQUFBLENBQUNBO2dCQUNmQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtZQUNoQkEsQ0FBQ0E7WUFDREEsSUFBSUEsQ0FBQUEsQ0FBQ0E7Z0JBQ0RBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBO1lBQ2pCQSxDQUFDQTtRQUNMQSxDQUFDQTtRQUVPcEIsNkJBQVFBLEdBQWhCQSxVQUFpQkEsQ0FBWUEsRUFBRUEsQ0FBWUE7WUFDdkNxQixNQUFNQSxDQUFDQSxVQUFTQSxDQUFDQSxFQUFFQSxDQUFDQTtnQkFDaEIsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLENBQUMsQ0FBQUE7UUFDTEEsQ0FBQ0E7UUE5UGNyQixpQkFBTUEsR0FBVUEsQ0FBQ0EsQ0FBQ0E7UUErUHJDQSxpQkFBQ0E7SUFBREEsQ0FoUUFyVyxBQWdRQ3FXLElBQUFyVztJQWhRWUEsYUFBVUEsYUFnUXRCQSxDQUFBQTtBQUNMQSxDQUFDQSxFQWxRTSxFQUFFLEtBQUYsRUFBRSxRQWtRUjs7Ozs7Ozs7QUNuUUQsMkNBQTJDO0FBQzNDLElBQU8sRUFBRSxDQWdFUjtBQWhFRCxXQUFPLEVBQUUsRUFBQSxDQUFDO0lBQ05BO1FBQTBCMlgsd0JBQVVBO1FBd0JoQ0EsY0FBWUEsSUFBYUE7WUFDckJDLGlCQUFPQSxDQUFDQTtZQVpKQSxZQUFPQSxHQUFVQSxTQUFNQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQTtZQVFqQ0EsVUFBS0EsR0FBWUEsSUFBSUEsQ0FBQ0E7WUFDdEJBLG1CQUFjQSxHQUFpQkEsZ0JBQWFBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBO1lBSzFEQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUN0QkEsQ0FBQ0E7UUEzQkRELDJGQUEyRkE7UUFDM0ZBLDRCQUE0QkE7UUFFNUJBLHNGQUFzRkE7UUFFdEZBLDBDQUEwQ0E7UUFDNUJBLFdBQU1BLEdBQXBCQSxVQUFxQkEsSUFBYUE7WUFDOUJFLElBQUlBLEdBQUdBLEdBQUdBLElBQUlBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1lBRXpCQSxNQUFNQSxDQUFDQSxHQUFHQSxDQUFDQTtRQUNmQSxDQUFDQTtRQUdERixzQkFBSUEsd0JBQU1BO2lCQUFWQTtnQkFDSUcsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7WUFDeEJBLENBQUNBO2lCQUNESCxVQUFXQSxNQUFhQTtnQkFDcEJHLElBQUlBLENBQUNBLE9BQU9BLEdBQUdBLE1BQU1BLENBQUNBO1lBQzFCQSxDQUFDQTs7O1dBSEFIO1FBY01BLHdCQUFTQSxHQUFoQkEsVUFBaUJBLE1BQWFBO1lBQzNCSSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxRQUFRQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQTtRQUN4Q0EsQ0FBQ0E7UUFFTUoscUJBQU1BLEdBQWJBO1lBQ0lLLElBQUlBLENBQUNBLGNBQWNBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBO1FBQ2pDQSxDQUFDQTtRQUVNTCxtQkFBSUEsR0FBWEE7WUFDSU0sSUFBSUEsQ0FBQ0EsZUFBZUEsRUFBRUEsQ0FBQ0E7UUFDM0JBLENBQUNBO1FBRU1OLG1CQUFJQSxHQUFYQTtZQUNJTyxJQUFJQSxDQUFDQSxRQUFRQSxHQUFHQSxXQUFRQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUM3Q0EsQ0FBQ0E7UUFFT1AsOEJBQWVBLEdBQXZCQTtZQUNJUSxJQUFJQSxRQUFRQSxHQUFHQSxXQUFRQSxDQUFDQSxXQUFXQSxFQUFFQSxDQUFDQSxRQUFRQSxFQUMxQ0EsT0FBT0EsR0FBR0EsUUFBUUEsQ0FBQ0EsaUJBQWlCQSxFQUFFQSxDQUFDQTtZQUUzQ0EsT0FBT0EsQ0FBQ0EsT0FBT0EsR0FBR0E7Z0JBQ2RBLFlBQVlBLEVBQUVBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLFFBQVFBO2dCQUNqQ0Esa0NBQWtDQTtnQkFDbENBLDhCQUE4QkE7Z0JBQzlCQSxXQUFXQSxFQUFFQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxPQUFPQTtnQkFDL0JBLFdBQVdBLEVBQUVBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BO2FBQ2pDQSxDQUFDQTtZQUNGQSx3QkFBd0JBO1lBQ3hCQSx1Q0FBdUNBO1lBRXZDQSxRQUFRQSxDQUFDQSxVQUFVQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQTtRQUNqQ0EsQ0FBQ0E7UUFDTFIsV0FBQ0E7SUFBREEsQ0E5REEzWCxBQThEQzJYLEVBOUR5QjNYLGFBQVVBLEVBOERuQ0E7SUE5RFlBLE9BQUlBLE9BOERoQkEsQ0FBQUE7QUFDTEEsQ0FBQ0EsRUFoRU0sRUFBRSxLQUFGLEVBQUUsUUFnRVI7Ozs7Ozs7O0FDakVELDJDQUEyQztBQUMzQyxJQUFPLEVBQUUsQ0E4RVI7QUE5RUQsV0FBTyxFQUFFLEVBQUMsQ0FBQztJQUNQQTtRQUEyQm9ZLHlCQUFVQTtRQTJCakNBLGVBQVlBLE1BQU1BO1lBQ2RDLGlCQUFPQSxDQUFDQTtZQW5CWkEsNkRBQTZEQTtZQUVyREEsWUFBT0EsR0FBVUEsSUFBSUEsQ0FBQ0E7WUFRdEJBLGFBQVFBLEdBQVdBLElBQUlBLENBQUNBO1lBVzVCQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFHQSxNQUFNQSxDQUFDQTtRQUMxQkEsQ0FBQ0E7UUE5QmFELFlBQU1BLEdBQXBCQSxVQUFxQkEsTUFBYUEsRUFBRUEsUUFBZUEsRUFBRUEsUUFBZUE7WUFDaEVFLElBQUlBLEdBQUdBLEdBQUdBLElBQUlBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO1lBRTNCQSxHQUFHQSxDQUFDQSxjQUFjQSxDQUFDQSxRQUFRQSxFQUFFQSxRQUFRQSxDQUFDQSxDQUFDQTtZQUV2Q0EsTUFBTUEsQ0FBQ0EsR0FBR0EsQ0FBQ0E7UUFDZkEsQ0FBQ0E7UUFLREYsc0JBQUlBLHlCQUFNQTtpQkFBVkE7Z0JBQ0lHLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBO1lBQ3hCQSxDQUFDQTtpQkFDREgsVUFBV0EsTUFBYUE7Z0JBQ3BCRyxJQUFJQSxDQUFDQSxPQUFPQSxHQUFHQSxNQUFNQSxDQUFDQTtZQUMxQkEsQ0FBQ0E7OztXQUhBSDtRQU1EQSxzQkFBSUEsMEJBQU9BO2lCQUFYQTtnQkFDSUksTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7WUFDekJBLENBQUNBO2lCQUNESixVQUFZQSxPQUFlQTtnQkFDdkJJLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLE9BQU9BLENBQUNBO1lBQzVCQSxDQUFDQTs7O1dBSEFKO1FBV01BLDhCQUFjQSxHQUFyQkEsVUFBc0JBLFFBQWVBLEVBQUVBLFFBQWVBO1lBQ2xESyxJQUFJQSxDQUFDQSxRQUFRQSxHQUFHQSxVQUFPQSxDQUFDQSxNQUFNQSxDQUFDQSxRQUFRQSxFQUFFQSxRQUFRQSxDQUFDQSxDQUFBQTtRQUN0REEsQ0FBQ0E7UUFFREwsZ0NBQWdDQTtRQUNoQ0EsMENBQTBDQTtRQUMxQ0EsR0FBR0E7UUFFSUEsbUJBQUdBLEdBQVZBO1lBQ0lNLElBQUlBLElBQUlBLEdBQUdBLElBQUlBLENBQUNBO1lBRWhCQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxVQUFVQSxFQUFFQSxDQUFDQTtZQUMxQkEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsV0FBV0EsRUFBRUEsQ0FBQ0E7WUFFM0JBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO1lBRW5CQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTtZQUVwQkEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsVUFBQ0EsSUFBSUE7Z0JBQ2RBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO2dCQUVwQkEsSUFBSUEsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0E7Z0JBRWRBLElBQUlBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBO1lBQ2hCQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUdIQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxTQUFTQSxFQUFFQSxDQUFDQTtZQUN6QkEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsU0FBU0EsRUFBRUEsQ0FBQ0E7UUFDN0JBLENBQUNBO1FBRU1OLG9CQUFJQSxHQUFYQTtZQUNJTyxJQUFJQSxDQUFDQSxRQUFRQSxHQUFHQSxXQUFRQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUM3Q0EsQ0FBQ0E7UUFHT1Asd0JBQVFBLEdBQWhCQSxVQUFpQkEsSUFBSUE7WUFDakJRLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLGNBQWNBLENBQUNBLGFBQWFBLEVBQUVBLGtCQUFlQSxDQUFDQSxVQUFVQSxFQUFFQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO1FBQzFHQSxDQUFDQTtRQUVPUixpQ0FBaUJBLEdBQXpCQSxVQUEwQkEsSUFBSUE7WUFDMUJTLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLFdBQVdBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLGVBQWVBLEVBQUVBLENBQUNBLENBQUNBO1FBQzFFQSxDQUFDQTtRQUNMVCxZQUFDQTtJQUFEQSxDQTVFQXBZLEFBNEVDb1ksRUE1RTBCcFksYUFBVUEsRUE0RXBDQTtJQTVFWUEsUUFBS0EsUUE0RWpCQSxDQUFBQTtBQUNMQSxDQUFDQSxFQTlFTSxFQUFFLEtBQUYsRUFBRSxRQThFUjs7QUMvRUQsMkNBQTJDO0FBQzNDLElBQU8sRUFBRSxDQWdHUjtBQWhHRCxXQUFPLEVBQUUsRUFBQSxDQUFDO0lBRU5BO1FBQUE4WTtZQVdJQyxnQkFBZ0JBO1lBQ1JBLGNBQVNBLEdBQWlCQSxJQUFJQSxDQUFDQTtZQVEvQkEsVUFBS0EsR0FBU0EsSUFBSUEsQ0FBQ0E7WUFRbkJBLFFBQUdBLEdBQU9BLElBQUlBLENBQUNBO1lBUWZBLFdBQU1BLEdBQVNBLElBQUlBLENBQUNBO1lBQ3BCQSxjQUFTQSxHQUFvQkEsSUFBSUEsQ0FBQ0E7UUF3RDlDQSxDQUFDQTtRQTFGaUJELG9CQUFXQSxHQUF6QkE7WUFDSUUsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsS0FBS0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzFCQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxJQUFJQSxJQUFJQSxFQUFFQSxDQUFDQTtnQkFDNUJBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLGNBQWNBLEVBQUVBLENBQUNBO1lBQ3BDQSxDQUFDQTtZQUNEQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQTtRQUMxQkEsQ0FBQ0E7UUFJREYsc0JBQUlBLDhCQUFRQTtpQkFBWkE7Z0JBQ0lHLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBO1lBQzFCQSxDQUFDQTtpQkFDREgsVUFBYUEsUUFBc0JBO2dCQUMvQkcsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsUUFBUUEsQ0FBQ0E7WUFDOUJBLENBQUNBOzs7V0FIQUg7UUFNREEsc0JBQUlBLDBCQUFJQTtpQkFBUkE7Z0JBQ0lJLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBO1lBQ3RCQSxDQUFDQTtpQkFDREosVUFBU0EsSUFBVUE7Z0JBQ2ZJLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBO1lBQ3RCQSxDQUFDQTs7O1dBSEFKO1FBTURBLHNCQUFJQSx3QkFBRUE7aUJBQU5BO2dCQUNJSyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQTtZQUNwQkEsQ0FBQ0E7aUJBQ0RMLFVBQU9BLEVBQU1BO2dCQUNUSyxJQUFJQSxDQUFDQSxHQUFHQSxHQUFHQSxFQUFFQSxDQUFDQTtZQUNsQkEsQ0FBQ0E7OztXQUhBTDtRQVFNQSxpQ0FBY0EsR0FBckJBO1lBQ0lNLDRDQUE0Q0E7WUFDNUNBLElBQUlBLENBQUNBLFNBQVNBLEdBQUdBLGdCQUFhQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQTtRQUM1Q0EsQ0FBQ0E7UUFFTU4sK0JBQVlBLEdBQW5CQSxVQUFvQkEsS0FBV0E7WUFDM0JPLEtBQUtBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBO1lBQ2JBLEtBQUtBLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBO1lBQ2hCQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxLQUFLQSxDQUFDQTtZQUVwQkEsb0JBQW9CQTtZQUNwQkEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0E7WUFFdEJBLElBQUlBLENBQUNBLFVBQVVBLEVBQUVBLENBQUNBO1FBQ3RCQSxDQUFDQTtRQUVNUCwwQkFBT0EsR0FBZEE7WUFDSVEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7UUFDdEJBLENBQUNBO1FBRU1SLG1DQUFnQkEsR0FBdkJBLFVBQXdCQSxLQUFXQTtZQUMvQlMsRUFBRUEsQ0FBQUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQUEsQ0FBQ0E7Z0JBQ2JBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO1lBQ2hCQSxDQUFDQTtZQUVEQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxnQkFBZ0JBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO1FBQy9DQSxDQUFDQTtRQUVNVCwyQkFBUUEsR0FBZkEsVUFBZ0JBLFFBQWVBO1lBQzNCVSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxZQUFTQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxNQUFNQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNyRUEsSUFBSUEsQ0FBQ0EsR0FBR0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsVUFBVUEsRUFBRUEsQ0FBQ0E7UUFDdkNBLENBQUNBO1FBRU9WLDZCQUFVQSxHQUFsQkE7WUFDSVcsSUFBSUEsSUFBSUEsR0FBR0EsSUFBSUEsQ0FBQ0E7WUFFaEJBLElBQUlBLENBQUNBLFNBQVNBLEdBQUdBLElBQUlBLENBQUNBLGVBQWVBLEVBQUVBO2lCQUN0Q0EsU0FBU0EsQ0FBQ0EsVUFBQ0EsSUFBSUE7Z0JBQ1JBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1lBQ3pCQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNYQSxDQUFDQTtRQUVEWCx5QkFBeUJBO1FBQ2pCQSw0QkFBU0EsR0FBakJBLFVBQWtCQSxJQUFJQTtZQUNsQlksSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsZ0JBQWdCQSxHQUFHQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxnQkFBZ0JBLENBQUNBLENBQUNBO1lBRXRFQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxXQUFXQSxFQUFFQSxDQUFDQTtZQUUxQkEsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7WUFFbEJBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO1lBRW5DQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxTQUFTQSxFQUFFQSxDQUFDQTtRQUM1QkEsQ0FBQ0E7UUEzRmNaLGtCQUFTQSxHQUFZQSxJQUFJQSxDQUFDQTtRQTRGN0NBLGVBQUNBO0lBQURBLENBN0ZBOVksQUE2RkM4WSxJQUFBOVk7SUE3RllBLFdBQVFBLFdBNkZwQkEsQ0FBQUE7QUFDTEEsQ0FBQ0EsRUFoR00sRUFBRSxLQUFGLEVBQUUsUUFnR1I7O0FDakdELHdDQUF3QztBQUN4QyxJQUFPLEVBQUUsQ0FxT1I7QUFyT0QsV0FBTyxFQUFFLEVBQUEsQ0FBQztJQUNOQSxnRUFBZ0VBO0lBQ2hFQSxpQ0FBaUNBO0lBQ2pDQTtRQThFSTJaLGdCQUFZQSxZQUFZQSxFQUFFQSxpQkFBaUJBO1lBckVuQ0MsYUFBUUEsR0FBVUEsSUFBSUEsQ0FBQ0E7WUFRdkJBLGFBQVFBLEdBQVVBLElBQUlBLENBQUNBO1lBUXZCQSxlQUFVQSxHQUFVQSxJQUFJQSxDQUFDQTtZQVF6QkEsaUJBQVlBLEdBQVVBLEdBQUdBLENBQUNBO1lBUTFCQSxpQkFBWUEsR0FBVUEsR0FBR0EsQ0FBQ0E7WUFRMUJBLGVBQVVBLEdBQVVBLEVBQUVBLENBQUNBO1lBUXZCQSxVQUFLQSxHQUFVQSxJQUFJQSxDQUFDQTtZQUNwQkEsVUFBS0EsR0FBVUEsSUFBSUEsQ0FBQ0E7WUFDcEJBLFVBQUtBLEdBQVVBLElBQUlBLENBQUNBO1lBQ3BCQSxTQUFJQSxHQUFVQSxJQUFJQSxDQUFDQTtZQUNuQkEsU0FBSUEsR0FBVUEsSUFBSUEsQ0FBQ0E7WUFDbkJBLFNBQUlBLEdBQVVBLElBQUlBLENBQUNBO1lBQ25CQSxhQUFRQSxHQUFVQSxJQUFJQSxDQUFDQTtZQUN2QkEsYUFBUUEsR0FBVUEsSUFBSUEsQ0FBQ0E7WUFDdkJBLGFBQVFBLEdBQVVBLElBQUlBLENBQUNBO1lBQ3ZCQSxlQUFVQSxHQUFTQSxJQUFJQSxDQUFDQTtZQUN4QkEsWUFBT0EsR0FBVUEsSUFBSUEsQ0FBQ0E7WUFDdEJBLFVBQUtBLEdBQVVBLElBQUlBLENBQUNBO1lBQ3BCQSxTQUFJQSxHQUFVQSxJQUFJQSxDQUFDQTtZQUNuQkEsV0FBTUEsR0FBVUEsSUFBSUEsQ0FBQ0E7WUFDckJBLFdBQU1BLEdBQVVBLElBQUlBLENBQUNBO1lBQ3JCQSxXQUFNQSxHQUFVQSxJQUFJQSxDQUFDQTtZQUNyQkEsa0JBQWFBLEdBQVVBLElBQUlBLENBQUNBO1lBQzVCQSxrQkFBYUEsR0FBVUEsSUFBSUEsQ0FBQ0E7WUFDNUJBLGlCQUFZQSxHQUFVQSxJQUFJQSxDQUFDQTtZQUMzQkEsa0JBQWFBLEdBQVVBLElBQUlBLENBQUNBO1lBR2hDQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxZQUFZQSxDQUFDQSxJQUFJQSxDQUFDQTtZQUMvQkEsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7WUFDL0JBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLFlBQVlBLENBQUNBLElBQUlBLENBQUNBO1lBQy9CQSxJQUFJQSxDQUFDQSxJQUFJQSxHQUFHQSxZQUFZQSxDQUFDQSxHQUFHQSxDQUFDQTtZQUM3QkEsSUFBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsWUFBWUEsQ0FBQ0EsR0FBR0EsQ0FBQ0E7WUFDN0JBLElBQUlBLENBQUNBLElBQUlBLEdBQUdBLFlBQVlBLENBQUNBLEdBQUdBLENBQUNBO1lBQzdCQSxJQUFJQSxDQUFDQSxRQUFRQSxHQUFHQSxZQUFZQSxDQUFDQSxPQUFPQSxDQUFDQTtZQUNyQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsWUFBWUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7WUFDckNBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLFlBQVlBLENBQUNBLE9BQU9BLENBQUNBO1lBRXJDQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFFQSxpQkFBaUJBLENBQUNBLEtBQUtBLENBQUNBO1lBQ3pDQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFHQSxpQkFBaUJBLENBQUNBLE1BQU1BLENBQUNBO1lBQ3hDQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxpQkFBaUJBLENBQUNBLElBQUlBLENBQUNBO1lBQ3BDQSxJQUFJQSxDQUFDQSxJQUFJQSxHQUFHQSxpQkFBaUJBLENBQUNBLEdBQUdBLENBQUNBO1lBRWxDQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUNoQkEsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDaEJBLElBQUlBLENBQUNBLE1BQU1BLEdBQUdBLENBQUNBLENBQUNBO1lBQ2hCQSxJQUFJQSxDQUFDQSxhQUFhQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUN2QkEsSUFBSUEsQ0FBQ0EsYUFBYUEsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDdkJBLElBQUlBLENBQUNBLFlBQVlBLEdBQUdBLENBQUNBLENBQUNBO1lBQ3RCQSxJQUFJQSxDQUFDQSxhQUFhQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUV2QkEsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsU0FBTUEsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0E7WUFDaENBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLFNBQU1BLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBO1FBQ3BDQSxDQUFDQTtRQXZHYUQsYUFBTUEsR0FBcEJBLFVBQXFCQSxZQUFZQSxFQUFFQSxpQkFBaUJBO1lBQ2hERSxJQUFJQSxHQUFHQSxHQUFHQSxJQUFJQSxJQUFJQSxDQUFDQSxZQUFZQSxFQUFFQSxpQkFBaUJBLENBQUNBLENBQUNBO1lBRXBEQSxHQUFHQSxDQUFDQSxjQUFjQSxFQUFF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QU1BLEdBQUdBLE1BQU1BLENBQUNBLGVBQWVBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLE1BQU1BLENBQUNBO1lBRXREQSxJQUFJQSxDQUFDQSxNQUFNQSxJQUFJQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUN6QkEsSUFBSUEsQ0FBQ0EsTUFBTUEsSUFBSUEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDekJBLElBQUlBLENBQUNBLE1BQU1BLElBQUlBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1FBQzdCQSxDQUFDQTtRQUNMdkIsYUFBQ0E7SUFBREEsQ0FqT0EzWixBQWlPQzJaLElBQUEzWjtJQWpPWUEsU0FBTUEsU0FpT2xCQSxDQUFBQTtBQUNMQSxDQUFDQSxFQXJPTSxFQUFFLEtBQUYsRUFBRSxRQXFPUiIsImZpbGUiOiJkeS5kZWJ1Zy5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZSBkeSB7XG4gICAgZXhwb3J0IGNsYXNzIFBvaW50IHtcbiAgICAgICAgcHVibGljIHg6bnVtYmVyID0gbnVsbDtcbiAgICAgICAgcHVibGljIHk6bnVtYmVyID0gbnVsbDtcblxuICAgICAgICBjb25zdHJ1Y3Rvcih4Om51bWJlciA9IG51bGwsIHk6bnVtYmVyID0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZSh4PzpudW1iZXIsIHk/Om51bWJlcikge1xuICAgICAgICAgICAgdmFyIG9iaiA9IG5ldyB0aGlzKHgsIHkpO1xuXG4gICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICB9XG4gICAgfVxufSIsIm1vZHVsZSBkeSB7XG4gICAgZXhwb3J0IGNsYXNzIFBvc2l0aW9uIHtcbiAgICAgICAgcHVibGljIHg6bnVtYmVyID0gbnVsbDtcbiAgICAgICAgcHVibGljIHk6bnVtYmVyID0gbnVsbDtcbiAgICAgICAgcHVibGljIHo6bnVtYmVyID0gbnVsbDtcblxuICAgICAgICBjb25zdHJ1Y3Rvcih4Om51bWJlciwgeTpudW1iZXIsIHo6bnVtYmVyKSB7XG4gICAgICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgICAgIHRoaXMueiA9IHo7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZSh4Om51bWJlciwgeTpudW1iZXIsIHo6bnVtYmVyKSB7XG4gICAgICAgICAgICB2YXIgb2JqID0gbmV3IHRoaXMoeCwgeSwgeik7XG5cbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kZWZpbml0aW9ucy5kLnRzXCIvPlxubW9kdWxlIGR5IHtcbiAgICBleHBvcnQgaW50ZXJmYWNlIElWaWV3IHtcbiAgICAgICAgb2Zmc2V0Ont4Om51bWJlciwgeTpudW1iZXJ9O1xuICAgICAgICB3aWR0aDpudW1iZXI7XG4gICAgICAgIGhlaWdodDpudW1iZXI7XG4gICAgICAgIGRvbTphbnk7XG4gICAgICAgIGdldENvbnRleHQoKTphbnk7XG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIFZpZXdXZWJHTCBpbXBsZW1lbnRzIElWaWV3IHtcbiAgICAgICAgcHVibGljIHN0YXRpYyBjcmVhdGUodmlldzpJVmlldykge1xuICAgICAgICAgICAgdmFyIG9iaiA9IG5ldyB0aGlzKHZpZXcpO1xuXG4gICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IG9mZnNldCgpIHtcbiAgICAgICAgICAgIHZhciB2aWV3ID0gdGhpcy5fZG9tLFxuICAgICAgICAgICAgICAgIG9mZnNldCA9IHt4OiB2aWV3Lm9mZnNldExlZnQsIHk6IHZpZXcub2Zmc2V0VG9wfTtcblxuICAgICAgICAgICAgd2hpbGUgKHZpZXcgPSB2aWV3Lm9mZnNldFBhcmVudCkge1xuICAgICAgICAgICAgICAgIG9mZnNldC54ICs9IHZpZXcub2Zmc2V0TGVmdDtcbiAgICAgICAgICAgICAgICBvZmZzZXQueSArPSB2aWV3Lm9mZnNldFRvcDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG9mZnNldDtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2RvbTphbnkgPSBudWxsO1xuICAgICAgICBnZXQgZG9tKCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZG9tO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9wcml2YXRlIF93aWR0aDpudW1iZXIgPSBudWxsO1xuICAgICAgICBnZXQgd2lkdGgoKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kb20ud2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgaGVpZ2h0KCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZG9tLmhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0cnVjdG9yKGRvbTphbnkpe1xuICAgICAgICAgICAgdGhpcy5fZG9tID0gZG9tO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGdldENvbnRleHQoKTphbnl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZG9tLmdldENvbnRleHQoXCJ3ZWJnbFwiKSB8fCB0aGlzLl9kb20uZ2V0Q29udGV4dChcImV4cGVyaW1lbnRhbC13ZWJnbFwiKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kZWZpbml0aW9ucy5kLnRzXCIvPlxubW9kdWxlIGR5e1xuICAgIGV4cG9ydCBjbGFzcyBWZWN0b3Ize1xuICAgICAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZSh4LCB5LCB6KTpWZWN0b3IzIDtcbiAgICAgICAgcHVibGljIHN0YXRpYyBjcmVhdGUoKTpWZWN0b3IzIDtcbiAgICAgICAgcHVibGljIHN0YXRpYyBjcmVhdGUoKTpWZWN0b3IzIHtcbiAgICAgICAgICAgIHZhciBtID0gbnVsbDtcblxuICAgICAgICAgICAgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCl7XG4gICAgICAgICAgICAgICAgbSA9IG5ldyB0aGlzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIG0gPSBuZXcgdGhpcyhhcmd1bWVudHNbMF0sIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG07XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF92YWx1ZXM6IEZsb2F0MzJBcnJheTtcbiAgICAgICAgZ2V0IHZhbHVlcygpOkZsb2F0MzJBcnJheSB7IHJldHVybiB0aGlzLl92YWx1ZXM7IH1cbiAgICAgICAgc2V0IHZhbHVlcyh2YWx1ZXM6IEZsb2F0MzJBcnJheSkge1xuICAgICAgICAgICAgdGhpcy5fdmFsdWVzID0gdmFsdWVzO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3RydWN0b3IoeCwgeSwgeik7XG4gICAgICAgIGNvbnN0cnVjdG9yKCk7XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZXMgPSBuZXcgRmxvYXQzMkFycmF5KDMpO1xuXG4gICAgICAgICAgICBpZihhcmd1bWVudHMubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVzWzBdID0gYXJndW1lbnRzWzBdO1xuICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlc1sxXSA9IGFyZ3VtZW50c1sxXTtcbiAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZXNbMl0gPWFyZ3VtZW50c1syXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBub3JtYWxpemUoKTogVmVjdG9yM3tcbiAgICAgICAgICAgIHZhciB2ID0gdGhpcy5fdmFsdWVzO1xuICAgICAgICAgICAgdmFyIGQgPSBNYXRoLnNxcnQoXG4gICAgICAgICAgICAgICAgdlswXSAqIHZbMF0gKyB2WzFdICogdlsxXSArIHZbMl0gKiB2WzJdXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBpZihkID09PSAwKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gVmVjdG9yMy5jcmVhdGUoMCwgMCwgMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZbMF0gPSB2WzBdIC8gZDtcbiAgICAgICAgICAgIHZbMV0gPSB2WzFdIC8gZDtcbiAgICAgICAgICAgIHZbMl0gPSB2WzJdIC8gZDtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc3ViKHY6VmVjdG9yMyk6VmVjdG9yMyB7XG4gICAgICAgICAgICByZXR1cm4gVmVjdG9yMy5jcmVhdGUoXG4gICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVzWzBdIC0gdi52YWx1ZXNbMF0sXG4gICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVzWzFdIC0gdi52YWx1ZXNbMV0sXG4gICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVzWzJdIC0gdi52YWx1ZXNbMl1cbiAgICAgICAgICAgIClcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyByZXZlcnNlKCk6VmVjdG9yM3tcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlc1swXSA9IC10aGlzLl92YWx1ZXNbMF07XG4gICAgICAgICAgICB0aGlzLl92YWx1ZXNbMV0gPSAtdGhpcy5fdmFsdWVzWzFdO1xuICAgICAgICAgICAgdGhpcy5fdmFsdWVzWzJdID0gLXRoaXMuX3ZhbHVlc1syXTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgY29weSgpOiBWZWN0b3Ize1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IFZlY3RvcjMuY3JlYXRlKCksXG4gICAgICAgICAgICAgICAgaSA9IDAsXG4gICAgICAgICAgICAgICAgbGVuID0gdGhpcy5fdmFsdWVzLmxlbmd0aDtcblxuICAgICAgICAgICAgZm9yKGkgPSAwOyBpIDwgbGVuOyBpKyspe1xuICAgICAgICAgICAgICAgIHJlc3VsdC52YWx1ZXNbaV0gPSB0aGlzLl92YWx1ZXNbaV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgdG9WZWM0KCk6IFZlY3RvcjR7XG4gICAgICAgICAgICByZXR1cm4gVmVjdG9yNC5jcmVhdGUodGhpcy5fdmFsdWVzWzBdLCB0aGlzLl92YWx1ZXNbMV0sIHRoaXMuX3ZhbHVlc1syXSwgMS4wKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kZWZpbml0aW9ucy5kLnRzXCIvPlxubW9kdWxlIGR5e1xuICAgIGV4cG9ydCBjbGFzcyBWZWN0b3I0e1xuICAgICAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZSh4LCB5LCB6LCB3KTpWZWN0b3I0IDtcbiAgICAgICAgcHVibGljIHN0YXRpYyBjcmVhdGUoKTpWZWN0b3I0IDtcbiAgICAgICAgcHVibGljIHN0YXRpYyBjcmVhdGUoKTpWZWN0b3I0IHtcbiAgICAgICAgICAgIHZhciBtID0gbnVsbDtcblxuICAgICAgICAgICAgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCl7XG4gICAgICAgICAgICAgICAgbSA9IG5ldyB0aGlzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIG0gPSBuZXcgdGhpcyhhcmd1bWVudHNbMF0sIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdLCBhcmd1bWVudHNbM10pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX3ZhbHVlczogRmxvYXQzMkFycmF5O1xuICAgICAgICBnZXQgdmFsdWVzKCk6RmxvYXQzMkFycmF5IHsgcmV0dXJuIHRoaXMuX3ZhbHVlczsgfVxuICAgICAgICBzZXQgdmFsdWVzKHZhbHVlczogRmxvYXQzMkFycmF5KSB7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZXMgPSB2YWx1ZXM7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdHJ1Y3Rvcih4LCB5LCB6LCB3KTtcbiAgICAgICAgY29uc3RydWN0b3IoKTtcbiAgICAgICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlcyA9IG5ldyBGbG9hdDMyQXJyYXkoNCk7XG5cbiAgICAgICAgICAgIGlmKGFyZ3VtZW50cy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZXNbMF0gPSBhcmd1bWVudHNbMF07XG4gICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVzWzFdID0gYXJndW1lbnRzWzFdO1xuICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlc1syXSA9YXJndW1lbnRzWzJdO1xuICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlc1szXSA9YXJndW1lbnRzWzNdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIG5vcm1hbGl6ZSgpOiBWZWN0b3I0e1xuICAgICAgICAgICAgdmFyIHYgPSB0aGlzLl92YWx1ZXM7XG4gICAgICAgICAgICB2YXIgZCA9IE1hdGguc3FydChcbiAgICAgICAgICAgICAgICB2WzBdICogdlswXSArIHZbMV0gKiB2WzFdICsgdlsyXSAqIHZbMl0gKyB2WzNdICogdlszXVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgaWYoZCA9PT0gMCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFZlY3RvcjQuY3JlYXRlKDAsIDAsIDAsIDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2WzBdID0gdlswXSAvIGQ7XG4gICAgICAgICAgICB2WzFdID0gdlsxXSAvIGQ7XG4gICAgICAgICAgICB2WzJdID0gdlsyXSAvIGQ7XG4gICAgICAgICAgICB2WzNdID0gdlszXSAvIGQ7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHRvVmVjMygpOiBWZWN0b3Ize1xuICAgICAgICAgICAgcmV0dXJuIFZlY3RvcjMuY3JlYXRlKHRoaXMuX3ZhbHVlc1swXSwgdGhpcy5fdmFsdWVzWzFdLCB0aGlzLl92YWx1ZXNbMl0pO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RlZmluaXRpb25zLmQudHNcIi8+XG5tb2R1bGUgZHl7XG4gICAgLyohXG4gICAgIOazqOaEj++8muefqemYteWFg+e0oOaYr+aMieWIl+S4u+W6j+WtmOWCqOWcqOaVsOe7hOS4reeahOOAglxuICAgICAqL1xuICAgIGV4cG9ydCBjbGFzcyBNYXRyaXh7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKG1hdDpGbG9hdDMyQXJyYXkpOk1hdHJpeDtcbiAgICAgICAgcHVibGljIHN0YXRpYyBjcmVhdGUoKTpNYXRyaXg7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKCk6TWF0cml4IHtcbiAgICAgICAgICAgIHZhciBtID0gbnVsbDtcblxuICAgICAgICAgICAgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCl7XG4gICAgICAgICAgICAgICAgbSA9IG5ldyB0aGlzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIG0gPSBuZXcgdGhpcyhhcmd1bWVudHNbMF0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX3ZhbHVlczogRmxvYXQzMkFycmF5ID0gbnVsbDtcbiAgICAgICAgZ2V0IHZhbHVlcygpOkZsb2F0MzJBcnJheSB7IHJldHVybiB0aGlzLl92YWx1ZXM7IH1cbiAgICAgICAgc2V0IHZhbHVlcyh2YWx1ZXM6IEZsb2F0MzJBcnJheSkge1xuICAgICAgICAgICAgdGhpcy5fdmFsdWVzID0gdmFsdWVzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfbWF0cml4QXJyOkFycmF5PEZsb2F0MzJBcnJheT4gPSBudWxsO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG1hdDpGbG9hdDMyQXJyYXkpO1xuICAgICAgICBjb25zdHJ1Y3RvcigpO1xuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVzID0gYXJndW1lbnRzWzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVzID0gbmV3IEZsb2F0MzJBcnJheShbMSwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMV0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9tYXRyaXhBcnIgPSBbXTtcbiAgICAgICAgfVxuXG5cblxuICAgICAgICBwdWJsaWMgcHVzaCgpe1xuICAgICAgICAgICAgdGhpcy5fbWF0cml4QXJyLnB1c2godGhpcy5fdmFsdWVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBwb3AoKXtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlcyA9IHRoaXMuX21hdHJpeEFyci5wb3AoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzZXRJZGVudGl0eSAoKTogTWF0cml4IHtcbiAgICAgICAgICAgIHZhciBlID0gdGhpcy5fdmFsdWVzO1xuICAgICAgICAgICAgZVswXSA9IDE7ICAgZVs0XSA9IDA7ICAgZVs4XSAgPSAwOyAgIGVbMTJdID0gMDtcbiAgICAgICAgICAgIGVbMV0gPSAwOyAgIGVbNV0gPSAxOyAgIGVbOV0gID0gMDsgICBlWzEzXSA9IDA7XG4gICAgICAgICAgICBlWzJdID0gMDsgICBlWzZdID0gMDsgICBlWzEwXSA9IDE7ICAgZVsxNF0gPSAwO1xuICAgICAgICAgICAgZVszXSA9IDA7ICAgZVs3XSA9IDA7ICAgZVsxMV0gPSAwOyAgIGVbMTVdID0gMTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENhbGN1bGF0ZSB0aGUgaW52ZXJzZSBtYXRyaXggb2Ygc3BlY2lmaWVkIG1hdHJpeCwgYW5kIHNldCB0byB0aGlzLlxuICAgICAgICAgKiBAcGFyYW0gb3RoZXIgVGhlIHNvdXJjZSBtYXRyaXhcbiAgICAgICAgICogQHJldHVybiB0aGlzXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgc2V0SW52ZXJzZU9mIChvdGhlcjpNYXRyaXgpOk1hdHJpeCB7XG4gICAgICAgICAgICB2YXIgaSwgcywgZCwgaW52LCBkZXQ7XG5cbiAgICAgICAgICAgIHMgPSBvdGhlci52YWx1ZXM7XG4gICAgICAgICAgICBpbnYgPSBuZXcgRmxvYXQzMkFycmF5KDE2KTtcbiAgICAgICAgICAgIGQgPSB0aGlzLl92YWx1ZXM7XG5cbiAgICAgICAgICAgIGludlswXSAgPSAgIHNbNV0qc1sxMF0qc1sxNV0gLSBzWzVdICpzWzExXSpzWzE0XSAtIHNbOV0gKnNbNl0qc1sxNV1cbiAgICAgICAgICAgICsgc1s5XSpzWzddICpzWzE0XSArIHNbMTNdKnNbNl0gKnNbMTFdIC0gc1sxM10qc1s3XSpzWzEwXTtcbiAgICAgICAgICAgIGludls0XSAgPSAtIHNbNF0qc1sxMF0qc1sxNV0gKyBzWzRdICpzWzExXSpzWzE0XSArIHNbOF0gKnNbNl0qc1sxNV1cbiAgICAgICAgICAgIC0gc1s4XSpzWzddICpzWzE0XSAtIHNbMTJdKnNbNl0gKnNbMTFdICsgc1sxMl0qc1s3XSpzWzEwXTtcbiAgICAgICAgICAgIGludls4XSAgPSAgIHNbNF0qc1s5XSAqc1sxNV0gLSBzWzRdICpzWzExXSpzWzEzXSAtIHNbOF0gKnNbNV0qc1sxNV1cbiAgICAgICAgICAgICsgc1s4XSpzWzddICpzWzEzXSArIHNbMTJdKnNbNV0gKnNbMTFdIC0gc1sxMl0qc1s3XSpzWzldO1xuICAgICAgICAgICAgaW52WzEyXSA9IC0gc1s0XSpzWzldICpzWzE0XSArIHNbNF0gKnNbMTBdKnNbMTNdICsgc1s4XSAqc1s1XSpzWzE0XVxuICAgICAgICAgICAgLSBzWzhdKnNbNl0gKnNbMTNdIC0gc1sxMl0qc1s1XSAqc1sxMF0gKyBzWzEyXSpzWzZdKnNbOV07XG5cbiAgICAgICAgICAgIGludlsxXSAgPSAtIHNbMV0qc1sxMF0qc1sxNV0gKyBzWzFdICpzWzExXSpzWzE0XSArIHNbOV0gKnNbMl0qc1sxNV1cbiAgICAgICAgICAgIC0gc1s5XSpzWzNdICpzWzE0XSAtIHNbMTNdKnNbMl0gKnNbMTFdICsgc1sxM10qc1szXSpzWzEwXTtcbiAgICAgICAgICAgIGludls1XSAgPSAgIHNbMF0qc1sxMF0qc1sxNV0gLSBzWzBdICpzWzExXSpzWzE0XSAtIHNbOF0gKnNbMl0qc1sxNV1cbiAgICAgICAgICAgICsgc1s4XSpzWzNdICpzWzE0XSArIHNbMTJdKnNbMl0gKnNbMTFdIC0gc1sxMl0qc1szXSpzWzEwXTtcbiAgICAgICAgICAgIGludls5XSAgPSAtIHNbMF0qc1s5XSAqc1sxNV0gKyBzWzBdICpzWzExXSpzWzEzXSArIHNbOF0gKnNbMV0qc1sxNV1cbiAgICAgICAgICAgIC0gc1s4XSpzWzNdICpzWzEzXSAtIHNbMTJdKnNbMV0gKnNbMTFdICsgc1sxMl0qc1szXSpzWzldO1xuICAgICAgICAgICAgaW52WzEzXSA9ICAgc1swXSpzWzldICpzWzE0XSAtIHNbMF0gKnNbMTBdKnNbMTNdIC0gc1s4XSAqc1sxXSpzWzE0XVxuICAgICAgICAgICAgKyBzWzhdKnNbMl0gKnNbMTNdICsgc1sxMl0qc1sxXSAqc1sxMF0gLSBzWzEyXSpzWzJdKnNbOV07XG5cbiAgICAgICAgICAgIGludlsyXSAgPSAgIHNbMV0qc1s2XSpzWzE1XSAtIHNbMV0gKnNbN10qc1sxNF0gLSBzWzVdICpzWzJdKnNbMTVdXG4gICAgICAgICAgICArIHNbNV0qc1szXSpzWzE0XSArIHNbMTNdKnNbMl0qc1s3XSAgLSBzWzEzXSpzWzNdKnNbNl07XG4gICAgICAgICAgICBpbnZbNl0gID0gLSBzWzBdKnNbNl0qc1sxNV0gKyBzWzBdICpzWzddKnNbMTRdICsgc1s0XSAqc1syXSpzWzE1XVxuICAgICAgICAgICAgLSBzWzRdKnNbM10qc1sxNF0gLSBzWzEyXSpzWzJdKnNbN10gICsgc1sxMl0qc1szXSpzWzZdO1xuICAgICAgICAgICAgaW52WzEwXSA9ICAgc1swXSpzWzVdKnNbMTVdIC0gc1swXSAqc1s3XSpzWzEzXSAtIHNbNF0gKnNbMV0qc1sxNV1cbiAgICAgICAgICAgICsgc1s0XSpzWzNdKnNbMTNdICsgc1sxMl0qc1sxXSpzWzddICAtIHNbMTJdKnNbM10qc1s1XTtcbiAgICAgICAgICAgIGludlsxNF0gPSAtIHNbMF0qc1s1XSpzWzE0XSArIHNbMF0gKnNbNl0qc1sxM10gKyBzWzRdICpzWzFdKnNbMTRdXG4gICAgICAgICAgICAtIHNbNF0qc1syXSpzWzEzXSAtIHNbMTJdKnNbMV0qc1s2XSAgKyBzWzEyXSpzWzJdKnNbNV07XG5cbiAgICAgICAgICAgIGludlszXSAgPSAtIHNbMV0qc1s2XSpzWzExXSArIHNbMV0qc1s3XSpzWzEwXSArIHNbNV0qc1syXSpzWzExXVxuICAgICAgICAgICAgLSBzWzVdKnNbM10qc1sxMF0gLSBzWzldKnNbMl0qc1s3XSAgKyBzWzldKnNbM10qc1s2XTtcbiAgICAgICAgICAgIGludls3XSAgPSAgIHNbMF0qc1s2XSpzWzExXSAtIHNbMF0qc1s3XSpzWzEwXSAtIHNbNF0qc1syXSpzWzExXVxuICAgICAgICAgICAgKyBzWzRdKnNbM10qc1sxMF0gKyBzWzhdKnNbMl0qc1s3XSAgLSBzWzhdKnNbM10qc1s2XTtcbiAgICAgICAgICAgIGludlsxMV0gPSAtIHNbMF0qc1s1XSpzWzExXSArIHNbMF0qc1s3XSpzWzldICArIHNbNF0qc1sxXSpzWzExXVxuICAgICAgICAgICAgLSBzWzRdKnNbM10qc1s5XSAgLSBzWzhdKnNbMV0qc1s3XSAgKyBzWzhdKnNbM10qc1s1XTtcbiAgICAgICAgICAgIGludlsxNV0gPSAgIHNbMF0qc1s1XSpzWzEwXSAtIHNbMF0qc1s2XSpzWzldICAtIHNbNF0qc1sxXSpzWzEwXVxuICAgICAgICAgICAgKyBzWzRdKnNbMl0qc1s5XSAgKyBzWzhdKnNbMV0qc1s2XSAgLSBzWzhdKnNbMl0qc1s1XTtcblxuICAgICAgICAgICAgZGV0ID0gc1swXSppbnZbMF0gKyBzWzFdKmludls0XSArIHNbMl0qaW52WzhdICsgc1szXSppbnZbMTJdO1xuICAgICAgICAgICAgaWYgKGRldCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkZXQgPSAxIC8gZGV0O1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IDE2OyBpKyspIHtcbiAgICAgICAgICAgICAgICBkW2ldID0gaW52W2ldICogZGV0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDYWxjdWxhdGUgdGhlIGludmVyc2UgbWF0cml4IG9mIHNwZWNpZmllZCBtYXRyaXgsIGFuZCBzZXQgdG8gdGhpcy5cbiAgICAgICAgICogQHBhcmFtIG90aGVyIFRoZSBzb3VyY2UgbWF0cml4XG4gICAgICAgICAqIEByZXR1cm4gdGhpc1xuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGludmVyc2VPZiAoKTpNYXRyaXgge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0SW52ZXJzZU9mKHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRyYW5zcG9zZSB0aGUgbWF0cml4LlxuICAgICAgICAgKiBAcmV0dXJuIHRoaXNcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyB0cmFuc3Bvc2UgKCk6TWF0cml4IHtcbiAgICAgICAgICAgIHZhciBlLCB0O1xuXG4gICAgICAgICAgICBlID0gdGhpcy5fdmFsdWVzO1xuXG4gICAgICAgICAgICB0ID0gZVsgMV07ICBlWyAxXSA9IGVbIDRdOyAgZVsgNF0gPSB0O1xuICAgICAgICAgICAgdCA9IGVbIDJdOyAgZVsgMl0gPSBlWyA4XTsgIGVbIDhdID0gdDtcbiAgICAgICAgICAgIHQgPSBlWyAzXTsgIGVbIDNdID0gZVsxMl07ICBlWzEyXSA9IHQ7XG4gICAgICAgICAgICB0ID0gZVsgNl07ICBlWyA2XSA9IGVbIDldOyAgZVsgOV0gPSB0O1xuICAgICAgICAgICAgdCA9IGVbIDddOyAgZVsgN10gPSBlWzEzXTsgIGVbMTNdID0gdDtcbiAgICAgICAgICAgIHQgPSBlWzExXTsgIGVbMTFdID0gZVsxNF07ICBlWzE0XSA9IHQ7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldCB0aGUgbWF0cml4IGZvciB0cmFuc2xhdGlvbi5cbiAgICAgICAgICogQHBhcmFtIHggVGhlIFggdmFsdWUgb2YgYSB0cmFuc2xhdGlvbi5cbiAgICAgICAgICogQHBhcmFtIHkgVGhlIFkgdmFsdWUgb2YgYSB0cmFuc2xhdGlvbi5cbiAgICAgICAgICogQHBhcmFtIHogVGhlIFogdmFsdWUgb2YgYSB0cmFuc2xhdGlvbi5cbiAgICAgICAgICogQHJldHVybiB0aGlzXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgc2V0VHJhbnNsYXRlICh4LCB5LCB6KTogTWF0cml4IHtcbiAgICAgICAgICAgIHZhciBlID0gdGhpcy5fdmFsdWVzO1xuICAgICAgICAgICAgZVswXSA9IDE7ICBlWzRdID0gMDsgIGVbOF0gID0gMDsgIGVbMTJdID0geDtcbiAgICAgICAgICAgIGVbMV0gPSAwOyAgZVs1XSA9IDE7ICBlWzldICA9IDA7ICBlWzEzXSA9IHk7XG4gICAgICAgICAgICBlWzJdID0gMDsgIGVbNl0gPSAwOyAgZVsxMF0gPSAxOyAgZVsxNF0gPSB6O1xuICAgICAgICAgICAgZVszXSA9IDA7ICBlWzddID0gMDsgIGVbMTFdID0gMDsgIGVbMTVdID0gMTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIE11bHRpcGx5IHRoZSBtYXRyaXggZm9yIHRyYW5zbGF0aW9uIGZyb20gdGhlIHJpZ2h0LlxuICAgICAgICAgKiBAcGFyYW0geCBUaGUgWCB2YWx1ZSBvZiBhIHRyYW5zbGF0aW9uLlxuICAgICAgICAgKiBAcGFyYW0geSBUaGUgWSB2YWx1ZSBvZiBhIHRyYW5zbGF0aW9uLlxuICAgICAgICAgKiBAcGFyYW0geiBUaGUgWiB2YWx1ZSBvZiBhIHRyYW5zbGF0aW9uLlxuICAgICAgICAgKiBAcmV0dXJuIHRoaXNcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyB0cmFuc2xhdGUgKHgsIHksIHopOiBNYXRyaXgge1xuICAgICAgICAgICAgdGhpcy5hcHBseU1hdHJpeChNYXRyaXguY3JlYXRlKCkuc2V0VHJhbnNsYXRlKHgsIHksIHopKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogU2V0IHRoZSBtYXRyaXggZm9yIHJvdGF0aW9uLlxuICAgICAgICAgKiBUaGUgdmVjdG9yIG9mIHJvdGF0aW9uIGF4aXMgbWF5IG5vdCBiZSBub3JtYWxpemVkLlxuICAgICAgICAgKiBAcGFyYW0gYW5nbGUgVGhlIGFuZ2xlIG9mIHJvdGF0aW9uIChkZWdyZWVzKVxuICAgICAgICAgKiBAcGFyYW0geCBUaGUgWCBjb29yZGluYXRlIG9mIHZlY3RvciBvZiByb3RhdGlvbiBheGlzLlxuICAgICAgICAgKiBAcGFyYW0geSBUaGUgWSBjb29yZGluYXRlIG9mIHZlY3RvciBvZiByb3RhdGlvbiBheGlzLlxuICAgICAgICAgKiBAcGFyYW0geiBUaGUgWiBjb29yZGluYXRlIG9mIHZlY3RvciBvZiByb3RhdGlvbiBheGlzLlxuICAgICAgICAgKiBAcmV0dXJuIHRoaXNcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBzZXRSb3RhdGUgKGFuZ2xlOiBudW1iZXIsIHg6IG51bWJlciwgeTogbnVtYmVyLCB6Om51bWJlcik6IE1hdHJpeCB7XG4gICAgICAgICAgICB2YXIgZSwgcywgYywgbGVuLCBybGVuLCBuYywgeHksIHl6LCB6eCwgeHMsIHlzLCB6cztcblxuICAgICAgICAgICAgdmFyIGFuZ2xlID0gTWF0aC5QSSAqIGFuZ2xlIC8gMTgwO1xuICAgICAgICAgICAgZSA9IHRoaXMuX3ZhbHVlcztcblxuICAgICAgICAgICAgcyA9IE1hdGguc2luKGFuZ2xlKTtcbiAgICAgICAgICAgIGMgPSBNYXRoLmNvcyhhbmdsZSk7XG5cbiAgICAgICAgICAgIGlmICgwICE9PSB4ICYmIDAgPT09IHkgJiYgMCA9PT0geikge1xuICAgICAgICAgICAgICAgIC8vIFJvdGF0aW9uIGFyb3VuZCBYIGF4aXNcbiAgICAgICAgICAgICAgICBpZiAoeCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcyA9IC1zO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlWzBdID0gMTsgIGVbNF0gPSAwOyAgZVsgOF0gPSAwOyAgZVsxMl0gPSAwO1xuICAgICAgICAgICAgICAgIGVbMV0gPSAwOyAgZVs1XSA9IGM7ICBlWyA5XSA9LXM7ICBlWzEzXSA9IDA7XG4gICAgICAgICAgICAgICAgZVsyXSA9IDA7ICBlWzZdID0gczsgIGVbMTBdID0gYzsgIGVbMTRdID0gMDtcbiAgICAgICAgICAgICAgICBlWzNdID0gMDsgIGVbN10gPSAwOyAgZVsxMV0gPSAwOyAgZVsxNV0gPSAxO1xuICAgICAgICAgICAgfSBlbHNlIGlmICgwID09PSB4ICYmIDAgIT09IHkgJiYgMCA9PT0geikge1xuICAgICAgICAgICAgICAgIC8vIFJvdGF0aW9uIGFyb3VuZCBZIGF4aXNcbiAgICAgICAgICAgICAgICBpZiAoeSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcyA9IC1zO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlWzBdID0gYzsgIGVbNF0gPSAwOyAgZVsgOF0gPSBzOyAgZVsxMl0gPSAwO1xuICAgICAgICAgICAgICAgIGVbMV0gPSAwOyAgZVs1XSA9IDE7ICBlWyA5XSA9IDA7ICBlWzEzXSA9IDA7XG4gICAgICAgICAgICAgICAgZVsyXSA9LXM7ICBlWzZdID0gMDsgIGVbMTBdID0gYzsgIGVbMTRdID0gMDtcbiAgICAgICAgICAgICAgICBlWzNdID0gMDsgIGVbN10gPSAwOyAgZVsxMV0gPSAwOyAgZVsxNV0gPSAxO1xuICAgICAgICAgICAgfSBlbHNlIGlmICgwID09PSB4ICYmIDAgPT09IHkgJiYgMCAhPT0geikge1xuICAgICAgICAgICAgICAgIC8vIFJvdGF0aW9uIGFyb3VuZCBaIGF4aXNcbiAgICAgICAgICAgICAgICBpZiAoeiA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcyA9IC1zO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlWzBdID0gYzsgIGVbNF0gPS1zOyAgZVsgOF0gPSAwOyAgZVsxMl0gPSAwO1xuICAgICAgICAgICAgICAgIGVbMV0gPSBzOyAgZVs1XSA9IGM7ICBlWyA5XSA9IDA7ICBlWzEzXSA9IDA7XG4gICAgICAgICAgICAgICAgZVsyXSA9IDA7ICBlWzZdID0gMDsgIGVbMTBdID0gMTsgIGVbMTRdID0gMDtcbiAgICAgICAgICAgICAgICBlWzNdID0gMDsgIGVbN10gPSAwOyAgZVsxMV0gPSAwOyAgZVsxNV0gPSAxO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBSb3RhdGlvbiBhcm91bmQgYW5vdGhlciBheGlzXG4gICAgICAgICAgICAgICAgbGVuID0gTWF0aC5zcXJ0KHgqeCArIHkqeSArIHoqeik7XG4gICAgICAgICAgICAgICAgaWYgKGxlbiAhPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAvL+i9rOaNouS4uuWNleS9jeWQkemHj1xuICAgICAgICAgICAgICAgICAgICBybGVuID0gMSAvIGxlbjtcbiAgICAgICAgICAgICAgICAgICAgeCAqPSBybGVuO1xuICAgICAgICAgICAgICAgICAgICB5ICo9IHJsZW47XG4gICAgICAgICAgICAgICAgICAgIHogKj0gcmxlbjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBuYyA9IDEgLSBjO1xuICAgICAgICAgICAgICAgIHh5ID0geCAqIHk7XG4gICAgICAgICAgICAgICAgeXogPSB5ICogejtcbiAgICAgICAgICAgICAgICB6eCA9IHogKiB4O1xuICAgICAgICAgICAgICAgIHhzID0geCAqIHM7XG4gICAgICAgICAgICAgICAgeXMgPSB5ICogcztcbiAgICAgICAgICAgICAgICB6cyA9IHogKiBzO1xuXG4gICAgICAgICAgICAgICAgZVsgMF0gPSB4KngqbmMgKyAgYztcbiAgICAgICAgICAgICAgICBlWyAxXSA9IHh5ICpuYyArIHpzO1xuICAgICAgICAgICAgICAgIGVbIDJdID0genggKm5jIC0geXM7XG4gICAgICAgICAgICAgICAgZVsgM10gPSAwO1xuXG4gICAgICAgICAgICAgICAgZVsgNF0gPSB4eSAqbmMgLSB6cztcbiAgICAgICAgICAgICAgICBlWyA1XSA9IHkqeSpuYyArICBjO1xuICAgICAgICAgICAgICAgIGVbIDZdID0geXogKm5jICsgeHM7XG4gICAgICAgICAgICAgICAgZVsgN10gPSAwO1xuXG4gICAgICAgICAgICAgICAgZVsgOF0gPSB6eCAqbmMgKyB5cztcbiAgICAgICAgICAgICAgICBlWyA5XSA9IHl6ICpuYyAtIHhzO1xuICAgICAgICAgICAgICAgIGVbMTBdID0geip6Km5jICsgIGM7XG4gICAgICAgICAgICAgICAgZVsxMV0gPSAwO1xuXG4gICAgICAgICAgICAgICAgZVsxMl0gPSAwO1xuICAgICAgICAgICAgICAgIGVbMTNdID0gMDtcbiAgICAgICAgICAgICAgICBlWzE0XSA9IDA7XG4gICAgICAgICAgICAgICAgZVsxNV0gPSAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBNdWx0aXBseSB0aGUgbWF0cml4IGZvciByb3RhdGlvbiBmcm9tIHRoZSByaWdodC5cbiAgICAgICAgICogVGhlIHZlY3RvciBvZiByb3RhdGlvbiBheGlzIG1heSBub3QgYmUgbm9ybWFsaXplZC5cbiAgICAgICAgICogQHBhcmFtIGFuZ2xlIFRoZSBhbmdsZSBvZiByb3RhdGlvbiAoZGVncmVlcylcbiAgICAgICAgICogQHBhcmFtIHggVGhlIFggY29vcmRpbmF0ZSBvZiB2ZWN0b3Igb2Ygcm90YXRpb24gYXhpcy5cbiAgICAgICAgICogQHBhcmFtIHkgVGhlIFkgY29vcmRpbmF0ZSBvZiB2ZWN0b3Igb2Ygcm90YXRpb24gYXhpcy5cbiAgICAgICAgICogQHBhcmFtIHogVGhlIFogY29vcmRpbmF0ZSBvZiB2ZWN0b3Igb2Ygcm90YXRpb24gYXhpcy5cbiAgICAgICAgICogQHJldHVybiB0aGlzXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgcm90YXRlIChhbmdsZSwgeCwgeSwgeik6IE1hdHJpeCB7XG4gICAgICAgICAgICB0aGlzLmFwcGx5TWF0cml4KE1hdHJpeC5jcmVhdGUoKS5zZXRSb3RhdGUoYW5nbGUsIHgsIHksIHopKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogU2V0IHRoZSBtYXRyaXggZm9yIHNjYWxpbmcuXG4gICAgICAgICAqIEBwYXJhbSB4IFRoZSBzY2FsZSBmYWN0b3IgYWxvbmcgdGhlIFggYXhpc1xuICAgICAgICAgKiBAcGFyYW0geSBUaGUgc2NhbGUgZmFjdG9yIGFsb25nIHRoZSBZIGF4aXNcbiAgICAgICAgICogQHBhcmFtIHogVGhlIHNjYWxlIGZhY3RvciBhbG9uZyB0aGUgWiBheGlzXG4gICAgICAgICAqIEByZXR1cm4gdGhpc1xuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIHNldFNjYWxlICh4LCB5LCB6KTpNYXRyaXgge1xuICAgICAgICAgICAgdmFyIGUgPSB0aGlzLl92YWx1ZXM7XG4gICAgICAgICAgICBlWzBdID0geDsgIGVbNF0gPSAwOyAgZVs4XSAgPSAwOyAgZVsxMl0gPSAwO1xuICAgICAgICAgICAgZVsxXSA9IDA7ICBlWzVdID0geTsgIGVbOV0gID0gMDsgIGVbMTNdID0gMDtcbiAgICAgICAgICAgIGVbMl0gPSAwOyAgZVs2XSA9IDA7ICBlWzEwXSA9IHo7ICBlWzE0XSA9IDA7XG4gICAgICAgICAgICBlWzNdID0gMDsgIGVbN10gPSAwOyAgZVsxMV0gPSAwOyAgZVsxNV0gPSAxO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogTXVsdGlwbHkgdGhlIG1hdHJpeCBmb3Igc2NhbGluZyBmcm9tIHRoZSByaWdodC5cbiAgICAgICAgICogQHBhcmFtIHggVGhlIHNjYWxlIGZhY3RvciBhbG9uZyB0aGUgWCBheGlzXG4gICAgICAgICAqIEBwYXJhbSB5IFRoZSBzY2FsZSBmYWN0b3IgYWxvbmcgdGhlIFkgYXhpc1xuICAgICAgICAgKiBAcGFyYW0geiBUaGUgc2NhbGUgZmFjdG9yIGFsb25nIHRoZSBaIGF4aXNcbiAgICAgICAgICogQHJldHVybiB0aGlzXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgc2NhbGUgKHgsIHksIHopOk1hdHJpeCB7XG4gICAgICAgICAgICB0aGlzLmFwcGx5TWF0cml4KE1hdHJpeC5jcmVhdGUoKS5zZXRTY2FsZSh4LCB5LCB6KSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHNldExvb2tBdCAoZXllWCwgZXllWSwgZXllWiwgY2VudGVyWCwgY2VudGVyWSwgY2VudGVyWiwgdXBYLCB1cFksIHVwWik6TWF0cml4IHtcbiAgICAgICAgICAgIHZhciBlLCBmeCwgZnksIGZ6LCBybGYsIHN4LCBzeSwgc3osIHJscywgdXgsIHV5LCB1ejtcblxuICAgICAgICAgICAgZnggPSBjZW50ZXJYIC0gZXllWDtcbiAgICAgICAgICAgIGZ5ID0gY2VudGVyWSAtIGV5ZVk7XG4gICAgICAgICAgICBmeiA9IGNlbnRlclogLSBleWVaO1xuXG4gICAgICAgICAgICAvLyBOb3JtYWxpemUgZi5cbiAgICAgICAgICAgIHJsZiA9IDEgLyBNYXRoLnNxcnQoZngqZnggKyBmeSpmeSArIGZ6KmZ6KTtcbiAgICAgICAgICAgIGZ4ICo9IHJsZjtcbiAgICAgICAgICAgIGZ5ICo9IHJsZjtcbiAgICAgICAgICAgIGZ6ICo9IHJsZjtcblxuICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIGNyb3NzIHByb2R1Y3Qgb2YgZiBhbmQgdXAuXG4gICAgICAgICAgICBzeCA9IGZ5ICogdXBaIC0gZnogKiB1cFk7XG4gICAgICAgICAgICBzeSA9IGZ6ICogdXBYIC0gZnggKiB1cFo7XG4gICAgICAgICAgICBzeiA9IGZ4ICogdXBZIC0gZnkgKiB1cFg7XG5cbiAgICAgICAgICAgIC8vIE5vcm1hbGl6ZSBzLlxuICAgICAgICAgICAgcmxzID0gMSAvIE1hdGguc3FydChzeCpzeCArIHN5KnN5ICsgc3oqc3opO1xuICAgICAgICAgICAgc3ggKj0gcmxzO1xuICAgICAgICAgICAgc3kgKj0gcmxzO1xuICAgICAgICAgICAgc3ogKj0gcmxzO1xuXG4gICAgICAgICAgICAvLyBDYWxjdWxhdGUgY3Jvc3MgcHJvZHVjdCBvZiBzIGFuZCBmLlxuICAgICAgICAgICAgdXggPSBzeSAqIGZ6IC0gc3ogKiBmeTtcbiAgICAgICAgICAgIHV5ID0gc3ogKiBmeCAtIHN4ICogZno7XG4gICAgICAgICAgICB1eiA9IHN4ICogZnkgLSBzeSAqIGZ4O1xuXG4gICAgICAgICAgICAvLyBTZXQgdG8gdGhpcy5cbiAgICAgICAgICAgIGUgPSB0aGlzLl92YWx1ZXM7XG4gICAgICAgICAgICBlWzBdID0gc3g7XG4gICAgICAgICAgICBlWzFdID0gdXg7XG4gICAgICAgICAgICBlWzJdID0gLWZ4O1xuICAgICAgICAgICAgZVszXSA9IDA7XG5cbiAgICAgICAgICAgIGVbNF0gPSBzeTtcbiAgICAgICAgICAgIGVbNV0gPSB1eTtcbiAgICAgICAgICAgIGVbNl0gPSAtZnk7XG4gICAgICAgICAgICBlWzddID0gMDtcblxuICAgICAgICAgICAgZVs4XSA9IHN6O1xuICAgICAgICAgICAgZVs5XSA9IHV6O1xuICAgICAgICAgICAgZVsxMF0gPSAtZno7XG4gICAgICAgICAgICBlWzExXSA9IDA7XG5cbiAgICAgICAgICAgIGVbMTJdID0gMDtcbiAgICAgICAgICAgIGVbMTNdID0gMDtcbiAgICAgICAgICAgIGVbMTRdID0gMDtcbiAgICAgICAgICAgIGVbMTVdID0gMTtcblxuICAgICAgICAgICAgLy9UcmFuc2xhdGUuXG4gICAgICAgICAgICAvL3RoaXMudHJhbnNsYXRlKC1leWVYLCAtZXllWSwgLWV5ZVopO1xuICAgICAgICAgICAgdGhpcy52YWx1ZXMgPSB0aGlzLm11bHRpcGx5KE1hdHJpeC5jcmVhdGUoKS5zZXRUcmFuc2xhdGUoLWV5ZVgsIC1leWVZLCAtZXllWikpLnZhbHVlcztcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogTXVsdGlwbHkgdGhlIHZpZXdpbmcgbWF0cml4IGZyb20gdGhlIHJpZ2h0LlxuICAgICAgICAgKiBAcGFyYW0gZXllWCwgZXllWSwgZXllWiBUaGUgcG9zaXRpb24gb2YgdGhlIGV5ZSBwb2ludC5cbiAgICAgICAgICogQHBhcmFtIGNlbnRlclgsIGNlbnRlclksIGNlbnRlclogVGhlIHBvc2l0aW9uIG9mIHRoZSByZWZlcmVuY2UgcG9pbnQuXG4gICAgICAgICAqIEBwYXJhbSB1cFgsIHVwWSwgdXBaIFRoZSBkaXJlY3Rpb24gb2YgdGhlIHVwIHZlY3Rvci5cbiAgICAgICAgICogQHJldHVybiB0aGlzXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgbG9va0F0IChleWVYLCBleWVZLCBleWVaLCBjZW50ZXJYLCBjZW50ZXJZLCBjZW50ZXJaLCB1cFgsIHVwWSwgdXBaKTpNYXRyaXgge1xuICAgICAgICAgICAgdGhpcy5hcHBseU1hdHJpeChNYXRyaXguY3JlYXRlKCkuc2V0TG9va0F0KGV5ZVgsIGV5ZVksIGV5ZVosIGNlbnRlclgsIGNlbnRlclksIGNlbnRlclosIHVwWCwgdXBZLCB1cFopKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHB1YmxpYyBzZXRPcnRobyAobmVhciwgZmFyKTpNYXRyaXgge1xuICAgICAgICAgICAgdmFyIGUgPSB0aGlzLl92YWx1ZXM7XG5cbiAgICAgICAgICAgIGVbMF0gPSAxO1xuICAgICAgICAgICAgZVsxXSA9IDA7XG4gICAgICAgICAgICBlWzJdID0gMDtcbiAgICAgICAgICAgIGVbM10gPSAwO1xuICAgICAgICAgICAgZVs0XSA9IDA7XG4gICAgICAgICAgICBlWzVdID0gMTtcbiAgICAgICAgICAgIGVbNl0gPSAwO1xuICAgICAgICAgICAgZVs3XSA9IDA7XG4gICAgICAgICAgICBlWzhdID0gMDtcbiAgICAgICAgICAgIGVbOV0gPSAwO1xuICAgICAgICAgICAgZVsxMF0gPSAyIC8gKG5lYXIgLSBmYXIpO1xuICAgICAgICAgICAgZVsxMV0gPSAwO1xuICAgICAgICAgICAgZVsxMl0gPSAwO1xuICAgICAgICAgICAgZVsxM10gPSAwO1xuICAgICAgICAgICAgZVsxNF0gPSAobmVhciArIGZhcikgLyAobmVhciAtIGZhcik7XG4gICAgICAgICAgICBlWzE1XSA9IDE7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIG9ydGhvIChuLCBmKTpNYXRyaXh7XG4gICAgICAgICAgICB0aGlzLmFwcGx5TWF0cml4KE1hdHJpeC5jcmVhdGUoKS5zZXRPcnRobyhuLCBmKSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldCB0aGUgcGVyc3BlY3RpdmUgcHJvamVjdGlvbiBtYXRyaXggYnkgZm92eSBhbmQgYXNwZWN0LlxuICAgICAgICAgKiBAcGFyYW0gZm92eSBUaGUgYW5nbGUgYmV0d2VlbiB0aGUgdXBwZXIgYW5kIGxvd2VyIHNpZGVzIG9mIHRoZSBmcnVzdHVtLlxuICAgICAgICAgKiBAcGFyYW0gYXNwZWN0IFRoZSBhc3BlY3QgcmF0aW8gb2YgdGhlIGZydXN0dW0uICh3aWR0aC9oZWlnaHQpXG4gICAgICAgICAqIEBwYXJhbSBuZWFyIFRoZSBkaXN0YW5jZXMgdG8gdGhlIG5lYXJlciBkZXB0aCBjbGlwcGluZyBwbGFuZS4gVGhpcyB2YWx1ZSBtdXN0IGJlIHBsdXMgdmFsdWUuXG4gICAgICAgICAqIEBwYXJhbSBmYXIgVGhlIGRpc3RhbmNlcyB0byB0aGUgZmFydGhlciBkZXB0aCBjbGlwcGluZyBwbGFuZS4gVGhpcyB2YWx1ZSBtdXN0IGJlIHBsdXMgdmFsdWUuXG4gICAgICAgICAqIEByZXR1cm4gdGhpc1xuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIHNldFBlcnNwZWN0aXZlIChmb3Z5OiBudW1iZXIsIGFzcGVjdCwgbmVhciwgZmFyKTpNYXRyaXgge1xuICAgICAgICAgICAgdmFyIGUsIHJkLCBzLCBjdCxcbiAgICAgICAgICAgICAgICBsb2cgPSBkeUNiLkxvZyxcbiAgICAgICAgICAgICAgICBpbmZvID0gbG9nLmluZm87XG5cbiAgICAgICAgICAgIGxvZy5lcnJvcihuZWFyID09PSBmYXIgfHwgYXNwZWN0ID09PSAwLCBpbmZvLkZVTkNfTVVTVF9OT1RfQkUoXCJmcnVzdHVtXCIsIFwibnVsbFwiKSk7XG4gICAgICAgICAgICBsb2cuZXJyb3IobmVhciA8PSAwLCBpbmZvLkZVTkNfTVVTVChcIm5lYXJcIiwgXCI+IDBcIikpO1xuICAgICAgICAgICAgbG9nLmVycm9yKGZhciA8PSAwLCBpbmZvLkZVTkNfTVVTVChcImZhclwiLCBcIj4gMFwiKSk7XG5cbiAgICAgICAgICAgIHZhciBmb3Z5ID0gTWF0aC5QSSAqIGZvdnkgLyAxODAgLyAyO1xuICAgICAgICAgICAgcyA9IE1hdGguc2luKGZvdnkpO1xuICAgICAgICAgICAgaWYgKHMgPT09IDApIHtcbiAgICAgICAgICAgICAgICBsb2cuZXJyb3IocyA9PT0gMCwgaW5mby5GVU5DX01VU1RfTk9UX0JFKFwiZnJ1c3R1bVwiLCBcIm51bGxcIikpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZCA9IDEgLyAoZmFyIC0gbmVhcik7XG4gICAgICAgICAgICBjdCA9IE1hdGguY29zKGZvdnkpIC8gcztcblxuICAgICAgICAgICAgZSA9IHRoaXMuX3ZhbHVlcztcblxuICAgICAgICAgICAgZVswXSAgPSBjdCAvIGFzcGVjdDtcbiAgICAgICAgICAgIGVbMV0gID0gMDtcbiAgICAgICAgICAgIGVbMl0gID0gMDtcbiAgICAgICAgICAgIGVbM10gID0gMDtcblxuICAgICAgICAgICAgZVs0XSAgPSAwO1xuICAgICAgICAgICAgZVs1XSAgPSBjdDtcbiAgICAgICAgICAgIGVbNl0gID0gMDtcbiAgICAgICAgICAgIGVbN10gID0gMDtcblxuICAgICAgICAgICAgZVs4XSAgPSAwO1xuICAgICAgICAgICAgZVs5XSAgPSAwO1xuICAgICAgICAgICAgZVsxMF0gPSAtKGZhciArIG5lYXIpICogcmQ7XG4gICAgICAgICAgICBlWzExXSA9IC0xO1xuXG4gICAgICAgICAgICBlWzEyXSA9IDA7XG4gICAgICAgICAgICBlWzEzXSA9IDA7XG4gICAgICAgICAgICBlWzE0XSA9IC0yICogbmVhciAqIGZhciAqIHJkO1xuICAgICAgICAgICAgZVsxNV0gPSAwO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBwZXJzcGVjdGl2ZSAoZm92eSwgYXNwZWN0LCBuZWFyLCBmYXIpOk1hdHJpeHtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlNYXRyaXgoTWF0cml4LmNyZWF0ZSgpLnNldFBlcnNwZWN0aXZlKGZvdnksIGFzcGVjdCwgbmVhciwgZmFyKSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGFwcGx5TWF0cml4IChvdGhlcjpNYXRyaXgpOk1hdHJpeHtcbiAgICAgICAgICAgIHZhciBhID0gdGhpcyxcbiAgICAgICAgICAgICAgICBiID0gb3RoZXI7XG5cbiAgICAgICAgICAgIC8vdGhpcy5fdmFsdWVzID0gTWF0aFV0aWxzLm11bHRpcGx5KGEsIGIpO1xuICAgICAgICAgICAgICAgIC8vYiph77yM6ICM5LiN5pivYSpiXG4gICAgICAgICAgICAgICAgLy/ov5nmmK/lm6DkuLrlnKh3ZWJnbOS4re+8jOWQkemHj+aYr+WPs+S5mOeahO+8jFxuICAgICAgICAgICAgICAgIC8v5q2k5aSE5biM5pyb5Z2Q5qCH5ZCR6YeP5YWI6L+b6KGMdGhpcy5fdmFsdWVz55qE5Y+Y5o2i77yM54S25ZCO6L+b6KGMb3RoZXIudmFsdWVz55qE5Y+Y5o2i77yM5Zug5q2k6KaBYiph77yM5LuO6ICM5Zyo5Y+z5LmY5ZCR6YeP5pe25Li6YiphKnZlY1xuICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlcyA9IGIubXVsdGlwbHkoYSkudmFsdWVzO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBtdWx0aXBseShtYXRyaXgyOk1hdHJpeCk6TWF0cml4IHtcbiAgICAgICAgICAgIHZhciBtYXQxID0gdGhpcy5fdmFsdWVzLFxuICAgICAgICAgICAgICAgIG1hdDIgPSBtYXRyaXgyLnZhbHVlcztcbiAgICAgICAgICAgIHZhciBhID0gbWF0MVswXSwgYiA9IG1hdDFbMV0sIGMgPSBtYXQxWzJdLCBkID0gbWF0MVszXSxcbiAgICAgICAgICAgICAgICBlID0gbWF0MVs0XSwgZiA9IG1hdDFbNV0sIGcgPSBtYXQxWzZdLCBoID0gbWF0MVs3XSxcbiAgICAgICAgICAgICAgICBpID0gbWF0MVs4XSwgaiA9IG1hdDFbOV0sIGsgPSBtYXQxWzEwXSwgbCA9IG1hdDFbMTFdLFxuICAgICAgICAgICAgICAgIG0gPSBtYXQxWzEyXSwgbiA9IG1hdDFbMTNdLCBvID0gbWF0MVsxNF0sIHAgPSBtYXQxWzE1XSxcbiAgICAgICAgICAgICAgICBBID0gbWF0MlswXSwgQiA9IG1hdDJbMV0sIEMgPSBtYXQyWzJdLCBEID0gbWF0MlszXSxcbiAgICAgICAgICAgICAgICBFID0gbWF0Mls0XSwgRiA9IG1hdDJbNV0sIEcgPSBtYXQyWzZdLCBIID0gbWF0Mls3XSxcbiAgICAgICAgICAgICAgICBJID0gbWF0Mls4XSwgSiA9IG1hdDJbOV0sIEsgPSBtYXQyWzEwXSwgTCA9IG1hdDJbMTFdLFxuICAgICAgICAgICAgICAgIE0gPSBtYXQyWzEyXSwgTiA9IG1hdDJbMTNdLCBPID0gbWF0MlsxNF0sIFAgPSBtYXQyWzE1XTtcbiAgICAgICAgICAgIHZhciBkZXN0ID0gbmV3IEZsb2F0MzJBcnJheSgxNik7XG5cbiAgICAgICAgICAgIGRlc3RbMF0gPSBBICogYSArIEIgKiBlICsgQyAqIGkgKyBEICogbTtcbiAgICAgICAgICAgIGRlc3RbMV0gPSBBICogYiArIEIgKiBmICsgQyAqIGogKyBEICogbjtcbiAgICAgICAgICAgIGRlc3RbMl0gPSBBICogYyArIEIgKiBnICsgQyAqIGsgKyBEICogbztcbiAgICAgICAgICAgIGRlc3RbM10gPSBBICogZCArIEIgKiBoICsgQyAqIGwgKyBEICogcDtcbiAgICAgICAgICAgIGRlc3RbNF0gPSBFICogYSArIEYgKiBlICsgRyAqIGkgKyBIICogbTtcbiAgICAgICAgICAgIGRlc3RbNV0gPSBFICogYiArIEYgKiBmICsgRyAqIGogKyBIICogbjtcbiAgICAgICAgICAgIGRlc3RbNl0gPSBFICogYyArIEYgKiBnICsgRyAqIGsgKyBIICogbztcbiAgICAgICAgICAgIGRlc3RbN10gPSBFICogZCArIEYgKiBoICsgRyAqIGwgKyBIICogcDtcbiAgICAgICAgICAgIGRlc3RbOF0gPSBJICogYSArIEogKiBlICsgSyAqIGkgKyBMICogbTtcbiAgICAgICAgICAgIGRlc3RbOV0gPSBJICogYiArIEogKiBmICsgSyAqIGogKyBMICogbjtcbiAgICAgICAgICAgIGRlc3RbMTBdID0gSSAqIGMgKyBKICogZyArIEsgKiBrICsgTCAqIG87XG4gICAgICAgICAgICBkZXN0WzExXSA9IEkgKiBkICsgSiAqIGggKyBLICogbCArIEwgKiBwO1xuICAgICAgICAgICAgZGVzdFsxMl0gPSBNICogYSArIE4gKiBlICsgTyAqIGkgKyBQICogbTtcbiAgICAgICAgICAgIGRlc3RbMTNdID0gTSAqIGIgKyBOICogZiArIE8gKiBqICsgUCAqIG47XG4gICAgICAgICAgICBkZXN0WzE0XSA9IE0gKiBjICsgTiAqIGcgKyBPICogayArIFAgKiBvO1xuICAgICAgICAgICAgZGVzdFsxNV0gPSBNICogZCArIE4gKiBoICsgTyAqIGwgKyBQICogcDtcblxuICAgICAgICAgICAgcmV0dXJuIE1hdHJpeC5jcmVhdGUoZGVzdCk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgbXVsdGlwbHlWZWN0b3I0KHZlY3RvcjpWZWN0b3I0KTpWZWN0b3I0IHtcbiAgICAgICAgICAgIHZhciBtYXQxID0gdGhpcy5fdmFsdWVzLFxuICAgICAgICAgICAgICAgIHZlYzQgPSB2ZWN0b3IudmFsdWVzO1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuXG4gICAgICAgICAgICByZXN1bHRbMF0gPSB2ZWM0WzBdICogbWF0MVswXSArIHZlYzRbMV0gKiBtYXQxWzRdICsgdmVjNFsyXSAqIG1hdDFbOF0gKyB2ZWM0WzNdICogbWF0MVsxMl07XG4gICAgICAgICAgICByZXN1bHRbMV0gPSB2ZWM0WzBdICogbWF0MVsxXSArIHZlYzRbMV0gKiBtYXQxWzVdICsgdmVjNFsyXSAqIG1hdDFbOV0gKyB2ZWM0WzNdICogbWF0MVsxM107XG4gICAgICAgICAgICByZXN1bHRbMl0gPSB2ZWM0WzBdICogbWF0MVsyXSArIHZlYzRbMV0gKiBtYXQxWzZdICsgdmVjNFsyXSAqIG1hdDFbMTBdICsgdmVjNFszXSAqIG1hdDFbMTRdO1xuICAgICAgICAgICAgcmVzdWx0WzNdID0gdmVjNFswXSAqIG1hdDFbM10gKyB2ZWM0WzFdICogbWF0MVs3XSArIHZlYzRbMl0gKiBtYXQxWzExXSArIHZlYzRbM10gKiBtYXQxWzE1XTtcblxuICAgICAgICAgICAgcmV0dXJuIFZlY3RvcjQuY3JlYXRlKHJlc3VsdFswXSwgcmVzdWx0WzFdLCByZXN1bHRbMl0sIHJlc3VsdFszXSk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgY29weSgpOiBNYXRyaXh7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gTWF0cml4LmNyZWF0ZSgpLFxuICAgICAgICAgICAgICAgIGkgPSAwLFxuICAgICAgICAgICAgICAgIGxlbiA9IHRoaXMuX3ZhbHVlcy5sZW5ndGg7XG5cbiAgICAgICAgICAgIGZvcihpID0gMDsgaSA8IGxlbjsgaSsrKXtcbiAgICAgICAgICAgICAgICByZXN1bHQudmFsdWVzW2ldID0gdGhpcy5fdmFsdWVzW2ldO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZGVmaW5pdGlvbnMuZC50c1wiLz5cbm1vZHVsZSBkeXtcbiAgICBleHBvcnQgY2xhc3MgQWN0aW9ue1xuICAgICAgICBwcml2YXRlIF9pc0ZpbmlzaDpib29sZWFuID0gZmFsc2U7XG4gICAgICAgIGdldCBpc0ZpbmlzaCgpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2lzRmluaXNoO1xuICAgICAgICB9XG4gICAgICAgIHNldCBpc0ZpbmlzaChpc0ZpbmlzaDpib29sZWFuKXtcbiAgICAgICAgICAgIHRoaXMuX2lzRmluaXNoID0gaXNGaW5pc2g7XG4gICAgICAgIH1cblxuICAgICAgICBwcm90ZWN0ZWQgbWF0cml4Ok1hdHJpeCA9IG51bGw7XG5cbiAgICAgICAgY29uc3RydWN0b3IobWF0cml4Ok1hdHJpeCl7XG4gICAgICAgICAgICB0aGlzLm1hdHJpeCA9IG1hdHJpeDtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyB1cGRhdGUoKXtcbiAgICAgICAgICAgIHJldHVybiBkeUNiLkxvZy5lcnJvcih0cnVlLCBkeUNiLkxvZy5pbmZvLkFCU1RSQUNUX01FVEhPRCk7XG4gICAgICAgIH1cblxuICAgICAgICBwcm90ZWN0ZWQgZmluaXNoKCl7XG4gICAgICAgICAgICB0aGlzLl9pc0ZpbmlzaCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZGVmaW5pdGlvbnMuZC50c1wiLz5cbm1vZHVsZSBkeXtcbiAgICBleHBvcnQgY2xhc3MgQWN0aW9uTWFuYWdlcntcbiAgICAgICAgcHVibGljIHN0YXRpYyBjcmVhdGUoKTpBY3Rpb25NYW5hZ2VyIHtcbiAgICAgICAgICAgIHZhciBvYmogPSBuZXcgdGhpcygpO1xuXG4gICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfY2hpbGRyZW46ZHlDYi5Db2xsZWN0aW9uID0gZHlDYi5Db2xsZWN0aW9uLmNyZWF0ZSgpO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgYWRkQ2hpbGQoYWN0aW9uOkFjdGlvbil7XG4gICAgICAgICAgICBpZih0aGlzLmhhc0NoaWxkKGFjdGlvbikpe1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fY2hpbGRyZW4uYWRkQ2hpbGQoYWN0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBoYXNDaGlsZChhY3Rpb246QWN0aW9uKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jaGlsZHJlbi5oYXNDaGlsZChhY3Rpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHVwZGF0ZSgpe1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICAgICAgICAgIHJlbW92ZVF1ZXVlID0gW107XG4gICAgICAgICAgICAvL3RpbWUgPSBudWxsO1xuXG4gICAgICAgICAgICB0aGlzLl9jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uKGNoaWxkKXtcbiAgICAgICAgICAgICAgICAvL+S/ruWkjeKAnOWmguaenOmBjeWOhueahOWKqOS9nOWIoOmZpOS6huWKqOS9nOW6j+WIl+S4reafkOS4quWKqOS9nO+8jOWImeWcqOWQjumdoueahOmBjeWOhuS4reS8muaKpemUmeKAneeahGJ1Z1xuICAgICAgICAgICAgICAgIGlmICghY2hpbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChjaGlsZC5pc0ZpbmlzaCkge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVRdWV1ZS5wdXNoKGNoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL2lmIChjaGlsZC5pc1N0b3AoKSkge1xuICAgICAgICAgICAgICAgIC8vICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAvL31cblxuICAgICAgICAgICAgICAgIC8vY2hpbGQudXBkYXRlKHRpbWUpO1xuICAgICAgICAgICAgICAgIGNoaWxkLnVwZGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJlbW92ZVF1ZXVlLmZvckVhY2goZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5fY2hpbGRyZW4ucmVtb3ZlQ2hpbGQoY2hpbGQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RlZmluaXRpb25zLmQudHNcIi8+XG5tb2R1bGUgZHl7XG4gICAgZXhwb3J0IGNsYXNzIFJvdGF0ZSBleHRlbmRzIEFjdGlvbntcbiAgICAgICAgcHVibGljIHN0YXRpYyBjcmVhdGUobWF0cml4LCBhY3Rpb25EYXRhKTpSb3RhdGUge1xuICAgICAgICAgICAgdmFyIG9iaiA9IG5ldyB0aGlzKG1hdHJpeCwgYWN0aW9uRGF0YSk7XG5cbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9zcGVlZDpudW1iZXIgPSBudWxsO1xuICAgICAgICBwcml2YXRlIF9heGlzOlZlY3RvcjMgPSBudWxsO1xuICAgICAgICBwcml2YXRlIF9wb2ludDpWZWN0b3IzID0gbnVsbDtcbiAgICAgICAgcHJpdmF0ZSBfYW5nbGU6bnVtYmVyID0gMDtcblxuICAgICAgICBjb25zdHJ1Y3RvcihtYXRyaXg6TWF0cml4LCBheGlzRGF0YTp7c3BlZWQ6bnVtYmVyO2F4aXM6VmVjdG9yM1tdfSl7XG4gICAgICAgICAgICBzdXBlcihtYXRyaXgpO1xuXG4gICAgICAgICAgICB0aGlzLl9zcGVlZCA9IGF4aXNEYXRhLnNwZWVkO1xuICAgICAgICAgICAgaWYoYXhpc0RhdGEuYXhpcy5sZW5ndGggPT09IDIpe1xuICAgICAgICAgICAgICAgIHRoaXMuX2F4aXMgPSBheGlzRGF0YS5heGlzWzFdLnN1YihheGlzRGF0YS5heGlzWzBdKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9wb2ludCA9IGF4aXNEYXRhLmF4aXNbMF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGF4aXNEYXRhLmF4aXMubGVuZ3RoID09PSAxICl7XG4gICAgICAgICAgICAgICAgdGhpcy5fYXhpcyA9IGF4aXNEYXRhLmF4aXNbMF07XG4gICAgICAgICAgICAgICAgdGhpcy5fcG9pbnQgPSBWZWN0b3IzLmNyZWF0ZSgwLCAwLCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZHlDYi5Mb2cuZXJyb3IodHJ1ZSwgXCJheGlzJ3MgbGVuZ3RoIHNob3VsZCBiZSAxIG9yIDJcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgdXBkYXRlKCl7XG4gICAgICAgICAgICB2YXIgbW92ZVBvaW50ID0gbnVsbCxcbiAgICAgICAgICAgICAgICBiYWNrUG9pbnQgPSBudWxsO1xuXG4gICAgICAgICAgICB0aGlzLl9hbmdsZSA9IHRoaXMuX3NwZWVkO1xuXG4gICAgICAgICAgICBpZih0aGlzLl9pc05vdFJvdGF0ZUFyb3VuZE9yaWdpblBvaW50KCkpe1xuICAgICAgICAgICAgICAgIG1vdmVQb2ludCA9IHRoaXMuX3BvaW50LmNvcHkoKS5yZXZlcnNlKCkudmFsdWVzO1xuICAgICAgICAgICAgICAgIGJhY2tQb2ludCA9IHRoaXMuX3BvaW50LnZhbHVlcztcblxuICAgICAgICAgICAgICAgIHRoaXMubWF0cml4LnRyYW5zbGF0ZShtb3ZlUG9pbnRbMF0sIG1vdmVQb2ludFsxXSwgbW92ZVBvaW50WzJdKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1hdHJpeC5yb3RhdGUodGhpcy5fYW5nbGUsIHRoaXMuX2F4aXMudmFsdWVzWzBdLCB0aGlzLl9heGlzLnZhbHVlc1sxXSwgdGhpcy5fYXhpcy52YWx1ZXNbMl0pO1xuICAgICAgICAgICAgICAgIHRoaXMubWF0cml4LnRyYW5zbGF0ZShiYWNrUG9pbnRbMF0sIGJhY2tQb2ludFsxXSwgYmFja1BvaW50WzJdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXRyaXgucm90YXRlKHRoaXMuX2FuZ2xlLCB0aGlzLl9heGlzLnZhbHVlc1swXSwgdGhpcy5fYXhpcy52YWx1ZXNbMV0sIHRoaXMuX2F4aXMudmFsdWVzWzJdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2lzTm90Um90YXRlQXJvdW5kT3JpZ2luUG9pbnQoKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9wb2ludC52YWx1ZXNbMF0gIT09IDBcbiAgICAgICAgICAgICAgICB8fCB0aGlzLl9wb2ludC52YWx1ZXNbMV0gIT09IDBcbiAgICAgICAgICAgICAgICB8fCB0aGlzLl9wb2ludC52YWx1ZXNbMl0gIT09IDA7XG4gICAgICAgIH1cbiAgICB9XG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RlZmluaXRpb25zLmQudHNcIi8+XG5tb2R1bGUgZHl7XG4gICAgZXhwb3J0IGNsYXNzIFNjYWxlIGV4dGVuZHMgQWN0aW9ue1xuICAgICAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZShtYXRyaXgsIGRhdGEpOlNjYWxlIHtcbiAgICAgICAgICAgIHZhciBvYmogPSBuZXcgdGhpcyhtYXRyaXgsIGRhdGEpO1xuXG4gICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfeDpudW1iZXIgPSAwO1xuICAgICAgICBwcml2YXRlIF95Om51bWJlciA9IDA7XG4gICAgICAgIHByaXZhdGUgX3o6bnVtYmVyID0gMDtcblxuICAgICAgICBjb25zdHJ1Y3RvcihtYXRyaXg6TWF0cml4LCBkYXRhOnt4Om51bWJlcjt5Om51bWJlcjt6Om51bWJlcn0pe1xuICAgICAgICAgICAgc3VwZXIobWF0cml4KTtcblxuICAgICAgICAgICAgdGhpcy5feCA9IGRhdGEueDtcbiAgICAgICAgICAgIHRoaXMuX3kgPSBkYXRhLnk7XG4gICAgICAgICAgICB0aGlzLl96ID0gZGF0YS56O1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHVwZGF0ZSgpe1xuICAgICAgICAgICAgdGhpcy5tYXRyaXguc2NhbGUodGhpcy5feCwgdGhpcy5feSwgdGhpcy5feik7XG4gICAgICAgICAgICB0aGlzLmZpbmlzaCgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZGVmaW5pdGlvbnMuZC50c1wiLz5cbm1vZHVsZSBkeXtcbiAgICBleHBvcnQgY2xhc3MgVHJhbnNsYXRlIGV4dGVuZHMgQWN0aW9ue1xuICAgICAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZShtYXRyaXgsIHBvc0RhdGEpOlRyYW5zbGF0ZSB7XG4gICAgICAgICAgICB2YXIgb2JqID0gbmV3IHRoaXMobWF0cml4LCBwb3NEYXRhKTtcblxuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX3g6bnVtYmVyID0gMDtcbiAgICAgICAgcHJpdmF0ZSBfeTpudW1iZXIgPSAwO1xuICAgICAgICBwcml2YXRlIF96Om51bWJlciA9IDA7XG5cbiAgICAgICAgY29uc3RydWN0b3IobWF0cml4Ok1hdHJpeCwgcG9zRGF0YTp7eDpudW1iZXI7eTpudW1iZXI7ejpudW1iZXJ9KXtcbiAgICAgICAgICAgIHN1cGVyKG1hdHJpeCk7XG5cbiAgICAgICAgICAgIHRoaXMuX3ggPSBwb3NEYXRhLng7XG4gICAgICAgICAgICB0aGlzLl95ID0gcG9zRGF0YS55O1xuICAgICAgICAgICAgdGhpcy5feiA9IHBvc0RhdGEuejtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyB1cGRhdGUoKXtcbiAgICAgICAgICAgIHRoaXMubWF0cml4LnRyYW5zbGF0ZSh0aGlzLl94LCB0aGlzLl95LCB0aGlzLl96KTtcbiAgICAgICAgICAgIHRoaXMuZmluaXNoKCk7XG4gICAgICAgIH1cbiAgICB9XG59IiwiLy9yZWZlcmVuY2UgdG8gdGhyZWUuanMtPkNvbG9yLmpzXG5tb2R1bGUgZHl7XG4gICAgZXhwb3J0IGNsYXNzIENvbG9yIHtcbiAgICAgICAgcHVibGljIHN0YXRpYyBjcmVhdGUoY29sb3JWYWw6c3RyaW5nKSB7XG4gICAgICAgICAgICB2YXIgb2JqID0gbmV3IHRoaXMoKTtcblxuICAgICAgICAgICAgb2JqLmluaXRXaGVuQ3JlYXRlKGNvbG9yVmFsKTtcblxuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX3I6bnVtYmVyID0gbnVsbDtcbiAgICAgICAgZ2V0IHIoKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yO1xuICAgICAgICB9XG4gICAgICAgIHNldCByKHI6bnVtYmVyKXtcbiAgICAgICAgICAgIHRoaXMuX3IgPSByO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfZzpudW1iZXIgPSBudWxsO1xuICAgICAgICBnZXQgZygpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2c7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IGcoZzpudW1iZXIpe1xuICAgICAgICAgICAgdGhpcy5fZyA9IGc7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9iOm51bWJlciA9IG51bGw7XG4gICAgICAgIGdldCBiKCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYjtcbiAgICAgICAgfVxuICAgICAgICBzZXQgYihiOm51bWJlcil7XG4gICAgICAgICAgICB0aGlzLl9iID0gYjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGluaXRXaGVuQ3JlYXRlKGNvbG9yVmFsOnN0cmluZykge1xuICAgICAgICAgICAgdGhpcy5fc2V0Q29sb3IoY29sb3JWYWwpO1xuICAgICAgICB9XG5cblxuICAgICAgICBwcml2YXRlIF9zZXRDb2xvcihjb2xvclZhbDpzdHJpbmcpIHtcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLy8vIHJnYigyNTUsMCwwKVxuICAgICAgICAgICAgLy8vL1xuICAgICAgICAgICAgLy8vL+WwhuaIkeS7rOW5s+W4uOS5oOaDr+eahOminOiJsuWAvOihqOi+vuW9ouW8j3JnYigyNTUsMCwwKS3mlbDlgLzlnovvvIzovazmjaLmiJBUSFJFRS5KU+iupOivhueahOW9ouW8jzAuMC0xLjDvvIxcbiAgICAgICAgICAgIC8vLy/ov5nph4zlsIblj5blgLzojIPlm7Tku44wLTI1NeaNoueul+aIkDAuMC0xLjAuXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy9pZiAoIC9ecmdiXFwoKFxcZCspLCA/KFxcZCspLCA/KFxcZCspXFwpJC9pLnRlc3QoIHN0eWxlICkgKSB7XHQvL+eUqOato+WImeihqOi+vuW8j+ajgOafpeW9k+WJjeS8oOmAkueahOminOiJsuWAvOihqOi+vuagt+W8j+aYr+WQpuS4uuaVsOWAvOWei3JnYigyNTUsMCwwKVxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vICAgIHZhciBjb2xvciA9IC9ecmdiXFwoKFxcZCspLCA/KFxcZCspLCA/KFxcZCspXFwpJC9pLmV4ZWMoIHN0eWxlICk7XHQvL+WwhuWtl+espuS4suS4reeahOaVsOWAvOi1i+WAvOe7mWNvbG9y77yMY29sb3LmmK/kuIDkuKrmlbDnu4TjgIJcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyAgICB0aGlzLnIgPSBNYXRoLm1pbiggMjU1LCBwYXJzZUludCggY29sb3JbIDEgXSwgMTAgKSApIC8gMjU1O1x0XHQvL+WwhuaVsOe7hOS4reeahOesrDLkuKrlhYPntKDovazmjaLmiJAxMOi/m+WItmludOexu+Wei+aVtOaVsO+8jOWIpOaWreaYr+WQpuWwj+S6jjI1Ne+8jOeEtuWQjumZpOS7pTI1Ne+8jOW+l+WHuuWwj+aVsO+8jOWkjeWItue7mUNvbG9yLnJcbiAgICAgICAgICAgIC8vICAgIHRoaXMuZyA9IE1hdGgubWluKCAyNTUsIHBhcnNlSW50KCBjb2xvclsgMiBdLCAxMCApICkgLyAyNTU7XHRcdC8v5bCG5pWw57uE5Lit55qE56ysM+S4quWFg+e0oOi9rOaNouaIkDEw6L+b5Yi2aW5057G75Z6L5pW05pWw77yM5Yik5pat5piv5ZCm5bCP5LqOMjU177yM54S25ZCO6Zmk5LulMjU177yM5b6X5Ye65bCP5pWw77yM5aSN5Yi257uZQ29sb3IuZ1xuICAgICAgICAgICAgLy8gICAgdGhpcy5iID0gTWF0aC5taW4oIDI1NSwgcGFyc2VJbnQoIGNvbG9yWyAzIF0sIDEwICkgKSAvIDI1NTtcdFx0Ly/lsIbmlbDnu4TkuK3nmoTnrKw05Liq5YWD57Sg6L2s5o2i5oiQMTDov5vliLZpbnTnsbvlnovmlbTmlbDvvIzliKTmlq3mmK/lkKblsI/kuo4yNTXvvIznhLblkI7pmaTku6UyNTXvvIzlvpflh7rlsI/mlbDvvIzlpI3liLbnu5lDb2xvci5iXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gICAgcmV0dXJuIHRoaXM7IC8v6L+U5Zue6aKc6Imy5a+56LGh44CCXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy99XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8vLyByZ2IoMTAwJSwwJSwwJSlcbiAgICAgICAgICAgIC8vLy/lsIbmiJHku6zlubPluLjkuaDmg6/nmoTpopzoibLlgLzooajovr7lvaLlvI9yZ2IoMTAwJSwwJSwwJSkt55m+5YiG5q+U5Z6L77yM6L2s5o2i5oiQVEhSRUUuSlPorqTor4bnmoTlvaLlvI8wLjAtMS4w77yMXG4gICAgICAgICAgICAvLy8v6L+Z6YeM5bCG5Y+W5YC86IyD5Zu05LuOMCUtMTAwJeaNoueul+aIkDAuMC0xLjAuXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy9pZiAoIC9ecmdiXFwoKFxcZCspXFwlLCA/KFxcZCspXFwlLCA/KFxcZCspXFwlXFwpJC9pLnRlc3QoIHN0eWxlICkgKSB7XHQvL+eUqOato+WImeihqOi+vuW8j+ajgOafpeW9k+WJjeS8oOmAkueahOminOiJsuWAvOihqOi+vuagt+W8j+aYr+WQpuS4uueZvuWIhuavlOWei3JnYigxMDAlLDAlLDAlKVxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vICAgIHZhciBjb2xvciA9IC9ecmdiXFwoKFxcZCspXFwlLCA/KFxcZCspXFwlLCA/KFxcZCspXFwlXFwpJC9pLmV4ZWMoIHN0eWxlICk7XHQvL+WwhuWtl+espuS4suS4reeahOaVsOWAvOi1i+WAvOe7mWNvbG9y77yMY29sb3LmmK/kuIDkuKrmlbDnu4TjgIJcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyAgICB0aGlzLnIgPSBNYXRoLm1pbiggMTAwLCBwYXJzZUludCggY29sb3JbIDEgXSwgMTAgKSApIC8gMTAwO1x0XHQvL+WwhuaVsOe7hOS4reeahOesrDLkuKrlhYPntKDovazmjaLmiJAxMOi/m+WItmludOexu+Wei+aVtOaVsO+8jOWIpOaWreaYr+WQpuWwj+S6jjEwMO+8jOeEtuWQjumZpOS7pTEwMO+8jOW+l+WHuuWwj+aVsO+8jOWkjeWItue7mUNvbG9yLnJcbiAgICAgICAgICAgIC8vICAgIHRoaXMuZyA9IE1hdGgubWluKCAxMDAsIHBhcnNlSW50KCBjb2xvclsgMiBdLCAxMCApICkgLyAxMDA7XHRcdC8v5bCG5pWw57uE5Lit55qE56ysM+S4quWFg+e0oOi9rOaNouaIkDEw6L+b5Yi2aW5057G75Z6L5pW05pWw77yM5Yik5pat5piv5ZCm5bCP5LqOMTAw77yM54S25ZCO6Zmk5LulMTAw77yM5b6X5Ye65bCP5pWw77yM5aSN5Yi257uZQ29sb3IuZ1xuICAgICAgICAgICAgLy8gICAgdGhpcy5iID0gTWF0aC5taW4oIDEwMCwgcGFyc2VJbnQoIGNvbG9yWyAzIF0sIDEwICkgKSAvIDEwMDtcdFx0Ly/lsIbmlbDnu4TkuK3nmoTnrKw05Liq5YWD57Sg6L2s5o2i5oiQMTDov5vliLZpbnTnsbvlnovmlbTmlbDvvIzliKTmlq3mmK/lkKblsI/kuo4xMDDvvIznhLblkI7pmaTku6UxMDDvvIzlvpflh7rlsI/mlbDvvIzlpI3liLbnu5lDb2xvci5iXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gICAgcmV0dXJuIHRoaXM7IC8v6L+U5Zue6aKc6Imy5a+56LGh44CCXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy99XG5cbiAgICAgICAgICAgIC8vICNmZjAwMDBcbiAgICAgICAgICAgIC8v5bCG5oiR5Lus5bmz5bi45Lmg5oOv55qE6aKc6Imy5YC86KGo6L6+5b2i5byPI2ZmMDAwMC025L2NMTbov5vliLblnovvvIzovazmjaLmiJBUSFJFRS5KU+iupOivhueahOW9ouW8jzAuMC0xLjDvvIxcbiAgICAgICAgICAgIC8v6L+Z6YeM5bCG5Y+W5YC86IyD5Zu05LuOMDAtZmbmjaLnrpfmiJAwLjAtMS4wLlxuXG4gICAgICAgICAgICBpZiAoL15cXCMoWzAtOWEtZl17Nn0pJC9pLnRlc3QoY29sb3JWYWwpKSB7XHRcdC8v55So5q2j5YiZ6KGo6L6+5byP5qOA5p+l5b2T5YmN5Lyg6YCS55qE6aKc6Imy5YC86KGo6L6+5qC35byP5piv5ZCm5Li6NuS9jTE26L+b5Yi25Z6LICNmZjAwMDBcblxuICAgICAgICAgICAgICAgIHZhciBjb2xvciA9IC9eXFwjKFswLTlhLWZdezZ9KSQvaS5leGVjKGNvbG9yVmFsKTtcdFx0Ly/lsIblrZfnrKbkuLLkuK3nmoTmlbDlgLzotYvlgLznu5ljb2xvcu+8jGNvbG9y5piv5LiA5Liq5pWw57uE44CCXG5cbiAgICAgICAgICAgICAgICB0aGlzLl9zZXRIZXgocGFyc2VJbnQoY29sb3JbMV0sIDE2KSk7XHQvL+WwhuaVsOe7hOS4reeahOesrDLkuKrlhYPntKDovazmjaLmiJAxNui/m+WItmludOexu+Wei+aVtOaVsC7osIPnlKhzZXRIZXgg5pa55rOV77yM5bCGMTbov5vliLbmlbDlgLzotYvlgLznu5lDb2xvci5yLENvbG9yLmcsQ29sb3IuYlxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7IC8v6L+U5Zue6aKc6Imy5a+56LGh44CCXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLy8vICNmMDBcbiAgICAgICAgICAgIC8vLy/lsIbmiJHku6zlubPluLjkuaDmg6/nmoTpopzoibLlgLzooajovr7lvaLlvI8jZjAwLTPkvY0xNui/m+WItuWei++8jOi9rOaNouaIkFRIUkVFLkpT6K6k6K+G55qE5b2i5byPMC4wLTEuMO+8jFxuICAgICAgICAgICAgLy8vL+i/memHjOWwhuWPluWAvOiMg+WbtOS7jjAtZuaNoueul+aIkDAuMC0xLjAuXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy9pZiAoIC9eXFwjKFswLTlhLWZdKShbMC05YS1mXSkoWzAtOWEtZl0pJC9pLnRlc3QoIHN0eWxlICkgKSB7XHQvL+eUqOato+WImeihqOi+vuW8j+ajgOafpeW9k+WJjeS8oOmAkueahOminOiJsuWAvOihqOi+vuagt+W8j+aYr+WQpuS4ujPkvY0xNui/m+WItuWeiyAjZjAwXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gICAgdmFyIGNvbG9yID0gL15cXCMoWzAtOWEtZl0pKFswLTlhLWZdKShbMC05YS1mXSkkL2kuZXhlYyggc3R5bGUgKTtcdC8v5bCG5a2X56ym5Liy5Lit55qE5pWw5YC86LWL5YC857uZY29sb3LvvIxjb2xvcuaYr+S4gOS4quaVsOe7hOOAglxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vICAgIHRoaXMuc2V0SGV4KCBwYXJzZUludCggY29sb3JbIDEgXSArIGNvbG9yWyAxIF0gKyBjb2xvclsgMiBdICsgY29sb3JbIDIgXSArIGNvbG9yWyAzIF0gKyBjb2xvclsgMyBdLCAxNiApICk7XHQvL+WwhuaVsOe7hOS4reeahOesrDLvvIwzLDTkuKrlhYPntKAqMu+8jOi9rOaNouaIkDE26L+b5Yi2aW5057G75Z6L5pW05pWwLuiwg+eUqHNldEhleCDmlrnms5XvvIzlsIYxNui/m+WItuaVsOWAvOi1i+WAvOe7mUNvbG9yLnIsQ29sb3IuZyxDb2xvci5iXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gICAgcmV0dXJuIHRoaXM7IC8v6L+U5Zue6aKc6Imy5a+56LGh44CCXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy99XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8vLyByZWRcbiAgICAgICAgICAgIC8vLy/lsIbmiJHku6zlubPluLjkuaDmg6/nmoTpopzoibLlgLzooajovr7lvaLlvI9yZWTpopzoibLlkI3vvIzovazmjaLmiJBUSFJFRS5KU+iupOivhueahOW9ouW8jzAuMC0xLjDvvIxcbiAgICAgICAgICAgIC8vLy/ov5nph4zlsIbpopzoibLlkI3mjaLnrpfmiJAwLjAtMS4wLlxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vaWYgKCAvXihcXHcrKSQvaS50ZXN0KCBzdHlsZSApICkge1x0Ly/nlKjmraPliJnooajovr7lvI/mo4Dmn6XlvZPliY3kvKDpgJLnmoTpopzoibLlgLzooajovr7moLflvI/mmK/lkKbkuLrpopzoibLlkI3vvIzljbPlj4LmlbBzdHlsZeS4reaYr+WQpuWPquaYr+Wtl+espuS4suayoeacieaVsOWtl+OAglxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vICAgIHRoaXMuc2V0SGV4KCBUSFJFRS5Db2xvcktleXdvcmRzWyBzdHlsZSBdICk7XHQvL+WwhuWtl+espuS4suS9nOS4ulRIUkVFLkNvbG9yS2V5d29yZHPlr7nosaHnmoTlsZ7mgKflkI3vvIzlj5blh7rkuI7or6XlsZ7mgKflkI3nm7jlr7nlupTnmoQxNui/m+WItueahOWxnuaAp+WAvC7osIPnlKhzZXRIZXgg5pa55rOV77yM5bCGMTbov5vliLbnmoTlsZ7mgKflgLzotYvlgLznu5lDb2xvci5yLENvbG9yLmcsQ29sb3IuYlxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vICAgIHJldHVybiB0aGlzO1x0Ly/ov5Tlm57popzoibLlr7nosaHjgIJcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvL31cbiAgICAgICAgfVxuICAgICAgICAvKnNldEhleOaWueazlVxuICAgICAgICAgLy8vc2V0SGV45pa55rOV55So5LqO6K6+572uMTbov5vliLbpopzoibLlgLznu5nlvZPliY3lrp7kvotcbiAgICAgICAgIC8vL+abtOWkmuWFs+S6jmhleOminOiJsueahOWGheWuueWPguiAg+e7tOWfuueZvuenkSxodHRwOi8vemgud2lraXBlZGlhLm9yZy93aWtpLyVFNyVCRCU5MSVFOSVBMSVCNSVFOSVBMiU5QyVFOCU4OSVCMlxuICAgICAgICAgKi9cbiAgICAgICAgLy8vPHN1bW1hcnk+c2V0SGV4PC9zdW1tYXJ5PlxuICAgICAgICAvLy88cGFyYW0gbmFtZSA9XCJoZXhcIiB0eXBlPVwibnVtYmVyKDE26L+b5Yi26aKc6Imy5YC8MHhmZmRkZmbvvIlcIj4xNui/m+WItuaVsOWAvDB4ZmZkZGZmPC9wYXJhbT5cbiAgICAgICAgLy8vPHJldHVybnMgdHlwZT1cIkNvbG9yXCI+6L+U5Zue6aKc6Imy5a+56LGhPC9yZXR1cm5zPlxuICAgICAgICBwcml2YXRlIF9zZXRIZXgoaGV4KSB7XG4gICAgICAgICAgICBoZXggPSBNYXRoLmZsb29yKGhleCk7XG5cbiAgICAgICAgICAgIHRoaXMuX3IgPSAoIGhleCA+PiAxNiAmIDI1NSApIC8gMjU1OyAvL+WwhuW3pui+ueS4pOS9jTE26L+b5Yi25pWw5YC85Y+Y5o2i5oiQcmdi6aKc6Imy5YC85a+55bqU55qEcmVk77yM5bm26LWL5YC857uZ5bGe5oCnQ29sb3IucuOAglxuICAgICAgICAgICAgdGhpcy5fZyA9ICggaGV4ID4+IDggJiAyNTUgKSAvIDI1NTsgIC8v5bCG5Lit6Ze05Lik5L2NMTbov5vliLbmlbDlgLzlj5jmjaLmiJByZ2LpopzoibLlgLzlr7nlupTnmoRncmVlbu+8jOW5tui1i+WAvOe7meWxnuaAp0NvbG9yLmfjgIJcbiAgICAgICAgICAgIHRoaXMuX2IgPSAoIGhleCAmIDI1NSApIC8gMjU1O1x0ICAgIC8v5bCG5Y+z6L655Lik5L2NMTbov5vliLbmlbDlgLzlj5jmjaLmiJByZ2LpopzoibLlgLzlr7nlupTnmoRibHVl77yM5bm26LWL5YC857uZ5bGe5oCnQ29sb3IuYuOAglxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcdC8v6L+U5Zue6aKc6Imy5a+56LGhXG4gICAgICAgIH1cbiAgICB9XG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RlZmluaXRpb25zLmQudHNcIi8+XG5tb2R1bGUgZHkge1xuICAgIGV4cG9ydCBjbGFzcyBKdWRnZVV0aWxzIGV4dGVuZHMgZHlDYi5KdWRnZVV0aWxze1xuICAgICAgICBwdWJsaWMgc3RhdGljIGlzVmlldyhvYmopIHtcbiAgICAgICAgICAgIHJldHVybiAhIW9iaiAmJiBvYmoub2Zmc2V0ICYmIG9iai53aWR0aCAmJiBvYmouaGVpZ2h0ICYmIHRoaXMuaXNGdW5jdGlvbihvYmouZ2V0Q29udGV4dCk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc3RhdGljIGlzRXF1YWwodGFyZ2V0MTpHYW1lT2JqZWN0LCB0YXJnZXQyOkdhbWVPYmplY3QpIHtcbiAgICAgICAgICAgIHJldHVybiB0YXJnZXQxLnVpZCA9PT0gdGFyZ2V0Mi51aWQ7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJtb2R1bGUgZHl7XG4gICAgZXhwb3J0IGVudW0gU2hhZGVyVHlwZXtcbiAgICAgICAgVlMsXG4gICAgICAgIEZTXG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RlZmluaXRpb25zLmQudHNcIi8+XG5tb2R1bGUgZHl7XG4gICAgZGVjbGFyZSB2YXIgZG9jdW1lbnQ6YW55O1xuXG4gICAgZXhwb3J0IGNsYXNzIFNoYWRlcntcbiAgICAgICAgY29uc3RydWN0b3IoKXt9XG5cbiAgICAgICAgcHVibGljIHN0YXRpYyBjcmVhdGVTaGFkZXIoc291cmNlOnN0cmluZywgdHlwZTpTaGFkZXJUeXBlKXtcbiAgICAgICAgICAgIHZhciBzaGFkZXIgPSBudWxsLFxuICAgICAgICAgICAgICAgIGdsID0gRGlyZWN0b3IuZ2V0SW5zdGFuY2UoKS5nbDtcblxuICAgICAgICAgICAgc3dpdGNoKHR5cGUpe1xuICAgICAgICAgICAgICAgIGNhc2UgU2hhZGVyVHlwZS5WUzpcbiAgICAgICAgICAgICAgICAgICAgc2hhZGVyID0gZ2wuY3JlYXRlU2hhZGVyKGdsLlZFUlRFWF9TSEFERVIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFNoYWRlclR5cGUuRlM6XG4gICAgICAgICAgICAgICAgICAgIHNoYWRlciA9IGdsLmNyZWF0ZVNoYWRlcihnbC5GUkFHTUVOVF9TSEFERVIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0IDpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBnbC5zaGFkZXJTb3VyY2Uoc2hhZGVyLCBzb3VyY2UpO1xuICAgICAgICAgICAgZ2wuY29tcGlsZVNoYWRlcihzaGFkZXIpO1xuXG4gICAgICAgICAgICBpZihnbC5nZXRTaGFkZXJQYXJhbWV0ZXIoc2hhZGVyLCBnbC5DT01QSUxFX1NUQVRVUykpe1xuICAgICAgICAgICAgICAgIHJldHVybiBzaGFkZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGR5Q2IuTG9nLmxvZyhnbC5nZXRTaGFkZXJJbmZvTG9nKHNoYWRlcikpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwibW9kdWxlIGR5IHtcbiAgICBleHBvcnQgZW51bSBCdWZmZXJUeXBle1xuICAgICAgICBVTlNJR05FRF9CWVRFID0gPGFueT5cIlVOU0lHTkVEX0JZVEVcIixcbiAgICAgICAgU0hPUlQgPSA8YW55PlwiU0hPUlRcIixcbiAgICAgICAgVU5TSUdORURfU0hPUlQgPSA8YW55PlwiVU5TSUdORURfU0hPUlRcIixcbiAgICAgICAgSU5UID0gPGFueT5cIklOVFwiLFxuICAgICAgICBVTlNJR05FRF9JTlQgPSA8YW55PlwiVU5TSUdORURfSU5UXCIsXG4gICAgICAgIEZMT0FUID0gPGFueT5cIkZMT0FUXCJcbiAgICB9XG59XG4iLCJtb2R1bGUgZHl7XG4gICAgZXhwb3J0IGVudW0gQXR0cmlidXRlRGF0YVR5cGV7XG4gICAgICAgIEZMT0FUXzQsXG4gICAgICAgIEJVRkZFUlxuICAgIH1cbn1cblxuIiwibW9kdWxlIGR5e1xuICAgIGV4cG9ydCBlbnVtIERyYXdNb2Rle1xuICAgICAgICBUUklBTkdMRVMgPSA8YW55PlwiVFJJQU5HTEVTXCJcbiAgICB9XG59XG5cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kZWZpbml0aW9ucy5kLnRzXCIvPlxubW9kdWxlIGR5e1xuICAgIGV4cG9ydCBjbGFzcyBFbGVtZW50QnVmZmVye1xuICAgICAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZShkYXRhLCB0eXBlOkJ1ZmZlclR5cGUpOkVsZW1lbnRCdWZmZXIge1xuICAgICAgICAgICAgdmFyIG9iaiA9IG5ldyB0aGlzKCk7XG5cbiAgICAgICAgICAgIG9iai5pbml0V2hlbkNyZWF0ZShkYXRhLCB0eXBlKTtcblxuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2J1ZmZlciA9IG51bGw7XG4gICAgICAgIGdldCBidWZmZXIoKSB7IHJldHVybiB0aGlzLl9idWZmZXI7IH1cblxuICAgICAgICBwcml2YXRlIF90eXBlOnN0cmluZyA9IG51bGw7XG4gICAgICAgIGdldCB0eXBlKCkgeyByZXR1cm4gdGhpcy5fdHlwZTsgfVxuICAgICAgICBzZXQgdHlwZSh0eXBlOnN0cmluZyl7XG4gICAgICAgICAgICB0aGlzLl90eXBlID0gdHlwZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX251bTpudW1iZXIgPSBudWxsO1xuICAgICAgICBnZXQgbnVtKCkgeyByZXR1cm4gdGhpcy5fbnVtOyB9XG4gICAgICAgIHNldCBudW0obnVtOm51bWJlcikge1xuICAgICAgICAgICAgdGhpcy5fbnVtID0gbnVtO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfdHlwZVNpemU6bnVtYmVyID0gbnVsbDtcbiAgICAgICAgZ2V0IHR5cGVTaXplKCkgeyByZXR1cm4gdGhpcy5fdHlwZVNpemU7IH1cblxuICAgICAgICBwdWJsaWMgaW5pdFdoZW5DcmVhdGUoZGF0YSwgdHlwZTpCdWZmZXJUeXBlKSB7XG4gICAgICAgICAgICB2YXIgZ2wgPSBEaXJlY3Rvci5nZXRJbnN0YW5jZSgpLmdsO1xuXG4gICAgICAgICAgICBpZighZGF0YSB8fCAhdGhpcy5fY2hlY2tEYXRhVHlwZShkYXRhLCB0eXBlKSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX2J1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpOyAgIC8vIENyZWF0ZSBhIGJ1ZmZlciBvYmplY3RcbiAgICAgICAgICAgIGlmICghdGhpcy5fYnVmZmVyKSB7XG4gICAgICAgICAgICAgICAgZHlDYi5Mb2cubG9nKCdGYWlsZWQgdG8gY3JlYXRlIHRoZSB0aGlzLl9idWZmZXIgb2JqZWN0Jyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBnbC5iaW5kQnVmZmVyKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCB0aGlzLl9idWZmZXIpO1xuICAgICAgICAgICAgZ2wuYnVmZmVyRGF0YShnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgZGF0YSwgZ2wuU1RBVElDX0RSQVcpO1xuXG4gICAgICAgICAgICBnbC5iaW5kQnVmZmVyKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBudWxsKTtcblxuICAgICAgICAgICAgdGhpcy5fdHlwZSA9IGdsW3R5cGVdO1xuICAgICAgICAgICAgdGhpcy5fbnVtID0gZGF0YS5sZW5ndGg7XG4gICAgICAgICAgICB0aGlzLl90eXBlU2l6ZSA9IHRoaXMuX2dldEluZm8odHlwZSkuc2l6ZTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2J1ZmZlcjtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgcHJpdmF0ZSBfY2hlY2tEYXRhVHlwZShkYXRhLCB0eXBlOkJ1ZmZlclR5cGUpe1xuICAgICAgICAgICAgdmFyIGluZm8gPSB0aGlzLl9nZXRJbmZvKHR5cGUpO1xuXG4gICAgICAgICAgICByZXR1cm4gZGF0YSBpbnN0YW5jZW9mIGluZm8udHlwZUNsYXNzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfZ2V0SW5mbyh0eXBlOkJ1ZmZlclR5cGUpOnt0eXBlQ2xhc3M6YW55LHNpemU6bnVtYmVyfXtcbiAgICAgICAgICAgIHZhciBpbmZvID0gbnVsbDtcblxuICAgICAgICAgICAgc3dpdGNoICh0eXBlKXtcbiAgICAgICAgICAgICAgICBjYXNlIEJ1ZmZlclR5cGUuVU5TSUdORURfQllURTpcbiAgICAgICAgICAgICAgICAgICAgaW5mbyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVDbGFzczogVWludDhBcnJheSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemU6IDFcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBCdWZmZXJUeXBlLlNIT1JUOlxuICAgICAgICAgICAgICAgICAgICBpbmZvID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZUNsYXNzOiBJbnQxNkFycmF5LFxuICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZTogMlxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIEJ1ZmZlclR5cGUuVU5TSUdORURfU0hPUlQ6XG4gICAgICAgICAgICAgICAgICAgIGluZm8gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlQ2xhc3M6IFVpbnQxNkFycmF5LFxuICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZTogMlxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIEJ1ZmZlclR5cGUuSU5UOlxuICAgICAgICAgICAgICAgICAgICBpbmZvID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZUNsYXNzOiBJbnQzMkFycmF5LFxuICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZTogNFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIEJ1ZmZlclR5cGUuVU5TSUdORURfSU5UOlxuICAgICAgICAgICAgICAgICAgICBpbmZvID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZUNsYXNzOiBVaW50MzJBcnJheSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemU6IDRcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBCdWZmZXJUeXBlLkZMT0FUOlxuICAgICAgICAgICAgICAgICAgICBpbmZvID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZUNsYXNzOiBGbG9hdDMyQXJyYXksXG4gICAgICAgICAgICAgICAgICAgICAgICBzaXplOiA0XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGR5Q2IuTG9nLmVycm9yKHRydWUsIGR5Q2IuTG9nLmluZm8uRlVOQ19JTlZBTElEKFwiQnVmZmVyVHlwZVwiKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gaW5mbztcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kZWZpbml0aW9ucy5kLnRzXCIvPlxubW9kdWxlIGR5e1xuICAgIGV4cG9ydCBjbGFzcyBBcnJheUJ1ZmZlcntcbiAgICAgICAgcHVibGljIHN0YXRpYyBjcmVhdGUoZGF0YSwgbnVtLCB0eXBlOkJ1ZmZlclR5cGUpOkFycmF5QnVmZmVyIHtcbiAgICAgICAgICAgIHZhciBvYmogPSBuZXcgdGhpcygpO1xuXG4gICAgICAgICAgICBvYmouaW5pdFdoZW5DcmVhdGUoZGF0YSwgbnVtLCB0eXBlKTtcblxuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2J1ZmZlciA9IG51bGw7XG4gICAgICAgIGdldCBidWZmZXIoKSB7IHJldHVybiB0aGlzLl9idWZmZXI7IH1cblxuICAgICAgICBwcml2YXRlIF9udW06bnVtYmVyID0gbnVsbDtcbiAgICAgICAgZ2V0IG51bSgpIHsgcmV0dXJuIHRoaXMuX251bTsgfVxuICAgICAgICBzZXQgbnVtKG51bTpudW1iZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX251bSA9IG51bTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX3R5cGU6c3RyaW5nID0gbnVsbDtcbiAgICAgICAgZ2V0IHR5cGUoKSB7IHJldHVybiB0aGlzLl90eXBlOyB9XG4gICAgICAgIHNldCB0eXBlKHR5cGU6c3RyaW5nKSB7XG4gICAgICAgICAgICB0aGlzLl90eXBlID0gdHlwZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcHJpdmF0ZSBfY291bnQ6bnVtYmVyID0gbnVsbDtcbiAgICAgICAgZ2V0IGNvdW50KCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY291bnQ7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IGNvdW50KGNvdW50Om51bWJlcil7XG4gICAgICAgICAgICB0aGlzLl9jb3VudCA9IGNvdW50O1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGluaXRXaGVuQ3JlYXRlKGRhdGEsIG51bSwgdHlwZTpCdWZmZXJUeXBlKSB7XG4gICAgICAgICAgICB2YXIgZ2wgPSBEaXJlY3Rvci5nZXRJbnN0YW5jZSgpLmdsO1xuXG4gICAgICAgICAgICBpZighZGF0YSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX2J1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpOyAgIC8vIENyZWF0ZSBhIGJ1ZmZlciBvYmplY3RcbiAgICAgICAgICAgIGlmICghdGhpcy5fYnVmZmVyKSB7XG4gICAgICAgICAgICAgICAgZHlDYi5Mb2cubG9nKCdGYWlsZWQgdG8gY3JlYXRlIHRoZSB0aGlzLl9idWZmZXIgb2JqZWN0Jyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGhpcy5fYnVmZmVyKTtcbiAgICAgICAgICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBkYXRhLCBnbC5TVEFUSUNfRFJBVyk7XG5cbiAgICAgICAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBudWxsKTtcblxuICAgICAgICAgICAgdGhpcy5fbnVtID0gbnVtO1xuICAgICAgICAgICAgdGhpcy5fdHlwZSA9IGdsW3R5cGVdO1xuICAgICAgICAgICAgdGhpcy5fY291bnQgPSBkYXRhLmxlbmd0aCAvIG51bTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2J1ZmZlcjtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuIiwibW9kdWxlIGR5e1xuICAgIGV4cG9ydCBlbnVtIFVuaWZvcm1EYXRhVHlwZXtcbiAgICAgICAgRkxPQVRfTUFUNFxuICAgIH1cbn1cblxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RlZmluaXRpb25zLmQudHNcIi8+XG5tb2R1bGUgZHl7XG4gICAgZXhwb3J0IGNsYXNzIFByb2dyYW17XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHZzU291cmNlOnN0cmluZywgZnNTb3VyY2U6c3RyaW5nKTpQcm9ncmFtIHtcbiAgICAgICAgICAgIHZhciBvYmogPSBuZXcgdGhpcygpO1xuXG4gICAgICAgICAgICBvYmouaW5pdFdoZW5DcmVhdGUodnNTb3VyY2UsIGZzU291cmNlKTtcblxuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX3Byb2dyYW06YW55ID0gRGlyZWN0b3IuZ2V0SW5zdGFuY2UoKS5nbC5jcmVhdGVQcm9ncmFtKCk7XG5cbiAgICAgICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyB1c2UoKXtcbiAgICAgICAgICAgIERpcmVjdG9yLmdldEluc3RhbmNlKCkuZ2wudXNlUHJvZ3JhbSh0aGlzLl9wcm9ncmFtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzZXRVbmlmb3JtRGF0YShuYW1lOnN0cmluZywgdHlwZTpVbmlmb3JtRGF0YVR5cGUsIGRhdGE6TWF0cml4KXtcbiAgICAgICAgICAgIHZhciBnbCA9IERpcmVjdG9yLmdldEluc3RhbmNlKCkuZ2wsXG4gICAgICAgICAgICAgICAgcG9zPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5fcHJvZ3JhbSwgbmFtZSk7XG5cbiAgICAgICAgICAgIHN3aXRjaCAodHlwZSl7XG4gICAgICAgICAgICAgICAgY2FzZSBVbmlmb3JtRGF0YVR5cGUuRkxPQVRfTUFUNDpcbiAgICAgICAgICAgICAgICAgICAgZ2wudW5pZm9ybU1hdHJpeDRmdihwb3MsZmFsc2UsIGRhdGEudmFsdWVzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdCA6XG4gICAgICAgICAgICAgICAgICAgIGR5Q2IuTG9nLmVycm9yKHRydWUsIGR5Q2IuTG9nLmluZm8uRlVOQ19JTlZBTElEKFwiVW5pZm9ybURhdGFUeXBlXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc2V0QXR0cmlidXRlRGF0YShuYW1lOnN0cmluZywgdHlwZTpBdHRyaWJ1dGVEYXRhVHlwZSwgZGF0YTpBcnJheUJ1ZmZlcnxudW1iZXJbXSl7XG4gICAgICAgICAgICB2YXIgZ2wgPSBEaXJlY3Rvci5nZXRJbnN0YW5jZSgpLmdsLFxuICAgICAgICAgICAgICAgIHBvcyA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHRoaXMuX3Byb2dyYW0sIG5hbWUpO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGUpe1xuICAgICAgICAgICAgICAgIGNhc2UgQXR0cmlidXRlRGF0YVR5cGUuRkxPQVRfNDpcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGFBcnI6bnVtYmVyW10gPSA8QXJyYXk8bnVtYmVyPj5kYXRhO1xuICAgICAgICAgICAgICAgICAgICBnbC52ZXJ0ZXhBdHRyaWI0Zihwb3MsIGRhdGFBcnJbMF0sIGRhdGFBcnJbMV0sIGRhdGFBcnJbMl0sIGRhdGFBcnJbM10pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIEF0dHJpYnV0ZURhdGFUeXBlLkJVRkZFUjpcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJ1ZmZlcjpBcnJheUJ1ZmZlciA9IDxBcnJheUJ1ZmZlcj5kYXRhO1xuICAgICAgICAgICAgICAgICAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgYnVmZmVyLmJ1ZmZlcik7XG4gICAgICAgICAgICAgICAgICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIocG9zLCBidWZmZXIubnVtLCBidWZmZXIudHlwZSwgZmFsc2UsIDAsIDApO1xuICAgICAgICAgICAgICAgICAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShwb3MpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0IDpcbiAgICAgICAgICAgICAgICAgICAgZHlDYi5Mb2cuZXJyb3IodHJ1ZSwgZHlDYi5Mb2cuaW5mby5GVU5DX0lOVkFMSUQoXCJBdHRyaWJ1dGVEYXRhVHlwZVwiKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGluaXRXaGVuQ3JlYXRlKHZzU291cmNlOnN0cmluZywgZnNTb3VyY2U6c3RyaW5nKXtcbiAgICAgICAgICAgIHZhciBnbCA9IERpcmVjdG9yLmdldEluc3RhbmNlKCkuZ2wsXG4gICAgICAgICAgICAgICAgdnMgPSBudWxsLFxuICAgICAgICAgICAgICAgIGZzID0gbnVsbDtcblxuICAgICAgICAgICAgdnMgPSBTaGFkZXIuY3JlYXRlU2hhZGVyKHZzU291cmNlLCBTaGFkZXJUeXBlLlZTKTtcbiAgICAgICAgICAgIGZzID0gU2hhZGVyLmNyZWF0ZVNoYWRlcihmc1NvdXJjZSwgU2hhZGVyVHlwZS5GUyk7XG5cbiAgICAgICAgICAgIC8vIOWQkeeoi+W6j+WvueixoemHjOWIhumFjeedgOiJsuWZqFxuICAgICAgICAgICAgZ2wuYXR0YWNoU2hhZGVyKHRoaXMuX3Byb2dyYW0sIHZzKTtcbiAgICAgICAgICAgIGdsLmF0dGFjaFNoYWRlcih0aGlzLl9wcm9ncmFtLCBmcyk7XG5cblxuICAgICAgICAgICAgLyohXG4gICAgICAgICAgICBpZiBib3dlciB3YXJuOlwiQXR0cmlidXRlIDAgaXMgZGlzYWJsZWQuIFRoaXMgaGFzIHNpZ25pZmljYW50IHBlcmZvcm1hbmNlIHBlbmFsdHlcIixcbiAgICAgICAgICAgIHRoZW4gZG8gdGhpcyBiZWZvcmUgbGlua1Byb2dyYW06XG4gICAgICAgICAgICAgZ2wuYmluZEF0dHJpYkxvY2F0aW9uKCB0aGlzLl9wcm9ncmFtLCAwLCBcImFfcG9zaXRpb25cIik7XG5cblxuXG4gICAgICAgICAgICAgY2FuIHJlZmVyZW5jZSBoZXJlOlxuICAgICAgICAgICAgIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMjAzMDUyMzEvd2ViZ2wtd2FybmluZy1hdHRyaWJ1dGUtMC1pcy1kaXNhYmxlZC10aGlzLWhhcy1zaWduaWZpY2FudC1wZXJmb3JtYW5jZS1wZW5hbHQ/YW5zd2VydGFiPXZvdGVzI3RhYi10b3BcblxuXG4gICAgICAgICAgICAgT3BlbkdMIHJlcXVpcmVzIGF0dHJpYnV0ZSB6ZXJvIHRvIGJlIGVuYWJsZWQgb3RoZXJ3aXNlIGl0IHdpbGwgbm90IHJlbmRlciBhbnl0aGluZy5cbiAgICAgICAgICAgICBPbiB0aGUgb3RoZXIgaGFuZCBPcGVuR0wgRVMgMi4wIG9uIHdoaWNoIFdlYkdMIGlzIGJhc2VkIGRvZXMgbm90LiBTbywgdG8gZW11bGF0ZSBPcGVuR0wgRVMgMi4wIG9uIHRvcCBvZiBPcGVuR0wgaWYgeW91IGRvbid0IGVuYWJsZSBhdHRyaWJ1dGUgMCB0aGUgYnJvd3NlciBoYXMgdG8gbWFrZSBhIGJ1ZmZlciBmb3IgeW91IGxhcmdlIGVub3VnaCBmb3IgdGhlIG51bWJlciBvZiB2ZXJ0aWNlcyB5b3UndmUgcmVxdWVzdGVkIHRvIGJlIGRyYXduLCBmaWxsIGl0IHdpdGggdGhlIGNvcnJlY3QgdmFsdWUgKHNlZSBnbC52ZXJ0ZXhBdHRyaWIpLFxuICAgICAgICAgICAgICBhdHRhY2ggaXQgdG8gYXR0cmlidXRlIHplcm8sIGFuZCBlbmFibGUgaXQuXG5cbiAgICAgICAgICAgICBJdCBkb2VzIGFsbCB0aGlzIGJlaGluZCB0aGUgc2NlbmVzIGJ1dCBpdCdzIGltcG9ydGFudCBmb3IgeW91IHRvIGtub3cgdGhhdCBpdCB0YWtlcyB0aW1lIHRvIGNyZWF0ZSBhbmQgZmlsbCB0aGF0IGJ1ZmZlci4gVGhlcmUgYXJlIG9wdGltaXphdGlvbnMgdGhlIGJyb3dzZXIgY2FuIG1ha2UgYnV0IGluIHRoZSBnZW5lcmFsIGNhc2UsXG4gICAgICAgICAgICAgaWYgeW91IHdlcmUgdG8gYXNzdW1lIHlvdSB3ZXJlIHJ1bm5pbmcgb24gT3BlbkdMIEVTIDIuMCBhbmQgdXNlZCBhdHRyaWJ1dGUgemVybyBhcyBhIGNvbnN0YW50IGxpa2UgeW91IGFyZSBzdXBwb3NlZCB0byBiZSBhYmxlIHRvIGRvLCB3aXRob3V0IHRoZSB3YXJuaW5nIHlvdSdkIGhhdmUgbm8gaWRlYSBvZiB0aGUgd29yayB0aGUgYnJvd3NlciBpcyBkb2luZyBvbiB5b3VyIGJlaGFsZiB0byBlbXVsYXRlIHRoYXQgZmVhdHVyZSBvZiBPcGVuR0wgRVMgMi4wIHRoYXQgaXMgZGlmZmVyZW50IGZyb20gT3BlbkdMLlxuXG4gICAgICAgICAgICAgSW4geW91ciBwYXJ0aWN1bGFyIGNhc2UgdGhlIHdhcm5pbmcgZG9lc24ndCBoYXZlIG11Y2ggbWVhbmluZy4gSXQgbG9va3MgbGlrZSB5b3UgYXJlIG9ubHkgZHJhd2luZyBhIHNpbmdsZSBwb2ludC4gQnV0IGl0IHdvdWxkIG5vdCBiZSBlYXN5IGZvciB0aGUgYnJvd3NlciB0byBmaWd1cmUgdGhhdCBvdXQgc28gaXQganVzdCB3YXJucyB5b3UgYW55dGltZSB5b3UgZHJhdyBhbmQgYXR0cmlidXRlIDAgaXMgbm90IGVuYWJsZWQuXG5cblxuICAgICAgICAgICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvaXNzdWVzLzM4OTZcbiAgICAgICAgICAgICAqL1xuXG5cbiAgICAgICAgICAgIC8vIOWwhuedgOiJsuWZqOi/nuaOpVxuICAgICAgICAgICAgZ2wubGlua1Byb2dyYW0odGhpcy5fcHJvZ3JhbSk7XG5cbiAgICAgICAgICAgIC8vIOWIpOaWreedgOiJsuWZqOeahOi/nuaOpeaYr+WQpuaIkOWKn1xuICAgICAgICAgICAgaWYoZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcih0aGlzLl9wcm9ncmFtLCBnbC5MSU5LX1NUQVRVUykpe1xuXG4gICAgICAgICAgICAgICAgLy8g6L+U5Zue56iL5bqP5a+56LGhXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Byb2dyYW07XG4gICAgICAgICAgICB9ZWxzZXtcblxuICAgICAgICAgICAgICAgIC8vIOWmguaenOWksei0pe+8jOW8ueWHuumUmeivr+S/oeaBr1xuICAgICAgICAgICAgICAgIGFsZXJ0KGdsLmdldFByb2dyYW1JbmZvTG9nKHRoaXMuX3Byb2dyYW0pKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RlZmluaXRpb25zLmQudHNcIi8+XG5tb2R1bGUgZHl7XG4gICAgZXhwb3J0IGNsYXNzIFF1YWRDb21tYW5ke1xuICAgICAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZSgpOlF1YWRDb21tYW5kIHtcbiAgICAgICAgICAgIHZhciBvYmogPSBuZXcgdGhpcygpO1xuXG4gICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfYnVmZmVyczpkeUNiLkhhc2ggPSBkeUNiLkhhc2guY3JlYXRlKCk7XG4gICAgICAgIGdldCBidWZmZXJzKCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYnVmZmVycztcbiAgICAgICAgfVxuICAgICAgICBzZXQgYnVmZmVycyhidWZmZXJzOmFueSl7XG4gICAgICAgICAgICB2YXIgaSA9IG51bGw7XG5cbiAgICAgICAgICAgIGZvcihpIGluIGJ1ZmZlcnMpe1xuICAgICAgICAgICAgICAgIGlmKGJ1ZmZlcnMuaGFzT3duUHJvcGVydHkoaSkpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9idWZmZXJzLmFkZENoaWxkKGksIGJ1ZmZlcnNbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2NvbG9yOkNvbG9yID0gbnVsbDtcbiAgICAgICAgZ2V0IGNvbG9yKCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29sb3I7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IGNvbG9yKGNvbG9yOkNvbG9yKXtcbiAgICAgICAgICAgIHRoaXMuX2NvbG9yID0gY29sb3I7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9kcmF3TW9kZTpEcmF3TW9kZSA9IERyYXdNb2RlLlRSSUFOR0xFUztcbiAgICAgICAgZ2V0IGRyYXdNb2RlKCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZHJhd01vZGU7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IGRyYXdNb2RlKGRyYXdNb2RlOkRyYXdNb2RlKXtcbiAgICAgICAgICAgIHRoaXMuX2RyYXdNb2RlID0gZHJhd01vZGU7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgZXhlY3V0ZShzY2VuZTpTY2VuZSl7XG4gICAgICAgICAgICB0aGlzLl9zZW5kRGF0YShzY2VuZS5wcm9ncmFtKTtcblxuICAgICAgICAgICAgdGhpcy5fZHJhdygpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGluaXQoKXtcbiAgICAgICAgICAgIC8vdGhpcy5faW5pdEJ1ZmZlcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9wcml2YXRlIF9pbml0QnVmZmVyKCl7XG4gICAgICAgIC8vICAgIHRoaXMuX2J1ZmZlcnMuYWRkQ2hpbGQoXCJ2ZXJ0ZXhCdWZmZXJcIixcbiAgICAgICAgLy8gICAgICAgIHRoaXMuX2J1ZmZlckRhdGEudmVydGljZXM/IEFycmF5QnVmZmVyLmNyZWF0ZSh0aGlzLl9idWZmZXJEYXRhLnZlcnRpY2VzLCAzLCBCdWZmZXJUeXBlLkZMT0FUKSA6IG51bGxcbiAgICAgICAgLy8gICAgKTtcbiAgICAgICAgLy8gICAgdGhpcy5fYnVmZmVycy5hZGRDaGlsZChcInRleENvb3JkQnVmZmVyXCIsXG4gICAgICAgIC8vICAgICAgICB0aGlzLl9idWZmZXJEYXRhLnRleENvb3Jkcz8gQXJyYXlCdWZmZXIuY3JlYXRlKHRoaXMuX2J1ZmZlckRhdGEudGV4Q29vcmRzLCAyLCBCdWZmZXJUeXBlLkZMT0FUKSA6IG51bGxcbiAgICAgICAgLy8gICAgKTtcbiAgICAgICAgLy8gICAgdGhpcy5fYnVmZmVycy5hZGRDaGlsZChcIm5vcm1hbEJ1ZmZlclwiLFxuICAgICAgICAvLyAgICAgICAgdGhpcy5fYnVmZmVyRGF0YS5ub3JtYWxzPyBBcnJheUJ1ZmZlci5jcmVhdGUodGhpcy5fYnVmZmVyRGF0YS5ub3JtYWxzLCAzLCBCdWZmZXJUeXBlLkZMT0FUKSA6IG51bGxcbiAgICAgICAgLy8gICAgKTtcbiAgICAgICAgLy8gICAgdGhpcy5fYnVmZmVycy5hZGRDaGlsZChcImluZGV4QnVmZmVyXCIsXG4gICAgICAgIC8vICAgICAgICB0aGlzLl9idWZmZXJEYXRhLmluZGljZXM/IEVsZW1lbnRCdWZmZXIuY3JlYXRlKHRoaXMuX2J1ZmZlckRhdGEuaW5kaWNlcywgQnVmZmVyVHlwZS5VTlNJR05FRF9TSE9SVCkgOiBudWxsXG4gICAgICAgIC8vICAgICk7XG4gICAgICAgIC8vICAgIHRoaXMuX2J1ZmZlcnMuYWRkQ2hpbGQoXCJjb2xvckJ1ZmZlclwiLFxuICAgICAgICAvLyAgICAgICAgdGhpcy5fYnVmZmVyRGF0YS5jb2xvcnM/IEFycmF5QnVmZmVyLmNyZWF0ZSh0aGlzLl9idWZmZXJEYXRhLmNvbG9ycywgMywgQnVmZmVyVHlwZS5GTE9BVCkgOiBudWxsXG4gICAgICAgIC8vICAgICk7XG4gICAgICAgIC8vfVxuXG4gICAgICAgIHByaXZhdGUgX3NlbmREYXRhKHByb2dyYW06UHJvZ3JhbSl7XG4gICAgICAgICAgICBpZih0aGlzLl9idWZmZXJzLmhhc0NoaWxkKFwidmVydGV4QnVmZmVyXCIpKXtcbiAgICAgICAgICAgICAgICBwcm9ncmFtLnNldEF0dHJpYnV0ZURhdGEoXCJhX3Bvc2l0aW9uXCIsIEF0dHJpYnV0ZURhdGFUeXBlLkJVRkZFUiwgdGhpcy5fYnVmZmVycy5nZXRDaGlsZChcInZlcnRleEJ1ZmZlclwiKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGR5Q2IuTG9nLmVycm9yKHRydWUsIGR5Q2IuTG9nLmluZm8uRlVOQ19NVVNUKFwiaGFzIHZlcnRleEJ1ZmZlclwiKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vaWYodGhpcy5jb2xvcil7XG4gICAgICAgICAgICAgICAgLyohXG4gICAgICAgICAgICAgICAgdGhpcyBjYXVzZSB3YXJuOlwiUEVSRk9STUFOQ0UgV0FSTklORzogQXR0cmlidXRlIDAgaXMgZGlzYWJsZWQuIFRoaXMgaGFzIHNpZ25maWNhbnQgcGVyZm9ybWFuY2UgcGVuYWx0eVwiIGhlcmU/XG4gICAgICAgICAgICAgICAgYmVjYXVzZSBhX2NvbG9yJ3BvcyBpcyAwLCBhbmQgaXQgc2hvdWxkIGJlIGFycmF5IGRhdGEobGlrZSBGbG9hdDMyQXJyYXkpXG4gICAgICAgICAgICAgICAgcmVmZXIgdG86IGh0dHBzOi8vd3d3Lmtocm9ub3Mub3JnL3dlYmdsL3dpa2kvV2ViR0xfYW5kX09wZW5HTF9EaWZmZXJlbmNlcyNWZXJ0ZXhfQXR0cmlidXRlXzBcbiAgICAgICAgICAgICAgICAqL1xuXG5cbiAgICAgICAgICAgICAgICBwcm9ncmFtLnNldEF0dHJpYnV0ZURhdGEoXCJhX2NvbG9yXCIsIEF0dHJpYnV0ZURhdGFUeXBlLkJVRkZFUiwgdGhpcy5fYnVmZmVycy5nZXRDaGlsZChcImNvbG9yQnVmZmVyXCIpKTtcbiAgICAgICAgICAgIC8vfVxuICAgICAgICB9XG5cblxuICAgICAgICBwcml2YXRlIF9kcmF3KCl7XG4gICAgICAgICAgICB2YXIgdG90YWxOdW0gPSAwLFxuICAgICAgICAgICAgICAgIHN0YXJ0T2Zmc2V0ID0gMCxcbiAgICAgICAgICAgICAgICB2ZXJ0ZXhCdWZmZXIgPSB0aGlzLl9idWZmZXJzLmdldENoaWxkKFwidmVydGV4QnVmZmVyXCIpLFxuICAgICAgICAgICAgICAgIGdsID0gRGlyZWN0b3IuZ2V0SW5zdGFuY2UoKS5nbDtcblxuXG4gICAgICAgICAgICBpZiAodGhpcy5fYnVmZmVycy5oYXNDaGlsZChcImluZGV4QnVmZmVyXCIpKSB7XG4gICAgICAgICAgICAgICAgbGV0IGluZGV4QnVmZmVyID0gdGhpcy5fYnVmZmVycy5nZXRDaGlsZChcImluZGV4QnVmZmVyXCIpO1xuICAgICAgICAgICAgICAgIHRvdGFsTnVtID0gaW5kZXhCdWZmZXIubnVtO1xuXG4gICAgICAgICAgICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHZlcnRleEJ1ZmZlci5idWZmZXIpO1xuICAgICAgICAgICAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIGluZGV4QnVmZmVyLmJ1ZmZlcik7XG4gICAgICAgICAgICAgICAgZ2wuZHJhd0VsZW1lbnRzKGdsW3RoaXMuX2RyYXdNb2RlXSwgdG90YWxOdW0sIGluZGV4QnVmZmVyLnR5cGUsIGluZGV4QnVmZmVyLnR5cGVTaXplICogc3RhcnRPZmZzZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdG90YWxOdW0gPSB2ZXJ0ZXhCdWZmZXIubnVtO1xuICAgICAgICAgICAgICAgIGdsLmRyYXdBcnJheXMoZ2xbdGhpcy5fZHJhd01vZGVdLCBzdGFydE9mZnNldCwgdG90YWxOdW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RlZmluaXRpb25zLmQudHNcIi8+XG5tb2R1bGUgZHl7XG4gICAgZXhwb3J0IGNsYXNzIFdlYkdMUmVuZGVyZXJ7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKCk6V2ViR0xSZW5kZXJlciB7XG4gICAgICAgICAgICB2YXIgb2JqID0gbmV3IHRoaXMoKTtcblxuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2NvbW1hbmRRdWV1ZTpkeUNiLkNvbGxlY3Rpb24gPSBkeUNiLkNvbGxlY3Rpb24uY3JlYXRlKCk7XG4gICAgICAgIHByaXZhdGUgX2NsZWFyQ29sb3I6Q29sb3IgPSBDb2xvci5jcmVhdGUoXCIjMDAwMDAwXCIpO1xuICAgICAgICBwcml2YXRlIF9jbGVhckFscGhhOm51bWJlciA9IDEuMDtcblxuICAgICAgICBwdWJsaWMgY3JlYXRlUXVhZENvbW1hbmQoKTpRdWFkQ29tbWFuZHtcbiAgICAgICAgICAgIHJldHVybiBRdWFkQ29tbWFuZC5jcmVhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBhZGRDb21tYW5kKGNvbW1hbmQ6UXVhZENvbW1hbmQpe1xuICAgICAgICAgICAgaWYodGhpcy5fY29tbWFuZFF1ZXVlLmhhc0NoaWxkKGNvbW1hbmQpKXtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbW1hbmQuaW5pdCgpO1xuICAgICAgICAgICAgdGhpcy5fY29tbWFuZFF1ZXVlLmFkZENoaWxkKGNvbW1hbmQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHJlbmRlcihzY2VuZTpTY2VuZSl7XG4gICAgICAgICAgICB0aGlzLl9jb21tYW5kUXVldWUuZm9yRWFjaCgoY29tbWFuZCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbW1hbmQuZXhlY3V0ZShzY2VuZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5fY2xlYXJDb21tYW5kKCk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgaW5pdCgpe1xuICAgICAgICAgICAgRGlyZWN0b3IuZ2V0SW5zdGFuY2UoKS5nbC5jbGVhckNvbG9yKHRoaXMuX2NsZWFyQ29sb3IuciwgdGhpcy5fY2xlYXJDb2xvci5nLCB0aGlzLl9jbGVhckNvbG9yLmIsIHRoaXMuX2NsZWFyQWxwaGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHNldENsZWFyQ29sb3IoY29sb3I6Q29sb3IsIGFscGhhOm51bWJlciA9IDEuMCl7XG4gICAgICAgICAgICB0aGlzLl9jbGVhckNvbG9yID0gY29sb3I7XG4gICAgICAgICAgICB0aGlzLl9jbGVhckFscGhhID0gYWxwaGE7XG4gICAgICAgICAgICBEaXJlY3Rvci5nZXRJbnN0YW5jZSgpLmdsLmNsZWFyQ29sb3IodGhpcy5fY2xlYXJDb2xvci5yLCB0aGlzLl9jbGVhckNvbG9yLmcsIHRoaXMuX2NsZWFyQ29sb3IuZywgdGhpcy5fY2xlYXJBbHBoYSk7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9jbGVhckNvbW1hbmQoKXtcbiAgICAgICAgICAgIHRoaXMuX2NvbW1hbmRRdWV1ZS5yZW1vdmVBbGxDaGlsZHJlbigpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RlZmluaXRpb25zLmQudHNcIi8+XG5tb2R1bGUgZHkge1xuICAgIGV4cG9ydCBjbGFzcyBNZXNoTWF0ZXJpYWwge1xuICAgICAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZShwYXJhbXMpIHtcbiAgICAgICAgICAgIHZhciBvYmogPSBuZXcgdGhpcyhwYXJhbXMpO1xuXG4gICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfY29sb3I6Q29sb3IgPSBudWxsO1xuICAgICAgICBnZXQgY29sb3IoKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb2xvcjtcbiAgICAgICAgfVxuICAgICAgICBzZXQgY29sb3IoY29sb3I6Q29sb3Ipe1xuICAgICAgICAgICAgdGhpcy5fY29sb3IgPSBjb2xvcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0cnVjdG9yKHBhcmFtcykge1xuICAgICAgICAgICAgdGhpcy5fY29sb3IgPSBDb2xvci5jcmVhdGUocGFyYW1zLmNvbG9yIHx8IFwiMHhmZmZmZmZcIik7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZGVmaW5pdGlvbnMuZC50c1wiLz5cbm1vZHVsZSBkeXtcbiAgICBleHBvcnQgY2xhc3MgR0xTTExvYWRlcntcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOkdMU0xMb2FkZXIgPSBudWxsO1xuXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5faW5zdGFuY2UgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9pbnN0YW5jZSA9IG5ldyB0aGlzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9jb250YWluZXI6ZHlDYi5IYXNoID0gZHlDYi5IYXNoLmNyZWF0ZSgpO1xuXG4gICAgICAgIHB1YmxpYyBsb2FkKHVybDpzdHJpbmcsIGlkOnN0cmluZyl7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgICAgIGlmKHRoaXMuX2NvbnRhaW5lci5nZXRDaGlsZChpZCkpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaGFzXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBkeVJ0LmNyZWF0ZVN0cmVhbSgob2JzZXJ2ZXI6ZHlSdC5JT2JzZXJ2ZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGVkKCk7XG4gICAgICAgICAgICAgICAgfSkuZG8oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBMb2FkZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkub25SZXNMb2FkZWQoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGR5UnQuZnJvbVByb21pc2UodGhpcy5fbG9hZFRleHQodXJsKSkuZG8oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBMb2FkZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkub25SZXNMb2FkZWQoKTtcbiAgICAgICAgICAgICAgICBzZWxmLl9jb250YWluZXIuYWRkQ2hpbGQoaWQsIGRhdGEpO1xuICAgICAgICAgICAgfSwgKGVycikgPT4ge1xuICAgICAgICAgICAgICAgIExvYWRlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5vblJlc0Vycm9yKHVybCwgZXJyKTtcbiAgICAgICAgICAgIH0sIG51bGwpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGdldEdMU0woaWQ6c3RyaW5nKTpzdHJpbmd7XG4gICAgICAgICAgIHJldHVybiB0aGlzLl9jb250YWluZXIuZ2V0Q2hpbGQoaWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfbG9hZFRleHQodXJsKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFJTVlAuUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgZHlDYi5BamF4VXRpbHMuYWpheCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiZ2V0XCIsXG4gICAgICAgICAgICAgICAgICAgIC8vYXN5bmM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50VHlwZTogXCJ0ZXh0L3BsYWluOyBjaGFyc2V0PXV0Zi04XCIsXG4gICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgLy9jYWNoZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogKFhNTEh0dHBSZXF1ZXN0LCBlcnJvclRocm93bikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwidXJsOlwiICsgdXJsICsgXCJcXG5yZWFkeVN0YXRlOlwiICsgWE1MSHR0cFJlcXVlc3QucmVhZHlTdGF0ZSArIFwiXFxuc3RhdHVzOlwiICsgWE1MSHR0cFJlcXVlc3Quc3RhdHVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIlxcbm1lc3NhZ2U6XCIgKyBlcnJvclRocm93bi5tZXNzYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIlxcbnJlc3BvbnNlVGV4dDpcIiArIFhNTEh0dHBSZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RlZmluaXRpb25zLmQudHNcIi8+XG5tb2R1bGUgZHl7XG4gICAgZXhwb3J0IGNsYXNzIExvYWRlck1hbmFnZXJ7XG4gICAgICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTpMb2FkZXJNYW5hZ2VyID0gbnVsbDtcblxuICAgICAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2luc3RhbmNlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UgPSBuZXcgdGhpcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfcmVzQ291bnQ6bnVtYmVyID0gMDtcbiAgICAgICAgcHJpdmF0ZSBfY3VycmVudExvYWRlZENvdW50Om51bWJlciA9IDA7XG5cbiAgICAgICAgLy9ob29rXG4gICAgICAgIHB1YmxpYyBvbmxvYWQ6RnVuY3Rpb247XG4gICAgICAgIHB1YmxpYyBvbmxvYWRpbmc6RnVuY3Rpb247XG5cbiAgICAgICAgcHVibGljIGxvYWQocmVzb3VyY2VzQXJyOkFycmF5PHt1cmw6c3RyaW5nOyBpZDpzdHJpbmd9Pikge1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gZHlSdC5mcm9tQXJyYXkocmVzb3VyY2VzQXJyKS5mbGF0TWFwKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICBzZWxmLl9yZXNDb3VudCsrO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIEdMU0xMb2FkZXIuZ2V0SW5zdGFuY2UoKS5sb2FkKHJlcy51cmwsIHJlcy5pZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyByZXNldCgpIHtcbiAgICAgICAgICAgIHRoaXMuX3Jlc0NvdW50ID0gMDtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRMb2FkZWRDb3VudCA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgb25SZXNMb2FkZWQoKSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50TG9hZGVkQ291bnQgKz0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBvblJlc0Vycm9yKHBhdGgsIGVycikge1xuICAgICAgICAgICAgZHlDYi5Mb2cubG9nKFwi5Yqg6L29XCIgKyBwYXRoICsgXCLotYTmupDlpLHotKVcIik7XG4gICAgICAgICAgICBpZihlcnIpe1xuICAgICAgICAgICAgICAgIGR5Q2IuTG9nLmxvZyhlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RlZmluaXRpb25zLmQudHNcIi8+XG5tb2R1bGUgZHl7XG4gICAgZXhwb3J0IGNsYXNzIEdlb21ldHJ5e1xuICAgICAgICBwcml2YXRlIF92ZXJ0aWNlczpBcnJheUJ1ZmZlciA9IG51bGw7XG4gICAgICAgIGdldCB2ZXJ0aWNlcygpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ZlcnRpY2VzO1xuICAgICAgICB9XG4gICAgICAgIHNldCB2ZXJ0aWNlcyh2ZXJ0aWNlczpBcnJheUJ1ZmZlcil7XG4gICAgICAgICAgICB0aGlzLl92ZXJ0aWNlcyA9IHZlcnRpY2VzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfaW5kaWNlczpFbGVtZW50QnVmZmVyID0gbnVsbDtcbiAgICAgICAgZ2V0IGluZGljZXMoKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pbmRpY2VzO1xuICAgICAgICB9XG4gICAgICAgIHNldCBpbmRpY2VzKGluZGljZXM6RWxlbWVudEJ1ZmZlcil7XG4gICAgICAgICAgICB0aGlzLl9pbmRpY2VzID0gaW5kaWNlcztcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2NvbG9yczpBcnJheUJ1ZmZlciA9IG51bGw7XG4gICAgICAgIGdldCBjb2xvcnMoKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb2xvcnM7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IGNvbG9ycyhjb2xvcnM6QXJyYXlCdWZmZXIpe1xuICAgICAgICAgICAgdGhpcy5fY29sb3JzID0gY29sb3JzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJvdGVjdGVkIG1hdGVyaWFsOk1lc2hNYXRlcmlhbCA9IG51bGw7XG5cbiAgICAgICAgY29uc3RydWN0b3IobWF0ZXJpYWwpe1xuICAgICAgICAgICAgdGhpcy5tYXRlcmlhbCA9IG1hdGVyaWFsO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGluaXRXaGVuQ3JlYXRlKCl7XG4gICAgICAgICAgICB0aGlzLl92ZXJ0aWNlcyA9IHRoaXMuY29tcHV0ZVZlcnRpY2VzQnVmZmVyKCk7XG4gICAgICAgICAgICB0aGlzLl9pbmRpY2VzID0gdGhpcy5jb21wdXRlSW5kaWNlc0J1ZmZlcigpO1xuICAgICAgICAgICAgLy90aGlzLl9ub3JtYWxzID0gdGhpcy5fY29tcHV0ZU5vcm1hbHMoKTtcbiAgICAgICAgICAgIC8vdGhpcy5fdGV4Q29vcmRzID0gdGhpcy5fY29tcHV0ZVRleENvb3JkcygpO1xuICAgICAgICAgICAgdGhpcy5fY29sb3JzID0gdGhpcy5fY29tcHV0ZUNvbG9yc0J1ZmZlcih0aGlzLm1hdGVyaWFsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByb3RlY3RlZCBjb21wdXRlVmVydGljZXNCdWZmZXIoKTpBcnJheUJ1ZmZlcntcbiAgICAgICAgICAgIHJldHVybiBkeUNiLkxvZy5lcnJvcih0cnVlLCBkeUNiLkxvZy5pbmZvLkFCU1RSQUNUX01FVEhPRCk7XG4gICAgICAgIH1cblxuICAgICAgICBwcm90ZWN0ZWQgY29tcHV0ZUluZGljZXNCdWZmZXIoKTpFbGVtZW50QnVmZmVye1xuICAgICAgICAgICAgcmV0dXJuIGR5Q2IuTG9nLmVycm9yKHRydWUsIGR5Q2IuTG9nLmluZm8uQUJTVFJBQ1RfTUVUSE9EKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2NvbXB1dGVDb2xvcnNCdWZmZXIobWF0ZXJpYWw6TWVzaE1hdGVyaWFsKXtcbiAgICAgICAgICAgIHZhciBhcnIgPSBbXSxcbiAgICAgICAgICAgICAgICBjb2xvciA9IG1hdGVyaWFsLmNvbG9yLFxuICAgICAgICAgICAgICAgIGkgPSAwLFxuICAgICAgICAgICAgICAgIGxlbiA9IHRoaXMuX3ZlcnRpY2VzLmNvdW50O1xuXG4gICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCBsZW47IGkrKyl7XG4gICAgICAgICAgICAgICAgYXJyLnB1c2goIGNvbG9yLnIsIGNvbG9yLmcsIGNvbG9yLmIsIDEuMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBBcnJheUJ1ZmZlci5jcmVhdGUobmV3IEZsb2F0MzJBcnJheShhcnIpLCA0LCBCdWZmZXJUeXBlLkZMT0FUKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RlZmluaXRpb25zLmQudHNcIi8+XG5tb2R1bGUgZHl7XG4gICAgZXhwb3J0IGNsYXNzIEJveEdlb21ldHJ5IGV4dGVuZHMgR2VvbWV0cnl7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHdpZHRoOm51bWJlciwgaGVpZ2h0Om51bWJlciwgZGVwdGg6bnVtYmVyLCBtYXRlcmlhbDpNZXNoTWF0ZXJpYWwpOkJveEdlb21ldHJ5IHtcbiAgICAgICAgICAgIHZhciBnZW9tID0gbmV3IHRoaXMod2lkdGgsIGhlaWdodCwgZGVwdGgsIG1hdGVyaWFsKTtcblxuICAgICAgICAgICAgZ2VvbS5pbml0V2hlbkNyZWF0ZSgpO1xuXG4gICAgICAgICAgICByZXR1cm4gZ2VvbTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX3dpZHRoOm51bWJlciA9IG51bGw7XG4gICAgICAgIHByaXZhdGUgX2hlaWdodDpudW1iZXIgPSBudWxsO1xuICAgICAgICBwcml2YXRlIF9kZXB0aDpudW1iZXIgPSBudWxsO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKHdpZHRoOm51bWJlciwgaGVpZ2h0Om51bWJlciwgZGVwdGg6bnVtYmVyLCBtYXRlcmlhbDpNZXNoTWF0ZXJpYWwpe1xuICAgICAgICAgICAgc3VwZXIobWF0ZXJpYWwpO1xuXG4gICAgICAgICAgICB0aGlzLl93aWR0aCA9IHdpZHRoO1xuICAgICAgICAgICAgdGhpcy5faGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICAgICAgdGhpcy5fZGVwdGggPSBkZXB0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIHByb3RlY3RlZCBjb21wdXRlVmVydGljZXNCdWZmZXIoKXtcbiAgICAgICAgICAgIHZhciB3aWR0aCA9IHRoaXMuX3dpZHRoLFxuICAgICAgICAgICAgICAgIGhlaWdodCA9IHRoaXMuX2hlaWdodCxcbiAgICAgICAgICAgICAgICBkZXB0aCA9IHRoaXMuX2RlcHRoLFxuICAgICAgICAgICAgICAgIGxlZnQgPSAtd2lkdGggLyAyLFxuICAgICAgICAgICAgICAgIHJpZ2h0ID0gd2lkdGggLyAyLFxuICAgICAgICAgICAgICAgIHVwID0gaGVpZ2h0IC8gMixcbiAgICAgICAgICAgICAgICBkb3duID0gLWhlaWdodCAvIDIsXG4gICAgICAgICAgICAgICAgZnJvbnQgPSBkZXB0aCAvIDIsXG4gICAgICAgICAgICAgICAgYmFjayA9IC1kZXB0aCAvMjtcblxuICAgICAgICAgICAgcmV0dXJuIEFycmF5QnVmZmVyLmNyZWF0ZShuZXcgRmxvYXQzMkFycmF5KFtcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQsIHVwLCBmcm9udCwgbGVmdCwgdXAsIGZyb250LCAgbGVmdCwgZG93biwgZnJvbnQsICByaWdodCwgZG93biwgZnJvbnQsICAvLyB2MC12MS12Mi12MyBmcm9udFxuICAgICAgICAgICAgICAgICAgICByaWdodCwgdXAsIGZyb250LCAgcmlnaHQsIGRvd24sIGZyb250LCAgcmlnaHQsIGRvd24sIGJhY2ssICByaWdodCwgdXAsIGJhY2ssICAvLyB2MC12My12NC12NSByaWdodFxuICAgICAgICAgICAgICAgICAgICByaWdodCwgdXAsIGZyb250LCAgcmlnaHQsIHVwLCBiYWNrLCAgbGVmdCwgdXAsIGJhY2ssICBsZWZ0LCB1cCwgZnJvbnQsICAvLyB2MC12NS12Ni12MSB1cFxuICAgICAgICAgICAgICAgICAgICBsZWZ0LCB1cCwgZnJvbnQsICBsZWZ0LCB1cCwgYmFjaywgIGxlZnQsIGRvd24sIGJhY2ssICBsZWZ0LCBkb3duLCBmcm9udCwgIC8vIHYxLXY2LXY3LXYyIGxlZnRcbiAgICAgICAgICAgICAgICAgICAgbGVmdCwgZG93biwgYmFjaywgIHJpZ2h0LCBkb3duLCBiYWNrLCAgcmlnaHQsIGRvd24sIGZyb250LCAgbGVmdCwgZG93biwgZnJvbnQsICAvLyB2Ny12NC12My12MiBkb3duXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0LCBkb3duLCBiYWNrLCAgbGVmdCwgZG93biwgYmFjaywgIGxlZnQsIHVwLCBiYWNrLCAgcmlnaHQsIHVwLCBiYWNrLy8gdjQtdjctdjYtdjUgYmFja1xuICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIDMsIEJ1ZmZlclR5cGUuRkxPQVQpXG4gICAgICAgIH1cblxuICAgICAgICBwcm90ZWN0ZWQgY29tcHV0ZUluZGljZXNCdWZmZXIoKXtcbiAgICAgICAgICAgIHJldHVybiBFbGVtZW50QnVmZmVyLmNyZWF0ZShuZXcgVWludDE2QXJyYXkoW1xuICAgICAgICAgICAgICAgIDAsIDEsIDIsICAgMCwgMiwgMywgICAgLy8gZnJvbnRcbiAgICAgICAgICAgICAgICA0LCA1LCA2LCAgIDQsIDYsIDcsICAgIC8vIHJpZ2h0XG4gICAgICAgICAgICAgICAgOCwgOSwxMCwgICA4LDEwLDExLCAgICAvLyB1cFxuICAgICAgICAgICAgICAgIDEyLDEzLDE0LCAgMTIsMTQsMTUsICAgIC8vIGxlZnRcbiAgICAgICAgICAgICAgICAxNiwxNywxOCwgIDE2LDE4LDE5LCAgICAvLyBkb3duXG4gICAgICAgICAgICAgICAgMjAsMjEsMjIsICAyMCwyMiwyMyAgICAgLy8gYmFja1xuICAgICAgICAgICAgXSksIEJ1ZmZlclR5cGUuVU5TSUdORURfU0hPUlQpXG4gICAgICAgIH1cbiAgICB9XG59XG5cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kZWZpbml0aW9ucy5kLnRzXCIvPlxubW9kdWxlIGR5e1xuICAgIGV4cG9ydCBjbGFzcyBSZWN0R2VvbWV0cnkgZXh0ZW5kcyBHZW9tZXRyeXtcbiAgICAgICAgcHVibGljIHN0YXRpYyBjcmVhdGUod2lkdGg6bnVtYmVyLCBoZWlnaHQ6bnVtYmVyLCBtYXRlcmlhbDpNZXNoTWF0ZXJpYWwpOlJlY3RHZW9tZXRyeSB7XG4gICAgICAgICAgICB2YXIgZ2VvbSA9IG5ldyB0aGlzKHdpZHRoLCBoZWlnaHQsIG1hdGVyaWFsKTtcblxuICAgICAgICAgICAgZ2VvbS5pbml0V2hlbkNyZWF0ZSgpO1xuXG4gICAgICAgICAgICByZXR1cm4gZ2VvbTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX3dpZHRoOm51bWJlciA9IG51bGw7XG4gICAgICAgIHByaXZhdGUgX2hlaWdodDpudW1iZXIgPSBudWxsO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQsIG1hdGVyaWFsKXtcbiAgICAgICAgICAgIHN1cGVyKG1hdGVyaWFsKTtcblxuICAgICAgICAgICAgdGhpcy5fd2lkdGggPSB3aWR0aDtcbiAgICAgICAgICAgIHRoaXMuX2hlaWdodCA9IGhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIHByb3RlY3RlZCBjb21wdXRlVmVydGljZXNCdWZmZXIoKXtcbiAgICAgICAgICAgIHZhciB3aWR0aCA9IHRoaXMuX3dpZHRoLFxuICAgICAgICAgICAgICAgIGhlaWdodCA9IHRoaXMuX2hlaWdodCxcbiAgICAgICAgICAgIGxlZnQgPSAtd2lkdGggLyAyLFxuICAgICAgICAgICAgICAgIHJpZ2h0ID0gd2lkdGggLyAyLFxuICAgICAgICAgICAgICAgIHVwID0gaGVpZ2h0IC8gMixcbiAgICAgICAgICAgICAgICBkb3duID0gLWhlaWdodCAvIDI7XG5cbiAgICAgICAgICAgIHJldHVybiBBcnJheUJ1ZmZlci5jcmVhdGUobmV3IEZsb2F0MzJBcnJheShbXG4gICAgICAgICAgICAgICAgcmlnaHQsIHVwLCAwLFxuICAgICAgICAgICAgICAgIGxlZnQsIHVwLCAwLFxuICAgICAgICAgICAgICAgIGxlZnQsIGRvd24sIDAsXG4gICAgICAgICAgICAgICAgcmlnaHQsIGRvd24sIDBcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIDMsIEJ1ZmZlclR5cGUuRkxPQVQpXG4gICAgICAgIH1cblxuICAgICAgICBwcm90ZWN0ZWQgY29tcHV0ZUluZGljZXNCdWZmZXIoKXtcbiAgICAgICAgICAgIHJldHVybiBFbGVtZW50QnVmZmVyLmNyZWF0ZShuZXcgVWludDE2QXJyYXkoW1xuICAgICAgICAgICAgICAgIDAsIDEsIDIsICAgMCwgMiwgM1xuICAgICAgICAgICAgXSksIEJ1ZmZlclR5cGUuVU5TSUdORURfU0hPUlQpXG4gICAgICAgIH1cbiAgICB9XG59XG5cbiIsIm1vZHVsZSBkeXtcbiAgICBleHBvcnQgZW51bSBTcGhlcmVEcmF3TW9kZXtcbiAgICAgICAgTEFUSVRVREVMT05HVElUVURFLFxuICAgICAgICBERUNPTVBPU0lUSU9OXG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RlZmluaXRpb25zLmQudHNcIi8+XG5tb2R1bGUgZHl7XG4gICAgZXhwb3J0IGNsYXNzIFNwaGVyZUdlb21ldHJ5IGV4dGVuZHMgR2VvbWV0cnl7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHJhZGl1czpudW1iZXIsIGRyYXdNb2RlOlNwaGVyZURyYXdNb2RlLCBzZWdtZW50czpudW1iZXIsICBtYXRlcmlhbDpNZXNoTWF0ZXJpYWwpOlNwaGVyZUdlb21ldHJ5IHtcbiAgICAgICAgICAgIHZhciBnZW9tID0gbmV3IHRoaXMocmFkaXVzLCBkcmF3TW9kZSwgc2VnbWVudHMsIG1hdGVyaWFsKTtcblxuICAgICAgICAgICAgZ2VvbS5pbml0V2hlbkNyZWF0ZSgpO1xuXG4gICAgICAgICAgICByZXR1cm4gZ2VvbTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX3JhZGl1czpudW1iZXIgPSBudWxsO1xuICAgICAgICBwcml2YXRlIF9kcmF3TW9kZTpTcGhlcmVEcmF3TW9kZSA9IG51bGw7XG4gICAgICAgIHByaXZhdGUgX3NlZ21lbnRzOm51bWJlciA9IG51bGw7XG4gICAgICAgIHByaXZhdGUgX2RhdGE6e1xuICAgICAgICAgICAgdmVydGljZXM7XG4gICAgICAgICAgICBpbmRpY2VzXG4gICAgICAgIH0gPSBudWxsO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKHJhZGl1czpudW1iZXIsIGRyYXdNb2RlOlNwaGVyZURyYXdNb2RlLCBzZWdtZW50czpudW1iZXIsICBtYXRlcmlhbDpNZXNoTWF0ZXJpYWwpe1xuICAgICAgICAgICAgc3VwZXIobWF0ZXJpYWwpO1xuXG4gICAgICAgICAgICB0aGlzLl9yYWRpdXMgPSByYWRpdXM7XG4gICAgICAgICAgICB0aGlzLl9kcmF3TW9kZSA9IGRyYXdNb2RlO1xuICAgICAgICAgICAgdGhpcy5fc2VnbWVudHMgPSBzZWdtZW50cztcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBpbml0V2hlbkNyZWF0ZSgpe1xuICAgICAgICAgICAgdGhpcy5fZGF0YSA9IHRoaXMuX2NvbXB1dGVEYXRhKHRoaXMuX3JhZGl1cywgdGhpcy5fZHJhd01vZGUsIHRoaXMuX3NlZ21lbnRzKTtcblxuICAgICAgICAgICAgc3VwZXIuaW5pdFdoZW5DcmVhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByb3RlY3RlZCBjb21wdXRlVmVydGljZXNCdWZmZXIoKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRhLnZlcnRpY2VzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJvdGVjdGVkIGNvbXB1dGVJbmRpY2VzQnVmZmVyKCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0YS5pbmRpY2VzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfY29tcHV0ZURhdGEocmFkaXVzOm51bWJlciwgZHJhd01vZGU6U3BoZXJlRHJhd01vZGUsIHNlZ21lbnRzOm51bWJlcil7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IG51bGw7XG5cbiAgICAgICAgICAgIGlmKGRyYXdNb2RlID09PSBTcGhlcmVEcmF3TW9kZS5MQVRJVFVERUxPTkdUSVRVREUpe1xuICAgICAgICAgICAgICAgIGRhdGEgPSBHZXREYXRhQnlMYXRpdHVkZUxvbmd0aXR1ZGUuY3JlYXRlKHJhZGl1cywgc2VnbWVudHMpLmdldERhdGEoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoZHJhd01vZGUgPT09IFNwaGVyZURyYXdNb2RlLkRFQ09NUE9TSVRJT04pe1xuICAgICAgICAgICAgICAgIGRhdGEgPSBHZXREYXRhQnlEZWNvbXBvc2l0aW9uLmNyZWF0ZShyYWRpdXMsIHNlZ21lbnRzKS5nZXREYXRhKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xhc3MgR2V0RGF0YUJ5TGF0aXR1ZGVMb25ndGl0dWRle1xuICAgICAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZShyYWRpdXM6bnVtYmVyLCBiYW5kczpudW1iZXIpOkdldERhdGFCeUxhdGl0dWRlTG9uZ3RpdHVkZSB7XG4gICAgICAgICAgICB2YXIgZ2VvbSA9IG5ldyB0aGlzKHJhZGl1cywgYmFuZHMpO1xuXG4gICAgICAgICAgICByZXR1cm4gZ2VvbTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX3ZlcnRpY2VzOm51bWJlcltdID0gW107XG4gICAgICAgIGdldCB2ZXJ0aWNlcygpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ZlcnRpY2VzO1xuICAgICAgICB9XG4gICAgICAgIHNldCB2ZXJ0aWNlcyh2ZXJ0aWNlczpudW1iZXJbXSl7XG4gICAgICAgICAgICB0aGlzLl92ZXJ0aWNlcyA9IHZlcnRpY2VzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfaW5kaWNlczpudW1iZXJbXSA9IFtdO1xuICAgICAgICBnZXQgaW5kaWNlcygpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2luZGljZXM7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IGluZGljZXMoaW5kaWNlczpudW1iZXJbXSl7XG4gICAgICAgICAgICB0aGlzLl9pbmRpY2VzID0gaW5kaWNlcztcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX3JhZGl1czpudW1iZXIgPSBudWxsO1xuICAgICAgICBwcml2YXRlIF9sYXRpdHVkZUJhbmRzOm51bWJlciA9IG51bGw7XG4gICAgICAgIHByaXZhdGUgX2xvbmdpdHVkZUJhbmRzOm51bWJlciA9IG51bGw7XG5cbiAgICAgICAgY29uc3RydWN0b3IocmFkaXVzLCBiYW5kcyl7XG4gICAgICAgICAgICB0aGlzLl9yYWRpdXMgPSByYWRpdXM7XG4gICAgICAgICAgICB0aGlzLl9sYXRpdHVkZUJhbmRzID0gYmFuZHM7XG4gICAgICAgICAgICB0aGlzLl9sb25naXR1ZGVCYW5kcyA9IGJhbmRzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGdldERhdGEoKXtcbiAgICAgICAgICAgIC8v57u05bqmXG4gICAgICAgICAgICBmb3IgKHZhciBsYXROdW1iZXIgPSAwOyBsYXROdW1iZXIgPD0gdGhpcy5fbGF0aXR1ZGVCYW5kczsgbGF0TnVtYmVyKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhldGEgPSBsYXROdW1iZXIgKiBNYXRoLlBJIC8gdGhpcy5fbGF0aXR1ZGVCYW5kcztcbiAgICAgICAgICAgICAgICB2YXIgc2luVGhldGEgPSBNYXRoLnNpbih0aGV0YSk7XG4gICAgICAgICAgICAgICAgdmFyIGNvc1RoZXRhID0gTWF0aC5jb3ModGhldGEpO1xuXG4gICAgICAgICAgICAgICAgLy/nu4/luqZcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBsb25nTnVtYmVyID0gMDsgbG9uZ051bWJlciA8PSB0aGlzLl9sb25naXR1ZGVCYW5kczsgbG9uZ051bWJlcisrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwaGkgPSBsb25nTnVtYmVyICogMiAqIE1hdGguUEkgLyB0aGlzLl9sb25naXR1ZGVCYW5kcztcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNpblBoaSA9IE1hdGguc2luKHBoaSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb3NQaGkgPSBNYXRoLmNvcyhwaGkpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vdmFyIHggPSB0aGlzLl9yYWRpdXMgKiBjb3NQaGkgKiBzaW5UaGV0YSArIHBvaW50WDtcbiAgICAgICAgICAgICAgICAgICAgLy92YXIgeSA9IHRoaXMuX3JhZGl1cyAqY29zVGhldGEgKyBwb2ludFk7XG4gICAgICAgICAgICAgICAgICAgIC8vdmFyIHogPSB0aGlzLl9yYWRpdXMgKnNpblBoaSAqIHNpblRoZXRhICsgcG9pbnRaO1xuICAgICAgICAgICAgICAgICAgICB2YXIgeCA9IHRoaXMuX3JhZGl1cyAqIGNvc1BoaSAqIHNpblRoZXRhO1xuICAgICAgICAgICAgICAgICAgICB2YXIgeSA9IHRoaXMuX3JhZGl1cyAqY29zVGhldGE7XG4gICAgICAgICAgICAgICAgICAgIHZhciB6ID0gdGhpcy5fcmFkaXVzICpzaW5QaGkgKiBzaW5UaGV0YTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHUgPSAxIC0gKGxvbmdOdW1iZXIgLyB0aGlzLl9sb25naXR1ZGVCYW5kcyk7XG4gICAgICAgICAgICAgICAgICAgIHZhciB2ID0gMSAtIChsYXROdW1iZXIgLyB0aGlzLl9sYXRpdHVkZUJhbmRzKTtcblxuICAgICAgICAgICAgICAgICAgICAvL25vcm1hbHMucHVzaCh4KTtcbiAgICAgICAgICAgICAgICAgICAgLy9ub3JtYWxzLnB1c2goeSk7XG4gICAgICAgICAgICAgICAgICAgIC8vbm9ybWFscy5wdXNoKHopO1xuICAgICAgICAgICAgICAgICAgICAvL3RleENvb3Jkcy5wdXNoKHUpO1xuICAgICAgICAgICAgICAgICAgICAvL3RleENvb3Jkcy5wdXNoKHYpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl92ZXJ0aWNlcy5wdXNoKHgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl92ZXJ0aWNlcy5wdXNoKHkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl92ZXJ0aWNlcy5wdXNoKHopO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuXG5cbiAgICAgICAgICAgIC8vdGhpcy5f5LiA5ZyI5pyJ57uP5bqm54K5bG9uZ2l0dWRlQmFuZHPkuKpcbiAgICAgICAgICAgIGZvciAodmFyIGxhdE51bWJlciA9IDA7IGxhdE51bWJlciA8IHRoaXMuX2xhdGl0dWRlQmFuZHM7IGxhdE51bWJlcisrKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgbG9uZ051bWJlciA9IDA7IGxvbmdOdW1iZXIgPCB0aGlzLl9sb25naXR1ZGVCYW5kczsgbG9uZ051bWJlcisrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBmaXJzdCA9IGxhdE51bWJlciAqICh0aGlzLl9sb25naXR1ZGVCYW5kcyArIDEpICsgbG9uZ051bWJlcjtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlY29uZCA9IGZpcnN0ICsgdGhpcy5fbG9uZ2l0dWRlQmFuZHMgKyAxO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbmRpY2VzLnB1c2goZmlyc3QpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbmRpY2VzLnB1c2goc2Vjb25kKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5kaWNlcy5wdXNoKGZpcnN0ICsgMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5kaWNlcy5wdXNoKHNlY29uZCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2luZGljZXMucHVzaChzZWNvbmQgKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5kaWNlcy5wdXNoKGZpcnN0ICsgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHZlcnRpY2VzOiBBcnJheUJ1ZmZlci5jcmVhdGUobmV3IEZsb2F0MzJBcnJheSh0aGlzLl92ZXJ0aWNlcyksXG4gICAgICAgICAgICAgICAgICAgIDMsIEJ1ZmZlclR5cGUuRkxPQVQpLFxuICAgICAgICAgICAgICAgIGluZGljZXM6IEVsZW1lbnRCdWZmZXIuY3JlYXRlKG5ldyBVaW50MTZBcnJheSh0aGlzLl9pbmRpY2VzKSxcbiAgICAgICAgICAgICAgICAgICAgQnVmZmVyVHlwZS5VTlNJR05FRF9TSE9SVClcbiAgICAgICAgICAgICAgICAvL25vcm1hbHM6IG5ldyBGbG9hdDMyQXJyYXkobm9ybWFscyksXG4gICAgICAgICAgICAgICAgLy90ZXhDb29yZHM6IG5ldyBGbG9hdDMyQXJyYXkodGV4Q29vcmRzKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBjbGFzcyBHZXREYXRhQnlEZWNvbXBvc2l0aW9ue1xuICAgICAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZShyYWRpdXM6bnVtYmVyLCBjb3VudDpudW1iZXIpOkdldERhdGFCeURlY29tcG9zaXRpb24ge1xuICAgICAgICAgICAgdmFyIGdlb20gPSBuZXcgdGhpcyhyYWRpdXMsIGNvdW50KTtcblxuICAgICAgICAgICAgcmV0dXJuIGdlb207XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF92ZXJ0aWNlczpudW1iZXJbXSA9IFtdO1xuICAgICAgICBnZXQgdmVydGljZXMoKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl92ZXJ0aWNlcztcbiAgICAgICAgfVxuICAgICAgICBzZXQgdmVydGljZXModmVydGljZXM6bnVtYmVyW10pe1xuICAgICAgICAgICAgdGhpcy5fdmVydGljZXMgPSB2ZXJ0aWNlcztcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2luZGljZXM6bnVtYmVyW10gPSBbXTtcbiAgICAgICAgZ2V0IGluZGljZXMoKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pbmRpY2VzO1xuICAgICAgICB9XG4gICAgICAgIHNldCBpbmRpY2VzKGluZGljZXM6bnVtYmVyW10pe1xuICAgICAgICAgICAgdGhpcy5faW5kaWNlcyA9IGluZGljZXM7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF92TGVuOm51bWJlciA9IG51bGw7XG4gICAgICAgIHByaXZhdGUgX3JhZGl1czpudW1iZXIgPSBudWxsO1xuICAgICAgICBwcml2YXRlIF9jb3VudDpudW1iZXIgPSBudWxsO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKHJhZGl1cywgY291bnQpe1xuICAgICAgICAgICAgdGhpcy5fcmFkaXVzID0gcmFkaXVzO1xuICAgICAgICAgICAgdGhpcy5fY291bnQgPSBjb3VudDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vdG9kbyBhZGQgdGV4Q29vcmRzXG4gICAgICAgIHB1YmxpYyBnZXREYXRhKCl7XG4gICAgICAgICAgICB2YXIgb3JpZ2luVmVydGljZXMgPSBbXG4gICAgICAgICAgICAgICAgW3RoaXMuX3JhZGl1cywgMCwgMF0sXG4gICAgICAgICAgICAgICAgWy10aGlzLl9yYWRpdXMsIDAsIDBdLFxuICAgICAgICAgICAgICAgIFswLCB0aGlzLl9yYWRpdXMsIDBdLFxuICAgICAgICAgICAgICAgIFswLCAtdGhpcy5fcmFkaXVzLCAwXSxcbiAgICAgICAgICAgICAgICBbMCwgMCwgdGhpcy5fcmFkaXVzXSxcbiAgICAgICAgICAgICAgICBbMCwgMCwgLXRoaXMuX3JhZGl1c11cbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICB2YXIgb3JpZ2luSW5kaWNlcyA9IFtcbiAgICAgICAgICAgICAgICAvL1syLDQsMF0sWzIsMCw1XSxbMiw1LDFdLFsyLDEsNF0sICAgWzMsMCw0XSxbMyw1LDBdLFszLDEsNV0sWzMsNCwxXVxuICAgICAgICAgICAgICAgIC8vWzIsNCwwXVxuICAgICAgICAgICAgICAgIFsyLDQsMF0sWzIsMCw1XSxbMiw1LDFdLFsyLDEsNF0sXG4gICAgICAgICAgICAgICAgWzMsMCw0XSxbMyw1LDBdLFszLDEsNV0sWzMsNCwxXVxuICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgdGhpcy5fdkxlbiA9IG9yaWdpblZlcnRpY2VzLmxlbmd0aDtcblxuICAgICAgICAgICAgdmFyIGogPSAwO1xuICAgICAgICAgICAgdmFyIGxlbiA9IG9yaWdpblZlcnRpY2VzLmxlbmd0aDtcblxuICAgICAgICAgICAgZm9yKGogPSAwOyBqIDwgbGVuOyBqICsrKXtcbiAgICAgICAgICAgICAgICB0aGlzLl92ZXJ0aWNlcyA9IHRoaXMuX3ZlcnRpY2VzLmNvbmNhdChvcmlnaW5WZXJ0aWNlc1tqXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBqID0gMCxcbiAgICAgICAgICAgICAgICBsZW4gPSBvcmlnaW5JbmRpY2VzLmxlbmd0aDsgIC8vOOmdouS9k1xuXG4gICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgbGVuOyBqICsrKXtcbiAgICAgICAgICAgICAgICAvL2ZvciAoaSA9IDA7IGkgPCB0aGlzLl9jb3VudDsgaSsrKXtcbiAgICAgICAgICAgICAgICAvL3RoaXMuX3ZlcnRpY2VzID0gdGhpcy5fdmVydGljZXMuY29uY2F0KG9yaWdpblZlcnRpY2VzW29yaWdpbkluZGljZXNbal1bMF1dLFxuICAgICAgICAgICAgICAgIC8vICAgIG9yaWdpblZlcnRpY2VzW29yaWdpbkluZGljZXNbal1bMV1dLFxuICAgICAgICAgICAgICAgIC8vICAgIG9yaWdpblZlcnRpY2VzW29yaWdpbkluZGljZXNbal1bMl1dKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX3N1YkRpdmlkZShvcmlnaW5WZXJ0aWNlc1tvcmlnaW5JbmRpY2VzW2pdWzBdXSxcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luVmVydGljZXNbb3JpZ2luSW5kaWNlc1tqXVsxXV0sXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpblZlcnRpY2VzW29yaWdpbkluZGljZXNbal1bMl1dLFxuICAgICAgICAgICAgICAgICAgICBvcmlnaW5JbmRpY2VzW2pdLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb3VudCxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmFkaXVzKTtcblxuICAgICAgICAgICAgICAgIC8vfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdmVydGljZXM6IEFycmF5QnVmZmVyLmNyZWF0ZShuZXcgRmxvYXQzMkFycmF5KHRoaXMuX3ZlcnRpY2VzKSxcbiAgICAgICAgICAgICAgICAgICAgMywgQnVmZmVyVHlwZS5GTE9BVCksXG4gICAgICAgICAgICAgICAgaW5kaWNlczogRWxlbWVudEJ1ZmZlci5jcmVhdGUobmV3IFVpbnQxNkFycmF5KHRoaXMuX2luZGljZXMpLFxuICAgICAgICAgICAgICAgICAgICBCdWZmZXJUeXBlLlVOU0lHTkVEX1NIT1JUKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfc3ViRGl2aWRlKHYxOm51bWJlcltdLCB2MjpudW1iZXJbXSwgdjM6bnVtYmVyW10sIGluZDpudW1iZXJbXSxjb3VudDpudW1iZXIsIHJhZGl1czpudW1iZXIpOiB2b2lke1xuICAgICAgICAgICAgaWYoY291bnQgPD0gMCl7XG4gICAgICAgICAgICAgICAgdGhpcy5faW5kaWNlcyA9IHRoaXMuX2luZGljZXMuY29uY2F0KGluZCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICAgICAgdmFyIHYxMiA9IFtdLFxuICAgICAgICAgICAgICAgIHYyMyA9IFtdLFxuICAgICAgICAgICAgICAgIHYzMSA9IFtdO1xuXG4gICAgICAgICAgICAvL+axguWQkemHj+S4reW/g+eCuVxuICAgICAgICAgICAgZm9yKGkgPSAwOyBpIDwgMzsgaSsrKXtcbiAgICAgICAgICAgICAgICB2MTJbaV0gPSAodjFbaV0rdjJbaV0pLzI7ICAvL+axguWPluetieWIhueahOS4reeCueWdkOagh1xuICAgICAgICAgICAgICAgIHYyM1tpXSA9ICh2MltpXSt2M1tpXSkvMjtcbiAgICAgICAgICAgICAgICB2MzFbaV0gPSAodjNbaV0rdjFbaV0pLzI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8v5qih6ZW/5omp5bGVXG4gICAgICAgICAgICB0aGlzLl9ub3JtYWxpemUodjEyLCByYWRpdXMpO1xuICAgICAgICAgICAgdGhpcy5fbm9ybWFsaXplKHYyMywgcmFkaXVzKTtcbiAgICAgICAgICAgIHRoaXMuX25vcm1hbGl6ZSh2MzEsIHJhZGl1cyk7XG5cbiAgICAgICAgICAgIHRoaXMuX3ZlcnRpY2VzID0gdGhpcy5fdmVydGljZXMuY29uY2F0KHYxMiwgdjIzLCB2MzEpO1xuXG4gICAgICAgICAgICB2YXIgaVYxID0gaW5kWzBdLFxuICAgICAgICAgICAgICAgIGlWMiA9IGluZFsxXSxcbiAgICAgICAgICAgICAgICBpVjMgPSBpbmRbMl0sXG4gICAgICAgICAgICAgICAgaVYxMiA9dGhpcy5fdkxlbixcbiAgICAgICAgICAgICAgICBpVjIzID10aGlzLl92TGVuICsgMSxcbiAgICAgICAgICAgICAgICBpVjMxID10aGlzLl92TGVuICsgMjtcblxuICAgICAgICAgICAgdmFyIGluMSA9W1xuICAgICAgICAgICAgICAgIGlWMSwgaVYxMiwgaVYzMVxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIHZhciBpbjIgPVtcbiAgICAgICAgICAgICAgICBpVjMxLCBpVjEyLCBpVjIzXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgdmFyIGluMyA9W1xuICAgICAgICAgICAgICAgIGlWMTIsIGlWMiwgaVYyM1xuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIHZhciBpbjQgPVtcbiAgICAgICAgICAgICAgICBpVjMxLCBpVjIzLCBpVjNcbiAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgIHRoaXMuX3ZMZW4gPXRoaXMuX3ZMZW4gKyAzO1xuXG5cblxuICAgICAgICAgICAgLy/nu6fnu63liIfliIbkuInop5LlvaJcbiAgICAgICAgICAgIHRoaXMuX3N1YkRpdmlkZSh2MSx2MTIsdjMxLGluMSwgY291bnQtMSwgcmFkaXVzKTsgLy/lr7nmiYDkuqfnlJ/nmoQ05Liq5paw55qE5LiJ6KeS6Z2i5YaN6L+b6KGM562J5YiGXG4gICAgICAgICAgICB0aGlzLl9zdWJEaXZpZGUodjMxLHYxMiwgdjIzLCBpbjIsIGNvdW50LTEsIHJhZGl1cyk7XG4gICAgICAgICAgICB0aGlzLl9zdWJEaXZpZGUodjEyLCB2MiwgdjIzLCBpbjMsIGNvdW50LTEsIHJhZGl1cyk7XG4gICAgICAgICAgICB0aGlzLl9zdWJEaXZpZGUodjMxLCB2MjMsIHYzLCBpbjQsIGNvdW50LTEsIHJhZGl1cyk7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9ub3JtYWxpemUodjpudW1iZXJbXSwgcmFkaXVzOm51bWJlcik6IG51bWJlcltde1xuICAgICAgICAgICAgdmFyIGQgPSBNYXRoLnNxcnQoXG4gICAgICAgICAgICAgICAgdlswXSAqIHZbMF0gKyB2WzFdICogdlsxXSArIHZbMl0gKiB2WzJdXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBpZihkID09PSAwKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzAsIDAsIDBdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2WzBdID0gcmFkaXVzICogdlswXSAvIGQ7XG4gICAgICAgICAgICB2WzFdID0gcmFkaXVzICogdlsxXSAvIGQ7XG4gICAgICAgICAgICB2WzJdID0gcmFkaXVzICogdlsyXSAvIGQ7XG5cbiAgICAgICAgICAgIHJldHVybiB2O1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RlZmluaXRpb25zLmQudHNcIi8+XG5tb2R1bGUgZHl7XG4gICAgZXhwb3J0IGNsYXNzIFRyaWFuZ2xlR2VvbWV0cnkgZXh0ZW5kcyBHZW9tZXRyeXtcbiAgICAgICAgcHVibGljIHN0YXRpYyBjcmVhdGUod2lkdGg6bnVtYmVyLCBoZWlnaHQ6bnVtYmVyLCBtYXRlcmlhbDpNZXNoTWF0ZXJpYWwpOlRyaWFuZ2xlR2VvbWV0cnkge1xuICAgICAgICAgICAgdmFyIGdlb20gPSBuZXcgdGhpcyh3aWR0aCwgaGVpZ2h0LCBtYXRlcmlhbCk7XG5cbiAgICAgICAgICAgIGdlb20uaW5pdFdoZW5DcmVhdGUoKTtcblxuICAgICAgICAgICAgcmV0dXJuIGdlb207XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF93aWR0aDpudW1iZXIgPSBudWxsO1xuICAgICAgICBwcml2YXRlIF9oZWlnaHQ6bnVtYmVyID0gbnVsbDtcblxuICAgICAgICBjb25zdHJ1Y3Rvcih3aWR0aDpudW1iZXIsIGhlaWdodDpudW1iZXIsIG1hdGVyaWFsOk1lc2hNYXRlcmlhbCl7XG4gICAgICAgICAgICBzdXBlcihtYXRlcmlhbCk7XG5cbiAgICAgICAgICAgIHRoaXMuX3dpZHRoID0gd2lkdGg7XG4gICAgICAgICAgICB0aGlzLl9oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIH1cblxuICAgICAgICBwcm90ZWN0ZWQgY29tcHV0ZVZlcnRpY2VzQnVmZmVyKCl7XG4gICAgICAgICAgICB2YXIgd2lkdGggPSB0aGlzLl93aWR0aCxcbiAgICAgICAgICAgICAgICBoZWlnaHQgPSB0aGlzLl9oZWlnaHQsXG4gICAgICAgICAgICAgICAgbGVmdCA9IC13aWR0aCAvIDIsXG4gICAgICAgICAgICAgICAgcmlnaHQgPSB3aWR0aCAvIDIsXG4gICAgICAgICAgICAgICAgdXAgPSBoZWlnaHQgLyAyLFxuICAgICAgICAgICAgICAgIGRvd24gPSAtaGVpZ2h0IC8gMjtcblxuICAgICAgICAgICAgcmV0dXJuIEFycmF5QnVmZmVyLmNyZWF0ZShuZXcgRmxvYXQzMkFycmF5KFtcbiAgICAgICAgICAgICAgICAgICAgMC4wLCB1cCwgMCxcbiAgICAgICAgICAgICAgICAgICAgbGVmdCwgZG93biwgMCxcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQsIGRvd24sIDBcbiAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAzLCBCdWZmZXJUeXBlLkZMT0FUKVxuICAgICAgICB9XG5cbiAgICAgICAgcHJvdGVjdGVkIGNvbXB1dGVJbmRpY2VzQnVmZmVyKCl7XG4gICAgICAgICAgICByZXR1cm4gRWxlbWVudEJ1ZmZlci5jcmVhdGUobmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgICAgICAgICAgIDAsIDEsIDJcbiAgICAgICAgICAgIF0pLCBCdWZmZXJUeXBlLlVOU0lHTkVEX0JZVEUpXG4gICAgICAgIH1cbiAgICB9XG59XG5cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9kZWZpbml0aW9ucy5kLnRzXCIvPlxubW9kdWxlIGR5e1xuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUV2ZW50T2ZmRGF0YSB7XG4gICAgICAgIGV2ZW50TmFtZTpFdmVudE5hbWUsXG4gICAgICAgIHdyYXBIYW5kbGVyOkZ1bmN0aW9uXG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIEV2ZW50TGlzdGVuZXJNYXB7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKCkge1xuICAgICAgICBcdHZhciBvYmogPSBuZXcgdGhpcygpO1xuXG4gICAgICAgIFx0cmV0dXJuIG9iajtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2xpc3RlbmVyTWFwOmR5Q2IuSGFzaCA9IGR5Q2IuSGFzaC5jcmVhdGUoKTtcblxuICAgICAgICBwdWJsaWMgYXBwZW5kQ2hpbGQoZXZlbnROYW1lOkV2ZW50TmFtZSwgZGF0YTpJRXZlbnRSZWdpc3RlckRhdGEpe1xuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJNYXAuYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgICAgICAgLy9TdHJpbmcoZGF0YS50YXJnZXQudWlkKSArIFwiX1wiICsgZXZlbnROYW1lLFxuICAgICAgICAgICAgICAgIHRoaXMuX2J1aWxkS2V5KGRhdGEudGFyZ2V0LCBldmVudE5hbWUpLFxuICAgICAgICAgICAgICAgIGRhdGFcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgZ2V0Q2hpbGQoZXZlbnROYW1lOkV2ZW50TmFtZSk6YW55O1xuICAgICAgICBwdWJsaWMgZ2V0Q2hpbGQodGFyZ2V0OkdhbWVPYmplY3QpOmFueTtcbiAgICAgICAgcHVibGljIGdldENoaWxkKHRhcmdldDpHYW1lT2JqZWN0LCBldmVudE5hbWU6RXZlbnROYW1lKTphbnk7XG5cbiAgICAgICAgcHVibGljIGdldENoaWxkKGFyZ3Mpe1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vcmV0dXJuIHRoaXMuX2xpc3RlbmVyTWFwLmZpbHRlcigobGlzdDpkeUNiLkNvbGxlY3Rpb24sIGtleTpzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIC8vICAgIHJldHVybiBrZXkgPT09IHNlbGYuX2J1aWxkS2V5KHRhcmdldCwgZXZlbnROYW1lKTtcbiAgICAgICAgICAgIC8vfSk7XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSAmJiBKdWRnZVV0aWxzLmlzU3RyaW5nKGFyZ3VtZW50c1swXSkpe1xuICAgICAgICAgICAgICAgIGxldCBldmVudE5hbWUgPSBhcmd1bWVudHNbMF07XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbGlzdGVuZXJNYXAuZ2V0Q2hpbGQoZXZlbnROYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSl7XG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldCA9IGFyZ3VtZW50c1swXTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9saXN0ZW5lck1hcC5maWx0ZXIoKGxpc3Q6ZHlDYi5Db2xsZWN0aW9uLCBrZXk6c3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLmlzVGFyZ2V0KGtleSwgdGFyZ2V0LCBsaXN0KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMil7XG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldCA9IGFyZ3VtZW50c1swXSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnROYW1lID0gYXJndW1lbnRzWzFdO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RlbmVyTWFwLmdldENoaWxkKHRoaXMuX2J1aWxkS2V5KHRhcmdldCwgZXZlbnROYW1lKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgaGFzQ2hpbGQoLi4uYXJncyl7XG4gICAgICAgICAgICBpZihhcmd1bWVudHMubGVuZ3RoID09PSAxICYmIEp1ZGdlVXRpbHMuaXNGdW5jdGlvbihhcmd1bWVudHNbMF0pKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbGlzdGVuZXJNYXAuaGFzQ2hpbGQoYXJndW1lbnRzWzBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMil7XG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldCA9IGFyZ3VtZW50c1swXSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnROYW1lID0gYXJndW1lbnRzWzFdO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RlbmVyTWFwLmhhc0NoaWxkKHRoaXMuX2J1aWxkS2V5KHRhcmdldCwgZXZlbnROYW1lKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgZmlsdGVyKGZ1bmM6RnVuY3Rpb24pe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RlbmVyTWFwLmZpbHRlcihmdW5jKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBmb3JFYWNoKGZ1bmM6RnVuY3Rpb24pe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RlbmVyTWFwLmZvckVhY2goZnVuYyk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgcmVtb3ZlQ2hpbGQoZXZlbnROYW1lOkV2ZW50TmFtZSk6dm9pZDtcbiAgICAgICAgcHVibGljIHJlbW92ZUNoaWxkKGV2ZW50TmFtZTpFdmVudE5hbWUsIGhhbmRsZXI6RnVuY3Rpb24pOnZvaWQ7XG4gICAgICAgIHB1YmxpYyByZW1vdmVDaGlsZCh1aWQ6bnVtYmVyLCBldmVudE5hbWU6RXZlbnROYW1lKTp2b2lkO1xuICAgICAgICBwdWJsaWMgcmVtb3ZlQ2hpbGQodGFyZ2V0OkdhbWVPYmplY3QpOnZvaWQ7XG4gICAgICAgIHB1YmxpYyByZW1vdmVDaGlsZCh0YXJnZXQ6R2FtZU9iamVjdCwgZXZlbnROYW1lOkV2ZW50TmFtZSk6dm9pZDtcbiAgICAgICAgcHVibGljIHJlbW92ZUNoaWxkKHRhcmdldDpHYW1lT2JqZWN0LCBldmVudE5hbWU6RXZlbnROYW1lLCBoYW5kbGVyOkZ1bmN0aW9uKTp2b2lkO1xuXG4gICAgICAgIHB1YmxpYyByZW1vdmVDaGlsZChhcmdzKXtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICAgICAgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSAmJiBKdWRnZVV0aWxzLmlzU3RyaW5nKGFyZ3VtZW50c1swXSkpe1xuICAgICAgICAgICAgICAgIGxldCBldmVudE5hbWUgPSBhcmd1bWVudHNbMF07XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9saXN0ZW5lck1hcC5yZW1vdmVDaGlsZChldmVudE5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhcmd1bWVudHMubGVuZ3RoID09PSAyICYmIEp1ZGdlVXRpbHMuaXNGdW5jdGlvbihhcmd1bWVudHNbMV0pKXtcbiAgICAgICAgICAgICAgICBsZXQgZXZlbnROYW1lID0gYXJndW1lbnRzWzBdLFxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVyID0gYXJndW1lbnRzWzFdLFxuICAgICAgICAgICAgICAgICAgICBsaXN0OmR5Q2IuQ29sbGVjdGlvbiA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICBsaXN0ID0gdGhpcy5fbGlzdGVuZXJNYXAuZ2V0Q2hpbGQoZXZlbnROYW1lKTtcblxuICAgICAgICAgICAgICAgIGxpc3QucmVtb3ZlQ2hpbGQoKHZhbDpJRXZlbnRSZWdpc3RlckRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWwuaGFuZGxlciA9PT0gaGFuZGxlcjtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpZihsaXN0LmdldENvdW50KCkgPT09IDApe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9saXN0ZW5lck1hcC5yZW1vdmVDaGlsZChldmVudE5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMiAmJiBKdWRnZVV0aWxzLmlzTnVtYmVyKGFyZ3VtZW50c1swXSkpe1xuICAgICAgICAgICAgICAgIGxldCB1aWQgPSBhcmd1bWVudHNbMF0sXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50TmFtZSA9IGFyZ3VtZW50c1sxXTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVyTWFwLnJlbW92ZUNoaWxkKHRoaXMuX2J1aWxkS2V5KHVpZCwgZXZlbnROYW1lKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpe1xuICAgICAgICAgICAgICAgIGxldCB0YXJnZXQgPSBhcmd1bWVudHNbMF07XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9saXN0ZW5lck1hcC5yZW1vdmVDaGlsZCgobGlzdDpkeUNiLkNvbGxlY3Rpb24sIGtleTpzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuaXNUYXJnZXQoa2V5LCB0YXJnZXQsIGxpc3QpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhcmd1bWVudHMubGVuZ3RoID09PSAyKXtcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0ID0gYXJndW1lbnRzWzBdLFxuICAgICAgICAgICAgICAgIGV2ZW50TmFtZSA9IGFyZ3VtZW50c1sxXTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVyTWFwLnJlbW92ZUNoaWxkKHRoaXMuX2J1aWxkS2V5KHRhcmdldCwgZXZlbnROYW1lKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDMpe1xuICAgICAgICAgICAgICAgIGxldCB0YXJnZXQgPSBhcmd1bWVudHNbMF0sXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50TmFtZSA9IGFyZ3VtZW50c1sxXSxcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlciA9IGFyZ3VtZW50c1syXTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVyTWFwLm1hcCgobGlzdDpkeUNiLkNvbGxlY3Rpb24sIGtleTpzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdC5yZW1vdmVDaGlsZCgodmFsOklFdmVudFJlZ2lzdGVyRGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbC5oYW5kbGVyID09PSBoYW5kbGVyO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBpZihsaXN0LmdldENvdW50KCkgPT09IDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGR5Q2IuJFJFTU9WRTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBba2V5LCBsaXN0XTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBnZXRFdmVudE9mZkRhdGFMaXN0KHRhcmdldDpHYW1lT2JqZWN0LCBldmVudE5hbWU/OkV2ZW50TmFtZSl7XG4gICAgICAgICAgICB2YXIgcmVzdWx0OmR5Q2IuQ29sbGVjdGlvbiA9IGR5Q2IuQ29sbGVjdGlvbi5jcmVhdGUoKSxcbiAgICAgICAgICAgICAgICBzZWxmID0gdGhpcztcblxuICAgICAgICAgICAgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSl7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRDaGlsZCh0YXJnZXQpXG4gICAgICAgICAgICAgICAgLmZvckVhY2goKGxpc3Q6ZHlDYi5Db2xsZWN0aW9uLCBrZXk6c3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihsaXN0ICYmIGxpc3QuZ2V0Q291bnQoKSA+IDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5hZGRDaGlsZChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPElFdmVudE9mZkRhdGE+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnROYW1lOiBzZWxmLmdldEV2ZW50TmFtZUZyb21LZXkoa2V5KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyYXBIYW5kbGVyOiBsaXN0LmdldENoaWxkKDApLndyYXBIYW5kbGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpe1xuICAgICAgICAgICAgICAgIHZhciBsaXN0OmR5Q2IuQ29sbGVjdGlvbiA9IHRoaXMuZ2V0Q2hpbGQodGFyZ2V0LCBldmVudE5hbWUpO1xuXG4gICAgICAgICAgICAgICAgaWYobGlzdCAmJiBsaXN0LmdldENvdW50KCkgPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmFkZENoaWxkKFxuICAgICAgICAgICAgICAgICAgICAgICAgPElFdmVudE9mZkRhdGE+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50TmFtZTogZXZlbnROYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyYXBIYW5kbGVyOiBsaXN0LmdldENoaWxkKDApLndyYXBIYW5kbGVyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBnZXRFdmVudE5hbWVGcm9tS2V5KGtleTpzdHJpbmcpOkV2ZW50TmFtZXtcbiAgICAgICAgICAgIHJldHVybiBrZXkuaW5kZXhPZihcIl9cIikgPiAtMSA/IDxhbnk+a2V5LnNwbGl0KFwiX1wiKVsxXSA6IGtleTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBnZXRVaWRGcm9tS2V5KGtleTpzdHJpbmcpOm51bWJlcntcbiAgICAgICAgICAgIHJldHVybiBrZXkuaW5kZXhPZihcIl9cIikgPiAtMSA/IE51bWJlcig8YW55PmtleS5zcGxpdChcIl9cIilbMF0pIDogbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBpc1RhcmdldChrZXk6c3RyaW5nLCB0YXJnZXQ6R2FtZU9iamVjdCwgbGlzdDpkeUNiLkNvbGxlY3Rpb24pe1xuICAgICAgICAgICAgcmV0dXJuIGtleS5pbmRleE9mKFN0cmluZyh0YXJnZXQudWlkKSkgPiAtMSAmJiBsaXN0ICE9PSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9idWlsZEtleSh1aWQ6bnVtYmVyLCBldmVudE5hbWU6RXZlbnROYW1lKTpzdHJpbmc7XG4gICAgICAgIHByaXZhdGUgX2J1aWxkS2V5KHRhcmdldDpHYW1lT2JqZWN0LCBldmVudE5hbWU6RXZlbnROYW1lKTpzdHJpbmc7XG5cbiAgICAgICAgcHJpdmF0ZSBfYnVpbGRLZXkoYXJncyl7XG4gICAgICAgICAgICBpZihKdWRnZVV0aWxzLmlzTnVtYmVyKGFyZ3VtZW50c1swXSkpe1xuICAgICAgICAgICAgICAgIGxldCB1aWQgPSBhcmd1bWVudHNbMF0sXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50TmFtZSA9IGFyZ3VtZW50c1sxXTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9idWlsZEtleVdpdGhVaWQodWlkLCBldmVudE5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0ID0gYXJndW1lbnRzWzBdLFxuICAgICAgICAgICAgICAgICAgICBldmVudE5hbWUgPSBhcmd1bWVudHNbMV07XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0ID8gdGhpcy5fYnVpbGRLZXlXaXRoVWlkKHRhcmdldC51aWQsIGV2ZW50TmFtZSkgOiA8YW55PmV2ZW50TmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2J1aWxkS2V5V2l0aFVpZCh1aWQ6bnVtYmVyLCBldmVudE5hbWU6RXZlbnROYW1lKXtcbiAgICAgICAgICAgIHJldHVybiBTdHJpbmcodWlkKSArIFwiX1wiICsgZXZlbnROYW1lO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwibW9kdWxlIGR5IHtcbiAgICBleHBvcnQgZW51bSBFdmVudFR5cGV7XG4gICAgICAgIE1PVVNFLFxuICAgICAgICBLRVlCT0FSRCxcbiAgICAgICAgQ1VTVE9NXG4gICAgfVxufVxuIiwibW9kdWxlIGR5e1xuICAgIGV4cG9ydCBlbnVtIEV2ZW50TmFtZXtcbiAgICAgICAgQ0xJQ0sgPSA8YW55PlwiY2xpY2tcIixcbiAgICAgICAgTU9VU0VPVkVSID0gPGFueT5cIm1vdXNlb3ZlclwiLFxuICAgICAgICBNT1VTRVVQID0gPGFueT5cIm1vdXNldXBcIixcbiAgICAgICAgTU9VU0VPVVQgPSA8YW55PlwibW91c2VvdXRcIixcbiAgICAgICAgTU9VU0VNT1ZFID0gPGFueT5cIm1vdXNlbW92ZVwiLFxuICAgICAgICBNT1VTRURPV04gPSA8YW55PlwibW91c2Vkb3duXCIsXG5cbiAgICAgICAgS0VZRE9XTiA9IDxhbnk+XCJrZXlkb3duXCIsXG4gICAgICAgIEtFWVVQID0gPGFueT5cImtleXVwXCIsXG4gICAgICAgIEtFWVBSRVNTID0gPGFueT5cImtleXByZXNzXCJcbiAgICB9XG59XG4iLCJtb2R1bGUgZHl7XG4gICAgZXhwb3J0IGVudW0gRXZlbnRQaGFzZXtcbiAgICAgICAgQlJPQURDQVNULFxuICAgICAgICBFTUlUXG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2RlZmluaXRpb25zLmQudHNcIi8+XG4vL3RvZG8gY29tcGxldGUgaXQoYWRkIG1vcmUgZXZlbnQgdHlwZSlcbm1vZHVsZSBkeSB7XG4gICAgIGNvbnN0IF90YWJsZSA9IGR5Q2IuSGFzaC5jcmVhdGUoKTtcblxuICAgIC8vdG9kbyBub3QgZGVjbGFyZSBcIjxhbnk+XCIhXG4gICAgX3RhYmxlLmFkZENoaWxkKDxhbnk+RXZlbnROYW1lLkNMSUNLLCBFdmVudFR5cGUuTU9VU0UpO1xuICAgIF90YWJsZS5hZGRDaGlsZCg8YW55PkV2ZW50TmFtZS5NT1VTRU9WRVIsIEV2ZW50VHlwZS5NT1VTRSk7XG4gICAgX3RhYmxlLmFkZENoaWxkKDxhbnk+RXZlbnROYW1lLk1PVVNFT1VULCBFdmVudFR5cGUuTU9VU0UpO1xuICAgIF90YWJsZS5hZGRDaGlsZCg8YW55PkV2ZW50TmFtZS5NT1VTRU1PVkUsIEV2ZW50VHlwZS5NT1VTRSk7XG4gICAgX3RhYmxlLmFkZENoaWxkKDxhbnk+RXZlbnROYW1lLk1PVVNFRE9XTiwgRXZlbnRUeXBlLk1PVVNFKTtcbiAgICBfdGFibGUuYWRkQ2hpbGQoPGFueT5FdmVudE5hbWUuTU9VU0VVUCwgRXZlbnRUeXBlLk1PVVNFKTtcbiAgICBfdGFibGUuYWRkQ2hpbGQoPGFueT5FdmVudE5hbWUuS0VZRE9XTiwgRXZlbnRUeXBlLktFWUJPQVJEKTtcbiAgICBfdGFibGUuYWRkQ2hpbGQoPGFueT5FdmVudE5hbWUuS0VZUFJFU1MsIEV2ZW50VHlwZS5LRVlCT0FSRCk7XG4gICAgX3RhYmxlLmFkZENoaWxkKDxhbnk+RXZlbnROYW1lLktFWVVQLCBFdmVudFR5cGUuS0VZQk9BUkQpO1xuXG4gICAgZXhwb3J0IGNsYXNzIEV2ZW50VGFibGUge1xuICAgICAgICAvL2dldEV2ZW50VHlwZSBzaG91bGQgcHV0IGhlcmUsXG4gICAgICAgIC8vaXQgc2hvdWxkIG5vdCBwdXQgaW4gRXZlbnQgY2xhc3MsIGl0J3MgYmV0dGVyIHRvIGV4dHJhY3QgRXZlbnRUYWJsZSBjbGFzcyB0byBwdXQgaW5cbiAgICAgICAgcHVibGljIHN0YXRpYyBnZXRFdmVudFR5cGUoZXZlbnROYW1lOkV2ZW50TmFtZSk6RXZlbnRUeXBlIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBfdGFibGUuZ2V0Q2hpbGQoPGFueT5ldmVudE5hbWUpO1xuXG4gICAgICAgICAgICBpZihyZXN1bHQgPT09IHZvaWQgMCl7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gRXZlbnRUeXBlLkNVU1RPTTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vcHVibGljIHN0YXRpYyBpc0V2ZW50T25WaWV3KGV2ZW50TmFtZTpFdmVudE5hbWUpe1xuICAgICAgICAvLyAgICB2YXIgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgIHN3aXRjaCh0aGlzLmdldEV2ZW50VHlwZShldmVudE5hbWUpKXtcbiAgICAgICAgLy8gICAgICAgIGNhc2UgRXZlbnRUeXBlLk1PVVNFOlxuICAgICAgICAvLyAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICAgIC8vICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIC8vICAgICAgICBkZWZhdWx0OlxuICAgICAgICAvLyAgICAgICAgICAgIGR5Q2IuTG9nLmFzc2VydChmYWxzZSwgZHlDYi5Mb2cuaW5mby5GVU5DX1VOS05PVyhcImV2ZW50TmFtZVwiKSk7XG4gICAgICAgIC8vICAgICAgICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIC8vICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIC8vICAgIH1cbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgLy99XG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2RlZmluaXRpb25zLmQudHNcIi8+XG5cbi8vcmljaCBkb21haW4gbW9kZWxcblxuLy9ldmVudCBpbmZvOlxuLy9jb250cm9sIGluZm8oc3RvcCBidWJibGUuLi4pXG4vL3N5c3RlbSBkYXRhKHN5c3RlbSBldmVudCwgYXMgY2xpZW50WC4uLilcbi8vZXZlbnQgY29udGV4dCh0YXJnZXQsIGN1cnJlbnRUYXJnZXQuLi4pXG4vL3VzZXIgZGF0YShjdXN0b20gZXZlbnQpXG4vL2V2ZW50IHR5cGVcblxuXG5tb2R1bGUgZHl7XG4gICAgZXhwb3J0IGNsYXNzIEV2ZW50e1xuICAgICAgICBjb25zdHJ1Y3RvcihldmVudE5hbWU6RXZlbnROYW1lKSB7XG4gICAgICAgICAgICB0aGlzLl9uYW1lID0gZXZlbnROYW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9hYnN0YWN0IGF0dHJpXG4gICAgICAgIHB1YmxpYyB0eXBlOkV2ZW50VHlwZSA9IG51bGw7XG4gICAgICAgIC8vZ2V0IHR5cGUoKXtcbiAgICAgICAgLy8gICAgZHlDYi5Mb2cuZXJyb3IodGhpcy5fdHlwZSA9PT0gbnVsbCwgZHlDYi5Mb2cuaW5mby5BQlNUUkFDVF9BVFRSSUJVVEUpO1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICByZXR1cm4gdGhpcy5fdHlwZTtcbiAgICAgICAgLy99XG5cbiAgICAgICAgcHJpdmF0ZSBfbmFtZTpFdmVudE5hbWUgPSBudWxsO1xuICAgICAgICBnZXQgbmFtZSgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICAgICAgICB9XG4gICAgICAgIHNldCBuYW1lKG5hbWU6RXZlbnROYW1lKSB7XG4gICAgICAgICAgICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vdGFyZ2V0IGlzIHRoZSBhY3R1YWwgdGFyZ2V0IHRoYXQgcmVjZWl2ZWQgdGhlIGV2ZW50LlxuICAgICAgICBwcml2YXRlIF90YXJnZXQ6R2FtZU9iamVjdCA9IG51bGw7XG4gICAgICAgIGdldCB0YXJnZXQoKSB7XG4gICAgICAgICAgICAvL2R5Q2IuTG9nLmVycm9yKCF0aGlzLl90YXJnZXQsIGR5Q2IuTG9nLmluZm8uRlVOQ19NVVNUX0RFRklORShcInRhcmdldFwiKSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90YXJnZXQ7XG4gICAgICAgICAgICAvL3JldHVybiB0aGlzLl90YXJnZXQ7XG4gICAgICAgICAgICAvL3JldHVybiB0aGlzLl9ldmVudC5zcmNFbGVtZW50IHx8IHRoaXMuX2V2ZW50LnRhcmdldDtcbiAgICAgICAgfVxuICAgICAgICBzZXQgdGFyZ2V0KHRhcmdldDpHYW1lT2JqZWN0KSB7XG4gICAgICAgICAgICB0aGlzLl90YXJnZXQgPSB0YXJnZXQ7XG4gICAgICAgIH1cblxuICAgICAgICAvL2N1cnJlbnRUYXJnZXQgaXMgYWx3YXlzIHRoZSBvYmplY3QgbGlzdGVuaW5nIGZvciB0aGUgZXZlbnRcbiAgICAgICAgcHJpdmF0ZSBfY3VycmVudFRhcmdldDpHYW1lT2JqZWN0ID0gbnVsbDtcbiAgICAgICAgZ2V0IGN1cnJlbnRUYXJnZXQoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudFRhcmdldDtcbiAgICAgICAgfVxuICAgICAgICBzZXQgY3VycmVudFRhcmdldChjdXJyZW50VGFyZ2V0OkdhbWVPYmplY3QpIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRUYXJnZXQgPSBjdXJyZW50VGFyZ2V0O1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfaXNTdG9wUHJvcGFnYXRpb246Ym9vbGVhbiA9IGZhbHNlO1xuICAgICAgICBnZXQgaXNTdG9wUHJvcGFnYXRpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faXNTdG9wUHJvcGFnYXRpb247XG4gICAgICAgIH1cbiAgICAgICAgc2V0IGlzU3RvcFByb3BhZ2F0aW9uKGlzU3RvcFByb3BhZ2F0aW9uOmJvb2xlYW4pIHtcbiAgICAgICAgICAgIHRoaXMuX2lzU3RvcFByb3BhZ2F0aW9uID0gaXNTdG9wUHJvcGFnYXRpb247XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9waGFzZTpFdmVudFBoYXNlID0gbnVsbDtcbiAgICAgICAgZ2V0IHBoYXNlKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3BoYXNlO1xuICAgICAgICB9XG4gICAgICAgIHNldCBwaGFzZShwaGFzZTpFdmVudFBoYXNlKSB7XG4gICAgICAgICAgICB0aGlzLl9waGFzZSA9IHBoYXNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGNvcHkoKTpFdmVudHtcbiAgICAgICAgICAgIHJldHVybiBkeUNiLkxvZy5lcnJvcih0cnVlLCBkeUNiLkxvZy5pbmZvLkFCU1RSQUNUX01FVEhPRCk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc3RvcFByb3BhZ2F0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5faXNTdG9wUHJvcGFnYXRpb24gPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJvdGVjdGVkIGNvcHlNZW1iZXIoZGVzdGluYXRpb246RXZlbnQsIHNvdXJjZTpFdmVudCwgbWVtYmVyQXJyOlthbnldKXtcbiAgICAgICAgICAgIG1lbWJlckFyci5mb3JFYWNoKChtZW1iZXIpID0+IHtcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvblttZW1iZXJdID0gc291cmNlW21lbWJlcl07XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIGRlc3RpbmF0aW9uO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2RlZmluaXRpb25zLmQudHNcIi8+XG5tb2R1bGUgZHkge1xuICAgIGV4cG9ydCBjbGFzcyBNb3VzZUV2ZW50IGV4dGVuZHMgRXZlbnR7XG4gICAgICAgIC8vcHVibGljIHN0YXRpYyBDTElDSzpzdHJpbmcgPSBcImNsaWNrXCI7XG4gICAgICAgIC8vcHVibGljIHN0YXRpYyBNT1VTRU9WRVI6c3RyaW5nID0gXCJtb3VzZW92ZXJcIjtcbiAgICAgICAgLy9wdWJsaWMgc3RhdGljIE1PVVNFT1VUOnN0cmluZyA9IFwibW91c2VvdXRcIjtcbiAgICAgICAgLy9wdWJsaWMgc3RhdGljIE1PVVNFTU9WRTpzdHJpbmcgPSBcIm1vdXNlbW92ZVwiO1xuXG4gICAgICAgIC8vcHVibGljIHN0YXRpYyBjcmVhdGUoZXZlbnROYW1lOkV2ZW50TmFtZSkge1xuICAgICAgICAvLyAgICB2YXIgb2JqID0gbmV3IHRoaXMoZXZlbnROYW1lKTtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgcmV0dXJuIG9iajtcbiAgICAgICAgLy99XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKGV2ZW50OmFueSwgZXZlbnROYW1lOkV2ZW50TmFtZSkge1xuICAgICAgICAgICAgdmFyIG9iaiA9IG5ldyB0aGlzKGV2ZW50LCBldmVudE5hbWUpO1xuXG4gICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3RydWN0b3IoZXZlbnQ6YW55LCBldmVudE5hbWU6RXZlbnROYW1lKSB7XG4gICAgICAgICAgICBzdXBlcihldmVudE5hbWUpO1xuXG4gICAgICAgICAgICB0aGlzLl9ldmVudCA9IGV2ZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHR5cGU6RXZlbnRUeXBlID0gRXZlbnRUeXBlLk1PVVNFO1xuXG5cbiAgICAgICAgcHJpdmF0ZSBfZXZlbnQ6YW55ID0gbnVsbDtcbiAgICAgICAgZ2V0IGV2ZW50KCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2V2ZW50O1xuICAgICAgICB9XG4gICAgICAgIHNldCBldmVudChldmVudDphbnkpIHtcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50ID0gZXZlbnQgfHwgd2luZG93LmV2ZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfbG9jYXRpb246UG9pbnQgPSBudWxsO1xuICAgICAgICAvL0dldCBjdXJzb3IgbG9jYXRpb24ocmVsYXRlZCB0byBkb2N1bWVudClcbiAgICAgICAgZ2V0IGxvY2F0aW9uKCk6UG9pbnQge1xuICAgICAgICAgICAgdmFyIHBvaW50OlBvaW50ID0gbnVsbCxcbiAgICAgICAgICAgICAgICBlID0gdGhpcy5ldmVudDtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX2xvY2F0aW9uKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xvY2F0aW9uO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwb2ludCA9IFBvaW50LmNyZWF0ZSgpO1xuXG4gICAgICAgICAgICBpZiAoYm93c2VyLm1zaWUpIHtcbiAgICAgICAgICAgICAgICBwb2ludC54ID0gZS5jbGllbnRYICsgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0O1xuICAgICAgICAgICAgICAgIHBvaW50LnkgPSBlLmNsaWVudFkgKyBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcG9pbnQueCA9IGUucGFnZVg7XG4gICAgICAgICAgICAgICAgcG9pbnQueSA9IGUucGFnZVk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBwb2ludDtcbiAgICAgICAgfVxuICAgICAgICBzZXQgbG9jYXRpb24ocG9pbnQ6UG9pbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX2xvY2F0aW9uID0gcG9pbnQ7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9sb2NhdGlvbkluVmlldzpQb2ludCA9IG51bGw7XG4gICAgICAgIC8vUmV0dXJucyB0aGUgY3VycmVudCBjdXJzb3IgbG9jYXRpb24gaW4gc2NyZWVuIGNvb3JkaW5hdGVzKHJlbGF0ZWQgdG8gY2FudmFzKVxuICAgICAgICBnZXQgbG9jYXRpb25JblZpZXcoKTpQb2ludCB7XG4gICAgICAgICAgICAvL3JldHVybiB0aGlzLl9sb2NhdGlvbkluVmlldztcbiAgICAgICAgICAgIHZhciBwb2ludDpQb2ludCA9IG51bGwsXG4gICAgICAgICAgICAgICAgdmlld09mZnNldDphbnkgPSBudWxsO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fbG9jYXRpb25JblZpZXcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbG9jYXRpb25JblZpZXc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHBvaW50ID0gdGhpcy5sb2NhdGlvbjtcblxuXG4gICAgICAgICAgICAvL2NhbnZhc09mZnNldCA9IHRoaXMuX2dldENhbnZhc09mZnNldCh0aGlzLmV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuICAgICAgICAgICAgdmlld09mZnNldCA9IERpcmVjdG9yLmdldEluc3RhbmNlKCkuZ2V0VmlldygpLm9mZnNldDtcblxuICAgICAgICAgICAgcmV0dXJuIFBvaW50LmNyZWF0ZShwb2ludC54IC0gdmlld09mZnNldC54LCBwb2ludC55IC0gdmlld09mZnNldC55KTtcbiAgICAgICAgfVxuICAgICAgICBzZXQgbG9jYXRpb25JblZpZXcobG9jYXRpb25JblZpZXc6UG9pbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX2xvY2F0aW9uSW5WaWV3ID0gbG9jYXRpb25JblZpZXc7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9idXR0b246bnVtYmVyID0gbnVsbDtcbiAgICAgICAgZ2V0IGJ1dHRvbigpIHtcbiAgICAgICAgICAgIHZhciBlID0gdGhpcy5ldmVudCxcbiAgICAgICAgICAgICAgICBtb3VzZUJ1dHRvbjpudW1iZXIgPSBudWxsO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fYnV0dG9uKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2J1dHRvbjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGJvd3Nlci5tc2llKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChlLmJ1dHRvbikge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBtb3VzZUJ1dHRvbiA9IE1vdXNlQnV0dG9uLkxFRlQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICAgICAgbW91c2VCdXR0b24gPSBNb3VzZUJ1dHRvbi5SSUdIVDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICBtb3VzZUJ1dHRvbiA9IE1vdXNlQnV0dG9uLkNFTlRFUjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgZHlDYi5Mb2cuZXJyb3IodHJ1ZSwgZHlDYi5Mb2cuaW5mby5GVU5DX05PVF9TVVBQT1JUKFwibXVsdGkgbW91c2UgYnV0dG9uXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbW91c2VCdXR0b24gPSBlLmJ1dHRvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoZS5idXR0b24pIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgbW91c2VCdXR0b24gPSBNb3VzZUJ1dHRvbi5MRUZUO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdXNlQnV0dG9uID0gTW91c2VCdXR0b24uUklHSFQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgbW91c2VCdXR0b24gPSBNb3VzZUJ1dHRvbi5DRU5URVI7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGR5Q2IuTG9nLmVycm9yKHRydWUsIGR5Q2IuTG9nLmluZm8uRlVOQ19OT1RfU1VQUE9SVChcIm11bHRpIG1vdXNlIGJ1dHRvblwiKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL21vdXNlQnV0dG9uID0gZS5idXR0b247XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBtb3VzZUJ1dHRvbjtcbiAgICAgICAgfVxuICAgICAgICBzZXQgYnV0dG9uKGJ1dHRvbjpudW1iZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX2J1dHRvbiA9IGJ1dHRvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBjb3B5KCl7XG4gICAgICAgICAgICB2YXIgZXZlbnRPYmogPSBNb3VzZUV2ZW50LmNyZWF0ZSh0aGlzLl9ldmVudCwgdGhpcy5uYW1lKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29weU1lbWJlcihldmVudE9iaiwgdGhpcywgW1widGFyZ2V0XCIsIFwiY3VycmVudFRhcmdldFwiLCBcImlzU3RvcFByb3BhZ2F0aW9uXCIsIFwicGhhc2VcIl0pO1xuICAgICAgICB9XG5cblxuICAgICAgICAvL3ByaXZhdGUgX2dldENhbnZhc09mZnNldCh2aWV3OklWaWV3KSB7XG4gICAgICAgIC8vICAgIHJldHVybiB2aWV3LmdldE9mZnNldCgpO1xuICAgICAgICAvLyAgICB2YXIgb2Zmc2V0ID0ge3g6IGNhbnZhcy5vZmZzZXRMZWZ0LCB5OiBjYW52YXMub2Zmc2V0VG9wfTtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgd2hpbGUgKGNhbnZhcyA9IGNhbnZhcy5vZmZzZXRQYXJlbnQpIHtcbiAgICAgICAgLy8gICAgICAgIG9mZnNldC54ICs9IGNhbnZhcy5vZmZzZXRMZWZ0O1xuICAgICAgICAvLyAgICAgICAgb2Zmc2V0LnkgKz0gY2FudmFzLm9mZnNldFRvcDtcbiAgICAgICAgLy8gICAgfVxuICAgICAgICAvL1xuICAgICAgICAvLyAgICByZXR1cm4gb2Zmc2V0O1xuICAgICAgICAvL31cbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vZGVmaW5pdGlvbnMuZC50c1wiLz5cbm1vZHVsZSBkeSB7XG4gICAgY29uc3QgU1BFQ0lBTF9LRVlfTUFQID0ge1xuICAgICAgICAgICAgODogXCJiYWNrc3BhY2VcIixcbiAgICAgICAgICAgIDk6IFwidGFiXCIsXG4gICAgICAgICAgICAxMDogXCJyZXR1cm5cIixcbiAgICAgICAgICAgIDEzOiBcInJldHVyblwiLFxuICAgICAgICAgICAgMTY6IFwic2hpZnRcIixcbiAgICAgICAgICAgIDE3OiBcImN0cmxcIixcbiAgICAgICAgICAgIDE4OiBcImFsdFwiLFxuICAgICAgICAgICAgMTk6IFwicGF1c2VcIixcbiAgICAgICAgICAgIDIwOiBcImNhcHNsb2NrXCIsXG4gICAgICAgICAgICAyNzogXCJlc2NcIixcbiAgICAgICAgICAgIDMyOiBcInNwYWNlXCIsXG4gICAgICAgICAgICAzMzogXCJwYWdldXBcIixcbiAgICAgICAgICAgIDM0OiBcInBhZ2Vkb3duXCIsXG4gICAgICAgICAgICAzNTogXCJlbmRcIixcbiAgICAgICAgICAgIDM2OiBcImhvbWVcIixcbiAgICAgICAgICAgIDM3OiBcImxlZnRcIixcbiAgICAgICAgICAgIDM4OiBcInVwXCIsXG4gICAgICAgICAgICAzOTogXCJyaWdodFwiLFxuICAgICAgICAgICAgNDA6IFwiZG93blwiLFxuICAgICAgICAgICAgNDU6IFwiaW5zZXJ0XCIsXG4gICAgICAgICAgICA0NjogXCJkZWxcIixcbiAgICAgICAgICAgIDU5OiBcIjtcIixcbiAgICAgICAgICAgIDYxOiBcIj1cIixcbiAgICAgICAgICAgIDY1OiBcImFcIixcbiAgICAgICAgICAgIDY2OiBcImJcIixcbiAgICAgICAgICAgIDY3OiBcImNcIixcbiAgICAgICAgICAgIDY4OiBcImRcIixcbiAgICAgICAgICAgIDY5OiBcImVcIixcbiAgICAgICAgICAgIDcwOiBcImZcIixcbiAgICAgICAgICAgIDcxOiBcImdcIixcbiAgICAgICAgICAgIDcyOiBcImhcIixcbiAgICAgICAgICAgIDczOiBcImlcIixcbiAgICAgICAgICAgIDc0OiBcImpcIixcbiAgICAgICAgICAgIDc1OiBcImtcIixcbiAgICAgICAgICAgIDc2OiBcImxcIixcbiAgICAgICAgICAgIDc3OiBcIm1cIixcbiAgICAgICAgICAgIDc4OiBcIm5cIixcbiAgICAgICAgICAgIDc5OiBcIm9cIixcbiAgICAgICAgICAgIDgwOiBcInBcIixcbiAgICAgICAgICAgIDgxOiBcInFcIixcbiAgICAgICAgICAgIDgyOiBcInJcIixcbiAgICAgICAgICAgIDgzOiBcInNcIixcbiAgICAgICAgICAgIDg0OiBcInRcIixcbiAgICAgICAgICAgIDg1OiBcInVcIixcbiAgICAgICAgICAgIDg2OiBcInZcIixcbiAgICAgICAgICAgIDg3OiBcIndcIixcbiAgICAgICAgICAgIDg4OiBcInhcIixcbiAgICAgICAgICAgIDg5OiBcInlcIixcbiAgICAgICAgICAgIDkwOiBcInpcIixcbiAgICAgICAgICAgIDk2OiBcIjBcIixcbiAgICAgICAgICAgIDk3OiBcIjFcIixcbiAgICAgICAgICAgIDk4OiBcIjJcIixcbiAgICAgICAgICAgIDk5OiBcIjNcIixcbiAgICAgICAgICAgIDEwMDogXCI0XCIsXG4gICAgICAgICAgICAxMDE6IFwiNVwiLFxuICAgICAgICAgICAgMTAyOiBcIjZcIixcbiAgICAgICAgICAgIDEwMzogXCI3XCIsXG4gICAgICAgICAgICAxMDQ6IFwiOFwiLFxuICAgICAgICAgICAgMTA1OiBcIjlcIixcbiAgICAgICAgICAgIDEwNjogXCIqXCIsXG4gICAgICAgICAgICAxMDc6IFwiK1wiLFxuICAgICAgICAgICAgMTA5OiBcIi1cIixcbiAgICAgICAgICAgIDExMDogXCIuXCIsXG4gICAgICAgICAgICAxMTE6IFwiL1wiLFxuICAgICAgICAgICAgMTEyOiBcImYxXCIsXG4gICAgICAgICAgICAxMTM6IFwiZjJcIixcbiAgICAgICAgICAgIDExNDogXCJmM1wiLFxuICAgICAgICAgICAgMTE1OiBcImY0XCIsXG4gICAgICAgICAgICAxMTY6IFwiZjVcIixcbiAgICAgICAgICAgIDExNzogXCJmNlwiLFxuICAgICAgICAgICAgMTE4OiBcImY3XCIsXG4gICAgICAgICAgICAxMTk6IFwiZjhcIixcbiAgICAgICAgICAgIDEyMDogXCJmOVwiLFxuICAgICAgICAgICAgMTIxOiBcImYxMFwiLFxuICAgICAgICAgICAgMTIyOiBcImYxMVwiLFxuICAgICAgICAgICAgMTIzOiBcImYxMlwiLFxuICAgICAgICAgICAgMTQ0OiBcIm51bWxvY2tcIixcbiAgICAgICAgICAgIDE0NTogXCJzY3JvbGxcIixcbiAgICAgICAgICAgIDE3MzogXCItXCIsXG4gICAgICAgICAgICAxODY6IFwiO1wiLFxuICAgICAgICAgICAgMTg3OiBcIj1cIixcbiAgICAgICAgICAgIDE4ODogXCIsXCIsXG4gICAgICAgICAgICAxODk6IFwiLVwiLFxuICAgICAgICAgICAgMTkwOiBcIi5cIixcbiAgICAgICAgICAgIDE5MTogXCIvXCIsXG4gICAgICAgICAgICAxOTI6IFwiYFwiLFxuICAgICAgICAgICAgMjE5OiBcIltcIixcbiAgICAgICAgICAgIDIyMDogXCJcXFxcXCIsXG4gICAgICAgICAgICAyMjE6IFwiXVwiLFxuICAgICAgICAgICAgMjIyOiBcIidcIlxuICAgICAgICB9LFxuICAgICAgICBTSElGVF9LRVlfTUFQID0ge1xuICAgICAgICAgICAgXCJgXCI6IFwiflwiLFxuICAgICAgICAgICAgXCIxXCI6IFwiIVwiLFxuICAgICAgICAgICAgXCIyXCI6IFwiQFwiLFxuICAgICAgICAgICAgXCIzXCI6IFwiI1wiLFxuICAgICAgICAgICAgXCI0XCI6IFwiJFwiLFxuICAgICAgICAgICAgXCI1XCI6IFwiJVwiLFxuICAgICAgICAgICAgXCI2XCI6IFwiXlwiLFxuICAgICAgICAgICAgXCI3XCI6IFwiJlwiLFxuICAgICAgICAgICAgXCI4XCI6IFwiKlwiLFxuICAgICAgICAgICAgXCI5XCI6IFwiKFwiLFxuICAgICAgICAgICAgXCIwXCI6IFwiKVwiLFxuICAgICAgICAgICAgXCItXCI6IFwiX1wiLFxuICAgICAgICAgICAgXCI9XCI6IFwiK1wiLFxuICAgICAgICAgICAgXCI7XCI6IFwiOiBcIixcbiAgICAgICAgICAgIFwiJ1wiOiBcIlxcXCJcIixcbiAgICAgICAgICAgIFwiLFwiOiBcIjxcIixcbiAgICAgICAgICAgIFwiLlwiOiBcIj5cIixcbiAgICAgICAgICAgIFwiL1wiOiBcIj9cIixcbiAgICAgICAgICAgIFwiXFxcXFwiOiBcInxcIlxuICAgICAgICB9O1xuXG4gICAgZXhwb3J0IGNsYXNzIEtleWJvYXJkRXZlbnQgZXh0ZW5kcyBFdmVudHtcbiAgICAgICAgcHVibGljIHN0YXRpYyBjcmVhdGUoZXZlbnQ6YW55LCBldmVudE5hbWU6RXZlbnROYW1lKSB7XG4gICAgICAgICAgICB2YXIgb2JqID0gbmV3IHRoaXMoZXZlbnQsIGV2ZW50TmFtZSk7XG5cbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdHJ1Y3RvcihldmVudDphbnksIGV2ZW50TmFtZTpFdmVudE5hbWUpIHtcbiAgICAgICAgICAgIHN1cGVyKGV2ZW50TmFtZSk7XG5cbiAgICAgICAgICAgIHRoaXMuX2V2ZW50ID0gZXZlbnQ7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgdHlwZTpFdmVudFR5cGUgPSBFdmVudFR5cGUuS0VZQk9BUkQ7XG5cbiAgICAgICAgcHJpdmF0ZSBfZXZlbnQ6YW55ID0gbnVsbDtcbiAgICAgICAgZ2V0IGV2ZW50KCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2V2ZW50O1xuICAgICAgICB9XG4gICAgICAgIHNldCBldmVudChldmVudDphbnkpIHtcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50ID0gZXZlbnQgfHwgd2luZG93LmV2ZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IGN0cmxLZXkoKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9ldmVudC5jdHJsS2V5O1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IGFsdEtleSgpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2V2ZW50LmFsdEtleTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldCBzaGlmdEtleSgpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2V2ZW50LnNoaWZ0S2V5O1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IG1ldGFLZXkoKXtcbiAgICAgICAgICAgIC8vcmV0dXJuIHRoaXMuX2V2ZW50Lm1ldGFLZXkgJiYgIXRoaXMuY3RybEtleTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9ldmVudC5tZXRhS2V5O1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IGtleUNvZGUoKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9ldmVudC5rZXlDb2RlO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IGtleSgpe1xuICAgICAgICAgICAgdmFyIGtleSA9IFNQRUNJQUxfS0VZX01BUFt0aGlzLmtleUNvZGVdLFxuICAgICAgICAgICAgICAgIGNoYXIgPSBudWxsO1xuXG4gICAgICAgICAgICBpZigha2V5KXtcbiAgICAgICAgICAgICAgICBjaGFyID0gU3RyaW5nLmZyb21DaGFyQ29kZSh0aGlzLmtleUNvZGUpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgICAgICAgICBpZih0aGlzLnNoaWZ0S2V5KXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFNISUZUX0tFWV9NQVBbY2hhcl07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNoYXI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBrZXk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgY29weSgpe1xuICAgICAgICAgICAgdmFyIGV2ZW50T2JqID0gS2V5Ym9hcmRFdmVudC5jcmVhdGUodGhpcy5fZXZlbnQsIHRoaXMubmFtZSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvcHlNZW1iZXIoZXZlbnRPYmosIHRoaXMsIFtcImFsdEtleVwiLCBcInNoaWZ0S2V5XCIsIFwiY3RybEtleVwiLCBcIm1ldGFLZXlcIiwgXCJrZXlDb2RlXCIsIFwia2V5XCJdKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9kZWZpbml0aW9ucy5kLnRzXCIvPlxubW9kdWxlIGR5IHtcbiAgICBleHBvcnQgY2xhc3MgQ3VzdG9tRXZlbnQgZXh0ZW5kcyBFdmVudHtcbiAgICAgICAgcHVibGljIHN0YXRpYyBjcmVhdGUoZXZlbnROYW1lOnN0cmluZykge1xuICAgICAgICAgICAgdmFyIG9iaiA9IG5ldyB0aGlzKDxhbnk+ZXZlbnROYW1lKTtcblxuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyB0eXBlOkV2ZW50VHlwZSA9IEV2ZW50VHlwZS5DVVNUT007XG4gICAgICAgIFxuICAgICAgICBwcml2YXRlIF91c2VyRGF0YTphbnkgPSBudWxsO1xuICAgICAgICBnZXQgdXNlckRhdGEoKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl91c2VyRGF0YTtcbiAgICAgICAgfVxuICAgICAgICBzZXQgdXNlckRhdGEodXNlckRhdGE6YW55KXtcbiAgICAgICAgICAgIHRoaXMuX3VzZXJEYXRhID0gdXNlckRhdGE7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgY29weVB1YmxpY0F0dHJpKGRlc3RpbmF0aW9uLCBzb3VyY2U6YW55KXtcbiAgICAgICAgICAgIHZhciBwcm9wZXJ0eSA9IG51bGw7XG4gICAgICAgICAgICAgICAgLy9kZXN0aW5hdGlvbiA9IHt9O1xuXG4gICAgICAgICAgICBkeUNiLkV4dGVuZFV0aWxzLmV4dGVuZChkZXN0aW5hdGlvbiwgZnVuY3Rpb24oaXRlbSwgcHJvcGVydHkpe1xuICAgICAgICAgICAgICAgIHJldHVybiBwcm9wZXJ0eS5zbGljZSgwLCAxKSAhPT0gXCJfXCJcbiAgICAgICAgICAgICAgICAgICAgJiYgIUp1ZGdlVXRpbHMuaXNGdW5jdGlvbihpdGVtKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gZGVzdGluYXRpb247XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgY29weSgpe1xuICAgICAgICAgICAgdmFyIGV2ZW50T2JqID0gQ3VzdG9tRXZlbnQuY3JlYXRlKDxhbnk+dGhpcy5uYW1lKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29weU1lbWJlcihldmVudE9iaiwgdGhpcywgW1widGFyZ2V0XCIsIFwiY3VycmVudFRhcmdldFwiLCBcImlzU3RvcFByb3BhZ2F0aW9uXCIsIFwicGhhc2VcIl0pO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwibW9kdWxlIGR5IHtcbiAgICBleHBvcnQgZW51bSBNb3VzZUJ1dHRvbntcbiAgICAgICAgTEVGVCxcbiAgICAgICAgUklHSFQsXG4gICAgICAgIENFTlRFUlxuICAgIH1cbn1cblxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2RlZmluaXRpb25zLmQudHNcIi8+XG5tb2R1bGUgZHkge1xuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUV2ZW50SGFuZGxlckRhdGF7XG4gICAgICAgIGV2ZW50TmFtZTpFdmVudE5hbWU7XG4gICAgICAgIGhhbmRsZXI6RnVuY3Rpb247XG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIEV2ZW50TGlzdGVuZXIge1xuICAgICAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZShvcHRpb24pIHtcbiAgICAgICAgICAgIHZhciBvYmogPSBuZXcgdGhpcyhvcHRpb24pO1xuXG4gICAgICAgICAgICBvYmouaW5pdFdoZW5DcmVhdGUob3B0aW9uKTtcblxuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2V2ZW50VHlwZTpFdmVudFR5cGUgPSBudWxsO1xuICAgICAgICBnZXQgZXZlbnRUeXBlKCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZXZlbnRUeXBlO1xuICAgICAgICB9XG4gICAgICAgIHNldCBldmVudFR5cGUoZXZlbnRUeXBlOkV2ZW50VHlwZSl7XG4gICAgICAgICAgICB0aGlzLl9ldmVudFR5cGUgPSBldmVudFR5cGU7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9wcmlvcml0eTpudW1iZXIgPSBudWxsO1xuICAgICAgICBnZXQgcHJpb3JpdHkoKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9wcmlvcml0eTtcbiAgICAgICAgfVxuICAgICAgICBzZXQgcHJpb3JpdHkocHJpb3JpdHk6bnVtYmVyKXtcbiAgICAgICAgICAgIHRoaXMuX3ByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9oYW5kbGVyRGF0YUxpc3Q6ZHlDYi5Db2xsZWN0aW9uID0gZHlDYi5Db2xsZWN0aW9uLmNyZWF0ZSgpO1xuICAgICAgICBnZXQgaGFuZGxlckRhdGFMaXN0KCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faGFuZGxlckRhdGFMaXN0O1xuICAgICAgICB9XG4gICAgICAgIHNldCBoYW5kbGVyRGF0YUxpc3QoaGFuZGxlckRhdGFMaXN0OmR5Q2IuQ29sbGVjdGlvbil7XG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVyRGF0YUxpc3QgPSBoYW5kbGVyRGF0YUxpc3Q7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdHJ1Y3RvcihvcHRpb246YW55KXtcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50VHlwZSA9IG9wdGlvbi5ldmVudFR5cGU7XG4gICAgICAgICAgICB0aGlzLl9wcmlvcml0eSA9IG9wdGlvbi5wcmlvcml0eSB8fCAxO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGluaXRXaGVuQ3JlYXRlKG9wdGlvbjp7YW55fSl7XG4gICAgICAgICAgICB0aGlzLl9zZXRIYW5kbGVyRGF0YUxpc3Qob3B0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX3NldEhhbmRsZXJEYXRhTGlzdChvcHRpb246e2FueX0pe1xuICAgICAgICAgICAgdmFyIGkgPSBudWxsLFxuICAgICAgICAgICAgICAgIFJFR0VYX0hBTkRFUiA9IC9vblxcdysvO1xuXG4gICAgICAgICAgICBmb3IoaSBpbiBvcHRpb24pe1xuICAgICAgICAgICAgICAgIGlmKG9wdGlvbi5oYXNPd25Qcm9wZXJ0eShpKSl7XG4gICAgICAgICAgICAgICAgICAgIGlmKFJFR0VYX0hBTkRFUi50ZXN0KGkpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZXJEYXRhTGlzdC5hZGRDaGlsZCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnROYW1lOiB0aGlzLl9wYXJzZUV2ZW50TmFtZShpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVyOiBvcHRpb25baV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfcGFyc2VFdmVudE5hbWUoaGFuZGxlck5hbWUpe1xuICAgICAgICAgICAgcmV0dXJuIGhhbmRsZXJOYW1lLnNsaWNlKDIpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vZGVmaW5pdGlvbnMuZC50c1wiLz5cbm1vZHVsZSBkeSB7XG4gICAgZXhwb3J0IGNsYXNzIEV2ZW50SGFuZGxlciB7XG4gICAgICAgIHB1YmxpYyBvbiguLi5hcmdzKSB7XG4gICAgICAgICAgICBkeUNiLkxvZy5lcnJvcih0cnVlLCBkeUNiLkxvZy5pbmZvLkFCU1RSQUNUX01FVEhPRCk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgb2ZmKC4uLmFyZ3MpIHtcbiAgICAgICAgICAgIGR5Q2IuTG9nLmVycm9yKHRydWUsIGR5Q2IuTG9nLmluZm8uQUJTVFJBQ1RfTUVUSE9EKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyB0cmlnZ2VyKC4uLmFyZ3MpOmJvb2xlYW4ge1xuICAgICAgICAgICAgcmV0dXJuIGR5Q2IuTG9nLmVycm9yKHRydWUsIGR5Q2IuTG9nLmluZm8uQUJTVFJBQ1RfTUVUSE9EKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9kZWZpbml0aW9ucy5kLnRzXCIvPlxubW9kdWxlIGR5IHtcbiAgICBleHBvcnQgY2xhc3MgRG9tRXZlbnRIYW5kbGVyIGV4dGVuZHMgRXZlbnRIYW5kbGVye1xuICAgICAgICBwdWJsaWMgb2ZmKC4uLmFyZ3MpIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgICAgICAgICBkb20gPSB0aGlzLmdldERvbSgpLFxuICAgICAgICAgICAgICAgIGV2ZW50UmVnaXN0ZXIgPSBFdmVudFJlZ2lzdGVyLmdldEluc3RhbmNlKCksXG4gICAgICAgICAgICAgICAgZXZlbnRPZmZEYXRhTGlzdDpkeUNiLkNvbGxlY3Rpb24gPSBudWxsO1xuXG4gICAgICAgICAgICBldmVudE9mZkRhdGFMaXN0ID0gZXZlbnRSZWdpc3Rlci5yZW1vdmUuYXBwbHkoZXZlbnRSZWdpc3RlciwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSk7XG5cbiAgICAgICAgICAgIGlmKGV2ZW50T2ZmRGF0YUxpc3Qpe1xuICAgICAgICAgICAgICAgIGV2ZW50T2ZmRGF0YUxpc3QuZm9yRWFjaCgoZXZlbnRPZmZEYXRhOklFdmVudE9mZkRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5fdW5CaW5kKGRvbSwgZXZlbnRPZmZEYXRhLmV2ZW50TmFtZSwgZXZlbnRPZmZEYXRhLndyYXBIYW5kbGVyKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcHJvdGVjdGVkIGdldERvbSgpe1xuICAgICAgICAgICAgcmV0dXJuIGR5Q2IuTG9nLmVycm9yKHRydWUsIGR5Q2IuTG9nLmluZm8uQUJTVFJBQ1RfTUVUSE9EKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByb3RlY3RlZCBidWlsZFdyYXBIYW5kbGVyKHRhcmdldDpHYW1lT2JqZWN0LCBldmVudE5hbWU6RXZlbnROYW1lKXtcbiAgICAgICAgICAgIHJldHVybiBkeUNiLkxvZy5lcnJvcih0cnVlLCBkeUNiLkxvZy5pbmZvLkFCU1RSQUNUX01FVEhPRCk7XG4gICAgICAgIH1cblxuICAgICAgICBwcm90ZWN0ZWQgaGFuZGxlcih0YXJnZXQsIGV2ZW50TmFtZSwgaGFuZGxlciwgcHJpb3JpdHkpe1xuICAgICAgICAgICAgdmFyIHdyYXBIYW5kbGVyID0gbnVsbDtcblxuICAgICAgICAgICAgaWYgKCFFdmVudFJlZ2lzdGVyLmdldEluc3RhbmNlKCkuaXNCaW5kZWQodGFyZ2V0LCBldmVudE5hbWUpKSB7XG4gICAgICAgICAgICAgICAgd3JhcEhhbmRsZXIgPSB0aGlzLl9iaW5kKHRoaXMuZ2V0RG9tKCksIGV2ZW50TmFtZSwgdGFyZ2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgd3JhcEhhbmRsZXIgPSBFdmVudFJlZ2lzdGVyLmdldEluc3RhbmNlKCkuZ2V0V3JhcEhhbmRsZXIodGFyZ2V0LCBldmVudE5hbWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBFdmVudFJlZ2lzdGVyLmdldEluc3RhbmNlKCkucmVnaXN0ZXIoXG4gICAgICAgICAgICAgICAgdGFyZ2V0LFxuICAgICAgICAgICAgICAgIGV2ZW50TmFtZSxcbiAgICAgICAgICAgICAgICBoYW5kbGVyLFxuICAgICAgICAgICAgICAgIHdyYXBIYW5kbGVyLFxuICAgICAgICAgICAgICAgIHByaW9yaXR5XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfYmluZChkb206YW55LCBldmVudE5hbWU6RXZlbnROYW1lLCB0YXJnZXQ6R2FtZU9iamVjdCl7XG4gICAgICAgICAgICB2YXIgd3JhcEhhbmRsZXIgPSBudWxsO1xuXG4gICAgICAgICAgICB3cmFwSGFuZGxlciA9IHRoaXMuYnVpbGRXcmFwSGFuZGxlcih0YXJnZXQsIGV2ZW50TmFtZSk7XG5cbiAgICAgICAgICAgIGR5Q2IuRXZlbnRVdGlscy5hZGRFdmVudChcbiAgICAgICAgICAgICAgICBkb20sXG4gICAgICAgICAgICAgICAgZXZlbnROYW1lLFxuICAgICAgICAgICAgICAgIHdyYXBIYW5kbGVyXG4gICAgICAgICAgICApXG5cbiAgICAgICAgICAgIHJldHVybiB3cmFwSGFuZGxlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX3VuQmluZChkb20sIGV2ZW50TmFtZSwgaGFuZGxlcil7XG4gICAgICAgICAgICBkeUNiLkV2ZW50VXRpbHMucmVtb3ZlRXZlbnQoZG9tLCBldmVudE5hbWUsIGhhbmRsZXIpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vZGVmaW5pdGlvbnMuZC50c1wiLz5cblxuLy9yZXNwb25zaWJsaXR5OmhhbmRsZSBsb2dpYyB3aXRoIHNwZWNpZnkgZXZlbnQgY2F0ZWdvcnlcbi8vanVkZ2UgaXMgdW5kZXIgcG9pbnRcbi8vd3JhcCBldmVudCBvYmplY3Rcbm1vZHVsZSBkeSB7XG4gICAgZXhwb3J0IGNsYXNzIE1vdXNlRXZlbnRIYW5kbGVyIGV4dGVuZHMgRG9tRXZlbnRIYW5kbGVye1xuICAgICAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6TW91c2VFdmVudEhhbmRsZXIgPSBudWxsO1xuXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5faW5zdGFuY2UgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9pbnN0YW5jZSA9IG5ldyB0aGlzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgb24odGFyZ2V0OkdhbWVPYmplY3QsIGV2ZW50TmFtZTpFdmVudE5hbWUsIGhhbmRsZXI6RnVuY3Rpb24sIHByaW9yaXR5Om51bWJlcikge1xuICAgICAgICAgICAgZHlDYi5Mb2cuZXJyb3IoISh0YXJnZXQgaW5zdGFuY2VvZiBHYW1lT2JqZWN0KSwgZHlDYi5Mb2cuaW5mby5GVU5DX01VU1RfQkUoXCJ0YXJnZXRcIiwgXCJHYW1lT2JqZWN0XCIpKTtcblxuICAgICAgICAgICAgdGhpcy5oYW5kbGVyKHRhcmdldCwgZXZlbnROYW1lLCBoYW5kbGVyLCBwcmlvcml0eSk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgdHJpZ2dlcih0YXJnZXQ6R2FtZU9iamVjdCwgZXZlbnQ6RXZlbnQsIG5vdFNldFRhcmdldDpib29sZWFuKTpib29sZWFue1xuICAgICAgICAgICAgdmFyIGV2ZW50TmFtZSA9IGV2ZW50Lm5hbWUsXG4gICAgICAgICAgICAgICAgZXZlbnRUeXBlID0gZXZlbnQudHlwZSxcbiAgICAgICAgICAgICAgICByZWdpc3RlckRhdGFMaXN0OmR5Q2IuQ29sbGVjdGlvbiA9IG51bGwsXG4gICAgICAgICAgICAgICAgaXNTdG9wUHJvcGFnYXRpb24gPSBmYWxzZSxcbiAgICAgICAgICAgICAgICBzZWxmID0gdGhpcztcblxuICAgICAgICAgICAgaWYgKCEodGFyZ2V0IGluc3RhbmNlb2YgR2FtZU9iamVjdCkpIHtcbiAgICAgICAgICAgICAgICBkeUNiLkxvZy5sb2coXCJ0YXJnZXQgaXMgbm90IEdhbWVPYmplY3QsIGNhbid0IHRyaWdnZXIgZXZlbnRcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZighbm90U2V0VGFyZ2V0KXtcbiAgICAgICAgICAgICAgICBldmVudC50YXJnZXQgPSB0YXJnZXQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlZ2lzdGVyRGF0YUxpc3QgPSBFdmVudFJlZ2lzdGVyLmdldEluc3RhbmNlKCkuZ2V0RXZlbnRSZWdpc3RlckRhdGFMaXN0KHRhcmdldCwgZXZlbnROYW1lKTtcblxuICAgICAgICAgICAgaWYgKHJlZ2lzdGVyRGF0YUxpc3QgPT09IG51bGwgfHwgcmVnaXN0ZXJEYXRhTGlzdC5nZXRDb3VudCgpPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlZ2lzdGVyRGF0YUxpc3QuZm9yRWFjaCgocmVnaXN0ZXJEYXRhOklFdmVudFJlZ2lzdGVyRGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBldmVudENvcHkgPSBldmVudC5jb3B5KCk7XG5cbiAgICAgICAgICAgICAgICByZWdpc3RlckRhdGEuaGFuZGxlcihldmVudENvcHkpO1xuICAgICAgICAgICAgICAgIGlmKGV2ZW50Q29weS5pc1N0b3BQcm9wYWdhdGlvbil7XG4gICAgICAgICAgICAgICAgICAgIGlzU3RvcFByb3BhZ2F0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIGlzU3RvcFByb3BhZ2F0aW9uO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJvdGVjdGVkIGdldERvbSgpIHtcbiAgICAgICAgICAgIHJldHVybiBEaXJlY3Rvci5nZXRJbnN0YW5jZSgpLmdldFZpZXcoKS5kb207XG4gICAgICAgIH1cblxuICAgICAgICBwcm90ZWN0ZWQgYnVpbGRXcmFwSGFuZGxlcih0YXJnZXQ6R2FtZU9iamVjdCwgZXZlbnROYW1lOkV2ZW50TmFtZSl7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgICAgICAgICAgY29udGV4dCA9IHdpbmRvdztcblxuICAgICAgICAgICAgcmV0dXJuIGR5Q2IuRXZlbnRVdGlscy5iaW5kRXZlbnQoY29udGV4dCwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgdmFyIGV2ZW50T2JqZWN0Ok1vdXNlRXZlbnQgPSBzZWxmLl9jcmVhdGVFdmVudE9iamVjdChldmVudCwgZXZlbnROYW1lLCB0YXJnZXQpLFxuICAgICAgICAgICAgICAgICAgICB0b3BUYXJnZXQgPSBEaXJlY3Rvci5nZXRJbnN0YW5jZSgpLmdldFRvcFVuZGVyUG9pbnQoZXZlbnRPYmplY3QubG9jYXRpb25JblZpZXcpO1xuXG4gICAgICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLmVtaXQodG9wVGFyZ2V0LCBldmVudE9iamVjdCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2lzVHJpZ2dlcihyZXN1bHQpe1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdCAmJiByZXN1bHQuZ2V0Q291bnQoKSA+IDA7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9jcmVhdGVFdmVudE9iamVjdChldmVudDphbnksIGV2ZW50TmFtZTpFdmVudE5hbWUsIGN1cnJlbnRUYXJnZXQ6R2FtZU9iamVjdCkge1xuICAgICAgICAgICAgdmFyIG9iaiA9IE1vdXNlRXZlbnQuY3JlYXRlKGV2ZW50ID8gZXZlbnQgOiB3aW5kb3cuZXZlbnQsIGV2ZW50TmFtZSk7XG5cbiAgICAgICAgICAgIG9iai5jdXJyZW50VGFyZ2V0ID0gY3VycmVudFRhcmdldDtcblxuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9kZWZpbml0aW9ucy5kLnRzXCIvPlxubW9kdWxlIGR5IHtcbiAgICBkZWNsYXJlIHZhciBkb2N1bWVudDphbnk7XG5cbiAgICAvL3RvZG8gYmluZCBvbiBHYW1lT2JqZWN0IHdoaWNoIGhhcyB0aGUgZm9jdXNcbiAgICBleHBvcnQgY2xhc3MgS2V5Ym9hcmRFdmVudEhhbmRsZXIgZXh0ZW5kcyBEb21FdmVudEhhbmRsZXJ7XG4gICAgICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTpLZXlib2FyZEV2ZW50SGFuZGxlciA9IG51bGw7XG5cbiAgICAgICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9pbnN0YW5jZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlID0gbmV3IHRoaXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBvbihldmVudE5hbWU6RXZlbnROYW1lLCBoYW5kbGVyOkZ1bmN0aW9uLCBwcmlvcml0eTpudW1iZXIpIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlcihudWxsLCBldmVudE5hbWUsIGhhbmRsZXIsIHByaW9yaXR5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyB0cmlnZ2VyKGV2ZW50OkV2ZW50KTpib29sZWFue1xuICAgICAgICAgICAgdmFyIGV2ZW50TmFtZSA9IGV2ZW50Lm5hbWUsXG4gICAgICAgICAgICAgICAgZXZlbnRUeXBlID0gZXZlbnQudHlwZSxcbiAgICAgICAgICAgICAgICByZWdpc3RlckRhdGFMaXN0OmR5Q2IuQ29sbGVjdGlvbiA9IG51bGwsXG4gICAgICAgICAgICAgICAgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgICAgIHJlZ2lzdGVyRGF0YUxpc3QgPSBFdmVudFJlZ2lzdGVyLmdldEluc3RhbmNlKCkuZ2V0RXZlbnRSZWdpc3RlckRhdGFMaXN0KGV2ZW50TmFtZSk7XG5cbiAgICAgICAgICAgIGlmIChyZWdpc3RlckRhdGFMaXN0ID09PSBudWxsIHx8IHJlZ2lzdGVyRGF0YUxpc3QuZ2V0Q291bnQoKT09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZWdpc3RlckRhdGFMaXN0LmZvckVhY2goKHJlZ2lzdGVyRGF0YTpJRXZlbnRSZWdpc3RlckRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgZXZlbnRDb3B5ID0gZXZlbnQuY29weSgpO1xuXG4gICAgICAgICAgICAgICAgcmVnaXN0ZXJEYXRhLmhhbmRsZXIoZXZlbnRDb3B5KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByb3RlY3RlZCBnZXREb20oKSB7XG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQ7XG4gICAgICAgIH1cblxuICAgICAgICBwcm90ZWN0ZWQgYnVpbGRXcmFwSGFuZGxlcih0YXJnZXQ6R2FtZU9iamVjdCwgZXZlbnROYW1lOkV2ZW50TmFtZSl7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgICAgICAgICAgY29udGV4dCA9IHdpbmRvdztcblxuICAgICAgICAgICAgcmV0dXJuIGR5Q2IuRXZlbnRVdGlscy5iaW5kRXZlbnQoY29udGV4dCwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLnRyaWdnZXIoc2VsZi5fY3JlYXRlRXZlbnRPYmplY3QoZXZlbnQsIGV2ZW50TmFtZSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHByaXZhdGUgX2lzVHJpZ2dlcihyZXN1bHQpe1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdCAmJiByZXN1bHQuZ2V0Q291bnQoKSA+IDA7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9jcmVhdGVFdmVudE9iamVjdChldmVudDphbnksIGV2ZW50TmFtZTpFdmVudE5hbWUpIHtcbiAgICAgICAgICAgIHZhciBvYmogPSBLZXlib2FyZEV2ZW50LmNyZWF0ZShldmVudCA/IGV2ZW50IDogd2luZG93LmV2ZW50LCBldmVudE5hbWUpO1xuXG4gICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2RlZmluaXRpb25zLmQudHNcIi8+XG5tb2R1bGUgZHkge1xuICAgIGV4cG9ydCBjbGFzcyBDdXN0b21FdmVudEhhbmRsZXIgZXh0ZW5kcyBFdmVudEhhbmRsZXJ7XG4gICAgICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTpDdXN0b21FdmVudEhhbmRsZXIgPSBudWxsO1xuXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5faW5zdGFuY2UgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9pbnN0YW5jZSA9IG5ldyB0aGlzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgb24oZXZlbnROYW1lOnN0cmluZywgaGFuZGxlcjpGdW5jdGlvbiwgcHJpb3JpdHk6bnVtYmVyKTp2b2lkO1xuICAgICAgICBwdWJsaWMgb24odGFyZ2V0OkdhbWVPYmplY3QsIGV2ZW50TmFtZTpzdHJpbmcsIGhhbmRsZXI6RnVuY3Rpb24sIHByaW9yaXR5Om51bWJlcik6dm9pZDtcblxuICAgICAgICBwdWJsaWMgb24oYXJncykge1xuICAgICAgICAgICAgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMyl7XG4gICAgICAgICAgICAgICAgbGV0IGV2ZW50TmFtZSA9IGFyZ3VtZW50c1swXSxcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlciA9IGFyZ3VtZW50c1sxXSxcbiAgICAgICAgICAgICAgICAgICAgcHJpb3JpdHkgPSBhcmd1bWVudHNbMl07XG5cbiAgICAgICAgICAgICAgICBFdmVudFJlZ2lzdGVyLmdldEluc3RhbmNlKCkucmVnaXN0ZXIoXG4gICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICAgIDxhbnk+ZXZlbnROYW1lLFxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVyLFxuICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICAgICBwcmlvcml0eVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDQpe1xuICAgICAgICAgICAgICAgIGxldCB0YXJnZXQgPSBhcmd1bWVudHNbMF0sXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50TmFtZSA9IGFyZ3VtZW50c1sxXSxcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlciA9IGFyZ3VtZW50c1syXSxcbiAgICAgICAgICAgICAgICAgICAgcHJpb3JpdHkgPSBhcmd1bWVudHNbM107XG5cbiAgICAgICAgICAgICAgICBFdmVudFJlZ2lzdGVyLmdldEluc3RhbmNlKCkucmVnaXN0ZXIoXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldCxcbiAgICAgICAgICAgICAgICAgICAgPGFueT5ldmVudE5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXIsXG4gICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHByaW9yaXR5XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBvZmYoZXZlbnROYW1lOnN0cmluZyk6dm9pZDtcbiAgICAgICAgcHVibGljIG9mZih1aWQ6bnVtYmVyLCBldmVudE5hbWU6c3RyaW5nKTp2b2lkO1xuICAgICAgICBwdWJsaWMgb2ZmKGV2ZW50TmFtZTpzdHJpbmcsIGhhbmRsZXI6RnVuY3Rpb24pOnZvaWQ7XG4gICAgICAgIHB1YmxpYyBvZmYodGFyZ2V0OkdhbWVPYmplY3QsIGV2ZW50TmFtZTpzdHJpbmcsIGhhbmRsZXI6RnVuY3Rpb24pOnZvaWQ7XG5cbiAgICAgICAgcHVibGljIG9mZihhcmdzKSB7XG4gICAgICAgICAgICB2YXIgZXZlbnRSZWdpc3RlciA9IEV2ZW50UmVnaXN0ZXIuZ2V0SW5zdGFuY2UoKTtcblxuICAgICAgICAgICAgZXZlbnRSZWdpc3Rlci5yZW1vdmUuYXBwbHkoZXZlbnRSZWdpc3RlciwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgdHJpZ2dlcihldmVudDpFdmVudCk6Ym9vbGVhbjtcbiAgICAgICAgcHVibGljIHRyaWdnZXIoZXZlbnQ6RXZlbnQsIHVzZXJEYXRhOmFueSk6Ym9vbGVhbjtcbiAgICAgICAgcHVibGljIHRyaWdnZXIodGFyZ2V0OkdhbWVPYmplY3QsIGV2ZW50OkV2ZW50LCBub3RTZXRUYXJnZXQ6Ym9vbGVhbik6Ym9vbGVhbjtcbiAgICAgICAgcHVibGljIHRyaWdnZXIodGFyZ2V0OkdhbWVPYmplY3QsIGV2ZW50OkV2ZW50LCB1c2VyRGF0YTphbnksIG5vdFNldFRhcmdldDpib29sZWFuKTpib29sZWFuO1xuXG4gICAgICAgIHB1YmxpYyB0cmlnZ2VyKGFyZ3MpIHtcbiAgICAgICAgICAgIHZhciBldmVudDpFdmVudCA9IG51bGw7XG5cbiAgICAgICAgICAgIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDEgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMil7XG4gICAgICAgICAgICAgICAgbGV0IHVzZXJEYXRhID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpe1xuICAgICAgICAgICAgICAgICAgICBldmVudCA9IGFyZ3VtZW50c1swXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQgPSBhcmd1bWVudHNbMF07XG4gICAgICAgICAgICAgICAgICAgIHVzZXJEYXRhID0gYXJndW1lbnRzWzFdO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl90cmlnZ2VyRXZlbnRIYW5kbGVyKGV2ZW50LCB1c2VyRGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDMgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gNCl7XG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldCA9IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHVzZXJEYXRhID0gbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgbm90U2V0VGFyZ2V0ID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDMpe1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQgPSBhcmd1bWVudHNbMF07XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50ID0gYXJndW1lbnRzWzFdO1xuICAgICAgICAgICAgICAgICAgICBub3RTZXRUYXJnZXQgPSBhcmd1bWVudHNbMl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldCA9IGFyZ3VtZW50c1swXTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQgPSBhcmd1bWVudHNbMV07XG4gICAgICAgICAgICAgICAgICAgIHVzZXJEYXRhID0gYXJndW1lbnRzWzJdO1xuICAgICAgICAgICAgICAgICAgICBub3RTZXRUYXJnZXQgPSBhcmd1bWVudHNbM107XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RyaWdnZXJUYXJnZXRBbmRFdmVudEhhbmRsZXIodGFyZ2V0LCBldmVudCwgdXNlckRhdGEsIG5vdFNldFRhcmdldCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX3RyaWdnZXJFdmVudEhhbmRsZXIoZXZlbnQsIHVzZXJEYXRhKXtcbiAgICAgICAgICAgIHZhciBsaXN0ZW5lckRhdGFMaXN0OmR5Q2IuQ29sbGVjdGlvbiA9IG51bGwsXG4gICAgICAgICAgICAgICAgaXNTdG9wUHJvcGFnYXRpb24gPSBmYWxzZSxcbiAgICAgICAgICAgICAgICBzZWxmID0gdGhpcztcblxuICAgICAgICAgICAgbGlzdGVuZXJEYXRhTGlzdCA9IEV2ZW50UmVnaXN0ZXIuZ2V0SW5zdGFuY2UoKS5nZXRFdmVudFJlZ2lzdGVyRGF0YUxpc3QoZXZlbnQubmFtZSk7XG5cbiAgICAgICAgICAgIGlmIChsaXN0ZW5lckRhdGFMaXN0ID09PSBudWxsIHx8IGxpc3RlbmVyRGF0YUxpc3QuZ2V0Q291bnQoKT09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsaXN0ZW5lckRhdGFMaXN0LmZvckVhY2goKGxpc3RlbmVyRGF0YTpJRXZlbnRSZWdpc3RlckRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgZXZlbnRDb3B5ID0gZXZlbnQuY29weSgpO1xuXG4gICAgICAgICAgICAgICAgZXZlbnRDb3B5LmN1cnJlbnRUYXJnZXQgPSBsaXN0ZW5lckRhdGEudGFyZ2V0O1xuICAgICAgICAgICAgICAgIGV2ZW50Q29weS50YXJnZXQgPSBsaXN0ZW5lckRhdGEudGFyZ2V0O1xuXG4gICAgICAgICAgICAgICAgc2VsZi5fc2V0VXNlckRhdGEoZXZlbnRDb3B5LCB1c2VyRGF0YSk7XG5cbiAgICAgICAgICAgICAgICBsaXN0ZW5lckRhdGEuaGFuZGxlcihldmVudENvcHkpO1xuXG4gICAgICAgICAgICAgICAgLy9pZihldmVudENvcHkuaXNTdG9wUHJvcGFnYXRpb24pe1xuICAgICAgICAgICAgICAgIC8vICAgIGlzU3RvcFByb3BhZ2F0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAvL31cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvL3JldHVybiBpc1N0b3BQcm9wYWdhdGlvbjtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfdHJpZ2dlclRhcmdldEFuZEV2ZW50SGFuZGxlcih0YXJnZXQsIGV2ZW50LCB1c2VyRGF0YSwgbm90U2V0VGFyZ2V0KXtcbiAgICAgICAgICAgIHZhciBsaXN0ZW5lckRhdGFMaXN0OmR5Q2IuQ29sbGVjdGlvbiA9IG51bGwsXG4gICAgICAgICAgICAgICAgaXNTdG9wUHJvcGFnYXRpb24gPSBmYWxzZSxcbiAgICAgICAgICAgICAgICBzZWxmID0gdGhpcztcblxuICAgICAgICAgICAgaWYoIW5vdFNldFRhcmdldCl7XG4gICAgICAgICAgICAgICAgZXZlbnQudGFyZ2V0ID0gdGFyZ2V0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsaXN0ZW5lckRhdGFMaXN0ID0gRXZlbnRSZWdpc3Rlci5nZXRJbnN0YW5jZSgpLmdldEV2ZW50UmVnaXN0ZXJEYXRhTGlzdCh0YXJnZXQsIGV2ZW50Lm5hbWUpO1xuXG4gICAgICAgICAgICBpZiAobGlzdGVuZXJEYXRhTGlzdCA9PT0gbnVsbCB8fCBsaXN0ZW5lckRhdGFMaXN0LmdldENvdW50KCk9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGlzdGVuZXJEYXRhTGlzdC5mb3JFYWNoKChsaXN0ZW5lckRhdGE6SUV2ZW50UmVnaXN0ZXJEYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIGV2ZW50Q29weSA9IGV2ZW50LmNvcHkoKTtcblxuICAgICAgICAgICAgICAgIGV2ZW50Q29weS5jdXJyZW50VGFyZ2V0ID0gbGlzdGVuZXJEYXRhLnRhcmdldDtcblxuICAgICAgICAgICAgICAgIHNlbGYuX3NldFVzZXJEYXRhKGV2ZW50Q29weSwgdXNlckRhdGEpO1xuXG4gICAgICAgICAgICAgICAgbGlzdGVuZXJEYXRhLmhhbmRsZXIoZXZlbnRDb3B5KTtcblxuICAgICAgICAgICAgICAgIGlmKGV2ZW50Q29weS5pc1N0b3BQcm9wYWdhdGlvbil7XG4gICAgICAgICAgICAgICAgICAgIGlzU3RvcFByb3BhZ2F0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIGlzU3RvcFByb3BhZ2F0aW9uO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfc2V0VXNlckRhdGEoZXZlbnQ6Q3VzdG9tRXZlbnQsIHVzZXJEYXRhKXtcbiAgICAgICAgICAgIGlmKHVzZXJEYXRhKXtcbiAgICAgICAgICAgICAgICBldmVudC51c2VyRGF0YSA9IHVzZXJEYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2RlZmluaXRpb25zLmQudHNcIi8+XG5tb2R1bGUgZHkge1xuICAgIGV4cG9ydCBjbGFzcyBFdmVudERpc3BhdGNoZXIge1xuICAgICAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZSgpIHtcbiAgICAgICAgICAgIHZhciBvYmogPSBuZXcgdGhpcygpO1xuXG4gICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9wcml2YXRlIF9ldmVudEJpbmRlcjogRXZlbnRCaW5kZXIgPSBudWxsO1xuICAgICAgICAvL3ByaXZhdGUgX2V2ZW50UmVnaXN0ZXI6RXZlbnRSZWdpc3RlciA9IG51bGw7XG5cbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICAvL3RoaXMuX2V2ZW50QmluZGVyID0gYmluZGVyO1xuICAgICAgICAgICAgLy9FdmVudFJlZ2lzdGVyLmdldEluc3RhbmNlKCkgPSByZWdpc3RlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vZGlzcGF0Y2ggaW4gZXZlbnRCaW5kZXItPmV2ZW50TGlzdFxuXG5cbiAgICAgICAgLy9wdWJsaWMgc2V0QnViYmxlUGFyZW50KHRhcmdldDpHYW1lT2JqZWN0LCBwYXJlbnQ6YW55KSB7XG4gICAgICAgIC8vICAgIEV2ZW50UmVnaXN0ZXIuZ2V0SW5zdGFuY2UoKS5zZXRCdWJibGVQYXJlbnQodGFyZ2V0LCBwYXJlbnQpO1xuICAgICAgICAvL31cblxuICAgICAgICBwdWJsaWMgdHJpZ2dlcihldmVudDpFdmVudCk6Ym9vbGVhbjtcbiAgICAgICAgcHVibGljIHRyaWdnZXIoZXZlbnQ6RXZlbnQsIHVzZXJEYXRhOmFueSk6dm9pZDtcbiAgICAgICAgcHVibGljIHRyaWdnZXIodGFyZ2V0OkdhbWVPYmplY3QsIGV2ZW50OkV2ZW50KTpib29sZWFuO1xuICAgICAgICBwdWJsaWMgdHJpZ2dlcih0YXJnZXQ6R2FtZU9iamVjdCwgZXZlbnQ6RXZlbnQsIG5vdFNldFRhcmdldDpib29sZWFuKTpib29sZWFuO1xuICAgICAgICBwdWJsaWMgdHJpZ2dlcih0YXJnZXQ6R2FtZU9iamVjdCwgZXZlbnQ6RXZlbnQsIHVzZXJEYXRhOmFueSk6Ym9vbGVhbjtcbiAgICAgICAgcHVibGljIHRyaWdnZXIodGFyZ2V0OkdhbWVPYmplY3QsIGV2ZW50OkV2ZW50LCB1c2VyRGF0YTphbnksIG5vdFNldFRhcmdldDpib29sZWFuKTpib29sZWFuO1xuXG4gICAgICAgIHB1YmxpYyB0cmlnZ2VyKGFyZ3MpIHtcbiAgICAgICAgICAgIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpe1xuICAgICAgICAgICAgICAgIGxldCBldmVudCA9IGFyZ3VtZW50c1swXSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRUeXBlID0gZXZlbnQudHlwZTtcblxuICAgICAgICAgICAgICAgIC8vZHlDYi5Mb2cuZXJyb3IoZXZlbnRUeXBlICE9PSBFdmVudFR5cGUuQ1VTVE9NLCBkeUNiLkxvZy5pbmZvLkZVTkNfTVVTVF9CRShcImV2ZW50IHR5cGVcIiwgXCJDVVNUT01cIikpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIEZhY3RvcnlFdmVudEhhbmRsZXIuY3JlYXRlRXZlbnRIYW5kbGVyKGV2ZW50VHlwZSlcbiAgICAgICAgICAgICAgICAgICAgLnRyaWdnZXIoZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhcmd1bWVudHMubGVuZ3RoID09PSAyICYmICEoYXJndW1lbnRzWzFdIGluc3RhbmNlb2YgRXZlbnQpKXtcbiAgICAgICAgICAgICAgICBsZXQgZXZlbnQgPSBhcmd1bWVudHNbMF0sXG4gICAgICAgICAgICAgICAgICAgIHVzZXJEYXRhID0gYXJndW1lbnRzWzFdLFxuICAgICAgICAgICAgICAgICAgICBldmVudFR5cGUgPSBldmVudC50eXBlO1xuXG4gICAgICAgICAgICAgICAgZHlDYi5Mb2cuZXJyb3IoZXZlbnRUeXBlICE9PSBFdmVudFR5cGUuQ1VTVE9NLCBkeUNiLkxvZy5pbmZvLkZVTkNfTVVTVF9CRShcImV2ZW50IHR5cGVcIiwgXCJDVVNUT01cIikpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIEZhY3RvcnlFdmVudEhhbmRsZXIuY3JlYXRlRXZlbnRIYW5kbGVyKGV2ZW50VHlwZSlcbiAgICAgICAgICAgICAgICAgICAgLnRyaWdnZXIoZXZlbnQsIHVzZXJEYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMiB8fCAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMyAmJiBKdWRnZVV0aWxzLmlzQm9vbGVhbihhcmd1bWVudHNbMl0pKSl7XG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldCA9IGFyZ3VtZW50c1swXSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQgPSBhcmd1bWVudHNbMV0sXG4gICAgICAgICAgICAgICAgICAgIG5vdFNldFRhcmdldCA9IGFyZ3VtZW50c1syXSA9PT0gdm9pZCAwID8gZmFsc2UgOiBhcmd1bWVudHNbMl0sXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50VHlwZSA9IGV2ZW50LnR5cGU7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gRmFjdG9yeUV2ZW50SGFuZGxlci5jcmVhdGVFdmVudEhhbmRsZXIoZXZlbnRUeXBlKVxuICAgICAgICAgICAgICAgICAgICAudHJpZ2dlcih0YXJnZXQsIGV2ZW50LCBub3RTZXRUYXJnZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhcmd1bWVudHMubGVuZ3RoID09PSAzIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDQpe1xuICAgICAgICAgICAgICAgIGxldCB0YXJnZXQgPSBhcmd1bWVudHNbMF0sXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50ID0gYXJndW1lbnRzWzFdLFxuICAgICAgICAgICAgICAgICAgICB1c2VyRGF0YSA9IGFyZ3VtZW50c1syXSxcbiAgICAgICAgICAgICAgICAgICAgbm90U2V0VGFyZ2V0ID0gYXJndW1lbnRzWzNdID09PSB2b2lkIDAgPyBmYWxzZSA6IGFyZ3VtZW50c1szXSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRUeXBlID0gZXZlbnQudHlwZTtcblxuICAgICAgICAgICAgICAgIGR5Q2IuTG9nLmVycm9yKGV2ZW50VHlwZSAhPT0gRXZlbnRUeXBlLkNVU1RPTSwgZHlDYi5Mb2cuaW5mby5GVU5DX01VU1RfQkUoXCJldmVudCB0eXBlXCIsIFwiQ1VTVE9NXCIpKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBGYWN0b3J5RXZlbnRIYW5kbGVyLmNyZWF0ZUV2ZW50SGFuZGxlcihldmVudFR5cGUpXG4gICAgICAgICAgICAgICAgICAgIC50cmlnZ2VyKHRhcmdldCwgZXZlbnQsIHVzZXJEYXRhLCBub3RTZXRUYXJnZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHRyYW5zZmVyIGV2ZW50IHVwXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXRcbiAgICAgICAgICogQHBhcmFtIGV2ZW50T2JqZWN0XG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgZW1pdCh0YXJnZXQ6R2FtZU9iamVjdCwgZXZlbnRPYmplY3Q6RXZlbnQsIHVzZXJEYXRhPzphbnkpIHtcbiAgICAgICAgICAgIHZhciBpc1N0b3BQcm9wYWdhdGlvbiA9IGZhbHNlO1xuXG4gICAgICAgICAgICBldmVudE9iamVjdC5waGFzZSA9IEV2ZW50UGhhc2UuRU1JVDtcbiAgICAgICAgICAgIGV2ZW50T2JqZWN0LnRhcmdldCA9IHRhcmdldDtcblxuICAgICAgICAgICAgZG97XG4gICAgICAgICAgICAgICAgaXNTdG9wUHJvcGFnYXRpb24gPSB0aGlzLl90cmlnZ2VyV2l0aFVzZXJEYXRhKHRhcmdldCwgZXZlbnRPYmplY3QuY29weSgpLCB1c2VyRGF0YSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICBpZihpc1N0b3BQcm9wYWdhdGlvbil7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0YXJnZXQgPSB0aGlzLl9nZXRQYXJlbnQodGFyZ2V0KTtcbiAgICAgICAgICAgIH13aGlsZSh0YXJnZXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHRyYW5zZmVyIGV2ZW50IGRvd25cbiAgICAgICAgICogQHBhcmFtIHRhcmdldFxuICAgICAgICAgKiBAcGFyYW0gZXZlbnRPYmplY3RcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBicm9hZGNhc3QodGFyZ2V0OkdhbWVPYmplY3QsIGV2ZW50T2JqZWN0OkV2ZW50LCB1c2VyRGF0YT86YW55KSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgICAgIGV2ZW50T2JqZWN0LnBoYXNlID0gRXZlbnRQaGFzZS5CUk9BRENBU1Q7XG4gICAgICAgICAgICBldmVudE9iamVjdC50YXJnZXQgPSB0YXJnZXQ7XG5cbiAgICAgICAgICAgIHRoaXMuX3RyaWdnZXJXaXRoVXNlckRhdGEodGFyZ2V0LCBldmVudE9iamVjdC5jb3B5KCksIHVzZXJEYXRhLCB0cnVlKTtcblxuICAgICAgICAgICAgZnVuY3Rpb24gaXRlcmF0b3Iob2JqOkdhbWVPYmplY3Qpe1xuICAgICAgICAgICAgICAgIHZhciBjaGlsZHJlbjpkeUNiLkNvbGxlY3Rpb24gPSBvYmouZ2V0Q2hpbHJlbigpO1xuXG4gICAgICAgICAgICAgICAgaWYoY2hpbGRyZW4uZ2V0Q291bnQoKSA9PT0gMCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKChjaGlsZDpHYW1lT2JqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuX3RyaWdnZXJXaXRoVXNlckRhdGEoY2hpbGQsIGV2ZW50T2JqZWN0LmNvcHkoKSwgdXNlckRhdGEsIHRydWUpO1xuXG4gICAgICAgICAgICAgICAgICAgIGl0ZXJhdG9yKGNoaWxkKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaXRlcmF0b3IodGFyZ2V0KTtcbiAgICAgICAgfVxuXG4gICAgICAgcHJpdmF0ZSBfZ2V0UGFyZW50KHRhcmdldDpHYW1lT2JqZWN0KTpHYW1lT2JqZWN0IHtcbiAgICAgICAgICAgIHZhciBwYXJlbnQgPSB0YXJnZXQuYnViYmxlUGFyZW50O1xuXG4gICAgICAgICAgICByZXR1cm4gcGFyZW50ID8gcGFyZW50IDogdGFyZ2V0LnBhcmVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX3RyaWdnZXJXaXRoVXNlckRhdGEodGFyZ2V0LCBldmVudCwgdXNlckRhdGEsIG5vdFNldFRhcmdldCl7XG4gICAgICAgICAgICByZXR1cm4gdXNlckRhdGEgPyB0aGlzLnRyaWdnZXIodGFyZ2V0LCBldmVudC5jb3B5KCksIHVzZXJEYXRhLCBub3RTZXRUYXJnZXQpXG4gICAgICAgICAgICAgICAgOiB0aGlzLnRyaWdnZXIodGFyZ2V0LCBldmVudCwgbm90U2V0VGFyZ2V0KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9kZWZpbml0aW9ucy5kLnRzXCIvPlxubW9kdWxlIGR5IHtcbiAgICBleHBvcnQgaW50ZXJmYWNlIElFdmVudFJlZ2lzdGVyRGF0YSB7XG4gICAgICAgIHRhcmdldDpHYW1lT2JqZWN0LFxuICAgICAgICAvL3VzZXIncyBldmVudCBoYW5kbGVyXG4gICAgICAgIGhhbmRsZXI6RnVuY3Rpb24sXG4gICAgICAgIC8vdGhlIGFjdHVhbCBldmVudCBoYW5kbGVyXG4gICAgICAgIHdyYXBIYW5kbGVyOkZ1bmN0aW9uLFxuICAgICAgICBwcmlvcml0eTpudW1iZXJcbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgRXZlbnRSZWdpc3RlciB7XG4gICAgICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTpFdmVudFJlZ2lzdGVyID0gbnVsbDtcblxuICAgICAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2luc3RhbmNlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UgPSBuZXcgdGhpcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xuICAgICAgICB9XG5cblxuICAgICAgICBwcml2YXRlIF9saXN0ZW5lck1hcDpFdmVudExpc3RlbmVyTWFwID0gRXZlbnRMaXN0ZW5lck1hcC5jcmVhdGUoKTtcblxuICAgICAgICBwdWJsaWMgcmVnaXN0ZXIodGFyZ2V0OkdhbWVPYmplY3QsIGV2ZW50TmFtZTpFdmVudE5hbWUsIGhhbmRsZXI6RnVuY3Rpb24sIHdyYXBIYW5kbGVyOkZ1bmN0aW9uLCBwcmlvcml0eTpudW1iZXIpIHtcbiAgICAgICAgICAgIC8vdmFyIGlzQmluZEV2ZW50T25WaWV3ID0gZmFsc2UsXG4gICAgICAgICAgICB2YXIgZGF0YSA9IDxJRXZlbnRSZWdpc3RlckRhdGE+e1xuICAgICAgICAgICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGhhbmRsZXIsXG4gICAgICAgICAgICAgICAgd3JhcEhhbmRsZXI6IHdyYXBIYW5kbGVyLFxuICAgICAgICAgICAgICAgIHByaW9yaXR5OiBwcmlvcml0eVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy9ldmVudE5hbWUgPSA8c3RyaW5nPmV2ZW50TmFtZTtcbiAgICAgICAgICAgIC8vLy9wcmlvcml0eSBzZXQgaW4gbGlzdGVuZXIsIG5vdCBpbiB0aGlzKGJpbmRlcikhXG4gICAgICAgICAgICAvL2lmKHByaW9yaXR5KXtcbiAgICAgICAgICAgIC8vICAgIGxpc3RlbmVyLnNldFByaW9yaXR5KHByaW9yaXR5KTtcbiAgICAgICAgICAgIC8vfVxuXG5cbiAgICAgICAgICAgIC8vaWYgKHRoaXMuaXNCaW5kRXZlbnRPblZpZXcoZXZlbnROYW1lKSl7XG4gICAgICAgICAgICAvLyAgICBpc0JpbmRFdmVudE9uVmlldyA9IHRydWU7XG4gICAgICAgICAgICAvLyAgICAvL3RoaXMuX2xpc3RlbmVyTWFwLmFwcGVuZENoaWxkKHRoaXMuX2J1aWxkS2V5KHRhcmdldC51aWQsIGV2ZW50TmFtZSksIGhhbmRsZXIpO1xuICAgICAgICAgICAgLy99XG4gICAgICAgICAgICAvL2Vsc2Uge1xuICAgICAgICAgICAgLy8gICAgaXNCaW5kRXZlbnRPblZpZXcgPSBmYWxzZTtcbiAgICAgICAgICAgIC8vICAgIC8vdGhpcy5fbGlzdGVuZXJNYXAuYWRkQ2hpbGQoZXZlbnROYW1lLCBkYXRhKTtcbiAgICAgICAgICAgIC8vfVxuXG5cbiAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVyTWFwLmFwcGVuZENoaWxkKGV2ZW50TmFtZSwgZGF0YSk7XG5cblxuICAgICAgICAgICAgLy90aGlzLl9saXN0ZW5lckxpc3QuYWRkQ2hpbGQobGlzdGVuZXIuZXZlbnRUeXBlLCAge1xuICAgICAgICAgICAgLy8gICAgdGFyZ2V0OnRhcmdldCxcbiAgICAgICAgICAgIC8vICAgIGxpc3RlbmVyOmxpc3RlbmVyXG4gICAgICAgICAgICAvL30pO1xuXG4gICAgICAgICAgICAvL3JldHVybiBpc0JpbmRFdmVudE9uVmlldztcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyByZW1vdmUoZXZlbnROYW1lOkV2ZW50TmFtZSk6dm9pZDtcbiAgICAgICAgcHVibGljIHJlbW92ZShldmVudE5hbWU6RXZlbnROYW1lLCBoYW5kbGVyOkZ1bmN0aW9uKTp2b2lkO1xuICAgICAgICBwdWJsaWMgcmVtb3ZlKHVpZDpudW1iZXIsIGV2ZW50TmFtZTpFdmVudE5hbWUpOnZvaWQ7XG4gICAgICAgIHB1YmxpYyByZW1vdmUodGFyZ2V0OkdhbWVPYmplY3QpOnZvaWQ7XG4gICAgICAgIHB1YmxpYyByZW1vdmUodGFyZ2V0OkdhbWVPYmplY3QsIGV2ZW50TmFtZTpFdmVudE5hbWUpOnZvaWQ7XG4gICAgICAgIHB1YmxpYyByZW1vdmUodGFyZ2V0OkdhbWVPYmplY3QsIGV2ZW50TmFtZTpFdmVudE5hbWUsIGhhbmRsZXI6RnVuY3Rpb24pOnZvaWQ7XG5cbiAgICAgICAgcHVibGljIHJlbW92ZShhcmdzKSB7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gYXJndW1lbnRzWzBdO1xuXG4gICAgICAgICAgICBpZihhcmd1bWVudHMubGVuZ3RoID09PSAxICYmIEp1ZGdlVXRpbHMuaXNTdHJpbmcoYXJndW1lbnRzWzBdKSl7XG4gICAgICAgICAgICAgICAgbGV0IGV2ZW50TmFtZSA9IGFyZ3VtZW50c1swXTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVyTWFwLnJlbW92ZUNoaWxkKGV2ZW50TmFtZSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMiAmJiBKdWRnZVV0aWxzLmlzRnVuY3Rpb24oYXJndW1lbnRzWzFdKSl7XG4gICAgICAgICAgICAgICAgbGV0IGV2ZW50TmFtZSA9IGFyZ3VtZW50c1swXSxcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlciA9IGFyZ3VtZW50c1sxXTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVyTWFwLnJlbW92ZUNoaWxkKGV2ZW50TmFtZSwgaGFuZGxlcik7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMiAmJiBKdWRnZVV0aWxzLmlzTnVtYmVyKGFyZ3VtZW50c1swXSkpe1xuICAgICAgICAgICAgICAgIGxldCB1aWQgPSBhcmd1bWVudHNbMF0sXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50TmFtZSA9IGFyZ3VtZW50c1sxXTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVyTWFwLnJlbW92ZUNoaWxkKHVpZCwgZXZlbnROYW1lKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhcmd1bWVudHMubGVuZ3RoID09PSAxKXtcbiAgICAgICAgICAgICAgICBsZXQgZGF0YUxpc3QgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgZGF0YUxpc3QgPSB0aGlzLl9saXN0ZW5lck1hcC5nZXRFdmVudE9mZkRhdGFMaXN0KHRhcmdldCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9saXN0ZW5lck1hcC5yZW1vdmVDaGlsZCh0YXJnZXQpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5faGFuZGxlQWZ0ZXJBbGxFdmVudEhhbmRsZXJSZW1vdmVkKHRhcmdldCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YUxpc3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDIgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMyl7XG4gICAgICAgICAgICAgICAgbGV0IGV2ZW50TmFtZSA9IGFyZ3VtZW50c1sxXTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVyTWFwLnJlbW92ZUNoaWxkLmFwcGx5KHRoaXMuX2xpc3RlbmVyTWFwLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApKTtcblxuICAgICAgICAgICAgICAgIGlmKHRoaXMuX2lzQWxsRXZlbnRIYW5kbGVyUmVtb3ZlZCh0YXJnZXQpKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faGFuZGxlQWZ0ZXJBbGxFdmVudEhhbmRsZXJSZW1vdmVkKHRhcmdldCk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RlbmVyTWFwLmdldEV2ZW50T2ZmRGF0YUxpc3QodGFyZ2V0LCBldmVudE5hbWUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGdldEV2ZW50UmVnaXN0ZXJEYXRhTGlzdChldmVudE5hbWU6RXZlbnROYW1lKTpkeUNiLkNvbGxlY3Rpb247XG4gICAgICAgIHB1YmxpYyBnZXRFdmVudFJlZ2lzdGVyRGF0YUxpc3QoY3VycmVudFRhcmdldDpHYW1lT2JqZWN0LCBldmVudE5hbWU6RXZlbnROYW1lKTpkeUNiLkNvbGxlY3Rpb247XG5cbiAgICAgICAgcHVibGljIGdldEV2ZW50UmVnaXN0ZXJEYXRhTGlzdChhcmdzKXtcbiAgICAgICAgICAgIHZhciByZXN1bHQ6ZHlDYi5Db2xsZWN0aW9uID0gdGhpcy5fbGlzdGVuZXJNYXAuZ2V0Q2hpbGQuYXBwbHkodGhpcy5fbGlzdGVuZXJNYXAsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCkpLFxuICAgICAgICAgICAgICAgIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgICAgICBpZighcmVzdWx0KXtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5zb3J0KGZ1bmN0aW9uIChkYXRhQSwgZGF0YUIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGFCLnByaW9yaXR5IC0gZGF0YUEucHJpb3JpdHk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc2V0QnViYmxlUGFyZW50KHRhcmdldDpHYW1lT2JqZWN0LCBwYXJlbnQ6R2FtZU9iamVjdCkge1xuICAgICAgICAgICAgdGFyZ2V0LmJ1YmJsZVBhcmVudCA9IHBhcmVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBpc0JpbmRlZCh0YXJnZXQ6R2FtZU9iamVjdCwgZXZlbnROYW1lOkV2ZW50TmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RlbmVyTWFwLmhhc0NoaWxkKHRhcmdldCwgZXZlbnROYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBmaWx0ZXIoZnVuYzpGdW5jdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RlbmVyTWFwLmZpbHRlcihmdW5jKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBmb3JFYWNoKGZ1bmM6RnVuY3Rpb24pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9saXN0ZW5lck1hcC5mb3JFYWNoKGZ1bmMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGdldENoaWxkKHRhcmdldDpHYW1lT2JqZWN0LCBldmVudE5hbWU/OkV2ZW50TmFtZSl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbGlzdGVuZXJNYXAuZ2V0Q2hpbGQuYXBwbHkoXG4gICAgICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJNYXAsXG4gICAgICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBnZXRFdmVudE5hbWVGcm9tS2V5KGtleTpzdHJpbmcpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RlbmVyTWFwLmdldEV2ZW50TmFtZUZyb21LZXkoa2V5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBnZXRVaWRGcm9tS2V5KGtleTpzdHJpbmcpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RlbmVyTWFwLmdldFVpZEZyb21LZXkoa2V5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBnZXRXcmFwSGFuZGxlcih0YXJnZXQ6R2FtZU9iamVjdCwgZXZlbnROYW1lOkV2ZW50TmFtZSl7XG4gICAgICAgICAgICB2YXIgbGlzdDpkeUNiLkNvbGxlY3Rpb24gPSB0aGlzLmdldENoaWxkKHRhcmdldCwgZXZlbnROYW1lKTtcblxuICAgICAgICAgICAgaWYobGlzdCAmJiBsaXN0LmdldENvdW50KCkgPiAwKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gbGlzdC5nZXRDaGlsZCgwKS53cmFwSGFuZGxlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBpc1RhcmdldChrZXk6c3RyaW5nLCB0YXJnZXQ6R2FtZU9iamVjdCwgbGlzdDpkeUNiLkNvbGxlY3Rpb24pe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RlbmVyTWFwLmlzVGFyZ2V0KGtleSwgdGFyZ2V0LCBsaXN0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vcHVibGljIGNvcHkoKXtcbiAgICAgICAgLy9cbiAgICAgICAgLy99XG5cbiAgICAgICAgLy9wcml2YXRlIF9pc0NvbnRhaW4ocGFyZW50VGFyZ2V0OkdhbWVPYmplY3QsIGNoaWxkVGFyZ2V0OkdhbWVPYmplY3Qpe1xuICAgICAgICAvLyAgICB2YXIgcGFyZW50ID0gbnVsbDtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgcGFyZW50ID0gY2hpbGRUYXJnZXQucGFyZW50O1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICB3aGlsZShwYXJlbnQpe1xuICAgICAgICAvLyAgICAgICAgaWYoSnVkZ2VVdGlscy5pc0VxdWFsKHBhcmVudCwgcGFyZW50VGFyZ2V0KSl7XG4gICAgICAgIC8vICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIC8vICAgICAgICB9XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAgICBwYXJlbnQgPSBjaGlsZFRhcmdldC5wYXJlbnQ7XG4gICAgICAgIC8vICAgIH1cbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAvL31cblxuXG4gICAgICAgIC8vcHJpdmF0ZSBfcmVtb3ZlRnJvbU1hcCh0YXJnZXQ6R2FtZU9iamVjdCwgZXZlbnROYW1lOkV2ZW50TmFtZSkge1xuICAgICAgICAvL31cblxuICAgICAgICBwcml2YXRlIF9pc0FsbEV2ZW50SGFuZGxlclJlbW92ZWQodGFyZ2V0OkdhbWVPYmplY3Qpe1xuICAgICAgICAgICAgcmV0dXJuICF0aGlzLl9saXN0ZW5lck1hcC5oYXNDaGlsZCgobGlzdDpkeUNiLkNvbGxlY3Rpb24sIGtleTpzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4ga2V5LmluZGV4T2YoU3RyaW5nKHRhcmdldC51aWQpKSA+IC0xICYmIGxpc3QgIT09IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfaGFuZGxlQWZ0ZXJBbGxFdmVudEhhbmRsZXJSZW1vdmVkKHRhcmdldDpHYW1lT2JqZWN0KXtcbiAgICAgICAgICAgIHRoaXMuc2V0QnViYmxlUGFyZW50KHRhcmdldCwgbnVsbCk7XG4gICAgICAgIH1cblxuICAgICAgICAvL3ByaXZhdGUgX2J1aWxkS2V5KHVpZCwgZXZlbnROYW1lKXtcbiAgICAgICAgLy8gICAgcmV0dXJuIFN0cmluZyh1aWQpICsgXCJfXCIgKyBldmVudE5hbWU7XG4gICAgICAgIC8vfVxuICAgIH1cbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vZGVmaW5pdGlvbnMuZC50c1wiLz5cbm1vZHVsZSBkeSB7XG4gICAgLy9yZXNwb25zaWJpbHR5Om9uLCBvZmYgZXZlbnQobWFuYWdlIGxpc3QpXG5cbiAgICBleHBvcnQgY2xhc3MgRXZlbnRCaW5kZXIge1xuICAgICAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZSgpIHtcbiAgICAgICAgICAgIHZhciBvYmogPSBuZXcgdGhpcygpO1xuXG4gICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9wcml2YXRlIF9saXN0ZW5lckxpc3Q6RXZlbnRMaXN0ZW5lciA9IEV2ZW50TGlzdGVuZXIuY3JlYXRlKCk7XG4gICAgICAgIC8vcHJpdmF0ZSBfZXZlbnRSZWdpc3RlcjpFdmVudFJlZ2lzdGVyID0gbnVsbDtcblxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIC8vRXZlbnRSZWdpc3Rlci5nZXRJbnN0YW5jZSgpID0gZXZlbnRSZWdpc3RlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBvbihldmVudE5hbWU6RXZlbnROYW1lLCBoYW5kbGVyOkZ1bmN0aW9uLCBwcmlvcml0eTpudW1iZXIpOnZvaWQ7XG4gICAgICAgIHB1YmxpYyBvbihsaXN0ZW5lcjp7fXxFdmVudExpc3RlbmVyKTp2b2lkO1xuICAgICAgICBwdWJsaWMgb24odGFyZ2V0OkdhbWVPYmplY3QsIGxpc3RlbmVyOnt9fEV2ZW50TGlzdGVuZXIpOnZvaWQ7XG4gICAgICAgIHB1YmxpYyBvbih0YXJnZXQ6R2FtZU9iamVjdCwgZXZlbnROYW1lOkV2ZW50TmFtZSwgaGFuZGxlcjpGdW5jdGlvbiwgcHJpb3JpdHk6bnVtYmVyKTp2b2lkO1xuXG4gICAgICAgIHB1YmxpYyBvbihhcmdzKSB7XG4gICAgICAgICAgICBpZihhcmd1bWVudHMubGVuZ3RoID09PSAxKXtcbiAgICAgICAgICAgICAgICBsZXQgbGlzdGVuZXI6RXZlbnRMaXN0ZW5lciA9ICEoYXJndW1lbnRzWzBdIGluc3RhbmNlb2YgRXZlbnRMaXN0ZW5lcikgPyAgRXZlbnRMaXN0ZW5lci5jcmVhdGUoYXJndW1lbnRzWzBdKTogYXJndW1lbnRzWzBdO1xuXG4gICAgICAgICAgICAgICAgbGlzdGVuZXIuaGFuZGxlckRhdGFMaXN0LmZvckVhY2goZnVuY3Rpb24gKGhhbmRsZXJEYXRhOklFdmVudEhhbmRsZXJEYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIEZhY3RvcnlFdmVudEhhbmRsZXIuY3JlYXRlRXZlbnRIYW5kbGVyKGxpc3RlbmVyLmV2ZW50VHlwZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbihoYW5kbGVyRGF0YS5ldmVudE5hbWUsIGhhbmRsZXJEYXRhLmhhbmRsZXIsIGxpc3RlbmVyLnByaW9yaXR5KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMil7XG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldCA9IGFyZ3VtZW50c1swXSxcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXI6RXZlbnRMaXN0ZW5lciA9ICEoYXJndW1lbnRzWzFdIGluc3RhbmNlb2YgRXZlbnRMaXN0ZW5lcikgPyAgRXZlbnRMaXN0ZW5lci5jcmVhdGUoYXJndW1lbnRzWzFdKTogYXJndW1lbnRzWzFdO1xuXG4gICAgICAgICAgICAgICAgbGlzdGVuZXIuaGFuZGxlckRhdGFMaXN0LmZvckVhY2goZnVuY3Rpb24gKGhhbmRsZXJEYXRhOklFdmVudEhhbmRsZXJEYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIEZhY3RvcnlFdmVudEhhbmRsZXIuY3JlYXRlRXZlbnRIYW5kbGVyKGxpc3RlbmVyLmV2ZW50VHlwZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbih0YXJnZXQsIGhhbmRsZXJEYXRhLmV2ZW50TmFtZSwgaGFuZGxlckRhdGEuaGFuZGxlciwgbGlzdGVuZXIucHJpb3JpdHkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhcmd1bWVudHMubGVuZ3RoID09PSAzKXtcbiAgICAgICAgICAgICAgICBsZXQgZXZlbnROYW1lID0gYXJndW1lbnRzWzBdLFxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVyID0gYXJndW1lbnRzWzFdLFxuICAgICAgICAgICAgICAgICAgICBwcmlvcml0eSA9IGFyZ3VtZW50c1syXTtcblxuICAgICAgICAgICAgICAgIEZhY3RvcnlFdmVudEhhbmRsZXIuY3JlYXRlRXZlbnRIYW5kbGVyKEV2ZW50VGFibGUuZ2V0RXZlbnRUeXBlKGV2ZW50TmFtZSkpXG4gICAgICAgICAgICAgICAgICAgIC5vbihldmVudE5hbWUsIGhhbmRsZXIsIHByaW9yaXR5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gNCkge1xuICAgICAgICAgICAgICAgIGxldCB0YXJnZXQgPSBhcmd1bWVudHNbMF0sXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50TmFtZSA9IGFyZ3VtZW50c1sxXSxcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlciA9IGFyZ3VtZW50c1syXSxcbiAgICAgICAgICAgICAgICAgICAgcHJpb3JpdHkgPSBhcmd1bWVudHNbM107XG5cbiAgICAgICAgICAgICAgICBGYWN0b3J5RXZlbnRIYW5kbGVyLmNyZWF0ZUV2ZW50SGFuZGxlcihFdmVudFRhYmxlLmdldEV2ZW50VHlwZShldmVudE5hbWUpKVxuICAgICAgICAgICAgICAgICAgICAub24odGFyZ2V0LCBldmVudE5hbWUsIGhhbmRsZXIsIHByaW9yaXR5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBvZmYoKTp2b2lkO1xuICAgICAgICBwdWJsaWMgb2ZmKGV2ZW50TmFtZTpFdmVudE5hbWUpOnZvaWQ7XG4gICAgICAgIHB1YmxpYyBvZmYoZXZlbnROYW1lOkV2ZW50TmFtZSwgaGFuZGxlcjpGdW5jdGlvbik6dm9pZDtcbiAgICAgICAgcHVibGljIG9mZih0YXJnZXQ6R2FtZU9iamVjdCk6dm9pZDtcbiAgICAgICAgcHVibGljIG9mZih0YXJnZXQ6R2FtZU9iamVjdCwgZXZlbnROYW1lOkV2ZW50TmFtZSk6dm9pZDtcbiAgICAgICAgcHVibGljIG9mZih0YXJnZXQ6R2FtZU9iamVjdCwgZXZlbnROYW1lOkV2ZW50TmFtZSwgaGFuZGxlcjpGdW5jdGlvbik6dm9pZDtcblxuICAgICAgICBwdWJsaWMgb2ZmKCkge1xuICAgICAgICAgICAgdmFyIGV2ZW50UmVnaXN0ZXIgPSBFdmVudFJlZ2lzdGVyLmdldEluc3RhbmNlKCksXG4gICAgICAgICAgICAgICAgZXZlbnRPZmZEYXRhTGlzdDpkeUNiLkNvbGxlY3Rpb24gPSBudWxsLFxuICAgICAgICAgICAgICAgIGFyZ0FyciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG5cbiAgICAgICAgICAgIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDApe1xuICAgICAgICAgICAgICAgIGV2ZW50UmVnaXN0ZXIuZm9yRWFjaCgobGlzdDpkeUNiLkNvbGxlY3Rpb24sIGtleTpzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGV2ZW50TmFtZSA9IGV2ZW50UmVnaXN0ZXIuZ2V0RXZlbnROYW1lRnJvbUtleShrZXkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0VWlkID0gZXZlbnRSZWdpc3Rlci5nZXRVaWRGcm9tS2V5KGtleSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoIXRhcmdldFVpZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBGYWN0b3J5RXZlbnRIYW5kbGVyLmNyZWF0ZUV2ZW50SGFuZGxlcihFdmVudFRhYmxlLmdldEV2ZW50VHlwZShldmVudE5hbWUpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vZmYoZXZlbnROYW1lKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgRmFjdG9yeUV2ZW50SGFuZGxlci5jcmVhdGVFdmVudEhhbmRsZXIoRXZlbnRUYWJsZS5nZXRFdmVudFR5cGUoZXZlbnROYW1lKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vZmYodGFyZ2V0VWlkLCBldmVudE5hbWUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhcmd1bWVudHMubGVuZ3RoID09PSAxICYmIEp1ZGdlVXRpbHMuaXNTdHJpbmcoYXJndW1lbnRzWzBdKSl7XG4gICAgICAgICAgICAgICAgbGV0IGV2ZW50TmFtZSA9IGFyZ3VtZW50c1swXTtcblxuICAgICAgICAgICAgICAgIEZhY3RvcnlFdmVudEhhbmRsZXIuY3JlYXRlRXZlbnRIYW5kbGVyKEV2ZW50VGFibGUuZ2V0RXZlbnRUeXBlKGV2ZW50TmFtZSkpXG4gICAgICAgICAgICAgICAgICAgIC5vZmYoZXZlbnROYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMiAmJiBKdWRnZVV0aWxzLmlzRnVuY3Rpb24oYXJndW1lbnRzWzFdKSl7XG4gICAgICAgICAgICAgICAgbGV0IGV2ZW50TmFtZSA9IGFyZ3VtZW50c1swXSxcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlciA9IGFyZ3VtZW50c1sxXTtcblxuICAgICAgICAgICAgICAgIEZhY3RvcnlFdmVudEhhbmRsZXIuY3JlYXRlRXZlbnRIYW5kbGVyKEV2ZW50VGFibGUuZ2V0RXZlbnRUeXBlKGV2ZW50TmFtZSkpXG4gICAgICAgICAgICAgICAgICAgIC5vZmYoZXZlbnROYW1lLCBoYW5kbGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSl7XG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldCA9IGFyZ3VtZW50c1swXTtcblxuICAgICAgICAgICAgICAgIGV2ZW50UmVnaXN0ZXIuZm9yRWFjaCgobGlzdDpkeUNiLkNvbGxlY3Rpb24sIGtleTpzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGV2ZW50TmFtZSA9IGV2ZW50UmVnaXN0ZXIuZ2V0RXZlbnROYW1lRnJvbUtleShrZXkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKGV2ZW50UmVnaXN0ZXIuaXNUYXJnZXQoa2V5LCB0YXJnZXQsIGxpc3QpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIEZhY3RvcnlFdmVudEhhbmRsZXIuY3JlYXRlRXZlbnRIYW5kbGVyKEV2ZW50VGFibGUuZ2V0RXZlbnRUeXBlKGV2ZW50TmFtZSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9mZih0YXJnZXQsIGV2ZW50TmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMil7XG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldCA9IGFyZ3VtZW50c1swXSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnROYW1lID0gYXJndW1lbnRzWzFdO1xuXG4gICAgICAgICAgICAgICAgRmFjdG9yeUV2ZW50SGFuZGxlci5jcmVhdGVFdmVudEhhbmRsZXIoRXZlbnRUYWJsZS5nZXRFdmVudFR5cGUoZXZlbnROYW1lKSlcbiAgICAgICAgICAgICAgICAgICAgLm9mZih0YXJnZXQsIGV2ZW50TmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDMpe1xuICAgICAgICAgICAgICAgIGxldCB0YXJnZXQgPSBhcmd1bWVudHNbMF0sXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50TmFtZSA9IGFyZ3VtZW50c1sxXSxcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlciA9IGFyZ3VtZW50c1syXTtcblxuICAgICAgICAgICAgICAgIEZhY3RvcnlFdmVudEhhbmRsZXIuY3JlYXRlRXZlbnRIYW5kbGVyKEV2ZW50VGFibGUuZ2V0RXZlbnRUeXBlKGV2ZW50TmFtZSkpXG4gICAgICAgICAgICAgICAgICAgIC5vZmYodGFyZ2V0LCBldmVudE5hbWUsIGhhbmRsZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2RlZmluaXRpb25zLmQudHNcIi8+XG5tb2R1bGUgZHl7XG4gICAgZXhwb3J0IGNsYXNzIEZhY3RvcnlFdmVudEhhbmRsZXJ7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlRXZlbnRIYW5kbGVyKGV2ZW50VHlwZTpFdmVudFR5cGUpe1xuICAgICAgICAgICAgbGV0IGhhbmRsZXIgPSBudWxsO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50VHlwZSl7XG4gICAgICAgICAgICAgICAgY2FzZSBFdmVudFR5cGUuTU9VU0U6XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXIgPSBNb3VzZUV2ZW50SGFuZGxlci5nZXRJbnN0YW5jZSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIEV2ZW50VHlwZS5LRVlCT0FSRDpcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlciA9IEtleWJvYXJkRXZlbnRIYW5kbGVyLmdldEluc3RhbmNlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgRXZlbnRUeXBlLkNVU1RPTTpcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlciA9IEN1c3RvbUV2ZW50SGFuZGxlci5nZXRJbnN0YW5jZSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAvL3RvZG8gbW9yZSB0eXBlXG4gICAgICAgICAgICAgICAgZGVmYXVsdCA6XG4gICAgICAgICAgICAgICAgICAgIGR5Q2IuTG9nLmVycm9yKHRydWUsIGR5Q2IuTG9nLmluZm8uRlVOQ19JTlZBTElEKFwiZXZlbnRUeXBlXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBoYW5kbGVyO1xuICAgICAgICB9XG4gICAgICAgIC8vXG4gICAgICAgIC8vcHVibGljIHN0YXRpYyBjcmVhdGVFdmVudChldmVudFR5cGU6RXZlbnRUeXBlLCBldmVudE5hbWU6RXZlbnROYW1lLCBwaGFzZTpFdmVudFBoYXNlPUV2ZW50UGhhc2UuRU1JVCl7XG4gICAgICAgIC8vICAgIHZhciBldmVudE9iaiA9IG51bGw7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgIHN3aXRjaCAoZXZlbnRUeXBlKXtcbiAgICAgICAgLy8gICAgICAgIGNhc2UgRXZlbnRUeXBlLk1PVVNFOlxuICAgICAgICAvLyAgICAgICAgICAgIGV2ZW50T2JqID0gTW91c2VFdmVudC5jcmVhdGUobnVsbCwgZXZlbnROYW1lKTtcbiAgICAgICAgLy8gICAgICAgICAgICBicmVhaztcbiAgICAgICAgLy8gICAgICAgIC8vdG9kbyBtb3JlIHR5cGVcbiAgICAgICAgLy8gICAgICAgIGRlZmF1bHQgOlxuICAgICAgICAvLyAgICAgICAgICAgIGR5Q2IuTG9nLmVycm9yKHRydWUsIGR5Q2IuTG9nLmluZm8uRlVOQ19JTlZBTElEKFwiZXZlbnRUeXBlXCIpKTtcbiAgICAgICAgLy8gICAgICAgICAgICBicmVhaztcbiAgICAgICAgLy8gICAgfVxuICAgICAgICAvL1xuICAgICAgICAvLyAgICBldmVudE9iai5waGFzZSA9IHBoYXNlO1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICByZXR1cm4gZXZlbnRPYmo7XG4gICAgICAgIC8vfVxuXG4gICAgICAgIC8vcHJpdmF0ZSBzdGF0aWMgX2NyZWF0ZUFsbEV2ZW50SGFuZGxlcnMoKXtcbiAgICAgICAgLy8gICAgIHJldHVybiBkeUNiLkNvbGxlY3Rpb24uY3JlYXRlKFtNb3VzZUV2ZW50SGFuZGxlci5nZXRJbnN0YW5jZSgpXSk7XG4gICAgICAgIC8vfVxuICAgIH1cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kZWZpbml0aW9ucy5kLnRzXCIvPlxubW9kdWxlIGR5IHtcbi8vICAgIC8qIVxuLy8gICAgIGl0IGlzIGRlc2lnbmVkIGFzIHNpbmdsZXRvbiwgbm90IHN0YXRpYyBjbGFzcywgYmVjYXVzZSBpdCBuZWVkIG1haW50YWluIHN0YXRlKF9pbnN0YW5jZSBhdHRyaSkuXG4vL1xuLy9cbi8vICAgICAxPuS7gOS5iOaXtuWAmeS9v+eUqOmdmeaAgeexu+S7o+abv3NpbmdsZXRvbiA6XG4vLyAgICAg6L+Z6YeM5pyJ5Yeg5Liq5b6I5aW955qE6Z2Z5oCB57G75q+Uc2luZ2xldG9u5pu05aW955qE5bqU55So5Zy65pmvLiDmnIDln7rmnKznmoTkvovlrZDlsLHmmK/lnKhKYXZh5Lit55qEamF2YS5sYW5nLk1hdGjnsbvnmoTlrp7njrDmlrnlvI8sIE1hdGjnsbvlsLHmmK/nlKjov4fpnZnmgIHmlrnms5XmnaXlrp7njrDnmoQs6ICM5LiN5piv5Y2V5L6L5p2l5a6e546w55qELlxuLy8gICAgIOaAu+e7kyA6XG4vLyAgICAg5aaC5p6c5L2g55qEc2luZ2xldG9u5LiN5o+Q57u05oyB5Lu75L2V54q25oCBLCDku4Xku4XmmK/mj5DkvpvlhajlsYDnmoTorr/pl64gLCDov5nkuKrml7blgJnlsLHpgILlkIjnlKjpnZnmgIHnsbsgLCDov5nmoLfpgJ/luqbkuZ/mm7Tlv6ssIOWboOS4unN0YXRpYyBiaW5k5Zyo57yW6K+R5pyf6Ze0KGNvbXBpbGUgZHVyaW5nKSAuIOiusOS9j+S4jee7j+aEj+e7tOaMgeWtkOexu+eahOeKtuaAgSAsIOWwpOWFtuaYr+WcqOW5tuWPkeeahOaDheWGteS4iywg5aSa5Liq57q/56iL5bm25Y+R5L+u5pS5LOi/meWuueaYk+WvvOiHtOS4jeWuueaYk+WPkeeOsOeahHJhY2UgY29uZGl0aW9uIOWFs+S6jnJhY2UgY29uZGl0aW9uIC5cbi8vXG4vLyAgICAg6Z2Z5oCB57G76YCC55So5LqO5LiA5Lqb5bel5YW357G7ICwg5YW25LuW55qE5aaC5Y2V5Liq6K6/6Zeu6LWE5rqQ5bCx5Y+v5Lul55Soc2luZ2xldG9uLlxuLy8gICAgIDI+6Z2Z5oCB57G75ZKMc2luZ2xldG9u5LmL6Ze055qE5Yy65YirIDpcbi8vICAgICDikaAgc3RhdGlj57G75pyJ5pu05aW955qE6K6/6Zeu5pWI546HKFN0YXRpYyBjbGFzcyBwcm92aWRlcyBiZXR0ZXIgcGVyZm9ybWFuY2UgdGhhbiBTaW5nbGV0b24gcGF0dGVybiwgYmVjYXVzZSBzdGF0aWMgbWV0aG9kcyBhcmUgYm9uZGVkIG9uIGNvbXBpbGUgdGltZSlcbi8vICAgICDikaIgc2luZ2xldG9u5q+Uc3RhdGljIGNsYXNz5pu05a655piT5rWL6K+VLiDpgqPkuKrlrrnmmJPmqKHmi58obW9jayksIOWTquS4quWwseWuueaYk+a1i+ivlS4gc2luZ2xldG9u5b6I5a655piT55SoSlVuaXTmtYvor5UsIOWboOS4uuS9oOiDveWkn+S8oOmAkm1vY2vlr7nosaEsIOW9k3NpbmdsZXRvbumcgOimgeeahOaXtuWAmSjkvZzkuLrmlrnms5Xlj4LmlbDmiJbogIXmnoTpgKDlh73mlbDlj4LmlbApLFxuLy8gICAgIOKRoyDlpoLmnpzkvaDnmoTpnIDmsYLmmK/nu7TmiqQobWFpbnRhaW4p54q25oCBLCDpgqPkuYhzaW5nbGV0b27mr5RzdGF0aWMgY2xhc3Pmm7Tlpb0gLCDlpoLmnpzkvb/nlKhzdGF0aWMgY2xhc3PkvJrlh7rnjrDkuIDkupvpl67popguXG4vLyAgICAg4pGkIHNpbmdsZXRvbuaUr+aMgeW7tui/n+WKoOi9vSAsIOiAjHN0YXRpYyBjbGFzcyDliJnkuI3mlK/mjIHov5nmoLfnmoTnibnmgKcgLCDlnKjph43ph4/nuqfnmoTlr7nosaEsIOW7tui/n+WKoOi9veWwseaYvuW+l+mdnuW4uOmHjeimgS5cbi8vICAgICDikaUg5Zyo5LiA5Lqb5L6d6LWW5rOo5YWlKERlcGVuZGVuY3kgaW5qZWN0aW9uIGZyYW1ld29yaynnmoTmoYbmnrYgLCDlroPog73lpJ/lvojlpb3nmoTnrqHnkIZzaW5nbGV0b27lr7nosaEgLiDkvovlpoJTcHJpbmcuXG4vL1xuLy8gICAgIDM+c2luZ2xldG9u55u45a+55LqO6Z2Z5oCB57G755qE5LiA5Lqb6auY57qn54m554K5IDpcbi8vICAgICBzaW5nbGV0b24g5a+55LqOc3RhdGljIGNsYXNzIOS4u+imgeeahOS8mOeCueaYr+abtOWKoOmdouWQkeWvueixoSAuIOWvueS6jnNpbmdsZXRvbuS9oOWPr+S7peS9v+eUqOe7p+aJvyhJbmhlcml0YW5jZSnlkozlpJrmgIEocG9seW1vcnBoaXNtKeadpee7p+aJv+S4gOS4quWfuuexuywg5a6e546w5LiA5Liq5o6l5Y+jLCDmj5DkvpvkuI3lkIzlip/og70g55qE5a6e546wLiDkvovlpoIgLCBKYXZh5LitamF2YS5sYW5nLlJ1bnRpbWUgLOivpeexu+WwseaYr+S4gOS4qnNpbmdsZXRvbueahCwg6LCD55SoZ2V0UnVudGltZSgpLOWfuuS6juS4jeWQjOeahEpWTSAs6L+U5Zue5LiN5ZCM55qE5a6e546w5a+56LGhLCDpkojlr7nkuIDkuKrkuIDkuKpKVk0s56Gu5L+d5Y+q5pyJ5LiA5LiqUnVudGltZeWvueixoSAsIOWmguaenOS9v+eUqHN0YXRpYyBjbGFzc+WwseS4jeiDveW+iOWlveeahOadpeWunueOsOi/meagt+eahOWKn+iDveS6hiAuXG4vLyAgICAg5qyi6L+O6L2s6L29IOi9rOi9veivt+azqOaYjuWHuuWkhCA6IGh0dHA6Ly9ibG9nLmNzZG4ubmV0L2pvaG5ueTkwMTExNC9hcnRpY2xlL2RldGFpbHMvMTE5NjkwMTVcbi8vICAgICAqL1xuLy9cblxuICAgIC8vLy9zaW5nbGV0b24gY2xhc3NcbiAgICAvL3N0YXRpYyBjbGFzc1xuXG4gICAgZXhwb3J0IGNsYXNzIEV2ZW50TWFuYWdlciB7XG4gICAgICAgIC8vcHJpdmF0ZSBzdGF0aWMgc3RhdGljIF9pbnN0YW5jZTpFdmVudE1hbmFnZXIgPSBudWxsO1xuICAgICAgICAvL1xuICAgICAgICAvL3B1YmxpYyBzdGF0aWMgc3RhdGljIGdldEluc3RhbmNlKCkge1xuICAgICAgICAvLyAgICBpZiAodGhpcy5faW5zdGFuY2UgPT09IG51bGwpIHtcbiAgICAgICAgLy8gICAgICAgIHRoaXMuX2luc3RhbmNlID0gbmV3IHRoaXMoKTtcbiAgICAgICAgLy8gICAgICAgIC8vdGhpcy5faW5zdGFuY2UuaW5pdFdoZW5DcmVhdGUoKTtcbiAgICAgICAgLy8gICAgfVxuICAgICAgICAvLyAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XG4gICAgICAgIC8vfVxuXG4gICAgICAgIHByaXZhdGUgc3RhdGljIF9ldmVudEJpbmRlcjpFdmVudEJpbmRlciA9IEV2ZW50QmluZGVyLmNyZWF0ZSgpO1xuICAgICAgICBwcml2YXRlIHN0YXRpYyBfZXZlbnREaXNwYXRjaGVyOkV2ZW50RGlzcGF0Y2hlciA9IEV2ZW50RGlzcGF0Y2hlci5jcmVhdGUoKTtcblxuICAgICAgICBwdWJsaWMgc3RhdGljIG9uKGV2ZW50TmFtZTpFdmVudE5hbWUsIGhhbmRsZXI6RnVuY3Rpb24pOnZvaWQ7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgb24oZXZlbnROYW1lOkV2ZW50TmFtZSwgaGFuZGxlcjpGdW5jdGlvbiwgcHJpb3JpdHk6bnVtYmVyKTp2b2lkO1xuICAgICAgICBwdWJsaWMgc3RhdGljIG9uKGxpc3RlbmVyOnt9fEV2ZW50TGlzdGVuZXIpOnZvaWQ7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgb24odGFyZ2V0OkdhbWVPYmplY3QsIGxpc3RlbmVyOnt9fEV2ZW50TGlzdGVuZXIpOnZvaWQ7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgb24odGFyZ2V0OkdhbWVPYmplY3QsIGV2ZW50TmFtZTpFdmVudE5hbWUsIGhhbmRsZXI6RnVuY3Rpb24pOnZvaWQ7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgb24odGFyZ2V0OkdhbWVPYmplY3QsIGV2ZW50TmFtZTpFdmVudE5hbWUsIGhhbmRsZXI6RnVuY3Rpb24sIHByaW9yaXR5Om51bWJlcik6dm9pZDtcblxuICAgICAgICBwdWJsaWMgc3RhdGljIG9uKGFyZ3MpIHtcbiAgICAgICAgICAgIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpe1xuICAgICAgICAgICAgICAgIGxldCBsaXN0ZW5lciA9IGFyZ3VtZW50c1swXTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50QmluZGVyLm9uKGxpc3RlbmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMiAmJiBKdWRnZVV0aWxzLmlzU3RyaW5nKGFyZ3VtZW50c1swXSkgJiYgSnVkZ2VVdGlscy5pc0Z1bmN0aW9uKGFyZ3VtZW50c1sxXSkpe1xuICAgICAgICAgICAgICAgIGxldCBldmVudE5hbWUgPSBhcmd1bWVudHNbMF0sXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXIgPSBhcmd1bWVudHNbMV0sXG4gICAgICAgICAgICAgICAgICAgIHByaW9yaXR5ID0gMTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50QmluZGVyLm9uKGV2ZW50TmFtZSwgaGFuZGxlciwgcHJpb3JpdHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhcmd1bWVudHMubGVuZ3RoID09PSAyKXtcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0ID0gYXJndW1lbnRzWzBdLFxuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lciA9IGFyZ3VtZW50c1sxXTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50QmluZGVyLm9uKHRhcmdldCwgbGlzdGVuZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhcmd1bWVudHMubGVuZ3RoID09PSAzICYmIEp1ZGdlVXRpbHMuaXNTdHJpbmcoYXJndW1lbnRzWzBdKSAmJiBKdWRnZVV0aWxzLmlzRnVuY3Rpb24oYXJndW1lbnRzWzFdKSAmJiBKdWRnZVV0aWxzLmlzTnVtYmVyKGFyZ3VtZW50c1syXSkpe1xuICAgICAgICAgICAgICAgIGxldCBldmVudE5hbWUgPSBhcmd1bWVudHNbMF0sXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXIgPSBhcmd1bWVudHNbMV0sXG4gICAgICAgICAgICAgICAgICAgIHByaW9yaXR5ID0gYXJndW1lbnRzWzJdO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRCaW5kZXIub24oZXZlbnROYW1lLCBoYW5kbGVyLCBwcmlvcml0eSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDMgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gNCl7XG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldCA9IGFyZ3VtZW50c1swXSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnROYW1lID0gYXJndW1lbnRzWzFdLFxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVyID0gYXJndW1lbnRzWzJdLFxuICAgICAgICAgICAgICAgICAgICBwcmlvcml0eSA9IGFyZ3VtZW50c1szXSA9PT0gdW5kZWZpbmVkPyAxIDphcmd1bWVudHNbM107XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9ldmVudEJpbmRlci5vbih0YXJnZXQsIGV2ZW50TmFtZSwgaGFuZGxlciwgcHJpb3JpdHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHN0YXRpYyBvZmYoKTp2b2lkO1xuICAgICAgICBwdWJsaWMgc3RhdGljIG9mZihldmVudE5hbWU6RXZlbnROYW1lKTp2b2lkO1xuICAgICAgICBwdWJsaWMgc3RhdGljIG9mZihldmVudE5hbWU6RXZlbnROYW1lLCBoYW5kbGVyOkZ1bmN0aW9uKTp2b2lkO1xuICAgICAgICBwdWJsaWMgc3RhdGljIG9mZih0YXJnZXQ6R2FtZU9iamVjdCk6dm9pZDtcbiAgICAgICAgcHVibGljIHN0YXRpYyBvZmYodGFyZ2V0OkdhbWVPYmplY3QsIGV2ZW50TmFtZTpFdmVudE5hbWUpOnZvaWQ7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgb2ZmKHRhcmdldDpHYW1lT2JqZWN0LCBldmVudE5hbWU6RXZlbnROYW1lLCBoYW5kbGVyOkZ1bmN0aW9uKTp2b2lkO1xuXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgb2ZmKCkge1xuICAgICAgICAgICAgdGhpcy5fZXZlbnRCaW5kZXIub2ZmLmFwcGx5KFxuICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50QmluZGVyLFxuICAgICAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc3RhdGljIHRyaWdnZXIoZXZlbnQ6RXZlbnQpOnZvaWQ7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdHJpZ2dlcihldmVudDpFdmVudCwgdXNlckRhdGE6YW55KTp2b2lkO1xuICAgICAgICBwdWJsaWMgc3RhdGljIHRyaWdnZXIodGFyZ2V0OkdhbWVPYmplY3QsIGV2ZW50OkV2ZW50KTp2b2lkO1xuICAgICAgICBwdWJsaWMgc3RhdGljIHRyaWdnZXIodGFyZ2V0OkdhbWVPYmplY3QsIGV2ZW50OkV2ZW50LCB1c2VyRGF0YTphbnkpOnZvaWQ7XG5cbiAgICAgICAgcHVibGljIHN0YXRpYyB0cmlnZ2VyKGFyZ3MpIHtcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50RGlzcGF0Y2hlci50cmlnZ2VyLmFwcGx5KHRoaXMuX2V2ZW50RGlzcGF0Y2hlciwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc3RhdGljIGJyb2FkY2FzdCh0YXJnZXQ6R2FtZU9iamVjdCwgZXZlbnQ6RXZlbnQsIHVzZXJEYXRhPzphbnkpIHtcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50RGlzcGF0Y2hlci5icm9hZGNhc3QuYXBwbHkodGhpcy5fZXZlbnREaXNwYXRjaGVyLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZW1pdCh0YXJnZXQ6R2FtZU9iamVjdCwgZXZlbnQ6RXZlbnQsIHVzZXJEYXRhPzphbnkpIHtcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50RGlzcGF0Y2hlci5lbWl0LmFwcGx5KHRoaXMuX2V2ZW50RGlzcGF0Y2hlciwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc3RhdGljIGZyb21FdmVudChldmVudE5hbWU6RXZlbnROYW1lKTphbnk7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZnJvbUV2ZW50KGV2ZW50TmFtZTpFdmVudE5hbWUsIHByaW9yaXR5Om51bWJlcik6YW55O1xuICAgICAgICBwdWJsaWMgc3RhdGljIGZyb21FdmVudCh0YXJnZXQ6R2FtZU9iamVjdCwgZXZlbnROYW1lOkV2ZW50TmFtZSk6YW55O1xuICAgICAgICBwdWJsaWMgc3RhdGljIGZyb21FdmVudCh0YXJnZXQ6R2FtZU9iamVjdCwgZXZlbnROYW1lOkV2ZW50TmFtZSwgcHJpb3JpdHk6bnVtYmVyKTphbnk7XG5cbiAgICAgICAgcHVibGljIHN0YXRpYyBmcm9tRXZlbnQoYXJncykge1xuICAgICAgICAgICAgdmFyIGFkZEhhbmRsZXIgPSBudWxsLFxuICAgICAgICAgICAgICAgIHJlbW92ZUhhbmRsZXIgPSBudWxsO1xuXG4gICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGxldCBldmVudE5hbWUgPSBhcmd1bWVudHNbMF07XG5cbiAgICAgICAgICAgICAgICBhZGRIYW5kbGVyID0gZnVuY3Rpb24gKGhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLm9uKGV2ZW50TmFtZSwgaGFuZGxlcik7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZW1vdmVIYW5kbGVyID0gZnVuY3Rpb24gKGhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLm9mZihldmVudE5hbWUsIGhhbmRsZXIpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyICYmIEp1ZGdlVXRpbHMuaXNOdW1iZXIoYXJndW1lbnRzWzFdKSkge1xuICAgICAgICAgICAgICAgIGxldCBldmVudE5hbWUgPSBhcmd1bWVudHNbMF0sXG4gICAgICAgICAgICAgICAgICAgIHByaW9yaXR5ID0gYXJndW1lbnRzWzFdO1xuXG4gICAgICAgICAgICAgICAgYWRkSGFuZGxlciA9IGZ1bmN0aW9uIChoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIEV2ZW50TWFuYWdlci5vbihldmVudE5hbWUsIGhhbmRsZXIsIHByaW9yaXR5KTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJlbW92ZUhhbmRsZXIgPSBmdW5jdGlvbiAoaGFuZGxlcikge1xuICAgICAgICAgICAgICAgICAgICBFdmVudE1hbmFnZXIub2ZmKGV2ZW50TmFtZSwgaGFuZGxlcik7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0ID0gYXJndW1lbnRzWzBdLFxuICAgICAgICAgICAgICAgICAgICBldmVudE5hbWUgPSBhcmd1bWVudHNbMV07XG5cbiAgICAgICAgICAgICAgICBhZGRIYW5kbGVyID0gZnVuY3Rpb24gKGhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLm9uKHRhcmdldCwgZXZlbnROYW1lLCBoYW5kbGVyKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJlbW92ZUhhbmRsZXIgPSBmdW5jdGlvbiAoaGFuZGxlcikge1xuICAgICAgICAgICAgICAgICAgICBFdmVudE1hbmFnZXIub2ZmKHRhcmdldCwgZXZlbnROYW1lLCBoYW5kbGVyKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMykge1xuICAgICAgICAgICAgICAgIGxldCB0YXJnZXQgPSBhcmd1bWVudHNbMF0sXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50TmFtZSA9IGFyZ3VtZW50c1sxXSxcbiAgICAgICAgICAgICAgICAgICAgcHJpb3JpdHkgPSBhcmd1bWVudHNbMl07XG5cbiAgICAgICAgICAgICAgICBhZGRIYW5kbGVyID0gZnVuY3Rpb24gKGhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLm9uKHRhcmdldCwgZXZlbnROYW1lLCBoYW5kbGVyLCBwcmlvcml0eSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZW1vdmVIYW5kbGVyID0gZnVuY3Rpb24gKGhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLm9mZih0YXJnZXQsIGV2ZW50TmFtZSwgaGFuZGxlcik7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGR5UnQuZnJvbUV2ZW50UGF0dGVybihhZGRIYW5kbGVyLCByZW1vdmVIYW5kbGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc2V0QnViYmxlUGFyZW50KHRhcmdldDpHYW1lT2JqZWN0LCBwYXJlbnQ6YW55KSB7XG4gICAgICAgICAgICBFdmVudFJlZ2lzdGVyLmdldEluc3RhbmNlKCkuc2V0QnViYmxlUGFyZW50KHRhcmdldCwgcGFyZW50KTtcbiAgICAgICAgICAgIC8vdGhpcy5fZXZlbnREaXNwYXRjaGVyLnNldEJ1YmJsZVBhcmVudCh0YXJnZXQsIHBhcmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICAvL3B1YmxpYyBzdGF0aWMgcmVtb3ZlKHRhcmdldDpHYW1lT2JqZWN0KSB7XG4gICAgICAgIC8vICAgIHRoaXMuX2V2ZW50QmluZGVyLnJlbW92ZSh0YXJnZXQpO1xuICAgICAgICAvL31cblxuICAgICAgICAvL3RvZG8gYWRkIGdldExpc3RlbmVyQ291bnQodGFyZ2V0LCB0eXBlKSBtZXRob2RcbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZGVmaW5pdGlvbnMuZC50c1wiLz5cbm1vZHVsZSBkeSB7XG4gICAgZXhwb3J0IGNsYXNzIEdhbWVPYmplY3Qge1xuICAgICAgICBwcml2YXRlIHN0YXRpYyBfY291bnQ6bnVtYmVyID0gMTtcblxuICAgICAgICBwcml2YXRlIF91aWQ6bnVtYmVyID0gbnVsbDtcbiAgICAgICAgZ2V0IHVpZCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl91aWQ7XG4gICAgICAgIH1cblxuICAgICAgICBzZXQgdWlkKHVpZDpudW1iZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX3VpZCA9IHVpZDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vdG9kbyBhZGQgbWVzaCxzY2VuZSBwb3NpdGlvbiDnoJTnqbZ0aHJlZWpzLT5keW5hbWlj77yM55yL5aaC5L2V6KGo56S6cG9zaXRpb25cbiAgICAgICAgcHJpdmF0ZSBfcG9zaXRpb246UG9zaXRpb24gPSBudWxsO1xuICAgICAgICBnZXQgcG9zaXRpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcG9zaXRpb247XG4gICAgICAgIH1cblxuICAgICAgICBzZXQgcG9zaXRpb24ocG9zaXRpb246UG9zaXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuX3Bvc2l0aW9uID0gcG9zaXRpb247XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9wYXJlbnQ6R2FtZU9iamVjdCA9IG51bGw7XG4gICAgICAgIGdldCBwYXJlbnQoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcGFyZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0IHBhcmVudChwYXJlbnQ6R2FtZU9iamVjdCkge1xuICAgICAgICAgICAgdGhpcy5fcGFyZW50ID0gcGFyZW50O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBwcml2YXRlIF9idWJibGVQYXJlbnQ6R2FtZU9iamVjdCA9IG51bGw7XG4gICAgICAgIGdldCBidWJibGVQYXJlbnQoKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9idWJibGVQYXJlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IGJ1YmJsZVBhcmVudChidWJibGVQYXJlbnQ6R2FtZU9iamVjdCl7XG4gICAgICAgICAgICB0aGlzLl9idWJibGVQYXJlbnQgPSBidWJibGVQYXJlbnQ7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9jaGlsZHJlbjpkeUNiLkNvbGxlY3Rpb24gPSBkeUNiLkNvbGxlY3Rpb24uY3JlYXRlKCk7XG5cbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICB0aGlzLl91aWQgPSBHYW1lT2JqZWN0Ll9jb3VudDtcbiAgICAgICAgICAgIEdhbWVPYmplY3QuX2NvdW50ICs9IDE7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgaW5pdCgpIHtcbiAgICAgICAgICAgIGR5Q2IuTG9nLmVycm9yKHRydWUsIGR5Q2IuTG9nLmluZm8uQUJTVFJBQ1RfTUVUSE9EKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIVxuICAgICAgICAgdmlydHVhbFxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGRpc3Bvc2UoKSB7XG4gICAgICAgICAgICB0aGlzLnBhcmVudCA9IG51bGw7XG4gICAgICAgICAgICBFdmVudE1hbmFnZXIub2ZmKHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyohXG4gICAgICAgICBob29rIG1ldGhvZFxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIG9uRW50ZXIoKSB7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgb25TdGFydExvb3AoKSB7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgb25FbmRMb29wKCkge1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIG9uRXhpdCgpIHtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBoYXNDaGlsZChjaGlsZDpHYW1lT2JqZWN0KTpib29sZWFuIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jaGlsZHJlbi5oYXNDaGlsZChjaGlsZCk7XG4gICAgICAgIH1cblxuICAgICAgICAvL3B1YmxpYyBhZGRDaGlsZChjaGlsZDpHYW1lT2JqZWN0LCBzb3J0OmJvb2xlYW49dHJ1ZSk6Ym9vbGVhbiB7XG4gICAgICAgIHB1YmxpYyBhZGRDaGlsZChjaGlsZDpHYW1lT2JqZWN0KTpHYW1lT2JqZWN0IHtcbiAgICAgICAgICAgIC8vbmVlZCB1c2VyIGp1ZGdlIGl0IVxuICAgICAgICAgICAgLy9pZih0aGlzLl9jaGlsZHJlbi5oYXNDaGlsZChjaGlsZCkpIHtcbiAgICAgICAgICAgIC8vICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIC8vfVxuXG4gICAgICAgICAgICBpZiAoY2hpbGQucGFyZW50KSB7XG4gICAgICAgICAgICAgICAgLy93aWxsIHJlbW92ZSBiaW5kIGV2ZW50LHJlbW92ZSBmcm9tIHBhcmVudCAuLi5cbiAgICAgICAgICAgICAgICBjaGlsZC5yZW1vdmVNZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjaGlsZC5wYXJlbnQgPSB0aGlzO1xuXG5cbiAgICAgICAgICAgIC8vY2hpbGQuZGlzcGF0Y2hFdmVudChuZXcgQ29yZUV2ZW50KCdiZWZvcmVhZGQnLCBmYWxzZSwge1xuICAgICAgICAgICAgLy8gICAgcGFyZW50OiB0aGlzXG4gICAgICAgICAgICAvL30pKTtcblxuXG4gICAgICAgICAgICB0aGlzLl9jaGlsZHJlbi5hZGRDaGlsZChjaGlsZCk7XG5cbiAgICAgICAgICAgIC8vaWYoc29ydCkge1xuXG5cbiAgICAgICAgICAgIC8qIVxuICAgICAgICAgICAgc29ydCB3aGVuIGFkZCBjaGlsZC9jaGlsZHJlbiwgbm90IHdoZW4gZ2V0IGNoaWxkcmVuLlxuICAgICAgICAgICAgYmVjYXVzZSBlYWNoIGxvb3Agd2lsbCBnZXQgY2hpbGRyZW4odG8gcmVuZGVyKSwgc28gaWYgdXNpbmcgdGhlIGxhdHRlciwgZWFjaCBsb29wIHNob3VsZCBzb3J0IVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgdGhpcy5zb3J0KCk7XG4gICAgICAgICAgICAvL31cbiAgICAgICAgICAgIC8vY2hpbGQuX3BhcmVudCA9IHRoaXM7XG4gICAgICAgICAgICAvL2NoaWxkLnNldEJ1YmJsZVBhcmVudCh0aGlzKTtcbiAgICAgICAgICAgIC8vY2hpbGQuX3RyYW5zZm9ybS5kaXJ0eSA9IHRydWU7XG4gICAgICAgICAgICAvL2NoaWxkLmRpc3BhdGNoRXZlbnQobmV3IENvcmVFdmVudCgnYWRkJywgZmFsc2UpKTtcbiAgICAgICAgICAgIC8vdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBDb3JlRXZlbnQoJ2NoaWxkYWRkJywgZmFsc2UsIHtcbiAgICAgICAgICAgIC8vICAgIGNoaWxkOiBjaGlsZFxuICAgICAgICAgICAgLy99KSk7XG5cblxuICAgICAgICAgICAgY2hpbGQuaW5pdCgpO1xuICAgICAgICAgICAgY2hpbGQub25FbnRlcigpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBnZXRDaGlscmVuKCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY2hpbGRyZW47XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc29ydCgpe1xuICAgICAgICAgICAgdGhpcy5fY2hpbGRyZW4uc29ydCh0aGlzLl9hc2NlbmRaKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgZm9yRWFjaChmdW5jOkZ1bmN0aW9uKXtcbiAgICAgICAgICAgIHRoaXMuX2NoaWxkcmVuLmZvckVhY2goZnVuYyk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHJlbW92ZUNoaWxkKGNoaWxkOkdhbWVPYmplY3QpOkdhbWVPYmplY3Qge1xuICAgICAgICAgICAgY2hpbGQub25FeGl0KCk7XG5cbiAgICAgICAgICAgIHRoaXMuX2NoaWxkcmVuLnJlbW92ZUNoaWxkKGNoaWxkKTtcbiAgICAgICAgICAgIC8vdmFyIGlkeCA9IHRoaXMuX2NoaWxkcmVuLmluZGV4T2YoY2hpbGQpO1xuICAgICAgICAgICAgLy9pZihpZHggIT09IC0xKSB7XG4gICAgICAgICAgICAvLyAgICBjaGlsZC5kaXNwYXRjaEV2ZW50KG5ldyBDb3JlRXZlbnQoJ2JlZm9yZXJlbW92ZScsIGZhbHNlKSk7XG4gICAgICAgICAgICAvLyAgICB0aGlzLl9jaGlsZHJlbi5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAgIGNoaWxkLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIC8vY2hpbGQuc2V0QnViYmxlUGFyZW50KG51bGwpO1xuICAgICAgICAgICAgLy8gICAgY2hpbGQuZGlzcGF0Y2hFdmVudChuZXcgQ29yZUV2ZW50KCdyZW1vdmUnLCBmYWxzZSwge1xuICAgICAgICAgICAgLy8gICAgICAgIHBhcmVudDogdGhpc1xuICAgICAgICAgICAgLy8gICAgfSkpO1xuICAgICAgICAgICAgLy8gICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBDb3JlRXZlbnQoJ2NoaWxkcmVtb3ZlJywgZmFsc2UsIHtcbiAgICAgICAgICAgIC8vICAgICAgICBjaGlsZDogY2hpbGRcbiAgICAgICAgICAgIC8vICAgIH0pKTtcbiAgICAgICAgICAgIC8vICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgLy99XG4gICAgICAgICAgICAvL3JldHVybiBmYWxzZTtcblxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiByZW1vdmUgdGhpcyBnYW1lIG9iamVjdCBmcm9tIHBhcmVudC5cbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgcmVtb3ZlTWUoKTpHYW1lT2JqZWN0IHtcbiAgICAgICAgICAgIHZhciBwYXJlbnQgPSB0aGlzLl9wYXJlbnQ7XG5cbiAgICAgICAgICAgIHBhcmVudCAmJiBwYXJlbnQucmVtb3ZlQ2hpbGQodGhpcyk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGdldFRvcFVuZGVyUG9pbnQocG9pbnQ6UG9pbnQpOkdhbWVPYmplY3Qge1xuICAgICAgICAgICAgLy92YXIgZm91bmQsIGxvY2FsUCwgY2hpbGQ7XG4gICAgICAgICAgICAvL3ZhciBjaGlsZHJlbkFycjtcbiAgICAgICAgICAgIC8vaWYoIXRoaXMuX2FjdGl2ZSB8fCAhdGhpcy5fdmlzaWJsZSkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAvL2lmKHRoaXMuX2ludGVyYWN0aXZlUmVjdCkge1xuICAgICAgICAgICAgLy8gICAgbG9jYWxQID0gdGhpcy50cmFuc2Zvcm0uZ2xvYmFsVG9Mb2NhbCh4LCB5KTtcbiAgICAgICAgICAgIC8vICAgIGlmKCF0aGlzLl9pbnRlcmFjdGl2ZVJlY3QuY29udGFpbnNYWShsb2NhbFAueCwgbG9jYWxQLnkpKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAvLyAgICB9XG4gICAgICAgICAgICAvL31cbiAgICAgICAgICAgIC8vY2hpbGRyZW5BcnIgPSB0aGlzLl9jaGlsZHJlbjtcbiAgICAgICAgICAgIC8vaWYoY2hpbGRyZW5BcnIubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy8gICAgZm9yKHZhciBpPWNoaWxkcmVuQXJyLmxlbmd0aC0xOyBpPj0wOyBpLS0pIHtcbiAgICAgICAgICAgIC8vICAgICAgICBjaGlsZCA9IGNoaWxkcmVuQXJyW2ldO1xuICAgICAgICAgICAgLy8gICAgICAgIGZvdW5kID0gY2hpbGQuZ2V0VW5kZXJQb2ludCh4LCB5LCB0b3VjaGFibGUpO1xuICAgICAgICAgICAgLy8gICAgICAgIGlmKGZvdW5kKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHJldHVybiBmb3VuZDtcbiAgICAgICAgICAgIC8vICAgICAgICB9XG4gICAgICAgICAgICAvLyAgICB9XG4gICAgICAgICAgICAvL31cbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvL2lmKCF0b3VjaGFibGUgfHwgdGhpcy5fdG91Y2hhYmxlKSB7XG4gICAgICAgICAgICAvLyAgICBpZighbG9jYWxQKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgbG9jYWxQID0gdGhpcy50cmFuc2Zvcm0uZ2xvYmFsVG9Mb2NhbCh4LCB5KTtcbiAgICAgICAgICAgIC8vICAgIH1cbiAgICAgICAgICAgIC8vICAgIGlmKHRoaXMudGVzdEhpdChsb2NhbFAueCwgbG9jYWxQLnkpKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAvLyAgICB9XG4gICAgICAgICAgICAvL31cbiAgICAgICAgICAgIC8vcmV0dXJuIG51bGw7XG5cbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBudWxsLFxuICAgICAgICAgICAgICAgIGkgPSBudWxsLFxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOmR5Q2IuQ29sbGVjdGlvbiA9IG51bGwsXG4gICAgICAgICAgICAgICAgbGVuID0gdGhpcy5fY2hpbGRyZW4uZ2V0Q291bnQoKTtcblxuICAgICAgICAgICAgY2hpbGRyZW4gPSB0aGlzLl9jaGlsZHJlbjtcbiAgICAgICAgICAgIGlmKGxlbiA+IDApIHtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSBsZW4gLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSBjaGlsZHJlbi5nZXRDaGlsZChpKTtcblxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBjaGlsZC5nZXRUb3BVbmRlclBvaW50KHBvaW50KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYodGhpcy5pc0hpdChwb2ludCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgaXNIaXQobG9jYXRpb25JblZpZXc6UG9pbnQpOmJvb2xlYW4ge1xuICAgICAgICAgICAgLy90b2RvIGV4dHJhY3QgY29sbGlkZXI/XG4gICAgICAgICAgICAvL3ZhciBjb2xsaWRlcjpDb2xsaWRlciA9IHRoaXMuX2NvbGxpZGVyO1xuICAgICAgICAgICAgLy9yZXR1cm4gY29sbGlkZXIgJiYgY29sbGlkZXIuY29sbGlkZVhZKGxvY2FsWCwgbG9jYWxZKTtcblxuXG4gICAgICAgICAgICAvL3ZhciBSQU5HRSA9IDEwO1xuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vcmV0dXJuIE1hdGguYWJzKHRoaXMuX3Bvc2l0aW9uLnggLSBsb2NhdGlvbkluVmlldy54KSA8IFJBTkdFXG4gICAgICAgICAgICAvLyYmIE1hdGguYWJzKHRoaXMuX3Bvc2l0aW9uLnkgLSBsb2NhdGlvbkluVmlldy55KSA8IFJBTkdFO1xuXG5cbiAgICAgICAgICAgIC8vdG9kbyBjb21wbGV0ZSB0aGlzIGFmdGVyIGFkZGluZyBwb3NpdGlvblxuICAgICAgICAgICAgaWYobG9jYXRpb25JblZpZXcpe1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9hc2NlbmRaKGE6R2FtZU9iamVjdCwgYjpHYW1lT2JqZWN0KXtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGEucG9zaXRpb24ueiAtIGIucG9zaXRpb24uejtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kZWZpbml0aW9ucy5kLnRzXCIvPlxubW9kdWxlIGR5e1xuICAgIGV4cG9ydCBjbGFzcyBNZXNoIGV4dGVuZHMgR2FtZU9iamVjdHtcbiAgICAgICAgLy90b2RvIHB1c2gscG9wIG1hdHJpeCwgc28gbmVlZCBjaGFuZ2UgcG9zLCByb3RhdGUgYW5nbGUsIHNjYWxlIGluc3RlYWQgb2YgY2hhbmdpbmcgbWF0cml4IVxuICAgICAgICAvL3doZW4gbmVlZCBwdXNoLHBvcCBtYXRyaXg/XG5cbiAgICAgICAgLy90b2RvIHVzZSBjb21wb25lbnQgYXJjaGl0ZWN0dXJlLCBkZWxldGUgTWVzaCwgbWFrZSBHZW9tZXRyeSxNYXRlcmlhbCB0byBiZSBjb21wb25lbnRcblxuICAgICAgICAvL3RvZG8gYmUgTWF0ZXJpYWwoYWRkIGJhc2VDbGFzcyBNYXRlcmlhbClcbiAgICAgICAgcHVibGljIHN0YXRpYyBjcmVhdGUoZ2VtbzpHZW9tZXRyeSk6TWVzaCB7XG4gICAgICAgICAgICB2YXIgb2JqID0gbmV3IHRoaXMoZ2Vtbyk7XG5cbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9tYXRyaXg6TWF0cml4ID0gTWF0cml4LmNyZWF0ZSgpO1xuICAgICAgICBnZXQgbWF0cml4KCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbWF0cml4O1xuICAgICAgICB9XG4gICAgICAgIHNldCBtYXRyaXgobWF0cml4Ok1hdHJpeCl7XG4gICAgICAgICAgICB0aGlzLl9tYXRyaXggPSBtYXRyaXg7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9nZW1vOkdlb21ldHJ5ID0gbnVsbDtcbiAgICAgICAgcHJpdmF0ZSBfYWN0aW9uTWFuYWdlcjpBY3Rpb25NYW5hZ2VyID0gQWN0aW9uTWFuYWdlci5jcmVhdGUoKTtcblxuICAgICAgICBjb25zdHJ1Y3RvcihnZW1vOkdlb21ldHJ5KXtcbiAgICAgICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgICAgIHRoaXMuX2dlbW8gPSBnZW1vO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHJ1bkFjdGlvbihhY3Rpb246QWN0aW9uKXtcbiAgICAgICAgICAgdGhpcy5fYWN0aW9uTWFuYWdlci5hZGRDaGlsZChhY3Rpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHVwZGF0ZSgpe1xuICAgICAgICAgICAgdGhpcy5fYWN0aW9uTWFuYWdlci51cGRhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBkcmF3KCl7XG4gICAgICAgICAgICB0aGlzLl9hZGREcmF3Q29tbWFuZCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGluaXQoKXtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24gPSBQb3NpdGlvbi5jcmVhdGUoMCwgMCwgMCk7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9hZGREcmF3Q29tbWFuZCgpe1xuICAgICAgICAgICAgdmFyIHJlbmRlcmVyID0gRGlyZWN0b3IuZ2V0SW5zdGFuY2UoKS5yZW5kZXJlcixcbiAgICAgICAgICAgICAgICBxdWFkQ21kID0gcmVuZGVyZXIuY3JlYXRlUXVhZENvbW1hbmQoKTtcblxuICAgICAgICAgICAgcXVhZENtZC5idWZmZXJzID0ge1xuICAgICAgICAgICAgICAgIHZlcnRleEJ1ZmZlcjogdGhpcy5fZ2Vtby52ZXJ0aWNlcyxcbiAgICAgICAgICAgICAgICAvL3RleENvb3JkczogdGhpcy5fZ2Vtby50ZXhDb29yZHMsXG4gICAgICAgICAgICAgICAgLy9ub3JtYWxzOiB0aGlzLl9nZW1vLm5vcm1hbHMsXG4gICAgICAgICAgICAgICAgaW5kZXhCdWZmZXI6IHRoaXMuX2dlbW8uaW5kaWNlcyxcbiAgICAgICAgICAgICAgICBjb2xvckJ1ZmZlcjogdGhpcy5fZ2Vtby5jb2xvcnNcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAvL3F1YWRDbWQuYnVmZmVyRGF0YSA9IDtcbiAgICAgICAgICAgIC8vcXVhZENtZC5jb2xvciA9IHRoaXMuX21hdGVyaWFsLmNvbG9yO1xuXG4gICAgICAgICAgICByZW5kZXJlci5hZGRDb21tYW5kKHF1YWRDbWQpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RlZmluaXRpb25zLmQudHNcIi8+XG5tb2R1bGUgZHkge1xuICAgIGV4cG9ydCBjbGFzcyBTY2VuZSBleHRlbmRzIEdhbWVPYmplY3R7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKGNhbWVyYTpDYW1lcmEsIHZzU291cmNlOnN0cmluZywgZnNTb3VyY2U6c3RyaW5nKSB7XG4gICAgICAgICAgICB2YXIgb2JqID0gbmV3IHRoaXMoY2FtZXJhKTtcblxuICAgICAgICAgICAgb2JqLmluaXRXaGVuQ3JlYXRlKHZzU291cmNlLCBmc1NvdXJjZSk7XG5cbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH1cblxuICAgICAgICAvL3ByaXZhdGUgX21lc2hlczpkeUNiLkNvbGxlY3Rpb24gPSBkeUNiLkNvbGxlY3Rpb24uY3JlYXRlKCk7XG5cbiAgICAgICAgcHJpdmF0ZSBfY2FtZXJhOkNhbWVyYSA9IG51bGw7XG4gICAgICAgIGdldCBjYW1lcmEoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY2FtZXJhO1xuICAgICAgICB9XG4gICAgICAgIHNldCBjYW1lcmEoY2FtZXJhOkNhbWVyYSkge1xuICAgICAgICAgICAgdGhpcy5fY2FtZXJhID0gY2FtZXJhO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfcHJvZ3JhbTpQcm9ncmFtID0gbnVsbDtcbiAgICAgICAgZ2V0IHByb2dyYW0oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcHJvZ3JhbTtcbiAgICAgICAgfVxuICAgICAgICBzZXQgcHJvZ3JhbShwcm9ncmFtOlByb2dyYW0pIHtcbiAgICAgICAgICAgIHRoaXMuX3Byb2dyYW0gPSBwcm9ncmFtO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3RydWN0b3IoY2FtZXJhKSB7XG4gICAgICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgICAgICB0aGlzLl9jYW1lcmEgPSBjYW1lcmE7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgaW5pdFdoZW5DcmVhdGUodnNTb3VyY2U6c3RyaW5nLCBmc1NvdXJjZTpzdHJpbmcpe1xuICAgICAgICAgICAgdGhpcy5fcHJvZ3JhbSA9IFByb2dyYW0uY3JlYXRlKHZzU291cmNlLCBmc1NvdXJjZSlcbiAgICAgICAgfVxuXG4gICAgICAgIC8vcHVibGljIGFkZChtZXNoZXNBcnI6TWVzaFtdKSB7XG4gICAgICAgIC8vICAgIHRoaXMuX21lc2hlcy5hZGRDaGlsZHJlbihtZXNoZXNBcnIpO1xuICAgICAgICAvL31cblxuICAgICAgICBwdWJsaWMgcnVuKCkge1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgICAgICB0aGlzLl9jYW1lcmEucHVzaE1hdHJpeCgpO1xuICAgICAgICAgICAgdGhpcy5fY2FtZXJhLm9uU3RhcnRMb29wKCk7XG5cbiAgICAgICAgICAgIHRoaXMuX2NhbWVyYS5ydW4oKTtcblxuICAgICAgICAgICAgdGhpcy5fcHJvZ3JhbS51c2UoKTtcblxuICAgICAgICAgICAgdGhpcy5mb3JFYWNoKChtZXNoKT0+IHtcbiAgICAgICAgICAgICAgICBzZWxmLl9zZXREYXRhKG1lc2gpO1xuXG4gICAgICAgICAgICAgICAgbWVzaC51cGRhdGUoKTtcblxuICAgICAgICAgICAgICAgIG1lc2guZHJhdygpO1xuICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgdGhpcy5fY2FtZXJhLm9uRW5kTG9vcCgpO1xuICAgICAgICAgICAgdGhpcy5fY2FtZXJhLnBvcE1hdHJpeCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGluaXQoKXtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24gPSBQb3NpdGlvbi5jcmVhdGUoMCwgMCwgMCk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHByaXZhdGUgX3NldERhdGEobWVzaCl7XG4gICAgICAgICAgICB0aGlzLl9wcm9ncmFtLnNldFVuaWZvcm1EYXRhKFwidV9tdnBNYXRyaXhcIiwgVW5pZm9ybURhdGFUeXBlLkZMT0FUX01BVDQsIHRoaXMuX2NvbXB1dGVNdnBNYXRyaXgobWVzaCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfY29tcHV0ZU12cE1hdHJpeChtZXNoKTpNYXRyaXh7XG4gICAgICAgICAgICByZXR1cm4gbWVzaC5tYXRyaXguY29weSgpLmFwcGx5TWF0cml4KHRoaXMuX2NhbWVyYS5jb21wdXRlVnBNYXRyaXgoKSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZGVmaW5pdGlvbnMuZC50c1wiLz5cbm1vZHVsZSBkeXtcblxuICAgIGV4cG9ydCBjbGFzcyBEaXJlY3RvcntcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOkRpcmVjdG9yID0gbnVsbDtcblxuICAgICAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2luc3RhbmNlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UgPSBuZXcgdGhpcygpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmluaXRXaGVuQ3JlYXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XG4gICAgICAgIH1cblxuICAgICAgICAvL3RvZG8gOlJlbmRlcmVyXG4gICAgICAgIHByaXZhdGUgX3JlbmRlcmVyOldlYkdMUmVuZGVyZXIgPSBudWxsO1xuICAgICAgICBnZXQgcmVuZGVyZXIoKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZW5kZXJlcjtcbiAgICAgICAgfVxuICAgICAgICBzZXQgcmVuZGVyZXIocmVuZGVyZXI6V2ViR0xSZW5kZXJlcil7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlciA9IHJlbmRlcmVyO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfdmlldzpJVmlldyA9IG51bGw7XG4gICAgICAgIGdldCB2aWV3KCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdmlldztcbiAgICAgICAgfVxuICAgICAgICBzZXQgdmlldyh2aWV3OklWaWV3KXtcbiAgICAgICAgICAgIHRoaXMuX3ZpZXcgPSB2aWV3O1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfZ2w6YW55ID0gbnVsbDtcbiAgICAgICAgZ2V0IGdsKCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2w7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IGdsKGdsOmFueSl7XG4gICAgICAgICAgICB0aGlzLl9nbCA9IGdsO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfc2NlbmU6U2NlbmUgPSBudWxsO1xuICAgICAgICBwcml2YXRlIF9nYW1lTG9vcDpkeVJ0LklEaXNwb3NhYmxlID0gbnVsbDtcblxuICAgICAgICBwdWJsaWMgaW5pdFdoZW5DcmVhdGUoKXtcbiAgICAgICAgICAgIC8vdG9kbyBkZXRlY3QgdG8gZGVjaWRlIHVzaW5nIHdoaWNoIHJlbmRlcmVyXG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlciA9IFdlYkdMUmVuZGVyZXIuY3JlYXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgcnVuV2l0aFNjZW5lKHNjZW5lOlNjZW5lKSB7XG4gICAgICAgICAgICBzY2VuZS5pbml0KCk7XG4gICAgICAgICAgICBzY2VuZS5vbkVudGVyKCk7XG4gICAgICAgICAgICB0aGlzLl9zY2VuZSA9IHNjZW5lO1xuXG4gICAgICAgICAgICAvL3RvZG8gbm90IHB1dCBoZXJlP1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuaW5pdCgpO1xuXG4gICAgICAgICAgICB0aGlzLl9zdGFydExvb3AoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBnZXRWaWV3KCk6SVZpZXd7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdmlldztcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBnZXRUb3BVbmRlclBvaW50KHBvaW50OlBvaW50KTpHYW1lT2JqZWN0e1xuICAgICAgICAgICAgaWYoIXRoaXMuX3NjZW5lKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NjZW5lLmdldFRvcFVuZGVyUG9pbnQocG9pbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGNyZWF0ZUdMKGNhbnZhc0lkOnN0cmluZyl7XG4gICAgICAgICAgICB0aGlzLl92aWV3ID0gVmlld1dlYkdMLmNyZWF0ZShkeUNiLkRvbVF1ZXJ5LmNyZWF0ZShjYW52YXNJZCkuZ2V0KDApKTtcbiAgICAgICAgICAgIHRoaXMuX2dsID0gdGhpcy5fdmlldy5nZXRDb250ZXh0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9zdGFydExvb3AoKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgICAgIHRoaXMuX2dhbWVMb29wID0gZHlSdC5pbnRlcnZhbFJlcXVlc3QoKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgodGltZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLl9sb29wQm9keSh0aW1lKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vdG9kbyBhZGQgdGljayBtZWNoYW5pc21cbiAgICAgICAgcHJpdmF0ZSBfbG9vcEJvZHkodGltZSkge1xuICAgICAgICAgICAgdGhpcy5fZ2wuY2xlYXIodGhpcy5fZ2wuQ09MT1JfQlVGRkVSX0JJVCB8IHRoaXMuX2dsLkRFUFRIX0JVRkZFUl9CSVQpO1xuXG4gICAgICAgICAgICB0aGlzLl9zY2VuZS5vblN0YXJ0TG9vcCgpO1xuXG4gICAgICAgICAgICB0aGlzLl9zY2VuZS5ydW4oKTtcblxuICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIucmVuZGVyKHRoaXMuX3NjZW5lKTtcblxuICAgICAgICAgICAgdGhpcy5fc2NlbmUub25FbmRMb29wKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiZGVmaW5pdGlvbnMuZC50c1wiLz5cbm1vZHVsZSBkeXtcbiAgICAvL3RvZG8gY2FuIHNldCBwZXJzcGVjdGl2ZVBhcmFtcywgYWRkIHVwZGF0ZVByb2plY3RNYXRyaXggbWV0aG9kXG4gICAgLy90b2RvIG9wdGltaXplIHRvIHJlZHVjZSBjb21wdXRlXG4gICAgZXhwb3J0IGNsYXNzIENhbWVyYXtcbiAgICAgICAgcHVibGljIHN0YXRpYyBjcmVhdGUobG9va0F0UGFyYW1zLCBwZXJzcGVjdGl2ZVBhcmFtcyk6Q2FtZXJhIHtcbiAgICAgICAgICAgIHZhciBvYmogPSBuZXcgdGhpcyhsb29rQXRQYXJhbXMsIHBlcnNwZWN0aXZlUGFyYW1zKTtcblxuICAgICAgICAgICAgb2JqLmluaXRXaGVuQ3JlYXRlKCk7XG5cbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9wTWF0cml4Ok1hdHJpeCA9IG51bGw7XG4gICAgICAgIGdldCBwTWF0cml4KCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcE1hdHJpeDtcbiAgICAgICAgfVxuICAgICAgICBzZXQgcE1hdHJpeChwTWF0cml4Ok1hdHJpeCl7XG4gICAgICAgICAgICB0aGlzLl9wTWF0cml4ID0gcE1hdHJpeDtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX3ZNYXRyaXg6TWF0cml4ID0gbnVsbDtcbiAgICAgICAgZ2V0IHZNYXRyaXgoKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl92TWF0cml4O1xuICAgICAgICB9XG4gICAgICAgIHNldCB2TWF0cml4KHZNYXRyaXg6TWF0cml4KXtcbiAgICAgICAgICAgIHRoaXMuX3ZNYXRyaXggPSB2TWF0cml4O1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfbW92ZVNwZWVkOm51bWJlciA9IDAuMDU7XG4gICAgICAgIGdldCBtb3ZlU3BlZWQoKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9tb3ZlU3BlZWQ7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IG1vdmVTcGVlZChtb3ZlU3BlZWQ6bnVtYmVyKXtcbiAgICAgICAgICAgIHRoaXMuX21vdmVTcGVlZCA9IG1vdmVTcGVlZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX3JvdGF0ZVN0ZXBYOm51bWJlciA9IDAuMTtcbiAgICAgICAgZ2V0IHJvdGF0ZVN0ZXBYKCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcm90YXRlU3RlcFg7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IHJvdGF0ZVN0ZXBYKF9yb3RhdGVTdGVwWDpudW1iZXIpe1xuICAgICAgICAgICAgdGhpcy5fcm90YXRlU3RlcFggPSBfcm90YXRlU3RlcFg7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9yb3RhdGVTdGVwWTpudW1iZXIgPSAwLjE7XG4gICAgICAgIGdldCByb3RhdGVTdGVwWSgpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JvdGF0ZVN0ZXBZO1xuICAgICAgICB9XG4gICAgICAgIHNldCByb3RhdGVTdGVwWShyb3RhdGVTdGVwWTpudW1iZXIpe1xuICAgICAgICAgICAgdGhpcy5fcm90YXRlU3RlcFkgPSByb3RhdGVTdGVwWTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX3pvb21TcGVlZDpudW1iZXIgPSAxMDtcbiAgICAgICAgZ2V0IHpvb21TcGVlZCgpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3pvb21TcGVlZDtcbiAgICAgICAgfVxuICAgICAgICBzZXQgem9vbVNwZWVkKHpvb21TcGVlZDpudW1iZXIpe1xuICAgICAgICAgICAgdGhpcy5fem9vbVNwZWVkID0gem9vbVNwZWVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfZXllWDpudW1iZXIgPSBudWxsO1xuICAgICAgICBwcml2YXRlIF9leWVZOm51bWJlciA9IG51bGw7XG4gICAgICAgIHByaXZhdGUgX2V5ZVo6bnVtYmVyID0gbnVsbDtcbiAgICAgICAgcHJpdmF0ZSBfdXBYOm51bWJlciA9IG51bGw7XG4gICAgICAgIHByaXZhdGUgX3VwWTpudW1iZXIgPSBudWxsO1xuICAgICAgICBwcml2YXRlIF91cFo6bnVtYmVyID0gbnVsbDtcbiAgICAgICAgcHJpdmF0ZSBfY2VudGVyWDpudW1iZXIgPSBudWxsO1xuICAgICAgICBwcml2YXRlIF9jZW50ZXJZOm51bWJlciA9IG51bGw7XG4gICAgICAgIHByaXZhdGUgX2NlbnRlclo6bnVtYmVyID0gbnVsbDtcbiAgICAgICAgcHJpdmF0ZSBfem9vbUFuZ2xlOm51bWJlcj0gbnVsbDtcbiAgICAgICAgcHJpdmF0ZSBfYXNwZWN0Om51bWJlciA9IG51bGw7XG4gICAgICAgIHByaXZhdGUgX25lYXI6bnVtYmVyID0gbnVsbDtcbiAgICAgICAgcHJpdmF0ZSBfZmFyOm51bWJlciA9IG51bGw7XG4gICAgICAgIHByaXZhdGUgX21vdmVYOm51bWJlciA9IG51bGw7XG4gICAgICAgIHByaXZhdGUgX21vdmVZOm51bWJlciA9IG51bGw7XG4gICAgICAgIHByaXZhdGUgX21vdmVaOm51bWJlciA9IG51bGw7XG4gICAgICAgIHByaXZhdGUgX3JvdGF0ZUFuZ2xlWDpudW1iZXIgPSBudWxsO1xuICAgICAgICBwcml2YXRlIF9yb3RhdGVBbmdsZVk6bnVtYmVyID0gbnVsbDtcbiAgICAgICAgcHJpdmF0ZSBfem9vbUluQW5nbGU6bnVtYmVyID0gbnVsbDtcbiAgICAgICAgcHJpdmF0ZSBfem9vbU91dEFuZ2xlOm51bWJlciA9IG51bGw7XG5cbiAgICAgICAgY29uc3RydWN0b3IobG9va0F0UGFyYW1zLCBwZXJzcGVjdGl2ZVBhcmFtcyl7XG4gICAgICAgICAgICB0aGlzLl9leWVYID0gbG9va0F0UGFyYW1zLmV5ZVg7XG4gICAgICAgICAgICB0aGlzLl9leWVZID0gbG9va0F0UGFyYW1zLmV5ZVk7XG4gICAgICAgICAgICB0aGlzLl9leWVaID0gbG9va0F0UGFyYW1zLmV5ZVo7XG4gICAgICAgICAgICB0aGlzLl91cFggPSBsb29rQXRQYXJhbXMudXBYO1xuICAgICAgICAgICAgdGhpcy5fdXBZID0gbG9va0F0UGFyYW1zLnVwWTtcbiAgICAgICAgICAgIHRoaXMuX3VwWiA9IGxvb2tBdFBhcmFtcy51cFo7XG4gICAgICAgICAgICB0aGlzLl9jZW50ZXJYID0gbG9va0F0UGFyYW1zLmNlbnRlclg7XG4gICAgICAgICAgICB0aGlzLl9jZW50ZXJZID0gbG9va0F0UGFyYW1zLmNlbnRlclk7XG4gICAgICAgICAgICB0aGlzLl9jZW50ZXJaID0gbG9va0F0UGFyYW1zLmNlbnRlclo7XG5cbiAgICAgICAgICAgIHRoaXMuX3pvb21BbmdsZT0gcGVyc3BlY3RpdmVQYXJhbXMuYW5nbGU7XG4gICAgICAgICAgICB0aGlzLl9hc3BlY3QgPSBwZXJzcGVjdGl2ZVBhcmFtcy5hc3BlY3Q7XG4gICAgICAgICAgICB0aGlzLl9uZWFyID0gcGVyc3BlY3RpdmVQYXJhbXMubmVhcjtcbiAgICAgICAgICAgIHRoaXMuX2ZhciA9IHBlcnNwZWN0aXZlUGFyYW1zLmZhcjtcblxuICAgICAgICAgICAgdGhpcy5fbW92ZVggPSAwO1xuICAgICAgICAgICAgdGhpcy5fbW92ZVkgPSAwO1xuICAgICAgICAgICAgdGhpcy5fbW92ZVogPSAwO1xuICAgICAgICAgICAgdGhpcy5fcm90YXRlQW5nbGVYID0gMDtcbiAgICAgICAgICAgIHRoaXMuX3JvdGF0ZUFuZ2xlWSA9IDA7XG4gICAgICAgICAgICB0aGlzLl96b29tSW5BbmdsZSA9IDA7XG4gICAgICAgICAgICB0aGlzLl96b29tT3V0QW5nbGUgPSAwO1xuXG4gICAgICAgICAgICB0aGlzLl9wTWF0cml4ID0gTWF0cml4LmNyZWF0ZSgpO1xuICAgICAgICAgICAgdGhpcy5fdk1hdHJpeCA9IE1hdHJpeC5jcmVhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBpbml0V2hlbkNyZWF0ZSgpe1xuICAgICAgICAgICAgdGhpcy5fdk1hdHJpeC5zZXRMb29rQXQodGhpcy5fZXllWCwgdGhpcy5fZXllWSwgdGhpcy5fZXllWiwgdGhpcy5fY2VudGVyWCwgdGhpcy5fY2VudGVyWSwgdGhpcy5fY2VudGVyWiwgdGhpcy5fdXBYLCB0aGlzLl91cFksIHRoaXMuX3VwWik7XG4gICAgICAgICAgICB0aGlzLl9wTWF0cml4LnNldFBlcnNwZWN0aXZlKHRoaXMuX3pvb21BbmdsZSwgdGhpcy5fYXNwZWN0LCB0aGlzLl9uZWFyLCB0aGlzLl9mYXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGNvbXB1dGVWcE1hdHJpeCgpe1xuICAgICAgICAgICAgdmFyIG1hdHJpeCA9IE1hdHJpeC5jcmVhdGUoKTtcblxuICAgICAgICAgICAgbWF0cml4LmFwcGx5TWF0cml4KHRoaXMuX3ZNYXRyaXgpO1xuICAgICAgICAgICAgbWF0cml4LmFwcGx5TWF0cml4KHRoaXMuX3BNYXRyaXgpO1xuXG4gICAgICAgICAgICByZXR1cm4gbWF0cml4O1xuICAgICAgICB9XG5cbiAgICAgICAgbW92ZUxlZnQoKXtcbiAgICAgICAgICAgIHRoaXMuX2NvbXB1dGVNb3ZlRGlzdGFuY2UoVmVjdG9yNC5jcmVhdGUoLXRoaXMuX21vdmVTcGVlZCwgMCwgMCwgMSkpO1xuXG5cbiAgICAgICAgICAgIC8v57uVeOi9tOaXi+i9rOaXtu+8jOaKleW9sXh55bmz6Z2i5Li65Z6C55u05pa55ZCR77yM6ICMTGVmdOWSjFJpZ2h056e75Yqo5oqV5b2x5YiweHnlubPpnaLkuLrmsLTlubPmlrnlkJHvvIzlm6DmraTnu5V46L205peL6L2s5LiN5Lya5b2x5ZONTGVmdOWSjFJpZ2h056e75YqoXG4gICAgICAgICAgICAvL3RoaXMuX21vdmVYID0gdGhpcy5fbW92ZVggKyBjb3ModGhpcy5fcm90YXRlQW5nbGVZICogUEkgLyAxODApICogdGhpcy5fbW92ZVNwZWVkO1xuICAgICAgICAgICAgLy90aGlzLl9tb3ZlWiA9IHRoaXMuX21vdmVaICsgc2luKHRoaXMuX3JvdGF0ZUFuZ2xlWSogUEkgLyAxODApICp0aGlzLl9tb3ZlU3BlZWQ7XG4gICAgICAgIH1cbiAgICAgICAgbW92ZVJpZ2h0KCl7XG4gICAgICAgICAgICB0aGlzLl9jb21wdXRlTW92ZURpc3RhbmNlKFZlY3RvcjQuY3JlYXRlKHRoaXMuX21vdmVTcGVlZCwgMCwgMCwgMSkpO1xuXG4gICAgICAgICAgICAvL3RoaXMuX21vdmVYID0gdGhpcy5fbW92ZVggLSBjb3ModGhpcy5fcm90YXRlQW5nbGVZICogUEkgLyAxODApICogdGhpcy5fbW92ZVNwZWVkO1xuICAgICAgICAgICAgLy90aGlzLl9tb3ZlWiA9IHRoaXMuX21vdmVaIC0gc2luKHRoaXMuX3JvdGF0ZUFuZ2xlWSogUEkgLyAxODApICp0aGlzLl9tb3ZlU3BlZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBtb3ZlQmFjaygpe1xuICAgICAgICAgICAgdGhpcy5fY29tcHV0ZU1vdmVEaXN0YW5jZShWZWN0b3I0LmNyZWF0ZSgwLCAwLCB0aGlzLl9tb3ZlU3BlZWQsIDEpKTtcblxuICAgICAgICAgICAgLy90aGlzLl9tb3ZlWSA9IHRoaXMuX21vdmVZIC0gc2luKHRoaXMuX3JvdGF0ZUFuZ2xlWCAqIFBJIC8gMTgwKSAqIHRoaXMuX21vdmVTcGVlZDtcbiAgICAgICAgICAgIC8vdGhpcy5fbW92ZVogPSB0aGlzLl9tb3ZlWiArIGNvcyh0aGlzLl9yb3RhdGVBbmdsZVgqIFBJIC8gMTgwKSAqdGhpcy5fbW92ZVNwZWVkO1xuXG4gICAgICAgICAgICAvL3RoaXMuX21vdmVYID0gdGhpcy5fbW92ZVggKyBzaW4odGhpcy5fcm90YXRlQW5nbGVZICogUEkgLyAxODApICogdGhpcy5fbW92ZVNwZWVkO1xuICAgICAgICAgICAgLy90aGlzLl9tb3ZlWiA9IHRoaXMuX21vdmVaIC0gY29zKHRoaXMuX3JvdGF0ZUFuZ2xlWSogUEkgLyAxODApICp0aGlzLl9tb3ZlU3BlZWQ7XG4gICAgICAgIH1cbiAgICAgICAgbW92ZUZyb250KCl7XG4gICAgICAgICAgICB0aGlzLl9jb21wdXRlTW92ZURpc3RhbmNlKFZlY3RvcjQuY3JlYXRlKDAsIDAsIC10aGlzLl9tb3ZlU3BlZWQsIDEpKTtcblxuICAgICAgICAgICAgLy90aGlzLl9tb3ZlWSA9IHRoaXMuX21vdmVZICsgc2luKHRoaXMuX3JvdGF0ZUFuZ2xlWCAqIFBJIC8gMTgwKSAqIHRoaXMuX21vdmVTcGVlZDtcbiAgICAgICAgICAgIC8vdGhpcy5fbW92ZVogPSB0aGlzLl9tb3ZlWiAtIGNvcyh0aGlzLl9yb3RhdGVBbmdsZVgqIFBJIC8gMTgwKSAqdGhpcy5fbW92ZVNwZWVkO1xuXG4gICAgICAgICAgICAvL3RoaXMuX21vdmVYID0gdGhpcy5fbW92ZVggLSBzaW4odGhpcy5fcm90YXRlQW5nbGVZICogUEkgLyAxODApICogdGhpcy5fbW92ZVNwZWVkO1xuICAgICAgICAgICAgLy90aGlzLl9tb3ZlWiA9IHRoaXMuX21vdmVaICsgY29zKHRoaXMuX3JvdGF0ZUFuZ2xlWSogUEkgLyAxODApICp0aGlzLl9tb3ZlU3BlZWQ7XG4gICAgICAgIH1cblxuICAgICAgICAvL3RvZG8g55So5qyn5ouJ6KeS5oiW5Zub5YWD5pWw5p2l6KGo56S65pa55ZCRXG4gICAgICAgIHJvdGF0ZSgpe1xuICAgICAgICAgICAgdGhpcy5fcm90YXRlQW5nbGVZID0gdGhpcy5fcm90YXRlQW5nbGVZICsgdGhpcy5fcm90YXRlU3RlcFk7O1xuICAgICAgICAgICAgdGhpcy5fcm90YXRlQW5nbGVYID0gTWF0aC5tYXgoTWF0aC5taW4odGhpcy5fcm90YXRlQW5nbGVYICsgdGhpcy5fcm90YXRlU3RlcFgsIDkwLjApLCAtOTAuMCk7XG4gICAgICAgIH1cblxuICAgICAgICB6b29tSW4oKXtcbiAgICAgICAgICAgIHRoaXMuX3pvb21BbmdsZSA9IE1hdGgubWluKHRoaXMuX3pvb21BbmdsZSArIHRoaXMuX3pvb21TcGVlZCwgMTc5KTtcbiAgICAgICAgfVxuICAgICAgICB6b29tT3V0KCl7XG4gICAgICAgICAgICB0aGlzLl96b29tQW5nbGUgPSBNYXRoLm1heCh0aGlzLl96b29tQW5nbGUgLSB0aGlzLl96b29tU3BlZWQsIDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgcnVuKCl7XG4gICAgICAgICAgICAvKiFcbiAgICAgICAgICAgICDpnIDopoHlr7nop4blm77lnZDmoIfns7vov5vooYzlj5jmjaLvvIzlhYjov5vooYzml4vovazlj5jmjaJS77yM5YaN6L+b6KGM5bmz56e75Y+Y5o2iVO+8jOWNs009VCpSXG4gICAgICAgICAgICAg5Zug5q2k55u45b2T5LqO5a+56KeG5Zu+5Z2Q5qCH6L+b6KGMTeeahOmAhuWPmOaNou+8jOWNs00tMT1SLTEgKiBULTHvvIzljbNYJz0oUi0xICogVC0xKSAqIFjvvIhY5Li66KeG5Zu+5Z2Q5qCH77yMWCfkuLrlj5jmjaLlkI7nmoTlnZDmoIfvvIlcblxuICAgICAgICAgICAgIOiAjOatpOWkhOaYr+WvueinhuWbvuWdkOagh+i/m+ihjOWPmOaNou+8jOWboOatpOimgei/m+ihjE3nmoTpgIblj5jmjaLjgIJcblxuICAgICAgICAgICAgIOazqOaEj++8muaXi+i9rOinknJvdGF0ZUFuZ2xl5ZKM56e75Yqo6Led56a76YO95piv6ZKI5a+56KeG5Zu+5Z2Q5qCH57O755qE77yBXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuX3ZNYXRyaXgudHJhbnNsYXRlKC10aGlzLl9tb3ZlWCwgLXRoaXMuX21vdmVZLCAtdGhpcy5fbW92ZVopO1xuXG4gICAgICAgICAgICB0aGlzLl92TWF0cml4LnJvdGF0ZSgtdGhpcy5fcm90YXRlQW5nbGVZLCAwLjAsIDEuMCwgMC4wKTtcbiAgICAgICAgICAgIHRoaXMuX3ZNYXRyaXgucm90YXRlKC10aGlzLl9yb3RhdGVBbmdsZVgsIDEuMCwgMC4wLCAwLjApO1xuXG4gICAgICAgICAgICAvL3ZhciB2ZWM0ID0gTWF0cml4VG9vbC5tdWx0aXBseVZlY3RvcjQodGhpcy5fdk1hdHJpeC52YWx1ZXMsIFt0aGlzLl9leWVYLCB0aGlzLl9leWVZLCB0aGlzLl9leWVaLCAxXSk7XG4gICAgICAgICAgICAvL3RoaXMuX2V5ZVggPSB2ZWM0WzBdO1xuICAgICAgICAgICAgLy90aGlzLl9leWVZID0gdmVjNFsxXTtcbiAgICAgICAgICAgIC8vdGhpcy5fZXllWiA9IHZlYzRbMl07XG5cblxuICAgICAgICAgICAgLy90aGlzLl92TWF0cml4LnRyYW5zbGF0ZSh0aGlzLl9tb3ZlWCwgdGhpcy5fbW92ZVksIHRoaXMuX21vdmVaKTtcblxuICAgICAgICAgICAgdGhpcy5fcE1hdHJpeC5zZXRQZXJzcGVjdGl2ZSh0aGlzLl96b29tQW5nbGUsIHRoaXMuX2FzcGVjdCwgdGhpcy5fbmVhciwgdGhpcy5fZmFyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBwdXNoTWF0cml4KCl7XG4gICAgICAgICAgICB0aGlzLl92TWF0cml4LnB1c2goKTtcbiAgICAgICAgICAgIHRoaXMuX3BNYXRyaXgucHVzaCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHBvcE1hdHJpeCgpe1xuICAgICAgICAgICAgdGhpcy5fdk1hdHJpeC5wb3AoKTtcbiAgICAgICAgICAgIHRoaXMuX3BNYXRyaXgucG9wKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiFcbiAgICAgICAgIGhvb2sgbWV0aG9kXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgb25TdGFydExvb3AoKXtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBvbkVuZExvb3AoKXtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2NvbXB1dGVNb3ZlRGlzdGFuY2Uoc3BlZWRWZWM0KXtcbiAgICAgICAgICAgIC8qIVxuICAgICAgICAgICAgIOatpOWkhOenu+WKqOi3neemu+aYr+mSiOWvueinhuWbvuWdkOagh+ezu+eahO+8iOWFiOaXi+i9rO+8jOeEtuWQjuW5s+enu++8ie+8jOWboOatpOmcgOimgeiuoeeul+inhuWbvuWdkOagh+ezu+aXi+i9rOWQjuenu+WKqOeahOi3neemu+OAglxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB2YXIgbWF0cml4ID0gTWF0cml4LmNyZWF0ZSgpO1xuICAgICAgICAgICAgbWF0cml4LnNldFJvdGF0ZSh0aGlzLl9yb3RhdGVBbmdsZVgsIDEuMCwgMC4wLCAwLjApO1xuICAgICAgICAgICAgbWF0cml4LnJvdGF0ZSh0aGlzLl9yb3RhdGVBbmdsZVksIDAuMCwgMS4wLCAwLjApO1xuXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gbWF0cml4Lm11bHRpcGx5VmVjdG9yNChzcGVlZFZlYzQpLnZhbHVlcztcblxuICAgICAgICAgICAgdGhpcy5fbW92ZVggKz0gcmVzdWx0WzBdO1xuICAgICAgICAgICAgdGhpcy5fbW92ZVkgKz0gcmVzdWx0WzFdO1xuICAgICAgICAgICAgdGhpcy5fbW92ZVogKz0gcmVzdWx0WzJdO1xuICAgICAgICB9XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9