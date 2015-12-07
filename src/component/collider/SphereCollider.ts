/// <reference path="../../filePath.d.ts"/>
module wd {
    export class SphereCollider extends Collider {
        public static create() {
            var obj = new this();

            return obj;
        }

        public boundingRegion:SphereBoundingRegion;

        public center:Vector3 = Vector3.create(0, 0, 0);
        public radius:number = null;
        public type:string = <any>ColliderType.SPHERE;

        public createBoundingRegion(){
            return SphereBoundingRegion.create(this.gameObject);
        }

        @require(function(collider:Collider){
            assert(collider instanceof Collider, Log.info.FUNC_SHOULD("target", "be collider"))
        })
        public isIntersectWith(collider:Collider){
            if(collider instanceof SphereCollider){
                return this.boundingRegion.isIntersectWithSphere(collider.boundingRegion);
            }
            else{
                Log.warn(Log.info.FUNC_NOT_SUPPORT(`${this.type} collider`, `intersect with ${collider.type} collider`));
            }
        }

        public buildBoundingRegion(){
            this.boundingRegion.build(this.center, this.radius);
        }
    }
}

