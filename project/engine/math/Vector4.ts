/// <reference path="../definitions.d.ts"/>
module Engine3D{
    export class Vector4{
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

            return m;
        }

        private _values: Float32Array;
        get values():Float32Array { return this._values; }
        set values(values: Float32Array) {
            this._values = values;
        }

        constructor(x, y, z, w);
        constructor();
        constructor(){
            this._values = new Float32Array(4);

            if(arguments.length > 0){
                this._values[0] = arguments[0];
                this._values[1] = arguments[1];
                this._values[2] =arguments[2];
                this._values[3] =arguments[3];
            }
        }

        public normalize(): Vector4{
            var v = this._values;
            var d = Math.sqrt(
                v[0] * v[0] + v[1] * v[1] + v[2] * v[2] + v[3] * v[3]
            );

            if(d === 0){
                return Vector4.create(0, 0, 0, 0);
            }

            v[0] = v[0] / d;
            v[1] = v[1] / d;
            v[2] = v[2] / d;
            v[3] = v[3] / d;

            return this;
        }

        public toVec3(): Vector3{
            return Vector3.create(this._values[0], this._values[1], this._values[2]);
        }
    }
}
