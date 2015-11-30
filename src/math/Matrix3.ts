/// <reference path="../filePath.d.ts"/>
module wd {
    export class Matrix3 {
        public static create(mat:Float32Array):Matrix3;
        public static create():Matrix3;

        public static create(...args):Matrix3 {
            var m = null;

            if (args.length === 0) {
                m = new this();
            }
            else {
                m = new this(args[0]);
            }

            return m;
        }

        constructor(mat:Float32Array);
        constructor();

        constructor(...args) {
            if (args.length === 1) {
                this.values = args[0];
            }
            else {
                this.values = new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);
            }
        }

        public values:Float32Array = null;

        public setIdentity():Matrix3 {
            var e = this.values;

            e[0] = 1;
            e[3] = 0;
            e[6] = 0;
            e[1] = 0;
            e[4] = 1;
            e[7] = 0;
            e[2] = 0;
            e[5] = 0;
            e[8] = 1;

            return this;
        }

        public invert():Matrix3 {
            var me = this.values,
                te = new Float32Array(16),
                d = this.values;

            te[0] = me[10] * me[5] - me[6] * me[9];
            te[1] = -me[10] * me[1] + me[2] * me[9];
            te[2] = me[6] * me[1] - me[2] * me[5];
            te[3] = -me[10] * me[4] + me[6] * me[8];
            te[4] = me[10] * me[0] - me[2] * me[8];
            te[5] = -me[6] * me[0] + me[2] * me[4];
            te[6] = me[9] * me[4] - me[5] * me[8];
            te[7] = -me[9] * me[0] + me[1] * me[8];
            te[8] = me[5] * me[0] - me[1] * me[4];

            var det = me[0] * te[0] + me[1] * te[3] + me[2] * te[6];

            if (det === 0) {
                Log.warn("can't invert matrix, determinant is 0");

                this.setIdentity();

                return this;

            }

            det = 1 / det;
            for (let i = 0; i < 9; i++) {
                d[i] = te[i] * det;
            }

            return ;
        }

        public multiplyScalar(s:number) {
            var te = this.values;

            te[0] *= s;
            te[3] *= s;
            te[6] *= s;
            te[1] *= s;
            te[4] *= s;
            te[7] *= s;
            te[2] *= s;
            te[5] *= s;
            te[8] *= s;

            return this;
        }

        public multiplyVector3( vector ) {
            var x = vector.x,
                y = vector.y,
                z = vector.z,
                result = Vector3.create(),
                e = this.values;

            result.x = e[ 0 ] * x + e[ 3 ] * y + e[ 6 ] * z;
            result.y = e[ 1 ] * x + e[ 4 ] * y + e[ 7 ] * z;
            result.z = e[ 2 ] * x + e[ 5 ] * y + e[ 8 ] * z;

            return result;
        }

        public transpose():Matrix3 {
            var tmp, m = this.values;

            tmp = m[1];
            m[1] = m[3];
            m[3] = tmp;
            tmp = m[2];
            m[2] = m[6];
            m[6] = tmp;
            tmp = m[5];
            m[5] = m[7];
            m[7] = tmp;

            return this;
        }

        public copy() {
            var me = this.values;

            return Matrix3.create().set(
                me[ 0 ], me[ 3 ], me[ 6 ],
                me[ 1 ], me[ 4 ], me[ 7 ],
                me[ 2 ], me[ 5 ], me[ 8 ]
            );
        }

        public set( n11, n12, n13, n21, n22, n23, n31, n32, n33 ) {
            var te = this.values;

            te[ 0 ] = n11; te[ 3 ] = n12; te[ 6 ] = n13;
            te[ 1 ] = n21; te[ 4 ] = n22; te[ 7 ] = n23;
            te[ 2 ] = n31; te[ 5 ] = n32; te[ 8 ] = n33;

            return this;
        }
    }
}
