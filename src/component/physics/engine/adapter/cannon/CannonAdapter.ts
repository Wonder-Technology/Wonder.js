/// <reference path="../../../../../filePath.d.ts"/>
module wd {
    export class CannonAdapter implements IPhysicsEngineAdapter {
        public static create() {
            var obj = new this();

            return obj;
        }

        public world:CANNON.World = null;

        private _materials:wdCb.Collection<MaterialData> = wdCb.Collection.create<MaterialData>();
        private _gameObjectDatas:wdCb.Collection<GameObjectData> = wdCb.Collection.create<GameObjectData>();

        public getFriction(obj:GameObject, friction:number){
            return this._getMaterialData(obj, "friction");
        }

        public setFriction(obj:GameObject, friction:number){
            this._setMaterialData(obj, "friction", friction);
        }

        public getRestitution(obj:GameObject, restitution:number){
            return this._getMaterialData(obj, "restitution");
        }

        public setRestitution(obj:GameObject, restitution:number){
            this._setMaterialData(obj, "restitution", restitution);
        }

        public getLinearDamping(obj:GameObject){
            return this._getNumberData(obj, "linearDamping");
        }
        public setLinearDamping(obj:GameObject, linearDamping:number){
            return this._setNumberData(obj, "linearDamping", linearDamping);
        }

        public getAngularDamping(obj:GameObject){
            return this._getNumberData(obj, "angularDamping");
        }
        public setAngularDamping(obj:GameObject, angularDamping:number){
            return this._setNumberData(obj, "angularDamping", angularDamping);
        }

        public getMass(obj:GameObject){
            return this._getNumberData(obj, "mass");
        }
        public setMass(obj:GameObject, mass:number){
            return this._setNumberData(obj, "mass", mass);
        }

        public getVelocity(obj:GameObject){
            return this._getVec3Data(obj, "velocity");
        }

        public setVelocity(obj:GameObject, velocity:Vector3){
            this._setVec3Data(obj, "velocity", velocity);
        }

        public getAngularVelocity(obj:GameObject){
            return this._getVec3Data(obj, "angularVelocity");
        }

        public setAngularVelocity(obj:GameObject, angularVelocity:Vector3){
            this._setVec3Data(obj, "angularVelocity", angularVelocity);
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
            velocity,
            angularVelocity
            }) {
            var body = null;

            body = new CANNON.Body({
                position: this._convertToCannonVector3(position),
                quaternion: this._convertToCannonQuaternion(rotation),

                mass: mass,
                linearDamping: linearDamping,
                angularDamping: angularDamping,
                velocity: this._convertToCannonVector3(velocity),
                angularVelocity: this._convertToCannonVector3(angularVelocity)
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
            velocity,
            angularVelocity
            }) {
            var body = null;

            body = new CANNON.Body({
                type: CANNON.Body.KINEMATIC,
                position: this._convertToCannonVector3(position),
                quaternion: this._convertToCannonQuaternion(rotation),

                mass: mass,
                velocity: this._convertToCannonVector3(velocity),
                angularVelocity: this._convertToCannonVector3(angularVelocity)
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

        private _createMaterial(gameObject:GameObject, friction:number, restitution:number) {
            var material = null,
                currentMaterial = null;

            material = this._getMaterial(gameObject);

            if (material) {
                return material;
            }

            currentMaterial = new CANNON.Material("material");

            this._addMaterial(gameObject, currentMaterial, friction, restitution);

            return currentMaterial;
        }

        private _getMaterial(obj:GameObject) {
            var result = this._materials.findOne(({gameObject,material}) => {
                return JudgeUtils.isEqual(gameObject, obj);
            });

            return result === null ? null : result.material;
        }

        private _addMaterial(gameObject:GameObject, currentMaterial:CANNON.Material, friction:number, restitution:number) {
            var world = this.world;

            this._materials.addChild({
                gameObject:gameObject,
                material:currentMaterial
            });

            this._materials.forEach(({gameObject, material}) => {
                world.addContactMaterial(new CANNON.ContactMaterial(material, currentMaterial, {
                    friction: friction,
                    restitution: restitution
                }));
            });
        }

        private _findGameObjectData(obj:GameObject){
            return this._gameObjectDatas.findOne(({gameObject, body}) => {
                return JudgeUtils.isEqual(gameObject, obj);
            });
        }

        private _getNumberData(obj:GameObject, dataName:string){
            var result = this._findGameObjectData(obj);

            if(!result){
                return null;
            }

            return result.body[dataName];
        }

        private _setNumberData(obj:GameObject, dataName:string, data:number){
            var result = this._findGameObjectData(obj);

            if(!result){
                return;
            }

            result.body[dataName] = data;
        }

        private _getVec3Data(obj:GameObject, dataName:string){
            var result = this._findGameObjectData(obj);

            if(!result){
                return null;
            }

            return this._convertToWonderVector3(result.body[dataName]);
        }

        private _setVec3Data(obj:GameObject, dataName:string, data:Vector3){
            var result = this._findGameObjectData(obj);

            if(!result){
                return;
            }

            result.body[dataName] = this._convertToCannonVector3(data);
        }

        @require(function(obj:GameObject, dataName:string){
            var resultArr = [],
                firstData = null,
                world = this.world,
                currentMaterial = this._getMaterial(obj);

            if(!currentMaterial){
                return null;
            }

            this._materials.forEach(({gameObject, material}) => {
                let contactMaterial = world.getContactMaterial(material, currentMaterial);

                if(!contactMaterial){
                    return;
                }

                resultArr.push(contactMaterial[dataName]);
            });

            firstData = resultArr[0];
            for(let data of resultArr){
                assert(data === firstData, Log.info.FUNC_SHOULD("the data of contact material which contains the same material", "be the same"));
            }
        })
        private _getMaterialData(obj:GameObject, dataName:string){
            var result = null,
                world = this.world,
                currentMaterial = this._getMaterial(obj);


            if(!currentMaterial){
                return null;
            }

            this._materials.forEach(({gameObject, material}) => {
                let contactMaterial = world.getContactMaterial(material, currentMaterial);

                if(!contactMaterial){
                    return;
                }

                result = contactMaterial[dataName];

                return wdCb.$BREAK;
            });

            return result;
        }

        private _setMaterialData(obj:GameObject, dataName:string, data:number){
            var world = this.world,
                currentMaterial = this._getMaterial(obj);

            if(!currentMaterial){
                Log.warn("no material find, please add material first");

                return;
            }

            this._materials.forEach(({gameObject, material}) => {
                let contactMaterial = world.getContactMaterial(material, currentMaterial);

                if(!contactMaterial){
                    return;
                }

                contactMaterial[dataName] = data;
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

            body.material = this._createMaterial(gameObject, friction, restitution);

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
    }

    type MaterialData = {
        gameObject:GameObject,
        material:CANNON.Material
    }

    type GameObjectData = {
        gameObject:GameObject,
        body:CANNON.Body
    }
}

