describe("ShadowMapShaderLib", function () {
    var sandbox = null;
    var Lib = null;
    var lib = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        Lib = wd.ShadowMapShaderLib;
        lib = new Lib();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("dispose", function(){
        it("unbind SHADOWMAP_SOFTTYPE_CHANGE event", function(){
            var shader = wd.Shader.create();
            shader.addLib(lib);
            lib.shader.libDirty = false;
            lib.init();

            wd.EventManager.trigger(wd.Director.getInstance().scene.gameObjectScene, wd.CustomEvent.create(wd.EEngineEvent.SHADOWMAP_SOFTTYPE_CHANGE));

            expect(lib.shader.libDirty).toBeTruthy();




            lib.shader.libDirty = false;

            lib.dispose();

            wd.EventManager.trigger(wd.Director.getInstance().scene.gameObjectScene, wd.CustomEvent.create(wd.EEngineEvent.SHADOWMAP_SOFTTYPE_CHANGE));

            expect(lib.shader.libDirty).toBeFalsy();
        });
    });
});

