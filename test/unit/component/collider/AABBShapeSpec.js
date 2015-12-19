describe("AABBShape", function () {
    var sandbox = null;
    var shape = null;

    var Vector3;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        shape = new wd.AABBShape();

        Vector3 = wd.Vector3;

        testTool.openContractCheck(sandbox);
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("setFromTransformedAABB", function () {
        it("set aabb enclose specify aabb", function () {
            shape.center = Vector3.create(0, 0, 0);
            shape.halfExtents = Vector3.create(5, 5, 5);

            var box = colliderTool.createBox();
            box.transform.translate(5, 0, 0);
            box.transform.scale = Vector3.create(1, 1, 2);
            box.transform.rotateLocal(0, 0, 45);


            var boxShape = wd.AABBShape.create();
            boxShape.center = Vector3.create(0, 0, 0);
            boxShape.halfExtents = Vector3.create(5, 5, 5);


            shape.setFromTransformedAABB(boxShape, box.transform.localToWorldMatrix);


            expect(testTool.getValues(shape.center.values)).toEqual([5, 0, 0]);
            expect(testTool.getValues(shape.halfExtents)).toEqual([7.0710678, 7.0710678, 10]);
        });
    });

    it("not use the 'the new aabb should enclose the aabb that transformed with gameObject' way to calculate aabb. because as the gameObject rotate, the aabb range will be more and more bigger", function () {
        shape.center = Vector3.create(0, 0, 0);
        shape.halfExtents = Vector3.create(5, 5, 5);

        var box = colliderTool.createBox();
        box.transform.rotateLocal(0, 0, 45);


        var boxShape = wd.AABBShape.create();
        boxShape.center = Vector3.create(0, 0, 0);
        boxShape.halfExtents = Vector3.create(5, 5, 5);


        shape.setFromTransformedAABB(boxShape, box.transform.localToWorldMatrix);


        expect(testTool.getValues(shape.center.values)).toEqual([0, 0, 0]);
        expect(testTool.getValues(shape.halfExtents)).toEqual([7.0710678, 7.0710678, 5]);




        shape.setFromTransformedAABB(shape, box.transform.localToWorldMatrix);


        expect(testTool.getValues(shape.center.values)).toEqual([0, 0, 0]);
        expect(testTool.getValues(shape.halfExtents)).toEqual([10, 10, 5]);
    });

    describe("containPoint", function(){
        it("if a point is inside a aabb, return true", function(){
            shape.center = Vector3.create(10, 0, 0);
            shape.halfExtents = Vector3.create(8, 5, 5);
            expect(shape.containPoint(Vector3.create(18, 5, 5))).toBeTruthy();
            expect(shape.containPoint(Vector3.create(10, 5, 2))).toBeTruthy();

            expect(shape.containPoint(Vector3.create(19, 5, 2))).toBeFalsy();
            expect(shape.containPoint(Vector3.create(18, 6, 2))).toBeFalsy();
        });
    });

    describe("isIntersectWithRay", function(){
        it("Intersection test between a ray and an AABB", function(){
            shape.center = Vector3.create(0, 0, 0);
            shape.halfExtents = Vector3.create(5,5,5);

            var rayOrigin = Vector3.create(0, 0, 10);
            var rayDir = Vector3.create(-50,50,-20).sub(rayOrigin);

            expect(shape.isIntersectWithRay(rayOrigin,rayDir)).toBeFalsy();


            rayOrigin = Vector3.create(0, 0, 10);
            rayDir = Vector3.create(-50,50,-40).sub(rayOrigin);
            expect(shape.isIntersectWithRay(rayOrigin,rayDir)).toBeTruthy();
        });
    });
});
