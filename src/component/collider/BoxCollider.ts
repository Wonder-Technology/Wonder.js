/// <reference path="../../filePath.d.ts"/>
module wd {
    export class BoxCollider extends Collider {
        public static create() {
            var obj = new this();

            return obj;
        }

        public boundingRegion:BoxBoundingRegion;

        public center:Vector3 = Vector3.create(0, 0, 0);
        public halfExtents:Vector3 = null;
        public type:string = <any>ColliderType.BOX;

        public createBoundingRegion(){
            return BoxBoundingRegion.create(this.gameObject);
        }

        @require(function(collider:Collider){
            assert(collider instanceof Collider, Log.info.FUNC_SHOULD("target", "be collider"))
        })
        public isIntersectWith(collider:Collider){
            if(collider instanceof BoxCollider){
                return this.boundingRegion.isIntersectWithBox(collider.boundingRegion);
            }
            else{
                Log.warn(Log.info.FUNC_NOT_SUPPORT(`${this.type} collider`, `intersect with ${collider.type} collider`));
            }
        }

        public buildBoundingRegion(){
            this.boundingRegion.build(this.center, this.halfExtents);
        }
    }
}

