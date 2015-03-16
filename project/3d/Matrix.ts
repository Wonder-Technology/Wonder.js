/**矩阵计算库
 * 作者：YYC
 * 日期：2015-03-08
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
module Math3D{
    declare var YYC:any;


    /*!
     注意：矩阵元素是按列主序存储在数组中的。
     */
    export class Matrix{
        constructor(){
            this.values = new Float32Array([1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]);
        }
        public static create():Matrix {
            var m = new this();

            m.initWhenCreate();

            return m;
        }

        initWhenCreate(){
        }

        private _values: Float32Array;

        get values():Float32Array { return this._values; }
        set values(values: Float32Array) {
            this._values = values;
        }

        //createMatrix(): Float32Array{
        //    this.values = new Float32Array([1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]);
        //    return new Float32Array(16);
        //}

        setIdentity (): Matrix {
            var e = this.values;
            e[0] = 1;   e[4] = 0;   e[8]  = 0;   e[12] = 0;
            e[1] = 0;   e[5] = 1;   e[9]  = 0;   e[13] = 0;
            e[2] = 0;   e[6] = 0;   e[10] = 1;   e[14] = 0;
            e[3] = 0;   e[7] = 0;   e[11] = 0;   e[15] = 1;
            return this;
        }
        //identity(dest:any[]): number[]{
        //    dest[0]  = 1; dest[1]  = 0; dest[2]  = 0; dest[3]  = 0;
        //    dest[4]  = 0; dest[5]  = 1; dest[6]  = 0; dest[7]  = 0;
        //    dest[8]  = 0; dest[9]  = 0; dest[10] = 1; dest[11] = 0;
        //    dest[12] = 0; dest[13] = 0; dest[14] = 0; dest[15] = 1;
        //    return dest;
        //}
        //


        /**
         * Set the matrix for translation.
         * @param x The X value of a translation.
         * @param y The Y value of a translation.
         * @param z The Z value of a translation.
         * @return this
         */
        setTranslate (x, y, z): Matrix {
            var e = this.values;
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
        translate (x, y, z): Matrix {
            var e = this.values;
            e[12] += e[0] * x + e[4] * y + e[8]  * z;
            e[13] += e[1] * x + e[5] * y + e[9]  * z;
            e[14] += e[2] * x + e[6] * y + e[10] * z;
            e[15] += e[3] * x + e[7] * y + e[11] * z;
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
        setRotate (angle: number, x: number, y: number, z:number): Matrix {
            var e, s, c, len, rlen, nc, xy, yz, zx, xs, ys, zs;

            var angle = Math.PI * angle / 180;
            e = this.values;

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
        rotate (angle, x, y, z): Matrix {
            this.concat(Matrix.create().setRotate(angle, x, y, z));

            return this;
        }

        /**
         * Set the matrix for scaling.
         * @param x The scale factor along the X axis
         * @param y The scale factor along the Y axis
         * @param z The scale factor along the Z axis
         * @return this
         */
        setScale (x, y, z):Matrix {
            var e = this.values;
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
        scale (x, y, z):Matrix {
            this.concat(Matrix.create().setScale(x, y, z));

            return this;
        }
        //    scale(mat, x, y, z, dest): number[]{
        //        dest[0]  = mat[0]  * x;
        //        dest[1]  = mat[1]  * x;
        //        dest[2]  = mat[2]  * x;
        //        dest[3]  = mat[3]  * x;
        //        dest[4]  = mat[4]  * y;
        //        dest[5]  = mat[5]  * y;
        //        dest[6]  = mat[6]  * y;
        //        dest[7]  = mat[7]  * y;
        //        dest[8]  = mat[8]  * z;
        //        dest[9]  = mat[9]  * z;
        //        dest[10] = mat[10] * z;
        //        dest[11] = mat[11] * z;
        //        dest[12] = mat[12];
        //        dest[13] = mat[13];
        //        dest[14] = mat[14];
        //        dest[15] = mat[15];
        //        return dest;
        //    }
        //
        //    translate (mat, x, y, z, dest): number[]{
        //        dest[0] = mat[0]; dest[1] = mat[1]; dest[2]  = mat[2];  dest[3]  = mat[3];
        //        dest[4] = mat[4]; dest[5] = mat[5]; dest[6]  = mat[6];  dest[7]  = mat[7];
        //        dest[8] = mat[8]; dest[9] = mat[9]; dest[10] = mat[10]; dest[11] = mat[11];
        //        dest[12] = mat[0] * x + mat[4] * y + mat[8]  * z + mat[12];
        //        dest[13] = mat[1] * x + mat[5] * y + mat[9]  * z + mat[13];
        //        dest[14] = mat[2] * x + mat[6] * y + mat[10] * z + mat[14];
        //        dest[15] = mat[3] * x + mat[7] * y + mat[11] * z + mat[15];
        //        return dest;
        //    }
        //
        //    rotate (mat, angle: number, axis, dest): number[]{
        //        var sq = Math.sqrt(axis[0] * axis[0] + axis[1] * axis[1] + axis[2] * axis[2]);
        //        if(!sq){return null;}
        //        var a = axis[0], b = axis[1], c = axis[2];
        //        if(sq != 1){sq = 1 / sq; a *= sq; b *= sq; c *= sq;}
        //        var d = Math.sin(angle), e = Math.cos(angle), f = 1 - e,
        //            g = mat[0],  h = mat[1], i = mat[2],  j = mat[3],
        //            k = mat[4],  l = mat[5], m = mat[6],  n = mat[7],
        //            o = mat[8],  p = mat[9], q = mat[10], r = mat[11],
        //            s = a * a * f + e,
        //            t = b * a * f + c * d,
        //            u = c * a * f - b * d,
        //            v = a * b * f - c * d,
        //            w = b * b * f + e,
        //            x = c * b * f + a * d,
        //            y = a * c * f + b * d,
        //            z = b * c * f - a * d,
        //            A = c * c * f + e;
        //        if(angle){
        //            if(mat != dest){
        //                dest[12] = mat[12]; dest[13] = mat[13];
        //                dest[14] = mat[14]; dest[15] = mat[15];
        //            }
        //        } else {
        //            dest = mat;
        //        }
        //        dest[0] = g * s + k * t + o * u;
        //        dest[1] = h * s + l * t + p * u;
        //        dest[2] = i * s + m * t + q * u;
        //        dest[3] = j * s + n * t + r * u;
        //        dest[4] = g * v + k * w + o * x;
        //        dest[5] = h * v + l * w + p * x;
        //        dest[6] = i * v + m * w + q * x;
        //        dest[7] = j * v + n * w + r * x;
        //        dest[8] = g * y + k * z + o * A;
        //        dest[9] = h * y + l * z + p * A;
        //        dest[10] = i * y + m * z + q * A;
        //        dest[11] = j * y + n * z + r * A;
        //        return dest;
        //    }
        //
        setLookAt (eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ):Matrix {
            var e, fx, fy, fz, rlf, sx, sy, sz, rls, ux, uy, uz;

            fx = centerX - eyeX;
            fy = centerY - eyeY;
            fz = centerZ - eyeZ;

            // Normalize f.
            rlf = 1 / Math.sqrt(fx*fx + fy*fy + fz*fz);
            fx *= rlf;
            fy *= rlf;
            fz *= rlf;

            // Calculate cross product of f and up.
            sx = fy * upZ - fz * upY;
            sy = fz * upX - fx * upZ;
            sz = fx * upY - fy * upX;

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
            e = this.values;
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

            // Translate.
            this.translate(-eyeX, -eyeY, -eyeZ);

            return this;
        }

        /**
         * Multiply the viewing matrix from the right.
         * @param eyeX, eyeY, eyeZ The position of the eye point.
         * @param centerX, centerY, centerZ The position of the reference point.
         * @param upX, upY, upZ The direction of the up vector.
         * @return this
         */
        lookAt (eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ) {
            this.concat(Matrix.create().setLookAt(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ));

            return this;
        }


        setOrtho (near, far):Matrix {
            var e = this.values;

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

        ortho (n, f):Matrix{
            this.concat(Matrix.create().setOrtho(n, f));

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
        setPerspective (fovy: number, aspect, near, far):Matrix {
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

            e = this.values;

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

        perspective (fovy, aspect, near, far):Matrix{
            this.concat(Matrix.create().setPerspective(fovy, aspect, near, far));

            return this;
        }

        concat (other:Matrix):Matrix{
            var a = this.values,
                b = other.values;

            //顺序为other * this，保证先进行this的变换，再进行other的变换
            this.values = MatrixTool.multiply(b, a);

            return this;
        }

        //用于测试
        getValues_forTest():number[];
        getValues_forTest(values:Float32Array):number[];


        getValues_forTest(): number[]{
            var values = null,
                len = 0,
                i = 0,
                result = [];

            if(arguments[0]){
                values = arguments[0];
            }
            else{
                values = this.values;
            }

            len = values.length;

            for(i = 0; i < len; i ++){
                if(values[i] === -0){
                    result[i] = 0;
                    continue;
                }
                result[i] = YYC.Tool.math.toFixed(values[i], 7);
            }
            return result;
        }
    }

    export class Vector4{
        constructor(x, y, z, w);
        constructor();

        constructor(){
            this.values = new Float32Array(4);
            if(arguments.length > 0){
                this.values[0] = arguments[0];
                this.values[1] = arguments[1];
                this.values[2] =arguments[2];
                this.values[3] =arguments[3];
            }
        }

        public static create(x, y, z, w):Vector4 ;
        public static create():Vector4 ;

        public static create():Vector4 {
            var m = null;

            if(arguments.length === 0){
                m = new this();
            }
            else{
                m = new this(arguments[0], arguments[1], arguments[2], arguments[3]);
            }

            m.initWhenCreate();

            return m;
        }

        initWhenCreate(){
        }

        private _values: Float32Array;

        get values():Float32Array { return this._values; }
        set values(values: Float32Array) {
            this._values = values;
        }
    }

    export class MatrixTool{
        //constructor(){}

        public static multiply(mat1: Float32Array, mat2: Float32Array): Float32Array{
            var a = mat1[0],  b = mat1[1],  c = mat1[2],  d = mat1[3],
                e = mat1[4],  f = mat1[5],  g = mat1[6],  h = mat1[7],
                i = mat1[8],  j = mat1[9],  k = mat1[10], l = mat1[11],
                m = mat1[12], n = mat1[13], o = mat1[14], p = mat1[15],
                A = mat2[0],  B = mat2[1],  C = mat2[2],  D = mat2[3],
                E = mat2[4],  F = mat2[5],  G = mat2[6],  H = mat2[7],
                I = mat2[8],  J = mat2[9],  K = mat2[10], L = mat2[11],
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

            return dest;
        }
        /**
         * Multiply the four-dimensional vector.
         * @param pos  The multiply vector
         * @return The result of multiplication(Float32Array)
         */
        public static multiplyVector4 (values:Float32Array, pos:Vector4): Vector4 {
            var e = values;
            var p = pos.values;
            var v = Vector4.create();
            var result = v.values;

            result[0] = p[0] * e[0] + p[1] * e[4] + p[2] * e[ 8] + p[3] * e[12];
            result[1] = p[0] * e[1] + p[1] * e[5] + p[2] * e[ 9] + p[3] * e[13];
            result[2] = p[0] * e[2] + p[1] * e[6] + p[2] * e[10] + p[3] * e[14];
            result[3] = p[0] * e[3] + p[1] * e[7] + p[2] * e[11] + p[3] * e[15];

            return v;
        }
    }
}
