/// <reference path="../definitions.d.ts"/>
module dy{
    //todo add parent attri(http://docs.unity3d.com/ScriptReference/Transform-parent.html)

    //todo refer to http://docs.unity3d.com/ScriptReference/Transform.html, playCanvas->src/scene/scene_graphnode.js

    export enum Space{
        SELF,
        WORLD
    }

    export class Transform extends Entity{
        public static create() {
            var obj = new this();

            return obj;
        }

        //todo localMatrix, worldMatrix
        //private _matrix:Matrix = Matrix.create();
        //get matrix(){
        //    return this._matrix.setTRS(this._position, this._rotation, this._scale);
        //}
        //set matrix(matrix:Matrix){
        //    this._matrix = matrix;
        //}

        //private _localTransform:Matrix = Matrix.create();
        //get localTransform(){
        //    return this._localTransform;
        //}
        
        private _localToWorldMatrix:Matrix = Matrix.create();
        get localToWorldMatrix(){
            //return this._localToWorldMatrix;
            this._localToWorldMatrix.setTRS(this._position, this._rotation, this._scale);

            return this._localToWorldMatrix;
        }
        set localToWorldMatrix(localToWorldMatrix:Matrix){
            this._localToWorldMatrix = localToWorldMatrix;
        }

        get worldToLocalMatrix(){
            return this.localToWorldMatrix.copy().inverseOf();
        }

        //private _worldTransform:Matrix = null;
        //get worldTransform(){
        //    var syncList = dyCb.Collection.create<Transform>(),
        //        current = this;
        //
        //    while (current !== null) {
        //        syncList.addChild(current);
        //        current = current.parent;
        //    }
        //
        //    syncList.reverse().forEach((transform:Transform) => {
        //        transform.sync();
        //    });
        //
        //    return this._worldTransform;
        //}
        //set worldTransform(worldTransform:Matrix){
        //    this._worldTransform = worldTransform;
        //}

        private _parent:Transform = null;
        get parent(){
            return this._parent;
        }
        set parent(parent:Transform){
            if(this._parent){
                this._parent.removeChild(this);
            }

            //if(!parent){
            //    this._localRotationWithParent = null;
            //this._resetLocal();
            //}

            if(!parent){
                this._parent = null;

                return;
            }

            this._parent = parent;
            this._parent.addChild(this);
        }

        private _position:Vector3 = Vector3.create();
        //todo gameObject set parent
        get position(){
            //return this.worldTransform.getTranslation();
            //return this.getWorldTransform(this).getTranslation();
            return this._position;
        }
        set position(position:Vector3){
            this._position = position;
        }

        private _rotation:Quaternion = Quaternion.create(0, 0, 0, 1);
        get rotation(){
            //return Quaternion.create().setFromMatrix(this.worldTransform);
            return this._rotation;
        }
        set rotation(rotation:Quaternion){
            this._rotation = rotation;
        }

        private _eulerAngles:Vector3 = null;
        get eulerAngles(){
            return this._rotation.getEulerAngles();
        }
        set eulerAngles(eulerAngles:Vector3){
            //this._eulerAngles = eulerAngles;
        }

        //todo no scale based on world space now
        private _scale:Vector3 = Vector3.create(1, 1, 1);
        get scale(){
            return this._scale;
        }

        private _localPosition:Vector3 = Vector3.create(0, 0, 0);
        get localPosition(){
            //return this._localPosition;
            //return this._parent ? this._parent.localToWorldMatrix.copy().inverseOf().multiplyVector3(this._position)
            return this._parent ? this._position.sub(this._parent.position) : this._position;
        }

        private _localRotation:Quaternion = Quaternion.create(0, 0, 0, 1);
        get localRotation(){
            //return this._localRotation;
            //return this._localRotationWithParent.multiply(this._localRotationWithoutParent);
            //return this._parent ? this._parent.rotation.copy().invert().multiply(this._rotation)
            return this._parent ? this._rotation.sub(this._parent.rotation) : this._rotation;
        }

