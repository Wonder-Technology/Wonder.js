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

        get a():number {
            return this.values[0];
        }
        set a(a:number){
            this.values[0] = a;
        }

        get c():number {
            return this.values[1];
        }
        set c(c:number){
            this.values[1] = c;
        }

        get b():number {
            return this.values[3];
        }
        set b(b:number){
            this.values[3] = b;
        }

        get d():number {
            return this.values[4];
        }
        set d(d:number){
            this.values[4] = d;
        }

        get tx():number {
            return this.values[6];
        }
        set tx(tx:number){
            this.values[6] = tx;
        }

        get ty():number {
            return this.values[7];
        }
        set ty(ty:number){
            this.values[7] = ty;
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
            var a1 = this.values[0];
            var b1 = this.values[1];
            var c1 = this.values[3];
            var d1 = this.values[4];
            var tx1 = this.values[6];
            var ty1 = this.values[7];
            var n = a1*d1-b1*c1;

            this.values[0] = d1/n;
            this.values[1] = -b1/n;
            this.values[3] = -c1/n;
            this.values[4] = a1/n;
            this.values[6] = (c1*ty1-d1*tx1)/n;
            this.values[7] = -(a1*ty1-b1*tx1)/n;

            return this;
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

        public multiplyVector2( vector:Vector2 ) {
            var x = vector.x,
                y = vector.y,
                result = Vector2.create(),
                e = this.values;

            result.x = e[ 0 ] * x + e[ 3 ] * y;
            result.y = e[ 1 ] * x + e[ 4 ] * y;

            return result;
        }

        public multiplyPoint( vector:Vector2 ) {
            var x = vector.x,
                y = vector.y,
                result = Vector2.create(),
                e = this.values;

            result.x = e[ 0 ] * x + e[ 3 ] * y + this.tx;
            result.y = e[ 1 ] * x + e[ 4 ] * y + this.ty;

            return result;
        }

        public multiply(matrix:Matrix3) {
            var m11 = this.a * matrix.a + this.c * matrix.b;
            var m12 = this.b * matrix.a + this.d * matrix.b;

            var m21 = this.a * matrix.c + this.c * matrix.d;
            var m22 = this.b * matrix.c + this.d * matrix.d;

            var dx = this.a * matrix.tx + this.c * matrix.ty + this.tx;
            var dy = this.b * matrix.tx + this.d * matrix.ty + this.ty;

            this.a = m11;
            this.b = m12;
            this.c = m21;
            this.d = m22;
            this.tx = dx;
            this.ty = dy;

            return this;
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

        public clone() {
            return Matrix3.create().set(this);
        }

        public set(matrix:Matrix3) {
            var te = this.values,
                values = matrix.values;

            te[ 0 ] = values[0]; te[ 3 ] = values[3]; te[ 6 ] = values[6];
            te[ 1 ] = values[1]; te[ 4 ] = values[4]; te[ 7 ] = values[7];
            te[ 2 ] = values[2]; te[ 5 ] = values[5]; te[ 8 ] = values[8];

            return this;
        }

        public setTS(t:Vector2, s:Vector2){
            this.setPosition(t.x, t.y);
            this.setScale(s.x, s.y);
        }

        public rotate(angle:number) {
            var rad = angle * DEG_TO_RAD;
            var c = Math.cos(rad);
            var s = Math.sin(rad);
            var m11 = this.a * c + this.c * s;
            var m12 = this.b * c + this.d * s;
            var m21 = this.a * -s + this.c * c;
            var m22 = this.b * -s + this.d * c;
            this.a = m11;
            this.b = m12;
            this.c = m21;
            this.d = m22;

            //var rad = angle * DEG_TO_RAD;
            //
            //var cos_a = Math.cos(rad);
            //var sin_a = Math.sin(rad);
            //
            //var values = this.values;
            //
            //
            //var m00 = values[0];
            //var m10 = values[1];
            //var m20 = values[2];
            //
            //var m01 = values[3];
            //var m11 = values[4];
            //var m21 = values[5];
            //
            //var m02 = values[6];
            //var m12 = values[7];
            //var m22 = values[8];
            //
            //values[0] = cos_a * m00 - sin_a * m10;
            //values[1] = sin_a * m00 + cos_a * m10;
            //
            //values[3] = cos_a * m01 - sin_a * m11;
            //values[4] = sin_a * m01 + cos_a * m11;
            //
            //values[6] = cos_a * m02 - sin_a * m12;
            //values[7] = sin_a * m02 + cos_a * m12;

            return this;
        }

        public setRotation(angle:number){
            var rad = angle * DEG_TO_RAD;

            var cos_a = Math.cos(rad);
            var sin_a = Math.sin(rad);
            var values = this.values;

            //values[0] = cos_a;
            //values[1] = sin_a;
            //
            //values[3] = -sin_a;
            //values[4] = cos_a;
            values[0] = cos_a;
            values[1] = -sin_a;

            values[3] = sin_a;
            values[4] = cos_a;

            return this;
        }

        public translate(x:number, y:number) {
            this.tx += this.a * x + this.c * y;
            this.ty += this.b * x + this.d * y;
        }

        public setPosition(x:number, y:number){
            this.tx = x;
            this.ty = y;
        }

        public scale(x:number, y:number) {
            this.a *= x;
            this.b *= x;
            this.c *= y;
            this.d *= y;

            //var values = this.values;
            //
            //values[0] *= x;
            //values[1] *= x;
            //values[2] *= x;
            //
            //values[3] *= y;
            //values[4] *= y;
            //values[5] *= y;

            return this;

        }

        public setScale(x:number, y:number){
            var values = this.values;

            values[0] = x;
            values[4] = y;

            return this;
        }

        public getTranslation(){
            return Vector2.create(this.tx, this.ty);
        }

        public getScale(){
            return Vector2.create(
                Math.sqrt(this.a * this.a + this.b * this.b),
                Math.sqrt(this.c * this.c + this.d * this.d)
            );
        }

        public getRotation(){
            return this._getSkewX();
        }

        public getSkew(){
            return Vector2.create(
                this._getSkewX(),
                this._getSkewY()
            );
        }

        private _getDeltaTransformPoint(matrix:Matrix3, point:{x:number, y:number})  {
            return {
                x: point.x * matrix.a + point.y * matrix.c + 0,
                y: point.x * matrix.b + point.y * matrix.d + 0
            };
        }

        private _getSkewX(){
            var px = this._getDeltaTransformPoint(this, {x: 0, y: 1});

            return ((180 / Math.PI) * Math.atan2(px.y, px.x) - 90);
        }

        private _getSkewY(){
            var py = this._getDeltaTransformPoint(this, { x: 1, y: 0 });

            return ((180 / Math.PI) * Math.atan2(py.y, py.x));
        }
    }
}

