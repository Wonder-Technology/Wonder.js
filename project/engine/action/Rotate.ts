/// <reference path="Action.ts"/>
/// <reference path="../math/Matrix.ts"/>
/// <reference path="../math/Vector3.ts"/>
/// <reference path="../Log.ts"/>
module Engine3D{
    export class Rotate extends Action{
        public static create(matrix, actionData):Rotate {
            var obj = new this(matrix, actionData);

            return obj;
        }

        private _speed:number = null;
        private _axis:Vector3 = null;
        private _point:Vector3 = null;
        private _angle:number = 0;

        constructor(matrix:Matrix, axisData:{speed:number;axis:Vector3[]}){
            super(matrix);

            this._speed = axisData.speed;
            if(axisData.axis.length === 2){
                this._axis = axisData.axis[1].sub(axisData.axis[0]);
                this._point = axisData.axis[0];
            }
            else if(axisData.axis.length === 1 ){
                this._axis = axisData.axis[0];
                this._point = Vector3.create(0, 0, 0);
            }
            else{
                Log.error(true, "axis's length should be 1 or 2");
            }
        }

        public update(){
            var movePoint = null,
                backPoint = null;

            this._angle = this._speed;

            if(this._isNotRotateAroundOriginPoint()){
                movePoint = this._point.copy().reverse().values;
                backPoint = this._point.values;

                this.matrix.translate(movePoint[0], movePoint[1], movePoint[2]);
                this.matrix.rotate(this._angle, this._axis.values[0], this._axis.values[1], this._axis.values[2]);
                this.matrix.translate(backPoint[0], backPoint[1], backPoint[2]);
            }
            else{
                this.matrix.rotate(this._angle, this._axis.values[0], this._axis.values[1], this._axis.values[2]);
            }
        }

        private _isNotRotateAroundOriginPoint(){
            return this._point.values[0] !== 0
                || this._point.values[1] !== 0
                || this._point.values[2] !== 0;
        }
    }
}