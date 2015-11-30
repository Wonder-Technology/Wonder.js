/// <reference path="../filePath.d.ts"/>
module wd{
    declare var Math:any;

    /*!
     注意：矩阵元素是按列主序存储在数组中的。
     */
    export class Matrix4{
        public static create(mat:Float32Array):Matrix4;
        public static create():Matrix4;

        public static create():Matrix4 {
            var m = null;

            if(arguments.length === 0){
                m = new this();
            }
            else{
                m = new this(arguments[0]);
            }

            return m;
        }

        constructor(mat:Float32Array);
        constructor();

        constructor() {
            if (arguments.length === 1) {
                this.values = arguments[0];
            }
            else {
                this.values = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
            }

            this._matrixArr = [];
        }

        public values: Float32Array = null;

        private _matrixArr:Array<Float32Array> = null;

        public push(){
            this._matrixArr.push(this.values);
        }

        public pop(){
            this.values = this._matrixArr.pop();
        }

        public setIdentity (): Matrix4 {
            var e = this.values;
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
        public invert ():Matrix4 {
            //var i, s, d, inv, det;
            //
            //s = this.values;
            //inv = new Float32Array(16);
            //d = this.values;
            //
            //inv[0]  =   s[5]*s[10]*s[15] - s[5] *s[11]*s[14] - s[9] *s[6]*s[15]
            //    + s[9]*s[7] *s[14] + s[13]*s[6] *s[11] - s[13]*s[7]*s[10];
            //inv[4]  = - s[4]*s[10]*s[15] + s[4] *s[11]*s[14] + s[8] *s[6]*s[15]
            //    - s[8]*s[7] *s[14] - s[12]*s[6] *s[11] + s[12]*s[7]*s[10];
            //inv[8]  =   s[4]*s[9] *s[15] - s[4] *s[11]*s[13] - s[8] *s[5]*s[15]
            //    + s[8]*s[7] *s[13] + s[12]*s[5] *s[11] - s[12]*s[7]*s[9];
            //inv[12] = - s[4]*s[9] *s[14] + s[4] *s[10]*s[13] + s[8] *s[5]*s[14]
            //    - s[8]*s[6] *s[13] - s[12]*s[5] *s[10] + s[12]*s[6]*s[9];
            //
            //inv[1]  = - s[1]*s[10]*s[15] + s[1] *s[11]*s[14] + s[9] *s[2]*s[15]
            //    - s[9]*s[3] *s[14] - s[13]*s[2] *s[11] + s[13]*s[3]*s[10];
            //inv[5]  =   s[0]*s[10]*s[15] - s[0] *s[11]*s[14] - s[8] *s[2]*s[15]
            //    + s[8]*s[3] *s[14] + s[12]*s[2] *s[11] - s[12]*s[3]*s[10];
            //inv[9]  = - s[0]*s[9] *s[15] + s[0] *s[11]*s[13] + s[8] *s[1]*s[15]
            //    - s[8]*s[3] *s[13] - s[12]*s[1] *s[11] + s[12]*s[3]*s[9];
            //inv[13] =   s[0]*s[9] *s[14] - s[0] *s[10]*s[13] - s[8] *s[1]*s[14]
            //    + s[8]*s[2] *s[13] + s[12]*s[1] *s[10] - s[12]*s[2]*s[9];
            //
            //inv[2]  =   s[1]*s[6]*s[15] - s[1] *s[7]*s[14] - s[5] *s[2]*s[15]
            //    + s[5]*s[3]*s[14] + s[13]*s[2]*s[7]  - s[13]*s[3]*s[6];
            //inv[6]  = - s[0]*s[6]*s[15] + s[0] *s[7]*s[14] + s[4] *s[2]*s[15]
            //    - s[4]*s[3]*s[14] - s[12]*s[2]*s[7]  + s[12]*s[3]*s[6];
            //inv[10] =   s[0]*s[5]*s[15] - s[0] *s[7]*s[13] - s[4] *s[1]*s[15]
            //    + s[4]*s[3]*s[13] + s[12]*s[1]*s[7]  - s[12]*s[3]*s[5];
            //inv[14] = - s[0]*s[5]*s[14] + s[0] *s[6]*s[13] + s[4] *s[1]*s[14]
            //    - s[4]*s[2]*s[13] - s[12]*s[1]*s[6]  + s[12]*s[2]*s[5];
            //
            //inv[3]  = - s[1]*s[6]*s[11] + s[1]*s[7]*s[10] + s[5]*s[2]*s[11]
            //    - s[5]*s[3]*s[10] - s[9]*s[2]*s[7]  + s[9]*s[3]*s[6];
            //inv[7]  =   s[0]*s[6]*s[11] - s[0]*s[7]*s[10] - s[4]*s[2]*s[11]
            //    + s[4]*s[3]*s[10] + s[8]*s[2]*s[7]  - s[8]*s[3]*s[6];
            //inv[11] = - s[0]*s[5]*s[11] + s[0]*s[7]*s[9]  + s[4]*s[1]*s[11]
            //    - s[4]*s[3]*s[9]  - s[8]*s[1]*s[7]  + s[8]*s[3]*s[5];
            //inv[15] =   s[0]*s[5]*s[10] - s[0]*s[6]*s[9]  - s[4]*s[1]*s[10]
            //    + s[4]*s[2]*s[9]  + s[8]*s[1]*s[6]  - s[8]*s[2]*s[5];
            //
            //det = s[0]*inv[0] + s[1]*inv[4] + s[2]*inv[8] + s[3]*inv[12];
            //if (det === 0) {
            //    Log.warn("can't invert matrix, determinant is 0");
            //
            //    this.setIdentity();
            //
            //    return this;
            //}
            //
            //det = 1 / det;
            //for (i = 0; i < 16; i++) {
            //    d[i] = inv[i] * det;
            //}
            //
            //return this;


            var a00, a01, a02, a03,
                a10, a11, a12, a13,
                a20, a21, a22, a23,
                a30, a31, a32, a33,
                b00, b01, b02, b03,
                b04, b05, b06, b07,
                b08, b09, b10, b11,
                invDet, m;

            m = this.values;
            a00 = m[0];
            a01 = m[1];
            a02 = m[2];
            a03 = m[3];
            a10 = m[4];
            a11 = m[5];
            a12 = m[6];
            a13 = m[7];
            a20 = m[8];
            a21 = m[9];
            a22 = m[10];
            a23 = m[11];
            a30 = m[12];
            a31 = m[13];
            a32 = m[14];
            a33 = m[15];

            b00 = a00 * a11 - a01 * a10;
            b01 = a00 * a12 - a02 * a10;
            b02 = a00 * a13 - a03 * a10;
            b03 = a01 * a12 - a02 * a11;
            b04 = a01 * a13 - a03 * a11;
            b05 = a02 * a13 - a03 * a12;
            b06 = a20 * a31 - a21 * a30;
            b07 = a20 * a32 - a22 * a30;
            b08 = a20 * a33 - a23 * a30;
            b09 = a21 * a32 - a22 * a31;
            b10 = a21 * a33 - a23 * a31;
            b11 = a22 * a33 - a23 * a32;

            invDet = 1 / (b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06);

            m[0] = (a11 * b11 - a12 * b10 + a13 * b09) * invDet;
            m[1] = (-a01 * b11 + a02 * b10 - a03 * b09) * invDet;
            m[2] = (a31 * b05 - a32 * b04 + a33 * b03) * invDet;
            m[3] = (-a21 * b05 + a22 * b04 - a23 * b03) * invDet;
            m[4] = (-a10 * b11 + a12 * b08 - a13 * b07) * invDet;
            m[5] = (a00 * b11 - a02 * b08 + a03 * b07) * invDet;
            m[6] = (-a30 * b05 + a32 * b02 - a33 * b01) * invDet;
            m[7] = (a20 * b05 - a22 * b02 + a23 * b01) * invDet;
            m[8] = (a10 * b10 - a11 * b08 + a13 * b06) * invDet;
            m[9] = (-a00 * b10 + a01 * b08 - a03 * b06) * invDet;
            m[10] = (a30 * b04 - a31 * b02 + a33 * b00) * invDet;
            m[11] = (-a20 * b04 + a21 * b02 - a23 * b00) * invDet;
            m[12] = (-a10 * b09 + a11 * b07 - a12 * b06) * invDet;
            m[13] = (a00 * b09 - a01 * b07 + a02 * b06) * invDet;
            m[14] = (-a30 * b03 + a31 * b01 - a32 * b00) * invDet;
            m[15] = (a20 * b03 - a21 * b01 + a22 * b00) * invDet;

            return this;



            //// based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
            ////var te = this.values;
            //var te = new Float32Array(16);
            //var me = this.values;
            //
            //var n11 = me[ 0 ], n12 = me[ 4 ], n13 = me[ 8 ], n14 = me[ 12 ];
            //var n21 = me[ 1 ], n22 = me[ 5 ], n23 = me[ 9 ], n24 = me[ 13 ];
            //var n31 = me[ 2 ], n32 = me[ 6 ], n33 = me[ 10 ], n34 = me[ 14 ];
            //var n41 = me[ 3 ], n42 = me[ 7 ], n43 = me[ 11 ], n44 = me[ 15 ];
            //
            //te[ 0 ] = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44;
            //te[ 4 ] = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44;
            //te[ 8 ] = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44;
            //te[ 12 ] = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;
            //te[ 1 ] = n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44;
            //te[ 5 ] = n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44;
            //te[ 9 ] = n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44;
            //te[ 13 ] = n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34;
            //te[ 2 ] = n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44;
            //te[ 6 ] = n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44;
            //te[ 10 ] = n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44;
            //te[ 14 ] = n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34;
            //te[ 3 ] = n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43;
            //te[ 7 ] = n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43;
            //te[ 11 ] = n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43;
            //te[ 15 ] = n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33;
            //
            //var det = n11 * te[ 0 ] + n21 * te[ 4 ] + n31 * te[ 8 ] + n41 * te[ 12 ];
            //
            //if ( det === 0 ) {
            //
            //    var msg = "THREE.Matrix4.getInverse(): can't invert matrix, determinant is 0";
            //
            //    //if ( throwOnInvertible || false ) {
            //    //
            //    //    throw new Error( msg );
            //    //
            //    //} else {
            //
            //        console.warn( msg );
            //
            //    //}
            //
            //        this.setIdentity();
            //
            //    return this;
            //
            //}
            //
            //
            //var d = this.values;
            //
            ////this.multiplyScalar( 1 / det );
            //det = 1 / det;
            //for (var i = 0; i < 16; i++) {
            //    d[i] = d[i] * det;
            //}
            //
            //return this;
        }

        public invertTo3x3():Matrix3 {
        var a11, a21, a31, a12, a22, a32, a13, a23, a33,
            m, r, det, idet;
            var mat3 = Matrix3.create();

        m = this.values;

        r = mat3.values;

        a11 =  m[10] * m[5] - m[6] * m[9];
        a21 = -m[10] * m[1] + m[2] * m[9];
        a31 =  m[6]  * m[1] - m[2] * m[5];
        a12 = -m[10] * m[4] + m[6] * m[8];
        a22 =  m[10] * m[0] - m[2] * m[8];
        a32 = -m[6]  * m[0] + m[2] * m[4];
        a13 =  m[9]  * m[4] - m[5] * m[8];
        a23 = -m[9]  * m[0] + m[1] * m[8];
        a33 =  m[5]  * m[0] - m[1] * m[4];

        det =  m[0] * a11 + m[1] * a12 + m[2] * a13;
        if (det === 0) { // no inverse
                Log.warn("can't invert matrix, determinant is 0");

            return mat3;
        }

        idet = 1 / det;

        r[0] = idet * a11;
        r[1] = idet * a21;
        r[2] = idet * a31;
        r[3] = idet * a12;
        r[4] = idet * a22;
        r[5] = idet * a32;
        r[6] = idet * a13;
        r[7] = idet * a23;
        r[8] = idet * a33;

        return mat3;
    }

        /**
         * Transpose the matrix.
         * @return this
         */
        public transpose ():Matrix4 {
            //var e, t;

            //e = this.values;

            //t = e[ 1];  e[ 1] = e[ 4];  e[ 4] = t;
            //t = e[ 2];  e[ 2] = e[ 8];  e[ 8] = t;
            //t = e[ 3];  e[ 3] = e[12];  e[12] = t;
            //t = e[ 6];  e[ 6] = e[ 9];  e[ 9] = t;
            //t = e[ 7];  e[ 7] = e[13];  e[13] = t;
            //t = e[11];  e[11] = e[14];  e[14] = t;

            var te = this.values;
            var tmp;

            tmp = te[ 1 ]; te[ 1 ] = te[ 4 ]; te[ 4 ] = tmp;
            tmp = te[ 2 ]; te[ 2 ] = te[ 8 ]; te[ 8 ] = tmp;
            tmp = te[ 6 ]; te[ 6 ] = te[ 9 ]; te[ 9 ] = tmp;

            tmp = te[ 3 ]; te[ 3 ] = te[ 12 ]; te[ 12 ] = tmp;
            tmp = te[ 7 ]; te[ 7 ] = te[ 13 ]; te[ 13 ] = tmp;
            tmp = te[ 11 ]; te[ 11 ] = te[ 14 ]; te[ 14 ] = tmp;

            return this;
        }

        /**
         * Set the matrix for translation.
         * @param x The X value of a translation.
         * @param y The Y value of a translation.
         * @param z The Z value of a translation.
         * @return this
         */
        public setTranslate (x, y, z): Matrix4 {
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
        public translate (x, y, z): Matrix4 {
            this.applyMatrix(Matrix4.create().setTranslate(x, y, z));

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
        public setRotate (angle: number, x: number, y: number, z:number): Matrix4 {
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
        public rotate (angle, vector3:Vector3): Matrix4;
        public rotate (angle, x, y, z): Matrix4;

        public rotate (args): Matrix4 {
            var angle = arguments[0];

            if(arguments.length === 2){
                let vector3 = arguments[1];

                this.applyMatrix(Matrix4.create().setRotate(angle, vector3.values[0], vector3.values[1], vector3.values[2]));
            }
            else if(arguments.length === 4){
                let x = arguments[1],
                    y = arguments[2],
                    z = arguments[3];

                this.applyMatrix(Matrix4.create().setRotate(angle, x, y, z));
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
        public setScale (x, y, z):Matrix4 {
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
        public scale (x, y, z):Matrix4 {
            this.applyMatrix(Matrix4.create().setScale(x, y, z));

            return this;
        }

        public setLookAt (eye:Vector3, center:Vector3, up:Vector3):Matrix4;
        public setLookAt (eyeX:number, eyeY:number, eyeZ:number, centerX:number, centerY:number, centerZ:number, upX:number, upY:number, upZ:number):Matrix4;

        //public setLookAt (args):Matrix4 {
        //    var e, fx, fy, fz, rlf, sx, sy, sz, rls, ux, uy, uz,
        //        eye = null,
        //        center = null,
        //        up = null;
        //
        //    if(arguments.length === 3){
        //        eye = arguments[0];
        //        center = arguments[1];
        //        up = arguments[2]
        //    }
        //    else if(arguments.length === 9){
        //        eye = Vector3.create(arguments[0], arguments[1], arguments[2]);
        //        center = Vector3.create(arguments[3], arguments[4], arguments[5]);
        //        up = Vector3.create(arguments[6], arguments[7], arguments[8]);
        //    }
        //
        //    fx = center.x - eye.x;
        //    fy = center.y - eye.y;
        //    fz = center.z - eye.z;
        //
        //    // Normalize f.
        //    rlf = 1 / Math.sqrt(fx*fx + fy*fy + fz*fz);
        //    fx *= rlf;
        //    fy *= rlf;
        //    fz *= rlf;
        //
        //    // Calculate cross product of f and up.
        //    sx = fy * up.z - fz * up.y;
        //    sy = fz * up.x - fx * up.z;
        //    sz = fx * up.y - fy * up.x;
        //
        //    // Normalize s.
        //    rls = 1 / Math.sqrt(sx*sx + sy*sy + sz*sz);
        //    sx *= rls;
        //    sy *= rls;
        //    sz *= rls;
        //
        //    // Calculate cross product of s and f.
        //    ux = sy * fz - sz * fy;
        //    uy = sz * fx - sx * fz;
        //    uz = sx * fy - sy * fx;
        //
        //    // Set to this.
        //    e = this.values;
        //    e[0] = sx;
        //    e[1] = ux;
        //    e[2] = -fx;
        //    e[3] = 0;
        //
        //    e[4] = sy;
        //    e[5] = uy;
        //    e[6] = -fy;
        //    e[7] = 0;
        //
        //    e[8] = sz;
        //    e[9] = uz;
        //    e[10] = -fz;
        //    e[11] = 0;
        //
        //    //e[12] = 0;
        //    //e[13] = 0;
        //    //e[14] = 0;
        //    //e[15] = 1;
        //
        //    e[12] = -eye.x;
        //    e[13] = -eye.y;
        //    e[14] = -eye.z;
        //    e[15] = 1;
        //    //Translate.
        //    //this.translate(-eye.x, -eye.y, -eye.z);
        //    //this.values = this.multiply(Matrix4.create().setTranslate(-eye.x, -eye.y, -eye.z)).values;
        //
        //    return this;
        //}
        /**
         * @function
         * @name pc.Mat4#setLookAt
         * @description Sets the specified matrix to a viewing matrix derived from an eye point, a target point
         * and an up vector. The matrix maps the target point to the negative z-axis and the eye point to the
         * origin, so that when you use a typical projection matrix, the center of the scene maps to the center
         * of the viewport. Similarly, the direction described by the up vector projected onto the viewing plane
         * is mapped to the positive y-axis so that it points upward in the viewport. The up vector must not be
         * parallel to the line of sight from the eye to the reference point.
         * @param {pc.Vec3} position 3-d vector holding view position.
         * @param {pc.Vec3} target 3-d vector holding reference point.
         * @param {pc.Vec3} up 3-d vector holding the up direction.
         * @returns {pc.Mat4} Self for chaining.
         * @example
         * var position = new pc.Vec3(10, 10, 10);
         * var target = new pc.Vec3(0, 0, 0);
         * var up = new pc.Vec3(0, 1, 0);
         * var m = new pc.Mat4().setLookAt(position, target, up);
         */
        public setLookAt(args) {
        var x, y, z,
            eye, center, up;

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
        x = Vector3.create();

            z = eye.copy().sub(center).normalize();

            y = up.copy().normalize();
            x.cross(y, z).normalize();
            y.cross(z, x);

            var r = this.values;

            r[0]  = x.x;
            r[1]  = x.y;
            r[2]  = x.z;
            r[3]  = 0;
            r[4]  = y.x;
            r[5]  = y.y;
            r[6]  = y.z;
            r[7]  = 0;
            r[8]  = z.x;
            r[9]  = z.y;
            r[10] = z.z;
            r[11] = 0;
            r[12] = eye.x;
            r[13] = eye.y;
            r[14] = eye.z;
            r[15] = 1;

            return this;
        }

        /**
         * Multiply the viewing matrix from the right.
         * @param eyeX, eyeY, eyeZ The position of the eye point.
         * @param centerX, centerY, centerZ The position of the reference point.
         * @param upX, upY, upZ The direction of the up vector.
         * @return this
         */
        public lookAt (eye:Vector3, center:Vector3, up:Vector3):Matrix4;
        public lookAt (eyeX:number, eyeY:number, eyeZ:number, centerX:number, centerY:number, centerZ:number, upX:number, upY:number, upZ:number):Matrix4;

        public lookAt (args):Matrix4 {
            var matrix = Matrix4.create();

            this.applyMatrix(matrix.setLookAt.apply(matrix, Array.prototype.slice.call(arguments, 0)));

            return this;
        }

        public setOrtho (left, right, bottom, top, near, far):Matrix4 {
            var e = this.values,
                rw,
                rh,
                rd;

            Log.error(left === right || bottom === top || near === far, Log.info.FUNC_MUST_NOT_BE("frustum", "null"));

            rw = 1 / (right - left);
            rh = 1 / (top - bottom);
            rd = 1 / (far - near);

            e[0]  = 2 * rw;
            e[1]  = 0;
            e[2]  = 0;
            e[3]  = 0;

            e[4]  = 0;
            e[5]  = 2 * rh;
            e[6]  = 0;
            e[7]  = 0;

            e[8]  = 0;
            e[9]  = 0;
            e[10] = -2 * rd;
            e[11] = 0;

            e[12] = -(right + left) * rw;
            e[13] = -(top + bottom) * rh;
            e[14] = -(far + near) * rd;
            e[15] = 1;

            return this;
        }

        public ortho (left, right, bottom, top, near, far):Matrix4{
            this.applyMatrix(Matrix4.create().setOrtho(left, right, bottom, top, near, far));

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
        public setPerspective (fovy: number, aspect, near, far):Matrix4 {
            var e, rd, s, ct,
                log = Log,
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

        public perspective (fovy, aspect, near, far):Matrix4{
            this.applyMatrix(Matrix4.create().setPerspective(fovy, aspect, near, far));

            return this;
        }

        public applyMatrix (other:Matrix4):Matrix4{
            var a = this,
                b = other.copy();

            //this.values = MathUtils.multiply(a, b);
                //b*a，而不是a*b
                //这是因为在webgl中，向量是右乘的，
                //此处希望坐标向量先进行this.values的变换，然后进行other.values的变换，因此要b*a，从而在右乘向量时为b*a*vec
                this.values = b.multiply(a).values;

            return this;
        }

        public multiply(matrix2:Matrix4):Matrix4;
        public multiply(matrix1:Matrix4, matrix2:Matrix4):Matrix4;

        public multiply(args):Matrix4 {
            var mat1 = null,
                mat2 = null,
                result = null;

            result = this.values;

            if(arguments.length === 1){
                mat1 = this.values;
                mat2 = arguments[0].values;
            }
            else if(arguments.length === 2){
                mat1 = arguments[0].values;
                mat2 = arguments[1].values;

            }

            var a = mat1[0], b = mat1[1], c = mat1[2], d = mat1[3],
                e = mat1[4], f = mat1[5], g = mat1[6], h = mat1[7],
                i = mat1[8], j = mat1[9], k = mat1[10], l = mat1[11],
                m = mat1[12], n = mat1[13], o = mat1[14], p = mat1[15],
                A = mat2[0], B = mat2[1], C = mat2[2], D = mat2[3],
                E = mat2[4], F = mat2[5], G = mat2[6], H = mat2[7],
                I = mat2[8], J = mat2[9], K = mat2[10], L = mat2[11],
                M = mat2[12], N = mat2[13], O = mat2[14], P = mat2[15];

            result[0] = A * a + B * e + C * i + D * m;
            result[1] = A * b + B * f + C * j + D * n;
            result[2] = A * c + B * g + C * k + D * o;
            result[3] = A * d + B * h + C * l + D * p;
            result[4] = E * a + F * e + G * i + H * m;
            result[5] = E * b + F * f + G * j + H * n;
            result[6] = E * c + F * g + G * k + H * o;
            result[7] = E * d + F * h + G * l + H * p;
            result[8] = I * a + J * e + K * i + L * m;
            result[9] = I * b + J * f + K * j + L * n;
            result[10] = I * c + J * g + K * k + L * o;
            result[11] = I * d + J * h + K * l + L * p;
            result[12] = M * a + N * e + O * i + P * m;
            result[13] = M * b + N * f + O * j + P * n;
            result[14] = M * c + N * g + O * k + P * o;
            result[15] = M * d + N * h + O * l + P * p;

            return this;
        }

        public multiplyVector4(vector:Vector4):Vector4 {
            var mat1 = this.values,
                vec4 = vector.values;
            var result = [];

            result[0] = vec4[0] * mat1[0] + vec4[1] * mat1[4] + vec4[2] * mat1[8] + vec4[3] * mat1[12];
            result[1] = vec4[0] * mat1[1] + vec4[1] * mat1[5] + vec4[2] * mat1[9] + vec4[3] * mat1[13];
            result[2] = vec4[0] * mat1[2] + vec4[1] * mat1[6] + vec4[2] * mat1[10] + vec4[3] * mat1[14];
            result[3] = vec4[0] * mat1[3] + vec4[1] * mat1[7] + vec4[2] * mat1[11] + vec4[3] * mat1[15];

            return Vector4.create(result[0], result[1], result[2], result[3]);
        }

        public multiplyVector3(vector:Vector3):Vector3 {
            var mat1 = this.values,
                vec3 = vector.values;
            var result = [];

            result[0] = vec3[0] * mat1[0] + vec3[1] * mat1[4] + vec3[2] * mat1[8] + mat1[12];
            result[1] = vec3[0] * mat1[1] + vec3[1] * mat1[5] + vec3[2] * mat1[9] + mat1[13];
            result[2] = vec3[0] * mat1[2] + vec3[1] * mat1[6] + vec3[2] * mat1[10] + mat1[14];

            return Vector3.create(result[0], result[1], result[2]);
        }

        public copy(): Matrix4{
            var result = Matrix4.create(),
                i = 0,
                len = this.values.length;

            for(i = 0; i < len; i++){
                result.values[i] = this.values[i];
            }


            return result;
        }

        public getX(){
            return Vector3.create(this.values[0], this.values[1], this.values[2]);
        }

        public getY(){
            return Vector3.create(this.values[4], this.values[5], this.values[6]);
        }

        public getZ(){
            return Vector3.create(this.values[8], this.values[9], this.values[10]);
        }

        public getTranslation() {
            return Vector3.create(this.values[12], this.values[13], this.values[14]);
        }

        public getScale() {
            return Vector3.create(this.getX().length(), this.getY().length(), this.getZ().length());
        }

        public getEulerAngles() {
            var x, y, z, sx, sy, sz, m, halfPi;
            var scale = this.getScale();

            sx = scale.x;
            sy = scale.y;
            sz = scale.z;

            m = this.values;

            y = Math.asin(-m[2] / sx);
            halfPi = Math.PI * 0.5;

            if (y < halfPi) {
                if (y > -halfPi) {
                    x = Math.atan2(m[6] / sy, m[10] / sz);
                    z = Math.atan2(m[1] / sx, m[0] / sx);
                } else {
                    // Not a unique solution
                    z = 0;
                    x = -Math.atan2(m[4] / sy, m[5] / sy);
                }
            } else {
                // Not a unique solution
                z = 0;
                x = Math.atan2(m[4] / sy, m[5] / sy);
            }

            return Vector3.create(x, y, z).scale(RAD_TO_DEG);
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

            m = this.values;

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
