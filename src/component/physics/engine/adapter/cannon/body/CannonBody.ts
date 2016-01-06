module wd {
    export abstract class CannonBody {
        constructor(world:CANNON.World, gameObjectDataList:CannonGameObjectDataList, materialList:CannonMaterialList) {
            this.world = world;
            this.gameObjectList = gameObjectDataList;
            this.materialList = materialList;
        }

        protected world:CANNON.World = null;
        protected materialList:CannonMaterialList = null;
        protected gameObjectList:CannonGameObjectDataList = null;

        public addBody(entityObject:GameObject, data:any) {
            var body = this.createBody(data);

            if(data.children.getCount() > 0){
                this._addCompounds(entityObject, data.children, body);
            }
            else{
                body.addShape(this._createShape(entityObject.getComponent<Collider>(Collider).shape));
            }

            this.afterAddShape(body, data);

            body.material = this._createMaterial(entityObject, data.friction, data.restitution);
            body.position = CannonUtils.convertToCannonVector3(data.position);
            body.quaternion = CannonUtils.convertToCannonQuaternion(data.rotation);

            this.world.addBody(body);



            this.gameObjectList.add(entityObject, body);

            this._bindCollideEvent(body, data.onCollisionStart, data.onContact, data.onCollisionEnd);

            return body;
        }

        protected abstract createBody(data:any):CANNON.Body;

        @virtual
        protected afterAddShape(body:CANNON.Body, data:any):void{
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

        private _bindCollideEvent(targetBody:CANNON.Body, onCollisionStart:(collideObject:GameObject) => void, onContact:(collideObject:GameObject) => void, onCollisionEnd:(collideObject:GameObject) => void) {
            var self = this;

            targetBody.addEventListener("collide", (e) => {
                let entityObject = self.gameObjectList.findGameObjectByBody(e.body),
                    collideObject = null;

                if (!entityObject) {
                    return;
                }

                collideObject = entityObject;

                onCollisionStart(collideObject);
                onContact(collideObject);
                onCollisionEnd(collideObject);
            });
        }

        private _createMaterial(entityObject:GameObject, friction:number, restitution:number) {
            var material = null,
                currentMaterial = null;

            material = this._getMaterial(entityObject);

            if (material) {
                return material;
            }

            currentMaterial = new CANNON.Material("material");

            this._addMaterial(entityObject, currentMaterial, friction, restitution);

            return currentMaterial;
        }

        private _getMaterial(obj:GameObject) {
            return this.materialList.findMaterialByGameObject(obj);
        }

        private _addMaterial(entityObject:GameObject, currentMaterial:CANNON.Material, friction:number, restitution:number) {
            this.materialList.add(entityObject, currentMaterial);
            this.materialList.addContactMaterial(this.world, currentMaterial, friction, restitution);
        }

        @require(function (entityObject:GameObject, children:wdCb.Collection<GameObject>, body:CANNON.Body) {
            children.forEach((child:GameObject) => {
                assert(!!child.getComponent(Collider), Log.info.FUNC_MUST_DEFINE("collider component"));
                assert(!!child.getComponent<Collider>(Collider).shape, Log.info.FUNC_SHOULD("create collider.shape"));
            });
        })
        private _addCompounds(entityObject:GameObject, children:wdCb.Collection<GameObject>, body:CANNON.Body){
            var position = entityObject.transform.position,
                rotation = entityObject.transform.rotation;

            children.forEach((child:GameObject) => {
                body.addShape(
                    this._createShape(child.getComponent<Collider>(Collider).shape),
                    CannonUtils.convertToCannonVector3(child.transform.position.copy().sub(position)),
                    CannonUtils.convertToCannonQuaternion(child.transform.rotation.copy().sub(rotation))
                );
            }, this);
        }
    }
}

