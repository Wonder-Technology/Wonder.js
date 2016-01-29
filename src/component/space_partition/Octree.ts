module wd {
    export class Octree extends Component {
        public static create() {
        	var obj = new this();

        	return obj;
        }

        public maxDepth:number = 2;
        public maxNodeCapacity:number = 64;

        private _root:OctreeNode = null;
        private _selectionList:wdCb.Collection<GameObject> = wdCb.Collection.create<GameObject>();

        @require(function(entityObject:GameObject){
            assert(entityObject instanceof GameObject, Log.info.FUNC_SHOULD("Octree component", "add to GameObject"));
        })
        public addToObject(entityObject:GameObject){
            super.addToObject(entityObject);
        }

        public build() {
            var entityObjectList:wdCb.Collection<GameObject> = this.getChildren(),
                currentDepth = 0,
                maxNodeCapacity = this.maxNodeCapacity,
                maxDepth = this.maxDepth;

            var buildTree = (worldMin:Vector3, worldMax:Vector3, currentDepth, entityObjectList:wdCb.Collection<GameObject>, parentNode:OctreeNode) => {
                var halfExtends = new Vector3((worldMax.x - worldMin.x) / 2, (worldMax.y - worldMin.y) / 2, (worldMax.z - worldMin.z) / 2);

                for (let x = 0; x < 2; x++) {
                    for (let y = 0; y < 2; y++) {
                        for (let z = 0; z < 2; z++) {
                            let localMin = worldMin.copy().add(halfExtends.copy().scale(x, y, z)),
                                localMax = worldMin.copy().add(halfExtends.copy().scale(x + 1, y + 1, z + 1)),
                                node = OctreeNode.create(localMin, localMax, maxNodeCapacity, currentDepth + 1, maxDepth);

                            node.addEntityObjects(entityObjectList);

                            if (node.entityObjectCount > maxNodeCapacity && currentDepth < maxDepth) {
                                buildTree(localMin, localMax, currentDepth + 1, entityObjectList, node);
                            }

                            parentNode.addNode(node);
                        }
                    }
                }
            }

            this._updateColliderForFirstCheck(entityObjectList);

            var { worldMin, worldMax } = this._getWorldExtends(entityObjectList);

            this._root = OctreeNode.create(worldMin, worldMax, maxNodeCapacity, currentDepth + 1, maxDepth);

            buildTree(worldMin, worldMax, currentDepth, entityObjectList, this._root);
        }

        @require(function(){
            assert(!!Director.getInstance().scene.camera.getComponent(CameraController), Log.info.FUNC_SHOULD("contain CameraController component"));
        })
        public getRenderListByFrustumCull(){
            var frustumPlanes = Director.getInstance().scene.camera.getComponent(CameraController).getPlanes();

            return this._visitRoot("findAndAddToRenderList", [frustumPlanes, this._selectionList]);
        }

        @require(function(){
            assert(!!Director.getInstance().scene.camera.getComponent(CameraController), Log.info.FUNC_SHOULD("contain CameraController component"));
        })
        public getIntersectListWithRay(e:MouseEvent){
            var locationInView = e.locationInView;

            return this._visitRoot("findAndAddToIntersectList", [Director.getInstance().scene.camera.getComponent(CameraController).createRay(locationInView.x, locationInView.y), this._selectionList]);
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
            })

            this._selectionList = this._selectionList.removeRepeatItems();

            return this._selectionList;
        }

        private _updateColliderForFirstCheck(entityObjectList:wdCb.Collection<GameObject>) {
            var collider:BoxColliderForFirstCheck = null,
                self = this;

            entityObjectList.forEach((entityObject:GameObject) => {
                if (!entityObject.hasComponent(ColliderForFirstCheck)) {
                    collider = self._createCollider();

                    entityObject.addComponent(collider);

                    collider.init();
                }
                else{
                    collider = entityObject.getComponent<BoxColliderForFirstCheck>(BoxColliderForFirstCheck);
                }

                collider.update(null);
            });
        }

        private _getWorldExtends(entityObjectList:wdCb.Collection<GameObject>):{worldMin:Vector3, worldMax:Vector3} {
            var worldMin = Vector3.create(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE),
            worldMax = Vector3.create(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE),
                self = this;

            entityObjectList.forEach((entityObject:GameObject) => {
                let min = null,
                    max = null,
                    collider:BoxColliderForFirstCheck = null,
                    shape:AABBShape = null;

                collider = entityObject.getComponent<BoxColliderForFirstCheck>(BoxColliderForFirstCheck);

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
    }
}