/// <reference path="../definitions.d.ts"/>
module dy{
    /*!
     注意：矩阵元素是按列主序存储在数组中的。
     */
    export class Matrix{
        public static create(mat:Float32Array):Matrix;
        public static create():Matrix;
        public static create():Matrix {
            var m = null;

            if(arguments.length === 0){
                m = new this();
            }
            else{
                m = new this(arguments[0]);
            }

            return m;
        }

        private _values: Float32Array = null;
        get values():Float32Array { return this._values; }
        set values(values: Float32Array) {
            this._values = values;
        }

        private _matrixArr:Array<Float32Array> = null;

        constructor(mat:Float32Array);
        constructor();
        constructor() {
            if (arguments.length === 1) {
                this._values = arguments[0];
            }
            else {
                this._values = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
            }

            this._matrixArr = [];
        }



        public push(){
            this._matrixArr.push(this._values);
        }

        public pop(){
            this._values = this._matrixArr.pop();
        }

        public setIdentity (): Matrix {
            var e = this._values;
            e[0] = 1;   e[4] = 0;   e[8]  = 0;   e[12] = 0;
            e[1] = 0;   e[5] = 1;   e[9]  = 0;   e[13] = 0;
            e[2] = 0;   e[6] = 0;   e[10] = 1;   e[14] = 0;
            e[3] = 0;   e[7] = 0;   e[11] = 0;   e[15] = 1;
            return this;
        }

        /**
         * Calculate the inverse matrix of specified matrix, and set to this.
         * @param other The source matrix
         * @return this
         */
        public setInverseOf (other:Matrix):Matrix {
            var i, s, d, inv, det;

            s = other.values;
            inv = new Float32Array(16);
            d = this._values;

            inv[0]  =   s[5]*s[10]*s[15] - s[5] *s[11]*s[14] - s[9] *s[6]*s[15]
            + s[9]*s[7] *s[14] + s[13]*s[6] *s[11] - s[13]*s[7]*s[10];
            inv[4]  = - s[4]*s[10]*s[15] + s[4] *s[11]*s[14] + s[8] *s[6]*s[15]
            - s[8]*s[7] *s[14] - s[12]*s[6] *s[11] + s[12]*s[7]*s[10];
            inv[8]  =   s[4]*s[9] *s[15] - s[4] *s[11]*s[13] - s[8] *s[5]*s[15]
            + s[8]*s[7] *s[13] + s[12]*s[5] *s[11] - s[12]*s[7]*s[9];
            inv[12] = - s[4]*s[9] *s[14] + s[4] *s[10]*s[13] + s[8] *s[5]*s[14]
            - s[8]*s[6] *s[13] - s[12]*s[5] *s[10] + s[12]*s[6]*s[9];

            inv[1]  = - s[1]*s[10]*s[15] + s[1] *s[11]*s[14] + s[9] *s[2]*s[15]
            - s[9]*s[3] *s[14] - s[13]*s[2] *s[11] + s[13]*s[3]*s[10];
            inv[5]  =   s[0]*s[10]*s[15] - s[0] *s[11]*s[14] - s[8] *s[2]*s[15]
            + s[8]*s[3] *s[14] + s[12]*s[2] *s[11] - s[12]*s[3]*s[10];
            inv[9]  = - s[0]*s[9] *s[15] + s[0] *s[11]*s[13] + s[8] *s[1]*s[15]
            - s[8]*s[3] *s[13] - s[12]*s[1] *s[11] + s[12]*s[3]*s[9];
            inv[13] =   s[0]*s[9] *s[14] - s[0] *s[10]*s[13] - s[8] *s[1]*s[14]
            + s[8]*s[2] *s[13] + s[12]*s[1] *s[10] - s[12]*s[2]*s[9];

            inv[2]  =   s[1]*s[6]*s[15] - s[1] *s[7]*s[14] - s[5] *s[2]*s[15]
            + s[5]*s[3]*s[14] + s[13]*s[2]*s[7]  - s[13]*s[3]*s[6];
            inv[6]  = - s[0]*s[6]*s[15] + s[0] *s[7]*s[14] + s[4] *s[2]*s[15]
            - s[4]*s[3]*s[14] - s[12]*s[2]*s[7]  + s[12]*s[3]*s[6];
            inv[10] =   s[0]*s[5]*s[15] - s[0] *s[7]*s[13] - s[4] *s[1]*s[15]
            + s[4]*s[3]*s[13] + s[12]*s[1]*s[7]  - s[12]*s[3]*s[5];
            inv[14] = - s[0]*s[5]*s[14] + s[0] *s[6]*s[13] + s[4] *s[1]*s[14]
            - s[4]*s[2]*s[13] - s[12]*s[1]*s[6]  + s[12]*s[2]*s[5];

            inv[3]  = - s[1]*s[6]*s[11] + s[1]*s[7]*s[10] + s[5]*s[2]*s[11]
            - s[5]*s[3]*s[10] - s[9]*s[2]*s[7]  + s[9]*s[3]*s[6];
            inv[7]  =   s[0]*s[6]*s[11] - s[0]*s[7]*s[10] - s[4]*s[2]*s[11]
            + s[4]*s[3]*s[10] + s[8]*s[2]*s[7]  - s[8]*s[3]*s[6];
            inv[11] = - s[0]*s[5]*s[11] + s[0]*s[7]*s[9]  + s[4]*s[1]*s[11]
            - s[4]*s[3]*s[9]  - s[8]*s[1]*s[7]  + s[8]*s[3]*s[5];
            inv[15] =   s[0]*s[5]*s[10] - s[0]*s[6]*s[9]  - s[4]*s[1]*s[10]
            + s[4]*s[2]*s[9]  + s[8]*s[1]*s[6]  - s[8]*s[2]*s[5];

            det = s[0]*inv[0] + s[1]*inv[4] + s[2]*inv[8] + s[3]*inv[12];
            if (det === 0) {
                return this;
            }

            det = 1 / det;
            for (i = 0; i < 16; i++) {
                d[i] = inv[i] * det;
            }

            return this;
        }

