/// <reference path="../../filePath.d.ts"/>
module wd {
    export abstract class Shape{
        public center:Vector3 = Vector3.create(0, 0, 0);

        public abstract setFromShapeParam(...args);
        public abstract setFromPoints(points:Array<number>);
        public abstract copy():Shape;
        public abstract isIntersectWithBox(shape:AABBShape);
        public abstract isIntersectWithSphere(shape:SphereShape);

        protected isBoxAndSphereIntersected(box:AABBShape, sphere:SphereShape) {
            var sphereCenter = sphere.center,
                sphereRadius = sphere.radius;

            return sphereCenter.distanceToSquared(box.closestPointTo(sphereCenter)) < sphereRadius**2;
        }
    }
}

