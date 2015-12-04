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
    function createBox() {
        var material = wd.BasicMaterial.create();
        //material.color = wd.Color.create("rgb(1.0,0.0,1.0)");

        var geometry = wd.BoxGeometry.create();
        geometry.material = material;
        geometry.width = 5;
        geometry.height = 5;
        geometry.depth = 5;


        var collider = wd.BoxCollider.create();
//            collider.halfExtents = wd.Vector3(2.5, 2.5, 2.5);

        var gameObject = wd.GameObject.create();
        gameObject.addComponent(geometry);
        gameObject.addComponent(collider);

        gameObject.addComponent(wd.MeshRenderer.create());

        return gameObject;
    }

    describe("setFromTransformedAABB", function () {

        beforeEach(function () {

        });

        it("set aabb enclose specify aabb", function () {
            shape.center = wd.Vector3.create(0, 0, 0);
            shape.halfExtents = wd.Vector3.create(5, 5, 5);

            var box = createBox();
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

        var box = createBox();
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
