/// <reference path="../definitions.d.ts"/>
module dy{
    export class Vector3{
        public static up = Vector3.create(0, 1, 0);
        public static forward = Vector3.create(0, 0, 1);
        public static right = Vector3.create(1, 0, 0);

        public static create(x, y, z):Vector3 ;
        public static create():Vector3 ;
        public static create():Vector3 {
            var m = null;

            if(arguments.length === 0){
                m = new this();
            }
            else{
                m = new this(arguments[0], arguments[1], arguments[2]);
            }

            return m;
        }

        private _values: Float32Array;
        get values():Float32Array { return this._values; }
        set values(values: Float32Array) {
            this._values = values;
        }

        get x(){
            return this._values[0];
        }
        set x(x:number){
            this._values[0] = x;
        }

        get y(){
            return this._values[1];
        }
        set y(y:number){
            this._values[1] = y;
        }

        get z(){
            return this._values[2];
        }
        set z(z:number){
            this._values[2] = z;
        }

        constructor(x, y, z);
        constructor();
        constructor(){
            this._values = new Float32Array(3);

            if(arguments.length > 0){
                this._values[0] = arguments[0];
                this._values[1] = arguments[1];
                this._values[2] =arguments[2];
            }
        }

        public normalize(): Vector3{
            var v = this._values;
            var d = Math.sqrt(
                v[0] * v[0] + v[1] * v[1] + v[2] * v[2]
            );

            if(d === 0){
                return this;
            }

            v[0] = v[0] / d;
            v[1] = v[1] / d;
            v[2] = v[2] / d;

            return this;
        }

        public scale(scalar:number) {
            var v = this._values;

            v[0] *= scalar;
            v[1] *= scalar;
            v[2] *= scalar;

            return this;
        }

        public set(x:number, y:number, z:number){
            this.x = x;
            this.y = y;
            this.z = z;
        }

        public sub(v:Vector3):Vector3 {
            return Vector3.create(
                this._values[0] - v.values[0],
                this._values[1] - v.values[1],
                this._values[2] - v.values[2]
            )
        }

        public add(v:Vector3){
            return Vector3.create(
                this._values[0] + v.values[0],
                this._values[1] + v.values[1],
                this._values[2] + v.values[2]
            )
        }

        public reverse():Vector3{
            this._values[0] = -this._values[0];
            this._values[1] = -this._values[1];
            this._values[2] = -this._values[2];

            return this;
        }

        public copy(): Vector3{
            var result = Vector3.create(),
                i = 0,
                len = this._values.length;

            for(i = 0; i < len; i++){
                result.values[i] = this._values[i];
            }

            return result;
        }

        public toVec4(): Vector4{
            return Vector4.create(this._values[0], this._values[1], this._values[2], 1.0);
        }

        public length() {
            var v = this._values;

            return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
        }

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
        public cross(lhs, rhs) {
            var a, b, r, ax, ay, az, bx, by, bz;

            a = lhs.values;
            b = rhs.values;
            r = this._values;

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
        }
    }
}
