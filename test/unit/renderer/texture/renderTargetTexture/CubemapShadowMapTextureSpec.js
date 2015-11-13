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
                sendUniformData: sandbox.stub(),
                getUniformLocation: sandbox.stub(),
                isUniformDataNotExistByLocation: sandbox.stub().returns(false)
            };
        });

        it("send map sampler to array", function () {
            var pos1 = 100,
                pos2 = 200;
            program.getUniformLocation.onCall(1).returns(pos1);
            program.getUniformLocation.onCall(2).returns(pos2);
            var map = new dy.TwoDTexture();
            var material = dy.LightMaterial.create();
            material.diffuseMap = map;

            material.addCubemapShadowMap(texture);

            var texture2 = new Texture();
            material.addCubemapShadowMap(texture2);

            material.mapManager.sendData(program);

            expect(program.getUniformLocation.secondCall).toCalledWith("u_cubemapShadowMapSampler[0]");
            expect(program.getUniformLocation.thirdCall).toCalledWith("u_cubemapShadowMapSampler[1]");

            expect(program.sendUniformData).toCalledWith(pos1, dy.VariableType.SAMPLER_CUBE, 1);
            expect(program.sendUniformData).toCalledWith(pos2, dy.VariableType.SAMPLER_CUBE, 2);
        });
    });
});

