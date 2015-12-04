/// <reference path="../../filePath.d.ts"/>
module wd {
    export class BoxCollider extends Collider {
        public static create() {
            var obj = new this();

            return obj;
        }

        public center:Vector3 = Vector3.create(0, 0, 0);
        public halfExtents:Vector3 = null;
        public boundingRegion:BoxBoundingRegion = null;

        public init(){
            this.boundingRegion = BoxBoundingRegion.create(this.gameObject);
            this.boundingRegion.init();

            this.buildBoundingRegion();
        }

        public update(time:number){
            this.boundingRegion.update();
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
            this.boundingRegion.build(this.center, this.halfExtents);
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

