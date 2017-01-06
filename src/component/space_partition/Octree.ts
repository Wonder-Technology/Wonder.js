module wd {
    export class Octree extends SpacePartition {
        public static create() {
        	var obj = new this();

        	return obj;
        }

        @cloneAttributeAsBasicType()
        public maxDepth:number = 2;
        @cloneAttributeAsBasicType()
        public maxNodeCapacity:number = 64;

        private _root:OctreeNode = null;
        private _selectionList:wdCb.Collection<GameObject> = wdCb.Collection.create<GameObject>();
        private _renderListCache:wdCb.Collection<GameObject> = null;

        @require(function(){
            assert(JudgeUtils.isEqual(this.entityObject.parent, Director.getInstance().scene) && Director.getInstance().scene.gameObjectScene.hasChild(this.entityObject), Log.info.FUNC_SHOULD("be added to the one which is the firstLevel child of gameObjectScene"));
        })
        public init(){
            super.init();
        }

        public update(elapsed:number):void {
            this._renderListCache = this._getRenderListForCurrentLoop();
        }

        @ensure(function(renderList:wdCb.Collection<GameObject>){
            assert(!!renderList && renderList instanceof wdCb.Collection, Log.info.FUNC_NOT_EXIST("renderList"));
        })
        public getRenderList(){
            return this._renderListCache;
        }

        public build() {
            var gameObjectList:wdCb.Collection<GameObject> = this.getChildren(),
                currentDepth = 0,
                maxNodeCapacity = this.maxNodeCapacity,
                maxDepth = this.maxDepth;

            var buildTree = (worldMin:Vector3, worldMax:Vector3, currentDepth, gameObjectList:wdCb.Collection<GameObject>, parentNode:OctreeNode) => {
                var halfExtends = new Vector3((worldMax.x - worldMin.x) / 2, (worldMax.y - worldMin.y) / 2, (worldMax.z - worldMin.z) / 2);

                for (let x = 0; x < 2; x++) {
                    for (let y = 0; y < 2; y++) {
                        for (let z = 0; z < 2; z++) {
                            let localMin = worldMin.clone().add(halfExtends.clone().scale(x, y, z)),
                                localMax = worldMin.clone().add(halfExtends.clone().scale(x + 1, y + 1, z + 1)),
                                node = OctreeNode.create(localMin, localMax, maxNodeCapacity, currentDepth + 1, maxDepth);

                            node.addGameObjects(gameObjectList);

                            if (node.gameObjectCount > maxNodeCapacity && currentDepth < maxDepth) {
                                buildTree(localMin, localMax, currentDepth + 1, gameObjectList, node);
                            }

                            parentNode.addNode(node);
                        }
                    }
                }
            }

            this._updateColliderForFirstCheck(gameObjectList);

            var { worldMin, worldMax } = this._getWorldExtends(gameObjectList);

            this._root = OctreeNode.create(worldMin, worldMax, maxNodeCapacity, currentDepth + 1, maxDepth);

            buildTree(worldMin, worldMax, currentDepth, gameObjectList, this._root);
        }

        @require(function(){
            assert(!!Director.getInstance().scene.currentCamera.getComponent(CameraController), Log.info.FUNC_SHOULD("contain CameraController component"));
        })
        public getRenderListByFrustumCull(){
            var currentCamera = Director.getInstance().scene.currentCamera;

            if(!currentCamera){
                return wdCb.Collection.create<GameObject>();
            }

            return this._visitRoot("findAndAddToRenderList", [currentCamera.getComponent(CameraController).getPlanes(), this._selectionList]);
        }

        @require(function(e:PointEvent){
            assert(!!Director.getInstance().scene.currentCamera.getComponent(CameraController), Log.info.FUNC_SHOULD("contain CameraController component"));
        })
        public getIntersectListWithRay(e:PointEvent){
            var locationInView = e.locationInView;

            return this._visitRoot("findAndAddToIntersectList", [Director.getInstance().scene.currentCamera.getComponent(CameraController).createRay(locationInView.x, locationInView.y), this._selectionList]);
        }

        public getCollideObjects(shape:Shape){
            return this._visitRoot("findAndAddToCollideList", [shape, this._selectionList]);
        }

        public getChildren() {
            return this.entityObject.getChildren();
        }

        private _visitRoot(method:string, args:Array<any>):any{
            this._selectionList.removeAllChildren();

            this._root.nodeList.forEach((topNode:OctreeNode) => {
                topNode[method].apply(topNode, args);
            });

            this._selectionList = this._selectionList.removeRepeatItems();

            return this._selectionList;
        }

        private _updateColliderForFirstCheck(gameObjectList:wdCb.Collection<GameObject>) {
            var collider:BoxColliderForFirstCheck = null,
                self = this;

            gameObjectList.forEach((gameObject:GameObject) => {
                if (!gameObject.hasComponent(ColliderForFirstCheck)) {
                    collider = self._createCollider();

                    gameObject.addComponent(collider);

                    collider.init();
                }
                else{
                    collider = gameObject.getComponent<BoxColliderForFirstCheck>(BoxColliderForFirstCheck);
                }

                collider.update(null);
            });
        }

        private _getWorldExtends(gameObjectList:wdCb.Collection<GameObject>):{worldMin:Vector3, worldMax:Vector3} {
            var worldMin = Vector3.create(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE),
                worldMax = Vector3.create(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE),
                self = this;

            gameObjectList.forEach((gameObject:GameObject) => {
                let min = null,
                    max = null,
                    collider:BoxColliderForFirstCheck = null,
                    shape:AABBShape = null;

                collider = gameObject.getComponent<BoxColliderForFirstCheck>(BoxColliderForFirstCheck);

                shape = <AABBShape>collider.shape;
                min = shape.getMin();
                max = shape.getMax();

                self._checkExtends(min, worldMin, worldMax);
                self._checkExtends(max, worldMin, worldMax);
            });

            return {
                worldMin: worldMin,
                worldMax: worldMax
            };
        }

        private _createCollider(){
            return BoxColliderForFirstCheck.create();
        }

        private _checkExtends(v: Vector3, min: Vector3, max: Vector3): void {
            if (v.x < min.x){
                min.x = v.x;
            }

            if (v.y < min.y){
                min.y = v.y;
            }

            if (v.z < min.z){
                min.z = v.z;
            }

            if (v.x > max.x){
                max.x = v.x;
            }

            if (v.y > max.y){
                max.y = v.y;
            }

            if (v.z > max.z){
                max.z = v.z;
            }
        }

        @require(function(sourceObject:GameObject, sourceInstanceComponent:OneToOneSourceInstance){
            assert(sourceInstanceComponent.hasToRenderInstance(), Log.info.FUNC_SHOULD("top OneToOneSourceInstance", "has to render instance"));
        })
        private _setToRenderInstanceListOfChildren(sourceObject:GameObject, sourceInstanceComponent:OneToOneSourceInstance){
            var set = (sourceObject:GameObject, sourceInstanceComponent:OneToOneSourceInstance) => {
                sourceObject.forEach((childSource:GameObject, index:number) => {
                    var childSourceInstance:OneToOneSourceInstance = childSource.getComponent<OneToOneSourceInstance>(OneToOneSourceInstance);

                    sourceInstanceComponent.forEachToRenderInstanceList((toRenderInstance:GameObject) => {
                        childSourceInstance.addToRenderIntance(toRenderInstance.getChild(index));

                    });
                    set(childSource, childSourceInstance);
                })
            };

            set(sourceObject, sourceInstanceComponent);
        }

        @require(function(self:GameObject, instanceComponent:OneToOneSourceInstance){
            assert(instanceComponent instanceof OneToOneSourceInstance, Log.info.FUNC_ONLY("OneToOneSourceInstance has toRenderList"));

            instanceComponent.forEachToRenderInstanceList((instance:GameObject) => {
                assert(!JudgeUtils.isEqual(instance, self), Log.info.FUNC_SHOULD_NOT("toRenderInstanceList", "contain self"));
            })
        })
        private _addSelfToToRenderInstanceList(self:GameObject, instanceComponent:OneToOneSourceInstance){
            instanceComponent.addToRenderIntance(self);
        }

        private _getRenderListForCurrentLoop(){
            var renderListByFrustumCull = this.getRenderListByFrustumCull(),
                resultRenderList = wdCb.Collection.create<GameObject>(),
                instanceSourceMap = wdCb.Hash.create<GameObject>();

            renderListByFrustumCull.forEach((gameObject:GameObject) => {
                if(!InstanceUtils.isInstance(gameObject)
                    || InstanceUtils.isOneToManySourceInstance(gameObject)
                ){
                    resultRenderList.addChild(gameObject);

                    return;
                }

                if(InstanceUtils.isOneToOneSourceInstance(gameObject)){
                    let instanceComponent:OneToOneSourceInstance = gameObject.getComponent<OneToOneSourceInstance>(OneToOneSourceInstance);

                    this._addSelfToToRenderInstanceList(gameObject, instanceComponent);

                    instanceSourceMap.addChild(String(gameObject.uid), gameObject);

                    return;
                }

                let sourceObject:GameObject = (gameObject.getComponent<ObjectInstance>(ObjectInstance)).sourceObject,
                    sourceInstanceComponent:OneToOneSourceInstance = sourceObject.getComponent<OneToOneSourceInstance>(OneToOneSourceInstance);

                this._addSelfToToRenderInstanceList(gameObject, sourceInstanceComponent);

                instanceSourceMap.addChild(String(sourceObject.uid), sourceObject);
            }, this);

            instanceSourceMap.forEach((sourceObject:GameObject, uid:string) => {
                var sourceInstanceComponent:OneToOneSourceInstance = sourceObject.getComponent<OneToOneSourceInstance>(OneToOneSourceInstance);

                //todo optimize: if toRenderList == defaultToRenderList, not set

                this._setToRenderInstanceListOfChildren(sourceObject, sourceInstanceComponent);

                resultRenderList.addChild(sourceObject);
            }, this);

            return resultRenderList;
        }
    }
}