/// <reference path="../math/Matrix.ts"/>
module Engine3D{
    export class Translate{
        public static create(matrix, posData) {
            var obj = new this(matrix, posData);

            return obj;
        }

        constructor(matrix:Matrix, posData:{x;y;z}){
            this._matrix = matrix;
            this._x = posData.x;
            this._y = posData.y;
            this._z = posData.z;
        }

        private _isFinish:boolean = null;
        get isFinish(){
            return this._isFinish;
        }
        set isFinish(isFinish:boolean){
            this._isFinish = isFinish;
        }

        private _matrix:Matrix = null;
        private _x:number = 0;
        private _y:number = 0;
        private _z:number = 0;

        public update(){
            this._matrix.translate(this._x, this._y, this._z);
            this._finish();
        }

        private _finish(){
            this._isFinish = true;
        }
    }
}