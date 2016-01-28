module wd{
    export class OctreeNode{
        public static create(minPoint: Vector3, maxPoint: Vector3, capacity: number, depth: number, maxDepth: number) {
            var obj = new this(minPoint, maxPoint, capacity, depth, maxDepth);

            obj.initWhenCreate();

            return obj;
        }

        get entityObjectCount(){
            return this.entityObjectList.getCount();
        }

        public entityObjectList:wdCb.Collection<EntityObject> = wdCb.Collection.create<EntityObject>();
        public nodeList:wdCb.Collection<OctreeNode> = wdCb.Collection.create<OctreeNode>();

        private _depth: number;
        private _maxDepth: number;
        private _capacity: number;
        private _minPoint: Vector3;
        private _maxPoint: Vector3;
        private _boundingVectors = new Array<Vector3>();

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

        public addEntityObjects(entityObjectList){
            var self = this,
                localMin = this._minPoint,
                localMax = this._maxPoint;

            entityObjectList.forEach((entityObject:EntityObject) => {
                if(entityObject.getComponent<BoxColliderForFirstCheck>(BoxColliderForFirstCheck).shape.isIntersectWithBox(localMin, localMax)){
                    self.entityObjectList.addChild(entityObject);

                    //todo remove added list?
                }
            });
        }

        public addNode(node:OctreeNode){
            this.nodeList.addChild(node);
        }

        public findAndAddToRenderList(frustumPlanes:Array<Plane>, renderList:wdCb.Collection<EntityObject>):void{
            if (BoundingRegionUtils.isAABBIntersectFrustum(this._boundingVectors, frustumPlanes)) {
                if (this._hasNode()) {
                    this.nodeList.forEach((node:OctreeNode) => {
                        node.findAndAddToRenderList(frustumPlanes, renderList);
                    });

                    return;
                }

                renderList.addChildren(this.entityObjectList);
            }
        }

        private _hasNode(){
            return this.nodeList.getCount() > 0;
        }
    }
}
