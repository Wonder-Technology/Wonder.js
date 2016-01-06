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
            return SphereBoundingRegion.create(this.entityObject);
        }

        public buildBoundingRegion(){
            this.boundingRegion.build(this.center, this.radius);
        }
    }
}

