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
        testTool.clearInstance();
    });

    describe("dispose", function(){
        beforeEach(function(){
        });

        it("dispose mapManager", function(){
            renderer = wd.CubemapShadowMapRenderTargetRenderer.create(wd.PointLight.create(), wd.CubemapShadowMapTexture.create());
            sandbox.stub(renderer._shadowMapRendererUtils.mapManager, "dispose");

            renderer.dispose();

            expect(renderer._shadowMapRendererUtils.mapManager.dispose).toCalledOnce();
        });
    });
});