        private _localEulerAngles:Vector3 = null;
        get localEulerAngles(){
            return this.localRotation.getEulerAngles();
        }
        set localEulerAngles(localEulerAngles:Vector3){
            //this._localEulerAngles = localEulerAngles;
        }

        private _localScale:Vector3 = Vector3.create(1, 1, 1);
        get localScale(){
            //return this._localScale;
            //return this._parent ? this._parent.localToWorldMatrix.copy().inverseOf().multiplyVector3(this._scale)
            //    : this._scale;
            return this._parent ? this._scale.sub(this._parent.scale) : this._scale;
        }


        //private _eulerAngles:Array<number> = null;
        //get eulerAngles(){
        //    return this.worldTransform.getEulerAngles();
        //}
        //set eulerAngles(eulerAngles:Vector3){
        //        this._localRotation.setFromEulerAngles(eulerAngles);
        //
        //        if (this._parent !== null) {
        //            this._localRotation = this._parent.rotation.copy().invert().multiply(this._localRotation);
        //        }
        //
        //        this._dirtyLocal = true;
        //}

        //get localEulerAngles(){
        //    return this._localRotation.getEulerAngles();
        //}

        get up(){
            return this.localToWorldMatrix.getY().normalize();
        }

        get right(){
            return this.localToWorldMatrix.getX().normalize();
        }

        get forward(){
            //todo scale(-1)?
            return this.localToWorldMatrix.getZ().normalize();
            //return this._matrix.getZ().normalize().scale(-1);
        }

        private _dirtyWorld:boolean = null;
        get dirtyWorld(){
            return this._dirtyWorld;
        }
        set dirtyWorld(dirtyWorld:boolean){
            this._dirtyWorld = dirtyWorld;
        }

        get flag(){
            return String(this.uid);
        }

        private _dirtyLocal:boolean = true;
        private _children:dyCb.Collection<Transform> = dyCb.Collection.create<Transform>();

        public addChild(child:Transform){
            this._children.addChild(child);
            //this.addFlag(child);
        }

        public removeChild(child:Transform){
            //this.removeFlag(child);
            this._children.removeChild(child);
        }
        //
        //public addFlag(flag:Flag){
        //    this._flags.addChild(flag);
        //}
        //
        //public removeFlag(flag:Flag){
        //    this._flags.removeChild(flag);
        //}

        public sync(){
            //if (this._dirtyLocal) {
            //    //this._localTransform.setTRS(this._localPosition, this._localRotation, this._localScale);
            //    this._localTransform.setTRS(this._localPosition, this._getLocalRotation(), this._localScale);
            //
            //    this._dirtyLocal = false;
            //    this._dirtyWorld = true;
            //}
            //
            //if (this._dirtyWorld) {
            //    if (this._parent === null) {
            //        this._worldTransform = this._localTransform.copy();
            //    }
            //    else {
            //        //this._worldTransform = this._parent.worldTransform.multiply(this._localTransform);
            //        this._worldTransform = this._parent.getWorldTransform(this).multiply(this._localTransform);
            //    }
            //
            //    this._dirtyWorld = false;
            //
            //    this._children.forEach((child:Transform) => {
            //        child.dirtyWorld = true;
            //    });
            //}
        }

        //private _flags:dyCb.Collection<Flag> = dyCb.Collection.create<Flag>();

        public translateLocal(translation:Vector3, relativeTo:Space = Space.SELF) {
            //if(relativeTo === Space.SELF){
            //    this._localPosition = this._localPosition.add(this._getLocalRotation().multiplyVector3(translation));
            //}
            //else if(relativeTo === Space.WORLD){
            //    this._position = this._position.add(translation);
            //}
            //
            //this._dirtyLocal = true;
        }

        public translate(translation:Vector3, relativeTo:Space = Space.SELF){
            //this.translateLocal(translation, relativeTo);
            var actualTranslation = null;

            if(relativeTo === Space.SELF){
                actualTranslation = this._rotation.multiplyVector3(translation);
            }
            else if(relativeTo === Space.WORLD){
                actualTranslation = translation;
            }
            else{
                dyCb.Log.error(true, dyCb.Log.info.FUNC_INVALID("relativeTo"));
            }

            this.syncHierarchy((transform:Transform) => {
                transform.position = transform.position.add(actualTranslation);
            });

            //if(this._parent === null){
            //    //this.setLocalPosition(this.position.add(this.rotation.multiplyVector3(translation)));
            //    this.translateLocal(translation, relativeTo);
            //}
            //else{
            //    //this.setPosition(this.position.add(translation));
            //    this.setPosition(this._localPosition.add(translation));
            //}
        }

