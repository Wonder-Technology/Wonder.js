/// <reference path="../definitions.d.ts"/>
module dy{
    export class Vector4{
        public static create(x, y, z, w);
        public static create();
        public static create(){
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
            this.values = new Float32Array(4);

            if(arguments.length > 0){
                this.values[0] = arguments[0];
                this.values[1] = arguments[1];
                this.values[2] =arguments[2];
                this.values[3] =arguments[3];
            }
        }

        get x(){
            return this.values[0];
        }
        set x(x:number){
            this.values[0] = x;
        }

        get y(){
            return this.values[1];
        }
        set y(y:number){
            this.values[1] = y;
        }

        get z(){
            return this.values[2];
        }
        set z(z:number){
            this.values[2] = z;
        }

        get w(){
            return this.values[3];
        }
        set w(w:number){
            this.values[3] = w;
        }

        public values: Float32Array;

        public normalize(): Vector4{
            var v = this.values;
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

        public copy():Vector4{
            return this.copyHelper(Vector4.create());
        }

        public toVector3(): Vector3{
            return Vector3.create(this.values[0], this.values[1], this.values[2]);
        }


        //todo refactor
        public multiplyScalar(scalar:number) {
            this.x *= scalar;
            this.y *= scalar;
            this.z *= scalar;
            this.w *= scalar;

            return this;
        }

        public dot(v:Vector4) {
            return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
        }

        public set(x:number, y:number, z:number, w:number){
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;
        }

        protected copyHelper(vector4:Vector4):any{
            var result = vector4,
                i = 0,
                len = this.values.length;

            for(i = 0; i < len; i++){
                result.values[i] = this.values[i];
            }

            return result;
        }
    }
}
