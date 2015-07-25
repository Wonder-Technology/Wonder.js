var Engine3D;
(function (Engine3D) {
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
    Engine3D.Point = Point;
})(Engine3D || (Engine3D = {}));

var Engine3D;
(function (Engine3D) {
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
    Engine3D.Position = Position;
})(Engine3D || (Engine3D = {}));

/// <reference path="../definitions.d.ts"/>
var Engine3D;
(function (Engine3D) {
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
    Engine3D.ViewWebGL = ViewWebGL;
})(Engine3D || (Engine3D = {}));

/// <reference path="../definitions.d.ts"/>
var Engine3D;
(function (Engine3D) {
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
            return Engine3D.Vector4.create(this._values[0], this._values[1], this._values[2], 1.0);
        };
        return Vector3;
    })();
    Engine3D.Vector3 = Vector3;
})(Engine3D || (Engine3D = {}));

/// <reference path="../definitions.d.ts"/>
var Engine3D;
(function (Engine3D) {
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
            return Engine3D.Vector3.create(this._values[0], this._values[1], this._values[2]);
        };
        return Vector4;
    })();
    Engine3D.Vector4 = Vector4;
})(Engine3D || (Engine3D = {}));

/// <reference path="../definitions.d.ts"/>
var Engine3D;
(function (Engine3D) {
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
            return Engine3D.Vector4.create(result[0], result[1], result[2], result[3]);
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
    Engine3D.Matrix = Matrix;
})(Engine3D || (Engine3D = {}));

/// <reference path="../definitions.d.ts"/>
var Engine3D;
(function (Engine3D) {
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
    Engine3D.Action = Action;
})(Engine3D || (Engine3D = {}));

/// <reference path="../definitions.d.ts"/>
var Engine3D;
(function (Engine3D) {
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
    Engine3D.ActionManager = ActionManager;
})(Engine3D || (Engine3D = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var Engine3D;
(function (Engine3D) {
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
                this._point = Engine3D.Vector3.create(0, 0, 0);
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
    })(Engine3D.Action);
    Engine3D.Rotate = Rotate;
})(Engine3D || (Engine3D = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var Engine3D;
(function (Engine3D) {
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
    })(Engine3D.Action);
    Engine3D.Scale = Scale;
})(Engine3D || (Engine3D = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var Engine3D;
(function (Engine3D) {
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
    })(Engine3D.Action);
    Engine3D.Translate = Translate;
})(Engine3D || (Engine3D = {}));

//reference to three.js->Color.js
var Engine3D;
(function (Engine3D) {
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
    Engine3D.Color = Color;
})(Engine3D || (Engine3D = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var Engine3D;
(function (Engine3D) {
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
    Engine3D.JudgeUtils = JudgeUtils;
})(Engine3D || (Engine3D = {}));

var Engine3D;
(function (Engine3D) {
    (function (ShaderType) {
        ShaderType[ShaderType["VS"] = 0] = "VS";
        ShaderType[ShaderType["FS"] = 1] = "FS";
    })(Engine3D.ShaderType || (Engine3D.ShaderType = {}));
    var ShaderType = Engine3D.ShaderType;
})(Engine3D || (Engine3D = {}));

/// <reference path="../definitions.d.ts"/>
var Engine3D;
(function (Engine3D) {
    var Shader = (function () {
        function Shader() {
        }
        Shader.createShader = function (source, type) {
            var shader = null, gl = Engine3D.Director.getInstance().gl;
            switch (type) {
                case Engine3D.ShaderType.VS:
                    shader = gl.createShader(gl.VERTEX_SHADER);
                    break;
                case Engine3D.ShaderType.FS:
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
    Engine3D.Shader = Shader;
})(Engine3D || (Engine3D = {}));

var Engine3D;
(function (Engine3D) {
    (function (BufferType) {
        BufferType[BufferType["UNSIGNED_BYTE"] = "UNSIGNED_BYTE"] = "UNSIGNED_BYTE";
        BufferType[BufferType["SHORT"] = "SHORT"] = "SHORT";
        BufferType[BufferType["UNSIGNED_SHORT"] = "UNSIGNED_SHORT"] = "UNSIGNED_SHORT";
        BufferType[BufferType["INT"] = "INT"] = "INT";
        BufferType[BufferType["UNSIGNED_INT"] = "UNSIGNED_INT"] = "UNSIGNED_INT";
        BufferType[BufferType["FLOAT"] = "FLOAT"] = "FLOAT";
    })(Engine3D.BufferType || (Engine3D.BufferType = {}));
    var BufferType = Engine3D.BufferType;
})(Engine3D || (Engine3D = {}));

var Engine3D;
(function (Engine3D) {
    (function (AttributeDataType) {
        AttributeDataType[AttributeDataType["FLOAT_4"] = 0] = "FLOAT_4";
        AttributeDataType[AttributeDataType["BUFFER"] = 1] = "BUFFER";
    })(Engine3D.AttributeDataType || (Engine3D.AttributeDataType = {}));
    var AttributeDataType = Engine3D.AttributeDataType;
})(Engine3D || (Engine3D = {}));

var Engine3D;
(function (Engine3D) {
    (function (DrawMode) {
        DrawMode[DrawMode["TRIANGLES"] = "TRIANGLES"] = "TRIANGLES";
    })(Engine3D.DrawMode || (Engine3D.DrawMode = {}));
    var DrawMode = Engine3D.DrawMode;
})(Engine3D || (Engine3D = {}));

/// <reference path="../definitions.d.ts"/>
var Engine3D;
(function (Engine3D) {
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
            var gl = Engine3D.Director.getInstance().gl;
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
                case Engine3D.BufferType.UNSIGNED_BYTE:
                    info = {
                        typeClass: Uint8Array,
                        size: 1
                    };
                    break;
                case Engine3D.BufferType.SHORT:
                    info = {
                        typeClass: Int16Array,
                        size: 2
                    };
                    break;
                case Engine3D.BufferType.UNSIGNED_SHORT:
                    info = {
                        typeClass: Uint16Array,
                        size: 2
                    };
                    break;
                case Engine3D.BufferType.INT:
                    info = {
                        typeClass: Int32Array,
                        size: 4
                    };
                    break;
                case Engine3D.BufferType.UNSIGNED_INT:
                    info = {
                        typeClass: Uint32Array,
                        size: 4
                    };
                    break;
                case Engine3D.BufferType.FLOAT:
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
    Engine3D.ElementBuffer = ElementBuffer;
})(Engine3D || (Engine3D = {}));

/// <reference path="../definitions.d.ts"/>
var Engine3D;
(function (Engine3D) {
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
            var gl = Engine3D.Director.getInstance().gl;
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
    Engine3D.ArrayBuffer = ArrayBuffer;
})(Engine3D || (Engine3D = {}));

var Engine3D;
(function (Engine3D) {
    (function (UniformDataType) {
        UniformDataType[UniformDataType["FLOAT_MAT4"] = 0] = "FLOAT_MAT4";
    })(Engine3D.UniformDataType || (Engine3D.UniformDataType = {}));
    var UniformDataType = Engine3D.UniformDataType;
})(Engine3D || (Engine3D = {}));

/// <reference path="../definitions.d.ts"/>
var Engine3D;
(function (Engine3D) {
    var Program = (function () {
        function Program() {
            this._program = Engine3D.Director.getInstance().gl.createProgram();
        }
        Program.create = function (vsSource, fsSource) {
            var obj = new this();
            obj.initWhenCreate(vsSource, fsSource);
            return obj;
        };
        Program.prototype.use = function () {
            Engine3D.Director.getInstance().gl.useProgram(this._program);
        };
        Program.prototype.setUniformData = function (name, type, data) {
            var gl = Engine3D.Director.getInstance().gl, pos = gl.getUniformLocation(this._program, name);
            switch (type) {
                case Engine3D.UniformDataType.FLOAT_MAT4:
                    gl.uniformMatrix4fv(pos, false, data.values);
                    break;
                default:
                    dyCb.Log.error(true, dyCb.Log.info.FUNC_INVALID("UniformDataType"));
                    break;
            }
        };
        Program.prototype.setAttributeData = function (name, type, data) {
            var gl = Engine3D.Director.getInstance().gl, pos = gl.getAttribLocation(this._program, name);
            switch (type) {
                case Engine3D.AttributeDataType.FLOAT_4:
                    var dataArr = data;
                    gl.vertexAttrib4f(pos, dataArr[0], dataArr[1], dataArr[2], dataArr[3]);
                    break;
                case Engine3D.AttributeDataType.BUFFER:
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
            var gl = Engine3D.Director.getInstance().gl, vs = null, fs = null;
            vs = Engine3D.Shader.createShader(vsSource, Engine3D.ShaderType.VS);
            fs = Engine3D.Shader.createShader(fsSource, Engine3D.ShaderType.FS);
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
    Engine3D.Program = Program;
})(Engine3D || (Engine3D = {}));

/// <reference path="../definitions.d.ts"/>
var Engine3D;
(function (Engine3D) {
    var QuadCommand = (function () {
        function QuadCommand() {
            this._buffers = dyCb.Hash.create();
            this._color = null;
            this._drawMode = Engine3D.DrawMode.TRIANGLES;
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
                program.setAttributeData("a_position", Engine3D.AttributeDataType.BUFFER, this._buffers.getChild("vertexBuffer"));
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
            program.setAttributeData("a_color", Engine3D.AttributeDataType.BUFFER, this._buffers.getChild("colorBuffer"));
            //}
        };
        QuadCommand.prototype._draw = function () {
            var totalNum = 0, startOffset = 0, vertexBuffer = this._buffers.getChild("vertexBuffer"), gl = Engine3D.Director.getInstance().gl;
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
    Engine3D.QuadCommand = QuadCommand;
})(Engine3D || (Engine3D = {}));

/// <reference path="../definitions.d.ts"/>
var Engine3D;
(function (Engine3D) {
    var WebGLRenderer = (function () {
        function WebGLRenderer() {
            this._commandQueue = dyCb.Collection.create();
            this._clearColor = Engine3D.Color.create("#000000");
            this._clearAlpha = 1.0;
        }
        WebGLRenderer.create = function () {
            var obj = new this();
            return obj;
        };
        WebGLRenderer.prototype.createQuadCommand = function () {
            return Engine3D.QuadCommand.create();
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
            Engine3D.Director.getInstance().gl.clearColor(this._clearColor.r, this._clearColor.g, this._clearColor.b, this._clearAlpha);
        };
        WebGLRenderer.prototype.setClearColor = function (color, alpha) {
            if (alpha === void 0) { alpha = 1.0; }
            this._clearColor = color;
            this._clearAlpha = alpha;
            Engine3D.Director.getInstance().gl.clearColor(this._clearColor.r, this._clearColor.g, this._clearColor.g, this._clearAlpha);
        };
        WebGLRenderer.prototype._clearCommand = function () {
            this._commandQueue.removeAllChildren();
        };
        return WebGLRenderer;
    })();
    Engine3D.WebGLRenderer = WebGLRenderer;
})(Engine3D || (Engine3D = {}));

/// <reference path="../definitions.d.ts"/>
var Engine3D;
(function (Engine3D) {
    var MeshMaterial = (function () {
        function MeshMaterial(params) {
            this._color = null;
            this._color = Engine3D.Color.create(params.color || "0xffffff");
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
    Engine3D.MeshMaterial = MeshMaterial;
})(Engine3D || (Engine3D = {}));

/// <reference path="../definitions.d.ts"/>
var Engine3D;
(function (Engine3D) {
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
                Engine3D.LoaderManager.getInstance().onResLoaded();
                return;
            }
            return dyRt.fromPromise(this._loadText(url)).do(function (data) {
                Engine3D.LoaderManager.getInstance().onResLoaded();
                self._container.addChild(id, data);
            }, function (err) {
                Engine3D.LoaderManager.getInstance().onResError(url, err);
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
    Engine3D.GLSLLoader = GLSLLoader;
})(Engine3D || (Engine3D = {}));

/// <reference path="../definitions.d.ts"/>
var Engine3D;
(function (Engine3D) {
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
        LoaderManager.prototype.getResourceCount = function () {
            return this._resCount;
        };
        LoaderManager.prototype.getCurrentLoadedCount = function () {
            return this._currentLoadedCount;
        };
        LoaderManager.prototype.load = function (resourcesArr) {
            var self = this;
            return dyRt.fromArray(resourcesArr).flatMap(function (res) {
                self._resCount++;
                return Engine3D.GLSLLoader.getInstance().load(res.url, res.id);
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
        LoaderManager.prototype._isFinishLoad = function () {
            var self = this;
            if (this.getCurrentLoadedCount() === this.getResourceCount()) {
                if (this.onload) {
                    this.onload();
                }
                else {
                    dyCb.Log.assert(false, "没有定义onload");
                }
            }
            else {
                if (this.onloading) {
                    setTimeout(function () {
                        self.onloading(self.getCurrentLoadedCount(), self.getResourceCount());
                    }, 16);
                }
                setTimeout(function () {
                    self._isFinishLoad.call(self);
                }, 16);
            }
        };
        LoaderManager._instance = null;
        return LoaderManager;
    })();
    Engine3D.LoaderManager = LoaderManager;
})(Engine3D || (Engine3D = {}));

/// <reference path="../definitions.d.ts"/>
var Engine3D;
(function (Engine3D) {
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
            return Engine3D.ArrayBuffer.create(new Float32Array(arr), 4, Engine3D.BufferType.FLOAT);
        };
        return Geometry;
    })();
    Engine3D.Geometry = Geometry;
})(Engine3D || (Engine3D = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var Engine3D;
(function (Engine3D) {
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
            return Engine3D.ArrayBuffer.create(new Float32Array([
                right, up, front, left, up, front, left, down, front, right, down, front,
                right, up, front, right, down, front, right, down, back, right, up, back,
                right, up, front, right, up, back, left, up, back, left, up, front,
                left, up, front, left, up, back, left, down, back, left, down, front,
                left, down, back, right, down, back, right, down, front, left, down, front,
                right, down, back, left, down, back, left, up, back, right, up, back // v4-v7-v6-v5 back
            ]), 3, Engine3D.BufferType.FLOAT);
        };
        BoxGeometry.prototype.computeIndicesBuffer = function () {
            return Engine3D.ElementBuffer.create(new Uint16Array([
                0, 1, 2, 0, 2, 3,
                4, 5, 6, 4, 6, 7,
                8, 9, 10, 8, 10, 11,
                12, 13, 14, 12, 14, 15,
                16, 17, 18, 16, 18, 19,
                20, 21, 22, 20, 22, 23 // back
            ]), Engine3D.BufferType.UNSIGNED_SHORT);
        };
        return BoxGeometry;
    })(Engine3D.Geometry);
    Engine3D.BoxGeometry = BoxGeometry;
})(Engine3D || (Engine3D = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var Engine3D;
(function (Engine3D) {
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
            return Engine3D.ArrayBuffer.create(new Float32Array([
                right, up, 0,
                left, up, 0,
                left, down, 0,
                right, down, 0
            ]), 3, Engine3D.BufferType.FLOAT);
        };
        RectGeometry.prototype.computeIndicesBuffer = function () {
            return Engine3D.ElementBuffer.create(new Uint16Array([
                0, 1, 2, 0, 2, 3
            ]), Engine3D.BufferType.UNSIGNED_SHORT);
        };
        return RectGeometry;
    })(Engine3D.Geometry);
    Engine3D.RectGeometry = RectGeometry;
})(Engine3D || (Engine3D = {}));

var Engine3D;
(function (Engine3D) {
    (function (SphereDrawMode) {
        SphereDrawMode[SphereDrawMode["LATITUDELONGTITUDE"] = 0] = "LATITUDELONGTITUDE";
        SphereDrawMode[SphereDrawMode["DECOMPOSITION"] = 1] = "DECOMPOSITION";
    })(Engine3D.SphereDrawMode || (Engine3D.SphereDrawMode = {}));
    var SphereDrawMode = Engine3D.SphereDrawMode;
})(Engine3D || (Engine3D = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var Engine3D;
(function (Engine3D) {
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
            if (drawMode === Engine3D.SphereDrawMode.LATITUDELONGTITUDE) {
                data = GetDataByLatitudeLongtitude.create(radius, segments).getData();
            }
            else if (drawMode === Engine3D.SphereDrawMode.DECOMPOSITION) {
                data = GetDataByDecomposition.create(radius, segments).getData();
            }
            return data;
        };
        return SphereGeometry;
    })(Engine3D.Geometry);
    Engine3D.SphereGeometry = SphereGeometry;
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
                vertices: Engine3D.ArrayBuffer.create(new Float32Array(this._vertices), 3, Engine3D.BufferType.FLOAT),
                indices: Engine3D.ElementBuffer.create(new Uint16Array(this._indices), Engine3D.BufferType.UNSIGNED_SHORT)
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
                vertices: Engine3D.ArrayBuffer.create(new Float32Array(this._vertices), 3, Engine3D.BufferType.FLOAT),
                indices: Engine3D.ElementBuffer.create(new Uint16Array(this._indices), Engine3D.BufferType.UNSIGNED_SHORT)
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
})(Engine3D || (Engine3D = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var Engine3D;
(function (Engine3D) {
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
            return Engine3D.ArrayBuffer.create(new Float32Array([
                0.0, up, 0,
                left, down, 0,
                right, down, 0
            ]), 3, Engine3D.BufferType.FLOAT);
        };
        TriangleGeometry.prototype.computeIndicesBuffer = function () {
            return Engine3D.ElementBuffer.create(new Uint8Array([
                0, 1, 2
            ]), Engine3D.BufferType.UNSIGNED_BYTE);
        };
        return TriangleGeometry;
    })(Engine3D.Geometry);
    Engine3D.TriangleGeometry = TriangleGeometry;
})(Engine3D || (Engine3D = {}));

/// <reference path="../../definitions.d.ts"/>
var Engine3D;
(function (Engine3D) {
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
            if (arguments.length === 1 && Engine3D.JudgeUtils.isString(arguments[0])) {
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
            if (arguments.length === 1 && Engine3D.JudgeUtils.isFunction(arguments[0])) {
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
            if (arguments.length === 1 && Engine3D.JudgeUtils.isString(arguments[0])) {
                var eventName = arguments[0];
                this._listenerMap.removeChild(eventName);
            }
            else if (arguments.length === 2 && Engine3D.JudgeUtils.isFunction(arguments[1])) {
                var eventName = arguments[0], handler = arguments[1], list = null;
                list = this._listenerMap.getChild(eventName);
                list.removeChild(function (val) {
                    return val.handler === handler;
                });
                if (list.getCount() === 0) {
                    this._listenerMap.removeChild(eventName);
                }
            }
            else if (arguments.length === 2 && Engine3D.JudgeUtils.isNumber(arguments[0])) {
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
            if (Engine3D.JudgeUtils.isNumber(arguments[0])) {
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
    Engine3D.EventListenerMap = EventListenerMap;
})(Engine3D || (Engine3D = {}));

var Engine3D;
(function (Engine3D) {
    (function (EventType) {
        EventType[EventType["MOUSE"] = 0] = "MOUSE";
        EventType[EventType["KEYBOARD"] = 1] = "KEYBOARD";
        EventType[EventType["CUSTOM"] = 2] = "CUSTOM";
    })(Engine3D.EventType || (Engine3D.EventType = {}));
    var EventType = Engine3D.EventType;
})(Engine3D || (Engine3D = {}));

var Engine3D;
(function (Engine3D) {
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
    })(Engine3D.EventName || (Engine3D.EventName = {}));
    var EventName = Engine3D.EventName;
})(Engine3D || (Engine3D = {}));

var Engine3D;
(function (Engine3D) {
    (function (EventPhase) {
        EventPhase[EventPhase["BROADCAST"] = 0] = "BROADCAST";
        EventPhase[EventPhase["EMIT"] = 1] = "EMIT";
    })(Engine3D.EventPhase || (Engine3D.EventPhase = {}));
    var EventPhase = Engine3D.EventPhase;
})(Engine3D || (Engine3D = {}));

/// <reference path="../../definitions.d.ts"/>
//todo complete it(add more event type)
var Engine3D;
(function (Engine3D) {
    var _table = dyCb.Hash.create();
    //todo not declare "<any>"!
    _table.addChild(Engine3D.EventName.CLICK, Engine3D.EventType.MOUSE);
    _table.addChild(Engine3D.EventName.MOUSEOVER, Engine3D.EventType.MOUSE);
    _table.addChild(Engine3D.EventName.MOUSEOUT, Engine3D.EventType.MOUSE);
    _table.addChild(Engine3D.EventName.MOUSEMOVE, Engine3D.EventType.MOUSE);
    _table.addChild(Engine3D.EventName.MOUSEDOWN, Engine3D.EventType.MOUSE);
    _table.addChild(Engine3D.EventName.MOUSEUP, Engine3D.EventType.MOUSE);
    _table.addChild(Engine3D.EventName.KEYDOWN, Engine3D.EventType.KEYBOARD);
    _table.addChild(Engine3D.EventName.KEYPRESS, Engine3D.EventType.KEYBOARD);
    _table.addChild(Engine3D.EventName.KEYUP, Engine3D.EventType.KEYBOARD);
    var EventTable = (function () {
        function EventTable() {
        }
        //getEventType should put here,
        //it should not put in Event class, it's better to extract EventTable class to put in
        EventTable.getEventType = function (eventName) {
            var result = _table.getChild(eventName);
            if (result === void 0) {
                result = Engine3D.EventType.CUSTOM;
            }
            return result;
        };
        return EventTable;
    })();
    Engine3D.EventTable = EventTable;
})(Engine3D || (Engine3D = {}));

/// <reference path="../../definitions.d.ts"/>
//rich domain model
//event info:
//control info(stop bubble...)
//system data(system event, as clientX...)
//event context(target, currentTarget...)
//user data(custom event)
//event type
var Engine3D;
(function (Engine3D) {
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
    Engine3D.Event = Event;
})(Engine3D || (Engine3D = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../definitions.d.ts"/>
var Engine3D;
(function (Engine3D) {
    var MouseEvent = (function (_super) {
        __extends(MouseEvent, _super);
        function MouseEvent(event, eventName) {
            _super.call(this, eventName);
            this.type = Engine3D.EventType.MOUSE;
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
                point = Engine3D.Point.create();
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
                viewOffset = Engine3D.Director.getInstance().getView().offset;
                return Engine3D.Point.create(point.x - viewOffset.x, point.y - viewOffset.y);
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
                            mouseButton = Engine3D.MouseButton.LEFT;
                            break;
                        case 4:
                            mouseButton = Engine3D.MouseButton.RIGHT;
                            break;
                        case 2:
                            mouseButton = Engine3D.MouseButton.CENTER;
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
                            mouseButton = Engine3D.MouseButton.LEFT;
                            break;
                        case 1:
                            mouseButton = Engine3D.MouseButton.RIGHT;
                            break;
                        case 2:
                            mouseButton = Engine3D.MouseButton.CENTER;
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
    })(Engine3D.Event);
    Engine3D.MouseEvent = MouseEvent;
})(Engine3D || (Engine3D = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../definitions.d.ts"/>
var Engine3D;
(function (Engine3D) {
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
            this.type = Engine3D.EventType.KEYBOARD;
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
    })(Engine3D.Event);
    Engine3D.KeyboardEvent = KeyboardEvent;
})(Engine3D || (Engine3D = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../definitions.d.ts"/>
var Engine3D;
(function (Engine3D) {
    var CustomEvent = (function (_super) {
        __extends(CustomEvent, _super);
        function CustomEvent() {
            _super.apply(this, arguments);
            this.type = Engine3D.EventType.CUSTOM;
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
                    && !Engine3D.JudgeUtils.isFunction(item);
            });
            return destination;
        };
        CustomEvent.prototype.copy = function () {
            var eventObj = CustomEvent.create(this.name);
            return this.copyMember(eventObj, this, ["target", "currentTarget", "isStopPropagation", "phase"]);
        };
        return CustomEvent;
    })(Engine3D.Event);
    Engine3D.CustomEvent = CustomEvent;
})(Engine3D || (Engine3D = {}));

var Engine3D;
(function (Engine3D) {
    (function (MouseButton) {
        MouseButton[MouseButton["LEFT"] = 0] = "LEFT";
        MouseButton[MouseButton["RIGHT"] = 1] = "RIGHT";
        MouseButton[MouseButton["CENTER"] = 2] = "CENTER";
    })(Engine3D.MouseButton || (Engine3D.MouseButton = {}));
    var MouseButton = Engine3D.MouseButton;
})(Engine3D || (Engine3D = {}));

/// <reference path="../../definitions.d.ts"/>
var Engine3D;
(function (Engine3D) {
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
    Engine3D.EventListener = EventListener;
})(Engine3D || (Engine3D = {}));

/// <reference path="../../definitions.d.ts"/>
var Engine3D;
(function (Engine3D) {
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
    Engine3D.EventHandler = EventHandler;
})(Engine3D || (Engine3D = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../definitions.d.ts"/>
var Engine3D;
(function (Engine3D) {
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
            var self = this, dom = this.getDom(), eventRegister = Engine3D.EventRegister.getInstance(), eventOffDataList = null;
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
            if (!Engine3D.EventRegister.getInstance().isBinded(target, eventName)) {
                wrapHandler = this._bind(this.getDom(), eventName, target);
            }
            else {
                wrapHandler = Engine3D.EventRegister.getInstance().getWrapHandler(target, eventName);
            }
            Engine3D.EventRegister.getInstance().register(target, eventName, handler, wrapHandler, priority);
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
    })(Engine3D.EventHandler);
    Engine3D.DomEventHandler = DomEventHandler;
})(Engine3D || (Engine3D = {}));

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
var Engine3D;
(function (Engine3D) {
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
            dyCb.Log.error(!(target instanceof Engine3D.GameObject), dyCb.Log.info.FUNC_MUST_BE("target", "GameObject"));
            this.handler(target, eventName, handler, priority);
        };
        MouseEventHandler.prototype.trigger = function (target, event, notSetTarget) {
            var eventName = event.name, eventType = event.type, registerDataList = null, isStopPropagation = false, self = this;
            if (!(target instanceof Engine3D.GameObject)) {
                dyCb.Log.log("target is not GameObject, can't trigger event");
                return;
            }
            if (!notSetTarget) {
                event.target = target;
            }
            registerDataList = Engine3D.EventRegister.getInstance().getEventRegisterDataList(target, eventName);
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
            return Engine3D.Director.getInstance().getView().dom;
        };
        MouseEventHandler.prototype.buildWrapHandler = function (target, eventName) {
            var self = this, context = window;
            return dyCb.EventUtils.bindEvent(context, function (event) {
                var eventObject = self._createEventObject(event, eventName, target), topTarget = Engine3D.Director.getInstance().getTopUnderPoint(eventObject.locationInView);
                Engine3D.EventManager.emit(topTarget, eventObject);
            });
        };
        MouseEventHandler.prototype._isTrigger = function (result) {
            return result && result.getCount() > 0;
        };
        MouseEventHandler.prototype._createEventObject = function (event, eventName, currentTarget) {
            var obj = Engine3D.MouseEvent.create(event ? event : window.event, eventName);
            obj.currentTarget = currentTarget;
            return obj;
        };
        MouseEventHandler._instance = null;
        return MouseEventHandler;
    })(Engine3D.DomEventHandler);
    Engine3D.MouseEventHandler = MouseEventHandler;
})(Engine3D || (Engine3D = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../definitions.d.ts"/>
var Engine3D;
(function (Engine3D) {
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
            registerDataList = Engine3D.EventRegister.getInstance().getEventRegisterDataList(eventName);
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
                Engine3D.EventManager.trigger(self._createEventObject(event, eventName));
            });
        };
        KeyboardEventHandler.prototype._isTrigger = function (result) {
            return result && result.getCount() > 0;
        };
        KeyboardEventHandler.prototype._createEventObject = function (event, eventName) {
            var obj = Engine3D.KeyboardEvent.create(event ? event : window.event, eventName);
            return obj;
        };
        KeyboardEventHandler._instance = null;
        return KeyboardEventHandler;
    })(Engine3D.DomEventHandler);
    Engine3D.KeyboardEventHandler = KeyboardEventHandler;
})(Engine3D || (Engine3D = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../definitions.d.ts"/>
var Engine3D;
(function (Engine3D) {
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
                Engine3D.EventRegister.getInstance().register(null, eventName, handler, null, priority);
            }
            else if (arguments.length === 4) {
                var target = arguments[0], eventName = arguments[1], handler = arguments[2], priority = arguments[3];
                Engine3D.EventRegister.getInstance().register(target, eventName, handler, null, priority);
            }
        };
        CustomEventHandler.prototype.off = function (args) {
            var eventRegister = Engine3D.EventRegister.getInstance();
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
            listenerDataList = Engine3D.EventRegister.getInstance().getEventRegisterDataList(event.name);
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
            listenerDataList = Engine3D.EventRegister.getInstance().getEventRegisterDataList(target, event.name);
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
    })(Engine3D.EventHandler);
    Engine3D.CustomEventHandler = CustomEventHandler;
})(Engine3D || (Engine3D = {}));

/// <reference path="../../definitions.d.ts"/>
var Engine3D;
(function (Engine3D) {
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
                return Engine3D.FactoryEventHandler.createEventHandler(eventType)
                    .trigger(event_1);
            }
            else if (arguments.length === 2 && !(arguments[1] instanceof Engine3D.Event)) {
                var event_2 = arguments[0], userData = arguments[1], eventType = event_2.type;
                dyCb.Log.error(eventType !== Engine3D.EventType.CUSTOM, dyCb.Log.info.FUNC_MUST_BE("event type", "CUSTOM"));
                return Engine3D.FactoryEventHandler.createEventHandler(eventType)
                    .trigger(event_2, userData);
            }
            else if (arguments.length === 2 || (arguments.length === 3 && Engine3D.JudgeUtils.isBoolean(arguments[2]))) {
                var target = arguments[0], event_3 = arguments[1], notSetTarget = arguments[2] === void 0 ? false : arguments[2], eventType = event_3.type;
                return Engine3D.FactoryEventHandler.createEventHandler(eventType)
                    .trigger(target, event_3, notSetTarget);
            }
            else if (arguments.length === 3 || arguments.length === 4) {
                var target = arguments[0], event_4 = arguments[1], userData = arguments[2], notSetTarget = arguments[3] === void 0 ? false : arguments[3], eventType = event_4.type;
                dyCb.Log.error(eventType !== Engine3D.EventType.CUSTOM, dyCb.Log.info.FUNC_MUST_BE("event type", "CUSTOM"));
                return Engine3D.FactoryEventHandler.createEventHandler(eventType)
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
            eventObject.phase = Engine3D.EventPhase.EMIT;
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
            eventObject.phase = Engine3D.EventPhase.BROADCAST;
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
    Engine3D.EventDispatcher = EventDispatcher;
})(Engine3D || (Engine3D = {}));

/// <reference path="../../definitions.d.ts"/>
var Engine3D;
(function (Engine3D) {
    var EventRegister = (function () {
        function EventRegister() {
            this._listenerMap = Engine3D.EventListenerMap.create();
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
            if (arguments.length === 1 && Engine3D.JudgeUtils.isString(arguments[0])) {
                var eventName = arguments[0];
                this._listenerMap.removeChild(eventName);
                return null;
            }
            else if (arguments.length === 2 && Engine3D.JudgeUtils.isFunction(arguments[1])) {
                var eventName = arguments[0], handler = arguments[1];
                this._listenerMap.removeChild(eventName, handler);
                return null;
            }
            else if (arguments.length === 2 && Engine3D.JudgeUtils.isNumber(arguments[0])) {
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
    Engine3D.EventRegister = EventRegister;
})(Engine3D || (Engine3D = {}));

/// <reference path="../../definitions.d.ts"/>
var Engine3D;
(function (Engine3D) {
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
                var listener = !(arguments[0] instanceof Engine3D.EventListener) ? Engine3D.EventListener.create(arguments[0]) : arguments[0];
                listener.handlerDataList.forEach(function (handlerData) {
                    Engine3D.FactoryEventHandler.createEventHandler(listener.eventType)
                        .on(handlerData.eventName, handlerData.handler, listener.priority);
                });
            }
            else if (arguments.length === 2) {
                var target = arguments[0], listener = !(arguments[1] instanceof Engine3D.EventListener) ? Engine3D.EventListener.create(arguments[1]) : arguments[1];
                listener.handlerDataList.forEach(function (handlerData) {
                    Engine3D.FactoryEventHandler.createEventHandler(listener.eventType)
                        .on(target, handlerData.eventName, handlerData.handler, listener.priority);
                });
            }
            else if (arguments.length === 3) {
                var eventName = arguments[0], handler = arguments[1], priority = arguments[2];
                Engine3D.FactoryEventHandler.createEventHandler(Engine3D.EventTable.getEventType(eventName))
                    .on(eventName, handler, priority);
            }
            else if (arguments.length === 4) {
                var target = arguments[0], eventName = arguments[1], handler = arguments[2], priority = arguments[3];
                Engine3D.FactoryEventHandler.createEventHandler(Engine3D.EventTable.getEventType(eventName))
                    .on(target, eventName, handler, priority);
            }
        };
        EventBinder.prototype.off = function () {
            var eventRegister = Engine3D.EventRegister.getInstance(), eventOffDataList = null, argArr = Array.prototype.slice.call(arguments, 0);
            if (arguments.length === 0) {
                eventRegister.forEach(function (list, key) {
                    var eventName = eventRegister.getEventNameFromKey(key), targetUid = eventRegister.getUidFromKey(key);
                    if (!targetUid) {
                        Engine3D.FactoryEventHandler.createEventHandler(Engine3D.EventTable.getEventType(eventName))
                            .off(eventName);
                        return;
                    }
                    Engine3D.FactoryEventHandler.createEventHandler(Engine3D.EventTable.getEventType(eventName))
                        .off(targetUid, eventName);
                });
            }
            else if (arguments.length === 1 && Engine3D.JudgeUtils.isString(arguments[0])) {
                var eventName = arguments[0];
                Engine3D.FactoryEventHandler.createEventHandler(Engine3D.EventTable.getEventType(eventName))
                    .off(eventName);
            }
            else if (arguments.length === 2 && Engine3D.JudgeUtils.isFunction(arguments[1])) {
                var eventName = arguments[0], handler = arguments[1];
                Engine3D.FactoryEventHandler.createEventHandler(Engine3D.EventTable.getEventType(eventName))
                    .off(eventName, handler);
            }
            else if (arguments.length === 1) {
                var target = arguments[0];
                eventRegister.forEach(function (list, key) {
                    var eventName = eventRegister.getEventNameFromKey(key);
                    if (eventRegister.isTarget(key, target, list)) {
                        Engine3D.FactoryEventHandler.createEventHandler(Engine3D.EventTable.getEventType(eventName))
                            .off(target, eventName);
                    }
                });
            }
            else if (arguments.length === 2) {
                var target = arguments[0], eventName = arguments[1];
                Engine3D.FactoryEventHandler.createEventHandler(Engine3D.EventTable.getEventType(eventName))
                    .off(target, eventName);
            }
            else if (arguments.length === 3) {
                var target = arguments[0], eventName = arguments[1], handler = arguments[2];
                Engine3D.FactoryEventHandler.createEventHandler(Engine3D.EventTable.getEventType(eventName))
                    .off(target, eventName, handler);
            }
        };
        return EventBinder;
    })();
    Engine3D.EventBinder = EventBinder;
})(Engine3D || (Engine3D = {}));

/// <reference path="../../definitions.d.ts"/>
var Engine3D;
(function (Engine3D) {
    var FactoryEventHandler = (function () {
        function FactoryEventHandler() {
        }
        FactoryEventHandler.createEventHandler = function (eventType) {
            var handler = null;
            switch (eventType) {
                case Engine3D.EventType.MOUSE:
                    handler = Engine3D.MouseEventHandler.getInstance();
                    break;
                case Engine3D.EventType.KEYBOARD:
                    handler = Engine3D.KeyboardEventHandler.getInstance();
                    break;
                case Engine3D.EventType.CUSTOM:
                    handler = Engine3D.CustomEventHandler.getInstance();
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
    Engine3D.FactoryEventHandler = FactoryEventHandler;
})(Engine3D || (Engine3D = {}));

/// <reference path="../definitions.d.ts"/>
var Engine3D;
(function (Engine3D) {
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
            else if (arguments.length === 2 && Engine3D.JudgeUtils.isString(arguments[0]) && Engine3D.JudgeUtils.isFunction(arguments[1])) {
                var eventName = arguments[0], handler = arguments[1], priority = 1;
                this._eventBinder.on(eventName, handler, priority);
            }
            else if (arguments.length === 2) {
                var target = arguments[0], listener = arguments[1];
                this._eventBinder.on(target, listener);
            }
            else if (arguments.length === 3 && Engine3D.JudgeUtils.isString(arguments[0]) && Engine3D.JudgeUtils.isFunction(arguments[1]) && Engine3D.JudgeUtils.isNumber(arguments[2])) {
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
            else if (arguments.length === 2 && Engine3D.JudgeUtils.isNumber(arguments[1])) {
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
            Engine3D.EventRegister.getInstance().setBubbleParent(target, parent);
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
        EventManager._eventBinder = Engine3D.EventBinder.create();
        EventManager._eventDispatcher = Engine3D.EventDispatcher.create();
        return EventManager;
    })();
    Engine3D.EventManager = EventManager;
})(Engine3D || (Engine3D = {}));

/// <reference path="../definitions.d.ts"/>
var Engine3D;
(function (Engine3D) {
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
            Engine3D.EventManager.off(this);
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
    Engine3D.GameObject = GameObject;
})(Engine3D || (Engine3D = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var Engine3D;
(function (Engine3D) {
    var Mesh = (function (_super) {
        __extends(Mesh, _super);
        function Mesh(gemo) {
            _super.call(this);
            this._matrix = Engine3D.Matrix.create();
            this._gemo = null;
            this._actionManager = Engine3D.ActionManager.create();
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
            this.position = Engine3D.Position.create(0, 0, 0);
        };
        Mesh.prototype._addDrawCommand = function () {
            var renderer = Engine3D.Director.getInstance().renderer, quadCmd = renderer.createQuadCommand();
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
    })(Engine3D.GameObject);
    Engine3D.Mesh = Mesh;
})(Engine3D || (Engine3D = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var Engine3D;
(function (Engine3D) {
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
            this._program = Engine3D.Program.create(vsSource, fsSource);
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
            this.position = Engine3D.Position.create(0, 0, 0);
        };
        Scene.prototype._setData = function (mesh) {
            this._program.setUniformData("u_mvpMatrix", Engine3D.UniformDataType.FLOAT_MAT4, this._computeMvpMatrix(mesh));
        };
        Scene.prototype._computeMvpMatrix = function (mesh) {
            return mesh.matrix.copy().applyMatrix(this._camera.computeVpMatrix());
        };
        return Scene;
    })(Engine3D.GameObject);
    Engine3D.Scene = Scene;
})(Engine3D || (Engine3D = {}));

/// <reference path="../definitions.d.ts"/>
var Engine3D;
(function (Engine3D) {
    /**
     * 来自《HTML5 Canvas 核心技术》
     * 不能写到global中，否则会报错“illegal invocation”！
     */
    window.requestNextAnimationFrame = (function () {
        var originalRequestAnimationFrame = undefined, wrapper = undefined, callback = undefined, geckoVersion = null, userAgent = navigator.userAgent, index = 0, self = this;
        wrapper = function (time) {
            time = +new Date();
            self.callback(time);
        };
        /*!
         bug!
         below code:
         when invoke b after 1s, will only invoke b, not invoke a!

         function a(time){
         console.log("a", time);
         webkitRequestAnimationFrame(a);
         }

         function b(time){
         console.log("b", time);
         webkitRequestAnimationFrame(b);
         }

         a();

         setTimeout(b, 1000);



         so use requestAnimationFrame priority!
         */
        if (window.requestAnimationFrame) {
            return requestAnimationFrame;
        }
        // Workaround for Chrome 10 bug where Chrome
        // does not pass the time to the animation function
        if (window.webkitRequestAnimationFrame) {
            // Define the wrapper
            // Make the switch
            originalRequestAnimationFrame = window.webkitRequestAnimationFrame;
            window.webkitRequestAnimationFrame = function (callback, element) {
                self.callback = callback;
                // Browser calls the wrapper and wrapper calls the callback
                return originalRequestAnimationFrame(wrapper, element);
            };
        }
        //修改time参数
        if (window.msRequestAnimationFrame) {
            originalRequestAnimationFrame = window.msRequestAnimationFrame;
            window.msRequestAnimationFrame = function (callback) {
                self.callback = callback;
                return originalRequestAnimationFrame(wrapper);
            };
        }
        // Workaround for Gecko 2.0, which has a bug in
        // mozRequestAnimationFrame() that restricts animations
        // to 30-40 fps.
        if (window.mozRequestAnimationFrame) {
            // Check the Gecko version. Gecko is used by browsers
            // other than Firefox. Gecko 2.0 corresponds to
            // Firefox 4.0.
            index = userAgent.indexOf('rv:');
            if (userAgent.indexOf('Gecko') != -1) {
                geckoVersion = userAgent.substr(index + 3, 3);
                if (geckoVersion === '2.0') {
                    // Forces the return statement to fall through
                    // to the setTimeout() function.
                    window.mozRequestAnimationFrame = undefined;
                }
            }
        }
        //            return  window.requestAnimationFrame ||  //传递给callback的time不是从1970年1月1日到当前所经过的毫秒数！
        return window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback, element) {
                var start, finish;
                window.setTimeout(function () {
                    start = +new Date();
                    callback(start);
                    finish = +new Date();
                    self.timeout = 1000 / 60 - (finish - start);
                }, self.timeout);
            };
    }());
    window.cancelNextRequestAnimationFrame = window.cancelRequestAnimationFrame
        || window.webkitCancelAnimationFrame
        || window.webkitCancelRequestAnimationFrame
        || window.mozCancelRequestAnimationFrame
        || window.oCancelRequestAnimationFrame
        || window.msCancelRequestAnimationFrame
        || clearTimeout;
    var Director = (function () {
        function Director() {
            //todo :Renderer
            this._renderer = null;
            this._view = null;
            this._gl = null;
            this._scene = null;
            this._loopId = null;
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
            this._renderer = Engine3D.WebGLRenderer.create();
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
            this._view = Engine3D.ViewWebGL.create(dyCb.DomQuery.create(canvasId).get(0));
            this._gl = this._view.getContext();
        };
        Director.prototype._startLoop = function () {
            var self = this, mainLoop = null;
            mainLoop = function (time) {
                self._loopBody(time);
                self._loopId = window.requestNextAnimationFrame(mainLoop);
            };
            this._loopId = window.requestNextAnimationFrame(mainLoop);
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
    Engine3D.Director = Director;
})(Engine3D || (Engine3D = {}));

/// <reference path="definitions.d.ts"/>
var Engine3D;
(function (Engine3D) {
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
            this._pMatrix = Engine3D.Matrix.create();
            this._vMatrix = Engine3D.Matrix.create();
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
            var matrix = Engine3D.Matrix.create();
            matrix.applyMatrix(this._vMatrix);
            matrix.applyMatrix(this._pMatrix);
            return matrix;
        };
        Camera.prototype.moveLeft = function () {
            this._computeMoveDistance(Engine3D.Vector4.create(-this._moveSpeed, 0, 0, 1));
            //绕x轴旋转时，投影xy平面为垂直方向，而Left和Right移动投影到xy平面为水平方向，因此绕x轴旋转不会影响Left和Right移动
            //this._moveX = this._moveX + cos(this._rotateAngleY * PI / 180) * this._moveSpeed;
            //this._moveZ = this._moveZ + sin(this._rotateAngleY* PI / 180) *this._moveSpeed;
        };
        Camera.prototype.moveRight = function () {
            this._computeMoveDistance(Engine3D.Vector4.create(this._moveSpeed, 0, 0, 1));
            //this._moveX = this._moveX - cos(this._rotateAngleY * PI / 180) * this._moveSpeed;
            //this._moveZ = this._moveZ - sin(this._rotateAngleY* PI / 180) *this._moveSpeed;
        };
        Camera.prototype.moveBack = function () {
            this._computeMoveDistance(Engine3D.Vector4.create(0, 0, this._moveSpeed, 1));
            //this._moveY = this._moveY - sin(this._rotateAngleX * PI / 180) * this._moveSpeed;
            //this._moveZ = this._moveZ + cos(this._rotateAngleX* PI / 180) *this._moveSpeed;
            //this._moveX = this._moveX + sin(this._rotateAngleY * PI / 180) * this._moveSpeed;
            //this._moveZ = this._moveZ - cos(this._rotateAngleY* PI / 180) *this._moveSpeed;
        };
        Camera.prototype.moveFront = function () {
            this._computeMoveDistance(Engine3D.Vector4.create(0, 0, -this._moveSpeed, 1));
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
            var matrix = Engine3D.Matrix.create();
            matrix.setRotate(this._rotateAngleX, 1.0, 0.0, 0.0);
            matrix.rotate(this._rotateAngleY, 0.0, 1.0, 0.0);
            var result = matrix.multiplyVector4(speedVec4).values;
            this._moveX += result[0];
            this._moveY += result[1];
            this._moveZ += result[2];
        };
        return Camera;
    })();
    Engine3D.Camera = Camera;
})(Engine3D || (Engine3D = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0cnVjdHVyZS9Qb2ludC50cyIsInN0cnVjdHVyZS9Qb3NpdGlvbi50cyIsInN0cnVjdHVyZS9WaWV3LnRzIiwibWF0aC9WZWN0b3IzLnRzIiwibWF0aC9WZWN0b3I0LnRzIiwibWF0aC9NYXRyaXgudHMiLCJhY3Rpb24vQWN0aW9uLnRzIiwiYWN0aW9uL0FjdGlvbk1hbmFnZXIudHMiLCJhY3Rpb24vUm90YXRlLnRzIiwiYWN0aW9uL1NjYWxlLnRzIiwiYWN0aW9uL1RyYW5zbGF0ZS50cyIsInV0aWxzL0NvbG9yLnRzIiwidXRpbHMvSnVkZ2VVdGlscy50cyIsInJlbmRlci9TaGFkZXJUeXBlLnRzIiwicmVuZGVyL1NoYWRlci50cyIsInJlbmRlci9CdWZmZXJUeXBlLnRzIiwicmVuZGVyL0F0dHJpYnV0ZURhdGFUeXBlLnRzIiwicmVuZGVyL0RyYXdNb2RlLnRzIiwicmVuZGVyL0VsZW1lbnRCdWZmZXIudHMiLCJyZW5kZXIvQXJyYXlCdWZmZXIudHMiLCJyZW5kZXIvVW5pZm9ybURhdGFUeXBlLnRzIiwicmVuZGVyL1Byb2dyYW0udHMiLCJyZW5kZXIvUXVhZENvbW1hbmQudHMiLCJyZW5kZXIvV2ViR0xSZW5kZXJlci50cyIsIm1hdGVyaWFsL01lc2hNYXRlcmlhbC50cyIsImxvYWRlci9HTFNMTG9hZGVyLnRzIiwibG9hZGVyL0xvYWRlck1hbmFnZXIudHMiLCJnZW9tZXRyeS9HZW9tZXRyeS50cyIsImdlb21ldHJ5L0JveEdlb21ldHJ5LnRzIiwiZ2VvbWV0cnkvUmVjdEdlb21ldHJ5LnRzIiwiZ2VvbWV0cnkvU3BoZXJlRHJhd01vZGUudHMiLCJnZW9tZXRyeS9TcGhlcmVHZW9tZXRyeS50cyIsImdlb21ldHJ5L1RyaWFuZ2xlR2VvbWV0cnkudHMiLCJldmVudC9zdHJ1Y3R1cmUvRXZlbnRMaXN0ZW5lck1hcC50cyIsImV2ZW50L29iamVjdC9FdmVudFR5cGUudHMiLCJldmVudC9vYmplY3QvRXZlbnROYW1lLnRzIiwiZXZlbnQvb2JqZWN0L0V2ZW50UGhhc2UudHMiLCJldmVudC9vYmplY3QvRXZlbnRUYWJsZS50cyIsImV2ZW50L29iamVjdC9FdmVudC50cyIsImV2ZW50L29iamVjdC9Nb3VzZUV2ZW50LnRzIiwiZXZlbnQvb2JqZWN0L0tleWJvYXJkRXZlbnQudHMiLCJldmVudC9vYmplY3QvQ3VzdG9tRXZlbnQudHMiLCJldmVudC9vYmplY3QvTW91c2VCdXR0b24udHMiLCJldmVudC9saXN0ZW5lci9FdmVudExpc3RlbmVyLnRzIiwiZXZlbnQvaGFuZGxlci9FdmVudEhhbmRsZXIudHMiLCJldmVudC9oYW5kbGVyL0RvbUV2ZW50SGFuZGxlci50cyIsImV2ZW50L2hhbmRsZXIvTW91c2VFdmVudEhhbmRsZXIudHMiLCJldmVudC9oYW5kbGVyL0tleWJvYXJkRXZlbnRIYW5kbGVyLnRzIiwiZXZlbnQvaGFuZGxlci9DdXN0b21FdmVudEhhbmRsZXIudHMiLCJldmVudC9kaXNwYXRjaGVyL0V2ZW50RGlzcGF0Y2hlci50cyIsImV2ZW50L2JpbmRlci9FdmVudFJlZ2lzdGVyLnRzIiwiZXZlbnQvYmluZGVyL0V2ZW50QmluZGVyLnRzIiwiZXZlbnQvZmFjdG9yeS9GYWN0b3J5RXZlbnRIYW5kbGVyLnRzIiwiZXZlbnQvRXZlbnRNYW5hZ2VyLnRzIiwiY29yZS9HYW1lT2JqZWN0LnRzIiwiY29yZS9NZXNoLnRzIiwiY29yZS9TY2VuZS50cyIsImNvcmUvRGlyZWN0b3IudHMiLCJDYW1lcmEudHMiXSwibmFtZXMiOlsiRW5naW5lM0QiLCJFbmdpbmUzRC5Qb2ludCIsIkVuZ2luZTNELlBvaW50LmNvbnN0cnVjdG9yIiwiRW5naW5lM0QuUG9pbnQuY3JlYXRlIiwiRW5naW5lM0QuUG9zaXRpb24iLCJFbmdpbmUzRC5Qb3NpdGlvbi5jb25zdHJ1Y3RvciIsIkVuZ2luZTNELlBvc2l0aW9uLmNyZWF0ZSIsIkVuZ2luZTNELlZpZXdXZWJHTCIsIkVuZ2luZTNELlZpZXdXZWJHTC5jb25zdHJ1Y3RvciIsIkVuZ2luZTNELlZpZXdXZWJHTC5jcmVhdGUiLCJFbmdpbmUzRC5WaWV3V2ViR0wub2Zmc2V0IiwiRW5naW5lM0QuVmlld1dlYkdMLmRvbSIsIkVuZ2luZTNELlZpZXdXZWJHTC53aWR0aCIsIkVuZ2luZTNELlZpZXdXZWJHTC5oZWlnaHQiLCJFbmdpbmUzRC5WaWV3V2ViR0wuZ2V0Q29udGV4dCIsIkVuZ2luZTNELlZlY3RvcjMiLCJFbmdpbmUzRC5WZWN0b3IzLmNvbnN0cnVjdG9yIiwiRW5naW5lM0QuVmVjdG9yMy5jcmVhdGUiLCJFbmdpbmUzRC5WZWN0b3IzLnZhbHVlcyIsIkVuZ2luZTNELlZlY3RvcjMubm9ybWFsaXplIiwiRW5naW5lM0QuVmVjdG9yMy5zdWIiLCJFbmdpbmUzRC5WZWN0b3IzLnJldmVyc2UiLCJFbmdpbmUzRC5WZWN0b3IzLmNvcHkiLCJFbmdpbmUzRC5WZWN0b3IzLnRvVmVjNCIsIkVuZ2luZTNELlZlY3RvcjQiLCJFbmdpbmUzRC5WZWN0b3I0LmNvbnN0cnVjdG9yIiwiRW5naW5lM0QuVmVjdG9yNC5jcmVhdGUiLCJFbmdpbmUzRC5WZWN0b3I0LnZhbHVlcyIsIkVuZ2luZTNELlZlY3RvcjQubm9ybWFsaXplIiwiRW5naW5lM0QuVmVjdG9yNC50b1ZlYzMiLCJFbmdpbmUzRC5NYXRyaXgiLCJFbmdpbmUzRC5NYXRyaXguY29uc3RydWN0b3IiLCJFbmdpbmUzRC5NYXRyaXguY3JlYXRlIiwiRW5naW5lM0QuTWF0cml4LnZhbHVlcyIsIkVuZ2luZTNELk1hdHJpeC5wdXNoIiwiRW5naW5lM0QuTWF0cml4LnBvcCIsIkVuZ2luZTNELk1hdHJpeC5zZXRJZGVudGl0eSIsIkVuZ2luZTNELk1hdHJpeC5zZXRJbnZlcnNlT2YiLCJFbmdpbmUzRC5NYXRyaXguaW52ZXJzZU9mIiwiRW5naW5lM0QuTWF0cml4LnRyYW5zcG9zZSIsIkVuZ2luZTNELk1hdHJpeC5zZXRUcmFuc2xhdGUiLCJFbmdpbmUzRC5NYXRyaXgudHJhbnNsYXRlIiwiRW5naW5lM0QuTWF0cml4LnNldFJvdGF0ZSIsIkVuZ2luZTNELk1hdHJpeC5yb3RhdGUiLCJFbmdpbmUzRC5NYXRyaXguc2V0U2NhbGUiLCJFbmdpbmUzRC5NYXRyaXguc2NhbGUiLCJFbmdpbmUzRC5NYXRyaXguc2V0TG9va0F0IiwiRW5naW5lM0QuTWF0cml4Lmxvb2tBdCIsIkVuZ2luZTNELk1hdHJpeC5zZXRPcnRobyIsIkVuZ2luZTNELk1hdHJpeC5vcnRobyIsIkVuZ2luZTNELk1hdHJpeC5zZXRQZXJzcGVjdGl2ZSIsIkVuZ2luZTNELk1hdHJpeC5wZXJzcGVjdGl2ZSIsIkVuZ2luZTNELk1hdHJpeC5hcHBseU1hdHJpeCIsIkVuZ2luZTNELk1hdHJpeC5tdWx0aXBseSIsIkVuZ2luZTNELk1hdHJpeC5tdWx0aXBseVZlY3RvcjQiLCJFbmdpbmUzRC5NYXRyaXguY29weSIsIkVuZ2luZTNELkFjdGlvbiIsIkVuZ2luZTNELkFjdGlvbi5jb25zdHJ1Y3RvciIsIkVuZ2luZTNELkFjdGlvbi5pc0ZpbmlzaCIsIkVuZ2luZTNELkFjdGlvbi51cGRhdGUiLCJFbmdpbmUzRC5BY3Rpb24uZmluaXNoIiwiRW5naW5lM0QuQWN0aW9uTWFuYWdlciIsIkVuZ2luZTNELkFjdGlvbk1hbmFnZXIuY29uc3RydWN0b3IiLCJFbmdpbmUzRC5BY3Rpb25NYW5hZ2VyLmNyZWF0ZSIsIkVuZ2luZTNELkFjdGlvbk1hbmFnZXIuYWRkQ2hpbGQiLCJFbmdpbmUzRC5BY3Rpb25NYW5hZ2VyLmhhc0NoaWxkIiwiRW5naW5lM0QuQWN0aW9uTWFuYWdlci51cGRhdGUiLCJFbmdpbmUzRC5Sb3RhdGUiLCJFbmdpbmUzRC5Sb3RhdGUuY29uc3RydWN0b3IiLCJFbmdpbmUzRC5Sb3RhdGUuY3JlYXRlIiwiRW5naW5lM0QuUm90YXRlLnVwZGF0ZSIsIkVuZ2luZTNELlJvdGF0ZS5faXNOb3RSb3RhdGVBcm91bmRPcmlnaW5Qb2ludCIsIkVuZ2luZTNELlNjYWxlIiwiRW5naW5lM0QuU2NhbGUuY29uc3RydWN0b3IiLCJFbmdpbmUzRC5TY2FsZS5jcmVhdGUiLCJFbmdpbmUzRC5TY2FsZS51cGRhdGUiLCJFbmdpbmUzRC5UcmFuc2xhdGUiLCJFbmdpbmUzRC5UcmFuc2xhdGUuY29uc3RydWN0b3IiLCJFbmdpbmUzRC5UcmFuc2xhdGUuY3JlYXRlIiwiRW5naW5lM0QuVHJhbnNsYXRlLnVwZGF0ZSIsIkVuZ2luZTNELkNvbG9yIiwiRW5naW5lM0QuQ29sb3IuY29uc3RydWN0b3IiLCJFbmdpbmUzRC5Db2xvci5jcmVhdGUiLCJFbmdpbmUzRC5Db2xvci5yIiwiRW5naW5lM0QuQ29sb3IuZyIsIkVuZ2luZTNELkNvbG9yLmIiLCJFbmdpbmUzRC5Db2xvci5pbml0V2hlbkNyZWF0ZSIsIkVuZ2luZTNELkNvbG9yLl9zZXRDb2xvciIsIkVuZ2luZTNELkNvbG9yLl9zZXRIZXgiLCJFbmdpbmUzRC5KdWRnZVV0aWxzIiwiRW5naW5lM0QuSnVkZ2VVdGlscy5jb25zdHJ1Y3RvciIsIkVuZ2luZTNELkp1ZGdlVXRpbHMuaXNWaWV3IiwiRW5naW5lM0QuSnVkZ2VVdGlscy5pc0VxdWFsIiwiRW5naW5lM0QuU2hhZGVyVHlwZSIsIkVuZ2luZTNELlNoYWRlciIsIkVuZ2luZTNELlNoYWRlci5jb25zdHJ1Y3RvciIsIkVuZ2luZTNELlNoYWRlci5jcmVhdGVTaGFkZXIiLCJFbmdpbmUzRC5CdWZmZXJUeXBlIiwiRW5naW5lM0QuQXR0cmlidXRlRGF0YVR5cGUiLCJFbmdpbmUzRC5EcmF3TW9kZSIsIkVuZ2luZTNELkVsZW1lbnRCdWZmZXIiLCJFbmdpbmUzRC5FbGVtZW50QnVmZmVyLmNvbnN0cnVjdG9yIiwiRW5naW5lM0QuRWxlbWVudEJ1ZmZlci5jcmVhdGUiLCJFbmdpbmUzRC5FbGVtZW50QnVmZmVyLmJ1ZmZlciIsIkVuZ2luZTNELkVsZW1lbnRCdWZmZXIudHlwZSIsIkVuZ2luZTNELkVsZW1lbnRCdWZmZXIubnVtIiwiRW5naW5lM0QuRWxlbWVudEJ1ZmZlci50eXBlU2l6ZSIsIkVuZ2luZTNELkVsZW1lbnRCdWZmZXIuaW5pdFdoZW5DcmVhdGUiLCJFbmdpbmUzRC5FbGVtZW50QnVmZmVyLl9jaGVja0RhdGFUeXBlIiwiRW5naW5lM0QuRWxlbWVudEJ1ZmZlci5fZ2V0SW5mbyIsIkVuZ2luZTNELkFycmF5QnVmZmVyIiwiRW5naW5lM0QuQXJyYXlCdWZmZXIuY29uc3RydWN0b3IiLCJFbmdpbmUzRC5BcnJheUJ1ZmZlci5jcmVhdGUiLCJFbmdpbmUzRC5BcnJheUJ1ZmZlci5idWZmZXIiLCJFbmdpbmUzRC5BcnJheUJ1ZmZlci5udW0iLCJFbmdpbmUzRC5BcnJheUJ1ZmZlci50eXBlIiwiRW5naW5lM0QuQXJyYXlCdWZmZXIuY291bnQiLCJFbmdpbmUzRC5BcnJheUJ1ZmZlci5pbml0V2hlbkNyZWF0ZSIsIkVuZ2luZTNELlVuaWZvcm1EYXRhVHlwZSIsIkVuZ2luZTNELlByb2dyYW0iLCJFbmdpbmUzRC5Qcm9ncmFtLmNvbnN0cnVjdG9yIiwiRW5naW5lM0QuUHJvZ3JhbS5jcmVhdGUiLCJFbmdpbmUzRC5Qcm9ncmFtLnVzZSIsIkVuZ2luZTNELlByb2dyYW0uc2V0VW5pZm9ybURhdGEiLCJFbmdpbmUzRC5Qcm9ncmFtLnNldEF0dHJpYnV0ZURhdGEiLCJFbmdpbmUzRC5Qcm9ncmFtLmluaXRXaGVuQ3JlYXRlIiwiRW5naW5lM0QuUXVhZENvbW1hbmQiLCJFbmdpbmUzRC5RdWFkQ29tbWFuZC5jb25zdHJ1Y3RvciIsIkVuZ2luZTNELlF1YWRDb21tYW5kLmNyZWF0ZSIsIkVuZ2luZTNELlF1YWRDb21tYW5kLmJ1ZmZlcnMiLCJFbmdpbmUzRC5RdWFkQ29tbWFuZC5jb2xvciIsIkVuZ2luZTNELlF1YWRDb21tYW5kLmRyYXdNb2RlIiwiRW5naW5lM0QuUXVhZENvbW1hbmQuZXhlY3V0ZSIsIkVuZ2luZTNELlF1YWRDb21tYW5kLmluaXQiLCJFbmdpbmUzRC5RdWFkQ29tbWFuZC5fc2VuZERhdGEiLCJFbmdpbmUzRC5RdWFkQ29tbWFuZC5fZHJhdyIsIkVuZ2luZTNELldlYkdMUmVuZGVyZXIiLCJFbmdpbmUzRC5XZWJHTFJlbmRlcmVyLmNvbnN0cnVjdG9yIiwiRW5naW5lM0QuV2ViR0xSZW5kZXJlci5jcmVhdGUiLCJFbmdpbmUzRC5XZWJHTFJlbmRlcmVyLmNyZWF0ZVF1YWRDb21tYW5kIiwiRW5naW5lM0QuV2ViR0xSZW5kZXJlci5hZGRDb21tYW5kIiwiRW5naW5lM0QuV2ViR0xSZW5kZXJlci5yZW5kZXIiLCJFbmdpbmUzRC5XZWJHTFJlbmRlcmVyLmluaXQiLCJFbmdpbmUzRC5XZWJHTFJlbmRlcmVyLnNldENsZWFyQ29sb3IiLCJFbmdpbmUzRC5XZWJHTFJlbmRlcmVyLl9jbGVhckNvbW1hbmQiLCJFbmdpbmUzRC5NZXNoTWF0ZXJpYWwiLCJFbmdpbmUzRC5NZXNoTWF0ZXJpYWwuY29uc3RydWN0b3IiLCJFbmdpbmUzRC5NZXNoTWF0ZXJpYWwuY3JlYXRlIiwiRW5naW5lM0QuTWVzaE1hdGVyaWFsLmNvbG9yIiwiRW5naW5lM0QuR0xTTExvYWRlciIsIkVuZ2luZTNELkdMU0xMb2FkZXIuY29uc3RydWN0b3IiLCJFbmdpbmUzRC5HTFNMTG9hZGVyLmdldEluc3RhbmNlIiwiRW5naW5lM0QuR0xTTExvYWRlci5sb2FkIiwiRW5naW5lM0QuR0xTTExvYWRlci5nZXRHTFNMIiwiRW5naW5lM0QuR0xTTExvYWRlci5fbG9hZFRleHQiLCJFbmdpbmUzRC5Mb2FkZXJNYW5hZ2VyIiwiRW5naW5lM0QuTG9hZGVyTWFuYWdlci5jb25zdHJ1Y3RvciIsIkVuZ2luZTNELkxvYWRlck1hbmFnZXIuZ2V0SW5zdGFuY2UiLCJFbmdpbmUzRC5Mb2FkZXJNYW5hZ2VyLmdldFJlc291cmNlQ291bnQiLCJFbmdpbmUzRC5Mb2FkZXJNYW5hZ2VyLmdldEN1cnJlbnRMb2FkZWRDb3VudCIsIkVuZ2luZTNELkxvYWRlck1hbmFnZXIubG9hZCIsIkVuZ2luZTNELkxvYWRlck1hbmFnZXIucmVzZXQiLCJFbmdpbmUzRC5Mb2FkZXJNYW5hZ2VyLm9uUmVzTG9hZGVkIiwiRW5naW5lM0QuTG9hZGVyTWFuYWdlci5vblJlc0Vycm9yIiwiRW5naW5lM0QuTG9hZGVyTWFuYWdlci5faXNGaW5pc2hMb2FkIiwiRW5naW5lM0QuR2VvbWV0cnkiLCJFbmdpbmUzRC5HZW9tZXRyeS5jb25zdHJ1Y3RvciIsIkVuZ2luZTNELkdlb21ldHJ5LnZlcnRpY2VzIiwiRW5naW5lM0QuR2VvbWV0cnkuaW5kaWNlcyIsIkVuZ2luZTNELkdlb21ldHJ5LmNvbG9ycyIsIkVuZ2luZTNELkdlb21ldHJ5LmluaXRXaGVuQ3JlYXRlIiwiRW5naW5lM0QuR2VvbWV0cnkuY29tcHV0ZVZlcnRpY2VzQnVmZmVyIiwiRW5naW5lM0QuR2VvbWV0cnkuY29tcHV0ZUluZGljZXNCdWZmZXIiLCJFbmdpbmUzRC5HZW9tZXRyeS5fY29tcHV0ZUNvbG9yc0J1ZmZlciIsIkVuZ2luZTNELkJveEdlb21ldHJ5IiwiRW5naW5lM0QuQm94R2VvbWV0cnkuY29uc3RydWN0b3IiLCJFbmdpbmUzRC5Cb3hHZW9tZXRyeS5jcmVhdGUiLCJFbmdpbmUzRC5Cb3hHZW9tZXRyeS5jb21wdXRlVmVydGljZXNCdWZmZXIiLCJFbmdpbmUzRC5Cb3hHZW9tZXRyeS5jb21wdXRlSW5kaWNlc0J1ZmZlciIsIkVuZ2luZTNELlJlY3RHZW9tZXRyeSIsIkVuZ2luZTNELlJlY3RHZW9tZXRyeS5jb25zdHJ1Y3RvciIsIkVuZ2luZTNELlJlY3RHZW9tZXRyeS5jcmVhdGUiLCJFbmdpbmUzRC5SZWN0R2VvbWV0cnkuY29tcHV0ZVZlcnRpY2VzQnVmZmVyIiwiRW5naW5lM0QuUmVjdEdlb21ldHJ5LmNvbXB1dGVJbmRpY2VzQnVmZmVyIiwiRW5naW5lM0QuU3BoZXJlRHJhd01vZGUiLCJFbmdpbmUzRC5TcGhlcmVHZW9tZXRyeSIsIkVuZ2luZTNELlNwaGVyZUdlb21ldHJ5LmNvbnN0cnVjdG9yIiwiRW5naW5lM0QuU3BoZXJlR2VvbWV0cnkuY3JlYXRlIiwiRW5naW5lM0QuU3BoZXJlR2VvbWV0cnkuaW5pdFdoZW5DcmVhdGUiLCJFbmdpbmUzRC5TcGhlcmVHZW9tZXRyeS5jb21wdXRlVmVydGljZXNCdWZmZXIiLCJFbmdpbmUzRC5TcGhlcmVHZW9tZXRyeS5jb21wdXRlSW5kaWNlc0J1ZmZlciIsIkVuZ2luZTNELlNwaGVyZUdlb21ldHJ5Ll9jb21wdXRlRGF0YSIsIkVuZ2luZTNELkdldERhdGFCeUxhdGl0dWRlTG9uZ3RpdHVkZSIsIkVuZ2luZTNELkdldERhdGFCeUxhdGl0dWRlTG9uZ3RpdHVkZS5jb25zdHJ1Y3RvciIsIkVuZ2luZTNELkdldERhdGFCeUxhdGl0dWRlTG9uZ3RpdHVkZS5jcmVhdGUiLCJFbmdpbmUzRC5HZXREYXRhQnlMYXRpdHVkZUxvbmd0aXR1ZGUudmVydGljZXMiLCJFbmdpbmUzRC5HZXREYXRhQnlMYXRpdHVkZUxvbmd0aXR1ZGUuaW5kaWNlcyIsIkVuZ2luZTNELkdldERhdGFCeUxhdGl0dWRlTG9uZ3RpdHVkZS5nZXREYXRhIiwiRW5naW5lM0QuR2V0RGF0YUJ5RGVjb21wb3NpdGlvbiIsIkVuZ2luZTNELkdldERhdGFCeURlY29tcG9zaXRpb24uY29uc3RydWN0b3IiLCJFbmdpbmUzRC5HZXREYXRhQnlEZWNvbXBvc2l0aW9uLmNyZWF0ZSIsIkVuZ2luZTNELkdldERhdGFCeURlY29tcG9zaXRpb24udmVydGljZXMiLCJFbmdpbmUzRC5HZXREYXRhQnlEZWNvbXBvc2l0aW9uLmluZGljZXMiLCJFbmdpbmUzRC5HZXREYXRhQnlEZWNvbXBvc2l0aW9uLmdldERhdGEiLCJFbmdpbmUzRC5HZXREYXRhQnlEZWNvbXBvc2l0aW9uLl9zdWJEaXZpZGUiLCJFbmdpbmUzRC5HZXREYXRhQnlEZWNvbXBvc2l0aW9uLl9ub3JtYWxpemUiLCJFbmdpbmUzRC5UcmlhbmdsZUdlb21ldHJ5IiwiRW5naW5lM0QuVHJpYW5nbGVHZW9tZXRyeS5jb25zdHJ1Y3RvciIsIkVuZ2luZTNELlRyaWFuZ2xlR2VvbWV0cnkuY3JlYXRlIiwiRW5naW5lM0QuVHJpYW5nbGVHZW9tZXRyeS5jb21wdXRlVmVydGljZXNCdWZmZXIiLCJFbmdpbmUzRC5UcmlhbmdsZUdlb21ldHJ5LmNvbXB1dGVJbmRpY2VzQnVmZmVyIiwiRW5naW5lM0QuRXZlbnRMaXN0ZW5lck1hcCIsIkVuZ2luZTNELkV2ZW50TGlzdGVuZXJNYXAuY29uc3RydWN0b3IiLCJFbmdpbmUzRC5FdmVudExpc3RlbmVyTWFwLmNyZWF0ZSIsIkVuZ2luZTNELkV2ZW50TGlzdGVuZXJNYXAuYXBwZW5kQ2hpbGQiLCJFbmdpbmUzRC5FdmVudExpc3RlbmVyTWFwLmdldENoaWxkIiwiRW5naW5lM0QuRXZlbnRMaXN0ZW5lck1hcC5oYXNDaGlsZCIsIkVuZ2luZTNELkV2ZW50TGlzdGVuZXJNYXAuZmlsdGVyIiwiRW5naW5lM0QuRXZlbnRMaXN0ZW5lck1hcC5mb3JFYWNoIiwiRW5naW5lM0QuRXZlbnRMaXN0ZW5lck1hcC5yZW1vdmVDaGlsZCIsIkVuZ2luZTNELkV2ZW50TGlzdGVuZXJNYXAuZ2V0RXZlbnRPZmZEYXRhTGlzdCIsIkVuZ2luZTNELkV2ZW50TGlzdGVuZXJNYXAuZ2V0RXZlbnROYW1lRnJvbUtleSIsIkVuZ2luZTNELkV2ZW50TGlzdGVuZXJNYXAuZ2V0VWlkRnJvbUtleSIsIkVuZ2luZTNELkV2ZW50TGlzdGVuZXJNYXAuaXNUYXJnZXQiLCJFbmdpbmUzRC5FdmVudExpc3RlbmVyTWFwLl9idWlsZEtleSIsIkVuZ2luZTNELkV2ZW50TGlzdGVuZXJNYXAuX2J1aWxkS2V5V2l0aFVpZCIsIkVuZ2luZTNELkV2ZW50VHlwZSIsIkVuZ2luZTNELkV2ZW50TmFtZSIsIkVuZ2luZTNELkV2ZW50UGhhc2UiLCJFbmdpbmUzRC5FdmVudFRhYmxlIiwiRW5naW5lM0QuRXZlbnRUYWJsZS5jb25zdHJ1Y3RvciIsIkVuZ2luZTNELkV2ZW50VGFibGUuZ2V0RXZlbnRUeXBlIiwiRW5naW5lM0QuRXZlbnQiLCJFbmdpbmUzRC5FdmVudC5jb25zdHJ1Y3RvciIsIkVuZ2luZTNELkV2ZW50Lm5hbWUiLCJFbmdpbmUzRC5FdmVudC50YXJnZXQiLCJFbmdpbmUzRC5FdmVudC5jdXJyZW50VGFyZ2V0IiwiRW5naW5lM0QuRXZlbnQuaXNTdG9wUHJvcGFnYXRpb24iLCJFbmdpbmUzRC5FdmVudC5waGFzZSIsIkVuZ2luZTNELkV2ZW50LmNvcHkiLCJFbmdpbmUzRC5FdmVudC5zdG9wUHJvcGFnYXRpb24iLCJFbmdpbmUzRC5FdmVudC5jb3B5TWVtYmVyIiwiRW5naW5lM0QuTW91c2VFdmVudCIsIkVuZ2luZTNELk1vdXNlRXZlbnQuY29uc3RydWN0b3IiLCJFbmdpbmUzRC5Nb3VzZUV2ZW50LmNyZWF0ZSIsIkVuZ2luZTNELk1vdXNlRXZlbnQuZXZlbnQiLCJFbmdpbmUzRC5Nb3VzZUV2ZW50LmxvY2F0aW9uIiwiRW5naW5lM0QuTW91c2VFdmVudC5sb2NhdGlvbkluVmlldyIsIkVuZ2luZTNELk1vdXNlRXZlbnQuYnV0dG9uIiwiRW5naW5lM0QuTW91c2VFdmVudC5jb3B5IiwiRW5naW5lM0QuS2V5Ym9hcmRFdmVudCIsIkVuZ2luZTNELktleWJvYXJkRXZlbnQuY29uc3RydWN0b3IiLCJFbmdpbmUzRC5LZXlib2FyZEV2ZW50LmNyZWF0ZSIsIkVuZ2luZTNELktleWJvYXJkRXZlbnQuZXZlbnQiLCJFbmdpbmUzRC5LZXlib2FyZEV2ZW50LmN0cmxLZXkiLCJFbmdpbmUzRC5LZXlib2FyZEV2ZW50LmFsdEtleSIsIkVuZ2luZTNELktleWJvYXJkRXZlbnQuc2hpZnRLZXkiLCJFbmdpbmUzRC5LZXlib2FyZEV2ZW50Lm1ldGFLZXkiLCJFbmdpbmUzRC5LZXlib2FyZEV2ZW50LmtleUNvZGUiLCJFbmdpbmUzRC5LZXlib2FyZEV2ZW50LmtleSIsIkVuZ2luZTNELktleWJvYXJkRXZlbnQuY29weSIsIkVuZ2luZTNELkN1c3RvbUV2ZW50IiwiRW5naW5lM0QuQ3VzdG9tRXZlbnQuY29uc3RydWN0b3IiLCJFbmdpbmUzRC5DdXN0b21FdmVudC5jcmVhdGUiLCJFbmdpbmUzRC5DdXN0b21FdmVudC51c2VyRGF0YSIsIkVuZ2luZTNELkN1c3RvbUV2ZW50LmNvcHlQdWJsaWNBdHRyaSIsIkVuZ2luZTNELkN1c3RvbUV2ZW50LmNvcHkiLCJFbmdpbmUzRC5Nb3VzZUJ1dHRvbiIsIkVuZ2luZTNELkV2ZW50TGlzdGVuZXIiLCJFbmdpbmUzRC5FdmVudExpc3RlbmVyLmNvbnN0cnVjdG9yIiwiRW5naW5lM0QuRXZlbnRMaXN0ZW5lci5jcmVhdGUiLCJFbmdpbmUzRC5FdmVudExpc3RlbmVyLmV2ZW50VHlwZSIsIkVuZ2luZTNELkV2ZW50TGlzdGVuZXIucHJpb3JpdHkiLCJFbmdpbmUzRC5FdmVudExpc3RlbmVyLmhhbmRsZXJEYXRhTGlzdCIsIkVuZ2luZTNELkV2ZW50TGlzdGVuZXIuaW5pdFdoZW5DcmVhdGUiLCJFbmdpbmUzRC5FdmVudExpc3RlbmVyLl9zZXRIYW5kbGVyRGF0YUxpc3QiLCJFbmdpbmUzRC5FdmVudExpc3RlbmVyLl9wYXJzZUV2ZW50TmFtZSIsIkVuZ2luZTNELkV2ZW50SGFuZGxlciIsIkVuZ2luZTNELkV2ZW50SGFuZGxlci5jb25zdHJ1Y3RvciIsIkVuZ2luZTNELkV2ZW50SGFuZGxlci5vbiIsIkVuZ2luZTNELkV2ZW50SGFuZGxlci5vZmYiLCJFbmdpbmUzRC5FdmVudEhhbmRsZXIudHJpZ2dlciIsIkVuZ2luZTNELkRvbUV2ZW50SGFuZGxlciIsIkVuZ2luZTNELkRvbUV2ZW50SGFuZGxlci5jb25zdHJ1Y3RvciIsIkVuZ2luZTNELkRvbUV2ZW50SGFuZGxlci5vZmYiLCJFbmdpbmUzRC5Eb21FdmVudEhhbmRsZXIuZ2V0RG9tIiwiRW5naW5lM0QuRG9tRXZlbnRIYW5kbGVyLmJ1aWxkV3JhcEhhbmRsZXIiLCJFbmdpbmUzRC5Eb21FdmVudEhhbmRsZXIuaGFuZGxlciIsIkVuZ2luZTNELkRvbUV2ZW50SGFuZGxlci5fYmluZCIsIkVuZ2luZTNELkRvbUV2ZW50SGFuZGxlci5fdW5CaW5kIiwiRW5naW5lM0QuTW91c2VFdmVudEhhbmRsZXIiLCJFbmdpbmUzRC5Nb3VzZUV2ZW50SGFuZGxlci5jb25zdHJ1Y3RvciIsIkVuZ2luZTNELk1vdXNlRXZlbnRIYW5kbGVyLmdldEluc3RhbmNlIiwiRW5naW5lM0QuTW91c2VFdmVudEhhbmRsZXIub24iLCJFbmdpbmUzRC5Nb3VzZUV2ZW50SGFuZGxlci50cmlnZ2VyIiwiRW5naW5lM0QuTW91c2VFdmVudEhhbmRsZXIuZ2V0RG9tIiwiRW5naW5lM0QuTW91c2VFdmVudEhhbmRsZXIuYnVpbGRXcmFwSGFuZGxlciIsIkVuZ2luZTNELk1vdXNlRXZlbnRIYW5kbGVyLl9pc1RyaWdnZXIiLCJFbmdpbmUzRC5Nb3VzZUV2ZW50SGFuZGxlci5fY3JlYXRlRXZlbnRPYmplY3QiLCJFbmdpbmUzRC5LZXlib2FyZEV2ZW50SGFuZGxlciIsIkVuZ2luZTNELktleWJvYXJkRXZlbnRIYW5kbGVyLmNvbnN0cnVjdG9yIiwiRW5naW5lM0QuS2V5Ym9hcmRFdmVudEhhbmRsZXIuZ2V0SW5zdGFuY2UiLCJFbmdpbmUzRC5LZXlib2FyZEV2ZW50SGFuZGxlci5vbiIsIkVuZ2luZTNELktleWJvYXJkRXZlbnRIYW5kbGVyLnRyaWdnZXIiLCJFbmdpbmUzRC5LZXlib2FyZEV2ZW50SGFuZGxlci5nZXREb20iLCJFbmdpbmUzRC5LZXlib2FyZEV2ZW50SGFuZGxlci5idWlsZFdyYXBIYW5kbGVyIiwiRW5naW5lM0QuS2V5Ym9hcmRFdmVudEhhbmRsZXIuX2lzVHJpZ2dlciIsIkVuZ2luZTNELktleWJvYXJkRXZlbnRIYW5kbGVyLl9jcmVhdGVFdmVudE9iamVjdCIsIkVuZ2luZTNELkN1c3RvbUV2ZW50SGFuZGxlciIsIkVuZ2luZTNELkN1c3RvbUV2ZW50SGFuZGxlci5jb25zdHJ1Y3RvciIsIkVuZ2luZTNELkN1c3RvbUV2ZW50SGFuZGxlci5nZXRJbnN0YW5jZSIsIkVuZ2luZTNELkN1c3RvbUV2ZW50SGFuZGxlci5vbiIsIkVuZ2luZTNELkN1c3RvbUV2ZW50SGFuZGxlci5vZmYiLCJFbmdpbmUzRC5DdXN0b21FdmVudEhhbmRsZXIudHJpZ2dlciIsIkVuZ2luZTNELkN1c3RvbUV2ZW50SGFuZGxlci5fdHJpZ2dlckV2ZW50SGFuZGxlciIsIkVuZ2luZTNELkN1c3RvbUV2ZW50SGFuZGxlci5fdHJpZ2dlclRhcmdldEFuZEV2ZW50SGFuZGxlciIsIkVuZ2luZTNELkN1c3RvbUV2ZW50SGFuZGxlci5fc2V0VXNlckRhdGEiLCJFbmdpbmUzRC5FdmVudERpc3BhdGNoZXIiLCJFbmdpbmUzRC5FdmVudERpc3BhdGNoZXIuY29uc3RydWN0b3IiLCJFbmdpbmUzRC5FdmVudERpc3BhdGNoZXIuY3JlYXRlIiwiRW5naW5lM0QuRXZlbnREaXNwYXRjaGVyLnRyaWdnZXIiLCJFbmdpbmUzRC5FdmVudERpc3BhdGNoZXIuZW1pdCIsIkVuZ2luZTNELkV2ZW50RGlzcGF0Y2hlci5icm9hZGNhc3QiLCJFbmdpbmUzRC5FdmVudERpc3BhdGNoZXIuYnJvYWRjYXN0Lml0ZXJhdG9yIiwiRW5naW5lM0QuRXZlbnREaXNwYXRjaGVyLl9nZXRQYXJlbnQiLCJFbmdpbmUzRC5FdmVudERpc3BhdGNoZXIuX3RyaWdnZXJXaXRoVXNlckRhdGEiLCJFbmdpbmUzRC5FdmVudFJlZ2lzdGVyIiwiRW5naW5lM0QuRXZlbnRSZWdpc3Rlci5jb25zdHJ1Y3RvciIsIkVuZ2luZTNELkV2ZW50UmVnaXN0ZXIuZ2V0SW5zdGFuY2UiLCJFbmdpbmUzRC5FdmVudFJlZ2lzdGVyLnJlZ2lzdGVyIiwiRW5naW5lM0QuRXZlbnRSZWdpc3Rlci5yZW1vdmUiLCJFbmdpbmUzRC5FdmVudFJlZ2lzdGVyLmdldEV2ZW50UmVnaXN0ZXJEYXRhTGlzdCIsIkVuZ2luZTNELkV2ZW50UmVnaXN0ZXIuc2V0QnViYmxlUGFyZW50IiwiRW5naW5lM0QuRXZlbnRSZWdpc3Rlci5pc0JpbmRlZCIsIkVuZ2luZTNELkV2ZW50UmVnaXN0ZXIuZmlsdGVyIiwiRW5naW5lM0QuRXZlbnRSZWdpc3Rlci5mb3JFYWNoIiwiRW5naW5lM0QuRXZlbnRSZWdpc3Rlci5nZXRDaGlsZCIsIkVuZ2luZTNELkV2ZW50UmVnaXN0ZXIuZ2V0RXZlbnROYW1lRnJvbUtleSIsIkVuZ2luZTNELkV2ZW50UmVnaXN0ZXIuZ2V0VWlkRnJvbUtleSIsIkVuZ2luZTNELkV2ZW50UmVnaXN0ZXIuZ2V0V3JhcEhhbmRsZXIiLCJFbmdpbmUzRC5FdmVudFJlZ2lzdGVyLmlzVGFyZ2V0IiwiRW5naW5lM0QuRXZlbnRSZWdpc3Rlci5faXNBbGxFdmVudEhhbmRsZXJSZW1vdmVkIiwiRW5naW5lM0QuRXZlbnRSZWdpc3Rlci5faGFuZGxlQWZ0ZXJBbGxFdmVudEhhbmRsZXJSZW1vdmVkIiwiRW5naW5lM0QuRXZlbnRCaW5kZXIiLCJFbmdpbmUzRC5FdmVudEJpbmRlci5jb25zdHJ1Y3RvciIsIkVuZ2luZTNELkV2ZW50QmluZGVyLmNyZWF0ZSIsIkVuZ2luZTNELkV2ZW50QmluZGVyLm9uIiwiRW5naW5lM0QuRXZlbnRCaW5kZXIub2ZmIiwiRW5naW5lM0QuRmFjdG9yeUV2ZW50SGFuZGxlciIsIkVuZ2luZTNELkZhY3RvcnlFdmVudEhhbmRsZXIuY29uc3RydWN0b3IiLCJFbmdpbmUzRC5GYWN0b3J5RXZlbnRIYW5kbGVyLmNyZWF0ZUV2ZW50SGFuZGxlciIsIkVuZ2luZTNELkV2ZW50TWFuYWdlciIsIkVuZ2luZTNELkV2ZW50TWFuYWdlci5jb25zdHJ1Y3RvciIsIkVuZ2luZTNELkV2ZW50TWFuYWdlci5vbiIsIkVuZ2luZTNELkV2ZW50TWFuYWdlci5vZmYiLCJFbmdpbmUzRC5FdmVudE1hbmFnZXIudHJpZ2dlciIsIkVuZ2luZTNELkV2ZW50TWFuYWdlci5icm9hZGNhc3QiLCJFbmdpbmUzRC5FdmVudE1hbmFnZXIuZW1pdCIsIkVuZ2luZTNELkV2ZW50TWFuYWdlci5mcm9tRXZlbnQiLCJFbmdpbmUzRC5FdmVudE1hbmFnZXIuc2V0QnViYmxlUGFyZW50IiwiRW5naW5lM0QuR2FtZU9iamVjdCIsIkVuZ2luZTNELkdhbWVPYmplY3QuY29uc3RydWN0b3IiLCJFbmdpbmUzRC5HYW1lT2JqZWN0LnVpZCIsIkVuZ2luZTNELkdhbWVPYmplY3QucG9zaXRpb24iLCJFbmdpbmUzRC5HYW1lT2JqZWN0LnBhcmVudCIsIkVuZ2luZTNELkdhbWVPYmplY3QuYnViYmxlUGFyZW50IiwiRW5naW5lM0QuR2FtZU9iamVjdC5pbml0IiwiRW5naW5lM0QuR2FtZU9iamVjdC5kaXNwb3NlIiwiRW5naW5lM0QuR2FtZU9iamVjdC5vbkVudGVyIiwiRW5naW5lM0QuR2FtZU9iamVjdC5vblN0YXJ0TG9vcCIsIkVuZ2luZTNELkdhbWVPYmplY3Qub25FbmRMb29wIiwiRW5naW5lM0QuR2FtZU9iamVjdC5vbkV4aXQiLCJFbmdpbmUzRC5HYW1lT2JqZWN0Lmhhc0NoaWxkIiwiRW5naW5lM0QuR2FtZU9iamVjdC5hZGRDaGlsZCIsIkVuZ2luZTNELkdhbWVPYmplY3QuZ2V0Q2hpbHJlbiIsIkVuZ2luZTNELkdhbWVPYmplY3Quc29ydCIsIkVuZ2luZTNELkdhbWVPYmplY3QuZm9yRWFjaCIsIkVuZ2luZTNELkdhbWVPYmplY3QucmVtb3ZlQ2hpbGQiLCJFbmdpbmUzRC5HYW1lT2JqZWN0LnJlbW92ZU1lIiwiRW5naW5lM0QuR2FtZU9iamVjdC5nZXRUb3BVbmRlclBvaW50IiwiRW5naW5lM0QuR2FtZU9iamVjdC5pc0hpdCIsIkVuZ2luZTNELkdhbWVPYmplY3QuX2FzY2VuZFoiLCJFbmdpbmUzRC5NZXNoIiwiRW5naW5lM0QuTWVzaC5jb25zdHJ1Y3RvciIsIkVuZ2luZTNELk1lc2guY3JlYXRlIiwiRW5naW5lM0QuTWVzaC5tYXRyaXgiLCJFbmdpbmUzRC5NZXNoLnJ1bkFjdGlvbiIsIkVuZ2luZTNELk1lc2gudXBkYXRlIiwiRW5naW5lM0QuTWVzaC5kcmF3IiwiRW5naW5lM0QuTWVzaC5pbml0IiwiRW5naW5lM0QuTWVzaC5fYWRkRHJhd0NvbW1hbmQiLCJFbmdpbmUzRC5TY2VuZSIsIkVuZ2luZTNELlNjZW5lLmNvbnN0cnVjdG9yIiwiRW5naW5lM0QuU2NlbmUuY3JlYXRlIiwiRW5naW5lM0QuU2NlbmUuY2FtZXJhIiwiRW5naW5lM0QuU2NlbmUucHJvZ3JhbSIsIkVuZ2luZTNELlNjZW5lLmluaXRXaGVuQ3JlYXRlIiwiRW5naW5lM0QuU2NlbmUucnVuIiwiRW5naW5lM0QuU2NlbmUuaW5pdCIsIkVuZ2luZTNELlNjZW5lLl9zZXREYXRhIiwiRW5naW5lM0QuU2NlbmUuX2NvbXB1dGVNdnBNYXRyaXgiLCJFbmdpbmUzRC5EaXJlY3RvciIsIkVuZ2luZTNELkRpcmVjdG9yLmNvbnN0cnVjdG9yIiwiRW5naW5lM0QuRGlyZWN0b3IuZ2V0SW5zdGFuY2UiLCJFbmdpbmUzRC5EaXJlY3Rvci5yZW5kZXJlciIsIkVuZ2luZTNELkRpcmVjdG9yLnZpZXciLCJFbmdpbmUzRC5EaXJlY3Rvci5nbCIsIkVuZ2luZTNELkRpcmVjdG9yLmluaXRXaGVuQ3JlYXRlIiwiRW5naW5lM0QuRGlyZWN0b3IucnVuV2l0aFNjZW5lIiwiRW5naW5lM0QuRGlyZWN0b3IuZ2V0VmlldyIsIkVuZ2luZTNELkRpcmVjdG9yLmdldFRvcFVuZGVyUG9pbnQiLCJFbmdpbmUzRC5EaXJlY3Rvci5jcmVhdGVHTCIsIkVuZ2luZTNELkRpcmVjdG9yLl9zdGFydExvb3AiLCJFbmdpbmUzRC5EaXJlY3Rvci5fbG9vcEJvZHkiLCJFbmdpbmUzRC5DYW1lcmEiLCJFbmdpbmUzRC5DYW1lcmEuY29uc3RydWN0b3IiLCJFbmdpbmUzRC5DYW1lcmEuY3JlYXRlIiwiRW5naW5lM0QuQ2FtZXJhLnBNYXRyaXgiLCJFbmdpbmUzRC5DYW1lcmEudk1hdHJpeCIsIkVuZ2luZTNELkNhbWVyYS5tb3ZlU3BlZWQiLCJFbmdpbmUzRC5DYW1lcmEucm90YXRlU3RlcFgiLCJFbmdpbmUzRC5DYW1lcmEucm90YXRlU3RlcFkiLCJFbmdpbmUzRC5DYW1lcmEuem9vbVNwZWVkIiwiRW5naW5lM0QuQ2FtZXJhLmluaXRXaGVuQ3JlYXRlIiwiRW5naW5lM0QuQ2FtZXJhLmNvbXB1dGVWcE1hdHJpeCIsIkVuZ2luZTNELkNhbWVyYS5tb3ZlTGVmdCIsIkVuZ2luZTNELkNhbWVyYS5tb3ZlUmlnaHQiLCJFbmdpbmUzRC5DYW1lcmEubW92ZUJhY2siLCJFbmdpbmUzRC5DYW1lcmEubW92ZUZyb250IiwiRW5naW5lM0QuQ2FtZXJhLnJvdGF0ZSIsIkVuZ2luZTNELkNhbWVyYS56b29tSW4iLCJFbmdpbmUzRC5DYW1lcmEuem9vbU91dCIsIkVuZ2luZTNELkNhbWVyYS5ydW4iLCJFbmdpbmUzRC5DYW1lcmEucHVzaE1hdHJpeCIsIkVuZ2luZTNELkNhbWVyYS5wb3BNYXRyaXgiLCJFbmdpbmUzRC5DYW1lcmEub25TdGFydExvb3AiLCJFbmdpbmUzRC5DYW1lcmEub25FbmRMb29wIiwiRW5naW5lM0QuQ2FtZXJhLl9jb21wdXRlTW92ZURpc3RhbmNlIl0sIm1hcHBpbmdzIjoiQUFBQSxJQUFPLFFBQVEsQ0FnQmQ7QUFoQkQsV0FBTyxRQUFRLEVBQUMsQ0FBQztJQUNiQTtRQUlJQyxlQUFZQSxDQUFlQSxFQUFFQSxDQUFlQTtZQUFoQ0MsaUJBQWVBLEdBQWZBLFFBQWVBO1lBQUVBLGlCQUFlQSxHQUFmQSxRQUFlQTtZQUhyQ0EsTUFBQ0EsR0FBVUEsSUFBSUEsQ0FBQ0E7WUFDaEJBLE1BQUNBLEdBQVVBLElBQUlBLENBQUNBO1lBR25CQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUNYQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtRQUNmQSxDQUFDQTtRQUVhRCxZQUFNQSxHQUFwQkEsVUFBcUJBLENBQVNBLEVBQUVBLENBQVNBO1lBQ3JDRSxJQUFJQSxHQUFHQSxHQUFHQSxJQUFJQSxJQUFJQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUV6QkEsTUFBTUEsQ0FBQ0EsR0FBR0EsQ0FBQ0E7UUFDZkEsQ0FBQ0E7UUFDTEYsWUFBQ0E7SUFBREEsQ0FkQUQsQUFjQ0MsSUFBQUQ7SUFkWUEsY0FBS0EsUUFjakJBLENBQUFBO0FBQ0xBLENBQUNBLEVBaEJNLFFBQVEsS0FBUixRQUFRLFFBZ0JkOztBQ2hCRCxJQUFPLFFBQVEsQ0FrQmQ7QUFsQkQsV0FBTyxRQUFRLEVBQUMsQ0FBQztJQUNiQTtRQUtJSSxrQkFBWUEsQ0FBUUEsRUFBRUEsQ0FBUUEsRUFBRUEsQ0FBUUE7WUFKakNDLE1BQUNBLEdBQVVBLElBQUlBLENBQUNBO1lBQ2hCQSxNQUFDQSxHQUFVQSxJQUFJQSxDQUFDQTtZQUNoQkEsTUFBQ0EsR0FBVUEsSUFBSUEsQ0FBQ0E7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Q0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsQ0FBQ0EsQ0FBQ0E7WUFBR0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDL0NBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQUdBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQUdBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQy9DQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUFHQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUFHQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUMvQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7UUFDaEJBLENBQUNBO1FBRUROOzs7O1dBSUdBO1FBQ0lBLDZCQUFZQSxHQUFuQkEsVUFBcUJBLEtBQVlBO1lBQzdCTyxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQTtZQUV0QkEsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0EsTUFBTUEsQ0FBQ0E7WUFDakJBLEdBQUdBLEdBQUdBLElBQUlBLFlBQVlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBO1lBQzNCQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQTtZQUVqQkEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0E7a0JBQ2pFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTtZQUMxREEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsQ0FBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0E7a0JBQ2pFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTtZQUMxREEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0E7a0JBQ2pFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUN6REEsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0E7a0JBQ2pFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUV6REEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsQ0FBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0E7a0JBQ2pFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTtZQUMxREEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0E7a0JBQ2pFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTtZQUMxREEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsQ0FBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0E7a0JBQ2pFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUN6REEsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0E7a0JBQ2pFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUV6REEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0E7a0JBQy9EQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFJQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUN2REEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsQ0FBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0E7a0JBQy9EQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFJQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUN2REEsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0E7a0JBQy9EQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFJQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUN2REEsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0E7a0JBQy9EQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFJQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUV2REEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsQ0FBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0E7a0JBQzdEQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNyREEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0E7a0JBQzdEQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNyREEsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0E7a0JBQzdEQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNyREEsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0E7a0JBQzdEQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUVyREEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7WUFDN0RBLEVBQUVBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUNaQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtZQUNoQkEsQ0FBQ0E7WUFFREEsR0FBR0EsR0FBR0EsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0E7WUFDZEEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsRUFBRUEsRUFBRUEsQ0FBQ0EsRUFBRUEsRUFBRUEsQ0FBQ0E7Z0JBQ3RCQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxHQUFHQSxDQUFDQTtZQUN4QkEsQ0FBQ0E7WUFFREEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7UUFDaEJBLENBQUNBO1FBRURQOzs7O1dBSUdBO1FBQ0lBLDBCQUFTQSxHQUFoQkE7WUFDSVEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUFDbkNBLENBQUNBO1FBRURSOzs7V0FHR0E7UUFDSUEsMEJBQVNBLEdBQWhCQTtZQUNJUyxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTtZQUVUQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQTtZQUVqQkEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFBRUEsQ0FBQ0EsQ0FBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFBRUEsQ0FBQ0EsQ0FBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDdENBLENBQUNBLEdBQUdBLENBQUNBLENBQUVBLENBQUNBLENBQUNBLENBQUNBO1lBQUVBLENBQUNBLENBQUVBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUVBLENBQUNBLENBQUNBLENBQUNBO1lBQUVBLENBQUNBLENBQUVBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ3RDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUFFQSxDQUFDQSxDQUFFQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTtZQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUN0Q0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFBRUEsQ0FBQ0EsQ0FBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFBRUEsQ0FBQ0EsQ0FBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDdENBLENBQUNBLEdBQUdBLENBQUNBLENBQUVBLENBQUNBLENBQUNBLENBQUNBO1lBQUVBLENBQUNBLENBQUVBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBO1lBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ3RDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTtZQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTtZQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUV0Q0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7UUFDaEJBLENBQUNBO1FBRURUOzs7Ozs7V0FNR0E7UUFDSUEsNkJBQVlBLEdBQW5CQSxVQUFxQkEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7WUFDeEJVLElBQUlBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBO1lBQ3JCQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFJQSxDQUFDQSxDQUFDQTtZQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUM1Q0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsQ0FBQ0EsQ0FBQ0E7WUFBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDNUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQzVDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUM1Q0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7UUFDaEJBLENBQUNBO1FBRURWOzs7Ozs7V0FNR0E7UUFDSUEsMEJBQVNBLEdBQWhCQSxVQUFrQkEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7WUFDckJXLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLE1BQU1BLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBRXhEQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtRQUNoQkEsQ0FBQ0E7UUFFRFg7Ozs7Ozs7O1dBUUdBO1FBQ0lBLDBCQUFTQSxHQUFoQkEsVUFBa0JBLEtBQWFBLEVBQUVBLENBQVNBLEVBQUVBLENBQVNBLEVBQUVBLENBQVFBO1lBQzNEWSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQTtZQUVuREEsSUFBSUEsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBR0EsS0FBS0EsR0FBR0EsR0FBR0EsQ0FBQ0E7WUFDbENBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBO1lBRWpCQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtZQUNwQkEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7WUFFcEJBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUNoQ0EseUJBQXlCQTtnQkFDekJBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO29CQUNSQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDWEEsQ0FBQ0E7Z0JBQ0RBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFBRUEsQ0FBQ0EsQ0FBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUM1Q0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUFFQSxDQUFDQSxDQUFFQSxDQUFDQSxDQUFDQSxHQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzVDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDNUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ2hEQSxDQUFDQTtZQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDdkNBLHlCQUF5QkE7Z0JBQ3pCQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDUkEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ1hBLENBQUNBO2dCQUNEQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQUVBLENBQUNBLENBQUVBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDNUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFBRUEsQ0FBQ0EsQ0FBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUM1Q0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzVDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUNoREEsQ0FBQ0E7WUFBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3ZDQSx5QkFBeUJBO2dCQUN6QkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ1JBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO2dCQUNYQSxDQUFDQTtnQkFDREEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUVBLENBQUNBLENBQUNBLENBQUNBO2dCQUFFQSxDQUFDQSxDQUFFQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzVDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQUVBLENBQUNBLENBQUVBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDNUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUM1Q0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDaERBLENBQUNBO1lBQUNBLElBQUlBLENBQUNBLENBQUNBO2dCQUNKQSwrQkFBK0JBO2dCQUMvQkEsR0FBR0EsR0FBR0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2pDQSxFQUFFQSxDQUFDQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDWkEsU0FBU0E7b0JBQ1RBLElBQUlBLEdBQUdBLENBQUNBLEdBQUdBLEdBQUdBLENBQUNBO29CQUNmQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQTtvQkFDVkEsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0E7b0JBQ1ZBLENBQUNBLElBQUlBLElBQUlBLENBQUNBO2dCQUNkQSxDQUFDQTtnQkFFREEsRUFBRUEsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ1hBLEVBQUVBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUNYQSxFQUFFQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDWEEsRUFBRUEsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ1hBLEVBQUVBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUNYQSxFQUFFQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDWEEsRUFBRUEsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBRVhBLENBQUNBLENBQUVBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEdBQUNBLENBQUNBLEdBQUNBLEVBQUVBLEdBQUlBLENBQUNBLENBQUNBO2dCQUNwQkEsQ0FBQ0EsQ0FBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBRUEsRUFBRUEsR0FBR0EsRUFBRUEsQ0FBQ0E7Z0JBQ3BCQSxDQUFDQSxDQUFFQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFFQSxFQUFFQSxHQUFHQSxFQUFFQSxDQUFDQTtnQkFDcEJBLENBQUNBLENBQUVBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUVWQSxDQUFDQSxDQUFFQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFFQSxFQUFFQSxHQUFHQSxFQUFFQSxDQUFDQTtnQkFDcEJBLENBQUNBLENBQUVBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEdBQUNBLENBQUNBLEdBQUNBLEVBQUVBLEdBQUlBLENBQUNBLENBQUNBO2dCQUNwQkEsQ0FBQ0EsQ0FBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBRUEsRUFBRUEsR0FBR0EsRUFBRUEsQ0FBQ0E7Z0JBQ3BCQSxDQUFDQSxDQUFFQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFFVkEsQ0FBQ0EsQ0FBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBRUEsRUFBRUEsR0FBR0EsRUFBRUEsQ0FBQ0E7Z0JBQ3BCQSxDQUFDQSxDQUFFQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFFQSxFQUFFQSxHQUFHQSxFQUFFQSxDQUFDQTtnQkFDcEJBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLEdBQUNBLENBQUNBLEdBQUNBLEVBQUVBLEdBQUlBLENBQUNBLENBQUNBO2dCQUNwQkEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBRVZBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUNWQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDVkEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ1ZBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ2RBLENBQUNBO1lBRURBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO1FBQ2hCQSxDQUFDQTtRQUVEWjs7Ozs7Ozs7V0FRR0E7UUFDSUEsdUJBQU1BLEdBQWJBLFVBQWVBLEtBQUtBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBO1lBQ3pCYSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxNQUFNQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQSxTQUFTQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUU1REEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7UUFDaEJBLENBQUNBO1FBRURiOzs7Ozs7V0FNR0E7UUFDSUEseUJBQVFBLEdBQWZBLFVBQWlCQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQTtZQUNwQmMsSUFBSUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7WUFDckJBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUlBLENBQUNBLENBQUNBO1lBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQzVDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFJQSxDQUFDQSxDQUFDQTtZQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUM1Q0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDNUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQzVDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtRQUNoQkEsQ0FBQ0E7UUFFRGQ7Ozs7OztXQU1HQTtRQUNJQSxzQkFBS0EsR0FBWkEsVUFBY0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7WUFDakJlLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLE1BQU1BLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBRXBEQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtRQUNoQkEsQ0FBQ0E7UUFFTWYsMEJBQVNBLEdBQWhCQSxVQUFrQkEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsT0FBT0EsRUFBRUEsT0FBT0EsRUFBRUEsT0FBT0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0E7WUFDeEVnQixJQUFJQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxHQUFHQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxHQUFHQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQTtZQUVwREEsRUFBRUEsR0FBR0EsT0FBT0EsR0FBR0EsSUFBSUEsQ0FBQ0E7WUFDcEJBLEVBQUVBLEdBQUdBLE9BQU9BLEdBQUdBLElBQUlBLENBQUNBO1lBQ3BCQSxFQUFFQSxHQUFHQSxPQUFPQSxHQUFHQSxJQUFJQSxDQUFDQTtZQUVwQkEsZUFBZUE7WUFDZkEsR0FBR0EsR0FBR0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBQ0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBQ0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7WUFDM0NBLEVBQUVBLElBQUlBLEdBQUdBLENBQUNBO1lBQ1ZBLEVBQUVBLElBQUlBLEdBQUdBLENBQUNBO1lBQ1ZBLEVBQUVBLElBQUlBLEdBQUdBLENBQUNBO1lBRVZBLHVDQUF1Q0E7WUFDdkNBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEdBQUdBLEdBQUdBLEVBQUVBLEdBQUdBLEdBQUdBLENBQUNBO1lBQ3pCQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxHQUFHQSxHQUFHQSxFQUFFQSxHQUFHQSxHQUFHQSxDQUFDQTtZQUN6QkEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsR0FBR0EsR0FBR0EsRUFBRUEsR0FBR0EsR0FBR0EsQ0FBQ0E7WUFFekJBLGVBQWVBO1lBQ2ZBLEdBQUdBLEdBQUdBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLEVBQUVBLEdBQUNBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUNBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUNBLEVBQUVBLENBQUNBLENBQUNBO1lBQzNDQSxFQUFFQSxJQUFJQSxHQUFHQSxDQUFDQTtZQUNWQSxFQUFFQSxJQUFJQSxHQUFHQSxDQUFDQTtZQUNWQSxFQUFFQSxJQUFJQSxHQUFHQSxDQUFDQTtZQUVWQSxzQ0FBc0NBO1lBQ3RDQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxDQUFDQTtZQUN2QkEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsQ0FBQ0E7WUFDdkJBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLENBQUNBO1lBRXZCQSxlQUFlQTtZQUNmQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQTtZQUNqQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7WUFDVkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7WUFDVkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0E7WUFDWEEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFFVEEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7WUFDVkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7WUFDVkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0E7WUFDWEEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFFVEEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7WUFDVkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7WUFDVkEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0E7WUFDWkEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFFVkEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDVkEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDVkEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDVkEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFFVkEsWUFBWUE7WUFDWkEsc0NBQXNDQTtZQUN0Q0EsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0E7WUFFdEZBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO1FBQ2hCQSxDQUFDQTtRQUVEaEI7Ozs7OztXQU1HQTtRQUNJQSx1QkFBTUEsR0FBYkEsVUFBZUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsT0FBT0EsRUFBRUEsT0FBT0EsRUFBRUEsT0FBT0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0E7WUFDckVpQixJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxNQUFNQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQSxTQUFTQSxDQUFDQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxPQUFPQSxFQUFFQSxPQUFPQSxFQUFFQSxPQUFPQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUV4R0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7UUFDaEJBLENBQUNBO1FBR01qQix5QkFBUUEsR0FBZkEsVUFBaUJBLElBQUlBLEVBQUVBLEdBQUdBO1lBQ3RCa0IsSUFBSUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7WUFFckJBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ1RBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ1RBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ1RBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ1RBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ1RBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ1RBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ1RBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ1RBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ1RBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ1RBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBO1lBQ3pCQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUNWQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUNWQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUNWQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxJQUFJQSxHQUFHQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxJQUFJQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUNwQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFFVkEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7UUFDaEJBLENBQUNBO1FBRU1sQixzQkFBS0EsR0FBWkEsVUFBY0EsQ0FBQ0EsRUFBRUEsQ0FBQ0E7WUFDZG1CLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLE1BQU1BLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBRWpEQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtRQUNoQkEsQ0FBQ0E7UUFFRG5COzs7Ozs7O1dBT0dBO1FBQ0lBLCtCQUFjQSxHQUFyQkEsVUFBdUJBLElBQVlBLEVBQUVBLE1BQU1BLEVBQUVBLElBQUlBLEVBQUVBLEdBQUdBO1lBQ2xEb0IsSUFBSUEsQ0FBQ0EsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBQ0EsRUFBRUEsRUFBRUEsRUFDWkEsR0FBR0EsR0FBR0EsSUFBSUEsQ0FBQ0EsR0FBR0EsRUFDZEEsSUFBSUEsR0FBR0EsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0E7WUFFcEJBLEdBQUdBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLEtBQUtBLEdBQUdBLElBQUlBLE1BQU1BLEtBQUtBLENBQUNBLEVBQUVBLElBQUlBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsU0FBU0EsRUFBRUEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDbEZBLEdBQUdBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLEVBQUVBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLE1BQU1BLEVBQUVBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBO1lBQ3BEQSxHQUFHQSxDQUFDQSxLQUFLQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxLQUFLQSxFQUFFQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUVsREEsSUFBSUEsSUFBSUEsR0FBR0EsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBR0EsSUFBSUEsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDcENBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1lBQ25CQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDVkEsR0FBR0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsRUFBRUEsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxTQUFTQSxFQUFFQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNqRUEsQ0FBQ0E7WUFFREEsRUFBRUEsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDdEJBLEVBQUVBLEdBQUdBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBRXhCQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQTtZQUVqQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsRUFBRUEsR0FBR0EsTUFBTUEsQ0FBQ0E7WUFDcEJBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUlBLENBQUNBLENBQUNBO1lBQ1ZBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUlBLENBQUNBLENBQUNBO1lBQ1ZBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUlBLENBQUNBLENBQUNBO1lBRVZBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUlBLENBQUNBLENBQUNBO1lBQ1ZBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUlBLEVBQUVBLENBQUNBO1lBQ1hBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUlBLENBQUNBLENBQUNBO1lBQ1ZBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUlBLENBQUNBLENBQUNBO1lBRVZBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUlBLENBQUNBLENBQUNBO1lBQ1ZBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUlBLENBQUNBLENBQUNBO1lBQ1ZBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO1lBQzNCQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUVYQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUNWQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUNWQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxHQUFHQSxHQUFHQSxHQUFHQSxFQUFFQSxDQUFDQTtZQUM3QkEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFFVkEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7UUFDaEJBLENBQUNBO1FBRU1wQiw0QkFBV0EsR0FBbEJBLFVBQW9CQSxJQUFJQSxFQUFFQSxNQUFNQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQTtZQUN2Q3FCLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLE1BQU1BLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBLGNBQWNBLENBQUNBLElBQUlBLEVBQUVBLE1BQU1BLEVBQUVBLElBQUlBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO1lBRTFFQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtRQUNoQkEsQ0FBQ0E7UUFFTXJCLDRCQUFXQSxHQUFsQkEsVUFBb0JBLEtBQVlBO1lBQzVCc0IsSUFBSUEsQ0FBQ0EsR0FBR0EsSUFBSUEsRUFDUkEsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0E7WUFFZEEsMENBQTBDQTtZQUN0Q0EsWUFBWUE7WUFDWkEscUJBQXFCQTtZQUNyQkEsd0VBQXdFQTtZQUN4RUEsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0E7WUFFeENBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO1FBQ2hCQSxDQUFDQTtRQUVNdEIseUJBQVFBLEdBQWZBLFVBQWdCQSxPQUFjQTtZQUMxQnVCLElBQUlBLElBQUlBLEdBQUdBLElBQUlBLENBQUNBLE9BQU9BLEVBQ25CQSxJQUFJQSxHQUFHQSxPQUFPQSxDQUFDQSxNQUFNQSxDQUFDQTtZQUMxQkEsSUFBSUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFDbERBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEVBQ2xEQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUNwREEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFDdERBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEVBQ2xEQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUNsREEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFDcERBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBO1lBQzNEQSxJQUFJQSxJQUFJQSxHQUFHQSxJQUFJQSxZQUFZQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTtZQUVoQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDeENBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ3hDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUN4Q0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDeENBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ3hDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUN4Q0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDeENBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ3hDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUN4Q0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDeENBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ3pDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUN6Q0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDekNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ3pDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUN6Q0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFFekNBLE1BQU1BLENBQUNBLE1BQU1BLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1FBQy9CQSxDQUFDQTtRQUVNdkIsZ0NBQWVBLEdBQXRCQSxVQUF1QkEsTUFBY0E7WUFDakN3QixJQUFJQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQSxPQUFPQSxFQUNuQkEsSUFBSUEsR0FBR0EsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7WUFDekJBLElBQUlBLE1BQU1BLEdBQUdBLEVBQUVBLENBQUNBO1lBRWhCQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTtZQUMzRkEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7WUFDM0ZBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBO1lBQzVGQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxD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Z0JBQzlCQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxnQkFBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDMUNBLENBQUNBO1lBQ0RBLElBQUlBLENBQUFBLENBQUNBO2dCQUNEQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxFQUFFQSxnQ0FBZ0NBLENBQUNBLENBQUNBO1lBQzNEQSxDQUFDQTtRQUNMQSxDQUFDQTtRQTFCYUQsYUFBTUEsR0FBcEJBLFVBQXFCQSxNQUFNQSxFQUFFQSxVQUFVQTtZQUNuQ0UsSUFBSUEsR0FBR0EsR0FBR0EsSUFBSUEsSUFBSUEsQ0FBQ0EsTUFBTUEsRUFBRUEsVUFBVUEsQ0FBQ0EsQ0FBQ0E7WUFFdkNBLE1BQU1BLENBQUNBLEdBQUdBLENBQUNBO1FBQ2ZBLENBQUNBO1FBd0JNRix1QkFBTUEsR0FBYkE7WUFDSUcsSUFBSUEsU0FBU0EsR0FBR0EsSUFBSUEsRUFDaEJBLFNBQVNBLEdBQUdBLElBQUlBLENBQUNBO1lBRXJCQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQTtZQUUxQkEsRUFBRUEsQ0FBQUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsNkJBQTZCQSxFQUFFQSxDQUFDQSxDQUFBQSxDQUFDQTtnQkFDckNBLFNBQVNBLEdBQUdBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBLE1BQU1BLENBQUNBO2dCQUNoREEsU0FBU0EsR0FBR0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7Z0JBRS9CQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxTQUFTQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDaEVBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLEVBQUVBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUNsR0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDcEVBLENBQUNBO1lBQ0RBLElBQUlBLENBQUFBLENBQUNBO2dCQUNEQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxFQUFFQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUN0R0EsQ0FBQ0E7UUFDTEEsQ0FBQ0E7UUFFT0gsOENBQTZCQSxHQUFyQ0E7WUFDSUksTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0E7bUJBQzNCQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQTttQkFDM0JBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBLENB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d0NBQXFCQSxHQUEvQkE7WUFDSU0sTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsRUFBRUEsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsQ0FBQ0E7UUFDL0RBLENBQUNBO1FBRVNOLHVDQUFvQkEsR0FBOUJBO1lBQ0lPLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLEVBQUVBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBLGVBQWVBLENBQUNBLENBQUNBO1FBQy9EQSxDQUFDQTtRQUVPUCx1Q0FBb0JBLEdBQTVCQSxVQUE2QkEsUUFBcUJBO1lBQzlDUSxJQUFJQSxHQUFHQSxHQUFHQSxFQUFFQSxFQUNSQSxLQUFLQSxHQUFHQSxRQUFRQSxDQUFDQSxLQUFLQSxFQUN0QkEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFDTEEsR0FBR0EsR0FBR0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsS0FBS0EsQ0FBQ0E7WUFFL0JBLEdBQUdBLENBQUFBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLEdBQUdBLEVBQUVBLENBQUNBLEVBQUVBLEVBQUNBLENBQUNBO2dCQUNyQkEsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBRUEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDOUNBLENBQUNBO1lBRURBLE1BQU1BLENBQUNBLG9CQUFXQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxZQUFZQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxtQkFBVUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7UUFDMUVBLENBQUNBO1FBQ0xSLGVBQUNBO0lBQURBLENBM0RBckssQUEyRENxSyxJQUFBcks7SUEzRFlBLGlCQUFRQSxXQTJEcEJBLENBQUFBO0FBQ0xBLENBQUNBLEVBN0RNLFFBQVEsS0FBUixRQUFRLFFBNkRkOzs7Ozs7OztBQzlERCwyQ0FBMkM7QUFDM0MsSUFBTyxRQUFRLENBdURkO0FBdkRELFdBQU8sUUFBUSxFQUFBLENBQUM7SUFDWkE7UUFBaUM4SywrQkFBUUE7UUFhckNBLHFCQUFZQSxLQUFZQSxFQUFFQSxNQUFhQSxFQUFFQSxLQUFZQSxFQUFFQSxRQUFxQkE7WUFDeEVDLGtCQUFNQSxRQUFRQSxDQUFDQSxDQUFDQTtZQUxaQSxXQUFNQSxHQUFVQSxJQUFJQSxDQUFDQTtZQUNyQkEsWUFBT0EsR0FBVUEsSUFBSUEsQ0FBQ0E7WUFDdEJBLFdBQU1BLEdBQVVBLElBQUlBLENBQUNBO1lBS3pCQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxLQUFLQSxDQUFDQTtZQUNwQkEsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsTUFBTUEsQ0FBQ0E7WUFDdEJBLElBQUlBLENBQUNBLE1BQU1BLEdBQUdBLEtBQUtBLENBQUNBO1FBQ3hCQSxDQUFDQTtRQWxCYUQsa0JBQU1BLEdBQXBCQSxVQUFxQkEsS0FBWUEsRUFBRUEsTUFBYUEsRUFBRUEsS0FBWUEsRUFBRUEsUUFBcUJBO1lBQ2pGRSxJQUFJQSxJQUFJQSxHQUFHQSxJQUFJQSxJQUFJQSxDQUFDQSxLQUFLQSxFQUFFQSxNQUFNQSxFQUFFQSxLQUFLQSxFQUFFQSxRQUFRQSxDQUFDQSxDQUFDQTtZQUVwREEsSUFBSUEsQ0FBQ0EsY0FBY0EsRUFBRUEsQ0FBQ0E7WUFFdEJBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO1FBQ2hCQSxDQUFDQTtRQWNTRiwyQ0FBcUJBLEdBQS9CQTtZQUNJRyxJQUFJQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxNQUFNQSxFQUNuQkEsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsT0FBT0EsRUFDckJBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLE1BQU1BLEVBQ25CQSxJQUFJQSxHQUFHQSxDQUFDQSxLQUFLQSxHQUFHQSxDQUFDQSxFQUNqQkEsS0FBS0EsR0FBR0EsS0FBS0EsR0FBR0EsQ0FBQ0EsRUFDakJBLEVBQUVBLEdBQUdBLE1BQU1BLEdBQUdBLENBQUNBLEVBQ2ZBLElBQUlBLEdBQUdBLENBQUNBLE1BQU1BLEdBQUdBLENBQUNBLEVBQ2xCQSxLQUFLQSxHQUFHQSxLQUFLQSxHQUFHQSxDQUFDQSxFQUNqQkEsSUFBSUEsR0FBR0EsQ0FBQ0EsS0FBS0EsR0FBRUEsQ0FBQ0EsQ0FBQ0E7WUFFckJBLE1BQU1BLENBQUNBLG9CQUFXQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxZQUFZQSxDQUFDQTtnQkFDbkNBLEtBQUtBLEVBQUVBLEVBQUVBLEVBQUVBLEtBQUtBLEVBQUVBLElBQUlBLEVBQUVBLEVBQUVBLEVBQUVBLEtBQUtBLEVBQUdBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLEtBQUtBLEVBQUdBLEtBQUtBLEVBQUVBLElBQUlBLEVBQUVBLEtBQUtBO2dCQUMxRUEsS0FBS0EsRUFBRUEsRUFBRUEsRUFBRUEsS0FBS0EsRUFBR0EsS0FBS0EsRUFBRUEsSUFBSUEsRUFBRUEsS0FBS0EsRUFBR0EsS0FBS0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBR0EsS0FBS0EsRUFBRUEsRUFBRUEsRUFBRUEsSUFBSUE7Z0JBQzNFQSxLQUFLQSxFQUFFQSxFQUFFQSxFQUFFQSxLQUFLQSxFQUFHQSxLQUFLQSxFQUFFQSxFQUFFQSxFQUFFQSxJQUFJQSxFQUFHQSxJQUFJQSxFQUFFQSxFQUFFQSxFQUFFQSxJQUFJQSxFQUFHQSxJQUFJQSxFQUFFQSxFQUFFQSxFQUFFQSxLQUFLQTtnQkFDckVBLElBQUlBLEVBQUVBLEVBQUVBLEVBQUVBLEtBQUtBLEVBQUdBLElBQUlBLEVBQUVBLEVBQUVBLEVBQUVBLElBQUlBLEVBQUdBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUdBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLEtBQUtBO2dCQUN2RUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBR0EsS0FBS0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBR0EsS0FBS0EsRUFBRUEsSUFBSUEsRUFBRUEsS0FBS0EsRUFBR0EsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsS0FBS0E7Z0JBQzdFQSxLQUFLQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFHQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFHQSxJQUFJQSxFQUFFQSxFQUFFQSxFQUFFQSxJQUFJQSxFQUFHQSxLQUFLQSxFQUFFQSxFQUFFQSxFQUFFQSxJQUFJQSxDQUFBQSxtQkFBbUJBO2FBQzdGQSxDQUFDQSxFQUNGQSxDQUFDQSxFQUFFQSxtQkFBVUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQUE7UUFDNUJBLENBQUNBO1FBRVNILDBDQUFvQkEsR0FBOUJBO1lBQ0lJLE1BQU1BLENBQUNBLHNCQUFhQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxXQUFXQSxDQUFDQTtnQkFDeENBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEVBQUlBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBO2dCQUNsQkEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7Z0JBQ2xCQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFDQSxFQUFFQSxFQUFJQSxDQUFDQSxFQUFDQSxFQUFFQSxFQUFDQSxFQUFFQTtnQkFDbEJBLEVBQUVBLEVBQUNBLEVBQUVBLEVBQUNBLEVBQUVBLEVBQUdBLEVBQUVBLEVBQUNBLEVBQUVBLEVBQUNBLEVBQUVBO2dCQUNuQkEsRUFBRUEsRUFBQ0EsRUFBRUEsRUFBQ0EsRUFBRUEsRUFBR0EsRUFBRUEsRUFBQ0EsRUFBRUEsRUFBQ0EsRUFBRUE7Z0JBQ25CQSxFQUFFQSxFQUFDQSxFQUFFQSxFQUFDQSxFQUFFQSxFQUFHQSxFQUFFQSxFQUFDQSxFQUFFQSxFQUFDQSxFQUFFQSxDQUFLQSxPQUFPQTthQUNsQ0EsQ0FBQ0EsRUFBRUEsbUJBQVVBLENBQUNBLGNB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QUFDQTthQUNqQ0EsQ0FBQUE7UUFDTEEsQ0FBQ0E7UUFFT0wsMkNBQVVBLEdBQWxCQSxVQUFtQkEsRUFBV0EsRUFBRUEsRUFBV0EsRUFBRUEsRUFBV0EsRUFBRUEsR0FBWUEsRUFBQ0EsS0FBWUEsRUFBRUEsTUFBYUE7WUFDOUZNLEVBQUVBLENBQUFBLENBQUNBLEtBQUtBLElBQUlBLENBQUNBLENBQUNBLENBQUFBLENBQUNBO2dCQUNYQSxJQUFJQSxDQUFDQSxRQUFRQSxHQUFHQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxNQUFNQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFFMUNBLE1BQU1BLENBQUNBO1lBQ1hBLENBQUNBO1lBQ0RBLEVBQUVBO1lBQ0ZBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ1ZBLElBQUlBLEdBQUdBLEdBQUdBLEVBQUVBLEVBQ1JBLEdBQUdBLEdBQUdBLEVBQUVBLEVBQ1JBLEdBQUdBLEdBQUdBLEVBQUVBLENBQUNBO1lBRWJBLFFBQVFBO1lBQ1JBLEdBQUdBLENBQUFBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLEVBQUNBLENBQUNBO2dCQUNuQkEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBRUEsV0FBV0E7Z0JBQ3RDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQTtnQkFDekJBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBO1lBQzdCQSxDQUFDQTtZQUVEQSxNQUFNQTtZQUNOQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxHQUFHQSxFQUFFQSxNQUFNQSxDQUFDQSxDQUFDQTtZQUM3QkEsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsR0FBR0EsRUFBRUEsTUFBTUEsQ0FBQ0EsQ0FBQ0E7WUFDN0JBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLEdBQUdBLEVBQUVBLE1BQU1BLENBQUNBLENBQUNBO1lBRTdCQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxNQUFNQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUV0REEsSUFBSUEsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFDWkEsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFDWkEsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFDWkEsSUFBSUEsR0FBRUEsSUFBSUEsQ0FBQ0EsS0FBS0EsRUFDaEJBLElBQUlBLEdBQUVBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLENBQUNBLEVBQ3BCQSxJQUFJQSxHQUFFQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUV6QkEsSUFBSUEsR0FBR0EsR0FBRUE7Z0JBQ0xBLEdBQUdBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBO2FBQ2xCQSxDQUFDQTtZQUNGQSxJQUFJQSxHQUFHQSxHQUFFQTtnQkFDTEEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUE7YUFDbkJBLENBQUNBO1lBQ0ZBLElBQUlBLEdBQUdBLEdBQUVBO2dCQUNMQSxJQUFJQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQTthQUNsQkEsQ0FBQ0E7WUFDRkEsSUFBSUEsR0FBR0EsR0FBRUE7Z0JBQ0xBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLEdBQUdBO2FBQ2xCQSxDQUFDQTtZQUVGQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFFQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUkzQkEsU0FBU0E7WUFDVEEsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsRUFBRUEsRUFBQ0EsR0FBR0EsRUFBQ0EsR0FBR0EsRUFBQ0EsR0FBR0EsRUFBRUEsS0FBS0EsR0FBQ0EsQ0FBQ0EsRUFBRUEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsbUJBQW1CQTtZQUNyRUEsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsR0FBR0EsRUFBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsS0FBS0EsR0FBQ0EsQ0FBQ0EsRUFBRUEsTUFBTUEsQ0FBQ0EsQ0FBQ0E7WUFDcERBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLEdBQUdBLEVBQUVBLEVBQUVBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEtBQUtBLEdBQUNBLENBQUNBLEVBQUVBLE1BQU1BLENBQUNBLENBQUNBO1lBQ3BEQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxFQUFFQSxFQUFFQSxHQUFHQSxFQUFFQSxLQUFLQSxHQUFDQSxDQUFDQSxFQUFFQSxNQUFNQSxDQUFDQSxDQUFDQTtRQUN4REEsQ0FBQ0E7UUFFT04sMkNBQVVBLEdBQWxCQSxVQUFtQkEsQ0FBVUEsRUFBRUEsTUFBYUE7WUFDeENPLElBQUlBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLElBQUlBLENBQ2JBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQzFDQSxDQUFDQTtZQUVGQSxFQUFFQSxDQUFBQSxDQUFDQSxD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Q0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQUEsQ0FBQ0E7Z0JBQ2pFQSxJQUFJQSxHQUFHQSxHQUFHQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUNsQkEsU0FBU0EsR0FBR0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBRTdCQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxXQUFXQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxHQUFHQSxFQUFFQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNsRUEsQ0FBQ0E7WUFDREEsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsTUFBTUEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQUEsQ0FBQ0E7Z0JBQzVCQSxJQUFJQSxNQUFNQSxHQUFHQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFFMUJBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLFdBQVdBLENBQUNBLFVBQUNBLElBQW9CQSxFQUFFQSxHQUFVQTtvQkFDM0RBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLEdBQUdBLEVBQUVBLE1BQU1BLEVBQUVBLElBQUlBLENBQUNBLENBQUNBO2dCQUM1Q0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDUEEsQ0FBQ0E7WUFDREEsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsTUFBTUEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQUEsQ0FBQ0E7Z0JBQzVCQSxJQUFJQSxNQUFNQSxHQUFHQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUN6QkEsU0FBU0EsR0FBR0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBRXpCQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxXQUFXQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxNQUFNQSxFQUFFQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNyRUEsQ0FBQ0E7WUFDREEsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsTUFBTUEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQUEsQ0FBQ0E7Z0JBQzVCQSxJQUFJQSxNQUFNQSxHQUFHQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUNyQkEsU0FBU0EsR0FBR0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFDeEJBLE9BQU9BLEdBQUdBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUUzQkEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsVUFBQ0EsSUFBb0JBLEVBQUVBLEdBQVVBO29CQUNuREEsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsVUFBQ0EsR0FBc0JBO3dCQUNwQ0EsTUFBTUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsT0FBT0EsS0FBS0EsT0FBT0EsQ0FBQ0E7b0JBQ25DQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFFSEEsRUFBRUEsQ0FBQUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsRUFBRUEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQUEsQ0FBQ0E7d0JBQ3RCQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQTtvQkFDeEJBLENBQUNBO29CQUVEQSxNQUFNQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQTtnQkFDdkJBLENBQUNBLENBQUNBLENBQUNBO1lBQ1BBLENBQUNBO1FBQ0xBLENBQUNBO1FBRU1SLDhDQUFtQkEsR0FBMUJBLFVBQTJCQSxNQUFpQkEsRUFBRUEsU0FBb0JBO1lBQzlEUyxJQUFJQSxNQUFNQSxHQUFtQkEsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsTUFBTUEsRUFBRUEsRUFDakRBLElBQUlBLEdBQUdBLElBQUlBLENBQUNBO1lBRWhCQSxFQUFFQSxDQUFBQSxDQUFDQSxTQUFTQSxDQUFDQSxNQUFNQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFBQSxDQUFDQTtnQkFDdkJBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLE1BQU1BLENBQUNBO3FCQUNwQkEsT0FBT0EsQ0FBQ0EsVUFBQ0EsSUFBb0JBLEVBQUVBLEdBQVVBO29CQUNsQ0EsRUFBRUEsQ0FBQUEsQ0FBQ0EsSUFBSUEsSUFBSUEsSUFBSUEsQ0FBQ0EsUUFBUUEsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQUEsQ0FBQ0E7d0JBQzVCQSxNQUFNQSxDQUFDQSxRQUFRQSxDQUNJQTs0QkFDWEEsU0FBU0EsRUFBRUEsSUFBSUEsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxHQUFHQSxDQUFDQTs0QkFDeENBLFdBQVdBLEVBQUVBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLFdBQVdBO3lCQUM1Q0EsQ0FDSkEsQ0FBQ0E7b0JBQ05BLENBQUNBO2dCQUNMQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFFUEEsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7WUFDbEJBLENBQUNBO1lBQ0RBLElBQUlBLENBQUNBLEVBQUVBLENBQUFBLENBQUNBLFNBQVNBLENBQUNBLE1BQU1BLEtBQUtBLENBQUNBLENBQUNBLENBQUFBLENBQUNBO2dCQUM1QkEsSUFBSUEsSUFBSUEsR0FBbUJBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLE1BQU1BLEVBQUVBLFNBQVNBLENBQUNBLENBQUNBO2dCQUU1REEsRUFBRUEsQ0FBQUEsQ0FBQ0EsSUFBSUEsSUFBSUEsSUFBSUEsQ0FBQ0EsUUFBUUEsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQUEsQ0FBQ0E7b0JBQzVCQSxNQUFNQSxDQUFDQSxRQUFRQSxDQUNJQTt3QkFDWEEsU0FBU0EsRUFBRUEsU0FBU0E7d0JBQ3BCQSxXQUFXQSxFQUFFQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxXQUFXQTtxQkFDNUNBLENBQ0pBLENBQUNBO2dCQUNOQSxDQUFDQTtnQkFFREEsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7WUFDbEJBLENBQUNBO1FBQ0xBLENBQUNBO1FBRU1ULDhDQUFtQkEsR0FBMUJBLFVBQTJCQSxH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QUNQQSxFQUFFQSxFQUFFQSxHQUFHQTtRQUNQQSxFQUFFQSxFQUFFQSxHQUFHQTtRQUNQQSxFQUFFQSxFQUFFQSxHQUFHQTtRQUNQQSxFQUFFQSxFQUFFQSxHQUFHQTtRQUNQQSxFQUFFQSxFQUFFQSxHQUFHQTtRQUNQQSxFQUFFQSxFQUFFQSxHQUFHQTtRQUNQQSxFQUFFQSxFQUFFQSxHQUFHQTtRQUNQQSxFQUFFQSxFQUFFQSxHQUFHQTtRQUNQQSxFQUFFQSxFQUFFQSxHQUFHQTtRQUNQQSxFQUFFQSxFQUFFQSxHQUFHQTtRQUNQQSxFQUFFQSxFQUFFQSxHQUFHQTtRQUNQQSxFQUFFQSxFQUFFQSxHQUFHQTtRQUNQQSxFQUFFQSxFQUFFQSxHQUFHQTtRQUNQQSxFQUFFQSxFQUFFQSxHQUFHQTtRQUNQQSxFQUFFQSxFQUFFQSxHQUFHQTtRQUNQQSxFQUFFQSxFQUFFQSxHQUFHQTtRQUNQQSxFQUFFQSxFQUFFQSxHQUFHQTtRQUNQQSxFQUFFQSxFQUFFQSxHQUFHQTtRQUNQQSxFQUFFQSxFQUFFQSxHQUFHQTtRQUNQQSxFQUFFQSxFQUFFQSxHQUFHQTtRQUNQQSxFQUFFQSxFQUFFQSxHQUFHQTtRQUNQQSxFQUFFQSxFQUFFQSxHQUFHQTtRQUNQQSxHQUFHQSxFQUFFQSxHQUFHQTtRQUNSQSxHQUFHQSxFQUFFQSxHQUFHQTtRQUNSQSxHQUFHQSxFQUFFQSxHQUFHQTtRQUNSQSxHQUFHQSxFQUFFQSxHQUFHQTtRQUNSQSxHQUFHQSxFQUFFQSxHQUFHQTtRQUNSQSxHQUFHQSxFQUFFQSxHQUFHQTtRQUNSQSxHQUFHQSxFQUFFQSxHQUFHQTtRQUNSQSxHQUFHQSxFQUFFQSxHQUFHQTtRQUNSQSxHQUFHQSxFQUFFQSxHQUFHQTtRQUNSQSxHQUFHQSxFQUFFQSxHQUFHQTtRQUNSQSxHQUFHQSxFQUFFQSxHQUFHQTtRQUNSQSxHQUFHQSxFQUFFQSxJQUFJQTtRQUNUQSxHQUFHQSxFQUFFQSxJQUFJQTtRQUNUQSxHQUFHQSxFQUFFQSxJQUFJQTtRQUNUQSxHQUFHQSxFQUFFQSxJQUFJQTtRQUNUQSxHQUFHQSxFQUFFQSxJQUFJQTtRQUNUQSxHQUFHQSxFQUFFQSxJQUFJQTtRQUNUQSxHQUFHQSxFQUFFQSxJQUFJQTtRQUNUQSxHQUFHQSxFQUFFQSxJQUFJQTtRQUNUQSxHQUFHQSxFQUFFQSxJQUFJQTtRQUNUQSxHQUFHQSxFQUFFQSxLQUFLQTtRQUNWQSxHQUFHQSxFQUFFQSxLQUFLQTtRQUNWQSxHQUFHQSxFQUFFQSxLQUFLQTtRQUNWQSxHQUFHQSxFQUFFQSxTQUFTQTtRQUNkQSxHQUFHQSxFQUFFQSxRQUFRQTtRQUNiQSxHQUFHQSxFQUFFQSxHQUFHQTtRQUNSQSxHQUFHQSxFQUFFQSxHQUFHQTtRQUNSQSxHQUFHQSxFQUFFQSxHQUFHQTtRQUNSQSxHQUFHQSxFQUFFQSxHQUFHQTtRQUNSQSxHQUFHQSxFQUFFQSxHQUFHQTtRQUNSQSxHQUFHQSxFQUFFQSxHQUFHQTtRQUNSQSxHQUFHQSxFQUFFQSxHQUFHQTtRQUNSQSxHQUFHQSxFQUFFQSxHQUFHQTtRQUNSQSxHQUFHQSxFQUFFQSxHQUFHQTtRQUNSQSxHQUFHQSxFQUFFQSxJQUFJQTtRQUNUQSxHQUFHQSxFQUFFQSxHQUFHQTtRQUNSQSxHQUFHQSxFQUFFQSxHQUFHQTtLQUNYQSxFQUNEQSxhQUFhQSxHQUFHQTtRQUNaQSxHQUFHQSxFQUFFQSxHQUFHQTtRQUNSQSxHQUFHQSxFQUFFQSxHQUFHQTtRQUNSQSxHQUFHQSxFQUFFQSxHQUFHQTtRQUNSQSxHQUFHQSxFQUFFQSxHQUFHQTtRQUNSQSxHQUFHQSxFQUFFQSxHQUFHQTtRQUNSQSxHQUFHQSxFQUFFQSxHQUFHQTtRQUNSQSxHQUFHQSxFQUFFQSxHQUFHQTtRQUNSQSxHQUFHQSxFQUFFQSxHQUFHQTtRQUNSQSxHQUFHQSxFQUFFQSxHQUFHQTtRQUNSQSxHQUFHQSxFQUFFQSxHQUFHQTtRQUNSQSxHQUFHQSxFQUFFQSxHQUFHQTtRQUNSQSxHQUFHQSxFQUFFQSxHQUFHQTtRQUNSQSxHQUFHQSxFQUFFQSxHQUFHQTtRQUNSQSxHQUFHQSxFQUFFQSxJQUFJQTtRQUNUQSxHQUFHQSxFQUFFQSxJQUFJQTtR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QUFDQSxDQUFDQSxLQUFLQSxLQUFLQSxDQUFDQSxHQUFHQSxLQUFLQSxHQUFHQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUM3REEsU0FBU0EsR0FBR0EsT0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0E7Z0JBRTNCQSxNQUFNQSxDQUFDQSw0QkFBbUJBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsU0FBU0EsQ0FBQ0E7cUJBQ25EQSxPQUFPQSxDQUFDQSxNQUFNQSxFQUFFQSxPQUFLQSxFQUFFQSxZQUFZQSxDQUFDQSxDQUFDQTtZQUM5Q0EsQ0FBQ0E7WUFDREEsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsTUFBTUEsS0FBS0EsQ0FBQ0EsSUFBSUEsU0FBU0EsQ0FBQ0EsTUFBTUEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQUEsQ0FBQ0E7Z0JBQ3REQSxJQUFJQSxNQUFNQSxHQUFHQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUNyQkEsT0FBS0EsR0FBR0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFDcEJBLFFBQVFBLEdBQUdBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLEVBQ3ZCQSxZQUFZQSxHQUFHQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxLQUFLQSxLQUFLQSxDQUFDQSxHQUFHQSxLQUFLQSxHQUFHQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUM3REEsU0FBU0EsR0FBR0EsT0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0E7Z0JBRTNCQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxLQUFLQSxDQUFDQSxTQUFTQSxLQUFLQSxrQkFBU0EsQ0FBQ0EsTUFBTUEsRUFBRUEsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsWUFBWUEsRUFBRUEsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBRW5HQSxNQUFNQSxDQUFDQSw0QkFBbUJBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsU0FBU0EsQ0FBQ0E7cUJBQ25EQSxPQUFPQSxDQUFDQSxNQUFN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Q0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsbUJBQVVBLENBQUNBLFVBQVVBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUFBLENBQUNBO2dCQUN4R0EsSUFBSUEsU0FBU0EsR0FBR0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFDeEJBLE9BQU9BLEdBQUdBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLEVBQ3RCQSxRQUFRQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFFakJBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLEVBQUVBLENBQUNBLFNBQVNBLEVBQUVBLE9BQU9BLEVBQUVBLFFBQVFBLENBQUNBLENBQUNBO1lBQ3ZEQSxDQUFDQTtZQUNEQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFBQSxDQUFDQSxTQUFTQSxDQUFDQSxNQUFNQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFBQSxDQUFDQTtnQkFDNUJBLElBQUlBLE1BQU1BLEdBQUdBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLEVBQ3JCQSxRQUFRQSxHQUFHQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFFNUJBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLEVBQUVBLENBQUNBLE1BQU1BLEVBQUVBLFFBQVFBLENBQUNBLENBQUNBO1lBQzNDQSxDQUFDQTtZQUNEQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFBQSxDQUFDQSxTQUFTQSxDQUFDQSxNQUFNQSxLQUFLQSxDQUFDQSxJQUFJQSxtQkFBVUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsbUJBQVVBLENBQUNBLFVBQVVBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLElBQUlBLG1CQUFVQSxDQUFDQSxRQUFRQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFBQSxDQUFDQTtnQkFDN0lBLElBQUlBLFNBQVNBLEdBQUdBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLEVBQ3hCQSxPQUFPQSxHQUFHQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUN0QkEsUUFBUUEsR0FBR0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBRTVCQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxFQUFFQSxDQUFDQSxTQUFTQSxFQUFFQSxPQUFPQSxFQUFFQSxRQUFRQSxDQUFDQSxDQUFDQTtZQUN2REEsQ0FBQ0E7WUFDREEsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsTUFBTUEsS0FBS0EsQ0FBQ0EsSUFBSUEsU0FBU0EsQ0FBQ0EsTUFBTUEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQUEsQ0FBQ0E7Z0JBQ3REQSxJQUFJQSxNQUFNQSxHQUFHQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUNyQkEsU0FBU0EsR0FBR0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFDeEJBLE9BQU9BLEdBQUdBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLEVBQ3RCQSxRQUFRQSxHQUFHQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxLQUFLQSxTQUFTQSxHQUFFQSxDQUFDQSxHQUFFQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFFM0RBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLEVBQUVBLENBQUNBLE1BQU1BLEVBQUVBLFNBQVNBLEVBQUVBLE9BQU9BLEVBQUVBLFFBQVFBLENBQUNBLENBQUNBO1lBQy9EQSxDQUFDQTtRQUNMQSxDQUFDQTtRQVNhRixnQkFBR0EsR0FBakJBO1lBQ0lHLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLEdBQUdBLENBQUNBLEtBQUtBLENBQ3ZCQSxJQUFJQSxDQUFDQSxZQUFZQSxFQUNqQkEsS0FBS0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FDM0NBLENBQUNBO1FBQ05BLENBQUNBO1FBT2FILG9CQUFPQSxHQUFyQkEsVUFBc0JBLElBQUlBO1lBQ3RCSSxJQUFJQSxDQUFDQSxnQkFBZ0JBLENBQUNBLE9BQU9BLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLGdCQUFnQkEsRUFBRUEsS0FBS0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDekdBLENBQUNBO1FBRWFKLHNCQUFTQSxHQUF2QkEsVUFBd0JBLE1BQWlCQSxFQUFFQSxLQUFXQSxFQUFFQSxRQUFhQTtZQUNqRUssSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxTQUFTQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLEVBQUVBLEtBQUtBLENBQUNBLFNBQVNBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLFNBQVNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1FBQzNHQSxDQUFDQTtRQUVhTCxpQkFBSUEsR0FBbEJBLFVBQW1CQSxNQUFpQkEsRUFBRUEsS0FBV0EsRUFBRUEsUUFBYUE7WUFDNURNLElBQUlBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxFQUFFQSxLQUFLQSxDQUFDQSxTQUFTQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUN0R0EsQ0FBQ0E7UUFPYU4sc0JBQVNBLEdBQXZCQSxVQUF3QkEsSUFBSUE7WUFDeEJPLElBQUlBLFVBQVVBLEdBQUdBLElBQUlBLEVBQ2pCQSxhQUFhQSxHQUFHQSxJQUFJQSxDQUFDQTtZQUV6QkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsTUFBTUEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3pCQSxJQUFJQSxTQUFTQSxHQUFHQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFFN0JBLFVBQVVBLEdBQUdBLFVBQVVBLE9BQU9BO29CQUMxQixZQUFZLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDeEMsQ0FBQyxDQUFDQTtnQkFDRkEsYUFBYUEsR0FBR0EsVUFBVUEsT0FBT0E7b0JBQzdCLFlBQVksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUN6QyxDQUFDLENBQUNBO1lBQ05BLENBQUNBO1lBQ0RBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLFNBQVNBLENBQUNBLE1BQU1BLEtBQUtBLENBQUNBLElBQUlBLG1CQUFVQSxDQUFDQSxRQUFRQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDbkVBLElBQUlBLFNBQVNBLEdBQUdBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLEVBQ3hCQSxRQUFRQSxHQUFHQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFFNUJBLFVBQVVBLEdBQUdBLFVBQVVBLE9BQU9BO29CQUMxQixZQUFZLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ2xELENBQUMsQ0FBQ0E7Z0JBQ0ZBLGFBQWFBLEdBQUdBLFVBQVVBLE9BQU9BO29CQUM3QixZQUFZLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDekMsQ0FBQyxDQUFDQTtZQUNOQSxDQUFDQTtZQUNEQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxTQUFTQSxDQUFDQSxNQUFNQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDOUJBLElBQUlBLE1BQU1BLEdBQUdBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLEVBQ3JCQSxTQUFTQSxHQUFHQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFFN0JBLFVBQVVBLEdBQUdBLFVBQVVBLE9BQU9BO29CQUMxQixZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQ2hELENBQUMsQ0FBQ0E7Z0JBQ0ZBLGFBQWFBLEdBQUdBLFVBQVVBLE9BQU9BO29CQUM3QixZQUFZLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQ2pELENBQUMsQ0FBQ0E7WUFDTkEsQ0FBQ0E7WUFDREEsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsTUFBTUEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzlCQSxJQUFJQSxNQUFNQSxHQUFHQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUNyQkEsU0FBU0EsR0FBR0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFDeEJBLFFBQVFBLEdBQUdBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUU1QkEsVUFBVUEsR0FBR0EsVUFBVUEsT0FBT0E7b0JBQzFCLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQzFELENBQUMsQ0FBQ0E7Z0JBQ0ZBLGFBQWFBLEdBQUdBLFVBQVVBLE9BQU9BO29CQUM3QixZQUFZLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQ2pELENBQUMsQ0FBQ0E7WUFDTkEsQ0FBQ0E7WUFFREEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxVQUFVQSxFQUFFQSxhQUFhQSxDQUFDQSxDQUFDQTtRQUM1REEsQ0FBQ0E7UUFFYVAsNEJBQWVBLEdBQTdCQSxVQUE4QkEsTUFBaUJBLEVBQUVBLE1BQVVBO1lBQ3ZEUSxzQkFBYUEsQ0FBQ0EsV0FBV0EsRUFBRUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsTUFBTUEsRUFBRUEsTUFBTUEsQ0FBQ0EsQ0FBQ0E7WUFDNURBLHdEQUF3REE7UUFDNURBLENBQUNBO1FBbkpEUixzREFBc0RBO1FBQ3REQSxFQUFFQTtRQUNGQSxzQ0FBc0NBO1FBQ3RDQSxvQ0FBb0NBO1FBQ3BDQSxzQ0FBc0NBO1FBQ3RDQSw0Q0FBNENBO1FBQzVDQSxPQUFPQTtRQUNQQSw0QkFBNEJBO1FBQzVCQSxHQUFHQTtRQUVZQSx5QkFBWUEsR0FBZUEsb0JBQVdBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBO1FBQ2hEQSw2QkFBZ0JBLEdBQW1CQSx3QkFBZUEsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0E7UUErSS9FQSxtQkFBQ0E7SUFBREEsQ0EzSkEvVixBQTJKQytWLElBQUEvVjtJQTNKWUEscUJBQVlBLGVBMkp4QkEsQ0FBQUE7QUFDTEEsQ0FBQ0EsRUF2TE0sUUFBUSxLQUFSLFFBQVEsUUF1TGQ7O0FDeExELDJDQUEyQztBQUMzQyxJQUFPLFFBQVEsQ0FrUWQ7QUFsUUQsV0FBTyxRQUFRLEVBQUMsQ0FBQztJQUNiQTtRQXlDSXdXO1lBdENRQyxTQUFJQSxHQUFVQSxJQUFJQSxDQUFDQTtZQVMzQkEsK0RBQStEQTtZQUN2REEsY0FBU0EsR0FBWUEsSUFBSUEsQ0FBQ0E7WUFTMUJBLFlBQU9BLEdBQWNBLElBQUlBLENBQUNBO1lBUzFCQSxrQkFBYUEsR0FBY0EsSUFBSUEsQ0FBQ0E7WUFRaENBLGNBQVNBLEdBQW1CQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQTtZQUd6REEsSUFBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsVUFBVUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7WUFDOUJBLFVBQVVBLENBQUNBLE1BQU1BLElBQUlBLENBQUNBLENBQUNBO1FBQzNCQSxDQUFDQTtRQXhDREQsc0JBQUlBLDJCQUFHQTtpQkFBUEE7Z0JBQ0lFLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBO1lBQ3JCQSxDQUFDQTtpQkFFREYsVUFBUUEsR0FBVUE7Z0JBQ2RFLElBQUlBLENBQUNBLElBQUlBLEdBQUdBLEdBQUdBLENBQUNBO1lBQ3BCQSxDQUFDQTs7O1dBSkFGO1FBUURBLHNCQUFJQSxnQ0FBUUE7aUJBQVpBO2dCQUNJRyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQTtZQUMxQkEsQ0FBQ0E7aUJBRURILFVBQWFBLFFBQWlCQTtnQkFDMUJHLElBQUlBLENBQUNBLFNBQVNBLEdBQUdBLFFBQVFBLENBQUNBO1lBQzlCQSxDQUFDQTs7O1dBSkFIO1FBT0RBLHNCQUFJQSw4QkFBTUE7aUJBQVZBO2dCQUNJSSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQTtZQUN4QkEsQ0FBQ0E7aUJBRURKLFVBQVdBLE1BQWlCQTtnQkFDeEJJLElBQUlBLENBQUNBLE9BQU9BLEdBQUdBLE1BQU1BLENBQUNBO1lBQzFCQSxDQUFDQTs7O1dBSkFKO1FBT0RBLHNCQUFJQSxvQ0FBWUE7aUJBQWhCQTtnQkFDSUssTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0E7WUFDOUJBLENBQUNBO2lCQUNETCxVQUFpQkEsWUFBdUJBO2dCQUNwQ0ssSUFBSUEsQ0FBQ0EsYUFBYUEsR0FBR0EsWUFBWUEsQ0FBQ0E7WUFDdENBLENBQUNBOzs7V0FIQUw7UUFZTUEseUJBQUlBLEdBQVhBO1lBQ0lNLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLEVBQUVBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBLGVBQWVBLENBQUNBLENBQUNBO1FBQ3hEQSxDQUFDQTtRQUVETjs7V0FFR0E7UUFDSUEsNEJBQU9BLEdBQWRBO1lBQ0lPLElBQUlBLENBQUNBLE1BQU1BLEdBQUdBLElBQUlBLENBQUNBO1lBQ25CQSxxQkFBWUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUFDM0JBLENBQUNBO1FBRURQOztXQUVHQTtRQUNJQSw0QkFBT0EsR0FBZEE7UUFDQVEsQ0FBQ0E7UUFFTVIsZ0NBQVdBLEdBQWxCQTtRQUNBUyxDQUFDQTtRQUVNVCw4QkFBU0EsR0FBaEJBO1FBQ0FVLENBQUNBO1FBRU1WLDJCQUFNQSxHQUFiQTtRQUNBVyxDQUFDQTtRQUVNWCw2QkFBUUEsR0FBZkEsVUFBZ0JBLEtBQWdCQTtZQUM1QlksTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7UUFDMUNBLENBQUNBO1FBRURaLGdFQUFnRUE7UUFDekRBLDZCQUFRQSxHQUFmQSxVQUFnQkEsS0FBZ0JBO1lBQzVCYSxxQkFBcUJBO1lBQ3JCQSxzQ0FBc0NBO1lBQ3RDQSxtQkFBbUJBO1lBQ25CQSxHQUFHQTtZQUVIQSxFQUFFQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDZkEsK0NBQStDQTtnQkFDL0NBLEtBQUtBLENBQUNBLFFBQVFBLEVBQUVBLENBQUNBO1lBQ3JCQSxDQUFDQTtZQUVEQSxLQUFLQSxDQUFDQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQTtZQUdwQkEseURBQXlEQTtZQUN6REEsa0JBQWtCQTtZQUNsQkEsTUFBTUE7WUFHTkEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7WUFFL0JBLFlBQVlBO1lBR1pBOzs7ZUFHR0E7WUFDQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0E7WUFDaEJBLEdBQUdBO1lBQ0hBLHVCQUF1QkE7WUFDdkJBLDhCQUE4QkE7WUFDOUJBLGdDQUFnQ0E7WUFDaENBLG1EQUFtREE7WUFDbkRBLHVEQUF1REE7WUFDdkRBLGtCQUFrQkE7WUFDbEJBLE1BQU1BO1lBR05BLEtBQUtBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBO1lBQ2JBLEtBQUtBLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBO1lBRWhCQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtRQUNoQkEsQ0FBQ0E7UUFFTWIsK0JBQVVBLEdBQWpCQTtZQUNJYyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQTtRQUMxQkEsQ0FBQ0E7UUFFTWQseUJBQUlBLEdBQVhBO1lBQ0llLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBO1lBRW5DQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtRQUNoQkEsQ0FBQ0E7UUFFTWYsNEJBQU9BLEdBQWRBLFVBQWVBLElBQWFBO1lBQ3hCZ0IsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFFN0JBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO1FBQ2hCQSxDQUFDQTtRQUVNaEIsZ0NBQVdBLEdBQWxCQSxVQUFtQkEsS0FBZ0JBO1lBQy9CaUIsS0FBS0EsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0E7WUFFZkEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7WUFDbENBLDBDQUEwQ0E7WUFDMUNBLGtCQUFrQkE7WUFDbEJBLGdFQUFnRUE7WUFDaEVBLG9DQUFvQ0E7WUFDcENBLEtBQUtBLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBO1lBQ2hCQSw4QkFBOEJBO1lBQzlCQSwwREFBMERBO1lBQzFEQSxzQkFBc0JBO1lBQ3RCQSxVQUFVQTtZQUNWQSw4REFBOERBO1lBQzlEQSxzQkFBc0JBO1lBQ3RCQSxVQUFVQTtZQUNWQSxrQkFBa0JBO1lBQ2xCQSxHQUFHQTtZQUNIQSxlQUFlQTtZQUdmQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtRQUNoQkEsQ0FBQ0E7UUFFRGpCOzs7V0FHR0E7UUFDSUEsNkJBQVFBLEdBQWZBO1lBQ0lrQixJQUFJQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQTtZQUUxQkEsTUFBTUEsSUFBSUEsTUFBTUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFFbkNBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO1FBQ2hCQSxDQUFDQTtRQUVNbEIscUNBQWdCQSxHQUF2QkEsVUFBd0JBLEtBQVdBO1lBQy9CbUIsMkJBQTJCQTtZQUMzQkEsa0JBQWtCQTtZQUNsQkEsa0RBQWtEQTtZQUNsREEsNkJBQTZCQTtZQUM3QkEsa0RBQWtEQTtZQUNsREEsaUVBQWlFQTtZQUNqRUEsc0JBQXNCQTtZQUN0QkEsT0FBT0E7WUFDUEEsR0FBR0E7WUFDSEEsK0JBQStCQTtZQUMvQkEsOEJBQThCQTtZQUM5QkEsa0RBQWtEQTtZQUNsREEsaUNBQWlDQTtZQUNqQ0EsdURBQXVEQTtZQUN2REEscUJBQXFCQTtZQUNyQkEsMkJBQTJCQTtZQUMzQkEsV0FBV0E7WUFDWEEsT0FBT0E7WUFDUEEsR0FBR0E7WUFDSEEsRUFBRUE7WUFDRkEscUNBQXFDQTtZQUNyQ0EsbUJBQW1CQTtZQUNuQkEsc0RBQXNEQTtZQUN0REEsT0FBT0E7WUFDUEEsNENBQTRDQTtZQUM1Q0Esc0JBQXNCQTtZQUN0QkEsT0FBT0E7WUFDUEEsR0FBR0E7WUFDSEEsY0FBY0E7WUFFZEEsSUFBSUEsTUFBTUEsR0FBR0EsSUFBSUEsRUFDYkEsQ0FBQ0EsR0FBR0EsSUFBSUEsRUFDUkEsUUFBUUEsR0FBbUJBLElBQUlBLEVBQy9CQSxHQUFHQSxHQUFHQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxRQUFRQSxFQUFFQSxDQUFDQTtZQUVwQ0EsUUFBUUEsR0FBR0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0E7WUFDMUJBLEVBQUVBLENBQUFBLENBQUNBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUNUQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxFQUFFQSxDQUFDQTtvQkFDNUJBLElBQUlBLEtBQUtBLEdBQUdBLFFBQVFBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO29CQUVqQ0EsTUFBTUEsR0FBR0EsS0FBS0EsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtvQkFDdkNBLEVBQUVBLENBQUNBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBO3dCQUNUQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQTtvQkFDbEJBLENBQUNBO2dCQUNMQSxDQUFDQTtZQUNMQSxDQUFDQTtZQUVEQSxFQUFFQSxDQUFBQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDbkJBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO1lBQ2hCQSxDQUFDQTtZQUVEQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtRQUNoQkEsQ0FBQ0E7UUFFTW5CLDBCQUFLQSxHQUFaQSxVQUFhQSxjQUFvQkE7WUFDN0JvQix3QkFBd0JBO1lBQ3hCQSx5Q0FBeUNBO1lBQ3pDQSx3REFBd0RBO1lBR3hEQSxpQkFBaUJBO1lBQ2pCQSxFQUFFQTtZQUNGQSw4REFBOERBO1lBQzlEQSwyREFBMkRBO1lBRzNEQSwwQ0FBMENBO1lBQzFDQSxFQUFFQSxDQUFBQSxDQUFDQSxjQUFjQSxDQUFDQSxDQUFBQSxDQUFDQTtnQkFDZkEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7WUFDaEJBLENBQUNBO1lBQ0RBLElBQUlBLENBQUFBLENBQUNBO2dCQUNEQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQTtZQUNqQkEsQ0FBQ0E7UUFDTEEsQ0FBQ0E7UUFFT3BCLDZCQUFRQSxHQUFoQkEsVUFBaUJBLENBQVlBLEVBQUVBLENBQVlBO1lBQ3ZDcUIsTUFBTUEsQ0FBQ0EsVUFBU0EsQ0FBQ0EsRUFBRUEsQ0FBQ0E7Z0JBQ2hCLE1BQU0sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUN2QyxDQUFDLENBQUFBO1FBQ0xBLENBQUNBO1FBOVBjckIsaUJBQU1BLEdBQVVBLENBQUNBLENBQUNBO1FBK1ByQ0EsaUJBQUNBO0lBQURBLENBaFFBeFcsQUFnUUN3VyxJQUFBeFc7SUFoUVlBLG1CQUFVQSxhQWdRdEJBLENBQUFBO0FBQ0xBLENBQUNBLEVBbFFNLFFBQVEsS0FBUixRQUFRLFFBa1FkOzs7Ozs7OztBQ25RRCwyQ0FBMkM7QUFDM0MsSUFBTyxRQUFRLENBZ0VkO0FBaEVELFdBQU8sUUFBUSxFQUFBLENBQUM7SUFDWkE7UUFBMEI4WCx3QkFBVUE7UUF3QmhDQSxjQUFZQSxJQUFhQTtZQUNyQkMsaUJBQU9BLENBQUNBO1lBWkpBLFlBQU9BLEdBQVVBLGVBQU1BLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBO1lBUWpDQSxVQUFLQSxHQUFZQSxJQUFJQSxDQUFDQTtZQUN0QkEsbUJBQWNBLEdBQWlCQSxzQkFBYUEsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0E7WUFLMURBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBO1FBQ3RCQSxDQUFDQTtRQTNCREQsMkZBQTJGQTtRQUMzRkEsNEJBQTRCQTtRQUU1QkEsc0ZBQXNGQTtRQUV0RkEsMENBQTBDQTtRQUM1QkEsV0FBTUEsR0FBcEJBLFVBQXFCQSxJQUFhQTtZQUM5QkUsSUFBSUEsR0FBR0EsR0FBR0EsSUFBSUEsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFFekJBLE1BQU1BLENBQUNBLEdBQUdBLENBQUNBO1FBQ2ZBLENBQUNBO1FBR0RGLHNCQUFJQSx3QkFBTUE7aUJBQVZBO2dCQUNJRyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQTtZQUN4QkEsQ0FBQ0E7aUJBQ0RILFVBQVdBLE1BQWFBO2dCQUNwQkcsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsTUFBTUEsQ0FBQ0E7WUFDMUJBLENBQUNBOzs7V0FIQUg7UUFjTUEsd0JBQVNBLEdBQWhCQSxVQUFpQkEsTUFBYUE7WUFDM0JJLElBQUlBLENBQUNBLGNBQWNBLENBQUNBLFFBQVFBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO1FBQ3hDQSxDQUFDQTtRQUVNSixxQkFBTUEsR0FBYkE7WUFDSUssSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0E7UUFDakNBLENBQUNBO1FBRU1MLG1CQUFJQSxHQUFYQTtZQUNJTSxJQUFJQSxDQUFDQSxlQUFlQSxFQUFFQSxDQUFDQTtRQUMzQkEsQ0FBQ0E7UUFFTU4sbUJBQUlBLEdBQVhBO1lBQ0lPLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLGlCQUFRQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUM3Q0EsQ0FBQ0E7UUFFT1AsOEJBQWVBLEdBQXZCQTtZQUNJUSxJQUFJQSxRQUFRQSxHQUFHQSxpQkFBUUEsQ0FBQ0EsV0FBV0EsRUFBRUEsQ0FBQ0EsUUFBUUEsRUFDMUNBLE9BQU9BLEdBQUdBLFFBQVFBLENBQUNBLGlCQUFpQkEsRUFBRUEsQ0FBQ0E7WUFFM0NBLE9BQU9BLENBQUNBLE9BQU9BLEdBQUdBO2dCQUNkQSxZQUFZQSxFQUFFQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxRQUFRQTtnQkFDakNBLGtDQUFrQ0E7Z0JBQ2xDQSw4QkFBOEJBO2dCQUM5QkEsV0FBV0EsRUFBRUEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsT0FBT0E7Z0JBQy9CQSxXQUFXQSxFQUFFQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQTthQUNqQ0EsQ0FBQ0E7WUFDRkEsd0JBQXdCQTtZQUN4QkEsdUNBQXVDQTtZQUV2Q0EsUUFBUUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7UUFDakNBLENBQUNBO1FBQ0xSLFdBQUNBO0lBQURBLENBOURBOVgsQUE4REM4WCxFQTlEeUI5WCxtQkFBVUEsRUE4RG5DQTtJQTlEWUEsYUFBSUEsT0E4RGhCQSxDQUFBQTtBQUNMQSxDQUFDQSxFQWhFTSxRQUFRLEtBQVIsUUFBUSxRQWdFZDs7Ozs7Ozs7QUNqRUQsMkNBQTJDO0FBQzNDLElBQU8sUUFBUSxDQThFZDtBQTlFRCxXQUFPLFFBQVEsRUFBQyxDQUFDO0lBQ2JBO1FBQTJCdVkseUJBQVVBO1FBMkJqQ0EsZUFBWUEsTUFBTUE7WUFDZEMsaUJBQU9BLENBQUNBO1lBbkJaQSw2REFBNkRBO1lBRXJEQSxZQUFPQSxHQUFVQSxJQUFJQSxDQUFDQTtZQVF0QkEsYUFBUUEsR0FBV0EsSUFBSUEsQ0FBQ0E7WUFXNUJBLElBQUlBLENBQUNBLE9BQU9BLEdBQUdBLE1BQU1BLENBQUNBO1FBQzFCQSxDQUFDQTtRQTlCYUQsWUFBTUEsR0FBcEJBLFVBQXFCQSxNQUFhQSxFQUFFQSxRQUFlQSxFQUFFQSxRQUFlQTtZQUNoRUUsSUFBSUEsR0FBR0EsR0FBR0EsSUFBSUEsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7WUFFM0JBLEdBQUdBLENBQUNBLGNBQWNBLENBQUNBLFFBQVFBLEVBQUVBLFFBQVFBLENBQUNBLENBQUNBO1lBRXZDQSxNQUFNQSxDQUFDQSxHQUFHQSxDQUFDQTtRQUNmQSxDQUFDQTtRQUtERixzQkFBSUEseUJBQU1BO2lCQUFWQTtnQkFDSUcsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7WUFDeEJBLENBQUNBO2lCQUNESCxVQUFXQSxNQUFhQTtnQkFDcEJHLElBQUlBLENBQUNBLE9BQU9BLEdBQUdBLE1BQU1BLENBQUNBO1lBQzFCQSxDQUFDQTs7O1dBSEFIO1FBTURBLHNCQUFJQSwwQkFBT0E7aUJBQVhBO2dCQUNJSSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQTtZQUN6QkEsQ0FBQ0E7aUJBQ0RKLFVBQVlBLE9BQWVBO2dCQUN2QkksSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsT0FBT0EsQ0FBQ0E7WUFDNUJBLENBQUNBOzs7V0FIQUo7UUFXTUEsOEJBQWNBLEdBQXJCQSxVQUFzQkEsUUFBZUEsRUFBRUEsUUFBZUE7WUFDbERLLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLGdCQUFPQSxDQUFDQSxNQUFNQSxDQUFDQSxRQUFRQSxFQUFFQSxRQUFRQSxDQUFDQSxDQUFBQTtRQUN0REEsQ0FBQ0E7UUFFREwsZ0NBQWdDQTtRQUNoQ0EsMENBQTBDQTtRQUMxQ0EsR0FBR0E7UUFFSUEsbUJBQUdBLEdBQVZBO1lBQ0lNLElBQUlBLElBQUlBLEdBQUdBLElBQUlBLENBQUNBO1lBRWhCQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxVQUFVQSxFQUFFQSxDQUFDQTtZQUMxQkEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsV0FBV0EsRUFBRUEsQ0FBQ0E7WUFFM0JBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO1lBRW5CQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTtZQUVwQkEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsVUFBQ0EsSUFBSUE7Z0JBQ2RBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO2dCQUVwQkEsSUFBSUEsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0E7Z0JBRWRBLElBQUlBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBO1lBQ2hCQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUdIQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxTQUFTQSxFQUFFQSxDQUFDQTtZQUN6QkEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsU0FBU0EsRUFBRUEsQ0FBQ0E7UUFDN0JBLENBQUNBO1FBRU1OLG9CQUFJQSxHQUFYQTtZQUNJTyxJQUFJQSxDQUFDQSxRQUFRQSxHQUFHQSxpQkFBUUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDN0NBLENBQUNBO1FBR09QLHdCQUFRQSxHQUFoQkEsVUFBaUJBLElBQUlBO1lBQ2pCUSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxjQUFjQSxDQUFDQSxhQUFhQSxFQUFFQSx3QkFBZUEsQ0FBQ0EsVUFBVUEsRUFBRUEsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUMxR0EsQ0FBQ0E7UUFFT1IsaUNBQWlCQSxHQUF6QkEsVUFBMEJBLElBQUlBO1lBQzFCUyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxXQUFXQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxlQUFlQSxFQUFFQSxDQUFDQSxDQUFDQTtRQUMxRUEsQ0FBQ0E7UUFDTFQsWUFBQ0E7SUFBREEsQ0E1RUF2WSxBQTRFQ3VZLEVBNUUwQnZZLG1CQUFVQSxFQTRFcENBO0lBNUVZQSxjQUFLQSxRQTRFakJBLENBQUFBO0FBQ0xBLENBQUNBLEVBOUVNLFFBQVEsS0FBUixRQUFRLFFBOEVkOztBQy9FRCwyQ0FBMkM7QUFDM0MsSUFBTyxRQUFRLENBbU9kO0FBbk9ELFdBQU8sUUFBUSxFQUFBLENBQUM7SUFFWkE7OztPQUdHQTtJQUNIQSxNQUFNQSxDQUFDQSx5QkFBeUJBLEdBQUdBLENBQUNBO1FBQ2hDLElBQUksNkJBQTZCLEdBQUcsU0FBUyxFQUN6QyxPQUFPLEdBQUcsU0FBUyxFQUNuQixRQUFRLEdBQUcsU0FBUyxFQUNwQixZQUFZLEdBQUcsSUFBSSxFQUNuQixTQUFTLEdBQUcsU0FBUyxDQUFDLFNBQVMsRUFDL0IsS0FBSyxHQUFHLENBQUMsRUFDVCxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRWhCLE9BQU8sR0FBRyxVQUFVLElBQUk7WUFDcEIsSUFBSSxHQUFHLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hCLENBQUMsQ0FBQztRQUVGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBc0JHO1FBQ0gsRUFBRSxDQUFBLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQztZQUM5QixNQUFNLENBQUMscUJBQXFCLENBQUM7UUFDakMsQ0FBQztRQUdELDRDQUE0QztRQUM1QyxtREFBbUQ7UUFFbkQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLDJCQUEyQixDQUFDLENBQUMsQ0FBQztZQUNyQyxxQkFBcUI7WUFFckIsa0JBQWtCO1lBRWxCLDZCQUE2QixHQUFHLE1BQU0sQ0FBQywyQkFBMkIsQ0FBQztZQUVuRSxNQUFNLENBQUMsMkJBQTJCLEdBQUcsVUFBVSxRQUFRLEVBQUUsT0FBTztnQkFDNUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7Z0JBRXpCLDJEQUEyRDtnQkFFM0QsTUFBTSxDQUFDLDZCQUE2QixDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztZQUMzRCxDQUFDLENBQUE7UUFDTCxDQUFDO1FBRUQsVUFBVTtRQUNWLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUM7WUFDakMsNkJBQTZCLEdBQUcsTUFBTSxDQUFDLHVCQUF1QixDQUFDO1lBRS9ELE1BQU0sQ0FBQyx1QkFBdUIsR0FBRyxVQUFVLFFBQVE7Z0JBQy9DLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO2dCQUV6QixNQUFNLENBQUMsNkJBQTZCLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbEQsQ0FBQyxDQUFBO1FBQ0wsQ0FBQztRQUVELCtDQUErQztRQUMvQyx1REFBdUQ7UUFDdkQsZ0JBQWdCO1FBRWhCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUM7WUFDbEMscURBQXFEO1lBQ3JELCtDQUErQztZQUMvQyxlQUFlO1lBRWYsS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFakMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25DLFlBQVksR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBRTlDLEVBQUUsQ0FBQyxDQUFDLFlBQVksS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUN6Qiw4Q0FBOEM7b0JBQzlDLGdDQUFnQztvQkFFaEMsTUFBTSxDQUFDLHdCQUF3QixHQUFHLFNBQVMsQ0FBQztnQkFDaEQsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDO1FBRVQsZ0dBQWdHO1FBQ3hGLE1BQU0sQ0FBQyxNQUFNLENBQUMsMkJBQTJCO1lBQ3JDLE1BQU0sQ0FBQyx3QkFBd0I7WUFDL0IsTUFBTSxDQUFDLHNCQUFzQjtZQUM3QixNQUFNLENBQUMsdUJBQXVCO1lBRTlCLFVBQVUsUUFBUSxFQUFFLE9BQU87Z0JBQ3ZCLElBQUksS0FBSyxFQUNMLE1BQU0sQ0FBQztnQkFFWCxNQUFNLENBQUMsVUFBVSxDQUFDO29CQUNkLEtBQUssR0FBRyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7b0JBQ3BCLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDaEIsTUFBTSxHQUFHLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztvQkFFckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLEdBQUcsRUFBRSxHQUFHLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDO2dCQUVoRCxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3JCLENBQUMsQ0FBQztJQUNWLENBQUMsRUFBRUEsQ0FBQ0EsQ0FBQ0E7SUFFTEEsTUFBTUEsQ0FBQ0EsK0JBQStCQSxHQUFHQSxNQUFNQSxDQUFDQSwyQkFBMkJBO1dBQ3hFQSxNQUFNQSxDQUFDQSwwQkFBMEJBO1dBQ2pDQSxNQUFNQSxDQUFDQSxpQ0FBaUNBO1dBQ3hDQSxNQUFNQSxDQUFDQSw4QkFBOEJBO1dBQ3JDQSxNQUFNQSxDQUFDQSw0QkFBNEJBO1dBQ25DQSxNQUFNQSxDQUFDQSw2QkFBNkJBO1dBQ3BDQSxZQUFZQSxDQUFDQTtJQUVoQkE7UUFBQWlaO1lBV0lDLGdCQUFnQkE7WUFDUkEsY0FBU0EsR0FBaUJBLElBQUlBLENBQUNBO1lBUS9CQSxVQUFLQSxHQUFTQSxJQUFJQSxDQUFDQTtZQVFuQkEsUUFBR0EsR0FBT0EsSUFBSUEsQ0FBQ0E7WUFRZkEsV0FBTUEsR0FBU0EsSUFBSUEsQ0FBQ0E7WUFDcEJBLFlBQU9BLEdBQVVBLElBQUlBLENBQUNBO1FBMkRsQ0EsQ0FBQ0E7UUE3RmlCRCxvQkFBV0EsR0FBekJBO1lBQ0lFLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFNBQVNBLEtBQUtBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO2dCQUMxQkEsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsSUFBSUEsSUFBSUEsRUFBRUEsQ0FBQ0E7Z0JBQzVCQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxjQUFjQSxFQUFFQSxDQUFDQTtZQUNwQ0EsQ0FBQ0E7WUFDREEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0E7UUFDMUJBLENBQUNBO1FBSURGLHNCQUFJQSw4QkFBUUE7aUJBQVpBO2dCQUNJRyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQTtZQUMxQkEsQ0FBQ0E7aUJBQ0RILFVBQWFBLFFBQXNCQTtnQkFDL0JHLElBQUlBLENBQUNBLFNBQVNBLEdBQUdBLFFBQVFBLENBQUNBO1lBQzlCQSxDQUFDQTs7O1dBSEFIO1FBTURBLHNCQUFJQSwwQkFBSUE7aUJBQVJBO2dCQUNJSSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQTtZQUN0QkEsQ0FBQ0E7aUJBQ0RKLFVBQVNBLElBQVVBO2dCQUNmSSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQTtZQUN0QkEsQ0FBQ0E7OztXQUhBSjtRQU1EQSxzQkFBSUEsd0JBQUVBO2lCQUFOQTtnQkFDSUssTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0E7WUFDcEJBLENBQUNBO2lCQUNETCxVQUFPQSxFQUFNQTtnQkFDVEssSUFBSUEsQ0FBQ0EsR0FBR0EsR0FBR0EsRUFBRUEsQ0FBQ0E7WUFDbEJBLENBQUNBOzs7V0FIQUw7UUFRTUEsaUNBQWNBLEdBQXJCQTtZQUNJTSw0Q0FBNENBO1lBQzVDQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxzQkFBYUEsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0E7UUFDNUNBLENBQUNBO1FBRU1OLCtCQUFZQSxHQUFuQkEsVUFBb0JBLEtBQVdBO1lBQzNCTyxLQUFLQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQTtZQUNiQSxLQUFLQSxDQUFDQSxPQUFPQSxFQUFFQSxDQUFDQTtZQUNoQkEsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBR0EsS0FBS0EsQ0FBQ0E7WUFFcEJBLG9CQUFvQkE7WUFDcEJBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBO1lBRXRCQSxJQUFJQSxDQUFDQSxVQUFVQSxFQUFFQSxDQUFDQTtRQUN0QkEsQ0FBQ0E7UUFFTVAsMEJBQU9BLEdBQWRBO1lBQ0lRLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBO1FBQ3RCQSxDQUFDQTtRQUVNUixtQ0FBZ0JBLEdBQXZCQSxVQUF3QkEsS0FBV0E7WUFDL0JTLEVBQUVBLENBQUFBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUFBLENBQUNBO2dCQUNiQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtZQUNoQkEsQ0FBQ0E7WUFFREEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtRQUMvQ0EsQ0FBQ0E7UUFFTVQsMkJBQVFBLEdBQWZBLFVBQWdCQSxRQUFlQTtZQUMzQlUsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0Esa0JBQVNBLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLE1BQU1BLENBQUNBLFFBQVFBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ3JFQSxJQUFJQSxDQUFDQSxHQUFHQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxVQUFVQSxFQUFFQSxDQUFDQTtRQUN2Q0EsQ0FBQ0E7UUFFT1YsNkJBQVVBLEdBQWxCQTtZQUNJVyxJQUFJQSxJQUFJQSxHQUFHQSxJQUFJQSxFQUNYQSxRQUFRQSxHQUFHQSxJQUFJQSxDQUFDQTtZQUVwQkEsUUFBUUEsR0FBR0EsVUFBQ0EsSUFBSUE7Z0JBQ1pBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO2dCQUVyQkEsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsTUFBTUEsQ0FBQ0EseUJBQXlCQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQTtZQUM5REEsQ0FBQ0EsQ0FBQ0E7WUFDRkEsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsTUFBTUEsQ0FBQ0EseUJBQXlCQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQTtRQUM5REEsQ0FBQ0E7UUFFRFgseUJBQXlCQTtRQUNqQkEsNEJBQVNBLEdBQWpCQSxVQUFrQkEsSUFBSUE7WUFDbEJZLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLGdCQUFnQkEsR0FBR0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxDQUFDQTtZQUV0RUEsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsV0FBV0EsRUFBRUEsQ0FBQ0E7WUFFMUJBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO1lBRWxCQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQTtZQUVuQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsU0FBU0EsRUFBRUEsQ0FBQ0E7UUFDNUJBLENBQUNBO1FBOUZjWixrQkFBU0EsR0FBWUEsSUFBSUEsQ0FBQ0E7UUErRjdDQSxlQUFDQTtJQUFEQSxDQWhHQWpaLEFBZ0dDaVosSUFBQWpaO0lBaEdZQSxpQkFBUUEsV0FnR3BCQSxDQUFBQTtBQUNMQSxDQUFDQSxFQW5PTSxRQUFRLEtBQVIsUUFBUSxRQW1PZDs7QUNwT0Qsd0NBQXdDO0FBQ3hDLElBQU8sUUFBUSxDQXFPZDtBQXJPRCxXQUFPLFFBQVEsRUFBQSxDQUFDO0lBQ1pBLGdFQUFnRUE7SUFDaEVBLGlDQUFpQ0E7SUFDakNBO1FBOEVJOFosZ0JBQVlBLFlBQVlBLEVBQUVBLGlCQUFpQkE7WUFyRW5DQyxhQUFRQSxHQUFVQSxJQUFJQSxDQUFDQTtZQVF2QkEsYUFBUUEsR0FBVUEsSUFBSUEsQ0FBQ0E7WUFRdkJBLGVBQVVBLEdBQVVBLElBQUlBLENBQUNBO1lBUXpCQSxpQkFBWUEsR0FBVUEsR0FBR0EsQ0FBQ0E7WUFRMUJBLGlCQUFZQSxHQUFVQSxHQUFHQSxDQUFDQTtZQVExQkEsZUFBVUEsR0FBVUEsRUFBRUEsQ0FBQ0E7WUFRdkJBLFVBQUtBLEdBQVVBLElBQUlBLENBQUNBO1lBQ3BCQSxVQUFLQSxHQUFVQSxJQUFJQSxDQUFDQTtZQUNwQkEsVUFBS0EsR0FBVUEsSUFBSUEsQ0FBQ0E7WUFDcEJBLFNBQUlBLEdBQVVBLElBQUlBLENBQUNBO1lBQ25CQSxTQUFJQSxHQUFVQSxJQUFJQSxDQUFDQTtZQUNuQkEsU0FBSUEsR0FBVUEsSUFBSUEsQ0FBQ0E7WUFDbkJBLGFBQVFBLEdBQVVBLElBQUlBLENBQUNBO1lBQ3ZCQSxhQUFRQSxHQUFVQSxJQUFJQSxDQUFDQTtZQUN2QkEsYUFBUUEsR0FBVUEsSUFBSUEsQ0FBQ0E7WUFDdkJBLGVBQVVBLEdBQVNBLElBQUlBLENBQUNBO1lBQ3hCQSxZQUFPQSxHQUFVQSxJQUFJQSxDQUFDQTtZQUN0QkEsVUFBS0EsR0FBVUEsSUFBSUEsQ0FBQ0E7WUFDcEJBLFNBQUlBLEdBQVVBLElBQUlBLENBQUNBO1lBQ25CQSxXQUFNQSxHQUFVQSxJQUFJQSxDQUFDQTtZQUNyQkEsV0FBTUEsR0FBVUEsSUFBSUEsQ0FBQ0E7WUFDckJBLFdBQU1BLEdBQVVBLElBQUlBLENBQUNBO1lBQ3JCQSxrQkFBYUEsR0FBVUEsSUFBSUEsQ0FBQ0E7WUFDNUJBLGtCQUFhQSxHQUFVQSxJQUFJQSxDQUFDQTtZQUM1QkEsaUJBQVlBLEdBQVVBLElBQUlBLENBQUNBO1lBQzNCQSxrQkFBYUEsR0FBVUEsSUFBSUEsQ0FBQ0E7WUFHaENBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLFlBQVlBLENBQUNBLElBQUlBLENBQUNBO1lBQy9CQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxZQUFZQSxDQUFDQSxJQUFJQSxDQUFDQTtZQUMvQkEsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7WUFDL0JBLElBQUlBLENBQUNBLElBQUlBLEdBQUdBLFlBQVlBLENBQUNBLEdBQUdBLENBQUNBO1lBQzdCQSxJQUFJQSxDQUFDQSxJQUFJQSxHQUFHQSxZQUFZQSxDQUFDQSxHQUFHQSxDQUFDQTtZQUM3QkEsSUFBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsWUFBWUEsQ0FBQ0EsR0FBR0EsQ0FBQ0E7WUFDN0JBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLFlBQVlBLENBQUNBLE9BQU9BLENBQUNBO1lBQ3JDQSxJQUFJQSxDQUFDQSxRQUFRQSxHQUFHQSxZQUFZQSxDQUFDQSxPQUFPQSxDQUFDQTtZQUNyQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsWUFBWUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7WUFFckNBLElBQUlBLENBQUNBLFVBQVVBLEdBQUVBLGlCQUFpQkEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7WUFDekNBLElBQUlBLENBQUNBLE9BQU9BLEdBQUdBLGlCQUFpQkEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7WUFDeENBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLGlCQUFpQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7WUFDcENBLElBQUlBLENBQUNBLElBQUlBLEdBQUdBLGlCQUFpQkEsQ0FBQ0EsR0FBR0EsQ0FBQ0E7WUFFbENBLElBQUlBLENBQUNBLE1BQU1BLEdBQUdBLENBQUNBLENBQUNBO1lBQ2hCQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUNoQkEsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDaEJBLElBQUlBLENBQUNBLGFBQWFBLEdBQUdBLENBQUNBLENBQUNBO1lBQ3ZCQSxJQUFJQSxDQUFDQSxhQUFhQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUN2QkEsSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDdEJBLElBQUlBLENBQUNBLGFBQWFBLEdBQUdBLENBQUNBLENBQUNBO1lBRXZCQSxJQUFJQSxDQUFDQSxRQUFRQSxHQUFHQSxlQUFNQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQTtZQUNoQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsZUFBTUEsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0E7UUFDcENBLENBQUNBO1FBdkdhRCxhQUFNQSxHQUFwQkEsVUFBcUJBLFlBQVlBLEVBQUVBLGlCQUFpQkE7WUFDaERFLElBQUlBLEdBQUdBLEdBQUdBLElBQUlBLElBQUlBLENBQUNBLFlBQVlBLEVBQUVBLGlCQUFpQkEsQ0FBQ0EsQ0FBQ0E7WUFFcERBLEdBQUdBLENBQUNBLGNBQWNBLEVBQUVBLENBQUNBO1lBRXJCQSxNQUFNQSxDQUFDQSxHQUFHQSxDQUFDQTtRQUNmQSxDQUFDQTtRQUdERixzQkFBSUEsMkJBQU9BO2lCQUFYQTtnQkFDSUcsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7WUFDekJBLENBQUNBO2lCQUNESCxVQUFZQSxPQUFjQTtnQkFDdEJHLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLE9BQU9BLENBQUNBO1lBQzVCQSxDQUFDQTs7O1dBSEFIO1FBTURBLHNCQUFJQSwyQkFBT0E7aUJBQVhBO2dCQUNJSSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQTtZQUN6QkEsQ0FBQ0E7aUJBQ0RKLFVBQVlBLE9BQWNBO2dCQUN0QkksSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsT0FBT0EsQ0FBQ0E7WUFDNUJBLENBQUNBOzs7V0FIQUo7UUFNREEsc0JBQUlBLDZCQUFTQTtpQkFBYkE7Z0JBQ0lLLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBO1lBQzNCQSxDQUFDQTtpQkFDREwsVUFBY0EsU0FBZ0JBO2dCQUMxQkssSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsU0FBU0EsQ0FBQ0E7WUFDaENBLENBQUNBOzs7V0FIQUw7UUFNREEsc0JBQUlBLCtCQUFXQTtpQkFBZkE7Z0JBQ0lNLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBO1lBQzdCQSxDQUFDQTtpQkFDRE4sVUFBZ0JBLFlBQW1CQTtnQkFDL0JNLElBQUlBLENBQUNBLFlBQVlBLEdBQUdBLFlBQVlBLENBQUNBO1lBQ3JDQSxDQUFDQTs7O1dBSEFOO1FBTURBLHNCQUFJQSwrQkFBV0E7aUJBQWZBO2dCQUNJTyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQTtZQUM3QkEsQ0FBQ0E7aUJBQ0RQLFVBQWdCQSxXQUFrQkE7Z0JBQzlCTyxJQUFJQSxDQUFDQSxZQUFZQSxHQUFHQSxXQUFXQSxDQUFDQTtZQUNwQ0EsQ0FBQ0E7OztXQUhBUDtRQU1EQSxzQkFBSUEsNkJBQVNBO2lCQUFiQTtnQkFDSVEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0E7WUFDM0JBLENBQUNBO2lCQUNEUixVQUFjQSxTQUFnQkE7Z0JBQzFCUSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxTQUFTQSxDQUFDQTtZQUNoQ0EsQ0FBQ0E7OztXQUhBUjtRQXNETUEsK0JBQWNBLEdBQXJCQTtZQUNJUyxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxFQUFFQSxJQUFJQSxDQUFDQSxLQUFLQSxFQUFFQSxJQUFJQSxDQUFDQSxLQUFLQSxFQUFFQSxJQUFJQSxDQUFDQSxRQUFRQSxFQUFFQSxJQUFJQSxDQUFDQSxRQUFRQSxFQUFFQSxJQUFJQSxDQUFDQSxRQUFRQSxFQUFFQSxJQUFJQSxDQUFDQSxJQUFJQSxFQUFFQSxJQUFJQSxDQUFDQSxJQUFJQSxFQUFFQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUMxSUEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsRUFBRUEsSUFBSUEsQ0FBQ0EsT0FBT0EsRUFBRUEsSUFBSUEsQ0FBQ0EsS0FBS0EsRUFBRUEsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUFDdkZBLENBQUNBO1FBRU1ULGdDQUFlQSxHQUF0QkE7WUFDSVUsSUFBSUEsTUFBTUEsR0FBR0EsZUFBTUEsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0E7WUFFN0JBLE1BQU1BLENBQUNBLFdBQVdBLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBO1lBQ2xDQSxNQUFNQSxDQUFDQSxXQUFXQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQTtZQUVsQ0EsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7UUFDbEJBLENBQUNBO1FBRURWLHlCQUFRQSxHQUFSQTtZQUNJVyxJQUFJQSxDQUFDQSxvQkFBb0JBLENBQUNBLGdCQUFPQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUdyRUEsc0VBQXNFQTtZQUN0RUEsbUZBQW1GQTtZQUNuRkEsaUZBQWlGQTtRQUNyRkEsQ0FBQ0E7UUFDRFgsMEJBQVNBLEdBQVRBO1lBQ0lZLElBQUlBLENBQUNBLG9CQUFvQkEsQ0FBQ0EsZ0JBQU9BLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBRXBFQSxtRkFBbUZBO1lBQ25GQSxpRkFBaUZBO1FBQ3JGQSxDQUFDQTtRQUVEWix5QkFBUUEsR0FBUkE7WUFDSWEsSUFBSUEsQ0FBQ0Esb0JBQW9CQSxDQUFDQSxnQkFBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsSUFBSUEsQ0FBQ0EsVUFBVUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFFcEVBLG1GQUFtRkE7WUFDbkZBLGlGQUFpRkE7WUFFakZBLG1GQUFtRkE7WUFDbkZBLGlGQUFpRkE7UUFDckZBLENBQUNBO1FBQ0RiLDBCQUFTQSxHQUFUQTtZQUNJYyxJQUFJQSxDQUFDQSxvQkFBb0JBLENBQUNBLGdCQUFPQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUVyRUEsbUZBQW1GQTtZQUNuRkEsaUZBQWlGQTtZQUVqRkEsbUZBQW1GQTtZQUNuRkEsaUZBQWlGQTtRQUNyRkEsQ0FBQ0E7UUFFRGQsb0JBQW9CQTtRQUNwQkEsdUJBQU1BLEdBQU5BO1lBQ0llLElBQUlBLENBQUNBLGFBQWFBLEdBQUdBLElBQUlBLENBQUNBLGFBQWFBLEdBQUdBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBO1lBQUFBLENBQUNBO1lBQzdEQSxJQUFJQSxDQUFDQSxhQUFhQSxHQUFHQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxJQUFJQSxDQUFDQSxhQUFhQSxHQUFHQSxJQUFJQSxDQUFDQSxZQUFZQSxFQUFFQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtRQUNqR0EsQ0FBQ0E7UUFFRGYsdUJBQU1BLEdBQU5BO1lBQ0lnQixJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxJQUFJQSxDQUFDQSxVQUFVQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQTtRQUN2RUEsQ0FBQ0E7UUFDRGhCLHdCQUFPQSxHQUFQQTtZQUNJaUIsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsSUFBSUEsQ0FBQ0EsVUFBVUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDckVBLENBQUNBO1FBRURqQixvQkFBR0EsR0FBSEE7WUFDSWtCOzs7Ozs7O2VBT0dBO1lBQ0hBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO1lBRWxFQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxhQUFhQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUN6REEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFFekRBLHVHQUF1R0E7WUFDdkdBLHVCQUF1QkE7WUFDdkJBLHVCQUF1QkE7WUFDdkJBLHVCQUF1QkE7WUFHdkJBLGlFQUFpRUE7WUFFakVBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLGNBQWNBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLEVBQUVBLElBQUlBLENBQUNBLE9BQU9BLEVBQUVBLElBQUlBLENBQUNBLEtBQUtBLEVBQUVBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1FBQ3ZGQSxDQUFDQTtRQUVNbEIsMkJBQVVBLEdBQWpCQTtZQUNJbUIsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0E7WUFDckJBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBO1FBQ3pCQSxDQUFDQTtRQUVNbkIsMEJBQVNBLEdBQWhCQTtZQUNJb0IsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7WUFDcEJBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO1FBQ3hCQSxDQUFDQTtRQUVEcEI7O1dBRUdBO1FBQ0lBLDRCQUFXQSxHQUFsQkE7UUFDQXFCLENBQUNBO1FBRU1yQiwwQkFBU0EsR0FBaEJBO1FBQ0FzQixDQUFDQTtRQUVPdEIscUNBQW9CQSxHQUE1QkEsVUFBNkJBLFNBQVNBO1lBQ2xDdUI7O2VBRUdBO1lBQ0hBLElBQUlBLE1BQU1BLEdBQUdBLGVBQU1BLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBO1lBQzdCQSxNQUFNQSxDQUFDQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxhQUFhQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUNwREEsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFFakRBLElBQUlBLE1BQU1BLEdBQUdBLE1BQU1BLENBQUNBLGVBQWVBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLE1BQU1BLENBQUNBO1lBRXREQSxJQUFJQSxDQUFDQSxNQUFNQSxJQUFJQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUN6QkEsSUFBSUEsQ0FBQ0EsTUFBTUEsSUFBSUEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDekJBLElBQUlBLENBQUNBLE1BQU1BLElBQUlBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1FBQzdCQSxDQUFDQTtRQUNMdkIsYUFBQ0E7SUFBREEsQ0FqT0E5WixBQWlPQzhaLElBQUE5WjtJQWpPWUEsZUFBTUEsU0FpT2xCQSxDQUFBQTtBQUNMQSxDQUFDQSxFQXJPTSxRQUFRLEtBQVIsUUFBUSxRQXFPZCIsImZpbGUiOiJFbmdpbmUuZGVidWcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUgRW5naW5lM0Qge1xuICAgIGV4cG9ydCBjbGFzcyBQb2ludCB7XG4gICAgICAgIHB1YmxpYyB4Om51bWJlciA9IG51bGw7XG4gICAgICAgIHB1YmxpYyB5Om51bWJlciA9IG51bGw7XG5cbiAgICAgICAgY29uc3RydWN0b3IoeDpudW1iZXIgPSBudWxsLCB5Om51bWJlciA9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHN0YXRpYyBjcmVhdGUoeD86bnVtYmVyLCB5PzpudW1iZXIpIHtcbiAgICAgICAgICAgIHZhciBvYmogPSBuZXcgdGhpcyh4LCB5KTtcblxuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJtb2R1bGUgRW5naW5lM0Qge1xuICAgIGV4cG9ydCBjbGFzcyBQb3NpdGlvbiB7XG4gICAgICAgIHB1YmxpYyB4Om51bWJlciA9IG51bGw7XG4gICAgICAgIHB1YmxpYyB5Om51bWJlciA9IG51bGw7XG4gICAgICAgIHB1YmxpYyB6Om51bWJlciA9IG51bGw7XG5cbiAgICAgICAgY29uc3RydWN0b3IoeDpudW1iZXIsIHk6bnVtYmVyLCB6Om51bWJlcikge1xuICAgICAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgICAgICB0aGlzLnogPSB6O1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHN0YXRpYyBjcmVhdGUoeDpudW1iZXIsIHk6bnVtYmVyLCB6Om51bWJlcikge1xuICAgICAgICAgICAgdmFyIG9iaiA9IG5ldyB0aGlzKHgsIHksIHopO1xuXG4gICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZGVmaW5pdGlvbnMuZC50c1wiLz5cbm1vZHVsZSBFbmdpbmUzRCB7XG4gICAgZXhwb3J0IGludGVyZmFjZSBJVmlldyB7XG4gICAgICAgIG9mZnNldDp7eDpudW1iZXIsIHk6bnVtYmVyfTtcbiAgICAgICAgd2lkdGg6bnVtYmVyO1xuICAgICAgICBoZWlnaHQ6bnVtYmVyO1xuICAgICAgICBkb206YW55O1xuICAgICAgICBnZXRDb250ZXh0KCk6YW55O1xuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBWaWV3V2ViR0wgaW1wbGVtZW50cyBJVmlldyB7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHZpZXc6SVZpZXcpIHtcbiAgICAgICAgICAgIHZhciBvYmogPSBuZXcgdGhpcyh2aWV3KTtcblxuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldCBvZmZzZXQoKSB7XG4gICAgICAgICAgICB2YXIgdmlldyA9IHRoaXMuX2RvbSxcbiAgICAgICAgICAgICAgICBvZmZzZXQgPSB7eDogdmlldy5vZmZzZXRMZWZ0LCB5OiB2aWV3Lm9mZnNldFRvcH07XG5cbiAgICAgICAgICAgIHdoaWxlICh2aWV3ID0gdmlldy5vZmZzZXRQYXJlbnQpIHtcbiAgICAgICAgICAgICAgICBvZmZzZXQueCArPSB2aWV3Lm9mZnNldExlZnQ7XG4gICAgICAgICAgICAgICAgb2Zmc2V0LnkgKz0gdmlldy5vZmZzZXRUb3A7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBvZmZzZXQ7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9kb206YW55ID0gbnVsbDtcbiAgICAgICAgZ2V0IGRvbSgpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RvbTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vcHJpdmF0ZSBfd2lkdGg6bnVtYmVyID0gbnVsbDtcbiAgICAgICAgZ2V0IHdpZHRoKCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZG9tLndpZHRoO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IGhlaWdodCgpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RvbS5oZWlnaHQ7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdHJ1Y3Rvcihkb206YW55KXtcbiAgICAgICAgICAgIHRoaXMuX2RvbSA9IGRvbTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBnZXRDb250ZXh0KCk6YW55e1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RvbS5nZXRDb250ZXh0KFwid2ViZ2xcIikgfHwgdGhpcy5fZG9tLmdldENvbnRleHQoXCJleHBlcmltZW50YWwtd2ViZ2xcIik7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZGVmaW5pdGlvbnMuZC50c1wiLz5cbm1vZHVsZSBFbmdpbmUzRHtcbiAgICBleHBvcnQgY2xhc3MgVmVjdG9yM3tcbiAgICAgICAgcHVibGljIHN0YXRpYyBjcmVhdGUoeCwgeSwgeik6VmVjdG9yMyA7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKCk6VmVjdG9yMyA7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKCk6VmVjdG9yMyB7XG4gICAgICAgICAgICB2YXIgbSA9IG51bGw7XG5cbiAgICAgICAgICAgIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDApe1xuICAgICAgICAgICAgICAgIG0gPSBuZXcgdGhpcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBtID0gbmV3IHRoaXMoYXJndW1lbnRzWzBdLCBhcmd1bWVudHNbMV0sIGFyZ3VtZW50c1syXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBtO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfdmFsdWVzOiBGbG9hdDMyQXJyYXk7XG4gICAgICAgIGdldCB2YWx1ZXMoKTpGbG9hdDMyQXJyYXkgeyByZXR1cm4gdGhpcy5fdmFsdWVzOyB9XG4gICAgICAgIHNldCB2YWx1ZXModmFsdWVzOiBGbG9hdDMyQXJyYXkpIHtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlcyA9IHZhbHVlcztcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0cnVjdG9yKHgsIHksIHopO1xuICAgICAgICBjb25zdHJ1Y3RvcigpO1xuICAgICAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICAgICAgdGhpcy5fdmFsdWVzID0gbmV3IEZsb2F0MzJBcnJheSgzKTtcblxuICAgICAgICAgICAgaWYoYXJndW1lbnRzLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlc1swXSA9IGFyZ3VtZW50c1swXTtcbiAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZXNbMV0gPSBhcmd1bWVudHNbMV07XG4gICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVzWzJdID1hcmd1bWVudHNbMl07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgbm9ybWFsaXplKCk6IFZlY3RvcjN7XG4gICAgICAgICAgICB2YXIgdiA9IHRoaXMuX3ZhbHVlcztcbiAgICAgICAgICAgIHZhciBkID0gTWF0aC5zcXJ0KFxuICAgICAgICAgICAgICAgIHZbMF0gKiB2WzBdICsgdlsxXSAqIHZbMV0gKyB2WzJdICogdlsyXVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgaWYoZCA9PT0gMCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFZlY3RvcjMuY3JlYXRlKDAsIDAsIDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2WzBdID0gdlswXSAvIGQ7XG4gICAgICAgICAgICB2WzFdID0gdlsxXSAvIGQ7XG4gICAgICAgICAgICB2WzJdID0gdlsyXSAvIGQ7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHN1Yih2OlZlY3RvcjMpOlZlY3RvcjMge1xuICAgICAgICAgICAgcmV0dXJuIFZlY3RvcjMuY3JlYXRlKFxuICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlc1swXSAtIHYudmFsdWVzWzBdLFxuICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlc1sxXSAtIHYudmFsdWVzWzFdLFxuICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlc1syXSAtIHYudmFsdWVzWzJdXG4gICAgICAgICAgICApXG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgcmV2ZXJzZSgpOlZlY3RvcjN7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZXNbMF0gPSAtdGhpcy5fdmFsdWVzWzBdO1xuICAgICAgICAgICAgdGhpcy5fdmFsdWVzWzFdID0gLXRoaXMuX3ZhbHVlc1sxXTtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlc1syXSA9IC10aGlzLl92YWx1ZXNbMl07XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGNvcHkoKTogVmVjdG9yM3tcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBWZWN0b3IzLmNyZWF0ZSgpLFxuICAgICAgICAgICAgICAgIGkgPSAwLFxuICAgICAgICAgICAgICAgIGxlbiA9IHRoaXMuX3ZhbHVlcy5sZW5ndGg7XG5cbiAgICAgICAgICAgIGZvcihpID0gMDsgaSA8IGxlbjsgaSsrKXtcbiAgICAgICAgICAgICAgICByZXN1bHQudmFsdWVzW2ldID0gdGhpcy5fdmFsdWVzW2ldO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHRvVmVjNCgpOiBWZWN0b3I0e1xuICAgICAgICAgICAgcmV0dXJuIFZlY3RvcjQuY3JlYXRlKHRoaXMuX3ZhbHVlc1swXSwgdGhpcy5fdmFsdWVzWzFdLCB0aGlzLl92YWx1ZXNbMl0sIDEuMCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZGVmaW5pdGlvbnMuZC50c1wiLz5cbm1vZHVsZSBFbmdpbmUzRHtcbiAgICBleHBvcnQgY2xhc3MgVmVjdG9yNHtcbiAgICAgICAgcHVibGljIHN0YXRpYyBjcmVhdGUoeCwgeSwgeiwgdyk6VmVjdG9yNCA7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKCk6VmVjdG9yNCA7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKCk6VmVjdG9yNCB7XG4gICAgICAgICAgICB2YXIgbSA9IG51bGw7XG5cbiAgICAgICAgICAgIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDApe1xuICAgICAgICAgICAgICAgIG0gPSBuZXcgdGhpcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBtID0gbmV3IHRoaXMoYXJndW1lbnRzWzBdLCBhcmd1bWVudHNbMV0sIGFyZ3VtZW50c1syXSwgYXJndW1lbnRzWzNdKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG07XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF92YWx1ZXM6IEZsb2F0MzJBcnJheTtcbiAgICAgICAgZ2V0IHZhbHVlcygpOkZsb2F0MzJBcnJheSB7IHJldHVybiB0aGlzLl92YWx1ZXM7IH1cbiAgICAgICAgc2V0IHZhbHVlcyh2YWx1ZXM6IEZsb2F0MzJBcnJheSkge1xuICAgICAgICAgICAgdGhpcy5fdmFsdWVzID0gdmFsdWVzO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3RydWN0b3IoeCwgeSwgeiwgdyk7XG4gICAgICAgIGNvbnN0cnVjdG9yKCk7XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZXMgPSBuZXcgRmxvYXQzMkFycmF5KDQpO1xuXG4gICAgICAgICAgICBpZihhcmd1bWVudHMubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVzWzBdID0gYXJndW1lbnRzWzBdO1xuICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlc1sxXSA9IGFyZ3VtZW50c1sxXTtcbiAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZXNbMl0gPWFyZ3VtZW50c1syXTtcbiAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZXNbM10gPWFyZ3VtZW50c1szXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBub3JtYWxpemUoKTogVmVjdG9yNHtcbiAgICAgICAgICAgIHZhciB2ID0gdGhpcy5fdmFsdWVzO1xuICAgICAgICAgICAgdmFyIGQgPSBNYXRoLnNxcnQoXG4gICAgICAgICAgICAgICAgdlswXSAqIHZbMF0gKyB2WzFdICogdlsxXSArIHZbMl0gKiB2WzJdICsgdlszXSAqIHZbM11cbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGlmKGQgPT09IDApe1xuICAgICAgICAgICAgICAgIHJldHVybiBWZWN0b3I0LmNyZWF0ZSgwLCAwLCAwLCAwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdlswXSA9IHZbMF0gLyBkO1xuICAgICAgICAgICAgdlsxXSA9IHZbMV0gLyBkO1xuICAgICAgICAgICAgdlsyXSA9IHZbMl0gLyBkO1xuICAgICAgICAgICAgdlszXSA9IHZbM10gLyBkO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyB0b1ZlYzMoKTogVmVjdG9yM3tcbiAgICAgICAgICAgIHJldHVybiBWZWN0b3IzLmNyZWF0ZSh0aGlzLl92YWx1ZXNbMF0sIHRoaXMuX3ZhbHVlc1sxXSwgdGhpcy5fdmFsdWVzWzJdKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kZWZpbml0aW9ucy5kLnRzXCIvPlxubW9kdWxlIEVuZ2luZTNEe1xuICAgIC8qIVxuICAgICDms6jmhI/vvJrnn6npmLXlhYPntKDmmK/mjInliJfkuLvluo/lrZjlgqjlnKjmlbDnu4TkuK3nmoTjgIJcbiAgICAgKi9cbiAgICBleHBvcnQgY2xhc3MgTWF0cml4e1xuICAgICAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZShtYXQ6RmxvYXQzMkFycmF5KTpNYXRyaXg7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKCk6TWF0cml4O1xuICAgICAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZSgpOk1hdHJpeCB7XG4gICAgICAgICAgICB2YXIgbSA9IG51bGw7XG5cbiAgICAgICAgICAgIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDApe1xuICAgICAgICAgICAgICAgIG0gPSBuZXcgdGhpcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBtID0gbmV3IHRoaXMoYXJndW1lbnRzWzBdKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG07XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF92YWx1ZXM6IEZsb2F0MzJBcnJheSA9IG51bGw7XG4gICAgICAgIGdldCB2YWx1ZXMoKTpGbG9hdDMyQXJyYXkgeyByZXR1cm4gdGhpcy5fdmFsdWVzOyB9XG4gICAgICAgIHNldCB2YWx1ZXModmFsdWVzOiBGbG9hdDMyQXJyYXkpIHtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlcyA9IHZhbHVlcztcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX21hdHJpeEFycjpBcnJheTxGbG9hdDMyQXJyYXk+ID0gbnVsbDtcblxuICAgICAgICBjb25zdHJ1Y3RvcihtYXQ6RmxvYXQzMkFycmF5KTtcbiAgICAgICAgY29uc3RydWN0b3IoKTtcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlcyA9IGFyZ3VtZW50c1swXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlcyA9IG5ldyBGbG9hdDMyQXJyYXkoWzEsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDFdKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fbWF0cml4QXJyID0gW107XG4gICAgICAgIH1cblxuXG5cbiAgICAgICAgcHVibGljIHB1c2goKXtcbiAgICAgICAgICAgIHRoaXMuX21hdHJpeEFyci5wdXNoKHRoaXMuX3ZhbHVlcyk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgcG9wKCl7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZXMgPSB0aGlzLl9tYXRyaXhBcnIucG9wKCk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc2V0SWRlbnRpdHkgKCk6IE1hdHJpeCB7XG4gICAgICAgICAgICB2YXIgZSA9IHRoaXMuX3ZhbHVlcztcbiAgICAgICAgICAgIGVbMF0gPSAxOyAgIGVbNF0gPSAwOyAgIGVbOF0gID0gMDsgICBlWzEyXSA9IDA7XG4gICAgICAgICAgICBlWzFdID0gMDsgICBlWzVdID0gMTsgICBlWzldICA9IDA7ICAgZVsxM10gPSAwO1xuICAgICAgICAgICAgZVsyXSA9IDA7ICAgZVs2XSA9IDA7ICAgZVsxMF0gPSAxOyAgIGVbMTRdID0gMDtcbiAgICAgICAgICAgIGVbM10gPSAwOyAgIGVbN10gPSAwOyAgIGVbMTFdID0gMDsgICBlWzE1XSA9IDE7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDYWxjdWxhdGUgdGhlIGludmVyc2UgbWF0cml4IG9mIHNwZWNpZmllZCBtYXRyaXgsIGFuZCBzZXQgdG8gdGhpcy5cbiAgICAgICAgICogQHBhcmFtIG90aGVyIFRoZSBzb3VyY2UgbWF0cml4XG4gICAgICAgICAqIEByZXR1cm4gdGhpc1xuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIHNldEludmVyc2VPZiAob3RoZXI6TWF0cml4KTpNYXRyaXgge1xuICAgICAgICAgICAgdmFyIGksIHMsIGQsIGludiwgZGV0O1xuXG4gICAgICAgICAgICBzID0gb3RoZXIudmFsdWVzO1xuICAgICAgICAgICAgaW52ID0gbmV3IEZsb2F0MzJBcnJheSgxNik7XG4gICAgICAgICAgICBkID0gdGhpcy5fdmFsdWVzO1xuXG4gICAgICAgICAgICBpbnZbMF0gID0gICBzWzVdKnNbMTBdKnNbMTVdIC0gc1s1XSAqc1sxMV0qc1sxNF0gLSBzWzldICpzWzZdKnNbMTVdXG4gICAgICAgICAgICArIHNbOV0qc1s3XSAqc1sxNF0gKyBzWzEzXSpzWzZdICpzWzExXSAtIHNbMTNdKnNbN10qc1sxMF07XG4gICAgICAgICAgICBpbnZbNF0gID0gLSBzWzRdKnNbMTBdKnNbMTVdICsgc1s0XSAqc1sxMV0qc1sxNF0gKyBzWzhdICpzWzZdKnNbMTVdXG4gICAgICAgICAgICAtIHNbOF0qc1s3XSAqc1sxNF0gLSBzWzEyXSpzWzZdICpzWzExXSArIHNbMTJdKnNbN10qc1sxMF07XG4gICAgICAgICAgICBpbnZbOF0gID0gICBzWzRdKnNbOV0gKnNbMTVdIC0gc1s0XSAqc1sxMV0qc1sxM10gLSBzWzhdICpzWzVdKnNbMTVdXG4gICAgICAgICAgICArIHNbOF0qc1s3XSAqc1sxM10gKyBzWzEyXSpzWzVdICpzWzExXSAtIHNbMTJdKnNbN10qc1s5XTtcbiAgICAgICAgICAgIGludlsxMl0gPSAtIHNbNF0qc1s5XSAqc1sxNF0gKyBzWzRdICpzWzEwXSpzWzEzXSArIHNbOF0gKnNbNV0qc1sxNF1cbiAgICAgICAgICAgIC0gc1s4XSpzWzZdICpzWzEzXSAtIHNbMTJdKnNbNV0gKnNbMTBdICsgc1sxMl0qc1s2XSpzWzldO1xuXG4gICAgICAgICAgICBpbnZbMV0gID0gLSBzWzFdKnNbMTBdKnNbMTVdICsgc1sxXSAqc1sxMV0qc1sxNF0gKyBzWzldICpzWzJdKnNbMTVdXG4gICAgICAgICAgICAtIHNbOV0qc1szXSAqc1sxNF0gLSBzWzEzXSpzWzJdICpzWzExXSArIHNbMTNdKnNbM10qc1sxMF07XG4gICAgICAgICAgICBpbnZbNV0gID0gICBzWzBdKnNbMTBdKnNbMTVdIC0gc1swXSAqc1sxMV0qc1sxNF0gLSBzWzhdICpzWzJdKnNbMTVdXG4gICAgICAgICAgICArIHNbOF0qc1szXSAqc1sxNF0gKyBzWzEyXSpzWzJdICpzWzExXSAtIHNbMTJdKnNbM10qc1sxMF07XG4gICAgICAgICAgICBpbnZbOV0gID0gLSBzWzBdKnNbOV0gKnNbMTVdICsgc1swXSAqc1sxMV0qc1sxM10gKyBzWzhdICpzWzFdKnNbMTVdXG4gICAgICAgICAgICAtIHNbOF0qc1szXSAqc1sxM10gLSBzWzEyXSpzWzFdICpzWzExXSArIHNbMTJdKnNbM10qc1s5XTtcbiAgICAgICAgICAgIGludlsxM10gPSAgIHNbMF0qc1s5XSAqc1sxNF0gLSBzWzBdICpzWzEwXSpzWzEzXSAtIHNbOF0gKnNbMV0qc1sxNF1cbiAgICAgICAgICAgICsgc1s4XSpzWzJdICpzWzEzXSArIHNbMTJdKnNbMV0gKnNbMTBdIC0gc1sxMl0qc1syXSpzWzldO1xuXG4gICAgICAgICAgICBpbnZbMl0gID0gICBzWzFdKnNbNl0qc1sxNV0gLSBzWzFdICpzWzddKnNbMTRdIC0gc1s1XSAqc1syXSpzWzE1XVxuICAgICAgICAgICAgKyBzWzVdKnNbM10qc1sxNF0gKyBzWzEzXSpzWzJdKnNbN10gIC0gc1sxM10qc1szXSpzWzZdO1xuICAgICAgICAgICAgaW52WzZdICA9IC0gc1swXSpzWzZdKnNbMTVdICsgc1swXSAqc1s3XSpzWzE0XSArIHNbNF0gKnNbMl0qc1sxNV1cbiAgICAgICAgICAgIC0gc1s0XSpzWzNdKnNbMTRdIC0gc1sxMl0qc1syXSpzWzddICArIHNbMTJdKnNbM10qc1s2XTtcbiAgICAgICAgICAgIGludlsxMF0gPSAgIHNbMF0qc1s1XSpzWzE1XSAtIHNbMF0gKnNbN10qc1sxM10gLSBzWzRdICpzWzFdKnNbMTVdXG4gICAgICAgICAgICArIHNbNF0qc1szXSpzWzEzXSArIHNbMTJdKnNbMV0qc1s3XSAgLSBzWzEyXSpzWzNdKnNbNV07XG4gICAgICAgICAgICBpbnZbMTRdID0gLSBzWzBdKnNbNV0qc1sxNF0gKyBzWzBdICpzWzZdKnNbMTNdICsgc1s0XSAqc1sxXSpzWzE0XVxuICAgICAgICAgICAgLSBzWzRdKnNbMl0qc1sxM10gLSBzWzEyXSpzWzFdKnNbNl0gICsgc1sxMl0qc1syXSpzWzVdO1xuXG4gICAgICAgICAgICBpbnZbM10gID0gLSBzWzFdKnNbNl0qc1sxMV0gKyBzWzFdKnNbN10qc1sxMF0gKyBzWzVdKnNbMl0qc1sxMV1cbiAgICAgICAgICAgIC0gc1s1XSpzWzNdKnNbMTBdIC0gc1s5XSpzWzJdKnNbN10gICsgc1s5XSpzWzNdKnNbNl07XG4gICAgICAgICAgICBpbnZbN10gID0gICBzWzBdKnNbNl0qc1sxMV0gLSBzWzBdKnNbN10qc1sxMF0gLSBzWzRdKnNbMl0qc1sxMV1cbiAgICAgICAgICAgICsgc1s0XSpzWzNdKnNbMTBdICsgc1s4XSpzWzJdKnNbN10gIC0gc1s4XSpzWzNdKnNbNl07XG4gICAgICAgICAgICBpbnZbMTFdID0gLSBzWzBdKnNbNV0qc1sxMV0gKyBzWzBdKnNbN10qc1s5XSAgKyBzWzRdKnNbMV0qc1sxMV1cbiAgICAgICAgICAgIC0gc1s0XSpzWzNdKnNbOV0gIC0gc1s4XSpzWzFdKnNbN10gICsgc1s4XSpzWzNdKnNbNV07XG4gICAgICAgICAgICBpbnZbMTVdID0gICBzWzBdKnNbNV0qc1sxMF0gLSBzWzBdKnNbNl0qc1s5XSAgLSBzWzRdKnNbMV0qc1sxMF1cbiAgICAgICAgICAgICsgc1s0XSpzWzJdKnNbOV0gICsgc1s4XSpzWzFdKnNbNl0gIC0gc1s4XSpzWzJdKnNbNV07XG5cbiAgICAgICAgICAgIGRldCA9IHNbMF0qaW52WzBdICsgc1sxXSppbnZbNF0gKyBzWzJdKmludls4XSArIHNbM10qaW52WzEyXTtcbiAgICAgICAgICAgIGlmIChkZXQgPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGV0ID0gMSAvIGRldDtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCAxNjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZFtpXSA9IGludltpXSAqIGRldDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ2FsY3VsYXRlIHRoZSBpbnZlcnNlIG1hdHJpeCBvZiBzcGVjaWZpZWQgbWF0cml4LCBhbmQgc2V0IHRvIHRoaXMuXG4gICAgICAgICAqIEBwYXJhbSBvdGhlciBUaGUgc291cmNlIG1hdHJpeFxuICAgICAgICAgKiBAcmV0dXJuIHRoaXNcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBpbnZlcnNlT2YgKCk6TWF0cml4IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNldEludmVyc2VPZih0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUcmFuc3Bvc2UgdGhlIG1hdHJpeC5cbiAgICAgICAgICogQHJldHVybiB0aGlzXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgdHJhbnNwb3NlICgpOk1hdHJpeCB7XG4gICAgICAgICAgICB2YXIgZSwgdDtcblxuICAgICAgICAgICAgZSA9IHRoaXMuX3ZhbHVlcztcblxuICAgICAgICAgICAgdCA9IGVbIDFdOyAgZVsgMV0gPSBlWyA0XTsgIGVbIDRdID0gdDtcbiAgICAgICAgICAgIHQgPSBlWyAyXTsgIGVbIDJdID0gZVsgOF07ICBlWyA4XSA9IHQ7XG4gICAgICAgICAgICB0ID0gZVsgM107ICBlWyAzXSA9IGVbMTJdOyAgZVsxMl0gPSB0O1xuICAgICAgICAgICAgdCA9IGVbIDZdOyAgZVsgNl0gPSBlWyA5XTsgIGVbIDldID0gdDtcbiAgICAgICAgICAgIHQgPSBlWyA3XTsgIGVbIDddID0gZVsxM107ICBlWzEzXSA9IHQ7XG4gICAgICAgICAgICB0ID0gZVsxMV07ICBlWzExXSA9IGVbMTRdOyAgZVsxNF0gPSB0O1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXQgdGhlIG1hdHJpeCBmb3IgdHJhbnNsYXRpb24uXG4gICAgICAgICAqIEBwYXJhbSB4IFRoZSBYIHZhbHVlIG9mIGEgdHJhbnNsYXRpb24uXG4gICAgICAgICAqIEBwYXJhbSB5IFRoZSBZIHZhbHVlIG9mIGEgdHJhbnNsYXRpb24uXG4gICAgICAgICAqIEBwYXJhbSB6IFRoZSBaIHZhbHVlIG9mIGEgdHJhbnNsYXRpb24uXG4gICAgICAgICAqIEByZXR1cm4gdGhpc1xuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIHNldFRyYW5zbGF0ZSAoeCwgeSwgeik6IE1hdHJpeCB7XG4gICAgICAgICAgICB2YXIgZSA9IHRoaXMuX3ZhbHVlcztcbiAgICAgICAgICAgIGVbMF0gPSAxOyAgZVs0XSA9IDA7ICBlWzhdICA9IDA7ICBlWzEyXSA9IHg7XG4gICAgICAgICAgICBlWzFdID0gMDsgIGVbNV0gPSAxOyAgZVs5XSAgPSAwOyAgZVsxM10gPSB5O1xuICAgICAgICAgICAgZVsyXSA9IDA7ICBlWzZdID0gMDsgIGVbMTBdID0gMTsgIGVbMTRdID0gejtcbiAgICAgICAgICAgIGVbM10gPSAwOyAgZVs3XSA9IDA7ICBlWzExXSA9IDA7ICBlWzE1XSA9IDE7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBNdWx0aXBseSB0aGUgbWF0cml4IGZvciB0cmFuc2xhdGlvbiBmcm9tIHRoZSByaWdodC5cbiAgICAgICAgICogQHBhcmFtIHggVGhlIFggdmFsdWUgb2YgYSB0cmFuc2xhdGlvbi5cbiAgICAgICAgICogQHBhcmFtIHkgVGhlIFkgdmFsdWUgb2YgYSB0cmFuc2xhdGlvbi5cbiAgICAgICAgICogQHBhcmFtIHogVGhlIFogdmFsdWUgb2YgYSB0cmFuc2xhdGlvbi5cbiAgICAgICAgICogQHJldHVybiB0aGlzXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgdHJhbnNsYXRlICh4LCB5LCB6KTogTWF0cml4IHtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlNYXRyaXgoTWF0cml4LmNyZWF0ZSgpLnNldFRyYW5zbGF0ZSh4LCB5LCB6KSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldCB0aGUgbWF0cml4IGZvciByb3RhdGlvbi5cbiAgICAgICAgICogVGhlIHZlY3RvciBvZiByb3RhdGlvbiBheGlzIG1heSBub3QgYmUgbm9ybWFsaXplZC5cbiAgICAgICAgICogQHBhcmFtIGFuZ2xlIFRoZSBhbmdsZSBvZiByb3RhdGlvbiAoZGVncmVlcylcbiAgICAgICAgICogQHBhcmFtIHggVGhlIFggY29vcmRpbmF0ZSBvZiB2ZWN0b3Igb2Ygcm90YXRpb24gYXhpcy5cbiAgICAgICAgICogQHBhcmFtIHkgVGhlIFkgY29vcmRpbmF0ZSBvZiB2ZWN0b3Igb2Ygcm90YXRpb24gYXhpcy5cbiAgICAgICAgICogQHBhcmFtIHogVGhlIFogY29vcmRpbmF0ZSBvZiB2ZWN0b3Igb2Ygcm90YXRpb24gYXhpcy5cbiAgICAgICAgICogQHJldHVybiB0aGlzXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgc2V0Um90YXRlIChhbmdsZTogbnVtYmVyLCB4OiBudW1iZXIsIHk6IG51bWJlciwgejpudW1iZXIpOiBNYXRyaXgge1xuICAgICAgICAgICAgdmFyIGUsIHMsIGMsIGxlbiwgcmxlbiwgbmMsIHh5LCB5eiwgengsIHhzLCB5cywgenM7XG5cbiAgICAgICAgICAgIHZhciBhbmdsZSA9IE1hdGguUEkgKiBhbmdsZSAvIDE4MDtcbiAgICAgICAgICAgIGUgPSB0aGlzLl92YWx1ZXM7XG5cbiAgICAgICAgICAgIHMgPSBNYXRoLnNpbihhbmdsZSk7XG4gICAgICAgICAgICBjID0gTWF0aC5jb3MoYW5nbGUpO1xuXG4gICAgICAgICAgICBpZiAoMCAhPT0geCAmJiAwID09PSB5ICYmIDAgPT09IHopIHtcbiAgICAgICAgICAgICAgICAvLyBSb3RhdGlvbiBhcm91bmQgWCBheGlzXG4gICAgICAgICAgICAgICAgaWYgKHggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHMgPSAtcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZVswXSA9IDE7ICBlWzRdID0gMDsgIGVbIDhdID0gMDsgIGVbMTJdID0gMDtcbiAgICAgICAgICAgICAgICBlWzFdID0gMDsgIGVbNV0gPSBjOyAgZVsgOV0gPS1zOyAgZVsxM10gPSAwO1xuICAgICAgICAgICAgICAgIGVbMl0gPSAwOyAgZVs2XSA9IHM7ICBlWzEwXSA9IGM7ICBlWzE0XSA9IDA7XG4gICAgICAgICAgICAgICAgZVszXSA9IDA7ICBlWzddID0gMDsgIGVbMTFdID0gMDsgIGVbMTVdID0gMTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoMCA9PT0geCAmJiAwICE9PSB5ICYmIDAgPT09IHopIHtcbiAgICAgICAgICAgICAgICAvLyBSb3RhdGlvbiBhcm91bmQgWSBheGlzXG4gICAgICAgICAgICAgICAgaWYgKHkgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHMgPSAtcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZVswXSA9IGM7ICBlWzRdID0gMDsgIGVbIDhdID0gczsgIGVbMTJdID0gMDtcbiAgICAgICAgICAgICAgICBlWzFdID0gMDsgIGVbNV0gPSAxOyAgZVsgOV0gPSAwOyAgZVsxM10gPSAwO1xuICAgICAgICAgICAgICAgIGVbMl0gPS1zOyAgZVs2XSA9IDA7ICBlWzEwXSA9IGM7ICBlWzE0XSA9IDA7XG4gICAgICAgICAgICAgICAgZVszXSA9IDA7ICBlWzddID0gMDsgIGVbMTFdID0gMDsgIGVbMTVdID0gMTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoMCA9PT0geCAmJiAwID09PSB5ICYmIDAgIT09IHopIHtcbiAgICAgICAgICAgICAgICAvLyBSb3RhdGlvbiBhcm91bmQgWiBheGlzXG4gICAgICAgICAgICAgICAgaWYgKHogPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHMgPSAtcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZVswXSA9IGM7ICBlWzRdID0tczsgIGVbIDhdID0gMDsgIGVbMTJdID0gMDtcbiAgICAgICAgICAgICAgICBlWzFdID0gczsgIGVbNV0gPSBjOyAgZVsgOV0gPSAwOyAgZVsxM10gPSAwO1xuICAgICAgICAgICAgICAgIGVbMl0gPSAwOyAgZVs2XSA9IDA7ICBlWzEwXSA9IDE7ICBlWzE0XSA9IDA7XG4gICAgICAgICAgICAgICAgZVszXSA9IDA7ICBlWzddID0gMDsgIGVbMTFdID0gMDsgIGVbMTVdID0gMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gUm90YXRpb24gYXJvdW5kIGFub3RoZXIgYXhpc1xuICAgICAgICAgICAgICAgIGxlbiA9IE1hdGguc3FydCh4KnggKyB5KnkgKyB6KnopO1xuICAgICAgICAgICAgICAgIGlmIChsZW4gIT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgLy/ovazmjaLkuLrljZXkvY3lkJHph49cbiAgICAgICAgICAgICAgICAgICAgcmxlbiA9IDEgLyBsZW47XG4gICAgICAgICAgICAgICAgICAgIHggKj0gcmxlbjtcbiAgICAgICAgICAgICAgICAgICAgeSAqPSBybGVuO1xuICAgICAgICAgICAgICAgICAgICB6ICo9IHJsZW47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbmMgPSAxIC0gYztcbiAgICAgICAgICAgICAgICB4eSA9IHggKiB5O1xuICAgICAgICAgICAgICAgIHl6ID0geSAqIHo7XG4gICAgICAgICAgICAgICAgenggPSB6ICogeDtcbiAgICAgICAgICAgICAgICB4cyA9IHggKiBzO1xuICAgICAgICAgICAgICAgIHlzID0geSAqIHM7XG4gICAgICAgICAgICAgICAgenMgPSB6ICogcztcblxuICAgICAgICAgICAgICAgIGVbIDBdID0geCp4Km5jICsgIGM7XG4gICAgICAgICAgICAgICAgZVsgMV0gPSB4eSAqbmMgKyB6cztcbiAgICAgICAgICAgICAgICBlWyAyXSA9IHp4ICpuYyAtIHlzO1xuICAgICAgICAgICAgICAgIGVbIDNdID0gMDtcblxuICAgICAgICAgICAgICAgIGVbIDRdID0geHkgKm5jIC0genM7XG4gICAgICAgICAgICAgICAgZVsgNV0gPSB5KnkqbmMgKyAgYztcbiAgICAgICAgICAgICAgICBlWyA2XSA9IHl6ICpuYyArIHhzO1xuICAgICAgICAgICAgICAgIGVbIDddID0gMDtcblxuICAgICAgICAgICAgICAgIGVbIDhdID0genggKm5jICsgeXM7XG4gICAgICAgICAgICAgICAgZVsgOV0gPSB5eiAqbmMgLSB4cztcbiAgICAgICAgICAgICAgICBlWzEwXSA9IHoqeipuYyArICBjO1xuICAgICAgICAgICAgICAgIGVbMTFdID0gMDtcblxuICAgICAgICAgICAgICAgIGVbMTJdID0gMDtcbiAgICAgICAgICAgICAgICBlWzEzXSA9IDA7XG4gICAgICAgICAgICAgICAgZVsxNF0gPSAwO1xuICAgICAgICAgICAgICAgIGVbMTVdID0gMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogTXVsdGlwbHkgdGhlIG1hdHJpeCBmb3Igcm90YXRpb24gZnJvbSB0aGUgcmlnaHQuXG4gICAgICAgICAqIFRoZSB2ZWN0b3Igb2Ygcm90YXRpb24gYXhpcyBtYXkgbm90IGJlIG5vcm1hbGl6ZWQuXG4gICAgICAgICAqIEBwYXJhbSBhbmdsZSBUaGUgYW5nbGUgb2Ygcm90YXRpb24gKGRlZ3JlZXMpXG4gICAgICAgICAqIEBwYXJhbSB4IFRoZSBYIGNvb3JkaW5hdGUgb2YgdmVjdG9yIG9mIHJvdGF0aW9uIGF4aXMuXG4gICAgICAgICAqIEBwYXJhbSB5IFRoZSBZIGNvb3JkaW5hdGUgb2YgdmVjdG9yIG9mIHJvdGF0aW9uIGF4aXMuXG4gICAgICAgICAqIEBwYXJhbSB6IFRoZSBaIGNvb3JkaW5hdGUgb2YgdmVjdG9yIG9mIHJvdGF0aW9uIGF4aXMuXG4gICAgICAgICAqIEByZXR1cm4gdGhpc1xuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIHJvdGF0ZSAoYW5nbGUsIHgsIHksIHopOiBNYXRyaXgge1xuICAgICAgICAgICAgdGhpcy5hcHBseU1hdHJpeChNYXRyaXguY3JlYXRlKCkuc2V0Um90YXRlKGFuZ2xlLCB4LCB5LCB6KSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldCB0aGUgbWF0cml4IGZvciBzY2FsaW5nLlxuICAgICAgICAgKiBAcGFyYW0geCBUaGUgc2NhbGUgZmFjdG9yIGFsb25nIHRoZSBYIGF4aXNcbiAgICAgICAgICogQHBhcmFtIHkgVGhlIHNjYWxlIGZhY3RvciBhbG9uZyB0aGUgWSBheGlzXG4gICAgICAgICAqIEBwYXJhbSB6IFRoZSBzY2FsZSBmYWN0b3IgYWxvbmcgdGhlIFogYXhpc1xuICAgICAgICAgKiBAcmV0dXJuIHRoaXNcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBzZXRTY2FsZSAoeCwgeSwgeik6TWF0cml4IHtcbiAgICAgICAgICAgIHZhciBlID0gdGhpcy5fdmFsdWVzO1xuICAgICAgICAgICAgZVswXSA9IHg7ICBlWzRdID0gMDsgIGVbOF0gID0gMDsgIGVbMTJdID0gMDtcbiAgICAgICAgICAgIGVbMV0gPSAwOyAgZVs1XSA9IHk7ICBlWzldICA9IDA7ICBlWzEzXSA9IDA7XG4gICAgICAgICAgICBlWzJdID0gMDsgIGVbNl0gPSAwOyAgZVsxMF0gPSB6OyAgZVsxNF0gPSAwO1xuICAgICAgICAgICAgZVszXSA9IDA7ICBlWzddID0gMDsgIGVbMTFdID0gMDsgIGVbMTVdID0gMTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIE11bHRpcGx5IHRoZSBtYXRyaXggZm9yIHNjYWxpbmcgZnJvbSB0aGUgcmlnaHQuXG4gICAgICAgICAqIEBwYXJhbSB4IFRoZSBzY2FsZSBmYWN0b3IgYWxvbmcgdGhlIFggYXhpc1xuICAgICAgICAgKiBAcGFyYW0geSBUaGUgc2NhbGUgZmFjdG9yIGFsb25nIHRoZSBZIGF4aXNcbiAgICAgICAgICogQHBhcmFtIHogVGhlIHNjYWxlIGZhY3RvciBhbG9uZyB0aGUgWiBheGlzXG4gICAgICAgICAqIEByZXR1cm4gdGhpc1xuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIHNjYWxlICh4LCB5LCB6KTpNYXRyaXgge1xuICAgICAgICAgICAgdGhpcy5hcHBseU1hdHJpeChNYXRyaXguY3JlYXRlKCkuc2V0U2NhbGUoeCwgeSwgeikpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzZXRMb29rQXQgKGV5ZVgsIGV5ZVksIGV5ZVosIGNlbnRlclgsIGNlbnRlclksIGNlbnRlclosIHVwWCwgdXBZLCB1cFopOk1hdHJpeCB7XG4gICAgICAgICAgICB2YXIgZSwgZngsIGZ5LCBmeiwgcmxmLCBzeCwgc3ksIHN6LCBybHMsIHV4LCB1eSwgdXo7XG5cbiAgICAgICAgICAgIGZ4ID0gY2VudGVyWCAtIGV5ZVg7XG4gICAgICAgICAgICBmeSA9IGNlbnRlclkgLSBleWVZO1xuICAgICAgICAgICAgZnogPSBjZW50ZXJaIC0gZXllWjtcblxuICAgICAgICAgICAgLy8gTm9ybWFsaXplIGYuXG4gICAgICAgICAgICBybGYgPSAxIC8gTWF0aC5zcXJ0KGZ4KmZ4ICsgZnkqZnkgKyBmeipmeik7XG4gICAgICAgICAgICBmeCAqPSBybGY7XG4gICAgICAgICAgICBmeSAqPSBybGY7XG4gICAgICAgICAgICBmeiAqPSBybGY7XG5cbiAgICAgICAgICAgIC8vIENhbGN1bGF0ZSBjcm9zcyBwcm9kdWN0IG9mIGYgYW5kIHVwLlxuICAgICAgICAgICAgc3ggPSBmeSAqIHVwWiAtIGZ6ICogdXBZO1xuICAgICAgICAgICAgc3kgPSBmeiAqIHVwWCAtIGZ4ICogdXBaO1xuICAgICAgICAgICAgc3ogPSBmeCAqIHVwWSAtIGZ5ICogdXBYO1xuXG4gICAgICAgICAgICAvLyBOb3JtYWxpemUgcy5cbiAgICAgICAgICAgIHJscyA9IDEgLyBNYXRoLnNxcnQoc3gqc3ggKyBzeSpzeSArIHN6KnN6KTtcbiAgICAgICAgICAgIHN4ICo9IHJscztcbiAgICAgICAgICAgIHN5ICo9IHJscztcbiAgICAgICAgICAgIHN6ICo9IHJscztcblxuICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIGNyb3NzIHByb2R1Y3Qgb2YgcyBhbmQgZi5cbiAgICAgICAgICAgIHV4ID0gc3kgKiBmeiAtIHN6ICogZnk7XG4gICAgICAgICAgICB1eSA9IHN6ICogZnggLSBzeCAqIGZ6O1xuICAgICAgICAgICAgdXogPSBzeCAqIGZ5IC0gc3kgKiBmeDtcblxuICAgICAgICAgICAgLy8gU2V0IHRvIHRoaXMuXG4gICAgICAgICAgICBlID0gdGhpcy5fdmFsdWVzO1xuICAgICAgICAgICAgZVswXSA9IHN4O1xuICAgICAgICAgICAgZVsxXSA9IHV4O1xuICAgICAgICAgICAgZVsyXSA9IC1meDtcbiAgICAgICAgICAgIGVbM10gPSAwO1xuXG4gICAgICAgICAgICBlWzRdID0gc3k7XG4gICAgICAgICAgICBlWzVdID0gdXk7XG4gICAgICAgICAgICBlWzZdID0gLWZ5O1xuICAgICAgICAgICAgZVs3XSA9IDA7XG5cbiAgICAgICAgICAgIGVbOF0gPSBzejtcbiAgICAgICAgICAgIGVbOV0gPSB1ejtcbiAgICAgICAgICAgIGVbMTBdID0gLWZ6O1xuICAgICAgICAgICAgZVsxMV0gPSAwO1xuXG4gICAgICAgICAgICBlWzEyXSA9IDA7XG4gICAgICAgICAgICBlWzEzXSA9IDA7XG4gICAgICAgICAgICBlWzE0XSA9IDA7XG4gICAgICAgICAgICBlWzE1XSA9IDE7XG5cbiAgICAgICAgICAgIC8vVHJhbnNsYXRlLlxuICAgICAgICAgICAgLy90aGlzLnRyYW5zbGF0ZSgtZXllWCwgLWV5ZVksIC1leWVaKTtcbiAgICAgICAgICAgIHRoaXMudmFsdWVzID0gdGhpcy5tdWx0aXBseShNYXRyaXguY3JlYXRlKCkuc2V0VHJhbnNsYXRlKC1leWVYLCAtZXllWSwgLWV5ZVopKS52YWx1ZXM7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIE11bHRpcGx5IHRoZSB2aWV3aW5nIG1hdHJpeCBmcm9tIHRoZSByaWdodC5cbiAgICAgICAgICogQHBhcmFtIGV5ZVgsIGV5ZVksIGV5ZVogVGhlIHBvc2l0aW9uIG9mIHRoZSBleWUgcG9pbnQuXG4gICAgICAgICAqIEBwYXJhbSBjZW50ZXJYLCBjZW50ZXJZLCBjZW50ZXJaIFRoZSBwb3NpdGlvbiBvZiB0aGUgcmVmZXJlbmNlIHBvaW50LlxuICAgICAgICAgKiBAcGFyYW0gdXBYLCB1cFksIHVwWiBUaGUgZGlyZWN0aW9uIG9mIHRoZSB1cCB2ZWN0b3IuXG4gICAgICAgICAqIEByZXR1cm4gdGhpc1xuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGxvb2tBdCAoZXllWCwgZXllWSwgZXllWiwgY2VudGVyWCwgY2VudGVyWSwgY2VudGVyWiwgdXBYLCB1cFksIHVwWik6TWF0cml4IHtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlNYXRyaXgoTWF0cml4LmNyZWF0ZSgpLnNldExvb2tBdChleWVYLCBleWVZLCBleWVaLCBjZW50ZXJYLCBjZW50ZXJZLCBjZW50ZXJaLCB1cFgsIHVwWSwgdXBaKSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cblxuICAgICAgICBwdWJsaWMgc2V0T3J0aG8gKG5lYXIsIGZhcik6TWF0cml4IHtcbiAgICAgICAgICAgIHZhciBlID0gdGhpcy5fdmFsdWVzO1xuXG4gICAgICAgICAgICBlWzBdID0gMTtcbiAgICAgICAgICAgIGVbMV0gPSAwO1xuICAgICAgICAgICAgZVsyXSA9IDA7XG4gICAgICAgICAgICBlWzNdID0gMDtcbiAgICAgICAgICAgIGVbNF0gPSAwO1xuICAgICAgICAgICAgZVs1XSA9IDE7XG4gICAgICAgICAgICBlWzZdID0gMDtcbiAgICAgICAgICAgIGVbN10gPSAwO1xuICAgICAgICAgICAgZVs4XSA9IDA7XG4gICAgICAgICAgICBlWzldID0gMDtcbiAgICAgICAgICAgIGVbMTBdID0gMiAvIChuZWFyIC0gZmFyKTtcbiAgICAgICAgICAgIGVbMTFdID0gMDtcbiAgICAgICAgICAgIGVbMTJdID0gMDtcbiAgICAgICAgICAgIGVbMTNdID0gMDtcbiAgICAgICAgICAgIGVbMTRdID0gKG5lYXIgKyBmYXIpIC8gKG5lYXIgLSBmYXIpO1xuICAgICAgICAgICAgZVsxNV0gPSAxO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBvcnRobyAobiwgZik6TWF0cml4e1xuICAgICAgICAgICAgdGhpcy5hcHBseU1hdHJpeChNYXRyaXguY3JlYXRlKCkuc2V0T3J0aG8obiwgZikpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXQgdGhlIHBlcnNwZWN0aXZlIHByb2plY3Rpb24gbWF0cml4IGJ5IGZvdnkgYW5kIGFzcGVjdC5cbiAgICAgICAgICogQHBhcmFtIGZvdnkgVGhlIGFuZ2xlIGJldHdlZW4gdGhlIHVwcGVyIGFuZCBsb3dlciBzaWRlcyBvZiB0aGUgZnJ1c3R1bS5cbiAgICAgICAgICogQHBhcmFtIGFzcGVjdCBUaGUgYXNwZWN0IHJhdGlvIG9mIHRoZSBmcnVzdHVtLiAod2lkdGgvaGVpZ2h0KVxuICAgICAgICAgKiBAcGFyYW0gbmVhciBUaGUgZGlzdGFuY2VzIHRvIHRoZSBuZWFyZXIgZGVwdGggY2xpcHBpbmcgcGxhbmUuIFRoaXMgdmFsdWUgbXVzdCBiZSBwbHVzIHZhbHVlLlxuICAgICAgICAgKiBAcGFyYW0gZmFyIFRoZSBkaXN0YW5jZXMgdG8gdGhlIGZhcnRoZXIgZGVwdGggY2xpcHBpbmcgcGxhbmUuIFRoaXMgdmFsdWUgbXVzdCBiZSBwbHVzIHZhbHVlLlxuICAgICAgICAgKiBAcmV0dXJuIHRoaXNcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBzZXRQZXJzcGVjdGl2ZSAoZm92eTogbnVtYmVyLCBhc3BlY3QsIG5lYXIsIGZhcik6TWF0cml4IHtcbiAgICAgICAgICAgIHZhciBlLCByZCwgcywgY3QsXG4gICAgICAgICAgICAgICAgbG9nID0gZHlDYi5Mb2csXG4gICAgICAgICAgICAgICAgaW5mbyA9IGxvZy5pbmZvO1xuXG4gICAgICAgICAgICBsb2cuZXJyb3IobmVhciA9PT0gZmFyIHx8IGFzcGVjdCA9PT0gMCwgaW5mby5GVU5DX01VU1RfTk9UX0JFKFwiZnJ1c3R1bVwiLCBcIm51bGxcIikpO1xuICAgICAgICAgICAgbG9nLmVycm9yKG5lYXIgPD0gMCwgaW5mby5GVU5DX01VU1QoXCJuZWFyXCIsIFwiPiAwXCIpKTtcbiAgICAgICAgICAgIGxvZy5lcnJvcihmYXIgPD0gMCwgaW5mby5GVU5DX01VU1QoXCJmYXJcIiwgXCI+IDBcIikpO1xuXG4gICAgICAgICAgICB2YXIgZm92eSA9IE1hdGguUEkgKiBmb3Z5IC8gMTgwIC8gMjtcbiAgICAgICAgICAgIHMgPSBNYXRoLnNpbihmb3Z5KTtcbiAgICAgICAgICAgIGlmIChzID09PSAwKSB7XG4gICAgICAgICAgICAgICAgbG9nLmVycm9yKHMgPT09IDAsIGluZm8uRlVOQ19NVVNUX05PVF9CRShcImZydXN0dW1cIiwgXCJudWxsXCIpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmQgPSAxIC8gKGZhciAtIG5lYXIpO1xuICAgICAgICAgICAgY3QgPSBNYXRoLmNvcyhmb3Z5KSAvIHM7XG5cbiAgICAgICAgICAgIGUgPSB0aGlzLl92YWx1ZXM7XG5cbiAgICAgICAgICAgIGVbMF0gID0gY3QgLyBhc3BlY3Q7XG4gICAgICAgICAgICBlWzFdICA9IDA7XG4gICAgICAgICAgICBlWzJdICA9IDA7XG4gICAgICAgICAgICBlWzNdICA9IDA7XG5cbiAgICAgICAgICAgIGVbNF0gID0gMDtcbiAgICAgICAgICAgIGVbNV0gID0gY3Q7XG4gICAgICAgICAgICBlWzZdICA9IDA7XG4gICAgICAgICAgICBlWzddICA9IDA7XG5cbiAgICAgICAgICAgIGVbOF0gID0gMDtcbiAgICAgICAgICAgIGVbOV0gID0gMDtcbiAgICAgICAgICAgIGVbMTBdID0gLShmYXIgKyBuZWFyKSAqIHJkO1xuICAgICAgICAgICAgZVsxMV0gPSAtMTtcblxuICAgICAgICAgICAgZVsxMl0gPSAwO1xuICAgICAgICAgICAgZVsxM10gPSAwO1xuICAgICAgICAgICAgZVsxNF0gPSAtMiAqIG5lYXIgKiBmYXIgKiByZDtcbiAgICAgICAgICAgIGVbMTVdID0gMDtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgcGVyc3BlY3RpdmUgKGZvdnksIGFzcGVjdCwgbmVhciwgZmFyKTpNYXRyaXh7XG4gICAgICAgICAgICB0aGlzLmFwcGx5TWF0cml4KE1hdHJpeC5jcmVhdGUoKS5zZXRQZXJzcGVjdGl2ZShmb3Z5LCBhc3BlY3QsIG5lYXIsIGZhcikpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBhcHBseU1hdHJpeCAob3RoZXI6TWF0cml4KTpNYXRyaXh7XG4gICAgICAgICAgICB2YXIgYSA9IHRoaXMsXG4gICAgICAgICAgICAgICAgYiA9IG90aGVyO1xuXG4gICAgICAgICAgICAvL3RoaXMuX3ZhbHVlcyA9IE1hdGhVdGlscy5tdWx0aXBseShhLCBiKTtcbiAgICAgICAgICAgICAgICAvL2IqYe+8jOiAjOS4jeaYr2EqYlxuICAgICAgICAgICAgICAgIC8v6L+Z5piv5Zug5Li65Zyod2ViZ2zkuK3vvIzlkJHph4/mmK/lj7PkuZjnmoTvvIxcbiAgICAgICAgICAgICAgICAvL+atpOWkhOW4jOacm+WdkOagh+WQkemHj+WFiOi/m+ihjHRoaXMuX3ZhbHVlc+eahOWPmOaNou+8jOeEtuWQjui/m+ihjG90aGVyLnZhbHVlc+eahOWPmOaNou+8jOWboOatpOimgWIqYe+8jOS7juiAjOWcqOWPs+S5mOWQkemHj+aXtuS4umIqYSp2ZWNcbiAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZXMgPSBiLm11bHRpcGx5KGEpLnZhbHVlcztcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgbXVsdGlwbHkobWF0cml4MjpNYXRyaXgpOk1hdHJpeCB7XG4gICAgICAgICAgICB2YXIgbWF0MSA9IHRoaXMuX3ZhbHVlcyxcbiAgICAgICAgICAgICAgICBtYXQyID0gbWF0cml4Mi52YWx1ZXM7XG4gICAgICAgICAgICB2YXIgYSA9IG1hdDFbMF0sIGIgPSBtYXQxWzFdLCBjID0gbWF0MVsyXSwgZCA9IG1hdDFbM10sXG4gICAgICAgICAgICAgICAgZSA9IG1hdDFbNF0sIGYgPSBtYXQxWzVdLCBnID0gbWF0MVs2XSwgaCA9IG1hdDFbN10sXG4gICAgICAgICAgICAgICAgaSA9IG1hdDFbOF0sIGogPSBtYXQxWzldLCBrID0gbWF0MVsxMF0sIGwgPSBtYXQxWzExXSxcbiAgICAgICAgICAgICAgICBtID0gbWF0MVsxMl0sIG4gPSBtYXQxWzEzXSwgbyA9IG1hdDFbMTRdLCBwID0gbWF0MVsxNV0sXG4gICAgICAgICAgICAgICAgQSA9IG1hdDJbMF0sIEIgPSBtYXQyWzFdLCBDID0gbWF0MlsyXSwgRCA9IG1hdDJbM10sXG4gICAgICAgICAgICAgICAgRSA9IG1hdDJbNF0sIEYgPSBtYXQyWzVdLCBHID0gbWF0Mls2XSwgSCA9IG1hdDJbN10sXG4gICAgICAgICAgICAgICAgSSA9IG1hdDJbOF0sIEogPSBtYXQyWzldLCBLID0gbWF0MlsxMF0sIEwgPSBtYXQyWzExXSxcbiAgICAgICAgICAgICAgICBNID0gbWF0MlsxMl0sIE4gPSBtYXQyWzEzXSwgTyA9IG1hdDJbMTRdLCBQID0gbWF0MlsxNV07XG4gICAgICAgICAgICB2YXIgZGVzdCA9IG5ldyBGbG9hdDMyQXJyYXkoMTYpO1xuXG4gICAgICAgICAgICBkZXN0WzBdID0gQSAqIGEgKyBCICogZSArIEMgKiBpICsgRCAqIG07XG4gICAgICAgICAgICBkZXN0WzFdID0gQSAqIGIgKyBCICogZiArIEMgKiBqICsgRCAqIG47XG4gICAgICAgICAgICBkZXN0WzJdID0gQSAqIGMgKyBCICogZyArIEMgKiBrICsgRCAqIG87XG4gICAgICAgICAgICBkZXN0WzNdID0gQSAqIGQgKyBCICogaCArIEMgKiBsICsgRCAqIHA7XG4gICAgICAgICAgICBkZXN0WzRdID0gRSAqIGEgKyBGICogZSArIEcgKiBpICsgSCAqIG07XG4gICAgICAgICAgICBkZXN0WzVdID0gRSAqIGIgKyBGICogZiArIEcgKiBqICsgSCAqIG47XG4gICAgICAgICAgICBkZXN0WzZdID0gRSAqIGMgKyBGICogZyArIEcgKiBrICsgSCAqIG87XG4gICAgICAgICAgICBkZXN0WzddID0gRSAqIGQgKyBGICogaCArIEcgKiBsICsgSCAqIHA7XG4gICAgICAgICAgICBkZXN0WzhdID0gSSAqIGEgKyBKICogZSArIEsgKiBpICsgTCAqIG07XG4gICAgICAgICAgICBkZXN0WzldID0gSSAqIGIgKyBKICogZiArIEsgKiBqICsgTCAqIG47XG4gICAgICAgICAgICBkZXN0WzEwXSA9IEkgKiBjICsgSiAqIGcgKyBLICogayArIEwgKiBvO1xuICAgICAgICAgICAgZGVzdFsxMV0gPSBJICogZCArIEogKiBoICsgSyAqIGwgKyBMICogcDtcbiAgICAgICAgICAgIGRlc3RbMTJdID0gTSAqIGEgKyBOICogZSArIE8gKiBpICsgUCAqIG07XG4gICAgICAgICAgICBkZXN0WzEzXSA9IE0gKiBiICsgTiAqIGYgKyBPICogaiArIFAgKiBuO1xuICAgICAgICAgICAgZGVzdFsxNF0gPSBNICogYyArIE4gKiBnICsgTyAqIGsgKyBQICogbztcbiAgICAgICAgICAgIGRlc3RbMTVdID0gTSAqIGQgKyBOICogaCArIE8gKiBsICsgUCAqIHA7XG5cbiAgICAgICAgICAgIHJldHVybiBNYXRyaXguY3JlYXRlKGRlc3QpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIG11bHRpcGx5VmVjdG9yNCh2ZWN0b3I6VmVjdG9yNCk6VmVjdG9yNCB7XG4gICAgICAgICAgICB2YXIgbWF0MSA9IHRoaXMuX3ZhbHVlcyxcbiAgICAgICAgICAgICAgICB2ZWM0ID0gdmVjdG9yLnZhbHVlcztcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBbXTtcblxuICAgICAgICAgICAgcmVzdWx0WzBdID0gdmVjNFswXSAqIG1hdDFbMF0gKyB2ZWM0WzFdICogbWF0MVs0XSArIHZlYzRbMl0gKiBtYXQxWzhdICsgdmVjNFszXSAqIG1hdDFbMTJdO1xuICAgICAgICAgICAgcmVzdWx0WzFdID0gdmVjNFswXSAqIG1hdDFbMV0gKyB2ZWM0WzFdICogbWF0MVs1XSArIHZlYzRbMl0gKiBtYXQxWzldICsgdmVjNFszXSAqIG1hdDFbMTNdO1xuICAgICAgICAgICAgcmVzdWx0WzJdID0gdmVjNFswXSAqIG1hdDFbMl0gKyB2ZWM0WzFdICogbWF0MVs2XSArIHZlYzRbMl0gKiBtYXQxWzEwXSArIHZlYzRbM10gKiBtYXQxWzE0XTtcbiAgICAgICAgICAgIHJlc3VsdFszXSA9IHZlYzRbMF0gKiBtYXQxWzNdICsgdmVjNFsxXSAqIG1hdDFbN10gKyB2ZWM0WzJdICogbWF0MVsxMV0gKyB2ZWM0WzNdICogbWF0MVsxNV07XG5cbiAgICAgICAgICAgIHJldHVybiBWZWN0b3I0LmNyZWF0ZShyZXN1bHRbMF0sIHJlc3VsdFsxXSwgcmVzdWx0WzJdLCByZXN1bHRbM10pO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGNvcHkoKTogTWF0cml4e1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IE1hdHJpeC5jcmVhdGUoKSxcbiAgICAgICAgICAgICAgICBpID0gMCxcbiAgICAgICAgICAgICAgICBsZW4gPSB0aGlzLl92YWx1ZXMubGVuZ3RoO1xuXG4gICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCBsZW47IGkrKyl7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnZhbHVlc1tpXSA9IHRoaXMuX3ZhbHVlc1tpXTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RlZmluaXRpb25zLmQudHNcIi8+XG5tb2R1bGUgRW5naW5lM0R7XG4gICAgZXhwb3J0IGNsYXNzIEFjdGlvbntcbiAgICAgICAgcHJpdmF0ZSBfaXNGaW5pc2g6Ym9vbGVhbiA9IGZhbHNlO1xuICAgICAgICBnZXQgaXNGaW5pc2goKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pc0ZpbmlzaDtcbiAgICAgICAgfVxuICAgICAgICBzZXQgaXNGaW5pc2goaXNGaW5pc2g6Ym9vbGVhbil7XG4gICAgICAgICAgICB0aGlzLl9pc0ZpbmlzaCA9IGlzRmluaXNoO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJvdGVjdGVkIG1hdHJpeDpNYXRyaXggPSBudWxsO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG1hdHJpeDpNYXRyaXgpe1xuICAgICAgICAgICAgdGhpcy5tYXRyaXggPSBtYXRyaXg7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgdXBkYXRlKCl7XG4gICAgICAgICAgICByZXR1cm4gZHlDYi5Mb2cuZXJyb3IodHJ1ZSwgZHlDYi5Mb2cuaW5mby5BQlNUUkFDVF9NRVRIT0QpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJvdGVjdGVkIGZpbmlzaCgpe1xuICAgICAgICAgICAgdGhpcy5faXNGaW5pc2ggPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RlZmluaXRpb25zLmQudHNcIi8+XG5tb2R1bGUgRW5naW5lM0R7XG4gICAgZXhwb3J0IGNsYXNzIEFjdGlvbk1hbmFnZXJ7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKCk6QWN0aW9uTWFuYWdlciB7XG4gICAgICAgICAgICB2YXIgb2JqID0gbmV3IHRoaXMoKTtcblxuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2NoaWxkcmVuOmR5Q2IuQ29sbGVjdGlvbiA9IGR5Q2IuQ29sbGVjdGlvbi5jcmVhdGUoKTtcblxuICAgICAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGFkZENoaWxkKGFjdGlvbjpBY3Rpb24pe1xuICAgICAgICAgICAgaWYodGhpcy5oYXNDaGlsZChhY3Rpb24pKXtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX2NoaWxkcmVuLmFkZENoaWxkKGFjdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgaGFzQ2hpbGQoYWN0aW9uOkFjdGlvbil7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY2hpbGRyZW4uaGFzQ2hpbGQoYWN0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyB1cGRhdGUoKXtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgICAgICAgICByZW1vdmVRdWV1ZSA9IFtdO1xuICAgICAgICAgICAgLy90aW1lID0gbnVsbDtcblxuICAgICAgICAgICAgdGhpcy5fY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbihjaGlsZCl7XG4gICAgICAgICAgICAgICAgLy/kv67lpI3igJzlpoLmnpzpgY3ljobnmoTliqjkvZzliKDpmaTkuobliqjkvZzluo/liJfkuK3mn5DkuKrliqjkvZzvvIzliJnlnKjlkI7pnaLnmoTpgY3ljobkuK3kvJrmiqXplJnigJ3nmoRidWdcbiAgICAgICAgICAgICAgICBpZiAoIWNoaWxkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQuaXNGaW5pc2gpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlUXVldWUucHVzaChjaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9pZiAoY2hpbGQuaXNTdG9wKCkpIHtcbiAgICAgICAgICAgICAgICAvLyAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgLy99XG5cbiAgICAgICAgICAgICAgICAvL2NoaWxkLnVwZGF0ZSh0aW1lKTtcbiAgICAgICAgICAgICAgICBjaGlsZC51cGRhdGUoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZW1vdmVRdWV1ZS5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgICAgICAgICAgIHNlbGYuX2NoaWxkcmVuLnJlbW92ZUNoaWxkKGNoaWxkKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kZWZpbml0aW9ucy5kLnRzXCIvPlxubW9kdWxlIEVuZ2luZTNEe1xuICAgIGV4cG9ydCBjbGFzcyBSb3RhdGUgZXh0ZW5kcyBBY3Rpb257XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKG1hdHJpeCwgYWN0aW9uRGF0YSk6Um90YXRlIHtcbiAgICAgICAgICAgIHZhciBvYmogPSBuZXcgdGhpcyhtYXRyaXgsIGFjdGlvbkRhdGEpO1xuXG4gICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfc3BlZWQ6bnVtYmVyID0gbnVsbDtcbiAgICAgICAgcHJpdmF0ZSBfYXhpczpWZWN0b3IzID0gbnVsbDtcbiAgICAgICAgcHJpdmF0ZSBfcG9pbnQ6VmVjdG9yMyA9IG51bGw7XG4gICAgICAgIHByaXZhdGUgX2FuZ2xlOm51bWJlciA9IDA7XG5cbiAgICAgICAgY29uc3RydWN0b3IobWF0cml4Ok1hdHJpeCwgYXhpc0RhdGE6e3NwZWVkOm51bWJlcjtheGlzOlZlY3RvcjNbXX0pe1xuICAgICAgICAgICAgc3VwZXIobWF0cml4KTtcblxuICAgICAgICAgICAgdGhpcy5fc3BlZWQgPSBheGlzRGF0YS5zcGVlZDtcbiAgICAgICAgICAgIGlmKGF4aXNEYXRhLmF4aXMubGVuZ3RoID09PSAyKXtcbiAgICAgICAgICAgICAgICB0aGlzLl9heGlzID0gYXhpc0RhdGEuYXhpc1sxXS5zdWIoYXhpc0RhdGEuYXhpc1swXSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcG9pbnQgPSBheGlzRGF0YS5heGlzWzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihheGlzRGF0YS5heGlzLmxlbmd0aCA9PT0gMSApe1xuICAgICAgICAgICAgICAgIHRoaXMuX2F4aXMgPSBheGlzRGF0YS5heGlzWzBdO1xuICAgICAgICAgICAgICAgIHRoaXMuX3BvaW50ID0gVmVjdG9yMy5jcmVhdGUoMCwgMCwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGR5Q2IuTG9nLmVycm9yKHRydWUsIFwiYXhpcydzIGxlbmd0aCBzaG91bGQgYmUgMSBvciAyXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHVwZGF0ZSgpe1xuICAgICAgICAgICAgdmFyIG1vdmVQb2ludCA9IG51bGwsXG4gICAgICAgICAgICAgICAgYmFja1BvaW50ID0gbnVsbDtcblxuICAgICAgICAgICAgdGhpcy5fYW5nbGUgPSB0aGlzLl9zcGVlZDtcblxuICAgICAgICAgICAgaWYodGhpcy5faXNOb3RSb3RhdGVBcm91bmRPcmlnaW5Qb2ludCgpKXtcbiAgICAgICAgICAgICAgICBtb3ZlUG9pbnQgPSB0aGlzLl9wb2ludC5jb3B5KCkucmV2ZXJzZSgpLnZhbHVlcztcbiAgICAgICAgICAgICAgICBiYWNrUG9pbnQgPSB0aGlzLl9wb2ludC52YWx1ZXM7XG5cbiAgICAgICAgICAgICAgICB0aGlzLm1hdHJpeC50cmFuc2xhdGUobW92ZVBvaW50WzBdLCBtb3ZlUG9pbnRbMV0sIG1vdmVQb2ludFsyXSk7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXRyaXgucm90YXRlKHRoaXMuX2FuZ2xlLCB0aGlzLl9heGlzLnZhbHVlc1swXSwgdGhpcy5fYXhpcy52YWx1ZXNbMV0sIHRoaXMuX2F4aXMudmFsdWVzWzJdKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1hdHJpeC50cmFuc2xhdGUoYmFja1BvaW50WzBdLCBiYWNrUG9pbnRbMV0sIGJhY2tQb2ludFsyXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHRoaXMubWF0cml4LnJvdGF0ZSh0aGlzLl9hbmdsZSwgdGhpcy5fYXhpcy52YWx1ZXNbMF0sIHRoaXMuX2F4aXMudmFsdWVzWzFdLCB0aGlzLl9heGlzLnZhbHVlc1syXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9pc05vdFJvdGF0ZUFyb3VuZE9yaWdpblBvaW50KCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcG9pbnQudmFsdWVzWzBdICE9PSAwXG4gICAgICAgICAgICAgICAgfHwgdGhpcy5fcG9pbnQudmFsdWVzWzFdICE9PSAwXG4gICAgICAgICAgICAgICAgfHwgdGhpcy5fcG9pbnQudmFsdWVzWzJdICE9PSAwO1xuICAgICAgICB9XG4gICAgfVxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kZWZpbml0aW9ucy5kLnRzXCIvPlxubW9kdWxlIEVuZ2luZTNEe1xuICAgIGV4cG9ydCBjbGFzcyBTY2FsZSBleHRlbmRzIEFjdGlvbntcbiAgICAgICAgcHVibGljIHN0YXRpYyBjcmVhdGUobWF0cml4LCBkYXRhKTpTY2FsZSB7XG4gICAgICAgICAgICB2YXIgb2JqID0gbmV3IHRoaXMobWF0cml4LCBkYXRhKTtcblxuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX3g6bnVtYmVyID0gMDtcbiAgICAgICAgcHJpdmF0ZSBfeTpudW1iZXIgPSAwO1xuICAgICAgICBwcml2YXRlIF96Om51bWJlciA9IDA7XG5cbiAgICAgICAgY29uc3RydWN0b3IobWF0cml4Ok1hdHJpeCwgZGF0YTp7eDpudW1iZXI7eTpudW1iZXI7ejpudW1iZXJ9KXtcbiAgICAgICAgICAgIHN1cGVyKG1hdHJpeCk7XG5cbiAgICAgICAgICAgIHRoaXMuX3ggPSBkYXRhLng7XG4gICAgICAgICAgICB0aGlzLl95ID0gZGF0YS55O1xuICAgICAgICAgICAgdGhpcy5feiA9IGRhdGEuejtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyB1cGRhdGUoKXtcbiAgICAgICAgICAgIHRoaXMubWF0cml4LnNjYWxlKHRoaXMuX3gsIHRoaXMuX3ksIHRoaXMuX3opO1xuICAgICAgICAgICAgdGhpcy5maW5pc2goKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RlZmluaXRpb25zLmQudHNcIi8+XG5tb2R1bGUgRW5naW5lM0R7XG4gICAgZXhwb3J0IGNsYXNzIFRyYW5zbGF0ZSBleHRlbmRzIEFjdGlvbntcbiAgICAgICAgcHVibGljIHN0YXRpYyBjcmVhdGUobWF0cml4LCBwb3NEYXRhKTpUcmFuc2xhdGUge1xuICAgICAgICAgICAgdmFyIG9iaiA9IG5ldyB0aGlzKG1hdHJpeCwgcG9zRGF0YSk7XG5cbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF94Om51bWJlciA9IDA7XG4gICAgICAgIHByaXZhdGUgX3k6bnVtYmVyID0gMDtcbiAgICAgICAgcHJpdmF0ZSBfejpudW1iZXIgPSAwO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG1hdHJpeDpNYXRyaXgsIHBvc0RhdGE6e3g6bnVtYmVyO3k6bnVtYmVyO3o6bnVtYmVyfSl7XG4gICAgICAgICAgICBzdXBlcihtYXRyaXgpO1xuXG4gICAgICAgICAgICB0aGlzLl94ID0gcG9zRGF0YS54O1xuICAgICAgICAgICAgdGhpcy5feSA9IHBvc0RhdGEueTtcbiAgICAgICAgICAgIHRoaXMuX3ogPSBwb3NEYXRhLno7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgdXBkYXRlKCl7XG4gICAgICAgICAgICB0aGlzLm1hdHJpeC50cmFuc2xhdGUodGhpcy5feCwgdGhpcy5feSwgdGhpcy5feik7XG4gICAgICAgICAgICB0aGlzLmZpbmlzaCgpO1xuICAgICAgICB9XG4gICAgfVxufSIsIi8vcmVmZXJlbmNlIHRvIHRocmVlLmpzLT5Db2xvci5qc1xubW9kdWxlIEVuZ2luZTNEe1xuICAgIGV4cG9ydCBjbGFzcyBDb2xvciB7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKGNvbG9yVmFsOnN0cmluZykge1xuICAgICAgICAgICAgdmFyIG9iaiA9IG5ldyB0aGlzKCk7XG5cbiAgICAgICAgICAgIG9iai5pbml0V2hlbkNyZWF0ZShjb2xvclZhbCk7XG5cbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9yOm51bWJlciA9IG51bGw7XG4gICAgICAgIGdldCByKCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcjtcbiAgICAgICAgfVxuICAgICAgICBzZXQgcihyOm51bWJlcil7XG4gICAgICAgICAgICB0aGlzLl9yID0gcjtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2c6bnVtYmVyID0gbnVsbDtcbiAgICAgICAgZ2V0IGcoKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9nO1xuICAgICAgICB9XG4gICAgICAgIHNldCBnKGc6bnVtYmVyKXtcbiAgICAgICAgICAgIHRoaXMuX2cgPSBnO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfYjpudW1iZXIgPSBudWxsO1xuICAgICAgICBnZXQgYigpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2I7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IGIoYjpudW1iZXIpe1xuICAgICAgICAgICAgdGhpcy5fYiA9IGI7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBpbml0V2hlbkNyZWF0ZShjb2xvclZhbDpzdHJpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuX3NldENvbG9yKGNvbG9yVmFsKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgcHJpdmF0ZSBfc2V0Q29sb3IoY29sb3JWYWw6c3RyaW5nKSB7XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8vLyByZ2IoMjU1LDAsMClcbiAgICAgICAgICAgIC8vLy9cbiAgICAgICAgICAgIC8vLy/lsIbmiJHku6zlubPluLjkuaDmg6/nmoTpopzoibLlgLzooajovr7lvaLlvI9yZ2IoMjU1LDAsMCkt5pWw5YC85Z6L77yM6L2s5o2i5oiQVEhSRUUuSlPorqTor4bnmoTlvaLlvI8wLjAtMS4w77yMXG4gICAgICAgICAgICAvLy8v6L+Z6YeM5bCG5Y+W5YC86IyD5Zu05LuOMC0yNTXmjaLnrpfmiJAwLjAtMS4wLlxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vaWYgKCAvXnJnYlxcKChcXGQrKSwgPyhcXGQrKSwgPyhcXGQrKVxcKSQvaS50ZXN0KCBzdHlsZSApICkge1x0Ly/nlKjmraPliJnooajovr7lvI/mo4Dmn6XlvZPliY3kvKDpgJLnmoTpopzoibLlgLzooajovr7moLflvI/mmK/lkKbkuLrmlbDlgLzlnotyZ2IoMjU1LDAsMClcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyAgICB2YXIgY29sb3IgPSAvXnJnYlxcKChcXGQrKSwgPyhcXGQrKSwgPyhcXGQrKVxcKSQvaS5leGVjKCBzdHlsZSApO1x0Ly/lsIblrZfnrKbkuLLkuK3nmoTmlbDlgLzotYvlgLznu5ljb2xvcu+8jGNvbG9y5piv5LiA5Liq5pWw57uE44CCXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gICAgdGhpcy5yID0gTWF0aC5taW4oIDI1NSwgcGFyc2VJbnQoIGNvbG9yWyAxIF0sIDEwICkgKSAvIDI1NTtcdFx0Ly/lsIbmlbDnu4TkuK3nmoTnrKwy5Liq5YWD57Sg6L2s5o2i5oiQMTDov5vliLZpbnTnsbvlnovmlbTmlbDvvIzliKTmlq3mmK/lkKblsI/kuo4yNTXvvIznhLblkI7pmaTku6UyNTXvvIzlvpflh7rlsI/mlbDvvIzlpI3liLbnu5lDb2xvci5yXG4gICAgICAgICAgICAvLyAgICB0aGlzLmcgPSBNYXRoLm1pbiggMjU1LCBwYXJzZUludCggY29sb3JbIDIgXSwgMTAgKSApIC8gMjU1O1x0XHQvL+WwhuaVsOe7hOS4reeahOesrDPkuKrlhYPntKDovazmjaLmiJAxMOi/m+WItmludOexu+Wei+aVtOaVsO+8jOWIpOaWreaYr+WQpuWwj+S6jjI1Ne+8jOeEtuWQjumZpOS7pTI1Ne+8jOW+l+WHuuWwj+aVsO+8jOWkjeWItue7mUNvbG9yLmdcbiAgICAgICAgICAgIC8vICAgIHRoaXMuYiA9IE1hdGgubWluKCAyNTUsIHBhcnNlSW50KCBjb2xvclsgMyBdLCAxMCApICkgLyAyNTU7XHRcdC8v5bCG5pWw57uE5Lit55qE56ysNOS4quWFg+e0oOi9rOaNouaIkDEw6L+b5Yi2aW5057G75Z6L5pW05pWw77yM5Yik5pat5piv5ZCm5bCP5LqOMjU177yM54S25ZCO6Zmk5LulMjU177yM5b6X5Ye65bCP5pWw77yM5aSN5Yi257uZQ29sb3IuYlxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vICAgIHJldHVybiB0aGlzOyAvL+i/lOWbnuminOiJsuWvueixoeOAglxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vfVxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vLy8gcmdiKDEwMCUsMCUsMCUpXG4gICAgICAgICAgICAvLy8v5bCG5oiR5Lus5bmz5bi45Lmg5oOv55qE6aKc6Imy5YC86KGo6L6+5b2i5byPcmdiKDEwMCUsMCUsMCUpLeeZvuWIhuavlOWei++8jOi9rOaNouaIkFRIUkVFLkpT6K6k6K+G55qE5b2i5byPMC4wLTEuMO+8jFxuICAgICAgICAgICAgLy8vL+i/memHjOWwhuWPluWAvOiMg+WbtOS7jjAlLTEwMCXmjaLnrpfmiJAwLjAtMS4wLlxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vaWYgKCAvXnJnYlxcKChcXGQrKVxcJSwgPyhcXGQrKVxcJSwgPyhcXGQrKVxcJVxcKSQvaS50ZXN0KCBzdHlsZSApICkge1x0Ly/nlKjmraPliJnooajovr7lvI/mo4Dmn6XlvZPliY3kvKDpgJLnmoTpopzoibLlgLzooajovr7moLflvI/mmK/lkKbkuLrnmb7liIbmr5TlnotyZ2IoMTAwJSwwJSwwJSlcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyAgICB2YXIgY29sb3IgPSAvXnJnYlxcKChcXGQrKVxcJSwgPyhcXGQrKVxcJSwgPyhcXGQrKVxcJVxcKSQvaS5leGVjKCBzdHlsZSApO1x0Ly/lsIblrZfnrKbkuLLkuK3nmoTmlbDlgLzotYvlgLznu5ljb2xvcu+8jGNvbG9y5piv5LiA5Liq5pWw57uE44CCXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gICAgdGhpcy5yID0gTWF0aC5taW4oIDEwMCwgcGFyc2VJbnQoIGNvbG9yWyAxIF0sIDEwICkgKSAvIDEwMDtcdFx0Ly/lsIbmlbDnu4TkuK3nmoTnrKwy5Liq5YWD57Sg6L2s5o2i5oiQMTDov5vliLZpbnTnsbvlnovmlbTmlbDvvIzliKTmlq3mmK/lkKblsI/kuo4xMDDvvIznhLblkI7pmaTku6UxMDDvvIzlvpflh7rlsI/mlbDvvIzlpI3liLbnu5lDb2xvci5yXG4gICAgICAgICAgICAvLyAgICB0aGlzLmcgPSBNYXRoLm1pbiggMTAwLCBwYXJzZUludCggY29sb3JbIDIgXSwgMTAgKSApIC8gMTAwO1x0XHQvL+WwhuaVsOe7hOS4reeahOesrDPkuKrlhYPntKDovazmjaLmiJAxMOi/m+WItmludOexu+Wei+aVtOaVsO+8jOWIpOaWreaYr+WQpuWwj+S6jjEwMO+8jOeEtuWQjumZpOS7pTEwMO+8jOW+l+WHuuWwj+aVsO+8jOWkjeWItue7mUNvbG9yLmdcbiAgICAgICAgICAgIC8vICAgIHRoaXMuYiA9IE1hdGgubWluKCAxMDAsIHBhcnNlSW50KCBjb2xvclsgMyBdLCAxMCApICkgLyAxMDA7XHRcdC8v5bCG5pWw57uE5Lit55qE56ysNOS4quWFg+e0oOi9rOaNouaIkDEw6L+b5Yi2aW5057G75Z6L5pW05pWw77yM5Yik5pat5piv5ZCm5bCP5LqOMTAw77yM54S25ZCO6Zmk5LulMTAw77yM5b6X5Ye65bCP5pWw77yM5aSN5Yi257uZQ29sb3IuYlxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vICAgIHJldHVybiB0aGlzOyAvL+i/lOWbnuminOiJsuWvueixoeOAglxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vfVxuXG4gICAgICAgICAgICAvLyAjZmYwMDAwXG4gICAgICAgICAgICAvL+WwhuaIkeS7rOW5s+W4uOS5oOaDr+eahOminOiJsuWAvOihqOi+vuW9ouW8jyNmZjAwMDAtNuS9jTE26L+b5Yi25Z6L77yM6L2s5o2i5oiQVEhSRUUuSlPorqTor4bnmoTlvaLlvI8wLjAtMS4w77yMXG4gICAgICAgICAgICAvL+i/memHjOWwhuWPluWAvOiMg+WbtOS7jjAwLWZm5o2i566X5oiQMC4wLTEuMC5cblxuICAgICAgICAgICAgaWYgKC9eXFwjKFswLTlhLWZdezZ9KSQvaS50ZXN0KGNvbG9yVmFsKSkge1x0XHQvL+eUqOato+WImeihqOi+vuW8j+ajgOafpeW9k+WJjeS8oOmAkueahOminOiJsuWAvOihqOi+vuagt+W8j+aYr+WQpuS4ujbkvY0xNui/m+WItuWeiyAjZmYwMDAwXG5cbiAgICAgICAgICAgICAgICB2YXIgY29sb3IgPSAvXlxcIyhbMC05YS1mXXs2fSkkL2kuZXhlYyhjb2xvclZhbCk7XHRcdC8v5bCG5a2X56ym5Liy5Lit55qE5pWw5YC86LWL5YC857uZY29sb3LvvIxjb2xvcuaYr+S4gOS4quaVsOe7hOOAglxuXG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0SGV4KHBhcnNlSW50KGNvbG9yWzFdLCAxNikpO1x0Ly/lsIbmlbDnu4TkuK3nmoTnrKwy5Liq5YWD57Sg6L2s5o2i5oiQMTbov5vliLZpbnTnsbvlnovmlbTmlbAu6LCD55Soc2V0SGV4IOaWueazle+8jOWwhjE26L+b5Yi25pWw5YC86LWL5YC857uZQ29sb3IucixDb2xvci5nLENvbG9yLmJcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzOyAvL+i/lOWbnuminOiJsuWvueixoeOAglxuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8vLyAjZjAwXG4gICAgICAgICAgICAvLy8v5bCG5oiR5Lus5bmz5bi45Lmg5oOv55qE6aKc6Imy5YC86KGo6L6+5b2i5byPI2YwMC0z5L2NMTbov5vliLblnovvvIzovazmjaLmiJBUSFJFRS5KU+iupOivhueahOW9ouW8jzAuMC0xLjDvvIxcbiAgICAgICAgICAgIC8vLy/ov5nph4zlsIblj5blgLzojIPlm7Tku44wLWbmjaLnrpfmiJAwLjAtMS4wLlxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vaWYgKCAvXlxcIyhbMC05YS1mXSkoWzAtOWEtZl0pKFswLTlhLWZdKSQvaS50ZXN0KCBzdHlsZSApICkge1x0Ly/nlKjmraPliJnooajovr7lvI/mo4Dmn6XlvZPliY3kvKDpgJLnmoTpopzoibLlgLzooajovr7moLflvI/mmK/lkKbkuLoz5L2NMTbov5vliLblnosgI2YwMFxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vICAgIHZhciBjb2xvciA9IC9eXFwjKFswLTlhLWZdKShbMC05YS1mXSkoWzAtOWEtZl0pJC9pLmV4ZWMoIHN0eWxlICk7XHQvL+WwhuWtl+espuS4suS4reeahOaVsOWAvOi1i+WAvOe7mWNvbG9y77yMY29sb3LmmK/kuIDkuKrmlbDnu4TjgIJcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyAgICB0aGlzLnNldEhleCggcGFyc2VJbnQoIGNvbG9yWyAxIF0gKyBjb2xvclsgMSBdICsgY29sb3JbIDIgXSArIGNvbG9yWyAyIF0gKyBjb2xvclsgMyBdICsgY29sb3JbIDMgXSwgMTYgKSApO1x0Ly/lsIbmlbDnu4TkuK3nmoTnrKwy77yMMyw05Liq5YWD57SgKjLvvIzovazmjaLmiJAxNui/m+WItmludOexu+Wei+aVtOaVsC7osIPnlKhzZXRIZXgg5pa55rOV77yM5bCGMTbov5vliLbmlbDlgLzotYvlgLznu5lDb2xvci5yLENvbG9yLmcsQ29sb3IuYlxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vICAgIHJldHVybiB0aGlzOyAvL+i/lOWbnuminOiJsuWvueixoeOAglxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vfVxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vLy8gcmVkXG4gICAgICAgICAgICAvLy8v5bCG5oiR5Lus5bmz5bi45Lmg5oOv55qE6aKc6Imy5YC86KGo6L6+5b2i5byPcmVk6aKc6Imy5ZCN77yM6L2s5o2i5oiQVEhSRUUuSlPorqTor4bnmoTlvaLlvI8wLjAtMS4w77yMXG4gICAgICAgICAgICAvLy8v6L+Z6YeM5bCG6aKc6Imy5ZCN5o2i566X5oiQMC4wLTEuMC5cbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvL2lmICggL14oXFx3KykkL2kudGVzdCggc3R5bGUgKSApIHtcdC8v55So5q2j5YiZ6KGo6L6+5byP5qOA5p+l5b2T5YmN5Lyg6YCS55qE6aKc6Imy5YC86KGo6L6+5qC35byP5piv5ZCm5Li66aKc6Imy5ZCN77yM5Y2z5Y+C5pWwc3R5bGXkuK3mmK/lkKblj6rmmK/lrZfnrKbkuLLmsqHmnInmlbDlrZfjgIJcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyAgICB0aGlzLnNldEhleCggVEhSRUUuQ29sb3JLZXl3b3Jkc1sgc3R5bGUgXSApO1x0Ly/lsIblrZfnrKbkuLLkvZzkuLpUSFJFRS5Db2xvcktleXdvcmRz5a+56LGh55qE5bGe5oCn5ZCN77yM5Y+W5Ye65LiO6K+l5bGe5oCn5ZCN55u45a+55bqU55qEMTbov5vliLbnmoTlsZ7mgKflgLwu6LCD55Soc2V0SGV4IOaWueazle+8jOWwhjE26L+b5Yi255qE5bGe5oCn5YC86LWL5YC857uZQ29sb3IucixDb2xvci5nLENvbG9yLmJcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyAgICByZXR1cm4gdGhpcztcdC8v6L+U5Zue6aKc6Imy5a+56LGh44CCXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy99XG4gICAgICAgIH1cbiAgICAgICAgLypzZXRIZXjmlrnms5VcbiAgICAgICAgIC8vL3NldEhleOaWueazleeUqOS6juiuvue9rjE26L+b5Yi26aKc6Imy5YC857uZ5b2T5YmN5a6e5L6LXG4gICAgICAgICAvLy/mm7TlpJrlhbPkuo5oZXjpopzoibLnmoTlhoXlrrnlj4LogIPnu7Tln7rnmb7np5EsaHR0cDovL3poLndpa2lwZWRpYS5vcmcvd2lraS8lRTclQkQlOTElRTklQTElQjUlRTklQTIlOUMlRTglODklQjJcbiAgICAgICAgICovXG4gICAgICAgIC8vLzxzdW1tYXJ5PnNldEhleDwvc3VtbWFyeT5cbiAgICAgICAgLy8vPHBhcmFtIG5hbWUgPVwiaGV4XCIgdHlwZT1cIm51bWJlcigxNui/m+WItuminOiJsuWAvDB4ZmZkZGZm77yJXCI+MTbov5vliLbmlbDlgLwweGZmZGRmZjwvcGFyYW0+XG4gICAgICAgIC8vLzxyZXR1cm5zIHR5cGU9XCJDb2xvclwiPui/lOWbnuminOiJsuWvueixoTwvcmV0dXJucz5cbiAgICAgICAgcHJpdmF0ZSBfc2V0SGV4KGhleCkge1xuICAgICAgICAgICAgaGV4ID0gTWF0aC5mbG9vcihoZXgpO1xuXG4gICAgICAgICAgICB0aGlzLl9yID0gKCBoZXggPj4gMTYgJiAyNTUgKSAvIDI1NTsgLy/lsIblt6bovrnkuKTkvY0xNui/m+WItuaVsOWAvOWPmOaNouaIkHJnYuminOiJsuWAvOWvueW6lOeahHJlZO+8jOW5tui1i+WAvOe7meWxnuaAp0NvbG9yLnLjgIJcbiAgICAgICAgICAgIHRoaXMuX2cgPSAoIGhleCA+PiA4ICYgMjU1ICkgLyAyNTU7ICAvL+WwhuS4remXtOS4pOS9jTE26L+b5Yi25pWw5YC85Y+Y5o2i5oiQcmdi6aKc6Imy5YC85a+55bqU55qEZ3JlZW7vvIzlubbotYvlgLznu5nlsZ7mgKdDb2xvci5n44CCXG4gICAgICAgICAgICB0aGlzLl9iID0gKCBoZXggJiAyNTUgKSAvIDI1NTtcdCAgICAvL+WwhuWPs+i+ueS4pOS9jTE26L+b5Yi25pWw5YC85Y+Y5o2i5oiQcmdi6aKc6Imy5YC85a+55bqU55qEYmx1Ze+8jOW5tui1i+WAvOe7meWxnuaAp0NvbG9yLmLjgIJcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHQvL+i/lOWbnuminOiJsuWvueixoVxuICAgICAgICB9XG4gICAgfVxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kZWZpbml0aW9ucy5kLnRzXCIvPlxubW9kdWxlIEVuZ2luZTNEIHtcbiAgICBleHBvcnQgY2xhc3MgSnVkZ2VVdGlscyBleHRlbmRzIGR5Q2IuSnVkZ2VVdGlsc3tcbiAgICAgICAgcHVibGljIHN0YXRpYyBpc1ZpZXcob2JqKSB7XG4gICAgICAgICAgICByZXR1cm4gISFvYmogJiYgb2JqLm9mZnNldCAmJiBvYmoud2lkdGggJiYgb2JqLmhlaWdodCAmJiB0aGlzLmlzRnVuY3Rpb24ob2JqLmdldENvbnRleHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHN0YXRpYyBpc0VxdWFsKHRhcmdldDE6R2FtZU9iamVjdCwgdGFyZ2V0MjpHYW1lT2JqZWN0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0MS51aWQgPT09IHRhcmdldDIudWlkO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwibW9kdWxlIEVuZ2luZTNEe1xuICAgIGV4cG9ydCBlbnVtIFNoYWRlclR5cGV7XG4gICAgICAgIFZTLFxuICAgICAgICBGU1xuICAgIH1cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kZWZpbml0aW9ucy5kLnRzXCIvPlxubW9kdWxlIEVuZ2luZTNEe1xuICAgIGRlY2xhcmUgdmFyIGRvY3VtZW50OmFueTtcblxuICAgIGV4cG9ydCBjbGFzcyBTaGFkZXJ7XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7fVxuXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlU2hhZGVyKHNvdXJjZTpzdHJpbmcsIHR5cGU6U2hhZGVyVHlwZSl7XG4gICAgICAgICAgICB2YXIgc2hhZGVyID0gbnVsbCxcbiAgICAgICAgICAgICAgICBnbCA9IERpcmVjdG9yLmdldEluc3RhbmNlKCkuZ2w7XG5cbiAgICAgICAgICAgIHN3aXRjaCh0eXBlKXtcbiAgICAgICAgICAgICAgICBjYXNlIFNoYWRlclR5cGUuVlM6XG4gICAgICAgICAgICAgICAgICAgIHNoYWRlciA9IGdsLmNyZWF0ZVNoYWRlcihnbC5WRVJURVhfU0hBREVSKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBTaGFkZXJUeXBlLkZTOlxuICAgICAgICAgICAgICAgICAgICBzaGFkZXIgPSBnbC5jcmVhdGVTaGFkZXIoZ2wuRlJBR01FTlRfU0hBREVSKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdCA6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZ2wuc2hhZGVyU291cmNlKHNoYWRlciwgc291cmNlKTtcbiAgICAgICAgICAgIGdsLmNvbXBpbGVTaGFkZXIoc2hhZGVyKTtcblxuICAgICAgICAgICAgaWYoZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKHNoYWRlciwgZ2wuQ09NUElMRV9TVEFUVVMpKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2hhZGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBkeUNiLkxvZy5sb2coZ2wuZ2V0U2hhZGVySW5mb0xvZyhzaGFkZXIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIm1vZHVsZSBFbmdpbmUzRCB7XG4gICAgZXhwb3J0IGVudW0gQnVmZmVyVHlwZXtcbiAgICAgICAgVU5TSUdORURfQllURSA9IDxhbnk+XCJVTlNJR05FRF9CWVRFXCIsXG4gICAgICAgIFNIT1JUID0gPGFueT5cIlNIT1JUXCIsXG4gICAgICAgIFVOU0lHTkVEX1NIT1JUID0gPGFueT5cIlVOU0lHTkVEX1NIT1JUXCIsXG4gICAgICAgIElOVCA9IDxhbnk+XCJJTlRcIixcbiAgICAgICAgVU5TSUdORURfSU5UID0gPGFueT5cIlVOU0lHTkVEX0lOVFwiLFxuICAgICAgICBGTE9BVCA9IDxhbnk+XCJGTE9BVFwiXG4gICAgfVxufVxuIiwibW9kdWxlIEVuZ2luZTNEe1xuICAgIGV4cG9ydCBlbnVtIEF0dHJpYnV0ZURhdGFUeXBle1xuICAgICAgICBGTE9BVF80LFxuICAgICAgICBCVUZGRVJcbiAgICB9XG59XG5cbiIsIm1vZHVsZSBFbmdpbmUzRHtcbiAgICBleHBvcnQgZW51bSBEcmF3TW9kZXtcbiAgICAgICAgVFJJQU5HTEVTID0gPGFueT5cIlRSSUFOR0xFU1wiXG4gICAgfVxufVxuXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZGVmaW5pdGlvbnMuZC50c1wiLz5cbm1vZHVsZSBFbmdpbmUzRHtcbiAgICBleHBvcnQgY2xhc3MgRWxlbWVudEJ1ZmZlcntcbiAgICAgICAgcHVibGljIHN0YXRpYyBjcmVhdGUoZGF0YSwgdHlwZTpCdWZmZXJUeXBlKTpFbGVtZW50QnVmZmVyIHtcbiAgICAgICAgICAgIHZhciBvYmogPSBuZXcgdGhpcygpO1xuXG4gICAgICAgICAgICBvYmouaW5pdFdoZW5DcmVhdGUoZGF0YSwgdHlwZSk7XG5cbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9idWZmZXIgPSBudWxsO1xuICAgICAgICBnZXQgYnVmZmVyKCkgeyByZXR1cm4gdGhpcy5fYnVmZmVyOyB9XG5cbiAgICAgICAgcHJpdmF0ZSBfdHlwZTpzdHJpbmcgPSBudWxsO1xuICAgICAgICBnZXQgdHlwZSgpIHsgcmV0dXJuIHRoaXMuX3R5cGU7IH1cbiAgICAgICAgc2V0IHR5cGUodHlwZTpzdHJpbmcpe1xuICAgICAgICAgICAgdGhpcy5fdHlwZSA9IHR5cGU7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9udW06bnVtYmVyID0gbnVsbDtcbiAgICAgICAgZ2V0IG51bSgpIHsgcmV0dXJuIHRoaXMuX251bTsgfVxuICAgICAgICBzZXQgbnVtKG51bTpudW1iZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX251bSA9IG51bTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX3R5cGVTaXplOm51bWJlciA9IG51bGw7XG4gICAgICAgIGdldCB0eXBlU2l6ZSgpIHsgcmV0dXJuIHRoaXMuX3R5cGVTaXplOyB9XG5cbiAgICAgICAgcHVibGljIGluaXRXaGVuQ3JlYXRlKGRhdGEsIHR5cGU6QnVmZmVyVHlwZSkge1xuICAgICAgICAgICAgdmFyIGdsID0gRGlyZWN0b3IuZ2V0SW5zdGFuY2UoKS5nbDtcblxuICAgICAgICAgICAgaWYoIWRhdGEgfHwgIXRoaXMuX2NoZWNrRGF0YVR5cGUoZGF0YSwgdHlwZSkpe1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9idWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKTsgICAvLyBDcmVhdGUgYSBidWZmZXIgb2JqZWN0XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2J1ZmZlcikge1xuICAgICAgICAgICAgICAgIGR5Q2IuTG9nLmxvZygnRmFpbGVkIHRvIGNyZWF0ZSB0aGUgdGhpcy5fYnVmZmVyIG9iamVjdCcpO1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgdGhpcy5fYnVmZmVyKTtcbiAgICAgICAgICAgIGdsLmJ1ZmZlckRhdGEoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIGRhdGEsIGdsLlNUQVRJQ19EUkFXKTtcblxuICAgICAgICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgbnVsbCk7XG5cbiAgICAgICAgICAgIHRoaXMuX3R5cGUgPSBnbFt0eXBlXTtcbiAgICAgICAgICAgIHRoaXMuX251bSA9IGRhdGEubGVuZ3RoO1xuICAgICAgICAgICAgdGhpcy5fdHlwZVNpemUgPSB0aGlzLl9nZXRJbmZvKHR5cGUpLnNpemU7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9idWZmZXI7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHByaXZhdGUgX2NoZWNrRGF0YVR5cGUoZGF0YSwgdHlwZTpCdWZmZXJUeXBlKXtcbiAgICAgICAgICAgIHZhciBpbmZvID0gdGhpcy5fZ2V0SW5mbyh0eXBlKTtcblxuICAgICAgICAgICAgcmV0dXJuIGRhdGEgaW5zdGFuY2VvZiBpbmZvLnR5cGVDbGFzcztcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2dldEluZm8odHlwZTpCdWZmZXJUeXBlKTp7dHlwZUNsYXNzOmFueSxzaXplOm51bWJlcn17XG4gICAgICAgICAgICB2YXIgaW5mbyA9IG51bGw7XG5cbiAgICAgICAgICAgIHN3aXRjaCAodHlwZSl7XG4gICAgICAgICAgICAgICAgY2FzZSBCdWZmZXJUeXBlLlVOU0lHTkVEX0JZVEU6XG4gICAgICAgICAgICAgICAgICAgIGluZm8gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlQ2xhc3M6IFVpbnQ4QXJyYXksXG4gICAgICAgICAgICAgICAgICAgICAgICBzaXplOiAxXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgQnVmZmVyVHlwZS5TSE9SVDpcbiAgICAgICAgICAgICAgICAgICAgaW5mbyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVDbGFzczogSW50MTZBcnJheSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemU6IDJcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBCdWZmZXJUeXBlLlVOU0lHTkVEX1NIT1JUOlxuICAgICAgICAgICAgICAgICAgICBpbmZvID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZUNsYXNzOiBVaW50MTZBcnJheSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemU6IDJcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBCdWZmZXJUeXBlLklOVDpcbiAgICAgICAgICAgICAgICAgICAgaW5mbyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVDbGFzczogSW50MzJBcnJheSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemU6IDRcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBCdWZmZXJUeXBlLlVOU0lHTkVEX0lOVDpcbiAgICAgICAgICAgICAgICAgICAgaW5mbyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVDbGFzczogVWludDMyQXJyYXksXG4gICAgICAgICAgICAgICAgICAgICAgICBzaXplOiA0XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgQnVmZmVyVHlwZS5GTE9BVDpcbiAgICAgICAgICAgICAgICAgICAgaW5mbyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVDbGFzczogRmxvYXQzMkFycmF5LFxuICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZTogNFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBkeUNiLkxvZy5lcnJvcih0cnVlLCBkeUNiLkxvZy5pbmZvLkZVTkNfSU5WQUxJRChcIkJ1ZmZlclR5cGVcIikpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGluZm87XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZGVmaW5pdGlvbnMuZC50c1wiLz5cbm1vZHVsZSBFbmdpbmUzRHtcbiAgICBleHBvcnQgY2xhc3MgQXJyYXlCdWZmZXJ7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKGRhdGEsIG51bSwgdHlwZTpCdWZmZXJUeXBlKTpBcnJheUJ1ZmZlciB7XG4gICAgICAgICAgICB2YXIgb2JqID0gbmV3IHRoaXMoKTtcblxuICAgICAgICAgICAgb2JqLmluaXRXaGVuQ3JlYXRlKGRhdGEsIG51bSwgdHlwZSk7XG5cbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9idWZmZXIgPSBudWxsO1xuICAgICAgICBnZXQgYnVmZmVyKCkgeyByZXR1cm4gdGhpcy5fYnVmZmVyOyB9XG5cbiAgICAgICAgcHJpdmF0ZSBfbnVtOm51bWJlciA9IG51bGw7XG4gICAgICAgIGdldCBudW0oKSB7IHJldHVybiB0aGlzLl9udW07IH1cbiAgICAgICAgc2V0IG51bShudW06bnVtYmVyKSB7XG4gICAgICAgICAgICB0aGlzLl9udW0gPSBudW07XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF90eXBlOnN0cmluZyA9IG51bGw7XG4gICAgICAgIGdldCB0eXBlKCkgeyByZXR1cm4gdGhpcy5fdHlwZTsgfVxuICAgICAgICBzZXQgdHlwZSh0eXBlOnN0cmluZykge1xuICAgICAgICAgICAgdGhpcy5fdHlwZSA9IHR5cGU7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHByaXZhdGUgX2NvdW50Om51bWJlciA9IG51bGw7XG4gICAgICAgIGdldCBjb3VudCgpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvdW50O1xuICAgICAgICB9XG4gICAgICAgIHNldCBjb3VudChjb3VudDpudW1iZXIpe1xuICAgICAgICAgICAgdGhpcy5fY291bnQgPSBjb3VudDtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBpbml0V2hlbkNyZWF0ZShkYXRhLCBudW0sIHR5cGU6QnVmZmVyVHlwZSkge1xuICAgICAgICAgICAgdmFyIGdsID0gRGlyZWN0b3IuZ2V0SW5zdGFuY2UoKS5nbDtcblxuICAgICAgICAgICAgaWYoIWRhdGEpe1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9idWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKTsgICAvLyBDcmVhdGUgYSBidWZmZXIgb2JqZWN0XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2J1ZmZlcikge1xuICAgICAgICAgICAgICAgIGR5Q2IuTG9nLmxvZygnRmFpbGVkIHRvIGNyZWF0ZSB0aGUgdGhpcy5fYnVmZmVyIG9iamVjdCcpO1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHRoaXMuX2J1ZmZlcik7XG4gICAgICAgICAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgZGF0YSwgZ2wuU1RBVElDX0RSQVcpO1xuXG4gICAgICAgICAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgbnVsbCk7XG5cbiAgICAgICAgICAgIHRoaXMuX251bSA9IG51bTtcbiAgICAgICAgICAgIHRoaXMuX3R5cGUgPSBnbFt0eXBlXTtcbiAgICAgICAgICAgIHRoaXMuX2NvdW50ID0gZGF0YS5sZW5ndGggLyBudW07XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9idWZmZXI7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbiIsIm1vZHVsZSBFbmdpbmUzRHtcbiAgICBleHBvcnQgZW51bSBVbmlmb3JtRGF0YVR5cGV7XG4gICAgICAgIEZMT0FUX01BVDRcbiAgICB9XG59XG5cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kZWZpbml0aW9ucy5kLnRzXCIvPlxubW9kdWxlIEVuZ2luZTNEe1xuICAgIGV4cG9ydCBjbGFzcyBQcm9ncmFte1xuICAgICAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZSh2c1NvdXJjZTpzdHJpbmcsIGZzU291cmNlOnN0cmluZyk6UHJvZ3JhbSB7XG4gICAgICAgICAgICB2YXIgb2JqID0gbmV3IHRoaXMoKTtcblxuICAgICAgICAgICAgb2JqLmluaXRXaGVuQ3JlYXRlKHZzU291cmNlLCBmc1NvdXJjZSk7XG5cbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9wcm9ncmFtOmFueSA9IERpcmVjdG9yLmdldEluc3RhbmNlKCkuZ2wuY3JlYXRlUHJvZ3JhbSgpO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgdXNlKCl7XG4gICAgICAgICAgICBEaXJlY3Rvci5nZXRJbnN0YW5jZSgpLmdsLnVzZVByb2dyYW0odGhpcy5fcHJvZ3JhbSk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc2V0VW5pZm9ybURhdGEobmFtZTpzdHJpbmcsIHR5cGU6VW5pZm9ybURhdGFUeXBlLCBkYXRhOk1hdHJpeCl7XG4gICAgICAgICAgICB2YXIgZ2wgPSBEaXJlY3Rvci5nZXRJbnN0YW5jZSgpLmdsLFxuICAgICAgICAgICAgICAgIHBvcz0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMuX3Byb2dyYW0sIG5hbWUpO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGUpe1xuICAgICAgICAgICAgICAgIGNhc2UgVW5pZm9ybURhdGFUeXBlLkZMT0FUX01BVDQ6XG4gICAgICAgICAgICAgICAgICAgIGdsLnVuaWZvcm1NYXRyaXg0ZnYocG9zLGZhbHNlLCBkYXRhLnZhbHVlcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQgOlxuICAgICAgICAgICAgICAgICAgICBkeUNiLkxvZy5lcnJvcih0cnVlLCBkeUNiLkxvZy5pbmZvLkZVTkNfSU5WQUxJRChcIlVuaWZvcm1EYXRhVHlwZVwiKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHNldEF0dHJpYnV0ZURhdGEobmFtZTpzdHJpbmcsIHR5cGU6QXR0cmlidXRlRGF0YVR5cGUsIGRhdGE6QXJyYXlCdWZmZXJ8bnVtYmVyW10pe1xuICAgICAgICAgICAgdmFyIGdsID0gRGlyZWN0b3IuZ2V0SW5zdGFuY2UoKS5nbCxcbiAgICAgICAgICAgICAgICBwb3MgPSBnbC5nZXRBdHRyaWJMb2NhdGlvbih0aGlzLl9wcm9ncmFtLCBuYW1lKTtcblxuICAgICAgICAgICAgc3dpdGNoICh0eXBlKXtcbiAgICAgICAgICAgICAgICBjYXNlIEF0dHJpYnV0ZURhdGFUeXBlLkZMT0FUXzQ6XG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhQXJyOm51bWJlcltdID0gPEFycmF5PG51bWJlcj4+ZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgZ2wudmVydGV4QXR0cmliNGYocG9zLCBkYXRhQXJyWzBdLCBkYXRhQXJyWzFdLCBkYXRhQXJyWzJdLCBkYXRhQXJyWzNdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBBdHRyaWJ1dGVEYXRhVHlwZS5CVUZGRVI6XG4gICAgICAgICAgICAgICAgICAgIGxldCBidWZmZXI6QXJyYXlCdWZmZXIgPSA8QXJyYXlCdWZmZXI+ZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIGJ1ZmZlci5idWZmZXIpO1xuICAgICAgICAgICAgICAgICAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHBvcywgYnVmZmVyLm51bSwgYnVmZmVyLnR5cGUsIGZhbHNlLCAwLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkocG9zKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdCA6XG4gICAgICAgICAgICAgICAgICAgIGR5Q2IuTG9nLmVycm9yKHRydWUsIGR5Q2IuTG9nLmluZm8uRlVOQ19JTlZBTElEKFwiQXR0cmlidXRlRGF0YVR5cGVcIikpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBpbml0V2hlbkNyZWF0ZSh2c1NvdXJjZTpzdHJpbmcsIGZzU291cmNlOnN0cmluZyl7XG4gICAgICAgICAgICB2YXIgZ2wgPSBEaXJlY3Rvci5nZXRJbnN0YW5jZSgpLmdsLFxuICAgICAgICAgICAgICAgIHZzID0gbnVsbCxcbiAgICAgICAgICAgICAgICBmcyA9IG51bGw7XG5cbiAgICAgICAgICAgIHZzID0gU2hhZGVyLmNyZWF0ZVNoYWRlcih2c1NvdXJjZSwgU2hhZGVyVHlwZS5WUyk7XG4gICAgICAgICAgICBmcyA9IFNoYWRlci5jcmVhdGVTaGFkZXIoZnNTb3VyY2UsIFNoYWRlclR5cGUuRlMpO1xuXG4gICAgICAgICAgICAvLyDlkJHnqIvluo/lr7nosaHph4zliIbphY3nnYDoibLlmahcbiAgICAgICAgICAgIGdsLmF0dGFjaFNoYWRlcih0aGlzLl9wcm9ncmFtLCB2cyk7XG4gICAgICAgICAgICBnbC5hdHRhY2hTaGFkZXIodGhpcy5fcHJvZ3JhbSwgZnMpO1xuXG5cbiAgICAgICAgICAgIC8qIVxuICAgICAgICAgICAgaWYgYm93ZXIgd2FybjpcIkF0dHJpYnV0ZSAwIGlzIGRpc2FibGVkLiBUaGlzIGhhcyBzaWduaWZpY2FudCBwZXJmb3JtYW5jZSBwZW5hbHR5XCIsXG4gICAgICAgICAgICB0aGVuIGRvIHRoaXMgYmVmb3JlIGxpbmtQcm9ncmFtOlxuICAgICAgICAgICAgIGdsLmJpbmRBdHRyaWJMb2NhdGlvbiggdGhpcy5fcHJvZ3JhbSwgMCwgXCJhX3Bvc2l0aW9uXCIpO1xuXG5cblxuICAgICAgICAgICAgIGNhbiByZWZlcmVuY2UgaGVyZTpcbiAgICAgICAgICAgICBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzIwMzA1MjMxL3dlYmdsLXdhcm5pbmctYXR0cmlidXRlLTAtaXMtZGlzYWJsZWQtdGhpcy1oYXMtc2lnbmlmaWNhbnQtcGVyZm9ybWFuY2UtcGVuYWx0P2Fuc3dlcnRhYj12b3RlcyN0YWItdG9wXG5cblxuICAgICAgICAgICAgIE9wZW5HTCByZXF1aXJlcyBhdHRyaWJ1dGUgemVybyB0byBiZSBlbmFibGVkIG90aGVyd2lzZSBpdCB3aWxsIG5vdCByZW5kZXIgYW55dGhpbmcuXG4gICAgICAgICAgICAgT24gdGhlIG90aGVyIGhhbmQgT3BlbkdMIEVTIDIuMCBvbiB3aGljaCBXZWJHTCBpcyBiYXNlZCBkb2VzIG5vdC4gU28sIHRvIGVtdWxhdGUgT3BlbkdMIEVTIDIuMCBvbiB0b3Agb2YgT3BlbkdMIGlmIHlvdSBkb24ndCBlbmFibGUgYXR0cmlidXRlIDAgdGhlIGJyb3dzZXIgaGFzIHRvIG1ha2UgYSBidWZmZXIgZm9yIHlvdSBsYXJnZSBlbm91Z2ggZm9yIHRoZSBudW1iZXIgb2YgdmVydGljZXMgeW91J3ZlIHJlcXVlc3RlZCB0byBiZSBkcmF3biwgZmlsbCBpdCB3aXRoIHRoZSBjb3JyZWN0IHZhbHVlIChzZWUgZ2wudmVydGV4QXR0cmliKSxcbiAgICAgICAgICAgICAgYXR0YWNoIGl0IHRvIGF0dHJpYnV0ZSB6ZXJvLCBhbmQgZW5hYmxlIGl0LlxuXG4gICAgICAgICAgICAgSXQgZG9lcyBhbGwgdGhpcyBiZWhpbmQgdGhlIHNjZW5lcyBidXQgaXQncyBpbXBvcnRhbnQgZm9yIHlvdSB0byBrbm93IHRoYXQgaXQgdGFrZXMgdGltZSB0byBjcmVhdGUgYW5kIGZpbGwgdGhhdCBidWZmZXIuIFRoZXJlIGFyZSBvcHRpbWl6YXRpb25zIHRoZSBicm93c2VyIGNhbiBtYWtlIGJ1dCBpbiB0aGUgZ2VuZXJhbCBjYXNlLFxuICAgICAgICAgICAgIGlmIHlvdSB3ZXJlIHRvIGFzc3VtZSB5b3Ugd2VyZSBydW5uaW5nIG9uIE9wZW5HTCBFUyAyLjAgYW5kIHVzZWQgYXR0cmlidXRlIHplcm8gYXMgYSBjb25zdGFudCBsaWtlIHlvdSBhcmUgc3VwcG9zZWQgdG8gYmUgYWJsZSB0byBkbywgd2l0aG91dCB0aGUgd2FybmluZyB5b3UnZCBoYXZlIG5vIGlkZWEgb2YgdGhlIHdvcmsgdGhlIGJyb3dzZXIgaXMgZG9pbmcgb24geW91ciBiZWhhbGYgdG8gZW11bGF0ZSB0aGF0IGZlYXR1cmUgb2YgT3BlbkdMIEVTIDIuMCB0aGF0IGlzIGRpZmZlcmVudCBmcm9tIE9wZW5HTC5cblxuICAgICAgICAgICAgIEluIHlvdXIgcGFydGljdWxhciBjYXNlIHRoZSB3YXJuaW5nIGRvZXNuJ3QgaGF2ZSBtdWNoIG1lYW5pbmcuIEl0IGxvb2tzIGxpa2UgeW91IGFyZSBvbmx5IGRyYXdpbmcgYSBzaW5nbGUgcG9pbnQuIEJ1dCBpdCB3b3VsZCBub3QgYmUgZWFzeSBmb3IgdGhlIGJyb3dzZXIgdG8gZmlndXJlIHRoYXQgb3V0IHNvIGl0IGp1c3Qgd2FybnMgeW91IGFueXRpbWUgeW91IGRyYXcgYW5kIGF0dHJpYnV0ZSAwIGlzIG5vdCBlbmFibGVkLlxuXG5cbiAgICAgICAgICAgICBodHRwczovL2dpdGh1Yi5jb20vbXJkb29iL3RocmVlLmpzL2lzc3Vlcy8zODk2XG4gICAgICAgICAgICAgKi9cblxuXG4gICAgICAgICAgICAvLyDlsIbnnYDoibLlmajov57mjqVcbiAgICAgICAgICAgIGdsLmxpbmtQcm9ncmFtKHRoaXMuX3Byb2dyYW0pO1xuXG4gICAgICAgICAgICAvLyDliKTmlq3nnYDoibLlmajnmoTov57mjqXmmK/lkKbmiJDlip9cbiAgICAgICAgICAgIGlmKGdsLmdldFByb2dyYW1QYXJhbWV0ZXIodGhpcy5fcHJvZ3JhbSwgZ2wuTElOS19TVEFUVVMpKXtcblxuICAgICAgICAgICAgICAgIC8vIOi/lOWbnueoi+W6j+WvueixoVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9wcm9ncmFtO1xuICAgICAgICAgICAgfWVsc2V7XG5cbiAgICAgICAgICAgICAgICAvLyDlpoLmnpzlpLHotKXvvIzlvLnlh7rplJnor6/kv6Hmga9cbiAgICAgICAgICAgICAgICBhbGVydChnbC5nZXRQcm9ncmFtSW5mb0xvZyh0aGlzLl9wcm9ncmFtKSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kZWZpbml0aW9ucy5kLnRzXCIvPlxubW9kdWxlIEVuZ2luZTNEe1xuICAgIGV4cG9ydCBjbGFzcyBRdWFkQ29tbWFuZHtcbiAgICAgICAgcHVibGljIHN0YXRpYyBjcmVhdGUoKTpRdWFkQ29tbWFuZCB7XG4gICAgICAgICAgICB2YXIgb2JqID0gbmV3IHRoaXMoKTtcblxuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2J1ZmZlcnM6ZHlDYi5IYXNoID0gZHlDYi5IYXNoLmNyZWF0ZSgpO1xuICAgICAgICBnZXQgYnVmZmVycygpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2J1ZmZlcnM7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IGJ1ZmZlcnMoYnVmZmVyczphbnkpe1xuICAgICAgICAgICAgdmFyIGkgPSBudWxsO1xuXG4gICAgICAgICAgICBmb3IoaSBpbiBidWZmZXJzKXtcbiAgICAgICAgICAgICAgICBpZihidWZmZXJzLmhhc093blByb3BlcnR5KGkpKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnVmZmVycy5hZGRDaGlsZChpLCBidWZmZXJzW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9jb2xvcjpDb2xvciA9IG51bGw7XG4gICAgICAgIGdldCBjb2xvcigpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbG9yO1xuICAgICAgICB9XG4gICAgICAgIHNldCBjb2xvcihjb2xvcjpDb2xvcil7XG4gICAgICAgICAgICB0aGlzLl9jb2xvciA9IGNvbG9yO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfZHJhd01vZGU6RHJhd01vZGUgPSBEcmF3TW9kZS5UUklBTkdMRVM7XG4gICAgICAgIGdldCBkcmF3TW9kZSgpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RyYXdNb2RlO1xuICAgICAgICB9XG4gICAgICAgIHNldCBkcmF3TW9kZShkcmF3TW9kZTpEcmF3TW9kZSl7XG4gICAgICAgICAgICB0aGlzLl9kcmF3TW9kZSA9IGRyYXdNb2RlO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGV4ZWN1dGUoc2NlbmU6U2NlbmUpe1xuICAgICAgICAgICAgdGhpcy5fc2VuZERhdGEoc2NlbmUucHJvZ3JhbSk7XG5cbiAgICAgICAgICAgIHRoaXMuX2RyYXcoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBpbml0KCl7XG4gICAgICAgICAgICAvL3RoaXMuX2luaXRCdWZmZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vcHJpdmF0ZSBfaW5pdEJ1ZmZlcigpe1xuICAgICAgICAvLyAgICB0aGlzLl9idWZmZXJzLmFkZENoaWxkKFwidmVydGV4QnVmZmVyXCIsXG4gICAgICAgIC8vICAgICAgICB0aGlzLl9idWZmZXJEYXRhLnZlcnRpY2VzPyBBcnJheUJ1ZmZlci5jcmVhdGUodGhpcy5fYnVmZmVyRGF0YS52ZXJ0aWNlcywgMywgQnVmZmVyVHlwZS5GTE9BVCkgOiBudWxsXG4gICAgICAgIC8vICAgICk7XG4gICAgICAgIC8vICAgIHRoaXMuX2J1ZmZlcnMuYWRkQ2hpbGQoXCJ0ZXhDb29yZEJ1ZmZlclwiLFxuICAgICAgICAvLyAgICAgICAgdGhpcy5fYnVmZmVyRGF0YS50ZXhDb29yZHM/IEFycmF5QnVmZmVyLmNyZWF0ZSh0aGlzLl9idWZmZXJEYXRhLnRleENvb3JkcywgMiwgQnVmZmVyVHlwZS5GTE9BVCkgOiBudWxsXG4gICAgICAgIC8vICAgICk7XG4gICAgICAgIC8vICAgIHRoaXMuX2J1ZmZlcnMuYWRkQ2hpbGQoXCJub3JtYWxCdWZmZXJcIixcbiAgICAgICAgLy8gICAgICAgIHRoaXMuX2J1ZmZlckRhdGEubm9ybWFscz8gQXJyYXlCdWZmZXIuY3JlYXRlKHRoaXMuX2J1ZmZlckRhdGEubm9ybWFscywgMywgQnVmZmVyVHlwZS5GTE9BVCkgOiBudWxsXG4gICAgICAgIC8vICAgICk7XG4gICAgICAgIC8vICAgIHRoaXMuX2J1ZmZlcnMuYWRkQ2hpbGQoXCJpbmRleEJ1ZmZlclwiLFxuICAgICAgICAvLyAgICAgICAgdGhpcy5fYnVmZmVyRGF0YS5pbmRpY2VzPyBFbGVtZW50QnVmZmVyLmNyZWF0ZSh0aGlzLl9idWZmZXJEYXRhLmluZGljZXMsIEJ1ZmZlclR5cGUuVU5TSUdORURfU0hPUlQpIDogbnVsbFxuICAgICAgICAvLyAgICApO1xuICAgICAgICAvLyAgICB0aGlzLl9idWZmZXJzLmFkZENoaWxkKFwiY29sb3JCdWZmZXJcIixcbiAgICAgICAgLy8gICAgICAgIHRoaXMuX2J1ZmZlckRhdGEuY29sb3JzPyBBcnJheUJ1ZmZlci5jcmVhdGUodGhpcy5fYnVmZmVyRGF0YS5jb2xvcnMsIDMsIEJ1ZmZlclR5cGUuRkxPQVQpIDogbnVsbFxuICAgICAgICAvLyAgICApO1xuICAgICAgICAvL31cblxuICAgICAgICBwcml2YXRlIF9zZW5kRGF0YShwcm9ncmFtOlByb2dyYW0pe1xuICAgICAgICAgICAgaWYodGhpcy5fYnVmZmVycy5oYXNDaGlsZChcInZlcnRleEJ1ZmZlclwiKSl7XG4gICAgICAgICAgICAgICAgcHJvZ3JhbS5zZXRBdHRyaWJ1dGVEYXRhKFwiYV9wb3NpdGlvblwiLCBBdHRyaWJ1dGVEYXRhVHlwZS5CVUZGRVIsIHRoaXMuX2J1ZmZlcnMuZ2V0Q2hpbGQoXCJ2ZXJ0ZXhCdWZmZXJcIikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBkeUNiLkxvZy5lcnJvcih0cnVlLCBkeUNiLkxvZy5pbmZvLkZVTkNfTVVTVChcImhhcyB2ZXJ0ZXhCdWZmZXJcIikpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL2lmKHRoaXMuY29sb3Ipe1xuICAgICAgICAgICAgICAgIC8qIVxuICAgICAgICAgICAgICAgIHRoaXMgY2F1c2Ugd2FybjpcIlBFUkZPUk1BTkNFIFdBUk5JTkc6IEF0dHJpYnV0ZSAwIGlzIGRpc2FibGVkLiBUaGlzIGhhcyBzaWduZmljYW50IHBlcmZvcm1hbmNlIHBlbmFsdHlcIiBoZXJlP1xuICAgICAgICAgICAgICAgIGJlY2F1c2UgYV9jb2xvcidwb3MgaXMgMCwgYW5kIGl0IHNob3VsZCBiZSBhcnJheSBkYXRhKGxpa2UgRmxvYXQzMkFycmF5KVxuICAgICAgICAgICAgICAgIHJlZmVyIHRvOiBodHRwczovL3d3dy5raHJvbm9zLm9yZy93ZWJnbC93aWtpL1dlYkdMX2FuZF9PcGVuR0xfRGlmZmVyZW5jZXMjVmVydGV4X0F0dHJpYnV0ZV8wXG4gICAgICAgICAgICAgICAgKi9cblxuXG4gICAgICAgICAgICAgICAgcHJvZ3JhbS5zZXRBdHRyaWJ1dGVEYXRhKFwiYV9jb2xvclwiLCBBdHRyaWJ1dGVEYXRhVHlwZS5CVUZGRVIsIHRoaXMuX2J1ZmZlcnMuZ2V0Q2hpbGQoXCJjb2xvckJ1ZmZlclwiKSk7XG4gICAgICAgICAgICAvL31cbiAgICAgICAgfVxuXG5cbiAgICAgICAgcHJpdmF0ZSBfZHJhdygpe1xuICAgICAgICAgICAgdmFyIHRvdGFsTnVtID0gMCxcbiAgICAgICAgICAgICAgICBzdGFydE9mZnNldCA9IDAsXG4gICAgICAgICAgICAgICAgdmVydGV4QnVmZmVyID0gdGhpcy5fYnVmZmVycy5nZXRDaGlsZChcInZlcnRleEJ1ZmZlclwiKSxcbiAgICAgICAgICAgICAgICBnbCA9IERpcmVjdG9yLmdldEluc3RhbmNlKCkuZ2w7XG5cblxuICAgICAgICAgICAgaWYgKHRoaXMuX2J1ZmZlcnMuaGFzQ2hpbGQoXCJpbmRleEJ1ZmZlclwiKSkge1xuICAgICAgICAgICAgICAgIGxldCBpbmRleEJ1ZmZlciA9IHRoaXMuX2J1ZmZlcnMuZ2V0Q2hpbGQoXCJpbmRleEJ1ZmZlclwiKTtcbiAgICAgICAgICAgICAgICB0b3RhbE51bSA9IGluZGV4QnVmZmVyLm51bTtcblxuICAgICAgICAgICAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB2ZXJ0ZXhCdWZmZXIuYnVmZmVyKTtcbiAgICAgICAgICAgICAgICBnbC5iaW5kQnVmZmVyKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBpbmRleEJ1ZmZlci5idWZmZXIpO1xuICAgICAgICAgICAgICAgIGdsLmRyYXdFbGVtZW50cyhnbFt0aGlzLl9kcmF3TW9kZV0sIHRvdGFsTnVtLCBpbmRleEJ1ZmZlci50eXBlLCBpbmRleEJ1ZmZlci50eXBlU2l6ZSAqIHN0YXJ0T2Zmc2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRvdGFsTnVtID0gdmVydGV4QnVmZmVyLm51bTtcbiAgICAgICAgICAgICAgICBnbC5kcmF3QXJyYXlzKGdsW3RoaXMuX2RyYXdNb2RlXSwgc3RhcnRPZmZzZXQsIHRvdGFsTnVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kZWZpbml0aW9ucy5kLnRzXCIvPlxubW9kdWxlIEVuZ2luZTNEe1xuICAgIGV4cG9ydCBjbGFzcyBXZWJHTFJlbmRlcmVye1xuICAgICAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZSgpOldlYkdMUmVuZGVyZXIge1xuICAgICAgICAgICAgdmFyIG9iaiA9IG5ldyB0aGlzKCk7XG5cbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9jb21tYW5kUXVldWU6ZHlDYi5Db2xsZWN0aW9uID0gZHlDYi5Db2xsZWN0aW9uLmNyZWF0ZSgpO1xuICAgICAgICBwcml2YXRlIF9jbGVhckNvbG9yOkNvbG9yID0gQ29sb3IuY3JlYXRlKFwiIzAwMDAwMFwiKTtcbiAgICAgICAgcHJpdmF0ZSBfY2xlYXJBbHBoYTpudW1iZXIgPSAxLjA7XG5cbiAgICAgICAgcHVibGljIGNyZWF0ZVF1YWRDb21tYW5kKCk6UXVhZENvbW1hbmR7XG4gICAgICAgICAgICByZXR1cm4gUXVhZENvbW1hbmQuY3JlYXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgYWRkQ29tbWFuZChjb21tYW5kOlF1YWRDb21tYW5kKXtcbiAgICAgICAgICAgIGlmKHRoaXMuX2NvbW1hbmRRdWV1ZS5oYXNDaGlsZChjb21tYW5kKSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb21tYW5kLmluaXQoKTtcbiAgICAgICAgICAgIHRoaXMuX2NvbW1hbmRRdWV1ZS5hZGRDaGlsZChjb21tYW5kKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyByZW5kZXIoc2NlbmU6U2NlbmUpe1xuICAgICAgICAgICAgdGhpcy5fY29tbWFuZFF1ZXVlLmZvckVhY2goKGNvbW1hbmQpID0+IHtcbiAgICAgICAgICAgICAgICBjb21tYW5kLmV4ZWN1dGUoc2NlbmUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuX2NsZWFyQ29tbWFuZCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGluaXQoKXtcbiAgICAgICAgICAgIERpcmVjdG9yLmdldEluc3RhbmNlKCkuZ2wuY2xlYXJDb2xvcih0aGlzLl9jbGVhckNvbG9yLnIsIHRoaXMuX2NsZWFyQ29sb3IuZywgdGhpcy5fY2xlYXJDb2xvci5iLCB0aGlzLl9jbGVhckFscGhhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzZXRDbGVhckNvbG9yKGNvbG9yOkNvbG9yLCBhbHBoYTpudW1iZXIgPSAxLjApe1xuICAgICAgICAgICAgdGhpcy5fY2xlYXJDb2xvciA9IGNvbG9yO1xuICAgICAgICAgICAgdGhpcy5fY2xlYXJBbHBoYSA9IGFscGhhO1xuICAgICAgICAgICAgRGlyZWN0b3IuZ2V0SW5zdGFuY2UoKS5nbC5jbGVhckNvbG9yKHRoaXMuX2NsZWFyQ29sb3IuciwgdGhpcy5fY2xlYXJDb2xvci5nLCB0aGlzLl9jbGVhckNvbG9yLmcsIHRoaXMuX2NsZWFyQWxwaGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfY2xlYXJDb21tYW5kKCl7XG4gICAgICAgICAgICB0aGlzLl9jb21tYW5kUXVldWUucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kZWZpbml0aW9ucy5kLnRzXCIvPlxubW9kdWxlIEVuZ2luZTNEIHtcbiAgICBleHBvcnQgY2xhc3MgTWVzaE1hdGVyaWFsIHtcbiAgICAgICAgcHVibGljIHN0YXRpYyBjcmVhdGUocGFyYW1zKSB7XG4gICAgICAgICAgICB2YXIgb2JqID0gbmV3IHRoaXMocGFyYW1zKTtcblxuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2NvbG9yOkNvbG9yID0gbnVsbDtcbiAgICAgICAgZ2V0IGNvbG9yKCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29sb3I7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IGNvbG9yKGNvbG9yOkNvbG9yKXtcbiAgICAgICAgICAgIHRoaXMuX2NvbG9yID0gY29sb3I7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdHJ1Y3RvcihwYXJhbXMpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbG9yID0gQ29sb3IuY3JlYXRlKHBhcmFtcy5jb2xvciB8fCBcIjB4ZmZmZmZmXCIpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RlZmluaXRpb25zLmQudHNcIi8+XG5tb2R1bGUgRW5naW5lM0R7XG4gICAgZXhwb3J0IGNsYXNzIEdMU0xMb2FkZXJ7XG4gICAgICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTpHTFNMTG9hZGVyID0gbnVsbDtcblxuICAgICAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2luc3RhbmNlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UgPSBuZXcgdGhpcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfY29udGFpbmVyOmR5Q2IuSGFzaCA9IGR5Q2IuSGFzaC5jcmVhdGUoKTtcblxuICAgICAgICBwdWJsaWMgbG9hZCh1cmw6c3RyaW5nLCBpZDpzdHJpbmcpe1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgICAgICBpZih0aGlzLl9jb250YWluZXIuZ2V0Q2hpbGQoaWQpKXtcbiAgICAgICAgICAgICAgICBMb2FkZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkub25SZXNMb2FkZWQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBkeVJ0LmZyb21Qcm9taXNlKHRoaXMuX2xvYWRUZXh0KHVybCkpLmRvKGZ1bmN0aW9uKGRhdGEpe1xuICAgICAgICAgICAgICAgIExvYWRlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5vblJlc0xvYWRlZCgpO1xuICAgICAgICAgICAgICAgIHNlbGYuX2NvbnRhaW5lci5hZGRDaGlsZChpZCwgZGF0YSk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpe1xuICAgICAgICAgICAgICAgIExvYWRlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5vblJlc0Vycm9yKHVybCwgZXJyKTtcbiAgICAgICAgICAgIH0sIG51bGwpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGdldEdMU0woaWQ6c3RyaW5nKTpzdHJpbmd7XG4gICAgICAgICAgIHJldHVybiB0aGlzLl9jb250YWluZXIuZ2V0Q2hpbGQoaWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfbG9hZFRleHQodXJsKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFJTVlAuUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICBkeUNiLkFqYXhVdGlscy5hamF4KHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJnZXRcIixcbiAgICAgICAgICAgICAgICAgICAgLy9hc3luYzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcInRleHQvcGxhaW47IGNoYXJzZXQ9dXRmLThcIixcbiAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAvL2NhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoWE1MSHR0cFJlcXVlc3QsIGVycm9yVGhyb3duKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoXCJ1cmw6XCIgKyB1cmwgKyBcIlxcbnJlYWR5U3RhdGU6XCIgKyBYTUxIdHRwUmVxdWVzdC5yZWFkeVN0YXRlICsgXCJcXG5zdGF0dXM6XCIgKyBYTUxIdHRwUmVxdWVzdC5zdGF0dXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiXFxubWVzc2FnZTpcIiArIGVycm9yVGhyb3duLm1lc3NhZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiXFxucmVzcG9uc2VUZXh0OlwiICsgWE1MSHR0cFJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZGVmaW5pdGlvbnMuZC50c1wiLz5cbm1vZHVsZSBFbmdpbmUzRHtcbiAgICBleHBvcnQgY2xhc3MgTG9hZGVyTWFuYWdlcntcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOkxvYWRlck1hbmFnZXIgPSBudWxsO1xuXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5faW5zdGFuY2UgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9pbnN0YW5jZSA9IG5ldyB0aGlzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9yZXNDb3VudDpudW1iZXIgPSAwO1xuICAgICAgICBwcml2YXRlIF9jdXJyZW50TG9hZGVkQ291bnQ6bnVtYmVyID0gMDtcblxuICAgICAgICAvL2hvb2tcbiAgICAgICAgcHVibGljIG9ubG9hZDpGdW5jdGlvbjtcbiAgICAgICAgcHVibGljIG9ubG9hZGluZzpGdW5jdGlvbjtcblxuICAgICAgICBwdWJsaWMgZ2V0UmVzb3VyY2VDb3VudCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZXNDb3VudDtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBnZXRDdXJyZW50TG9hZGVkQ291bnQoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudExvYWRlZENvdW50O1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGxvYWQocmVzb3VyY2VzQXJyOkFycmF5PHt1cmw6c3RyaW5nOyBpZDpzdHJpbmd9Pikge1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gZHlSdC5mcm9tQXJyYXkocmVzb3VyY2VzQXJyKS5mbGF0TWFwKGZ1bmN0aW9uKHJlcyl7XG4gICAgICAgICAgICAgICAgc2VsZi5fcmVzQ291bnQrKztcblxuICAgICAgICAgICAgICAgIHJldHVybiBHTFNMTG9hZGVyLmdldEluc3RhbmNlKCkubG9hZChyZXMudXJsLCByZXMuaWQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgcmVzZXQoKSB7XG4gICAgICAgICAgICB0aGlzLl9yZXNDb3VudCA9IDA7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50TG9hZGVkQ291bnQgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIG9uUmVzTG9hZGVkKCkge1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudExvYWRlZENvdW50ICs9IDE7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgb25SZXNFcnJvcihwYXRoLCBlcnIpIHtcbiAgICAgICAgICAgIGR5Q2IuTG9nLmxvZyhcIuWKoOi9vVwiICsgcGF0aCArIFwi6LWE5rqQ5aSx6LSlXCIpO1xuICAgICAgICAgICAgaWYoZXJyKXtcbiAgICAgICAgICAgICAgICBkeUNiLkxvZy5sb2coZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2lzRmluaXNoTG9hZCgpIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICAgICAgaWYgKHRoaXMuZ2V0Q3VycmVudExvYWRlZENvdW50KCkgPT09IHRoaXMuZ2V0UmVzb3VyY2VDb3VudCgpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub25sb2FkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25sb2FkKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkeUNiLkxvZy5hc3NlcnQoZmFsc2UsIFwi5rKh5pyJ5a6a5LmJb25sb2FkXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9ubG9hZGluZykge1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYub25sb2FkaW5nKHNlbGYuZ2V0Q3VycmVudExvYWRlZENvdW50KCksIHNlbGYuZ2V0UmVzb3VyY2VDb3VudCgpKVxuICAgICAgICAgICAgICAgICAgICB9LCAxNik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLl9pc0ZpbmlzaExvYWQuY2FsbChzZWxmKTtcbiAgICAgICAgICAgICAgICB9LCAxNik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZGVmaW5pdGlvbnMuZC50c1wiLz5cbm1vZHVsZSBFbmdpbmUzRHtcbiAgICBleHBvcnQgY2xhc3MgR2VvbWV0cnl7XG4gICAgICAgIHByaXZhdGUgX3ZlcnRpY2VzOkFycmF5QnVmZmVyID0gbnVsbDtcbiAgICAgICAgZ2V0IHZlcnRpY2VzKCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdmVydGljZXM7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IHZlcnRpY2VzKHZlcnRpY2VzOkFycmF5QnVmZmVyKXtcbiAgICAgICAgICAgIHRoaXMuX3ZlcnRpY2VzID0gdmVydGljZXM7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9pbmRpY2VzOkVsZW1lbnRCdWZmZXIgPSBudWxsO1xuICAgICAgICBnZXQgaW5kaWNlcygpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2luZGljZXM7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IGluZGljZXMoaW5kaWNlczpFbGVtZW50QnVmZmVyKXtcbiAgICAgICAgICAgIHRoaXMuX2luZGljZXMgPSBpbmRpY2VzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfY29sb3JzOkFycmF5QnVmZmVyID0gbnVsbDtcbiAgICAgICAgZ2V0IGNvbG9ycygpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbG9ycztcbiAgICAgICAgfVxuICAgICAgICBzZXQgY29sb3JzKGNvbG9yczpBcnJheUJ1ZmZlcil7XG4gICAgICAgICAgICB0aGlzLl9jb2xvcnMgPSBjb2xvcnM7XG4gICAgICAgIH1cblxuICAgICAgICBwcm90ZWN0ZWQgbWF0ZXJpYWw6TWVzaE1hdGVyaWFsID0gbnVsbDtcblxuICAgICAgICBjb25zdHJ1Y3RvcihtYXRlcmlhbCl7XG4gICAgICAgICAgICB0aGlzLm1hdGVyaWFsID0gbWF0ZXJpYWw7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgaW5pdFdoZW5DcmVhdGUoKXtcbiAgICAgICAgICAgIHRoaXMuX3ZlcnRpY2VzID0gdGhpcy5jb21wdXRlVmVydGljZXNCdWZmZXIoKTtcbiAgICAgICAgICAgIHRoaXMuX2luZGljZXMgPSB0aGlzLmNvbXB1dGVJbmRpY2VzQnVmZmVyKCk7XG4gICAgICAgICAgICAvL3RoaXMuX25vcm1hbHMgPSB0aGlzLl9jb21wdXRlTm9ybWFscygpO1xuICAgICAgICAgICAgLy90aGlzLl90ZXhDb29yZHMgPSB0aGlzLl9jb21wdXRlVGV4Q29vcmRzKCk7XG4gICAgICAgICAgICB0aGlzLl9jb2xvcnMgPSB0aGlzLl9jb21wdXRlQ29sb3JzQnVmZmVyKHRoaXMubWF0ZXJpYWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJvdGVjdGVkIGNvbXB1dGVWZXJ0aWNlc0J1ZmZlcigpOkFycmF5QnVmZmVye1xuICAgICAgICAgICAgcmV0dXJuIGR5Q2IuTG9nLmVycm9yKHRydWUsIGR5Q2IuTG9nLmluZm8uQUJTVFJBQ1RfTUVUSE9EKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByb3RlY3RlZCBjb21wdXRlSW5kaWNlc0J1ZmZlcigpOkVsZW1lbnRCdWZmZXJ7XG4gICAgICAgICAgICByZXR1cm4gZHlDYi5Mb2cuZXJyb3IodHJ1ZSwgZHlDYi5Mb2cuaW5mby5BQlNUUkFDVF9NRVRIT0QpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfY29tcHV0ZUNvbG9yc0J1ZmZlcihtYXRlcmlhbDpNZXNoTWF0ZXJpYWwpe1xuICAgICAgICAgICAgdmFyIGFyciA9IFtdLFxuICAgICAgICAgICAgICAgIGNvbG9yID0gbWF0ZXJpYWwuY29sb3IsXG4gICAgICAgICAgICAgICAgaSA9IDAsXG4gICAgICAgICAgICAgICAgbGVuID0gdGhpcy5fdmVydGljZXMuY291bnQ7XG5cbiAgICAgICAgICAgIGZvcihpID0gMDsgaSA8IGxlbjsgaSsrKXtcbiAgICAgICAgICAgICAgICBhcnIucHVzaCggY29sb3IuciwgY29sb3IuZywgY29sb3IuYiwgMS4wKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIEFycmF5QnVmZmVyLmNyZWF0ZShuZXcgRmxvYXQzMkFycmF5KGFyciksIDQsIEJ1ZmZlclR5cGUuRkxPQVQpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZGVmaW5pdGlvbnMuZC50c1wiLz5cbm1vZHVsZSBFbmdpbmUzRHtcbiAgICBleHBvcnQgY2xhc3MgQm94R2VvbWV0cnkgZXh0ZW5kcyBHZW9tZXRyeXtcbiAgICAgICAgcHVibGljIHN0YXRpYyBjcmVhdGUod2lkdGg6bnVtYmVyLCBoZWlnaHQ6bnVtYmVyLCBkZXB0aDpudW1iZXIsIG1hdGVyaWFsOk1lc2hNYXRlcmlhbCk6Qm94R2VvbWV0cnkge1xuICAgICAgICAgICAgdmFyIGdlb20gPSBuZXcgdGhpcyh3aWR0aCwgaGVpZ2h0LCBkZXB0aCwgbWF0ZXJpYWwpO1xuXG4gICAgICAgICAgICBnZW9tLmluaXRXaGVuQ3JlYXRlKCk7XG5cbiAgICAgICAgICAgIHJldHVybiBnZW9tO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfd2lkdGg6bnVtYmVyID0gbnVsbDtcbiAgICAgICAgcHJpdmF0ZSBfaGVpZ2h0Om51bWJlciA9IG51bGw7XG4gICAgICAgIHByaXZhdGUgX2RlcHRoOm51bWJlciA9IG51bGw7XG5cbiAgICAgICAgY29uc3RydWN0b3Iod2lkdGg6bnVtYmVyLCBoZWlnaHQ6bnVtYmVyLCBkZXB0aDpudW1iZXIsIG1hdGVyaWFsOk1lc2hNYXRlcmlhbCl7XG4gICAgICAgICAgICBzdXBlcihtYXRlcmlhbCk7XG5cbiAgICAgICAgICAgIHRoaXMuX3dpZHRoID0gd2lkdGg7XG4gICAgICAgICAgICB0aGlzLl9oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgICAgICB0aGlzLl9kZXB0aCA9IGRlcHRoO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJvdGVjdGVkIGNvbXB1dGVWZXJ0aWNlc0J1ZmZlcigpe1xuICAgICAgICAgICAgdmFyIHdpZHRoID0gdGhpcy5fd2lkdGgsXG4gICAgICAgICAgICAgICAgaGVpZ2h0ID0gdGhpcy5faGVpZ2h0LFxuICAgICAgICAgICAgICAgIGRlcHRoID0gdGhpcy5fZGVwdGgsXG4gICAgICAgICAgICAgICAgbGVmdCA9IC13aWR0aCAvIDIsXG4gICAgICAgICAgICAgICAgcmlnaHQgPSB3aWR0aCAvIDIsXG4gICAgICAgICAgICAgICAgdXAgPSBoZWlnaHQgLyAyLFxuICAgICAgICAgICAgICAgIGRvd24gPSAtaGVpZ2h0IC8gMixcbiAgICAgICAgICAgICAgICBmcm9udCA9IGRlcHRoIC8gMixcbiAgICAgICAgICAgICAgICBiYWNrID0gLWRlcHRoIC8yO1xuXG4gICAgICAgICAgICByZXR1cm4gQXJyYXlCdWZmZXIuY3JlYXRlKG5ldyBGbG9hdDMyQXJyYXkoW1xuICAgICAgICAgICAgICAgICAgICByaWdodCwgdXAsIGZyb250LCBsZWZ0LCB1cCwgZnJvbnQsICBsZWZ0LCBkb3duLCBmcm9udCwgIHJpZ2h0LCBkb3duLCBmcm9udCwgIC8vIHYwLXYxLXYyLXYzIGZyb250XG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0LCB1cCwgZnJvbnQsICByaWdodCwgZG93biwgZnJvbnQsICByaWdodCwgZG93biwgYmFjaywgIHJpZ2h0LCB1cCwgYmFjaywgIC8vIHYwLXYzLXY0LXY1IHJpZ2h0XG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0LCB1cCwgZnJvbnQsICByaWdodCwgdXAsIGJhY2ssICBsZWZ0LCB1cCwgYmFjaywgIGxlZnQsIHVwLCBmcm9udCwgIC8vIHYwLXY1LXY2LXYxIHVwXG4gICAgICAgICAgICAgICAgICAgIGxlZnQsIHVwLCBmcm9udCwgIGxlZnQsIHVwLCBiYWNrLCAgbGVmdCwgZG93biwgYmFjaywgIGxlZnQsIGRvd24sIGZyb250LCAgLy8gdjEtdjYtdjctdjIgbGVmdFxuICAgICAgICAgICAgICAgICAgICBsZWZ0LCBkb3duLCBiYWNrLCAgcmlnaHQsIGRvd24sIGJhY2ssICByaWdodCwgZG93biwgZnJvbnQsICBsZWZ0LCBkb3duLCBmcm9udCwgIC8vIHY3LXY0LXYzLXYyIGRvd25cbiAgICAgICAgICAgICAgICAgICAgcmlnaHQsIGRvd24sIGJhY2ssICBsZWZ0LCBkb3duLCBiYWNrLCAgbGVmdCwgdXAsIGJhY2ssICByaWdodCwgdXAsIGJhY2svLyB2NC12Ny12Ni12NSBiYWNrXG4gICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgMywgQnVmZmVyVHlwZS5GTE9BVClcbiAgICAgICAgfVxuXG4gICAgICAgIHByb3RlY3RlZCBjb21wdXRlSW5kaWNlc0J1ZmZlcigpe1xuICAgICAgICAgICAgcmV0dXJuIEVsZW1lbnRCdWZmZXIuY3JlYXRlKG5ldyBVaW50MTZBcnJheShbXG4gICAgICAgICAgICAgICAgMCwgMSwgMiwgICAwLCAyLCAzLCAgICAvLyBmcm9udFxuICAgICAgICAgICAgICAgIDQsIDUsIDYsICAgNCwgNiwgNywgICAgLy8gcmlnaHRcbiAgICAgICAgICAgICAgICA4LCA5LDEwLCAgIDgsMTAsMTEsICAgIC8vIHVwXG4gICAgICAgICAgICAgICAgMTIsMTMsMTQsICAxMiwxNCwxNSwgICAgLy8gbGVmdFxuICAgICAgICAgICAgICAgIDE2LDE3LDE4LCAgMTYsMTgsMTksICAgIC8vIGRvd25cbiAgICAgICAgICAgICAgICAyMCwyMSwyMiwgIDIwLDIyLDIzICAgICAvLyBiYWNrXG4gICAgICAgICAgICBdKSwgQnVmZmVyVHlwZS5VTlNJR05FRF9TSE9SVClcbiAgICAgICAgfVxuICAgIH1cbn1cblxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RlZmluaXRpb25zLmQudHNcIi8+XG5tb2R1bGUgRW5naW5lM0R7XG4gICAgZXhwb3J0IGNsYXNzIFJlY3RHZW9tZXRyeSBleHRlbmRzIEdlb21ldHJ5e1xuICAgICAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZSh3aWR0aDpudW1iZXIsIGhlaWdodDpudW1iZXIsIG1hdGVyaWFsOk1lc2hNYXRlcmlhbCk6UmVjdEdlb21ldHJ5IHtcbiAgICAgICAgICAgIHZhciBnZW9tID0gbmV3IHRoaXMod2lkdGgsIGhlaWdodCwgbWF0ZXJpYWwpO1xuXG4gICAgICAgICAgICBnZW9tLmluaXRXaGVuQ3JlYXRlKCk7XG5cbiAgICAgICAgICAgIHJldHVybiBnZW9tO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfd2lkdGg6bnVtYmVyID0gbnVsbDtcbiAgICAgICAgcHJpdmF0ZSBfaGVpZ2h0Om51bWJlciA9IG51bGw7XG5cbiAgICAgICAgY29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCwgbWF0ZXJpYWwpe1xuICAgICAgICAgICAgc3VwZXIobWF0ZXJpYWwpO1xuXG4gICAgICAgICAgICB0aGlzLl93aWR0aCA9IHdpZHRoO1xuICAgICAgICAgICAgdGhpcy5faGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgcHJvdGVjdGVkIGNvbXB1dGVWZXJ0aWNlc0J1ZmZlcigpe1xuICAgICAgICAgICAgdmFyIHdpZHRoID0gdGhpcy5fd2lkdGgsXG4gICAgICAgICAgICAgICAgaGVpZ2h0ID0gdGhpcy5faGVpZ2h0LFxuICAgICAgICAgICAgbGVmdCA9IC13aWR0aCAvIDIsXG4gICAgICAgICAgICAgICAgcmlnaHQgPSB3aWR0aCAvIDIsXG4gICAgICAgICAgICAgICAgdXAgPSBoZWlnaHQgLyAyLFxuICAgICAgICAgICAgICAgIGRvd24gPSAtaGVpZ2h0IC8gMjtcblxuICAgICAgICAgICAgcmV0dXJuIEFycmF5QnVmZmVyLmNyZWF0ZShuZXcgRmxvYXQzMkFycmF5KFtcbiAgICAgICAgICAgICAgICByaWdodCwgdXAsIDAsXG4gICAgICAgICAgICAgICAgbGVmdCwgdXAsIDAsXG4gICAgICAgICAgICAgICAgbGVmdCwgZG93biwgMCxcbiAgICAgICAgICAgICAgICByaWdodCwgZG93biwgMFxuICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgMywgQnVmZmVyVHlwZS5GTE9BVClcbiAgICAgICAgfVxuXG4gICAgICAgIHByb3RlY3RlZCBjb21wdXRlSW5kaWNlc0J1ZmZlcigpe1xuICAgICAgICAgICAgcmV0dXJuIEVsZW1lbnRCdWZmZXIuY3JlYXRlKG5ldyBVaW50MTZBcnJheShbXG4gICAgICAgICAgICAgICAgMCwgMSwgMiwgICAwLCAyLCAzXG4gICAgICAgICAgICBdKSwgQnVmZmVyVHlwZS5VTlNJR05FRF9TSE9SVClcbiAgICAgICAgfVxuICAgIH1cbn1cblxuIiwibW9kdWxlIEVuZ2luZTNEe1xuICAgIGV4cG9ydCBlbnVtIFNwaGVyZURyYXdNb2Rle1xuICAgICAgICBMQVRJVFVERUxPTkdUSVRVREUsXG4gICAgICAgIERFQ09NUE9TSVRJT05cbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZGVmaW5pdGlvbnMuZC50c1wiLz5cbm1vZHVsZSBFbmdpbmUzRHtcbiAgICBleHBvcnQgY2xhc3MgU3BoZXJlR2VvbWV0cnkgZXh0ZW5kcyBHZW9tZXRyeXtcbiAgICAgICAgcHVibGljIHN0YXRpYyBjcmVhdGUocmFkaXVzOm51bWJlciwgZHJhd01vZGU6U3BoZXJlRHJhd01vZGUsIHNlZ21lbnRzOm51bWJlciwgIG1hdGVyaWFsOk1lc2hNYXRlcmlhbCk6U3BoZXJlR2VvbWV0cnkge1xuICAgICAgICAgICAgdmFyIGdlb20gPSBuZXcgdGhpcyhyYWRpdXMsIGRyYXdNb2RlLCBzZWdtZW50cywgbWF0ZXJpYWwpO1xuXG4gICAgICAgICAgICBnZW9tLmluaXRXaGVuQ3JlYXRlKCk7XG5cbiAgICAgICAgICAgIHJldHVybiBnZW9tO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfcmFkaXVzOm51bWJlciA9IG51bGw7XG4gICAgICAgIHByaXZhdGUgX2RyYXdNb2RlOlNwaGVyZURyYXdNb2RlID0gbnVsbDtcbiAgICAgICAgcHJpdmF0ZSBfc2VnbWVudHM6bnVtYmVyID0gbnVsbDtcbiAgICAgICAgcHJpdmF0ZSBfZGF0YTp7XG4gICAgICAgICAgICB2ZXJ0aWNlcztcbiAgICAgICAgICAgIGluZGljZXNcbiAgICAgICAgfSA9IG51bGw7XG5cbiAgICAgICAgY29uc3RydWN0b3IocmFkaXVzOm51bWJlciwgZHJhd01vZGU6U3BoZXJlRHJhd01vZGUsIHNlZ21lbnRzOm51bWJlciwgIG1hdGVyaWFsOk1lc2hNYXRlcmlhbCl7XG4gICAgICAgICAgICBzdXBlcihtYXRlcmlhbCk7XG5cbiAgICAgICAgICAgIHRoaXMuX3JhZGl1cyA9IHJhZGl1cztcbiAgICAgICAgICAgIHRoaXMuX2RyYXdNb2RlID0gZHJhd01vZGU7XG4gICAgICAgICAgICB0aGlzLl9zZWdtZW50cyA9IHNlZ21lbnRzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGluaXRXaGVuQ3JlYXRlKCl7XG4gICAgICAgICAgICB0aGlzLl9kYXRhID0gdGhpcy5fY29tcHV0ZURhdGEodGhpcy5fcmFkaXVzLCB0aGlzLl9kcmF3TW9kZSwgdGhpcy5fc2VnbWVudHMpO1xuXG4gICAgICAgICAgICBzdXBlci5pbml0V2hlbkNyZWF0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJvdGVjdGVkIGNvbXB1dGVWZXJ0aWNlc0J1ZmZlcigpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGEudmVydGljZXM7XG4gICAgICAgIH1cblxuICAgICAgICBwcm90ZWN0ZWQgY29tcHV0ZUluZGljZXNCdWZmZXIoKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRhLmluZGljZXM7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9jb21wdXRlRGF0YShyYWRpdXM6bnVtYmVyLCBkcmF3TW9kZTpTcGhlcmVEcmF3TW9kZSwgc2VnbWVudHM6bnVtYmVyKXtcbiAgICAgICAgICAgIHZhciBkYXRhID0gbnVsbDtcblxuICAgICAgICAgICAgaWYoZHJhd01vZGUgPT09IFNwaGVyZURyYXdNb2RlLkxBVElUVURFTE9OR1RJVFVERSl7XG4gICAgICAgICAgICAgICAgZGF0YSA9IEdldERhdGFCeUxhdGl0dWRlTG9uZ3RpdHVkZS5jcmVhdGUocmFkaXVzLCBzZWdtZW50cykuZ2V0RGF0YSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihkcmF3TW9kZSA9PT0gU3BoZXJlRHJhd01vZGUuREVDT01QT1NJVElPTil7XG4gICAgICAgICAgICAgICAgZGF0YSA9IEdldERhdGFCeURlY29tcG9zaXRpb24uY3JlYXRlKHJhZGl1cywgc2VnbWVudHMpLmdldERhdGEoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGFzcyBHZXREYXRhQnlMYXRpdHVkZUxvbmd0aXR1ZGV7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHJhZGl1czpudW1iZXIsIGJhbmRzOm51bWJlcik6R2V0RGF0YUJ5TGF0aXR1ZGVMb25ndGl0dWRlIHtcbiAgICAgICAgICAgIHZhciBnZW9tID0gbmV3IHRoaXMocmFkaXVzLCBiYW5kcyk7XG5cbiAgICAgICAgICAgIHJldHVybiBnZW9tO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfdmVydGljZXM6bnVtYmVyW10gPSBbXTtcbiAgICAgICAgZ2V0IHZlcnRpY2VzKCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdmVydGljZXM7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IHZlcnRpY2VzKHZlcnRpY2VzOm51bWJlcltdKXtcbiAgICAgICAgICAgIHRoaXMuX3ZlcnRpY2VzID0gdmVydGljZXM7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9pbmRpY2VzOm51bWJlcltdID0gW107XG4gICAgICAgIGdldCBpbmRpY2VzKCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faW5kaWNlcztcbiAgICAgICAgfVxuICAgICAgICBzZXQgaW5kaWNlcyhpbmRpY2VzOm51bWJlcltdKXtcbiAgICAgICAgICAgIHRoaXMuX2luZGljZXMgPSBpbmRpY2VzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfcmFkaXVzOm51bWJlciA9IG51bGw7XG4gICAgICAgIHByaXZhdGUgX2xhdGl0dWRlQmFuZHM6bnVtYmVyID0gbnVsbDtcbiAgICAgICAgcHJpdmF0ZSBfbG9uZ2l0dWRlQmFuZHM6bnVtYmVyID0gbnVsbDtcblxuICAgICAgICBjb25zdHJ1Y3RvcihyYWRpdXMsIGJhbmRzKXtcbiAgICAgICAgICAgIHRoaXMuX3JhZGl1cyA9IHJhZGl1cztcbiAgICAgICAgICAgIHRoaXMuX2xhdGl0dWRlQmFuZHMgPSBiYW5kcztcbiAgICAgICAgICAgIHRoaXMuX2xvbmdpdHVkZUJhbmRzID0gYmFuZHM7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgZ2V0RGF0YSgpe1xuICAgICAgICAgICAgLy/nu7TluqZcbiAgICAgICAgICAgIGZvciAodmFyIGxhdE51bWJlciA9IDA7IGxhdE51bWJlciA8PSB0aGlzLl9sYXRpdHVkZUJhbmRzOyBsYXROdW1iZXIrKykge1xuICAgICAgICAgICAgICAgIHZhciB0aGV0YSA9IGxhdE51bWJlciAqIE1hdGguUEkgLyB0aGlzLl9sYXRpdHVkZUJhbmRzO1xuICAgICAgICAgICAgICAgIHZhciBzaW5UaGV0YSA9IE1hdGguc2luKHRoZXRhKTtcbiAgICAgICAgICAgICAgICB2YXIgY29zVGhldGEgPSBNYXRoLmNvcyh0aGV0YSk7XG5cbiAgICAgICAgICAgICAgICAvL+e7j+W6plxuICAgICAgICAgICAgICAgIGZvciAodmFyIGxvbmdOdW1iZXIgPSAwOyBsb25nTnVtYmVyIDw9IHRoaXMuX2xvbmdpdHVkZUJhbmRzOyBsb25nTnVtYmVyKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBoaSA9IGxvbmdOdW1iZXIgKiAyICogTWF0aC5QSSAvIHRoaXMuX2xvbmdpdHVkZUJhbmRzO1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2luUGhpID0gTWF0aC5zaW4ocGhpKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvc1BoaSA9IE1hdGguY29zKHBoaSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy92YXIgeCA9IHRoaXMuX3JhZGl1cyAqIGNvc1BoaSAqIHNpblRoZXRhICsgcG9pbnRYO1xuICAgICAgICAgICAgICAgICAgICAvL3ZhciB5ID0gdGhpcy5fcmFkaXVzICpjb3NUaGV0YSArIHBvaW50WTtcbiAgICAgICAgICAgICAgICAgICAgLy92YXIgeiA9IHRoaXMuX3JhZGl1cyAqc2luUGhpICogc2luVGhldGEgKyBwb2ludFo7XG4gICAgICAgICAgICAgICAgICAgIHZhciB4ID0gdGhpcy5fcmFkaXVzICogY29zUGhpICogc2luVGhldGE7XG4gICAgICAgICAgICAgICAgICAgIHZhciB5ID0gdGhpcy5fcmFkaXVzICpjb3NUaGV0YTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHogPSB0aGlzLl9yYWRpdXMgKnNpblBoaSAqIHNpblRoZXRhO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdSA9IDEgLSAobG9uZ051bWJlciAvIHRoaXMuX2xvbmdpdHVkZUJhbmRzKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHYgPSAxIC0gKGxhdE51bWJlciAvIHRoaXMuX2xhdGl0dWRlQmFuZHMpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vbm9ybWFscy5wdXNoKHgpO1xuICAgICAgICAgICAgICAgICAgICAvL25vcm1hbHMucHVzaCh5KTtcbiAgICAgICAgICAgICAgICAgICAgLy9ub3JtYWxzLnB1c2goeik7XG4gICAgICAgICAgICAgICAgICAgIC8vdGV4Q29vcmRzLnB1c2godSk7XG4gICAgICAgICAgICAgICAgICAgIC8vdGV4Q29vcmRzLnB1c2godik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZlcnRpY2VzLnB1c2goeCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZlcnRpY2VzLnB1c2goeSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZlcnRpY2VzLnB1c2goeik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG5cblxuICAgICAgICAgICAgLy90aGlzLl/kuIDlnIjmnInnu4/luqbngrlsb25naXR1ZGVCYW5kc+S4qlxuICAgICAgICAgICAgZm9yICh2YXIgbGF0TnVtYmVyID0gMDsgbGF0TnVtYmVyIDwgdGhpcy5fbGF0aXR1ZGVCYW5kczsgbGF0TnVtYmVyKyspIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBsb25nTnVtYmVyID0gMDsgbG9uZ051bWJlciA8IHRoaXMuX2xvbmdpdHVkZUJhbmRzOyBsb25nTnVtYmVyKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZpcnN0ID0gbGF0TnVtYmVyICogKHRoaXMuX2xvbmdpdHVkZUJhbmRzICsgMSkgKyBsb25nTnVtYmVyO1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2Vjb25kID0gZmlyc3QgKyB0aGlzLl9sb25naXR1ZGVCYW5kcyArIDE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2luZGljZXMucHVzaChmaXJzdCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2luZGljZXMucHVzaChzZWNvbmQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbmRpY2VzLnB1c2goZmlyc3QgKyAxKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbmRpY2VzLnB1c2goc2Vjb25kKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5kaWNlcy5wdXNoKHNlY29uZCArIDEpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbmRpY2VzLnB1c2goZmlyc3QgKyAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdmVydGljZXM6IEFycmF5QnVmZmVyLmNyZWF0ZShuZXcgRmxvYXQzMkFycmF5KHRoaXMuX3ZlcnRpY2VzKSxcbiAgICAgICAgICAgICAgICAgICAgMywgQnVmZmVyVHlwZS5GTE9BVCksXG4gICAgICAgICAgICAgICAgaW5kaWNlczogRWxlbWVudEJ1ZmZlci5jcmVhdGUobmV3IFVpbnQxNkFycmF5KHRoaXMuX2luZGljZXMpLFxuICAgICAgICAgICAgICAgICAgICBCdWZmZXJUeXBlLlVOU0lHTkVEX1NIT1JUKVxuICAgICAgICAgICAgICAgIC8vbm9ybWFsczogbmV3IEZsb2F0MzJBcnJheShub3JtYWxzKSxcbiAgICAgICAgICAgICAgICAvL3RleENvb3JkczogbmV3IEZsb2F0MzJBcnJheSh0ZXhDb29yZHMpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGNsYXNzIEdldERhdGFCeURlY29tcG9zaXRpb257XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHJhZGl1czpudW1iZXIsIGNvdW50Om51bWJlcik6R2V0RGF0YUJ5RGVjb21wb3NpdGlvbiB7XG4gICAgICAgICAgICB2YXIgZ2VvbSA9IG5ldyB0aGlzKHJhZGl1cywgY291bnQpO1xuXG4gICAgICAgICAgICByZXR1cm4gZ2VvbTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX3ZlcnRpY2VzOm51bWJlcltdID0gW107XG4gICAgICAgIGdldCB2ZXJ0aWNlcygpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ZlcnRpY2VzO1xuICAgICAgICB9XG4gICAgICAgIHNldCB2ZXJ0aWNlcyh2ZXJ0aWNlczpudW1iZXJbXSl7XG4gICAgICAgICAgICB0aGlzLl92ZXJ0aWNlcyA9IHZlcnRpY2VzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfaW5kaWNlczpudW1iZXJbXSA9IFtdO1xuICAgICAgICBnZXQgaW5kaWNlcygpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2luZGljZXM7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IGluZGljZXMoaW5kaWNlczpudW1iZXJbXSl7XG4gICAgICAgICAgICB0aGlzLl9pbmRpY2VzID0gaW5kaWNlcztcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX3ZMZW46bnVtYmVyID0gbnVsbDtcbiAgICAgICAgcHJpdmF0ZSBfcmFkaXVzOm51bWJlciA9IG51bGw7XG4gICAgICAgIHByaXZhdGUgX2NvdW50Om51bWJlciA9IG51bGw7XG5cbiAgICAgICAgY29uc3RydWN0b3IocmFkaXVzLCBjb3VudCl7XG4gICAgICAgICAgICB0aGlzLl9yYWRpdXMgPSByYWRpdXM7XG4gICAgICAgICAgICB0aGlzLl9jb3VudCA9IGNvdW50O1xuICAgICAgICB9XG5cbiAgICAgICAgLy90b2RvIGFkZCB0ZXhDb29yZHNcbiAgICAgICAgcHVibGljIGdldERhdGEoKXtcbiAgICAgICAgICAgIHZhciBvcmlnaW5WZXJ0aWNlcyA9IFtcbiAgICAgICAgICAgICAgICBbdGhpcy5fcmFkaXVzLCAwLCAwXSxcbiAgICAgICAgICAgICAgICBbLXRoaXMuX3JhZGl1cywgMCwgMF0sXG4gICAgICAgICAgICAgICAgWzAsIHRoaXMuX3JhZGl1cywgMF0sXG4gICAgICAgICAgICAgICAgWzAsIC10aGlzLl9yYWRpdXMsIDBdLFxuICAgICAgICAgICAgICAgIFswLCAwLCB0aGlzLl9yYWRpdXNdLFxuICAgICAgICAgICAgICAgIFswLCAwLCAtdGhpcy5fcmFkaXVzXVxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIHZhciBvcmlnaW5JbmRpY2VzID0gW1xuICAgICAgICAgICAgICAgIC8vWzIsNCwwXSxbMiwwLDVdLFsyLDUsMV0sWzIsMSw0XSwgICBbMywwLDRdLFszLDUsMF0sWzMsMSw1XSxbMyw0LDFdXG4gICAgICAgICAgICAgICAgLy9bMiw0LDBdXG4gICAgICAgICAgICAgICAgWzIsNCwwXSxbMiwwLDVdLFsyLDUsMV0sWzIsMSw0XSxcbiAgICAgICAgICAgICAgICBbMywwLDRdLFszLDUsMF0sWzMsMSw1XSxbMyw0LDFdXG4gICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICB0aGlzLl92TGVuID0gb3JpZ2luVmVydGljZXMubGVuZ3RoO1xuXG4gICAgICAgICAgICB2YXIgaiA9IDA7XG4gICAgICAgICAgICB2YXIgbGVuID0gb3JpZ2luVmVydGljZXMubGVuZ3RoO1xuXG4gICAgICAgICAgICBmb3IoaiA9IDA7IGogPCBsZW47IGogKyspe1xuICAgICAgICAgICAgICAgIHRoaXMuX3ZlcnRpY2VzID0gdGhpcy5fdmVydGljZXMuY29uY2F0KG9yaWdpblZlcnRpY2VzW2pdKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGogPSAwLFxuICAgICAgICAgICAgICAgIGxlbiA9IG9yaWdpbkluZGljZXMubGVuZ3RoOyAgLy846Z2i5L2TXG5cbiAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBsZW47IGogKyspe1xuICAgICAgICAgICAgICAgIC8vZm9yIChpID0gMDsgaSA8IHRoaXMuX2NvdW50OyBpKyspe1xuICAgICAgICAgICAgICAgIC8vdGhpcy5fdmVydGljZXMgPSB0aGlzLl92ZXJ0aWNlcy5jb25jYXQob3JpZ2luVmVydGljZXNbb3JpZ2luSW5kaWNlc1tqXVswXV0sXG4gICAgICAgICAgICAgICAgLy8gICAgb3JpZ2luVmVydGljZXNbb3JpZ2luSW5kaWNlc1tqXVsxXV0sXG4gICAgICAgICAgICAgICAgLy8gICAgb3JpZ2luVmVydGljZXNbb3JpZ2luSW5kaWNlc1tqXVsyXV0pO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fc3ViRGl2aWRlKG9yaWdpblZlcnRpY2VzW29yaWdpbkluZGljZXNbal1bMF1dLFxuICAgICAgICAgICAgICAgICAgICBvcmlnaW5WZXJ0aWNlc1tvcmlnaW5JbmRpY2VzW2pdWzFdXSxcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luVmVydGljZXNbb3JpZ2luSW5kaWNlc1tqXVsyXV0sXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbkluZGljZXNbal0sXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvdW50LFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yYWRpdXMpO1xuXG4gICAgICAgICAgICAgICAgLy99XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlczogQXJyYXlCdWZmZXIuY3JlYXRlKG5ldyBGbG9hdDMyQXJyYXkodGhpcy5fdmVydGljZXMpLFxuICAgICAgICAgICAgICAgICAgICAzLCBCdWZmZXJUeXBlLkZMT0FUKSxcbiAgICAgICAgICAgICAgICBpbmRpY2VzOiBFbGVtZW50QnVmZmVyLmNyZWF0ZShuZXcgVWludDE2QXJyYXkodGhpcy5faW5kaWNlcyksXG4gICAgICAgICAgICAgICAgICAgIEJ1ZmZlclR5cGUuVU5TSUdORURfU0hPUlQpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9zdWJEaXZpZGUodjE6bnVtYmVyW10sIHYyOm51bWJlcltdLCB2MzpudW1iZXJbXSwgaW5kOm51bWJlcltdLGNvdW50Om51bWJlciwgcmFkaXVzOm51bWJlcik6IHZvaWR7XG4gICAgICAgICAgICBpZihjb3VudCA8PSAwKXtcbiAgICAgICAgICAgICAgICB0aGlzLl9pbmRpY2VzID0gdGhpcy5faW5kaWNlcy5jb25jYXQoaW5kKTtcblxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgICAgICB2YXIgdjEyID0gW10sXG4gICAgICAgICAgICAgICAgdjIzID0gW10sXG4gICAgICAgICAgICAgICAgdjMxID0gW107XG5cbiAgICAgICAgICAgIC8v5rGC5ZCR6YeP5Lit5b+D54K5XG4gICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCAzOyBpKyspe1xuICAgICAgICAgICAgICAgIHYxMltpXSA9ICh2MVtpXSt2MltpXSkvMjsgIC8v5rGC5Y+W562J5YiG55qE5Lit54K55Z2Q5qCHXG4gICAgICAgICAgICAgICAgdjIzW2ldID0gKHYyW2ldK3YzW2ldKS8yO1xuICAgICAgICAgICAgICAgIHYzMVtpXSA9ICh2M1tpXSt2MVtpXSkvMjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy/mqKHplb/mianlsZVcbiAgICAgICAgICAgIHRoaXMuX25vcm1hbGl6ZSh2MTIsIHJhZGl1cyk7XG4gICAgICAgICAgICB0aGlzLl9ub3JtYWxpemUodjIzLCByYWRpdXMpO1xuICAgICAgICAgICAgdGhpcy5fbm9ybWFsaXplKHYzMSwgcmFkaXVzKTtcblxuICAgICAgICAgICAgdGhpcy5fdmVydGljZXMgPSB0aGlzLl92ZXJ0aWNlcy5jb25jYXQodjEyLCB2MjMsIHYzMSk7XG5cbiAgICAgICAgICAgIHZhciBpVjEgPSBpbmRbMF0sXG4gICAgICAgICAgICAgICAgaVYyID0gaW5kWzFdLFxuICAgICAgICAgICAgICAgIGlWMyA9IGluZFsyXSxcbiAgICAgICAgICAgICAgICBpVjEyID10aGlzLl92TGVuLFxuICAgICAgICAgICAgICAgIGlWMjMgPXRoaXMuX3ZMZW4gKyAxLFxuICAgICAgICAgICAgICAgIGlWMzEgPXRoaXMuX3ZMZW4gKyAyO1xuXG4gICAgICAgICAgICB2YXIgaW4xID1bXG4gICAgICAgICAgICAgICAgaVYxLCBpVjEyLCBpVjMxXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgdmFyIGluMiA9W1xuICAgICAgICAgICAgICAgIGlWMzEsIGlWMTIsIGlWMjNcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICB2YXIgaW4zID1bXG4gICAgICAgICAgICAgICAgaVYxMiwgaVYyLCBpVjIzXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgdmFyIGluNCA9W1xuICAgICAgICAgICAgICAgIGlWMzEsIGlWMjMsIGlWM1xuICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgdGhpcy5fdkxlbiA9dGhpcy5fdkxlbiArIDM7XG5cblxuXG4gICAgICAgICAgICAvL+e7p+e7reWIh+WIhuS4ieinkuW9olxuICAgICAgICAgICAgdGhpcy5fc3ViRGl2aWRlKHYxLHYxMix2MzEsaW4xLCBjb3VudC0xLCByYWRpdXMpOyAvL+WvueaJgOS6p+eUn+eahDTkuKrmlrDnmoTkuInop5LpnaLlho3ov5vooYznrYnliIZcbiAgICAgICAgICAgIHRoaXMuX3N1YkRpdmlkZSh2MzEsdjEyLCB2MjMsIGluMiwgY291bnQtMSwgcmFkaXVzKTtcbiAgICAgICAgICAgIHRoaXMuX3N1YkRpdmlkZSh2MTIsIHYyLCB2MjMsIGluMywgY291bnQtMSwgcmFkaXVzKTtcbiAgICAgICAgICAgIHRoaXMuX3N1YkRpdmlkZSh2MzEsIHYyMywgdjMsIGluNCwgY291bnQtMSwgcmFkaXVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX25vcm1hbGl6ZSh2Om51bWJlcltdLCByYWRpdXM6bnVtYmVyKTogbnVtYmVyW117XG4gICAgICAgICAgICB2YXIgZCA9IE1hdGguc3FydChcbiAgICAgICAgICAgICAgICB2WzBdICogdlswXSArIHZbMV0gKiB2WzFdICsgdlsyXSAqIHZbMl1cbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGlmKGQgPT09IDApe1xuICAgICAgICAgICAgICAgIHJldHVybiBbMCwgMCwgMF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZbMF0gPSByYWRpdXMgKiB2WzBdIC8gZDtcbiAgICAgICAgICAgIHZbMV0gPSByYWRpdXMgKiB2WzFdIC8gZDtcbiAgICAgICAgICAgIHZbMl0gPSByYWRpdXMgKiB2WzJdIC8gZDtcblxuICAgICAgICAgICAgcmV0dXJuIHY7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZGVmaW5pdGlvbnMuZC50c1wiLz5cbm1vZHVsZSBFbmdpbmUzRHtcbiAgICBleHBvcnQgY2xhc3MgVHJpYW5nbGVHZW9tZXRyeSBleHRlbmRzIEdlb21ldHJ5e1xuICAgICAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZSh3aWR0aDpudW1iZXIsIGhlaWdodDpudW1iZXIsIG1hdGVyaWFsOk1lc2hNYXRlcmlhbCk6VHJpYW5nbGVHZW9tZXRyeSB7XG4gICAgICAgICAgICB2YXIgZ2VvbSA9IG5ldyB0aGlzKHdpZHRoLCBoZWlnaHQsIG1hdGVyaWFsKTtcblxuICAgICAgICAgICAgZ2VvbS5pbml0V2hlbkNyZWF0ZSgpO1xuXG4gICAgICAgICAgICByZXR1cm4gZ2VvbTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX3dpZHRoOm51bWJlciA9IG51bGw7XG4gICAgICAgIHByaXZhdGUgX2hlaWdodDpudW1iZXIgPSBudWxsO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKHdpZHRoOm51bWJlciwgaGVpZ2h0Om51bWJlciwgbWF0ZXJpYWw6TWVzaE1hdGVyaWFsKXtcbiAgICAgICAgICAgIHN1cGVyKG1hdGVyaWFsKTtcblxuICAgICAgICAgICAgdGhpcy5fd2lkdGggPSB3aWR0aDtcbiAgICAgICAgICAgIHRoaXMuX2hlaWdodCA9IGhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIHByb3RlY3RlZCBjb21wdXRlVmVydGljZXNCdWZmZXIoKXtcbiAgICAgICAgICAgIHZhciB3aWR0aCA9IHRoaXMuX3dpZHRoLFxuICAgICAgICAgICAgICAgIGhlaWdodCA9IHRoaXMuX2hlaWdodCxcbiAgICAgICAgICAgICAgICBsZWZ0ID0gLXdpZHRoIC8gMixcbiAgICAgICAgICAgICAgICByaWdodCA9IHdpZHRoIC8gMixcbiAgICAgICAgICAgICAgICB1cCA9IGhlaWdodCAvIDIsXG4gICAgICAgICAgICAgICAgZG93biA9IC1oZWlnaHQgLyAyO1xuXG4gICAgICAgICAgICByZXR1cm4gQXJyYXlCdWZmZXIuY3JlYXRlKG5ldyBGbG9hdDMyQXJyYXkoW1xuICAgICAgICAgICAgICAgICAgICAwLjAsIHVwLCAwLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0LCBkb3duLCAwLFxuICAgICAgICAgICAgICAgICAgICByaWdodCwgZG93biwgMFxuICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIDMsIEJ1ZmZlclR5cGUuRkxPQVQpXG4gICAgICAgIH1cblxuICAgICAgICBwcm90ZWN0ZWQgY29tcHV0ZUluZGljZXNCdWZmZXIoKXtcbiAgICAgICAgICAgIHJldHVybiBFbGVtZW50QnVmZmVyLmNyZWF0ZShuZXcgVWludDhBcnJheShbXG4gICAgICAgICAgICAgICAgMCwgMSwgMlxuICAgICAgICAgICAgXSksIEJ1ZmZlclR5cGUuVU5TSUdORURfQllURSlcbiAgICAgICAgfVxuICAgIH1cbn1cblxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2RlZmluaXRpb25zLmQudHNcIi8+XG5tb2R1bGUgRW5naW5lM0R7XG4gICAgZXhwb3J0IGludGVyZmFjZSBJRXZlbnRPZmZEYXRhIHtcbiAgICAgICAgZXZlbnROYW1lOkV2ZW50TmFtZSxcbiAgICAgICAgd3JhcEhhbmRsZXI6RnVuY3Rpb25cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgRXZlbnRMaXN0ZW5lck1hcHtcbiAgICAgICAgcHVibGljIHN0YXRpYyBjcmVhdGUoKSB7XG4gICAgICAgIFx0dmFyIG9iaiA9IG5ldyB0aGlzKCk7XG5cbiAgICAgICAgXHRyZXR1cm4gb2JqO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfbGlzdGVuZXJNYXA6ZHlDYi5IYXNoID0gZHlDYi5IYXNoLmNyZWF0ZSgpO1xuXG4gICAgICAgIHB1YmxpYyBhcHBlbmRDaGlsZChldmVudE5hbWU6RXZlbnROYW1lLCBkYXRhOklFdmVudFJlZ2lzdGVyRGF0YSl7XG4gICAgICAgICAgICB0aGlzLl9saXN0ZW5lck1hcC5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgICAgICAvL1N0cmluZyhkYXRhLnRhcmdldC51aWQpICsgXCJfXCIgKyBldmVudE5hbWUsXG4gICAgICAgICAgICAgICAgdGhpcy5fYnVpbGRLZXkoZGF0YS50YXJnZXQsIGV2ZW50TmFtZSksXG4gICAgICAgICAgICAgICAgZGF0YVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBnZXRDaGlsZChldmVudE5hbWU6RXZlbnROYW1lKTphbnk7XG4gICAgICAgIHB1YmxpYyBnZXRDaGlsZCh0YXJnZXQ6R2FtZU9iamVjdCk6YW55O1xuICAgICAgICBwdWJsaWMgZ2V0Q2hpbGQodGFyZ2V0OkdhbWVPYmplY3QsIGV2ZW50TmFtZTpFdmVudE5hbWUpOmFueTtcblxuICAgICAgICBwdWJsaWMgZ2V0Q2hpbGQoYXJncyl7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy9yZXR1cm4gdGhpcy5fbGlzdGVuZXJNYXAuZmlsdGVyKChsaXN0OmR5Q2IuQ29sbGVjdGlvbiwga2V5OnN0cmluZykgPT4ge1xuICAgICAgICAgICAgLy8gICAgcmV0dXJuIGtleSA9PT0gc2VsZi5fYnVpbGRLZXkodGFyZ2V0LCBldmVudE5hbWUpO1xuICAgICAgICAgICAgLy99KTtcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICBpZihhcmd1bWVudHMubGVuZ3RoID09PSAxICYmIEp1ZGdlVXRpbHMuaXNTdHJpbmcoYXJndW1lbnRzWzBdKSl7XG4gICAgICAgICAgICAgICAgbGV0IGV2ZW50TmFtZSA9IGFyZ3VtZW50c1swXTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9saXN0ZW5lck1hcC5nZXRDaGlsZChldmVudE5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhcmd1bWVudHMubGVuZ3RoID09PSAxKXtcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0ID0gYXJndW1lbnRzWzBdO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RlbmVyTWFwLmZpbHRlcigobGlzdDpkeUNiLkNvbGxlY3Rpb24sIGtleTpzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuaXNUYXJnZXQoa2V5LCB0YXJnZXQsIGxpc3QpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhcmd1bWVudHMubGVuZ3RoID09PSAyKXtcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0ID0gYXJndW1lbnRzWzBdLFxuICAgICAgICAgICAgICAgICAgICBldmVudE5hbWUgPSBhcmd1bWVudHNbMV07XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbGlzdGVuZXJNYXAuZ2V0Q2hpbGQodGhpcy5fYnVpbGRLZXkodGFyZ2V0LCBldmVudE5hbWUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBoYXNDaGlsZCguLi5hcmdzKXtcbiAgICAgICAgICAgIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDEgJiYgSnVkZ2VVdGlscy5pc0Z1bmN0aW9uKGFyZ3VtZW50c1swXSkpe1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9saXN0ZW5lck1hcC5oYXNDaGlsZChhcmd1bWVudHNbMF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhcmd1bWVudHMubGVuZ3RoID09PSAyKXtcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0ID0gYXJndW1lbnRzWzBdLFxuICAgICAgICAgICAgICAgICAgICBldmVudE5hbWUgPSBhcmd1bWVudHNbMV07XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbGlzdGVuZXJNYXAuaGFzQ2hpbGQodGhpcy5fYnVpbGRLZXkodGFyZ2V0LCBldmVudE5hbWUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBmaWx0ZXIoZnVuYzpGdW5jdGlvbil7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbGlzdGVuZXJNYXAuZmlsdGVyKGZ1bmMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGZvckVhY2goZnVuYzpGdW5jdGlvbil7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbGlzdGVuZXJNYXAuZm9yRWFjaChmdW5jKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyByZW1vdmVDaGlsZChldmVudE5hbWU6RXZlbnROYW1lKTp2b2lkO1xuICAgICAgICBwdWJsaWMgcmVtb3ZlQ2hpbGQoZXZlbnROYW1lOkV2ZW50TmFtZSwgaGFuZGxlcjpGdW5jdGlvbik6dm9pZDtcbiAgICAgICAgcHVibGljIHJlbW92ZUNoaWxkKHVpZDpudW1iZXIsIGV2ZW50TmFtZTpFdmVudE5hbWUpOnZvaWQ7XG4gICAgICAgIHB1YmxpYyByZW1vdmVDaGlsZCh0YXJnZXQ6R2FtZU9iamVjdCk6dm9pZDtcbiAgICAgICAgcHVibGljIHJlbW92ZUNoaWxkKHRhcmdldDpHYW1lT2JqZWN0LCBldmVudE5hbWU6RXZlbnROYW1lKTp2b2lkO1xuICAgICAgICBwdWJsaWMgcmVtb3ZlQ2hpbGQodGFyZ2V0OkdhbWVPYmplY3QsIGV2ZW50TmFtZTpFdmVudE5hbWUsIGhhbmRsZXI6RnVuY3Rpb24pOnZvaWQ7XG5cbiAgICAgICAgcHVibGljIHJlbW92ZUNoaWxkKGFyZ3Mpe1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgICAgICBpZihhcmd1bWVudHMubGVuZ3RoID09PSAxICYmIEp1ZGdlVXRpbHMuaXNTdHJpbmcoYXJndW1lbnRzWzBdKSl7XG4gICAgICAgICAgICAgICAgbGV0IGV2ZW50TmFtZSA9IGFyZ3VtZW50c1swXTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVyTWFwLnJlbW92ZUNoaWxkKGV2ZW50TmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDIgJiYgSnVkZ2VVdGlscy5pc0Z1bmN0aW9uKGFyZ3VtZW50c1sxXSkpe1xuICAgICAgICAgICAgICAgIGxldCBldmVudE5hbWUgPSBhcmd1bWVudHNbMF0sXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXIgPSBhcmd1bWVudHNbMV0sXG4gICAgICAgICAgICAgICAgICAgIGxpc3Q6ZHlDYi5Db2xsZWN0aW9uID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIGxpc3QgPSB0aGlzLl9saXN0ZW5lck1hcC5nZXRDaGlsZChldmVudE5hbWUpO1xuXG4gICAgICAgICAgICAgICAgbGlzdC5yZW1vdmVDaGlsZCgodmFsOklFdmVudFJlZ2lzdGVyRGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbC5oYW5kbGVyID09PSBoYW5kbGVyO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmKGxpc3QuZ2V0Q291bnQoKSA9PT0gMCl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVyTWFwLnJlbW92ZUNoaWxkKGV2ZW50TmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhcmd1bWVudHMubGVuZ3RoID09PSAyICYmIEp1ZGdlVXRpbHMuaXNOdW1iZXIoYXJndW1lbnRzWzBdKSl7XG4gICAgICAgICAgICAgICAgbGV0IHVpZCA9IGFyZ3VtZW50c1swXSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnROYW1lID0gYXJndW1lbnRzWzFdO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJNYXAucmVtb3ZlQ2hpbGQodGhpcy5fYnVpbGRLZXkodWlkLCBldmVudE5hbWUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSl7XG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldCA9IGFyZ3VtZW50c1swXTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVyTWFwLnJlbW92ZUNoaWxkKChsaXN0OmR5Q2IuQ29sbGVjdGlvbiwga2V5OnN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5pc1RhcmdldChrZXksIHRhcmdldCwgbGlzdCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpe1xuICAgICAgICAgICAgICAgIGxldCB0YXJnZXQgPSBhcmd1bWVudHNbMF0sXG4gICAgICAgICAgICAgICAgZXZlbnROYW1lID0gYXJndW1lbnRzWzFdO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJNYXAucmVtb3ZlQ2hpbGQodGhpcy5fYnVpbGRLZXkodGFyZ2V0LCBldmVudE5hbWUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMyl7XG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldCA9IGFyZ3VtZW50c1swXSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnROYW1lID0gYXJndW1lbnRzWzFdLFxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVyID0gYXJndW1lbnRzWzJdO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJNYXAubWFwKChsaXN0OmR5Q2IuQ29sbGVjdGlvbiwga2V5OnN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsaXN0LnJlbW92ZUNoaWxkKCh2YWw6SUV2ZW50UmVnaXN0ZXJEYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsLmhhbmRsZXIgPT09IGhhbmRsZXI7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKGxpc3QuZ2V0Q291bnQoKSA9PT0gMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZHlDYi4kUkVNT1ZFO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtrZXksIGxpc3RdO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGdldEV2ZW50T2ZmRGF0YUxpc3QodGFyZ2V0OkdhbWVPYmplY3QsIGV2ZW50TmFtZT86RXZlbnROYW1lKXtcbiAgICAgICAgICAgIHZhciByZXN1bHQ6ZHlDYi5Db2xsZWN0aW9uID0gZHlDYi5Db2xsZWN0aW9uLmNyZWF0ZSgpLFxuICAgICAgICAgICAgICAgIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgICAgICBpZihhcmd1bWVudHMubGVuZ3RoID09PSAxKXtcbiAgICAgICAgICAgICAgICB0aGlzLmdldENoaWxkKHRhcmdldClcbiAgICAgICAgICAgICAgICAuZm9yRWFjaCgobGlzdDpkeUNiLkNvbGxlY3Rpb24sIGtleTpzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGxpc3QgJiYgbGlzdC5nZXRDb3VudCgpID4gMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmFkZENoaWxkKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SUV2ZW50T2ZmRGF0YT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudE5hbWU6IHNlbGYuZ2V0RXZlbnROYW1lRnJvbUtleShrZXkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JhcEhhbmRsZXI6IGxpc3QuZ2V0Q2hpbGQoMCkud3JhcEhhbmRsZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMil7XG4gICAgICAgICAgICAgICAgdmFyIGxpc3Q6ZHlDYi5Db2xsZWN0aW9uID0gdGhpcy5nZXRDaGlsZCh0YXJnZXQsIGV2ZW50TmFtZSk7XG5cbiAgICAgICAgICAgICAgICBpZihsaXN0ICYmIGxpc3QuZ2V0Q291bnQoKSA+IDApe1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQuYWRkQ2hpbGQoXG4gICAgICAgICAgICAgICAgICAgICAgICA8SUV2ZW50T2ZmRGF0YT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnROYW1lOiBldmVudE5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JhcEhhbmRsZXI6IGxpc3QuZ2V0Q2hpbGQoMCkud3JhcEhhbmRsZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGdldEV2ZW50TmFtZUZyb21LZXkoa2V5OnN0cmluZyk6RXZlbnROYW1le1xuICAgICAgICAgICAgcmV0dXJuIGtleS5pbmRleE9mKFwiX1wiKSA+IC0xID8gPGFueT5rZXkuc3BsaXQoXCJfXCIpWzFdIDoga2V5O1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGdldFVpZEZyb21LZXkoa2V5OnN0cmluZyk6bnVtYmVye1xuICAgICAgICAgICAgcmV0dXJuIGtleS5pbmRleE9mKFwiX1wiKSA+IC0xID8gTnVtYmVyKDxhbnk+a2V5LnNwbGl0KFwiX1wiKVswXSkgOiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGlzVGFyZ2V0KGtleTpzdHJpbmcsIHRhcmdldDpHYW1lT2JqZWN0LCBsaXN0OmR5Q2IuQ29sbGVjdGlvbil7XG4gICAgICAgICAgICByZXR1cm4ga2V5LmluZGV4T2YoU3RyaW5nKHRhcmdldC51aWQpKSA+IC0xICYmIGxpc3QgIT09IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2J1aWxkS2V5KHVpZDpudW1iZXIsIGV2ZW50TmFtZTpFdmVudE5hbWUpOnN0cmluZztcbiAgICAgICAgcHJpdmF0ZSBfYnVpbGRLZXkodGFyZ2V0OkdhbWVPYmplY3QsIGV2ZW50TmFtZTpFdmVudE5hbWUpOnN0cmluZztcblxuICAgICAgICBwcml2YXRlIF9idWlsZEtleShhcmdzKXtcbiAgICAgICAgICAgIGlmKEp1ZGdlVXRpbHMuaXNOdW1iZXIoYXJndW1lbnRzWzBdKSl7XG4gICAgICAgICAgICAgICAgbGV0IHVpZCA9IGFyZ3VtZW50c1swXSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnROYW1lID0gYXJndW1lbnRzWzFdO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2J1aWxkS2V5V2l0aFVpZCh1aWQsIGV2ZW50TmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGxldCB0YXJnZXQgPSBhcmd1bWVudHNbMF0sXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50TmFtZSA9IGFyZ3VtZW50c1sxXTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXQgPyB0aGlzLl9idWlsZEtleVdpdGhVaWQodGFyZ2V0LnVpZCwgZXZlbnROYW1lKSA6IDxhbnk+ZXZlbnROYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfYnVpbGRLZXlXaXRoVWlkKHVpZDpudW1iZXIsIGV2ZW50TmFtZTpFdmVudE5hbWUpe1xuICAgICAgICAgICAgcmV0dXJuIFN0cmluZyh1aWQpICsgXCJfXCIgKyBldmVudE5hbWU7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJtb2R1bGUgRW5naW5lM0Qge1xuICAgIGV4cG9ydCBlbnVtIEV2ZW50VHlwZXtcbiAgICAgICAgTU9VU0UsXG4gICAgICAgIEtFWUJPQVJELFxuICAgICAgICBDVVNUT01cbiAgICB9XG59XG4iLCJtb2R1bGUgRW5naW5lM0R7XG4gICAgZXhwb3J0IGVudW0gRXZlbnROYW1le1xuICAgICAgICBDTElDSyA9IDxhbnk+XCJjbGlja1wiLFxuICAgICAgICBNT1VTRU9WRVIgPSA8YW55PlwibW91c2VvdmVyXCIsXG4gICAgICAgIE1PVVNFVVAgPSA8YW55PlwibW91c2V1cFwiLFxuICAgICAgICBNT1VTRU9VVCA9IDxhbnk+XCJtb3VzZW91dFwiLFxuICAgICAgICBNT1VTRU1PVkUgPSA8YW55PlwibW91c2Vtb3ZlXCIsXG4gICAgICAgIE1PVVNFRE9XTiA9IDxhbnk+XCJtb3VzZWRvd25cIixcblxuICAgICAgICBLRVlET1dOID0gPGFueT5cImtleWRvd25cIixcbiAgICAgICAgS0VZVVAgPSA8YW55Plwia2V5dXBcIixcbiAgICAgICAgS0VZUFJFU1MgPSA8YW55Plwia2V5cHJlc3NcIlxuICAgIH1cbn1cbiIsIm1vZHVsZSBFbmdpbmUzRHtcbiAgICBleHBvcnQgZW51bSBFdmVudFBoYXNle1xuICAgICAgICBCUk9BRENBU1QsXG4gICAgICAgIEVNSVRcbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vZGVmaW5pdGlvbnMuZC50c1wiLz5cbi8vdG9kbyBjb21wbGV0ZSBpdChhZGQgbW9yZSBldmVudCB0eXBlKVxubW9kdWxlIEVuZ2luZTNEIHtcbiAgICAgY29uc3QgX3RhYmxlID0gZHlDYi5IYXNoLmNyZWF0ZSgpO1xuXG4gICAgLy90b2RvIG5vdCBkZWNsYXJlIFwiPGFueT5cIiFcbiAgICBfdGFibGUuYWRkQ2hpbGQoPGFueT5FdmVudE5hbWUuQ0xJQ0ssIEV2ZW50VHlwZS5NT1VTRSk7XG4gICAgX3RhYmxlLmFkZENoaWxkKDxhbnk+RXZlbnROYW1lLk1PVVNFT1ZFUiwgRXZlbnRUeXBlLk1PVVNFKTtcbiAgICBfdGFibGUuYWRkQ2hpbGQoPGFueT5FdmVudE5hbWUuTU9VU0VPVVQsIEV2ZW50VHlwZS5NT1VTRSk7XG4gICAgX3RhYmxlLmFkZENoaWxkKDxhbnk+RXZlbnROYW1lLk1PVVNFTU9WRSwgRXZlbnRUeXBlLk1PVVNFKTtcbiAgICBfdGFibGUuYWRkQ2hpbGQoPGFueT5FdmVudE5hbWUuTU9VU0VET1dOLCBFdmVudFR5cGUuTU9VU0UpO1xuICAgIF90YWJsZS5hZGRDaGlsZCg8YW55PkV2ZW50TmFtZS5NT1VTRVVQLCBFdmVudFR5cGUuTU9VU0UpO1xuICAgIF90YWJsZS5hZGRDaGlsZCg8YW55PkV2ZW50TmFtZS5LRVlET1dOLCBFdmVudFR5cGUuS0VZQk9BUkQpO1xuICAgIF90YWJsZS5hZGRDaGlsZCg8YW55PkV2ZW50TmFtZS5LRVlQUkVTUywgRXZlbnRUeXBlLktFWUJPQVJEKTtcbiAgICBfdGFibGUuYWRkQ2hpbGQoPGFueT5FdmVudE5hbWUuS0VZVVAsIEV2ZW50VHlwZS5LRVlCT0FSRCk7XG5cbiAgICBleHBvcnQgY2xhc3MgRXZlbnRUYWJsZSB7XG4gICAgICAgIC8vZ2V0RXZlbnRUeXBlIHNob3VsZCBwdXQgaGVyZSxcbiAgICAgICAgLy9pdCBzaG91bGQgbm90IHB1dCBpbiBFdmVudCBjbGFzcywgaXQncyBiZXR0ZXIgdG8gZXh0cmFjdCBFdmVudFRhYmxlIGNsYXNzIHRvIHB1dCBpblxuICAgICAgICBwdWJsaWMgc3RhdGljIGdldEV2ZW50VHlwZShldmVudE5hbWU6RXZlbnROYW1lKTpFdmVudFR5cGUge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IF90YWJsZS5nZXRDaGlsZCg8YW55PmV2ZW50TmFtZSk7XG5cbiAgICAgICAgICAgIGlmKHJlc3VsdCA9PT0gdm9pZCAwKXtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBFdmVudFR5cGUuQ1VTVE9NO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgLy9wdWJsaWMgc3RhdGljIGlzRXZlbnRPblZpZXcoZXZlbnROYW1lOkV2ZW50TmFtZSl7XG4gICAgICAgIC8vICAgIHZhciByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgc3dpdGNoKHRoaXMuZ2V0RXZlbnRUeXBlKGV2ZW50TmFtZSkpe1xuICAgICAgICAvLyAgICAgICAgY2FzZSBFdmVudFR5cGUuTU9VU0U6XG4gICAgICAgIC8vICAgICAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgICAgLy8gICAgICAgICAgICBicmVhaztcbiAgICAgICAgLy8gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgIC8vICAgICAgICAgICAgZHlDYi5Mb2cuYXNzZXJ0KGZhbHNlLCBkeUNiLkxvZy5pbmZvLkZVTkNfVU5LTk9XKFwiZXZlbnROYW1lXCIpKTtcbiAgICAgICAgLy8gICAgICAgICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgLy8gICAgICAgICAgICBicmVhaztcbiAgICAgICAgLy8gICAgfVxuICAgICAgICAvL1xuICAgICAgICAvLyAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAvL31cbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vZGVmaW5pdGlvbnMuZC50c1wiLz5cblxuLy9yaWNoIGRvbWFpbiBtb2RlbFxuXG4vL2V2ZW50IGluZm86XG4vL2NvbnRyb2wgaW5mbyhzdG9wIGJ1YmJsZS4uLilcbi8vc3lzdGVtIGRhdGEoc3lzdGVtIGV2ZW50LCBhcyBjbGllbnRYLi4uKVxuLy9ldmVudCBjb250ZXh0KHRhcmdldCwgY3VycmVudFRhcmdldC4uLilcbi8vdXNlciBkYXRhKGN1c3RvbSBldmVudClcbi8vZXZlbnQgdHlwZVxuXG5cbm1vZHVsZSBFbmdpbmUzRHtcbiAgICBleHBvcnQgY2xhc3MgRXZlbnR7XG4gICAgICAgIGNvbnN0cnVjdG9yKGV2ZW50TmFtZTpFdmVudE5hbWUpIHtcbiAgICAgICAgICAgIHRoaXMuX25hbWUgPSBldmVudE5hbWU7XG4gICAgICAgIH1cblxuICAgICAgICAvL2Fic3RhY3QgYXR0cmlcbiAgICAgICAgcHVibGljIHR5cGU6RXZlbnRUeXBlID0gbnVsbDtcbiAgICAgICAgLy9nZXQgdHlwZSgpe1xuICAgICAgICAvLyAgICBkeUNiLkxvZy5lcnJvcih0aGlzLl90eXBlID09PSBudWxsLCBkeUNiLkxvZy5pbmZvLkFCU1RSQUNUX0FUVFJJQlVURSk7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgIHJldHVybiB0aGlzLl90eXBlO1xuICAgICAgICAvL31cblxuICAgICAgICBwcml2YXRlIF9uYW1lOkV2ZW50TmFtZSA9IG51bGw7XG4gICAgICAgIGdldCBuYW1lKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IG5hbWUobmFtZTpFdmVudE5hbWUpIHtcbiAgICAgICAgICAgIHRoaXMuX25hbWUgPSBuYW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgLy90YXJnZXQgaXMgdGhlIGFjdHVhbCB0YXJnZXQgdGhhdCByZWNlaXZlZCB0aGUgZXZlbnQuXG4gICAgICAgIHByaXZhdGUgX3RhcmdldDpHYW1lT2JqZWN0ID0gbnVsbDtcbiAgICAgICAgZ2V0IHRhcmdldCgpIHtcbiAgICAgICAgICAgIC8vZHlDYi5Mb2cuZXJyb3IoIXRoaXMuX3RhcmdldCwgZHlDYi5Mb2cuaW5mby5GVU5DX01VU1RfREVGSU5FKFwidGFyZ2V0XCIpKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RhcmdldDtcbiAgICAgICAgICAgIC8vcmV0dXJuIHRoaXMuX3RhcmdldDtcbiAgICAgICAgICAgIC8vcmV0dXJuIHRoaXMuX2V2ZW50LnNyY0VsZW1lbnQgfHwgdGhpcy5fZXZlbnQudGFyZ2V0O1xuICAgICAgICB9XG4gICAgICAgIHNldCB0YXJnZXQodGFyZ2V0OkdhbWVPYmplY3QpIHtcbiAgICAgICAgICAgIHRoaXMuX3RhcmdldCA9IHRhcmdldDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vY3VycmVudFRhcmdldCBpcyBhbHdheXMgdGhlIG9iamVjdCBsaXN0ZW5pbmcgZm9yIHRoZSBldmVudFxuICAgICAgICBwcml2YXRlIF9jdXJyZW50VGFyZ2V0OkdhbWVPYmplY3QgPSBudWxsO1xuICAgICAgICBnZXQgY3VycmVudFRhcmdldCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50VGFyZ2V0O1xuICAgICAgICB9XG4gICAgICAgIHNldCBjdXJyZW50VGFyZ2V0KGN1cnJlbnRUYXJnZXQ6R2FtZU9iamVjdCkge1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudFRhcmdldCA9IGN1cnJlbnRUYXJnZXQ7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9pc1N0b3BQcm9wYWdhdGlvbjpib29sZWFuID0gZmFsc2U7XG4gICAgICAgIGdldCBpc1N0b3BQcm9wYWdhdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pc1N0b3BQcm9wYWdhdGlvbjtcbiAgICAgICAgfVxuICAgICAgICBzZXQgaXNTdG9wUHJvcGFnYXRpb24oaXNTdG9wUHJvcGFnYXRpb246Ym9vbGVhbikge1xuICAgICAgICAgICAgdGhpcy5faXNTdG9wUHJvcGFnYXRpb24gPSBpc1N0b3BQcm9wYWdhdGlvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX3BoYXNlOkV2ZW50UGhhc2UgPSBudWxsO1xuICAgICAgICBnZXQgcGhhc2UoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcGhhc2U7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IHBoYXNlKHBoYXNlOkV2ZW50UGhhc2UpIHtcbiAgICAgICAgICAgIHRoaXMuX3BoYXNlID0gcGhhc2U7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgY29weSgpOkV2ZW50e1xuICAgICAgICAgICAgcmV0dXJuIGR5Q2IuTG9nLmVycm9yKHRydWUsIGR5Q2IuTG9nLmluZm8uQUJTVFJBQ1RfTUVUSE9EKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzdG9wUHJvcGFnYXRpb24oKSB7XG4gICAgICAgICAgICB0aGlzLl9pc1N0b3BQcm9wYWdhdGlvbiA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBwcm90ZWN0ZWQgY29weU1lbWJlcihkZXN0aW5hdGlvbjpFdmVudCwgc291cmNlOkV2ZW50LCBtZW1iZXJBcnI6W2FueV0pe1xuICAgICAgICAgICAgbWVtYmVyQXJyLmZvckVhY2goKG1lbWJlcikgPT4ge1xuICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uW21lbWJlcl0gPSBzb3VyY2VbbWVtYmVyXTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gZGVzdGluYXRpb247XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vZGVmaW5pdGlvbnMuZC50c1wiLz5cbm1vZHVsZSBFbmdpbmUzRCB7XG4gICAgZXhwb3J0IGNsYXNzIE1vdXNlRXZlbnQgZXh0ZW5kcyBFdmVudHtcbiAgICAgICAgLy9wdWJsaWMgc3RhdGljIENMSUNLOnN0cmluZyA9IFwiY2xpY2tcIjtcbiAgICAgICAgLy9wdWJsaWMgc3RhdGljIE1PVVNFT1ZFUjpzdHJpbmcgPSBcIm1vdXNlb3ZlclwiO1xuICAgICAgICAvL3B1YmxpYyBzdGF0aWMgTU9VU0VPVVQ6c3RyaW5nID0gXCJtb3VzZW91dFwiO1xuICAgICAgICAvL3B1YmxpYyBzdGF0aWMgTU9VU0VNT1ZFOnN0cmluZyA9IFwibW91c2Vtb3ZlXCI7XG5cbiAgICAgICAgLy9wdWJsaWMgc3RhdGljIGNyZWF0ZShldmVudE5hbWU6RXZlbnROYW1lKSB7XG4gICAgICAgIC8vICAgIHZhciBvYmogPSBuZXcgdGhpcyhldmVudE5hbWUpO1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICByZXR1cm4gb2JqO1xuICAgICAgICAvL31cbiAgICAgICAgcHVibGljIHN0YXRpYyBjcmVhdGUoZXZlbnQ6YW55LCBldmVudE5hbWU6RXZlbnROYW1lKSB7XG4gICAgICAgICAgICB2YXIgb2JqID0gbmV3IHRoaXMoZXZlbnQsIGV2ZW50TmFtZSk7XG5cbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdHJ1Y3RvcihldmVudDphbnksIGV2ZW50TmFtZTpFdmVudE5hbWUpIHtcbiAgICAgICAgICAgIHN1cGVyKGV2ZW50TmFtZSk7XG5cbiAgICAgICAgICAgIHRoaXMuX2V2ZW50ID0gZXZlbnQ7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgdHlwZTpFdmVudFR5cGUgPSBFdmVudFR5cGUuTU9VU0U7XG5cblxuICAgICAgICBwcml2YXRlIF9ldmVudDphbnkgPSBudWxsO1xuICAgICAgICBnZXQgZXZlbnQoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZXZlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IGV2ZW50KGV2ZW50OmFueSkge1xuICAgICAgICAgICAgdGhpcy5fZXZlbnQgPSBldmVudCB8fCB3aW5kb3cuZXZlbnQ7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9sb2NhdGlvbjpQb2ludCA9IG51bGw7XG4gICAgICAgIC8vR2V0IGN1cnNvciBsb2NhdGlvbihyZWxhdGVkIHRvIGRvY3VtZW50KVxuICAgICAgICBnZXQgbG9jYXRpb24oKTpQb2ludCB7XG4gICAgICAgICAgICB2YXIgcG9pbnQ6UG9pbnQgPSBudWxsLFxuICAgICAgICAgICAgICAgIGUgPSB0aGlzLmV2ZW50O1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fbG9jYXRpb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbG9jYXRpb247XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHBvaW50ID0gUG9pbnQuY3JlYXRlKCk7XG5cbiAgICAgICAgICAgIGlmIChib3dzZXIubXNpZSkge1xuICAgICAgICAgICAgICAgIHBvaW50LnggPSBlLmNsaWVudFggKyBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQ7XG4gICAgICAgICAgICAgICAgcG9pbnQueSA9IGUuY2xpZW50WSArIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBwb2ludC54ID0gZS5wYWdlWDtcbiAgICAgICAgICAgICAgICBwb2ludC55ID0gZS5wYWdlWTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHBvaW50O1xuICAgICAgICB9XG4gICAgICAgIHNldCBsb2NhdGlvbihwb2ludDpQb2ludCkge1xuICAgICAgICAgICAgdGhpcy5fbG9jYXRpb24gPSBwb2ludDtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2xvY2F0aW9uSW5WaWV3OlBvaW50ID0gbnVsbDtcbiAgICAgICAgLy9SZXR1cm5zIHRoZSBjdXJyZW50IGN1cnNvciBsb2NhdGlvbiBpbiBzY3JlZW4gY29vcmRpbmF0ZXMocmVsYXRlZCB0byBjYW52YXMpXG4gICAgICAgIGdldCBsb2NhdGlvbkluVmlldygpOlBvaW50IHtcbiAgICAgICAgICAgIC8vcmV0dXJuIHRoaXMuX2xvY2F0aW9uSW5WaWV3O1xuICAgICAgICAgICAgdmFyIHBvaW50OlBvaW50ID0gbnVsbCxcbiAgICAgICAgICAgICAgICB2aWV3T2Zmc2V0OmFueSA9IG51bGw7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9sb2NhdGlvbkluVmlldykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9sb2NhdGlvbkluVmlldztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcG9pbnQgPSB0aGlzLmxvY2F0aW9uO1xuXG5cbiAgICAgICAgICAgIC8vY2FudmFzT2Zmc2V0ID0gdGhpcy5fZ2V0Q2FudmFzT2Zmc2V0KHRoaXMuZXZlbnQuY3VycmVudFRhcmdldCk7XG4gICAgICAgICAgICB2aWV3T2Zmc2V0ID0gRGlyZWN0b3IuZ2V0SW5zdGFuY2UoKS5nZXRWaWV3KCkub2Zmc2V0O1xuXG4gICAgICAgICAgICByZXR1cm4gUG9pbnQuY3JlYXRlKHBvaW50LnggLSB2aWV3T2Zmc2V0LngsIHBvaW50LnkgLSB2aWV3T2Zmc2V0LnkpO1xuICAgICAgICB9XG4gICAgICAgIHNldCBsb2NhdGlvbkluVmlldyhsb2NhdGlvbkluVmlldzpQb2ludCkge1xuICAgICAgICAgICAgdGhpcy5fbG9jYXRpb25JblZpZXcgPSBsb2NhdGlvbkluVmlldztcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2J1dHRvbjpudW1iZXIgPSBudWxsO1xuICAgICAgICBnZXQgYnV0dG9uKCkge1xuICAgICAgICAgICAgdmFyIGUgPSB0aGlzLmV2ZW50LFxuICAgICAgICAgICAgICAgIG1vdXNlQnV0dG9uOm51bWJlciA9IG51bGw7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9idXR0b24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYnV0dG9uO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoYm93c2VyLm1zaWUpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGUuYnV0dG9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdXNlQnV0dG9uID0gTW91c2VCdXR0b24uTEVGVDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBtb3VzZUJ1dHRvbiA9IE1vdXNlQnV0dG9uLlJJR0hUO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdXNlQnV0dG9uID0gTW91c2VCdXR0b24uQ0VOVEVSO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBkeUNiLkxvZy5lcnJvcih0cnVlLCBkeUNiLkxvZy5pbmZvLkZVTkNfTk9UX1NVUFBPUlQoXCJtdWx0aSBtb3VzZSBidXR0b25cIikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9tb3VzZUJ1dHRvbiA9IGUuYnV0dG9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChlLmJ1dHRvbikge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBtb3VzZUJ1dHRvbiA9IE1vdXNlQnV0dG9uLkxFRlQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgbW91c2VCdXR0b24gPSBNb3VzZUJ1dHRvbi5SSUdIVDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICBtb3VzZUJ1dHRvbiA9IE1vdXNlQnV0dG9uLkNFTlRFUjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgZHlDYi5Mb2cuZXJyb3IodHJ1ZSwgZHlDYi5Mb2cuaW5mby5GVU5DX05PVF9TVVBQT1JUKFwibXVsdGkgbW91c2UgYnV0dG9uXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbW91c2VCdXR0b24gPSBlLmJ1dHRvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG1vdXNlQnV0dG9uO1xuICAgICAgICB9XG4gICAgICAgIHNldCBidXR0b24oYnV0dG9uOm51bWJlcikge1xuICAgICAgICAgICAgdGhpcy5fYnV0dG9uID0gYnV0dG9uO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGNvcHkoKXtcbiAgICAgICAgICAgIHZhciBldmVudE9iaiA9IE1vdXNlRXZlbnQuY3JlYXRlKHRoaXMuX2V2ZW50LCB0aGlzLm5hbWUpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb3B5TWVtYmVyKGV2ZW50T2JqLCB0aGlzLCBbXCJ0YXJnZXRcIiwgXCJjdXJyZW50VGFyZ2V0XCIsIFwiaXNTdG9wUHJvcGFnYXRpb25cIiwgXCJwaGFzZVwiXSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vcHJpdmF0ZSBfZ2V0Q2FudmFzT2Zmc2V0KHZpZXc6SVZpZXcpIHtcbiAgICAgICAgLy8gICAgcmV0dXJuIHZpZXcuZ2V0T2Zmc2V0KCk7XG4gICAgICAgIC8vICAgIHZhciBvZmZzZXQgPSB7eDogY2FudmFzLm9mZnNldExlZnQsIHk6IGNhbnZhcy5vZmZzZXRUb3B9O1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICB3aGlsZSAoY2FudmFzID0gY2FudmFzLm9mZnNldFBhcmVudCkge1xuICAgICAgICAvLyAgICAgICAgb2Zmc2V0LnggKz0gY2FudmFzLm9mZnNldExlZnQ7XG4gICAgICAgIC8vICAgICAgICBvZmZzZXQueSArPSBjYW52YXMub2Zmc2V0VG9wO1xuICAgICAgICAvLyAgICB9XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgIHJldHVybiBvZmZzZXQ7XG4gICAgICAgIC8vfVxuICAgIH1cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9kZWZpbml0aW9ucy5kLnRzXCIvPlxubW9kdWxlIEVuZ2luZTNEIHtcbiAgICBjb25zdCBTUEVDSUFMX0tFWV9NQVAgPSB7XG4gICAgICAgICAgICA4OiBcImJhY2tzcGFjZVwiLFxuICAgICAgICAgICAgOTogXCJ0YWJcIixcbiAgICAgICAgICAgIDEwOiBcInJldHVyblwiLFxuICAgICAgICAgICAgMTM6IFwicmV0dXJuXCIsXG4gICAgICAgICAgICAxNjogXCJzaGlmdFwiLFxuICAgICAgICAgICAgMTc6IFwiY3RybFwiLFxuICAgICAgICAgICAgMTg6IFwiYWx0XCIsXG4gICAgICAgICAgICAxOTogXCJwYXVzZVwiLFxuICAgICAgICAgICAgMjA6IFwiY2Fwc2xvY2tcIixcbiAgICAgICAgICAgIDI3OiBcImVzY1wiLFxuICAgICAgICAgICAgMzI6IFwic3BhY2VcIixcbiAgICAgICAgICAgIDMzOiBcInBhZ2V1cFwiLFxuICAgICAgICAgICAgMzQ6IFwicGFnZWRvd25cIixcbiAgICAgICAgICAgIDM1OiBcImVuZFwiLFxuICAgICAgICAgICAgMzY6IFwiaG9tZVwiLFxuICAgICAgICAgICAgMzc6IFwibGVmdFwiLFxuICAgICAgICAgICAgMzg6IFwidXBcIixcbiAgICAgICAgICAgIDM5OiBcInJpZ2h0XCIsXG4gICAgICAgICAgICA0MDogXCJkb3duXCIsXG4gICAgICAgICAgICA0NTogXCJpbnNlcnRcIixcbiAgICAgICAgICAgIDQ2OiBcImRlbFwiLFxuICAgICAgICAgICAgNTk6IFwiO1wiLFxuICAgICAgICAgICAgNjE6IFwiPVwiLFxuICAgICAgICAgICAgNjU6IFwiYVwiLFxuICAgICAgICAgICAgNjY6IFwiYlwiLFxuICAgICAgICAgICAgNjc6IFwiY1wiLFxuICAgICAgICAgICAgNjg6IFwiZFwiLFxuICAgICAgICAgICAgNjk6IFwiZVwiLFxuICAgICAgICAgICAgNzA6IFwiZlwiLFxuICAgICAgICAgICAgNzE6IFwiZ1wiLFxuICAgICAgICAgICAgNzI6IFwiaFwiLFxuICAgICAgICAgICAgNzM6IFwiaVwiLFxuICAgICAgICAgICAgNzQ6IFwialwiLFxuICAgICAgICAgICAgNzU6IFwia1wiLFxuICAgICAgICAgICAgNzY6IFwibFwiLFxuICAgICAgICAgICAgNzc6IFwibVwiLFxuICAgICAgICAgICAgNzg6IFwiblwiLFxuICAgICAgICAgICAgNzk6IFwib1wiLFxuICAgICAgICAgICAgODA6IFwicFwiLFxuICAgICAgICAgICAgODE6IFwicVwiLFxuICAgICAgICAgICAgODI6IFwiclwiLFxuICAgICAgICAgICAgODM6IFwic1wiLFxuICAgICAgICAgICAgODQ6IFwidFwiLFxuICAgICAgICAgICAgODU6IFwidVwiLFxuICAgICAgICAgICAgODY6IFwidlwiLFxuICAgICAgICAgICAgODc6IFwid1wiLFxuICAgICAgICAgICAgODg6IFwieFwiLFxuICAgICAgICAgICAgODk6IFwieVwiLFxuICAgICAgICAgICAgOTA6IFwielwiLFxuICAgICAgICAgICAgOTY6IFwiMFwiLFxuICAgICAgICAgICAgOTc6IFwiMVwiLFxuICAgICAgICAgICAgOTg6IFwiMlwiLFxuICAgICAgICAgICAgOTk6IFwiM1wiLFxuICAgICAgICAgICAgMTAwOiBcIjRcIixcbiAgICAgICAgICAgIDEwMTogXCI1XCIsXG4gICAgICAgICAgICAxMDI6IFwiNlwiLFxuICAgICAgICAgICAgMTAzOiBcIjdcIixcbiAgICAgICAgICAgIDEwNDogXCI4XCIsXG4gICAgICAgICAgICAxMDU6IFwiOVwiLFxuICAgICAgICAgICAgMTA2OiBcIipcIixcbiAgICAgICAgICAgIDEwNzogXCIrXCIsXG4gICAgICAgICAgICAxMDk6IFwiLVwiLFxuICAgICAgICAgICAgMTEwOiBcIi5cIixcbiAgICAgICAgICAgIDExMTogXCIvXCIsXG4gICAgICAgICAgICAxMTI6IFwiZjFcIixcbiAgICAgICAgICAgIDExMzogXCJmMlwiLFxuICAgICAgICAgICAgMTE0OiBcImYzXCIsXG4gICAgICAgICAgICAxMTU6IFwiZjRcIixcbiAgICAgICAgICAgIDExNjogXCJmNVwiLFxuICAgICAgICAgICAgMTE3OiBcImY2XCIsXG4gICAgICAgICAgICAxMTg6IFwiZjdcIixcbiAgICAgICAgICAgIDExOTogXCJmOFwiLFxuICAgICAgICAgICAgMTIwOiBcImY5XCIsXG4gICAgICAgICAgICAxMjE6IFwiZjEwXCIsXG4gICAgICAgICAgICAxMjI6IFwiZjExXCIsXG4gICAgICAgICAgICAxMjM6IFwiZjEyXCIsXG4gICAgICAgICAgICAxNDQ6IFwibnVtbG9ja1wiLFxuICAgICAgICAgICAgMTQ1OiBcInNjcm9sbFwiLFxuICAgICAgICAgICAgMTczOiBcIi1cIixcbiAgICAgICAgICAgIDE4NjogXCI7XCIsXG4gICAgICAgICAgICAxODc6IFwiPVwiLFxuICAgICAgICAgICAgMTg4OiBcIixcIixcbiAgICAgICAgICAgIDE4OTogXCItXCIsXG4gICAgICAgICAgICAxOTA6IFwiLlwiLFxuICAgICAgICAgICAgMTkxOiBcIi9cIixcbiAgICAgICAgICAgIDE5MjogXCJgXCIsXG4gICAgICAgICAgICAyMTk6IFwiW1wiLFxuICAgICAgICAgICAgMjIwOiBcIlxcXFxcIixcbiAgICAgICAgICAgIDIyMTogXCJdXCIsXG4gICAgICAgICAgICAyMjI6IFwiJ1wiXG4gICAgICAgIH0sXG4gICAgICAgIFNISUZUX0tFWV9NQVAgPSB7XG4gICAgICAgICAgICBcImBcIjogXCJ+XCIsXG4gICAgICAgICAgICBcIjFcIjogXCIhXCIsXG4gICAgICAgICAgICBcIjJcIjogXCJAXCIsXG4gICAgICAgICAgICBcIjNcIjogXCIjXCIsXG4gICAgICAgICAgICBcIjRcIjogXCIkXCIsXG4gICAgICAgICAgICBcIjVcIjogXCIlXCIsXG4gICAgICAgICAgICBcIjZcIjogXCJeXCIsXG4gICAgICAgICAgICBcIjdcIjogXCImXCIsXG4gICAgICAgICAgICBcIjhcIjogXCIqXCIsXG4gICAgICAgICAgICBcIjlcIjogXCIoXCIsXG4gICAgICAgICAgICBcIjBcIjogXCIpXCIsXG4gICAgICAgICAgICBcIi1cIjogXCJfXCIsXG4gICAgICAgICAgICBcIj1cIjogXCIrXCIsXG4gICAgICAgICAgICBcIjtcIjogXCI6IFwiLFxuICAgICAgICAgICAgXCInXCI6IFwiXFxcIlwiLFxuICAgICAgICAgICAgXCIsXCI6IFwiPFwiLFxuICAgICAgICAgICAgXCIuXCI6IFwiPlwiLFxuICAgICAgICAgICAgXCIvXCI6IFwiP1wiLFxuICAgICAgICAgICAgXCJcXFxcXCI6IFwifFwiXG4gICAgICAgIH07XG5cbiAgICBleHBvcnQgY2xhc3MgS2V5Ym9hcmRFdmVudCBleHRlbmRzIEV2ZW50e1xuICAgICAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZShldmVudDphbnksIGV2ZW50TmFtZTpFdmVudE5hbWUpIHtcbiAgICAgICAgICAgIHZhciBvYmogPSBuZXcgdGhpcyhldmVudCwgZXZlbnROYW1lKTtcblxuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0cnVjdG9yKGV2ZW50OmFueSwgZXZlbnROYW1lOkV2ZW50TmFtZSkge1xuICAgICAgICAgICAgc3VwZXIoZXZlbnROYW1lKTtcblxuICAgICAgICAgICAgdGhpcy5fZXZlbnQgPSBldmVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyB0eXBlOkV2ZW50VHlwZSA9IEV2ZW50VHlwZS5LRVlCT0FSRDtcblxuICAgICAgICBwcml2YXRlIF9ldmVudDphbnkgPSBudWxsO1xuICAgICAgICBnZXQgZXZlbnQoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZXZlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IGV2ZW50KGV2ZW50OmFueSkge1xuICAgICAgICAgICAgdGhpcy5fZXZlbnQgPSBldmVudCB8fCB3aW5kb3cuZXZlbnQ7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgY3RybEtleSgpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2V2ZW50LmN0cmxLZXk7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgYWx0S2V5KCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZXZlbnQuYWx0S2V5O1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IHNoaWZ0S2V5KCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZXZlbnQuc2hpZnRLZXk7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgbWV0YUtleSgpe1xuICAgICAgICAgICAgLy9yZXR1cm4gdGhpcy5fZXZlbnQubWV0YUtleSAmJiAhdGhpcy5jdHJsS2V5O1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2V2ZW50Lm1ldGFLZXk7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQga2V5Q29kZSgpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2V2ZW50LmtleUNvZGU7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQga2V5KCl7XG4gICAgICAgICAgICB2YXIga2V5ID0gU1BFQ0lBTF9LRVlfTUFQW3RoaXMua2V5Q29kZV0sXG4gICAgICAgICAgICAgICAgY2hhciA9IG51bGw7XG5cbiAgICAgICAgICAgIGlmKCFrZXkpe1xuICAgICAgICAgICAgICAgIGNoYXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHRoaXMua2V5Q29kZSkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgICAgIGlmKHRoaXMuc2hpZnRLZXkpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gU0hJRlRfS0VZX01BUFtjaGFyXTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gY2hhcjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGtleTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBjb3B5KCl7XG4gICAgICAgICAgICB2YXIgZXZlbnRPYmogPSBLZXlib2FyZEV2ZW50LmNyZWF0ZSh0aGlzLl9ldmVudCwgdGhpcy5uYW1lKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29weU1lbWJlcihldmVudE9iaiwgdGhpcywgW1wiYWx0S2V5XCIsIFwic2hpZnRLZXlcIiwgXCJjdHJsS2V5XCIsIFwibWV0YUtleVwiLCBcImtleUNvZGVcIiwgXCJrZXlcIl0pO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2RlZmluaXRpb25zLmQudHNcIi8+XG5tb2R1bGUgRW5naW5lM0Qge1xuICAgIGV4cG9ydCBjbGFzcyBDdXN0b21FdmVudCBleHRlbmRzIEV2ZW50e1xuICAgICAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZShldmVudE5hbWU6c3RyaW5nKSB7XG4gICAgICAgICAgICB2YXIgb2JqID0gbmV3IHRoaXMoPGFueT5ldmVudE5hbWUpO1xuXG4gICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHR5cGU6RXZlbnRUeXBlID0gRXZlbnRUeXBlLkNVU1RPTTtcbiAgICAgICAgXG4gICAgICAgIHByaXZhdGUgX3VzZXJEYXRhOmFueSA9IG51bGw7XG4gICAgICAgIGdldCB1c2VyRGF0YSgpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3VzZXJEYXRhO1xuICAgICAgICB9XG4gICAgICAgIHNldCB1c2VyRGF0YSh1c2VyRGF0YTphbnkpe1xuICAgICAgICAgICAgdGhpcy5fdXNlckRhdGEgPSB1c2VyRGF0YTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBjb3B5UHVibGljQXR0cmkoZGVzdGluYXRpb24sIHNvdXJjZTphbnkpe1xuICAgICAgICAgICAgdmFyIHByb3BlcnR5ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAvL2Rlc3RpbmF0aW9uID0ge307XG5cbiAgICAgICAgICAgIGR5Q2IuRXh0ZW5kVXRpbHMuZXh0ZW5kKGRlc3RpbmF0aW9uLCBmdW5jdGlvbihpdGVtLCBwcm9wZXJ0eSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3BlcnR5LnNsaWNlKDAsIDEpICE9PSBcIl9cIlxuICAgICAgICAgICAgICAgICAgICAmJiAhSnVkZ2VVdGlscy5pc0Z1bmN0aW9uKGl0ZW0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiBkZXN0aW5hdGlvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBjb3B5KCl7XG4gICAgICAgICAgICB2YXIgZXZlbnRPYmogPSBDdXN0b21FdmVudC5jcmVhdGUoPGFueT50aGlzLm5hbWUpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb3B5TWVtYmVyKGV2ZW50T2JqLCB0aGlzLCBbXCJ0YXJnZXRcIiwgXCJjdXJyZW50VGFyZ2V0XCIsIFwiaXNTdG9wUHJvcGFnYXRpb25cIiwgXCJwaGFzZVwiXSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJtb2R1bGUgRW5naW5lM0Qge1xuICAgIGV4cG9ydCBlbnVtIE1vdXNlQnV0dG9ue1xuICAgICAgICBMRUZULFxuICAgICAgICBSSUdIVCxcbiAgICAgICAgQ0VOVEVSXG4gICAgfVxufVxuXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vZGVmaW5pdGlvbnMuZC50c1wiLz5cbm1vZHVsZSBFbmdpbmUzRCB7XG4gICAgZXhwb3J0IGludGVyZmFjZSBJRXZlbnRIYW5kbGVyRGF0YXtcbiAgICAgICAgZXZlbnROYW1lOkV2ZW50TmFtZTtcbiAgICAgICAgaGFuZGxlcjpGdW5jdGlvbjtcbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgRXZlbnRMaXN0ZW5lciB7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKG9wdGlvbikge1xuICAgICAgICAgICAgdmFyIG9iaiA9IG5ldyB0aGlzKG9wdGlvbik7XG5cbiAgICAgICAgICAgIG9iai5pbml0V2hlbkNyZWF0ZShvcHRpb24pO1xuXG4gICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfZXZlbnRUeXBlOkV2ZW50VHlwZSA9IG51bGw7XG4gICAgICAgIGdldCBldmVudFR5cGUoKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9ldmVudFR5cGU7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IGV2ZW50VHlwZShldmVudFR5cGU6RXZlbnRUeXBlKXtcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50VHlwZSA9IGV2ZW50VHlwZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX3ByaW9yaXR5Om51bWJlciA9IG51bGw7XG4gICAgICAgIGdldCBwcmlvcml0eSgpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ByaW9yaXR5O1xuICAgICAgICB9XG4gICAgICAgIHNldCBwcmlvcml0eShwcmlvcml0eTpudW1iZXIpe1xuICAgICAgICAgICAgdGhpcy5fcHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2hhbmRsZXJEYXRhTGlzdDpkeUNiLkNvbGxlY3Rpb24gPSBkeUNiLkNvbGxlY3Rpb24uY3JlYXRlKCk7XG4gICAgICAgIGdldCBoYW5kbGVyRGF0YUxpc3QoKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9oYW5kbGVyRGF0YUxpc3Q7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IGhhbmRsZXJEYXRhTGlzdChoYW5kbGVyRGF0YUxpc3Q6ZHlDYi5Db2xsZWN0aW9uKXtcbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZXJEYXRhTGlzdCA9IGhhbmRsZXJEYXRhTGlzdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0cnVjdG9yKG9wdGlvbjphbnkpe1xuICAgICAgICAgICAgdGhpcy5fZXZlbnRUeXBlID0gb3B0aW9uLmV2ZW50VHlwZTtcbiAgICAgICAgICAgIHRoaXMuX3ByaW9yaXR5ID0gb3B0aW9uLnByaW9yaXR5IHx8IDE7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgaW5pdFdoZW5DcmVhdGUob3B0aW9uOnthbnl9KXtcbiAgICAgICAgICAgIHRoaXMuX3NldEhhbmRsZXJEYXRhTGlzdChvcHRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfc2V0SGFuZGxlckRhdGFMaXN0KG9wdGlvbjp7YW55fSl7XG4gICAgICAgICAgICB2YXIgaSA9IG51bGwsXG4gICAgICAgICAgICAgICAgUkVHRVhfSEFOREVSID0gL29uXFx3Ky87XG5cbiAgICAgICAgICAgIGZvcihpIGluIG9wdGlvbil7XG4gICAgICAgICAgICAgICAgaWYob3B0aW9uLmhhc093blByb3BlcnR5KGkpKXtcbiAgICAgICAgICAgICAgICAgICAgaWYoUkVHRVhfSEFOREVSLnRlc3QoaSkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faGFuZGxlckRhdGFMaXN0LmFkZENoaWxkKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudE5hbWU6IHRoaXMuX3BhcnNlRXZlbnROYW1lKGkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZXI6IG9wdGlvbltpXVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9wYXJzZUV2ZW50TmFtZShoYW5kbGVyTmFtZSl7XG4gICAgICAgICAgICByZXR1cm4gaGFuZGxlck5hbWUuc2xpY2UoMikudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9kZWZpbml0aW9ucy5kLnRzXCIvPlxubW9kdWxlIEVuZ2luZTNEIHtcbiAgICBleHBvcnQgY2xhc3MgRXZlbnRIYW5kbGVyIHtcbiAgICAgICAgcHVibGljIG9uKC4uLmFyZ3MpIHtcbiAgICAgICAgICAgIGR5Q2IuTG9nLmVycm9yKHRydWUsIGR5Q2IuTG9nLmluZm8uQUJTVFJBQ1RfTUVUSE9EKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBvZmYoLi4uYXJncykge1xuICAgICAgICAgICAgZHlDYi5Mb2cuZXJyb3IodHJ1ZSwgZHlDYi5Mb2cuaW5mby5BQlNUUkFDVF9NRVRIT0QpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHRyaWdnZXIoLi4uYXJncyk6Ym9vbGVhbiB7XG4gICAgICAgICAgICByZXR1cm4gZHlDYi5Mb2cuZXJyb3IodHJ1ZSwgZHlDYi5Mb2cuaW5mby5BQlNUUkFDVF9NRVRIT0QpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2RlZmluaXRpb25zLmQudHNcIi8+XG5tb2R1bGUgRW5naW5lM0Qge1xuICAgIGV4cG9ydCBjbGFzcyBEb21FdmVudEhhbmRsZXIgZXh0ZW5kcyBFdmVudEhhbmRsZXJ7XG4gICAgICAgIHB1YmxpYyBvZmYoLi4uYXJncykge1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICAgICAgICAgIGRvbSA9IHRoaXMuZ2V0RG9tKCksXG4gICAgICAgICAgICAgICAgZXZlbnRSZWdpc3RlciA9IEV2ZW50UmVnaXN0ZXIuZ2V0SW5zdGFuY2UoKSxcbiAgICAgICAgICAgICAgICBldmVudE9mZkRhdGFMaXN0OmR5Q2IuQ29sbGVjdGlvbiA9IG51bGw7XG5cbiAgICAgICAgICAgIGV2ZW50T2ZmRGF0YUxpc3QgPSBldmVudFJlZ2lzdGVyLnJlbW92ZS5hcHBseShldmVudFJlZ2lzdGVyLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApKTtcblxuICAgICAgICAgICAgaWYoZXZlbnRPZmZEYXRhTGlzdCl7XG4gICAgICAgICAgICAgICAgZXZlbnRPZmZEYXRhTGlzdC5mb3JFYWNoKChldmVudE9mZkRhdGE6SUV2ZW50T2ZmRGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLl91bkJpbmQoZG9tLCBldmVudE9mZkRhdGEuZXZlbnROYW1lLCBldmVudE9mZkRhdGEud3JhcEhhbmRsZXIpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwcm90ZWN0ZWQgZ2V0RG9tKCl7XG4gICAgICAgICAgICByZXR1cm4gZHlDYi5Mb2cuZXJyb3IodHJ1ZSwgZHlDYi5Mb2cuaW5mby5BQlNUUkFDVF9NRVRIT0QpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJvdGVjdGVkIGJ1aWxkV3JhcEhhbmRsZXIodGFyZ2V0OkdhbWVPYmplY3QsIGV2ZW50TmFtZTpFdmVudE5hbWUpe1xuICAgICAgICAgICAgcmV0dXJuIGR5Q2IuTG9nLmVycm9yKHRydWUsIGR5Q2IuTG9nLmluZm8uQUJTVFJBQ1RfTUVUSE9EKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByb3RlY3RlZCBoYW5kbGVyKHRhcmdldCwgZXZlbnROYW1lLCBoYW5kbGVyLCBwcmlvcml0eSl7XG4gICAgICAgICAgICB2YXIgd3JhcEhhbmRsZXIgPSBudWxsO1xuXG4gICAgICAgICAgICBpZiAoIUV2ZW50UmVnaXN0ZXIuZ2V0SW5zdGFuY2UoKS5pc0JpbmRlZCh0YXJnZXQsIGV2ZW50TmFtZSkpIHtcbiAgICAgICAgICAgICAgICB3cmFwSGFuZGxlciA9IHRoaXMuX2JpbmQodGhpcy5nZXREb20oKSwgZXZlbnROYW1lLCB0YXJnZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICB3cmFwSGFuZGxlciA9IEV2ZW50UmVnaXN0ZXIuZ2V0SW5zdGFuY2UoKS5nZXRXcmFwSGFuZGxlcih0YXJnZXQsIGV2ZW50TmFtZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIEV2ZW50UmVnaXN0ZXIuZ2V0SW5zdGFuY2UoKS5yZWdpc3RlcihcbiAgICAgICAgICAgICAgICB0YXJnZXQsXG4gICAgICAgICAgICAgICAgZXZlbnROYW1lLFxuICAgICAgICAgICAgICAgIGhhbmRsZXIsXG4gICAgICAgICAgICAgICAgd3JhcEhhbmRsZXIsXG4gICAgICAgICAgICAgICAgcHJpb3JpdHlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9iaW5kKGRvbTphbnksIGV2ZW50TmFtZTpFdmVudE5hbWUsIHRhcmdldDpHYW1lT2JqZWN0KXtcbiAgICAgICAgICAgIHZhciB3cmFwSGFuZGxlciA9IG51bGw7XG5cbiAgICAgICAgICAgIHdyYXBIYW5kbGVyID0gdGhpcy5idWlsZFdyYXBIYW5kbGVyKHRhcmdldCwgZXZlbnROYW1lKTtcblxuICAgICAgICAgICAgZHlDYi5FdmVudFV0aWxzLmFkZEV2ZW50KFxuICAgICAgICAgICAgICAgIGRvbSxcbiAgICAgICAgICAgICAgICBldmVudE5hbWUsXG4gICAgICAgICAgICAgICAgd3JhcEhhbmRsZXJcbiAgICAgICAgICAgIClcblxuICAgICAgICAgICAgcmV0dXJuIHdyYXBIYW5kbGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfdW5CaW5kKGRvbSwgZXZlbnROYW1lLCBoYW5kbGVyKXtcbiAgICAgICAgICAgIGR5Q2IuRXZlbnRVdGlscy5yZW1vdmVFdmVudChkb20sIGV2ZW50TmFtZSwgaGFuZGxlcik7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9kZWZpbml0aW9ucy5kLnRzXCIvPlxuXG4vL3Jlc3BvbnNpYmxpdHk6aGFuZGxlIGxvZ2ljIHdpdGggc3BlY2lmeSBldmVudCBjYXRlZ29yeVxuLy9qdWRnZSBpcyB1bmRlciBwb2ludFxuLy93cmFwIGV2ZW50IG9iamVjdFxubW9kdWxlIEVuZ2luZTNEIHtcbiAgICBleHBvcnQgY2xhc3MgTW91c2VFdmVudEhhbmRsZXIgZXh0ZW5kcyBEb21FdmVudEhhbmRsZXJ7XG4gICAgICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTpNb3VzZUV2ZW50SGFuZGxlciA9IG51bGw7XG5cbiAgICAgICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9pbnN0YW5jZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlID0gbmV3IHRoaXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBvbih0YXJnZXQ6R2FtZU9iamVjdCwgZXZlbnROYW1lOkV2ZW50TmFtZSwgaGFuZGxlcjpGdW5jdGlvbiwgcHJpb3JpdHk6bnVtYmVyKSB7XG4gICAgICAgICAgICBkeUNiLkxvZy5lcnJvcighKHRhcmdldCBpbnN0YW5jZW9mIEdhbWVPYmplY3QpLCBkeUNiLkxvZy5pbmZvLkZVTkNfTVVTVF9CRShcInRhcmdldFwiLCBcIkdhbWVPYmplY3RcIikpO1xuXG4gICAgICAgICAgICB0aGlzLmhhbmRsZXIodGFyZ2V0LCBldmVudE5hbWUsIGhhbmRsZXIsIHByaW9yaXR5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyB0cmlnZ2VyKHRhcmdldDpHYW1lT2JqZWN0LCBldmVudDpFdmVudCwgbm90U2V0VGFyZ2V0OmJvb2xlYW4pOmJvb2xlYW57XG4gICAgICAgICAgICB2YXIgZXZlbnROYW1lID0gZXZlbnQubmFtZSxcbiAgICAgICAgICAgICAgICBldmVudFR5cGUgPSBldmVudC50eXBlLFxuICAgICAgICAgICAgICAgIHJlZ2lzdGVyRGF0YUxpc3Q6ZHlDYi5Db2xsZWN0aW9uID0gbnVsbCxcbiAgICAgICAgICAgICAgICBpc1N0b3BQcm9wYWdhdGlvbiA9IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgICAgICBpZiAoISh0YXJnZXQgaW5zdGFuY2VvZiBHYW1lT2JqZWN0KSkge1xuICAgICAgICAgICAgICAgIGR5Q2IuTG9nLmxvZyhcInRhcmdldCBpcyBub3QgR2FtZU9iamVjdCwgY2FuJ3QgdHJpZ2dlciBldmVudFwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKCFub3RTZXRUYXJnZXQpe1xuICAgICAgICAgICAgICAgIGV2ZW50LnRhcmdldCA9IHRhcmdldDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVnaXN0ZXJEYXRhTGlzdCA9IEV2ZW50UmVnaXN0ZXIuZ2V0SW5zdGFuY2UoKS5nZXRFdmVudFJlZ2lzdGVyRGF0YUxpc3QodGFyZ2V0LCBldmVudE5hbWUpO1xuXG4gICAgICAgICAgICBpZiAocmVnaXN0ZXJEYXRhTGlzdCA9PT0gbnVsbCB8fCByZWdpc3RlckRhdGFMaXN0LmdldENvdW50KCk9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVnaXN0ZXJEYXRhTGlzdC5mb3JFYWNoKChyZWdpc3RlckRhdGE6SUV2ZW50UmVnaXN0ZXJEYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIGV2ZW50Q29weSA9IGV2ZW50LmNvcHkoKTtcblxuICAgICAgICAgICAgICAgIHJlZ2lzdGVyRGF0YS5oYW5kbGVyKGV2ZW50Q29weSk7XG4gICAgICAgICAgICAgICAgaWYoZXZlbnRDb3B5LmlzU3RvcFByb3BhZ2F0aW9uKXtcbiAgICAgICAgICAgICAgICAgICAgaXNTdG9wUHJvcGFnYXRpb24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gaXNTdG9wUHJvcGFnYXRpb247XG4gICAgICAgIH1cblxuICAgICAgICBwcm90ZWN0ZWQgZ2V0RG9tKCkge1xuICAgICAgICAgICAgcmV0dXJuIERpcmVjdG9yLmdldEluc3RhbmNlKCkuZ2V0VmlldygpLmRvbTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByb3RlY3RlZCBidWlsZFdyYXBIYW5kbGVyKHRhcmdldDpHYW1lT2JqZWN0LCBldmVudE5hbWU6RXZlbnROYW1lKXtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgICAgICAgICBjb250ZXh0ID0gd2luZG93O1xuXG4gICAgICAgICAgICByZXR1cm4gZHlDYi5FdmVudFV0aWxzLmJpbmRFdmVudChjb250ZXh0LCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgZXZlbnRPYmplY3Q6TW91c2VFdmVudCA9IHNlbGYuX2NyZWF0ZUV2ZW50T2JqZWN0KGV2ZW50LCBldmVudE5hbWUsIHRhcmdldCksXG4gICAgICAgICAgICAgICAgICAgIHRvcFRhcmdldCA9IERpcmVjdG9yLmdldEluc3RhbmNlKCkuZ2V0VG9wVW5kZXJQb2ludChldmVudE9iamVjdC5sb2NhdGlvbkluVmlldyk7XG5cbiAgICAgICAgICAgICAgICBFdmVudE1hbmFnZXIuZW1pdCh0b3BUYXJnZXQsIGV2ZW50T2JqZWN0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfaXNUcmlnZ2VyKHJlc3VsdCl7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0ICYmIHJlc3VsdC5nZXRDb3VudCgpID4gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2NyZWF0ZUV2ZW50T2JqZWN0KGV2ZW50OmFueSwgZXZlbnROYW1lOkV2ZW50TmFtZSwgY3VycmVudFRhcmdldDpHYW1lT2JqZWN0KSB7XG4gICAgICAgICAgICB2YXIgb2JqID0gTW91c2VFdmVudC5jcmVhdGUoZXZlbnQgPyBldmVudCA6IHdpbmRvdy5ldmVudCwgZXZlbnROYW1lKTtcblxuICAgICAgICAgICAgb2JqLmN1cnJlbnRUYXJnZXQgPSBjdXJyZW50VGFyZ2V0O1xuXG4gICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2RlZmluaXRpb25zLmQudHNcIi8+XG5tb2R1bGUgRW5naW5lM0Qge1xuICAgIGRlY2xhcmUgdmFyIGRvY3VtZW50OmFueTtcblxuICAgIC8vdG9kbyBiaW5kIG9uIEdhbWVPYmplY3Qgd2hpY2ggaGFzIHRoZSBmb2N1c1xuICAgIGV4cG9ydCBjbGFzcyBLZXlib2FyZEV2ZW50SGFuZGxlciBleHRlbmRzIERvbUV2ZW50SGFuZGxlcntcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOktleWJvYXJkRXZlbnRIYW5kbGVyID0gbnVsbDtcblxuICAgICAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2luc3RhbmNlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UgPSBuZXcgdGhpcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIG9uKGV2ZW50TmFtZTpFdmVudE5hbWUsIGhhbmRsZXI6RnVuY3Rpb24sIHByaW9yaXR5Om51bWJlcikge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVyKG51bGwsIGV2ZW50TmFtZSwgaGFuZGxlciwgcHJpb3JpdHkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHRyaWdnZXIoZXZlbnQ6RXZlbnQpOmJvb2xlYW57XG4gICAgICAgICAgICB2YXIgZXZlbnROYW1lID0gZXZlbnQubmFtZSxcbiAgICAgICAgICAgICAgICBldmVudFR5cGUgPSBldmVudC50eXBlLFxuICAgICAgICAgICAgICAgIHJlZ2lzdGVyRGF0YUxpc3Q6ZHlDYi5Db2xsZWN0aW9uID0gbnVsbCxcbiAgICAgICAgICAgICAgICBzZWxmID0gdGhpcztcblxuICAgICAgICAgICAgcmVnaXN0ZXJEYXRhTGlzdCA9IEV2ZW50UmVnaXN0ZXIuZ2V0SW5zdGFuY2UoKS5nZXRFdmVudFJlZ2lzdGVyRGF0YUxpc3QoZXZlbnROYW1lKTtcblxuICAgICAgICAgICAgaWYgKHJlZ2lzdGVyRGF0YUxpc3QgPT09IG51bGwgfHwgcmVnaXN0ZXJEYXRhTGlzdC5nZXRDb3VudCgpPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlZ2lzdGVyRGF0YUxpc3QuZm9yRWFjaCgocmVnaXN0ZXJEYXRhOklFdmVudFJlZ2lzdGVyRGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBldmVudENvcHkgPSBldmVudC5jb3B5KCk7XG5cbiAgICAgICAgICAgICAgICByZWdpc3RlckRhdGEuaGFuZGxlcihldmVudENvcHkpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJvdGVjdGVkIGdldERvbSgpIHtcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIHByb3RlY3RlZCBidWlsZFdyYXBIYW5kbGVyKHRhcmdldDpHYW1lT2JqZWN0LCBldmVudE5hbWU6RXZlbnROYW1lKXtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgICAgICAgICBjb250ZXh0ID0gd2luZG93O1xuXG4gICAgICAgICAgICByZXR1cm4gZHlDYi5FdmVudFV0aWxzLmJpbmRFdmVudChjb250ZXh0LCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBFdmVudE1hbmFnZXIudHJpZ2dlcihzZWxmLl9jcmVhdGVFdmVudE9iamVjdChldmVudCwgZXZlbnROYW1lKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgcHJpdmF0ZSBfaXNUcmlnZ2VyKHJlc3VsdCl7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0ICYmIHJlc3VsdC5nZXRDb3VudCgpID4gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2NyZWF0ZUV2ZW50T2JqZWN0KGV2ZW50OmFueSwgZXZlbnROYW1lOkV2ZW50TmFtZSkge1xuICAgICAgICAgICAgdmFyIG9iaiA9IEtleWJvYXJkRXZlbnQuY3JlYXRlKGV2ZW50ID8gZXZlbnQgOiB3aW5kb3cuZXZlbnQsIGV2ZW50TmFtZSk7XG5cbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vZGVmaW5pdGlvbnMuZC50c1wiLz5cbm1vZHVsZSBFbmdpbmUzRCB7XG4gICAgZXhwb3J0IGNsYXNzIEN1c3RvbUV2ZW50SGFuZGxlciBleHRlbmRzIEV2ZW50SGFuZGxlcntcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOkN1c3RvbUV2ZW50SGFuZGxlciA9IG51bGw7XG5cbiAgICAgICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9pbnN0YW5jZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlID0gbmV3IHRoaXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBvbihldmVudE5hbWU6c3RyaW5nLCBoYW5kbGVyOkZ1bmN0aW9uLCBwcmlvcml0eTpudW1iZXIpOnZvaWQ7XG4gICAgICAgIHB1YmxpYyBvbih0YXJnZXQ6R2FtZU9iamVjdCwgZXZlbnROYW1lOnN0cmluZywgaGFuZGxlcjpGdW5jdGlvbiwgcHJpb3JpdHk6bnVtYmVyKTp2b2lkO1xuXG4gICAgICAgIHB1YmxpYyBvbihhcmdzKSB7XG4gICAgICAgICAgICBpZihhcmd1bWVudHMubGVuZ3RoID09PSAzKXtcbiAgICAgICAgICAgICAgICBsZXQgZXZlbnROYW1lID0gYXJndW1lbnRzWzBdLFxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVyID0gYXJndW1lbnRzWzFdLFxuICAgICAgICAgICAgICAgICAgICBwcmlvcml0eSA9IGFyZ3VtZW50c1syXTtcblxuICAgICAgICAgICAgICAgIEV2ZW50UmVnaXN0ZXIuZ2V0SW5zdGFuY2UoKS5yZWdpc3RlcihcbiAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgPGFueT5ldmVudE5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXIsXG4gICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHByaW9yaXR5XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gNCl7XG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldCA9IGFyZ3VtZW50c1swXSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnROYW1lID0gYXJndW1lbnRzWzFdLFxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVyID0gYXJndW1lbnRzWzJdLFxuICAgICAgICAgICAgICAgICAgICBwcmlvcml0eSA9IGFyZ3VtZW50c1szXTtcblxuICAgICAgICAgICAgICAgIEV2ZW50UmVnaXN0ZXIuZ2V0SW5zdGFuY2UoKS5yZWdpc3RlcihcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LFxuICAgICAgICAgICAgICAgICAgICA8YW55PmV2ZW50TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlcixcbiAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgcHJpb3JpdHlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIG9mZihldmVudE5hbWU6c3RyaW5nKTp2b2lkO1xuICAgICAgICBwdWJsaWMgb2ZmKHVpZDpudW1iZXIsIGV2ZW50TmFtZTpzdHJpbmcpOnZvaWQ7XG4gICAgICAgIHB1YmxpYyBvZmYoZXZlbnROYW1lOnN0cmluZywgaGFuZGxlcjpGdW5jdGlvbik6dm9pZDtcbiAgICAgICAgcHVibGljIG9mZih0YXJnZXQ6R2FtZU9iamVjdCwgZXZlbnROYW1lOnN0cmluZywgaGFuZGxlcjpGdW5jdGlvbik6dm9pZDtcblxuICAgICAgICBwdWJsaWMgb2ZmKGFyZ3MpIHtcbiAgICAgICAgICAgIHZhciBldmVudFJlZ2lzdGVyID0gRXZlbnRSZWdpc3Rlci5nZXRJbnN0YW5jZSgpO1xuXG4gICAgICAgICAgICBldmVudFJlZ2lzdGVyLnJlbW92ZS5hcHBseShldmVudFJlZ2lzdGVyLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyB0cmlnZ2VyKGV2ZW50OkV2ZW50KTpib29sZWFuO1xuICAgICAgICBwdWJsaWMgdHJpZ2dlcihldmVudDpFdmVudCwgdXNlckRhdGE6YW55KTpib29sZWFuO1xuICAgICAgICBwdWJsaWMgdHJpZ2dlcih0YXJnZXQ6R2FtZU9iamVjdCwgZXZlbnQ6RXZlbnQsIG5vdFNldFRhcmdldDpib29sZWFuKTpib29sZWFuO1xuICAgICAgICBwdWJsaWMgdHJpZ2dlcih0YXJnZXQ6R2FtZU9iamVjdCwgZXZlbnQ6RXZlbnQsIHVzZXJEYXRhOmFueSwgbm90U2V0VGFyZ2V0OmJvb2xlYW4pOmJvb2xlYW47XG5cbiAgICAgICAgcHVibGljIHRyaWdnZXIoYXJncykge1xuICAgICAgICAgICAgdmFyIGV2ZW50OkV2ZW50ID0gbnVsbDtcblxuICAgICAgICAgICAgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKXtcbiAgICAgICAgICAgICAgICBsZXQgdXNlckRhdGEgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSl7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50ID0gYXJndW1lbnRzWzBdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBldmVudCA9IGFyZ3VtZW50c1swXTtcbiAgICAgICAgICAgICAgICAgICAgdXNlckRhdGEgPSBhcmd1bWVudHNbMV07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RyaWdnZXJFdmVudEhhbmRsZXIoZXZlbnQsIHVzZXJEYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMyB8fCBhcmd1bWVudHMubGVuZ3RoID09PSA0KXtcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0ID0gbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgdXNlckRhdGEgPSBudWxsLFxuICAgICAgICAgICAgICAgICAgICBub3RTZXRUYXJnZXQgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMyl7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldCA9IGFyZ3VtZW50c1swXTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQgPSBhcmd1bWVudHNbMV07XG4gICAgICAgICAgICAgICAgICAgIG5vdFNldFRhcmdldCA9IGFyZ3VtZW50c1syXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0ID0gYXJndW1lbnRzWzBdO1xuICAgICAgICAgICAgICAgICAgICBldmVudCA9IGFyZ3VtZW50c1sxXTtcbiAgICAgICAgICAgICAgICAgICAgdXNlckRhdGEgPSBhcmd1bWVudHNbMl07XG4gICAgICAgICAgICAgICAgICAgIG5vdFNldFRhcmdldCA9IGFyZ3VtZW50c1szXTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdHJpZ2dlclRhcmdldEFuZEV2ZW50SGFuZGxlcih0YXJnZXQsIGV2ZW50LCB1c2VyRGF0YSwgbm90U2V0VGFyZ2V0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfdHJpZ2dlckV2ZW50SGFuZGxlcihldmVudCwgdXNlckRhdGEpe1xuICAgICAgICAgICAgdmFyIGxpc3RlbmVyRGF0YUxpc3Q6ZHlDYi5Db2xsZWN0aW9uID0gbnVsbCxcbiAgICAgICAgICAgICAgICBpc1N0b3BQcm9wYWdhdGlvbiA9IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgICAgICBsaXN0ZW5lckRhdGFMaXN0ID0gRXZlbnRSZWdpc3Rlci5nZXRJbnN0YW5jZSgpLmdldEV2ZW50UmVnaXN0ZXJEYXRhTGlzdChldmVudC5uYW1lKTtcblxuICAgICAgICAgICAgaWYgKGxpc3RlbmVyRGF0YUxpc3QgPT09IG51bGwgfHwgbGlzdGVuZXJEYXRhTGlzdC5nZXRDb3VudCgpPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxpc3RlbmVyRGF0YUxpc3QuZm9yRWFjaCgobGlzdGVuZXJEYXRhOklFdmVudFJlZ2lzdGVyRGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBldmVudENvcHkgPSBldmVudC5jb3B5KCk7XG5cbiAgICAgICAgICAgICAgICBldmVudENvcHkuY3VycmVudFRhcmdldCA9IGxpc3RlbmVyRGF0YS50YXJnZXQ7XG4gICAgICAgICAgICAgICAgZXZlbnRDb3B5LnRhcmdldCA9IGxpc3RlbmVyRGF0YS50YXJnZXQ7XG5cbiAgICAgICAgICAgICAgICBzZWxmLl9zZXRVc2VyRGF0YShldmVudENvcHksIHVzZXJEYXRhKTtcblxuICAgICAgICAgICAgICAgIGxpc3RlbmVyRGF0YS5oYW5kbGVyKGV2ZW50Q29weSk7XG5cbiAgICAgICAgICAgICAgICAvL2lmKGV2ZW50Q29weS5pc1N0b3BQcm9wYWdhdGlvbil7XG4gICAgICAgICAgICAgICAgLy8gICAgaXNTdG9wUHJvcGFnYXRpb24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIC8vfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vcmV0dXJuIGlzU3RvcFByb3BhZ2F0aW9uO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF90cmlnZ2VyVGFyZ2V0QW5kRXZlbnRIYW5kbGVyKHRhcmdldCwgZXZlbnQsIHVzZXJEYXRhLCBub3RTZXRUYXJnZXQpe1xuICAgICAgICAgICAgdmFyIGxpc3RlbmVyRGF0YUxpc3Q6ZHlDYi5Db2xsZWN0aW9uID0gbnVsbCxcbiAgICAgICAgICAgICAgICBpc1N0b3BQcm9wYWdhdGlvbiA9IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgICAgICBpZighbm90U2V0VGFyZ2V0KXtcbiAgICAgICAgICAgICAgICBldmVudC50YXJnZXQgPSB0YXJnZXQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxpc3RlbmVyRGF0YUxpc3QgPSBFdmVudFJlZ2lzdGVyLmdldEluc3RhbmNlKCkuZ2V0RXZlbnRSZWdpc3RlckRhdGFMaXN0KHRhcmdldCwgZXZlbnQubmFtZSk7XG5cbiAgICAgICAgICAgIGlmIChsaXN0ZW5lckRhdGFMaXN0ID09PSBudWxsIHx8IGxpc3RlbmVyRGF0YUxpc3QuZ2V0Q291bnQoKT09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsaXN0ZW5lckRhdGFMaXN0LmZvckVhY2goKGxpc3RlbmVyRGF0YTpJRXZlbnRSZWdpc3RlckRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgZXZlbnRDb3B5ID0gZXZlbnQuY29weSgpO1xuXG4gICAgICAgICAgICAgICAgZXZlbnRDb3B5LmN1cnJlbnRUYXJnZXQgPSBsaXN0ZW5lckRhdGEudGFyZ2V0O1xuXG4gICAgICAgICAgICAgICAgc2VsZi5fc2V0VXNlckRhdGEoZXZlbnRDb3B5LCB1c2VyRGF0YSk7XG5cbiAgICAgICAgICAgICAgICBsaXN0ZW5lckRhdGEuaGFuZGxlcihldmVudENvcHkpO1xuXG4gICAgICAgICAgICAgICAgaWYoZXZlbnRDb3B5LmlzU3RvcFByb3BhZ2F0aW9uKXtcbiAgICAgICAgICAgICAgICAgICAgaXNTdG9wUHJvcGFnYXRpb24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gaXNTdG9wUHJvcGFnYXRpb247XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9zZXRVc2VyRGF0YShldmVudDpDdXN0b21FdmVudCwgdXNlckRhdGEpe1xuICAgICAgICAgICAgaWYodXNlckRhdGEpe1xuICAgICAgICAgICAgICAgIGV2ZW50LnVzZXJEYXRhID0gdXNlckRhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vZGVmaW5pdGlvbnMuZC50c1wiLz5cbm1vZHVsZSBFbmdpbmUzRCB7XG4gICAgZXhwb3J0IGNsYXNzIEV2ZW50RGlzcGF0Y2hlciB7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKCkge1xuICAgICAgICAgICAgdmFyIG9iaiA9IG5ldyB0aGlzKCk7XG5cbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH1cblxuICAgICAgICAvL3ByaXZhdGUgX2V2ZW50QmluZGVyOiBFdmVudEJpbmRlciA9IG51bGw7XG4gICAgICAgIC8vcHJpdmF0ZSBfZXZlbnRSZWdpc3RlcjpFdmVudFJlZ2lzdGVyID0gbnVsbDtcblxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIC8vdGhpcy5fZXZlbnRCaW5kZXIgPSBiaW5kZXI7XG4gICAgICAgICAgICAvL0V2ZW50UmVnaXN0ZXIuZ2V0SW5zdGFuY2UoKSA9IHJlZ2lzdGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9kaXNwYXRjaCBpbiBldmVudEJpbmRlci0+ZXZlbnRMaXN0XG5cblxuICAgICAgICAvL3B1YmxpYyBzZXRCdWJibGVQYXJlbnQodGFyZ2V0OkdhbWVPYmplY3QsIHBhcmVudDphbnkpIHtcbiAgICAgICAgLy8gICAgRXZlbnRSZWdpc3Rlci5nZXRJbnN0YW5jZSgpLnNldEJ1YmJsZVBhcmVudCh0YXJnZXQsIHBhcmVudCk7XG4gICAgICAgIC8vfVxuXG4gICAgICAgIHB1YmxpYyB0cmlnZ2VyKGV2ZW50OkV2ZW50KTpib29sZWFuO1xuICAgICAgICBwdWJsaWMgdHJpZ2dlcihldmVudDpFdmVudCwgdXNlckRhdGE6YW55KTp2b2lkO1xuICAgICAgICBwdWJsaWMgdHJpZ2dlcih0YXJnZXQ6R2FtZU9iamVjdCwgZXZlbnQ6RXZlbnQpOmJvb2xlYW47XG4gICAgICAgIHB1YmxpYyB0cmlnZ2VyKHRhcmdldDpHYW1lT2JqZWN0LCBldmVudDpFdmVudCwgbm90U2V0VGFyZ2V0OmJvb2xlYW4pOmJvb2xlYW47XG4gICAgICAgIHB1YmxpYyB0cmlnZ2VyKHRhcmdldDpHYW1lT2JqZWN0LCBldmVudDpFdmVudCwgdXNlckRhdGE6YW55KTpib29sZWFuO1xuICAgICAgICBwdWJsaWMgdHJpZ2dlcih0YXJnZXQ6R2FtZU9iamVjdCwgZXZlbnQ6RXZlbnQsIHVzZXJEYXRhOmFueSwgbm90U2V0VGFyZ2V0OmJvb2xlYW4pOmJvb2xlYW47XG5cbiAgICAgICAgcHVibGljIHRyaWdnZXIoYXJncykge1xuICAgICAgICAgICAgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSl7XG4gICAgICAgICAgICAgICAgbGV0IGV2ZW50ID0gYXJndW1lbnRzWzBdLFxuICAgICAgICAgICAgICAgICAgICBldmVudFR5cGUgPSBldmVudC50eXBlO1xuXG4gICAgICAgICAgICAgICAgLy9keUNiLkxvZy5lcnJvcihldmVudFR5cGUgIT09IEV2ZW50VHlwZS5DVVNUT00sIGR5Q2IuTG9nLmluZm8uRlVOQ19NVVNUX0JFKFwiZXZlbnQgdHlwZVwiLCBcIkNVU1RPTVwiKSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gRmFjdG9yeUV2ZW50SGFuZGxlci5jcmVhdGVFdmVudEhhbmRsZXIoZXZlbnRUeXBlKVxuICAgICAgICAgICAgICAgICAgICAudHJpZ2dlcihldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDIgJiYgIShhcmd1bWVudHNbMV0gaW5zdGFuY2VvZiBFdmVudCkpe1xuICAgICAgICAgICAgICAgIGxldCBldmVudCA9IGFyZ3VtZW50c1swXSxcbiAgICAgICAgICAgICAgICAgICAgdXNlckRhdGEgPSBhcmd1bWVudHNbMV0sXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50VHlwZSA9IGV2ZW50LnR5cGU7XG5cbiAgICAgICAgICAgICAgICBkeUNiLkxvZy5lcnJvcihldmVudFR5cGUgIT09IEV2ZW50VHlwZS5DVVNUT00sIGR5Q2IuTG9nLmluZm8uRlVOQ19NVVNUX0JFKFwiZXZlbnQgdHlwZVwiLCBcIkNVU1RPTVwiKSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gRmFjdG9yeUV2ZW50SGFuZGxlci5jcmVhdGVFdmVudEhhbmRsZXIoZXZlbnRUeXBlKVxuICAgICAgICAgICAgICAgICAgICAudHJpZ2dlcihldmVudCwgdXNlckRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhcmd1bWVudHMubGVuZ3RoID09PSAyIHx8IChhcmd1bWVudHMubGVuZ3RoID09PSAzICYmIEp1ZGdlVXRpbHMuaXNCb29sZWFuKGFyZ3VtZW50c1syXSkpKXtcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0ID0gYXJndW1lbnRzWzBdLFxuICAgICAgICAgICAgICAgICAgICBldmVudCA9IGFyZ3VtZW50c1sxXSxcbiAgICAgICAgICAgICAgICAgICAgbm90U2V0VGFyZ2V0ID0gYXJndW1lbnRzWzJdID09PSB2b2lkIDAgPyBmYWxzZSA6IGFyZ3VtZW50c1syXSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRUeXBlID0gZXZlbnQudHlwZTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBGYWN0b3J5RXZlbnRIYW5kbGVyLmNyZWF0ZUV2ZW50SGFuZGxlcihldmVudFR5cGUpXG4gICAgICAgICAgICAgICAgICAgIC50cmlnZ2VyKHRhcmdldCwgZXZlbnQsIG5vdFNldFRhcmdldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDMgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gNCl7XG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldCA9IGFyZ3VtZW50c1swXSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQgPSBhcmd1bWVudHNbMV0sXG4gICAgICAgICAgICAgICAgICAgIHVzZXJEYXRhID0gYXJndW1lbnRzWzJdLFxuICAgICAgICAgICAgICAgICAgICBub3RTZXRUYXJnZXQgPSBhcmd1bWVudHNbM10gPT09IHZvaWQgMCA/IGZhbHNlIDogYXJndW1lbnRzWzNdLFxuICAgICAgICAgICAgICAgICAgICBldmVudFR5cGUgPSBldmVudC50eXBlO1xuXG4gICAgICAgICAgICAgICAgZHlDYi5Mb2cuZXJyb3IoZXZlbnRUeXBlICE9PSBFdmVudFR5cGUuQ1VTVE9NLCBkeUNiLkxvZy5pbmZvLkZVTkNfTVVTVF9CRShcImV2ZW50IHR5cGVcIiwgXCJDVVNUT01cIikpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIEZhY3RvcnlFdmVudEhhbmRsZXIuY3JlYXRlRXZlbnRIYW5kbGVyKGV2ZW50VHlwZSlcbiAgICAgICAgICAgICAgICAgICAgLnRyaWdnZXIodGFyZ2V0LCBldmVudCwgdXNlckRhdGEsIG5vdFNldFRhcmdldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogdHJhbnNmZXIgZXZlbnQgdXBcbiAgICAgICAgICogQHBhcmFtIHRhcmdldFxuICAgICAgICAgKiBAcGFyYW0gZXZlbnRPYmplY3RcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBlbWl0KHRhcmdldDpHYW1lT2JqZWN0LCBldmVudE9iamVjdDpFdmVudCwgdXNlckRhdGE/OmFueSkge1xuICAgICAgICAgICAgdmFyIGlzU3RvcFByb3BhZ2F0aW9uID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGV2ZW50T2JqZWN0LnBoYXNlID0gRXZlbnRQaGFzZS5FTUlUO1xuICAgICAgICAgICAgZXZlbnRPYmplY3QudGFyZ2V0ID0gdGFyZ2V0O1xuXG4gICAgICAgICAgICBkb3tcbiAgICAgICAgICAgICAgICBpc1N0b3BQcm9wYWdhdGlvbiA9IHRoaXMuX3RyaWdnZXJXaXRoVXNlckRhdGEodGFyZ2V0LCBldmVudE9iamVjdC5jb3B5KCksIHVzZXJEYXRhLCB0cnVlKTtcblxuICAgICAgICAgICAgICAgIGlmKGlzU3RvcFByb3BhZ2F0aW9uKXtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRhcmdldCA9IHRoaXMuX2dldFBhcmVudCh0YXJnZXQpO1xuICAgICAgICAgICAgfXdoaWxlKHRhcmdldCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogdHJhbnNmZXIgZXZlbnQgZG93blxuICAgICAgICAgKiBAcGFyYW0gdGFyZ2V0XG4gICAgICAgICAqIEBwYXJhbSBldmVudE9iamVjdFxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGJyb2FkY2FzdCh0YXJnZXQ6R2FtZU9iamVjdCwgZXZlbnRPYmplY3Q6RXZlbnQsIHVzZXJEYXRhPzphbnkpIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICAgICAgZXZlbnRPYmplY3QucGhhc2UgPSBFdmVudFBoYXNlLkJST0FEQ0FTVDtcbiAgICAgICAgICAgIGV2ZW50T2JqZWN0LnRhcmdldCA9IHRhcmdldDtcblxuICAgICAgICAgICAgdGhpcy5fdHJpZ2dlcldpdGhVc2VyRGF0YSh0YXJnZXQsIGV2ZW50T2JqZWN0LmNvcHkoKSwgdXNlckRhdGEsIHRydWUpO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBpdGVyYXRvcihvYmo6R2FtZU9iamVjdCl7XG4gICAgICAgICAgICAgICAgdmFyIGNoaWxkcmVuOmR5Q2IuQ29sbGVjdGlvbiA9IG9iai5nZXRDaGlscmVuKCk7XG5cbiAgICAgICAgICAgICAgICBpZihjaGlsZHJlbi5nZXRDb3VudCgpID09PSAwKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNoaWxkcmVuLmZvckVhY2goKGNoaWxkOkdhbWVPYmplY3QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5fdHJpZ2dlcldpdGhVc2VyRGF0YShjaGlsZCwgZXZlbnRPYmplY3QuY29weSgpLCB1c2VyRGF0YSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaXRlcmF0b3IoY2hpbGQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpdGVyYXRvcih0YXJnZXQpO1xuICAgICAgICB9XG5cbiAgICAgICBwcml2YXRlIF9nZXRQYXJlbnQodGFyZ2V0OkdhbWVPYmplY3QpOkdhbWVPYmplY3Qge1xuICAgICAgICAgICAgdmFyIHBhcmVudCA9IHRhcmdldC5idWJibGVQYXJlbnQ7XG5cbiAgICAgICAgICAgIHJldHVybiBwYXJlbnQgPyBwYXJlbnQgOiB0YXJnZXQucGFyZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfdHJpZ2dlcldpdGhVc2VyRGF0YSh0YXJnZXQsIGV2ZW50LCB1c2VyRGF0YSwgbm90U2V0VGFyZ2V0KXtcbiAgICAgICAgICAgIHJldHVybiB1c2VyRGF0YSA/IHRoaXMudHJpZ2dlcih0YXJnZXQsIGV2ZW50LmNvcHkoKSwgdXNlckRhdGEsIG5vdFNldFRhcmdldClcbiAgICAgICAgICAgICAgICA6IHRoaXMudHJpZ2dlcih0YXJnZXQsIGV2ZW50LCBub3RTZXRUYXJnZXQpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2RlZmluaXRpb25zLmQudHNcIi8+XG5tb2R1bGUgRW5naW5lM0Qge1xuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUV2ZW50UmVnaXN0ZXJEYXRhIHtcbiAgICAgICAgdGFyZ2V0OkdhbWVPYmplY3QsXG4gICAgICAgIC8vdXNlcidzIGV2ZW50IGhhbmRsZXJcbiAgICAgICAgaGFuZGxlcjpGdW5jdGlvbixcbiAgICAgICAgLy90aGUgYWN0dWFsIGV2ZW50IGhhbmRsZXJcbiAgICAgICAgd3JhcEhhbmRsZXI6RnVuY3Rpb24sXG4gICAgICAgIHByaW9yaXR5Om51bWJlclxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBFdmVudFJlZ2lzdGVyIHtcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOkV2ZW50UmVnaXN0ZXIgPSBudWxsO1xuXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5faW5zdGFuY2UgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9pbnN0YW5jZSA9IG5ldyB0aGlzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHByaXZhdGUgX2xpc3RlbmVyTWFwOkV2ZW50TGlzdGVuZXJNYXAgPSBFdmVudExpc3RlbmVyTWFwLmNyZWF0ZSgpO1xuXG4gICAgICAgIHB1YmxpYyByZWdpc3Rlcih0YXJnZXQ6R2FtZU9iamVjdCwgZXZlbnROYW1lOkV2ZW50TmFtZSwgaGFuZGxlcjpGdW5jdGlvbiwgd3JhcEhhbmRsZXI6RnVuY3Rpb24sIHByaW9yaXR5Om51bWJlcikge1xuICAgICAgICAgICAgLy92YXIgaXNCaW5kRXZlbnRPblZpZXcgPSBmYWxzZSxcbiAgICAgICAgICAgIHZhciBkYXRhID0gPElFdmVudFJlZ2lzdGVyRGF0YT57XG4gICAgICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogaGFuZGxlcixcbiAgICAgICAgICAgICAgICB3cmFwSGFuZGxlcjogd3JhcEhhbmRsZXIsXG4gICAgICAgICAgICAgICAgcHJpb3JpdHk6IHByaW9yaXR5XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvL2V2ZW50TmFtZSA9IDxzdHJpbmc+ZXZlbnROYW1lO1xuICAgICAgICAgICAgLy8vL3ByaW9yaXR5IHNldCBpbiBsaXN0ZW5lciwgbm90IGluIHRoaXMoYmluZGVyKSFcbiAgICAgICAgICAgIC8vaWYocHJpb3JpdHkpe1xuICAgICAgICAgICAgLy8gICAgbGlzdGVuZXIuc2V0UHJpb3JpdHkocHJpb3JpdHkpO1xuICAgICAgICAgICAgLy99XG5cblxuICAgICAgICAgICAgLy9pZiAodGhpcy5pc0JpbmRFdmVudE9uVmlldyhldmVudE5hbWUpKXtcbiAgICAgICAgICAgIC8vICAgIGlzQmluZEV2ZW50T25WaWV3ID0gdHJ1ZTtcbiAgICAgICAgICAgIC8vICAgIC8vdGhpcy5fbGlzdGVuZXJNYXAuYXBwZW5kQ2hpbGQodGhpcy5fYnVpbGRLZXkodGFyZ2V0LnVpZCwgZXZlbnROYW1lKSwgaGFuZGxlcik7XG4gICAgICAgICAgICAvL31cbiAgICAgICAgICAgIC8vZWxzZSB7XG4gICAgICAgICAgICAvLyAgICBpc0JpbmRFdmVudE9uVmlldyA9IGZhbHNlO1xuICAgICAgICAgICAgLy8gICAgLy90aGlzLl9saXN0ZW5lck1hcC5hZGRDaGlsZChldmVudE5hbWUsIGRhdGEpO1xuICAgICAgICAgICAgLy99XG5cblxuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJNYXAuYXBwZW5kQ2hpbGQoZXZlbnROYW1lLCBkYXRhKTtcblxuXG4gICAgICAgICAgICAvL3RoaXMuX2xpc3RlbmVyTGlzdC5hZGRDaGlsZChsaXN0ZW5lci5ldmVudFR5cGUsICB7XG4gICAgICAgICAgICAvLyAgICB0YXJnZXQ6dGFyZ2V0LFxuICAgICAgICAgICAgLy8gICAgbGlzdGVuZXI6bGlzdGVuZXJcbiAgICAgICAgICAgIC8vfSk7XG5cbiAgICAgICAgICAgIC8vcmV0dXJuIGlzQmluZEV2ZW50T25WaWV3O1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHJlbW92ZShldmVudE5hbWU6RXZlbnROYW1lKTp2b2lkO1xuICAgICAgICBwdWJsaWMgcmVtb3ZlKGV2ZW50TmFtZTpFdmVudE5hbWUsIGhhbmRsZXI6RnVuY3Rpb24pOnZvaWQ7XG4gICAgICAgIHB1YmxpYyByZW1vdmUodWlkOm51bWJlciwgZXZlbnROYW1lOkV2ZW50TmFtZSk6dm9pZDtcbiAgICAgICAgcHVibGljIHJlbW92ZSh0YXJnZXQ6R2FtZU9iamVjdCk6dm9pZDtcbiAgICAgICAgcHVibGljIHJlbW92ZSh0YXJnZXQ6R2FtZU9iamVjdCwgZXZlbnROYW1lOkV2ZW50TmFtZSk6dm9pZDtcbiAgICAgICAgcHVibGljIHJlbW92ZSh0YXJnZXQ6R2FtZU9iamVjdCwgZXZlbnROYW1lOkV2ZW50TmFtZSwgaGFuZGxlcjpGdW5jdGlvbik6dm9pZDtcblxuICAgICAgICBwdWJsaWMgcmVtb3ZlKGFyZ3MpIHtcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSBhcmd1bWVudHNbMF07XG5cbiAgICAgICAgICAgIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDEgJiYgSnVkZ2VVdGlscy5pc1N0cmluZyhhcmd1bWVudHNbMF0pKXtcbiAgICAgICAgICAgICAgICBsZXQgZXZlbnROYW1lID0gYXJndW1lbnRzWzBdO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJNYXAucmVtb3ZlQ2hpbGQoZXZlbnROYW1lKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhcmd1bWVudHMubGVuZ3RoID09PSAyICYmIEp1ZGdlVXRpbHMuaXNGdW5jdGlvbihhcmd1bWVudHNbMV0pKXtcbiAgICAgICAgICAgICAgICBsZXQgZXZlbnROYW1lID0gYXJndW1lbnRzWzBdLFxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVyID0gYXJndW1lbnRzWzFdO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJNYXAucmVtb3ZlQ2hpbGQoZXZlbnROYW1lLCBoYW5kbGVyKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhcmd1bWVudHMubGVuZ3RoID09PSAyICYmIEp1ZGdlVXRpbHMuaXNOdW1iZXIoYXJndW1lbnRzWzBdKSl7XG4gICAgICAgICAgICAgICAgbGV0IHVpZCA9IGFyZ3VtZW50c1swXSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnROYW1lID0gYXJndW1lbnRzWzFdO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJNYXAucmVtb3ZlQ2hpbGQodWlkLCBldmVudE5hbWUpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpe1xuICAgICAgICAgICAgICAgIGxldCBkYXRhTGlzdCA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICBkYXRhTGlzdCA9IHRoaXMuX2xpc3RlbmVyTWFwLmdldEV2ZW50T2ZmRGF0YUxpc3QodGFyZ2V0KTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVyTWFwLnJlbW92ZUNoaWxkKHRhcmdldCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9oYW5kbGVBZnRlckFsbEV2ZW50SGFuZGxlclJlbW92ZWQodGFyZ2V0KTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhTGlzdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMiB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAzKXtcbiAgICAgICAgICAgICAgICBsZXQgZXZlbnROYW1lID0gYXJndW1lbnRzWzFdO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJNYXAucmVtb3ZlQ2hpbGQuYXBwbHkodGhpcy5fbGlzdGVuZXJNYXAsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCkpO1xuXG4gICAgICAgICAgICAgICAgaWYodGhpcy5faXNBbGxFdmVudEhhbmRsZXJSZW1vdmVkKHRhcmdldCkpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9oYW5kbGVBZnRlckFsbEV2ZW50SGFuZGxlclJlbW92ZWQodGFyZ2V0KTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbGlzdGVuZXJNYXAuZ2V0RXZlbnRPZmZEYXRhTGlzdCh0YXJnZXQsIGV2ZW50TmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgZ2V0RXZlbnRSZWdpc3RlckRhdGFMaXN0KGV2ZW50TmFtZTpFdmVudE5hbWUpOmR5Q2IuQ29sbGVjdGlvbjtcbiAgICAgICAgcHVibGljIGdldEV2ZW50UmVnaXN0ZXJEYXRhTGlzdChjdXJyZW50VGFyZ2V0OkdhbWVPYmplY3QsIGV2ZW50TmFtZTpFdmVudE5hbWUpOmR5Q2IuQ29sbGVjdGlvbjtcblxuICAgICAgICBwdWJsaWMgZ2V0RXZlbnRSZWdpc3RlckRhdGFMaXN0KGFyZ3Mpe1xuICAgICAgICAgICAgdmFyIHJlc3VsdDpkeUNiLkNvbGxlY3Rpb24gPSB0aGlzLl9saXN0ZW5lck1hcC5nZXRDaGlsZC5hcHBseSh0aGlzLl9saXN0ZW5lck1hcCwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSksXG4gICAgICAgICAgICAgICAgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgICAgIGlmKCFyZXN1bHQpe1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0LnNvcnQoZnVuY3Rpb24gKGRhdGFBLCBkYXRhQikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YUIucHJpb3JpdHkgLSBkYXRhQS5wcmlvcml0eTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzZXRCdWJibGVQYXJlbnQodGFyZ2V0OkdhbWVPYmplY3QsIHBhcmVudDpHYW1lT2JqZWN0KSB7XG4gICAgICAgICAgICB0YXJnZXQuYnViYmxlUGFyZW50ID0gcGFyZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGlzQmluZGVkKHRhcmdldDpHYW1lT2JqZWN0LCBldmVudE5hbWU6RXZlbnROYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbGlzdGVuZXJNYXAuaGFzQ2hpbGQodGFyZ2V0LCBldmVudE5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGZpbHRlcihmdW5jOkZ1bmN0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbGlzdGVuZXJNYXAuZmlsdGVyKGZ1bmMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGZvckVhY2goZnVuYzpGdW5jdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RlbmVyTWFwLmZvckVhY2goZnVuYyk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgZ2V0Q2hpbGQodGFyZ2V0OkdhbWVPYmplY3QsIGV2ZW50TmFtZT86RXZlbnROYW1lKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9saXN0ZW5lck1hcC5nZXRDaGlsZC5hcHBseShcbiAgICAgICAgICAgICAgICB0aGlzLl9saXN0ZW5lck1hcCxcbiAgICAgICAgICAgICAgICBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGdldEV2ZW50TmFtZUZyb21LZXkoa2V5OnN0cmluZyl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbGlzdGVuZXJNYXAuZ2V0RXZlbnROYW1lRnJvbUtleShrZXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGdldFVpZEZyb21LZXkoa2V5OnN0cmluZyl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbGlzdGVuZXJNYXAuZ2V0VWlkRnJvbUtleShrZXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGdldFdyYXBIYW5kbGVyKHRhcmdldDpHYW1lT2JqZWN0LCBldmVudE5hbWU6RXZlbnROYW1lKXtcbiAgICAgICAgICAgIHZhciBsaXN0OmR5Q2IuQ29sbGVjdGlvbiA9IHRoaXMuZ2V0Q2hpbGQodGFyZ2V0LCBldmVudE5hbWUpO1xuXG4gICAgICAgICAgICBpZihsaXN0ICYmIGxpc3QuZ2V0Q291bnQoKSA+IDApe1xuICAgICAgICAgICAgICAgIHJldHVybiBsaXN0LmdldENoaWxkKDApLndyYXBIYW5kbGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGlzVGFyZ2V0KGtleTpzdHJpbmcsIHRhcmdldDpHYW1lT2JqZWN0LCBsaXN0OmR5Q2IuQ29sbGVjdGlvbil7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbGlzdGVuZXJNYXAuaXNUYXJnZXQoa2V5LCB0YXJnZXQsIGxpc3QpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9wdWJsaWMgY29weSgpe1xuICAgICAgICAvL1xuICAgICAgICAvL31cblxuICAgICAgICAvL3ByaXZhdGUgX2lzQ29udGFpbihwYXJlbnRUYXJnZXQ6R2FtZU9iamVjdCwgY2hpbGRUYXJnZXQ6R2FtZU9iamVjdCl7XG4gICAgICAgIC8vICAgIHZhciBwYXJlbnQgPSBudWxsO1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICBwYXJlbnQgPSBjaGlsZFRhcmdldC5wYXJlbnQ7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgIHdoaWxlKHBhcmVudCl7XG4gICAgICAgIC8vICAgICAgICBpZihKdWRnZVV0aWxzLmlzRXF1YWwocGFyZW50LCBwYXJlbnRUYXJnZXQpKXtcbiAgICAgICAgLy8gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgLy8gICAgICAgIH1cbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgICAgIHBhcmVudCA9IGNoaWxkVGFyZ2V0LnBhcmVudDtcbiAgICAgICAgLy8gICAgfVxuICAgICAgICAvL1xuICAgICAgICAvLyAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIC8vfVxuXG5cbiAgICAgICAgLy9wcml2YXRlIF9yZW1vdmVGcm9tTWFwKHRhcmdldDpHYW1lT2JqZWN0LCBldmVudE5hbWU6RXZlbnROYW1lKSB7XG4gICAgICAgIC8vfVxuXG4gICAgICAgIHByaXZhdGUgX2lzQWxsRXZlbnRIYW5kbGVyUmVtb3ZlZCh0YXJnZXQ6R2FtZU9iamVjdCl7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuX2xpc3RlbmVyTWFwLmhhc0NoaWxkKChsaXN0OmR5Q2IuQ29sbGVjdGlvbiwga2V5OnN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBrZXkuaW5kZXhPZihTdHJpbmcodGFyZ2V0LnVpZCkpID4gLTEgJiYgbGlzdCAhPT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9oYW5kbGVBZnRlckFsbEV2ZW50SGFuZGxlclJlbW92ZWQodGFyZ2V0OkdhbWVPYmplY3Qpe1xuICAgICAgICAgICAgdGhpcy5zZXRCdWJibGVQYXJlbnQodGFyZ2V0LCBudWxsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vcHJpdmF0ZSBfYnVpbGRLZXkodWlkLCBldmVudE5hbWUpe1xuICAgICAgICAvLyAgICByZXR1cm4gU3RyaW5nKHVpZCkgKyBcIl9cIiArIGV2ZW50TmFtZTtcbiAgICAgICAgLy99XG4gICAgfVxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9kZWZpbml0aW9ucy5kLnRzXCIvPlxubW9kdWxlIEVuZ2luZTNEIHtcbiAgICAvL3Jlc3BvbnNpYmlsdHk6b24sIG9mZiBldmVudChtYW5hZ2UgbGlzdClcblxuICAgIGV4cG9ydCBjbGFzcyBFdmVudEJpbmRlciB7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKCkge1xuICAgICAgICAgICAgdmFyIG9iaiA9IG5ldyB0aGlzKCk7XG5cbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH1cblxuICAgICAgICAvL3ByaXZhdGUgX2xpc3RlbmVyTGlzdDpFdmVudExpc3RlbmVyID0gRXZlbnRMaXN0ZW5lci5jcmVhdGUoKTtcbiAgICAgICAgLy9wcml2YXRlIF9ldmVudFJlZ2lzdGVyOkV2ZW50UmVnaXN0ZXIgPSBudWxsO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAgICAgLy9FdmVudFJlZ2lzdGVyLmdldEluc3RhbmNlKCkgPSBldmVudFJlZ2lzdGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIG9uKGV2ZW50TmFtZTpFdmVudE5hbWUsIGhhbmRsZXI6RnVuY3Rpb24sIHByaW9yaXR5Om51bWJlcik6dm9pZDtcbiAgICAgICAgcHVibGljIG9uKGxpc3RlbmVyOnt9fEV2ZW50TGlzdGVuZXIpOnZvaWQ7XG4gICAgICAgIHB1YmxpYyBvbih0YXJnZXQ6R2FtZU9iamVjdCwgbGlzdGVuZXI6e318RXZlbnRMaXN0ZW5lcik6dm9pZDtcbiAgICAgICAgcHVibGljIG9uKHRhcmdldDpHYW1lT2JqZWN0LCBldmVudE5hbWU6RXZlbnROYW1lLCBoYW5kbGVyOkZ1bmN0aW9uLCBwcmlvcml0eTpudW1iZXIpOnZvaWQ7XG5cbiAgICAgICAgcHVibGljIG9uKGFyZ3MpIHtcbiAgICAgICAgICAgIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpe1xuICAgICAgICAgICAgICAgIGxldCBsaXN0ZW5lcjpFdmVudExpc3RlbmVyID0gIShhcmd1bWVudHNbMF0gaW5zdGFuY2VvZiBFdmVudExpc3RlbmVyKSA/ICBFdmVudExpc3RlbmVyLmNyZWF0ZShhcmd1bWVudHNbMF0pOiBhcmd1bWVudHNbMF07XG5cbiAgICAgICAgICAgICAgICBsaXN0ZW5lci5oYW5kbGVyRGF0YUxpc3QuZm9yRWFjaChmdW5jdGlvbiAoaGFuZGxlckRhdGE6SUV2ZW50SGFuZGxlckRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgRmFjdG9yeUV2ZW50SGFuZGxlci5jcmVhdGVFdmVudEhhbmRsZXIobGlzdGVuZXIuZXZlbnRUeXBlKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKGhhbmRsZXJEYXRhLmV2ZW50TmFtZSwgaGFuZGxlckRhdGEuaGFuZGxlciwgbGlzdGVuZXIucHJpb3JpdHkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhcmd1bWVudHMubGVuZ3RoID09PSAyKXtcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0ID0gYXJndW1lbnRzWzBdLFxuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcjpFdmVudExpc3RlbmVyID0gIShhcmd1bWVudHNbMV0gaW5zdGFuY2VvZiBFdmVudExpc3RlbmVyKSA/ICBFdmVudExpc3RlbmVyLmNyZWF0ZShhcmd1bWVudHNbMV0pOiBhcmd1bWVudHNbMV07XG5cbiAgICAgICAgICAgICAgICBsaXN0ZW5lci5oYW5kbGVyRGF0YUxpc3QuZm9yRWFjaChmdW5jdGlvbiAoaGFuZGxlckRhdGE6SUV2ZW50SGFuZGxlckRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgRmFjdG9yeUV2ZW50SGFuZGxlci5jcmVhdGVFdmVudEhhbmRsZXIobGlzdGVuZXIuZXZlbnRUeXBlKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKHRhcmdldCwgaGFuZGxlckRhdGEuZXZlbnROYW1lLCBoYW5kbGVyRGF0YS5oYW5kbGVyLCBsaXN0ZW5lci5wcmlvcml0eSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDMpe1xuICAgICAgICAgICAgICAgIGxldCBldmVudE5hbWUgPSBhcmd1bWVudHNbMF0sXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXIgPSBhcmd1bWVudHNbMV0sXG4gICAgICAgICAgICAgICAgICAgIHByaW9yaXR5ID0gYXJndW1lbnRzWzJdO1xuXG4gICAgICAgICAgICAgICAgRmFjdG9yeUV2ZW50SGFuZGxlci5jcmVhdGVFdmVudEhhbmRsZXIoRXZlbnRUYWJsZS5nZXRFdmVudFR5cGUoZXZlbnROYW1lKSlcbiAgICAgICAgICAgICAgICAgICAgLm9uKGV2ZW50TmFtZSwgaGFuZGxlciwgcHJpb3JpdHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhcmd1bWVudHMubGVuZ3RoID09PSA0KSB7XG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldCA9IGFyZ3VtZW50c1swXSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnROYW1lID0gYXJndW1lbnRzWzFdLFxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVyID0gYXJndW1lbnRzWzJdLFxuICAgICAgICAgICAgICAgICAgICBwcmlvcml0eSA9IGFyZ3VtZW50c1szXTtcblxuICAgICAgICAgICAgICAgIEZhY3RvcnlFdmVudEhhbmRsZXIuY3JlYXRlRXZlbnRIYW5kbGVyKEV2ZW50VGFibGUuZ2V0RXZlbnRUeXBlKGV2ZW50TmFtZSkpXG4gICAgICAgICAgICAgICAgICAgIC5vbih0YXJnZXQsIGV2ZW50TmFtZSwgaGFuZGxlciwgcHJpb3JpdHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIG9mZigpOnZvaWQ7XG4gICAgICAgIHB1YmxpYyBvZmYoZXZlbnROYW1lOkV2ZW50TmFtZSk6dm9pZDtcbiAgICAgICAgcHVibGljIG9mZihldmVudE5hbWU6RXZlbnROYW1lLCBoYW5kbGVyOkZ1bmN0aW9uKTp2b2lkO1xuICAgICAgICBwdWJsaWMgb2ZmKHRhcmdldDpHYW1lT2JqZWN0KTp2b2lkO1xuICAgICAgICBwdWJsaWMgb2ZmKHRhcmdldDpHYW1lT2JqZWN0LCBldmVudE5hbWU6RXZlbnROYW1lKTp2b2lkO1xuICAgICAgICBwdWJsaWMgb2ZmKHRhcmdldDpHYW1lT2JqZWN0LCBldmVudE5hbWU6RXZlbnROYW1lLCBoYW5kbGVyOkZ1bmN0aW9uKTp2b2lkO1xuXG4gICAgICAgIHB1YmxpYyBvZmYoKSB7XG4gICAgICAgICAgICB2YXIgZXZlbnRSZWdpc3RlciA9IEV2ZW50UmVnaXN0ZXIuZ2V0SW5zdGFuY2UoKSxcbiAgICAgICAgICAgICAgICBldmVudE9mZkRhdGFMaXN0OmR5Q2IuQ29sbGVjdGlvbiA9IG51bGwsXG4gICAgICAgICAgICAgICAgYXJnQXJyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcblxuICAgICAgICAgICAgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCl7XG4gICAgICAgICAgICAgICAgZXZlbnRSZWdpc3Rlci5mb3JFYWNoKChsaXN0OmR5Q2IuQ29sbGVjdGlvbiwga2V5OnN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZXZlbnROYW1lID0gZXZlbnRSZWdpc3Rlci5nZXRFdmVudE5hbWVGcm9tS2V5KGtleSksXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRVaWQgPSBldmVudFJlZ2lzdGVyLmdldFVpZEZyb21LZXkoa2V5KTtcblxuICAgICAgICAgICAgICAgICAgICBpZighdGFyZ2V0VWlkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIEZhY3RvcnlFdmVudEhhbmRsZXIuY3JlYXRlRXZlbnRIYW5kbGVyKEV2ZW50VGFibGUuZ2V0RXZlbnRUeXBlKGV2ZW50TmFtZSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9mZihldmVudE5hbWUpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBGYWN0b3J5RXZlbnRIYW5kbGVyLmNyZWF0ZUV2ZW50SGFuZGxlcihFdmVudFRhYmxlLmdldEV2ZW50VHlwZShldmVudE5hbWUpKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm9mZih0YXJnZXRVaWQsIGV2ZW50TmFtZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDEgJiYgSnVkZ2VVdGlscy5pc1N0cmluZyhhcmd1bWVudHNbMF0pKXtcbiAgICAgICAgICAgICAgICBsZXQgZXZlbnROYW1lID0gYXJndW1lbnRzWzBdO1xuXG4gICAgICAgICAgICAgICAgRmFjdG9yeUV2ZW50SGFuZGxlci5jcmVhdGVFdmVudEhhbmRsZXIoRXZlbnRUYWJsZS5nZXRFdmVudFR5cGUoZXZlbnROYW1lKSlcbiAgICAgICAgICAgICAgICAgICAgLm9mZihldmVudE5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhcmd1bWVudHMubGVuZ3RoID09PSAyICYmIEp1ZGdlVXRpbHMuaXNGdW5jdGlvbihhcmd1bWVudHNbMV0pKXtcbiAgICAgICAgICAgICAgICBsZXQgZXZlbnROYW1lID0gYXJndW1lbnRzWzBdLFxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVyID0gYXJndW1lbnRzWzFdO1xuXG4gICAgICAgICAgICAgICAgRmFjdG9yeUV2ZW50SGFuZGxlci5jcmVhdGVFdmVudEhhbmRsZXIoRXZlbnRUYWJsZS5nZXRFdmVudFR5cGUoZXZlbnROYW1lKSlcbiAgICAgICAgICAgICAgICAgICAgLm9mZihldmVudE5hbWUsIGhhbmRsZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhcmd1bWVudHMubGVuZ3RoID09PSAxKXtcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0ID0gYXJndW1lbnRzWzBdO1xuXG4gICAgICAgICAgICAgICAgZXZlbnRSZWdpc3Rlci5mb3JFYWNoKChsaXN0OmR5Q2IuQ29sbGVjdGlvbiwga2V5OnN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZXZlbnROYW1lID0gZXZlbnRSZWdpc3Rlci5nZXRFdmVudE5hbWVGcm9tS2V5KGtleSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoZXZlbnRSZWdpc3Rlci5pc1RhcmdldChrZXksIHRhcmdldCwgbGlzdCkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgRmFjdG9yeUV2ZW50SGFuZGxlci5jcmVhdGVFdmVudEhhbmRsZXIoRXZlbnRUYWJsZS5nZXRFdmVudFR5cGUoZXZlbnROYW1lKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAub2ZmKHRhcmdldCwgZXZlbnROYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhcmd1bWVudHMubGVuZ3RoID09PSAyKXtcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0ID0gYXJndW1lbnRzWzBdLFxuICAgICAgICAgICAgICAgICAgICBldmVudE5hbWUgPSBhcmd1bWVudHNbMV07XG5cbiAgICAgICAgICAgICAgICBGYWN0b3J5RXZlbnRIYW5kbGVyLmNyZWF0ZUV2ZW50SGFuZGxlcihFdmVudFRhYmxlLmdldEV2ZW50VHlwZShldmVudE5hbWUpKVxuICAgICAgICAgICAgICAgICAgICAub2ZmKHRhcmdldCwgZXZlbnROYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMyl7XG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldCA9IGFyZ3VtZW50c1swXSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnROYW1lID0gYXJndW1lbnRzWzFdLFxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVyID0gYXJndW1lbnRzWzJdO1xuXG4gICAgICAgICAgICAgICAgRmFjdG9yeUV2ZW50SGFuZGxlci5jcmVhdGVFdmVudEhhbmRsZXIoRXZlbnRUYWJsZS5nZXRFdmVudFR5cGUoZXZlbnROYW1lKSlcbiAgICAgICAgICAgICAgICAgICAgLm9mZih0YXJnZXQsIGV2ZW50TmFtZSwgaGFuZGxlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vZGVmaW5pdGlvbnMuZC50c1wiLz5cbm1vZHVsZSBFbmdpbmUzRHtcbiAgICBleHBvcnQgY2xhc3MgRmFjdG9yeUV2ZW50SGFuZGxlcntcbiAgICAgICAgcHVibGljIHN0YXRpYyBjcmVhdGVFdmVudEhhbmRsZXIoZXZlbnRUeXBlOkV2ZW50VHlwZSl7XG4gICAgICAgICAgICBsZXQgaGFuZGxlciA9IG51bGw7XG5cbiAgICAgICAgICAgIHN3aXRjaCAoZXZlbnRUeXBlKXtcbiAgICAgICAgICAgICAgICBjYXNlIEV2ZW50VHlwZS5NT1VTRTpcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlciA9IE1vdXNlRXZlbnRIYW5kbGVyLmdldEluc3RhbmNlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgRXZlbnRUeXBlLktFWUJPQVJEOlxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVyID0gS2V5Ym9hcmRFdmVudEhhbmRsZXIuZ2V0SW5zdGFuY2UoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBFdmVudFR5cGUuQ1VTVE9NOlxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVyID0gQ3VzdG9tRXZlbnRIYW5kbGVyLmdldEluc3RhbmNlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIC8vdG9kbyBtb3JlIHR5cGVcbiAgICAgICAgICAgICAgICBkZWZhdWx0IDpcbiAgICAgICAgICAgICAgICAgICAgZHlDYi5Mb2cuZXJyb3IodHJ1ZSwgZHlDYi5Mb2cuaW5mby5GVU5DX0lOVkFMSUQoXCJldmVudFR5cGVcIikpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGhhbmRsZXI7XG4gICAgICAgIH1cbiAgICAgICAgLy9cbiAgICAgICAgLy9wdWJsaWMgc3RhdGljIGNyZWF0ZUV2ZW50KGV2ZW50VHlwZTpFdmVudFR5cGUsIGV2ZW50TmFtZTpFdmVudE5hbWUsIHBoYXNlOkV2ZW50UGhhc2U9RXZlbnRQaGFzZS5FTUlUKXtcbiAgICAgICAgLy8gICAgdmFyIGV2ZW50T2JqID0gbnVsbDtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgc3dpdGNoIChldmVudFR5cGUpe1xuICAgICAgICAvLyAgICAgICAgY2FzZSBFdmVudFR5cGUuTU9VU0U6XG4gICAgICAgIC8vICAgICAgICAgICAgZXZlbnRPYmogPSBNb3VzZUV2ZW50LmNyZWF0ZShudWxsLCBldmVudE5hbWUpO1xuICAgICAgICAvLyAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAvLyAgICAgICAgLy90b2RvIG1vcmUgdHlwZVxuICAgICAgICAvLyAgICAgICAgZGVmYXVsdCA6XG4gICAgICAgIC8vICAgICAgICAgICAgZHlDYi5Mb2cuZXJyb3IodHJ1ZSwgZHlDYi5Mb2cuaW5mby5GVU5DX0lOVkFMSUQoXCJldmVudFR5cGVcIikpO1xuICAgICAgICAvLyAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAvLyAgICB9XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgIGV2ZW50T2JqLnBoYXNlID0gcGhhc2U7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgIHJldHVybiBldmVudE9iajtcbiAgICAgICAgLy99XG5cbiAgICAgICAgLy9wcml2YXRlIHN0YXRpYyBfY3JlYXRlQWxsRXZlbnRIYW5kbGVycygpe1xuICAgICAgICAvLyAgICAgcmV0dXJuIGR5Q2IuQ29sbGVjdGlvbi5jcmVhdGUoW01vdXNlRXZlbnRIYW5kbGVyLmdldEluc3RhbmNlKCldKTtcbiAgICAgICAgLy99XG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RlZmluaXRpb25zLmQudHNcIi8+XG5tb2R1bGUgRW5naW5lM0Qge1xuLy8gICAgLyohXG4vLyAgICAgaXQgaXMgZGVzaWduZWQgYXMgc2luZ2xldG9uLCBub3Qgc3RhdGljIGNsYXNzLCBiZWNhdXNlIGl0IG5lZWQgbWFpbnRhaW4gc3RhdGUoX2luc3RhbmNlIGF0dHJpKS5cbi8vXG4vL1xuLy8gICAgIDE+5LuA5LmI5pe25YCZ5L2/55So6Z2Z5oCB57G75Luj5pu/c2luZ2xldG9uIDpcbi8vICAgICDov5nph4zmnInlh6DkuKrlvojlpb3nmoTpnZnmgIHnsbvmr5RzaW5nbGV0b27mm7Tlpb3nmoTlupTnlKjlnLrmma8uIOacgOWfuuacrOeahOS+i+WtkOWwseaYr+WcqEphdmHkuK3nmoRqYXZhLmxhbmcuTWF0aOexu+eahOWunueOsOaWueW8jywgTWF0aOexu+WwseaYr+eUqOi/h+mdmeaAgeaWueazleadpeWunueOsOeahCzogIzkuI3mmK/ljZXkvovmnaXlrp7njrDnmoQuXG4vLyAgICAg5oC757uTIDpcbi8vICAgICDlpoLmnpzkvaDnmoRzaW5nbGV0b27kuI3mj5Dnu7TmjIHku7vkvZXnirbmgIEsIOS7heS7heaYr+aPkOS+m+WFqOWxgOeahOiuv+mXriAsIOi/meS4quaXtuWAmeWwsemAguWQiOeUqOmdmeaAgeexuyAsIOi/meagt+mAn+W6puS5n+abtOW/qywg5Zug5Li6c3RhdGljIGJpbmTlnKjnvJbor5HmnJ/pl7QoY29tcGlsZSBkdXJpbmcpIC4g6K6w5L2P5LiN57uP5oSP57u05oyB5a2Q57G755qE54q25oCBICwg5bCk5YW25piv5Zyo5bm25Y+R55qE5oOF5Ya15LiLLCDlpJrkuKrnur/nqIvlubblj5Hkv67mlLks6L+Z5a655piT5a+86Ie05LiN5a655piT5Y+R546w55qEcmFjZSBjb25kaXRpb24g5YWz5LqOcmFjZSBjb25kaXRpb24gLlxuLy9cbi8vICAgICDpnZnmgIHnsbvpgILnlKjkuo7kuIDkupvlt6XlhbfnsbsgLCDlhbbku5bnmoTlpoLljZXkuKrorr/pl67otYTmupDlsLHlj6/ku6XnlKhzaW5nbGV0b24uXG4vLyAgICAgMj7pnZnmgIHnsbvlkoxzaW5nbGV0b27kuYvpl7TnmoTljLrliKsgOlxuLy8gICAgIOKRoCBzdGF0aWPnsbvmnInmm7Tlpb3nmoTorr/pl67mlYjnjocoU3RhdGljIGNsYXNzIHByb3ZpZGVzIGJldHRlciBwZXJmb3JtYW5jZSB0aGFuIFNpbmdsZXRvbiBwYXR0ZXJuLCBiZWNhdXNlIHN0YXRpYyBtZXRob2RzIGFyZSBib25kZWQgb24gY29tcGlsZSB0aW1lKVxuLy8gICAgIOKRoiBzaW5nbGV0b27mr5RzdGF0aWMgY2xhc3Pmm7TlrrnmmJPmtYvor5UuIOmCo+S4quWuueaYk+aooeaLnyhtb2NrKSwg5ZOq5Liq5bCx5a655piT5rWL6K+VLiBzaW5nbGV0b27lvojlrrnmmJPnlKhKVW5pdOa1i+ivlSwg5Zug5Li65L2g6IO95aSf5Lyg6YCSbW9ja+WvueixoSwg5b2Tc2luZ2xldG9u6ZyA6KaB55qE5pe25YCZKOS9nOS4uuaWueazleWPguaVsOaIluiAheaehOmAoOWHveaVsOWPguaVsCksXG4vLyAgICAg4pGjIOWmguaenOS9oOeahOmcgOaxguaYr+e7tOaKpChtYWludGFpbinnirbmgIEsIOmCo+S5iHNpbmdsZXRvbuavlHN0YXRpYyBjbGFzc+abtOWlvSAsIOWmguaenOS9v+eUqHN0YXRpYyBjbGFzc+S8muWHuueOsOS4gOS6m+mXrumimC5cbi8vICAgICDikaQgc2luZ2xldG9u5pSv5oyB5bu26L+f5Yqg6L29ICwg6ICMc3RhdGljIGNsYXNzIOWImeS4jeaUr+aMgei/meagt+eahOeJueaApyAsIOWcqOmHjemHj+e6p+eahOWvueixoSwg5bu26L+f5Yqg6L295bCx5pi+5b6X6Z2e5bi46YeN6KaBLlxuLy8gICAgIOKRpSDlnKjkuIDkupvkvp3otZbms6jlhaUoRGVwZW5kZW5jeSBpbmplY3Rpb24gZnJhbWV3b3JrKeeahOahhuaetiAsIOWug+iDveWkn+W+iOWlveeahOeuoeeQhnNpbmdsZXRvbuWvueixoSAuIOS+i+WmglNwcmluZy5cbi8vXG4vLyAgICAgMz5zaW5nbGV0b27nm7jlr7nkuo7pnZnmgIHnsbvnmoTkuIDkupvpq5jnuqfnibnngrkgOlxuLy8gICAgIHNpbmdsZXRvbiDlr7nkuo5zdGF0aWMgY2xhc3Mg5Li76KaB55qE5LyY54K55piv5pu05Yqg6Z2i5ZCR5a+56LGhIC4g5a+55LqOc2luZ2xldG9u5L2g5Y+v5Lul5L2/55So57un5om/KEluaGVyaXRhbmNlKeWSjOWkmuaAgShwb2x5bW9ycGhpc20p5p2l57un5om/5LiA5Liq5Z+657G7LCDlrp7njrDkuIDkuKrmjqXlj6MsIOaPkOS+m+S4jeWQjOWKn+iDvSDnmoTlrp7njrAuIOS+i+WmgiAsIEphdmHkuK1qYXZhLmxhbmcuUnVudGltZSAs6K+l57G75bCx5piv5LiA5Liqc2luZ2xldG9u55qELCDosIPnlKhnZXRSdW50aW1lKCks5Z+65LqO5LiN5ZCM55qESlZNICzov5Tlm57kuI3lkIznmoTlrp7njrDlr7nosaEsIOmSiOWvueS4gOS4quS4gOS4qkpWTSznoa7kv53lj6rmnInkuIDkuKpSdW50aW1l5a+56LGhICwg5aaC5p6c5L2/55Soc3RhdGljIGNsYXNz5bCx5LiN6IO95b6I5aW955qE5p2l5a6e546w6L+Z5qC355qE5Yqf6IO95LqGIC5cbi8vICAgICDmrKLov47ovazovb0g6L2s6L296K+35rOo5piO5Ye65aSEIDogaHR0cDovL2Jsb2cuY3Nkbi5uZXQvam9obm55OTAxMTE0L2FydGljbGUvZGV0YWlscy8xMTk2OTAxNVxuLy8gICAgICovXG4vL1xuXG4gICAgLy8vL3NpbmdsZXRvbiBjbGFzc1xuICAgIC8vc3RhdGljIGNsYXNzXG5cbiAgICBleHBvcnQgY2xhc3MgRXZlbnRNYW5hZ2VyIHtcbiAgICAgICAgLy9wcml2YXRlIHN0YXRpYyBzdGF0aWMgX2luc3RhbmNlOkV2ZW50TWFuYWdlciA9IG51bGw7XG4gICAgICAgIC8vXG4gICAgICAgIC8vcHVibGljIHN0YXRpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKSB7XG4gICAgICAgIC8vICAgIGlmICh0aGlzLl9pbnN0YW5jZSA9PT0gbnVsbCkge1xuICAgICAgICAvLyAgICAgICAgdGhpcy5faW5zdGFuY2UgPSBuZXcgdGhpcygpO1xuICAgICAgICAvLyAgICAgICAgLy90aGlzLl9pbnN0YW5jZS5pbml0V2hlbkNyZWF0ZSgpO1xuICAgICAgICAvLyAgICB9XG4gICAgICAgIC8vICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcbiAgICAgICAgLy99XG5cbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgX2V2ZW50QmluZGVyOkV2ZW50QmluZGVyID0gRXZlbnRCaW5kZXIuY3JlYXRlKCk7XG4gICAgICAgIHByaXZhdGUgc3RhdGljIF9ldmVudERpc3BhdGNoZXI6RXZlbnREaXNwYXRjaGVyID0gRXZlbnREaXNwYXRjaGVyLmNyZWF0ZSgpO1xuXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgb24oZXZlbnROYW1lOkV2ZW50TmFtZSwgaGFuZGxlcjpGdW5jdGlvbik6dm9pZDtcbiAgICAgICAgcHVibGljIHN0YXRpYyBvbihldmVudE5hbWU6RXZlbnROYW1lLCBoYW5kbGVyOkZ1bmN0aW9uLCBwcmlvcml0eTpudW1iZXIpOnZvaWQ7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgb24obGlzdGVuZXI6e318RXZlbnRMaXN0ZW5lcik6dm9pZDtcbiAgICAgICAgcHVibGljIHN0YXRpYyBvbih0YXJnZXQ6R2FtZU9iamVjdCwgbGlzdGVuZXI6e318RXZlbnRMaXN0ZW5lcik6dm9pZDtcbiAgICAgICAgcHVibGljIHN0YXRpYyBvbih0YXJnZXQ6R2FtZU9iamVjdCwgZXZlbnROYW1lOkV2ZW50TmFtZSwgaGFuZGxlcjpGdW5jdGlvbik6dm9pZDtcbiAgICAgICAgcHVibGljIHN0YXRpYyBvbih0YXJnZXQ6R2FtZU9iamVjdCwgZXZlbnROYW1lOkV2ZW50TmFtZSwgaGFuZGxlcjpGdW5jdGlvbiwgcHJpb3JpdHk6bnVtYmVyKTp2b2lkO1xuXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgb24oYXJncykge1xuICAgICAgICAgICAgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSl7XG4gICAgICAgICAgICAgICAgbGV0IGxpc3RlbmVyID0gYXJndW1lbnRzWzBdO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRCaW5kZXIub24obGlzdGVuZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhcmd1bWVudHMubGVuZ3RoID09PSAyICYmIEp1ZGdlVXRpbHMuaXNTdHJpbmcoYXJndW1lbnRzWzBdKSAmJiBKdWRnZVV0aWxzLmlzRnVuY3Rpb24oYXJndW1lbnRzWzFdKSl7XG4gICAgICAgICAgICAgICAgbGV0IGV2ZW50TmFtZSA9IGFyZ3VtZW50c1swXSxcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlciA9IGFyZ3VtZW50c1sxXSxcbiAgICAgICAgICAgICAgICAgICAgcHJpb3JpdHkgPSAxO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRCaW5kZXIub24oZXZlbnROYW1lLCBoYW5kbGVyLCBwcmlvcml0eSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpe1xuICAgICAgICAgICAgICAgIGxldCB0YXJnZXQgPSBhcmd1bWVudHNbMF0sXG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyID0gYXJndW1lbnRzWzFdO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRCaW5kZXIub24odGFyZ2V0LCBsaXN0ZW5lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDMgJiYgSnVkZ2VVdGlscy5pc1N0cmluZyhhcmd1bWVudHNbMF0pICYmIEp1ZGdlVXRpbHMuaXNGdW5jdGlvbihhcmd1bWVudHNbMV0pICYmIEp1ZGdlVXRpbHMuaXNOdW1iZXIoYXJndW1lbnRzWzJdKSl7XG4gICAgICAgICAgICAgICAgbGV0IGV2ZW50TmFtZSA9IGFyZ3VtZW50c1swXSxcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlciA9IGFyZ3VtZW50c1sxXSxcbiAgICAgICAgICAgICAgICAgICAgcHJpb3JpdHkgPSBhcmd1bWVudHNbMl07XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9ldmVudEJpbmRlci5vbihldmVudE5hbWUsIGhhbmRsZXIsIHByaW9yaXR5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMyB8fCBhcmd1bWVudHMubGVuZ3RoID09PSA0KXtcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0ID0gYXJndW1lbnRzWzBdLFxuICAgICAgICAgICAgICAgICAgICBldmVudE5hbWUgPSBhcmd1bWVudHNbMV0sXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXIgPSBhcmd1bWVudHNbMl0sXG4gICAgICAgICAgICAgICAgICAgIHByaW9yaXR5ID0gYXJndW1lbnRzWzNdID09PSB1bmRlZmluZWQ/IDEgOmFyZ3VtZW50c1szXTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50QmluZGVyLm9uKHRhcmdldCwgZXZlbnROYW1lLCBoYW5kbGVyLCBwcmlvcml0eSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc3RhdGljIG9mZigpOnZvaWQ7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgb2ZmKGV2ZW50TmFtZTpFdmVudE5hbWUpOnZvaWQ7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgb2ZmKGV2ZW50TmFtZTpFdmVudE5hbWUsIGhhbmRsZXI6RnVuY3Rpb24pOnZvaWQ7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgb2ZmKHRhcmdldDpHYW1lT2JqZWN0KTp2b2lkO1xuICAgICAgICBwdWJsaWMgc3RhdGljIG9mZih0YXJnZXQ6R2FtZU9iamVjdCwgZXZlbnROYW1lOkV2ZW50TmFtZSk6dm9pZDtcbiAgICAgICAgcHVibGljIHN0YXRpYyBvZmYodGFyZ2V0OkdhbWVPYmplY3QsIGV2ZW50TmFtZTpFdmVudE5hbWUsIGhhbmRsZXI6RnVuY3Rpb24pOnZvaWQ7XG5cbiAgICAgICAgcHVibGljIHN0YXRpYyBvZmYoKSB7XG4gICAgICAgICAgICB0aGlzLl9ldmVudEJpbmRlci5vZmYuYXBwbHkoXG4gICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRCaW5kZXIsXG4gICAgICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdHJpZ2dlcihldmVudDpFdmVudCk6dm9pZDtcbiAgICAgICAgcHVibGljIHN0YXRpYyB0cmlnZ2VyKGV2ZW50OkV2ZW50LCB1c2VyRGF0YTphbnkpOnZvaWQ7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdHJpZ2dlcih0YXJnZXQ6R2FtZU9iamVjdCwgZXZlbnQ6RXZlbnQpOnZvaWQ7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdHJpZ2dlcih0YXJnZXQ6R2FtZU9iamVjdCwgZXZlbnQ6RXZlbnQsIHVzZXJEYXRhOmFueSk6dm9pZDtcblxuICAgICAgICBwdWJsaWMgc3RhdGljIHRyaWdnZXIoYXJncykge1xuICAgICAgICAgICAgdGhpcy5fZXZlbnREaXNwYXRjaGVyLnRyaWdnZXIuYXBwbHkodGhpcy5fZXZlbnREaXNwYXRjaGVyLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgYnJvYWRjYXN0KHRhcmdldDpHYW1lT2JqZWN0LCBldmVudDpFdmVudCwgdXNlckRhdGE/OmFueSkge1xuICAgICAgICAgICAgdGhpcy5fZXZlbnREaXNwYXRjaGVyLmJyb2FkY2FzdC5hcHBseSh0aGlzLl9ldmVudERpc3BhdGNoZXIsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHN0YXRpYyBlbWl0KHRhcmdldDpHYW1lT2JqZWN0LCBldmVudDpFdmVudCwgdXNlckRhdGE/OmFueSkge1xuICAgICAgICAgICAgdGhpcy5fZXZlbnREaXNwYXRjaGVyLmVtaXQuYXBwbHkodGhpcy5fZXZlbnREaXNwYXRjaGVyLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZnJvbUV2ZW50KGV2ZW50TmFtZTpFdmVudE5hbWUpOmFueTtcbiAgICAgICAgcHVibGljIHN0YXRpYyBmcm9tRXZlbnQoZXZlbnROYW1lOkV2ZW50TmFtZSwgcHJpb3JpdHk6bnVtYmVyKTphbnk7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZnJvbUV2ZW50KHRhcmdldDpHYW1lT2JqZWN0LCBldmVudE5hbWU6RXZlbnROYW1lKTphbnk7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZnJvbUV2ZW50KHRhcmdldDpHYW1lT2JqZWN0LCBldmVudE5hbWU6RXZlbnROYW1lLCBwcmlvcml0eTpudW1iZXIpOmFueTtcblxuICAgICAgICBwdWJsaWMgc3RhdGljIGZyb21FdmVudChhcmdzKSB7XG4gICAgICAgICAgICB2YXIgYWRkSGFuZGxlciA9IG51bGwsXG4gICAgICAgICAgICAgICAgcmVtb3ZlSGFuZGxlciA9IG51bGw7XG5cbiAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgbGV0IGV2ZW50TmFtZSA9IGFyZ3VtZW50c1swXTtcblxuICAgICAgICAgICAgICAgIGFkZEhhbmRsZXIgPSBmdW5jdGlvbiAoaGFuZGxlcikge1xuICAgICAgICAgICAgICAgICAgICBFdmVudE1hbmFnZXIub24oZXZlbnROYW1lLCBoYW5kbGVyKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJlbW92ZUhhbmRsZXIgPSBmdW5jdGlvbiAoaGFuZGxlcikge1xuICAgICAgICAgICAgICAgICAgICBFdmVudE1hbmFnZXIub2ZmKGV2ZW50TmFtZSwgaGFuZGxlcik7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIgJiYgSnVkZ2VVdGlscy5pc051bWJlcihhcmd1bWVudHNbMV0pKSB7XG4gICAgICAgICAgICAgICAgbGV0IGV2ZW50TmFtZSA9IGFyZ3VtZW50c1swXSxcbiAgICAgICAgICAgICAgICAgICAgcHJpb3JpdHkgPSBhcmd1bWVudHNbMV07XG5cbiAgICAgICAgICAgICAgICBhZGRIYW5kbGVyID0gZnVuY3Rpb24gKGhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLm9uKGV2ZW50TmFtZSwgaGFuZGxlciwgcHJpb3JpdHkpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmVtb3ZlSGFuZGxlciA9IGZ1bmN0aW9uIChoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIEV2ZW50TWFuYWdlci5vZmYoZXZlbnROYW1lLCBoYW5kbGVyKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgICAgIGxldCB0YXJnZXQgPSBhcmd1bWVudHNbMF0sXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50TmFtZSA9IGFyZ3VtZW50c1sxXTtcblxuICAgICAgICAgICAgICAgIGFkZEhhbmRsZXIgPSBmdW5jdGlvbiAoaGFuZGxlcikge1xuICAgICAgICAgICAgICAgICAgICBFdmVudE1hbmFnZXIub24odGFyZ2V0LCBldmVudE5hbWUsIGhhbmRsZXIpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmVtb3ZlSGFuZGxlciA9IGZ1bmN0aW9uIChoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIEV2ZW50TWFuYWdlci5vZmYodGFyZ2V0LCBldmVudE5hbWUsIGhhbmRsZXIpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAzKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldCA9IGFyZ3VtZW50c1swXSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnROYW1lID0gYXJndW1lbnRzWzFdLFxuICAgICAgICAgICAgICAgICAgICBwcmlvcml0eSA9IGFyZ3VtZW50c1syXTtcblxuICAgICAgICAgICAgICAgIGFkZEhhbmRsZXIgPSBmdW5jdGlvbiAoaGFuZGxlcikge1xuICAgICAgICAgICAgICAgICAgICBFdmVudE1hbmFnZXIub24odGFyZ2V0LCBldmVudE5hbWUsIGhhbmRsZXIsIHByaW9yaXR5KTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJlbW92ZUhhbmRsZXIgPSBmdW5jdGlvbiAoaGFuZGxlcikge1xuICAgICAgICAgICAgICAgICAgICBFdmVudE1hbmFnZXIub2ZmKHRhcmdldCwgZXZlbnROYW1lLCBoYW5kbGVyKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZHlSdC5mcm9tRXZlbnRQYXR0ZXJuKGFkZEhhbmRsZXIsIHJlbW92ZUhhbmRsZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHN0YXRpYyBzZXRCdWJibGVQYXJlbnQodGFyZ2V0OkdhbWVPYmplY3QsIHBhcmVudDphbnkpIHtcbiAgICAgICAgICAgIEV2ZW50UmVnaXN0ZXIuZ2V0SW5zdGFuY2UoKS5zZXRCdWJibGVQYXJlbnQodGFyZ2V0LCBwYXJlbnQpO1xuICAgICAgICAgICAgLy90aGlzLl9ldmVudERpc3BhdGNoZXIuc2V0QnViYmxlUGFyZW50KHRhcmdldCwgcGFyZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vcHVibGljIHN0YXRpYyByZW1vdmUodGFyZ2V0OkdhbWVPYmplY3QpIHtcbiAgICAgICAgLy8gICAgdGhpcy5fZXZlbnRCaW5kZXIucmVtb3ZlKHRhcmdldCk7XG4gICAgICAgIC8vfVxuXG4gICAgICAgIC8vdG9kbyBhZGQgZ2V0TGlzdGVuZXJDb3VudCh0YXJnZXQsIHR5cGUpIG1ldGhvZFxuICAgIH1cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kZWZpbml0aW9ucy5kLnRzXCIvPlxubW9kdWxlIEVuZ2luZTNEIHtcbiAgICBleHBvcnQgY2xhc3MgR2FtZU9iamVjdCB7XG4gICAgICAgIHByaXZhdGUgc3RhdGljIF9jb3VudDpudW1iZXIgPSAxO1xuXG4gICAgICAgIHByaXZhdGUgX3VpZDpudW1iZXIgPSBudWxsO1xuICAgICAgICBnZXQgdWlkKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3VpZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldCB1aWQodWlkOm51bWJlcikge1xuICAgICAgICAgICAgdGhpcy5fdWlkID0gdWlkO1xuICAgICAgICB9XG5cbiAgICAgICAgLy90b2RvIGFkZCBtZXNoLHNjZW5lIHBvc2l0aW9uIOeglOeptnRocmVlanMtPmR5bmFtaWPvvIznnIvlpoLkvZXooajnpLpwb3NpdGlvblxuICAgICAgICBwcml2YXRlIF9wb3NpdGlvbjpQb3NpdGlvbiA9IG51bGw7XG4gICAgICAgIGdldCBwb3NpdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9wb3NpdGlvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldCBwb3NpdGlvbihwb3NpdGlvbjpQb3NpdGlvbikge1xuICAgICAgICAgICAgdGhpcy5fcG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX3BhcmVudDpHYW1lT2JqZWN0ID0gbnVsbDtcbiAgICAgICAgZ2V0IHBhcmVudCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9wYXJlbnQ7XG4gICAgICAgIH1cblxuICAgICAgICBzZXQgcGFyZW50KHBhcmVudDpHYW1lT2JqZWN0KSB7XG4gICAgICAgICAgICB0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHByaXZhdGUgX2J1YmJsZVBhcmVudDpHYW1lT2JqZWN0ID0gbnVsbDtcbiAgICAgICAgZ2V0IGJ1YmJsZVBhcmVudCgpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2J1YmJsZVBhcmVudDtcbiAgICAgICAgfVxuICAgICAgICBzZXQgYnViYmxlUGFyZW50KGJ1YmJsZVBhcmVudDpHYW1lT2JqZWN0KXtcbiAgICAgICAgICAgIHRoaXMuX2J1YmJsZVBhcmVudCA9IGJ1YmJsZVBhcmVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2NoaWxkcmVuOmR5Q2IuQ29sbGVjdGlvbiA9IGR5Q2IuQ29sbGVjdGlvbi5jcmVhdGUoKTtcblxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIHRoaXMuX3VpZCA9IEdhbWVPYmplY3QuX2NvdW50O1xuICAgICAgICAgICAgR2FtZU9iamVjdC5fY291bnQgKz0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBpbml0KCkge1xuICAgICAgICAgICAgZHlDYi5Mb2cuZXJyb3IodHJ1ZSwgZHlDYi5Mb2cuaW5mby5BQlNUUkFDVF9NRVRIT0QpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyohXG4gICAgICAgICB2aXJ0dWFsXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgZGlzcG9zZSgpIHtcbiAgICAgICAgICAgIHRoaXMucGFyZW50ID0gbnVsbDtcbiAgICAgICAgICAgIEV2ZW50TWFuYWdlci5vZmYodGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiFcbiAgICAgICAgIGhvb2sgbWV0aG9kXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgb25FbnRlcigpIHtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBvblN0YXJ0TG9vcCgpIHtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBvbkVuZExvb3AoKSB7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgb25FeGl0KCkge1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGhhc0NoaWxkKGNoaWxkOkdhbWVPYmplY3QpOmJvb2xlYW4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NoaWxkcmVuLmhhc0NoaWxkKGNoaWxkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vcHVibGljIGFkZENoaWxkKGNoaWxkOkdhbWVPYmplY3QsIHNvcnQ6Ym9vbGVhbj10cnVlKTpib29sZWFuIHtcbiAgICAgICAgcHVibGljIGFkZENoaWxkKGNoaWxkOkdhbWVPYmplY3QpOkdhbWVPYmplY3Qge1xuICAgICAgICAgICAgLy9uZWVkIHVzZXIganVkZ2UgaXQhXG4gICAgICAgICAgICAvL2lmKHRoaXMuX2NoaWxkcmVuLmhhc0NoaWxkKGNoaWxkKSkge1xuICAgICAgICAgICAgLy8gICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgLy99XG5cbiAgICAgICAgICAgIGlmIChjaGlsZC5wYXJlbnQpIHtcbiAgICAgICAgICAgICAgICAvL3dpbGwgcmVtb3ZlIGJpbmQgZXZlbnQscmVtb3ZlIGZyb20gcGFyZW50IC4uLlxuICAgICAgICAgICAgICAgIGNoaWxkLnJlbW92ZU1lKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNoaWxkLnBhcmVudCA9IHRoaXM7XG5cblxuICAgICAgICAgICAgLy9jaGlsZC5kaXNwYXRjaEV2ZW50KG5ldyBDb3JlRXZlbnQoJ2JlZm9yZWFkZCcsIGZhbHNlLCB7XG4gICAgICAgICAgICAvLyAgICBwYXJlbnQ6IHRoaXNcbiAgICAgICAgICAgIC8vfSkpO1xuXG5cbiAgICAgICAgICAgIHRoaXMuX2NoaWxkcmVuLmFkZENoaWxkKGNoaWxkKTtcblxuICAgICAgICAgICAgLy9pZihzb3J0KSB7XG5cblxuICAgICAgICAgICAgLyohXG4gICAgICAgICAgICBzb3J0IHdoZW4gYWRkIGNoaWxkL2NoaWxkcmVuLCBub3Qgd2hlbiBnZXQgY2hpbGRyZW4uXG4gICAgICAgICAgICBiZWNhdXNlIGVhY2ggbG9vcCB3aWxsIGdldCBjaGlsZHJlbih0byByZW5kZXIpLCBzbyBpZiB1c2luZyB0aGUgbGF0dGVyLCBlYWNoIGxvb3Agc2hvdWxkIHNvcnQhXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICB0aGlzLnNvcnQoKTtcbiAgICAgICAgICAgIC8vfVxuICAgICAgICAgICAgLy9jaGlsZC5fcGFyZW50ID0gdGhpcztcbiAgICAgICAgICAgIC8vY2hpbGQuc2V0QnViYmxlUGFyZW50KHRoaXMpO1xuICAgICAgICAgICAgLy9jaGlsZC5fdHJhbnNmb3JtLmRpcnR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIC8vY2hpbGQuZGlzcGF0Y2hFdmVudChuZXcgQ29yZUV2ZW50KCdhZGQnLCBmYWxzZSkpO1xuICAgICAgICAgICAgLy90aGlzLmRpc3BhdGNoRXZlbnQobmV3IENvcmVFdmVudCgnY2hpbGRhZGQnLCBmYWxzZSwge1xuICAgICAgICAgICAgLy8gICAgY2hpbGQ6IGNoaWxkXG4gICAgICAgICAgICAvL30pKTtcblxuXG4gICAgICAgICAgICBjaGlsZC5pbml0KCk7XG4gICAgICAgICAgICBjaGlsZC5vbkVudGVyKCk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGdldENoaWxyZW4oKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jaGlsZHJlbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzb3J0KCl7XG4gICAgICAgICAgICB0aGlzLl9jaGlsZHJlbi5zb3J0KHRoaXMuX2FzY2VuZFopO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBmb3JFYWNoKGZ1bmM6RnVuY3Rpb24pe1xuICAgICAgICAgICAgdGhpcy5fY2hpbGRyZW4uZm9yRWFjaChmdW5jKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgcmVtb3ZlQ2hpbGQoY2hpbGQ6R2FtZU9iamVjdCk6R2FtZU9iamVjdCB7XG4gICAgICAgICAgICBjaGlsZC5vbkV4aXQoKTtcblxuICAgICAgICAgICAgdGhpcy5fY2hpbGRyZW4ucmVtb3ZlQ2hpbGQoY2hpbGQpO1xuICAgICAgICAgICAgLy92YXIgaWR4ID0gdGhpcy5fY2hpbGRyZW4uaW5kZXhPZihjaGlsZCk7XG4gICAgICAgICAgICAvL2lmKGlkeCAhPT0gLTEpIHtcbiAgICAgICAgICAgIC8vICAgIGNoaWxkLmRpc3BhdGNoRXZlbnQobmV3IENvcmVFdmVudCgnYmVmb3JlcmVtb3ZlJywgZmFsc2UpKTtcbiAgICAgICAgICAgIC8vICAgIHRoaXMuX2NoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgICAgY2hpbGQuZGlzcG9zZSgpO1xuICAgICAgICAgICAgLy9jaGlsZC5zZXRCdWJibGVQYXJlbnQobnVsbCk7XG4gICAgICAgICAgICAvLyAgICBjaGlsZC5kaXNwYXRjaEV2ZW50KG5ldyBDb3JlRXZlbnQoJ3JlbW92ZScsIGZhbHNlLCB7XG4gICAgICAgICAgICAvLyAgICAgICAgcGFyZW50OiB0aGlzXG4gICAgICAgICAgICAvLyAgICB9KSk7XG4gICAgICAgICAgICAvLyAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IENvcmVFdmVudCgnY2hpbGRyZW1vdmUnLCBmYWxzZSwge1xuICAgICAgICAgICAgLy8gICAgICAgIGNoaWxkOiBjaGlsZFxuICAgICAgICAgICAgLy8gICAgfSkpO1xuICAgICAgICAgICAgLy8gICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAvL31cbiAgICAgICAgICAgIC8vcmV0dXJuIGZhbHNlO1xuXG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHJlbW92ZSB0aGlzIGdhbWUgb2JqZWN0IGZyb20gcGFyZW50LlxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyByZW1vdmVNZSgpOkdhbWVPYmplY3Qge1xuICAgICAgICAgICAgdmFyIHBhcmVudCA9IHRoaXMuX3BhcmVudDtcblxuICAgICAgICAgICAgcGFyZW50ICYmIHBhcmVudC5yZW1vdmVDaGlsZCh0aGlzKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgZ2V0VG9wVW5kZXJQb2ludChwb2ludDpQb2ludCk6R2FtZU9iamVjdCB7XG4gICAgICAgICAgICAvL3ZhciBmb3VuZCwgbG9jYWxQLCBjaGlsZDtcbiAgICAgICAgICAgIC8vdmFyIGNoaWxkcmVuQXJyO1xuICAgICAgICAgICAgLy9pZighdGhpcy5fYWN0aXZlIHx8ICF0aGlzLl92aXNpYmxlKSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIC8vaWYodGhpcy5faW50ZXJhY3RpdmVSZWN0KSB7XG4gICAgICAgICAgICAvLyAgICBsb2NhbFAgPSB0aGlzLnRyYW5zZm9ybS5nbG9iYWxUb0xvY2FsKHgsIHkpO1xuICAgICAgICAgICAgLy8gICAgaWYoIXRoaXMuX2ludGVyYWN0aXZlUmVjdC5jb250YWluc1hZKGxvY2FsUC54LCBsb2NhbFAueSkpIHtcbiAgICAgICAgICAgIC8vICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIC8vICAgIH1cbiAgICAgICAgICAgIC8vfVxuICAgICAgICAgICAgLy9jaGlsZHJlbkFyciA9IHRoaXMuX2NoaWxkcmVuO1xuICAgICAgICAgICAgLy9pZihjaGlsZHJlbkFyci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAvLyAgICBmb3IodmFyIGk9Y2hpbGRyZW5BcnIubGVuZ3RoLTE7IGk+PTA7IGktLSkge1xuICAgICAgICAgICAgLy8gICAgICAgIGNoaWxkID0gY2hpbGRyZW5BcnJbaV07XG4gICAgICAgICAgICAvLyAgICAgICAgZm91bmQgPSBjaGlsZC5nZXRVbmRlclBvaW50KHgsIHksIHRvdWNoYWJsZSk7XG4gICAgICAgICAgICAvLyAgICAgICAgaWYoZm91bmQpIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgcmV0dXJuIGZvdW5kO1xuICAgICAgICAgICAgLy8gICAgICAgIH1cbiAgICAgICAgICAgIC8vICAgIH1cbiAgICAgICAgICAgIC8vfVxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vaWYoIXRvdWNoYWJsZSB8fCB0aGlzLl90b3VjaGFibGUpIHtcbiAgICAgICAgICAgIC8vICAgIGlmKCFsb2NhbFApIHtcbiAgICAgICAgICAgIC8vICAgICAgICBsb2NhbFAgPSB0aGlzLnRyYW5zZm9ybS5nbG9iYWxUb0xvY2FsKHgsIHkpO1xuICAgICAgICAgICAgLy8gICAgfVxuICAgICAgICAgICAgLy8gICAgaWYodGhpcy50ZXN0SGl0KGxvY2FsUC54LCBsb2NhbFAueSkpIHtcbiAgICAgICAgICAgIC8vICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIC8vICAgIH1cbiAgICAgICAgICAgIC8vfVxuICAgICAgICAgICAgLy9yZXR1cm4gbnVsbDtcblxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IG51bGwsXG4gICAgICAgICAgICAgICAgaSA9IG51bGwsXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46ZHlDYi5Db2xsZWN0aW9uID0gbnVsbCxcbiAgICAgICAgICAgICAgICBsZW4gPSB0aGlzLl9jaGlsZHJlbi5nZXRDb3VudCgpO1xuXG4gICAgICAgICAgICBjaGlsZHJlbiA9IHRoaXMuX2NoaWxkcmVuO1xuICAgICAgICAgICAgaWYobGVuID4gMCkge1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IGxlbiAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IGNoaWxkcmVuLmdldENoaWxkKGkpO1xuXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGNoaWxkLmdldFRvcFVuZGVyUG9pbnQocG9pbnQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZih0aGlzLmlzSGl0KHBvaW50KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBpc0hpdChsb2NhdGlvbkluVmlldzpQb2ludCk6Ym9vbGVhbiB7XG4gICAgICAgICAgICAvL3RvZG8gZXh0cmFjdCBjb2xsaWRlcj9cbiAgICAgICAgICAgIC8vdmFyIGNvbGxpZGVyOkNvbGxpZGVyID0gdGhpcy5fY29sbGlkZXI7XG4gICAgICAgICAgICAvL3JldHVybiBjb2xsaWRlciAmJiBjb2xsaWRlci5jb2xsaWRlWFkobG9jYWxYLCBsb2NhbFkpO1xuXG5cbiAgICAgICAgICAgIC8vdmFyIFJBTkdFID0gMTA7XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy9yZXR1cm4gTWF0aC5hYnModGhpcy5fcG9zaXRpb24ueCAtIGxvY2F0aW9uSW5WaWV3LngpIDwgUkFOR0VcbiAgICAgICAgICAgIC8vJiYgTWF0aC5hYnModGhpcy5fcG9zaXRpb24ueSAtIGxvY2F0aW9uSW5WaWV3LnkpIDwgUkFOR0U7XG5cblxuICAgICAgICAgICAgLy90b2RvIGNvbXBsZXRlIHRoaXMgYWZ0ZXIgYWRkaW5nIHBvc2l0aW9uXG4gICAgICAgICAgICBpZihsb2NhdGlvbkluVmlldyl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2FzY2VuZFooYTpHYW1lT2JqZWN0LCBiOkdhbWVPYmplY3Qpe1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYS5wb3NpdGlvbi56IC0gYi5wb3NpdGlvbi56O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RlZmluaXRpb25zLmQudHNcIi8+XG5tb2R1bGUgRW5naW5lM0R7XG4gICAgZXhwb3J0IGNsYXNzIE1lc2ggZXh0ZW5kcyBHYW1lT2JqZWN0e1xuICAgICAgICAvL3RvZG8gcHVzaCxwb3AgbWF0cml4LCBzbyBuZWVkIGNoYW5nZSBwb3MsIHJvdGF0ZSBhbmdsZSwgc2NhbGUgaW5zdGVhZCBvZiBjaGFuZ2luZyBtYXRyaXghXG4gICAgICAgIC8vd2hlbiBuZWVkIHB1c2gscG9wIG1hdHJpeD9cblxuICAgICAgICAvL3RvZG8gdXNlIGNvbXBvbmVudCBhcmNoaXRlY3R1cmUsIGRlbGV0ZSBNZXNoLCBtYWtlIEdlb21ldHJ5LE1hdGVyaWFsIHRvIGJlIGNvbXBvbmVudFxuXG4gICAgICAgIC8vdG9kbyBiZSBNYXRlcmlhbChhZGQgYmFzZUNsYXNzIE1hdGVyaWFsKVxuICAgICAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZShnZW1vOkdlb21ldHJ5KTpNZXNoIHtcbiAgICAgICAgICAgIHZhciBvYmogPSBuZXcgdGhpcyhnZW1vKTtcblxuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX21hdHJpeDpNYXRyaXggPSBNYXRyaXguY3JlYXRlKCk7XG4gICAgICAgIGdldCBtYXRyaXgoKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9tYXRyaXg7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IG1hdHJpeChtYXRyaXg6TWF0cml4KXtcbiAgICAgICAgICAgIHRoaXMuX21hdHJpeCA9IG1hdHJpeDtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2dlbW86R2VvbWV0cnkgPSBudWxsO1xuICAgICAgICBwcml2YXRlIF9hY3Rpb25NYW5hZ2VyOkFjdGlvbk1hbmFnZXIgPSBBY3Rpb25NYW5hZ2VyLmNyZWF0ZSgpO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKGdlbW86R2VvbWV0cnkpe1xuICAgICAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICAgICAgdGhpcy5fZ2VtbyA9IGdlbW87XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgcnVuQWN0aW9uKGFjdGlvbjpBY3Rpb24pe1xuICAgICAgICAgICB0aGlzLl9hY3Rpb25NYW5hZ2VyLmFkZENoaWxkKGFjdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgdXBkYXRlKCl7XG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25NYW5hZ2VyLnVwZGF0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGRyYXcoKXtcbiAgICAgICAgICAgIHRoaXMuX2FkZERyYXdDb21tYW5kKCk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgaW5pdCgpe1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbiA9IFBvc2l0aW9uLmNyZWF0ZSgwLCAwLCAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2FkZERyYXdDb21tYW5kKCl7XG4gICAgICAgICAgICB2YXIgcmVuZGVyZXIgPSBEaXJlY3Rvci5nZXRJbnN0YW5jZSgpLnJlbmRlcmVyLFxuICAgICAgICAgICAgICAgIHF1YWRDbWQgPSByZW5kZXJlci5jcmVhdGVRdWFkQ29tbWFuZCgpO1xuXG4gICAgICAgICAgICBxdWFkQ21kLmJ1ZmZlcnMgPSB7XG4gICAgICAgICAgICAgICAgdmVydGV4QnVmZmVyOiB0aGlzLl9nZW1vLnZlcnRpY2VzLFxuICAgICAgICAgICAgICAgIC8vdGV4Q29vcmRzOiB0aGlzLl9nZW1vLnRleENvb3JkcyxcbiAgICAgICAgICAgICAgICAvL25vcm1hbHM6IHRoaXMuX2dlbW8ubm9ybWFscyxcbiAgICAgICAgICAgICAgICBpbmRleEJ1ZmZlcjogdGhpcy5fZ2Vtby5pbmRpY2VzLFxuICAgICAgICAgICAgICAgIGNvbG9yQnVmZmVyOiB0aGlzLl9nZW1vLmNvbG9yc1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIC8vcXVhZENtZC5idWZmZXJEYXRhID0gO1xuICAgICAgICAgICAgLy9xdWFkQ21kLmNvbG9yID0gdGhpcy5fbWF0ZXJpYWwuY29sb3I7XG5cbiAgICAgICAgICAgIHJlbmRlcmVyLmFkZENvbW1hbmQocXVhZENtZCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZGVmaW5pdGlvbnMuZC50c1wiLz5cbm1vZHVsZSBFbmdpbmUzRCB7XG4gICAgZXhwb3J0IGNsYXNzIFNjZW5lIGV4dGVuZHMgR2FtZU9iamVjdHtcbiAgICAgICAgcHVibGljIHN0YXRpYyBjcmVhdGUoY2FtZXJhOkNhbWVyYSwgdnNTb3VyY2U6c3RyaW5nLCBmc1NvdXJjZTpzdHJpbmcpIHtcbiAgICAgICAgICAgIHZhciBvYmogPSBuZXcgdGhpcyhjYW1lcmEpO1xuXG4gICAgICAgICAgICBvYmouaW5pdFdoZW5DcmVhdGUodnNTb3VyY2UsIGZzU291cmNlKTtcblxuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vcHJpdmF0ZSBfbWVzaGVzOmR5Q2IuQ29sbGVjdGlvbiA9IGR5Q2IuQ29sbGVjdGlvbi5jcmVhdGUoKTtcblxuICAgICAgICBwcml2YXRlIF9jYW1lcmE6Q2FtZXJhID0gbnVsbDtcbiAgICAgICAgZ2V0IGNhbWVyYSgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jYW1lcmE7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IGNhbWVyYShjYW1lcmE6Q2FtZXJhKSB7XG4gICAgICAgICAgICB0aGlzLl9jYW1lcmEgPSBjYW1lcmE7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9wcm9ncmFtOlByb2dyYW0gPSBudWxsO1xuICAgICAgICBnZXQgcHJvZ3JhbSgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9wcm9ncmFtO1xuICAgICAgICB9XG4gICAgICAgIHNldCBwcm9ncmFtKHByb2dyYW06UHJvZ3JhbSkge1xuICAgICAgICAgICAgdGhpcy5fcHJvZ3JhbSA9IHByb2dyYW07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdHJ1Y3RvcihjYW1lcmEpIHtcbiAgICAgICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgICAgIHRoaXMuX2NhbWVyYSA9IGNhbWVyYTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBpbml0V2hlbkNyZWF0ZSh2c1NvdXJjZTpzdHJpbmcsIGZzU291cmNlOnN0cmluZyl7XG4gICAgICAgICAgICB0aGlzLl9wcm9ncmFtID0gUHJvZ3JhbS5jcmVhdGUodnNTb3VyY2UsIGZzU291cmNlKVxuICAgICAgICB9XG5cbiAgICAgICAgLy9wdWJsaWMgYWRkKG1lc2hlc0FycjpNZXNoW10pIHtcbiAgICAgICAgLy8gICAgdGhpcy5fbWVzaGVzLmFkZENoaWxkcmVuKG1lc2hlc0Fycik7XG4gICAgICAgIC8vfVxuXG4gICAgICAgIHB1YmxpYyBydW4oKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgICAgIHRoaXMuX2NhbWVyYS5wdXNoTWF0cml4KCk7XG4gICAgICAgICAgICB0aGlzLl9jYW1lcmEub25TdGFydExvb3AoKTtcblxuICAgICAgICAgICAgdGhpcy5fY2FtZXJhLnJ1bigpO1xuXG4gICAgICAgICAgICB0aGlzLl9wcm9ncmFtLnVzZSgpO1xuXG4gICAgICAgICAgICB0aGlzLmZvckVhY2goKG1lc2gpPT4ge1xuICAgICAgICAgICAgICAgIHNlbGYuX3NldERhdGEobWVzaCk7XG5cbiAgICAgICAgICAgICAgICBtZXNoLnVwZGF0ZSgpO1xuXG4gICAgICAgICAgICAgICAgbWVzaC5kcmF3KCk7XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICB0aGlzLl9jYW1lcmEub25FbmRMb29wKCk7XG4gICAgICAgICAgICB0aGlzLl9jYW1lcmEucG9wTWF0cml4KCk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgaW5pdCgpe1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbiA9IFBvc2l0aW9uLmNyZWF0ZSgwLCAwLCAwKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgcHJpdmF0ZSBfc2V0RGF0YShtZXNoKXtcbiAgICAgICAgICAgIHRoaXMuX3Byb2dyYW0uc2V0VW5pZm9ybURhdGEoXCJ1X212cE1hdHJpeFwiLCBVbmlmb3JtRGF0YVR5cGUuRkxPQVRfTUFUNCwgdGhpcy5fY29tcHV0ZU12cE1hdHJpeChtZXNoKSk7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9jb21wdXRlTXZwTWF0cml4KG1lc2gpOk1hdHJpeHtcbiAgICAgICAgICAgIHJldHVybiBtZXNoLm1hdHJpeC5jb3B5KCkuYXBwbHlNYXRyaXgodGhpcy5fY2FtZXJhLmNvbXB1dGVWcE1hdHJpeCgpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kZWZpbml0aW9ucy5kLnRzXCIvPlxubW9kdWxlIEVuZ2luZTNEe1xuICAgIGRlY2xhcmUgdmFyIHdpbmRvdzphbnk7XG4gICAgLyoqXG4gICAgICog5p2l6Ieq44CKSFRNTDUgQ2FudmFzIOaguOW/g+aKgOacr+OAi1xuICAgICAqIOS4jeiDveWGmeWIsGdsb2JhbOS4re+8jOWQpuWImeS8muaKpemUmeKAnGlsbGVnYWwgaW52b2NhdGlvbuKAne+8gVxuICAgICAqL1xuICAgIHdpbmRvdy5yZXF1ZXN0TmV4dEFuaW1hdGlvbkZyYW1lID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG9yaWdpbmFsUmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gdW5kZWZpbmVkLFxuICAgICAgICAgICAgd3JhcHBlciA9IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGNhbGxiYWNrID0gdW5kZWZpbmVkLFxuICAgICAgICAgICAgZ2Vja29WZXJzaW9uID0gbnVsbCxcbiAgICAgICAgICAgIHVzZXJBZ2VudCA9IG5hdmlnYXRvci51c2VyQWdlbnQsXG4gICAgICAgICAgICBpbmRleCA9IDAsXG4gICAgICAgICAgICBzZWxmID0gdGhpcztcblxuICAgICAgICB3cmFwcGVyID0gZnVuY3Rpb24gKHRpbWUpIHtcbiAgICAgICAgICAgIHRpbWUgPSArbmV3IERhdGUoKTtcbiAgICAgICAgICAgIHNlbGYuY2FsbGJhY2sodGltZSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyohXG4gICAgICAgICBidWchXG4gICAgICAgICBiZWxvdyBjb2RlOlxuICAgICAgICAgd2hlbiBpbnZva2UgYiBhZnRlciAxcywgd2lsbCBvbmx5IGludm9rZSBiLCBub3QgaW52b2tlIGEhXG5cbiAgICAgICAgIGZ1bmN0aW9uIGEodGltZSl7XG4gICAgICAgICBjb25zb2xlLmxvZyhcImFcIiwgdGltZSk7XG4gICAgICAgICB3ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYSk7XG4gICAgICAgICB9XG5cbiAgICAgICAgIGZ1bmN0aW9uIGIodGltZSl7XG4gICAgICAgICBjb25zb2xlLmxvZyhcImJcIiwgdGltZSk7XG4gICAgICAgICB3ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYik7XG4gICAgICAgICB9XG5cbiAgICAgICAgIGEoKTtcblxuICAgICAgICAgc2V0VGltZW91dChiLCAxMDAwKTtcblxuXG5cbiAgICAgICAgIHNvIHVzZSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgcHJpb3JpdHkhXG4gICAgICAgICAqL1xuICAgICAgICBpZih3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVxdWVzdEFuaW1hdGlvbkZyYW1lO1xuICAgICAgICB9XG5cblxuICAgICAgICAvLyBXb3JrYXJvdW5kIGZvciBDaHJvbWUgMTAgYnVnIHdoZXJlIENocm9tZVxuICAgICAgICAvLyBkb2VzIG5vdCBwYXNzIHRoZSB0aW1lIHRvIHRoZSBhbmltYXRpb24gZnVuY3Rpb25cblxuICAgICAgICBpZiAod2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSkge1xuICAgICAgICAgICAgLy8gRGVmaW5lIHRoZSB3cmFwcGVyXG5cbiAgICAgICAgICAgIC8vIE1ha2UgdGhlIHN3aXRjaFxuXG4gICAgICAgICAgICBvcmlnaW5hbFJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWU7XG5cbiAgICAgICAgICAgIHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSBmdW5jdGlvbiAoY2FsbGJhY2ssIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmNhbGxiYWNrID0gY2FsbGJhY2s7XG5cbiAgICAgICAgICAgICAgICAvLyBCcm93c2VyIGNhbGxzIHRoZSB3cmFwcGVyIGFuZCB3cmFwcGVyIGNhbGxzIHRoZSBjYWxsYmFja1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9yaWdpbmFsUmVxdWVzdEFuaW1hdGlvbkZyYW1lKHdyYXBwZXIsIGVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy/kv67mlLl0aW1l5Y+C5pWwXG4gICAgICAgIGlmICh3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUpIHtcbiAgICAgICAgICAgIG9yaWdpbmFsUmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lO1xuXG4gICAgICAgICAgICB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBzZWxmLmNhbGxiYWNrID0gY2FsbGJhY2s7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gb3JpZ2luYWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUod3JhcHBlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBXb3JrYXJvdW5kIGZvciBHZWNrbyAyLjAsIHdoaWNoIGhhcyBhIGJ1ZyBpblxuICAgICAgICAvLyBtb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKSB0aGF0IHJlc3RyaWN0cyBhbmltYXRpb25zXG4gICAgICAgIC8vIHRvIDMwLTQwIGZwcy5cblxuICAgICAgICBpZiAod2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSkge1xuICAgICAgICAgICAgLy8gQ2hlY2sgdGhlIEdlY2tvIHZlcnNpb24uIEdlY2tvIGlzIHVzZWQgYnkgYnJvd3NlcnNcbiAgICAgICAgICAgIC8vIG90aGVyIHRoYW4gRmlyZWZveC4gR2Vja28gMi4wIGNvcnJlc3BvbmRzIHRvXG4gICAgICAgICAgICAvLyBGaXJlZm94IDQuMC5cblxuICAgICAgICAgICAgaW5kZXggPSB1c2VyQWdlbnQuaW5kZXhPZigncnY6Jyk7XG5cbiAgICAgICAgICAgIGlmICh1c2VyQWdlbnQuaW5kZXhPZignR2Vja28nKSAhPSAtMSkge1xuICAgICAgICAgICAgICAgIGdlY2tvVmVyc2lvbiA9IHVzZXJBZ2VudC5zdWJzdHIoaW5kZXggKyAzLCAzKTtcblxuICAgICAgICAgICAgICAgIGlmIChnZWNrb1ZlcnNpb24gPT09ICcyLjAnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEZvcmNlcyB0aGUgcmV0dXJuIHN0YXRlbWVudCB0byBmYWxsIHRocm91Z2hcbiAgICAgICAgICAgICAgICAgICAgLy8gdG8gdGhlIHNldFRpbWVvdXQoKSBmdW5jdGlvbi5cblxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4vLyAgICAgICAgICAgIHJldHVybiAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCAgLy/kvKDpgJLnu5ljYWxsYmFja+eahHRpbWXkuI3mmK/ku44xOTcw5bm0MeaciDHml6XliLDlvZPliY3miYDnu4/ov4fnmoTmr6vnp5LmlbDvvIFcbiAgICAgICAgcmV0dXJuIHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgICAgIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgICAgIHdpbmRvdy5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcblxuICAgICAgICAgICAgZnVuY3Rpb24gKGNhbGxiYWNrLCBlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgdmFyIHN0YXJ0LFxuICAgICAgICAgICAgICAgICAgICBmaW5pc2g7XG5cbiAgICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0ID0gK25ldyBEYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHN0YXJ0KTtcbiAgICAgICAgICAgICAgICAgICAgZmluaXNoID0gK25ldyBEYXRlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgc2VsZi50aW1lb3V0ID0gMTAwMCAvIDYwIC0gKGZpbmlzaCAtIHN0YXJ0KTtcblxuICAgICAgICAgICAgICAgIH0sIHNlbGYudGltZW91dCk7XG4gICAgICAgICAgICB9O1xuICAgIH0oKSk7XG5cbiAgICB3aW5kb3cuY2FuY2VsTmV4dFJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvdy5jYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgICB8fCB3aW5kb3cud2Via2l0Q2FuY2VsQW5pbWF0aW9uRnJhbWVcbiAgICB8fCB3aW5kb3cud2Via2l0Q2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgfHwgd2luZG93Lm1vekNhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZVxuICAgIHx8IHdpbmRvdy5vQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgfHwgd2luZG93Lm1zQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgfHwgY2xlYXJUaW1lb3V0O1xuXG4gICAgZXhwb3J0IGNsYXNzIERpcmVjdG9ye1xuICAgICAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6RGlyZWN0b3IgPSBudWxsO1xuXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5faW5zdGFuY2UgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9pbnN0YW5jZSA9IG5ldyB0aGlzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UuaW5pdFdoZW5DcmVhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vdG9kbyA6UmVuZGVyZXJcbiAgICAgICAgcHJpdmF0ZSBfcmVuZGVyZXI6V2ViR0xSZW5kZXJlciA9IG51bGw7XG4gICAgICAgIGdldCByZW5kZXJlcigpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlcmVyO1xuICAgICAgICB9XG4gICAgICAgIHNldCByZW5kZXJlcihyZW5kZXJlcjpXZWJHTFJlbmRlcmVyKXtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyID0gcmVuZGVyZXI7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF92aWV3OklWaWV3ID0gbnVsbDtcbiAgICAgICAgZ2V0IHZpZXcoKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl92aWV3O1xuICAgICAgICB9XG4gICAgICAgIHNldCB2aWV3KHZpZXc6SVZpZXcpe1xuICAgICAgICAgICAgdGhpcy5fdmlldyA9IHZpZXc7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9nbDphbnkgPSBudWxsO1xuICAgICAgICBnZXQgZ2woKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9nbDtcbiAgICAgICAgfVxuICAgICAgICBzZXQgZ2woZ2w6YW55KXtcbiAgICAgICAgICAgIHRoaXMuX2dsID0gZ2w7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9zY2VuZTpTY2VuZSA9IG51bGw7XG4gICAgICAgIHByaXZhdGUgX2xvb3BJZDpzdHJpbmcgPSBudWxsO1xuXG4gICAgICAgIHB1YmxpYyBpbml0V2hlbkNyZWF0ZSgpe1xuICAgICAgICAgICAgLy90b2RvIGRldGVjdCB0byBkZWNpZGUgdXNpbmcgd2hpY2ggcmVuZGVyZXJcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyID0gV2ViR0xSZW5kZXJlci5jcmVhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBydW5XaXRoU2NlbmUoc2NlbmU6U2NlbmUpIHtcbiAgICAgICAgICAgIHNjZW5lLmluaXQoKTtcbiAgICAgICAgICAgIHNjZW5lLm9uRW50ZXIoKTtcbiAgICAgICAgICAgIHRoaXMuX3NjZW5lID0gc2NlbmU7XG5cbiAgICAgICAgICAgIC8vdG9kbyBub3QgcHV0IGhlcmU/XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5pbml0KCk7XG5cbiAgICAgICAgICAgIHRoaXMuX3N0YXJ0TG9vcCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGdldFZpZXcoKTpJVmlld3tcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl92aWV3O1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGdldFRvcFVuZGVyUG9pbnQocG9pbnQ6UG9pbnQpOkdhbWVPYmplY3R7XG4gICAgICAgICAgICBpZighdGhpcy5fc2NlbmUpe1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2NlbmUuZ2V0VG9wVW5kZXJQb2ludChwb2ludCk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgY3JlYXRlR0woY2FudmFzSWQ6c3RyaW5nKXtcbiAgICAgICAgICAgIHRoaXMuX3ZpZXcgPSBWaWV3V2ViR0wuY3JlYXRlKGR5Q2IuRG9tUXVlcnkuY3JlYXRlKGNhbnZhc0lkKS5nZXQoMCkpO1xuICAgICAgICAgICAgdGhpcy5fZ2wgPSB0aGlzLl92aWV3LmdldENvbnRleHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX3N0YXJ0TG9vcCgpIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgICAgICAgICBtYWluTG9vcCA9IG51bGw7XG5cbiAgICAgICAgICAgIG1haW5Mb29wID0gKHRpbWUpID0+IHtcbiAgICAgICAgICAgICAgICBzZWxmLl9sb29wQm9keSh0aW1lKTtcblxuICAgICAgICAgICAgICAgIHNlbGYuX2xvb3BJZCA9IHdpbmRvdy5yZXF1ZXN0TmV4dEFuaW1hdGlvbkZyYW1lKG1haW5Mb29wKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLl9sb29wSWQgPSB3aW5kb3cucmVxdWVzdE5leHRBbmltYXRpb25GcmFtZShtYWluTG9vcCk7XG4gICAgICAgIH1cblxuICAgICAgICAvL3RvZG8gYWRkIHRpY2sgbWVjaGFuaXNtXG4gICAgICAgIHByaXZhdGUgX2xvb3BCb2R5KHRpbWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2dsLmNsZWFyKHRoaXMuX2dsLkNPTE9SX0JVRkZFUl9CSVQgfCB0aGlzLl9nbC5ERVBUSF9CVUZGRVJfQklUKTtcblxuICAgICAgICAgICAgdGhpcy5fc2NlbmUub25TdGFydExvb3AoKTtcblxuICAgICAgICAgICAgdGhpcy5fc2NlbmUucnVuKCk7XG5cbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbmRlcih0aGlzLl9zY2VuZSk7XG5cbiAgICAgICAgICAgIHRoaXMuX3NjZW5lLm9uRW5kTG9vcCgpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cImRlZmluaXRpb25zLmQudHNcIi8+XG5tb2R1bGUgRW5naW5lM0R7XG4gICAgLy90b2RvIGNhbiBzZXQgcGVyc3BlY3RpdmVQYXJhbXMsIGFkZCB1cGRhdGVQcm9qZWN0TWF0cml4IG1ldGhvZFxuICAgIC8vdG9kbyBvcHRpbWl6ZSB0byByZWR1Y2UgY29tcHV0ZVxuICAgIGV4cG9ydCBjbGFzcyBDYW1lcmF7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKGxvb2tBdFBhcmFtcywgcGVyc3BlY3RpdmVQYXJhbXMpOkNhbWVyYSB7XG4gICAgICAgICAgICB2YXIgb2JqID0gbmV3IHRoaXMobG9va0F0UGFyYW1zLCBwZXJzcGVjdGl2ZVBhcmFtcyk7XG5cbiAgICAgICAgICAgIG9iai5pbml0V2hlbkNyZWF0ZSgpO1xuXG4gICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfcE1hdHJpeDpNYXRyaXggPSBudWxsO1xuICAgICAgICBnZXQgcE1hdHJpeCgpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3BNYXRyaXg7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IHBNYXRyaXgocE1hdHJpeDpNYXRyaXgpe1xuICAgICAgICAgICAgdGhpcy5fcE1hdHJpeCA9IHBNYXRyaXg7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF92TWF0cml4Ok1hdHJpeCA9IG51bGw7XG4gICAgICAgIGdldCB2TWF0cml4KCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdk1hdHJpeDtcbiAgICAgICAgfVxuICAgICAgICBzZXQgdk1hdHJpeCh2TWF0cml4Ok1hdHJpeCl7XG4gICAgICAgICAgICB0aGlzLl92TWF0cml4ID0gdk1hdHJpeDtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX21vdmVTcGVlZDpudW1iZXIgPSAwLjA1O1xuICAgICAgICBnZXQgbW92ZVNwZWVkKCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbW92ZVNwZWVkO1xuICAgICAgICB9XG4gICAgICAgIHNldCBtb3ZlU3BlZWQobW92ZVNwZWVkOm51bWJlcil7XG4gICAgICAgICAgICB0aGlzLl9tb3ZlU3BlZWQgPSBtb3ZlU3BlZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9yb3RhdGVTdGVwWDpudW1iZXIgPSAwLjE7XG4gICAgICAgIGdldCByb3RhdGVTdGVwWCgpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JvdGF0ZVN0ZXBYO1xuICAgICAgICB9XG4gICAgICAgIHNldCByb3RhdGVTdGVwWChfcm90YXRlU3RlcFg6bnVtYmVyKXtcbiAgICAgICAgICAgIHRoaXMuX3JvdGF0ZVN0ZXBYID0gX3JvdGF0ZVN0ZXBYO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfcm90YXRlU3RlcFk6bnVtYmVyID0gMC4xO1xuICAgICAgICBnZXQgcm90YXRlU3RlcFkoKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yb3RhdGVTdGVwWTtcbiAgICAgICAgfVxuICAgICAgICBzZXQgcm90YXRlU3RlcFkocm90YXRlU3RlcFk6bnVtYmVyKXtcbiAgICAgICAgICAgIHRoaXMuX3JvdGF0ZVN0ZXBZID0gcm90YXRlU3RlcFk7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF96b29tU3BlZWQ6bnVtYmVyID0gMTA7XG4gICAgICAgIGdldCB6b29tU3BlZWQoKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl96b29tU3BlZWQ7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IHpvb21TcGVlZCh6b29tU3BlZWQ6bnVtYmVyKXtcbiAgICAgICAgICAgIHRoaXMuX3pvb21TcGVlZCA9IHpvb21TcGVlZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2V5ZVg6bnVtYmVyID0gbnVsbDtcbiAgICAgICAgcHJpdmF0ZSBfZXllWTpudW1iZXIgPSBudWxsO1xuICAgICAgICBwcml2YXRlIF9leWVaOm51bWJlciA9IG51bGw7XG4gICAgICAgIHByaXZhdGUgX3VwWDpudW1iZXIgPSBudWxsO1xuICAgICAgICBwcml2YXRlIF91cFk6bnVtYmVyID0gbnVsbDtcbiAgICAgICAgcHJpdmF0ZSBfdXBaOm51bWJlciA9IG51bGw7XG4gICAgICAgIHByaXZhdGUgX2NlbnRlclg6bnVtYmVyID0gbnVsbDtcbiAgICAgICAgcHJpdmF0ZSBfY2VudGVyWTpudW1iZXIgPSBudWxsO1xuICAgICAgICBwcml2YXRlIF9jZW50ZXJaOm51bWJlciA9IG51bGw7XG4gICAgICAgIHByaXZhdGUgX3pvb21BbmdsZTpudW1iZXI9IG51bGw7XG4gICAgICAgIHByaXZhdGUgX2FzcGVjdDpudW1iZXIgPSBudWxsO1xuICAgICAgICBwcml2YXRlIF9uZWFyOm51bWJlciA9IG51bGw7XG4gICAgICAgIHByaXZhdGUgX2ZhcjpudW1iZXIgPSBudWxsO1xuICAgICAgICBwcml2YXRlIF9tb3ZlWDpudW1iZXIgPSBudWxsO1xuICAgICAgICBwcml2YXRlIF9tb3ZlWTpudW1iZXIgPSBudWxsO1xuICAgICAgICBwcml2YXRlIF9tb3ZlWjpudW1iZXIgPSBudWxsO1xuICAgICAgICBwcml2YXRlIF9yb3RhdGVBbmdsZVg6bnVtYmVyID0gbnVsbDtcbiAgICAgICAgcHJpdmF0ZSBfcm90YXRlQW5nbGVZOm51bWJlciA9IG51bGw7XG4gICAgICAgIHByaXZhdGUgX3pvb21JbkFuZ2xlOm51bWJlciA9IG51bGw7XG4gICAgICAgIHByaXZhdGUgX3pvb21PdXRBbmdsZTpudW1iZXIgPSBudWxsO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKGxvb2tBdFBhcmFtcywgcGVyc3BlY3RpdmVQYXJhbXMpe1xuICAgICAgICAgICAgdGhpcy5fZXllWCA9IGxvb2tBdFBhcmFtcy5leWVYO1xuICAgICAgICAgICAgdGhpcy5fZXllWSA9IGxvb2tBdFBhcmFtcy5leWVZO1xuICAgICAgICAgICAgdGhpcy5fZXllWiA9IGxvb2tBdFBhcmFtcy5leWVaO1xuICAgICAgICAgICAgdGhpcy5fdXBYID0gbG9va0F0UGFyYW1zLnVwWDtcbiAgICAgICAgICAgIHRoaXMuX3VwWSA9IGxvb2tBdFBhcmFtcy51cFk7XG4gICAgICAgICAgICB0aGlzLl91cFogPSBsb29rQXRQYXJhbXMudXBaO1xuICAgICAgICAgICAgdGhpcy5fY2VudGVyWCA9IGxvb2tBdFBhcmFtcy5jZW50ZXJYO1xuICAgICAgICAgICAgdGhpcy5fY2VudGVyWSA9IGxvb2tBdFBhcmFtcy5jZW50ZXJZO1xuICAgICAgICAgICAgdGhpcy5fY2VudGVyWiA9IGxvb2tBdFBhcmFtcy5jZW50ZXJaO1xuXG4gICAgICAgICAgICB0aGlzLl96b29tQW5nbGU9IHBlcnNwZWN0aXZlUGFyYW1zLmFuZ2xlO1xuICAgICAgICAgICAgdGhpcy5fYXNwZWN0ID0gcGVyc3BlY3RpdmVQYXJhbXMuYXNwZWN0O1xuICAgICAgICAgICAgdGhpcy5fbmVhciA9IHBlcnNwZWN0aXZlUGFyYW1zLm5lYXI7XG4gICAgICAgICAgICB0aGlzLl9mYXIgPSBwZXJzcGVjdGl2ZVBhcmFtcy5mYXI7XG5cbiAgICAgICAgICAgIHRoaXMuX21vdmVYID0gMDtcbiAgICAgICAgICAgIHRoaXMuX21vdmVZID0gMDtcbiAgICAgICAgICAgIHRoaXMuX21vdmVaID0gMDtcbiAgICAgICAgICAgIHRoaXMuX3JvdGF0ZUFuZ2xlWCA9IDA7XG4gICAgICAgICAgICB0aGlzLl9yb3RhdGVBbmdsZVkgPSAwO1xuICAgICAgICAgICAgdGhpcy5fem9vbUluQW5nbGUgPSAwO1xuICAgICAgICAgICAgdGhpcy5fem9vbU91dEFuZ2xlID0gMDtcblxuICAgICAgICAgICAgdGhpcy5fcE1hdHJpeCA9IE1hdHJpeC5jcmVhdGUoKTtcbiAgICAgICAgICAgIHRoaXMuX3ZNYXRyaXggPSBNYXRyaXguY3JlYXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgaW5pdFdoZW5DcmVhdGUoKXtcbiAgICAgICAgICAgIHRoaXMuX3ZNYXRyaXguc2V0TG9va0F0KHRoaXMuX2V5ZVgsIHRoaXMuX2V5ZVksIHRoaXMuX2V5ZVosIHRoaXMuX2NlbnRlclgsIHRoaXMuX2NlbnRlclksIHRoaXMuX2NlbnRlclosIHRoaXMuX3VwWCwgdGhpcy5fdXBZLCB0aGlzLl91cFopO1xuICAgICAgICAgICAgdGhpcy5fcE1hdHJpeC5zZXRQZXJzcGVjdGl2ZSh0aGlzLl96b29tQW5nbGUsIHRoaXMuX2FzcGVjdCwgdGhpcy5fbmVhciwgdGhpcy5fZmFyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBjb21wdXRlVnBNYXRyaXgoKXtcbiAgICAgICAgICAgIHZhciBtYXRyaXggPSBNYXRyaXguY3JlYXRlKCk7XG5cbiAgICAgICAgICAgIG1hdHJpeC5hcHBseU1hdHJpeCh0aGlzLl92TWF0cml4KTtcbiAgICAgICAgICAgIG1hdHJpeC5hcHBseU1hdHJpeCh0aGlzLl9wTWF0cml4KTtcblxuICAgICAgICAgICAgcmV0dXJuIG1hdHJpeDtcbiAgICAgICAgfVxuXG4gICAgICAgIG1vdmVMZWZ0KCl7XG4gICAgICAgICAgICB0aGlzLl9jb21wdXRlTW92ZURpc3RhbmNlKFZlY3RvcjQuY3JlYXRlKC10aGlzLl9tb3ZlU3BlZWQsIDAsIDAsIDEpKTtcblxuXG4gICAgICAgICAgICAvL+e7lXjovbTml4vovazml7bvvIzmipXlvbF4eeW5s+mdouS4uuWeguebtOaWueWQke+8jOiAjExlZnTlkoxSaWdodOenu+WKqOaKleW9seWIsHh55bmz6Z2i5Li65rC05bmz5pa55ZCR77yM5Zug5q2k57uVeOi9tOaXi+i9rOS4jeS8muW9seWTjUxlZnTlkoxSaWdodOenu+WKqFxuICAgICAgICAgICAgLy90aGlzLl9tb3ZlWCA9IHRoaXMuX21vdmVYICsgY29zKHRoaXMuX3JvdGF0ZUFuZ2xlWSAqIFBJIC8gMTgwKSAqIHRoaXMuX21vdmVTcGVlZDtcbiAgICAgICAgICAgIC8vdGhpcy5fbW92ZVogPSB0aGlzLl9tb3ZlWiArIHNpbih0aGlzLl9yb3RhdGVBbmdsZVkqIFBJIC8gMTgwKSAqdGhpcy5fbW92ZVNwZWVkO1xuICAgICAgICB9XG4gICAgICAgIG1vdmVSaWdodCgpe1xuICAgICAgICAgICAgdGhpcy5fY29tcHV0ZU1vdmVEaXN0YW5jZShWZWN0b3I0LmNyZWF0ZSh0aGlzLl9tb3ZlU3BlZWQsIDAsIDAsIDEpKTtcblxuICAgICAgICAgICAgLy90aGlzLl9tb3ZlWCA9IHRoaXMuX21vdmVYIC0gY29zKHRoaXMuX3JvdGF0ZUFuZ2xlWSAqIFBJIC8gMTgwKSAqIHRoaXMuX21vdmVTcGVlZDtcbiAgICAgICAgICAgIC8vdGhpcy5fbW92ZVogPSB0aGlzLl9tb3ZlWiAtIHNpbih0aGlzLl9yb3RhdGVBbmdsZVkqIFBJIC8gMTgwKSAqdGhpcy5fbW92ZVNwZWVkO1xuICAgICAgICB9XG5cbiAgICAgICAgbW92ZUJhY2soKXtcbiAgICAgICAgICAgIHRoaXMuX2NvbXB1dGVNb3ZlRGlzdGFuY2UoVmVjdG9yNC5jcmVhdGUoMCwgMCwgdGhpcy5fbW92ZVNwZWVkLCAxKSk7XG5cbiAgICAgICAgICAgIC8vdGhpcy5fbW92ZVkgPSB0aGlzLl9tb3ZlWSAtIHNpbih0aGlzLl9yb3RhdGVBbmdsZVggKiBQSSAvIDE4MCkgKiB0aGlzLl9tb3ZlU3BlZWQ7XG4gICAgICAgICAgICAvL3RoaXMuX21vdmVaID0gdGhpcy5fbW92ZVogKyBjb3ModGhpcy5fcm90YXRlQW5nbGVYKiBQSSAvIDE4MCkgKnRoaXMuX21vdmVTcGVlZDtcblxuICAgICAgICAgICAgLy90aGlzLl9tb3ZlWCA9IHRoaXMuX21vdmVYICsgc2luKHRoaXMuX3JvdGF0ZUFuZ2xlWSAqIFBJIC8gMTgwKSAqIHRoaXMuX21vdmVTcGVlZDtcbiAgICAgICAgICAgIC8vdGhpcy5fbW92ZVogPSB0aGlzLl9tb3ZlWiAtIGNvcyh0aGlzLl9yb3RhdGVBbmdsZVkqIFBJIC8gMTgwKSAqdGhpcy5fbW92ZVNwZWVkO1xuICAgICAgICB9XG4gICAgICAgIG1vdmVGcm9udCgpe1xuICAgICAgICAgICAgdGhpcy5fY29tcHV0ZU1vdmVEaXN0YW5jZShWZWN0b3I0LmNyZWF0ZSgwLCAwLCAtdGhpcy5fbW92ZVNwZWVkLCAxKSk7XG5cbiAgICAgICAgICAgIC8vdGhpcy5fbW92ZVkgPSB0aGlzLl9tb3ZlWSArIHNpbih0aGlzLl9yb3RhdGVBbmdsZVggKiBQSSAvIDE4MCkgKiB0aGlzLl9tb3ZlU3BlZWQ7XG4gICAgICAgICAgICAvL3RoaXMuX21vdmVaID0gdGhpcy5fbW92ZVogLSBjb3ModGhpcy5fcm90YXRlQW5nbGVYKiBQSSAvIDE4MCkgKnRoaXMuX21vdmVTcGVlZDtcblxuICAgICAgICAgICAgLy90aGlzLl9tb3ZlWCA9IHRoaXMuX21vdmVYIC0gc2luKHRoaXMuX3JvdGF0ZUFuZ2xlWSAqIFBJIC8gMTgwKSAqIHRoaXMuX21vdmVTcGVlZDtcbiAgICAgICAgICAgIC8vdGhpcy5fbW92ZVogPSB0aGlzLl9tb3ZlWiArIGNvcyh0aGlzLl9yb3RhdGVBbmdsZVkqIFBJIC8gMTgwKSAqdGhpcy5fbW92ZVNwZWVkO1xuICAgICAgICB9XG5cbiAgICAgICAgLy90b2RvIOeUqOasp+aLieinkuaIluWbm+WFg+aVsOadpeihqOekuuaWueWQkVxuICAgICAgICByb3RhdGUoKXtcbiAgICAgICAgICAgIHRoaXMuX3JvdGF0ZUFuZ2xlWSA9IHRoaXMuX3JvdGF0ZUFuZ2xlWSArIHRoaXMuX3JvdGF0ZVN0ZXBZOztcbiAgICAgICAgICAgIHRoaXMuX3JvdGF0ZUFuZ2xlWCA9IE1hdGgubWF4KE1hdGgubWluKHRoaXMuX3JvdGF0ZUFuZ2xlWCArIHRoaXMuX3JvdGF0ZVN0ZXBYLCA5MC4wKSwgLTkwLjApO1xuICAgICAgICB9XG5cbiAgICAgICAgem9vbUluKCl7XG4gICAgICAgICAgICB0aGlzLl96b29tQW5nbGUgPSBNYXRoLm1pbih0aGlzLl96b29tQW5nbGUgKyB0aGlzLl96b29tU3BlZWQsIDE3OSk7XG4gICAgICAgIH1cbiAgICAgICAgem9vbU91dCgpe1xuICAgICAgICAgICAgdGhpcy5fem9vbUFuZ2xlID0gTWF0aC5tYXgodGhpcy5fem9vbUFuZ2xlIC0gdGhpcy5fem9vbVNwZWVkLCAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJ1bigpe1xuICAgICAgICAgICAgLyohXG4gICAgICAgICAgICAg6ZyA6KaB5a+56KeG5Zu+5Z2Q5qCH57O76L+b6KGM5Y+Y5o2i77yM5YWI6L+b6KGM5peL6L2s5Y+Y5o2iUu+8jOWGjei/m+ihjOW5s+enu+WPmOaNolTvvIzljbNNPVQqUlxuICAgICAgICAgICAgIOWboOatpOebuOW9k+S6juWvueinhuWbvuWdkOagh+i/m+ihjE3nmoTpgIblj5jmjaLvvIzljbNNLTE9Ui0xICogVC0x77yM5Y2zWCc9KFItMSAqIFQtMSkgKiBY77yIWOS4uuinhuWbvuWdkOagh++8jFgn5Li65Y+Y5o2i5ZCO55qE5Z2Q5qCH77yJXG5cbiAgICAgICAgICAgICDogIzmraTlpITmmK/lr7nop4blm77lnZDmoIfov5vooYzlj5jmjaLvvIzlm6DmraTopoHov5vooYxN55qE6YCG5Y+Y5o2i44CCXG5cbiAgICAgICAgICAgICDms6jmhI/vvJrml4vovazop5Jyb3RhdGVBbmdsZeWSjOenu+WKqOi3neemu+mDveaYr+mSiOWvueinhuWbvuWdkOagh+ezu+eahO+8gVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLl92TWF0cml4LnRyYW5zbGF0ZSgtdGhpcy5fbW92ZVgsIC10aGlzLl9tb3ZlWSwgLXRoaXMuX21vdmVaKTtcblxuICAgICAgICAgICAgdGhpcy5fdk1hdHJpeC5yb3RhdGUoLXRoaXMuX3JvdGF0ZUFuZ2xlWSwgMC4wLCAxLjAsIDAuMCk7XG4gICAgICAgICAgICB0aGlzLl92TWF0cml4LnJvdGF0ZSgtdGhpcy5fcm90YXRlQW5nbGVYLCAxLjAsIDAuMCwgMC4wKTtcblxuICAgICAgICAgICAgLy92YXIgdmVjNCA9IE1hdHJpeFRvb2wubXVsdGlwbHlWZWN0b3I0KHRoaXMuX3ZNYXRyaXgudmFsdWVzLCBbdGhpcy5fZXllWCwgdGhpcy5fZXllWSwgdGhpcy5fZXllWiwgMV0pO1xuICAgICAgICAgICAgLy90aGlzLl9leWVYID0gdmVjNFswXTtcbiAgICAgICAgICAgIC8vdGhpcy5fZXllWSA9IHZlYzRbMV07XG4gICAgICAgICAgICAvL3RoaXMuX2V5ZVogPSB2ZWM0WzJdO1xuXG5cbiAgICAgICAgICAgIC8vdGhpcy5fdk1hdHJpeC50cmFuc2xhdGUodGhpcy5fbW92ZVgsIHRoaXMuX21vdmVZLCB0aGlzLl9tb3ZlWik7XG5cbiAgICAgICAgICAgIHRoaXMuX3BNYXRyaXguc2V0UGVyc3BlY3RpdmUodGhpcy5fem9vbUFuZ2xlLCB0aGlzLl9hc3BlY3QsIHRoaXMuX25lYXIsIHRoaXMuX2Zhcik7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgcHVzaE1hdHJpeCgpe1xuICAgICAgICAgICAgdGhpcy5fdk1hdHJpeC5wdXNoKCk7XG4gICAgICAgICAgICB0aGlzLl9wTWF0cml4LnB1c2goKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBwb3BNYXRyaXgoKXtcbiAgICAgICAgICAgIHRoaXMuX3ZNYXRyaXgucG9wKCk7XG4gICAgICAgICAgICB0aGlzLl9wTWF0cml4LnBvcCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyohXG4gICAgICAgICBob29rIG1ldGhvZFxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIG9uU3RhcnRMb29wKCl7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgb25FbmRMb29wKCl7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9jb21wdXRlTW92ZURpc3RhbmNlKHNwZWVkVmVjNCl7XG4gICAgICAgICAgICAvKiFcbiAgICAgICAgICAgICDmraTlpITnp7vliqjot53nprvmmK/pkojlr7nop4blm77lnZDmoIfns7vnmoTvvIjlhYjml4vovazvvIznhLblkI7lubPnp7vvvInvvIzlm6DmraTpnIDopoHorqHnrpfop4blm77lnZDmoIfns7vml4vovazlkI7np7vliqjnmoTot53nprvjgIJcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdmFyIG1hdHJpeCA9IE1hdHJpeC5jcmVhdGUoKTtcbiAgICAgICAgICAgIG1hdHJpeC5zZXRSb3RhdGUodGhpcy5fcm90YXRlQW5nbGVYLCAxLjAsIDAuMCwgMC4wKTtcbiAgICAgICAgICAgIG1hdHJpeC5yb3RhdGUodGhpcy5fcm90YXRlQW5nbGVZLCAwLjAsIDEuMCwgMC4wKTtcblxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IG1hdHJpeC5tdWx0aXBseVZlY3RvcjQoc3BlZWRWZWM0KS52YWx1ZXM7XG5cbiAgICAgICAgICAgIHRoaXMuX21vdmVYICs9IHJlc3VsdFswXTtcbiAgICAgICAgICAgIHRoaXMuX21vdmVZICs9IHJlc3VsdFsxXTtcbiAgICAgICAgICAgIHRoaXMuX21vdmVaICs9IHJlc3VsdFsyXTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==