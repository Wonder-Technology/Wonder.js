/// <reference path="../filePath.d.ts"/>
module wd{
    export class ThreeDTransform extends Transform{
        public static create(gameObject:GameObject) {
            var obj = new this(gameObject);

            return obj;
        }

        private _localToParentMatrix:Matrix4 = Matrix4.create();
        //todo remove?
        get localToParentMatrix(){
            if (this.dirtyLocal) {
                this._localToParentMatrix.setTRS(this._localPosition, this._localRotation, this._localScale);

                this.dirtyLocal = false;
                this.dirtyWorld = true;
            }
            return this._localToParentMatrix;
        }

        private _localToWorldMatrix:Matrix4 = null;
        get localToWorldMatrix(){
            var syncList = wdCb.Collection.create<ThreeDTransform>(),
                current = this.p_parent;

            syncList.addChild(this);

            while (current !== null) {
                syncList.addChild(current);
                current = <ThreeDTransform>(current.parent);
            }

            syncList.reverse().forEach((transform:ThreeDTransform) => {
                transform.sync();
            });

            return this._localToWorldMatrix;
        }
        set localToWorldMatrix(localToWorldMatrix:Matrix4){
            this._localToWorldMatrix = localToWorldMatrix;
        }

        private _position:Vector3 = Vector3.create();
        get position(){
            this._position = this.localToWorldMatrix.getTranslation();

            return this._position;
        }
        set position(position:Vector3){
            if (this.p_parent === null) {
                this._localPosition = position.copy();
            }
            else {
                this._localPosition = this.p_parent.localToWorldMatrix.copy().invert().multiplyPoint(position);
            }

            this.isTranslate = true;
        }

        private _rotation:Quaternion = Quaternion.create(0, 0, 0, 1);
        get rotation(){
            this._rotation.setFromMatrix(this.localToWorldMatrix);

            return this._rotation;
        }
        set rotation(rotation:Quaternion){
            if (this.p_parent === null) {
                this._localRotation = rotation.copy();
            }
            else {
                this._localRotation = this.p_parent.rotation.copy().invert().multiply(rotation);
            }

            this.isRotate = true;
        }

        private _scale:Vector3 = Vector3.create(1, 1, 1);
        get scale(){
            this._scale = this.localToWorldMatrix.getScale();

            return this._scale;
        }
        set scale(scale:Vector3){
            if (this.p_parent === null) {
                this._localScale = scale.copy();
            }
            else {
                this._localScale = this.p_parent.localToWorldMatrix.copy().invert().multiplyVector3(scale);
                //this._localScale = this.p_parent.localToWorldMatrix.copy().invert().multiplyPoint(scale);
            }

            this.isScale = true;
        }

        private _eulerAngles:Vector3 = null;
        get eulerAngles(){
            this._eulerAngles = this.localToWorldMatrix.getEulerAngles();
            return this._eulerAngles;
        }
        set eulerAngles(eulerAngles:Vector3){
            this._localRotation.setFromEulerAngles(eulerAngles);

            if (this.p_parent !== null) {
                this._localRotation = this.p_parent.rotation.copy().invert().multiply(this._localRotation);
            }

            this.isRotate = true;
        }

        private _localPosition:Vector3 = Vector3.create(0, 0, 0);
        get localPosition(){
            return this._localPosition;
        }
        set localPosition(position:Vector3){
            this._localPosition = position.copy();

            this.isTranslate = true;
        }

        private _localRotation:Quaternion = Quaternion.create(0, 0, 0, 1);
        get localRotation(){
            return this._localRotation;
        }
        set localRotation(rotation:Quaternion){
            this._localRotation = rotation.copy();

            this.isRotate = true;
        }

        private _localEulerAngles:Vector3 = null;
        get localEulerAngles(){
            this._localEulerAngles = this._localRotation.getEulerAngles();
            return this._localEulerAngles;
        }
        set localEulerAngles(localEulerAngles:Vector3){
            this._localRotation.setFromEulerAngles(localEulerAngles);

            this.isRotate = true;
        }

        private _localScale:Vector3 = Vector3.create(1, 1, 1);
        get localScale(){
            return this._localScale;
        }
        set localScale(scale:Vector3){
            this._localScale = scale.copy();

            this.isScale = true;
        }

        get up(){
            return this.localToWorldMatrix.getY().normalize();
        }

        get right(){
            return this.localToWorldMatrix.getX().normalize();
        }

        get forward(){
            //todo why scale(-1)?
            //return this.localToWorldMatrix.getZ().normalize();
            return this.localToWorldMatrix.getZ().normalize().scale(-1);
        }

        public dirtyWorld:boolean = null;

        protected p_parent:ThreeDTransform;
        protected children:wdCb.Collection<ThreeDTransform>;

