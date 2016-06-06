module wd{
    export class ThreeDTransform extends Transform{
        public static create() {
            var obj = new this();

            return obj;
        }

        private _localToWorldMatrix:Matrix4 = null;
        @cacheGetter(function(){
            return this._localToWorldMatrixCache !== null;
        }, function(){
            return this._localToWorldMatrixCache;
        }, function(result){
            this._localToWorldMatrixCache = result;
        })
        get localToWorldMatrix(){
            return this.getMatrix("sync", "_localToWorldMatrix");
        }

        @cacheGetter(function(){
            return this._normalMatrixCache !== null;
        }, function(){
            return this._normalMatrixCache;
        }, function(result){
            this._normalMatrixCache = result;
        })
        get normalMatrix(){
            return this.localToWorldMatrix.invertTo3x3().transpose();
        }

        private _position:Vector3 = Vector3.create();
        @cloneAttributeAsCloneable()
        @cacheGetter(function(){
            return this._positionCache !== null;
        }, function(){
            return this._positionCache;
        }, function(result){
            this._positionCache = result;
        })
        get position(){
            this._position = this.localToWorldMatrix.getTranslation();

            return this._position;
        }
        set position(position:Vector3){
            if (this.p_parent === null) {
                this._localPosition = position;
            }
            else {
                this._localPosition = this.p_parent.localToWorldMatrix.clone().invert().multiplyPoint(position);
            }

            this.isTranslate = true;
        }

        private _rotation:Quaternion = Quaternion.create(0, 0, 0, 1);
        @cloneAttributeAsCloneable()
        @cacheGetter(function(){
            return this._rotationCache !== null;
        }, function(){
            return this._rotationCache;
        }, function(result){
            this._rotationCache = result;
        })
        get rotation(){
            this._rotation.setFromMatrix(this.localToWorldMatrix);

            return this._rotation;
        }
        set rotation(rotation:Quaternion){
            if (this.p_parent === null) {
                this._localRotation = rotation;
            }
            else {
                this._localRotation = this.p_parent.rotation.clone().invert().multiply(rotation);
            }

            this.isRotate = true;
        }

        private _scale:Vector3 = Vector3.create(1, 1, 1);
        @cloneAttributeAsCloneable()
        @cacheGetter(function(){
            return this._scaleCache !== null;
        }, function(){
            return this._scaleCache;
        }, function(result){
            this._scaleCache = result;
        })
        get scale(){
            this._scale = this.localToWorldMatrix.getScale();

            return this._scale;
        }
        set scale(scale:Vector3){
            if (this.p_parent === null) {
                this._localScale = scale;
            }
            else {
                this._localScale = this.p_parent.localToWorldMatrix.clone().invert().multiplyVector3(scale);
            }

            this.isScale = true;
        }

        private _eulerAngles:Vector3 = null;
        @cacheGetter(function(){
            return this._eulerAnglesCache !== null;
        }, function(){
            return this._eulerAnglesCache;
        }, function(result){
            this._eulerAnglesCache = result;
        })
        get eulerAngles(){
            this._eulerAngles = this.localToWorldMatrix.getEulerAngles();
            return this._eulerAngles;
        }
        set eulerAngles(eulerAngles:Vector3){
            this._localRotation.setFromEulerAngles(eulerAngles);

            if (this.p_parent !== null) {
                this._localRotation = this.p_parent.rotation.clone().invert().multiply(this._localRotation);
            }

            this.isRotate = true;
        }

        private _localPosition:Vector3 = Vector3.create(0, 0, 0);
        @cloneAttributeAsCloneable()
        get localPosition(){
            return this._localPosition;
        }
        set localPosition(position:Vector3){
            this._localPosition = position;

            this.isLocalTranslate = true;
        }

        private _localRotation:Quaternion = Quaternion.create(0, 0, 0, 1);
        @cloneAttributeAsCloneable()
        get localRotation(){
            return this._localRotation;
        }
        set localRotation(rotation:Quaternion){
            this._localRotation = rotation;

            this.isLocalRotate = true;
        }

        private _localEulerAngles:Vector3 = null;
        @cacheGetter(function(){
            return this._localEulerAnglesCache !== null;
        }, function(){
            return this._localEulerAnglesCache;
        }, function(result){
            this._localEulerAnglesCache = result;
        })
        get localEulerAngles(){
            this._localEulerAngles = this._localRotation.getEulerAngles();

            return this._localEulerAngles;
        }
        set localEulerAngles(localEulerAngles:Vector3){
            this._localRotation.setFromEulerAngles(localEulerAngles);

            this.isLocalRotate = true;
        }

        private _localScale:Vector3 = Vector3.create(1, 1, 1);
        @cloneAttributeAsCloneable()
        get localScale(){
            return this._localScale;
        }
        set localScale(scale:Vector3){
            this._localScale = scale;

            this.isLocalScale = true;
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

        private _localToParentMatrix:Matrix4 = Matrix4.create();
        private _localToWorldMatrixCache:Matrix4 = null;
        private _positionCache:Vector3 = null;
        private _rotationCache:Vector3 = null;
        private _scaleCache:Vector3 = null;
        private _eulerAnglesCache:Vector3 = null;
        private _localEulerAnglesCache:Vector3 = null;
        private _normalMatrixCache:Matrix3 = null;


        public sync(){
            if (this.dirtyLocal) {
                this._localToParentMatrix.setTRS(this._localPosition, this._localRotation, this._localScale);

                this.dirtyLocal = false;
                this.dirtyWorld = true;
            }

            if (this.dirtyWorld) {
                if (this.p_parent === null) {
                    this._localToWorldMatrix = this._localToParentMatrix.clone();
                }
                else {
                    this._localToWorldMatrix = this.p_parent.localToWorldMatrix.clone().multiply(this._localToParentMatrix);
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
                quaternion = this.p_parent.rotation.clone().invert().multiply(quaternion);
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
            // find current direction relative to center
            dir = this.position.clone().sub(center);

            // rotate the direction
            dir = rot.multiplyVector3(dir);

            // define new position
            this.position = center.add(dir);
            //todo why "this.rotation = this.rotation.multiply(rot)" will cause entityObject rotate direction around self?
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

        protected clearCache(){
            this._localToWorldMatrixCache = null;
            this._normalMatrixCache = null;
            this._positionCache = null;
            this._rotationCache = null;
            this._scaleCache = null;
            this._eulerAnglesCache = null;
            this._localEulerAnglesCache = null;
        }

        protected handleWhenSetTransformState(transformState:ETransformState):void{
            var eventName:string = null;

            switch (transformState){
                case ETransformState.ISTRANSLATE:
                    eventName = <any>EEngineEvent.TRANSFORM_TRANSLATE;
                    break;
                case ETransformState.ISROTATE:
                    eventName = <any>EEngineEvent.TRANSFORM_ROTATE;
                    break;
                case ETransformState.ISSCALE:
                    eventName = <any>EEngineEvent.TRANSFORM_SCALE;
                    break;
                default:
                    Log.error(true, Log.info.FUNC_UNKNOW(`transformState:${transformState}`));
                    break;
            }

            EventManager.trigger(this.entityObject, CustomEvent.create(eventName));
        }
    }
}

