/// <reference path="../../filePath.d.ts"/>
module wd {
    export class BoxCollider extends Collider {
        public static create() {
            var obj = new this();

            return obj;
        }

        //public halfExtents:Vector3 = null;
        //public precision:BoxColliderPrecision = BoxColliderPrecision.LOW;

        public boundingRegion:BoxBoundingRegion = null;

        public init(){
            this.boundingRegion = BoxBoundingRegion.create(this.gameObject);
            this.boundingRegion.init();

            //todo can specify region by user

            this.buildBoundingRegion();
        }

        public update(time:number){
            //var he = data.halfExtents;
            //var x = he.x;
            //var y = he.y;
            //var z = he.z;
            //var gameObject = this.gameObject;

            //this.boundingRegion.follow(this.gameObject.transform);

            //todo if translate or scale, only change aabb

            //todo if rotated, then re-calcute

            //this.boundingRegion.update(this.precision);
            this.boundingRegion.update();


            //todo else, not change
        }


        //todo optimize
        public getCollideObjects(checkTargetList:wdCb.Collection<GameObject>):wdCb.Collection<GameObject>{
            //var checkTargetList = this.gameObject.filter((gameObject:GameObject) => {
            //    return gameObject.hasComponent(Collider);
            //}),
                var self = this,
                result = wdCb.Collection.create<GameObject>();

            checkTargetList.forEach((gameObject) => {
                //if(gameObject.isCollisionChecked || self._isSelf(gameObject)){
                    if(self._isSelf(gameObject)){
                    return;
                }

                if(self.isIntersectWith(gameObject.getComponent(Collider))){
                    result.addChild(gameObject);
                }
            });

            return result;
        }

        public isIntersectWith(collider:Collider){
            if(collider instanceof BoxCollider){
                return this.boundingRegion.isIntersectWithBox(collider.boundingRegion);
            }
            //todo add and judge more collider
            else{
            }
        }
        //public isIntersectWith(collider:Collider){
        //    return this._boundingRegion.isIntersectWith(collider);
        //}

        public buildBoundingRegion(){
            this.boundingRegion.build();
        }

        private _isSelf(gameObject:GameObject){
            return this.gameObject.uid === gameObject.uid;
        }
    }

    //export enum BoxColliderPrecision{
    //    LOW,
    //    HIGH
    //}
}

