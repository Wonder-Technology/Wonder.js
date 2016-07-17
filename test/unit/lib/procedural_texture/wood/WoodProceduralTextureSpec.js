describe("WoodProceduralTexture", function () {
    var sandbox = null;
    var texture = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        texture = new wd.WoodProceduralTexture();
    });
    afterEach(function () {
        sandbox.restore();
    });

    it("test default value", function(){
        expect(texture.ampScale).toEqual(100);
        expect(texture.woodColor).toEqual(wd.Color.create("rgb(0.32, 0.17, 0.09)"));
    });

    describe("init", function(){
        it("add WoodProceduralRenderTargetRenderer to scene", function(){
            sandbox.stub(wd.Director.getInstance().scene, "addProceduralRenderTargetRenderer");

            texture.init();

            expect(wd.Director.getInstance().scene.addProceduralRenderTargetRenderer.firstCall.args[0]).toEqual(jasmine.any(wd.WoodProceduralRenderTargetRenderer));
        });
    });
});