        /**
         * Calculate the inverse matrix of specified matrix, and set to this.
         * @param other The source matrix
         * @return this
         */
        public inverseOf ():Matrix {
            return this.setInverseOf(this);
        }

        /**
         * Transpose the matrix.
         * @return this
         */
        public transpose ():Matrix {
            var e, t;

            e = this._values;

            t = e[ 1];  e[ 1] = e[ 4];  e[ 4] = t;
            t = e[ 2];  e[ 2] = e[ 8];  e[ 8] = t;
            t = e[ 3];  e[ 3] = e[12];  e[12] = t;
            t = e[ 6];  e[ 6] = e[ 9];  e[ 9] = t;
            t = e[ 7];  e[ 7] = e[13];  e[13] = t;
            t = e[11];  e[11] = e[14];  e[14] = t;

            return this;
        }

        /**
         * Set the matrix for translation.
         * @param x The X value of a translation.
         * @param y The Y value of a translation.
         * @param z The Z value of a translation.
         * @return this
         */
        public setTranslate (x, y, z): Matrix {
            var e = this._values;
            e[0] = 1;  e[4] = 0;  e[8]  = 0;  e[12] = x;
            e[1] = 0;  e[5] = 1;  e[9]  = 0;  e[13] = y;
            e[2] = 0;  e[6] = 0;  e[10] = 1;  e[14] = z;
            e[3] = 0;  e[7] = 0;  e[11] = 0;  e[15] = 1;
            return this;
        }

        /**
         * Multiply the matrix for translation from the right.
         * @param x The X value of a translation.
         * @param y The Y value of a translation.
         * @param z The Z value of a translation.
         * @return this
         */
        public translate (x, y, z): Matrix {
            this.applyMatrix(Matrix.create().setTranslate(x, y, z));

            return this;
        }

