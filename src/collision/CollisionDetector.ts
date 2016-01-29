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
                    return entityObject.hasComponent(Collider) || JudgeUtils.isOctreeObject(entityObject);
                }),
                self = this;

            checkTargetList.forEach((entityObject:GameObject) => {
                if(entityObject.hasComponent(RigidBody)){
                    return;
                }

                var {targetCollideObjects, sourceCollideObjects} = self._getCollideObjects(entityObject, checkTargetList);

                sourceCollideObjects.forEach((sourceObject:GameObject) => {
                    if(targetCollideObjects.getCount() > 0){
                        if(self._isCollisionStart(sourceObject)){

                            sourceObject.execScript("onCollisionStart", targetCollideObjects);
                            sourceObject.execScript("onContact", targetCollideObjects);

                            self._triggerCollisionEventOfCollideObjectWhichHasRigidBody(targetCollideObjects, sourceObject, ["onCollisionStart", "onContact"]);
                        }
                        else{
                            sourceObject.execScript("onContact", targetCollideObjects);
                            self._triggerCollisionEventOfCollideObjectWhichHasRigidBody(targetCollideObjects, sourceObject, ["onContact"]);
                        }

                        sourceObject.addTag("isCollided");
                        self._lastCollideObjects = targetCollideObjects;
                    }
                    else{
                        if(self._isCollisionEnd(sourceObject)){
                            sourceObject.execScript("onCollisionEnd");
                            self._triggerCollisionEventOfCollideObjectWhichHasRigidBody(self._lastCollideObjects, sourceObject, ["onCollisionEnd"]);
                        }

                        sourceObject.removeTag("isCollided");
                    }
                });
            });
        }

        @require(function(sourceObject:GameObject, checkTargetList:wdCb.Collection<GameObject>){
            checkTargetList.forEach((targetObject:GameObject) => {
                assert(targetObject instanceof GameObject, Log.info.FUNC_SHOULD("targetObject", "be GameObject"));
            });
        })
        private _getCollideObjects(sourceObject:GameObject, checkTargetList:wdCb.Collection<GameObject>){
            var targetCollideObjects = wdCb.Collection.create<GameObject>(),
                sourceCollideObjects = wdCb.Collection.create<GameObject>(),
                self = this,
                sourceCollider:Collider = null;


             if(JudgeUtils.isOctreeObject(sourceObject)){
                 checkTargetList.forEach((targetObject:GameObject) => {
                     if(JudgeUtils.isOctreeObject(targetObject)){
                         self._getCollideObjectsWithOctree(targetObject.getOctree(), sourceObject.getOctree(), targetCollideObjects, sourceCollideObjects);
                     }
                     else{
                         self._getCollideObjectsWithOctree(targetObject, sourceObject.getOctree(), targetCollideObjects, sourceCollideObjects);
                     }
                 });

                 return {
                     targetCollideObjects:targetCollideObjects.removeRepeatItems(),
                     sourceCollideObjects:sourceCollideObjects.removeRepeatItems()
                 }
             }

            sourceCollider = sourceObject.getComponent<Collider>(Collider);

            checkTargetList.forEach((targetObject:GameObject) => {

                if(JudgeUtils.isOctreeObject(targetObject)){
                    self._getCollideObjectsWithOctree(targetObject.getOctree(), sourceCollider, sourceObject, targetCollideObjects, sourceCollideObjects);
                }
                else{
                    if(sourceCollider.isCollide(targetObject)){
                        targetCollideObjects.addChild(targetObject);
                    }
                }
            });

            sourceCollideObjects.addChild(sourceObject);

            return {
                targetCollideObjects:targetCollideObjects.removeRepeatItems(),
                sourceCollideObjects:sourceCollideObjects.removeRepeatItems()
            }
        }


        private _getCollideObjectsWithOctree(targetObject:GameObject, sourceOctree:Octree, targetCollideObjects:wdCb.Collection<GameObject>, sourceCollideObjects:wdCb.Collection<GameObject>);
        private _getCollideObjectsWithOctree(targetOctree:Octree, sourceOctree:Octree, targetCollideObjects:wdCb.Collection<GameObject>, sourceCollideObjects:wdCb.Collection<GameObject>);

        private _getCollideObjectsWithOctree(targetOctree:Octree, sourceCollider:Collider, sourceObject:GameObject, targetCollideObjects:wdCb.Collection<GameObject>, sourceCollideObjects:wdCb.Collection<GameObject>);

        private _getCollideObjectsWithOctree(...args) {
            if(args.length === 4){
                if(args[0] instanceof GameObject && args[1] instanceof Octree){
                    let targetObject:GameObject = args[0],
                        sourceOctree:Octree = args[1],
                        targetCollideObjects:wdCb.Collection<GameObject> = args[2],
                        sourceCollideObjects:wdCb.Collection<GameObject> = args[3],
                        targetCollider = targetObject.getComponent<Collider>(Collider),
                        isCollide = false;


                    sourceCollideObjects.addChildren(sourceOctree.getChildren());

                    sourceOctree.getCollideObjects(targetCollider.shape).forEach((sourceObject:GameObject) => {
                        if (targetCollider.isCollide(sourceObject)) {
                            isCollide = true;
                        }
                    });

                    if(isCollide){
                        targetCollideObjects.addChild(targetObject);
                    }
                }
                else if(args[0] instanceof Octree && args[1] instanceof Octree){
                    let targetOctree:Octree = args[0],
                        sourceOctree:Octree = args[1],
                        targetCollideObjects:wdCb.Collection<GameObject> = args[2],
                        sourceCollideObjects:wdCb.Collection<GameObject> = args[3],
                        self = this;

                    if(JudgeUtils.isSelf(targetOctree, sourceOctree)){
                        return;
                    }

                    sourceOctree.getChildren()
                        .forEach((sourceObject:GameObject) => {
                            var sourceCollider = sourceObject.getComponent<Collider>(Collider);

                            self._getCollideObjectsWithOctree(targetOctree, sourceCollider, sourceObject, targetCollideObjects, sourceCollideObjects);
                        });
                }
            }
            else if(args.length === 5){
                let targetOctree:Octree = args[0],
                    sourceCollider:Collider = args[1],
                    sourceObject = args[2],
                    targetCollideObjects:wdCb.Collection<GameObject> = args[3],
                    sourceCollideObjects:wdCb.Collection<GameObject> = args[4];

                if(!sourceCollider){
                    return;
                }

                targetOctree.getCollideObjects(sourceCollider.shape).forEach((targetObject:GameObject) => {
                    if (sourceCollider.isCollide(targetObject)) {
                        targetCollideObjects.addChild(targetObject);
                    }
                });

                sourceCollideObjects.addChild(sourceObject);

                return;
            }
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
