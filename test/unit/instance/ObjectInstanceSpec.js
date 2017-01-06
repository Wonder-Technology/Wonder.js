describe("ObjectInstance", function() {
    var sandbox;

    var box1, box1Instance1;
    var objectInstance;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        wd.DebugStatistics.resetData();

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        box1 = instanceTool.createBox();
        box1Instance1 = instanceTool.cloneInstance(box1, "0");

        objectInstance = box1Instance1.getComponent(wd.ObjectInstance);
    });
    afterEach(function () {
        sandbox.restore();

        testTool.clearInstance(sandbox);
    });

    describe("dispose", function(){
        beforeEach(function(){
            objectInstance.init();
        });

        it("unbind enter event", function () {
            sandbox.stub(objectInstance, "_addToSourceAndItsChildren");

            objectInstance.dispose();

            wd.EventManager.trigger(box1Instance1, wd.CustomEvent.create(wd.EEngineEvent.ENTER));

            expect(objectInstance._addToSourceAndItsChildren).not.toCalled();
        });
        it("unbind exit event", function () {
            sandbox.stub(objectInstance, "_removeFromSourceAndItsChildren");

            objectInstance.dispose();

            wd.EventManager.trigger(box1Instance1, wd.CustomEvent.create(wd.EEngineEvent.EXIT));
            wd.EventManager.trigger(box1Instance1, wd.CustomEvent.create(wd.EEngineEvent.EXIT));
            wd.EventManager.trigger(box1Instance1, wd.CustomEvent.create(wd.EEngineEvent.EXIT));

            expect(objectInstance._removeFromSourceAndItsChildren).toCalledOnce();
        });
    });

    describe("clone", function(){
        it("share sourceObject", function(){
            var gameObject1 = {};
            objectInstance.sourceObject = gameObject1;

            var result = objectInstance.clone();

            expect(result === objectInstance).toBeFalsy();
            expect(result.sourceObject === gameObject1).toBeTruthy();
        });
    });
});