        /**
         * Set the matrix for rotation.
         * The vector of rotation axis may not be normalized.
         * @param angle The angle of rotation (degrees)
         * @param x The X coordinate of vector of rotation axis.
         * @param y The Y coordinate of vector of rotation axis.
         * @param z The Z coordinate of vector of rotation axis.
         * @return this
         */
        public setRotate (angle: number, x: number, y: number, z:number): Matrix {
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
                e[0] = 1;  e[4] = 0;  e[ 8] = 0;  e[12] = 0;
                e[1] = 0;  e[5] = c;  e[ 9] =-s;  e[13] = 0;
                e[2] = 0;  e[6] = s;  e[10] = c;  e[14] = 0;
                e[3] = 0;  e[7] = 0;  e[11] = 0;  e[15] = 1;
            } else if (0 === x && 0 !== y && 0 === z) {
                // Rotation around Y axis
                if (y < 0) {
                    s = -s;
                }
                e[0] = c;  e[4] = 0;  e[ 8] = s;  e[12] = 0;
                e[1] = 0;  e[5] = 1;  e[ 9] = 0;  e[13] = 0;
                e[2] =-s;  e[6] = 0;  e[10] = c;  e[14] = 0;
                e[3] = 0;  e[7] = 0;  e[11] = 0;  e[15] = 1;
            } else if (0 === x && 0 === y && 0 !== z) {
                // Rotation around Z axis
                if (z < 0) {
                    s = -s;
                }
                e[0] = c;  e[4] =-s;  e[ 8] = 0;  e[12] = 0;
                e[1] = s;  e[5] = c;  e[ 9] = 0;  e[13] = 0;
                e[2] = 0;  e[6] = 0;  e[10] = 1;  e[14] = 0;
                e[3] = 0;  e[7] = 0;  e[11] = 0;  e[15] = 1;
            } else {
                // Rotation around another axis
                len = Math.sqrt(x*x + y*y + z*z);
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

                e[ 0] = x*x*nc +  c;
                e[ 1] = xy *nc + zs;
                e[ 2] = zx *nc - ys;
                e[ 3] = 0;

                e[ 4] = xy *nc - zs;
                e[ 5] = y*y*nc +  c;
                e[ 6] = yz *nc + xs;
                e[ 7] = 0;

                e[ 8] = zx *nc + ys;
                e[ 9] = yz *nc - xs;
                e[10] = z*z*nc +  c;
                e[11] = 0;

                e[12] = 0;
                e[13] = 0;
                e[14] = 0;
                e[15] = 1;
            }

            return this;
        }

        /**
         * Multiply the matrix for rotation from the right.
         * The vector of rotation axis may not be normalized.
         * @param angle The angle of rotation (degrees)
         * @param x The X coordinate of vector of rotation axis.
         * @param y The Y coordinate of vector of rotation axis.
         * @param z The Z coordinate of vector of rotation axis.
         * @return this
         */
        public rotate (angle, vector3:Vector3): Matrix;
        public rotate (angle, x, y, z): Matrix;

        public rotate (args): Matrix {
            var angle = arguments[0];

            if(arguments.length === 2){
                let vector3 = arguments[1];

                this.applyMatrix(Matrix.create().setRotate(angle, vector3.values[0], vector3.values[1], vector3.values[2]));
            }
            else if(arguments.length === 4){
                let x = arguments[1],
                    y = arguments[2],
                    z = arguments[3];

                this.applyMatrix(Matrix.create().setRotate(angle, x, y, z));
            }

            return this;
        }

        /**
         * Set the matrix for scaling.
         * @param x The scale factor along the X axis
         * @param y The scale factor along the Y axis
         * @param z The scale factor along the Z axis
         * @return this
         */
        public setScale (x, y, z):Matrix {
            var e = this._values;
            e[0] = x;  e[4] = 0;  e[8]  = 0;  e[12] = 0;
            e[1] = 0;  e[5] = y;  e[9]  = 0;  e[13] = 0;
            e[2] = 0;  e[6] = 0;  e[10] = z;  e[14] = 0;
            e[3] = 0;  e[7] = 0;  e[11] = 0;  e[15] = 1;
            return this;
        }

        /**
         * Multiply the matrix for scaling from the right.
         * @param x The scale factor along the X axis
         * @param y The scale factor along the Y axis
         * @param z The scale factor along the Z axis
         * @return this
         */
        public scale (x, y, z):Matrix {
            this.applyMatrix(Matrix.create().setScale(x, y, z));

            return this;
        }

        public setLookAt (eye:Vector3, center:Vector3, up:Vector3):Matrix;
        public setLookAt (eyeX:number, eyeY:number, eyeZ:number, centerX:number, centerY:number, centerZ:number, upX:number, upY:number, upZ:number):Matrix;

