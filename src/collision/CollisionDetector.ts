module wd{
    export class CollisionDetector{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        private _lastCollideObjects:wdCb.Collection<GameObject> = null;

        public detect(scene:GameObjectScene){
            //todo optimize:use scene graph to only get needChecked gameObjects
            //todo optimize:use worker
            var checkTargetList = scene.filter((entityObject:GameObject) => {
                    //return entityObject.hasComponent(Collider) && !entityObject.hasComponent(RigidBody);
                    return entityObject.hasComponent(Collider);
                }),
                self = this;

            checkTargetList.forEach((entityObject:GameObject) => {
                var collideObjects = null;

                if(entityObject.hasComponent(RigidBody)){
                    return;
                }

                collideObjects = entityObject.getComponent<Collider>(Collider).getCollideObjects(checkTargetList);

                if(collideObjects.getCount() > 0){
                    if(self._isCollisionStart(entityObject)){

                        entityObject.execScript("onCollisionStart", collideObjects);
                        entityObject.execScript("onContact", collideObjects);

                        self._triggerCollisionEventOfCollideObjectWhichHasRigidBody(collideObjects, entityObject, ["onCollisionStart", "onContact"]);
                    }
                    else{
                        entityObject.execScript("onContact", collideObjects);
                        self._triggerCollisionEventOfCollideObjectWhichHasRigidBody(collideObjects, entityObject, ["onContact"]);
                    }

                    entityObject.addTag("isCollided");
                    self._lastCollideObjects = collideObjects;
                }
                else{
                    if(self._isCollisionEnd(entityObject)){
                        entityObject.execScript("onCollisionEnd");
                        self._triggerCollisionEventOfCollideObjectWhichHasRigidBody(self._lastCollideObjects, entityObject, ["onCollisionEnd"]);
                    }

                    entityObject.removeTag("isCollided");
                }
            });
        }

        private _isCollisionStart(entityObject:GameObject){
            return !entityObject.hasTag("isCollided");
        }

        private _isCollisionEnd(entityObject:GameObject){
            return entityObject.hasTag("isCollided");
        }

        private _triggerCollisionEventOfCollideObjectWhichHasRigidBody(collideObjects:wdCb.Collection<GameObject>, currentGameObject:GameObject, eventList:Array<string>){
            collideObjects.filter((entityObject:GameObject) => {
                    return entityObject.hasComponent(RigidBody);
                })
                .forEach((collideObject:GameObject) => {
                    for(let eventName of eventList){
                        collideObject.execScript(eventName, wdCb.Collection.create([currentGameObject]));
                    }
                });
        }
    }
}
