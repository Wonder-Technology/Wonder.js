describe("SourceLight", function() {
    var sandbox = null;
    var light = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        light = new wd.SourceLight();
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

    describe("initWhenCreate", function(){
        beforeEach(function(){
            sandbox.stub()
        });

        describe("test logic when BEFORE_GAMEOBJECT_INIT", function(){
            describe("if cast shadow", function(){
                var shadowMap;
                var renderer;

                beforeEach(function(){
                    light.castShadow = true;

                    shadowMap = {a:1};
                    renderer = {};

                    light.createShadowMap = sandbox.stub().returns(shadowMap);
                    light.createShadowMapRenderer = sandbox.stub().returns(renderer);
                    sandbox.stub(wd.Director.getInstance().scene, "addRenderTargetRenderer");

                    light.initWhenCreate();

                    wd.EventManager.trigger(wd.CustomEvent.create(wd.EngineEvent.BEFORE_GAMEOBJECT_INIT));
                });

                it("create shadow map", function(){
                    expect(light.shadowMap).toEqual(shadowMap);
                });
                it("create shadow map renderer", function(){
                    expect(light.shadowMapRenderer).toEqual(renderer);
                });
                it("add render target renderer to scene", function(){
                    expect(wd.Director.getInstance().scene.addRenderTargetRenderer).toCalledWith(renderer);
                });
                it("should only before_init once", function () {
                    wd.EventManager.trigger(wd.CustomEvent.create(wd.EngineEvent.BEFORE_GAMEOBJECT_INIT));

                    expect(wd.Director.getInstance().scene.addRenderTargetRenderer).toCalledOnce();
                });
            });
        });
    });

    describe("dispose", function(){
        var shadowMap;
        var renderer;

        beforeEach(function(){
            light.castShadow = true;

            shadowMap = {
                dispose:sandbox.stub()
            };
            renderer = {};

            light.createShadowMap = sandbox.stub().returns(shadowMap);
            light.createShadowMapRenderer = sandbox.stub().returns(renderer);
            sandbox.stub(wd.Director.getInstance().scene, "addRenderTargetRenderer");

            sandbox.stub(wd.Director.getInstance().scene, "removeRenderTargetRenderer");

            light.initWhenCreate();

            wd.EventManager.trigger(wd.CustomEvent.create(wd.EngineEvent.BEFORE_GAMEOBJECT_INIT));
        });

        it("if shadowMap exist, dispose it", function(){
            light.dispose();

            expect(shadowMap.dispose).toCalledOnce();
        });
        it("scene remove render target renderer", function(){
            light.dispose();

            expect(wd.Director.getInstance().scene.removeRenderTargetRenderer).toCalledWith(renderer);
        });
        it("dispose 'before init event' subscription", function(){
            expect(light.createShadowMap).toCalledOnce();

            light.dispose();

            wd.EventManager.trigger(wd.CustomEvent.create(wd.EngineEvent.BEFORE_GAMEOBJECT_INIT));

            expect(light.createShadowMap).not.toCalledTwice();
        });
    });
});

