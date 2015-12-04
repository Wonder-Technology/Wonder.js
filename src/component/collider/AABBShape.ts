/// <reference path="../../filePath.d.ts"/>
module wd {
    export class AABBShape extends Shape {
        public static create() {
            var obj = new this();

            return obj;
        }

        //public min:Vector3 = Vector3.create();
        //public max:Vector3 = Vector3.create();
        public center:Vector3 = Vector3.create(0, 0, 0);
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

        //public setFromPoints(points:Array<number>) {
        //    var self = this,
        //        min = Vector3.create(points[0], points[1], points[2]),
        //        max = Vector3.create(points[0], points[1], points[2]);
        //
        //    //this.empty();
        //
        //    GeometryUtils.iterateThreeComponent(points, (point:Vector3) => {
        //        self._expandByPoint(point, min, max);
        //    });
        //
        //    this.setMinMax(min, max);
        //
        //    return this;
        //
        //}

        //@require(function (matrix:Matrix4) {
        //    assert(!this.isEmpty(), Log.info.FUNC_SHOULD_NOT("the old AABB", "be  empty"));
        //})
        /**
         * set aabb enclose specify aabb
         * @param {aabb} aabb is the one which isn't yet transformed by matrix
         * @param {matrix} a matrix which is to transform the aabb
         */
        public setFromTransformedAABB(aabb:AABBShape, matrix:Matrix4) {
            var bc = this.center;
            var br = this.halfExtents;
            var ac = aabb.center.values;
            var ar = aabb.halfExtents.values;
            var m = matrix.values;

            var mx0 = m[0];
            var mx1 = m[4];
            var mx2 = m[8];
            var my0 = m[1];
            var my1 = m[5];
            var my2 = m[9];
            var mz0 = m[2];
            var mz1 = m[6];
            var mz2 = m[10];

            var mx0a = Math.abs(mx0);
            var mx1a = Math.abs(mx1);
            var mx2a = Math.abs(mx2);
            var my0a = Math.abs(my0);
            var my1a = Math.abs(my1);
            var my2a = Math.abs(my2);
            var mz0a = Math.abs(mz0);
            var mz1a = Math.abs(mz1);
            var mz2a = Math.abs(mz2);

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

        private _getEmptyMin() {
            return Vector3.create(Infinity, Infinity, Infinity);
        }

        private _getEmptyMax() {
            return Vector3.create(-Infinity, -Infinity, -Infinity);
        }

        //public empty() {
        //    this.min.x = this.min.y = this.min.z = Infinity;
        //    this.max.x = this.max.y = this.max.z = -Infinity;
        //
        //    return this;
        //}
        //
        //public isEmpty() {
        //    return ( this.max.x < this.min.x ) || ( this.max.y < this.min.y ) || ( this.max.z < this.min.z );
        //}

        private _expandByPoint(point:Vector3, min:Vector3, max:Vector3):void {
            //if (point.x < min.x) {
            //    min.x = point.x;
            //}
            //if (point.y < min.y) {
            //    min.y = point.y;
            //}
            //if (point.z < min.z) {
            //    min.z = point.z;
            //}
            //if (point.x > max.x) {
            //    max.x = point.x;
            //}
            //if (point.y > max.y) {
            //    max.y = point.y;
            //}
            //if (point.z > max.z) {
            //    max.z = point.z;
            //}

            min.min(point);
            max.max(point);
        }

        public isIntersectWithBox(shape:AABBShape) {
            var aMax = this.getMax();
            var aMin = this.getMin();
            var bMax = shape.getMax();
            var bMin = shape.getMin();

            return (aMin.x <= bMax.x) && (aMax.x >= bMin.x) &&
                (aMin.y <= bMax.y) && (aMax.y >= bMin.y) &&
                (aMin.z <= bMax.z) && (aMax.z >= bMin.z);
            //return (aMin[0] <= bMax[0]) && (aMax[0] >= bMin[0]) &&
            //    (aMin[1] <= bMax[1]) && (aMax[1] >= bMin[1]) &&
            //    (aMin[2] <= bMax[2]) && (aMax[2] >= bMin[2]);
            //if (shape.max.x < this.min.x || shape.min.x > this.max.x || shape.max.y < this.min.y || shape.min.y > this.max.y || shape.max.z < this.min.z || shape.min.z > this.max.z) {
            //    return false;
            //}
            //
            //return true;
        }

        public copy() {
            var shape = AABBShape.create();

            shape.center = this.center.copy();
            shape.halfExtents = this.halfExtents.copy();

            return shape;
        }
    }
}

