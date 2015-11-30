module wd {
    export class Point {
        public x:number = null;
        public y:number = null;

        constructor(x:number = null, y:number = null) {
            this.x = x;
            this.y = y;
        }

        public static create(x:number = null, y:number = null) {
            var obj = new this(x, y);

            return obj;
        }
    }
}