/// <reference path="../definitions.d.ts"/>
module dy{
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

        get w(){
            return this._values[3];
        }
        set w(w:number){
            this._values[3] = w;
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

        public copy(){
            var result = Vector4.create(),
                i = 0,
                len = this._values.length;

            for(i = 0; i < len; i++){
                result.values[i] = this._values[i];
            }

            return result;
        }

        public toVec3(): Vector3{
            return Vector3.create(this._values[0], this._values[1], this._values[2]);
        }
    }
}
