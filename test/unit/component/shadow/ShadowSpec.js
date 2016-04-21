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
            sandbox.stub(shadow, "_addShadowMapsToObjectAndChildren");

            shadow.dispose();

            wd.EventManager.trigger(wd.CustomEvent.create(wd.EEngineEvent.SHADOWMAP_LAYER_CHANGE));

            expect(shadow._addShadowMapsToObjectAndChildren).not.toCalled();
        });
    });

    describe("clone", function(){
        beforeEach(function(){

        });

        it("clone data", function(){
            var receive = false,
                cast = false,
                layer = "aaa";



            cloneTool.extend(shadow, {
                receive: receive,
                cast: cast,
                layer: layer
            });

            var gameObject = wd.GameObject.create();
            gameObject.addComponent(shadow);

            var result = gameObject.clone();
            var resultShadow = result.getComponent(wd.Shadow);


            expect(resultShadow === shadow).toBeFalsy();
            expect(resultShadow.receive).toEqual(receive);
            expect(resultShadow.cast).toEqual(cast);
            expect(resultShadow.layer).toEqual(layer);
        });
    });
});

