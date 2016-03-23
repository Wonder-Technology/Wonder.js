describe("mirror material", function () {
    var sandbox = null;

    var material;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();


        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        material = wd.MirrorMaterial.create();
    });
    afterEach(function () {
        sandbox.restore();
    });

    it("test default values", function () {
    });

    describe("integration test", function () {
        var quadCmd;
        var reflectionMap;

        beforeEach(function () {
            sandbox.spy(material.program, "sendUniformData");
            sandbox.spy(material.program, "sendAttributeData");
            sandbox.spy(material.program, "sendStructureData");


            wd.Director.getInstance().scene.currentCamera = wd.GameObject.create();


            quadCmd = rendererTool.createSingleDrawCommand(sandbox);

            quadCmd.material = material;
        });

        describe("test map", function () {
            beforeEach(function () {
            });

            it("test bind and send map data", function () {
                reflectionMap = wd.MirrorTexture.create();


                sandbox.stub(reflectionMap, "bindToUnit");

                sandbox.stub(reflectionMap, "update");


                material.reflectionMap = reflectionMap;


                material.init();


                material.bindAndUpdateTexture();


                expect(reflectionMap.bindToUnit).toCalledWith(0);

                expect(reflectionMap.update).not.toCalled();



                material.updateShader(quadCmd);


                expect(material.program.sendUniformData).toCalledWith("u_reflectionMapSampler", wd.EVariableType.SAMPLER_2D, 0);
            });
        });
    });
});
