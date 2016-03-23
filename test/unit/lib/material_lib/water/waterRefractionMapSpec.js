describe("water refractionMap", function () {
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


            quadCmd = rendererTool.createSingleDrawCommand(sandbox);

            quadCmd.material = material;
        });

        describe("send glsl data", function(){
            var refractionMap;

            beforeEach(function(){
                refractionMap = wd.MirrorTexture.create();

                material.refractionMap = refractionMap;
            });

            it("send u_levelData.refractionLevel", function () {
                material.refractionLevel = 0.1;
                material.init();

                material.updateShader(quadCmd);

                expect(material.program.sendStructureData).toCalledWith("u_levelData.refractionLevel", wd.EVariableType.FLOAT_1,
                    0.1
                );
            });

            describe("test glsl source", function(){
                beforeEach(function(){
                });

                it("test uniform data", function(){
                    material.init();

                    material.updateShader(quadCmd);

                    shaderTool.judgeGLSLUniformData(material.shader.fsSource, "u_levelData");
                });
            });
        });
    });
});

