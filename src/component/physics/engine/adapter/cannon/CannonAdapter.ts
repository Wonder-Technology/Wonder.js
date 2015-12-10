/// <reference path="../../../../../filePath.d.ts"/>
module wd {
    export class CannonAdapter implements IPhysicsEngineAdapter {
        public static create() {
            var obj = new this();

            return obj;
        }

        public world:CANNON.World = null;

        private _materials:wdCb.Collection<CANNON.Material> = wdCb.Collection.create<CANNON.Material>();
        private _gameObjectDatas:wdCb.Collection<GameObjectData> = wdCb.Collection.create<GameObjectData>();

        public getVelocity(obj:GameObject){
            var result = this._findGameObjectData(obj);

            if(!result){
                return null;
            }

            return this._convertToWonderVector3(result.body.velocity);
        }

        public setVelocity(obj:GameObject, velocity:Vector3){
            var result = this._findGameObjectData(obj);

            if(!result){
                return;
            }

            result.body.velocity = this._convertToCannonVector3(velocity);
        }

        public init() {
            var {
                enable,
                gravity,
                iterations
                }= Director.getInstance().scene.physics;

            this.world = new CANNON.World();

            this.world.broadphase = new CANNON.NaiveBroadphase();

            this.world.solver.iterations = iterations;
            this.world.gravity.set(gravity.x, gravity.y, gravity.z);
        }

        public addDynamicBody(gameObject:GameObject, shape:Shape, {
            position,
            rotation,

            onCollisionStart,
            onContact,
            onCollisionEnd,

            mass,
            linearDamping,
            angularDamping,
            friction,
            restitution,
            velocity
            }) {
            var body = null;

            body = new CANNON.Body({
                position: this._convertToCannonVector3(position),
                quaternion: this._convertToCannonQuaternion(rotation),

                mass: mass,
                linearDamping: linearDamping,
                angularDamping: angularDamping,
                velocity: this._convertToCannonVector3(velocity)
            });

            this._addBody(body, gameObject, shape, {
                onCollisionStart: onCollisionStart,
                onContact: onContact,
                onCollisionEnd: onCollisionEnd,
                friction: friction,
                restitution: restitution
            });
        }

        public addKinematicBody(gameObject:GameObject, shape:Shape, {
            position,
            rotation,

            onCollisionStart,
            onContact,
            onCollisionEnd,

            mass,
            friction,
            restitution,
            velocity
            }) {
            var body = null;

            body = new CANNON.Body({
                type: CANNON.Body.KINEMATIC,
                position: this._convertToCannonVector3(position),
                quaternion: this._convertToCannonQuaternion(rotation),

                mass: mass,
                velocity: this._convertToCannonVector3(velocity)
            });

            this._addBody(body, gameObject, shape, {
                onCollisionStart: onCollisionStart,
                onContact: onContact,
                onCollisionEnd: onCollisionEnd,
                friction: friction,
                restitution: restitution
            });
        }

        public addStaticBody(gameObject:GameObject, shape:Shape, {
            position,
            rotation,

            onCollisionStart,
            onContact,
            onCollisionEnd,

            friction,
            restitution
            }) {
            var body = null;

            body = new CANNON.Body({
                position: this._convertToCannonVector3(position),
                quaternion: this._convertToCannonQuaternion(rotation),

                mass: 0
            });

            this._addBody(body, gameObject, shape, {
                onCollisionStart: onCollisionStart,
                onContact: onContact,
                onCollisionEnd: onCollisionEnd,
                friction: friction,
                restitution: restitution
            });
        }

        private _addBody(body:CANNON.Body, gameObject:GameObject, shape:Shape, {
            onCollisionStart,
            onContact,
            onCollisionEnd,
            friction,
            restitution
            }) {
            body.addShape(this._createShape(shape));

            body.material = this._createMaterial(friction, restitution);

            this.world.addBody(body);

            this._gameObjectDatas.addChild({
                gameObject:gameObject,
                body:body
            });


            this._bindCollideEvent(body, onCollisionStart, onContact, onCollisionEnd);
        }

        private _bindCollideEvent(targetBody:CANNON.Body, onCollisionStart:(collideObject:GameObject) => void, onContact:(collideObject:GameObject) => void, onCollisionEnd:(collideObject:GameObject) => void){
            var gameObjectDatas = this._gameObjectDatas;

            targetBody.addEventListener("collide",(e) => {
                let data = gameObjectDatas.findOne(({gameObject, body}) => {
                    return body === e.body;
                }),
                collideObject:GameObject = null;

                if(!data){
                    return;
                }

                collideObject = data.gameObject;

                onCollisionStart(collideObject);
                onContact(collideObject);
                onCollisionEnd(collideObject);
            });
        }

        public update(time:number):void {
            var self = this;

            this.world.step(Director.getInstance().getDeltaTime() / 1000);

            this._gameObjectDatas.forEach(({gameObject,body}) => {
                //let {gameObject,body} = gameObjectData;



                gameObject.transform.position = self._convertToWonderVector3(body.position);
                gameObject.transform.rotation = self._convertToWonderQuaternion(body.quaternion);
            });

        //    for (var index = 0; index < this._registeredMeshes.length; index++) {
        //        var registeredMesh = this._registeredMeshes[index];
        //
        //        if (registeredMesh.isChild) {
        //            continue;
        //        }
        //
        //        // Body position
        //        var bodyX = registeredMesh.body.position.x,
        //            bodyY = registeredMesh.body.position.y,
        //            bodyZ = registeredMesh.body.position.z;
        //
        //        registeredMesh.mesh.position.x = bodyX + registeredMesh.delta.x;
        //        registeredMesh.mesh.position.y = bodyY + registeredMesh.delta.y;
        //        registeredMesh.mesh.position.z = bodyZ + registeredMesh.delta.z;
        //
        //        registeredMesh.mesh.rotationQuaternion.copyFrom(registeredMesh.body.quaternion);
        //        if (registeredMesh.deltaRotation) {
        //            registeredMesh.mesh.rotationQuaternion.multiplyInPlace(registeredMesh.deltaRotation);
        //        }
        //    }
        }

