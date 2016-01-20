describe("RigidBody", function() {
    var sandbox = null;
    var body = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        //sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
        body = new wd.RigidBody();
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

    describe("init", function(){
        beforeEach(function(){

        });

        it("add body after its and its children's collider component init", function(){
            body.addBody = sandbox.stub();

            body.init();

            wd.EventManager.trigger(wd.CustomEvent.create(wd.EngineEvent.AFTER_GAMEOBJECT_INIT));

            expect(body.addBody).toCalledOnce();
        });
        it("should only add body once", function () {
            body.addBody = sandbox.stub();

            body.init();

            wd.EventManager.trigger(wd.CustomEvent.create(wd.EngineEvent.AFTER_GAMEOBJECT_INIT));
            wd.EventManager.trigger(wd.CustomEvent.create(wd.EngineEvent.AFTER_GAMEOBJECT_INIT));

            expect(body.addBody).toCalledOnce();
        });

        it("add constraint after all body added", function(){
            body.addConstraint = sandbox.stub();

            body.init();

            wd.EventManager.trigger(wd.CustomEvent.create(wd.EngineEvent.AFTER_GAMEOBJECT_INIT_RIGIDBODY_ADD_CONSTRAINT));

            expect(body.addConstraint).toCalledOnce();
        });
        it("should only add constraint once", function () {
            body.addConstraint = sandbox.stub();

            body.init();

            wd.EventManager.trigger(wd.CustomEvent.create(wd.EngineEvent.AFTER_GAMEOBJECT_INIT_RIGIDBODY_ADD_CONSTRAINT));
            wd.EventManager.trigger(wd.CustomEvent.create(wd.EngineEvent.AFTER_GAMEOBJECT_INIT_RIGIDBODY_ADD_CONSTRAINT));

            expect(body.addConstraint).toCalledOnce();
        });
    });

    describe("dispose", function(){
        beforeEach(function(){

        });

        //todo test more

        it("dispose 'after init event' subscription", function(){
            body.addBody = sandbox.stub();

            body.init();


            wd.EventManager.trigger(wd.CustomEvent.create(wd.EngineEvent.AFTER_GAMEOBJECT_INIT));


            expect(body.addBody).toCalledOnce();

            body.dispose();

            wd.EventManager.trigger(wd.CustomEvent.create(wd.EngineEvent.AFTER_GAMEOBJECT_INIT));

            expect(body.addBody).not.toCalledTwice();
        });
        it("dispose 'after init rigidbody add constraint event' subscription", function(){
            body.addConstraint = sandbox.stub();

            body.init();


            wd.EventManager.trigger(wd.CustomEvent.create(wd.EngineEvent.AFTER_GAMEOBJECT_INIT_RIGIDBODY_ADD_CONSTRAINT));


            expect(body.addConstraint).toCalledOnce();

            body.dispose();

            wd.EventManager.trigger(wd.CustomEvent.create(wd.EngineEvent.AFTER_GAMEOBJECT_INIT_RIGIDBODY_ADD_CONSTRAINT));

            expect(body.addConstraint).not.toCalledTwice();
        });
    });
});

