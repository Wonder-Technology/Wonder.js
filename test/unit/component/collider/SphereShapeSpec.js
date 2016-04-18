describe("SphereShape", function () {
    var sandbox = null;
    var shape = null;

    var Vector3;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        shape = new wd.SphereShape();

        Vector3 = wd.Vector3;

        testTool.openContractCheck(sandbox);
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("containPoint", function(){
        it("if a point is inside a aabb, return true", function(){
            shape.center = Vector3.create(10, 0, 0);
            shape.radius = 5;
            expect(shape.containPoint(Vector3.create(15, 0, 0))).toBeTruthy();
            expect(shape.containPoint(Vector3.create(10, 3, -2))).toBeTruthy();

            expect(shape.containPoint(Vector3.create(15, 0, 0.1))).toBeFalsy();
            expect(shape.containPoint(Vector3.create(10, 5.1, 0))).toBeFalsy();
            expect(shape.containPoint(Vector3.create(10, 5, 5))).toBeFalsy();
        });
    });

    describe("isIntersectWithRay", function(){
        it("Intersection test between a ray and an sphere", function(){
            shape.center = Vector3.create(0, 0, 0);
            shape.radius = 5;

            var rayOrigin = Vector3.create(0, 0, 10);
            var rayDir = Vector3.create(-50,50,-110).sub(rayOrigin);

            expect(shape.isIntersectWithRay(wd.Ray.create(rayOrigin, rayDir))).toBeFalsy();


            rayOrigin = Vector3.create(0, 0, 10);
            rayDir = Vector3.create(-50,50,-120).sub(rayOrigin);
            expect(shape.isIntersectWithRay(wd.Ray.create(rayOrigin, rayDir))).toBeTruthy();
        });
    });

    describe("clone", function(){
        beforeEach(function(){
        });

        it("clone data", function(){
            var center = wd.Vector3.create(1,2,3);
            var radius = 10;

            cloneTool.extend(shape, {
                center:center,
                radius:radius
            });

            var result = shape.clone();


            expect(result === shape).toBeFalsy();
            expect(result.center).toEqual(center);
            expect(result.radius).toEqual(radius);
        });
    });
});
