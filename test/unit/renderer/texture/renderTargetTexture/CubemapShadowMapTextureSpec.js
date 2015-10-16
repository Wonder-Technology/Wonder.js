describe("CubemapShadowMapTexture", function() {
    var sandbox = null;
    var Texture = null;
    var texture = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        Texture = dy.CubemapShadowMapTexture;
        texture = new Texture();

        sandbox.stub(dy.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("sendData", function () {
        var program;

        beforeEach(function () {
            program = {
                sendUniformData: sandbox.stub()
            };
        });

        it("send map sampler to array", function () {
            var map = new dy.TwoDTexture();
            var material = dy.LightMaterial.create();
            material.diffuseMap = map;

            material.addCubemapShadowMap(texture);

            var texture2 = new Texture();
            material.addCubemapShadowMap(texture2);



            material.textureManager.sendData(program);

            expect(program.sendUniformData).toCalledWith("u_cubemapShadowMapSampler[0]", dy.VariableType.SAMPLER_CUBE, 1);
            expect(program.sendUniformData).toCalledWith("u_cubemapShadowMapSampler[1]", dy.VariableType.SAMPLER_CUBE, 2);
        });
    });
});

