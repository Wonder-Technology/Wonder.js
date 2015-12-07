/// <reference path="../../filePath.d.ts"/>
module wd {
    export class SphereBoundingRegion extends BoundingRegion{
        public static create(gameObject:GameObject) {
            var obj = new this(gameObject);

            return obj;
        }

        public shape:SphereShape;

        protected originShape:SphereShape;

        protected createShape(){
            return SphereShape.create();
        }

        protected updateShape(){
            var transform = this.gameObject.transform;

            this.shape.setFromTranslationAndScale(this.originShape, transform.localToWorldMatrix);
        }

        @require(function(shape:SphereShape){
            assert(this.debugObject, Log.info.FUNC_SHOULD("build debugObject"));
        })
        protected updateDebugObjectFromShape(shape:SphereShape){
            this.debugObject.transform.position = shape.center;

            var scaleTimes = shape.radius / this.originShape.radius;
            this.debugObject.transform.scale = Vector3.create(scaleTimes, scaleTimes, scaleTimes);
        }

        protected isNotTransformed(){
            var transform = this.gameObject.transform;

            return !transform.isTranslate && !transform.isScale;
        }

        protected isBuildUserSpecifyBoundingRegion(center:Vector3, radius){
            return !!center && !!radius;
        }

        @require(function(geometry:CustomGeometry, shape:SphereShape){
            assert(shape.radius > 0, Log.info.FUNC_SHOULD("radius", "> 0"));
        })
        protected setDebugObjectGeometry(geometry:CustomGeometry, shape:SphereShape){
            const SEGMENTS = 40,
                RINGCOUNT = 3;
            var radius = shape.radius,
                vertices = [],
                x = 0;

            for (let ring = 0; ring < RINGCOUNT; ring++) {
                let xo = 0,
                    yo = 1,
                    zo = 2,
                    theta = null;

                if (ring === 1) {
                    xo = 1;
                    yo = 0;
                    zo = 2;
                }
                else if (ring === 2) {
                    xo = 0;
                    yo = 2;
                    zo = 1;
                }

                for (let i = 0; i < SEGMENTS; i++) {
                    theta = 2 * Math.PI * (i / SEGMENTS);
                    vertices[x+xo] = radius * Math.cos(theta);
                    vertices[x+yo] = 0;
                    vertices[x+zo] = radius * Math.sin(theta);
                    x += 3;

                    theta = 2 * Math.PI * ((i + 1) / SEGMENTS);
                    vertices[x+xo] = radius * Math.cos(theta);
                    vertices[x+yo] = 0;
                    vertices[x+zo] = radius * Math.sin(theta);
                    x += 3;
                }
            }

            geometry.vertices = vertices;
        }
    }
}

