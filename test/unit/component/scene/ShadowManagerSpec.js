describe("ShadowManager", function() {
    var sandbox = null;
    var manager;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        manager = wd.ShadowManager.create();
        manager.entityObject = wd.Director.getInstance().scene.gameObjectScene;
    });
    afterEach(function () {
        sandbox.restore();
        testTool.clearInstance(sandbox);
    });

    describe("dispose", function(){
        beforeEach(function(){
            sandbox.stub(manager._shadowMapManager, "initShadowMapData");
            manager.init();
        });

        it("unbind endLoop event", function(){
            sandbox.stub(manager, "_removeShadowMapGLSLData");

            manager.dispose();

            wd.EventManager.trigger(wd.CustomEvent.create(wd.EEngineEvent.ENDLOOP));

            expect(manager._removeShadowMapGLSLData).not.toCalled();
        });
        it("unbind shadow map layer change event", function(){
            sandbox.stub(manager, "_updateWhenShadowLayerChange");

            manager.dispose();

            wd.EventManager.trigger(wd.CustomEvent.create(wd.EEngineEvent.SHADOWMAP_LAYER_CHANGE));

            expect(manager._updateWhenShadowLayerChange).not.toCalled();
        });
    });
});

