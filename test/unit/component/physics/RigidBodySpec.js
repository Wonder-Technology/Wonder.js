describe("RigidBody", function() {
    var sandbox = null;
    var body = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        //sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
        body = new wd.RigidBody();
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("initBody", function(){
        beforeEach(function(){

        });

        it("add body after its and its children's collider component init", function(){
            body.addBody = sandbox.stub();

            body.initBody();

            expect(body.addBody).toCalledOnce();
        });
        it("should only add body once", function () {
            body.addBody = sandbox.stub();

            body.initBody();
            body.initBody();

            expect(body.addBody).toCalledOnce();
        });
    });

    describe("initConstraint", function(){
        it("add constraint after all body added", function(){
            body.addConstraint = sandbox.stub();

            body.initConstraint();

            expect(body.addConstraint).toCalledOnce();
        });
        it("should only add constraint once", function () {
            body.addConstraint = sandbox.stub();

            body.initConstraint();
            body.initConstraint();

            expect(body.addConstraint).toCalledOnce();
        });
    });
});

