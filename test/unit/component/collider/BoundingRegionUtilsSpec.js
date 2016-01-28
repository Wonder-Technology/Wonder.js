describe("BoundingRegionUtils", function () {
    var sandbox = null;
    var utils = wd.BoundingRegionUtils;
    var Vector3 = wd.Vector3;

    function createV3(x, y, z) {
        return Vector3.create(x, y, z);
    }

    function getFrustumPlanes(pos, lookAtPoint, near, far, fovy) {
        var cameraObject = testTool.createCamera(pos, lookAtPoint, near, far, fovy);

        cameraObject.init();

        return cameraObject.getComponent(wd.CameraController).getPlanes();
    }

    function createMinMax(center, halfSize) {
        var halfSize = halfSize || 1;

        return {
            min: createV3(center[0] - halfSize, center[1] - halfSize, center[2] - halfSize),
            max: createV3(center[0] + halfSize, center[1] + halfSize, center[2] + halfSize)
        }
    }


    beforeEach(function () {
        sandbox = sinon.sandbox.create();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("isAABBIntersectFrustum", function () {
        beforeEach(function () {
        });

        it("test if aabb intersect with frustum", function () {
            var planes = getFrustumPlanes(createV3(0, 0, 0), createV3(10, 0, 0), 2, 10, 45);

            var data1 = createMinMax([8, 4, 4]);
            var data6 = createMinMax([8, 8, 4]);

            var data2 = createMinMax([11, 0, 0]);
            var data5 = createMinMax([11.1, 0, 0]);

            var data3 = createMinMax([1, 0, 0]);
            var data4 = createMinMax([0.9, 0, 0]);


            expect(utils.isAABBIntersectFrustum(data1.min, data1.max, planes)).toBeTruthy();
            expect(utils.isAABBIntersectFrustum(data2.min, data2.max, planes)).toBeTruthy();
            expect(utils.isAABBIntersectFrustum(data3.min, data3.max, planes)).toBeTruthy();


            expect(utils.isAABBIntersectFrustum(data4.min, data4.max, planes)).toBeFalsy();
            expect(utils.isAABBIntersectFrustum(data5.min, data5.max, planes)).toBeFalsy();
            expect(utils.isAABBIntersectFrustum(data6.min, data6.max, planes)).toBeFalsy();
        });
    });

    describe("isAABBInFrustum", function () {
        beforeEach(function () {
        });

        it("test if aabb is inside frustum", function () {
            var planes = getFrustumPlanes(createV3(0, 0, 0), createV3(10, 0, 0), 2, 10, 45);

            var data1 = createMinMax([8, 1, 1]);
            var data6 = createMinMax([8, 2, 2]);

            var data2 = createMinMax([9, 0, 0]);
            var data5 = createMinMax([9.1, 0, 0]);

            var data3 = createMinMax([3.5, 0, 0]);
            var data4 = createMinMax([3.4, 0, 0]);


            expect(utils.isAABBInFrustum(data1.min, data1.max, planes)).toBeTruthy();
            expect(utils.isAABBInFrustum(data2.min, data2.max, planes)).toBeTruthy();
            expect(utils.isAABBInFrustum(data3.min, data3.max, planes)).toBeTruthy();


            expect(utils.isAABBInFrustum(data4.min, data4.max, planes)).toBeFalsy();
            expect(utils.isAABBInFrustum(data5.min, data5.max, planes)).toBeFalsy();
            expect(utils.isAABBInFrustum(data6.min, data6.max, planes)).toBeFalsy();
        });
    });
});
