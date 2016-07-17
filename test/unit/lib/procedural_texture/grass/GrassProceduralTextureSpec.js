describe("GrassProceduralTexture", function () {
    var sandbox = null;
    var texture = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        texture = new wd.GrassProceduralTexture();
    });
    afterEach(function () {
        sandbox.restore();
    });

    it("test default value", function(){
        expect(texture.herb1Color).toEqual(wd.Color.create("rgb(0.29, 0.38, 0.02)"));
        expect(texture.herb2Color).toEqual(wd.Color.create("rgb(0.36, 0.49, 0.09)"));
        expect(texture.herb3Color).toEqual(wd.Color.create("rgb(0.51, 0.6, 0.28)"));
        expect(texture.groundColor).toEqual(wd.Color.create("rgb(1.0,1.0,1.0)"));
    });

    describe("init", function(){
        it("add GrassProceduralRenderTargetRenderer to scene", function(){
            sandbox.stub(wd.Director.getInstance().scene, "addProceduralRenderTargetRenderer");

            texture.init();

            expect(wd.Director.getInstance().scene.addProceduralRenderTargetRenderer.firstCall.args[0]).toEqual(jasmine.any(wd.GrassProceduralRenderTargetRenderer));
        });
    });
});

