/// <reference path="../filePath.d.ts"/>
module wd{
    export class CollisionDetector{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        private _lastCollideObjects:wdCb.Collection<GameObject> = null;

        public detect(scene:Scene){
            //todo optimize:use scene graph to only get needChecked gameObjects
            //todo optimize:use worker
            var checkTargetList = scene.filter((gameObject:GameObject) => {
                    //return gameObject.hasComponent(Collider) && !gameObject.hasComponent(RigidBody);
                    return gameObject.hasComponent(Collider);
                }),
                self = this;

            checkTargetList.forEach((gameObject:GameObject) => {
                var collideObjects = null;

                if(gameObject.hasComponent(RigidBody)){
                    return;
                }

                collideObjects = gameObject.getComponent<Collider>(Collider).getCollideObjects(checkTargetList);

                if(collideObjects.getCount() > 0){
                    if(self._isCollisionStart(gameObject)){

                        gameObject.execScript("onCollisionStart", collideObjects);
                        gameObject.execScript("onContact", collideObjects);

                        self._triggerCollisionEventOfCollideObjectWhichHasRigidBody(collideObjects, gameObject, ["onCollisionStart", "onContact"]);
                    }
                    else{
                        gameObject.execScript("onContact", collideObjects);
                        self._triggerCollisionEventOfCollideObjectWhichHasRigidBody(collideObjects, gameObject, ["onContact"]);
                    }

                    gameObject.isCollided = true;
                    self._lastCollideObjects = collideObjects;
                }
                else{
                    if(self._isCollisionEnd(gameObject)){
                        gameObject.execScript("onCollisionEnd");
                        self._triggerCollisionEventOfCollideObjectWhichHasRigidBody(self._lastCollideObjects, gameObject, ["onCollisionEnd"]);
                    }

                    gameObject.isCollided = false;
                }
            });
        }

        private _isCollisionStart(gameObject:GameObject){
            return !gameObject.isCollided;
        }

        private _isCollisionEnd(gameObject:GameObject){
            return gameObject.isCollided;
        }

        private _triggerCollisionEventOfCollideObjectWhichHasRigidBody(collideObjects:wdCb.Collection<GameObject>, currentGameObject:GameObject, eventList:Array<string>){
            collideObjects.filter((gameObject:GameObject) => {
                    return gameObject.hasComponent(RigidBody);
                })
                .forEach((collideObject:GameObject) => {
                    for(let eventName of eventList){
                        collideObject.execScript(eventName, wdCb.Collection.create([currentGameObject]));
                    }
                });
        }
    }
}