        public setLookAt (args):Matrix {
            var e, fx, fy, fz, rlf, sx, sy, sz, rls, ux, uy, uz,
                eye = null,
                center = null,
                up = null;

            if(arguments.length === 3){
                eye = arguments[0];
                center = arguments[1];
                up = arguments[2]
            }
            else if(arguments.length === 9){
                eye = Vector3.create(arguments[0], arguments[1], arguments[2]);
                center = Vector3.create(arguments[3], arguments[4], arguments[5]);
                up = Vector3.create(arguments[6], arguments[7], arguments[8]);
            }

            fx = center.x - eye.x;
            fy = center.y - eye.y;
            fz = center.z - eye.z;

            // Normalize f.
            rlf = 1 / Math.sqrt(fx*fx + fy*fy + fz*fz);
            fx *= rlf;
            fy *= rlf;
            fz *= rlf;

            // Calculate cross product of f and up.
            sx = fy * up.z - fz * up.y;
            sy = fz * up.x - fx * up.z;
            sz = fx * up.y - fy * up.x;

            // Normalize s.
            rls = 1 / Math.sqrt(sx*sx + sy*sy + sz*sz);
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

            //e[12] = 0;
            //e[13] = 0;
            //e[14] = 0;
            //e[15] = 1;

            e[12] = -eye.x;
            e[13] = -eye.y;
            e[14] = -eye.z;
            e[15] = 1;
            //Translate.
            //this.translate(-eye.x, -eye.y, -eye.z);
            //this.values = this.multiply(Matrix.create().setTranslate(-eye.x, -eye.y, -eye.z)).values;

            return this;
        }

        /**
         * Multiply the viewing matrix from the right.
         * @param eyeX, eyeY, eyeZ The position of the eye point.
         * @param centerX, centerY, centerZ The position of the reference point.
         * @param upX, upY, upZ The direction of the up vector.
         * @return this
         */
        public lookAt (eye:Vector3, center:Vector3, up:Vector3):Matrix;
        public lookAt (eyeX:number, eyeY:number, eyeZ:number, centerX:number, centerY:number, centerZ:number, upX:number, upY:number, upZ:number):Matrix;

        public lookAt (args):Matrix {
            var matrix = Matrix.create();

            this.applyMatrix(matrix.setLookAt.apply(matrix, Array.prototype.slice.call(arguments, 0)));

            return this;
        }


        public setOrtho (near, far):Matrix {
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
        }

        public ortho (n, f):Matrix{
            this.applyMatrix(Matrix.create().setOrtho(n, f));

            return this;
        }

        /**
         * Set the perspective projection matrix by fovy and aspect.
         * @param fovy The angle between the upper and lower sides of the frustum.
         * @param aspect The aspect ratio of the frustum. (width/height)
         * @param near The distances to the nearer depth clipping plane. This value must be plus value.
         * @param far The distances to the farther depth clipping plane. This value must be plus value.
         * @return this
         */
        public setPerspective (fovy: number, aspect, near, far):Matrix {
            var e, rd, s, ct,
                log = dyCb.Log,
                info = log.info;

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

            e[0]  = ct / aspect;
            e[1]  = 0;
            e[2]  = 0;
            e[3]  = 0;

            e[4]  = 0;
            e[5]  = ct;
            e[6]  = 0;
            e[7]  = 0;

            e[8]  = 0;
            e[9]  = 0;
            e[10] = -(far + near) * rd;
            e[11] = -1;

            e[12] = 0;
            e[13] = 0;
            e[14] = -2 * near * far * rd;
            e[15] = 0;

            return this;
        }

        public perspective (fovy, aspect, near, far):Matrix{
            this.applyMatrix(Matrix.create().setPerspective(fovy, aspect, near, far));

            return this;
        }

        public applyMatrix (other:Matrix):Matrix{
            var a = this,
                b = other;

            //this._values = MathUtils.multiply(a, b);
                //b*a，而不是a*b
                //这是因为在webgl中，向量是右乘的，
                //此处希望坐标向量先进行this._values的变换，然后进行other.values的变换，因此要b*a，从而在右乘向量时为b*a*vec
                this._values = b.multiply(a).values;

            return this;
        }

