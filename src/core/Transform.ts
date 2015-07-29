/// <reference path="../definitions.d.ts"/>
module dy{
    //todo add parent attri(http://docs.unity3d.com/ScriptReference/Transform-parent.html)

    //todo refer to http://docs.unity3d.com/ScriptReference/Transform.html, playCanvas->src/scene/scene_graphnode.js

    export enum Space{
        SELF,
        WORLD
    }

    export class Transform{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        //todo localMatrix, worldMatrix
        private _matrix:Matrix = Matrix.create();
        get matrix(){
            return this._matrix;
        }
        set matrix(matrix:Matrix){
            this._matrix = matrix;
        }

        //position in world space
        private _position:Vector3 = Vector3.create(0, 0, 0);
        get position(){
            return this._matrix.multiplyVector4(this._position.toVec4()).toVec3();
        }
        set position(position:Vector3){
            this._position = position;
        }

        /**
         * the up axis in local space
         * @returns {Vector3}
         */
        get up(){
            return this._matrix.getY();
        }

        get right(){
            return this._matrix.getX();
        }

        get forward(){
            return this._matrix.getZ();
        }

        public translate(translation:Vector3) {
            this._matrix.translate(translation.values[0], translation.values[1], translation.values[2]);
        }

        public rotateLocal(eulerAngles:Vector3, relativeTo:Space = Space.SELF) {
            if(relativeTo === Space.SELF){
                this.rotateAround(eulerAngles, this.position, [this.right, this.up, this.forward]);
            }
            else if(relativeTo === Space.WORLD){
                this.rotateAround(eulerAngles, this.position, [Vector3.right, Vector3.up, Vector3.forward]);
            }
            else{
                dyCb.Log.error(true, dyCb.Log.info.FUNC_UNEXPECT("relativeTo param"));
            }
        }

        public rotateWorld(eulerAngles:Vector3) {
            this.rotateAround(eulerAngles, Vector3.create(0, 0, 0), [this.right, this.up, this.forward]);
        }

        public rotateAround(angle:number, point:Vector3, axis:Vector3):void;
        public rotateAround(eulerAngles:Vector3, point:Vector3, axisArr:Array<Vector3>):void;

        public rotateAround(args){
            var point = arguments[1],
                movePoint = point.copy().reverse().values,
                backPoint = point.values;

            if(JudgeUtils.isNumber(arguments[0]) && arguments[2] instanceof Vector3){
                let angle = arguments[0],
                    axis = arguments[2];

                this._matrix.translate(movePoint[0], movePoint[1], movePoint[2]);
                this._matrix.rotate(angle, axis);
                this._matrix.translate(backPoint[0], backPoint[1], backPoint[2]);
            }
            else{
                let eulerAngles = arguments[0],
                    axisArr = arguments[2],
                    right = axisArr[0],
                    up = axisArr[1],
                    forward = axisArr[2];

                this._matrix.translate(movePoint[0], movePoint[1], movePoint[2]);
                this._matrix.rotate(eulerAngles.values[0], right);
                this._matrix.rotate(eulerAngles.values[1], up);
                this._matrix.rotate(eulerAngles.values[2], forward);
                this._matrix.translate(backPoint[0], backPoint[1], backPoint[2]);
            }
        }

        public scale(num:Vector3) {
            this._matrix.scale(num.values[0], num.values[1], num.values[2]);
        }
    }
}
