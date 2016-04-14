describe("Shadow", function() {
    var sandbox = null;
    var shadow;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        shadow = wd.Shadow.create();
    });
    afterEach(function () {
        sandbox.restore();
        testTool.clearInstance(sandbox);
    });

    describe("dispose", function(){
        beforeEach(function(){
        });

        it("unbind shadow map layer change event", function(){
            sandbox.stub(shadow, "_isFirstLevelObjectOfSceneOrSpacePartition").returns(true);
            shadow.entityObject = wd.GameObject.create();
            shadow.receive = true;
            shadow.init();
            sandbox.stub(shadow, "_addAllShadowMapsToObjectAndChildren");

            shadow.dispose();

            wd.EventManager.trigger(wd.CustomEvent.create(wd.EEngineEvent.SHADOWMAP_LAYER_CHANGE));

            expect(shadow._addAllShadowMapsToObjectAndChildren).not.toCalled();
        });
    });
});

