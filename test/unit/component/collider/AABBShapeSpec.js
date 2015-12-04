describe("AABBShape", function () {
    var sandbox = null;
    var shape = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        shape = new wd.AABBShape();

        testTool.openContractCheck(sandbox);
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("setFromTransformedAABB", function () {
        it("set aabb enclose specify aabb", function () {
            shape.center = wd.Vector3.create(0, 0, 0);
            shape.halfExtents = wd.Vector3.create(5, 5, 5);

            var box = colliderTool.createBox();
            box.transform.translate(5, 0, 0);
            box.transform.scale = wd.Vector3.create(1, 1, 2);
            box.transform.rotateLocal(0, 0, 45);


            var boxShape = wd.AABBShape.create();
            boxShape.center = wd.Vector3.create(0, 0, 0);
            boxShape.halfExtents = wd.Vector3.create(5, 5, 5);


            shape.setFromTransformedAABB(boxShape, box.transform.localToWorldMatrix);


            expect(testTool.getValues(shape.center.values)).toEqual([5, 0, 0]);
            expect(testTool.getValues(shape.halfExtents)).toEqual([7.0710678, 7.0710678, 10]);
        });
    });

    it("not use the 'the new aabb should enclose the aabb that transformed with gameObject' way to calculate aabb. because as the gameObject rotate, the aabb range will be more and more bigger", function () {
        shape.center = wd.Vector3.create(0, 0, 0);
        shape.halfExtents = wd.Vector3.create(5, 5, 5);

        var box = colliderTool.createBox();
        box.transform.rotateLocal(0, 0, 45);


        var boxShape = wd.AABBShape.create();
        boxShape.center = wd.Vector3.create(0, 0, 0);
        boxShape.halfExtents = wd.Vector3.create(5, 5, 5);


        shape.setFromTransformedAABB(boxShape, box.transform.localToWorldMatrix);


        expect(testTool.getValues(shape.center.values)).toEqual([0, 0, 0]);
        expect(testTool.getValues(shape.halfExtents)).toEqual([7.0710678, 7.0710678, 5]);




        shape.setFromTransformedAABB(shape, box.transform.localToWorldMatrix);


        expect(testTool.getValues(shape.center.values)).toEqual([0, 0, 0]);
        expect(testTool.getValues(shape.halfExtents)).toEqual([10, 10, 5]);
    });
});
