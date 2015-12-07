describe("SphereShape", function () {
    var sandbox = null;
    var shape = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        shape = new wd.SphereShape();

        testTool.openContractCheck(sandbox);
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("containPoint", function(){
        it("if a point is inside a aabb, return true", function(){
            shape.center = wd.Vector3.create(10, 0, 0);
            shape.radius = 5;
            expect(shape.containPoint(wd.Vector3.create(15, 0, 0))).toBeTruthy();
            expect(shape.containPoint(wd.Vector3.create(10, 3, -2))).toBeTruthy();

            expect(shape.containPoint(wd.Vector3.create(15, 0, 0.1))).toBeFalsy();
            expect(shape.containPoint(wd.Vector3.create(10, 5.1, 0))).toBeFalsy();
            expect(shape.containPoint(wd.Vector3.create(10, 5, 5))).toBeFalsy();
        });
    });
});
