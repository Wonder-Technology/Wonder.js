/// <reference path="../definitions.d.ts"/>
module dy{
    export class Translate extends Action{
        public static create(matrix, posData):Translate {
            var obj = new this(matrix, posData);

            return obj;
        }

        private _x:number = 0;
        private _y:number = 0;
        private _z:number = 0;

        constructor(matrix:Matrix, posData:{x:number;y:number;z:number}){
            super(matrix);

            this._x = posData.x;
            this._y = posData.y;
            this._z = posData.z;
        }

        public update(){
            this.matrix.translate(this._x, this._y, this._z);
            this.finish();
        }
    }
}