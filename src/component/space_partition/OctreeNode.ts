module wd{
    export class OctreeNode{
        public static create(minPoint: Vector3, maxPoint: Vector3, capacity: number, depth: number, maxDepth: number) {
            var obj = new this(minPoint, maxPoint, capacity, depth, maxDepth);

            obj.initWhenCreate();

            return obj;
        }

        get gameObjectCount(){
            return this.gameObjectList.getCount();
        }

        public gameObjectList:wdCb.Collection<GameObject> = wdCb.Collection.create<GameObject>();
        public nodeList:wdCb.Collection<OctreeNode> = wdCb.Collection.create<OctreeNode>();

        private _depth:number = null;
        private _maxDepth:number = null;
        private _capacity:number = null;
        private _minPoint:Vector3 = null;
        private _maxPoint:Vector3 = null;
        private _boundingVectors:Array<Vector3> = null;

        constructor(minPoint: Vector3, maxPoint: Vector3, capacity: number, depth: number, maxDepth: number) {
            this._capacity = capacity;
            this._depth = depth;
            this._maxDepth = maxDepth;

            this._minPoint = minPoint;
            this._maxPoint = maxPoint;
        }

        public initWhenCreate(){
            this._boundingVectors = BoundingRegionUtils.buildBoundingVectors(this._minPoint, this._maxPoint);
        }

        @require(function(gameObjectList:wdCb.Collection<GameObject>){
            gameObjectList.forEach((gameObject:GameObject) => {
                assert(gameObject instanceof GameObject, Log.info.FUNC_SHOULD("add gameObjects"));
            });
        })
        public addGameObjects(gameObjectList:wdCb.Collection<GameObject>){
            var self = this,
                localMin = this._minPoint,
                localMax = this._maxPoint;

            gameObjectList.forEach((gameObject:GameObject) => {
                if(gameObject.getComponent<BoxColliderForFirstCheck>(BoxColliderForFirstCheck).shape.isIntersectWithBox(localMin, localMax)){
                    self.gameObjectList.addChild(gameObject);
                }
            });
        }

        public addNode(node:OctreeNode){
            this.nodeList.addChild(node);
        }

        public findAndAddToRenderList(frustumPlanes:Array<Plane>, selectionList:wdCb.Collection<GameObject>):void{
            if (BoundingRegionUtils.isAABBIntersectFrustum(this._boundingVectors, frustumPlanes)) {
                if (this._hasNode()) {
                    this.nodeList.forEach((node:OctreeNode) => {
                        node.findAndAddToRenderList(frustumPlanes, selectionList);
                    });

                    return;
                }

                selectionList.addChildren(RenderUtils.getGameObjectRenderList(this.gameObjectList));
            }
        }

        public findAndAddToIntersectList(ray:Ray, selectionList:wdCb.Collection<GameObject>){
            if (ray.isIntersectWithAABB(this._minPoint, this._maxPoint)) {
                if (this._hasNode()) {
                    this.nodeList.forEach((node:OctreeNode) => {
                        node.findAndAddToIntersectList(ray, selectionList);
                    });

                    return;
                }

                selectionList.addChildren(this.gameObjectList);
            }
        }

        public findAndAddToCollideList(shape:Shape, selectionList:wdCb.Collection<GameObject>):void{
            if(shape.isIntersectWithBox(this._minPoint, this._maxPoint)){
                if (this._hasNode()) {
                    this.nodeList.forEach((node:OctreeNode) => {
                        node.findAndAddToCollideList(shape, selectionList);
                    });

                    return;
                }

                selectionList.addChildren(this.gameObjectList);
            }
        }

        private _hasNode(){
            return this.nodeList.getCount() > 0;
        }
    }
}
