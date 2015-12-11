/// <reference path="../../../../../filePath.d.ts"/>
module wd {
    export class CannonAdapter implements IPhysicsEngineAdapter {
        public static create() {
            var obj = new this();

            return obj;
        }

        public world:CANNON.World = null;

        private _materialList:MaterialList = MaterialList.create();
        private _gameObjectList:GameObjectDataList = GameObjectDataList.create();

        public getGravity(gravity:number){
            return CannonUtils.convertToWonderVector3(this.world.gravity);
        }

        public setGravity( gravity:Vector3){
            this.world.gravity = CannonUtils.convertToCannonVector3(gravity);
        }

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
            angularVelocity,

            impulse,
            force,
            hitPoint
            }) {
            var body:CANNON.Body = null;

            body = new CANNON.Body({
                mass: mass,
                linearDamping: linearDamping,
                angularDamping: angularDamping,
                velocity: CannonUtils.convertToCannonVector3(velocity),
                angularVelocity: CannonUtils.convertToCannonVector3(angularVelocity)
            });

            body.addShape(this._createShape(shape));

            if(impulse && hitPoint){
                body.applyImpulse(CannonUtils.convertToCannonVector3(impulse), CannonUtils.convertToCannonVector3(hitPoint));
            }
            if(force && hitPoint){
                body.applyForce(CannonUtils.convertToCannonVector3(force), CannonUtils.convertToCannonVector3(hitPoint));
            }

            this._addBody(body, gameObject, {
                position: CannonUtils.convertToCannonVector3(position),
                quaternion: CannonUtils.convertToCannonQuaternion(rotation),

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
            var body:CANNON.Body = null;

            body = new CANNON.Body({
                type: CANNON.Body.KINEMATIC,

                mass: mass,
                velocity: CannonUtils.convertToCannonVector3(velocity),
                angularVelocity: CannonUtils.convertToCannonVector3(angularVelocity)
            });

            body.addShape(this._createShape(shape));

            this._addBody(body, gameObject, {
                position: CannonUtils.convertToCannonVector3(position),
                quaternion: CannonUtils.convertToCannonQuaternion(rotation),

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
            var body:CANNON.Body = null;

            body = new CANNON.Body({
                mass: 0
            });

            body.addShape(this._createShape(shape));

            this._addBody(body, gameObject, {
                position: CannonUtils.convertToCannonVector3(position),
                quaternion: CannonUtils.convertToCannonQuaternion(rotation),

                onCollisionStart: onCollisionStart,
                onContact: onContact,
                onCollisionEnd: onCollisionEnd,
                friction: friction,
                restitution: restitution
            });
        }

        public removeGameObject(obj:GameObject){
            var material = this._getMaterial(obj),
                gameObjectData = this._gameObjectList.findByGameObject(obj),
                body = gameObjectData !== null ? gameObjectData.body : null;

            if(body){
                this.world.remove(body);
            }


            this._gameObjectList.remove(obj);

            this._materialList.remove(obj);
        }

        public update(time:number):void {
            this._gameObjectList.updateBodyTransformData();
            this.world.step(Director.getInstance().getDeltaTime() / 1000);
            this._gameObjectList.updateGameObjectTransformData();
        }

        private _createShape(shape:Shape) {
            var cannonShape = null;

            if (shape instanceof AABBShape) {
                cannonShape = new CANNON.Box(CannonUtils.convertToCannonVector3(shape.halfExtents));
            }
            else if (shape instanceof SphereShape) {
                cannonShape = new CANNON.Sphere(shape.radius);
            }

            return cannonShape;
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
            return this._materialList.getMaterial(obj);
        }

        private _addMaterial(gameObject:GameObject, currentMaterial:CANNON.Material, friction:number, restitution:number) {
            this._materialList.add(gameObject, currentMaterial);
            this._materialList.addContactMaterial(this.world, currentMaterial, friction, restitution);
        }

        private _getNumberData(obj:GameObject, dataName:string){
            var result = this._gameObjectList.findByGameObject(obj);

            if(!result){
                return null;
            }

            return result.body[dataName];
        }

        private _setNumberData(obj:GameObject, dataName:string, data:number){
            var result = this._gameObjectList.findByGameObject(obj);

            if(!result){
                return;
            }

            result.body[dataName] = data;
        }

        private _getVec3Data(obj:GameObject, dataName:string){
            var result = this._gameObjectList.findByGameObject(obj);

            if(!result){
                return null;
            }

            return CannonUtils.convertToWonderVector3(result.body[dataName]);
        }

        private _setVec3Data(obj:GameObject, dataName:string, data:Vector3){
            var result = this._gameObjectList.findByGameObject(obj);

            if(!result){
                return;
            }

            result.body[dataName] = CannonUtils.convertToCannonVector3(data);
        }

        @require(function(obj:GameObject, dataName:string){
            var resultArr = [],
                firstData = null,
                currentMaterial = this._getMaterial(obj);

            if(!currentMaterial){
                return null;
            }

            resultArr = this._materialList.getContactMaterials(this.world, currentMaterial);

            firstData = resultArr[0];
            for(let data of resultArr){
                assert(data === firstData, Log.info.FUNC_SHOULD("the data of contact material which contains the same material", "be the same"));
            }
        })
        private _getMaterialData(obj:GameObject, dataName:string){
            var result = null,
                currentMaterial = this._getMaterial(obj);


            if(!currentMaterial){
                return null;
            }


            return this._materialList.getContactMaterialData(this.world, currentMaterial, dataName);
        }

        private _setMaterialData(obj:GameObject, dataName:string, data:number){
            var world = this.world,
                currentMaterial = this._getMaterial(obj);

            if(!currentMaterial){
                Log.warn("no material find, please add material first");

                return;
            }


            this._materialList.setContactMaterialData(this.world, currentMaterial, dataName, data);
        }

        private _addBody(body:CANNON.Body, gameObject:GameObject, {
            position,
            quaternion,
            onCollisionStart,
            onContact,
            onCollisionEnd,
            friction,
            restitution
            }) {
            body.material = this._createMaterial(gameObject, friction, restitution);
            body.position = position;
            body.quaternion = quaternion;

            this.world.addBody(body);

            this._gameObjectList.add(gameObject, body);

            this._bindCollideEvent(body, onCollisionStart, onContact, onCollisionEnd);
        }

        private _bindCollideEvent(targetBody:CANNON.Body, onCollisionStart:(collideObject:GameObject) => void, onContact:(collideObject:GameObject) => void, onCollisionEnd:(collideObject:GameObject) => void){
            var self = this;

            targetBody.addEventListener("collide",(e) => {
                let data = self._gameObjectList.findByBody(e.body),
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
}

