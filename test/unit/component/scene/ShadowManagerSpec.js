describe("ShadowManager", function() {
    var sandbox = null;
    var manager;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        manager = wd.ShadowManager.create();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("dispose", function(){
        beforeEach(function(){
        });

        it("unbind endLoop event", function(){
            wd.EventManager.off();
            manager.init();

            sandbox.stub(manager, "_removeShadowMapGLSLData");

            manager.dispose();

            wd.EventManager.trigger(wd.CustomEvent.create(wd.EEngineEvent.ENDLOOP));

            expect(manager._removeShadowMapGLSLData).not.toCalled();
        });
    });
});

