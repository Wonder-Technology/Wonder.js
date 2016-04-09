describe("CubemapShadowRenderTargetRenderer", function() {
    var sandbox = null;
    var renderer = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        renderer = new wd.CubemapShadowMapRenderTargetRenderer();
    });
    afterEach(function () {
        sandbox.restore();
        testTool.clearInstance(sandbox);
    });

    describe("dispose", function(){
        beforeEach(function(){
        });

        it("dispose texture", function(){
            renderer = wd.CubemapShadowMapRenderTargetRenderer.create(wd.PointLight.create(), wd.CubemapShadowMapTexture.create());
            sandbox.stub(renderer.texture, "dispose");

            renderer.dispose();

            expect(renderer.texture.dispose).toCalledOnce();
        });
    });
});
