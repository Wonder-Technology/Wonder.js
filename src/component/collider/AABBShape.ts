/// <reference path="../../filePath.d.ts"/>
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

        @require(function (gameObject:GameObject) {
            var vertices = gameObject.getComponent<Geometry>(Geometry).geometryData.vertices;

            assert(vertices && vertices.length > 0, Log.info.FUNC_MUST_DEFINE("vertices"));
        })
        public setFromObject(gameObject:GameObject) {
            var modelMatrix = gameObject.transform.localToWorldMatrix,
                vertices = gameObject.getComponent<Geometry>(Geometry).geometryData.vertices,
                self = this,
                min = this._getEmptyMin(),
                max = this._getEmptyMax();


            GeometryUtils.iterateThreeComponent(vertices, (point:Vector3) => {
                point.applyMatrix4(modelMatrix);
                self._expandByPoint(point, min, max);
            });

            this.setMinMax(min, max);
        }

        public isIntersectWithBox(shape:AABBShape) {
            var aMax = this.getMax();
            var aMin = this.getMin();
            var bMax = shape.getMax();
            var bMin = shape.getMin();

            return (aMin.x <= bMax.x) && (aMax.x >= bMin.x) &&
                (aMin.y <= bMax.y) && (aMax.y >= bMin.y) &&
                (aMin.z <= bMax.z) && (aMax.z >= bMin.z);
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

