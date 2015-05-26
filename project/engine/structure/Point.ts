module Engine3D {
    export class Point {
        public x:number = null;
        public y:number = null;

        constructor(x:number, y:number) {
            this.x = x;
            this.y = y;
        }

        public static create(x:number, y:number) {
            var obj = new this(x, y);

            return obj;
        }
    }
}