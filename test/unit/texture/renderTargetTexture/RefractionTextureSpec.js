describe("RefractionTexture", function () {
    var sandbox = null;
    var texture = null;
    //var gl;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        texture = new wd.RefractionTexture();
        //sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
        //gl = wd.DeviceManager.getInstance().gl;
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("init", function(){
        it("add RefractionRenderTargetRenderer", function(){
            sandbox.stub(wd.Director.getInstance().scene, "addRenderTargetRenderer");

            texture.init();

            expect(wd.Director.getInstance().scene.addRenderTargetRenderer.args[0][0]).toEqual(jasmine.any(wd.RefractionRenderTargetRenderer));
        });
    });

    describe("sendData", function () {
        var program;

        beforeEach(function () {
            program = {
                sendUniformData: sandbox.stub()
            };
        });

        it("send refraction sampler", function () {
            var material = wd.WaterMaterial.create();
            material.refractionMap = texture;

            material.mapManager.sendData(program);

            expect(program.sendUniformData).toCalledWith("u_refractionMapSampler", wd.EVariableType.SAMPLER_2D, 0);
        });
    });
});

