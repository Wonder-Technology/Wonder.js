module wd{
    export class Ray {
        public static create(origin: Vector3, direction: Vector3) {
            var obj = new this(origin, direction);

            return obj;
        }

        constructor(origin: Vector3, direction: Vector3){
            this._origin = origin;
            this._direction = direction;
        }

        private _origin:Vector3 = null;
        private _direction:Vector3 = null;


        public isIntersectWithAABB(aabb:AABBShape): boolean;
        public isIntersectWithAABB(minPoint: Vector3, maxPoint: Vector3): boolean;

        public isIntersectWithAABB(...args): boolean {
            var center:Vector3 = null,
                halfExtends:Vector3 = null,
                diff = Vector3.create(),
                absDiff = null,
                absDir = null,
                cross = Vector3.create(),
                prod = Vector3.create(),
                rayOrigin = this._origin,
                rayDir = this._direction;

            if(args.length === 1){
                let aabb:AABBShape = args[0];

                center = aabb.center;
                halfExtends = aabb.halfExtents;
            }
            else if(args.length === 2){
                let minPoint = args[0],
                    maxPoint = args[1];

                center = AABBShape.getCenter(minPoint, maxPoint);
                halfExtends = AABBShape.getHalfExtents(minPoint, maxPoint);
            }

            diff.sub2(rayOrigin, center);
            absDiff = Vector3.create(Math.abs(diff.x), Math.abs(diff.y), Math.abs(diff.z));

            prod.mul2(diff, rayDir);

            if (absDiff.x > halfExtends.x && prod.x >= 0) {
                return false;
            }
            if (absDiff.y > halfExtends.y && prod.y >= 0) {
                return false;
            }
            if (absDiff.z > halfExtends.z && prod.z >= 0) {
                return false;
            }

            absDir = Vector3.create(Math.abs(rayDir.x), Math.abs(rayDir.y), Math.abs(rayDir.z));
            cross.cross(rayDir, diff);
            cross.set(Math.abs(cross.x), Math.abs(cross.y), Math.abs(cross.z));

            if (cross.x > halfExtends.y * absDir.z + halfExtends.z * absDir.y) {
                return false;
            }
            if (cross.y > halfExtends.x * absDir.z + halfExtends.z * absDir.x) {
                return false;
            }
            if (cross.z > halfExtends.x * absDir.y + halfExtends.y * absDir.x) {
                return false;
            }

            return true;
        }

        public isIntersectWithSphere(sphere:SphereShape): boolean {
            var center:Vector3 = sphere.center,
                radius:number = sphere.radius,
                diff = Vector3.create(),
                a = 0,
                b = 0,
                c = 0,
                discr = 0,
                rayOrigin = this._origin,
                rayDir = this._direction;

            diff.sub2(rayOrigin, center);
            if (diff.dot(diff) < radius * radius ) {
                // starts inside this
                return true;
            }

            a = rayDir.dot(rayDir);
            b = 2 * rayDir.dot(diff);
            c = center.dot(center);
            c += rayOrigin.dot(rayOrigin);
            c -= 2 * center.dot(rayOrigin);
            c -= radius * radius;

            discr = (b * b) - (4 * a * c);
            if (discr < 0) {
                return false;
            }

            return true;
        }
    }
}

