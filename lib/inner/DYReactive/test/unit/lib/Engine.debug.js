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
            var e, rd, s, ct;
            if (near === far || aspect === 0) {
                throw 'null frustum';
            }
            if (near <= 0) {
                throw 'near <= 0';
            }
            if (far <= 0) {
                throw 'far <= 0';
            }
            var fovy = Math.PI * fovy / 180 / 2;
            s = Math.sin(fovy);
            if (s === 0) {
                throw 'null frustum';
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
            throw new Error("abstract method need override");
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
            this._childs = dyCb.Collection.create();
        }
        ActionManager.create = function () {
            var obj = new this();
            return obj;
        };
        ActionManager.prototype.addChild = function (action) {
            if (this.hasChild(action)) {
                return;
            }
            this._childs.addChild(action);
        };
        ActionManager.prototype.hasChild = function (action) {
            return this._childs.hasChild(action);
        };
        ActionManager.prototype.update = function () {
            var self = this, removeQueue = [];
            //time = null;
            this._childs.forEach(function (child) {
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
                self._childs.removeChild(child);
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

/// <reference path="definitions.d.ts"/>
var Engine3D;
(function (Engine3D) {
    var WebGLContext = (function () {
        function WebGLContext() {
        }
        WebGLContext.createGL = function (canvasId) {
            this.view = Engine3D.ViewWebGL.create(dyCb.DomQuery.create(canvasId).get(0));
            this.gl = this.view.getContext();
        };
        WebGLContext.view = null;
        WebGLContext.gl = null;
        return WebGLContext;
    })();
    Engine3D.WebGLContext = WebGLContext;
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
            var shader = null, gl = Engine3D.WebGLContext.gl;
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
            var gl = Engine3D.WebGLContext.gl;
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
                    throw new Error("无效的类型");
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
            var gl = Engine3D.WebGLContext.gl;
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
            this._program = Engine3D.WebGLContext.gl.createProgram();
        }
        Program.create = function (vsSource, fsSource) {
            var obj = new this();
            obj.initWhenCreate(vsSource, fsSource);
            return obj;
        };
        Program.prototype.use = function () {
            Engine3D.WebGLContext.gl.useProgram(this._program);
        };
        Program.prototype.setUniformData = function (name, type, data) {
            var gl = Engine3D.WebGLContext.gl, pos = gl.getUniformLocation(this._program, name);
            switch (type) {
                case Engine3D.UniformDataType.FLOAT_MAT4:
                    gl.uniformMatrix4fv(pos, false, data.values);
                    break;
                default:
                    throw new Error("数据类型错误");
                    break;
            }
        };
        Program.prototype.setAttributeData = function (name, type, data) {
            var gl = Engine3D.WebGLContext.gl, pos = gl.getAttribLocation(this._program, name);
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
                    throw new Error("数据类型错误");
                    break;
            }
        };
        Program.prototype.initWhenCreate = function (vsSource, fsSource) {
            var gl = Engine3D.WebGLContext.gl, vs = null, fs = null;
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
                throw new Error("must has vertexBuffer");
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
            var totalNum = 0, startOffset = 0, vertexBuffer = this._buffers.getChild("vertexBuffer"), gl = Engine3D.WebGLContext.gl;
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
            Engine3D.WebGLContext.gl.clearColor(this._clearColor.r, this._clearColor.g, this._clearColor.b, this._clearAlpha);
        };
        WebGLRenderer.prototype.setClearColor = function (color, alpha) {
            if (alpha === void 0) { alpha = 1.0; }
            this._clearColor = color;
            this._clearAlpha = alpha;
            Engine3D.WebGLContext.gl.clearColor(this._clearColor.r, this._clearColor.g, this._clearColor.g, this._clearAlpha);
        };
        WebGLRenderer.prototype._clearCommand = function () {
            this._commandQueue.removeAllChilds();
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
            this._loadText(url, function (err, data) {
                if (err) {
                    Engine3D.LoaderManager.getInstance().onResError(url, err);
                    return;
                }
                Engine3D.LoaderManager.getInstance().onResLoaded();
                self._container.addChild(id, data);
            });
        };
        GLSLLoader.prototype.getGLSL = function (id) {
            return this._container.getChild(id);
        };
        GLSLLoader.prototype._loadText = function (url, callback) {
            dyCb.AjaxUtils.ajax({
                type: "get",
                //async: true,
                url: url,
                contentType: "text/plain; charset=utf-8",
                dataType: "text",
                //cache: false,
                success: function (data) {
                    callback(null, data);
                },
                error: function (XMLHttpRequest, errorThrown) {
                    callback("url:" + url + "\nreadyState:" + XMLHttpRequest.readyState + "\nstatus:" + XMLHttpRequest.status
                        + "\nmessage:" + errorThrown.message
                        + "\nresponseText:" + XMLHttpRequest.responseText);
                }
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
            resourcesArr.forEach(function (res) {
                Engine3D.GLSLLoader.getInstance().load(res.url, res.id);
                self._resCount += 1;
            });
            this._isFinishLoad();
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
            throw new Error("abstract method need override");
        };
        Geometry.prototype.computeIndicesBuffer = function () {
            throw new Error("abstract method need override");
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

var Engine3D;
(function (Engine3D) {
    //按键枚举值
    (function (KeyCodeMap) {
        KeyCodeMap[KeyCodeMap["A"] = 65] = "A";
        KeyCodeMap[KeyCodeMap["B"] = 66] = "B";
        KeyCodeMap[KeyCodeMap["C"] = 67] = "C";
        KeyCodeMap[KeyCodeMap["D"] = 68] = "D";
        KeyCodeMap[KeyCodeMap["E"] = 69] = "E";
        KeyCodeMap[KeyCodeMap["F"] = 70] = "F";
        KeyCodeMap[KeyCodeMap["G"] = 71] = "G";
        KeyCodeMap[KeyCodeMap["H"] = 72] = "H";
        KeyCodeMap[KeyCodeMap["I"] = 73] = "I";
        KeyCodeMap[KeyCodeMap["J"] = 74] = "J";
        KeyCodeMap[KeyCodeMap["K"] = 75] = "K";
        KeyCodeMap[KeyCodeMap["L"] = 76] = "L";
        KeyCodeMap[KeyCodeMap["M"] = 77] = "M";
        KeyCodeMap[KeyCodeMap["N"] = 78] = "N";
        KeyCodeMap[KeyCodeMap["O"] = 79] = "O";
        KeyCodeMap[KeyCodeMap["P"] = 80] = "P";
        KeyCodeMap[KeyCodeMap["Q"] = 81] = "Q";
        KeyCodeMap[KeyCodeMap["R"] = 82] = "R";
        KeyCodeMap[KeyCodeMap["S"] = 83] = "S";
        KeyCodeMap[KeyCodeMap["T"] = 84] = "T";
        KeyCodeMap[KeyCodeMap["U"] = 85] = "U";
        KeyCodeMap[KeyCodeMap["V"] = 86] = "V";
        KeyCodeMap[KeyCodeMap["W"] = 87] = "W";
        KeyCodeMap[KeyCodeMap["X"] = 88] = "X";
        KeyCodeMap[KeyCodeMap["Y"] = 89] = "Y";
        KeyCodeMap[KeyCodeMap["Z"] = 90] = "Z";
        KeyCodeMap[KeyCodeMap["SPACE"] = 32] = "SPACE";
    })(Engine3D.KeyCodeMap || (Engine3D.KeyCodeMap = {}));
    var KeyCodeMap = Engine3D.KeyCodeMap;
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
        EventListenerMap.prototype.appendChild = function (eventType, data) {
            this._listenerMap.appendChild(
            //String(data.target.uid) + "_" + eventType,
            this._buildKey(data.currentTarget, eventType), data);
        };
        EventListenerMap.prototype.getChild = function (target, eventType) {
            var self = this;
            //
            //return this._listenerMap.filter((list:dyCb.Collection, key:string) => {
            //    return key === self._buildKey(target, eventType);
            //});
            //
            if (arguments.length === 1) {
                return this._listenerMap.filter(function (list, key) {
                    return self._isTarget(key, target, list);
                });
            }
            else if (arguments.length === 2) {
                return this._listenerMap.getChild(this._buildKey(target, eventType));
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
                var target = arguments[0], eventType = arguments[1];
                return this._listenerMap.hasChild(this._buildKey(target, eventType));
            }
        };
        EventListenerMap.prototype.filter = function (func) {
            return this._listenerMap.filter(func);
        };
        EventListenerMap.prototype.forEach = function (func) {
            return this._listenerMap.forEach(func);
        };
        EventListenerMap.prototype.removeChild = function (args) {
            var self = this, target = arguments[0];
            if (arguments.length === 1) {
                return this._listenerMap.removeChild(function (list, key) {
                    return self._isTarget(key, target, list);
                });
            }
            else if (arguments.length === 2) {
                var eventType = arguments[1];
                return this._listenerMap.removeChild(this._buildKey(target, eventType));
            }
            else if (arguments.length === 3) {
                var eventType = arguments[1], handler = arguments[2];
                return this._listenerMap.map(function (list, key) {
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
        EventListenerMap.prototype.getEventOffDataList = function (target, eventType) {
            var result = dyCb.Collection.create(), self = this;
            if (arguments.length === 1) {
                this.getChild(target)
                    .forEach(function (list, key) {
                    if (list && list.getCount() > 0) {
                        result.addChild({
                            eventType: self.getEventTypeFromKey(key),
                            wrapHandler: list.getChild(0).wrapHandler
                        });
                    }
                });
                return result;
            }
            else if (arguments.length === 2) {
                var list = this.getChild(target, eventType);
                if (list && list.getCount() > 0) {
                    result.addChild({
                        eventType: eventType,
                        wrapHandler: list.getChild(0).wrapHandler
                    });
                }
                return result;
            }
        };
        EventListenerMap.prototype.getEventTypeFromKey = function (key) {
            return key.split("_")[1];
        };
        EventListenerMap.prototype._buildKey = function (target, eventType) {
            return String(target.uid) + "_" + eventType;
        };
        EventListenerMap.prototype._isTarget = function (key, target, list) {
            return key.indexOf(String(target.uid)) > -1 && list !== undefined;
        };
        return EventListenerMap;
    })();
    Engine3D.EventListenerMap = EventListenerMap;
})(Engine3D || (Engine3D = {}));

var Engine3D;
(function (Engine3D) {
    (function (EventCategory) {
        EventCategory[EventCategory["MOUSE"] = 0] = "MOUSE";
    })(Engine3D.EventCategory || (Engine3D.EventCategory = {}));
    var EventCategory = Engine3D.EventCategory;
})(Engine3D || (Engine3D = {}));

var Engine3D;
(function (Engine3D) {
    (function (EventType) {
        EventType[EventType["CLICK"] = "click"] = "CLICK";
        EventType[EventType["MOUSEOVER"] = "mouseover"] = "MOUSEOVER";
        EventType[EventType["MOUSEUP"] = "mouseup"] = "MOUSEUP";
        EventType[EventType["MOUSEOUT"] = "mouseout"] = "MOUSEOUT";
        EventType[EventType["MOUSEMOVE"] = "mousemove"] = "MOUSEMOVE";
        EventType[EventType["MOUSEDOWN"] = "mousedown"] = "MOUSEDOWN";
    })(Engine3D.EventType || (Engine3D.EventType = {}));
    var EventType = Engine3D.EventType;
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
    _table.addChild(Engine3D.EventType.CLICK, Engine3D.EventCategory.MOUSE);
    _table.addChild(Engine3D.EventType.MOUSEOVER, Engine3D.EventCategory.MOUSE);
    _table.addChild(Engine3D.EventType.MOUSEOUT, Engine3D.EventCategory.MOUSE);
    _table.addChild(Engine3D.EventType.MOUSEMOVE, Engine3D.EventCategory.MOUSE);
    _table.addChild(Engine3D.EventType.MOUSEDOWN, Engine3D.EventCategory.MOUSE);
    _table.addChild(Engine3D.EventType.MOUSEUP, Engine3D.EventCategory.MOUSE);
    var EventTable = (function () {
        function EventTable() {
        }
        //getEventCategory should put here,
        //it should not put in Event class, it's better to extract EventTable class to put in
        EventTable.getEventCategory = function (eventType) {
            return _table.getChild(eventType);
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
        function Event(event, eventType) {
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
            this._event = null;
            this._event = event;
            this._name = eventType;
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
                dyCb.Log.error(!this._target, dyCb.Log.info.FUNC_MUST_DEFINE("target"));
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
        Object.defineProperty(Event.prototype, "event", {
            get: function () {
                return this._event;
            },
            set: function (event) {
                this._event = event || window.event;
            },
            enumerable: true,
            configurable: true
        });
        Event.prototype.stopPropagation = function () {
            this._isStopPropagation = true;
        };
        Event.prototype.copy = function () {
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
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
        function MouseEvent() {
            _super.apply(this, arguments);
            /*!
            implement abstract attri
             */
            this.type = Engine3D.EventCategory.MOUSE;
            this._location = null;
            this._locationInView = null;
            this._button = null;
        }
        //public static CLICK:string = "click";
        //public static MOUSEOVER:string = "mouseover";
        //public static MOUSEOUT:string = "mouseout";
        //public static MOUSEMOVE:string = "mousemove";
        //public static create(eventType:EventType) {
        //    var obj = new this(eventType);
        //
        //    return obj;
        //}
        MouseEvent.create = function (event, eventType) {
            var obj = new this(event, eventType);
            return obj;
        };
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
        return MouseEvent;
    })(Engine3D.Event);
    Engine3D.MouseEvent = MouseEvent;
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
            this._eventCategory = null;
            this._priority = null;
            this._handlerDataList = dyCb.Collection.create();
            this._eventCategory = option.eventCategory;
            this._priority = option.priority || 1;
        }
        EventListener.create = function (option) {
            var obj = new this(option);
            obj.initWhenCreate(option);
            return obj;
        };
        Object.defineProperty(EventListener.prototype, "eventCategory", {
            get: function () {
                return this._eventCategory;
            },
            set: function (eventCategory) {
                this._eventCategory = eventCategory;
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
                            eventType: this._parseEventName(i),
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
        EventHandler.prototype.on = function (view, eventType, target) {
            dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        };
        EventHandler.prototype.off = function (view, eventType, handler) {
            dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        };
        EventHandler.prototype.trigger = function (target, eventObject, handler) {
            dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        };
        return EventHandler;
    })();
    Engine3D.EventHandler = EventHandler;
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
        //constructor() {
        //    //constructor() {
        //    //EventRegister.getInstance() = register;
        //}
        //private _eventRegister:EventRegister = null;
        MouseEventHandler.prototype.on = function (view, eventType, target) {
            var self = this, context = window, wrapHandler = null;
            wrapHandler = dyCb.EventUtils.bindEvent(context, function (event) {
                var eventObject = self._createEventObject(event, eventType, target), topTarget = Engine3D.Director.getInstance().getTopUnderPoint(eventObject.locationInView);
                Engine3D.EventManager.emit(topTarget, eventObject);
            });
            dyCb.EventUtils.addEvent(view.dom, eventType, wrapHandler);
            return wrapHandler;
        };
        //public wrapHandler(target:GameObject, handler:Function) {
        //    return this._wrapHandler(target, handlerData.handler)
        //}
        //public off(view: IView, target:GameObject):void;
        //public off(view: IView, target:GameObject, eventType:EventType):void;
        //public off(view: IView, target:GameObject, eventType:EventType, handler:Function):void;
        //public off(args) {
        MouseEventHandler.prototype.off = function (view, eventType, handler) {
            //var eventRegister = EventRegister.getInstance(),
            //    view = arguments[0],
            //    target = arguments[1];
            dyCb.EventUtils.removeEvent(view.dom, eventType, handler);
            //
            //if (arguments.length === 2) {
            //    eventRegister.getChild(target)
            //        .forEach((list:dyCb.Collection, key:string) => {
            //            if(list.getCount() === 0){
            //                dyCb.Log.assert(false, dyCb.Log.info.FUNC_MUST_NOT_BE("value", "empty"));
            //                return;
            //            }
            //
            //            //dyCb.EventUtils.removeEvent(view.dom, eventRegister.getEventTypeFromKey(key), data.handler);
            //            dyCb.EventUtils.removeEvent(view.dom, eventRegister.getEventTypeFromKey(key), list.getChild(0).wrapHandler);
            //        });
            //}
            //else if (arguments.length === 3) {
            //    let eventType = arguments[2];
            //
            //    eventRegister.getChild(target, eventType)
            //        .forEach((data:IEventRegisterData, key:string) => {
            //            dyCb.EventUtils.removeEvent(view.dom, eventType, data.handler);
            //        });
            //}
            //else if (arguments.length === 4) {
            //    let eventType = arguments[2],
            //        handler = arguments[3];
            //
            //    dyCb.EventUtils.removeEvent(view.dom, eventType, handler);
            //    //eventRegister.getChild(target, eventType)
            //    //    .filter((data:IEventRegisterData) => {
            //    //        return data.handler === handler;
            //    //    })
            //    //    .forEach((data:IEventRegisterData) => {
            //    //        dyCb.EventUtils.removeEvent(view.dom, eventType, handler);
            //    //    });
            //}
        };
        MouseEventHandler.prototype.trigger = function (target, eventObject, handler) {
            eventObject.target = target;
            handler(eventObject);
            //if (eventObject.isStopPropagation) {
            //    return;
            //}
            //
            //if (eventObject.phase === EventPhase.BROADCAST) {
            //    EventManager.broadcast(target, eventObject);
            //}
            //else if (eventObject.phase === EventPhase.EMIT) {
            //    EventManager.emit(target, eventObject);
            //}
            ////emit default
            //else {
            //    EventManager.emit(target, eventObject);
            //}
        };
        //
        //public broadcast(){
        //
        //}
        //public emit(){
        //
        //}
        //private _wrapHandler(handler) {
        //    return function (eventObject) {
        //        //if (this._getTopGameObjectUnderPoint(eventObject)) {
        //        handler(eventObject);
        //
        //
        //        //judge dispatch
        //
        //        //is swallow
        //
        //        //else dispatch to others
        //        //if(isSwallow){
        //        //}
        //    }
        //}
        //private _getTopTriggerDataArrUnderPoint(eventObject:MouseEvent){
        //    var self = this,
        //        locationInView:Point = eventObject.locationInView,
        //        name = eventObject.name;
        //
        //    function getUnderPoint(target) {
        //        var result:dyCb.Collection = null,
        //            top = null;
        //
        //        if(target === null){
        //            return null;
        //        }
        //
        //        result= EventRegister.getInstance().getListenerDataList(target, name);
        //
        //        if(self._isTrigger(result)){
        //            return result;
        //        }
        //
        //        top = target.getTopUnderPoint(locationInView);
        //
        //        if(JudgeUtils.isEqual(top, target)){
        //            return null;
        //        }
        //
        //        return arguments.callee(top);
        //    }
        //
        //    return getUnderPoint(Director.getInstance().getTopUnderPoint(locationInView));
        //}
        MouseEventHandler.prototype._isTrigger = function (result) {
            return result && result.getCount() > 0;
        };
        MouseEventHandler.prototype._createEventObject = function (event, eventType, currentTarget) {
            var obj = Engine3D.MouseEvent.create(event ? event : window.event, eventType);
            obj.currentTarget = currentTarget;
            return obj;
        };
        MouseEventHandler._instance = null;
        return MouseEventHandler;
    })(Engine3D.EventHandler);
    Engine3D.MouseEventHandler = MouseEventHandler;
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
        //dispatch in eventBinder->eventList
        //public setBubbleParent(target:GameObject, parent:any) {
        //    EventRegister.getInstance().setBubbleParent(target, parent);
        //}
        EventDispatcher.prototype.trigger = function (target, eventObject) {
            if (!(target instanceof Engine3D.GameObject)) {
                dyCb.Log.log("target is not GameObject, can't trigger event");
                return;
            }
            var self = this;
            //var eventCategory = this._eventBinder.getEventCategory(eventType);
            //var eventCategory = EventTable.getEventCategory(eventType);
            var eventCategory = eventObject.type, eventType = eventObject.name;
            //eventObject.stopPropagation();
            //todo move to eventbinder?
            //may bind multi listener on eventType(based on priority)
            var listenerDataList = Engine3D.EventRegister.getInstance().getListenerDataList(target, eventType);
            if (listenerDataList === null || listenerDataList.getCount() === 0) {
                return;
            }
            listenerDataList.forEach(function (listenerData) {
                //FactoryEventHandler.createEventHandler(eventCategory).trigger(target, listener.handlerDataList, eventType);
                Engine3D.FactoryEventHandler.createEventHandler(eventCategory).trigger(
                //target,
                listenerData.currentTarget, 
                //todo need copy?
                //eventObject.copy(),
                eventObject, 
                //FactoryEventHandler.createEvent(eventCategory, eventType, EventPhase.EMIT),
                listenerData.handler);
            });
        };
        /**
         * transfer event up
         * @param target
         * @param eventObject
         */
        EventDispatcher.prototype.emit = function (target, eventObject) {
            var parent = null;
            eventObject.phase = Engine3D.EventPhase.EMIT;
            this.trigger(target, eventObject);
            parent = this._getParent(target);
            while (parent) {
                //this.trigger(target, eventObject);
                this.trigger(parent, eventObject);
                parent = this._getParent(parent);
            }
        };
        /**
         * transfer event down
         * @param target
         * @param eventObject
         */
        EventDispatcher.prototype.broadcast = function (target, eventObject) {
        };
        EventDispatcher.prototype._getParent = function (target) {
            var parent = target.bubbleParent;
            return parent ? parent : target.parent;
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
        EventRegister.prototype.register = function (target, eventType, handler, wrapHandler, priority) {
            //var isBindEventOnView = false,
            var data = {
                currentTarget: target,
                handler: handler,
                wrapHandler: wrapHandler,
                priority: priority
            };
            //eventType = <string>eventType;
            ////priority set in listener, not in this(binder)!
            //if(priority){
            //    listener.setPriority(priority);
            //}
            //if (this.isBindEventOnView(eventType)){
            //    isBindEventOnView = true;
            //    //this._listenerMap.appendChild(this._buildKey(target.uid, eventType), handler);
            //}
            //else {
            //    isBindEventOnView = false;
            //    //this._listenerMap.addChild(eventType, data);
            //}
            this._listenerMap.appendChild(eventType, data);
            //this._listenerList.addChild(listener.eventCategory,  {
            //    target:target,
            //    listener:listener
            //});
            //return isBindEventOnView;
        };
        EventRegister.prototype.remove = function (args) {
            var target = arguments[0];
            if (arguments.length === 1) {
                this._listenerMap.removeChild(target);
                this._handleAfterAllEventHandlerRemoved(target);
                return this._listenerMap.getEventOffDataList(target);
            }
            else if (arguments.length === 2 || arguments.length === 3) {
                var eventType = arguments[1];
                this._listenerMap.removeChild.apply(this._listenerMap, Array.prototype.slice.call(arguments, 0));
                if (this._isAllEventHandlerRemoved(target)) {
                    this._handleAfterAllEventHandlerRemoved(target);
                    return this._listenerMap.getEventOffDataList(target, eventType);
                }
                return null;
            }
        };
        //todo rename to getEventRegisterDataList
        EventRegister.prototype.getListenerDataList = function (currentTarget, eventType) {
            //var result = this._listenerMap.getChild(<any>eventType),
            //    self = this;
            //
            //if(!result || !currentTarget){
            //    return null;
            //}
            //
            //return result.filter(function (data) {
            //    return JudgeUtils.isEqual(data.currentTarget, currentTarget)
            //    || self._isContain(data.currentTarget, currentTarget);
            //})
            //    .sort(function (dataA, dataB) {
            //        return dataB.priority - dataA.priority;
            //    });
            var result = this._listenerMap.getChild(currentTarget, eventType), self = this;
            //if(!result || !currentTarget){
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
        EventRegister.prototype.isBinded = function (target, eventType) {
            return this._listenerMap.hasChild(target, eventType);
        };
        EventRegister.prototype.filter = function (func) {
            return this._listenerMap.filter(func);
        };
        EventRegister.prototype.forEach = function (func) {
            return this._listenerMap.forEach(func);
        };
        EventRegister.prototype.getChild = function (target, eventType) {
            return this._listenerMap.getChild.apply(this._listenerMap, Array.prototype.slice.call(arguments, 0));
        };
        EventRegister.prototype.getEventTypeFromKey = function (key) {
            return this._listenerMap.getEventTypeFromKey(key);
        };
        EventRegister.prototype.getWrapHandler = function (target, eventType) {
            var list = this.getChild(target, eventType);
            if (list && list.getCount() > 0) {
                return list.getChild(0).wrapHandler;
            }
        };
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
        //private _removeFromMap(target:GameObject, eventType:EventType) {
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
            var target = null, view = null;
            target = arguments[0];
            dyCb.Log.error(!(target instanceof Engine3D.GameObject), dyCb.Log.info.FUNC_MUST_BE("target", "GameObject"));
            view = this._getView();
            if (arguments.length === 2) {
                var arg = arguments[1], listener = null, eventHandler = null, self_1 = this;
                listener = !(arg instanceof Engine3D.EventListener) ? Engine3D.EventListener.create(arg) : arg;
                eventHandler = Engine3D.FactoryEventHandler.createEventHandler(listener.eventCategory);
                listener.handlerDataList.forEach(function (handlerData) {
                    self_1._handler(eventHandler, view, target, handlerData.eventType, listener.priority, handlerData.handler);
                });
            }
            else if (arguments.length === 4) {
                var eventType = arguments[1], handler = arguments[2], priority = arguments[3];
                this._handler(Engine3D.FactoryEventHandler.createEventHandler(Engine3D.EventTable.getEventCategory(eventType)), view, target, eventType, priority, handler);
            }
        };
        EventBinder.prototype.off = function (args) {
            var eventRegister = Engine3D.EventRegister.getInstance(), eventOffDataList = null, argArr = Array.prototype.slice.call(arguments, 0);
            //argArrCopy = argArr.concat();
            eventOffDataList = eventRegister.remove.apply(eventRegister, argArr);
            //argArr.unshift(this._getView());
            if (eventOffDataList) {
                this._unBind(eventOffDataList);
            }
            //
            //if(arguments.length === 1){
            //    let handlerList:dyCb.Collection = FactoryEventHandler.createEventHandler();
            //
            //    handlerList.forEach((handler:EventHandler) => {
            //        handler.off.apply(
            //            handler,
            //            argArr
            //        );
            //    });
            //}
            //else{
            //    let eventHandler:EventHandler = null,
            //        eventType = null,
            //        handler = null;
            //
            //    if(arguments.length === 2){
            //        eventType = arguments[1];
            //    }
            //    else if(arguments.length === 3){
            //        eventType = arguments[1];
            //        handler = arguments[2];
            //    }
            //
            //    eventHandler = FactoryEventHandler.createEventHandler(EventTable.getEventCategory(eventType));
            //
            //    eventHandler.off.apply(
            //        eventHandler,
            //        argArr
            //    );
            //}
        };
        //public remove(target:GameObject) {
        //    EventRegister.getInstance().remove(target);
        //    this.off(target);
        //}
        EventBinder.prototype.getListenerDataList = function (target, eventType) {
            return Engine3D.EventRegister.getInstance().getListenerDataList(target, eventType);
        };
        EventBinder.prototype._getView = function () {
            return Engine3D.Director.getInstance().getView();
        };
        EventBinder.prototype._handler = function (eventHandler, view, target, eventType, priority, handler) {
            var wrapHandler = null;
            if (!Engine3D.EventRegister.getInstance().isBinded(target, eventType)) {
                wrapHandler = eventHandler.on(view, eventType, target, handler);
            }
            else {
                wrapHandler = Engine3D.EventRegister.getInstance().getWrapHandler(target, eventType);
            }
            Engine3D.EventRegister.getInstance().register(target, eventType, handler, wrapHandler, priority);
        };
        EventBinder.prototype._unBind = function (eventOffDataList) {
            var view = this._getView();
            eventOffDataList.forEach(function (eventOffData) {
                Engine3D.FactoryEventHandler.createEventHandler(Engine3D.EventTable.getEventCategory(eventOffData.eventType))
                    .off(view, eventOffData.eventType, eventOffData.wrapHandler);
            });
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
        FactoryEventHandler.createEventHandler = function (eventCategory) {
            if (arguments.length === 0) {
                return this._createAllEventHandlers();
            }
            else if (arguments.length === 1) {
                var handler = null;
                switch (eventCategory) {
                    case Engine3D.EventCategory.MOUSE:
                        handler = Engine3D.MouseEventHandler.getInstance();
                        break;
                    //todo more type
                    default:
                        dyCb.Log.error(true, dyCb.Log.info.FUNC_INVALID("eventCategory"));
                        break;
                }
                return handler;
            }
        };
        //
        //public static createEvent(eventCategory:EventCategory, eventType:EventType, phase:EventPhase=EventPhase.EMIT){
        //    var eventObj = null;
        //
        //    switch (eventCategory){
        //        case EventCategory.MOUSE:
        //            eventObj = MouseEvent.create(null, eventType);
        //            break;
        //        //todo more type
        //        default :
        //            dyCb.Log.error(true, dyCb.Log.info.FUNC_INVALID("eventCategory"));
        //            break;
        //    }
        //
        //    eventObj.phase = phase;
        //
        //    return eventObj;
        //}
        FactoryEventHandler._createAllEventHandlers = function () {
            return dyCb.Collection.create([Engine3D.MouseEventHandler.getInstance()]);
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
            if (arguments.length === 2) {
                var target = arguments[0], listener = arguments[1];
                this._eventBinder.on(target, listener);
            }
            else if (arguments.length === 3 || arguments.length === 4) {
                var target = arguments[0], eventType = arguments[1], handler = arguments[2], priority = arguments[3] === undefined ? 0 : arguments[3];
                this._eventBinder.on(target, eventType, handler, priority);
            }
        };
        EventManager.off = function (args) {
            this._eventBinder.off.apply(this._eventBinder, Array.prototype.slice.call(arguments, 0));
        };
        EventManager.trigger = function (target, event) {
            this._eventDispatcher.trigger(target, event);
        };
        EventManager.broadcast = function (target, event) {
            this._eventDispatcher.broadcast(target, event);
        };
        EventManager.emit = function (target, event) {
            this._eventDispatcher.emit(target, event);
        };
        EventManager.setBubbleParent = function (target, parent) {
            Engine3D.EventRegister.getInstance().setBubbleParent(target, parent);
            //this._eventDispatcher.setBubbleParent(target, parent);
        };
        EventManager.fromEvent = function(target, eventType, priority){
            priority = priority || 0;

            return dyRt.fromEventPattern(
                function(handler){
                    EventManager.on(target, eventType, handler, priority);
                },
                function(handler){
                    EventManager.off(target, eventType);
                });
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
            this._childs = dyCb.Collection.create();
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
            return this._childs.hasChild(child);
        };
        //public addChild(child:GameObject, sort:boolean=true):boolean {
        GameObject.prototype.addChild = function (child) {
            //need user judge it!
            //if(this._childs.hasChild(child)) {
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
            this._childs.addChild(child);
            //if(sort) {
            /*!
            sort when add child/childs, not when get childs.
            because each loop will get childs(to render), so if using the latter, each loop should sort!
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
        GameObject.prototype.sort = function () {
            this._childs.sort(this._ascendZ);
            return this;
        };
        GameObject.prototype.forEach = function (func) {
            this._childs.forEach(func);
            return this;
        };
        GameObject.prototype.removeChild = function (child) {
            child.onExit();
            this._childs.removeChild(child);
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
            var result = null, i = null, childs = null, len = this._childs.getCount();
            childs = this._childs;
            if (len > 0) {
                for (i = len - 1; i >= 0; i--) {
                    var child = childs.getChild(i);
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
        //    this._meshes.addChilds(meshesArr);
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
            //todo move it to Director
            return Engine3D.WebGLContext.view;
        };
        Director.prototype.getTopUnderPoint = function (point) {
            if (!this._scene) {
                return null;
            }
            return this._scene.getTopUnderPoint(point);
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
            var gl = Engine3D.WebGLContext.gl;
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
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

