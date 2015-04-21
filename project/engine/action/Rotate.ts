/// <reference path="../math/Matrix.ts"/>
module Engine3D{
    export class Rotate{
        public static create(matrix, actionData):Rotate {
            var obj = new this(matrix, actionData);

            return obj;
        }

        constructor(matrix:Matrix, axisData:{speed:number;axis:number[]}){
            this._matrix = matrix;
            this._speed = axisData.speed;
            this._axis = axisData.axis;
        }

        private _isFinish:boolean = false;
        get isFinish(){
            return this._isFinish;
        }
        set isFinish(isFinish:boolean){
            this._isFinish = isFinish;
        }

        private _matrix:Matrix = null;
        private _speed:number = null;
        private _axis:number[] = null;
        private _angle:number = 0;

        public update(){
            this._angle = this._angle + this._speed;
            this._matrix.setRotate(this._angle, this._axis[0], this._axis[1], this._axis[2]);

        }

        //private _finish(){
        //    this._isFinish = true;
        //}
    }
}