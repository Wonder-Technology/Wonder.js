describe("BoxColliderForFirstCheck", function () {
    var sandbox = null;
    var collider = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        collider = new wd.BoxColliderForFirstCheck();
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("clone", function(){
        it("clone _collider", function(){
            var resultCollider = {};
            sandbox.stub(collider._collider, "clone").returns(resultCollider);

            var result = collider.clone();


            expect(result === collider).toBeFalsy();
            expect(result._collider).toEqual(resultCollider);
        });
    });
});
