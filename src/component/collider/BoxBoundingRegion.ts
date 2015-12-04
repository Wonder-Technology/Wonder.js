/// <reference path="../../filePath.d.ts"/>
module wd {
    export class BoxBoundingRegion extends BoundingRegion{
        public static create(gameObject:GameObject) {
            var obj = new this(gameObject);

            return obj;
        }

        public shape:AABBShape = null;

        private _originShape:AABBShape = null;

        public init(){
            //todo add OBBShape
            this.shape = AABBShape.create();
        }

        public build(center:Vector3, halfExtents:Vector3){
            if(center && halfExtents){
                this.shape.setFromCenterAndHalfExtents(center, halfExtents);
            }
            else{
                this.shape.setFromPoints(this.gameObject.getComponent<Geometry>(Geometry).geometryData.vertices);
            }

            this._originShape = this.shape.copy();
        }

        public update(){
            var transform = this.gameObject.transform;

            if(transform.isRotate){
                this.shape.setFromObject(this.gameObject);
            }
            else if(transform.isTranslate || transform.isScale){
                this.shape.setFromTransformedAABB(this._originShape, transform.localToWorldMatrix);
            }
        }

        public isIntersectWithBox(boundingRegion:BoxBoundingRegion){
            return this.shape.isIntersectWithBox(boundingRegion.shape);
        }
    }
}

