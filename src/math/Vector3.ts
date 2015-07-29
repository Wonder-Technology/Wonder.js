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
            this._values[0] = y;
        }

        get z(){
            return this._values[2];
        }
        set z(z:number){
            this._values[0] = z;
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
                return Vector3.create(0, 0, 0);
            }

            v[0] = v[0] / d;
            v[1] = v[1] / d;
            v[2] = v[2] / d;

            return this;
        }

        public sub(v:Vector3):Vector3 {
            return Vector3.create(
                this._values[0] - v.values[0],
                this._values[1] - v.values[1],
                this._values[2] - v.values[2]
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
    }
}
