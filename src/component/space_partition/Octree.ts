module wd {
    export class Octree extends Component {
        public static create() {
        	var obj = new this();

        	return obj;
        }

        public maxDepth:number = 2;
        public maxNodeCapacity:number = 64;
        private _root:OctreeNode = null;

        public build() {
            var entityObjectList:wdCb.Collection<EntityObject> = this._getChildren();
            var self = this;
            var currentDepth = 0;
            var maxNodeCapacity = this.maxNodeCapacity,
                maxDepth = this.maxDepth;

            var buildTree = (worldMin:Vector3, worldMax:Vector3, currentDepth, entityObjectList:wdCb.Collection<EntityObject>, parentNode:OctreeNode) => {
                //todo halfExtends?
                var nodeSize = new Vector3((worldMax.x - worldMin.x) / 2, (worldMax.y - worldMin.y) / 2, (worldMax.z - worldMin.z) / 2);


                for (var x = 0; x < 2; x++) {
                    for (var y = 0; y < 2; y++) {
                        for (var z = 0; z < 2; z++) {
                            var localMin = worldMin.copy().add(nodeSize.copy().scale(x, y, z));
                            var localMax = worldMin.copy().add(nodeSize.copy().scale(x + 1, y + 1, z + 1));

                            var node = OctreeNode.create(localMin, localMax, maxNodeCapacity, currentDepth + 1, maxDepth);


                            node.addEntityObjects(entityObjectList);


                            if (node.entityObjectCount > maxNodeCapacity && currentDepth < maxDepth) {
                                buildTree(localMin, localMax, currentDepth + 1, entityObjectList, node);
                            }


                            parentNode.addNode(node);
                        }
                    }
                }
            }

            this._addColliderForFirstCheck(entityObjectList);

            var { worldMin, worldMax } = this._getWorldExtends(entityObjectList);



            this._root = OctreeNode.create(worldMin, worldMax, maxNodeCapacity, currentDepth + 1, maxDepth);


            buildTree(worldMin, worldMax, currentDepth, entityObjectList, this._root);
        }

        //todo test: parent->child, both has vertices;only parent has vertices
        private _getChildren() {
            //todo after fix bug, finish this
            //todo return the ones which isContainer or has vertices themself
            return this.entityObject.getChildren();
        }

        private _addColliderForFirstCheck(entityObjectList:wdCb.Collection<EntityObject>) {
            entityObjectList.forEach((entityObject:EntityObject) => {
                if (!entityObject.hasComponent(ColliderForFirstCheck)) {
                    let collider = BoxColliderForFirstCheck.create();

                    entityObject.addComponent(collider);

                    collider.init();
                }
            });
        }

        private _getWorldExtends(entityObjectList:wdCb.Collection<EntityObject>):{worldMin:Vector3, worldMax:Vector3} {
            var worldMin = Vector3.create(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE),
            worldMax = Vector3.create(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE),
                self = this;

            entityObjectList.forEach((entityObject:EntityObject) => {
                let min = null,
                    max = null,
                    collider:BoxColliderForFirstCheck = null,
                    shape:AABBShape = null;

                //if (!entityObject.hasComponent(ColliderForFirstCheck)) {
                //    collider = BoxColliderForFirstCheck.create();
                //
                //    entityObject.addComponent(collider);
                //
                //    collider.init();
                //}
                //else {
                collider = entityObject.getComponent<BoxColliderForFirstCheck>(BoxColliderForFirstCheck);

                collider.update(null);
                //}

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