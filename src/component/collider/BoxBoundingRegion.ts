/// <reference path="../../filePath.d.ts"/>
module wd {
    export class BoxBoundingRegion extends BoundingRegion{
        public static create(gameObject:GameObject) {
            var obj = new this(gameObject);

            return obj;
        }

        //public halfExtents:Vector3 = null;
        public shape:AABBShape = null;

        public init(){
            //todo add OBBShape
            this.shape = AABBShape.create();
        }

        public build(){
            //console.log(this.gameObject.getComponent<Geometry>(Geometry).geometryData.vertices)
            //this.shape.setFromPoints(this.gameObject.getComponent<Geometry>(Geometry).geometryData.vertices);
            this.shape.setFromObject(this.gameObject);
        }

        //public update(precision:BoxColliderPrecision){
            //switch (precision){
            //    case BoxColliderPrecision.LOW:
            //        this.shape.setFromTransformedAABB(this.shape, this.gameObject.transform.localToWorldMatrix);
            //        //this.shape.setFromTransformedAABB(this.shape, Matrix4.create().rotate(45, 0, 1, 0));
            //        //this.shape.setFromObject(this.gameObject.transform);
            //        break;
            //    case BoxColliderPrecision.HIGH:
            //        this.shape.setFromObject(this.gameObject);
            //        break;
            //    default:
            //        wdCb.Log.error(true, wdCb.Log.info.FUNC_UNEXPECT(`precision:${precision}`));
            //        break;
            //}

        public update(){
            this.shape.setFromObject(this.gameObject);
        }


        public isIntersectWithBox(boundingRegion:BoxBoundingRegion){
            return this.shape.isIntersectWithBox(boundingRegion.shape);
        }
    }
}