        //public updateBodyPosition = function (mesh:AbstractMesh):void {
        //    for (var index = 0; index < this._registeredMeshes.length; index++) {
        //        var registeredMesh = this._registeredMeshes[index];
        //        if (registeredMesh.mesh === mesh || registeredMesh.mesh === mesh.parent) {
        //            var body = registeredMesh.body;
        //
        //            var center = mesh.getBoundingInfo().boundingBox.center;
        //            body.position.set(center.x, center.y, center.z);
        //
        //            body.quaternion.copy(mesh.rotationQuaternion);
        //
        //            if (registeredMesh.deltaRotation) {
        //                var tmpQ = new CANNON.Quaternion(-0.7071067811865475, 0, 0, 0.7071067811865475);
        //                body.quaternion = body.quaternion.mult(tmpQ);
        //            }
        //        }
        //
        //        //if (registeredMesh.heightmap) {
        //        //    //calculate the correct body position:
        //        //    var rotationQuaternion = mesh.rotationQuaternion;
        //        //    mesh.rotationQuaternion = new BABYLON.Quaternion();
        //        //    mesh.computeWorldMatrix(true);
        //        //
        //        //    //get original center with no rotation
        //        //    var center = mesh.getBoundingInfo().boundingBox.center.clone();
        //        //
        //        //    var oldPivot = mesh.getPivotMatrix() || Matrix.Translation(0, 0, 0);
        //        //
        //        //    //rotation is back
        //        //    mesh.rotationQuaternion = rotationQuaternion;
        //        //
        //        //    //calculate the new center using a pivot (since Cannon.js doesn't center height maps)
        //        //    var p = Matrix.Translation(mesh.getBoundingInfo().boundingBox.extendSize.x, 0, -mesh.getBoundingInfo().boundingBox.extendSize.z);
        //        //    mesh.setPivotMatrix(p);
        //        //    mesh.computeWorldMatrix(true);
        //        //
        //        //    //calculate the translation
        //        //    var translation = mesh.getBoundingInfo().boundingBox.center.subtract(center).subtract(mesh.position).negate();
        //        //
        //        //    body.position = new CANNON.Vec3(translation.x, translation.y - mesh.getBoundingInfo().boundingBox.extendSize.y, translation.z);
        //        //    //add it inverted to the delta
        //        //    registeredMesh.delta = mesh.getBoundingInfo().boundingBox.center.subtract(center);
        //        //    registeredMesh.delta.y += mesh.getBoundingInfo().boundingBox.extendSize.y;
        //        //
        //        //    mesh.setPivotMatrix(oldPivot);
        //        //    mesh.computeWorldMatrix(true);
        //        //}
        //    }
        //}


        private _createShape(shape:Shape) {
            var cannonShape = null;

            if (shape instanceof AABBShape) {
                cannonShape = new CANNON.Box(this._convertToCannonVector3(shape.halfExtents));
            }
            else if (shape instanceof SphereShape) {
                cannonShape = new CANNON.Sphere(shape.radius);
            }

            return cannonShape;
        }

        private _convertToCannonVector3(v:Vector3) {
            return new CANNON.Vec3(v.x, v.y, v.z);
        }

        private _convertToCannonQuaternion(rotation:Quaternion){
            return new CANNON.Quaternion(rotation.x, rotation.y, rotation.z, rotation.w);
        }

        private _convertToWonderVector3(v:CANNON.Vec3) {
            return Vector3.create(v.x, v.y, v.z);
        }

        private _convertToWonderQuaternion(r:CANNON.Quaternion){
            return Quaternion.create(r.x, r.y, r.z, r.w);
        }

        private _createMaterial(friction:number, restitution:number) {
            var material = null,
                currentMaterial = null;

            material = this._getMaterial(friction, restitution);

            if (material) {
                return material;
            }

            currentMaterial = new CANNON.Material("material");
            currentMaterial.friction = friction;
            currentMaterial.restitution = restitution;

            this._addMaterial(currentMaterial, friction, restitution);

            return currentMaterial;
        }

        private _getMaterial(friction:number, restitution:number) {
            return this._materials.findOne((material:CANNON.Material) => {
                return material.friction === friction && material.restitution === restitution;
            });
        }

        private _addMaterial(currentMaterial:CANNON.Material, friction:number, restitution:number) {
            var world = this.world;

            this._materials.addChild(currentMaterial);

            this._materials.forEach((material:CANNON.Material) => {
                world.addContactMaterial(new CANNON.ContactMaterial(material, currentMaterial, {
                    friction: friction,
                    restitution: restitution
                }));
            });
        }

        private _findGameObjectData(obj:GameObject){
            return this._gameObjectDatas.findOne(({gameObject, body}) => {
                return gameObject.uid === obj.uid;
            });
        }
    }

    type GameObjectData = {
        gameObject:GameObject,
        body:CANNON.Body
    }
}

