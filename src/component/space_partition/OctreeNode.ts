module wd{
    export class OctreeNode{
        public static create(minPoint: Vector3, maxPoint: Vector3, capacity: number, depth: number, maxDepth: number) {
        	var obj = new this(minPoint, maxPoint, capacity, depth, maxDepth);

        	return obj;
        }

        get entityObjectCount(){
            return this.entityObjects.getCount();
        }

        public entityObjects:wdCb.Collection<EntityObject> = wdCb.Collection.create<EntityObject>();
        public nodes:wdCb.Collection<OctreeNode> = wdCb.Collection.create<OctreeNode>();

        private _depth: number;
        private _maxDepth: number;
        private _capacity: number;
        private _minPoint: Vector3;
        private _maxPoint: Vector3;

        constructor(minPoint: Vector3, maxPoint: Vector3, capacity: number, depth: number, maxDepth: number) {
            this._capacity = capacity;
            this._depth = depth;
            this._maxDepth = maxDepth;

            this._minPoint = minPoint;
            this._maxPoint = maxPoint;
        }

        public addEntityObjects(entityObjectList){
            var self = this,
                localMin = this._minPoint,
                localMax = this._maxPoint;

            entityObjectList.forEach((entityObject:EntityObject) => {
                if(entityObject.getComponent<BoxColliderForFirstCheck>(BoxColliderForFirstCheck).shape.isIntersectWithBox(localMin, localMax)){
                    self.entityObjects.addChild(entityObject);

                    //todo remove added list?
                }
            });
        }

        public addNode(node:OctreeNode){
            this.nodes.addChild(node);
        }


        //todo select: remove duplicate
    }
}
