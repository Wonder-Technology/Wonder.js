/// <reference path="../../filePath.d.ts"/>
module wd {
    export class SphereShape extends Shape {
        public static create() {
            var obj = new this();

            return obj;
        }

        public center:Vector3 = Vector3.create(0, 0, 0);
        public radius:number = 1;

        public setFromCenterAndRadius(center:Vector3, radius:number){
            this.center = center;
            this.radius = radius;
        }

        public setFromPoints(points:Array<number>) {
            var aabb = AABBShape.create();

            this.center = aabb.setFromPoints(points).center;
            this.radius = this._findMaxDistanceOfPointsToCenter(points);
        }

        public setFromTranslationAndScale(sphere:SphereShape, matrix:Matrix4){
            var translation = matrix.getTranslation(),
                scale = matrix.getScale();

            this.center = sphere.center.copy().add(translation);
            this.radius = sphere.radius * Math.max(scale.x, scale.y, scale.z);
        }

        public isIntersectWithSphere(shape:SphereShape) {
            var radiusSum = this.radius + shape.radius;

            return shape.center.distanceToSquared(this.center) <= ( radiusSum ** 2);
        }

        public copy() {
            var shape = SphereShape.create();

            shape.center = this.center.copy();
            shape.radius = this.radius;

            return shape;
        }

        private _findMaxDistanceOfPointsToCenter(points:Array<number>){
            var maxRadiusSq = 0,
                center = this.center;


            GeometryUtils.iterateThreeComponent(points, (point:Vector3) => {
                maxRadiusSq = Math.max( maxRadiusSq, center.distanceToSquared(point) );
            });

            return Math.sqrt(maxRadiusSq);
        }
    }
}

