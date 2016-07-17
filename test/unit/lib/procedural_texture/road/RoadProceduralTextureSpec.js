describe("RoadProceduralTexture", function () {
    var sandbox = null;
    var texture = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        texture = new wd.RoadProceduralTexture();
    });
    afterEach(function () {
        sandbox.restore();
    });

    it("test default value", function(){
        expect(texture.roadColor).toEqual(wd.Color.create("rgb(0.53, 0.53, 0.53)"));
    });

    describe("init", function(){
        it("add RoadProceduralRenderTargetRenderer to scene", function(){
            sandbox.stub(wd.Director.getInstance().scene, "addProceduralRenderTargetRenderer");

            texture.init();

            expect(wd.Director.getInstance().scene.addProceduralRenderTargetRenderer.firstCall.args[0]).toEqual(jasmine.any(wd.RoadProceduralRenderTargetRenderer));
        });
    });
});

