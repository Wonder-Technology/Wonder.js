module wd {
    export class AABBShape extends Shape {
        public static create() {
            var obj = new this();

            return obj;
        }

        public halfExtents:Vector3 = Vector3.create(0.5, 0.5, 0.5);

        public setMinMax(min:Vector3, max:Vector3) {
            this.center.add2(max, min).scale(0.5);
            this.halfExtents.sub2(max, min).scale(0.5);
        }

        public getMin() {
            return this.center.copy().sub(this.halfExtents);
        }

        public getMax() {
            return this.center.copy().add(this.halfExtents);
        }

        public setFromShapeParam(center:Vector3, halfExtents:Vector3){
            this.center = center;
            this.halfExtents = halfExtents;
        }

        public setFromPoints(points:Array<number>) {
            var self = this,
                min = this._getEmptyMin(),
                max = this._getEmptyMax();

            GeometryUtils.iterateThreeComponent(points, (point:Vector3) => {
                self._expandByPoint(point, min, max);
            });

            this.setMinMax(min, max);

            return this;

        }

        /**
         * set aabb enclose specify aabb
         * @param {aabb} aabb isn't yet transformed by matrix
         * @param {matrix} matrix is to transform the aabb
         */
        public setFromTransformedAABB(aabb:AABBShape, matrix:Matrix4) {
            var bc = this.center,
                br = this.halfExtents,
                ac = aabb.center.values,
                ar = aabb.halfExtents.values,
                m = matrix.values,
                mx0 = m[0],
                mx1 = m[4],
                mx2 = m[8],
                my0 = m[1],
                my1 = m[5],
                my2 = m[9],
                mz0 = m[2],
                mz1 = m[6],
                mz2 = m[10],
                mx0a = Math.abs(mx0),
                mx1a = Math.abs(mx1),
                mx2a = Math.abs(mx2),
                my0a = Math.abs(my0),
                my1a = Math.abs(my1),
                my2a = Math.abs(my2),
                mz0a = Math.abs(mz0),
                mz1a = Math.abs(mz1),
                mz2a = Math.abs(mz2);

            bc.set(
                m[12] + mx0 * ac[0] + mx1 * ac[1] + mx2 * ac[2],
                m[13] + my0 * ac[0] + my1 * ac[1] + my2 * ac[2],
                m[14] + mz0 * ac[0] + mz1 * ac[1] + mz2 * ac[2]
            );

            br.set(
                mx0a * ar[0] + mx1a * ar[1] + mx2a * ar[2],
                my0a * ar[0] + my1a * ar[1] + my2a * ar[2],
                mz0a * ar[0] + mz1a * ar[1] + mz2a * ar[2]
            );
        }

        public setFromTranslationAndScale(aabb:AABBShape, matrix:Matrix4){
            var translation = matrix.getTranslation(),
                scale = matrix.getScale();

            this.center = aabb.center.copy().add(translation);
            /*!
            the scale may has float deviation, so may the halfExtents.
            todo fix halfExtents float deviation?(use toFixed?)
             */
            this.halfExtents = aabb.halfExtents.copy().mul(scale);
        }

        @require(function (entityObject:GameObject) {
            var vertices = entityObject.getComponent<Geometry>(Geometry).geometryData.vertices;

            assert(vertices && vertices.length > 0, Log.info.FUNC_MUST_DEFINE("vertices"));
        })
        public setFromObject(entityObject:GameObject) {
            var modelMatrix = entityObject.transform.localToWorldMatrix,
                vertices = entityObject.getComponent<Geometry>(Geometry).geometryData.vertices,
                self = this,
                min = this._getEmptyMin(),
                max = this._getEmptyMax();


            GeometryUtils.iterateThreeComponent(vertices, (point:Vector3) => {
                point.applyMatrix4(modelMatrix);
                self._expandByPoint(point, min, max);
            });

            this.setMinMax(min, max);
        }

        public isIntersectWithBox(shape:AABBShape);
        public isIntersectWithBox(min:Vector3, max:Vector3);

        public isIntersectWithBox(...args) {
            var aMax = this.getMax(),
                aMin = this.getMin(),
                bMax = null,
                bMin = null;

            if(args.length === 1){
                let shape = args[0];

                bMin = shape.getMin();
                bMax = shape.getMax();
            }
            else if(args.length === 2){
                bMin = args[0];
                bMax = args[1];
            }

            return (aMin.x <= bMax.x) && (aMax.x >= bMin.x) &&
                (aMin.y <= bMax.y) && (aMax.y >= bMin.y) &&
                (aMin.z <= bMax.z) && (aMax.z >= bMin.z);
        }

        public isIntersectWithSphere(shape:SphereShape){
            return this.isBoxAndSphereIntersected(this, shape);
        }

        /**
         * @description Intersection test between a ray and an AABB
         * @param {Vector3} rayOrigin The origin of the ray
         * @param {Vector3} rayDir The dir vector of the ray
         * @returns {Boolean} True if intersection occurs
         */
        public isIntersectWithRay(rayOrigin:Vector3, rayDir:Vector3) {
            var diff = Vector3.create(),
                absDiff,
                absDir,
                cross = Vector3.create(),
                prod = Vector3.create();

            diff.sub2(rayOrigin, this.center);
            absDiff = Vector3.create(Math.abs(diff.x), Math.abs(diff.y), Math.abs(diff.z));

            prod.mul2(diff, rayDir);

            if (absDiff.x > this.halfExtents.x && prod.x >= 0) {
                return false;
            }
            if (absDiff.y > this.halfExtents.y && prod.y >= 0) {
                return false;
            }
            if (absDiff.z > this.halfExtents.z && prod.z >= 0) {
                return false;
            }

            absDir = Vector3.create(Math.abs(rayDir.x), Math.abs(rayDir.y), Math.abs(rayDir.z));
            cross.cross(rayDir, diff);
            cross.set(Math.abs(cross.x), Math.abs(cross.y), Math.abs(cross.z));

            if (cross.x > this.halfExtents.y * absDir.z + this.halfExtents.z * absDir.y) {
                return false;
            }
            if (cross.y > this.halfExtents.x * absDir.z + this.halfExtents.z * absDir.x) {
                return false;
            }
            if (cross.z > this.halfExtents.x * absDir.y + this.halfExtents.y * absDir.x) {
                return false;
            }

            return true;
        }

        public closestPointTo(point:Vector3){
            var min = this.getMin(),
                max = this.getMax(),
                resultPoint = Vector3.create();

            if (point.x < min.x) {
                resultPoint.x = min.x;
            }
            else if (point.x > max.x) {
                resultPoint.x = max.x;
            }
            else {
                resultPoint.x = point.x;
            }

            if (point.y < min.y) {
                resultPoint.y = min.y;
            }
            else if (point.y > max.y) {
                resultPoint.y = max.y;
            }
            else {
                resultPoint.y = point.y;
            }

            if (point.z < min.z) {
                resultPoint.z = min.z;
            }
            else if (point.z > max.z) {
                resultPoint.z = max.z;
            }
            else {
                resultPoint.z = point.z;
            }

            return resultPoint;
        }

        public containPoint(point:Vector3) {
            var min = this.getMin(),
                max = this.getMax();

            for (let i = 0; i < 3; ++i) {
                if (point.values[i] < min.values[i] || point.values[i] > max.values[i]) {
                    return false;
                }
            }

            return true;
        }

        public copy() {
            var shape = AABBShape.create();

            shape.center = this.center.copy();
            shape.halfExtents = this.halfExtents.copy();

            return shape;
        }

        private _getEmptyMin() {
            return Vector3.create(Infinity, Infinity, Infinity);
        }

        private _getEmptyMax() {
            return Vector3.create(-Infinity, -Infinity, -Infinity);
        }

        private _expandByPoint(point:Vector3, min:Vector3, max:Vector3):void {
            min.min(point);
            max.max(point);
        }
    }
}

