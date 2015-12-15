/// <reference path="../../filePath.d.ts"/>
module wd {
    export class BoxBoundingRegion extends BoundingRegion{
        public static create(gameObject:GameObject) {
            var obj = new this(gameObject);

            return obj;
        }

        public shape:AABBShape;

        protected originShape:AABBShape;


        public updateShape(){
            var transform = this.gameObject.transform;

            if(this.isUserSpecifyTheRegion){
                this.shape.setFromTranslationAndScale(this.originShape, transform.localToWorldMatrix)
            }
            else{
                if(transform.isRotate){
                    this.shape.setFromObject(this.gameObject);
                }
                else{
                    //todo optimize:set when isTranslate/isScale?
                    this.shape.setFromTranslationAndScale(this.originShape, transform.localToWorldMatrix)
                }
            }
        }

        protected createShape(){
            //todo add OBBShape
            return AABBShape.create();
        }

        @require(function(shape:AABBShape){
            assert(this.debugObject, Log.info.FUNC_SHOULD("build debugObject"));
        })
        protected updateDebugObjectFromShape(shape:AABBShape){
            var geometry = this.debugObject.getComponent<CustomGeometry>(CustomGeometry);

            this.setDebugObjectGeometry(geometry, shape);

            this.debugObject.transform.position = shape.center;
        }

        @require(function(geometry:CustomGeometry, shape:AABBShape){
            assert(shape.halfExtents && !shape.halfExtents.isZero(), Log.info.FUNC_SHOULD_NOT("halfExtents", "be zero"));
        })
        protected setDebugObjectGeometry(geometry:CustomGeometry, shape:AABBShape){
            var halfExtents = shape.halfExtents,
                x = halfExtents.x,
                y = halfExtents.y,
                z = halfExtents.z;

            geometry.vertices = [
                -x, -y, -z, -x, -y, z, x, -y, z, x, -y, -z,
                -x, y, -z, -x, y, z, x, y, z, x, y, -z
            ];

            /*!
             //todo optimize: set ElementBuffer to create Uint8Array, BufferType.UNSIGNED_BYTE
             geometry add buffer type table?
             */
            geometry.indices = [
                0,1,1,2,2,3,3,0,
                4,5,5,6,6,7,7,4,
                0,4,1,5,2,6,3,7
            ];
        }

        protected isBuildUserSpecifyBoundingRegion(center:Vector3, halfExtents:Vector3){
            return !!center && !!halfExtents;
        }

        protected isNotTransformed(){
            var transform = this.gameObject.transform;

            return !transform.isRotate && !transform.isTranslate && !transform.isScale;
        }
    }
}