        public rotateLocal(eulerAngles:Vector3, relativeTo:Space = Space.SELF) {
            //if(relativeTo === Space.SELF){
            //    var quaternion = Quaternion.create();
            //
            //    quaternion.setFromEulerAngles(eulerAngles);
            //
            //    this._localRotation = this._localRotation.multiply(quaternion);
            //}
            //else if(relativeTo === Space.WORLD){
            //    var quaternion = Quaternion.create(),
            //        rotation = Quaternion.create();
            //
            //    quaternion.setFromEulerAngles(eulerAngles);
            //
            //    quaternion = rotation.invert().multiply(quaternion);
            //    this._localRotation = quaternion.multiply(this._localRotation);
            //}
            //else{
            //    dyCb.Log.error(true, dyCb.Log.info.FUNC_INVALID("relativeTo"));
            //}
            //
            //if(this._parent){
            //    this._dirtyLocal = true;
            //}
        }

        public rotate(eulerAngles:Vector3, relativeTo:Space = Space.SELF){
            //var actualRotation = null;

            if(relativeTo === Space.SELF){
                let quaternion = Quaternion.create();

                quaternion.setFromEulerAngles(eulerAngles);

                this.syncHierarchy((transform:Transform) => {
                    transform.rotation = transform.rotation.multiply(quaternion);
                    //todo fix bug:rotate parent, should not change parent's position, and child should rotate around parent
                    transform.position = quaternion.multiplyVector3(transform.position);
                });
            }
            else if(relativeTo === Space.WORLD){
                //var quaternion = Quaternion.create(),
                //    rotation = Quaternion.create();

                //quaternion.setFromEulerAngles(eulerAngles);

                //quaternion = rotation.invert().multiply(quaternion);
                //quaternion = rotation.multiply(quaternion);
                this.syncHierarchy((transform:Transform) => {
                    if(eulerAngles.x !== 0){
                        transform.rotateAround(eulerAngles.x, Vector3.create(0, 0, 0), Vector3.right);
                    }
                    if (eulerAngles.y !== 0) {
                        transform.rotateAround(eulerAngles.y, Vector3.create(0, 0, 0), Vector3.up);
                    }
                    if (eulerAngles.z !== 0) {
                        transform.rotateAround(eulerAngles.z, Vector3.create(0, 0, 0), Vector3.forward);
                    }
                });
                //this._rotation = quaternion.multiply(this._rotation);
            }
            else{
                dyCb.Log.error(true, dyCb.Log.info.FUNC_INVALID("relativeTo"));
            }

            //if(this._parent){
            //    this._dirtyLocal = true;
            //}



        }


        public rotateAround(angle:number, center:Vector3, axis:Vector3){
            var pos: Vector3 = this._position;
            var rot: Quaternion = Quaternion.create().setFromAxisAngle(angle, axis);
            var dir: Vector3 = pos.sub(center); // find current direction relative to center
            dir = rot.multiplyVector3(dir); // rotate the direction
            this._position = center.add(dir); // define new position
            this._rotation = this._rotation.multiply(rot);
        }
        //
        //public setScale(num:Vector3);
        //public setScale(x:number, y:number, z:number);
        //
        //public setScale(args){
        //    if(arguments.length === 1){
        //        let num = arguments[0];
        //
        //        this._scale.set(num.x, num.y, num.z);
        //    }
        //    else{
        //        let x = arguments[0],
        //            y = arguments[1],
        //            z = arguments[2];
        //
        //        this._scale.set(x, y, z);
        //    }
        //}
        //
        //public setRotate(quat:Quaternion);
        //public setRotate(x:number, y:number, z:number, w:number);
        //
        //public setRotate(args){
        //    if(arguments.length === 1){
        //        let quat = arguments[0];
        //
        //        this._rotation.set(quat.x ,quat.y, quat.z, quat.w);
        //    }
        //    else{
        //        let x = arguments[0],
        //            y = arguments[1],
        //            z = arguments[2],
        //            w = arguments[3];
        //
        //        this._rotation.set(x, y, z, w);
        //    }
        //}

