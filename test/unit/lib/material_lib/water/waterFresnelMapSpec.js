describe("water fresnel", function () {
    var sandbox = null;
    var material;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();


        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        material = wd.WaterMaterial.create();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("integration test", function () {
        var quadCmd;

        beforeEach(function () {
            sandbox.spy(material.program, "sendStructureData");


            wd.Director.getInstance().scene.currentCamera = wd.GameObject.create();


            quadCmd = rendererTool.createQuadCommand(sandbox);

            quadCmd.material = material;
        });

        describe("send glsl data", function () {
            var reflectionMap, refractionMap;

            beforeEach(function () {
                reflectionMap = wd.MirrorTexture.create();
                refractionMap = wd.RefractionTexture.create();

                material.reflectionMap = reflectionMap;
                material.refractionMap = refractionMap;
            });

            it("send u_levelData", function () {
                material.fresnelLevel = 0.1;
                material.reflectionLevel = 0.2;
                material.refractionLevel = 0.3;
                material.init();

                material.updateShader(quadCmd);

                expect(material.program.sendStructureData).toCalledWith("u_levelData.fresnelLevel", wd.EVariableType.FLOAT_1, 0.1);
                expect(material.program.sendStructureData).toCalledWith("u_levelData.reflectionLevel", wd.EVariableType.FLOAT_1, 0.2);
                expect(material.program.sendStructureData).toCalledWith("u_levelData.refractionLevel", wd.EVariableType.FLOAT_1, 0.3);
            });

            describe("test glsl source", function () {
                beforeEach(function () {
                });

                it("test uniform data", function () {
                    material.init();

                    material.updateShader(quadCmd);

                    shaderTool.judgeGLSLUniformData(material.shader.fsSource, "u_levelData");
                });
            });
        });
    });
});

