describe("EntityObject", function() {
    var sandbox = null;
    var entityObject = null;
    var EntityObject = null;
    var Vector3 = wd.Vector3;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        EntityObject = wd.EntityObject;
        entityObject = new EntityObject();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("initComponent", function(){
        beforeEach(function(){

        });

        it("firstly, init geometry component", function(){
            var geometry = wd.BoxGeometry.create();
            sandbox.stub(geometry, "init");

            var collider = wd.BoxCollider.create();
            sandbox.stub(collider, "init");

            var octree = wd.Octree.create();
            sandbox.stub(octree, "init");

            entityObject.addComponent(collider);
            entityObject.addComponent(octree);
            entityObject.addComponent(geometry);

            entityObject.init();

            expect(geometry.init).toCalledBefore(collider.init);
            expect(geometry.init).toCalledBefore(octree.init);
        });
    });
});
