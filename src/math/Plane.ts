/// <reference path="../filePath.d.ts"/>
module wd {
    export class Plane{
        public static create(a: number, b: number, c: number, d: number) {
        	var obj = new this(a, b, c, d);

        	return obj;
        }

        constructor(a: number, b: number, c: number, d: number){
            this.normal = Vector3.create(a, b, c);
            this.d = d;
        }

        public normal:Vector3 = Vector3.create(0, 1, 0);
        public d:number = 0;

        public getReflectionMatrix():Matrix4 {
            this.normalize();
            var x = this.normal.x;
            var y = this.normal.y;
            var z = this.normal.z;
            var temp = -2 * x;
            var temp2 = -2 * y;
            var temp3 = -2 * z;
            var result = Matrix4.create();

            result.values[0] = (temp * x) + 1;
            result.values[1] = temp2 * x;
            result.values[2] = temp3 * x;
            result.values[3] = 0.0;
            result.values[4] = temp * y;
            result.values[5] = (temp2 * y) + 1;
            result.values[6] = temp3 * y;
            result.values[7] = 0.0;
            result.values[8] = temp * z;
            result.values[9] = temp2 * z;
            result.values[10] = (temp3 * z) + 1;
            result.values[11] = 0.0;
            result.values[12] = temp * this.d;
            result.values[13] = temp2 * this.d;
            result.values[14] = temp3 * this.d;
            result.values[15] = 1.0;

            return result;
        }

        public normalize():Plane {
            var norm = (Math.sqrt((this.normal.x * this.normal.x) + (this.normal.y * this.normal.y) + (this.normal.z * this.normal.z)));
            var magnitude = 0;

            if (norm !== 0) {
                magnitude = 1.0 / norm;
            }

            this.normal.x *= magnitude;
            this.normal.y *= magnitude;
            this.normal.z *= magnitude;

            this.d *= magnitude;

            return this;
        }

        public copy(): Plane {
            return Plane.create(this.normal.x, this.normal.y, this.normal.z, this.d);
        }
    }
}
