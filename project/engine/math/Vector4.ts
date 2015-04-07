/// <reference path="Vector3.ts"/>
module Engine3D.Math{
    export class Vector4{
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


        public toVec3(): Vector3{
            return Vector3.create(this._values[0], this._values[1], this._values[2]);
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
}
