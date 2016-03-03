describe("MarbleProceduralTexture", function () {
    var sandbox = null;
    var texture = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        texture = new wd.MarbleProceduralTexture();
    });
    afterEach(function () {
        sandbox.restore();
    });

    it("test default value", function(){
        expect(texture.tilesHeightNumber).toEqual(3);
        expect(texture.tilesWidthNumber).toEqual(3);
        expect(texture.amplitude).toEqual(9);
        expect(texture.jointColor).toEqual(wd.Color.create("rgb(0.72, 0.72, 0.72)"));
    });

    describe("init", function(){
        it("add MarbleProceduralRenderTargetRenderer to scene", function(){
            sandbox.stub(wd.Director.getInstance().scene, "addProceduralRenderTargetRenderer");

            texture.init();

            expect(wd.Director.getInstance().scene.addProceduralRenderTargetRenderer.firstCall.args[0]).toEqual(jasmine.any(wd.ProceduralRenderTargetRenderer));
        });
    });

    describe("getSamplerName", function(){
        it("get sampler name by unit index", function(){
            expect(texture.getSamplerName(0)).toEqual("u_sampler2D0");
            expect(texture.getSamplerName(1)).toEqual("u_sampler2D1");
        });
    });
});