        private _gameObject:GameObject = null;


        constructor(gameObject:GameObject){
            super();

            this._gameObject = gameObject;
        }

        public sync(){
            if (this.dirtyLocal) {
                this._localToParentMatrix.setTRS(this._localPosition, this._localRotation, this._localScale);

                this.dirtyLocal = false;
                this.dirtyWorld = true;
            }

            if (this.dirtyWorld) {
                if (this.p_parent === null) {
                    this._localToWorldMatrix = this._localToParentMatrix.copy();
                }
                else {
                    this._localToWorldMatrix = this.p_parent.localToWorldMatrix.copy().multiply(this._localToParentMatrix);
                }

                this.dirtyWorld = false;

                this.children.forEach((child:ThreeDTransform) => {
                    child.dirtyWorld = true;
                });
            }
        }

        public translateLocal(translation:Vector3);
        public translateLocal(x:number, y:number, z:number);


        public translateLocal(...args) {
            var translation = null;

            if(args.length === 3){
                translation = Vector3.create(args[0], args[1], args[2]);
            }
            else{
                translation = args[0];
            }

            this._localPosition = this._localPosition.add(this._localRotation.multiplyVector3(translation));

            this.isTranslate = true;

            return this;
        }

        public translate(translation:Vector3);
        public translate(x:number, y:number, z:number);

        public translate(...args){
            var translation = null;

            if(args.length === 3){
                translation = Vector3.create(args[0], args[1], args[2]);
            }
            else{
                translation = args[0];
            }

            this.position = translation.add(this.position);

            return this;
        }

        public rotate(eulerAngles:Vector3);
        public rotate(x:number, y:number, z:number);

        public rotate(...args){
            var eulerAngles = null,
                quaternion = Quaternion.create();

            if(args.length === 3){
                eulerAngles = Vector3.create(args[0], args[1], args[2]);
            }
            else{
                eulerAngles = args[0];
            }

            quaternion.setFromEulerAngles(eulerAngles);

            if (this.p_parent === null) {
                this._localRotation = quaternion.multiply(this._localRotation);
            }
            else {
                //todo why?
                quaternion = this.p_parent.rotation.copy().invert().multiply(quaternion);
                this._localRotation = quaternion.multiply(this.rotation);
            }

            this.isRotate = true;

            return this;
        }

        public rotateLocal(eulerAngles:Vector3);
        public rotateLocal(x:number, y:number, z:number);

        public rotateLocal(...args){
            var eulerAngles = null,
                quaternion = Quaternion.create();

            if(args.length === 3){
                eulerAngles = Vector3.create(args[0], args[1], args[2]);
            }
            else{
                eulerAngles = args[0];
            }

            quaternion.setFromEulerAngles(eulerAngles);

            this._localRotation.multiply(quaternion);

            this.isRotate = true;

            return this;
        }

        public rotateAround(angle:number, center:Vector3, axis:Vector3);
        public rotateAround(angle:number, centerX:number, centerY:number, centerZ:number, axisX:number, axisY:number, axisZ:number);

        public rotateAround(...args){
            var angle = null,
                center = null,
                axis = null,
                rot:Quaternion = null,
                dir:Vector3 = null;

            if(args.length === 3){
                angle = args[0];
                center = args[1];
                axis = args[2];
            }
            else{
                angle = args[0];
                center = Vector3.create(args[1], args[2], args[3]);
                axis = Vector3.create(args[4], args[5], args[6]);
            }

            rot = Quaternion.create().setFromAxisAngle(angle, axis);
            dir = this.position.copy().sub(center); // find current direction relative to center

            dir = rot.multiplyVector3(dir); // rotate the direction

            this.position = center.add(dir); // define new position
            //todo why "this.rotation = this.rotation.multiply(rot)" will cause gameobject rotate direction around self?
            this.rotation = rot.multiply(this.rotation);

            return this;
        }

        public lookAt(target:Vector3);
        public lookAt(targetX:number, targetY:number, targetZ:number);
        public lookAt(target:Vector3, up:Vector3);
        public lookAt(targetX:number, targetY:number, targetZ:number, upX:number, upY:number, upZ:number);

        public lookAt(...args){
            var target = null,
                up = null;

            if(args.length === 1){
                target = args[0];
                up = Vector3.up;
            }
            else if(args.length === 2){
                target = args[0];
                up = args[1];
            }
            else if(args.length === 3){
                target = Vector3.create(args[0], args[1], args[2]);
                up = Vector3.up;
            }
            else{
                target = Vector3.create(args[0], args[1], args[2]);
                up = Vector3.create(args[3], args[4], args[5]);
            }

            this.rotation = Quaternion.create().setFromMatrix(Matrix4.create().setLookAt(this.position, target, up));

            return this;
        }
    }
}