        public multiply(matrix2:Matrix):Matrix {
            var mat1 = this._values,
                mat2 = matrix2.values;
            var a = mat1[0], b = mat1[1], c = mat1[2], d = mat1[3],
                e = mat1[4], f = mat1[5], g = mat1[6], h = mat1[7],
                i = mat1[8], j = mat1[9], k = mat1[10], l = mat1[11],
                m = mat1[12], n = mat1[13], o = mat1[14], p = mat1[15],
                A = mat2[0], B = mat2[1], C = mat2[2], D = mat2[3],
                E = mat2[4], F = mat2[5], G = mat2[6], H = mat2[7],
                I = mat2[8], J = mat2[9], K = mat2[10], L = mat2[11],
                M = mat2[12], N = mat2[13], O = mat2[14], P = mat2[15];
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
        }

        public multiplyVector4(vector:Vector4):Vector4 {
            var mat1 = this._values,
                vec4 = vector.values;
            var result = [];

            result[0] = vec4[0] * mat1[0] + vec4[1] * mat1[4] + vec4[2] * mat1[8] + vec4[3] * mat1[12];
            result[1] = vec4[0] * mat1[1] + vec4[1] * mat1[5] + vec4[2] * mat1[9] + vec4[3] * mat1[13];
            result[2] = vec4[0] * mat1[2] + vec4[1] * mat1[6] + vec4[2] * mat1[10] + vec4[3] * mat1[14];
            result[3] = vec4[0] * mat1[3] + vec4[1] * mat1[7] + vec4[2] * mat1[11] + vec4[3] * mat1[15];

            return Vector4.create(result[0], result[1], result[2], result[3]);
        }

        public copy(): Matrix{
            var result = Matrix.create(),
                i = 0,
                len = this._values.length;

            for(i = 0; i < len; i++){
                result.values[i] = this._values[i];
            }


            return result;
        }

        public getX(){
            return Vector3.create(this._values[0], this._values[1], this._values[2]);
        }

        public getY(){
            return Vector3.create(this._values[4], this._values[5], this._values[6]);
        }

        public getZ(){
            return Vector3.create(this._values[8], this._values[9], this._values[10]);
        }

        /**
         * @function
         * @name pc.Mat4#setTRS
         * @description Sets the specified matrix to the concatenation of a translation, a
         * quaternion rotation and a scale.
         * @param {pc.Vec3} t A 3-d vector translation.
         * @param {pc.Quat} r A quaternion rotation.
         * @param {pc.Vec3} s A 3-d vector scale.
         * @returns {pc.Mat4} Self for chaining.
         * @example
         * var t = new pc.Vec3(10, 20, 30);
         * var r = new pc.Quat();
         * var s = new pc.Vec3(2, 2, 2);
         *
         * var m = new pc.Mat4();
         * m.compose(t, r, s);
         */
        public setTRS(t:Vector3, r:Quaternion, s:Vector3) {
            var tx, ty, tz, qx, qy, qz, qw, sx, sy, sz,
                x2, y2, z2, xx, xy, xz, yy, yz, zz, wx, wy, wz, m;

            tx = t.x;
            ty = t.y;
            tz = t.z;

            qx = r.x;
            qy = r.y;
            qz = r.z;
            qw = r.w;

            sx = s.x;
            sy = s.y;
            sz = s.z;

            x2 = qx + qx;
            y2 = qy + qy;
            z2 = qz + qz;
            xx = qx * x2;
            xy = qx * y2;
            xz = qx * z2;
            yy = qy * y2;
            yz = qy * z2;
            zz = qz * z2;
            wx = qw * x2;
            wy = qw * y2;
            wz = qw * z2;

            m = this._values;

            m[0] = (1 - (yy + zz)) * sx;
            m[1] = (xy + wz) * sx;
            m[2] = (xz - wy) * sx;
            m[3] = 0;

            m[4] = (xy - wz) * sy;
            m[5] = (1 - (xx + zz)) * sy;
            m[6] = (yz + wx) * sy;
            m[7] = 0;

            m[8] = (xz + wy) * sz;
            m[9] = (yz - wx) * sz;
            m[10] = (1 - (xx + yy)) * sz;
            m[11] = 0;

            m[12] = tx;
            m[13] = ty;
            m[14] = tz;
            m[15] = 1;

            return this;
        }
    }
}
