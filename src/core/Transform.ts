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
            return this._matrix.setTRS(this._position, this._rotation, this._scale);
        }
        set matrix(matrix:Matrix){
            this._matrix = matrix;
        }

        private _position:Vector3 = Vector3.create(0, 0, 0);
        get position(){
            return this._position;
        }
        set position(position:Vector3){
            this._position = position;
        }

        private _rotation:Quaternion = Quaternion.create(0, 0, 0, 1);
        get rotation(){
            return this._rotation;
        }

        private _scale:Vector3 = Vector3.create(1, 1, 1);

        /**
         * the up axis in local space
         * @returns {Vector3}
         */
        get up(){
            return this._matrix.getY().normalize();
        }

        get right(){
            return this._matrix.getX().normalize();
        }

        get forward(){
            //todo scale(-1)?
            return this._matrix.getZ().normalize();
            //return this._matrix.getZ().normalize().scale(-1);
        }

        public translateLocal(translation:Vector3, relativeTo:Space = Space.SELF) {
            if(relativeTo === Space.SELF){
                this._position = this._position.add(this._rotation.multiplyVector3(translation));
            }
            else if(relativeTo === Space.WORLD){
                this._position = this._position.add(translation);
            }
        }

        public rotateLocal(eulerAngles:Vector3, relativeTo:Space = Space.SELF) {
            if(relativeTo === Space.SELF){
                var quaternion = Quaternion.create();

                quaternion.setFromEulerAngles(eulerAngles.x, eulerAngles.y, eulerAngles.z);

                this._rotation = this._rotation.multiply(quaternion);
            }
            else if(relativeTo === Space.WORLD){
                var quaternion = Quaternion.create();

                quaternion.setFromEulerAngles(eulerAngles.x, eulerAngles.y, eulerAngles.z);

                var rotation = Quaternion.create(0, 0, 0, 1);

                quaternion = rotation.invert().multiply(quaternion);
                this._rotation = quaternion.multiply(this._rotation);
            }
            else{
                dyCb.Log.error(true, dyCb.Log.info.FUNC_UNEXPECT("relativeTo param"));
            }
        }

        public rotateAround(angle:number, center:Vector3, axis:Vector3){
            var pos: Vector3 = this._position;
            var rot: Quaternion = Quaternion.create().setFromAxisAngle(angle, axis);
            var dir: Vector3 = pos.sub(center); // find current direction relative to center
            dir = rot.multiplyVector3(dir); // rotate the direction
            this._position = center.add(dir); // define new position
            this._rotation = this._rotation.multiply(rot);
        }

        public setScale(num:Vector3);
        public setScale(x:number, y:number, z:number);

        public setScale(args){
            if(arguments.length === 1){
                let num = arguments[0];

                this._scale.set(num.x, num.y, num.z);
            }
            else{
                let x = arguments[0],
                    y = arguments[1],
                    z = arguments[2];

                this._scale.set(x, y, z);
            }
        }

        public setRotate(quat:Quaternion);
        public setRotate(x:number, y:number, z:number, w:number);

        public setRotate(args){
            if(arguments.length === 1){
                let quat = arguments[0];

                this._rotation.set(quat.x ,quat.y, quat.z, quat.w);
            }
            else{
                let x = arguments[0],
                    y = arguments[1],
                    z = arguments[2],
                    w = arguments[3];

                this._rotation.set(x, y, z, w);
            }
        }

        public setPosition(pos:Vector3);
        public setPosition(x:number, y:number, z:number);

        public setPosition(args){
            if(arguments.length === 1){
                let pos = arguments[0];

                this._position.set(pos.x, pos.y, pos.z);
            }
            else{
                let x = arguments[0],
                    y = arguments[1],
                    z = arguments[2];

                this._position.set(x, y, z);
            }
        }

        public setLocalEulerAngles(eulerAngles:Vector3);
        public setLocalEulerAngles(ex:number, ey:number, ez:number);

        public setLocalEulerAngles(args) {
            var ex = null,
                ey = null,
                ez = null;

            if(arguments.length === 1){
                ex = arguments[0].x;
                ey = arguments[0].y;
                ez = arguments[0].z;
            }
            else if(arguments.length == 3){
                ex = arguments[0];
                ey = arguments[1];
                ez = arguments[2];
            }

            this._rotation.setFromEulerAngles(ex, ey, ez);
            //this.dirtyLocal = true;
        }

        public lookAt(target:Vector3);
        public lookAt(target:Vector3, up:Vector3);

        public lookAt(args){
            var target = arguments[0],
                up = null;

            if(arguments.length === 1){
                up = Vector3.up;
            }
            else if(arguments.length === 2){
                up = arguments[1];
            }

            //todo why reverse? not reverse in playCanvas!?
            target.reverse();

            this._rotation.setFromMat4(Matrix.create().setLookAt(this.position, target, up));
        }
    }
}