        public setLocalPosition(pos:Vector3);
        public setLocalPosition(x:number, y:number, z:number);

        public setLocalPosition(args){
            var position:Vector3 = null;

            if (arguments.length === 1) {
                position = arguments[0];
            }
            else if(arguments.length === 3) {
                position = Vector3.create(arguments[0], arguments[1], arguments[2]);
            }

            //if(this._parent){
            //    position = position.add(this._parent.position);
            //}

            //this.setPosition(position);

            this.translate(position.sub(this.localPosition));

            //this._dirtyLocal = true;
        }

        /**
         * @function
         * @name pc.GraphNode#setPosition^2
         * @description Sets the world space position of the specified graph node.
         * @param {pc.Vec3} position world space position (xyz) of graph node.
         * @example
         * var position = new pc.Vec3(0, 10, 0);
         * this.entity.setPosition(position);
         */
        public setPosition(pos:Vector3);
        public setPosition(x:number, y:number, z:number);

        public setPosition(args){
            var position:Vector3 = null;
            //var invParentWtm = Matrix.create();

            if (arguments.length === 1) {
                position = arguments[0];
            }
            else if(arguments.length === 3) {
                position = Vector3.create(arguments[0], arguments[1], arguments[2]);
            }

            this.translate(position.sub(this._position), Space.WORLD);
            //if (this._parent === null) {
            //    this._localPosition.set(position.x, position.y, position.z);
            //    //this._position = position.copy();
            //
            //}
            //else {
            //    //this._localPosition.set(position.x, position.y, position.z);
            //    this._localPosition = this._parent.worldTransform.copy().inverseOf().multiplyVector3(position);
            //    //invParentWtm.copy(this._parent.getWorldTransform()).invert();
            //    //invParentWtm.transformPoint(position, this.localPosition);
            //}

            //this._dirtyLocal = true;

        }

        public syncHierarchy(func:Function){
            func(this);

            this._children.forEach((child:Transform) => {
                child.syncHierarchy(func);
            });
        }

        public setLocalEulerAngles(eulerAngles:Vector3);
        public setLocalEulerAngles(ex:number, ey:number, ez:number);

        public setLocalEulerAngles(args) {
            var eulerAngles = null;

            if(arguments.length === 1){
                eulerAngles = arguments[0];
            }
            else if(arguments.length == 3){
                eulerAngles = Vector3.create(arguments[0], arguments[1], arguments[2]);
            }


            this.rotate(eulerAngles.sub(this.localRotation.getEulerAngles()), Space.WORLD);
            //this.rotate(eulerAngles);
            //this.setEulerAngles() this._rotation.multiply(Quaternion.create().setFromEulerAngles(eulerAngles))
            //this._rotation.setFromEulerAngles(ex, ey, ez);
            //this._dirtyLocal = true;
        }

        public setEulerAngles(eulerAngles:Vector3);
        public setEulerAngles(ex:number, ey:number, ez:number);

        public setEulerAngles(args) {
            var eulerAngles = null;

            if(arguments.length === 1){
                eulerAngles = arguments[0];
            }
            else if(arguments.length == 3){
                eulerAngles = Vector3.create(arguments[0], arguments[1], arguments[2]);
            }

            //this.rotate(Quaternion.create().setFromEulerAngles(eulerAngles).sub(this._rotation).getEulerAngles(), Space.SELF);
            this.rotate(eulerAngles.sub(this.rotation.getEulerAngles()), Space.SELF);

            //this._rotation.setFromEulerAngles(eulerAngles);



            //quaternion.setFromEulerAngles(eulerAngles);

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

            this._rotation.setFromMatrix(Matrix.create().setLookAt(this.position, target, up));
        }
    }
}
