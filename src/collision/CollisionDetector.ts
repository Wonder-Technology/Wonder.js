module wd{
    export class CollisionDetector{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        private _lastCollideObjects:wdCb.Collection<GameObject> = null;
        private _collisionTable:wdCb.Hash<wdCb.Collection<GameObject>> = wdCb.Hash.create<wdCb.Collection<GameObject>>();

        //todo optimize collision
        public detect(scene:GameObjectScene){
            //todo optimize:use worker
            var checkTargetList = scene.filter((entityObject:GameObject) => {
                    return entityObject.hasComponent(Collider) || JudgeUtils.isSpacePartitionObject(entityObject);
                }),
                self = this;

            this._clearCollisionTable();

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

                        sourceObject.addTag(<any>ECollisionTag.COLLIDED);
                        self._lastCollideObjects = targetCollideObjects;
                    }
                    else{
                        if(self._isCollisionEnd(sourceObject)){
                            sourceObject.execScript("onCollisionEnd");
                            self._triggerCollisionEventOfCollideObjectWhichHasRigidBody(self._lastCollideObjects, sourceObject, ["onCollisionEnd"]);
                        }

                        sourceObject.removeTag(<any>ECollisionTag.COLLIDED);
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

             if(JudgeUtils.isSpacePartitionObject(sourceObject)){
                 checkTargetList.forEach((targetObject:GameObject) => {
                     if(JudgeUtils.isSelf(sourceObject, targetObject)){
                         return;
                     }

                     if(JudgeUtils.isSpacePartitionObject(targetObject)){
                         self._getCollideObjectsWithSpacePartition(targetObject.getSpacePartition(), sourceObject.getSpacePartition(), targetCollideObjects, sourceCollideObjects);
                     }
                     else{
                         self._getCollideObjectsWithSpacePartition(targetObject, sourceObject.getSpacePartition(), targetCollideObjects, sourceCollideObjects);
                     }
                 });

                 this._recordCollisionTargets(targetCollideObjects, sourceCollideObjects);

                 return {
                     targetCollideObjects:targetCollideObjects.removeRepeatItems(),
                     sourceCollideObjects:sourceCollideObjects.removeRepeatItems()
                 }
             }

            sourceCollider = sourceObject.getComponent<Collider>(Collider);

            checkTargetList.forEach((targetObject:GameObject) => {
                if(JudgeUtils.isSelf(sourceObject, targetObject)){
                    return;
                }

                if(JudgeUtils.isSpacePartitionObject(targetObject)){
                    self._getCollideObjectsWithSpacePartition(targetObject.getSpacePartition(), sourceCollider, sourceObject, targetCollideObjects, sourceCollideObjects);
                }
                else{
                    self._getCollideObjectsByGameObjectToGameObject(sourceObject, sourceCollider, targetObject, targetCollideObjects);
                }
            });

            sourceCollideObjects.addChild(sourceObject);

            if(targetCollideObjects.getCount() > 0){
                this._recordCollisionTargets(targetCollideObjects, sourceCollideObjects);
            }

            return {
                targetCollideObjects:targetCollideObjects.removeRepeatItems(),
                sourceCollideObjects:sourceCollideObjects.removeRepeatItems()
            }
        }

        @require(function(sourceObject:GameObject, sourceCollider:Collider, targetObject:GameObject, targetCollideObjects:wdCb.Collection<GameObject>){
            assert(sourceObject instanceof GameObject && targetObject instanceof GameObject, Log.info.FUNC_SHOULD("sourceObject and targetObject", "be GameObject"));
        })
        private _getCollideObjectsByGameObjectToGameObject(sourceObject:GameObject, sourceCollider:Collider, targetObject:GameObject, targetCollideObjects:wdCb.Collection<GameObject>){
            if(this._isTargetCollidedWithSourceInCurrentFrame(sourceObject, targetObject)){
                targetCollideObjects.addChild(targetObject);
            }
            else if(
                !(this._isNotTransform(sourceObject) && this._isNotTransform(targetObject) && !sourceObject.hasTag(<any>ECollisionTag.COLLIDED))
                && sourceCollider.isCollide(targetObject)
            ){
                targetCollideObjects.addChild(targetObject);
            }
        }

        private _clearCollisionTable(){
            this._collisionTable.removeAllChildren();
        }

        private _isTargetCollidedWithSourceInCurrentFrame(sourceObject:GameObject, targetObject:GameObject){
            var targetCollideObjects = this._collisionTable.getChild(String(targetObject.uid));

            if(!targetCollideObjects) {
                return false;
            }

            return targetCollideObjects.hasChild((targetCollideObject:GameObject) => {
                return JudgeUtils.isEqual(targetCollideObject, sourceObject);
            });
        }

        private _recordCollisionTargets(targetCollideObjects:wdCb.Collection<GameObject>, sourceCollideObjects:wdCb.Collection<GameObject>){
            var table = this._collisionTable;

            sourceCollideObjects.forEach((sourceObject:GameObject) => {
                targetCollideObjects.forEach((targetObject:GameObject) => {
                    table.appendChild(String(sourceObject.uid), targetObject);
                });
            });
        }

        private _getCollideObjectsWithSpacePartition(targetObject:GameObject, sourceSpacePartition:SpacePartition, targetCollideObjects:wdCb.Collection<GameObject>, sourceCollideObjects:wdCb.Collection<GameObject>);
        private _getCollideObjectsWithSpacePartition(targetSpacePartition:SpacePartition, sourceSpacePartition:SpacePartition, targetCollideObjects:wdCb.Collection<GameObject>, sourceCollideObjects:wdCb.Collection<GameObject>);

        private _getCollideObjectsWithSpacePartition(targetSpacePartition:SpacePartition, sourceCollider:Collider, sourceObject:GameObject, targetCollideObjects:wdCb.Collection<GameObject>, sourceCollideObjects:wdCb.Collection<GameObject>);

        private _getCollideObjectsWithSpacePartition(...args) {
            if(args.length === 4){
                if(args[0] instanceof GameObject && args[1] instanceof SpacePartition){
                    let targetObject:GameObject = args[0],
                        sourceSpacePartition:SpacePartition = args[1],
                        targetCollideObjects:wdCb.Collection<GameObject> = args[2],
                        sourceCollideObjects:wdCb.Collection<GameObject> = args[3],
                        targetCollider = targetObject.getComponent<Collider>(Collider),
                        self = this;

                    sourceSpacePartition.getCollideObjects(targetCollider.shape).forEach((sourceObject:GameObject) => {
                        self._getCollideObjectsByGameObjectToGameObject(targetObject, targetCollider, sourceObject, sourceCollideObjects);
                    });

                    if(sourceCollideObjects.getCount() > 0){
                        targetCollideObjects.addChild(targetObject);
                    }

                    sourceCollideObjects.removeAllChildren();
                    sourceCollideObjects.addChildren(sourceSpacePartition.getChildren());
                }
                else if(args[0] instanceof SpacePartition && args[1] instanceof SpacePartition){
                    let targetSpacePartition:SpacePartition = args[0],
                        sourceSpacePartition:SpacePartition = args[1],
                        targetCollideObjects:wdCb.Collection<GameObject> = args[2],
                        sourceCollideObjects:wdCb.Collection<GameObject> = args[3],
                        self = this;

                    sourceSpacePartition.getChildren()
                        .forEach((sourceObject:GameObject) => {
                            var sourceCollider = sourceObject.getComponent<Collider>(Collider);

                            self._getCollideObjectsWithSpacePartition(targetSpacePartition, sourceCollider, sourceObject, targetCollideObjects, sourceCollideObjects);
                        });
                }
            }
            else if(args.length === 5){
                let targetSpacePartition:SpacePartition = args[0],
                    sourceCollider:Collider = args[1],
                    sourceObject = args[2],
                    targetCollideObjects:wdCb.Collection<GameObject> = args[3],
                    sourceCollideObjects:wdCb.Collection<GameObject> = args[4],
                    self = this;

                if(!sourceCollider){
                    return;
                }

                targetSpacePartition.getCollideObjects(sourceCollider.shape).forEach((targetObject:GameObject) => {
                    self._getCollideObjectsByGameObjectToGameObject(sourceObject, sourceCollider, targetObject, targetCollideObjects);
                });

                sourceCollideObjects.addChild(sourceObject);

                return;
            }
        }

        private _isCollisionStart(entityObject:GameObject){
            return !entityObject.hasTag(<any>ECollisionTag.COLLIDED);
        }

        private _isCollisionEnd(entityObject:GameObject){
            return entityObject.hasTag(<any>ECollisionTag.COLLIDED);
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

        private _isNotTransform(entityObject:GameObject){
            return !entityObject.transform.isTransform;
        }
    }

    enum ECollisionTag{
        COLLIDED = <any>"COLLIDED"
    }
}
