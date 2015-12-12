/// <reference path="../../../../../filePath.d.ts"/>
module wd {
    export class CannonAdapter implements IPhysicsEngineAdapter {
        public static create() {
            var obj = new this();

            return obj;
        }

        public world:CANNON.World = null;

        private _materialList:CannonMaterialList = CannonMaterialList.create();
        private _gameObjectList:CannonGameObjectDataList = CannonGameObjectDataList.create();
        private _dynamicBody:CannonDynamicBody = null;
        private _kinematicBody:CannonKinematicBody = null;
        private _staticBody:CannonStaticBody = null;

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
                gravity,
                iterations
                }= Director.getInstance().scene.physics;

            this.world = new CANNON.World();

            this.world.broadphase = new CANNON.NaiveBroadphase();

            this.world.solver.iterations = iterations;
            this.world.gravity.set(gravity.x, gravity.y, gravity.z);

            this._dynamicBody = CannonDynamicBody.create(this.world, this._gameObjectList, this._materialList);
            this._kinematicBody = CannonKinematicBody.create(this.world, this._gameObjectList, this._materialList);
            this._staticBody = CannonStaticBody.create(this.world, this._gameObjectList, this._materialList);
        }

        public addDynamicBody(gameObject:GameObject, shape:Shape, data:any) {
            this._dynamicBody.addBody(gameObject, shape, data);
        }

        public addKinematicBody(gameObject:GameObject, shape:Shape, data:any) {
            this._kinematicBody.addBody(gameObject, shape, data);
        }

        public addStaticBody(gameObject:GameObject, shape:Shape, data:any) {
            this._staticBody.addBody(gameObject, shape, data);
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

        private _getMaterial(obj:GameObject) {
            return this._materialList.getMaterial(obj);
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
    }
}

