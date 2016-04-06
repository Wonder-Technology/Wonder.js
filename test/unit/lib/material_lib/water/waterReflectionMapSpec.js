describe("water reflectionMap", function () {
    var sandbox = null;
    var material;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();


        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        material = wd.WaterMaterial.create();
        material.geometry = {
            entityObject:wd.GameObject.create()
        }
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
            var reflectionMap;

            beforeEach(function(){
                reflectionMap = wd.MirrorTexture.create();

                material.reflectionMap = reflectionMap;
            });

            it("send u_levelData.reflectionLevel", function () {
                material.reflectionLevel = 0.1;
                material.init();

                material.updateShader(quadCmd);

                expect(material.program.sendStructureData).toCalledWith("u_levelData.reflectionLevel", wd.EVariableType.FLOAT_1,
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

