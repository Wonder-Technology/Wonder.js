module Engine3D {
    export class Position {
        public x:number = null;
        public y:number = null;
        public z:number = null;

        constructor(x:number, y:number, z:number) {
            this.x = x;
            this.y = y;
            this.z = z;
        }

        public static create(x:number, y:number, z:number) {
            var obj = new this(x, y, z);

            return obj;
        }
    }
}

