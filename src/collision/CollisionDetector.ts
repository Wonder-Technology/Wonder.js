module wd{
    export class CollisionDetector{
        public static create() {
            var obj = new this();

            return obj;
        }

        private _collisionTable:wdCb.Hash<CollisionDataInTable> = wdCb.Hash.create<CollisionDataInTable>();
        private _lastCollisionTable:wdCb.Hash<CollisionDataInTable> = wdCb.Hash.create<CollisionDataInTable>();

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

                self._recordCollideObjects(entityObject, checkTargetList);
            });

            this._triggerCollisionEvent();
        }

        @require(function(sourceObject:GameObject, checkTargetList:wdCb.Collection<GameObject>){
            checkTargetList.forEach((targetObject:GameObject) => {
                assert(targetObject instanceof GameObject, Log.info.FUNC_SHOULD("targetObject", "be GameObject"));
            });
        })
        private _recordCollideObjects(sourceObject:GameObject, checkTargetList:wdCb.Collection<GameObject>){
            var self = this;

            if(JudgeUtils.isSpacePartitionObject(sourceObject)){
                let sourceSpacePartition:SpacePartition = sourceObject.getSpacePartition();

                checkTargetList.forEach((targetObject:GameObject) => {
                    if(JudgeUtils.isSelf(sourceObject, targetObject)){
                        return;
                    }

                    if(JudgeUtils.isSpacePartitionObject(targetObject)){
                        self._handleCollisionBetweenSpacePartitionAndSpacePartition(targetObject.getSpacePartition(), sourceSpacePartition);
                    }
                    else{
                        self._handleCollisionBetweenGameObjectAndSpacePartition(targetObject, sourceSpacePartition);
                    }
                });

                return;
            }

            checkTargetList.forEach((targetObject:GameObject) => {
                if(JudgeUtils.isSelf(sourceObject, targetObject)){
                    return;
                }

                if(JudgeUtils.isSpacePartitionObject(targetObject)){
                    self._handleCollisionBetweenGameObjectAndSpacePartition(sourceObject, targetObject.getSpacePartition());
                }
                else{
                    self._handleCollisionBetweenGameObjectAndGameObject(sourceObject, targetObject);
                }
            });
        }

        @require(function(sourceObject:GameObject, sourceCollider:Collider, targetObject:GameObject){
            assert(sourceObject instanceof GameObject && targetObject instanceof GameObject, Log.info.FUNC_SHOULD("sourceObject and targetObject", "be GameObject"));
        })
        private _isGameObjectCollideWithGameObject(sourceObject:GameObject, sourceCollider:Collider, targetObject:GameObject){
            return !(this._isNotTransform(sourceObject) && this._isNotTransform(targetObject) && !sourceObject.hasTag(<any>ECollisionTag.COLLIDED))
                && sourceCollider.isCollide(targetObject);
        }

        private _clearCollisionTable(){
            this._collisionTable.removeAllChildren();
        }

        private _isCollidedInTable(sourceObject:GameObject, targetObject:GameObject){
            var table = this._collisionTable,
                sourceKey = String(sourceObject.uid),
                targetKey = String(targetObject.uid);

            return table.hasChild(sourceKey) && table.getChild(sourceKey).targetObjectMap.hasChild(targetKey);
        }

        private _recordToTable(sourceObject:GameObject, targetObject:GameObject){
            var table = this._collisionTable,
                sourceKey = String(sourceObject.uid),
                targetKey = String(targetObject.uid);

            if(!table.hasChild(sourceKey)){
                let targetObjectMap = wdCb.Hash.create();

                targetObjectMap.addChild(targetKey, targetObject);

                table.addChild(
                    sourceKey,
                    {
                        sourceObject: sourceObject,
                        targetObjectMap: targetObjectMap
                    }
                );

                return;
            }

            table.getChild(sourceKey).targetObjectMap.addChild(targetKey, targetObject);
        }

        private _handleCollisionBetweenGameObjectAndSpacePartition(gameObject:GameObject, spacePartition:SpacePartition) {
            var gameObjectCollider = gameObject.getComponent<Collider>(Collider),
                self = this;

            spacePartition.getCollideObjects(gameObjectCollider.shape).forEach((entityObject:GameObject) => {
                if(self._isCollidedInTable(entityObject, gameObject)){
                    return;
                }

                if(self._isGameObjectCollideWithGameObject(entityObject, entityObject.getComponent<Collider>(Collider), gameObject)){
                    self._recordToTable(entityObject, gameObject);
                    self._recordToTable(gameObject, entityObject);
                }
            });
        }

        private _handleCollisionBetweenSpacePartitionAndSpacePartition(spacePartitionA:SpacePartition, spacePartitionB:SpacePartition){
            spacePartitionA.getChildren()
                .forEach((sourceObject:GameObject) => {
                    this._handleCollisionBetweenGameObjectAndSpacePartition(sourceObject, spacePartitionB);
                }, this);
        }

        private _handleCollisionBetweenGameObjectAndGameObject(gameObjectA:GameObject, gameObjectB:GameObject) {
            if(this._isCollidedInTable(gameObjectA, gameObjectB)){
                return;
            }

            if(this._isGameObjectCollideWithGameObject(gameObjectA, gameObjectA.getComponent<Collider>(Collider), gameObjectB)){
                this._recordToTable(gameObjectA, gameObjectB);
                this._recordToTable(gameObjectB, gameObjectA);
            }
        }

        private _isCollisionStart(entityObject:GameObject){
            return !entityObject.hasTag(<any>ECollisionTag.COLLIDED);
        }

        private _triggerCollisionEventOfCollideObjectWhichHasRigidBody(collideObjects:wdCb.Collection<GameObject>, currentGameObject:GameObject, eventList:Array<string>){
            if(!currentGameObject.hasComponent(RigidBody)){
                return;
            }

            collideObjects.filter((entityObject:GameObject) => {
                    return entityObject.hasComponent(RigidBody);
                })
                .forEach((collideObject:GameObject) => {
                    for(let eventName of eventList){
                        collideObject.execScript(eventName, wdCb.Collection.create([currentGameObject]));
                    }
                });
        }

        private _triggerCollisionEvent(){
            this._collisionTable.forEach(({sourceObject, targetObjectMap}) => {
                var targetObjects:wdCb.Collection<GameObject> = targetObjectMap.toCollection();

                if(this._isCollisionStart(sourceObject)){

                    sourceObject.execScript("onCollisionStart", targetObjects);
                    sourceObject.execScript("onContact", targetObjects);

                    this._triggerCollisionEventOfCollideObjectWhichHasRigidBody(targetObjects, sourceObject, ["onCollisionStart", "onContact"]);
                }
                else{
                    sourceObject.execScript("onContact", targetObjects);
                    this._triggerCollisionEventOfCollideObjectWhichHasRigidBody(targetObjects, sourceObject, ["onContact"]);
                }

                if(!sourceObject.hasTag(<any>ECollisionTag.COLLIDED)){
                    sourceObject.addTag(<any>ECollisionTag.COLLIDED);
                }
            }, this);

            this._triggerCollisionEndEvent();

            this._lastCollisionTable = this._collisionTable.clone();
        }

        private _triggerCollisionEndEvent(){
            var table = this._collisionTable;

            this._lastCollisionTable.forEach(({sourceObject, targetObjectMap}) => {
                if(!table.hasChild(String(sourceObject.uid))){
                    sourceObject.execScript("onCollisionEnd");
                    this._triggerCollisionEventOfCollideObjectWhichHasRigidBody(targetObjectMap.toCollection(), sourceObject, ["onCollisionEnd"]);

                    sourceObject.removeTag(<any>ECollisionTag.COLLIDED);
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

    export type CollisionDataInTable = {
        sourceObject:GameObject;
        targetObjectMap:wdCb.Hash<GameObject>;
    }
}
