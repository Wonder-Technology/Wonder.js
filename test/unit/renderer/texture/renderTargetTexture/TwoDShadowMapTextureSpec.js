describe("TwoDShadowMapTexture", function() {
    var sandbox = null;
    var Texture = null;
    var texture = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        Texture = dy.TwoDShadowMapTexture;
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

            material.addTwoDShadowMap(texture);

            var texture2 = new Texture();
            material.addTwoDShadowMap(texture2);



            material.textureManager.sendData(program);

            expect(program.sendUniformData).toCalledWith("u_twoDShadowMapSampler[0]", dy.VariableType.SAMPLER_2D, 1);
            expect(program.sendUniformData).toCalledWith("u_twoDShadowMapSampler[1]", dy.VariableType.SAMPLER_2D, 2);
        });
    });
});

