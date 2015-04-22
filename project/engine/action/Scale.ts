/// <reference path="Action.ts"/>
/// <reference path="../math/Matrix.ts"/>
module Engine3D{
    export class Scale extends Action{
        public static create(matrix, data):Scale {
            var obj = new this(matrix, data);

            return obj;
        }

        private _x:number = 0;
        private _y:number = 0;
        private _z:number = 0;

        constructor(matrix:Matrix, data:{x:number;y:number;z:number}){
            super(matrix);

            this._x = data.x;
            this._y = data.y;
            this._z = data.z;
        }

        public update(){
            this.matrix.scale(this._x, this._y, this._z);
            this.finish();
        }
    }
}

